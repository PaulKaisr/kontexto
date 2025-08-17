import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home.vue");
const DataProtection = () => import("../views/DataProtection.vue");
const Contact = () => import("../views/Contact.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/legal",
    name: "legal",
    component: DataProtection,
  },
  {
    path: "/impressum",
    name: "impressum",
    component: Contact,
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

export default router;
