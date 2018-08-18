const path = require('path');
const webpack = require('webpack');
// HTML Webpack Plugin (https://www.npmjs.com/package/html-webpack-plugin)
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CDN extension for the HTML Webpack Plugin (https://github.com/van-nguyen/webpack-cdn-plugin)
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development', // development or production
    entry: {
        app: './src/index.js',
        lib: ['./src/print.js', './src/math.js']
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader',
            options: {
                name: '[hash].[ext]'
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['es2015', 'env']
            }
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    /*
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                }
            }
        }
    },
    */
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: 'body'
        }),
        new WebpackCdnPlugin({
            modules: [{
                name: 'lodash',
                var: '_'
            }, {
                name: 'jquery',
                var: '$'
            }],
            publicPath: '/node_modules'
        })
    ]
};