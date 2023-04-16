<script setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "../../stores/auth/user";
import router from "../../router";

const userStore = useUserStore()
const isLoggedOut = ref(true)

const redirectToLogin = () => {
    isLoggedOut.value = false
    router.push('/login')
}

onMounted(() => {
    userStore.logoutUser()
    setTimeout(redirectToLogin, 5000)
})
</script>

<template>
    <w-overlay v-if="isLoggedOut" v-model="isLoggedOut" bg-color="rgba(255, 255, 255, 0.8)">
        <div class="d-flex justify-center mb5">
            <img src="../../assets/images/manopora_logo.png" alt="manopora.lt - Logotipas" class="w-image-wrap--has-ratio">
            <p class="text-center">Iki pasimatymo...</p>
        </div>
        <w-spinner class="mt2" color="mp-color" xl size="xl"/>
    </w-overlay>
</template>

<style scoped>
div {
    flex-direction: column;
}
</style>
