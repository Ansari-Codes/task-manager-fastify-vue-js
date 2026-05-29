<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  variant: {
    type: String,
    default: 'secondary',
  },
  active_class: {
    type: String,
    default: ''
  }
})
const variants = ['primary', 'secondary']
</script>

<template>
  <RouterLink :to="to" custom v-slot="{ navigate, isActive }">
    <button type="button" @click="navigate" :class="[
      'btn w-full',
      variants.includes(variant)
        ? `btn-${variant}`
        : '',
      isActive && 'btn-active'
    ]">
      <slot />
    </button>
  </RouterLink>
</template>


<style scoped>
@reference "tailwindcss";

.btn {
  @apply px-4 py-2 font-medium transition-all duration-150 cursor-pointer select-none inline-flex items-center justify-center;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0;
  background: transparent;
  color: var(--fg);
  position: relative;
  overflow: hidden;
}

.btn:hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.06), rgba(255, 102, 196, 0.04));
  mix-blend-mode: screen;
  pointer-events: none;
}

.btn-primary {
  color: var(--bg);
  background: var(--primary);
  border: none;
  position: relative;
}

.btn-active {
  color: var(--primary);
  background: var(--secondary);
  border: 1px solid;
  border-color: var(--primary);
  position: relative;
}

.btn-primary::before,
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
}

.btn-primary:hover::before {
  opacity: 1;
  background: rgba(0, 229, 255, 0.06);
  transform: translateX(-2px);
}

.btn-primary:hover::after {
  opacity: 1;
  background: rgba(255, 102, 196, 0.04);
  transform: translateX(2px);
}

.btn-primary:hover {
  animation: glitchPulse 0.25s linear infinite;
}

.btn-secondary {
  color: white;
  background: var(--secondary);
}

.btn-danger {
  background: transparent;
  color: var(--failure);
  border: 1px solid rgba(239, 68, 68, 0.12);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes glitchPulse {
  0% {
    transform: none;
  }

  50% {
    transform: translateX(1px);
  }

  100% {
    transform: none;
  }
}
</style>
