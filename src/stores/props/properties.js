import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const usePropertiesStore = defineStore('properties', () => {
    const propsGenders = ref(null)

    const getPropsGender = async () => {
        await axios.get('http://mp.lt/props/gender')
            .then((response) => {
                propsGenders.value = response.data.genders
            })
            .catch(() => {

            })
    }


    return {propsGenders, getPropsGender}
})
