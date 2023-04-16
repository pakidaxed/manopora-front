import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "../stores/auth/user";
import NotFound from "../components/NotFound.vue";
import {storeToRefs} from "pinia";
import MyProfileView from "../views/MyProfileView.vue";
import Welcome from "../components/Welcome.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/security/LoginView.vue'),
            meta: {requiresAuth: false}
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/security/LogoutView.vue'),
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            // meta: {requiresAuth: true}
            children: [
                {
                    path: '/',
                    name: 'feed',
                    component: () => import('../views/FeedView.vue'),
                    // meta: {requiresAuth: true}
                },
                {
                    path: '/me',
                    name: 'myProfile',
                    component: () => import('../views/MyProfileView.vue'),
                    // meta: {requiresAuth: true}
                },
                {
                    path: '/notifications',
                    name: 'notifications',
                    component: () => import('../views/NotificationsView.vue'),
                    // meta: {requiresAuth: true}
                },
                {
                    path: '/messages',
                    name: 'messages',
                    component: () => import('../views/MessagesView.vue'),
                    // meta: {requiresAuth: true}
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: () => import('../views/SettingsView.vue'),
                    // meta: {requiresAuth: true}
                },
            ]
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
