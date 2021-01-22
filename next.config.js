const withAntdLess = require('next-plugin-antd-less');
module.exports = withAntdLess({
    lessVarsFilePath:'./styles/variables.less',
    cssLoaderOptions: {
    },
    webpack(config) {
        return config;
    },
});
