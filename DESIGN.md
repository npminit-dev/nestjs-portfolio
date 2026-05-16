---
name: Jorge Balsamo Portfolio
description: A professional, elegant personal portfolio website. Clean, corporate-friendly, and refined. Focus on value proposition with short, punchy creative copy.
version: "1.0"
---

## Overview

This is a personal portfolio website for Jorge Balsamo, a fullstack developer. The design should feel:
- **Elegant and sophisticated** - not flashy or techy
- **Corporate-friendly** - "sellable" to business clients
- **Professional** - conveys trustworthiness and expertise
- **Refined** - premium feel with subtle animations

Avoid the previous sci-fi aesthetic with sound effects. This is a more mature, polished approach.

## Colors

**IMPORTANT: This is a DARK theme**. Use dark backgrounds with light text. The palette should feel premium, elegant, and sophisticated - not harsh or high contrast.

### Primary Palette (Dark Theme)
- **Background** (`#0A0A0B`): Main page background - deep black
- **Surface** (`#141416`): Cards and elevated elements
- **Surface Elevated** (`#1C1C1F`): Higher elevation surfaces
- **Text Primary** (`#F5F5F5`): Main headings and important text
- **Text Secondary** (`#A3A3A3`): Body text and descriptions
- **Text Muted** (`#737373`): Captions, labels, subtle info

### Accent
- **Primary Accent** (`#14B8A6`): Sophisticated teal - main accent color (lighter for dark bg)
- **Primary Accent Hover** (`#2DD4BF`): Hover states
- **Primary Accent Light** (`#14B8A620`): Subtle backgrounds, highlights (with transparency)
- **Primary Accent Muted** (`#14B8A610`): Very subtle backgrounds
- **Secondary Accent** (`#F59E0B`): Warm amber - sophisticated accent for emphasis
- **Secondary Accent Hover** (`#FBBF24`): Hover states
- **Secondary Accent Light** (`#F59E0B20`): Subtle highlights
- **Secondary Accent Muted** (`#F59E0B10`): Very subtle backgrounds

### Neutrals (Dark)
- **Gray 950** (`#030303`): Deepest background
- **Gray 900** (`#0A0A0B`): Main background
- **Gray 800** (`#141416`): Surface
- **Gray 700** (`#1C1C1F`): Elevated
- **Gray 600** (`#27272A`): Borders
- **Gray 500** (`#3F3F46`): Subtle borders
- **Gray 400** (`#71717A`): Placeholder text
- **Gray 300** (`#A1A1AA`): Secondary text

## Typography

Use clean, professional fonts that work well for corporate contexts.

### Font Families
- **Headings**: `'Playfair Display', Georgia, serif` - elegant, distinctive
- **Body**: `'Inter', system-ui, -apple-system, sans-serif` - clean, readable
- **Mono**: `'JetBrains Mono', monospace` - code snippets

### Typography Scale
- **Display** (`48px`, `700`, `1.1`): Hero section main headline
- **H1** (`36px`, `600`, `1.2`): Section titles
- **H2** (`28px`, `600`, `1.3`): Subheadings
- **H3** (`20px`, `500`, `1.4`): Card titles
- **Body Large** (`18px`, `400`, `1.6`): Important body text
- **Body** (`16px`, `400`, `1.6`): Standard body text
- **Small** (`14px`, `400`, `1.5`): Captions, labels
- **Tiny** (`12px`, `500`, `1.4`): Tags, metadata

## Layout

### Spacing Scale (base: 4px)
- **xs** (`4px`): Tight spacing
- **sm** (`8px`): Component internal spacing
- **md** (`16px`): Standard gaps
- **lg** (`24px`): Section padding
- **xl** (`32px`): Large gaps
- **2xl** (`48px`): Section spacing
- **3xl** (`64px`): Major section breaks
- **4xl** (`96px`): Hero spacing

### Container
- **Max width**: `1200px`
- **Side padding**: `24px` (mobile: `16px`)
- **Content max**: `800px` for text-heavy sections

