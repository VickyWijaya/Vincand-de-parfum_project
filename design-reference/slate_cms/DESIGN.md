---
name: Slate CMS
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  layout-sidebar: 16rem
  layout-gutter: 1.5rem
---

## Brand & Style

This design system delivers a highly utilitarian, unpretentious, and rigorous environment for small business operators managing content, inventory, and publishing workflows. The visual tone is composed, reliable, and strictly pragmatic—removing decorative distractions in favor of task efficiency, clarity, and rapid scanability.

The design movement is **Modern Functionalism**:
- Surface hierarchy relies on crisp borders, clean division lines, and subtle tonal separation.
- Content density is balanced—neither overly compact nor needlessly sparse—providing comfortable data inspection and effortless editing.
- Micro-interactions are subtle, snappy, and predictable, instilling confidence and operational precision.

## Colors

The color palette prioritizes high-contrast legibility and structural discipline:

- **Base Surfaces**: The global canvas uses a cool tint `#f8fafc` (slate-50). Secondary panels, sidebars, and input wells utilize `#f1f5f9` (slate-100). Active cards, modals, and primary work surfaces use pure `#ffffff`.
- **Structural Lines**: Container divisions, data table rows, and control boundaries are defined by a crisp 1px `#e2e8f0` (slate-200) border. Hover or focused strokes escalate to `#cbd5e1` (slate-300) and `#0f172a` (slate-900).
- **Typography Scale**: High-emphasis headings and critical labels use `#0f172a` (slate-900). Body copy and standard UI text use `#334155` (slate-700). Secondary metadata, timestamps, and input placeholders use `#64748b` (slate-500).
- **Status & Feedback**: 
  - **Published / Active**: Subtle emerald ground `#ecfdf5` with crisp `#047857` text and `#a7f3d0` border.
  - **Draft / Inactive**: Neutral slate ground `#f1f5f9` with `#475569` text and `#cbd5e1` border.
  - **Attention / Warning**: Amber ground `#fffbeb` with `#b45309` text and `#fde68a` border.
  - **Destructive / Error**: Crimson ground `#fef2f2` with `#b91c1c` text and `#fecaca` border.

## Typography

The type system is engineered around **Inter**, optimized specifically for UI clarity, numeric readability, and rapid tabular scanning:

- Headings are kept tightly set with slight negative tracking (`-0.01em` to `-0.02em`) to maintain a clean editorial structure without feeling expressive.
- Body text defaults to `14px` (`body-md`) with a `20px` line-height, presenting standard density for dashboard tables, property sidebars, and form fields.
- Tabular figures (`tnum`) should be enabled for numeric counts, currency displays, inventory counters, and dates to preserve column alignment across data tables.

## Layout & Spacing

The layout follows a fluid-inside-fixed structural model designed for operational workflows:

- **Main Structure**: A persistent left-hand navigation sidebar fixed at `16rem` (`256px`), accompanied by a fluid primary workspace that accommodates dynamic table widths and multi-pane content inspectors.
- **Form Factor Breakpoints**:
  - **Desktop (>=1024px)**: Full two-column structure (Sidebar + Workspace). Workspace margins set to `1.5rem` (`24px`). Multi-field forms adopt a 2-column or 3-column inline grid.
  - **Tablet (768px - 1023px)**: Collapsed icon-rail sidebar (`4rem` / `64px`) or off-canvas drawer. Workspace padding reduces to `1rem` (`16px`).
  - **Mobile (<768px)**: Hidden slide-out navigation bar triggered via top app header. Table components horizontally scroll within bounded cards or transition to key-value row cards.
- **Rhythm**: Standard field heights are pinned at `36px` to `40px` to maintain a steady vertical rhythm across toolbars, filters, and standard input elements.

## Elevation & Depth

This design system minimizes atmospheric lighting in favor of tactile boundaries:

