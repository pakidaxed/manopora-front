<script setup>
import {onMounted, ref} from "vue";
import router from "../router";

const show404 = ref(true)
const redirectToLogin = () => {
    router.push('/')
}

onMounted(() => {
    setTimeout(redirectToLogin, 5000)
})
</script>

<template>
    <w-overlay v-if="true" v-model="show404" bg-color="rgba(255, 255, 255, 0.8)">
        <div class="d-flex justify-center mb5">
            <img src="../assets/images/manopora_logo.png" alt="manopora.lt - Logotipas" class="w-image-wrap--has-ratio">
            <p class="text-center">404 | Tokio puslapio nėra</p>
        </div>
        <w-spinner class="mt2" color="mp-color" xl size="xl"/>
    </w-overlay>
</template>

<style scoped>
div {
    flex-direction: column;
}
</style>
