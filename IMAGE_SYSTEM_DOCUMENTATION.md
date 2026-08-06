# Image Functionality System - Documentation

This documentation explains the comprehensive image system implemented in your Shopify theme.

## Overview

The image system provides:
- **Reusable image settings** for both sections and blocks
- **Consistent functionality** across all image implementations
- **Full customization** including aspect ratios, hover effects, overlays, and more
- **Mobile-responsive** images with separate mobile image support

## Components

### 1. `snippets/image.liquid` (Core Image Renderer)

The main image rendering snippet with full functionality.

**Parameters:**
- `image` - Desktop image
- `mobile_image` - Optional mobile image (shown < 768px)
- `url` - Optional link destination
- `class` - Additional CSS classes
- `aspect_ratio` - 'adapt', 'square', 'portrait', 'landscape', 'wide'
- `object_fit` - 'cover' or 'contain'
- `hover_effect` - 'none', 'zoom', 'lift', 'fade'
- `loading` - 'lazy' or 'eager'
- `alt` - Custom alt text
- `overlay_color` - Overlay color (e.g., rgba(0,0,0,0.4))
- `overlay_opacity` - Overlay opacity (0-100)

**Example:**
```liquid
{% render 'image',
  image: section.settings.banner_image,
  mobile_image: section.settings.banner_mobile_image,
  url: section.settings.banner_link,
  aspect_ratio: 'wide',
  hover_effect: 'zoom',
  overlay_opacity: 30
%}
```

### 2. `snippets/image-schema.liquid` (Schema Generator)

Generates standard image settings JSON for use in section/block schemas.

**Parameters:**
- `prefix` - Prefix for setting IDs (e.g., 'hero_' creates 'hero_image', 'hero_link', etc.)
- `label_prefix` - Prefix for setting labels
- `include_mobile` - Include mobile image picker (default: true)
- `include_link` - Include link field (default: true)
- `include_alt` - Include alt text (default: true)
- `include_aspect_ratio` - Include aspect ratio selector (default: true)
- `include_object_fit` - Include object fit selector (default: true)
- `include_hover_effect` - Include hover effect selector (default: true)
- `include_loading` - Include loading strategy (default: true)
- `include_overlay` - Include overlay settings (default: true)

**Example in Schema:**
```liquid
{% schema %}
{
  "name": "My Section",
  "settings": [
    {% render 'image-schema', prefix: 'banner_', label_prefix: 'Banner ' %}
  ]
}
{% endschema %}
```

This generates settings like:
- `banner_image`
- `banner_mobile_image`
- `banner_link`
- `banner_aspect_ratio`
- etc.

### 3. `snippets/block-image.liquid` (Block Image Wrapper)

Wrapper for rendering images from block/section settings with prefix support.

**Parameters:**
- `settings` - The settings object (block.settings or section.settings)
- `prefix` - Setting prefix (e.g., 'banner_')
- `shopify_attributes` - Optional block.shopify_attributes

**Example:**
```liquid
{% render 'block-image',
  settings: section.settings,
  prefix: 'hero_',
  shopify_attributes: block.shopify_attributes
%}
```

### 4. `blocks/image.liquid` (Image Block)

Standalone image block that can be added to any section supporting app blocks.

**Features:**
- All image settings built-in
- Can be added via theme editor
- Fully customizable per instance

## Usage Examples

### Example 1: Simple Section with One Image

```liquid
<section>
  <div class="container">
    {% render 'block-image',
      settings: section.settings,
      prefix: 'hero_'
    %}
  </div>
</section>

{% schema %}
{
  "name": "Hero Section",
  "settings": [
    {% render 'image-schema', prefix: 'hero_', label_prefix: 'Hero ' %}
  ]
}
{% endschema %}
```

### Example 2: Section with Multiple Images

```liquid
<section>
  <div class="two-column">
    <div class="column">
      {% render 'block-image',
        settings: section.settings,
        prefix: 'left_'
      %}
    </div>
    <div class="column">
      {% render 'block-image',
        settings: section.settings,
        prefix: 'right_'
      %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Two Images",
  "settings": [
    {
      "type": "header",
      "content": "Left Image"
    },
    {% render 'image-schema', prefix: 'left_', label_prefix: 'Left ' %},
    {
      "type": "header",
      "content": "Right Image"
    },
    {% render 'image-schema', prefix: 'right_', label_prefix: 'Right ' %}
  ]
}
{% endschema %}
```

