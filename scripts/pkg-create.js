/*
 * When executed this script create `package.json` files for any packages under `src/packages`
 * that have not been created yet.
 */
const path = require('path');
const fs = require('fs');
const getArgs = require('./get-args');

const pkgFolder = './src/';
const args = getArgs(process.argv.slice(2));
const pkgName = args.package;

run(pkgName);

function run(name) {
  const pkgDir = path.join(pkgFolder, name);
  if (!fs.existsSync(pkgDir)) {
    fs.mkdirSync(pkgDir);
  }

  const pkgJson = path.join(pkgDir, 'package.json');
  fs.writeFile(pkgJson, createPkgJsonContent(name), (err) => {
    if (err) throw err;
  });

  const pkgIndex = path.join(pkgDir, 'index.js');
  fs.closeSync(fs.openSync(pkgIndex, 'w'));

  console.log(`Created ${name} package with package.json and index.js!`);
}

function createPkgJsonContent(name) {
  const json = {
    name: `@ktp/${name}`,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    author: '',
    license: 'GPL-3.0',
    dependencies: {},
  };

  return JSON.stringify(json, null, 2);
}
