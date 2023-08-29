const { appendFileSync } = require('fs');

const commonjsConfig = {
  type: 'commonjs'
};

const moduleConfig = {
  type: 'module'
};

appendFileSync('dist/cjs/package.json', JSON.stringify(commonjsConfig, null, 2));
appendFileSync('dist/mjs/package.json', JSON.stringify(moduleConfig, null, 2));