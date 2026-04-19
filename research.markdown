---
layout: single
title: ""
permalink: /research/
---

Our research is at the intersection of **digital fabrication**, **soft robotics**, and **human-computer interaction**.

## Latest Works

<div class="research-grid">
{% assign research_items = site.research | sort: "order" %}
{% for item in research_items %}
  <a class="research-card" href="{{ item.url | relative_url }}">
    {% if item.image %}
    <img src="{{ item.image }}" alt="{{ item.title }}" loading="lazy" />
    {% endif %}
    <div class="research-card__body">
      <strong>{{ item.title }}</strong>
      <span class="research-card__venue">{{ item.venue }}</span>
    </div>
  </a>
{% endfor %}
</div>
