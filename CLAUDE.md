# Massage Sanctuary - Project Rules

## Design System: ALWAYS USE
This project uses the **"Cattaliya Sanctuary"** design system, derived from the Cattaliya Thai Massage brand (cattaliya-thai-massage.com).
- Design system docs: `design-system/design-system.md`
- Design tokens: `design-system/tokens.json`
- Stitch project ID: `4064867232962736419` (layout reference only)

**RULE: Always follow the design system when writing UI code.** This includes:
- Use Nunito Sans for body/labels, Marcellus for headlines, Bilbo Swash Caps for logo ONLY
- Primary: `#8e496a` (prune), Gold accent: `#c49a5c`, Surfaces: warm cream `#faf6f2`
- Dark prune sidebar (`#3a2030`) is the visual anchor — never make it light
- Gold accent for icons, sidebar CTA, highlights — use sparingly
- Follow the "No-Line" rule (no 1px borders, use background color shifts)
- Use tonal layering with prune-tinted shadows (`shadow-card`)
- Glassmorphism for sticky headers
- Pill-shaped buttons for CTAs, rounded-xl for cards and nav
- Never use pure black (#000000), use on_surface (#1e1b18)
- Generous white space (spacing.8 or spacing.10 for margins)

## Stitch MCP
The Stitch MCP server is configured in `.mcp.json` for fetching screens and generating UI from the Stitch project.

---

## Screens Reference (from Stitch)

All screen HTML files are stored in `stitch-screens/`. Use these as the source of truth for implementing each page.

### 1. Tableau de Bord - Desktop
- **File:** `stitch-screens/01-tableau-de-bord-desktop.html`
- **Screen ID:** `182a067db0514a43af8573fccad76de4`
- **Size:** 2560x2180 (Desktop)
- **Purpose:** Main management dashboard - daily operational overview and key metrics.
- **Key sections:**
  - Top app bar with search and user profile
  - KPI cards: Daily Revenue, Confirmed Appointments, Occupancy Rate
  - Upcoming appointments with color-coded cards
  - Revenue analytics chart
  - Client activity section
  - Quick action prompts
- **UI patterns:** Bento grid layout, card-based architecture, sticky header with glassmorphism, color-coded left border accents on appointments

### 2. Analyses & Statistiques - Desktop
- **File:** `stitch-screens/02-analyses-statistiques-desktop.html`
- **Screen ID:** `85b891e6066845c3b5e8f2fd09d3f2bf`
- **Size:** 2560x2428 (Desktop)
- **Purpose:** Deep-dive analytics portal for performance monitoring and business intelligence.
- **Key sections:**
  - "Performance Sanctuary" header with export button
  - Main KPI revenue chart (monthly revenue with trend)
  - Secondary analytics cards (client metrics, service performance)
  - Comparative analysis visualizations
  - Data export capabilities
- **UI patterns:** Asymmetric bento grid (8-col main chart), trend indicators with %, date range toggles, data visualization hover states

### 3. Gestion des Clients - Desktop
- **File:** `stitch-screens/03-gestion-clients-desktop.html`
- **Screen ID:** `9ed40e04980e40c0860ad73c588f81a3`
- **Size:** 2560x2048 (Desktop)
- **Purpose:** Client management and CRM for viewing/managing the client database.
- **Key sections:**
  - Client search bar + "Add Client" button
  - Stats overview: Total Clients (1,284), New This Month, Loyalty Rate
  - Sortable client list table (Client info, Last Visit, Preferences, Actions)
  - Status indicators and service history per client
- **UI patterns:** Editorial layout, multi-column grid table, color-coded loyalty indicators, expandable rows, icon-based actions

### 4. Tableau de Bord - Mobile
- **File:** `stitch-screens/04-tableau-de-bord-mobile.html`
- **Screen ID:** `b7de555628fa4f1aa051155afa24d6a5`
- **Size:** 780x2328 (Mobile)
- **Purpose:** Condensed mobile dashboard for on-the-go management.
- **Key sections:**
  - Sticky header with Quick Booking button
  - Greeting + current metrics (Daily Revenue, Appointments, Occupancy %)
  - Next appointments cards
  - End-of-day note/reminder
  - Bottom navigation bar (Home, Calendar, Clients, Therapists, Services)
- **UI patterns:** Stacked vertical layout, 2-column bento grid for metrics, fixed bottom nav with filled active icon

### 5. Gestion de l'Equipe - Desktop
- **File:** `stitch-screens/05-gestion-equipe-desktop.html`
- **Screen ID:** `d1f1947cc3cf4eb0a2ff588cf75deb5d`
- **Size:** 2560x2048 (Desktop)
- **Purpose:** Therapist/team member management - profiles, credentials, and performance.
- **Key sections:**
  - "Vos Therapeutes d'Exception" heading + "Add Member" button
  - Therapist profile cards (3-column grid) with photos, specializations, availability
  - Skills, certifications, ratings per therapist
  - Contact/schedule information
  - Performance metrics and client reviews
- **UI patterns:** 3-column card layout, large profile images, skill badges, star ratings, hover shadow effects, text gradient overlays

### 6. Calendrier des Reservations - Desktop
- **File:** `stitch-screens/06-calendrier-reservations-desktop.html`
- **Screen ID:** `f3450ab5c535422996a51f1f08a7774a`
- **Size:** 2560x2048 (Desktop)
- **Purpose:** Appointment scheduling and calendar management with visual timetable.
- **Key sections:**
  - Left sidebar with mini calendar and date navigation
  - Main time-based calendar grid (hourly slots)
  - Appointment blocks with client names, service types, duration
  - Day/Week view toggle
  - Therapist profile selector
  - Color-coded appointment types
- **UI patterns:** Split layout (sidebar + main calendar), hourly grid, date range controls, hover previews, mini calendar in sidebar

### 7. Catalogue des Services - Desktop
- **File:** `stitch-screens/07-catalogue-services-desktop.html`
- **Screen ID:** `f63a3017dbf6431684b1c61861e38ff7`
- **Size:** 2560x3434 (Desktop)
- **Purpose:** Service/ritual catalog showcasing available treatments and wellness offerings.
- **Key sections:**
  - "Rituals" heading + "Add Service" button
  - Categorized service sections (Rituels Signature, Wellness Experiences, etc.)
  - Mixed 2-column and single-column service cards with images
  - Service descriptions, duration, pricing
  - Benefits/features lists
  - Booking CTAs
- **UI patterns:** Bento layout with mixed card sizes, hero images with text overlays, category headers, price displays, feature callouts, hover scale effects
