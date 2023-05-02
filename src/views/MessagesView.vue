<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const data = ref(null)
const message = ref('')
const messages = ref([])

const sendMessage = async () => {
    await axios.post('http://mp.lt:8085/chat/test', {message: message.value})
        .then(() => {
            message.value = ''
        })
        .catch(() => {
            console.log('ERROR')
        })
}
onMounted(() => {
    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'chat/2');
// The URL class is a convenient way to generate URLs such as https://localhost/.well-known/mercure?topic=https://example.com/books/{id}&topic=https://example.com/users/dunglas

    const eventSource = new EventSource(url);

// The callback will be called every time an update is published
    eventSource.onmessage = e => {

        messages.value.push(e.data)

        console.log(messages.value)

    } // do something with the payload


})

</script>
<template>
    <main>
        <div class="main-section-name">
            <h1 class="mb5">Žinutės</h1>
            <input type="text" v-model="message" @keyup.enter="sendMessage">
            <button @click="sendMessage" >SEND</button>
        </div>
        <div v-for="msg in messages" :key="msg.id">
            <p>AI: {{ JSON.parse(msg).message }}</p>
        </div>
    </main>
</template>
