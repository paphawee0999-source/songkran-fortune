@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* Thai Songkran Theme - White, Pastel Blue, Gold */
  --background: #ffffff;
  --foreground: #1a1a2e;
  --card: #ffffff;
  --card-foreground: #1a1a2e;
  --popover: #ffffff;
  --popover-foreground: #1a1a2e;
  --primary: #D4AF37;
  --primary-foreground: #ffffff;
  --secondary: #E0F2FE;
  --secondary-foreground: #1a1a2e;
  --muted: #f0f9ff;
  --muted-foreground: #64748b;
  --accent: #E0F2FE;
  --accent-foreground: #1a1a2e;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #D4AF37;
  --chart-1: #D4AF37;
  --chart-2: #7dd3fc;
  --chart-3: #38bdf8;
  --chart-4: #0ea5e9;
  --chart-5: #0284c7;
  --radius: 0.75rem;
  --gold: #D4AF37;
  --gold-light: #e8d48a;
  --pastel-blue: #E0F2FE;
  --pastel-blue-dark: #bae6fd;
  --sidebar: #ffffff;
  --sidebar-foreground: #1a1a2e;
  --sidebar-primary: #D4AF37;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #E0F2FE;
  --sidebar-accent-foreground: #1a1a2e;
  --sidebar-border: #e2e8f0;
  --sidebar-ring: #D4AF37;
}

.dark {
  --background: #ffffff;
  --foreground: #1a1a2e;
  --card: #ffffff;
  --card-foreground: #1a1a2e;
  --popover: #ffffff;
  --popover-foreground: #1a1a2e;
  --primary: #D4AF37;
  --primary-foreground: #ffffff;
  --secondary: #E0F2FE;
  --secondary-foreground: #1a1a2e;
  --muted: #f0f9ff;
  --muted-foreground: #64748b;
  --accent: #E0F2FE;
  --accent-foreground: #1a1a2e;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #D4AF37;
  --chart-1: #D4AF37;
  --chart-2: #7dd3fc;
  --chart-3: #38bdf8;
  --chart-4: #0ea5e9;
  --chart-5: #0284c7;
  --sidebar: #ffffff;
  --sidebar-foreground: #1a1a2e;
  --sidebar-primary: #D4AF37;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #E0F2FE;
  --sidebar-accent-foreground: #1a1a2e;
  --sidebar-border: #e2e8f0;
  --sidebar-ring: #D4AF37;
}

@theme inline {
  --font-sans: 'Kanit', sans-serif;
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-pastel-blue: var(--pastel-blue);
  --color-pastel-blue-dark: var(--pastel-blue-dark);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Metallic Gold Header Styles */
.metallic-gold-text {
  background: linear-gradient(
    135deg,
    #F5D76E 0%,
    #D4AF37 25%,
    #C0A33B 50%,
    #8E6E2D 75%,
    #D4AF37 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 0 8px rgba(244, 208, 63, 0.5))
          drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
  position: relative;
}

.metallic-gold-text::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(
    135deg,
    #F5D76E 0%,
    #D4AF37 25%,
    #C0A33B 50%,
    #8E6E2D 75%,
    #D4AF37 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke: 0.5px rgba(60, 45, 20, 0.4);
  z-index: -1;
}

@keyframes goldShimmer {
  0% {
    background-position: 200% 0%;
  }
  100% {
    background-position: -200% 0%;
  }
}

.metallic-gold-text:hover {
  animation: goldShimmer 2s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(244, 208, 63, 0.5))
            drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(244, 208, 63, 0.8))
            drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))
            drop-shadow(0 0 45px rgba(212, 175, 55, 0.3));
  }
}

.metallic-gold-text:hover {
  animation: goldShimmer 2s ease-in-out infinite, pulseGlow 1.5s ease-in-out infinite;
}
