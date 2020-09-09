const fs = require('fs');
const path = require('path');
const { chalk, error } = require('@vue/cli-shared-utils')

const WebpackCdnPlugin = require('webpack-cdn-plugin')
const WebpackYcCdnPlugin = require('yc-webpack-cdn')
const projectRoot = process.cwd();
const dir = projectRoot.split(path.sep).pop();
const cdnModules = path.resolve(projectRoot, 'cdn.modules.json');
const defaultOptions = {
  path: path.resolve(projectRoot, 'build'), // 需要上传的根目录
  cdnDir: dir,
  processNumber: 100,//配置单次处理的进程数,默认为100
  //cdn修改插件使用
  crossOrigin: 'anonymous',
  publicPath: `//fp.yangcong345.com/middle/${dir}`,
  modules: []
}


module.exports = (api, options) => {
  const pluginOptions = {
    ...defaultOptions,
    ...options.pluginOptions
  }

  if(!pluginOptions.cdnDir){
    throw new Error('请传入当前项目的cdnDir');
  }
  // 重写vue-cli内置的配置
  api.service.projectOptions.outputDir = 'build';
  api.service.projectOptions.path = pluginOptions.path;
  api.service.projectOptions.publicPath = pluginOptions.publicPath;
  api.service.projectOptions.crossOrigin = pluginOptions.crossOrigin;
  api.service.projectOptions.modules = pluginOptions.modules;
  
  const now = new Date();
  api.chainWebpack((webpackConfig) => {
    const modules = fs.readFileSync(cdnModules);
    pluginOptions.modules = JSON.parse(modules);
    console.log(chalk.green(`${now.getHours()}:${now.getMinutes()}  开始cdn上传`))

    webpackConfig
      .plugin('cdn-up')
        .use(new WebpackYcCdnPlugin(pluginOptions))
        .end()
      .plugin('cdn')
        .use(new WebpackCdnPlugin(pluginOptions))
        .before('cdn-up');
  })

}
