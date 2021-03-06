'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const loadMinified = require('./load-minified')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = config.build.test.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.test.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.test.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.test.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es/),
    new UglifyJsPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.test.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.test.assetsSubDirectory,
        ignore: ['.*', 'robots.txt']
      },
      {
        from: path.resolve(__dirname, '../static/robots.txt')
      }
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'siwca.com.ar',
      navigateFallback: 'index.html',
      filename: 'firebase-messaging-sw.js',
      importScripts: [
        'static/fb.js'
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/(test|dev)-api\.coope\.siwca\.com\.ar\/v1/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/api\.coope\.siwca\.com\.ar\/v1/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/(test|dev)-notifications\.coope\.siwca\.com\.ar/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/notifications\.coope\.siwca\.com\.ar/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/unpkg\.com/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
          handler: 'cacheFirst'
        }
      ],
      minify: true,
      stripPrefix: 'dist/'
    })
  ]
})

if (config.build.test.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.test.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.test.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
