<script setup>
import {onMounted, reactive, ref} from "vue";
import {usePictureStore} from "../stores/user/picture";
import {storeToRefs} from "pinia";
import InputErrorAlert from "../components/auth/InputErrorAlert.vue";

const pictureStore = usePictureStore()
const {isLoading, allPictures, mainPicture, errors, totalPictures} = storeToRefs(pictureStore)
const {getUserPictures, uploadUserPicture, setMainPicture, deleteUserPicture} = pictureStore

const newImageFile = ref(null)
const showActionButtons = ref(false)

const dialog = reactive({
    show: false,
    fullscreen: false,
    persistent: false,
    persistentNoAnimation: false,
    width: 500
})

const dialogConfirm = reactive({
    show: false,
    pictureId: null,
})

const handleActionButtons = () => {
    setTimeout(() => {
        showActionButtons.value = false
    }, 10000);
}

const handleMainPicture = async (id) => {
    await setMainPicture(id)
    await getUserPictures()
}

const handleDeletePicture = async (id) => {
    dialogConfirm.show = true
    dialogConfirm.pictureId = id
}

const handleDeletePictureConfirmation = async () => {
    await deleteUserPicture(dialogConfirm.pictureId)
    await getUserPictures()
    dialogConfirm.confirm = false
    dialogConfirm.pictureId = null
    dialogConfirm.show = false
    mainPicture.value = 'user_no_picture.jpg'
}
const handleUploadPicture = (event) => {
    newImageFile.value = event.target.files
}

const uploadPicture = async () => {
    if (newImageFile.value) {
        await uploadUserPicture(newImageFile.value)
    }
    if (!errors.value) {
        dialog.show = false
        newImageFile.value = null
        await getUserPictures()
    }

}

onMounted(async () => {
    await getUserPictures()
})
</script>
<template>
    <main>
        <div class="main-section-name">
            <h1 class="mb5">Nuotraukos</h1>
        </div>
        <!--        TODO sugalvot kaip main pictures kai nera kad alerta rodytu-->
        <w-alert v-if="mainPicture == 'user_no_picture.jpg'" bg-color="mp-color" color="white">
            Nėra pagrindinės nuotraukos, kuri rodoma kitiems vartotojams paieškoje
        </w-alert>
        <div class="d-flex xs-column sm-column">
            <div class="md3 mb5">
                <h3 class="mb5">Pagrindinė nuotrauka</h3>
                <div class="column">
                    <div class="pictures-main text-center">
                        <img :src="'http://mp.lt/picture/' + mainPicture" class="w-image-wrap--has-ratio"
                             alt="Pagrindinė nuotrauka">
                    </div>
                </div>
                <div class="my-profile-info-field mb5 text-center">
                    <w-button :loading="isLoading" xl color="white"
                              bg-color="mp-color" class="mt5 pa6"
                              @click="dialog.show = true">
                        <w-icon class="mr1">mdi mdi-camera-enhance</w-icon>
                        Įikelti nuotrauką
                    </w-button>
                </div>
            </div>
            <div class="spacer px2"></div>
            <div class="md9">
                <div class="mb5">
                    <h3>Viso nuotraukų: {{ totalPictures }}/10</h3>
                </div>
                <div class="pictures-others d-flex flex-wrap justify-center">
                    <div
                            v-if="allPictures"
                            v-for="picture in allPictures"
                            :key="picture.id"
                            class="pictures-others-card"
                            :style="'background-image: url(http://mp.lt/picture/' + picture.path + ')'"
                            @mouseover="showActionButtons = picture.id"
                            @mouseout="handleActionButtons"
                    >
                        <w-tooltip v-if="showActionButtons === picture.id" top>
                            <template #activator="{ on }">
                                <w-button
                                        v-on="on"
                                        class="w-button--absolute pictures-others-button-delete"
                                        xl
                                        bg-color="error"
                                        icon="wi-cross"
                                        @click="handleDeletePicture(picture.id)"
                                ></w-button>
                            </template>
                            Ištrinti nuotrauką
                        </w-tooltip>
                        <w-tooltip v-if="showActionButtons === picture.id" top>
                            <template #activator="{ on }">
                                <w-button v-on="on" class="w-button--absolute pictures-others-button-make-main-picture"
                                          xl bg-color="success" icon="wi-check"
                                          @click="handleMainPicture(picture.id)"></w-button>
                            </template>
                            Padaryti pagrindine
                        </w-tooltip>
                    </div>
                    <div v-else>Nera nuotraukų</div>
                </div>
            </div>
        </div>


        <w-dialog
                v-model="dialog.show"
                :fullscreen="dialog.fullscreen"
                :width="dialog.width"
                :persistent="dialog.persistent"
                :persistent-no-animation="dialog.persistentNoAnimation"
                title-class="mp-color--bg white">
            <template #title>
                <w-icon class="mr2">mdi mdi-camera-enhance</w-icon>
                Pridėkite naują nuotrauką
            </template>

            <div class="mb10">
                <p>Leistini nuotruakos formata: jpg, png, webp</p>
                <p>Maksimalus nuotraukos dydis 2MB</p>
            </div>
            <div class="w-flex mt0 no-grow">
                <w-input type="file" ref="newImageFile" label-color="mp-color"
                         @change="handleUploadPicture">
                    Pasinkti nuotrauką
                </w-input>
            </div>
            <InputErrorAlert :errors="errors" input-field="file"/>
            <div class="text-center mt5">
                <w-button bg-color="success" color="white" xl
                          @click="uploadPicture">Įkelti
                </w-button>
            </div>
            <div class="text-center mt5">
                <w-button bg-color="mp-color" color="white" md
                          @click="dialog.show = false">Uždaryti
                </w-button>
            </div>
        </w-dialog>
        <w-dialog
                v-model="dialogConfirm.show"
                persistent
                :width="500">
            Ar tikrai norite ištrinti šia nuotrauką ?

            <template #actions>
                <div class="spacer"/>
                <w-button
                        class="mr2"
                        @click="dialogConfirm.show = false"
                        bg-color="error">
                    Ne
                </w-button>
                <w-button
                        @click="handleDeletePictureConfirmation"
                        bg-color="success">
                    Taip
                </w-button>
            </template>
        </w-dialog>
    </main>
</template>
<style scoped>
.pictures-main img {
    max-width: 300px;
}

.pictures-others {
    flex-wrap: wrap;
}

.pictures-others-card {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 150px;
    height: 150px;
    margin-right: 5px;
    margin-bottom: 5px;
    position: relative;
}

.pictures-others-card:hover {
    border: 1px solid black;
}

.pictures-others-button-delete {
    bottom: 20px;
    left: 35px;
}

.pictures-others-button-make-main-picture {
    bottom: 20px;
    right: 35px;
}
</style>
