# VELOCE - Car Rental Management System

A full-stack DBMS project demonstrating a professional car rental management system built with React, Node.js, and MySQL.

## 📋 Project Overview

**VELOCE** is a comprehensive car rental management platform submitted to Dr. Amanullah at Bahria University, Islamabad. The system features a dual-interface design with separate client and admin portals.

- **University:** Bahria University, Islamabad
- **Course:** Database Management Systems (DBMS)
- **Supervisor:** Dr. Amanullah
- **Duration:** 2 Weeks (Agile Sprint)
- **Status:** Production-Ready

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Nav/                 # Navigation component
│   ├── Footer/              # Footer component
│   └── Shared/              # Reusable shared components
│       ├── RevealBox.jsx
│       ├── SectionLabel.jsx
│       ├── FeatureCard.jsx
│       ├── TechCard.jsx
│       ├── FutureCard.jsx
│       ├── CarCard.jsx
│       ├── FormComponents.jsx
│       ├── Buttons.jsx
│       └── index.js
│
├── pages/
│   ├── Home/                # Landing page with features
│   ├── Fleet/               # Vehicle browsing & filtering
│   ├── Booking/             # Booking form & confirmation
│   ├── Admin/               # Admin dashboard
│   ├── Database/            # Database schema documentation
│   └── About/               # Project information
│
├── hooks/
│   └── useReveal.js         # Intersection observer animation hook
│
├── constants/
│   ├── designTokens.js      # Colors, fonts, spacing
│   ├── globalStyles.js      # Global CSS with animations
│   └── carData.js           # Fleet and booking data
│
├── utils/
│   └── helpers.js           # Utility functions
│
├── styles/
│   └── (CSS modules/files)
│
├── App.jsx                  # Root component with routing
├── index.jsx                # Entry point
└── index.css                # Global styles

```

## 🎨 Design System

### Colors (designTokens.js)
- **Primary:** `#25D366` (Green)
- **Dark:** `#128C7E`
- **Background:** `#111B21` (Black)
- **Charcoal:** `#1C2B33`
- **Secondary Colors:** Danger, Warn, Info

### Typography
- **Heading Font:** Syne (400, 500, 600, 700, 800)
- **Body Font:** DM Sans (300, 400, 500, 600, Italic)

### Spacing & Radius
- Standard spacing scale: xs (4px) → xxl (48px)
- Border radius: sm (8px) → xl (20px)

## 📦 Key Features

### Client Portal
- 🚘 **Smart Car Browsing** - Filter by price, brand, category, availability
- 📅 **Interactive Booking** - Calendar with automatic cost calculation
- 💳 **Secure Payment** - Stripe & PayPal integration
- 📊 **Booking Dashboard** - Track active, upcoming, and past rentals

### Admin Panel
- 📊 **Real-time Dashboard** - KPIs and live metrics
- 🚗 **Fleet Management** - Add/edit/delete vehicles
- 📅 **Booking Management** - Approve, confirm, or cancel bookings
- 💰 **Dynamic Pricing** - Category-based with seasonal rules
- 📈 **Analytics & Reports** - Revenue, utilization, trends

### Security
- 🔐 **JWT Authentication** - HS256 with 24hr expiry
- 🔒 **Password Hashing** - bcrypt with 12 salt rounds
- 🚦 **RBAC** - Role-based access control (User/Admin)
- 💉 **SQL Injection Guard** - Parameterized queries

## 🗄️ Database Schema (3NF)

### Tables
1. **Users** - Customer accounts with credentials
2. **Cars** - Vehicle inventory with pricing
3. **Bookings** - Rental transactions and history
4. **Payments** - Payment records and status
5. **Admins** - Admin accounts with roles

### Relationships
- Users → Bookings (One-to-Many)
- Cars → Bookings (One-to-Many)
- Bookings → Payments (One-to-One)
- Cascade delete rules for data integrity

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern browser with ES6 support

### Installation

```bash
# Navigate to project directory
cd "Going Abroad/car rental system"

# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output files in `dist/` directory ready for deployment.

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` or `Home` | HomePage | Landing page with hero, features, roadmap |
| `Fleet` | FleetPage | Browse and filter vehicles |
| `Booking` | BookingPage | Booking form with price summary |
| `Admin` | AdminPage | Dashboard with KPIs and bookings |
| `Database` | DatabasePage | Schema documentation |
| `About` | AboutPage | Project information |

## 🎯 Technology Stack

- **Frontend:** React 18.2+, Vite
- **Styling:** Inline styles with design tokens
- **Animation:** CSS keyframes (fade, slide, float, pulse)
- **State Management:** React hooks (useState, useEffect, useRef)
- **Build Tool:** Vite (fast development, optimized builds)

## 📊 Component Hierarchy

```
App
├── Nav
├── HomePage
├── FleetPage
├── BookingPage
├── AdminPage
├── DatabasePage
├── AboutPage
└── Footer
```

## 🔄 Data Flow

```
User Actions → State Updates → Component Re-render → Updated UI
     ↓
Booking Creation → Form Validation → Booking Confirmation → Email
```

## 🎨 Animation System

- **Fade Up:** `.fade-up` - Elements fade in from bottom
- **Reveal:** `.reveal` - Intersection observer scroll reveal
- **Float:** `floatY` - Floating animation for dashboard
- **Pulse:** `pulse` - Attention indicators
- **Staggered Delays:** `.s1` through `.s6` for cascading

## 📈 Performance

- Lazy component loading via React.lazy() (optional enhancement)
- Optimized animations with CSS transforms
- Minimal bundle size with tree-shaking
- Responsive design with CSS Grid/Flexbox

## 🔐 Security Considerations

- Input validation on forms
- XSS protection with React
- CSRF tokens (implement in backend)
- Rate limiting (implement in backend)
- HTTPS/TLS (production deployment)

## 🚀 Future Roadmap

### Phase 2
- 📱 Mobile app (React Native)
- 📍 GPS live tracking
- 🗺️ Google Maps integration

### Phase 3
- 🤖 AI-based recommendations
- 🌍 Multi-city expansion
- 🏙️ City-specific pricing

### Phase 4
- 🏆 Loyalty & rewards system
- ⛓️ Smart contracts (Blockchain)
- 📊 Advanced analytics

## 📝 Code Standards

- Component names: PascalCase (HomePage, AdminPage)
- Constants: UPPER_SNAKE_CASE (CARS, BOOKINGS_DATA)
- Variables/functions: camelCase (setPage, calculateDays)
- File organization: Feature-based folder structure
- Prop destructuring in function params
- Inline JSX styles using design tokens

## 🤝 Contributing

To add new features:
1. Create feature branch
2. Follow project structure conventions
3. Use design tokens for consistency
4. Test all pages before commit

## 📄 License

University Project - Bahria University, Islamabad

## 👨‍🏫 Academic Information

**Submitted to:** Dr. Amanullah  
**Institution:** Bahria University, Islamabad  
**Course:** Database Management Systems (DBMS)  
**Project Type:** Full-Stack Application  
**Database Normalization:** Third Normal Form (3NF)

---

**Built with React · Node.js · MySQL · JWT · Stripe · AWS**
