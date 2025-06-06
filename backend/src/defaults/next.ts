const NextBasePrompt = `<boltArtifact id="project-import" title="Next.js + Tailwind Starter">

<boltAction type="file" filePath="package.json">
{
  "name": "next-tailwind-starter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-config-next": "14.2.3",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3"
  }
}
</boltAction>

<boltAction type="file" filePath="tailwind.config.js">
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
</boltAction>

<boltAction type="file" filePath="postcss.config.js">
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
</boltAction>

<boltAction type="file" filePath="tsconfig.json">
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
</boltAction>

<boltAction type="file" filePath="app/layout.tsx">
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
</boltAction>

<boltAction type="file" filePath="app/page.tsx">
export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Next.js + Tailwind Starter</h1>
    </main>
  );
}
</boltAction>

<boltAction type="file" filePath="app/globals.css">
@tailwind base;
@tailwind components;
@tailwind utilities;
</boltAction>

<boltAction type="file" filePath="next.config.js">
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
</boltAction>

<boltAction type="file" filePath="next-env.d.ts">
/// <reference types="next" />
/// <reference types="next/image-types/global" />`

export default NextBasePrompt;

