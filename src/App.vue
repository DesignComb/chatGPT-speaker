<script setup lang="ts">
import {onMounted} from "vue";
import {mainStore} from "@/store";

const store = mainStore()
onMounted(() => {
  const AzureKey = localStorage.getItem('AzureKey');
  const openaiKey = localStorage.getItem('openaiKey');

  if (!AzureKey || !openaiKey) {
    store.isKeyModalOpen = true;
  }
})
</script>

<template>
  <div class="flex flex-row flex-wrap justify-center items-center w-screen h-screen">
    <router-view/>
  </div>
</template>

<style scoped>
</style>
