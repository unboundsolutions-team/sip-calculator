# UnboundSIP v2 - Advanced Mutual Fund Planner

A high-performance Next.js 15 application for professional-grade financial planning. UnboundSIP goes beyond basic calculators by linking your accumulation (SIP) and withdrawal (SWP) phases into a single, intelligent retirement lifecycle.

## 🚀 New in v2.0
- **Inflation Adjustment** — See your future corpus in "today's purchasing power" using a dynamic inflation slider.
- **Lump Sum Initial Investment** — Model portfolios that start with existing capital alongside monthly SIPs.
- **12.5% LTCG Tax Estimation** — Automatically calculates post-tax wealth based on the latest Indian tax regime (gains > 1.25L).
- **Enhanced Stat UI** — New "Real Value" (blue) theme to distinguish inflation-adjusted metrics from nominal figures.

## Core Features
- **SIP Calculator** — Monthly compounding, annual step-up, wealth multiple, and exhaustive year-by-year tables.
- **SWP Calculator** — Model corpus drawdown, check sustainability, and plan annual withdrawal step-ups.
- **Combined Plan** — The signature feature. Chain SIP → SWP with a linked slider that auto-adjusts your required SIP based on your desired monthly retirement income.
- **No Artificial Limits** — Enter any value from ₹1 to ₹100 Cr. Sliders dynamically rescale as you type or drag.
- **Interactive Visualization** — High-fidelity Recharts area charts for growth and drawdown visualization.

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v3 |
| **Charts** | Recharts |
| **Icons** | Custom Unicode / SVG |
| **Fonts** | Playfair Display (Serif), DM Mono, DM Sans |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Build for production
```bash
npm run build
npm start
```

---

## Project Structure
```text
/app             # Next.js App Router (Pages & Layouts)
/components      # UI Components & Calculator Logic
  /calculators   # Core SIP, SWP, and Plan logic components
  /ui            # Reusable UI elements (Cards, Sliders, StatPills)
/lib             # Financial Math engine (calculations.ts) & Utilities
/public          # Static assets
```

---

## 🛡️ License & Credits
Inspired by **Unbound Solutions**. Built for precision, performance, and professional financial modeling.

© 2026 Mutual Fund Planner.


