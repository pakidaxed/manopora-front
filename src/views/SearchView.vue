<script setup>
import {useUsersStore} from "../stores/users/users";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import Observer from "../components/extra/Observer.vue";
import {usePropertiesStore} from "../stores/props/properties";
import UserProfileCard from "../components/user/UserProfileCard.vue";

const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)
const usersStore = useUsersStore()
const {getFirstUserProfiles, getNextUserProfiles} = usersStore
const {userProfiles, endReached} = storeToRefs(usersStore)

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
                <UserProfileCard :profile="profile" />
            </div>
        </div>
        <Observer class="observer" v-if="!endReached" @intersecting="handleUserProfiles()"/>
        <div v-else class="no-more-users">
            <p>Daugiau profilių nėra</p>
        </div>
    </main>
</template>
<style scoped>


.no-more-users {
    display: flex;
    justify-content: center;
}



.profile-card {
    min-height: 600px;
    margin-bottom: 30px;
    width: 100%;
}

.profile-card-description h2 {

}
</style>
