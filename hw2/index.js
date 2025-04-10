const fs = require('fs');

fs.readFile('text.txt', 'utf-8', (err, data) => {
    if (err) throw err

    fs.writeFile('newText.txt', data.replaceAll('Node', 'NODE.JS'), err => {
        if (err) throw err
    })
})


