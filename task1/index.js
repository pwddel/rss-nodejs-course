// eslint-disable-next-line node/no-extraneous-require
const program = require('commander');
const { stream_process } = require('./stream_process');

program
  .option('-s, --shift <number>', 'Shift value')
  .option('-i, --input <path>', 'Input file')
  .option('-o, --output <path>', 'Output file')
  .option('-a, --action <string>', 'Action type')
  .parse(process.argv);

if (!/^-?\d+$/.test(program.shift)) {
  // eslint-disable-next-line no-process-exit
  process.stderr.write('Shift is not an integer\n', () => process.exit(1));
} else if (program.shift < 0 || program.shift >= 26) {
  // eslint-disable-next-line no-process-exit
  process.stderr.write('Shift is out of range\n', () => process.exit(1));
}

if (
  program.action === undefined ||
  (program.action !== 'encode' && program.action !== 'decode')
) {
  // eslint-disable-next-line no-process-exit
  process.stderr.write('Wrong action type\n', () => process.exit(1));
}

if (program.action === 'encode') {
  stream_process(program.input, program.output, program.action);
} else if (program.action === 'decode') {
  stream_process(program.input, program.output);
}

console.log(program.opts());

/* console.log(process.argv);*/
