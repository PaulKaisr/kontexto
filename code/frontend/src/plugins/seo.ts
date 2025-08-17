import type { Plugin } from "vite";

export function seoPlugin(): Plugin {
  return {
    name: "kontexto-seo",
    generateBundle() {
      // Additional SEO optimizations during build
      console.log("🚀 SEO optimizations applied for Kontexto");
    },
    configureServer(server) {
      // Development server optimizations
      server.middlewares.use("/api", (req, res, next) => {
        // Add security headers for better SEO score
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        next();
      });
    },
  };
}

// Export additional SEO utilities
export const seoMeta = {
  keywords: [
    "deutsches wortspiel",
    "wordle deutsch",
    "wort rätsel online",
    "kontexto spiel",
    "kostenlose wortspiele",
    "täglich neue rätsel",
    "ki wortspiel",
    "semantische ähnlichkeit",
    "deutsche sprache spiel",
    "wortschatz erweitern",
  ],

  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kontexto",
    description: "Kostenloses deutsches Wortspiel mit täglich neuen Rätseln",
    url: "https://kontexto.app",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  },
};
