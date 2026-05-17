# Project Structure Documentation

## Directory Organization

```
car-rental-system/
│
├── src/                          # Source code
│   ├── components/               # Reusable components
│   │   ├── Nav/                  # Navigation bar
│   │   │   ├── Nav.jsx
│   │   │   └── index.js
│   │   ├── Footer/               # Footer
│   │   │   ├── Footer.jsx
│   │   │   └── index.js
│   │   └── Shared/               # Shared UI components
│   │       ├── RevealBox.jsx     # Intersection observer wrapper
│   │       ├── SectionLabel.jsx  # Section header with underline
│   │       ├── FeatureCard.jsx   # Feature showcase card
│   │       ├── TechCard.jsx      # Technology stack card
│   │       ├── FutureCard.jsx    # Roadmap feature card
│   │       ├── CarCard.jsx       # Vehicle card
│   │       ├── FormComponents.jsx # FormRow, FormField
│   │       ├── Buttons.jsx       # AdminBtn, ActionBtn
│   │       └── index.js          # Barrel export
│   │
│   ├── pages/                    # Page components
│   │   ├── Home/                 # Landing page
│   │   │   ├── HomePage.jsx
│   │   │   └── index.js
│   │   ├── Fleet/                # Vehicle browsing
│   │   │   ├── FleetPage.jsx
│   │   │   └── index.js
│   │   ├── Booking/              # Booking form
│   │   │   ├── BookingPage.jsx
│   │   │   └── index.js
│   │   ├── Admin/                # Admin dashboard
│   │   │   ├── AdminPage.jsx
│   │   │   └── index.js
│   │   ├── Database/             # Schema documentation
│   │   │   ├── DatabasePage.jsx
│   │   │   └── index.js
│   │   └── About/                # Project info
│   │       ├── AboutPage.jsx
│   │       └── index.js
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useReveal.js          # Scroll reveal animation
│   │
│   ├── constants/                # App constants
│   │   ├── designTokens.js       # Design system (colors, fonts, spacing)
│   │   ├── globalStyles.js       # Global CSS & animations
│   │   └── carData.js            # Static data (cars, bookings, pricing)
│   │
│   ├── utils/                    # Utility functions
│   │   └── helpers.js            # Common helper functions
│   │
│   ├── styles/                   # (CSS modules if needed)
│   │   └── (empty - using inline styles)
│   │
│   ├── App.jsx                   # Root component
│   ├── index.jsx                 # Entry point
│   └── index.css                 # Global styles
│
├── public/                       # Static assets
│   └── (empty - using emoji icons)
│
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies & scripts
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── README.md                     # Project documentation
└── STRUCTURE.md                  # This file
```

## File Naming Conventions

### Components
- **Files:** PascalCase with .jsx extension
  - `HomePage.jsx`, `CarCard.jsx`, `AdminBtn.jsx`
- **Exports:** Default or named exports

### Data/Constants
- **Files:** camelCase or UPPER_CASE
  - `designTokens.js`, `carData.js`, `globalStyles.js`

### Hooks
- **Files:** useXxx convention
  - `useReveal.js`, `useForm.js`

### Utilities
- **Files:** descriptive camelCase
  - `helpers.js`, `validators.js`, `formatters.js`

## Component Organization

### Page Components
Located in `src/pages/`, each page:
- Has its own folder (e.g., `Home/`, `Fleet/`)
- Contains PageName.jsx and index.js
- Manages page-specific state
- Imports shared components

### Shared Components
Located in `src/components/Shared/`:
- Reusable across multiple pages
- Don't manage complex state
- Export via index.js barrel file

### Navigation & Layout
Located in `src/components/`:
- Nav.jsx - Fixed navigation bar
- Footer.jsx - Site footer
- Both have their own folders

## State Management

### Current Architecture
- React hooks (useState, useEffect, useRef)
- Lifted state in App.jsx
- Props drilling for page routing and callbacks

### Key State Variables
```javascript
[page, setPage]           // Current page (Home, Fleet, Booking, etc.)
[bookingCar, setBookingCar] // Selected car for booking
```

### Future Enhancements
- Context API for theme/settings
- Redux or Zustand for complex state
- React Query for server state

## Data Flow

```
User Action (onClick, onChange)
    ↓
Handler Function (updateForm, selectFilter)
    ↓
State Update (setState)
    ↓
Component Re-render
    ↓
Updated UI
```

## Styling Approach

### Design Tokens
All styling uses constants from `designTokens.js`:
```javascript
Colors.green         // #25D366
Colors.charcoal      // #1C2B33
BorderRadius.lg      // 16px
Spacing.md           // 16px
```

### Inline Styles
No CSS files - all styles inline with:
```javascript
style={{
  background: Colors.green,
  padding: Spacing.lg,
  borderRadius: BorderRadius.lg,
}}
```

### Global CSS
Injected from `globalStyles.js`:
- Font imports
- Reset styles
- Animations (@keyframes)
- Utility classes (.fade-up, .reveal, .s1-s6)

## Import Patterns

### Components
```javascript
// From Shared
import { SectionLabel, RevealBox } from "../../components/Shared";

// From Pages
import { HomePage } from "./pages/Home";

// From other files
import { Colors } from "../../constants/designTokens";
```

### Barrel Exports
```javascript
// In src/components/Shared/index.js
export { RevealBox } from "./RevealBox";
export { SectionLabel } from "./SectionLabel";
```

## Build & Deployment

### Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### Production Build
```bash
npm run build
# Creates dist/ folder with optimized build
```

### Preview Build
```bash
npm run preview
# Preview production build locally
```

## Environment Variables

Create `.env` file (copy from `.env.example`):
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Performance Considerations

- Vite for fast HMR in development
- Code splitting via route-based components
- CSS animations use transforms (GPU accelerated)
- Minimal dependencies (React + Vite)
- Tree-shaking for unused code removal

## Future Scalability

### Folder Structure Ready For:
- Multiple app sections (admin dashboard subdivisions)
- Feature flags and A/B testing
- Internationalization (i18n)
- Theme switching
- Testing (tests/ directory)

### Recommended Additions:
```
├── tests/
│   ├── components/
│   ├── pages/
│   └── utils/
├── hooks/
├── context/
├── services/
│   └── api.js
└── types/
    └── index.d.ts
```

## Documentation

- **README.md** - Project overview and setup
- **STRUCTURE.md** - This file (architecture)
- **Inline Comments** - Component documentation
- **JSDoc Comments** - Function documentation

Each component has a description comment at the top:
```javascript
/**
 * ComponentName Component
 * Brief description of what it does
 */
```

## Contributors & Credits

- **Project:** VELOCE CRMS
- **Institution:** Bahria University, Islamabad
- **Supervisor:** Dr. Amanullah
- **Course:** Database Management Systems (DBMS)

---

Last Updated: May 17, 2026
