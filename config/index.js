'use strict'

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {

  build: {

    prod:
    {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/prod/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/prod/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    test:
    {
        env: require('./test.env'),
        index: path.resolve(__dirname, '../dist/test/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/test/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev:
    {
        env: require('./dev.env'),
        index: path.resolve(__dirname, '../dist/dev/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/dev/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    mobile:
    {

        env: require('./mobile.env'),
        index: path.resolve(__dirname, '../www/index.html'),
        assetsRoot: path.resolve(__dirname, '../www'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }

  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
