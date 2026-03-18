# Portfolio Website

A modern, responsive portfolio website built with React and Vite.

## Features

- Single-page application with smooth scrolling navigation
- Animated sections with intersection observer
- Skill bars with progress animations
- Project cards with hover effects
- Contact form with validation
- Dark theme with cyan accents
- Mobile responsive design

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the portfolio directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- Vite
- CSS-in-JS (inline styles)
- Google Fonts (Bebas Neue, Plus Jakarta Sans, DM Mono)
- Intersection Observer API
- CSS Animations

## Customization

- Update the `NAV_LINKS`, `TECH_SKILLS`, `SOFT_SKILLS`, and `PROJECTS` arrays with your information
- Modify colors and styles in the inline styles
- Replace placeholder content in the hero and about sections
- Update contact information in the contact section

## Deployment

The built files in the `dist` folder can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.