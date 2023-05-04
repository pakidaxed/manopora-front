import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const useChatStore = defineStore('chat', () => {
    const messages = ref(null)
    const isLoading = ref(false)
    const errors = ref(null)
    const profileValid = ref(true)
    const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

    const getChatMessages = async (username) => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/chat?username=' + username)
            .then((response) => {
                messages.value = response.data.messages
                console.log('SAKSES BET NERR MESSAGE')
                console.log(messages.value)
                errors.value = null
            })
            .catch(() => {
                console.log('ner messagu')
                profileValid.value = false
            })

        isLoading.value = false
    }

    const sendChatMessage = async (message) => {
        isLoading.value = true
        await axios.post(apiBaseUrl.value + '/chat', message)
            .then((response) => {
                console.log('send success')
                errors.value = null
            })
            .catch((error) => {
                console.log(error.data)
                console.log('send fail')
                errors.value = error.response.data.errors
            })

        isLoading.value = false
    }

    return {isLoading, errors , messages, profileValid, getChatMessages, sendChatMessage}
})
