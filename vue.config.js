/* eslint-disable */
const webpack = require('webpack');

module.exports = {
    publicPath: '/',
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
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true,
        },
    },
};