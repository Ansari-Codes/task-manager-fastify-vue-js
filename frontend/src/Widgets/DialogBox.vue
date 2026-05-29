<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  position: {
    type: String,
    default: 'right',
    validator: (val) => ['left', 'right', 'top', 'bottom'].includes(val)
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  minSize: {
    type: Number,
    default: 250
  },
  maxSize: {
    type: Number,
    default: 1000
  }
})

const emit = defineEmits(['update:modelValue'])

const size = ref(400)
const isResizing = ref(false)

function close() {
  if (props.closeOnOverlay) {
    emit('update:modelValue', false)
  }
}

// Close on Escape key
function handleKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

// Lock body scroll when open
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})

const panelStyle = computed(() => {
  switch (props.position) {
    case 'left':
    case 'right':
      return { width: `${size.value}px` }
    case 'top':
    case 'bottom':
      return { height: `${size.value}px` }
    default:
      return {}
  }
})

function startResize(e) {
  e.preventDefault() // Prevents text selection while dragging
  isResizing.value = true
  document.body.classList.add('is-resizing')

  const startX = e.clientX
  const startY = e.clientY
  const startSize = size.value

  function move(ev) {
    if (!isResizing.value) return

    let newSize = startSize
    if (props.position === 'left') newSize = startSize + (ev.clientX - startX)
    if (props.position === 'right') newSize = startSize - (ev.clientX - startX)
    if (props.position === 'top') newSize = startSize + (ev.clientY - startY)
    if (props.position === 'bottom') newSize = startSize - (ev.clientY - startY)

    size.value = Math.max(props.minSize, Math.min(newSize, props.maxSize))
  }

  function stop() {
    isResizing.value = false
    document.body.classList.remove('is-resizing')
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', stop)
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', stop)
}
</script>

<template>
  <Teleport to="body">
    
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="overlay"
        @click.self="close"
      ></div>
    </Transition>

    <Transition :name="`slide-${position}`">
      <div
        v-if="modelValue"
        class="dialog"
        :class="[`dialog-${position}`, { 'dialog-resizing': isResizing }]"
        :style="panelStyle"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="resizer"
          :class="`resizer-${position}`"
          @mousedown="startResize"
        >
          <div class="resizer-line"></div>
        </div>

        <div class="dialog-content">
          <slot />
        </div>
      </div>
    </Transition>

  </Teleport>
</template>

<style scoped>
/* Overlay Backdrop */
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 40;
}

/* Base Dialog Styles */
.dialog {
  position: fixed;
  background: #0f172a;
  color: #f8fafc;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  flex-direction: column;
}

/* Disable transitions while actively dragging to prevent lag */
.dialog:not(.dialog-resizing) {
  transition: width 0.1s, height 0.1s;
}

.dialog-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem; /* Optional: gives default breathing room to slot content */
}

/* Position Specifics */
.dialog-left { left: 0; top: 0; bottom: 0; border-right: 1px solid rgba(255,255,255,0.1); }
.dialog-right { right: 0; top: 0; bottom: 0; border-left: 1px solid rgba(255,255,255,0.1); }
.dialog-top { top: 0; left: 0; right: 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
.dialog-bottom { bottom: 0; left: 0; right: 0; border-top: 1px solid rgba(255,255,255,0.1); }

/* Resizer Base */
.resizer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.2s ease;
}

.resizer-line {
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.resizer:hover .resizer-line,
.dialog-resizing .resizer-line {
  background-color: #3b82f6; /* Tailwind blue-500 visual cue */
}

/* Resizer Positioning & Hitboxes */
.resizer-left,
.resizer-right {
  top: 0;
  bottom: 0;
  width: 12px; /* Wider hitbox for easier grabbing */
  cursor: ew-resize;
}
.resizer-left { right: -6px; }
.resizer-right { left: -6px; }

.resizer-left .resizer-line,
.resizer-right .resizer-line {
  height: 100%;
  width: 2px;
}

.resizer-top,
.resizer-bottom {
  left: 0;
  right: 0;
  height: 12px; /* Wider hitbox for easier grabbing */
  cursor: ns-resize;
}
.resizer-top { bottom: -6px; }
.resizer-bottom { top: -6px; }

.resizer-top .resizer-line,
.resizer-bottom .resizer-line {
  width: 100%;
  height: 2px;
}

/* --- Vue Transitions --- */

/* Fade Transition (Overlay) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Transitions (Drawer) */
.slide-right-enter-active, .slide-right-leave-active,
.slide-left-enter-active, .slide-left-leave-active,
.slide-top-enter-active, .slide-top-leave-active,
.slide-bottom-enter-active, .slide-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }
.slide-left-enter-from, .slide-left-leave-to { transform: translateX(-100%); }
.slide-top-enter-from, .slide-top-leave-to { transform: translateY(-100%); }
.slide-bottom-enter-from, .slide-bottom-leave-to { transform: translateY(100%); }
</style>

<style>
/* Global class applied to body during drag to stop text highlighting and cursor flickering */
body.is-resizing {
  user-select: none;
  cursor: grabbing !important;
}
</style>