const path = require('path');
const WebpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./webpack.config');

module.exports = WebpackMerge.merge(config, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin({
            // 需要patterns
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist')
                }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['']
                    }
                }
            }),

        ]
    },
})