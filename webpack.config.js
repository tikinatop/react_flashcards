module.exports = {
    entry: './src/app.js',
  output: {
      path: __dirname + '/public',
      filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
          test: [/\.jsx$/, /\.js$/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        inline:true,
        stats: 'errors-only'
    },
    //    watch: true
};
