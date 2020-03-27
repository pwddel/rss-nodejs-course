# TASK1 CLI APP Caesar cipher

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {https://github.com/pwddel/rss-nodejs-course.git}
```

## Installing NPM modules

```
npm install
```

## Running application
Options:  
  -s, --shift <number>   Shift value. Shift must be in range [0-26]  
  -i, --input <path>     Input file. If the input file is missed - use stdin as an input source.   
  -o, --output <path>    Output file. If the output file is missed - stdout show result.  
  -a, --action <string>  Action type. Must be encode/decode.  
  -h, --help             display help for command

Encode: pick -i input.txt  file for -i --input, -o output.txt file for -o --output.  
Shift: -s -shift must be in range [0-26].
Action: -a --action encode.
```
node index.js -s [0-26] -a encode  -i input.txt -o outp.txt
```
Decode: pick -i output.txt  file for -i --input, -o decrypted.txt file for -o --output  
Shift -s -shift must be in range [0-26]
Action: -a --action decode.
```
node index.js -s [0-26] -a decode  -i outp.txt -o decrypted.txt
```


