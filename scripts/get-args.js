module.exports = function getArgs(args) {
  return args.reduce((output, arg) => {
    const argSplit = arg.split('=');
    const argName = argSplit[0].replace('--', '');
    const argValue = argSplit[1];

    return Object.assign({}, output, {
      [argName]: argValue,
    });
  }, {});
};
