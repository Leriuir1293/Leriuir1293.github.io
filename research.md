---
layout: page
title: Research & Projects
permalink: /research/
subtitle: Ongoing and completed research projects
---

Below are research projects I have worked on or am currently pursuing.
Each project has its own page with more details — click the title to read more.

<div class="projects-grid">
{% for project in site.projects %}
  {% include project-card.html project=project %}
{% endfor %}
</div>

---

*To add a project: create a new `.md` file in `_projects/` (see README).*
