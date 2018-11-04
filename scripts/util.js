require('isomorphic-fetch');
const fs = require('fs');
const chalk = require('chalk');

function ensureDir(dir) {
  return new Promise((resolve, reject) => {
    stat(dir)
      .then((fileStat) => {
        if (!fileStat.isDirectory()) {
          return reject({
            type: 'NotDirectory',
            msg: `${dir} is not a directory, skipping`,
          });
        }

        resolve(fileStat);
      })
      .catch(reject);
  });
}

function task(generator, ...opts) {
  const iterator = generator(...opts);

  return new Promise((resolve) => {
    recursivelyNext();

    function recursivelyNext(...data) {
      const yielded = iterator.next(...data);

      if (yielded.done) {
        resolve(yielded.value);
        return;
      }

      if (Array.isArray(yielded.value)) {
        Promise.all(yielded.value)
          .then(recursivelyNext)
          .catch(log);

        return;
      }

      if (!isPromise(yielded.value)) {
        return;
      }

      yielded.value.then(recursivelyNext).catch(log);
    }
  });
}

function flatten(arr) {
  return [].concat(...arr);
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function readdir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    });
  });
}

function stat(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        return reject({ type: 'NotFound', msg: err.path });
      }

      return resolve(stats);
    });
  });
}

function revStat(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err) => {
      if (err) {
        return resolve(err);
      }

      return reject(`${dir} already exists, skipping`);
    });
  });
}

function write(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(`${file} was created!`);
    });
  });
}

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

function cleanGlob(dir) {
  return dir.replace('*', '');
}

function log(msg, color = '') {
  let fin = msg;
  if (typeof msg === 'object' || Array.isArray(msg)) {
    fin = JSON.stringify(msg, null, 2);
  }

  if (!color) {
    return console.log(fin);
  }

  return console.log(chalk[color](fin));
}

function logPretty(msg, color = 'blue') {
  log('');
  log('='.repeat(30), color);
  log(msg, color);
  log('='.repeat(30), color);
  log('');
}

function error(msg) {
  log(msg, 'red');
}

function verbose(msg) {
  log(msg);
}

function doFetch(url, reqOpts) {
  return fetch(url, reqOpts).then((res) =>
    res
      .json()
      .then((body) => ({
        status: res.status,
        headers: res.headers._headers,
        body,
      }))
      .catch(() => ({
        status: res.status,
        headers: res.headers._headers,
      })),
  );
}

module.exports = {
  log,
  logPretty,
  error,
  verbose,
  read,
  write,
  stat,
  revStat,
  readdir,
  task,
  ensureDir,
  cleanGlob,
  flatten,
  doFetch,
};
