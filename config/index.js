/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-23 11:15:54
 * @Description: 头部注释配置模板
 */
import path from 'path'

const config = {
  projectName: 'template',
  date: '2022-8-23',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: true,
    },
  },
  // 持久化缓存配置
  cache: {
    enable: true,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    [
      'taro-plugin-tailwind',
      {
        scan: {
          dirs: ['./src'],
          exclude: ['dist/**/*'],
        },
      },
    ],
  ],

  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
