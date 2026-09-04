---
layout: page
title: Publications
permalink: /publications/
subtitle: Papers, preprints, and conference proceedings
---

<ul class="publications-list">
{% assign sorted_pubs = site.publications | sort: 'year' | reverse %}
{% for pub in sorted_pubs %}
  {% include publication-entry.html pub=pub %}
{% endfor %}
</ul>

---

*To add a publication: create a new `.md` file in `_publications/` (see README).*
*List entries appear here automatically; each file can also have a detail page.*
