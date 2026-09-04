---
title: "How I Organize Research Notes (and Why It Matters)"
date: 2026-02-20
categories: [workflow]
tags: [productivity, knowledge-management]
summary: "A practical system for turning scattered learning into a searchable knowledge base over time."
reading_time: 6
---

Most researchers accumulate notes in disconnected places: paper margins, Notion pages,
random Markdown files, and half-finished blog drafts. Six months later, finding that
one insight about gradient clipping becomes archaeology.

This post describes a lightweight system that has worked for me — not as a rigid
methodology, but as a set of defaults that reduce friction.

## The Core Idea: Write for Future You

Notes should answer: *"If I forgot everything about this topic, what would I need to
reconstruct my understanding in 15 minutes?"*

That means:

1. **Start with the question**, not the answer
2. **Include one concrete example** (code snippet, equation, or diagram)
3. **Link to the source** (paper, doc, conversation)

## Notes vs. Blog

| | Notes | Blog |
|---|-------|------|
| Audience | Future me | Others |
| Length | Any | Usually longer |
| Polish | Low | Higher |
| Updates | Frequent | Occasional |

When a note gets referenced repeatedly or covers a topic others ask about, promote it
to a blog post.

## Folder Structure (This Site)

All notes live in `_notes/` as plain Markdown. The site handles listing, search, and
categorization automatically. I only need to pick a category and write.

## Search and Retrieval

Client-side search on the Notes page filters by title, summary, and tags. For deeper
retrieval, consistent tagging matters more than perfect titles.

Suggested tag vocabulary (keep it small):

- `optimization`, `transformer`, `training`, `evaluation`, `writing`

## What I Avoid

- Over-categorizing (more than ~8 top-level categories)
- Copy-pasting paper abstracts without personal commentary
- Waiting until notes are "perfect" before saving

## Takeaway

The best note system is the one you actually use. Optimize for low friction at capture
time; structure can evolve as the corpus grows.

<!--more-->

## Appendix: Note Template

```yaml
---
title: "Descriptive Title"
date: YYYY-MM-DD
category: machine-learning   # see _config.yml for list
tags: [tag1, tag2]
summary: "One sentence for list views."
status: draft                # draft | wip | stable
---
```

Copy this into a new file in `_notes/` and start writing.
