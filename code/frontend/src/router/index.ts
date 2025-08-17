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
});

export default router;
