---
layout: page
title: CV
permalink: /cv/
---

{% if site.data.profile.cv_pdf != "" %}
<p><a href="{{ site.data.profile.cv_pdf | relative_url }}" class="btn btn-outline" download>Download PDF</a></p>
{% endif %}

<div class="cv-section">
  <h2>Education</h2>
  <div class="cv-entry">
    <p class="cv-entry-title">[Degree] in [Field]</p>
    <p class="cv-entry-meta">[University Name] · [Start Year] – [End Year or Present]</p>
  </div>
  <div class="cv-entry">
    <p class="cv-entry-title">[Previous Degree] in [Field]</p>
    <p class="cv-entry-meta">[University Name] · [Year range]</p>
  </div>
</div>

<div class="cv-section">
  <h2>Research Experience</h2>
  <div class="cv-entry">
    <p class="cv-entry-title">[Role] — [Lab / Group Name]</p>
    <p class="cv-entry-meta">[Institution] · [Year range]</p>
    <p>Brief description of research focus and contributions.</p>
  </div>
</div>

<div class="cv-section">
  <h2>Publications</h2>
  <p>See the <a href="{{ '/publications/' | relative_url }}">Publications</a> page for a full list.</p>
</div>

<div class="cv-section">
  <h2>Skills</h2>
  <ul>
    <li><strong>Languages:</strong> Python, C++, …</li>
    <li><strong>Frameworks:</strong> PyTorch, JAX, …</li>
    <li><strong>Tools:</strong> Git, LaTeX, …</li>
  </ul>
</div>

<div class="cv-section">
  <h2>Honors & Awards</h2>
  <ul>
    <li>[Award name], [Year]</li>
  </ul>
</div>

<div class="cv-section">
  <h2>Teaching & Service</h2>
  <ul>
    <li>[Course / Role], [Institution], [Semester / Year]</li>
  </ul>
</div>
