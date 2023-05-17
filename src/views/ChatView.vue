<script setup>
import {onMounted, reactive, ref} from "vue";
import {useChatStore} from "../stores/messages/chat";
import {storeToRefs} from "pinia";
import {useUserStore} from "../stores/auth/user";
import {useRoute} from "vue-router";

const route = useRoute()
const props = defineProps(['username'])

const chatStore = useChatStore()
const {getChatMessages, sendChatMessage} = chatStore
const {isLoading, messages} = storeToRefs(chatStore)

const userStore = useUserStore()
const {mainUsername} = storeToRefs(userStore)

const chatMessages = ref(null)

const data = ref(null)
const message = reactive({
    'user2': props.username,
    'message': null,
})

const sendMessage = async () => {
    await sendChatMessage(message)
    await getChatMessages(props.username)
    message.message = null
}

const getTimeAgo = (datetime) => {
    const currentDate = new Date();
    const targetDate = new Date(datetime);

    const timeDifference = currentDate - targetDate;
    const minutes = Math.floor(timeDifference / 60000);

    if (minutes < 1) {
        return 'Katik';
    } else if (minutes === 1) {
        return 'prieš 1 minutę';
    } else if (minutes < 60) {
        return 'prieš ' + minutes + ' min.';
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        return 'prieš ' + hours + ' val.';
    } else {
        const days = Math.floor(minutes / 1440);
        return 'prieš ' +days + ' d.';
    }
}


onMounted(async () => {
    await getChatMessages(props.username)
    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'chat/' + mainUsername.value);
    const eventSource = new EventSource(url);

    eventSource.onmessage = async () => {
        if (route.name === 'chat') {
            await getChatMessages(props.username)
        }
    }

    eventSource.onopen = async () => {
        await getChatMessages(props.username)
    }
})

</script>
<template>
    <h1 v-if="props.username === mainUsername">Juokaujat ? :)</h1>
    <main v-else>
        <div>
            <h1 class="mb5"><span class="mp-color">@</span>{{ props.username }}</h1>
        </div>
        <div class="main-chat-window">
            <div class="main-chat-window-message" v-for="chatMessage in messages" :key="chatMessage.id" :class="chatMessage.username === mainUsername ? 'me' : ''">
                <p class="mb1"> <span>{{ getTimeAgo(chatMessage.createdAt) }}</span></p>
                <h6 :class="chatMessage.username === mainUsername ? 'me' : ''">{{ chatMessage.message }}</h6>
            </div>
        </div>
        <div class="d-flex">
            <input class="w-input" type="text" v-model.trim="message.message" @keyup.enter="sendMessage" autofocus>
            <w-button class="w-button py6" xl bg-color="mp-color" color="white" @click="sendMessage">
                <w-icon class="mr3">mdi mdi-send</w-icon>
                Siųsti</w-button>
        </div>
    </main>
</template>
<style scoped>
.main-chat-window {
    flex-direction: column;
    display: flex;
    flex-direction: column-reverse;
    height: 600px;
    overflow-y: auto;
}

.main-chat-window span {
    font-size: 12px;
}

.main-chat-window::-webkit-scrollbar {
    width: 0.5em; /* Set the width of the scrollbar */
}

.main-chat-window::-webkit-scrollbar-track {
    background: transparent; /* Set the background color of the scrollbar track */
}

.main-chat-window::-webkit-scrollbar-thumb {
    background-color: pink; /* Set the color of the scrollbar thumb */
    border-radius: 0.25em; /* Set the border radius of the scrollbar thumb */
}

.main-chat-window::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Set the color of the scrollbar thumb on hover */
}

input {
    font-family: 'Comfortaa', cursive;
    font-size: 18px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid silver;
    border-left: 5px solid #F1527EFF;
}



.main-chat-window-message {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 5px;
}

.main-chat-window-message.me {
    display: flex;
    align-items: flex-end;
}

h6 {
    border-radius: 5px;
    background-color: #F1527EFF;
    //background-color: #527EF1;
    //background-color: #52F1C5;
    color: white;
    padding: 10px;
    font-size: 16px;
    font-weight: normal;
}

.me h6 {
    background-color: #a6a6a6;;
}
.me div {
    align-items: flex-start;
}

</style>
