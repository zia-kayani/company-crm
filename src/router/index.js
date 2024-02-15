import { createRouter, createWebHistory } from "vue-router";

import Login from '../components/Login.vue'
import Dashboard from '../views/Dashboard.vue'


const routes = [
    {
        name: 'login',
        path: '/',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    }
   


]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;