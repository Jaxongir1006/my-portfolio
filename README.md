# Jahongir Qosimjonov Portfolio

Personal developer portfolio for Jahongir Qosimjonov, built as a futuristic backend-focused landing page with an interactive 3D solar-system hero.

The site presents backend skills, project concepts, experience highlights, and contact information in a single-page React application.

## Features

- Interactive 3D hero scene built with Three.js, React Three Fiber, and Drei
- Double-click focus controls for the sun and planets
- Animated reset transition back to the full solar-system view
- Focus labels for selected celestial bodies
- Texture preloading and loading overlay for a smoother first render
- Responsive portfolio sections for about, skills, projects, timeline, and contact
- Motion-enhanced interface using Framer Motion
- Icon system powered by Lucide React
- Tailwind CSS styling with glass, neon, and dark-space visual treatment

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- React Three Postprocessing
- Framer Motion
- Lucide React
- ESLint

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── textures/              # 2k planet and solar-system textures
├── src/
│   ├── App.jsx                # Page section composition
│   ├── main.jsx               # React entry point
│   ├── index.css              # Tailwind and global styles
│   ├── assets/                # Static imported assets
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HeroScene.jsx      # Interactive 3D solar-system scene
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Timeline.jsx
│   └── data/
│       ├── projects.js        # Project card content
│       └── skills.js          # Skill categories and icons
├── package.json
└── README.md
```

## Main Sections

- Hero: introduction, call-to-action buttons, portfolio stats, and interactive 3D scene
- About: personal summary and developer positioning
- Skills: categorized backend, database, DevOps, and tooling skills
- Projects: production-focused backend project concepts
- Timeline: experience and learning path
- Contact: ways to reach out

## 3D Hero Scene

The hero scene lives in `src/components/HeroScene.jsx`.

It includes:

- Textured sun and planets
- Orbital paths
- Star field background
- Bloom postprocessing
- Atmospheric rim glows for better visibility
- Double-click camera focus
- 360-degree focused viewing with OrbitControls
- Animated reset back to the main view
- Loading overlay while textures are prepared

Texture files are stored in `public/textures`, so they can be referenced directly with paths like:

```js
'/textures/2k_earth_daymap.jpg'
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Customization

Update project cards in:

```text
src/data/projects.js
```

Update skill categories in:

```text
src/data/skills.js
```

Update the hero copy and layout in:

```text
src/components/Hero.jsx
```

Update the interactive solar-system scene in:

```text
src/components/HeroScene.jsx
```

## Deployment

This is a static Vite app. After running:

```bash
npm run build
```

the production output will be generated in:

```text
dist/
```

That folder can be deployed to static hosting platforms such as Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any server capable of serving static files.

## Author

Jahongir Qosimjonov  
Python web developer focused on backend systems, APIs, deployment workflows, Telegram bots, and production-minded engineering.
