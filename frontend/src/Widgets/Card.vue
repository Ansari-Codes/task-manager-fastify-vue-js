<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>

    <div>
      <slot></slot>
    </div>

    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>@reference "tailwindcss";

.card {
  @apply bg-transparent p-6 transition-all duration-150;
  border: 1px solid rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
  border-radius: 0;
}

.card:hover {
  transform: none;
}
</style>
