const path = require('path');
const webpack = require('webpack');
// HTML Webpack Plugin (https://www.npmjs.com/package/html-webpack-plugin)
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CDN extension for the HTML Webpack Plugin (https://github.com/van-nguyen/webpack-cdn-plugin)
const WebpackCdnPlugin = require('webpack-cdn-plugin');
// 빌드 전에 빌드 대상 디렉토리를 지워준다.
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
    // 웹팩 4 부터 플러그인이 아닌 옵션에 들어가 있다.
    // https://webpack.js.org/plugins/split-chunks-plugin/
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
        // 템플릿 html 파일을 기반으로 필요한 구문(<script> 등)을 inject 해준다.
        // 이외에 기능들이 많다.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: 'body'
        }),
        // import(?)로 사용하는 라이브러리를 cdn 으로 대체시켜준다.
        // html-webpack-plugin 과 같이 사용해야 함.
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