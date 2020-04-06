/*
const fs = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

process.stdin.setEncoding('utf8');

const input = process.stdin.on('readable', () => {
  let chunk;
  // Use a loop to make sure we read all available data.
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Got a SIGINT. Goodbye cruel world');
  process.exit(0);
});

/!*
console.log(input);
*!/

process.stdin.on('end', () => {
  process.stdout.write('end');
});

/!*

pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  err => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);


const dataFetched = (err, data) => {
  if err return
  console.log(data)
}

export const fechData = (url, cb) => {
  axios(url)
    .then(data => cb(null, data))
    .catch(err => cb(err))
}

fechData(url,dataFetched)

export const fechData = (url) => {
  return new Promise ((resolve, reject) => {
    axios(url)
      .then(data => {

        resolve(null, data)
      })
      .catch(err => reject(err))
  })
}
*!/
*/
