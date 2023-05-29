import axios from '@/utils/axios'

export default {
    createText2Voice: (
        text: string,
        name: string = "zh-TW-YunJheNeural",
        rate: number = 0,
        pitch: number = 0,
        volume: number = 100
    ) => {
        const azureKey = localStorage.getItem('AzureKey') || ''
        return axios.post(`https://japaneast.tts.speech.microsoft.com/cognitiveservices/v1`,
            `<speak version='1.0' xml:lang='en-US'>
                 <voice xml:lang='en-US' xml:gender='Female' name='${name}'>
                    <prosody rate="${rate}%" pitch="${pitch}%" volume="${volume}">
                        ${text}
                    </prosody>
                 </voice>
               </speak>`,
            {
                headers: {
                    'Content-Type': 'application/ssml+xml',
                    'Ocp-Apim-Subscription-Key': azureKey,
                    'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
                },
                responseType: 'arraybuffer'
            })
    },
    createChat: (chatPrompt: string) => {
        const gptKey = localStorage.getItem('openaiKey') || ''
        return axios.post(`https://api.openai.com/v1/chat/completions`,
            {
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: chatPrompt}]
            }, {
                headers: {
                    'Authorization': `Bearer ${gptKey}`,
                    'Content-Type': 'application/json'
                }
            })
    },
}
