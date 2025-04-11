const EventEmitter = require('events');

class Chat extends EventEmitter {
    constructor() {
        super()
        this.on('message', (message) => console.log(message));
    }

    send(message) {
        return this.emit('message', message)
    }
}

const chat = new Chat()


chat.send('Привіт')