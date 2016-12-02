#! /usr/bin/env node
'use strict';

require('shelljs/global');
var cli = require('../lib/cli/setup')

function checkRequirements(){
  if (!which('pdftotext')) {
    echo('Sorry, this script requires pdftotext');
    exit(1);
  }
}


let parsed = cli.parseCommandLine();

console.log(parsed.pdf_file);

