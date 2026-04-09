# Plan: Google Analytics Integration for Portfolio Website

**TL;DR**: Implement Google Analytics 4 (GA4) with comprehensive visitor tracking, custom events for portfolio interactions, and privacy-compliant setup. Focus on capturing meaningful engagement metrics like section navigation, resume downloads, theme preferences, and external link clicks while maintaining site performance and GDPR compliance.

**Key Decisions Made**:
- Chosen GA4 over Universal Analytics (sunset in 2023)
- Privacy-first approach with consent banner implementation
- Custom SPA tracking for hash-based navigation
- Enhanced event tracking for portfolio-specific interactions

## Steps

### 1. Set up Google Analytics Account and Property
   - Create GA4 property in Google Analytics console
   - Configure basic settings (timezone: America/Phoenix, currency: USD)
   - Generate Measurement ID (format: G-XXXXXXXXXX)
   - Set up enhanced measurement features for scroll tracking and file downloads

### 2. Implement Privacy Compliance Infrastructure
   - Add privacy policy page to website structure
   - Create cookie consent banner component with accept/decline options
   - Integrate with localStorage to remember consent preferences
   - Add cookie policy documentation explaining analytics usage
   - **Files to modify**: [index.html](index.html), new `privacy.html` page

### 3. Install GA4 Tracking Code in HTML Head
   - Add Global Site Tag (gtag.js) in [index.html](index.html) `<head>` section after line 25
   - Position after preload directives but before [assets/css/main.css](assets/css/main.css) link
   - Configure consent mode integration with privacy banner
   - Implement conditional loading based on user consent
   - **Target location**: Between existing meta tags and CSS imports

### 4. Configure Single-Page Application (SPA) Tracking
   - Modify [assets/js/main.js](assets/js/main.js) `activateSection()` function around line 104-120
   - Add custom page view tracking for hash-based navigation (#about, #education, #experience, etc.)
   - Implement virtual pageview events when sections change
   - Track time spent in each portfolio section
   - **Custom events**: `section_view`, `navigation_pattern`, `engagement_depth`

### 5. Implement Custom Event Tracking
   - **Resume Downloads**: Track PDF clicks in resume section
   - **External Link Engagement**: Monitor LinkedIn, GitHub, Devpost, email clicks
   - **Theme Switching**: Track dark/light mode preferences (modify theme toggle around line 158-170 in [assets/js/main.js](assets/js/main.js))
   - **Project Interactions**: Track which projects generate most interest
   - **Gallery Usage**: Monitor lightbox interactions using existing poptrox library events

### 6. Add Enhanced Ecommerce and Conversion Tracking
   - Configure custom conversions for key portfolio goals:
     - Resume download completion
     - Contact form submissions (if implemented)
     - Social media link clicks
     - External project link engagement
   - Set up goal funnels: Portfolio View → Section Engagement → Contact Action

### 7. Create Custom Dimensions and Metrics
   - **Custom Dimension 1**: Preferred theme (dark/light)
   - **Custom Dimension 2**: Entry section (which section user lands on)
   - **Custom Dimension 3**: Device type enhancement beyond default GA4
   - **Custom Metric**: Section engagement time
   - **Custom Metric**: Portfolio completion rate (viewed all sections)

### 8. Performance Optimization
   - Implement gtag loading with `async` attribute to prevent render blocking
   - Add gtag to existing preconnect directives: `<link rel="preconnect" href="https://www.googletagmanager.com">`
   - Configure sampling rate for high-traffic scenarios (set to 100% initially)
   - Monitor Core Web Vitals impact after implementation

### 9. Analytics Dashboard Configuration
   - Create custom dashboard for portfolio-specific metrics
   - Configure alerts for unusual traffic patterns or goal completions
   - Set up weekly automated reports for key metrics:
     - Visitor demographics and behavior
     - Most engaging portfolio sections
     - Resume download conversion rate
     - Theme preference trends

### 10. Testing and Validation
   - Install GA4 Debug Mode for development testing
   - Use Google Tag Assistant to verify proper implementation
   - Test all custom events in GA4 Real-Time reports
   - Validate SPA navigation tracking across all sections
   - Create test traffic scenarios for quality assurance

## Verification

### Manual Testing Checklist
- [ ] Privacy banner appears on first visit and respects user choice
- [ ] GA4 Real-Time shows visitor activity during browsing
- [ ] Section navigation triggers custom page views (check in GA4 Debug Mode)
- [ ] Resume download events appear in GA4 Events report
- [ ] Theme switching events recorded with proper parameters
- [ ] External link clicks tracked with destination URLs
- [ ] All portfolio sections register proper engagement metrics

### Technical Validation Commands
```bash
# Test GA4 implementation in browser console
gtag('config', 'GA_MEASUREMENT_ID', { debug_mode: true });

# Verify custom events in browser dev tools
gtag('event', 'test_event', {
  'event_category': 'engagement',
  'event_label': 'manual_test'
});