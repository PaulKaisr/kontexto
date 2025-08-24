#!/usr/bin/env node

/**
 * Static Site Generation script for Kontexto
 * Generates pre-rendered HTML files for all routes with proper SEO meta tags
 * This solves the SPA crawling issue by creating static HTML files for each route
 */

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to pre-render with their metadata
const routes = [
  {
    path: '/',
    title: 'Kontexto - Deutsches Wortspiel | Täglich neue Wort-Rätsel',
    description: 'Kostenloses deutsches Wortspiel mit täglich neuen Rätseln. Rate das Zielwort durch Kontext und Wortähnlichkeit!'
  },
  {
    path: '/spieltipps',
    title: 'Kontexto Spieltipps & Strategien | Besser werden im Wortspiel',
    description: 'Lerne die besten Strategien und Tipps für Kontexto. Werde zum Wortspiel-Experten mit unseren bewährten Techniken!'
  },
  {
    path: '/about',
    title: 'Über Kontexto | Das deutsche Wortspiel mit KI-Ähnlichkeit',
    description: 'Erfahre mehr über Kontexto - das innovative deutsche Wortspiel mit KI-basierter Wortähnlichkeit. Geschichte, Technik und Team.'
  },
  {
    path: '/faq',
    title: 'FAQ - Häufig gestellte Fragen | Kontexto',
    description: 'Antworten auf häufige Fragen zu Kontexto - Spielregeln, Strategien und mehr'
  },
  {
    path: '/data-protection',
    title: 'Datenschutz | Kontexto',
    description: 'Datenschutzerklärung für Kontexto - Wie wir deine Daten schützen'
  },
  {
    path: '/contact',
    title: 'Kontakt | Kontexto',
    description: 'Kontaktiere das Kontexto Team - Feedback, Fragen und Anregungen'
  },
  {
    path: '/terms-of-service',
    title: 'Nutzungsbedingungen | Kontexto',
    description: 'Nutzungsbedingungen für Kontexto - Rechtliche Hinweise zur Nutzung'
  }
];

async function generateStaticPages() {
  console.log('🚀 Starting static site generation for SEO...');
  
  const distPath = path.join(__dirname, '../dist');
  const baseUrl = 'http://localhost:4173'; // Preview server URL
  
  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Wait for Vite preview server to be ready
    console.log('⏳ Waiting for preview server...');
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });
    
    for (const route of routes) {
      console.log(`📄 Generating ${route.path}...`);
      
      // Navigate to the route
      await page.goto(`${baseUrl}${route.path}`, { 
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for Vue to hydrate and render
      await page.waitForFunction(
        () => document.querySelector('[data-v-app]') !== null,
        { timeout: 10000 }
      );
      
      // Get the fully rendered HTML
      const html = await page.content();
      
      // Update meta tags in the HTML for SEO
      const updatedHtml = html
        .replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
        .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${route.description}"`)
        .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${route.title}"`)
        .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${route.description}"`)
        .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${route.title}"`)
        .replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${route.description}"`);
      
      // Determine file path
      let filePath;
      if (route.path === '/') {
        filePath = path.join(distPath, 'index.html');
      } else {
        const routeDir = path.join(distPath, route.path);
        await fs.mkdir(routeDir, { recursive: true });
        filePath = path.join(routeDir, 'index.html');
      }
      
      // Write the static HTML file
      await fs.writeFile(filePath, updatedHtml, 'utf8');
      console.log(`✅ Generated ${filePath}`);
    }
    
    console.log('🎉 Static site generation completed successfully!');
    console.log(`📊 Generated ${routes.length} pages for better SEO crawling`);
    
  } catch (error) {
    console.error('❌ Error during static site generation:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run the script
generateStaticPages();