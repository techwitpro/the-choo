# ☕ The Choo Cafe — Restaurant Landing Page

A modern, high-fidelity restaurant landing page crafted with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Exactly cloned with 100% design fidelity from the official Figma design, featuring rich interactivity, buttery-smooth animations, and mobile responsiveness.

---

## 🎨 Figma Design Source

- **Figma File**: [Techwitpro Website 2.0 (The Choo Cafe)](https://www.figma.com/design/FnHE2mmi2zeqOJa4Dm8ri5/Techwitpro-Website-2.0?node-id=6838-163&t=GSCSNDk5tq3bRDuU-0)
- **Target Node**: `6838-163`

---

## ✨ Features & Architecture

### 1. Interactive Components & Micro-Interactions
- **Navigation & Header**:
  - Transparent-to-frosted glass sticky navbar.
  - Quick-search modal and live shopping cart drawer with badge counter.
  - Mobile-responsive slide-out drawer.
- **Hero Section**:
  - Playfair Display 84px bold headline with golden accent highlights.
  - Floating roasted coffee bean decorative elements.
  - Dual-layer scroll indicator: continuously spinning circular typography with a stabilized, upright pulsing mouse icon.
  - One-click "Reserve A Table" booking trigger.
- **Experience / Taste Coffee**:
  - 5-image asymmetrical mosaic showcasing artisanal brews and cafe ambiance.
  - Smooth hover zoom transitions (`scale: 1.03`) without layout shifts.
  - Built-in full-screen **Lightbox Modal** with backdrop blur and keyboard `Escape` dismiss.
- **Why Us (Special Coffee)**:
  - 3 specialty feature cards: *Selected Coffee*, *Own Roasting*, *Best Quality*.
  - Dark teal `#283C4A` cards with subtle gold borders and spring elevation on hover.
- **Interactive Menu**:
  - 5 categorized tabs: *Brewed Coffee*, *Espresso Bar*, *Cold Brew & Iced*, *Pastries*, and *Desserts*.
  - Animated sliding underline powered by Framer Motion `layoutId="activeTabUnderline"`.
  - Live search filter and dietary tags (*All*, *Vegan*, *Gluten-Free*, *Nut-Free*).
  - Item detail customization modal with milk selection (Oat Milk, Almond Milk, Whole Milk, Soy Milk) and quantity controls.
- **Artisanal Snacks Section**:
  - 3 curated snack cards with price badges, customer ratings, and instant "Add to Order" action.
- **About Us Section**:
  - Custom coffee-cup cut-out imagery and roasted bean SVG backdrop.
  - Expandable "Read Our Full Story" interactive toggle.
- **High-Impact CTA Banner**:
  - Atmospheric dark banner with "Find A Location" and "Order Now" triggers.
- **Gallery & Instagram Social Feed**:
  - 3-column asymmetric gallery with full-screen lightbox preview.
  - 4-photo Instagram grid linking to social channels.
- **Comprehensive Footer**:
  - Opening hours, contact information, Armstrong BC location summary.
  - Interactive newsletter subscription form with validation feedback.
- **Interactive Modals**:
  - 📅 **Reservation Modal**: Date picker, time slot selector, guest count, dietary notes, and instant booking confirmation receipt.
  - 📍 **Location & Hours Modal**: Live embedded Google Map, one-click address clipboard copy, and phone/email contacts.
  - 🛒 **Cart Drawer**: Quantity adjustments, item deletion, subtotal/tax/total computation, and simulated checkout.
  - 🔍 **Lightbox Modal**: Full-resolution image preview.

---

## 🎨 Color Palette & Typography

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#F4F0E9` | Light warm cream page background |
| **Dark Slate** | `#111C24` | Primary deep brand color, headers & hero |
| **Honey Gold** | `#ECBA61` | Primary CTA buttons, badges & active highlights |
| **Gold Dark (Hover)** | `#D69E3D` | Interactive hover states |
| **Charcoal Teal** | `#283C4A` | Feature card & footer background |
| **Muted Text** | `#778088` | Secondary body text & descriptions |

### Typography
- **Headings**: `Playfair Display` (serif, elegant luxury aesthetic)
- **Body & UI**: `Poppins` (geometric sans-serif, clean readability)
- **Accents**: `Inter` (crisp data & metadata display)

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16.4](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Figma SVGs
- **Language**: TypeScript

---

## ⚡ Performance & Animation Optimizations

1. **Mature, High-End Editorial Motion**:
   - **Silky Easing Standard**: Standardized on high-end luxury cubic-bezier curve (`ease: [0.16, 1, 0.3, 1]`) for understated, buttery-smooth scroll reveals.
   - **Calm, Hypnotic Rotation**: Steady 28s circular scroll text rotation in the Hero with an upright mouse indicator that gently pulses.
   - **Subtle Photography Zoom**: High-end editorial image scaling on hover (`scale-[1.03]` with 700ms duration) without layout distortion.
   - **Interactive Menu Indicator**: Animated active tab underline with spring physics (`layoutId="activeTabUnderline"`).
2. **Sharp Image Streaming**:
   - High-resolution photography (up to 9MB originals) is automatically transcoded and streamed into modern WebP/AVIF formats, eliminating scroll stutter and main-thread decoding lag.
3. **Double-Opacity Elimination**:
   - Cleaned compound SVG opacities exported from Figma to ensure consistent contrast and prevent sudden visual popping during transitions.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- pnpm (recommended), npm, or yarn

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd the-choo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or the active port reported by Turbopack) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
the-choo/
├── app/
│   ├── favicon.ico             # Multi-resolution branded ICO (16x16, 32x32, 48x48)
│   ├── icon.svg                # Vector SVG favicon
│   ├── apple-icon.png          # 180x180 Apple touch icon
│   ├── globals.css             # Tailwind v4 theme & custom utilities
│   ├── layout.tsx              # Root layout & rich SEO / OpenGraph metadata
│   └── page.tsx                # Single-page restaurant landing application
├── components/
│   ├── Navbar.tsx              # Header, navigation & cart trigger
│   ├── Hero.tsx                # Hero section with dual-layer badge
│   ├── ExperienceSection.tsx   # Coffee tasting photo mosaic & lightbox
│   ├── WhyUsSection.tsx        # Specialty roasting feature cards
│   ├── MenuSection.tsx         # Tabbed menu, search & category filters
│   ├── SnacksSection.tsx       # Artisan snack showcases
│   ├── AboutSection.tsx        # Cafe history & story toggle
│   ├── CtaSection.tsx          # High-impact visit call-to-action banner
│   ├── GallerySection.tsx      # Asymmetric photo gallery
│   ├── InstagramSection.tsx    # Social photo grid
│   ├── Footer.tsx              # Brand footer & newsletter subscription
│   ├── CartDrawer.tsx          # Slide-out interactive shopping cart
│   ├── ReservationModal.tsx    # Table booking modal form
│   ├── LocationModal.tsx       # Google Maps location & opening hours
│   ├── ItemDetailModal.tsx     # Menu item customization & order dialog
│   └── LightboxModal.tsx       # Full-screen photo view
├── public/
│   ├── favicon.ico             # Static fallback favicon
│   ├── icon.svg                # Static vector icon
│   ├── apple-touch-icon.png    # Static apple touch icon
│   └── images/                 # Optimized images & SVG assets from Figma
├── package.json
└── README.md
```

---

## 📄 License

This project is created for demonstration and portfolio purposes inspired by The Choo Cafe design. All rights reserved.
