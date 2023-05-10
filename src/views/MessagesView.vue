<script setup>
import {onMounted, ref} from "vue";
import {useChatStore} from "../stores/messages/chat";
import {storeToRefs} from "pinia";
import {useUserStore} from "../stores/auth/user";
import {useRoute} from "vue-router";

const route = useRoute()

const userStore = useUserStore()
const {mainUsername} = storeToRefs(userStore)

const chatStore = useChatStore()
const {getChatList} = chatStore
const {chats} = storeToRefs(chatStore)

onMounted(async () => {
    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'chat/' + mainUsername.value);
    const eventSource = new EventSource(url);

    eventSource.onmessage = async () => {
        await getChatList()

    }

    eventSource.onopen = async () => {
        await getChatList()
    }
})

</script>
<template>
    <main>
        <div class="main-section-name">
            <h1 class="mb5">Žinutės</h1>
        </div>
        <div v-for="chat in chats" :key="chat.id">
            <RouterLink :to="'/chat/' + chat.user2">
                <div class="chat-card">@{{ chat.user2 }} - {{ chat.newMessages }}</div>
            </RouterLink>
        </div>
    </main>
</template>
<style scoped>
.chat-card {
    font-size: 35px;
    border-bottom: 1px solid black;
    padding: 20px 5px;
}
</style>
