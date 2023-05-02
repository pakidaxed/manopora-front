import {ref, computed} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'
//TODO refactorint reikia, cia pirma dariau, ir success nereikalingas jauciu
export const useUserStore = defineStore('user', () => {
    const mainUsername = ref(null)
    const isLoading = ref(false)
    const errors = ref(null)
    const routeLoading = ref(false)
    const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

    const handleRouteLoading = (state) => {
        routeLoading.value = state
    }

    const registerUser = async (newUserCredentials) => {
        isLoading.value = true
        await axios.post(apiBaseUrl.value + '/register', newUserCredentials)
            .then(() => {
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data
            })

        isLoading.value = false
    }

    const loginUser = async (userCredentials) => {
        isLoading.value = true
        await axios.post(apiBaseUrl.value + '/login', userCredentials)
            .then(() => {
            })
            .catch((error) => {
                errors.value = error.response.data.error
            })

        isLoading.value = false
    }

    const checkUser = async () => {
        const isAlive = ref(false) // Reikalingas routeriui chekint kas karta, returnas ten nueina todel nera store
        await axios.get(apiBaseUrl.value + '/check')
            .then((response) => {
                isAlive.value = true
                mainUsername.value = response.data.username
            })
            .catch(() => {
                isAlive.value = false
            })

        return isAlive.value
    }

    const logoutUser = async () => {
        await axios.get(apiBaseUrl.value + '/logout')
            .then(() => {
                //TODO  clearint visus stores values
            })
    }

    return {
        isLoading,
        errors,
        routeLoading,
        mainUsername,
        registerUser,
        loginUser,
        checkUser,
        logoutUser,
        handleRouteLoading
    }
})
