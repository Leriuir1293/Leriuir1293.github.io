---
layout: page
title: Contact
permalink: /contact/
---

<div class="contact-grid">
  <div class="contact-item">
    <h3>Email</h3>
    {% if site.data.profile.email != "" %}
    <p><a href="mailto:{{ site.data.profile.email }}">{{ site.data.profile.email }}</a></p>
    {% else %}
    <p><em>Add your email in <code>_data/profile.yml</code></em></p>
    {% endif %}
  </div>

  <div class="contact-item">
    <h3>Location</h3>
    <p>{{ site.data.profile.location | default: "City, Country" }}</p>
  </div>

  <div class="contact-item">
    <h3>Links</h3>
    <ul class="contact-links">
      {% if site.data.profile.links.github != "" %}
      <li><a href="{{ site.data.profile.links.github }}" target="_blank" rel="noopener">GitHub</a></li>
      {% endif %}
      {% if site.data.profile.links.google_scholar != "" %}
      <li><a href="{{ site.data.profile.links.google_scholar }}" target="_blank" rel="noopener">Google Scholar</a></li>
      {% endif %}
      {% if site.data.profile.links.semantic_scholar != "" %}
      <li><a href="{{ site.data.profile.links.semantic_scholar }}" target="_blank" rel="noopener">Semantic Scholar</a></li>
      {% endif %}
      {% if site.data.profile.links.orcid != "" %}
      <li><a href="{{ site.data.profile.links.orcid }}" target="_blank" rel="noopener">ORCID</a></li>
      {% endif %}
      {% if site.data.profile.links.dblp != "" %}
      <li><a href="{{ site.data.profile.links.dblp }}" target="_blank" rel="noopener">DBLP</a></li>
      {% endif %}
      {% if site.data.profile.links.twitter != "" %}
      <li><a href="{{ site.data.profile.links.twitter }}" target="_blank" rel="noopener">Twitter / X</a></li>
      {% endif %}
      {% if site.data.profile.links.linkedin != "" %}
      <li><a href="{{ site.data.profile.links.linkedin }}" target="_blank" rel="noopener">LinkedIn</a></li>
      {% endif %}
    </ul>
  </div>
</div>

<p style="margin-top:2rem; color: var(--color-text-muted); font-size: 0.9rem;">
  Feel free to reach out about research collaborations, paper discussions, or open-source projects.
</p>
