const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const message = 'some message';

const signer = crypto.createSign('sha256');
signer.update(message);
signer.end();

const signature = signer.sign(privateKey, 'hex');

const verifier = crypto.createVerify('sha256');
verifier.update(message);
verifier.end();

const isValid = verifier.verify(publicKey, signature, 'hex');

console.log('Подпись', signature);
console.log('Валидность', isValid);