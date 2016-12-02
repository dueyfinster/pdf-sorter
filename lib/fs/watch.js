'use strict';
const chokidar = require('chokidar');

module.exports = function (dir) {
  const watcher = chokidar.watch(dir+'*.pdf', {
    ignored: /[\/\\]\./,
    persistent: true
  });

  console.log(chalk.white("Starting to watch for PDF's in the directory: " + dir + " ..."));

  watcher.on('change', (path, stats) => {
    if (stats) console.log(`File ${path} changed size to ${stats.size}`);
  });

};
