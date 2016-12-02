'use strict';
let yargs = require('yargs'),
    packageInfo = require('../../package');
    var chalk = require('chalk');

module.exports.parseCommandLine = function parseCommandLine() {
  let parsed = yargs.usage('Usage: $0 <pdf file> [options]')
       .command('<pdf file>', 'PDF file to process')
       .demand(1, chalk.red('Please supply a PDF file to process'))
       .version(() => `${packageInfo.name} ${packageInfo.version}`)
       .alias('version', 'V')
       .help('h')
       .alias('help', 'h')
       .epilog('Copyright Neil Grogan 2016, Licensed MIT');
  var argv = parsed.argv;

  return {
      pdf_file: argv._[0],
      options: argv,
    };
};
