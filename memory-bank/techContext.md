# Technical Context

## Technologies Used
- **Frontend Framework:** React 18.2.0
- **Styling:** Tailwind CSS 3.3.0
- **Language:** TypeScript 5.0
- **Build Tool:** Vite 4.4.0
- **State Management:** React Context API

## Development Setup
- **Environment:** Node.js 18 or later, npm or yarn package manager
- **Editor:** VSCode (recommended)
- **Dependencies:** Listed in `package.json`
- **Configuration:** 
  - `tailwind.config.js` for Tailwind CSS configuration
  - `vite.config.ts` for Vite build configuration
  - `tsconfig.json` for TypeScript configuration
  - `eslint.config.js` for ESLint configuration

## Technical Constraints
- **Data Source:** JSON files (`menu.json`, `siteContent.json`) are the primary data sources.
- **No Backend:** Frontend-only application without a backend server.
- **Limited State Management:** Using Context API for simplicity, may need to consider more robust solutions for complex state management if the application grows significantly.

## Dependencies
- **axios:** For making HTTP requests (if needed later for API integrations).
- **react-router-dom:** For routing between different pages.
- **Other dependencies:** As listed in `package.json`.
