'use strict';
require('shelljs/global');
const chalk = require('chalk');
var path = require('path');
const RulesEngine = require('./rules/rules-engine.js');


class ProcessPDF {
  constructor(pdf) {
    console.log("Will process PDF: " + pdf);
    var fileExt = pdf.substr(pdf.length - 4);
    if (fileExt !== ".pdf") {
      echo(chalk.red("File does not have .pdf extension"));
      exit(1);
    }
    var filepath = path.resolve(process.cwd(), pdf);
    this.pdf = filepath;
    this.processPDF();
  }

  processPDF() {
    console.log("IN PDF PROCESSOR", this.pdf);
    const pdfText = exec('pdftotext -enc UTF-8 ' + this.pdf + ' -', { silent: true }).stdout;
    echo("PDF TEXT is: ", pdfText);
    new RulesEngine("test/sample-rules.json", pdfText);
  }

}

module.exports = ProcessPDF;
