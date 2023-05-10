const webpack = require('webpack');
const getCommitHash = require('./src/getCommitHash');

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env.REACT_APP_COMMIT_HASH': JSON.stringify(getCommitHash()),
    }),
  ],
};
