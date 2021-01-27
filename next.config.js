// next.config.js
const withAntdLess = require('next-plugin-antd-less');

const { getThemeVariables } = require('antd/dist/theme');
module.exports = withAntdLess({
  modifyVars: getThemeVariables({
    dark: true
  }),
  lessVarsFilePath: './theme/dark.less',
  cssLoaderOptions: {
  },
  // Other Config Here...

  webpack(config) {
    return config;
  },
});