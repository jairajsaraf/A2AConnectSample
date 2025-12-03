# Figma AI Prompts for CMIS Student Engagement Platform

## 1. Overall Layout Structure

```
Design a modern web application dashboard layout with:
- Fixed sidebar on the left (256px wide) with white background and shadow
- Fixed topbar at the top (64px height) spanning the remaining width
- Main content area with light gray background (#F9FAFB)
- Clean, professional design with rounded corners and subtle shadows
- Color scheme: Primary blue (#2563EB), grays for text hierarchy
- Modern font stack with proper spacing and hierarchy
```

## 2. Sidebar Component

```
Design a vertical sidebar navigation with:
- Width: 256px, full height, white background with shadow
- Header section at top with border-bottom:
  - Logo text "CMIS Portal" in primary blue (#2563EB), bold, 24px
  - Subtitle "Engagement Platform" in gray (#6B7280), 14px
  - Padding: 24px
- Navigation menu with 5 items, each with icon emoji and label:
  - Dashboard (📊 icon)
  - Events (📅 icon)
  - My Registrations (📝 icon)
  - Mentorship (🤝 icon)
  - GA Review (✅ icon, separated with top border)
- Active state: light blue background (#DBEAFE), primary blue text (#1D4ED8), semibold
- Hover state: light gray background (#F3F4F6)
- Each item: 40px emoji icon, label text, 16px padding, 12px rounded corners
- Footer with copyright text "© 2025 CMIS" in small gray text
```

## 3. Topbar Component

```
Design a horizontal top navigation bar with:
- Height: 64px, white background, subtle shadow
- Left side: Search bar with:
  - Max width 512px
  - Light gray border, rounded corners
  - Placeholder text "Search events, people..."
  - Search icon (🔍) on the left inside input
  - Focus state: primary blue ring
- Right side: User profile section with:
  - User name in bold, 14px
  - Email address below in gray, 12px
  - Circular avatar (40px) with user initials
  - Avatar background in primary blue (#3B82F6)
  - White text for initials
- Gap between search and profile: 24px
```

## 4. Dashboard Stats Card Component

```
Design a statistics card with:
- White background, rounded corners (8px), shadow on hover
- Padding: 24px
- Two-column layout:
  - Left: Title (uppercase, gray, 14px), large value (32px, bold, black), subtitle (gray, 12px)
  - Right: Large emoji icon (40px)
- Card displays metrics like "Upcoming Events: 12"
- Hover effect: elevated shadow
- Responsive: stacks in 1-3 column grid
```

## 5. Dashboard Page - Complete Layout

```
Design a student dashboard page with:

1. Welcome header section:
   - Large heading "Hello, [Name]! 👋" (32px, bold)
   - Subtitle "Here's what's happening with your activities" in gray

2. Stats cards row (3 cards in a grid):
   - "Upcoming Events" card: 📅 icon, number, "Available to register"
   - "My Registrations" card: 📝 icon, number, "Total registered"
   - "Pending Reviews" card: ⏳ icon, number, "Awaiting GA approval"

3. Quick Actions section (white card):
   - Title "Quick Actions" (20px, semibold)
   - 3 action buttons in a grid:
     - "Browse Events" with 🎯 icon, "Find your next opportunity"
     - "My Registrations" with 📋 icon, "View registration status"
     - "Mentorship" with 🤝 icon, "Connect with mentors"
   - Each button: light gray border, hover state with primary blue border and background
   - Rounded corners, icon on left, text on right

4. Upcoming Events list (white card):
   - Title "Upcoming Events"
   - List of 3 event items, each showing:
     - Event name (bold)
     - Full date (gray text, smaller)
     - Description
     - Status badge on right (green "Registered ✓" or gray capacity indicator)
   - Each item: light border, rounded, hover background
```

## 6. Events Browse Page

