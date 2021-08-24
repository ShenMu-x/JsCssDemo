const WebpackMerge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = WebpackMerge.merge(config, {
    mode: 'development',
    devtool: 'source-map',// 方便定位错误
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
})