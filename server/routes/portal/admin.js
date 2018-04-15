var router = require('express').Router(),
    authMiddleware = require('../../middleware/auth.js'),
    User = require('../../db/model/User.js');

router.get('/', authMiddleware('admin', 'web'), function(req, res) {
    User.find()
        .byToken(req.authToken)
        .exec()
        .then(user => {
            User.find()
                .exec()
                .then(users => {
                    res.render('admin', {
                        user: User,
                        users: users,
                        currentUser: user
                    });
                });
        })
        .catch(err => {
            console.error(err);

            res.send({
                status: false,
                message: err
            });
        });
});

module.exports = router;
