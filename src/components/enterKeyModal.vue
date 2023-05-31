<script setup lang="ts">
import {ref, reactive, computed} from "vue"
import Api from '@/api'
import Loading from "@/components/loadingElement.vue"

import {mainStore} from "@/store"
const store = mainStore()

const TestStatus = {
    NONE: 0, // 無狀態
    SUCCESS: 1, // 成功
    FAILURE: 2, // 失敗
    LOADING: 3 // 測試中
}
const AzureKey = ref('')
const openaiKey = ref('')
const saveKeys = async () => {
    if (AzureKey.value && openaiKey.value) {
        await localStorage.setItem('AzureKey', AzureKey.value);
        await localStorage.setItem('openaiKey', openaiKey.value);
        const azureRes = await testAzure()
        const chatRes = await testChat()
        if(azureRes && chatRes){
            store.isKeyModalOpen = false
        }
    } else {
        alert('key value cannot be empty')
    }
}
let azureTest = ref(TestStatus.NONE)
let openaiTest = ref(TestStatus.NONE)
const testAzure = async () => {
    azureTest.value = TestStatus.LOADING
    try {
        await Api.createText2Voice('test')
        azureTest.value = TestStatus.SUCCESS
        return true
    } catch (error: any) {
        azureTest.value = TestStatus.FAILURE
        console.log(error)
        return false
    }
}

const testChat = async () => {
    openaiTest.value = TestStatus.LOADING
    try {
        await Api.createChat('test')
        openaiTest.value = TestStatus.SUCCESS
        return true
    } catch (error: any) {
        openaiTest.value = TestStatus.FAILURE
        console.log(error)
        return false
    }
}
</script>

<template>
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Please input your key!</h3>
            <p class="py-4">You need to enter the keys for ChatGPT and Azure models to access and use these two
                features!</p>
            <div class="my-2 text-left">
                <label>
                    <span class="flex w-full justify-between items-center">
                        Azure Key:
                        <loading v-if="azureTest === TestStatus.LOADING"/>
                        <i v-else-if="azureTest === TestStatus.SUCCESS" class="bx bx-check scale-110 text-green-600"/>
                        <i v-else-if="azureTest === TestStatus.FAILURE" class="bx bx-x scale-110 text-red-600"/>
                    </span>
                    <input class="input w-full input-bordered" type="password" v-model="AzureKey"/>
                </label>
            </div>
            <div class="my-2 text-left">
                <label>
                    <span class="flex w-full justify-between items-center">
                        ChatGPT Key:
                        <loading v-if="openaiTest === TestStatus.LOADING"/>
                        <i v-else-if="openaiTest === TestStatus.SUCCESS" class="bx bx-check scale-110 text-green-600"/>
                        <i v-else-if="openaiTest === TestStatus.FAILURE" class="bx bx-x scale-110 text-red-600"/>
                    </span>
                    <input class="input w-full input-bordered" type="password" v-model="openaiKey"/>
                </label>
            </div>
            <div class="modal-action flex justify-between">
                <label for="my-modal"
                       class="btn !pl-1 text-gray-600 bg-transparent border-transparent hover:opacity-60 hover:bg-transparent hover:border-transparent">
                    <span>skip ></span>
                </label>
                <div @click="saveKeys" class="btn btn-primary flex justify-center items-center">
                    <span>Test</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>