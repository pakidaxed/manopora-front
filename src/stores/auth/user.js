import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false)
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function registerUser() {
        count.value++
    }

    return { count, doubleCount, increment }
})
