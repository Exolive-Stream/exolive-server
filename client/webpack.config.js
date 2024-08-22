
const { 
  ROOT_DIR,
  PUBLIC_DIR,
  SERVER_PORT, 
  CLIENT_PORT,
} = require('../config'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // main file
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development', // production or development

  // main export file
  output: {
    path: PUBLIC_DIR,
    filename: 'bundle.js',
    publicPath: '/',
  },

  // if start a dev server
  devServer: {
    port: CLIENT_PORT,
    compress: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true, 
    open: true,
    proxy: [
      {
        context: [
          '/socket.io', 
          '/api', 
          '/auth'
        ],
        target: 'http://localhost:' + SERVER_PORT,
        changeOrigin: true,
      }
    ],
  },

  // html export
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  resolve: {
    // alias imports
    alias: {
      '@': ROOT_DIR + '/client/src',
      
      // for program in mobile :')
      'eruda': process.env.NODE_ENV === 'production' ?
        ROOT_DIR + '/client/src/utils/__eruda-fake.js': // remove eruda in production
        'eruda',
    },
    extensions: ['.*', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpg|png)$/i,
        type: 'asset',
      },
    ],
  },
};