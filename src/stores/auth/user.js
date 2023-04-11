import {ref, computed} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false)
    const isLoading = ref(false)
    const doubleCount = computed(() => count.value * 2)
    const errors = ref(null)
    const success = ref(false)


    const registerUser = async (newUserCredentials) => {
        isLoading.value = true
        await axios.post('http://mp.lt/register', newUserCredentials)
            .then((response) => {
                success.value = true
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data
            })

        isLoading.value = false
    }

    return {doubleCount, isLoading, errors, success, registerUser}
})
