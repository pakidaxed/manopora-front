import {ref} from 'vue'
import axios from 'axios'
import {defineStore} from 'pinia'

export const usePictureStore = defineStore('picture', () => {
    const allPictures = ref(null)
    const mainPicture = ref('user_no_picture.jpg')
    const isLoading = ref(false)
    const errors = ref(null)
    const totalPictures = ref(0)
    const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

    const getUserPictures = async () => {
        isLoading.value = true
        await axios.get(apiBaseUrl.value + '/user/pictures')
            .then((response) => {
                allPictures.value = response.data.pictures

                if (response.data.mainPicturePath) {
                    mainPicture.value = response.data.mainPicturePath
                }
                errors.value = null
                // TODO total pictures kai visus iki vieno istirni nenusinulina
                totalPictures.value = response.data.pictures.length
            })
            .catch(() => {
                allPictures.value = null
                totalPictures.value = 0
                mainPicture.value = 'user_no_picture.jpg'
            })

        isLoading.value = false
    }

    const uploadUserPicture = async (newPictureFile) => {
        isLoading.value = true
        const formData = new FormData()
        formData.append('uploadedPicture', newPictureFile[0])

        await axios.post(apiBaseUrl.value + '/user/pictures', formData,  { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data.errors
            })

        isLoading.value = false
    }

    const setMainPicture = async (id) => {
        isLoading.value = true

        await axios.patch(apiBaseUrl.value + '/user/pictures', {id: id})
            .then((response) => {
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data.errors
            })

        isLoading.value = false
    }

    const deleteUserPicture = async (id) => {
        isLoading.value = true

        await axios.delete(apiBaseUrl.value + '/user/pictures', { data: {
                id: id
            }})
            .then(() => {
                errors.value = null
            })
            .catch((error) => {
                errors.value = error.response.data.errors
            })

        isLoading.value = false
    }



    return {isLoading, errors , allPictures, totalPictures, mainPicture, getUserPictures, uploadUserPicture, setMainPicture, deleteUserPicture}
})
