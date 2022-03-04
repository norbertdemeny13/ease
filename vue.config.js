/* eslint-disable */
const webpack = require('webpack');

module.exports = {
    publicPath: '/',
    css: {
        loaderOptions: {
          sass: {
            sassOptions: {
              includePaths: ['./node_modules', './src/assets'],
            },
          },
        },
    },
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

        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: "javascript/auto"
            }
          ] 
        },
    },
    chainWebpack: config => {
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            // eslint-disable-next-line no-param-reassign
            options.transformAssetUrls = {
              img: 'src',
              image: 'xlink:href',
              'b-avatar': 'src',
              'b-img': 'src',
              'b-img-lazy': ['src', 'blank-src'],
              'b-card': 'img-src',
              'b-card-img': 'src',
              'b-card-img-lazy': ['src', 'blank-src'],
              'b-carousel-slide': 'img-src',
              'b-embed': 'src',
            }
            return options
          })
      },
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true,
        },
    },
};
