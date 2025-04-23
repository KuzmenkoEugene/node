function readText(params) {
    const buffer = Buffer.from(params);
    console.log('Buffer:', buffer)
    const text = buffer.toString();
    
    return text
}

const result = readText('hello');

console.log(result)