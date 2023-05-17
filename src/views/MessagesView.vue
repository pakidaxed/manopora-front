<script setup>
import {onMounted, ref} from "vue";
import {useChatStore} from "../stores/messages/chat";
import {storeToRefs} from "pinia";
import {useUserStore} from "../stores/auth/user";

const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)
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
                <div class="chat-card d-flex">
                    <img :src="apiBaseUrl + '/picture/' + (chat.mainImage ?? 'user_no_picture.jpg')" alt="">
                    {{ chat.user2 }}
                    <w-badge class="ml2" :bg-color="Number(chat.newMessages) !== 0 ? 'mp-color' : 'hidden'" color="white" xl>
                    <template v-if="chat.newMessages !== 0" #badge>{{ chat.newMessages }}</template>
                </w-badge>
                </div>
            </RouterLink>
        </div>
    </main>
</template>
<style scoped>

.chat-card {
    font-size: 35px;
    border-bottom: 1px solid silver;
    padding: 15px 5px;
}
img {
    width: 35px;
    height: 35px;
    border-radius: 50px;
    margin-right: 20px;
    object-fit: cover;
}
span {
    padding-top: 7px;
    padding-left: 14px;
    margin-left: 10px;
    width: 50px;
    height: 50px;
    background-color: pink;
    border-radius: 50px;
}
</style>
