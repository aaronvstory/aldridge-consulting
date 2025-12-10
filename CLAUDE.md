# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for Aldridge Consulting, an Apple IT consulting company based in Newcastle, NSW, Australia. The site is built with vanilla HTML, CSS, and JavaScript with no build tools or frameworks.

## File Structure

- `index.html` - Single-page site with all sections (hero, services, technology, about, testimonials, contact)
- `styles.css` - Apple-inspired dark theme using CSS custom properties
- `script.js` - Interactive features (navigation, animations, form validation)
- `about_team.jpg` - Team photo used in the About section

## Development

No build process required. To develop:

1. Open `index.html` directly in a browser, or
2. Use any local server (e.g., `python -m http.server 8000`)

## Design System

CSS custom properties are defined in `:root` (styles.css:7-27):

| Variable | Value | Use |
|----------|-------|-----|
| `--primary` | `#0A1E3D` | Main dark background |
| `--accent` | `#007AFF` | Apple blue for CTAs and highlights |
| `--text-primary` | `#FFFFFF` | Main text color |
| `--text-secondary` | `#B0C4DE` | Muted text color |
| `--card-bg` | `rgba(30, 58, 95, 0.5)` | Semi-transparent card backgrounds |

## JavaScript Architecture

The script uses an IIFE pattern with sections for:

- **Navbar scroll effect** - Adds `.scrolled` class when page is scrolled
- **Mobile menu toggle** - Hamburger menu for responsive navigation
- **Intersection Observer animations** - Elements with `[data-animate]` fade in when visible
- **Counter animation** - Stat numbers animate from 0 to target value
- **Form validation** - Client-side validation for contact form (simulated submission)

## Form Submission

The contact form currently simulates submission with a `setTimeout` (script.js:272-298). To add real backend integration, replace the simulated submission in the form's submit handler.

## Accessibility Features

- Skip link for keyboard navigation
- ARIA labels on interactive elements
- Respects `prefers-reduced-motion` for parallax effect
- Semantic HTML with proper heading hierarchy
