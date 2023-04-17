<script setup>

import {reactive, ref} from "vue";

const myProfile = reactive({
    name: '',
    birthDate: null,
})

const mySexs = ref([
    {value: 'vyras', label: 'Vyras'},
    {value: 'moteris', label: 'Moteris'},
    {value: 'pora', label: 'Pora'},
    {value: 'kita', label: 'Kita'}
])

const searchSexs = ref([
    {value: 'vyro', label: 'Vyro'},
    {value: 'moters', label: 'Moters'},
    {value: 'poros', label: 'Poros'},
    {value: 'kita', label: 'Kita'}
])

const selectedMySex = ref('vyras')
const selectedSearchSex = ref('moters')


</script>
<template>
    <main>
        <div class="main-name">
<!--            TODO palimituoti backe reikia username'o ilgi-->
            <h1 class="mb5"><span class="mp-color">@</span>turritopsis88</h1>
        </div>
        <div class="d-flex xs-column sm-column">
            <div class="my-profile-info md6">
                <div class="my-profile-info-fields column">
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-input class="mb3 auth-input"
                                 v-model="myProfile.name"
                                 type="email"
                                 color="black"
                                 label-color="mp-color"
                                 model-value="Arkamas">
                            <span>Vardas:</span>
                        </w-input>
                    </div>
                    <div class="my-profile-info-field d-flex mt12">
                        <w-input class="mb3 auth-input"
                                 v-model="myProfile.name"
                                 type="date"
                                 color="black"
                                 label-color="mp-color"
                                 model-value="1988-05-27">
                            <span>Gimimo data:</span>
                        </w-input>
                    </div>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-select
                                color="black"
                                label-color="mp-color"
                                :items="mySexs"
                                label="Esu"
                                v-model="selectedMySex"
                        >
                        </w-select>
                    </div>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-select
                                color="black"
                                label-color="mp-color"
                                :items="searchSexs"
                                label="Ieškau"
                                v-model="selectedSearchSex"
                        >
                        </w-select>
                    </div>
                    <div class="my-profile-info-field mt12 d-flex">
                        <w-textarea
                                color="black"
                                label-color="mp-color"
                                no-autogrow
                                rows="6"
                                outline
                                model-value="fdfsf"
                        >
                            Apie mane
                        </w-textarea>
                    </div>
                    <div class="my-profile-info-field mb5 sm-text-center xs-text-center">
                        <w-button xl color="white" bg-color="mp-color" class="mt5 pa6">
                            <w-icon class="mr1">mdi mdi-check</w-icon>
                            Išsaugoti
                        </w-button>
                    </div>
                </div>
            </div>
            <div class="spacer px2"></div>
            <div class="">
                <div class="my-profile-info-picture text-center">
                    <img src="../assets/images/login_face.jpg" alt="" width="300">
                </div>
                <div class="my-profile-info-picture-link text-center">
                    <RouterLink to="/nuotraukos">
                        <w-button xl color="white" bg-color="mp-color" class="mt5 pa6">
                            <w-icon class="mr1">mdi mdi-camera-outline</w-icon>
                            Tvarkyti nuotraukas
                        </w-button>
                    </RouterLink>
                </div>



            </div>
        </div>

    </main>
</template>
<script setup>
</script>
<style scoped>
.my-profile-image {
    text-align: center;
}

.w-input, .w-select, .w-textarea, .w-select-dropdown-item {
    font-size: 30px;
    color: black;
}


</style>