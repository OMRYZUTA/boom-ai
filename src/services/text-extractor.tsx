export const textExtractor = () => {
    let messageContainers = Array.from(document.querySelectorAll('.message-in, .message-out'));
    let result = "";
    if (messageContainers.length > 0) {
        let endIdx = messageContainers.length;
        let startIdx = Math.max(0, endIdx - 10);
        let lastMessages = messageContainers.slice(startIdx, endIdx).map(container => {
            let copyableTextElement = container.querySelector('.copyable-text');
            let timestamp = copyableTextElement ? copyableTextElement.getAttribute('data-pre-plain-text') : '';
            let messageText = container.innerText;
            return timestamp + " " + messageText;
        });
        result = lastMessages.join(', ');
    }
    else {
        result = document.body.innerText;
    }
    return result;
};
