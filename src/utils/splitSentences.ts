// This code splits a long string into smaller segments while preserving paragraph integrity.
export const splitSentences = (text: string, maxLength: number): string[] => {
    const sentences = text.match(/[^。！？]+[。！？]/gu) || [];
    const result: string[] = [];
    let currentPart = '';

    for (const sentence of sentences) {
        if ((currentPart + sentence).length <= maxLength) {
            currentPart += sentence;
        } else {
            result.push(currentPart);
            currentPart = sentence;
        }
    }

    result.push(currentPart);

    return result;
}
