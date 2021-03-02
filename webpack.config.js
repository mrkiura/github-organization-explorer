const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: {
        // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
        filename: 'main.js'
    },
    devServer: {
        contentBase: './public'
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html')
        })
    ],
    optimization: options.optimization,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Transform all .js and .jsx files required somewhere with Babel
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                // Preprocess our own .css files
                // This is the place to add your own loaders (e.g. sass/less etc.)
                // for a list of loaders, see https://webpack.js.org/loaders/#styling
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                                // Try enabling it in your environment by switching the config to:
                                // enabled: true,
                                // progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            // {
            //     test: /\.html$/,
            //     use: 'html-loader'
            // },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.react.js']
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {}
});
