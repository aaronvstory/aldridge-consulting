# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for Aldridge Consulting, an Apple IT consulting company based in Newcastle, NSW, Australia. The site is built with vanilla HTML, CSS, and JavaScript with no build tools or frameworks.

## Development

No build process required. To develop:

1. Open `index.html` directly in a browser, or
2. Use any local server (e.g., `python -m http.server 8000`)

## Design System

CSS custom properties are defined in `:root` (styles.css:7-27):

| Variable | Value | Use |
|----------|-------|-----|
| `--primary` | `#0A1E3D` | Main dark background |
| `--secondary` | `#1E3A5F` | Secondary background |
| `--accent` | `#007AFF` | Apple blue for CTAs and highlights |
| `--accent-hover` | `#0056b3` | Darker blue for hover states |
| `--text-primary` | `#FFFFFF` | Main text color |
| `--text-secondary` | `#B0C4DE` | Muted text color |
| `--text-muted` | `#8899AA` | Very muted text |
| `--card-bg` | `rgba(30, 58, 95, 0.5)` | Semi-transparent card backgrounds |
| `--card-border` | `rgba(255, 255, 255, 0.1)` | Card border color |
| `--success` | `#34C759` | Success state (form submission) |
| `--error` | `#FF3B30` | Error state (form validation) |

## JavaScript Architecture

The script (script.js) uses an IIFE pattern with these modules:

- **Navbar scroll effect** - Adds `.scrolled` class when `window.scrollY > 50`
- **Mobile menu toggle** - Hamburger animation with body scroll lock
- **Intersection Observer animations** - Elements with `[data-animate]` get `.visible` class when in viewport (100ms stagger delay)
- **Counter animation** - Numbers with `data-target` attribute animate from 0 using ease-out timing over 2s
- **Form validation** - Real-time validation on blur, pattern-based email check, required field validation
- **Active nav highlighting** - Updates active nav link based on scroll position
- **Parallax** - Subtle hero pattern movement on scroll (disabled if `prefers-reduced-motion`)

## Form Submission

The contact form simulates submission with `setTimeout` (script.js:272-298). To add real backend integration, replace the simulated submission in the form's submit handler around line 272.

## SEO

- JSON-LD structured data for ProfessionalService (index.html:21-36)
- Open Graph meta tags for social sharing
- Australian English locale (`en-AU`)

## Accessibility

- Skip link for keyboard navigation
- ARIA labels on interactive elements
- `prefers-reduced-motion` support for parallax
- Escape key closes mobile menu
- Semantic HTML with proper heading hierarchy
- Print styles (styles.css:1438-1461)
