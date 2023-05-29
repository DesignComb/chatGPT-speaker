<script setup lang="ts">
import {mainStore} from "@/store";

const store = mainStore();

interface audioSetting {
  name: string
  rate: number
  pitch: number
  volume: number
}
const audioSettingProxy: any = store.audioSetting;


const getRangeValue = (key: string) => {
  const typedKey = key as keyof audioSetting;
  const value = store.audioSetting[typedKey];
  const numberValue = typeof value === 'string' ? Number(value) : value;
  const adjustedValue = typedKey === 'volume' ? numberValue - 100 : numberValue;
  return settingRateDisplay(adjustedValue);
}

const settingRateDisplay = (number: number) => {
  return Number((number / 100 + 1).toFixed(2));
};

const handleKeyModal = () => {
  store.isKeyModalOpen = !store.isKeyModalOpen
}

</script>

<template>
  <div class="flex flex-col justify-between h-full p-2">
    <form class="w-full h-full relative flex flex-wrap content-start">
      <h4 class="mt-8 mb-2 w-full text-left text-primary">Common Setting</h4>
      <label class="flex flex-row text-left justify-start items-center py-2.5 cursor-pointer" :for="settingOption.id"
             v-for="settingOption in store.settingOptions" :key="settingOption.id">
        <input v-model="settingOption.value" :id="settingOption.id" type="checkbox"
               class="checkbox checkbox-primary mr-4"/>
        <span class="text-sm">{{ settingOption.label }}</span>
      </label>
      <h4 class="mt-8 mb-2 w-full text-left text-primary">Azure Character</h4>
      <div class="form-group flex w-full">
        <div id="voiceSelect" class="flex flex-wrap">
          <div v-for="voiceOption in store.audioNameOptions" :key="voiceOption.value" class="w-full form-control">
            <label :for="voiceOption.value" class="label cursor-pointer flex justify-start">
              <input type="radio" :id="voiceOption.value" :value="voiceOption.value" v-model="store.audioSetting.name"
                     class="radio checked:bg-primary mr-4">
              <span class="label-text mr-4">{{ voiceOption.label }}</span>
              <i class="bx transform scale-125"
                 :class="voiceOption.gender === 'female' ? 'bx-female-sign' : 'bx-male-sign'"></i>
            </label>
          </div>
        </div>
      </div>
      <h4 class="mt-8 mb-2 w-full text-left text-primary">Azure Voice Setting</h4>
      <div class="form-group w-full p-2 text-sm leading-loose"
           v-for="rangeOption in store.rangeOptions"
           :key="rangeOption.id">
        <label :for="rangeOption.id" class="flex justify-between">
          <span>{{ rangeOption.minLabel }}</span>
          {{ rangeOption.label }}:x{{ getRangeValue(rangeOption.property) }}
          <span>{{ rangeOption.maxLabel }}</span>
        </label>
        <input v-model="audioSettingProxy[rangeOption.property]" :id="rangeOption.id" type="range"
               :min="rangeOption.min"
               :max="rangeOption.max" class="range range-xs range-primary"/>
      </div>
    </form>
    <div class="w-full flex justify-between items-center  cursor-pointer hover:text-primary mt-20"
         @click="handleKeyModal()">
      Reset Key<i class="bx bx-refresh transform scale-125"></i>
    </div>
  </div>
</template>


<style scoped>
.range-xs {
  transform: scale(0.8);
}
</style>
