import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const useProfileStore = defineStore('profile', () => {
    const userProfile = ref(null)
    const isLoading = ref(false)
    const errors = ref(null)
    const profileValid = ref(true)

    const getUserProfile = async () => {
        isLoading.value = true
        await axios.get('http://mp.lt/user/profile')
            .then((response) => {
                userProfile.value = response.data.profile
                errors.value = null
            })
            .catch(() => {
                profileValid.value = false
            })

        isLoading.value = false
    }

    const updateUserProfile = async (userProfileData) => {
        isLoading.value = true
        await axios.post('http://mp.lt/user/profile', userProfileData)
            .then(() => {
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data.errors
            })

        isLoading.value = false
    }

    return {isLoading, errors , userProfile, profileValid, getUserProfile, updateUserProfile}
})
