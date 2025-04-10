const { readFile, writeFile } = require('fs');

readFile('source.txt', 'utf-8', (err, data) => {
    if (err) throw err

    console.log(`Читаем файл source.txt: ${data}`)

    writeFile('copy.txt', data, err => {
        if (err) throw err

        console.log('Данные из файла source.txt скопировано в copy.txt')
    })
})