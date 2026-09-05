# Meeple Club design system

Design system for **Meeple Club**, a website for a local board game club open to newcomers: game lookup, night scheduling (RSVP), and anonymous reviews and short "notes" on games. Built for a SolidJS + Tailwind application.

Source: the landing and game-detail mocks in `../Meeple Club.dc.html` (turn 2a is the reference landing; 1c the game detail). No external brand assets were provided; the meeple mark and terrain glyphs in `assets/` were drawn for the mocks.

## Index
- `styles.css` — plain-CSS entry (imports every token file). Use this if you are not on Tailwind.
- `tailwind/theme.css` — **Tailwind v4** entry (`@theme inline`, mode variants, hex utilities). Import this instead of `tailwindcss`.
- `tailwind/tailwind.config.js` — Tailwind v3 equivalent.
- `tokens/` — `colors`, `typography`, `spacing` (incl. hex geometry), `shape` (radii, clip paths, fade mask), `motion`, `fonts`.
- `components/solid/` — SolidJS components: Meeple, Button, Label, HexTile, HexBoard, Card, NoteCard, Stars/Rating, StatHex, GameRow, ThemeSwitch, Input, Header. Each has a `.d.ts` and `.prompt.md`.
- `guidelines/` — foundation specimen cards.
- `assets/` — `meeple.svg`, `terrain-tree.svg`, `terrain-mountain.svg`.
- `SKILL.md` — agent skill entry point.

## Using it
```css
/* src/index.css (Tailwind v4) */
@import "./design-system/tailwind/theme.css";
```
```html
<html data-theme="beige">  <!-- beige | light | dark -->
```
Semantic utilities: `bg-bg bg-surface bg-surface-2 text-ink text-dim border-line bg-accent text-on-accent bg-plum text-on-plum bg-field text-forest bg-rock fill-stone`.
Type utilities: `font-display text-display-lg`, `text-body`, `label`, `label-sm`, `eyebrow`.
Hex utilities: `clip-hex clip-hex-flat clip-hex-wide hex-row hex-row-shift board-fade w-hex-w h-hex-h shadow-tile-ring`.

## Modes
Three first-class modes, switched by `data-theme` on `<html>`. **Beige is the default** and the brand's signature; light is paper-white; dark is warm near-black, never blue-grey. Every semantic token is remapped per mode; brand scale tokens (`--mc-terracotta-500`) are constant. Terracotta lightens in dark mode (`#E0714C`) to hold contrast; plum lightens to `#B08AC0`.

## Content fundamentals
- Tone: **playful, dry, clubby.** Sentences are short and a little wry: "Someone always knows the rules." / "Don't build the second canal. Everyone builds the second canal." / "Fourth slot is empty. Bring something."
- Second person, casual ("Turn up, get taught, argue about the endgame scoring"). The club speaks as "we" only implicitly; mostly it just states things.
- Sentence case everywhere. Title case only for game titles. Mono labels are uppercase by CSS, not in source.
- Reviews are called **notes**; reviewers get **auto-assigned anonymous handles** in the pattern *Adjective Piece*: Patient Rook, Cheerful Pawn, Distant Bishop, Quiet Meeple. Handles always render in plum mono.
- Board-game vocabulary as metaphor: "Claim a seat", "Put this on a table", "The shelf", "Free table", "On the table this month". Don't overdo it; one per screen region.
- Numbers are plain and specific (214 games, 61 members, 1,308 notes). No marketing superlatives. No emoji. No exclamation marks.
- Buttons are verb-first and short: "Join the club", "Claim a seat Thursday", "Leave an anonymous note", "Ask for a copy →". Trailing arrow `→` marks secondary links.

## Visual foundations
- **Colors.** Warm neutrals only. Beige sand (`#EDE3D3`) is the ground; surfaces are lighter sand; `surface-2` is the darker sand used for empty hexes and thumbnails. One accent, terracotta, for the primary action, live tiles, ratings and eyebrows. Plum is a secondary accent reserved for anonymity (handles, note tiles, Schedule/Members icons). Terrain greens and greys (`field/forest`, `rock/stone`) exist only for board tiles.
- **Type.** DM Serif Display for anything with a voice: display headlines (76–92px, line-height ≤1, tracking −.025em), section headings (27–32px), tile labels (21px), titles (19px). DM Sans for body (15px/1.6), lead (18px), captions. DM Mono for metadata labels: 10–11px, uppercase, .12–.18em tracking, usually `dim`. Never bold the serif; weight contrast comes from family, not weight.
- **Spacing.** 4px base. Page gutter 64px; page max 1280px. Section padding 40–56px vertical. Card padding 15–17px. Generous whitespace around headlines; dense mono metadata.
- **Shape.** Almost square: 3px radius on buttons, cards, inputs; 2px on thumbnails; pills only for the round theme switch. Hexagons are pointy-top when tessellated (width × 1.1547 height; rows overlap by ¼ height; alternate rows shift half a width) and flat-top in loose clusters.
- **Borders and elevation.** 1px `line` borders do all the separation; lists use top borders, not gaps. Tiles get an inset 1px ring (`shadow-tile-ring`) instead of a border so the clip-path stays clean. **No drop shadows** inside the product; the only shadow is the frame shadow on mock canvases.
- **Backgrounds.** Flat color fields. No gradients except the radial *mask* that fades the hex board off the page (`board-fade`). No imagery, textures or grain. Box art is the only photography and sits in `surface-2` slots until provided.
- **Hex board.** The signature motif. Navigation destinations are "claimed" tiles on a terrain map: nav tiles are surface + ring; one terracotta live tile (next night); one plum note tile (newest note); terrain tiles (forest, mountain, plain) fill outward and fade. The board bleeds off one page edge.
- **Motion.** Sparse. Color transitions 200ms with `cubic-bezier(.2,.7,.2,1)`. The meeple bobs (`animate-bob`, 4s) only in loading and empty states. Content may `fade-up` on mount. No parallax, no bounces on UI.
- **States.** Hover: nav tiles tint to `accent-soft`; buttons darken one step or shift opacity; links go plum. Active: 1px downward translate. Focus: accent border + `accent-soft` ring. Disabled: 40% opacity.
- **Transparency / blur.** None. Opacity is used only for text on colored tiles (.8–.85).
- **Layout.** Left-aligned editorial column beside the board on the landing; two-column panels split by a 1px line with the right panel on `surface`; game detail uses a 300px cover column.

## Iconography
- The **Meeple** (`assets/meeple.svg`) is the only brand mark; fill via `currentColor`. Sizes 22–30px. It appears in the header, empty states, loading, and the "free table" hex.
- Terrain glyphs (`terrain-tree.svg`, `terrain-mountain.svg`) are 40px flat shapes used only inside hex tiles.
- UI icons: the mocks use a handful of 1.7px-stroke line glyphs (list, calendar, speech bubble). For the app use **Lucide** (`lucide-solid`) at 24px, stroke 1.75 — closest match. Icons are colored `accent`, `plum` or `ink`, never `dim`.
- Unicode used as iconography: `★ ☆` for ratings, `→` for links, `·` as separator.
- No emoji.

## Intentional additions
- `Label`, `Stars/Rating`, `StatHex`, `GameRow` are extracted from repeated patterns in the mocks rather than defined as components there.
- `Input` is not shown in the mocks; styled to match cards (line border, accent focus).

## Caveats
- Fonts load from Google Fonts; self-host for production.
- Color contrast: `dim` on `bg` in beige mode is ~4.6:1 (AA for body); use `ink` for text under 13px on colored tiles.
