# CropSense

CropSense is a premium agriculture dashboard built with Next.js 16 and TypeScript. It includes a modern dark theme, dashboard analytics, soil and weather intelligence, map visualizations, and a custom UI component library.

## Features

- Next.js 16 app router project structure
- Tailwind CSS with custom theme tokens
- Reusable Radix UI component wrappers
- Lucide icon support
- Responsive agricultural dashboard layout
- Charts and analytics for NDVI, soil, weather, and field status

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. If port `3000` is already in use, Next.js will select the next available port.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start the production server after build
- `npm run lint` - Run ESLint

## Project Structure

- `app/` - Next.js app router files and global styles
- `components/` - Shared UI components and dashboard sections
- `lib/` - Utility helpers
- `styles/` - Tailwind or custom style files
- `public/` - Static assets

## Dependencies

This project uses:

- `next` 16
- `react` 19
- `tailwindcss` 4
- `@radix-ui/react-*` packages for accessible UI primitives
- `lucide-react` for icons
- `recharts` for chart visualizations
- `tw-animate-css` for global animation utilities

## Notes

- If the app fails to start because port `3000` is occupied, either stop the existing process or use the alternate port shown by Next.js.
- Make sure dependencies are installed before running the dev server.

## License

This repository is ready for GitHub. Add your own license file if needed.
