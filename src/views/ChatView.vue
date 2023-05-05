<script setup>
import {onMounted, reactive, ref} from "vue";
import {useChatStore} from "../stores/messages/chat";
import {storeToRefs} from "pinia";
import {useUserStore} from "../stores/auth/user";
import {useRoute} from "vue-router";

const route = useRoute()

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


const props = defineProps(['username'])

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
        <h1>Chat window</h1>
        <div class="chat-window">
            <div v-for="chatMessage in messages" :key="chatMessage.id">
                <p style="float: right">{{ chatMessage.username }}</p>
                <h6>{{ chatMessage.message }}</h6>
                <br/>
            </div>
        </div>
        <div>
            <input type="text" v-model.trim="message.message" @keyup.enter="sendMessage">
            <button @click="sendMessage">SEND</button>
        </div>
    </main>
</template>
<style scoped>
.chat-window {
    height: 600px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    overflow-y: scroll;
}

p {

}

</style>
