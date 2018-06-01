const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/default.js');
const crypto = require('crypto');
const User = require('../db/model/User.js');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function(bucket_name, artifactOverride) {
  let multeropts;
  let directory = '';

  if (config.AWS_ACCESS_KEY_ID && config.AWS_SECRET_ACCESS_KEY) {
    const s3 = new AWS.S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });

    multeropts = {
      storage: multerS3({
        s3: s3,
        acl: 'private',
        bucket: bucket_name,
        key: function(req, file, cb) {
          if (req.authToken && !artifactOverride) {
            User.find()
              .byToken(req.authToken)
              .exec()
              .then((user) => {
                if (file.fieldname === 'resume') {
                  directory = 'resumes';
                }

                if (file.fieldname === 'avatar') {
                  directory = 'avatars';
                }

                if (file.fieldname === 'floor_image') {
                  directory = 'floor_images';
                }

                if (!directory) {
                  return cb(false, '');
                }

                const fileType = file.originalname.split('.').pop();
                const fileName = `${directory}/${crypto
                  .createHash('sha512')
                  .update(user.email + config.secret)
                  .digest('hex')}.${fileType}`;

                cb(null, fileName);
              })
              .catch(() => cb(false, ''));
          } else if (artifactOverride) {
            if (file.fieldname === 'resume') {
              directory = 'resumes';
            }

            if (file.fieldname === 'avatar') {
              directory = 'avatars';
            }

            if (file.fieldname === 'floor_image') {
              directory = 'floor_images';
            }

            if (!directory) {
              return cb(false, '');
            }

            const fileType = file.originalname.split('.').pop();
            const fileName = `${directory}/${crypto
              .createHash('sha512')
              .update(file.originalname + config.secret)
              .digest('hex')}.${fileType}`;

            cb(null, fileName);
          } else {
            return cb(false, '');
          }
        },
      }),
    };
  } else {
    multeropts = {
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          if (file.fieldname === 'resume') {
            directory = 'resumes';
          }

          if (file.fieldname === 'avatar') {
            directory = 'avatars';
          }

          if (file.fieldname === 'floor_image') {
            directory = 'floor_images';
          }

          if (!directory) {
            return cb(false, '');
          }

          const fullDirectory = `build/uploads/${directory}/`;

          if (!fs.existsSync(fullDirectory)) {
            mkdirp.sync(fullDirectory);
          }

          cb(null, fullDirectory);
        },
        filename: function(req, file, cb) {
          if (req.authToken && !artifactOverride) {
            User.find()
              .byToken(req.authToken)
              .exec()
              .then((user) => {
                const fileType = file.originalname.split('.').pop();
                const fileName = `${crypto
                  .createHash('sha512')
                  .update(user.email + config.secret)
                  .digest('hex')}.${fileType}`;

                cb(null, fileName);
              })
              .catch(() => cb(false, ''));
          } else if (artifactOverride) {
            if (file.fieldname === 'resume') {
              directory = 'resumes';
            }

            if (file.fieldname === 'avatar') {
              directory = 'avatars';
            }

            if (file.fieldname === 'floor_image') {
              directory = 'floor_images';
            }

            if (!directory) {
              return cb(false, '');
            }

            const fileType = file.originalname.split('.').pop();
            const fileName = `${directory}/${crypto
              .createHash('sha512')
              .update(file.originalname + config.secret)
              .digest('hex')}.${fileType}`;

            cb(null, fileName);
          } else {
            return cb(false, '');
          }
        },
      }),
    };
  }

  return multer(multeropts);
};
