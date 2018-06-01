const router = require('express').Router();
const validator = require('validator');
const Responses = require('../../responses/api');
const authMiddleware = require('../../middleware/auth.js');
const User = require('../../db/model/User.js');
const config = require('../../../config/default.js');
const uploadHelper = require('../../interactors/multer-s3.js')(
  config.AWS_BUCKET_NAME,
);

// POST /v1/user/profile
router.post(
  '/profile',
  authMiddleware('any', 'api'),
  uploadHelper.fields([{ name: 'avatar' }]),
  (req, res) => {
    if (req.user) {
      const updateable_fields = User.getUpdateableFields(req.groups);
      const fields = {};
      let sendVerificationEmail = false;
      let sendPasswordChangedEmail = false;

      if (req.files && req.files.resume) {
        req.body.resume =
          req.files.resume[0].location ||
          `/uploads/${req.files.resume[0].filename}`;
      }

      if (req.files && req.files.avatar) {
        req.body.avatar =
          req.files.avatar[0].location ||
          `/uploads/${req.files.avatar[0].filename}`;
      }

      for (const i in req.body) {
        if (i === 'email') {
          if (!validator.isEmail(req.body.email)) {
            continue;
          } else {
            sendVerificationEmail = true;
            req.email = req.body.email;
          }
        }

        if (i === 'password') {
          if (
            req.body.current_password &&
            req.user.checkPassword(req.body.current_password)
          ) {
            sendPasswordChangedEmail = true;
          } else {
            continue;
          }
        }

        if (i === 'birthday') {
          if (!parseInt(req.body[i], 10)) {
            continue;
          }
        }

        if (updateable_fields.indexOf(i) !== -1) {
          fields[i] = req.body[i];
        }
      }

      req.user.updateFields(fields);

      if (sendVerificationEmail) {
        req.user.sendVerificationEmail();
      }

      if (sendPasswordChangedEmail) {
        // TODO
      }

      res.send({
        status: true,
        message: fields,
      });
    } else {
      res.status(401).send({
        status: false,
        message: Responses.Auth.UNAUTHORIZED,
      });
    }
  },
);

// GET /v1/user/profile
router.get('/profile', (req, res) => {
  if (req.user) {
    req.user.getProfile().then((profile) => {
      res.send({
        status: true,
        user: profile,
      });
    });
  } else {
    res.status(401).send({
      status: false,
      message: Responses.Auth.UNAUTHORIZED,
    });
  }
});

module.exports = router;
