// next.config.js
const withAntdLess = require('next-plugin-antd-less');
const path = require('path');
const { getThemeVariables } = require('antd/dist/theme');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './theme'),
    varFile: path.join(__dirname, './theme/dark.less'),
    themeVariables: ['@primary-color'],
    indexFileName: 'index.html',
    generateOnce: false,
    lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
    publicPath: "",
    customColorRegexArray: [],
  }
   
const themePlugin = new AntDesignThemePlugin(options);

module.exports = withAntdLess({
  modifyVars: getThemeVariables({
    dark: true
  }),
  lessVarsFilePath: './theme/dark.less',
  cssLoaderOptions: {
  },
  // Other Config Here...
  webpack(config) {
    config.plugins.push(themePlugin)
    return config;
  },
});