```
Design an events listing page with:

1. Page header:
   - Title "Browse Events" (32px, bold)
   - Subtitle "Discover and register for upcoming events" (gray)

2. Events list (vertical cards):
   - Each event card: white background, rounded corners, shadow, padding 24px
   - Layout:
     - Left side (flex-1):
       - Event name (24px, bold, black)
       - Description paragraph (gray)
       - Metadata row with icons:
         - 📅 Date
         - 👥 Registered count / capacity
         - Spots remaining (orange if ≤10, red lock if full)
     - Right side:
       - Green "Registered ✓" badge if registered
       - OR Blue "Register" button (primary color, white text, hover darker)
       - OR Gray "Full" button (disabled state)
       - Small gray registration ID text below if registered

3. Cards stack vertically with consistent spacing
```

## 7. Mentorship Page - With Request

```
Design a mentorship status page with:

1. Page header:
   - Title "Mentorship" (32px, bold)
   - Subtitle "Connect with experienced mentors in your field" (gray)

2. Two-column layout:

   Left card: "Your Mentorship Request"
   - White background, rounded, shadow
   - Three info sections stacked:
     - Request ID with label and value
     - Preferences (label and value)
     - Status badge (pill-shaped):
       - Green for "Matched"
       - Yellow for "Pending"
       - Gray for other states

   Right card: "What to Expect" (light blue background #EFF6FF)
   - Title
   - Bullet list with checkmarks:
     - Primary blue checkmark (✓) on left
     - Descriptive text for each item
   - 3 items about matching process and timeline
```

## 8. Mentorship Page - Empty State

```
Design an empty state for mentorship with:
- Large white card with rounded corners, centered content
- Padding: 48px
- Large gray text "You haven't requested a mentor yet"
- Smaller gray descriptive text
- Primary blue button "Browse Events"
- Button: rounded, padding 12px 24px, white text
- Hover state: darker blue
```

## 9. Color Palette Reference

```
Create a design system with these colors:
- Primary: #2563EB (buttons, links, active states)
- Primary Light: #DBEAFE (active backgrounds)
- Primary Dark: #1D4ED8 (hover states)
- Success: #10B981 (registered badges)
- Success Light: #D1FAE5 (success backgrounds)
- Warning: #F59E0B (low spots warnings)
- Gray 900: #111827 (headings)
- Gray 700: #374151 (body text)
- Gray 600: #4B5563 (secondary text)
- Gray 500: #6B7280 (muted text)
- Gray 300: #D1D5DB (borders)
- Gray 100: #F3F4F6 (hover backgrounds)
- Gray 50: #F9FAFB (page background)
- White: #FFFFFF (cards, sidebar)
```

## 10. Typography System

```
Define typography with:
- Headings:
  - H1: 32px, bold, gray-900
  - H2: 24px, semibold, gray-900
  - H3: 20px, semibold, gray-900
- Body:
  - Large: 16px, normal, gray-700
  - Regular: 14px, normal, gray-700
  - Small: 12px, normal, gray-500
- Uppercase labels: 14px, medium, gray-600, uppercase, tracking-wide
- Line height: 1.5 for body, 1.2 for headings
- Font family: System UI stack (Inter/SF Pro-style)
```

## 11. Component Spacing & Borders

```
Design with consistent spacing:
- Card padding: 24px
- Section spacing: 32px vertical between major sections
- Grid gaps: 24px
- Border radius: 8px for cards, 6px for buttons
- Shadows:
  - Default: subtle (0 1px 3px rgba(0,0,0,0.1))
  - Hover: elevated (0 4px 6px rgba(0,0,0,0.1))
- Borders: 1px solid gray-200 (#E5E7EB)
```

## Usage Instructions

Each prompt above can be pasted directly into Figma AI to generate the corresponding UI component or page layout. For best results:

1. Start with the overall layout structure
2. Create individual components (Sidebar, Topbar, Cards)
3. Compose full pages using the component prompts as reference
4. Use the color palette and typography system for consistency
5. Adjust spacing and sizing based on your specific needs

The design follows modern dashboard UI patterns with clean aesthetics, proper hierarchy, and accessible color contrast ratios.
