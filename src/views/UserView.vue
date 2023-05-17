<script setup>

import {useUsersStore} from "../stores/users/users";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import UserProfileCard from "../components/user/UserProfileCard.vue";


const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)
const usersStore = useUsersStore()
const {getSingleUserProfile} = usersStore
const {userProfile} = storeToRefs(usersStore)
const profile = ref([])
const props = defineProps(['username'])

const images = ref([
    {
        title: 'Image 1',
        url: 'http://mp.lt:8085/picture/24b693833e6893b4121bc0651f009b15.png',
    },
    {
        title: 'Image 2',
        url: 'http://mp.lt:8085/picture/1284789ab841129dc099032657ed485a.png',
    },
    // Add more image objects as needed
]);

const index = ref(null)

onMounted(async () => {
    await getSingleUserProfile(props.username)
    profile.value = userProfile.value
    // profile.value.userOtherPictures.forEach(picture => {
    //     images.value += (picture.path)
    // })

    console.log(images.value)
})
</script>
<template>
    <div v-if="!profile">
        Tokio profilio nėra.
    </div>
    <main v-else>
        <div>
            <h1 class="mb5"><span class="mp-color">@</span>{{ profile.username }}</h1>
        </div>

        <div class="profile-card d-flex" :class="$waveui.breakpoint.md || $waveui.breakpoint.lg || $waveui.breakpoint.xl ? '' : 'profile-card-mobile align-center'">
            <UserProfileCard :profile="profile"/>
        </div>
        <h3>Kitos nuotraukos</h3>

                <div class="pictures-others d-flex flex-wrap justify-center mt5" v-if="profile.userOtherPictures" v-for="userPicture in profile.userOtherPictures" :key="userPicture.id">
                    <a :href="apiBaseUrl + '/picture/' + userPicture.path" target="_blank"><img :src="apiBaseUrl + '/picture/' + userPicture.path" alt=""></a>


                </div>
                <p v-else>Papildomų nuotraukų nėra</p>
    </main>
</template>
<style scoped>
img {
    width: 300px;
    height: 300px;
}

.profile-cards {

}


.profile-card {
    min-height: 600px;
    margin-bottom: 30px;
    width: 100%;

}

.profile-card-mobile {
    flex-direction: column;
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

</style>
