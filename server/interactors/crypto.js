const crypto = require('crypto');
const config = require('../../config/default.js');
const { secret } = config;
const algo = 'aes-256-ctr';

function encrypt(text) {
  const cipher = crypto.createCipher(algo, secret);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher(algo, secret);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function createHmac(hmacSecret, body) {
  return crypto
    .createHmac('sha1', hmacSecret)
    .update(body)
    .digest('hex');
}

module.exports = {
  encrypt,
  decrypt,
  createHmac,
};
