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
            "and extracts one frame per given interval from it."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "examples:\n"
            '  python3 yt_frames.py "https://www.youtube.com/watch?v=aqz-KE-bpKQ" '
            "--time 1:00 --window 10 --interval 2 --topic 'opening scene'\n"
            "  python3 yt_frames.py URL -t 754 -w 30 -i 5 --out shots\n"
        ),
    )
    ap.add_argument("url", help="YouTube video URL")
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

    tmp = Path(tempfile.mkdtemp(prefix="yt_frames_"))
    try:
        # ---- 1) download only the segment around the target time ----
        fmt = f"bv*[height<={args.height}]+ba/b[height<={args.height}]/bv*+ba/b"
        section_cmd = [
            "yt-dlp", "--no-playlist", "--no-warnings",
            "-f", fmt,
            "--download-sections", f"*{fmt_ts(start)}-{fmt_ts(end)}",
            "-o", str(tmp / "seg.%(ext)s"),
            args.url,
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
                 "-o", str(tmp / "seg.%(ext)s"), args.url])
            seek_offset = start
        else:
            seek_offset = 0.0

        seg = next(tmp.glob("seg.*"), None)
        if seg is None:
            sys.exit("فایلِ بخشِ ویدیو ساخته نشد.")

        # ---- 2) extract frames with ffmpeg and rename them by video time ----
        print(f"[۲ از ۲] استخراجِ فریم‌ها هر {args.interval:g} ثانیه ...", file=sys.stderr)
        work = tmp / "work"
        work.mkdir()
        pattern = work / f"f_%04d.{args.ext}"
        cmd = [
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-stats",
            "-ss", f"{seek_offset:.3f}", "-i", str(seg),
            "-vf", f"fps=1/{args.interval:g}",
        ]
        if args.ext == "jpg":
            cmd += ["-q:v", str(args.quality)]
        cmd += ["-start_number", "1", "-y", str(pattern)]
        run(cmd)

        saved = []
        for idx, f in enumerate(sorted(work.glob(f"f_*.{args.ext}"))):
            video_t = start + idx * args.interval
            name = outdir / f"{tag_ts(video_t)}.{args.ext}"
            k = 2
            while name.exists():
                name = outdir / f"{tag_ts(video_t)}_{k}.{args.ext}"
                k += 1
            shutil.move(str(f), name)
            saved.append(name)

        if not saved:
            sys.exit("فریمی ساخته نشد. آیا زمانِ داده‌شده از پایانِ ویدیو گذشته است؟")

        print(f"\nتمام شد: {len(saved)} فریم در {outdir}/", file=sys.stderr)
        for p in saved[:15]:
            print(f"  {p}", file=sys.stderr)
        if len(saved) > 15:
            print(f"  ... و {len(saved) - 15} فریم دیگر", file=sys.stderr)
    finally:
        if args.keep_segment:
            seg_keep = outdir / f"segment_{tag_ts(start)}.{seg.suffix.lstrip('.')}"
            for f in tmp.glob("seg.*"):
                shutil.move(str(f), seg_keep)
                break
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
