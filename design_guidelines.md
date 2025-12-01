# Kerala Economic Forum (KEF) - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern startup websites (Stripe, Linear, Notion) combined with Kerala's cultural aesthetic. Premium, youthful business vibe with strong visual hierarchy.

## Brand Identity
**Logo**: KEF logo provided (red geometric design with text)
**Color Palette**: 
- Primary: KEF Red, Blue, Yellow, Charcoal (as per brand)
- Implementation: Subtle gradients, glassmorphism effects, gradient strokes
- Kerala-inspired accent colors for micro-elements

**Cultural Elements**: Integrate Kerala-inspired subtle background patterns (wave motifs, coconut leaf line art, abstract geometric shapes) at 5-10% opacity throughout the site.

## Core Design Principles

### Visual Style
- **Glassmorphism + Neumorphism Blend**: Frosted glass cards with soft shadows, translucent overlays, subtle depth
- **Premium Startup Aesthetic**: Clean, modern, sophisticated - not corporate or template-like
- **Floating Elements**: Cards and components should feel lifted with soft shadow depth
- **Rounded Components**: Generous border radius (12-24px) on all major elements
- **Gradient Strokes**: Accent borders with subtle KEF color gradients
- **Wave Transitions**: Curved SVG dividers between major sections

### Layout System
**Spacing**: Tailwind units of 4, 8, 12, 16, 20, 24, 32 for consistent rhythm
**Section Padding**: py-20 to py-32 on desktop, py-12 to py-16 on mobile
**Max Width**: max-w-7xl for main containers, max-w-6xl for content sections

## Typography
**Hierarchy**:
- Hero Headlines: 4xl-6xl, bold, dramatic letter-spacing
- Section Titles: 3xl-4xl, semi-bold
- Subheadings: xl-2xl, medium weight
- Body: base-lg, regular
- Captions: sm-base, light

**Font Selection**: Modern sans-serif (Inter, Plus Jakarta Sans, or Outfit) for clean, startup feel

## Component Library

### Hero Section (Home)
- **Large Hero** (80-90vh): Full-width with KEF logo integration
- **Hero Image**: Abstract entrepreneurship/technology themed image with gradient overlay matching KEF colors
- **Frosted CTA Buttons**: Semi-transparent backgrounds with blur effects on image
- **Floating Stat Cards**: Glassmorphic cards displaying key metrics with animated counters

### Navigation
- **Sticky Navbar**: Frosted glass background with backdrop-blur
- **Active Link Animation**: Underline slide-in effect with KEF brand color
- **Mobile**: Slide-in drawer with smooth transitions

### Program Cards
- **Floating Card Design**: White/glass cards with subtle shadows, hover lift effect (translate-y)
- **Icon Integration**: Line icons with gradient fills matching KEF colors
- **3D Tilt Effect**: Subtle perspective transform on hover for hero cards

### Impact Metrics Section
- **Animated Counters**: Numbers increment on scroll-into-view
- **Large Display**: 4-column grid on desktop (2-col tablet, 1-col mobile)
- **Gradient Backgrounds**: Subtle radial gradients behind each metric

### Event Cards
- **Image + Content**: Event thumbnail, title, date, location, short description
- **Hover Glow**: Soft glow effect with KEF accent colors
- **CTA Integration**: "Register" or "Learn More" buttons with gradient fills

### Partner Showcase
- **Logo Grid**: 4-6 columns, grayscale logos with color-on-hover
- **Glassmorphic Container**: Frosted background for partner section

### Forms (Contact, Registration)
- **Input Fields**: Rounded borders, subtle shadows, focus state with KEF accent color
- **Glassmorphic Background**: Form containers with frosted effect
- **Firebase Auth UI**: Custom-styled Google sign-in button matching brand

## Animation Specifications

### Scroll Animations (Extensive Use)
- **Fade-in**: Elements fade and slide up as they enter viewport
- **Staggered Reveals**: List items and cards animate in sequence (50-100ms delay)
- **Parallax Backgrounds**: Background elements move slower than foreground (0.3-0.5x scroll speed)
- **Floating Elements**: Continuous subtle up-down motion (10-20px range)

### Hover Interactions
- **Card Lift**: transform translateY(-8px) with shadow increase
- **Glow Effects**: Soft box-shadow with KEF colors
- **Icon Animations**: Subtle rotate or scale on hover

### Page Transitions
- **Smooth Anchor Scroll**: Ease-in-out transitions between sections
- **Route Changes**: Fade transitions between pages

**Animation Timing**: All animations 300-600ms with ease-in-out curves. Premium feel, not cartoonish.

## Background Enhancements
- **Dotted Patterns**: Subtle dot grids in section backgrounds (opacity 5%)
- **Wave Illustrations**: Kerala-style waves as decorative elements
- **Geometric Shapes**: Abstract circles/triangles as floating background elements
- **Glowing Particles**: Rare use of subtle light particles for hero sections

## Images Strategy

### Hero Sections
- **Home Hero**: Large entrepreneurship/innovation themed image with gradient overlay
- **About Hero**: Team collaboration or Kerala landscape with modern overlay
- **Programs Hero**: Workshop/mentoring scene
- **Events Hero**: Conference/networking event scene

### Content Images
- **Program Cards**: Icon illustrations or abstract graphics
- **Team Section**: Professional headshots with subtle border treatments
- **Event Cards**: Event photography thumbnails
- **Partner Logos**: Company/institution logos

## Page-Specific Layouts

### Home (10 Sections)
1. Large hero with image, headline, 3 CTAs, animated tagline
2. Welcome intro (2-column: text + illustration)
3. Focus areas (6-icon grid with descriptions)
4. Signature programs (3-4 featured cards)
5. Impact metrics (animated counter grid)
6. Upcoming events (horizontal scroll cards)
7. Testimonials/Success stories (carousel)
8. Partner showcase (logo grid)
9. Newsletter signup (glassmorphic form)
10. Rich footer (multi-column with links, contact, social)

### About Us (6 Sections)
- Hero, Mission/Vision split, Objectives list, Why Kerala needs KEF, Leadership team grid, Partner CTA

### Programs (8 Program Sections)
- Each program gets dedicated card with icon, description, outcome, CTA
- Tabbed or accordion navigation for program categories

### Multi-Column Strategy
- **Desktop**: 2-4 columns for features, metrics, team, partners
- **Tablet**: Max 2 columns
- **Mobile**: Single column stacking

## Accessibility
- WCAG AA compliant color contrast on all text
- Focus states visible on all interactive elements
- Semantic HTML structure
- Alt text for all images

## Mobile Optimization
- Touch-friendly button sizes (min 44x44px)
- Simplified animations on mobile (reduce parallax, floating effects)
- Stacked layouts with adequate spacing
- Mobile nav: full-screen overlay or slide-in drawer

---

**Overall Feel**: The website should feel like a modern, premium startup platform with Kerala's cultural warmth. Every interaction should be smooth, every section should have purpose, and the design should inspire entrepreneurs while maintaining professional credibility. Rich, feature-complete, visually striking - not minimal or sparse.