<script setup>
import {reactive, ref} from "vue";
import {useUserStore} from "../../stores/auth/user";
import {storeToRefs} from "pinia";
import InputErrorAlert from "./InputErrorAlert.vue";

const emit = defineEmits(['someEvent'])
const userStore = useUserStore()
const {isLoading, errors} = storeToRefs(userStore)
const registerSuccessful = ref(false)
const {registerUser} = userStore

const handleRegister = async () => {
    await registerUser(newUserCredentials)

    if (!errors.value) {
        newUserCredentials.email = null
        newUserCredentials.username = null
        newUserCredentials.password = null
        newUserCredentials.terms = null

        registerSuccessful.value = true
    }
}
const newUserCredentials = reactive({
    email: null,
    username: null,
    password: null,
    terms: false
})

const handleAfterRegistration = () => {
    registerSuccessful.value = false
    emit('someEvent')
}

</script>
<template>
    <w-card class="dimmed-background box-shadow">
        <div>
            <img src="../../assets/images/login_face.jpg" alt="Vartotojo nuotraukos pavizdys"/>
        </div>
        <div v-if="!isLoading">
            <w-input class="mb3 auth-input"
                     v-model="newUserCredentials.email"
                     type="email"
                     color="white"
                     label-color="white">
                <w-icon class="mr4">mdi mdi-email-open-outline</w-icon>
                <span>El-pašto adresas</span>
            </w-input>
            <InputErrorAlert :errors="errors" input-field="email"/>
            <w-input
                    v-model="newUserCredentials.username"
                    class="mb3 auth-input"
                    color="white"
                    label-color="white"
                    label="Username"
                    lebel-position="inside">
                <w-icon class="mr4">mdi mdi-account</w-icon>
                <span>Vartotojo vardas</span>
            </w-input>
            <InputErrorAlert :errors="errors" input-field="username"/>
            <w-input class="mb3 auth-input"
                     v-model="newUserCredentials.password"
                     type="password"
                     color="white"
                     label-color="white">
                <w-icon class="mr4">mdi mdi-eye</w-icon>
                <span>Slaptažodis</span>
            </w-input>
            <InputErrorAlert :errors="errors" input-field="password"/>
            <div class="d-flex">
                <w-checkbox v-model="newUserCredentials.terms" label-color="white" color="mp-color">Su sąlygomis
                    sutinku
                </w-checkbox>
            </div>
            <InputErrorAlert :errors="errors" input-field="terms"/>
            <w-button class="mt6 mb4 py6 px4" color="white" bg-color="mp-color"
                      @click="handleRegister">Registruotis
            </w-button>
        </div>
        <w-spinner color="mp-color" v-else/>
    </w-card>
    <w-dialog
        v-model="registerSuccessful"
        width="500"
        title="Registracija sėkminga">
        Jūsų paskyra sėkmingai sukurta.
        <br /><br />
        Dabar laikas pradėti linksmybes ir susipažinti su mūsų bendruomene! Norėdami
        pasinaudoti visais mūsų svetainės funkcionalumais, turite prisijungti.
        <br/><br/>
        Linkime jums malonių akimirkų mūsų svetainėje!<br/><br/>
        <w-button color="white" bg-color="mp-color" class="p10" lg @click="handleAfterRegistration">Supratau</w-button>
    </w-dialog>
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
    padding: 25px 30px;
}
</style>
<script setup>
</script>