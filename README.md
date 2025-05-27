# Portfolio

This repository contains the source code for a personal portfolio website. The project showcases professional experience, skills, and projects, and is designed to be visually appealing, responsive, and easy to maintain.

## Features

- **Modern UI/UX:** Responsive design with custom animations and smooth transitions.
- **Dark Mode:** Toggle between light and dark themes.
- **Contact Form:** Integrated with EmailJS for direct messaging.
- **Project Showcase:** Highlight selected works and experiences.
- **Performance Optimized:** Uses best practices for fast loading and accessibility.

## Technologies Used

- **React** (v18): Main frontend framework.
- **TypeScript:** Type safety for maintainable code.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Framer Motion & @react-spring/web:** Animations and transitions.
- **React Router DOM:** Client-side routing.
- **i18next & react-i18next:** Internationalization support.
- **EmailJS:** Email sending from the contact form.
- **Supabase:** Backend as a Service (optional, for authentication or data).
- **OGL:** WebGL rendering (for advanced visual effects).
- **Jest & Testing Library:** Unit and integration testing.
- **Autoprefixer & PostCSS:** CSS compatibility and processing.
- **taos:** Utility for Tailwind CSS animation orchestration.

## Project Structure

```
/src
  /components   # React components
  /pages        # Page components
  /assets       # Images, fonts, etc.
  /styles       # Tailwind and global styles
  /i18n         # Internationalization files
  ...
/public         # Static files
tailwind.config.js
postcss.config.js
tsconfig.json
package.json
...
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emimenza/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**
   - Copy `.env.example` to `.env` and fill in any required values (e.g., EmailJS, Supabase keys).

4. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

### Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## Customization

- **Tailwind CSS:** Modify `tailwind.config.js` for custom themes, colors, and animations.
- **i18n:** Add or edit translation files in `/src/i18n`.
- **Components:** Extend or replace components in `/src/components`.

## Deployment

You can deploy the production build to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

> **This project is deployed using [Vercel](https://vercel.com/) and is available at [https://emimenza.vercel.app](https://emimenza.vercel.app).**

## License

This project is licensed under the MIT License.

---
