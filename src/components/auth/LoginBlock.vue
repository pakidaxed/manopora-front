<script setup>
import {useUserStore} from "../../stores/auth/user";
import {storeToRefs} from "pinia";
import {onMounted, reactive} from "vue";
import router from "../../router";;
const userStore = useUserStore()
const {isLoading, success, errors} = storeToRefs(userStore)
const {loginUser} = userStore
const handleLogin = async () => {
    await loginUser(userCredentials)

    if (success.value) {
        await router.push('/')
    }
}
const userCredentials = reactive({
    email: null,
    password: null
})
onMounted(() => {
    errors.value = null
})
</script>
<template>
    <w-card class="dimmed-background box-shadow">
        <div>
            <img src="../../assets/images/login_face.jpg" alt="Vartotojo nuotraukos pavizdys"/>
        </div>
        <div v-if="!isLoading">
            <w-input class="mb3 auth-input"
                     v-model="userCredentials.email"
                     type="email"
                     color="white"
                     label-color="white">
                <w-icon class="mr4">mdi mdi-email-open-outline</w-icon>
                <span>El-pašto adresas</span>
            </w-input>

            <w-input class="mb3 auth-input"
                     v-model="userCredentials.password"
                     type="password"
                     color="white"
                     label-color="white">
                <w-icon class="mr4">mdi mdi-eye</w-icon>
                <span>Slaptažodis</span>
            </w-input>
            <w-alert v-if="errors" bg-color="mp-color" color="white">
                {{ errors }}
            </w-alert>
            <w-button class="mt6 mb4 py6 px4" color="white" bg-color="mp-color" @click="handleLogin">Prisijungti</w-button>
        </div>
        <w-spinner v-else color="mp-color" />
    </w-card>
</template>

<style scoped>
img {
    width: 110px;
    height: 110px;
    color: white;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 2px 2px 8px black;
    margin-bottom: 20px;
    margin-top: 10px;
}

.auth-input {
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 25px;
    padding: 10px;
    font-family: 'Comfortaa', cursive;
    color: white;
    text-align: left;
}

.w-checkbox {
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 18px;
    padding: 10px;
    font-family: 'Comfortaa', cursive;
    color: white;
    text-align: left;
}

.w-button {
    font-size: 30px;
}
</style>
<script setup>
</script>