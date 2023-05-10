<template>
    <div ref="root">
        <w-spinner class="mt2" color="mp-color" xl size="xl"/>
    </div>
</template>
<script setup>
import {ref, onMounted} from "vue";

const observer = ref(null)
const root = ref(null)
const emit = defineEmits([
    'intersecting'
])

onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            emit('intersecting')
        }
    })

    observer.value.observe(root.value)
})
</script>
<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>