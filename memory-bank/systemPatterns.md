# System Patterns

## System Architecture
- **Frontend:** React-based single-page application.
- **Component-Based Structure:** Reusable components for UI elements.
- **Context API:** State management for data sharing.
- **Data Handling:** JSON files for storing restaurant content and menu data.

## Key Technical Decisions
- **React and TypeScript:** For building a dynamic and maintainable UI.
- **Tailwind CSS:** For utility-first styling and responsive design.
- **Vite:** For fast development environment and build process.
- **Context API:** Chosen for managing and providing data to components, particularly menu data.

## Design Patterns
- **Component Composition:** Building complex UI from smaller, reusable components.
- **Provider Pattern:** Using Context API to provide data to components.
- **Data Fetching:** Reading data from JSON files to populate components.

## Component Relationships
- `App` component as the main layout container.
- `Navbar` and `Footer` for site-wide navigation and information.
- Page components (`Home`, `Menu`, `About`, etc.) for different sections of the website.
- `MenuContext` providing menu data to components needing it.
- Data components (`menu.json`, `siteContent.json`) as data sources.
