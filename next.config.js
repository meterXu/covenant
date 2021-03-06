// next.config.js
const path = require('path');
const fs = require('fs');
const lessToJS = require('less-vars-to-js');
const withAntdLess = require('next-plugin-antd-less');
const generateTheme   = require('./lib/plugin');
const { getThemeVariables } = require('antd/dist/theme');
const prod = process.env.NODE_ENV === 'production';
const prefix = prod ? './' : './';
const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './theme'),
  varFile: path.join(__dirname, './theme/light.less'),
  outputFilePath: path.join(__dirname, './.next/static/color.less'),
  lessFilePath:`${prefix}_next/static/color.less`,
  lessJSPath:'https://cdnjs.cloudflare.com/ajax/libs/less.js/3.11.3/less.min.js',
  customThemes: { dark: lessToJS(fs.readFileSync(path.join(__dirname,'./theme/dark.less'), 'utf8'))},
}
const themeObj = generateTheme(options);
const _exports= Object.assign({
  assetPrefix:'./',
  publicRuntimeConfig:{
  next_dynamic_antd_theme: { themes:themeObj.themes, lessFilePath:options.lessFilePath, lessJSPath:options.lessJSPath },
}},withAntdLess({
  modifyVars: getThemeVariables({
    dark: true
  }),
  lessVarsFilePath: './theme/dark.less',
  cssLoaderOptions: {
  },
  webpack(config) {
    config.plugins.push(themeObj.plugin)
    return config;
  },
}));

module.exports = _exports
