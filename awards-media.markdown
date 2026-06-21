---
layout: single
title: ""
permalink: /awards-media/
---
{% assign awards_media_items = site.data.awards_media | sort: "date" | reverse %}

## Awards

{% assign awards = awards_media_items | where: "category", "award" %}
{% for item in awards %}
- {{ item.year }}: {{ item.text }}
{% endfor %}

## Press Releases

{% assign press_releases = awards_media_items | where: "category", "press" %}
{% for item in press_releases %}
- {{ item.year }}: Press release: [{{ item.text }}]({{ item.url }})
{% endfor %}

## Media Coverage

{% assign media_coverage = awards_media_items | where: "category", "media" %}
{% for item in media_coverage %}
{% if item.url %}
- {{ item.year }}: [{{ item.text }}]({{ item.url }})
{% else %}
- {{ item.text }}
{% endif %}
{% endfor %}
