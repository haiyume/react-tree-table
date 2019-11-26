var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ROOT_PATH = path.resolve(__dirname, "app");
var DEST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    devtool: false,
    context: ROOT_PATH,
    entry: {
        'base': ['@babel/polyfill', 'react', 'react-dom', 'prop-types'],
        'main' : './js/main.js'
    },
    output: {
        path: DEST_PATH,
        filename: './js/[name].js',
        chunkFilename: './js/asyn/[name].[hash].js'
    },

    resolve: {
        alias: {
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: './json/', to : './json/'}
        ]),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: true
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"native"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'base'
        }),
        new htmlWebpackPlugin({
            //title: "",
            template: "index.html",
            filename: "index.html",
            hash: true,
            inject: true,
            chunks:['main']
        })
        ,new ExtractTextPlugin("css/styles.css"),

    ],

    devServer:{
        contentBase: 'app/',
        //devtool: 'eval',
        hot: true,        //ie8
        inline: true,     //ie8
        port: 8080,       //Port Number
        disableHostCheck: true,
        proxy: {}
    },

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test : /\.(css|scss)$/,
                exclude: [path.resolve(__dirname, "app/css"), path.resolve(__dirname, "app/js")],
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                //url: false,
                                //minimize: true,
                                modules: true,
                                //limportLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]',
                                importLoaders:2
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },

            {
                test : /\.(css|scss)$/,
                include: [path.resolve(__dirname, "app/css"), path.resolve(__dirname, "app/js")],
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                //url: false,
                                //minimize: true
                                importLoaders:2
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },

            {
                test: /\.(png|jpg|gif|svg|eot|woff|ttf)$/,
                use: {
                        loader: 'url-loader',
                        options: {
                            limit : 8192,
                            name : 'img/cssimg/[name].[hash].[ext]'
                        }
                    }

            }
        ]
    }


};
