import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const useChatStore = defineStore('chat', () => {
    const messages = ref(null)
    const chats = ref(null)
    const totalNewMessages = ref(0)
    const isLoading = ref(false)
    const errors = ref(null)
    const profileValid = ref(true)
    const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

    const getChatList = async () => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/chat/list')
            .then((response) => {
                chats.value = response.data.chats
                // totalNewMessages.value = 0
                // chats.value.forEach(chat => {
                //     totalNewMessages.value += Number(chat.newMessages)
                // })
                errors.value = null
            })
            .catch(() => {
                chats.value = null
            })

        isLoading.value = false
    }

    const getChatMessages = async (username) => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/chat?username=' + username)
            .then((response) => {
                messages.value = response.data.messages
                errors.value = null
            })
            .catch(() => {
                messages.value = null
                profileValid.value = false
            })

        isLoading.value = false
    }

    const sendChatMessage = async (message) => {
        isLoading.value = true
        await axios.post(apiBaseUrl.value + '/chat', message)
            .then((response) => {
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data.errors
            })

        isLoading.value = false
    }

    const getTotalMessagesCount = async () => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/chat/message/count')
            .then((response) => {
                totalNewMessages.value = 0
                totalNewMessages.value += response.data.totalNewMessagesCount
            })
            .catch(() => {
            })
        isLoading.value = false
    }

    return {
        isLoading,
        errors,
        messages,
        profileValid,
        chats,
        totalNewMessages,
        getChatMessages,
        sendChatMessage,
        getChatList,
        getTotalMessagesCount
    }
})
