# Cookie Consent Implementation

This document describes the GDPR-compliant cookie consent implementation for Kontexto.

## Overview

The cookie consent system provides users with full control over their privacy preferences while ensuring compliance with GDPR and other privacy regulations.

## Components

### 1. Cookie Store (`stores/cookies.store.ts`)

- Manages user consent preferences
- Handles local storage of consent decisions
- Applies analytics settings based on consent

**Cookie Categories:**

- **Necessary**: Always enabled, cannot be disabled (game state, preferences)
- **Analytics**: Optional, user can control (Google Analytics)
- **Marketing**: Reserved for future use, currently unused

### 2. Cookie Consent Banner (`components/CookieConsent.vue`)

- Modal dialog that appears on first visit
- Detailed cookie information with expandable sections
- Multiple consent options (Accept All, Necessary Only, Custom)
- Settings management through floating action button

### 3. Analytics Service (`services/analytics.ts`)

- GDPR-compliant Google Analytics wrapper
- Only initializes when user has given consent
- Implements Google's Consent Mode

### 4. Analytics Composable (`composables/useAnalytics.ts`)

- Vue composable for tracking events
- Automatically checks consent before tracking
- Provides game-specific tracking methods

## User Experience Flow

1. **First Visit**: Cookie banner appears after 1 second delay
2. **User Choice**:
   - "Accept All" - Enables all cookies
   - "Necessary Only" - Enables only required cookies
   - "Customize" - Allows granular control
3. **Settings Access**: Floating button for changing preferences later
4. **Persistent Storage**: Choices saved in localStorage

## Technical Implementation

### Google Analytics Consent Mode

```javascript
// Default consent state (all denied)
gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  wait_for_update: 500,
});

// Updated when user gives consent
gtag("consent", "update", {
  analytics_storage: "granted",
});
```

### Event Tracking

The system tracks these game events (with consent):

- `game_start` - New game loaded
- `game_complete` - User guesses correctly
- `give_up` - User gives up
- `hint_used` - User requests hint
- Page views and custom events

### Data Storage

- **LocalStorage Keys**:
  - `kontexto-cookie-consent` - Boolean consent status
  - `kontexto-cookie-preferences` - JSON object with preferences

## Privacy Features

### Data Minimization

- Only collects necessary data
- Anonymizes IP addresses in Google Analytics
- No personal data stored locally

### User Rights

- **Withdraw Consent**: Users can change preferences anytime
- **Transparent Information**: Clear explanation of each cookie type
- **Granular Control**: Individual cookie category control

### GDPR Compliance

- Explicit consent required for non-necessary cookies
- Clear cookie information provided
- Easy withdrawal mechanism
- Updated privacy policy with cookie details

## Cookie Details

### Necessary Cookies

- **Purpose**: Essential for game functionality
- **Data**: Game state, user preferences, consent status
- **Duration**: Persistent (no expiration set by us)
- **Legal Basis**: Legitimate interest (Art. 6(1)(f) GDPR)

### Analytics Cookies (Google Analytics)

- **Purpose**: Website usage statistics
- **Data**: Anonymized usage patterns, page views
- **Duration**: Up to 24 months (Google's default)
- **Legal Basis**: Consent (Art. 6(1)(a) GDPR)
- **Third Party**: Google LLC (Privacy Shield certified)

### Marketing Cookies

- **Status**: Not currently implemented
- **Purpose**: Reserved for future advertising features
- **Legal Basis**: Would require explicit consent

## Development Notes

### Testing Cookie Consent

- Use browser dev tools to clear localStorage
- Test different consent scenarios
- Verify analytics only loads with consent

### Debugging

- Check `kontexto-cookie-consent` in localStorage
- Monitor network requests to Google Analytics
- Use `analytics.initialized` to check status

### Future Enhancements

- Cookie policy generator
- More granular analytics controls
- Integration with other tracking services
- A/B testing framework with consent

## Browser Support

- Modern browsers with localStorage support
- Graceful degradation for older browsers
- Mobile-responsive design
- Keyboard navigation support

## Compliance Status

✅ **GDPR Compliant**

- Explicit consent for non-necessary cookies
- Clear information provided
- Easy withdrawal mechanism
- Data minimization principles

✅ **ePrivacy Directive Compliant**

- User consent for tracking cookies
- Clear cookie information
- Opt-out mechanisms provided

✅ **Accessibility Compliant**

- ARIA labels and descriptions
- Keyboard navigation
- Screen reader support
- High contrast design
