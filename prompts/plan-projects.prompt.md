# Plan: Add Images and Links to Project Cards

This plan will enhance each project tile with a featured image and action buttons (GitHub/Demo links) while maintaining the existing glass morphism design, teal color scheme, and dark mode compatibility. The implementation will use the template's existing CSS patterns and grid system for a cohesive, professional look.

## Steps

1. **Create placeholder images** in a new `images/projects` directory (or use existing `images/thumbs` temporarily). Add 3 placeholder images (one for each project: WardrobeAI, Tom-Riddle's Diary, Vizards).

2. **Add CSS for project images** in `assets/css/main.css` (or `assets/sass/main.scss` if compiling):
   - `.project-image` container with border-radius matching card style (20px)
   - Overflow hidden for clean corners
   - Aspect ratio control (16:9 or 3:2 recommended)
   - Hover effects for interactivity (subtle scale/brightness)
   - Dark mode variant with `[data-theme="dark"]` selector

3. **Add CSS for project links section** in `assets/css/main.css`:
   - `.project-links` container using flexbox
   - Gap between buttons (0.8em)
   - Responsive wrapping for mobile
   - Extend existing `.button` styles if needed
   - Ensure buttons work in both light and dark modes

4. **Update HTML structure** in `index.html` (lines 241-330) for all 3 project cards:
   - Add `<div class="project-image">` with `<span class="image fit">` after opening `.content-card`
   - Insert placeholder image source
   - Add `<div class="project-links">` section before closing `.content-card`
   - Include two buttons per project: GitHub link (`.button.primary`) and Live Demo link (`.button`)
   - Use FontAwesome icons: `fa-github` for code, `fa-external-link-alt` for demo
   - Set `href="#"` as placeholder for URLs (user will replace)

5. **Test responsive behavior** across breakpoints:
   - Verify images scale properly on mobile/tablet/desktop
   - Ensure buttons stack vertically on small screens
   - Confirm glass morphism effects remain intact
   - Check dark mode appearance

## Verification

- Open `index.html` in browser
- Navigate to Projects section
- Confirm each project shows an image at the top
- Verify two buttons appear at bottom of each card
- Toggle dark mode to check styling consistency
- Resize browser to test responsive layout (mobile: 480px, tablet: 768px, desktop: 1280px)
- Hover over images and buttons to see effects

## Decisions

- **Image placement:** Above card header (not beside) to maintain clean vertical flow and work better on mobile
- **Image aspect ratio:** 16:9 or 3:2 for modern web standard and consistency across projects
- **Button layout:** Horizontal flex row with wrapping, using existing `.button` component classes
- **Placeholder strategy:** Use either existing `images/thumbs` or add new placeholder to `images/projects` directory
- **CSS location:** Add styles to `assets/css/main.css` directly (or compile from `assets/sass/main.scss` if SASS workflow is set up)
- **Link types:** Two links per project (GitHub repository + Live Demo/Devpost) following common portfolio patterns
