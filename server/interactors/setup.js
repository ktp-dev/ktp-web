var config = require('../../config/default.js'),
    User = require('../db/model/User.js'),
    Configuration = require('../db/model/Configuration.js');

Configuration.find({})
    .exec()
    .then(configurations => {
        if (configurations.length < 1) {
            Configuration.create({
                app_name: config.app_name
            })
                .then(configuration => {
                    console.log(
                        'Created initial configuration:',
                        configuration
                    );
                })
                .catch(err => {
                    console.error('Error creating initial configuration', err);
                });
        }
    });

setTimeout(function() {
    User.find()
        .byEmail(config.admin_email)
        .exec()
        .then(user => {
            if (!user) {
                User.create({
                    full_name: config.admin_name,
                    email: config.admin_email,
                    email_verified: true,
                    password: config.admin_password
                })
                    .then(user => {
                        user.addGroup('admin');
                        console.log('Created initial user:', user);
                    })
                    .catch(err => {
                        console.error('Error creating initial user', err);
                    });
            }
        });
}, 2000);
