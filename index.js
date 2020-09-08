const fs = require('fs');
const path = require('path');
const WebpackCdnPlugin = require('webpack-cdn-plugin')
const WebpackYcCdnPlugin = require('yc-webpack-cdn')
const projectRoot = process.cwd();
const cdnModules = path.resolve(projectRoot, 'cdn.modules.json');
const defaultOptions = {
  path: path.resolve(projectRoot, 'build'), // 需要上传的根目录
  processNumber: 100,//配置单次处理的进程数,默认为100
  crossOrigin: 'anonymous',
  modules: []
}


module.exports = (api, options) => {
  const pluginOptions = {
    ...defaultOptions,
    ...options.pluginOptions
  }

  if(!pluginOptions.cdnDir){
    throw new Error('Miss path or cdnDir')
  }

  api.chainWebpack((webpackConfig) => {
    webpackConfig
      .plugin('cdn')
        .use(new WebpackYcCdnPlugin(pluginOptions))
  })

  const modules = fs.readFileSync(cdnModules);
  pluginOptions.modules = JSON.parse(modules);

  api.chainWebpack((webpackConfig) => {
    webpackConfig
      .plugin('cdn')
        .use(new WebpackCdnPlugin(pluginOptions))
  })

}
