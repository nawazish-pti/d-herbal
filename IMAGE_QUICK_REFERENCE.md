# Image System - Quick Reference

## For Sections with Single Image

**In your section schema:**
```liquid
{% schema %}
{
  "name": "My Section",
  "settings": [
    {% render 'image-schema' %}
  ]
}
{% endschema %}
```

**In your section liquid:**
```liquid
{% render 'block-image', settings: section.settings %}
```

---

## For Sections with Multiple Images

**In your section schema:**
```liquid
{% schema %}
{
  "name": "My Section",
  "settings": [
    {
      "type": "header",
      "content": "Banner Image"
    },
    {% render 'image-schema', prefix: 'banner_', label_prefix: 'Banner ' %},
    {
      "type": "header",
      "content": "Background Image"
    },
    {% render 'image-schema', prefix: 'bg_', label_prefix: 'Background ' %}
  ]
}
{% endschema %}
```

**In your section liquid:**
```liquid
{% render 'block-image', settings: section.settings, prefix: 'banner_' %}
{% render 'block-image', settings: section.settings, prefix: 'bg_' %}
```

---

## For Advanced Custom Rendering

**Use the image snippet directly:**
```liquid
{% render 'image',
  image: section.settings.my_image,
  aspect_ratio: 'wide',
  hover_effect: 'zoom',
  overlay_opacity: 40,
  loading: 'eager'
%}
```

---

## For Blocks

**Blocks already have the Image block available!**

Just add to your section schema:
```liquid
{% schema %}
{
  "name": "My Section",
  "blocks": [{ "type": "@theme" }]
}
{% endschema %}
```

Then users can add the **Image** block in the theme editor.

---

## Common Settings

### Without Mobile Image or Overlay
```liquid
{% render 'image-schema',
  include_mobile: false,
  include_overlay: false
%}
```

### Minimal Settings (just image and link)
```liquid
{% render 'image-schema',
  include_mobile: false,
  include_aspect_ratio: false,
  include_object_fit: false,
  include_hover_effect: false,
  include_overlay: false
%}
```

---

## Example: Update Your Banner Section

**Replace this:**
```liquid
<div class="image_wrapper">
  {% render 'image', image: section.settings.banner_image, class: 'main_banner_image', width: 1600 %}
</div>
```

**With this (for more control):**
```liquid
{% render 'block-image', settings: section.settings, prefix: 'banner_' %}
```

**And update schema:**
```liquid
{% schema %}
{
  "name": "Banner",
  "settings": [
    {% render 'image-schema', prefix: 'banner_', label_prefix: 'Banner ' %}
  ]
}
{% endschema %}
```

Now users get:
✅ Desktop & mobile images
✅ Aspect ratio control
✅ Hover effects
✅ Image overlays
✅ Loading optimization
✅ Links on images
