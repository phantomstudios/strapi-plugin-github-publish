module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  overrides: [
    {
      files: ['server/**/*.js'],
      ...require('./.eslintrc.back.js'),
    },
    {
      files: ['admin/**/*.js'],
      ...require('./.eslintrc.front.js'),
    },
  ],
};
