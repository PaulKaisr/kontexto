// Entry point for server-side rendering with Vike
export { onRenderHtml }

import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { createSSRApp } from 'vue'
import { registerPlugins } from '@/plugins'
import type { PageContextServer } from 'vike/types'

async function onRenderHtml(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  
  // Create SSR app instance
  const app = createSSRApp(Page, pageProps)
  
  // Register all plugins (Vuetify, Pinia, etc.)
  registerPlugins(app)
  
  // Render the page to HTML string
  const appHtml = await renderToString(app)
  
  // Get page title and description
  const title = pageContext.exports?.title || 'Kontexto - Deutsches Wortspiel'
  const description = pageContext.exports?.description || 'Kostenloses deutsches Wortspiel mit täglich neuen Rätseln.'
  
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta name="keywords" content="deutsches wortspiel, wordle deutsch, wort rätsel, online spiel kostenlos, täglich neue rätsel, kontexto, wortähnlichkeit, kontext spiel" />
        <meta name="author" content="Kontexto" />
        <meta name="language" content="German" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        <!-- Google Adsense -->
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8170200247971328" crossorigin="anonymous"></script>
        
        <!-- Open Graph Tags -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kontexto.app${pageContext.urlOriginal}" />
        <meta property="og:image" content="https://kontexto.app/android-chrome-512x512.png" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="Kontexto" />
        
        <!-- Twitter Card Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="https://kontexto.app/android-chrome-512x512.png" />
        
        <!-- Canonical URL -->
        <link rel="canonical" href="https://kontexto.app${pageContext.urlOriginal}" />
        
        <!-- Favicons -->
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        
        <!-- Web App Manifest -->
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1976d2" />
        
        <!-- Structured Data -->
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Game",
            "name": "Kontexto",
            "description": "${description}",
            "url": "https://kontexto.app${pageContext.urlOriginal}",
            "genre": "Word Game",
            "gamePlatform": "Web Browser",
            "inLanguage": "de",
            "isAccessibleForFree": true,
            "operatingSystem": "Any",
            "applicationCategory": "Game"
          }
        </script>
        
        <!-- Google Analytics with Consent Mode -->
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500,
          });
          gtag('js', new Date());
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LHFSL7CVEB"></script>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`
  
  return {
    documentHtml,
    pageContext: {
      // Make data available on client-side
      pageProps
    }
  }
}