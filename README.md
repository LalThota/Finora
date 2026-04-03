# Finora Intelligence | Next-Gen Financial Dashboard

Finora Intelligence is a premium, high-fidelity financial management platform built with **React**, **Tailwind CSS**, and **Framer Motion**. It provides real-time financial insights, advanced spending analytics, and role-based interface control with a stunning glassmorphism aesthetic.

---

## 🚀 Live Features

### 1. Dashboard Intelligence
- **Dynamic Summary Cards**: Real-time tracking of Total Balance, Monthly Income, and Monthly Expenses with percentage trend indicators.
- **AI-Driven Insights**: Automated generation of financial observations, including top expense categories, savings rates, and weekly spending momentum.
- **Visual Analytics**: Interactive time-based trend charts and categorical spending breakdowns using Recharts.

### 2. Advanced Transaction Management
- **Full CRUD Operations**: Admins can Create, Read, Update, and Delete transactions.
- **High-Performance Filtering**: Instant search by description or category and filtering by transaction type (Income/Expense).
- **Persistent Data**: All transaction data and user preferences are persisted locally via `localStorage`.
- **Data Export**: One-click Export to CSV functionality for professional record keeping.

### 3. Role-Based Experience (RBAC)
- **Admin Role**: Full control over financial data (Add/Edit/Delete).
- **Viewer Role**: Read-only access to dashboard and analytics, ideal for auditing or sharing reports without risk of data modification.
- **Global Sync**: Seamlessly toggle roles and user profile information across the entire application.

### 4. Premium UI/UX & Responsiveness
- **Glassmorphism Aesthetic**: Modern, tech-forward design with translucent surfaces, backdrop blurs, and animated mesh backgrounds.
- **Dark Mode Support**: Native dark and light mode synchronization with a dedicated toggle.
- **Extreme Responsiveness**: Fully optimized layout for Desktop, Tablet (iPad), and Mobile (iPhone) using fluid grids and adaptive components.
- **Micro-Animations**: Smooth transitions and hover effects powered by Framer Motion.

---

## 🛠️ Technical Stack

- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Context API](https://reactjs.org/docs/context.html)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository** (or download files):
   ```bash
   # No actual git required if you have the files
   cd zyronxy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🧠 Implementation Approach

- **State Management**: Used a centralized `AppProvider` (Context API) to handle transaction history, user profiles, notifications, and navigation state. This ensures that updates in the "Settings" view instantly reflect in the Sidebar and Header.
- **Modularity**: Components are decoupled (e.g., `SummaryCard`, `ChartSection`, `Insights`) for maintainability and scalability.
- **Performance**: Leveraged React `useMemo` for heavy computation of financial stats and insights, preventing unnecessary re-renders.
- **Design System**: Implemented a custom Tailwind configuration for mesh animations and a curated color palette (Primary: Indigo-600, Emerald/Rose for financial signals).

---

## 📈 Evaluation Checklist

- [x] **Dashboard Overview**: Summary cards, trends, and breakdown charts.
- [x] **Transactions**: Full listing, search, filter, and sort.
- [x] **Role Selection**: Toggle between Admin and Viewer roles.
- [x] **Insights**: AI-generated financial high-level observations.
- [x] **Responsiveness**: Tested across all device breakpoints.
- [x] **Dark Mode**: Integrated and functional.
- [x] **Persistence**: LocalStorage integration for data.

---

### Author
Developed by **Antigravity AI** for the **Finora Intelligence** project.
