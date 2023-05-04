<script setup>
import {useUsersStore} from "../stores/users/users";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";

const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)
const usersStore = useUsersStore()
const {getSingleUserProfile} = usersStore
const {userProfile} = storeToRefs(usersStore)
const profile = ref([])
const showObserver = ref(false)
const props = defineProps(['username'])
const pageToFetch = ref(0)
console.log(props.username)


onMounted(async () => {
    await getSingleUserProfile(props.username)
    profile.value = userProfile.value
})
</script>
<template>
    <div v-if="!profile">
        NERA PROFILIO EITI I PAIESKA
    </div>
    <main v-else>
        <div>
            <h1 class="mb5"><span class="mp-color">@</span>{{ profile.username }}</h1>
        </div>
        <div class="profile-cards column justify-center">
            <div class="profile-card d-flex">
                <div class="profile-card-picture fill-width"
                     :style="'background-image: url(' + apiBaseUrl + '/picture/' + 'user_no_picture.jpg' + ')'">
                    <h1>{{ profile.name }}</h1>
                </div>
                <div class="profile-card-description"
                     v-if="$waveui.breakpoint.md || $waveui.breakpoint.lg || $waveui.breakpoint.xl">
                    <h2 class="mb4">{{ profile.name }} | <span class="mp-color">32m</span> | Vilnius</h2>
                    <h2 class="my4 pb2 mp-color">Aprasymas:</h2>
                    <p>{{ profile.description }}</p>
                    <h2 class="my4 pb2 mp-color">Iesko:</h2>
                    <p>{{ profile.gender }}</p>
                    <h2 class="my4 pb2 mp-color">Nuotraukos:</h2>
                    pim pim pimp pim
                    <div class="text-center mt5">
                        <RouterLink :to="'/chat/' + profile.username">
                            <w-button xl color="white" bg-color="mp-color" class="mt5 pa6">
                                <w-icon class="mr1">mdi mdi-email-outline</w-icon>
                                Parašyti žinutę
                            </w-button>
                        </RouterLink>
                    </div>
                </div>
            </div>
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
