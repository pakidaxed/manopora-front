import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const usePropertiesStore = defineStore('properties', () => {
    const propsGenders = ref(null)
    const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

    const getPropsGender = async () => {
        await axios.get(apiBaseUrl.value + '/props/gender')
            .then((response) => {
                propsGenders.value = response.data.genders
            })
            .catch(() => {

            })
    }


    return {propsGenders, getPropsGender}
})
