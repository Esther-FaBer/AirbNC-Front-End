# AirBnC 🏠
 
A full-stack marketplace for home-stays, connecting travellers with property owners. Built with React and Vite on the frontend, with a Node.js/Express/PostgreSQL backend API.
 
---
 
## Live Demo
 
> Frontend: `http://localhost:5173`
> Backend API: `http://localhost:9090`
 
---

## Features
 
- **Browse properties** — view all available listings with images, location, price per night and average rating
- **Search & filter** — search by property name or location, filter by min/max price, sort by price or rating
- **Property detail page** — view full property information including all images and host details
- **Reviews** — read guest reviews for each property
- **Post a review** — logged-in user (Jane Doe) can leave a review on any property
- **Delete a review** — Jane Doe can delete her own reviews

---


## Tech Stack
 
### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI component library |
| Vite | Build tool and dev server |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests to the backend API |
| CSS Modules | Component-scoped styling |
 
### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express | REST API framework |
| PostgreSQL | Relational database |
| node-postgres (pg) | Database client |
| pg-format | Safe SQL query formatting |
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js v18+
- PostgreSQL
- npm
---
 
### 1. Clone the repositories
 
```bash
# Frontend
git clone https://github.com/Esther-FaBer/AirbNC-Front-End
cd airbnc-front-end
 
# Backend (separate repository)
git clone https://github.com/Esther-FaBer/Airbnc-Project
cd airbnc-project
```
 
---
 
### 2. Set up the backend
 
```bash
cd airbnc-project
npm install
```
 
Create your `.env.development` file in the backend root:
 
```
PGDATABASE=airbnc_test_01_dev
```
 
Set up and seed the database:
 
```bash
npm run create-dbs
npm run seed-dev
```
 
Start the backend server:
 
```bash
npm run dev
```
 
The API will be running at `http://localhost:9090`.
 
---
 
### 3. Set up the frontend
 
```bash
cd airbnc-front-end
npm install
npm run dev
```
 
The app will be running at `http://localhost:5173`.
 
> Both servers must be running at the same time — use two terminal windows.
 
---
 
## Project Structure
 
```
airbnc-frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component — routing and filter state
    ├── App.css               # Global styles
    ├── Api.js                # All Axios API functions
    └── Components/
        ├── Header.jsx        # Navigation bar with search input
        ├── Header.css
        ├── FilterBar.jsx     # Price filter and sort controls
        ├── FilterBar.module.css
        ├── PropertiesGrid.jsx  # Property listing cards
        └── PropertiesGrid.module.css
```
 
---
 
## API Endpoints Used
 
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/properties` | Fetch all properties |
| GET | `/api/properties/:id` | Fetch a single property |
| GET | `/api/properties/:id/images` | Fetch images for a property |
| GET | `/api/properties/:id/reviews` | Fetch reviews for a property |
| POST | `/api/properties/:id/reviews` | Post a new review |
| DELETE | `/api/reviews/:id` | Delete a review |
 
---
 
## User Account
 
The app runs with a pre-authenticated user — **Jane Doe**. No login is required. Jane Doe can:
 
- Browse all properties
- Read reviews on any property
- Post a review on any property
- Delete her own reviews
---
 
## Search & Filter
 
Filtering is handled client-side for a fast, responsive experience:
 
- **Search** — filters by property name or location as you type
- **Min price** — excludes properties below the entered price per night
- **Max price** — excludes properties above the entered price per night
- **Sort by** — reorders results by price (low to high / high to low) or top rated
- **Clear filters** — resets all filters and restores the full listing
State is managed in `App.jsx` using the **lift state up** pattern — all filter logic lives in the closest common ancestor of the components that need it.
 
---
 
## Available Scripts
 
### Frontend
 
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```
 
### Backend
 
```bash
npm run dev        # Start backend with nodemon
npm run seed-dev   # Seed development database
npm run seed-test  # Seed test database
npm run test       # Run Jest test suite
```
 
---
 
## Environment Variables
 
### Backend `.env.development`
```
PGDATABASE=airbnc_test_01_dev

```
 
### Backend `.env.test`
```
PGDATABASE=airbnc_test_01_test
```
 
---
 
## Roadmap
 
- [ ] Property detail page with image gallery
- [ ] Post and delete reviews
- [ ] Booking form with date selection
- [ ] Favourites — save and view liked properties
- [ ] User profile page
- [ ] Mobile responsive layout
