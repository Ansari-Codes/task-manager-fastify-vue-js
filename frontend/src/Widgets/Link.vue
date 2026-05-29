<script setup>
defineProps({
    to: {
        type: String,
        default: '/'
    },
    router: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <RouterLink :to="to" v-if="router" class="flex items-center">
        <span class="link"><slot></slot></span>
    </RouterLink>
    <a v-else class="link"><slot></slot></a>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.link {
    @apply p-1 hover:underline cursor-pointer
}
</style>
