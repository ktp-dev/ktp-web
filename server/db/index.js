const cachegoose = require('cachegoose');
const mongoose = require('mongoose');
const config = require('../../config/default.js');
const defaultOptions = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      /* eslint no-param-reassign: "error" */
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
};
const defaultSchema = {
  deleted: {
    type: Boolean,
    default: false,
  },
};

// Initialize a promise handler (even though we don't currently use them)
mongoose.Promise = global.Promise;

// Initialize the DB connection
mongoose
  .connect(`mongodb://${config.mongo_hostname}/${config.backend_db}`)
  .then((res) => {
    if (res) {
      console.log('Connected to MongoDB Successfully');
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDb', err);
  });

cachegoose(mongoose);

function modifySchema(schema) {
  if (schema.obj) {
    const obj = Object.assign({ createdAt: Date, updatedAt: Date }, schema.obj);
    for (const propertyName in obj) {
      (function() {
        if (
          obj.hasOwnProperty(propertyName) &&
          (obj[propertyName] === Date ||
            (obj[propertyName].type && obj[propertyName].type === Date))
        ) {
          const dateName = propertyName;
          schema.virtual(`${dateName}_ts`).get(function() {
            if (dateName in this) {
              return new Date(this[dateName]).getTime();
            }
          });
        }
      })();
    }

    schema.query.since = function(since) {
      return this.find({
        updatedAt: {
          $gte: new Date(parseInt(since || 0, 10)),
        },
      });
    };

    schema.methods.updateFields = function(fields) {
      for (const param in fields) {
        if (fields.hasOwnProperty(param)) {
          this[param] = fields[param];
        }
      }
      return this.save();
    };
  }
}

module.exports = {
  mongoose,
  defaultOptions,
  modifySchema,
  defaultSchema,
};
