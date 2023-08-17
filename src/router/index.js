import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView";
import HelloView from "../views/HelloView";

const routes = [
    {
        path: "/about",
        name: "About",
        component: AboutView
    },
    {
        path: "/hello",
        name: "Hello",
        component: HelloView
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
