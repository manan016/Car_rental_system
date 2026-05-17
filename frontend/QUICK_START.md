# VELOCE CRMS - Quick Start Guide

## 🚀 Start Here

### 1. **Installation** (2 minutes)
```bash
cd "Going Abroad/car rental system"
npm install
```

### 2. **Run Development Server**
```bash
npm run dev
```
Open browser → `http://localhost:3000`

### 3. **Explore Pages**
- **Home** - Landing page with hero section
- **Fleet** - Browse and filter vehicles
- **Booking** - Book a car with pricing calculator
- **Admin** - Dashboard with KPIs and bookings
- **Database** - View schema documentation
- **About** - Project information

---

## 📁 File Organization

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/pages/` | 6 main pages (Home, Fleet, Booking, Admin, Database, About) |
| `src/components/Shared/` | 9 reusable UI components |
| `src/constants/` | Design tokens, global styles, data |
| `src/hooks/` | Custom React hooks (useReveal) |
| `src/utils/` | Helper functions |

---

## 🎯 Project Features

### Client Portal
✅ Browse cars with filters  
✅ Interactive booking form  
✅ Automatic price calculation  
✅ Booking confirmation  

### Admin Panel
✅ Real-time dashboard  
✅ Booking management  
✅ KPI metrics  
✅ Fleet statistics  

### Security
✅ JWT authentication ready  
✅ Role-based access control  
✅ Password hashing support  
✅ SQL injection protection  

---

## 🔧 Development

### Add New Component
```javascript
// src/components/Shared/NewComponent.jsx
export const NewComponent = ({ prop }) => {
  return <div>{prop}</div>;
};
```

### Add New Page
```javascript
// src/pages/NewPage/NewPage.jsx
export const NewPage = () => {
  return <div>New Page</div>;
};

// src/pages/NewPage/index.js
export { NewPage } from "./NewPage";
```

### Use Design Tokens
```javascript
import { Colors, Spacing, BorderRadius } from "../../constants/designTokens";

style={{
  background: Colors.green,
  padding: Spacing.lg,
  borderRadius: BorderRadius.xl,
}}
```

---

## 📊 Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main routing and state |
| `src/constants/designTokens.js` | Color palette & spacing |
| `src/constants/carData.js` | Fleet and booking data |
| `src/constants/globalStyles.js` | Global CSS & animations |
| `index.html` | HTML entry point |
| `package.json` | Dependencies |

---

## 🎨 Design System

### Colors
```javascript
Colors.green        // #25D366 (Primary)
Colors.black        // #111B21 (Background)
Colors.charcoal     // #1C2B33 (Cards)
Colors.danger       // #EF476F (Red)
Colors.warn         // #FFD166 (Yellow)
Colors.info         // #118AB2 (Blue)
```

### Spacing
```javascript
xs: "4px"
sm: "8px"
md: "16px"
lg: "24px"
xl: "32px"
xxl: "48px"
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```
Output in `dist/` folder ready for deployment.

### Preview Build Locally
```bash
npm run preview
```

---

## 📝 Code Standards

- **Components:** PascalCase + `.jsx`
- **Constants:** UPPER_SNAKE_CASE
- **Functions:** camelCase
- **Props:** Destructured in params
- **Styles:** Inline with design tokens

---

## 🐛 Common Tasks

### Filter Cars by Category
```javascript
const filtered = CARS.filter(c => 
  filter === "all" || c.cat === filter
);
```

### Calculate Booking Days
```javascript
import { calculateDays } from "../../utils/helpers";
const days = calculateDays(startDate, endDate);
```

### Animate on Scroll
```javascript
import { RevealBox } from "../../components/Shared";
<RevealBox><Content /></RevealBox>
```

---

## 📱 Pages Map

```
App (routing logic)
├── Nav (fixed header)
├── Home Page (landing)
├── Fleet Page (car browse)
├── Booking Page (booking form)
├── Admin Page (dashboard)
├── Database Page (schema)
├── About Page (project info)
└── Footer
```

---

## 🔑 Key Components

### RevealBox
Reveals content on scroll intersection:
```jsx
<RevealBox><FeatureCard {...props} /></RevealBox>
```

### SectionLabel
Section header with underline:
```jsx
<SectionLabel>Platform Features</SectionLabel>
```

### CarCard
Vehicle display card:
```jsx
<CarCard car={carData} onBook={() => setPage("Booking")} />
```

---

## 💾 State Management

### Global State in App.jsx
```javascript
const [page, setPage] = useState("Home");
const [bookingCar, setBookingCar] = useState(null);
```

### Pass Down to Pages
```jsx
<HomePage setPage={setPage} />
<FleetPage setPage={setPage} setBookingCar={setBookingCar} />
```

---

## 📚 Database Schema

### 5 Core Tables
- **Users** - Customer accounts
- **Cars** - Vehicle inventory
- **Bookings** - Rental transactions
- **Payments** - Payment records
- **Admins** - Admin accounts

### Relationships
- Users → Bookings (1:N)
- Cars → Bookings (1:N)
- Bookings → Payments (1:1)

---

## 🎯 Next Steps

1. ✅ Run `npm install` and `npm run dev`
2. ✅ Explore all 6 pages
3. ✅ Review component structure in `src/`
4. ✅ Check design tokens in `constants/`
5. ✅ Read STRUCTURE.md for detailed architecture
6. ✅ Customize with your data
7. ✅ Connect backend API (Node.js + MySQL)

---

## 📞 Support

- **Course:** Database Management Systems
- **Supervisor:** Dr. Amanullah
- **University:** Bahria University, Islamabad
- **Tech Stack:** React + Vite + MySQL (backend)

---

**Happy Coding! 🚀**
