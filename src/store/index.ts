import {defineStore} from 'pinia'


export const mainStore = defineStore('main', {
    state: () => {
        return {
            isKeyModalOpen: false,

            audioSetting: {
                name: 'zh-TW-HsiaoChenNeural',
                rate: 0,
                pitch: 0,
                volume: 100,

            },
            audioNameOptions: [
                {value: 'zh-TW-HsiaoChenNeural', gender: 'female', label: '曉臻 (女)'},
                {value: 'zh-TW-HsiaoYuNeural', gender: 'female', label: '曉雨 (女)'},
                {value: 'zh-TW-YunJheNeural', gender: 'male', label: '雲哲 (男)'}
            ],
            rangeOptions: [
                {
                    id: 'speedRange',
                    label: '速率',
                    property: 'rate',
                    min: -100,
                    max: 200,
                    minLabel: 'x0',
                    maxLabel: 'x3'
                },
                {
                    id: 'pitchRange',
                    label: '音高',
                    property: 'pitch',
                    min: -50,
                    max: 50,
                    minLabel: 'x0.5',
                    maxLabel: 'x1.5'
                },
                {
                    id: 'volumeRange',
                    label: '音量',
                    property: 'volume',
                    min: 0,
                    max: 150,
                    minLabel: 'x0',
                    maxLabel: 'x1.5'
                }
            ],
            settingOptions: [
                {
                    id: 'isAutoCreateAudio',
                    value: false,
                    label: 'Auto generate audio',
                },
                {
                    id: 'isAutoSegmentation',
                    value: false,
                    label: 'Auto segmentation',
                },
                {
                    id: 'isOpenHistory',
                    value: false,
                    label: 'History Mode',
                },
            ]
        }
    },
    actions: {}
})
