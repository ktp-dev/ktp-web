const router = require('express').Router();
const User = require('../../db/model/User.js');
const Responses = require('../../responses/api/index.js');
const Configuration = require('../../db/model/Configuration.js');

const models = {
  Configuration: Configuration,
  Users: User,
};

router.get('/model', (req, res) => {
  res.send({
    status: true,
    models: Object.keys(models),
  });
});

router.get('/model/:model', (req, res) => {
  const model = models[req.params.model];

  if (model === undefined) {
    res.status(404).send({
      status: false,
      message: Responses.NOT_FOUND,
    });

    return;
  }

  model
    .find()
    .then((documents) => {
      res.send({
        status: true,
        documents,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        status: false,
        message: Responses.NOT_FOUND,
      });
    });
});

router.post('/model/:model', (req, res) => {
  const Model = models[req.params.model];

  if (Model === undefined) {
    res.status(404).send({
      status: false,
      message: Responses.NOT_FOUND,
    });

    return;
  }

  const updateableFields = Model.getUpdateableFields();
  const fields = {};

  for (const i in req.body) {
    if (updateableFields.indexOf(i) !== -1) {
      fields[i] = req.body[i];
    }
  }

  if (req.body.id) {
    Model.findById(req.body.id)
      .then((found) => {
        if (found) {
          found.updateFields(fields).then((document) => {
            res.send({
              status: true,
              document,
            });
          });
        } else {
          res.status(404).send({
            status: false,
            message: Responses.NOT_FOUND,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          status: false,
          message: Responses.UNKNOWN_ERROR,
        });
      });
  } else {
    Model.create(fields)
      .then((document) => {
        res.send({
          status: true,
          document,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          status: false,
          message: Responses.UNKNOWN_ERROR,
        });
      });
  }
});

router.post('/user/groups', (req, res) => {
  if (req.body.email && req.body.group) {
    User.find()
      .byEmail(req.body.email)
      .exec()
      .then((user) => {
        if (user) {
          req.body.group.split(',').forEach((group) => {
            if (req.body.remove) {
              user.removeGroup(group.trim());
            } else {
              user.addGroup(group.trim());
            }
          });

          res.send({
            status: true,
            user: user,
          });
        } else {
          res.send({
            status: false,
            user: null,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.send({
          status: false,
          user: null,
        });
      });
  } else {
    res.send({
      status: false,
      message: Responses.MISSING_PARAMETERS,
    });
  }
});

module.exports = router;
