#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
yt_frames.py — extraction of frames around a given moment of a YouTube video.

Usage:
    python3 yt_frames.py "https://www.youtube.com/watch?v=XXXX" \
        --time 12:30 --window 20 --interval 2 --topic "topic description"

Dependencies:
    pip install yt-dlp
    ffmpeg (system package)
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def parse_time(value: str) -> float:
    """Accepts 'H:MM:SS', 'MM:SS', 'SS.mmm' or a plain number (in seconds)."""
    value = value.strip()
    if re.fullmatch(r"\d+(?:\.\d+)?", value):
        return float(value)
    parts = [p for p in value.split(":") if p != ""]
    if not 1 <= len(parts) <= 3 or not all(re.fullmatch(r"\d+(?:\.\d+)?", p) for p in parts):
        raise argparse.ArgumentTypeError(
            f"invalid time {value!r} (examples: 12:30, 1:02:05, 750)"
        )
    total = 0.0
    for p in parts:
        total = total * 60 + float(p)
    return total


def fmt_ts(sec: float) -> str:
    """730.5 -> '00:12:10.500' (for yt-dlp section ranges)."""
    sec = max(0.0, sec)
    h = int(sec // 3600)
    m = int(sec % 3600 // 60)
    s = sec - h * 3600 - m * 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"


def tag_ts(sec: float) -> str:
    """730 -> '00_12_10' (for frame file names)."""
    sec = max(0, int(round(sec)))
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return f"{h:02d}_{m:02d}_{s:02d}"


def run(cmd: list) -> None:
    print("$", " ".join(cmd), file=sys.stderr)
    subprocess.run(cmd, check=True)


def slugify(text: str) -> str:
    text = re.sub(r"\W", "_", text.strip()).strip("_")
    return text or "frames"


def main() -> None:
    ap = argparse.ArgumentParser(
        description=(
            "Downloads a short segment of a YouTube video around the given time "
            "and extracts one frame per given interval from it. "
            "Also accepts local video file paths."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "examples:\n"
            '  python3 yt_frames.py "https://www.youtube.com/watch?v=aqz-KE-bpKQ" '
            "--time 1:00 --window 10 --interval 2 --topic 'opening scene'\n"
            "  python3 yt_frames.py URL -t 754 -w 30 -i 5 --out shots\n"
            '  python3 yt_frames.py "/path/to/local/video.mp4" -t 12:30 -w 30 -i 5 '
            "--topic 'my topic'\n"
        ),
    )
    ap.add_argument("source", help="YouTube video URL or local file path")
    ap.add_argument(
        "-t", "--time", required=True, type=parse_time,
        help="approximate time of the desired moment (e.g. 12:30 or 750)",
    )
    ap.add_argument(
        "-w", "--window", type=parse_time, default=15,
        help="window before/after the given time, in seconds (default: 15)",
    )
    ap.add_argument(
        "-i", "--interval", type=float, default=2.0, metavar="SEC",
        help="interval between frames, in seconds (default: 2)",
    )
    ap.add_argument(
        "--topic", default="",
        help="description of the topic of interest (used as folder name)",
    )
    ap.add_argument("-o", "--out", default="study/frames", help="output directory (default: study/frames)")
    ap.add_argument("--ext", choices=["jpg", "png"], default="jpg", help="frame format (default: jpg)")
    ap.add_argument("--quality", type=int, default=2, help="jpg quality 1-31, lower is better (default: 2)")
    ap.add_argument("--height", type=int, default=720, help="max video height to download (default: 720)")
    ap.add_argument("--keep-segment", action="store_true", help="keep the downloaded segment")
    args = ap.parse_args()

    if shutil.which("ffmpeg") is None:
        sys.exit("ffmpeg پیدا نشد. ابتدا نصب کنید (مثلاً: sudo apt install ffmpeg).")

    if args.interval <= 0:
        sys.exit("interval باید عددی مثبت باشد.")

    center = args.time
    start = max(0.0, center - args.window)
    end = center + args.window
    outdir = Path(args.out) / (slugify(args.topic) if args.topic else "frames")
    outdir.mkdir(parents=True, exist_ok=True)

    source = Path(args.source)
    is_local = source.is_file()

    if is_local:
        # ---- local file: use directly, no download ----
        seg = source
        duration = get_local_duration(seg)
        if duration is not None:
            end = min(end, duration)
            start = min(start, duration)
        seek_offset = start
        print(f"[فایل محلی] استفاده از فایل {seg} - استخراج فریم از {fmt_ts(start)} تا {fmt_ts(end)}",
              file=sys.stderr)
    else:
        tmp = Path(tempfile.mkdtemp(prefix="yt_frames_"))

    try:
        if is_local:
            work = Path(tempfile.mkdtemp(prefix="yt_frames_"))
            try:
                saved = _extract_frames_from_segment(
                    seg, work, outdir, start, end, args.interval, args.ext, args.quality, is_local_path=True
                )
            finally:
                shutil.rmtree(work, ignore_errors=True)
        else:
            # ---- 1) download only the segment around the target time ----
            try:
                tmp.mkdir(parents=True, exist_ok=True)
            except FileExistsError:
                pass
            fmt = f"bv*[height<={args.height}]+ba/b[height<={args.height}]/bv*+ba/b"
            section_cmd = [
                "yt-dlp", "--no-playlist", "--no-warnings",
                "-f", fmt,
                "--download-sections", f"*{fmt_ts(start)}-{fmt_ts(end)}",
                "-o", str(tmp / "seg.%(ext)s"),
                str(source),
            ]
            print(f"[۱ از ۲] دانلودِ بخشِ {fmt_ts(start)} تا {fmt_ts(end)} از ویدیو ...",
                  file=sys.stderr)
            try:
                run(section_cmd)
            except (FileNotFoundError, subprocess.CalledProcessError) as err:
                if isinstance(err, FileNotFoundError):
                    sys.exit("yt-dlp پیدا نشد. ابتدا نصب کنید: pip install yt-dlp")
                print("دانلودِ بخش ناموفق بود؛ کلِ ویدیو دانلود می‌شود ...", file=sys.stderr)
                run(["yt-dlp", "--no-playlist", "--no-warnings", "-f", fmt,
                     "-o", str(tmp / "seg.%(ext)s"), str(source)])
                seek_offset = start
            else:
                seek_offset = 0.0

            seg = next(tmp.glob("seg.*"), None)
            if seg is None:
                sys.exit("فایلِ بخشِ ویدیو ساخته نشد.")

            work = tmp / "work"
            work.mkdir()
            saved = _extract_frames_from_segment(
                seg, work, outdir, seek_offset, seek_offset + (end - start), args.interval, args.ext, args.quality, is_local_path=False
            )

        if not saved:
            sys.exit("فریمی ساخته نشد. آیا زمانِ داده‌شده از پایانِ ویدیو گذشته است؟")

        print(f"\nتمام شد: {len(saved)} فریم در {outdir}/", file=sys.stderr)
        for p in saved[:15]:
            print(f"  {p}", file=sys.stderr)
        if len(saved) > 15:
            print(f"  ... و {len(saved) - 15} فریم دیگر", file=sys.stderr)
    finally:
        if args.keep_segment and is_local:
            seg_keep = outdir / f"segment_{tag_ts(start)}{seg.suffix}"
            shutil.copy2(str(seg), str(seg_keep))
        if not is_local:
            shutil.rmtree(tmp, ignore_errors=True)


def get_local_duration(path: Path) -> float | None:
    """Get video duration in seconds using ffprobe, or None on failure."""
    if shutil.which("ffprobe") is None:
        return None
    try:
        result = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-show_entries", "format=duration",
                "-of", "json",
                str(path),
            ],
            capture_output=True, text=True, check=True,
        )
        data = json.loads(result.stdout)
        return float(data["format"]["duration"])
    except (subprocess.CalledProcessError, json.JSONDecodeError, KeyError, FileNotFoundError):
        return None


