<script setup>
import {ref} from "vue";

const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)
const props = defineProps(['profile'])
</script>
<template>
    <div class="profile-card-picture fill-width"
         :style="'background-image: url(' + apiBaseUrl + '/picture/' +  (props.profile.userMainPicture !== null ? props.profile.userMainPicture : 'user_no_picture.jpg') + ')'">
        <div class="card-picture-text-background">
            <RouterLink :to="'/user/' + props.profile.username"><h1 class="mt5">{{ props.profile.name }}, {{ props.profile.age }}</h1></RouterLink>
        </div>
    </div>
    <div class="profile-card-description"
        >
        <h2 class="mb4">{{ props.profile.name }}, {{ props.profile.age }}
            <w-icon xl color="mp-color ml6 mb1">mdi mdi-near-me</w-icon>
            {{ props.profile.cityTitle }}
        </h2>
        <h2 class="my4 pb2 mp-color">Ieško: <span class="profile-interest-text">{{ props.profile.interest }}</span></h2>
        <h2 class="my4 pb2 mp-color">Aprašymas:</h2>
        <p>{{ props.profile.description }}</p>
        <div class="text-center mt5">
            <RouterLink :to="'/chat/' + props.profile.username">
                <w-button xl color="white" bg-color="mp-color" class="mt5 pa6 ml5">
                    <w-icon class="mr1">mdi mdi-email-outline</w-icon>
                    Parašyti žinutę
                </w-button>
            </RouterLink>
            <RouterLink :to="'/user/' + props.profile.username" v-if="this.$route.name !== 'user'">
                <w-button xl color="white" bg-color="mp-color" class="mt5 pa6 ml5">
                    <w-icon class="mr1">mdi mdi-account</w-icon>
                    Pilnas profilis
                </w-button>
            </RouterLink>
        </div>
    </div>
</template>
<style scoped>
.profile-interest-text {
    font-size: 22px;
    color: black;
}

.card-picture-text-background {
    background: rgb(255,255,255);
    background: linear-gradient(7deg, rgba(255,255,255,0.8), rgba(255,255,255,0) 30%);
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
}

.profile-card-mobile .profile-card-description {
    border-left: 1px solid black;
}

.profile-card-picture {
    max-width: 450px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    text-align: center;
    margin: 0 auto;
    border: 1px solid black;
    position: relative;
    min-height: 500px;
}

.profile-card-description {
    padding: 20px;
    width: 100%;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}

.profile-card-mobile .profile-card-description {
    max-width: 450px;
    text-align: center;
}
.profile-card-picture h1 {
    position: absolute;
    bottom: 15px;
    left: 15px;
}
</style>