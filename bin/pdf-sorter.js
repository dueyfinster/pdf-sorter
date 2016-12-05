#! /usr/bin/env node
'use strict';

require('shelljs/global');
var cli = require('../lib/cli/setup')
const ProcessPDF = require('../lib/process-pdf')

function checkRequirements() {
  if (!which('pdftotext')) {
    echo('Sorry, this script requires pdftotext');
    exit(1);
  }
}


let parsed = cli.parseCommandLine();
const processPDF = new ProcessPDF(parsed.pdf_file);

console.log(parsed.pdf_file);
