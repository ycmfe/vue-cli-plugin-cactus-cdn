# Welcome to vue-cli-plugin-cactus-cdn 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> cactus cdn plugin

## Install

```sh
vue add cactus-cdn
```

## Usage
```
{
  path, // 需要上传的根目录
  rule: // 请参考glob的rule格式
  cdnDir, // 必须。为CDN提供一个目录
  fileOption, // glob对应的配置，默认为空
  processNumber: 100 //配置单次处理的进程数,默认为100
}
```
TODO:
