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


onMounted(async () => {
    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'chat/' + mainUsername.value);
    const eventSource = new EventSource(url);

    eventSource.onmessage = async () => {
        if (route.redirectedFrom.name === 'messages' && route.name === 'chat') {
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
                <p>{{ chatMessage.username }}</p>
                <h6 :class="chatMessage.username === mainUsername ? 'me' : ''">{{ chatMessage.message }}</h6>
                <br/>
            </div>
        </div>
        <div>
            <input class="w-input" type="text" v-model.trim="message.message" @keyup.enter="sendMessage" autofocus>
            <button class="w-button" @click="sendMessage">SEND</button>
        </div>
    </main>
</template>
<style scoped>
.main-chat-window {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    height: 600px;
    overflow-y: scroll;
}

h6.me {
    border-radius: 5px;
    background-color: deeppink;
    color: white;
    padding: 5px;
    float: left;
}

.main-chat-window-message {
    border: 1px solid red;
    height: 50px;
    width: 100%;
}

h6 {
    border-radius: 5px;
    background-color: lightslategray;
    color: white;
    padding: 5px;
    float: left;
}
div.me {
    align-items: flex-start;
}

.div {
    align-items: flex-end;
}

</style>
