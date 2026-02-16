# Tailwind + DaisyUI Migration Design Document

**Project:** Portfolio Website Migration  
**Branch:** `feat/tailwind-daisyui`  
**Date:** February 16, 2026  
**Author:** GitHub Copilot  
**Status:** Planning Phase

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Goals & Success Criteria](#goals--success-criteria)
4. [Technical Architecture](#technical-architecture)
5. [Migration Strategy](#migration-strategy)
6. [Component Mapping](#component-mapping)
7. [File Structure Changes](#file-structure-changes)
8. [Implementation Plan](#implementation-plan)
9. [Build & Deployment](#build--deployment)
10. [Testing Strategy](#testing-strategy)
11. [Rollback Plan](#rollback-plan)
12. [Timeline & Milestones](#timeline--milestones)

---

## Executive Summary

### Overview
Migrate the existing static portfolio website from a custom CSS framework (HTML5 UP Strata template) to **Tailwind CSS** with **DaisyUI** component library to achieve:
- Modern, maintainable styling
- Utility-first CSS approach
- Pre-built accessible components
- Smaller CSS bundle size (via purging)
- Improved developer experience

### Approach
**Local build + commit compiled files** strategy:
- Build CSS locally using Tailwind CLI
- Commit compiled `assets/css/tailwind.css` to repository
- GitHub Pages serves static files (no CI/CD required initially)
- Zero infrastructure changes to deployment

### Key Decisions
- ✅ Use **DaisyUI** for component styling (cards, buttons, badges)
- ✅ Maintain **existing HTML structure** where possible
- ✅ Keep **FontAwesome icons** (already integrated)
- ✅ Preserve **dark mode toggle** functionality
- ✅ Retain **custom JavaScript** (theme toggle, navigation)
- ✅ Use **Tailwind Typography** plugin for content areas
- ⚠️ Phase out most of `assets/css/main.css` (keep critical animations/transitions)

---

## Current State Analysis

### Technology Stack (Before)
| Component | Technology |
|-----------|-----------|
| HTML | Semantic HTML5 |
| CSS Framework | Custom CSS (HTML5 UP Strata template) |
| Preprocessor | SASS/SCSS (optional, files exist but likely not in build) |
| Icons | Font Awesome 5 (via CDN/local) |
| JavaScript | Vanilla JS + jQuery |
| Font | Source Sans Pro (Google Fonts) |
| Build Process | None (static files) |
| Hosting | GitHub Pages |

### Current File Structure
```
/home/darr1901/amit_aincrad/portfolio/basic-portfolio/
├── index.html                           # Main HTML file (761 lines)
├── assets/
│   ├── css/
│   │   ├── main.css                     # 4336 lines of custom CSS (LARGE)
│   │   ├── fontawesome-all.min.css      # Icon library
│   │   └── images/
│   │       └── overlay.png              # Background overlay
│   ├── js/
│   │   ├── jquery.min.js
│   │   ├── jquery.poptrox.min.js        # Lightbox gallery
│   │   ├── breakpoints.min.js
│   │   ├── browser.min.js
│   │   ├── util.js
│   │   └── main.js                      # Custom JS (theme toggle, nav)
│   ├── resume/
│   │   └── Amit_Raj_Reddy_Dharam_resume.pdf
│   └── sass/
│       ├── main.scss
│       └── libs/                        # SCSS partials
├── images/                              # Project images, background
└── pdf_text_extractor/                  # Python utility
```

### Current Component Inventory
Analyzing `index.html` structure:

| Component Type | Current Classes | Count | Notes |
|----------------|----------------|-------|-------|
| **Header/Nav** | `#header`, `.inner`, `.nav-link` | 1 | Sticky sidebar with nav |
| **Content Cards** | `.content-card`, `.card-header` | ~15+ | Main content containers |
| **Sections** | `.page-section`, `.major` | 5 | About, Education, Experience, Projects, Skills |
| **Badges** | `.date-badge`, `.award-badge`, `.skill-tag`, `.tech-tag` | 50+ | Various info badges |
| **Buttons** | `.button`, `.primary`, `.icon` | 5+ | CTAs and links |
| **Icons** | Font Awesome classes (`fas`, `fab`) | 100+ | Throughout UI |
| **Lists** | `.achievement-list`, `.hobbies-list` | 10+ | Bullet lists with icons |
| **Social Links** | `.social-link`, `.social-links` | 3 | GitHub, LinkedIn, Devpost |
| **Theme Toggle** | `.theme-toggle`, `.theme-icon` | 1 | Dark mode button |
| **Contact Items** | `.contact-item`, `.contact-details` | 2 | Email, location |

### Current CSS Pain Points
1. **Large CSS bundle** (4336 lines) - most unused
2. **Hard to maintain** custom classes
3. **Inconsistent spacing** (manual pixel values)
4. **Limited responsiveness** patterns
5. **No utility classes** for rapid iteration
6. **Dark mode** implemented via custom CSS variables

---

## Goals & Success Criteria

### Primary Goals
1. **Modern UI** - Contemporary look with Tailwind + DaisyUI
2. **Maintainability** - Utility-first CSS for easy iteration
3. **Performance** - Smaller CSS bundle via purging
4. **Accessibility** - DaisyUI components are ARIA-compliant
5. **Preserve Functionality** - All current features work (dark mode, nav, etc.)

### Success Criteria
- ✅ Page loads with no visual regressions
- ✅ CSS bundle size < 100KB (currently ~200KB with main.css + fontawesome)
- ✅ All interactive elements work (theme toggle, navigation, links)
- ✅ Fully responsive on mobile/tablet/desktop
- ✅ Dark mode toggle preserved
- ✅ Lighthouse score >= 90 for all categories
- ✅ GitHub Pages deployment successful

### Non-Goals (Out of Scope)
- ❌ Complete HTML restructure (minor tweaks only)
- ❌ JavaScript framework migration (keep vanilla JS)
- ❌ Backend/API integration
- ❌ CMS or dynamic content
- ❌ Removing Font Awesome (keep for icon consistency)

---

## Technical Architecture

### Technology Stack (After)
| Component | Technology | Version |
|-----------|-----------|---------|
| HTML | Semantic HTML5 | - |
| CSS Framework | **Tailwind CSS** | ^3.4.0 |
| Component Library | **DaisyUI** | ^4.12.0 |
| Preprocessor | **PostCSS** | ^8.4.0 |
| Icons | Font Awesome 5 | (unchanged) |
| JavaScript | Vanilla JS + jQuery | (unchanged) |
| Font | Source Sans Pro | (unchanged) |
| Build Tools | Tailwind CLI, npm scripts | - |
| Hosting | GitHub Pages | (unchanged) |

### Dependencies to Add

#### `package.json` (new file)
```json
{
  "name": "portfolio-basic",
  "version": "1.0.0",
  "description": "Amit Raj Reddy Dharam - Portfolio Website",
  "scripts": {
    "build:css": "tailwindcss -i ./src/tailwind.css -o ./assets/css/tailwind.css --minify",
    "watch:css": "tailwindcss -i ./src/tailwind.css -o ./assets/css/tailwind.css --watch",
    "dev": "npm run watch:css"
  },
  "keywords": ["portfolio", "tailwind", "daisyui"],
  "author": "Amit Raj Reddy Dharam",
  "license": "MIT",
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.16",
    "daisyui": "^4.12.10",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0"
  }
}
```

### Configuration Files

#### `tailwind.config.js` (new file)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/js/**/*.js",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        // Match current brand colors (analyze from main.css)
        primary: '#49bf9d',     // Current accent color (teal/green)
        secondary: '#787878',   // Gray text color
      },
      backgroundImage: {
        'hero': "url('/images/vertical-view-grand-canyon-usa.jpg')",
        'overlay': "url('/assets/css/images/overlay.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#49bf9d",
          "secondary": "#787878",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
        dark: {
          "primary": "#49bf9d",
          "secondary": "#a0a0a0",
          "accent": "#37cdbe",
          "neutral": "#2a2e37",
          "base-100": "#1d1f27",
        },
      },
    ],
  },
};
```

#### `postcss.config.js` (new file)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### `src/tailwind.css` (new file)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes (if needed) */
@layer components {
  .theme-toggle {
    @apply fixed top-4 right-4 z-50 btn btn-circle btn-ghost;
  }
  
  /* Preserve critical animations from main.css */
  .is-preload * {
    animation: none !important;
    transition: none !important;
  }
}

/* Custom utilities */
@layer utilities {
  .text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}
```

---

## Migration Strategy

### Phase 1: Setup (Day 1)
1. ✅ Create new branch `feat/tailwind-daisyui`
2. ✅ Initialize npm project (`npm init -y`)
3. ✅ Install dependencies (Tailwind, DaisyUI, PostCSS, plugins)
4. ✅ Create config files (`tailwind.config.js`, `postcss.config.js`)
5. ✅ Create `src/tailwind.css` with directives
6. ✅ Run initial build (`npm run build:css`)
7. ✅ Commit base setup

### Phase 2: HTML Integration (Day 1-2)
1. Update `index.html` `<head>`:
   - Add Tailwind CSS before main.css: `<link rel="stylesheet" href="assets/css/tailwind.css">`
   - Keep main.css temporarily for comparison
2. Add `dark` class toggle to `<html>` tag via JS
3. Test initial page load (should look mostly broken - expected)

### Phase 3: Component Migration (Day 2-5)
Migrate components **incrementally** in this order:

**Priority 1 (Core Layout)**
- [ ] Header/Navigation
- [ ] Main container
- [ ] Section wrappers

**Priority 2 (Content Blocks)**
- [ ] Content cards (`.content-card` → DaisyUI `card`)
- [ ] Card headers (`.card-header` → `card-title`)
- [ ] Badges (`.date-badge`, `.award-badge` → DaisyUI `badge`)

**Priority 3 (Interactive Elements)**
- [ ] Buttons (`.button` → DaisyUI `btn`)
- [ ] Social links
- [ ] Theme toggle button

**Priority 4 (Typography & Lists)**
- [ ] Headings (h1-h6 → Tailwind typography)
- [ ] Achievement lists
- [ ] Skill/tech tag grids

**Priority 5 (Special Sections)**
- [ ] About section
- [ ] Education timeline
- [ ] Experience cards
- [ ] Projects showcase
- [ ] Skills matrix

### Phase 4: Styling Refinement (Day 5-7)
1. Remove unused classes from `main.css`
2. Extract critical animations to `src/tailwind.css` `@layer components`
3. Fine-tune spacing, colors, shadows
4. Optimize dark mode colors
5. Test responsive breakpoints

### Phase 5: Testing & Optimization (Day 7-8)
1. Cross-browser testing (Chrome, Firefox, Safari, Edge)
2. Mobile responsiveness testing
3. Lighthouse audit
4. CSS bundle size verification
5. Accessibility audit (WAVE, axe DevTools)

### Phase 6: Deployment (Day 8)
1. Final build (`npm run build:css`)
2. Commit compiled CSS
3. Push to GitHub
4. Create Pull Request
5. Merge to main
6. Verify GitHub Pages deployment

---

## Component Mapping

### Detailed Conversion Table

| Old Class/Structure | New Tailwind + DaisyUI Classes | Notes |
|---------------------|--------------------------------|-------|
| **Layout** |
| `#header` | `drawer-side lg:w-1/3 xl:w-1/4 bg-base-200` | Sticky sidebar |
| `#main` | `drawer-content p-4 lg:p-8` | Main content area |
| `.inner` | `container mx-auto px-4` | Inner wrapper |
| **Cards** |
| `.content-card` | `card bg-base-100 shadow-xl mb-6` | Main card style |
| `.card-header` | `card-title flex justify-between items-center` | Card header |
| `.info-section` | `card-body` | Card content |
| **Badges** |
| `.date-badge` | `badge badge-secondary badge-outline` | Date labels |
| `.award-badge` | `badge badge-accent badge-lg` | Award indicators |
| `.skill-tag` | `badge badge-primary badge-sm` | Skill chips |
| `.tech-tag` | `badge badge-ghost` | Technology tags |
| **Buttons** |
| `.button` | `btn btn-primary` | Primary button |
| `.button.primary` | `btn btn-primary btn-wide` | Wide primary |
| `.button.icon` | `btn btn-circle btn-ghost` | Icon button |
| **Navigation** |
| `.nav-link` | `link link-hover text-base-content` | Nav links |
| `.nav-link.active` | `link link-primary font-bold` | Active nav |
| **Social Links** |
| `.social-link` | `btn btn-outline btn-primary gap-2` | Social buttons |
| **Lists** |
| `.achievement-list li` | `flex gap-3 items-start mb-2` | List items |
| `.hobbies-list li` | `flex gap-2 items-center` | Icon + text |
| **Typography** |
| `<h2 class="major">` | `text-3xl font-bold mb-6` | Section headers |
| `<h3>` | `text-2xl font-semibold` | Card headers |
| `<h4>` | `text-lg font-medium mb-3` | Subsection headers |
| `<p>` | `text-base text-base-content/80 leading-relaxed` | Body text |
| **Contact** |
| `.contact-item` | `flex gap-4 items-start p-4 bg-base-200 rounded-lg` | Contact info |
| **Icons** |
| FontAwesome classes | (unchanged) `fas fa-*`, `fab fa-*` | Keep all icons |
| **Theme Toggle** |
| `.theme-toggle` | `swap swap-rotate btn btn-circle btn-ghost fixed top-4 right-4 z-50` | Dark mode toggle |

### DaisyUI Components to Use

| Component | Use Case | Classes |
|-----------|----------|---------|
| **Card** | Content containers | `card`, `card-body`, `card-title`, `card-actions` |
| **Badge** | Labels, tags, dates | `badge`, `badge-primary`, `badge-secondary`, `badge-accent` |
| **Button** | CTAs, links | `btn`, `btn-primary`, `btn-outline`, `btn-wide`, `btn-circle` |
| **Drawer** | Sidebar navigation (optional) | `drawer`, `drawer-side`, `drawer-content` |
| **Hero** | Top section (optional) | `hero`, `hero-content`, `hero-overlay` |
| **Timeline** | Education/Experience (optional) | `timeline`, `timeline-item` |
| **Tabs** | Project categories (optional) | `tabs`, `tab`, `tab-active` |
| **Swap** | Theme toggle icon | `swap`, `swap-rotate` |
| **Tooltip** | Icon/link hover | `tooltip`, `tooltip-primary` |

---

## File Structure Changes

### New Files
```
/home/darr1901/amit_aincrad/portfolio/basic-portfolio/
├── package.json                         # [NEW] npm config
├── package-lock.json                    # [NEW] Dependency lock
├── tailwind.config.js                   # [NEW] Tailwind config
├── postcss.config.js                    # [NEW] PostCSS config
├── src/
│   └── tailwind.css                     # [NEW] Tailwind entry point
├── assets/
│   └── css/
│       └── tailwind.css                 # [NEW] Compiled Tailwind CSS
└── .gitignore                           # [UPDATED] Add node_modules
```

### Modified Files
```
index.html                               # [MODIFIED] Add Tailwind classes
assets/css/main.css                      # [MODIFIED] Remove most styles (keep critical only)
assets/js/main.js                        # [MODIFIED] Update theme toggle for dark mode class
.gitignore                               # [MODIFIED] Add node_modules, .DS_Store
```

### Files to Keep Unchanged
```
assets/css/fontawesome-all.min.css       # [UNCHANGED] Icons
assets/js/*.js                           # [UNCHANGED] Existing JS (mostly)
images/*                                 # [UNCHANGED] Images
assets/resume/*                          # [UNCHANGED] Resume PDF
```

### Updated `.gitignore`
```gitignore
# Dependencies
node_modules/
package-lock.json

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Build (optional - we'll commit tailwind.css)
# assets/css/tailwind.css
```

---

## Implementation Plan

### Step-by-Step Migration Guide

#### Step 1: Initialize Project
```bash
# Create branch
git checkout -b feat/tailwind-daisyui

# Initialize npm
npm init -y

# Install dependencies
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest daisyui@latest @tailwindcss/typography@latest

# Generate config files
npx tailwindcss init -p
```

#### Step 2: Configure Tailwind
Create `tailwind.config.js` with content paths, dark mode, theme extensions, and DaisyUI plugin (see [Technical Architecture](#technical-architecture) section).

#### Step 3: Create Source CSS
Create `src/tailwind.css` with Tailwind directives (see above).

#### Step 4: Add Build Scripts
Update `package.json` with build and watch scripts.

#### Step 5: Initial Build
```bash
npm run build:css
# Generates assets/css/tailwind.css (~50-100KB minified)
```

#### Step 6: Update index.html Head
```html
<head>
  <!-- Existing meta tags, fonts, etc. -->
  
  <!-- ADD: Tailwind CSS (before main.css) -->
  <link rel="stylesheet" href="assets/css/tailwind.css" />
  
  <!-- KEEP: main.css (temporarily for comparison) -->
  <link rel="stylesheet" href="assets/css/main.css" />
</head>
```

#### Step 7: Update HTML Tag for Dark Mode
```html
<!-- Add id for JS targeting -->
<html lang="en" id="html-root">
```

#### Step 8: Update Theme Toggle JavaScript
Modify `assets/js/main.js` to add/remove `dark` class on `<html>`:

```javascript
// Find theme toggle code and update
document.getElementById('theme-toggle').addEventListener('click', function() {
  const htmlRoot = document.getElementById('html-root');
  htmlRoot.classList.toggle('dark');
  
  // Store preference
  const isDark = htmlRoot.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Update icon
  const icon = this.querySelector('.theme-icon');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// On load, check preference
window.addEventListener('DOMContentLoaded', function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.getElementById('html-root').classList.add('dark');
    document.querySelector('.theme-icon').classList.remove('fa-moon');
    document.querySelector('.theme-icon').classList.add('fa-sun');
  }
});
```

#### Step 9: Migrate Components (Incremental)

**Example: Content Card Migration**

**Before:**
```html
<div class="content-card">
  <div class="card-header">
    <h3><i class="fas fa-user"></i> About Me</h3>
  </div>
  <div class="about-intro">
    <p>I'm Amit Raj Reddy Dharam...</p>
  </div>
</div>
```

**After:**
```html
<div class="card bg-base-100 shadow-xl mb-6">
  <div class="card-body">
    <h2 class="card-title flex items-center gap-2">
      <i class="fas fa-user text-primary"></i>
      About Me
    </h2>
    <div class="prose prose-lg max-w-none">
      <p>I'm Amit Raj Reddy Dharam...</p>
    </div>
  </div>
</div>
```

**Example: Badge Migration**

**Before:**
```html
<span class="date-badge">August 2024 – May 2026</span>
```

**After:**
```html
<span class="badge badge-secondary badge-outline">August 2024 – May 2026</span>
```

**Example: Button Migration**

**Before:**
```html
<a href="assets/resume/..." class="button primary icon solid fa-eye">
  <span>View Resume</span>
</a>
```

**After:**
```html
<a href="assets/resume/..." class="btn btn-primary gap-2">
  <i class="fas fa-eye"></i>
  <span>View Resume</span>
</a>
```

#### Step 10: Rebuild & Test
```bash
# After each component migration
npm run build:css

# Open index.html in browser
# Check for visual regressions
# Test dark mode toggle
# Test responsive design
```

#### Step 11: Remove Old CSS
Once all components migrated:
1. Comment out most of `assets/css/main.css`
2. Keep only critical CSS (fonts, animations, resets if needed)
3. Consider removing `main.css` entirely if Tailwind covers everything

#### Step 12: Final Optimization
```bash
# Final minified build
npm run build:css

# Check file size
ls -lh assets/css/tailwind.css
# Target: < 100KB

# Commit changes
git add .
git commit -m "Migrate to Tailwind CSS + DaisyUI"
git push -u origin feat/tailwind-daisyui
```

---

## Build & Deployment

### Local Development Workflow
```bash
# Start development (watch mode)
npm run watch:css

# Make HTML changes in index.html
# Tailwind auto-recompiles on save

# Test in browser (Live Server, Python http.server, etc.)
python3 -m http.server 8000
# Open http://localhost:8000
```

### Production Build
```bash
# Create optimized, minified CSS
npm run build:css

# This generates assets/css/tailwind.css with:
# - PurgeCSS (unused classes removed)
# - Minification
# - Autoprefixer (vendor prefixes)
```

### GitHub Pages Deployment (Current Method)
1. **Build locally:**
   ```bash
   npm run build:css
   ```

2. **Commit compiled CSS:**
   ```bash
   git add assets/css/tailwind.css
   git commit -m "Build Tailwind CSS for production"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin feat/tailwind-daisyui
   ```

4. **Create Pull Request** and merge to `main`

5. **GitHub Pages auto-deploys** from `main` branch (settings should be configured)

### Future: GitHub Actions CI/CD (Optional)
If you want to avoid committing build artifacts:

**`.github/workflows/deploy.yml`:**
```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build CSS
        run: npm run build:css
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          publish_branch: gh-pages
```

**Note:** For now, stick with local build + commit approach (simpler).

---

## Testing Strategy

### Component Testing Checklist

For each migrated component, verify:
- [ ] Visual appearance matches original design (or is intentionally improved)
- [ ] Responsive behavior on mobile (375px), tablet (768px), desktop (1920px)
- [ ] Dark mode styling works correctly
- [ ] Hover/focus states function
- [ ] All links/buttons are clickable
- [ ] Icons display correctly
- [ ] Text is readable (contrast, size)

### Browser Compatibility Testing
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Functional Testing
- [ ] **Navigation:** All nav links scroll to correct sections
- [ ] **Theme Toggle:** Dark/light mode switches correctly
- [ ] **External Links:** GitHub, LinkedIn, Devpost open in new tab
- [ ] **Resume Link:** PDF opens correctly
- [ ] **Responsive Menu:** (if added) Mobile menu works
- [ ] **Images:** All images load, lazy loading works
- [ ] **Forms:** (if any) Submission works

### Performance Testing
Run Lighthouse audit:
- [ ] Performance: >= 90
- [ ] Accessibility: >= 95
- [ ] Best Practices: >= 90
- [ ] SEO: >= 95

Check CSS bundle size:
```bash
ls -lh assets/css/tailwind.css
# Target: < 100KB (vs current ~200KB with main.css)
```

### Accessibility Testing
- [ ] Run WAVE (https://wave.webaim.org/)
- [ ] Run axe DevTools
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (test with NVDA/JAWS)
- [ ] Color contrast ratios pass WCAG AA
- [ ] Focus indicators visible

### Regression Testing
Compare side-by-side:
- [ ] Screenshot old version
- [ ] Screenshot new version
- [ ] Verify no unintended layout shifts
- [ ] Verify all content still visible

---

## Rollback Plan

### If Migration Fails
**Option 1: Revert via Git**
```bash
# Discard all changes on branch
git checkout main
git branch -D feat/tailwind-daisyui

# Start over
git checkout -b feat/tailwind-daisyui
```

**Option 2: Partial Rollback**
```bash
# Keep Tailwind setup, revert HTML changes
git checkout HEAD -- index.html

# Or revert specific file
git checkout HEAD -- assets/css/main.css
```

**Option 3: Revert After Merge**
```bash
# If merged to main and deployed
git revert <commit-hash>
git push origin main
# GitHub Pages will redeploy old version
```

### Backup Strategy
Before starting:
```bash
# Tag current state
git tag -a v1.0-pre-tailwind -m "Pre-Tailwind migration backup"
git push origin v1.0-pre-tailwind

# Create backup branch
git checkout -b backup/pre-tailwind
git push origin backup/pre-tailwind

# Return to main
git checkout main
```

---

## Timeline & Milestones

### Estimated Timeline: 8 Days

| Day | Phase | Tasks | Deliverable |
|-----|-------|-------|-------------|
| **1** | Setup | Branch creation, npm init, install deps, config files | Working build process |
| **2** | Integration | Add Tailwind to HTML, update theme toggle JS | Tailwind loaded (unstyled) |
| **3** | Core Layout | Migrate header, nav, main container, footer | Layout structure complete |
| **4** | Content Cards | Migrate all `.content-card` to DaisyUI cards | Cards styled |
| **5** | Components | Migrate badges, buttons, social links, lists | Components complete |
| **6** | Refinement | Dark mode polish, spacing, colors, typography | Visual polish done |
| **7** | Testing | Cross-browser, responsive, accessibility, performance | All tests pass |
| **8** | Deployment | Final build, commit, PR, merge, deploy | Live on GitHub Pages |

### Milestones

#### Milestone 1: Setup Complete ✅
- [x] Branch created
- [x] npm initialized
- [x] Dependencies installed
- [x] Config files created
- [x] Build process working

#### Milestone 2: Tailwind Integrated 🔄
- [ ] Tailwind CSS linked in HTML
- [ ] Dark mode class toggle working
- [ ] Base styles applied

#### Milestone 3: 50% Components Migrated 🔄
- [ ] Header/nav
- [ ] Content cards
- [ ] Badges
- [ ] Primary sections

#### Milestone 4: 100% Components Migrated 🔄
- [ ] All HTML using Tailwind/DaisyUI
- [ ] main.css deprecated
- [ ] Dark mode fully functional

#### Milestone 5: Testing Complete 🔄
- [ ] All browsers tested
- [ ] Lighthouse scores met
- [ ] Accessibility verified

#### Milestone 6: Deployed to Production 🔄
- [ ] Merged to main
- [ ] GitHub Pages live
- [ ] Verified in production

---

## Appendix

### Useful Tailwind/DaisyUI Resources
- **Tailwind Docs:** https://tailwindcss.com/docs
- **DaisyUI Components:** https://daisyui.com/components/
- **Tailwind Cheat Sheet:** https://nerdcave.com/tailwind-cheat-sheet
- **Tailwind Play (Sandbox):** https://play.tailwindcss.com/
- **DaisyUI Themes:** https://daisyui.com/docs/themes/

### Color Palette (Current Site)
Analyze from `main.css` to maintain brand consistency:
- **Primary Accent:** `#49bf9d` (teal/green)
- **Text Primary:** `#787878` (gray)
- **Text Dark:** `#3c3b3b`
- **Background Light:** `#ffffff`
- **Background Dark:** (to be defined for dark mode)

### Responsive Breakpoints (Tailwind)
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### Key Tailwind Classes to Use
- **Layout:** `container`, `flex`, `grid`, `mx-auto`, `px-4`
- **Spacing:** `p-4`, `m-6`, `gap-2`, `space-y-4`
- **Typography:** `text-lg`, `font-bold`, `leading-relaxed`
- **Colors:** `text-primary`, `bg-base-100`, `border-secondary`
- **Effects:** `shadow-xl`, `rounded-lg`, `hover:scale-105`
- **Responsive:** `sm:text-sm`, `lg:w-1/3`, `md:flex-row`

### Common DaisyUI Classes
- **Card:** `card`, `card-body`, `card-title`, `card-actions`
- **Button:** `btn`, `btn-primary`, `btn-outline`, `btn-wide`, `btn-lg`
- **Badge:** `badge`, `badge-primary`, `badge-lg`, `badge-outline`
- **Hero:** `hero`, `hero-content`, `hero-overlay`
- **Drawer:** `drawer`, `drawer-side`, `drawer-content`
- **Swap:** `swap`, `swap-rotate` (for theme toggle)

---

## Questions & Decisions Log

### Q1: Should we keep `main.css`?
**Decision:** Keep temporarily during migration for comparison, then remove or reduce to critical-only CSS (animations, resets).

### Q2: Use Tailwind Typography plugin?
**Decision:** Yes, for content-heavy sections (about, project descriptions). Use `.prose` class.

### Q3: Migrate to Drawer component for mobile nav?
**Decision:** Optional enhancement. Start with existing nav structure, refactor later if needed.

### Q4: Keep jQuery?
**Decision:** Yes, existing scripts depend on it. Out of scope to refactor to vanilla JS now.

### Q5: Commit node_modules?
**Decision:** No, add to `.gitignore`. Only commit `package.json` and `package-lock.json`.

### Q6: Commit compiled `tailwind.css`?
**Decision:** Yes, for simplicity (GitHub Pages serves static files). Alternative CI/CD is future enhancement.

### Q7: Remove Font Awesome?
**Decision:** No, keep it. Already integrated and works well with Tailwind.

### Q8: Use Tailwind's dark mode or custom CSS variables?
**Decision:** Use Tailwind's `dark:` variant + DaisyUI themes for consistency.

---

## Sign-off

This design document outlines a comprehensive, phased approach to migrating the portfolio website to Tailwind CSS + DaisyUI while maintaining functionality and improving maintainability.

**Next Steps:**
1. Review and approve this design document
2. Create branch `feat/tailwind-daisyui`
3. Begin Phase 1: Setup (Day 1)

**Author:** GitHub Copilot  
**Date:** February 16, 2026  
**Status:** Ready for Implementation
