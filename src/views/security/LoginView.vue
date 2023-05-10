<script setup>
import {ref} from "vue";
import LoginBlock from "../../components/auth/LoginBlock.vue";
import RegisterBlock from "../../components/auth/RegisterBlock.vue";
import Welcome from "../../components/Welcome.vue";

const emit = defineEmits(['someEvent'])
const isRegistering = ref(false)
const newsMessage = ref('')

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const handleSwitching = () => {
    isRegistering.value = !isRegistering.value
}
</script>

<template>
    <w-app class="background">
        <header v-if="newsMessage" class="white text-center pa2 mp-color--bg">
            {{ newsMessage }} {{ $waveui.breakpoint.name }}
        </header>
        <main class="grow d-flex justify-center pa5"
              :class="$waveui.breakpoint.xs || $waveui.breakpoint.sm || $waveui.breakpoint.md ? 'align-start mt10' : 'align-center'">
            <w-flex class="d-flex wrap justify-center align-center">
                <div class="login-welcome-text xs-auto sm11 md10 lg5 xl6">
                    <Welcome/>
                    <w-button v-if="!isRegistering" xl color="white" bg-color="mp-color" class="main-page-auth-button" @click="handleSwitching">REGISTRUOTI</w-button>
                    <w-button v-else xl color="white" bg-color="mp-color" class="main-page-auth-button" @click="handleSwitching">PRISIJUNGTI</w-button>
                </div>
                <div class="login-register-auth-form mt4 pa0 text-center xs12 sm11 md10 lg5 xl3"
                     :class="$waveui.breakpoint.lg || $waveui.breakpoint.xl ? 'pl10' : ''">
                    <LoginBlock v-if="!isRegistering"/>
                    <RegisterBlock @some-event="handleSwitching" v-else/>
                </div>

            </w-flex>
        </main>
        <footer class="white text-center pa2">© {{ currentYear }} manopora.lt</footer>
    </w-app>
</template>

<style scoped>
header, footer {
    min-height: 30px;
}

.main-page-auth-button {
    padding: 30px 0 25px 0;
    width: 100%;
    margin-top: 20px;
    font-size: 30px;
}

.background {
    background-image: url("../../assets/images/love3_dimmed.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-origin: padding-box;
    background-clip: border-box;
    background-attachment: fixed;
    background-color: transparent;
}

footer {
    background: rgba(0, 0, 0, 0.6);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
}
</style>
