# Project: Personal Portfolio Website

## Tech Stack
- **Framework**: Nuxt 4 (latest)
- **Language**: TypeScript
- **CSS**: Plain CSS with modern features (CSS nesting, CSS variables, scoped styles)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Icons**: @primeicons/vue (300+ SVG icons)

## Project Structure
- `app/app.vue` - Main application component
- `nuxt.config.ts` - Nuxt configuration
- `package.json` - Dependencies
- `DESIGN.md` - Design system file for AI agents (colors, typography, components, rules)

## CSS Setup
- Styles must be in component files using `<style scoped>` tag
- CSS Nesting: Native browser support for nested selectors
- CSS Variables: Use variables from DESIGN.md for consistency
- Avoid external CSS files - keep styles with their components

## Vue API
- **MUST use Composition API** with `<script setup>` syntax
- Use `defineProps`, `defineEmits`, `ref`, `computed`, `watch`, etc.
- Avoid Options API unless absolutely necessary

## GSAP Usage
Use GSAP with ScrollTrigger. See GSAP skills for complete documentation:
- **gsap-core**: Core API, tweens, easing, duration
- **gsap-scrolltrigger**: Scroll-linked animations, pinning, scrub, triggers
- **gsap-timeline**: Sequencing animations, timelines
- **gsap-plugins**: Plugins like ScrollToPlugin, Flip, Draggable

## Project Goal
Create a professional, elegant personal website making extensive use of GSAP's most important features including:
- Smooth page transitions
- Scroll-triggered animations
- Interactive elements with refined motion design
- High-quality visual effects that enhance the user experience

## Design Direction

### Current State
- Sci-fi style with sound effects
- Attention-grabbing but polarizing

### Goal
- More elegant and sophisticated
- Corporate-friendly, "sellable"
- Focus on value proposition
- Short, creative copy

### Visual Style
- **IMPORTANT**: This is a DARK theme
- **Colors**: Dark background (#0A0A0B) with light text (#F5F5F5)
- **Typography**: Clean, professional fonts
- **Animations**: Subtle, elegant - convey professionalism
- Avoid flashy/techy in favor of refined, premium feel

### Content Approach
- Short, punchy creative phrases
- Highlight what value I can bring
- More approachable for corporate clients

## Technical Requirements

### Responsive Design
- Mobile-first approach
- Must work perfectly on all screen sizes

### Accessibility & SEO
- Use `@cv` to reference skills for accessibility and SEO best practices
- Implement proper ARIA labels, semantic HTML, keyboard navigation
- SEO: meta tags, structured data, sitemap optimization

### Internationalization
- Use `@nuxtjs/i18n` for Spanish/English support
- Language switcher available on the site

## Site Structure

### Pages (English names)
- **Home** (`/`) - Main landing page with all content
- **Contact** (`/contact`) - Contact information and form

### Contact Page
- **Layout**: Scroll-based (no route changes within the page)
- **Implicit Sections**:
  1. **Social Networks**: Links to LinkedIn, GitHub, etc.
  2. **Contact Form**: Professional form with animations
- Both sections are navigated via scroll
- Form should have GSAP animations (input focus, submit button, success/error states)

### Navigation
- **Top Navigation Bar**:
  - **Position**: Fixed at top of viewport (always visible, stuck to top)
  - Hidden on inactivity, shows on mouse/keyboard activity
  - Available on both pages
  - Contains links to Home and Contact
  - Language switcher (EN | ES) in navigation bar
- **Home Page Navigation**:
  - Scroll-based navigation (no route changes)
  - Implicit sections that the user scrolls through
  - Parallax effects and scroll-triggered animations
  - Contact link at the bottom (must scroll through to find it)

### Footer
- Elegant, minimal footer with copyright and small social icons
- Can be fixed at bottom or static at page end
- Does not compete with main content

### Animations (GSAP)
- Scroll-triggered animations using ScrollTrigger
- Parallax effects
- Smooth, controlled motion
- Elegant and subtle - reinforce professionalism

## Custom Agents

### CV Agent
- **Name**: `cv`
- **Location**: `.opencode/agents/cv.md`
- **Purpose**: Provides information about Jorge Balsamo's professional background, skills, experience, and projects
- **Usage**: Other agents can invoke `@cv` to get CV information when needed
- **Type**: subagent (read-only, no write/edit/bash permissions)

## Contact Form

### Server Action
- **Location**: `server/actions/contact.ts`
- **Framework**: Use Nuxt server actions (`defineAction`)
- **Email**: Use `nodemailer` for sending form submissions
- **Purpose**: Handle contact form submissions
- **Environment**: Use `.env` file for configuration (see below)
- **Response**: Return success/error state

### Environment Variables
- Create `.env` file at project root for local development
- Use `.env.example` as template for required variables
- Never commit secrets - use `.env` (already in .gitignore)

## Key Components

### Hero Section (`app/components/HeroSection.vue`)
- **Background**: Crimson (#B91C3C) radial gradients + grid (64px, 0.015 opacity, masked radial) + noise SVG (baseFrequency 2.5, overlay)
- **Particles**: 40 dots (1-3px) in crimson/rosy gold, float with GSAP (y: -18 to -6, x: -10 to 10, 3-5s, sine.inOut yoyo, no stagger, immediateRender: false)
- **Shapes**: 3 large subtle crimson circles — 2 outline (90vw, 65vw) + 1 radial fill (50vw). opacity 0.06-0.08
- **Circuit Trails** (`app/composables/useCircuitTrails.ts`): Canvas overlay on grid. Paths spawn at edges, bias toward center, no self-intersection. Config: tailPixels 100, maxPaths 12, spawnInterval ~90-270ms, drawDuration 1s (fixed regardless of path length), fadeSpeed 3.5
- **Text**: Eyebrow "Maker · Creative · Human", title + subtitle via SplitText, CTA text-link
- **Entry**: Highly overlapped GSAP timeline (~1.1s total). All elements start within 0.3s of each other
- **Scroll**: bg scales, all decorative elements fade out

### App Layout (`app/app.vue`)
- **ScrollSmoother**: desktop-only (>768px), disabled on prefers-reduced-motion, dynamic import to avoid SSR error
- **Scrollbar**: Hidden globally (webkit: display:none, Firefox: scrollbar-width:none, IE: -ms-overflow-style:none). Page stays scrollable
- **State sync**: `useState('smoother')` ensures smoother created before ScrollTrigger instances

### Custom Cursor (`app/components/CustomCursor.vue`)
- 3 elements: dot (4px, 30% opacity), ring (36px, backdrop-filter: invert(1)), trail (68px, border-only)
- Click-hold: 3 circles shrink to 0.8 with staggered cascade, overlap -=0.12, all 0.25s
- Interactive elements: cursor scales to 1.5 on hover
- Uses GSAP ticker for lerping, `isOverInteractive` flag for correct hover restore after click