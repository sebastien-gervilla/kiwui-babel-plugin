const fs = require('fs');

const commonjsConfig = {
  type: 'commonjs'
};

const moduleConfig = {
  type: 'module'
};

fs.appendFileSync('dist/cjs/package.json', JSON.stringify(commonjsConfig, null, 2));
fs.appendFileSync('dist/mjs/package.json', JSON.stringify(moduleConfig, null, 2));