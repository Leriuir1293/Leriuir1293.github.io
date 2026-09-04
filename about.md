---
layout: page
title: About
permalink: /about/
---

I am a researcher working on topics in machine learning and artificial intelligence.
Replace this paragraph with a brief self-introduction: your background, what motivates your work,
and what you hope to contribute to the field.

## Research Interests

{% for interest in site.data.profile.research_interests %}
- {{ interest }}
{% endfor %}

## Current Focus

{{ site.data.profile.current_focus }}

## Background

Use this section for education history, lab affiliations, or other context.
Keep it concise — detailed CV information belongs on the [CV](/cv/) page.

- **Education:** [Degree], [Institution] ([Year range])
- **Affiliation:** {{ site.data.profile.affiliation }}

## Outside Research

Optional: hobbies, open-source contributions, teaching, or community involvement.
