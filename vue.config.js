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
        target: 'https://wechatapp.cdjjwang.com/',
        ws: true,
        changOrigin: true,
        pathRewrite: { // ---->>>并将/api换成/
          '^/Api': 'https://wechatapp.cdjjwang.com/Api'
        }
      },
      '/captcha': {
        target: 'https://wechatapp.cdjjwang.com/',
        ws: true,
        changOrigin: true,
        pathRewrite: { // ---->>>并将/api换成/
          '^/captcha': 'https://wechatapp.cdjjwang.com/captcha'
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
