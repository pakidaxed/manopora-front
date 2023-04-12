import {ref, computed} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false)
    const isLoading = ref(false)
    const doubleCount = computed(() => count.value * 2)
    const errors = ref(null)
    const success = ref(false)
    const routeLoading = ref(false)

    const handleRouteLoading = (state) => {
        routeLoading.value = state
    }

    const registerUser = async (newUserCredentials) => {
        isLoading.value = true
        await axios.post('http://mp.lt/register', newUserCredentials)
            .then(() => {
                success.value = true
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data
            })

        isLoading.value = false
    }

    const loginUser = async (userCredentials) => {
        isLoading.value = true
        await axios.post('http://mp.lt/login', userCredentials, {withCredentials:true})
            .then((response) => {
                success.value = true
                isAuthenticated.value = true
            })
            .catch((error) => {
                console.log(error)
                errors.value = error.response.data.error
            })

        isLoading.value = false
    }

    const checkUser = async () => {
        const isAlive = ref(false)
        await axios.get('http://mp.lt/check', {withCredentials: true})
            .then(() => {
                console.log('vis dar prisijunges')
                isAlive.value = true
            })
            .catch((error) => {
                isAuthenticated.value = false
                isAlive.value = false
            })

        return isAlive.value
    }

    const logoutUser = async () => {
        await axios.get('http://mp.lt/logout', {withCredentials: true})
            .then(() => {
                console.log('logout')
                isAuthenticated.value = false
            })
    }

    return {doubleCount, isLoading, errors, success, isAuthenticated, routeLoading, registerUser, loginUser, checkUser, logoutUser, handleRouteLoading}
})
