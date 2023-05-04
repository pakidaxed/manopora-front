<template>
    <div class="observer" ref="root"></div>
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
.observer {
    text-align: center;
    height: 30px;
    width: 30px;
    border: 1px solid red;
}
</style>