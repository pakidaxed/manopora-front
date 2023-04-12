import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "../stores/auth/user";
import NotFound from "../components/NotFound.vue";
import {storeToRefs} from "pinia";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {requiresAuth: false}
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    userStore.handleRouteLoading(true)
    if (to.meta.requiresAuth) {
        if (await userStore.checkUser()) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }

});

router.afterEach(() => {
    const userStore = useUserStore()
    userStore.handleRouteLoading(false)
})

export default router
