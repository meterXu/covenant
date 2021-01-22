const withAntdLess = require('next-plugin-antd-less');
const { getThemeVariables } = require('antd/dist/theme');
module.exports = withAntdLess({
    modifyVars:getThemeVariables({
        dark: false
    }),
    cssLoaderOptions: {
    },
    webpack(config) {
        return config;
    },
});
