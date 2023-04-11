import {createRouter, createWebHistory} from 'vue-router'
import {ref} from "vue";
import NotFound from "../components/NotFound.vue";

const isAuth = ref(false)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
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
        },

    ]
})

// Add a navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check if user is authenticated
        if (!isAuth.value) { // replace isLoggedIn() with your authentication check function
            // User is not authenticated, redirect to login
            next({
                name: 'login',
                // query: {redirect: to.fullPath} // Add a redirect query parameter to redirect after login
            })
        } else {
            // User is authenticated, continue to the requested route
            next()
        }
    } else {
        // Route does not require authentication, continue to the requested route
        next()
    }
})

export default router
