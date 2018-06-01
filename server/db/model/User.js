const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  mongoose,
  defaultOptions,
  modifySchema,
  defaultSchema,
} = require('../index.js');
const config = require('../../../config/default.js');
const Email = require('../../interactors/email.js');
const emailResponses = require('../../responses/api/email.js');
const crypto = require('crypto');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const escapeStringRegex = require('escape-string-regexp');
const { secret } = config;

// Define the document Schema
const schema = new mongoose.Schema(
  Object.assign({}, defaultSchema, {
    full_name: {
      type: String,
      form: {
        user_editable: true,
        label: 'Full Name',
        placeholder: 'Name',
      },
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      form: {
        user_editable: true,
        label: 'Email',
        placeholder: 'eboard@kappathetapi.com',
      },
    },
    email_verified: {
      type: Boolean,
      form: {
        user_editable: false,
        label: 'Email Verified',
      },
    },
    verification_tokens: [
      {
        created_at: {
          type: Date,
          default: Date.now,
        },
        token: String,
        tokenType: String,
      },
    ],
    password: {
      type: String,
      required: true,
      form: {
        user_editable: true,
        label: 'Password',
        placeholder: 'ninja',
      },
    },
    tokens: [
      {
        created_at: {
          type: Date,
          default: Date.now,
        },
        token: String,
      },
    ],
    old_tokens: [
      {
        created_at: {
          type: Date,
          default: Date.now,
        },
        token: String,
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
    groups: [
      {
        name: String,
      },
    ],
    meta: {
      ip: String,
    },
    avatar: {
      type: String,
      form: {
        user_editable: true,
        label: 'Avatar',
        type_override: 'file',
      },
    },
  }),
  defaultOptions,
);

// Allow us to query by name
schema.query.byName = function(name) {
  const escapedName = escapeStringRegex(name);
  return this.findOne({
    full_name: new RegExp(escapedName, 'i'),
  });
};

// Allow us to query by email
schema.query.byEmail = function(email) {
  const escapedEmail = escapeStringRegex(email);
  return this.findOne({
    email: new RegExp(escapedEmail, 'i'),
  });
};

// Allow us to query by token
schema.query.byToken = function(findToken) {
  return this.findOne({
    tokens: {
      $elemMatch: {
        token: findToken,
      },
    },
  });
};

// Allow us to query by token
schema.query.byVerificationToken = function(findToken) {
  return this.findOne({
    verification_tokens: {
      $elemMatch: {
        token: findToken,
      },
    },
  });
};

// Verify the token is correct
schema.methods.verifyToken = function(token) {
  return new Promise((resolve, reject) => {
    try {
      const tokenData = jwt.verify(token, secret);
      if (this.email === tokenData.email) {
        resolve(true);
      } else {
        reject(new Error('Email does not match token'));
      }
    } catch (err) {
      console.error(err);
      switch (err.name) {
        case 'TokenExpiredError':
          break;
        case 'JsonWebTokenError':
          break;
        default:
          break;
      }
      reject(err.message);
    }
  });
};

// Handle bcrypt password comparison
schema.methods.checkPassword = function(suppliedPassword) {
  return bcrypt.compare(suppliedPassword, this.password);
};

// Generate a new JWT
schema.methods.generateNewToken = function() {
  if (this.tokens.length >= config.max_tokens) {
    this.tokens.sort((first, second) => first.created_at - second.created_at);

    this.removeToken(this.tokens[0].token);
  }

  const newToken = jwt.sign(
    {
      email: this.email,
    },
    secret,
    {
      expiresIn: `${config.token_expiration}d`,
    },
  );

  this.tokens.push({
    token: newToken,
  });
  this.save();

  return newToken;
};

// Remove a JWT (logout)
schema.methods.removeToken = function(token) {
  let removeElem = null;
  this.tokens.forEach((dbToken, elem) => {
    if (dbToken.token === token) {
      removeElem = elem;
    }
  });

  const removed = this.tokens.splice(removeElem, 1)[0];
  this.old_tokens.push(removed);

  this.save();
};

schema.methods.generateEmailVerificationToken = function() {
  const token = this.generateTempToken('email_verification');

  return token;
};

schema.methods.generatePasswordResetToken = function() {
  const token = this.generateTempToken('password_reset');

  return token;
};

schema.methods.generateTempToken = function(tokenType) {
  const newToken = jwt.sign(
    {
      email: this.email,
      tokenType: tokenType,
    },
    secret,
    {
      expiresIn: '30m',
    },
  );

  this.verification_tokens.push({
    token: newToken,
    tokenType: tokenType,
  });

  this.save();

  return newToken;
};

schema.methods.checkEmailVerificationToken = function(token) {
  return this.checkTempToken(token, 'email_verification');
};

schema.methods.checkPasswordResetToken = function(token) {
  return this.checkTempToken(token, 'password_reset');
};

schema.methods.checkTempToken = function(token, tokenType) {
  return new Promise((resolve, reject) => {
    try {
      const tokenData = jwt.verify(token, secret);
      if (this.email === tokenData.email && tokenData.tokenType === tokenType) {
        resolve(true);
      } else {
        reject(new Error('Token not valid'));
      }
    } catch (err) {
      console.error(err);
      switch (err.name) {
        case 'TokenExpiredError':
          break;
        case 'JsonWebTokenError':
          break;
        default:
          break;
      }
      reject(err.message);
    }
  });
};

schema.methods.verifiedEmail = function() {
  this.email_verified = true;

  const { verification_tokens } = this;
  this.verification_tokens.forEach((tokenInfo, elem) => {
    if (tokenInfo.tokenType === 'email_verification') {
      verification_tokens.splice(elem, 1);
    }
  });

  this.verification_tokens = verification_tokens;

  this.save();
};

schema.methods.changePassword = function(password) {
  this.password = password;

  const { verification_tokens } = this;
  this.verification_tokens.forEach((tokenInfo, elem) => {
    if (tokenInfo.tokenType === 'password_reset') {
      verification_tokens.splice(elem, 1);
    }
  });

  this.verification_tokens = verification_tokens;

  this.save();
};

schema.methods.sendVerificationEmail = function() {
  if (config.development) {
    console.log(
      emailResponses.VERIFICATION_URL_CONSOLE,
      `${config.host}/v1/auth/verify/${this.generateEmailVerificationToken()}`,
    );
  } else {
    Email.sendEmailTemplate(
      config.confirmation_email_template,
      {
        confirmation_url: `${
          config.host
        }/v1/auth/verify/${this.generateEmailVerificationToken()}`,
        FIRST_NAME: this.full_name ? this.full_name.split(' ')[0] : 'Name',
      },
      config.confirmation_email_subject,
      this.email,
      config.email_from,
      config.email_from_name,
    ).catch((error) => {
      console.error('MANDRILL', error);
      return false;
    });
  }
};

schema.methods.sendPasswordResetEmail = function() {
  if (config.development) {
    console.log(
      emailResponses.PASSWORDRESET_URL_CONSOLE,
      `${config.host}/auth/passwordreset/${this.generatePasswordResetToken()}`,
    );
  } else {
    Email.sendEmailTemplate(
      config.password_reset_email_template,
      {
        update_password_url: `${
          config.host
        }/auth/passwordreset/${this.generatePasswordResetToken()}`,
      },
      config.password_reset_email_subject,
      this.email,
      config.email_from,
      config.email_from_name,
    ).catch((error) => {
      console.error('MANDRILL', error);
    });
  }
};

schema.methods.checkGroup = function(checkGroup) {
  if (checkGroup === 'any') {
    return true;
  }
  let returnVal = false;
  this.groups.forEach((data) => {
    if (checkGroup.indexOf(data.name) !== -1) {
      returnVal = true;
    }
  });

  return returnVal;
};

schema.methods.addGroup = function(groupName) {
  if (!this.checkGroup(groupName)) {
    this.groups.push({ name: groupName });
    this.save();

    return true;
  }
  return false;
};

schema.methods.removeGroup = function(groupName) {
  const self = this;
  if (this.checkGroup(groupName)) {
    this.groups.forEach((group, elem) => {
      if (group.name === groupName) {
        self.groups.splice(elem, 1);
      }
    });
    this.save();

    return true;
  }
  return true;
};

schema.methods.getGroupsList = function() {
  const groups = [];

  this.groups.forEach((data) => {
    groups.push(data.name);
  });

  return groups;
};

schema.methods.updateFields = function(fields) {
  for (const param in fields) {
    this[param] = fields[param];
  }
  this.save();
};

schema.methods.getAvatars = function() {
  let avatars = [];

  if (this.avatar) {
    avatars.push(`${config.host}/v1/artifact/avatar/${this.email}`);
  }

  avatars = avatars.concat([
    `https://www.gravatar.com/avatar/${crypto
      .createHash('md5')
      .update(this.email || '')
      .digest('hex')}?d=404`,
    `https://api-avatar.trove.com/v1/avatar/${this.email}?fallback=true`,
  ]);

  return avatars;
};

schema.methods.getResume = function() {
  return `${config.host}/v1/artifact/resume/${this.email}`;
};

schema.methods.getProfile = function() {
  const profile = {
    email: this.email,
    email_verified: this.email_verified,
    full_name: this.full_name,
    groups: this.getGroupsList(),
    avatar: this.getAvatars(),
    id: this._id,
  };
  return profile;
};

schema.virtual('avatars').get(function() {
  return this.getAvatars();
});

schema.statics.getUpdateableFields = function(groups) {
  const updateables = [];

  for (const key in schema.obj) {
    const field = schema.obj[key];

    if (field.form) {
      if (field.form.user_editable) {
        updateables.push(key);
      } else if (groups) {
        groups.forEach((group) => {
          if (
            field.form.auth_groups &&
            field.form.auth_groups.indexOf(group) !== -1
          ) {
            updateables.push(key);
          }
        });
      }
    }
  }

  return updateables;
};

// Password middleware to update passwords with bcrypt when needed
const passwordMiddleware = function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

// Set the update middleware on each of the document save and update events
schema.pre('save', passwordMiddleware);
schema.pre('findOneAndUpdate', passwordMiddleware);
schema.pre('update', passwordMiddleware);

schema.plugin(sanitizerPlugin);

modifySchema(schema);

// Initialize the model with the schema, and export it
const model = mongoose.model('User', schema);

module.exports = model;
