import { createRouter, createWebHistory } from "vue-router";
import { useAnalytics } from "@/composables/useAnalytics";

const Home = () => import("../views/Home.vue");
const DataProtection = () => import("../views/DataProtection.vue");
const Contact = () => import("../views/Contact.vue");
const GameTips = () => import("../views/GameTips.vue");
const About = () => import("../views/About.vue");
const TermsOfService = () => import("../views/TermsOfService.vue");
const FAQ = () => import("../views/FAQ.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Kontexto - Deutsches Wortspiel | Täglich neue Wort-Rätsel",
      description:
        "Kostenloses deutsches Wortspiel mit täglich neuen Rätseln. Rate das Zielwort durch Kontext und Wortähnlichkeit!",
    },
  },
  {
    path: "/spieltipps",
    name: "game-tips",
    component: GameTips,
    meta: {
      title: "Kontexto Spieltipps & Strategien | Besser werden im Wortspiel",
      description:
        "Lerne die besten Strategien und Tipps für Kontexto. Werde zum Wortspiel-Experten mit unseren bewährten Techniken!",
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: "Über Kontexto | Das deutsche Wortspiel mit KI-Ähnlichkeit",
      description:
        "Erfahre mehr über Kontexto - das innovative deutsche Wortspiel mit KI-basierter Wortähnlichkeit. Geschichte, Technik und Team.",
    },
  },
  {
    path: "/data-protection",
    name: "data-protection",
    component: DataProtection,
    meta: {
      title: "Datenschutz | Kontexto",
      description:
        "Datenschutzerklärung für Kontexto - Wie wir deine Daten schützen",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
    meta: {
      title: "Kontakt | Kontexto",
      description:
        "Kontaktiere das Kontexto Team - Feedback, Fragen und Anregungen",
    },
  },
  {
    path: "/terms-of-service",
    name: "terms-of-service",
    component: TermsOfService,
    meta: {
      title: "Nutzungsbedingungen | Kontexto",
      description:
        "Nutzungsbedingungen für Kontexto - Rechtliche Hinweise zur Nutzung",
    },
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
    meta: {
      title: "FAQ - Häufig gestellte Fragen | Kontexto",
      description:
        "Antworten auf häufige Fragen zu Kontexto - Spielregeln, Strategien und mehr",
    },
  },
  // Legacy routes for backwards compatibility
  {
    path: "/legal",
    redirect: "/data-protection",
  },
  {
    path: "/impressum",
    redirect: "/contact",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If the user used browser back/forward buttons, restore the saved position
    if (savedPosition) {
      return savedPosition;
    }
    // Otherwise, scroll to the top of the page
    return { top: 0 };
  },
});

// Update document title and meta description based on route
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }

  if (to.meta?.description) {
    const metaDescription = document.querySelector("meta[name=\"description\"]");
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description as string);
    }
  }

  next();
});

// Track page views after route change
router.afterEach((to) => {
  // Use nextTick to ensure DOM is updated
  import("vue").then(({ nextTick }) => {
    nextTick(() => {
      const { trackPageView } = useAnalytics();
      trackPageView(to.path, to.meta?.title as string);
    });
  });
});

export default router;