def _extract_frames_from_segment(
    seg: Path,
    work: Path,
    outdir: Path,
    seek_offset: float,
    end: float,
    interval: float,
    ext: str,
    quality: int,
    is_local_path: bool,
) -> list[Path]:
    """Extract frames from a segment file, rename by video time, return saved paths.

    `seek_offset` is the position (in the segment) where the wanted window starts;
    `end` is the absolute end of the wanted window (in the same time base as
    seek_offset is applied). The output duration is capped to `end - seek_offset`
    so local files do not keep producing frames until EOF.
    """
    print(f"[۲ از ۲] استخراجِ فریم‌ها هر {interval:g} ثانیه ...", file=sys.stderr)
    pattern = work / f"f_%04d.{ext}"
    duration = max(0.0, end - seek_offset)
    cmd = [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-stats",
        "-ss", f"{seek_offset:.3f}", "-i", str(seg),
        "-t", f"{duration:.3f}",
        "-vf", f"fps=1/{interval:g}",
    ]
    if ext == "jpg":
        cmd += ["-q:v", str(quality)]
    cmd += ["-start_number", "1", "-y", str(pattern)]
    run(cmd)

    saved = []
    for idx, f in enumerate(sorted(work.glob(f"f_*.{ext}"))):
        video_t = seek_offset + idx * interval
        name = outdir / f"{tag_ts(video_t)}.{ext}"
        k = 2
        while name.exists():
            name = outdir / f"{tag_ts(video_t)}_{k}.{ext}"
            k += 1
        shutil.move(str(f), name)
        saved.append(name)
    return saved


if __name__ == "__main__":
    main()
