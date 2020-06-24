const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  devServer: {
    port: 5000
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      stylus: {
        include: [ process.cwd() + '/node_modules' ],
        use: [ require('stylus-less')({ cache: false }) ],
        sourcemap: {
          inline: true
        }
      },
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('apis',resolve('./src/apis'))
    .set('components',resolve('./src/components'))
    .set('router',resolve('./src/router'))
    .set('static',resolve('./static'))
    .set('store',resolve('./src/store'))
    .set('utils',resolve('./src/utils'))
    .set('views',resolve('./src/views'))
  }
}
