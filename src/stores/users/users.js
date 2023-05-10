import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const useUsersStore = defineStore('users', () => {
    const userProfiles = ref(null)
    const userProfile = ref(null)
    const isLoading = ref(false)
    const errors = ref(null)
    const endReached = ref(true)
    const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

    const getFirstUserProfiles = async (searchValues) => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/user/profiles?city=' + searchValues.city)
            .then((response) => {
                userProfiles.value = response.data.profiles
                endReached.value = false
            })
            .catch((error) => {
            })

        isLoading.value = false
    }

    const getNextUserProfiles = async (page, searchValues) => {
        console.log(page)
        console.log(searchValues)
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/user/profiles?page=' + page + '&city=' + searchValues.city)
            .then((response) => {
                console.log(response.data)
                userProfiles.value = [...userProfiles.value, ...response.data.profiles]
                if (!response.data.profiles.length) {
                    endReached.value = true
                }
            })
            .catch((error) => {
                console.log(error)
            })

        isLoading.value = false
    }

    const getSingleUserProfile = async (userId) => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/user/profile?username=' + userId)
            .then((response) => {
                userProfile.value = response.data.profile
                console.log(userProfile.value)
            })
            .catch(() => {
            })

        isLoading.value = false
    }

    return {isLoading, errors, endReached, userProfiles, userProfile, getFirstUserProfiles, getNextUserProfiles, getSingleUserProfile}
})
