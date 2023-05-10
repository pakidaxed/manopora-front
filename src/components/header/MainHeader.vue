<script setup>
import {useRoute} from "vue-router";
import {useUserStore} from "../../stores/auth/user";
import {storeToRefs} from "pinia";
import {useChatStore} from "../../stores/messages/chat";
import {onMounted} from "vue";

const route = useRoute()

const userStore = useUserStore()
const {mainUsername} = storeToRefs(userStore)

const chatStore = useChatStore()
const {getTotalMessagesCount} = chatStore
const {totalNewMessages} = storeToRefs(chatStore)

onMounted(async () => {
    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'chat/' + mainUsername.value);
    const eventSource = new EventSource(url);

    eventSource.onmessage = async () => {
            await getTotalMessagesCount()
    }

    eventSource.onopen = async () => {
            await getTotalMessagesCount()
    }
})
</script>
<template>
    <w-toolbar shadow class="py1">
        <div class="mb-1">
            <RouterLink to="/"><img src="../../assets/images/manopora_logo.png" width="150" alt=""></RouterLink>
        </div>
        <div class="spacer"></div>
        <!--        TODO kai funkcija manopora bus alive -->
        <!--        <w-button icon="mdi mdi-heart" text lg class="ml3" color="mp-color"></w-button>-->
        <RouterLink to="/search">
            <w-button icon="mdi mdi-account-search" text lg color="black"></w-button>
        </RouterLink>
        <RouterLink to="/notifications">
            <w-badge top right overlap bg-color="hidden" color="white">
                <template #badge>0</template>
                <w-button icon="mdi mdi-bell-outline" text lg class="ml3" color="black"></w-button>
            </w-badge>
        </RouterLink>
        <RouterLink to="/messages">
            <w-badge top right overlap :bg-color="totalNewMessages ? 'mp-color' : 'hidden'" color="white">
                <template v-if="totalNewMessages" #badge>{{ totalNewMessages }}</template>
                <w-button icon="mdi mdi-email-outline" text lg class="ml3" color="black"></w-button>
            </w-badge>
        </RouterLink>
        <!--        TODO: BR'us sutvarkyt -->
        <w-menu align-right>
            <template #activator="{ on }">
                <w-button v-on="on" icon="mdi mdi-apps" text lg class="ml3" color="black"></w-button>
            </template>
            <RouterLink to="/me">
                <w-button icon="mdi mdi-account-settings" text lg color="black"></w-button>
                Mano profilis
            </RouterLink>
            <br/>
            <RouterLink to="/pictures">
                <w-button icon="mdi mdi-camera-outline" text lg color="black"></w-button>
                Nuotruakos
            </RouterLink>
            <br/>
            <RouterLink to="/settings">
                <w-button icon="mdi mdi-tune" text lg color="black"></w-button>
                Nustatymai
            </RouterLink>
            <br/>
            <RouterLink to="/logout">
                <w-button icon="mdi mdi-logout" text lg color="black"></w-button>
                Atsijungti
            </RouterLink>
        </w-menu>
    </w-toolbar>
</template>
<script setup>
</script>