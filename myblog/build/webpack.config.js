const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.argv.indexOf('--mode=production') === -1;

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|ico|bmp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'img/[name].[contenthash:8].[ext]'
                }
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             esModule: false,
                //             limit: 8192,
                //             outputPath: "img/",
                //             name: "[name].[contenthash:8].[ext]",
                //         }
                //     }
                // ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'media/[name].[contenthash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'fonts/[name].[contenthash:8].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        // 配置publicPath，修正路径
                        publicPath: '../dist/css',
                        hmr: devMode //HMR: hot module replacement 热模块替换 / 模块热替换
                    }
                }, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../dist/css',
                        hmr: devMode
                    }
                }, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[contenthash:8].css",
            chunkFilename: devMode ? '[id].css' : '[id].[chunkhash].css'
        }),
        new vueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        },
        version: '1.0'
    },
    performance: {
        hints:false,
        // //根本原因：打包出的文件过大。但由于是SPA实在难控制，直接停止报错
        // hints: "warning", // 枚举
        // maxAssetSize: 3000000, // 整数类型（以字节为单位） 2.86MB
        // maxEntrypointSize: 5000000, // 整数类型（以字节为单位）
        // assetFilter: function (assetFilename) {
        //     // 提供资源文件名的断言函数
        //     // 只给出js与css文件的性能提示
        //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        // }
    }
}