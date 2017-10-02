const path = require('path');

module.exports = {
  context: __dirname,
  entry: './js/ready_git_go.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps',
};
