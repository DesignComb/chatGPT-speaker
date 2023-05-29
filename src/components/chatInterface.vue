<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import Api from "@/api";
import Loading from "@/components/loading.vue";
import {mainStore} from "@/store";
import {chatContent} from "@/store/chatContent";

const store = mainStore()
const chatStore = chatContent()

let isChatTextEditable = ref(false)
let loading = ref(false)

const completePrompt = computed(() => {
  let tmp = ''
  if (store.settingOptions[2].value && chatStore.history.length > 1) {
    tmp += `History:\n`
    chatStore.history.forEach((item) => {
      tmp += `\nUser:${item.prompt}\nChatGPT:${item.result}\n\n`
    })
  }
  tmp += `${chatStore.prompt}`
  return tmp
})

const createChat = () => {
  loading.value = true;
  Api.createChat(completePrompt.value)
      .then((res) => {
        chatStore.result = res.data.choices[0]?.message?.content;
        isChatTextEditable.value = true;
        // 將最近10次對話的內容添加到對話記錄的數組中
        if (store.settingOptions[2].value) {
          chatStore.addHistory(chatStore.prompt, res.data.choices[0]?.message?.content);
        }
      })
      .finally(() => {
        loading.value = false;
      });
};

let toggleText = (index: number) => {
  chatStore.history[index].textCollapsed = !chatStore.history[index].textCollapsed
}
</script>

<template>
  <div class="w-full">
    <h2 class="w-full card-title text-left mt-1 mb-8">ChatGPT Speaker</h2>
    <h5 class="w-full flex items-center text-left mb-2">
      <i class="bx bx-user text-[1.35rem] w-8 h-8 p-1 mr-2 border border-gray-700 rounded"></i>
      Prompt
    </h5>
    <div class="flex relative items-center justify-between mb-8">
      <textarea v-model="chatStore.prompt" rows="5"
                class="textarea textarea-primary w-full form-input p-4" placeholder="prompt here"/>
      <button @click="createChat" class="btn btn-primary ml-4 absolute bottom-0 right-0">Send</button>
    </div>
    <!-- 添加一個對話記錄的列表，顯示最近10次對話的內容 -->
    <div v-if="store.settingOptions[2].value && chatStore.history.length > 0">
      <h5 class="w-full text-left mb-2">Chat history ({{chatStore.history.length}}/10)</h5>
      <div class="flex overflow-x-auto pb-4 mb-4">
        <div class="flex-shrink-0 card rounded-md w-48 bg-base-200 border border-primary shadow-sm !p-4 mr-4"
             v-for="(conversation,index) in chatStore.history" :key="conversation.result">
          <div class="text-left">
            <p class="text-content pr-0.5 text-xs"
               @click="toggleText(index)" :class="{ 'collapsed': conversation.textCollapsed }">
              User: {{ conversation.prompt }}<br>
              ChatGPT: {{ conversation.result }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <h5 class="w-full flex items-center text-left mb-2">
      <img class="w-8 h-8 p-1 mr-2 border border-gray-700 rounded" src="/ChatGPT_logo.svg" alt=""/>
      Result
    </h5>
    <div class="relative flex justify-center items-center">
      <textarea v-model="chatStore.result" rows="6" :disabled="!isChatTextEditable"
                class="w-full form-input p-4 mb-8 textarea textarea-primary" placeholder="chatGPT will response here"/>
      <span class="absolute"><loading v-if="loading"/></span>
    </div>
  </div>
</template>

<style scoped>
.text-content {
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}

.text-content.collapsed {
  -webkit-line-clamp: unset;
  max-height: 200px;
  overflow-y: auto;
}
</style>