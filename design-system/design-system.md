# Design System: Cattaliya Sanctuary

**Name:** Cattaliya Sanctuary
**Source:** Cattaliya Thai Massage – cattaliya-thai-massage.com
**Skill:** Anthropic `frontend-design` — "Dominant colors with sharp accents outperform timid, evenly-distributed palettes"

---

## 1. Creative Direction

**North Star: "Warm Luxury, Quiet Confidence"**

The interface mirrors the physical experience of Cattaliya Thai Massage in Lyon's Croix-Rousse: warm, intentional, and tactile. We use a **dark prune sidebar** as a visual anchor, **warm gold accents** for richness, and **cream surfaces** that breathe.

**Design principles:**
- **Bold contrast** over monochrome — the dark sidebar grounds every page
- **Warm materiality** — cream (#FAF6F2), gold (#C49A5C), terracotta warmth
- **Editorial calm** — generous white space, serif headlines, intentional asymmetry
- **One accent, used well** — gold for icons, CTAs, highlights. Not everywhere.

---

## 2. Color Strategy

### Core Palette

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | `primary` | `#8E496A` | Active states, nav, buttons, links |
| **Gold Accent** | `accent-gold` | `#C49A5C` | Icons, sidebar CTA, highlights, chart accents |
| **Gold Light** | `accent-gold-light` | `#FFECD4` | Icon backgrounds, warm tints |
| **Gold Dark** | `accent-gold-dark` | `#8B6914` | Icon fills on light backgrounds |
| **Success** | `success` / `tertiary` | `#5C7A5E` | Positive trends, confirmations |
| **Error** | `error` | `#BA1A1A` | Destructive actions, alerts (use sparingly) |

### Surfaces — Warm Cream (not pink, not white)

| Level | Token | Hex | Usage |
|-------|-------|-----|-------|
| Base | `surface` / `background` | `#FAF6F2` | Page background |
| Card | `surface-container-lowest` | `#FFFFFF` | Card bodies, elevated content |
| Subtle | `surface-container-low` | `#F5F1EC` | Secondary backgrounds |
| Medium | `surface-container` | `#F0EBE6` | Sidebar sections, inputs |
| Strong | `surface-container-high` | `#EAE4DE` | Hover states, active areas |
| Text | `on-surface` | `#1E1B18` | Primary text — warm near-black |
| Muted text | `on-surface-variant` | `#4D4540` | Secondary text, labels |

### Sidebar — Dark Prune (the anchor)

| Token | Hex | Usage |
|-------|-----|-------|
| `sidebar` | `#3A2030` | Sidebar background |
| `sidebar-surface` | `#4D2E40` | Card/icon backgrounds in sidebar |
| `sidebar-text` | `#F0D8E4` | Primary text in sidebar |
| `sidebar-muted` | `#B89AAA` | Secondary text, inactive nav |
| `sidebar-hover` | `#5A3648` | Hover state backgrounds |

### The "No-Line" Rule
Borders are prohibited for layout boundaries. Use tonal shifts between surface levels instead. Exception: the `outline-variant` at 10–15% opacity for ghost borders on headers.

---

## 3. Typography

| Role | Font | Usage |
|------|------|-------|
| **Display** | Bilbo Swash Caps | Logo/brand name ONLY. Gold color (`accent-gold`) on dark, primary on light |
| **Headline** | Marcellus | All section headings, card titles, page titles. Elegant serif. |
| **Body / Label** | Nunito Sans | Body text, buttons, inputs, metadata. Clean sans-serif. |

### Scale

| Scale | Size | Weight | Font |
|-------|------|--------|------|
| Page title | 28–36px | 400 | Marcellus |
| Section heading | 18–20px | 600 | Marcellus |
| Body | 14–16px | 400 | Nunito Sans |
| Label / eyebrow | 10–11px | 600–700, uppercase, tracking-widest | Nunito Sans |
| Button | 13px | 600–700 | Nunito Sans |

---

## 4. Elevation & Depth

- **Cards:** `shadow-card` → `0 2px 20px rgba(142, 73, 106, 0.06)` (prune-tinted)
- **Hover:** `shadow-card-hover` → `0 8px 30px rgba(142, 73, 106, 0.12)`
- **Glassmorphism:** For sticky headers: `rgba(250, 246, 242, 0.85)` + `backdrop-blur: 20px`
- **Sidebar shadow:** Active nav gets `shadow-lg shadow-primary/20`
- **Gold CTA shadow:** `shadow-lg shadow-accent-gold/20`

---

## 5. Components

### Buttons
- **Primary:** `bg-primary text-on-primary`, `rounded-pill` (50px). For main CTAs.
- **Gold:** `bg-accent-gold text-white`, `rounded-xl`. Sidebar reservation CTA.
- **Secondary:** `bg-secondary-container text-on-secondary-container`, `rounded-xl`.
- **Tertiary / Ghost:** No background, `text-primary` with hover state.

### KPI Cards
- Value: `text-3xl font-bold text-on-surface` — must be dark and bold
- Icon: `bg-accent-gold-light` background, `text-accent-gold-dark` icon
- Change indicator: Green (`bg-success-light text-success`) or red pill

### Sidebar Navigation
- Inactive: `text-sidebar-muted`, hover → `bg-sidebar-hover text-sidebar-text`
- Active: `bg-primary text-white rounded-xl shadow-lg shadow-primary/20`
- Logo: Bilbo Swash Caps in `text-accent-gold`, spa icon in gold

### Cards
- Background: `surface-container-lowest` (white)
- Radius: `rounded-2xl`
- Shadow: `shadow-card`
- Hover (interactive): `hover:shadow-card-hover hover:scale-[1.01]`

### Bottom Nav (Mobile)
- Active: `text-primary` + top indicator bar (`w-8 h-1 bg-primary rounded-full`)
- Inactive: `text-on-surface-variant/40`

---

## 6. Do's and Don'ts

### Do
- **Do** use the dark sidebar as the primary visual anchor
- **Do** use gold sparingly — icon backgrounds, one CTA, chart accents
- **Do** use Marcellus for every heading, Nunito Sans for everything else
- **Do** keep surfaces warm cream, never cold white or pink
- **Do** use `spacing.8`+ for outer margins (editorial gallery feel)

### Don't
- **Don't** use pure black — darkest is `on-surface` (`#1E1B18`)
- **Don't** make everything the same tone — contrast is key
- **Don't** use Bilbo Swash Caps for anything except the logo
- **Don't** use gold for body text or large areas — it's an accent
- **Don't** use sharp corners — minimum `rounded-xl` (1rem)
- **Don't** use borders to separate sections — use tonal surface shifts
