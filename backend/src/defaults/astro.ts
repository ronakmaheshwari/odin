const AstroBasePrompt = `<boltArtifact id="astro-universal-base" title="Astro Universal Base">

<boltAction type="file" filePath="astro.config.mjs">
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), mdx()],
  output: 'hybrid'
});
</boltAction>

<boltAction type="file" filePath="package.json">
{
  "name": "astro-universal-app",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "astro": "^4.6.0",
    "@astrojs/mdx": "^3.0.0",
    "@astrojs/tailwind": "^4.0.0"
  },
  "devDependencies": {
    "eslint": "^9.9.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35"
  }
}
</boltAction>

<boltAction type="file" filePath="tsconfig.json">
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2022"
  }
}
</boltAction>

<boltAction type="file" filePath="src/pages/index.astro">
---
import '../styles/global.css';
import Counter from '../components/Counter.astro';
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Astro Universal Base</title>
  </head>
  <body class="min-h-screen bg-gray-50 p-8 text-center">
    <h1 class="text-4xl font-bold text-purple-600">Welcome to Astro Universal Base 🌌</h1>
    <p class="mt-4 text-gray-600">Edit the files, build anything.</p>

    <div class="mt-6">
      <Counter client:load />
    </div>
  </body>
</html>
</boltAction>

<boltAction type="file" filePath="src/components/Counter.astro">
---
const { useState } = Astro;
---

<script type="module" client:load>
  import { useState } from "react";

  const Counter = () => {
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-medium">Counter: {count}</p>
        <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    );
  };

  export default Counter;
</script>
</boltAction>

<boltAction type="file" filePath="src/pages/about.mdx">
# About

This page is written in **MDX** and supports components, markdown, and more.

- Astro Hybrid rendering enabled
- Tailwind styling available
</boltAction>

<boltAction type="file" filePath="src/styles/global.css">
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, sans-serif;
}
</boltAction>

<boltAction type="file" filePath="tailwind.config.js">
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
</boltAction>

<boltAction type="file" filePath="postcss.config.js">
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
</boltAction>

</boltArtifact>`;

export default AstroBasePrompt;
