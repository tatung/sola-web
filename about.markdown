---
layout: single
title: ""
permalink: /about/
---

SOLA Group explores research at the intersection of digital fabrication, soft robotics, and human-computer interaction.

The group is led by **Tung D. Ta**, currently an Associate Professor at Keio University (SFC), with previous appointments at The University of Tokyo.

## Research Focus

- Data-driven and foundation-model-based methods for soft robot design
- Printable and flexible electronics for robotic systems
- Fabrication-aware mechanisms for locomotion and manipulation
- Human-centered interactive systems with novel physical interfaces

## News

{% assign newest_news = site.data.news | sort: "date" | reverse | slice: 0, 5 %}
{% for item in newest_news %}
- {{ item.date }}: [{{ item.title }}]({{ item.url }})
{% endfor %}

<p style="text-align: right;"><a href="{{ '/news/' | relative_url }}">More</a></p>

## Awards and Media

{% assign newest_awards_media = site.data.awards_media | sort: "date" | reverse | slice: 0, 5 %}
{% for item in newest_awards_media %}
{% if item.url %}
- {{ item.year }}: [{{ item.text }}]({{ item.url }})
{% else %}
- {{ item.year }}: {{ item.text }}
{% endif %}
{% endfor %}

<p style="text-align: right;"><a href="{{ '/awards-media/' | relative_url }}">More</a></p>