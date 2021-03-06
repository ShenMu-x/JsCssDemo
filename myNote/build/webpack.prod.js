const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist')
        }])
    ],
    optimzation: {
        minimizer: [
            new UglifyJsPlugin({
                cathe: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            catheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]]/,
                    priority: 10,
                    chunks: "initial"
                }
            }
        }
    }
})