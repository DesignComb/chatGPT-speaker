<script setup lang="ts">
import Api from '@/api'
import {ref, reactive, watch, onMounted, computed} from "vue"
import {mainStore} from "@/store";
import {useAudioQueueStore} from "@/store/audioQueueStore";
import {splitSentences} from '@/utils/splitSentences'
import {Sortable} from "sortablejs-vue3";

import SettingDrawer from "@/components/settingDrawer.vue";
import ChatInterface from "@/components/chatInterface.vue";
import EnterKeyModal from "@/components/enterKeyModal.vue";
import {chatContent} from "@/store/chatContent";

const store = mainStore()
const chatStore = chatContent()

const audioQueueStore = useAudioQueueStore();

const createText2Voice = async () => {
  const maxLen = 100; // 设定需要分段的长度
  let textSegments = [];
  if (store.settingOptions[1].value && chatStore.result.length > maxLen) { // 判断是否需要自动分段
    textSegments = splitSentences(chatStore.result, maxLen)
  } else {
    textSegments.push(chatStore.result)
  }
  for (const segment of textSegments) {
    if (segment) {
      await Api.createText2Voice(segment, store.audioSetting.name, store.audioSetting.rate, store.audioSetting.pitch, store.audioSetting.volume)
          .then((res) => {
            const audioBlob = new Blob([res.data], {type: 'audio/mpeg'})
            const audioElement = new Audio(URL.createObjectURL(audioBlob))
            audioQueueStore.audioQueue.push({
              audioElement,
              blob: audioBlob,
              blobUrl: URL.createObjectURL(audioBlob),
              text: segment,
              textCollapsed: false
            })
          })
    }
  }
}

watch(() => chatStore.result, () => {
  if (store.settingOptions[0].value) {
    createText2Voice()
  }
})
const toggleText = (index: number) => {
  audioQueueStore.audioQueue[index].textCollapsed = !audioQueueStore.audioQueue[index].textCollapsed
}
</script>
<template>
  <input v-model="store.isKeyModalOpen" type="checkbox" id="my-modal" class="modal-toggle"/>
  <enter-key-modal/>
  <div class="drawer drawer-mobile bg-base-100">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <div class="drawer drawer-mobile-mini drawer-end">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Page content here -->
          <div class="flex flex-wrap p-8 justify-between content-start">
            <div class="w-full my-4">
              <chat-interface/>
              <button @click="createText2Voice()" class="btn btn-secondary px-12"
                      :disabled="store.settingOptions[0].value">
                {{store.settingOptions[0].value ? 'Auto Generate...': 'CREATE AUDIO'}}
              </button>
            </div>
          </div>
          <label for="my-drawer" class="btn bg-transparent border-none text-[1.75rem] text-gray-600 absolute top-2 right-3 drawer-button hover:bg-transparent hover:opacity-60 md:hidden">
            <i class="bx bx-menu"></i>
          </label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay"></label>
          <ul class="menu">
            <!-- Sidebar content here -->
            <label for="my-drawer" class="btn bg-transparent border-none text-[1.75rem] text-gray-600 absolute top-2 right-3 drawer-button hover:bg-transparent hover:opacity-60 md:hidden">
              <i class="bx bx-x"></i>
            </label>
            <div id="audioQueue" class="bg-white flex w-80 flex-wrap content-start border-l border-gray-300 py-8 !px-5 h-screen overflow-y-auto">
              <h2 class="w-full card-title text-left mt-4 mb-2">Audio Queue</h2>
              <div class="w-full flex flex-wrap text-left space-x-2">
                <button @click="audioQueueStore.playQueue" class="btn btn-sm text-sm btn-primary flex justify-between item-center !pb-7 !pl-2">
                  <i class='bx bx-play'></i>Play
                </button>
                <button @click="audioQueueStore.pauseQueue" class="btn btn-sm text-sm btn-primary flex justify-between item-center !pb-7 !pl-2">
                  <i class='bx bx-pause'></i>Pause
                </button>
                <button @click="audioQueueStore.clearQueue" class="btn btn-sm text-sm btn-error flex justify-between item-center !pb-7 !pl-2">
                  <i class='bx bx-trash'></i>Clear
                </button>
              </div>
              <Sortable
                  :list="audioQueueStore.audioQueue"
                  item-key="id"
                  tag="div"
                  class="pr-2"
              >
                <template #item="{element, index}">
                  <div class="draggable cursor-all-scroll show-icon-container card rounded-md w-full bg-base-200 shadow-md !p-2 md:!p-4 md:!pb-2 mt-8"
                       :key="element.text"
                  >
                    <div class="text-left">
                      <p class="text-content pr-0.5 text-sm leading-relaxed cursor-pointer"
                         @click="toggleText(index)" :class="{ 'collapsed': element.textCollapsed }"
                      >
                        {{ element.text }}
                      </p>
                      <audio :id="`audio${index}`" class="py-2.5 w-full" ref="audioElement"
                             @play="audioQueueStore.isQueuePlay = true"
                             @pause="audioQueueStore.isQueuePlay = false"
                             @ended="audioQueueStore.playNext(index); audioQueueStore.isQueuePlay = false"
                             :src="element.blobUrl" controls
                      >
                        <div class="progress" style="height: 2px; background-color: #0692c2;"></div>
                      </audio>
                      <button @click="audioQueueStore.removeFromQueue(index)"
                              class="absolute flex justify-center items-center bg-gray-700/40
                           text-white text-lg top-0 right-0 p-2 m-2 trash-icon"
                      >
                        <i class="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                </template>
              </Sortable>
            </div>
          </ul>
        </div>
      </div>
      <!-- Page content over -->
      <label for="my-drawer-2" class="btn bg-transparent border-none text-[1.75rem] text-gray-600 absolute top-2 left-3 drawer-button hover:bg-transparent hover:opacity-60 lg:hidden">
        <i class="bx bx-cog"></i>
      </label>

    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-72 text-base-content bg-base-200">
        <!-- Sidebar content here -->
        <label for="my-drawer-2" class="z-10 btn bg-transparent border-none text-[1.75rem] text-gray-600 absolute top-2 left-1 hover:bg-transparent hover:opacity-60 drawer-button lg:hidden">
          <i class="bx bx-x"></i>
        </label>
        <setting-drawer/>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.text-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /*cursor: pointer;*/
}

.text-content.collapsed {
  -webkit-line-clamp: unset;
}
.trash-icon {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.show-icon-container:hover .trash-icon {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
</style>