### Example 3: Custom Settings (Minimal)

If you don't need all settings, you can disable some:

```liquid
{% schema %}
{
  "name": "Simple Image",
  "settings": [
    {% render 'image-schema',
      prefix: 'img_',
      include_mobile: false,
      include_hover_effect: false,
      include_overlay: false
    %}
  ]
}
{% endschema %}
```

### Example 4: Using Image Block in Custom Section

Your `sections/custom-section.liquid` already supports app blocks, so users can add the Image block directly:

```liquid
{% schema %}
{
  "name": "Custom Section",
  "blocks": [{ "type": "@theme" }]
}
{% endschema %}
```

Users can then add the **Image** block through the theme editor.

## Image Settings Reference

### Aspect Ratios
- **Default (global)** - Uses theme-wide setting
- **Adapt to image** - Uses the image's natural aspect ratio
- **Square (1:1)** - Perfect square
- **Portrait (2:3)** - Vertical orientation
- **Landscape (4:3)** - Horizontal orientation
- **Wide (16:9)** - Ultra-wide format

### Object Fit
- **Cover** - Fills container, may crop image
- **Contain** - Shows entire image, may add letterboxing

### Hover Effects
- **None** - No hover effect
- **Zoom** - Scales up image on hover
- **Lift** - Raises image with shadow
- **Fade** - Reduces opacity on hover

### Loading Strategy
- **Lazy** - Loads when scrolling into view (default)
- **Eager** - Loads immediately (use for above-the-fold images)

## Global Theme Settings

Add these to your `config/settings_schema.json` for theme-wide defaults:

```json
{
  "name": "Images",
  "settings": [
    {
      "type": "select",
      "id": "image_default_ratio",
      "label": "Default Aspect Ratio",
      "options": [
        { "value": "adapt", "label": "Adapt to image" },
        { "value": "square", "label": "Square" },
        { "value": "portrait", "label": "Portrait" },
        { "value": "landscape", "label": "Landscape" },
        { "value": "wide", "label": "Wide" }
      ],
      "default": "adapt"
    },
    {
      "type": "select",
      "id": "image_default_fit",
      "label": "Default Image Fit",
      "options": [
        { "value": "cover", "label": "Cover" },
        { "value": "contain", "label": "Contain" }
      ],
      "default": "cover"
    },
    {
      "type": "select",
      "id": "image_hover_effect",
      "label": "Default Hover Effect",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "zoom", "label": "Zoom" },
        { "value": "lift", "label": "Lift" },
        { "value": "fade", "label": "Fade" }
      ],
      "default": "none"
    }
  ]
}
```

## Best Practices

1. **Use prefixes** when you have multiple images in one section
2. **Set loading to 'eager'** for above-the-fold images
3. **Provide mobile images** for better mobile experience
4. **Always provide alt text** for accessibility
5. **Use appropriate aspect ratios** based on your design
6. **Test hover effects** on different devices

## Files Modified

- `snippets/image.liquid` - Core image renderer (already existed, unchanged)
- `snippets/image-schema.liquid` - NEW: Schema generator
- `snippets/block-image.liquid` - Updated to use image snippet
- `blocks/image.liquid` - Updated to use image-schema
- `assets/global.css` - Added image block styles
- `sections/image-with-text-example.liquid` - NEW: Example section

## Troubleshooting

### Images not showing
- Check that the image is uploaded in the theme editor
- Verify the prefix matches between schema and render calls

### Settings not appearing
- Make sure commas are correct in JSON schema
- Check that image-schema is being rendered inside the settings array

### Hover effects not working
- Ensure global.css is loaded
- Check browser console for CSS errors

### Mobile images not switching
- Verify mobile_image is set in the theme editor
- Check responsive breakpoint (768px default)

## Support

For issues or questions:
1. Check the example section: `sections/image-with-text-example.liquid`
2. Verify your schema syntax with the Shopify theme validator
3. Check browser console for JavaScript/CSS errors
