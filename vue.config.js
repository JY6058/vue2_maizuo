const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api1': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api1': ''
        }
      },
      '/api2': {
        target: 'https://m.maizuo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': ''
        }
      }
    }
  },
  publicPath: './'

})
