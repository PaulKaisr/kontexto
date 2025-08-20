# Progress Indicator Header Feature

## Overview

Added a small progress indicator in the header of the app showing the user's progress compared to the total number of available games.

## Implementation

### 1. Progress Indicator Component (`src/components/ProgressIndicator.vue`)

**Features:**

- **Visual progress circle**: Shows completion percentage with primary color
- **Compact display**: Shows completed count inside the circle
- **Responsive text**: Additional "X/Y" text on larger screens
- **Interactive tooltip**: Detailed progress information on hover
- **Clickable**: Opens the PreviousGames dialog when clicked

**Progress calculation:**

- Fetches all available games from the database
- Compares against games marked as "Gelöst" (solved) or "Aufgegeben" (given up)
- Shows percentage completion and absolute numbers

### 2. Enhanced Game Store (`src/stores/game.store.ts`)

**New Getter:**

```typescript
progressStats(state) {
  // Returns { completed: number, total: number, percentage: number }
}
```

### 3. Updated Game Component (`src/components/Game.vue`)

**Header Integration:**

- Replaced left spacer div with ProgressIndicator component
- Added ref to ContextMenu for dialog opening
- Connected progress indicator click to PreviousGames dialog

### 4. Enhanced ContextMenu (`src/components/ContextMenu.vue`)

**New Exposed Method:**

```typescript
defineExpose({
  openPreviousGamesDialog,
});
```

## Visual Design

### Progress Circle

- **Size**: 24px diameter, 3px stroke width
- **Color**: Primary theme color
- **Content**: Number of completed games inside the circle
- **Animation**: Subtle hover scale effect (1.1x)

### Layout

- **Position**: Left side of header (replaces previous spacer)
- **Responsive**: Shows additional text on screens ≥ small breakpoint
- **Alignment**: Vertically centered with app title

### Tooltip

- **Position**: Bottom placement
- **Content**: "Fortschritt: X von Y Spielen abgeschlossen (Z%)"
- **Language**: German, matching app locale

## User Experience

### Visual Feedback

- **Progress at a glance**: Users can immediately see their overall progress
- **Encouraging**: Visual completion percentage motivates continued play
- **Accessible**: Clear numerical indicators and meaningful tooltip text

### Interaction

- **One-click access**: Clicking the indicator opens the PreviousGames dialog
- **Hover feedback**: Tooltip provides detailed progress information
- **Responsive**: Adapts display density to screen size

### Integration

- **Seamless**: Uses existing PreviousGames dialog infrastructure
- **Consistent**: Matches app's visual design language
- **Non-intrusive**: Only appears when games are available

## Technical Benefits

### Performance

- **Efficient**: Only fetches game list once on mount
- **Reactive**: Updates automatically when game progress changes
- **Lightweight**: Minimal DOM footprint and computation

### Maintainability

- **Modular**: Self-contained component with clear responsibilities
- **Reusable**: Could be used in other parts of the app if needed
- **Type-safe**: Full TypeScript support with proper interfaces

### Accessibility

- **Semantic**: Uses proper ARIA labels and tooltip structure
- **Keyboard**: Clickable element is focusable and keyboard-accessible
- **Screen readers**: Meaningful text content for assistive technologies

## Usage Examples

### New User (0% completion)

- Circle shows "0" with 0% fill
- Text shows "0/5" (assuming 5 available games)
- Tooltip: "Fortschritt: 0 von 5 Spielen abgeschlossen (0%)"

### Partial Progress (60% completion)

- Circle shows "3" with 60% fill in primary color
- Text shows "3/5"
- Tooltip: "Fortschritt: 3 von 5 Spielen abgeschlossen (60%)"

### Complete Progress (100% completion)

- Circle shows "5" with 100% fill
- Text shows "5/5"
- Tooltip: "Fortschritt: 5 von 5 Spielen abgeschlossen (100%)"

This feature provides users with immediate visual feedback about their overall progress across all Kontexto games, encouraging continued engagement while maintaining the app's clean, focused design.
