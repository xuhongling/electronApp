/*
* @Author: xuhongling
* @Date:   2019-12-05 09:22:57
* @Last Modified by:   xuhongling
* @Last Modified time: 2019-12-05 14:43:49
*/
const { override, addExternalBabelPlugins, fixBabelImports, addWebpackAlias, addLessLoader, addDecoratorsLegacy} = require('customize-cra');
const path = require('path');

module.exports = override(
  ...addExternalBabelPlugins(
    "react-hot-loader/babel"
  ),
	// antd按需加载，不需要每个页面都引入"antd/dist/antd.css"了
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addDecoratorsLegacy(),
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
  }),
  // 配置路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    'components': path.resolve(__dirname, './src/components'),
    'pages': path.resolve(__dirname, './src/pages'),
    'fetch': path.resolve(__dirname, './src/fetch'),
    'mock': path.resolve(__dirname, './mock'),
    'iconfont': path.resolve(__dirname, './src/static/iconfont'),
    'static': path.resolve(__dirname, './src/static'),
    'store': path.resolve(__dirname, './src/store'),
    'router': path.resolve(__dirname, './src/router'),
    'reducers': path.resolve(__dirname, './src/redux/reducers'),
    'utils': path.resolve(__dirname, './src/utils'),
  })
);