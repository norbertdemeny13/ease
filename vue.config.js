/* eslint-disable */
const webpack = require('webpack');

module.exports = {
  publicPath: '/ease',
  configureWebpack: {
    devtool: 'source-map',

    plugins: [
      // ...
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        LazyLoad: 'vanilla-lazyload',
        'window.LazyLoad': 'vanilla-lazyload',
        'window.jQuery': 'jquery',
      }),
    ],

    resolve: {
      symlinks: false,
    },
  },
};
