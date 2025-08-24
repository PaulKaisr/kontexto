// Global page configuration for Vike
export default {
  // Enable client-side routing for SPA-like navigation
  clientRouting: true,
  // Enable SSR by default
  ssr: true,
  // Enable static pre-rendering for all routes
  prerender: true,
  // Configure which files are available on server/client
  meta: {
    title: {
      env: { server: true, client: true }
    },
    description: {
      env: { server: true, client: true }
    }
  }
}