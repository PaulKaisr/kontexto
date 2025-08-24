// Entry point for client-side hydration with Vike
export { onRenderClient }

import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { inject } from '@vercel/analytics'
import type { PageContextClient } from 'vike/types'
import 'unfonts.css'

async function onRenderClient(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  
  // Create client app instance
  const app = createApp(Page, pageProps)
  
  // Register all plugins (Vuetify, Pinia, Router, etc.)
  registerPlugins(app)
  
  // Inject Vercel analytics in production
  if (import.meta.env.PROD) {
    inject()
  }
  
  // Mount/hydrate the app
  app.mount('#app')
}