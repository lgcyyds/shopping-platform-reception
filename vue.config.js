const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  //关闭eslint
  lintOnSave:false,
  devServer: { //配置自动打开浏览器的地址
    host: 'localhost',
    port: 8080,
    proxy: {
    '/api': {
      target: 'http://gmall-h5-api.atguigu.cn',
      // pathRewrite: { '^/api': '' },
    },
  },
},
})
