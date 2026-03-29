# Cattaliya Thai Massage — App de Gestion

> Dashboard de gestion complet pour un salon de massage thai, avec design system sur-mesure inspiré de la marque [Cattaliya Thai Massage](https://cattaliya-thai-massage.com) (Lyon, Croix-Rousse).

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## Fonctionnalités

| Page | Route | Description |
|------|-------|-------------|
| **Dashboard** | `/` | KPIs du jour, rendez-vous à venir, graphique revenus, actions rapides |
| **Analyses** | `/analytics` | Chiffre d'affaires N vs N-1, segments clients, performance services, heatmap |
| **Clients** | `/clients` | CRM avec recherche, fidélité (Gold/Silver/Bronze), historique visites |
| **Équipe** | `/team` | Fiches thérapeutes, spécialisations, certifications, notations |
| **Calendrier** | `/calendar` | Grille horaire interactive, mini-calendrier, filtre par thérapeute |
| **Services** | `/services` | Catalogue des rituels par catégorie, tarifs, réservation |

### Responsive
- **Desktop** : sidebar navigation + header glassmorphism
- **Mobile** : bottom navigation + header compact

---

## Design System : Cattaliya Sanctuary

Le design system est documenté dans [`design-system/`](design-system/) avec tokens JSON et documentation complète.

### Palette

| Rôle | Couleur | Hex |
|------|---------|-----|
| Primary (Prune) | ![#8e496a](https://via.placeholder.com/12/8e496a/8e496a.png) | `#8E496A` |
| Gold Accent | ![#c49a5c](https://via.placeholder.com/12/c49a5c/c49a5c.png) | `#C49A5C` |
| Surface | ![#faf6f2](https://via.placeholder.com/12/faf6f2/faf6f2.png) | `#FAF6F2` |
| Sidebar (Dark Prune) | ![#3a2030](https://via.placeholder.com/12/3a2030/3a2030.png) | `#3A2030` |
| Success | ![#5c7a5e](https://via.placeholder.com/12/5c7a5e/5c7a5e.png) | `#5C7A5E` |

### Typographie

| Rôle | Police | Usage |
|------|--------|-------|
| Display | **Bilbo Swash Caps** | Logo uniquement |
| Headline | **Marcellus** | Tous les titres de section |
| Body / Label | **Nunito Sans** | Corps de texte, boutons, metadata |

### Principes clés
- **No-Line Rule** : pas de bordures pour séparer les sections, utiliser les shifts de surface
- **Tonal Layering** : profondeur via les niveaux de surface, pas les ombres
- **Glassmorphism** : headers sticky avec blur 20px
- **Pill Buttons** : `border-radius: 50px` pour les CTAs
- **Gold accent** : utilisé avec parcimonie (icônes, CTA sidebar, highlights)

---

## Stack technique

```
React 19 + Vite + TypeScript
Tailwind CSS v3 (avec tokens custom)
React Router v7
Material Symbols Outlined (icons)
```

Pas de backend — données mock dans `src/data/`.

---

## Démarrage rapide

```bash
# Cloner
git clone git@github.com:Nicogugu/cat-massage.git
cd cat-massage

# Installer
npm install

# Lancer
npm run dev
```

Ouvrir http://localhost:5173

---

## Structure du projet

```
src/
├── layouts/AppLayout.tsx          # Layout responsive (sidebar/bottom nav)
├── components/
│   ├── sidebar/Sidebar.tsx        # Navigation desktop (dark prune)
│   ├── header/Header.tsx          # Header glassmorphism
│   ├── bottom-nav/BottomNav.tsx   # Navigation mobile
│   ├── ui/                        # Composants réutilisables
│   │   ├── Icon, Button, Card, Badge, Avatar
│   │   ├── KpiCard, SearchInput, PageHeader
│   │   └── ProgressBar, DatePill
│   └── charts/BarChart.tsx        # Graphiques CSS
├── pages/
│   ├── dashboard/                 # Tableau de bord
│   ├── analytics/                 # Analyses & statistiques
│   ├── clients/                   # Gestion clients
│   ├── team/                      # Gestion équipe
│   ├── calendar/                  # Calendrier réservations
│   └── services/                  # Catalogue services
├── data/                          # Mock data (types, appointments, clients...)
└── index.css                      # Fonts + utilitaires glass/shadow
```

---

## Origine du projet

Les maquettes initiales ont été générées avec [Google Stitch](https://stitch.withgoogle.com), puis entièrement personnalisées pour coller à l'identité visuelle de Cattaliya Thai Massage. Les fichiers HTML source sont conservés dans `stitch-screens/` pour référence.

L'app React a été construite avec **Claude Code** en utilisant des agents parallélisés — 6 agents simultanés pour les 6 pages, après construction du socle commun (composants, layout, data).

---

## Licence

MIT
