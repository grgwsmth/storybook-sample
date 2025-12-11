# Storybook Sample

A React component library built with Vite, TypeScript, and Storybook. This project provides a foundation for building and documenting reusable React components with a design system.

## Getting Started

### Prerequisites

-  Node.js (version 16 or higher)
-  npm

### Installation

```bash
npm install
```

## Development

### Running the App

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Running Storybook

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006` where you can:

-  View and interact with all components
-  Test different component variants and states
-  View component documentation
-  Test accessibility with the a11y addon

### Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

The built files will be in the `storybook-static` directory, which can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Build

```bash
npm run build
```

Builds the main application for production.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # React components
│   ├── Button/         # Button component
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx  # Storybook stories
│   │   └── index.ts
│   └── TextField/      # TextField component
│       ├── TextField.tsx
│       ├── TextField.stories.tsx  # Storybook stories
│       ├── TextField.css
│       └── index.ts
├── styles/             # Design tokens and styles
│   └── design-tokens.ts
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
└── index.css           # Global styles

.storybook/             # Storybook configuration
├── main.ts            # Storybook main config
└── preview.ts         # Storybook preview config
```

## Component Library with Storybook

This project is set up as a component library using Storybook. Here's what you can do:

### Viewing Components

1. **Start Storybook**: Run `npm run storybook`
2. **Browse Components**: Navigate through the component library in the sidebar
3. **Interact**: Use the Controls panel to modify component props in real-time
4. **View Documentation**: Each component has auto-generated documentation from its props and JSDoc comments

### Adding New Components

1. Create your component in `src/components/YourComponent/`
2. Create a story file: `YourComponent.stories.tsx`
3. Storybook will automatically pick it up and display it

Example story structure:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { YourComponent } from "./YourComponent";

const meta = {
	title: "Components/YourComponent",
	component: YourComponent,
	tags: ["autodocs"],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// your props
	},
};
```

### Storybook Features

-  **Auto-documentation**: Components are automatically documented from TypeScript types
-  **Accessibility testing**: Built-in a11y addon checks components for accessibility issues
-  **Interactive controls**: Modify component props in real-time
-  **Multiple variants**: Show all component states and variations
-  **Visual testing**: Ready for visual regression testing with Chromatic

### Deploying Storybook

You can deploy your Storybook to:

-  **Chromatic** (recommended for visual testing): `npx chromatic --project-token=your-token`
-  **Netlify/Vercel**: Deploy the `storybook-static` folder
-  **GitHub Pages**: Use GitHub Actions to build and deploy

## Technologies Used

-  React 18
-  TypeScript
-  Vite
-  Storybook 10
-  ESLint
-  Design Tokens (for consistent styling)
