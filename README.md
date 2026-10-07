# دستیار هوشمند آموزش
## AI Training Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Goal**: An intelligent assistant that generates educational content and workshop materials.

**Core principle**: Self-referential — this repository is itself an example of the assistant's output.

---

## Overview / نمای کلی

This project combines:

1. **Knowledge base** (`knowledge/`) — pedagogy, presentation skills, AI literacy, and tools for AI-enabled training
2. **Workshops** (`workshops/`) — ready-to-run workshop materials with generated PowerPoint decks
3. **Assistant skills** (`.agents/skills/`) — reusable skills for generating workshop content and RTL slides

Content is primarily in Persian (RTL), with English structure labels for broader accessibility.

---

## Project Structure / ساختار پروژه

```
ai-training/
├── knowledge/                    # Knowledge base
│   ├── pedagogy/                 # Pedagogy
│   │   ├── clil/                 # CLIL (Content and Language Integrated Learning)
│   │   └── ai-pedagogy.md        # AI in education
│   ├── presentation/             # Presentation best practices
│   │   ├── README.md             # Presentation principles
│   │   └── pptx-tools.md         # PowerPoint generation tools
│   ├── ai-literacy/              # AI literacy frameworks
│   ├── education/                # AI in teaching & learning
│   ├── training/                 # Skill development methods
│   └── tools/                    # AI platforms & tooling
│
├── workshops/                    # Workshop materials
│   ├── package.json              # Slide-generation dependencies
│   ├── generate-slides.mjs       # PptxGenJS slide builder (RTL/Persian)
│   ├── workshop-1-ai-concepts.md # Workshop 1
│   ├── workshop-2-agents.md      # Workshop 2
│   ├── workshop-3-opencode.md    # Workshop 3
│   └── slide-assets/             # Images used in slides
│
└── .agents/skills/               # Assistant skills
    ├── workshop-generator/       # Workshop content generation
    └── slide-generator/          # PowerPoint slide generation
```

---

## Knowledge Base / پایگاه دانش

### 1. CLIL Pedagogy
Content and Language Integrated Learning:
- **4Cs**: Content, Communication, Cognition, Culture
- **Lesson planning**: Dual objectives, three-stage structure
- **Scaffolding**: Language, visual, and content support
- **Assessment**: Formative, summative, rubrics
- **Activities**: Input, processing, output
- **Bloom**: Cognitive levels, learning verbs

### 2. Presentation Principles
Instructional design practices:
- **SMART objectives**: Specific, measurable, achievable
- **Worked examples**: Step-by-step with think-aloud
- **Slides**: 10-20-30 rule, clear structure
- **Interaction**: Active participation, group discussion
- **Assessment**: Diagnostic, formative, summative

### 3. PPTX Tooling
PowerPoint generation:
- **PptxGenJS**: JavaScript library (primary tool)
- **python-pptx**: Python library
- **Slidev**: Web-based presentations

See [`knowledge/README.md`](knowledge/README.md) for the full tree.

---

## Assistant Skills / مهارت‌های دستیار

### 1. `workshop-generator`
Generates workshop content:
- Collects audience and topic requirements
- Designs workshop structure
- Writes learning objectives
- Produces worked examples
- Designs activities and assessments

### 2. `slide-generator`
Generates PowerPoint slides:
- Designs slide structure
- Emits PptxGenJS code
- Supports Persian (RTL)
- Ships reusable workshop patterns

---

## Getting Started / نحوه استفاده

### Generate a new workshop
Ask the assistant:
> «یک کارگاه آموزشی درباره [موضوع] برای [مخاطب] طراحی کن»

The assistant will:
1. Ask for clarifying details
2. Design the workshop structure
3. Generate content for each section
4. Build the slides

### Generate slides
Ask the assistant:
> «اسلایدهای [موضوع] را بساز»

Or run the builder directly:

```bash
cd workshops
npm install
npm run slides
```

Requires **Node.js 16+**. The Vazirmatn font should be installed on the viewer's system for correct Persian rendering.

---

## Example Output / مثال: خروجی دستیار

This repository is itself sample assistant output.

**User input**:
> «یک کارگاه آموزشی درباره هوش مصنوعی برای کارمندان اداری طراحی کن»

**Assistant output**:
1. **Structure**: 8 sessions × 20 minutes
2. **Content**: `workshops/workshop-1-ai-concepts.md`
3. **Slides**: `session1` … `session8.pptx`
4. **Code**: `workshops/generate-slides.mjs`

---

## Requirements / پیش‌نیازها

| Component | Requirement |
|-----------|-------------|
| Node.js | 16+ (for slide generation) |
| Python | 3.8+ (optional, workshop 1 exercises) |
| Font | [Vazirmatn](https://github.com/rastikerdar/vazirmatn) for Persian slides |

---

## References / منابع اصلی

### Pedagogy
- Coyle, D., Hood, P., & Marsh, D. (2010). *CLIL: Content and Language Integrated Learning*. Cambridge.
- Anderson, L.W. & Krathwohl, D.R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman.

### Instructional Design
- Rosenshine, B. (2012). *Principles of Instruction*. American Educator.
- Sweller, J. (2006). *The Worked Example Effect and Human Cognition*. Learning and Instruction.
- Mayer, R.E. (2009). *Multimedia Learning*. Cambridge University Press.

### Tools
- [PptxGenJS](https://gitbrent.github.io/PptxGenJS/)
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn)

---

## License / مجوز

This project is licensed under the [MIT License](LICENSE).

---

**Maintainer**: Nasser Safarinia
