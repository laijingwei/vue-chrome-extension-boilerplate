const path = require('path')
const webpack = require('webpack')
const fg = require('fast-glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// eslint-disable-next-line
function configFunc(env, argv) {
  const isDevMode = env.NODE_ENV === 'development'
  const config = {
    devtool: isDevMode ? 'eval-source-map' : false,
    context: path.resolve(__dirname, './src'),
    entry: {
      options: './options/index.js',
      popup: './popup/index.js',
      background: './background/index.js',
      contentScripts: './contentScripts/index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: './',
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            extractCSS: !isDevMode,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.scss$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.sass$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              // eslint-disable-next-line
              options: { implementation: require('sass') },
            },
          ],
        },
        {
          test: /\.styl$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            esModule: false,
          },
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve(__dirname, "src"),
      },
      // extensions: ['.js'],
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets' },
          { from: 'manifest.json', to: 'manifest.json', flatten: true },
        ],
      }),
      new HtmlWebpackPlugin({
        title: 'Options',
        template: './index.html',
        filename: 'options.html',
        chunks: ['options'],
      }),
      new HtmlWebpackPlugin({
        title: 'Popup',
        template: './index.html',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
    ],
  }

  /**
   * Adjust rendererConfig for production settings
   */
  if (isDevMode) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new ExtensionReloader({
        contentScript: 'contentScripts',
        background: 'background',
        extensionPage: 'popup',
        options: 'options',
      })
    )
  } else {
    config.plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        async: [/runtime/],
        defaultAttribute: 'defer',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
      // new CopyWebpackPlugin({
      // patterns: [
      //   {
      //     from: path.join(__dirname, '../src/data'),
      //     to: path.join(__dirname, '../dist/data'),
      //   },
      // ]})
    )
  }
  return config
}

module.exports = configFunc
