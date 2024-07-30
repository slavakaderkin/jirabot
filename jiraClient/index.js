const fs = require('fs');
const path = require('path');

const handlers = {};
const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file !== 'index.js' && path.extname(file) === '.js') {
    const handlerName = path.basename(file, '.js');
    handlers[handlerName] = require(`./${file}`);
  }
});

module.exports = handlers;
