import {defineStore} from 'pinia';
import Api from "@/api";
import colors from "tailwindcss/colors";

interface QueueElement {
    audioElement: HTMLAudioElement;
    blob: Blob;
    blobUrl: string;
    text: string;
    textCollapsed: boolean;
}

export const useAudioQueueStore = defineStore({
    id: 'audioQueueStore',

    state: () => ({
        audioQueue: [] as QueueElement[],
        isQueuePlay: false

    }),

    actions: {
        removeFromQueue(index: number) {
            this.audioQueue.splice(index, 1);
        },

        clearQueue() {
            this.audioQueue.splice(0, this.audioQueue.length);
        },

        pauseQueue() {
            if (this.audioQueue.length > 0) {
                this.audioQueue.forEach((item, index) => {
                    const audio = document.getElementById(`audio${index}`) as HTMLAudioElement
                    audio.pause()
                })
            } else {
                alert("System warning: Currently no audio available.!")
            }
        },

        playQueue() {
            if (this.audioQueue.length > 0) {
                const audioElement = document.getElementById(`audio${0}`) as HTMLAudioElement
                audioElement.play()
            } else {
                alert("System warning: Currently no audio available.!")
            }
        },

        playNext(index: number) {
            index++
            if (this.audioQueue.length >= index) {
                const audioElement = document.getElementById(`audio${index}`) as HTMLAudioElement
                audioElement.play()
            } else {
                alert("System warning: Currently no audio available.!")
            }
        },
    },
});