### Grid
- **Mobile**: Single column
- **Tablet**: 2 columns
- **Desktop**: 12-column grid system

## Shapes

### Border Radius
- **none** (`0`): Sharp edges for specific elements
- **sm** (`4px`): Subtle rounding
- **md** (`8px`): Standard buttons
- **lg** (`12px`): Cards
- **xl** (`16px`): Large cards
- **full** (`9999px`): Pills, avatars

### Shadows
- **sm** (`0 1px 2px rgba(0,0,0,0.05)`): Subtle
- **md** (`0 4px 6px -1px rgba(0,0,0,0.1)`): Cards
- **lg** (`0 10px 15px -3px rgba(0,0,0,0.1)`): Elevated
- **none**: Prefer borders over shadows for cleaner look

## Motion

Animation is central to this project - use GSAP extensively with many animations throughout the site. They must all feel elegant, sophisticated, and professional. Motion should enhance the experience, not distract from it.

### Durations
- **instant** (`100ms`): Immediate feedback
- **fast** (`150ms`): Micro-interactions, hover states
- **normal** (`300ms`): Standard transitions
- **slow** (`500ms`): Section reveals, hero animations
- **slower** (`800ms`): Complex, dramatic reveals

### Easing
- **default**: `cubic-bezier(0.4, 0, 0.2, 1)` - smooth
- **ease-out**: `cubic-bezier(0, 0, 0.2, 1)` - natural exit
- **ease-in-out**: `cubic-bezier(0.4, 0, 0.2, 1)` - smooth all the way
- **elegant**: `cubic-bezier(0.22, 1, 0.36, 1)` - refined, premium feel

### Animation Guidelines
- **Many animations are encouraged** - this site should be rich in motion
- **Scroll-triggered animations** - use GSAP ScrollTrigger extensively
- **Parallax effects** - subtle depth movement on scroll
- **Stagger effects** - text and elements can reveal in elegant sequences
- **Page transitions** - smooth, sophisticated route changes
- **Micro-interactions** - buttons, links, cards should respond elegantly
- **No bouncing, springing, or playful animations** - always refined
- **Motion must feel intentional and controlled** - every animation serves a purpose
- **Avoid "techy" or "gamer" effects** - think premium, not flashy

## Components

### Navigation
- **Style**: Minimal, transparent background that becomes solid on scroll
- **Behavior**: Hidden after 3 seconds of inactivity, shows on mouse movement or keyboard
- **Logo**: Text-based, elegant
- **Links**: Clean, uppercase small text

### Hero Section
- **Layout**: Centered content, generous vertical space
- **Headline**: Large, serif font - impactful but elegant
- **Subtext**: Clean sans-serif, muted color
- **CTA**: Subtle button with accent color

### Cards
- **Background**: White with subtle border
- **Padding**: `24px`
- **Border**: `1px solid #E5E5E5`
- **Radius**: `12px`
- **Hover**: Subtle border color change, no shadow

### Buttons
- **Primary**: Accent background, white text, `8px` radius
- **Secondary**: Transparent, accent text, accent border
- **Hover**: Slight background shift, smooth transition

### Contact Section
- **Style**: Clean form with minimal fields
- **Inputs**: Clean borders, subtle focus state
- **Submit**: Primary button style

## Do's

- Use serif fonts for headings to convey elegance
- Keep plenty of whitespace - breathe
- Use accent color sparingly - quality over quantity
- Animate elements subtly - refinement over impact
- Focus on value proposition in copy
- Make it feel premium and sophisticated
- Use semantic HTML for accessibility
- Implement proper SEO meta tags

## Don'ts

- Don't use flashy, techy aesthetics
- Don't add sound effects or playful animations
- Don't use bright, saturated accent colors
- Don't crowd content - use generous spacing
- Don't use more than 2 font weights on any screen
- Don't use heavy shadows - prefer subtle borders
- Don't make it feel "gamer" or "sci-fi"
- Don't prioritize impact over elegance