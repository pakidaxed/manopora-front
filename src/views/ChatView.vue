<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useChatStore} from "../stores/messages/chat";
import {storeToRefs} from "pinia";

const chatStore = useChatStore()
const {getChatMessages, sendChatMessage} = chatStore
const {isLoading, messages} = storeToRefs(chatStore)
const chatMessages = ref(null)

const data = ref(null)
const message = reactive({
    'user2': props.username,
    'message': null
})
const props = defineProps(['username'])

const sendMessage = async () => {
    await sendChatMessage(message)
    await getChatMessages(props.username)
    message.message = null
}
onMounted(async () => {
    await getChatMessages(props.username)
    chatMessages.value = messages.value



    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'chat/2');
// The URL class is a convenient way to generate URLs such as https://localhost/.well-known/mercure?topic=https://example.com/books/{id}&topic=https://example.com/users/dunglas

    const eventSource = new EventSource(url);

// The callback will be called every time an update is published
    eventSource.onmessage = async e => {
        await getChatMessages(props.username)

        // messages.value.push(e.data)

        // console.log(messages.value)

    } // do something with the payload


})

</script>
<template>
    <main>
        <div>
            <h1 class="mb5"><span class="mp-color">@</span>{{ props.username }}</h1>
        </div>
        <h1>Chat window</h1>
        <div class="chat-window">
<div v-for="chatMessage in messages" :key="chatMessage.id">
      <p style="float: right">{{chatMessage.username}}</p>
            <h6>{{ chatMessage.message }}</h6>
    <br />
</div>
        </div>
        <div>
            <input type="text" v-model.trim="message.message" @keyup.enter="sendMessage">
            <button @click="sendMessage" >SEND</button>
        </div>
<!--        <div v-for="msg in messages" :key="msg.id">-->
<!--            <p>AI: {{ JSON.parse(msg).message }}</p>-->
<!--        </div>-->
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
