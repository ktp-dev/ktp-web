const {
  mongoose,
  defaultOptions,
  modifySchema,
  defaultSchema,
} = require('../index.js');
const escapeStringRegex = require('escape-string-regexp');

// Define the document Schema
const schema = new mongoose.Schema(
  Object.assign({}, defaultSchema, {
    app_name: String,
  }),
  defaultOptions,
);

// Allow us to query by app_name
schema.query.byAppName = function(app_name) {
  const escapedName = escapeStringRegex(app_name);
  return this.findOne({
    app_name: new RegExp(escapedName, 'i'),
  });
};

modifySchema(schema);

// Initialize the model with the schema, and export it
const model = mongoose.model('Configuration', schema);

module.exports = model;
