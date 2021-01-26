const path = require('path');
const withAntdLess = require('next-plugin-antd-less');
const { getThemeVariables } = require('antd/dist/theme');



module.exports = withAntdLess({
    modifyVars: getThemeVariables({
        dark:true
    }),
    lessVarsFilePath:path.join('./pages/styles/vars.less'),
    cssLoaderOptions: {
    },
    webpack(config) {
        return config;
    },
});
