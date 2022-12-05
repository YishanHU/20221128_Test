const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
})
// 进行修改默认的webpack配置

module.exports = {
  devServer: {  //开发环境的服务器配置
    // 是否自动弹出浏览器，默认false
    open: true,
    // 修改默认端口，默认8080
     //port: 9090,

    proxy: {  //进行代理转发
      '/api': {
        // 转发的网址
        target: "http://localhost:3000",
        // 是否开启本地代理 默认true
        changeOrigin: true,
        // 重要点
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  }
}