- **Primary Separation**: Depth is achieved predominantly via 1px low-contrast strokes (`#e2e8f0`) rather than layered drop shadows.
- **Base Cards & Modules**: Rest directly on the `#f8fafc` canvas using pure `#ffffff` fills bounded by `#e2e8f0`. They feature a razor-thin, subtle ambient edge: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`.
- **Dropdowns & Popovers**: Float immediately above the base canvas with a crisp outline and a focused shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Modals & Slide-out Drawers**: Paired with an unblurred `#0f172a` backdrop at 40% opacity, bordered by `#e2e8f0`, using `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes

The design system maintains a disciplined, soft geometry (`roundedness: 1`):

- **Buttons, Inputs, & Form Controls**: Feature an explicit `0.25rem` (`4px`) border radius. This creates crisp, functional edges that align neatly with surrounding grid borders.
- **Cards, Panels, & Data Containers**: Use `0.375rem` (`6px`) to soften large panel corners while preserving an architectural, non-pill aesthetic.
- **Badges & Status Tags**: Use `0.25rem` (`4px`) or `0.125rem` (`2px`) corners. Full pill radiuses are avoided to keep the system grounded and utilitarian.

## Components

### Buttons
- **Primary**: Background `#0f172a`, text `#ffffff`, height `36px`, padding `0 14px`, font `label-md`. Hover: `#1e293b`. Active: `#334155`. Focus: 2px offset ring `#0f172a`.
- **Secondary / Outline**: Background `#ffffff`, text `#0f172a`, border `1px solid #e2e8f0`. Hover: background `#f8fafc`, border `#cbd5e1`.
- **Ghost**: Background transparent, text `#334155`. Hover: background `#f1f5f9`.
- **Destructive**: Background `#ffffff`, text `#b91c1c`, border `1px solid #fecaca`. Hover: background `#fef2f2`, border `#f87171`.

### Form Controls & Inputs
- **Text Inputs & Selects**: Height `36px`, background `#ffffff`, border `1px solid #e2e8f0`, padding `0 12px`, text `body-md` (`#0f172a`). Placeholder `#94a3b8`. Focus state introduces a 1px border stroke `#0f172a` with an ambient ring `0 0 0 1px #0f172a`.
- **Checkboxes & Radios**: `16px x 16px`, border `1px solid #cbd5e1`, background `#ffffff`, radius `3px` (checkbox) or circle (radio). Checked state: background `#0f172a` with white checkmark.
- **Labels**: Always rendered in `label-sm` (`#334155`) positioned `6px` above the control. Optional helper text rendered in `body-sm` (`#64748b`) below the control.

### Status Badges & Chips
- **Published / Active**: Background `#ecfdf5`, text `#047857`, border `1px solid #a7f3d0`, padding `2px 8px`, font `label-sm`.
- **Draft**: Background `#f8fafc`, text `#475569`, border `1px solid #e2e8f0`, padding `2px 8px`, font `label-sm`.
- **Archived / Offline**: Background `#f1f5f9`, text `#64748b`, border `1px solid #cbd5e1`, padding `2px 8px`, font `label-sm`.

### Data Tables
- **Container**: White background, wrapped in an outer `1px solid #e2e8f0` border, `rounded-md`, horizontal overflow enabled.
- **Table Head**: Background `#f8fafc`, text `#475569`, font `label-sm`, text transform uppercase, tracking `0.05em`, height `40px`, border-bottom `1px solid #e2e8f0`.
- **Table Rows**: Standard row height `48px`, border-bottom `1px solid #f1f5f9`, background `#ffffff`. Hover: background `#f8fafc`.
- **Cells**: Padding `12px 16px`, typography `body-md` (`#334155`), numeric data aligned right with tabular figures.

### Cards & Panels
- **Structure**: Background `#ffffff`, border `1px solid #e2e8f0`, radius `6px`.
- **Card Header**: Padding `16px 20px`, border-bottom `1px solid #f1f5f9`, displaying `headline-sm` with optional action buttons aligned to the right.
- **Card Body**: Padding `20px`.