<script setup>
const props = defineProps([
    'errors',
    'inputField'
])
</script>
<template>
    <div v-if="props.errors" v-for="error in props.errors" :key="error.field">
        <w-alert v-if="error.field == props.inputField" bg-color="mp-color" color="white">
            {{ error.message }}
        </w-alert>
    </div>
</template>