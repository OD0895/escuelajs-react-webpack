const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmt&timeout=2000&reload=true'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: 'assets/vendor.js',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            'loader': 'file-loader',
            options: {
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};