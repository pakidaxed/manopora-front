<script setup>
import {ref} from "vue";
import LoginBlock from "../components/auth/LoginBlock.vue";
import RegisterBlock from "../components/auth/RegisterBlock.vue";
import Welcome from "../components/Welcome.vue";

const isRegistering = ref(true)
const newsMessage = ref('')
</script>

<template>
    <header v-if="newsMessage" class="white text-center pa2 mp-color--bg">
        {{ newsMessage }} {{ $waveui.breakpoint.name }}
    </header>
    <main class="grow d-flex justify-center pa5"
          :class="$waveui.breakpoint.xs || $waveui.breakpoint.sm || $waveui.breakpoint.md ? 'align-start mt10' : 'align-center'">
        <w-flex class="d-flex wrap justify-center align-center">
            <div class="login-welcome-text xs-auto sm11 md10 lg5 xl6">
                <Welcome/>
            </div>

            <div class="login-register-auth-form mt4 pa0 text-center xs12 sm11 md10 lg5 xl3"
                 :class="$waveui.breakpoint.lg || $waveui.breakpoint.xl ? 'pl10' : ''">
                    <LoginBlock v-if="!isRegistering"/>
                    <RegisterBlock v-else/>
                <button @click="isRegistering = !isRegistering">switch</button>
            </div>

        </w-flex>
    </main>
    <footer class="white text-center pa2">© 2023 MANOPORA.LT</footer>
</template>

<style>
header, footer {
    min-height: 30px;
}

body {
    background-image: url("../assets/images/love3_dimmed.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-origin: padding-box;
    background-clip: border-box;
    background-attachment: fixed;
    background-color: transparent;
}

footer {
    /* Created with https://www.css-gradient.com */
    background: rgba(0, 0, 0, 0.6);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
}

.auth-enter-active {
    transition: all 1s ease;
}

.auth-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.auth-enter-from,
.auth-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

</style>
