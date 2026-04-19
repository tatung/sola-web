---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
title: ""
classes: landing-page
---
<div class="research-slider research-slider--fullbleed" data-autoplay-ms="4500" aria-label="Featured research slider">
	<div class="research-slider__viewport">
		{% assign slider_items = site.research | sort: "order" %}
		{% for item in slider_items limit: 10 %}
			{% if item.image %}
			<a class="research-slide{% if forloop.first %} is-active{% endif %}" href="{{ item.url | relative_url }}" aria-hidden="{% unless forloop.first %}true{% else %}false{% endunless %}">
				<img src="{{ item.image }}" alt="{{ item.title }}" loading="lazy" />
				<div class="research-slide__caption">
					<strong>{{ item.title }}</strong>
					<span>{{ item.venue }}</span>
				</div>
			</a>
			{% endif %}
		{% endfor %}
		<div class="research-slider__dots" role="tablist" aria-label="Research image selector"></div>
		<button class="research-slider__nav research-slider__nav--prev" type="button" data-slider-prev aria-label="Previous slide">＜</button>
		<button class="research-slider__nav research-slider__nav--next" type="button" data-slider-next aria-label="Next slide">＞</button>
	</div>
</div>

SoLa (Soft Lab) explores research at the intersection of digital fabrication, soft robotics, learning-based robotics, and human-computer interaction.

The group is led by **Tung D. Ta**, currently an Associate Professor at Keio University (SFC), with previous appointments at The University of Tokyo.

## Research Focus

- Data-driven and foundation-model-based methods for soft robot design
- Printable and flexible electronics for robotic systems
- Fabrication-aware mechanisms for locomotion and manipulation
- Human-centered interactive systems with novel physical interfaces
