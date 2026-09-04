---
title: "LaTeX Workflow for Paper Writing"
date: 2026-03-01
category: research-tools
tags: [latex, writing]
summary: "Project structure, bibliography, and compilation tips for academic papers."
status: stable
---

A repeatable LaTeX setup reduces friction when deadlines approach.

## Recommended Project Layout

```
paper/
├── main.tex
├── sections/
│   ├── intro.tex
│   ├── method.tex
│   └── experiments.tex
├── figures/
├── tables/
├── refs.bib
└── Makefile
```

## Bibliography

Use BibTeX or biblatex with a single `refs.bib`. Sync from Zotero / Mendeley export.

## Compilation

```makefile
all:
	latexmk -pdf -interaction=nonstopmode main.tex
```

`latexmk` handles multiple passes automatically.

## Common Pitfalls

- Figure paths break when moving files — use `\graphicspath{{figures/}}`
- Undefined references: compile twice (or use latexmk)
- Table overflow: prefer `\resizebox` or `tabularx` sparingly

## Templates

Start from your target venue's official template rather than rolling your own.
