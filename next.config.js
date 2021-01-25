const fs = require("fs");
const withAntdLess = require('next-plugin-antd-less');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './pages'),
    themeVariables: ['@primary-color'],
    indexFileName: 'index.html',
    generateOnce: false,
    lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
    publicPath: "",
    customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

const themePlugin = new AntDesignThemePlugin(options);


module.exports = withAntdLess({
    modifyVars: {
        dark:true
    },
    cssLoaderOptions: {
    },
    webpack(config) {

        return config;
    },
});
