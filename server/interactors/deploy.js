const node_ssh = require('node-ssh');
const config = require('../../config/default.js');
const crypto = require('./crypto.js');

function stagingDamageReport() {
  const { host } = config.deploy.staging;
  const { user } = config.deploy.staging;
  const { privateKey } = config.deploy.staging;

  return damageReport(host, user, privateKey);
}

function productionDamageReport() {
  const { host } = config.deploy.production;
  const { user } = config.deploy.production;
  const { privateKey } = config.deploy.production;

  return damageReport(host, user, privateKey);
}

function deployStaging() {
  const { host } = config.deploy.staging;
  const { user } = config.deploy.staging;
  const { privateKey } = config.deploy.staging;

  return deploy(host, user, privateKey);
}

function deployProduction() {
  const { host } = config.deploy.production;
  const { user } = config.deploy.production;
  const { privateKey } = config.deploy.production;

  return deploy(host, user, privateKey);
}

function damageReport(host, user, privateKey) {
  return new Promise((resolve, reject) => {
    const ssh = new node_ssh();

    ssh
      .connect({
        host: host,
        username: user,
        privateKey: Buffer.alloc(crypto.decrypt(privateKey), 'base64').toString(
          'ascii',
        ),
      })
      .then(() => {
        ssh
          .execCommand('hostname')
          .then((hostresult) => {
            if (hostresult.code === 0) {
              ssh
                .execCommand('/opt/bin/unchained-damage-report')
                .then((result) => {
                  if (result.code === 0) {
                    ssh.dispose();
                    resolve({
                      host: hostresult,
                      command: result,
                    });
                  } else {
                    ssh.dispose();
                    reject(
                      new Error({
                        host: hostresult,
                        command: result,
                      }),
                    );
                  }
                })
                .catch((err) => {
                  ssh.dispose();
                  reject(
                    new Error({
                      host: hostresult,
                      command: err,
                    }),
                  );
                });
            } else {
              ssh.dispose();
              reject(
                new Error({
                  host: hostresult,
                  command: {},
                }),
              );
            }
          })
          .catch((err) => {
            ssh.dispose();
            reject(
              new Error({
                host: err,
                command: {},
              }),
            );
          });
      })
      .catch((err) => {
        ssh.dispose();
        reject(
          new Error({
            host: err,
            command: {},
          }),
        );
      });
  });
}

function deploy(host, user, privateKey) {
  return new Promise((resolve, reject) => {
    const ssh = new node_ssh();

    ssh
      .connect({
        host: host,
        username: user,
        privateKey: Buffer.alloc(crypto.decrypt(privateKey), 'base64').toString(
          'ascii',
        ),
      })
      .then(() => {
        ssh
          .execCommand('hostname')
          .then((hostresult) => {
            if (hostresult.code === 0) {
              ssh
                .execCommand('/opt/bin/unchained-deploy')
                .then((result) => {
                  if (result.code === 0) {
                    ssh.dispose();
                    resolve({
                      host: hostresult,
                      command: result,
                    });
                  } else {
                    ssh.dispose();
                    reject(
                      new Error({
                        host: hostresult,
                        command: result,
                      }),
                    );
                  }
                })
                .catch((err) => {
                  ssh.dispose();
                  reject(
                    new Error({
                      host: hostresult,
                      command: err,
                    }),
                  );
                });
            } else {
              ssh.dispose();
              reject(
                new Error({
                  host: hostresult,
                  command: {},
                }),
              );
            }
          })
          .catch((err) => {
            ssh.dispose();
            reject(
              new Error({
                host: err,
                command: {},
              }),
            );
          });
      })
      .catch((err) => {
        ssh.dispose();
        reject(
          new Error({
            host: err,
            command: {},
          }),
        );
      });
  });
}

function formatResponse(result) {
  let response = '';
  for (const command in result) {
    if (result[command].stdout) {
      response += result[command].stdout;
    }

    if (result[command].stderr) {
      response += result[command].stderr;
    }

    response += '\n';
  }

  return response;
}

module.exports = {
  stagingDamageReport,
  productionDamageReport,
  deployStaging,
  deployProduction,
  formatResponse,
};
