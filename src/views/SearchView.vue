<script setup>
import {useUsersStore} from "../stores/users/users";
import {storeToRefs} from "pinia";
import {computed, onMounted, reactive, ref} from "vue";
import Observer from "../components/extra/Observer.vue";
import {usePropertiesStore} from "../stores/props/properties";

const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)
const usersStore = useUsersStore()
const {getFirstUserProfiles, getNextUserProfiles} = usersStore
const {userProfiles, endReached} = storeToRefs(usersStore)
const profiles = ref([])
const showObserver = ref(false)

const searchValues = reactive({
    city: 'all',
})

const propertiesStore = usePropertiesStore()
const {getPropsCity} = propertiesStore
const {propsCities} = storeToRefs(propertiesStore)

const pageToFetch = ref(0)
const cities = ref([{value: 'all', label: 'Visi'}])


const createCities = () => {
    propsCities.value.forEach((city) => {
        cities.value.push({value: city.name, label: city.title})
    })
}

const handleSearchValues = async () => {
  await getFirstUserProfiles(searchValues)
}

const handleUserProfiles = async () => {
    if (!endReached.value) {
        pageToFetch.value++
        await getNextUserProfiles(pageToFetch.value, searchValues)

    }


}

onMounted(async () => {
    await getFirstUserProfiles(searchValues)
    await getPropsCity()
    await createCities()
})
</script>
<template>
    <main>
        <div class="main-section-name">
            <h1 class="mb5">Paieška</h1>
        </div>
        <div class="my-profile-info-field mt12 mb5 d-flex">
            <w-select
                    color="black"
                    label-color="mp-color"
                    :items="cities"
                    label="Miestas"
                    v-model="searchValues.city"
                    @item-select="handleSearchValues"
            >
            </w-select>
        </div>
            <div class="profile-cards column justify-center">
                <div
                    v-if="userProfiles"
                    v-for="profile in userProfiles"
                    :key="profile.id"
                    class="profile-card d-flex"
                >
                    <div class="profile-card-picture fill-width" :style="'background-image: url(' + apiBaseUrl + '/picture/' + 'user_no_picture.jpg' + ')'">
                        <h1>{{ profile.name }}</h1>
                    </div>
                    <div class="profile-card-description" v-if="$waveui.breakpoint.md || $waveui.breakpoint.lg || $waveui.breakpoint.xl">
                        <h2 class="mb4">{{ profile.name }} | <span class="mp-color">{{ profile.age }}</span> | {{ profile.cityTitle }}</h2>
                        <h2 class="my4 pb2 mp-color">Aprasymas:</h2>
                        <p>{{ profile.description }}</p>
                        <h2 class="my4 pb2 mp-color">Iesko:</h2>
                        <p>{{ profile.gender }}</p>
                        <div class="text-center mt5">
<!--                            <w-button xl color="white" bg-color="mp-color" class="mt5 pa6">-->
<!--                                <w-icon class="mr1">mdi mdi-email-outline</w-icon>-->
<!--                                Parašyti žinutę-->
<!--                            </w-button>-->
                            <RouterLink :to="'/user/' + profile.username">
                            <w-button xl color="white" bg-color="mp-color" class="mt5 pa6 ml5">
                                <w-icon class="mr1">mdi mdi-account</w-icon>
                                Pilnas profilis
                            </w-button>
                            </RouterLink>
                        </div>
                    </div>
                </div>

        </div>
        <Observer v-if="!endReached" @intersecting="handleUserProfiles()"/>
        <div v-else>
            <p>Daugiau useriu nera</p>
        </div>
    </main>
</template>
<style scoped>
.profile-cards {

}
.profile-card {
    min-height: 600px;
    margin-bottom: 30px;
    width: 100%;

}

.profile-card-picture {
    max-width: 450px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    text-align: center;
    margin: 0 auto;
    border: 1px solid black;
}

.profile-card-description {
    padding: 20px;
    width: 100%;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
.profile-card-description h2 {

}
</style>
