---
title: "Reading Papers Efficiently: A Three-Pass Method"
date: 2026-01-15
categories: [research]
tags: [paper-reading, methodology]
summary: "First pass for relevance, second for method, third for reproduction — adapted from Keshav's approach."
reading_time: 8
---

Reading every paper cover-to-cover doesn't scale. Here is a three-pass workflow I use
when surveying a new area or reviewing related work.

## Pass 1: Scan (5–10 minutes)

Goal: decide if the paper deserves deeper reading.

- Read title, abstract, introduction, and conclusion
- Skim section headings and figures
- Ask: *Does this relate to my current problem? Is the claim credible at face value?*

If no → move on. If yes → Pass 2.

## Pass 2: Understand (30–60 minutes)

Goal: grasp the core contribution and method.

- Read method section carefully; skim experiments
- Note key assumptions and limitations
- Draw a one-page diagram of the pipeline in your own words
- Write 3 bullet points: **problem**, **approach**, **result**

## Pass 3: Deep Dive (2–4 hours, selective)

Goal: evaluate reproducibility and extendability.

- Check experimental setup: datasets, baselines, metrics, ablations
- Read appendix for hyperparameters and implementation details
- Try to re-derive key equations
- Identify open questions or connections to your work

## Keeping Track

I store Pass 2 summaries as Notes on this site. Pass 3 details go into project-specific
docs or experiment logs.

## Common Mistakes

1. Starting with Pass 3 on every paper
2. Not writing anything down (you will forget)
3. Treating citation count as quality proxy

## Further Reading

- Keshav, "How to Read a Paper" (2007)
- [Add papers or blogs you find helpful]
