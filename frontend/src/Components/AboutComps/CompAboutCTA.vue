<script setup>
import LinkButton from '../../Widgets/LinkButton.vue'
import Icon from '../../Widgets/Icon.vue'
</script>

<template>
  <section class="relative py-24 md:py-32 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent"/>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-cyan-500/10 rounded-full blur-[150px]"/>

    <div class="relative z-10 max-w-4xl mx-auto px-6 md:px-4 text-center">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Ready to Try<br/>
        <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">QuickTaskManager?</span>
      </h2>
      <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Join thousands of users who replaced chaos with clarity. Free forever, no credit card required.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <LinkButton to="/signup" variant="primary" class="text-base px-10 py-4">
          Get Started Free
          <Icon name="arrow-right" size="18" class="ml-2"/>
        </LinkButton>
        <LinkButton to="https://github.com/Ansari-Codes/task-manager-fastify-vue-js" :router_link="false" class="text-base flex gap-2">
          <Icon name="github" size="18"/>
          View on GitHub
        </LinkButton>
      </div>
    </div>
  </section>
</template>