<script setup>
import CompHeader from '../Components/HomeComps/CompHeader.vue'
import CompAboutHero from '../Components/AboutComps/CompAboutHero.vue'
import CompMission from '../Components/AboutComps/CompMission.vue'
import CompTechStack from '../Components/AboutComps/CompTechStack.vue'
import CompTeam from '../Components/AboutComps/CompTeam.vue'
import CompAboutCTA from '../Components/AboutComps/CompAboutCTA.vue'
import CompFooter from '../Components/HomeComps/CompFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#071427] text-white overflow-x-hidden">
    <CompHeader />
    <CompAboutHero />
    <CompMission />
    <CompTechStack />
    <CompTeam />
    <CompAboutCTA />
    <CompFooter />
  </div>
</template>
