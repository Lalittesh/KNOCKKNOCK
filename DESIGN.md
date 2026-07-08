---
name: Warm Neighborly Luxury
colors:
  surface: '#f8faf6'
  surface-dim: '#d8dbd7'
  surface-bright: '#f8faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f1'
  surface-container: '#eceeeb'
  surface-container-high: '#e7e9e5'
  surface-container-highest: '#e1e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#404944'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#eff1ee'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#006686'
  on-secondary: '#ffffff'
  secondary-container: '#7ed4fd'
  on-secondary-container: '#005b78'
  tertiary: '#4c125b'
  on-tertiary: '#ffffff'
  tertiary-container: '#652c73'
  on-tertiary-container: '#dd9ae9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#c0e8ff'
  secondary-fixed-dim: '#7bd1fa'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d66'
  tertiary-fixed: '#fcd6ff'
  tertiary-fixed-dim: '#f3aeff'
  on-tertiary-fixed: '#340042'
  on-tertiary-fixed-variant: '#682f76'
  background: '#f8faf6'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
typography:
  display-hero:
    fontFamily: Epilogue
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 52px
    fontWeight: '600'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  section-title:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 24px
  margin-desktop: 64px
  stack-xl: 128px
  stack-lg: 80px
  stack-md: 40px
---

## Brand & Style

This design system is built on the philosophy of "Emotional Precision." It merges the high-fidelity craftsmanship of premium hardware brands with the warmth of a close-knit neighborhood community. The aesthetic is rooted in **Editorial Luxury**—treating community interactions with the same visual reverence as a high-end lifestyle magazine.

The visual language is human-centric and minimal. It avoids the coldness of typical tech products by using a warm base palette and organic, oversized structural elements. The design style is a sophisticated blend of **Minimalism** and **Glassmorphism**, emphasizing high-quality 3D assets, generous whitespace, and a "handcrafted" feel where every margin and radius feels intentional. The emotional response should be one of safety, belonging, and quiet sophistication.

## Colors

The palette is anchored by a Warm White (`#FAFAF7`) background, providing a paper-like texture that feels more approachable than pure white. 

- **Primary Emerald Green:** Used for core brand moments and primary actions, symbolizing growth and stability.
- **Secondary Sky Blue:** Used for supportive information and atmospheric backgrounds.
- **Accents (Coral, Orange, Lavender):** These "Human Tones" are used sparingly for status indicators, notification badges, and community tags to inject vitality.
- **Gradients:** Use ultra-soft, multi-stop mesh gradients for background blurs and card surfaces. Gradients should transition between the Primary Emerald and Secondary Sky Blue with extremely high transparency.

## Typography

The typography follows an editorial scale. **Epilogue** provides a geometric yet warm character for headings, utilizing tight letter spacing to create a high-fashion, "locked-in" look. **Plus Jakarta Sans** is used for body and labels to maintain a friendly, legible, and contemporary feel.

Hierarchy is maintained through dramatic shifts in scale rather than just weight. Hero headings should be treated as graphic elements, often spanning the full width of the content container. Body text uses generous line heights (1.5x - 1.6x) to ensure a comfortable, "literary" reading experience.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with an 8-point rhythm. The layout philosophy is "Breathe." Whitespace is not empty space; it is a structural tool used to group neighborhood stories and community events.

- **Desktop:** A 12-column grid with wide 32px gutters. Vertical spacing between sections (Stack XL) is intentionally large (128px) to create a premium, unhurried pace.
- **Mobile:** A 4-column grid with 24px side margins. Large headings should use the `-mobile` variants to prevent awkward word breaks.
- **Alignment:** Content should predominantly be center-aligned or use staggered "masonry" layouts for community feeds to avoid the rigidity of traditional SaaS dashboards.

## Elevation & Depth

Depth is achieved through a combination of **Glassmorphism** and **Ambient Shadows**.

1.  **The Base:** The Warm White background stays flat.
2.  **The Glass Layer:** Floating panels (cards, navigation bars) use a 20px - 40px backdrop blur with a semi-transparent white fill (80% opacity). They feature a subtle 1px inner border (white, 20% opacity) to catch the light.
3.  **The Shadow:** Elements utilize "Object Shadows"—extremely diffused, large-radius shadows (e.g., `blur: 60px, y: 20px`) with a low-opacity Stone or Emerald tint (`#78716C` at 5-8% opacity). This creates a realistic "lifted off the page" effect without looking muddy.

## Shapes

The shape language is defined by "Super-ellipses." We avoid sharp corners entirely to maintain the brand's friendly and human persona.

- **Primary Containers:** 28px corner radius.
- **Buttons and Chips:** Fully pill-shaped or 20px radius.
- **Interactive States:** When hovered, elements should subtly "swell" using a 1.02x scale transform rather than just changing color.
- **Organic Elements:** Background decorative elements should be non-geometric, organic blobs that use the secondary and accent color gradients.

## Components

### Buttons
Primary buttons are pill-shaped, using the Emerald Green background with white text. They should have a subtle inner glow. Secondary buttons use the glassmorphic style (frosted blur) with a thin Stone-colored border.

### Cards
Cards are the heart of this system. They must not look like standard cards. Use a 28px radius, no visible outer border, and a deep ambient shadow. Content within cards should have internal padding of at least 40px. Use high-quality 3D/isometric icons in the top-right corner to indicate card category.

### Input Fields
Fields are oversized with a 20px radius. The background is a slightly darker Stone-tinted off-white. On focus, the field should transition to a white background with a soft Emerald outer glow.

### Chips & Tags
Used for community interests (e.g., "Gardening," "Local News"). These should be pill-shaped with a 1px solid border matching the accent color, and a background that is 10% opacity of that same color.

### Community Lists
Lists should not use dividers. Use vertical spacing and subtle background shifts (alternating between Warm White and Stone Off-White) to separate items.

### Floating Navigation
The main navigation should be a floating glassmorphic bar at the bottom or top of the viewport, with a high blur radius and pill-shaped active states.