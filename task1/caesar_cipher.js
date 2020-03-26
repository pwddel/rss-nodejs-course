module.exports = {
  encrypt: function encrypt(shift, plaintext) {
    return caesar(shift, plaintext);
  },
  decrypt: function decrypt(shift, ciphertext) {
    return caesar((26 - shift) % 26, ciphertext);
  }
};

function caesar(shift, input) {
  if (!/^-?\d+$/.test(shift)) console.error('Shift is not an integer');
  if (shift < 0 || shift >= 26) console.error('Shift is out of range');

  let output = '';
  const len = input.length;

  for (let i = 0; i < len; i++) {
    const c = input.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      output += String.fromCharCode(((c - 65 + shift) % 26) + 65);
    } else if (c >= 97 && c <= 122) {
      output += String.fromCharCode(((c - 97 + shift) % 26) + 97);
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}
