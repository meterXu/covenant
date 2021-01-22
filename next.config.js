const withAntdLess = require('next-plugin-antd-less');
const { getThemeVariables } = require('antd/dist/theme');
module.exports = withAntdLess({
    modifyVars:getThemeVariables({
        dark: true
    }),
    cssLoaderOptions: {
    },
    webpack(config) {
        return config;
    },
});
