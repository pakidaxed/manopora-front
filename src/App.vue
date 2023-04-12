<script setup>
import {useUserStore} from "./stores/auth/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {routeLoading} = storeToRefs(userStore)
</script>

<template>
    <w-app>
        <w-overlay v-model="routeLoading" bg-color="rgba(255, 255, 255, 0.8)">
            <w-spinner color="mp-color" xl size="xl"/>
        </w-overlay>

        <RouterView/>
    </w-app>
</template>

<style scoped>

</style>
