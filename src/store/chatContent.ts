import {defineStore} from 'pinia';

export const chatContent = defineStore({
    id: 'chatContent',

    state: () => ({
        prompt: '',
        result: '',
        history:[] as { prompt: string, result: string, textCollapsed: boolean }[],
    }),

    actions: {
        addHistory(prompt: string, result: string) {
            this.history.unshift({
                prompt: prompt,
                result: result,
                textCollapsed: false
            });
            if (this.history.length > 10) this.history.pop();
        },
    },
});