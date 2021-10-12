module.exports = {
  publicPath: './',
  devServer: {
    open: true, // 浏览器自动打开页面
    host: 'localhost', // 如果是真机测试，就使用这个IP
    port: 8080,
    https: false,
    hotOnly: false, // 热更新（webpack已实现了，这里false即可）
    proxy: {
      // 配置跨域-将所有/api的请求拦截，代理到target上
      '/Api': {
        target: 'http://47.95.237.117:8090/',
        ws: true,
        changOrigin: true,
        pathRewrite: { // ---->>>并将/api换成/
          '^/Api': 'http://47.95.237.117:8090/Api'
        }
      },
      '/captcha': {
        target: 'http://47.95.237.117:8090/',
        ws: true,
        changOrigin: true,
        pathRewrite: { // ---->>>并将/api换成/
          '^/captcha': 'http://47.95.237.117:8090/captcha'
        }
      }
    },
    overlay: {
        warning: false,
        errors: false
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
