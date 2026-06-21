---
layout: single
title: ""
permalink: /news/
---

## Latest News

{% assign latest_news = site.data.news | sort: "date" | reverse %}
{% for item in latest_news %}
- {{ item.date }}: [{{ item.title }}]({{ item.url }})
{% endfor %}

<!-- ## Announcements

- Student recruitment: Master/PhD opportunities are announced on [tungtd.com](https://tungtd.com/).
- For complete historical updates, visit the Notion news board: [SOLA News](https://tatung2112.notion.site/1bfd1602ac604bbfac175ddd4e68516a?v=5534f74ea30440e6b937d053d6ea2c97) -->
