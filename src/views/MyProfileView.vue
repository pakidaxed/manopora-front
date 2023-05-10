<script setup>

import {onMounted, reactive, ref} from "vue";
import {useProfileStore} from "../stores/user/profile";
import {storeToRefs} from "pinia";
import InputErrorAlert from "../components/auth/InputErrorAlert.vue";
import {usePropertiesStore} from "../stores/props/properties";
import {useUserStore} from "../stores/auth/user";
import {usePictureStore} from "../stores/user/picture";

const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

const userProfileStore = useProfileStore()
const {getUserProfile, updateUserProfile} = userProfileStore
const {isLoading, errors, success, profileValid, userProfile} = storeToRefs(userProfileStore)

const propertiesStore = usePropertiesStore()
const {getPropsGender, getPropsCity} = propertiesStore
const {propsGenders, propsCities} = storeToRefs(propertiesStore)

const userStore = useUserStore()
const {mainUsername} = storeToRefs(userStore)

const userPictureStore = usePictureStore()
const {mainPicture} = storeToRefs(userPictureStore)
const {getUserPictures} = userPictureStore

const updateSuccessful = ref(false)

const profileDataDateFilter = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return eighteenYearsAgo.toISOString().slice(0, 10);
}

const myProfile = reactive({
    name: '',
    birthDate: profileDataDateFilter(),
    gender: '',
    interest: '',
    description: '',
    city: ''
})

const myGenders = ref([])
const interestGenders = ref([])
const cities = ref([])

const createGenders = () => {
    propsGenders.value.forEach((gender) => {
        myGenders.value.push({value: gender.name, label: gender.title})
        interestGenders.value.push({value: gender.name, label: gender.interestTitle})
    })
}

const createCities = () => {
    propsCities.value.forEach((city) => {
        cities.value.push({value: city.name, label: city.title})
    })
}

const handleProfileUpdate = async () => {
    await updateUserProfile(myProfile)
    await getUserProfile()
    if (!errors.value) {
        updateSuccessful.value = true
        setTimeout(() => {
            updateSuccessful.value = false
        }, 3000);
    }
}

onMounted(async () => {
    await getUserPictures()
    await getPropsGender()
    await getPropsCity()
    await createGenders()
    await createCities()
    await getUserProfile()

    if (userProfile.value) {
        myProfile.name = userProfile.value.name
        myProfile.birthDate = new Date(userProfile.value.birthDate).toLocaleDateString('lt-LT')
        myProfile.gender = userProfile.value.gender
        myProfile.interest = userProfile.value.interest
        myProfile.description = userProfile.value.description
        myProfile.city = userProfile.value.city
    }
})

</script>
<template>
    <main>
        <div>
            <h1 class="mb5"><span class="mp-color">@</span>{{ mainUsername }}</h1>
        </div>
        <w-alert v-if="!profileValid" bg-color="mp-color" color="white">
            Profilis neuzpildytas, ir bus nematomas kitiems vartotojams
        </w-alert>
        <div class="d-flex xs-column sm-column">

            <div class="my-profile-info md6">

                <div class="my-profile-info-fields column">
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-input class="mb3 auth-input"
                                 v-model="myProfile.name"
                                 type="email"
                                 color="black"
                                 label-color="mp-color"
                        >
                            <span>Vardas:</span>
                        </w-input>

                    </div>
                    <InputErrorAlert :errors="errors" input-field="name"/>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-select
                            color="black"
                            label-color="mp-color"
                            :items="cities"
                            label="Miestas"
                            v-model="myProfile.city"
                        >
                        </w-select>
                    </div>
                    <InputErrorAlert :errors="errors" input-field="city"/>
                    <div class="my-profile-info-field d-flex mt12">
                        <w-input class="mb3 auth-input"
                                 v-model="myProfile.birthDate"
                                 type="date"
                                 color="black"
                                 label-color="mp-color"
                        >
                            <span>Gimimo data:</span>
                        </w-input>
                    </div>
                    <InputErrorAlert :errors="errors" input-field="birthDate"/>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-select
                                color="black"
                                label-color="mp-color"
                                :items="myGenders"
                                label="Esu"
                                v-model="myProfile.gender"
                        >
                        </w-select>
                    </div>
                    <InputErrorAlert :errors="errors" input-field="gender"/>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-select
                                color="black"
                                label-color="mp-color"
                                :items="interestGenders"
                                label="Ieškau"
                                v-model="myProfile.interest"
                        >
                        </w-select>
                    </div>
                    <InputErrorAlert :errors="errors" input-field="interest"/>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-textarea
                                color="black"
                                label-color="mp-color"
                                no-autogrow
                                rows="6"
                                outline
                                v-model="myProfile.description"
                        >
                            Apie mane <span class="body black">({{ myProfile.description.length }}/500)</span>
                        </w-textarea>
                    </div>
                    <InputErrorAlert :errors="errors" input-field="description"/>
                    <div class="my-profile-info-field mb5 sm-text-center xs-text-center">
                        <w-button :loading="isLoading" xl color="white"
                                  :bg-color="updateSuccessful && !errors ? 'success' : 'mp-color'" class="mt5 pa6"
                                  @click="handleProfileUpdate">
                            <w-icon class="mr1">mdi mdi-check</w-icon>
                            {{ updateSuccessful && !errors ? 'Išsaugota' : 'Išsaugoti' }}
                        </w-button>
                    </div>
                </div>
            </div>
            <div class="spacer px2"></div>
            <div>
                <div class="my-profile-info-picture text-center">
                    <img :src="apiBaseUrl + '/picture/' + mainPicture" alt="" width="300">
                </div>
                <div class="my-profile-info-picture-link text-center">
                    <RouterLink to="/pictures">
                        <w-button xl color="white" bg-color="mp-color" class="mt5 pa6">
                            <w-icon class="mr1">mdi mdi-camera-outline</w-icon>
                            Tvarkyti nuotraukas
                        </w-button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
</script>
<style scoped>

</style>