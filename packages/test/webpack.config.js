const path = require('path');

module.exports = {
  entry: './dist/npm/index.js',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { "stream": false }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
