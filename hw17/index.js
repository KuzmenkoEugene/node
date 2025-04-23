const fs = require('fs');

(() => {
    try {
        const buffer = fs.readFileSync('text.txt');

        console.log(buffer)
        console.log(buffer.toString())
    } catch(error) {
        console.error(error)
    }
})()

