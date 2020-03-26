const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { Transform } = require('stream');
const { encrypt, decrypt } = require('./caesar_cipher');

class Transform_encode extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const buffString = chunk.toString();
      return callback(null, encrypt(23, buffString));
    } catch (err) {
      return callback(err);
    }
  }
}

class Transform_decode extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const buffString = chunk.toString();
      return callback(null, decrypt(23, buffString));
    } catch (err) {
      return callback(err);
    }
  }
}

const input_stream = input => {
  if (input) {
    return fs.createReadStream(path.join(__dirname, `./files/${input}`));
  }
  console.log('The input file is not present, type string to process.');
  return process.stdin.on('readable', () => {
    // eslint-disable-next-line no-unused-vars
    let chunk;
    // Use a loop to make sure we read all available data.
    // eslint-disable-next-line no-cond-assign
    while ((chunk = process.stdin.read()) !== null) {
      console.log('If you finished typing press CTRL-C');
    }
  });
};

const output_stream = output => {
  if (output) {
    return fs.createWriteStream(path.join(__dirname, `./files/${output}`));
  }
  console.log('The output  file is not present. Result:');
  return process.stdout;
};

const stream_process = (input, output, action) => {
  const transform_stream =
    action === 'encode' ? new Transform_encode() : new Transform_decode();
  pipeline(
    input_stream(input),
    transform_stream,
    output_stream(output),
    err => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log(`The result is in ${output} file.`);
      }
    }
  );
};

module.exports = {
  stream_process
};
