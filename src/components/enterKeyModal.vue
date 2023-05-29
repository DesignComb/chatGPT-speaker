<script setup lang="ts">
import {ref, reactive, computed} from "vue"

const AzureKey = ref('');
const openaiKey = ref('');
let saveKeys = () => {
  localStorage.setItem('AzureKey', AzureKey.value);
  localStorage.setItem('openaiKey', openaiKey.value);
}
</script>

<template>
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Please input your key!</h3>
      <p class="py-4">You need to enter the keys for ChatGPT and Azure models to access and use these two features!</p>
      <div class="my-2 text-left">
        <label>Key for Azure: <input class="input input-bordered" type="password" v-model="AzureKey" /></label>
      </div>
      <div class="my-2 text-left">
        <label>Key for chatGPT: <input class="input input-bordered" type="password" v-model="openaiKey" /></label>
      </div>
      <div class="modal-action">
        <label @click="saveKeys" for="my-modal" class="btn">Done!</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>