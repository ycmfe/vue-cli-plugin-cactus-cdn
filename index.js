const WebpackYcCdnPlugin = require('yc-webpack-cdn')

const defaultOptions = {
  path, // 需要上传的根目录
  rule: // 请参考glob的rule格式
  cdnDir, // 必须。为CDN提供一个目录
  fileOption, // glob对应的配置，默认为空
  processNumber: 100 //配置单次处理的进程数,默认为100
}

module.exports = (api, options) => {
  const pluginOptions = {
    ...defaultOptions,
    ...options.pluginOptions
  }

  if(!pluginOptions.path || !pluginOptions.cdnDir){
    throw new Error('Miss path or cdnDir')
  }

  api.chainWebpack((webpackConfig) => {
    webpackConfig
      .plugin('cdn')
        .use(new WebpackYcCdnPlugin(pluginOptions))
  })
}
