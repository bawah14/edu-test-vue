const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
        '@': path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets')
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Edu Test - Content Management System'
      return args
    }),
      config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          options.compiler = require('vue-template-babel-compiler')
          return options
        })
  }
}
