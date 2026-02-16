---
description: Project context and working guidelines for the basic-portfolio site
# applyTo: '**/*' # Apply to all files in this repo
---

# Project Context

This repository is a static portfolio website based on the HTML5 UP "Strata" template and customized for Amit Raj Reddy Dharam. It is hosted on GitHub Pages and uses plain HTML, CSS, and JavaScript without a build system by default.

## Tech Stack
- HTML5 (single-page layout in index.html)
- CSS (primary stylesheet in assets/css/main.css)
- JavaScript (assets/js/main.js and supporting scripts)
- Font Awesome icons (assets/css/fontawesome-all.min.css)
- Google Fonts (Source Sans Pro)
- No backend; all content is static

## Repository Structure (key paths)
- index.html: primary page layout and content
- assets/css/main.css: main stylesheet (template + custom overrides)
- assets/js/main.js: navigation, section toggles, and theme switching
- assets/js/*: supporting utilities (breakpoints, browser, jQuery, Poptrox)
- images/: background and gallery assets
- assets/resume/: resume PDF
- assets/sass/: template Sass source (not currently compiled in CI)

## Current Work in Progress
- A migration to Tailwind CSS + DaisyUI has been planned.
- The design doc is located at .github/design/TAILWIND_MIGRATION_DESIGN.md (if moved).
- The intended approach is local build + commit compiled assets/css/tailwind.css.

# Coding Guidelines

## General
- Preserve the site as a static, GitHub Pages-friendly build unless explicitly requested.
- Prefer minimal, incremental changes to avoid large diffs and regressions.
- Keep HTML semantic and accessible; ensure ARIA labels on interactive elements.
- Retain Font Awesome icons unless asked to replace.
- Avoid introducing new build tools unless explicitly requested.

## HTML
- Keep content in index.html; avoid splitting into multiple pages unless requested.
- Use consistent section IDs and nav links.
- Maintain existing structure where possible during style migrations.

## CSS
- Default to assets/css/main.css for styling unless a Tailwind migration is in progress.
- When adding new CSS, favor small, scoped additions.
- Avoid removing existing CSS unless the replacement is verified.

## JavaScript
- Keep existing behavior in assets/js/main.js.
- When adding new JS, prefer vanilla JS (no new dependencies).
- Ensure theme toggle continues to function.

# Migration-Specific Guidance (Tailwind/DaisyUI)

If implementing the Tailwind migration:
- Add Tailwind via local build, not CDN (unless explicitly requested for prototyping).
- Commit compiled assets/css/tailwind.css so GitHub Pages can serve it.
- Link tailwind.css before main.css initially to allow staged migration.
- Update theme toggle to add/remove the `dark` class on the html element.
- Preserve performance optimizations in index.html (preconnect, preload).

# Review Expectations

When reviewing changes:
- Highlight visual regressions, broken navigation, or missing content.
- Call out accessibility regressions (contrast, missing labels, focus states).
- Note any large increases in CSS size or unused assets.