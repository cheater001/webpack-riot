'use strict';

// Depends
var path = require('path');
var webpack = require('webpack');
var Manifest = require('manifest-revision-webpack-plugin');
var TextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlPlugin   = require('html-webpack-plugin');

/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = function (_path) {
    var rootAssetPath = _path + 'src';

    return {
        entry: {
            application: _path + '/src/index.js',
            vendors: ['jquery']
        },

        output: {
            path: path.join(_path, 'dist'),
            filename: path.join('assets', 'js', '[name].js'),
            chunkFilename: '[id].bundle.[chunkhash].js',
            publicPath: '/'
        },

        resolve: {
            extensions: ['', '.js', '.tag'],
            modulesDirectories: ['node_modules'],
            alias: {
                _svg: path.join(_path, 'app', 'assets', 'svg'),
                _fonts: path.join(_path, 'app', 'assets', 'fonts'),
                _modules: path.join(_path, 'app', 'modules'),
                _images: path.join(_path, 'app', 'assets', 'images'),
                _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
                _templates: path.join(_path, 'app', 'assets', 'templates')
            }
        },

        // modules resolvers
        module: {
            preLoaders: [
                {
                    test: /\.tag/,
                    loader: 'riotjs',
                    exclude: /node_modules/,
                    query: {
                        type: ['babel']
                    }
                }
            ],
            loaders: [
                {
                    test: /\.scss$/,
                    loader: TextPlugin.extract('style', 'css?sourceMap!postcss!sass')
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.tag$/,
                    loader: 'tag',
                    exclude: /node_modules/
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/i,
                    loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
                },
                //Font awesome loader config
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])$/,
                    loader: 'url?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])$/,
                    loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
                },
                {
                    test: /\.(png|jpg|svg)$/,
                    loaders: [
                        'url?limit=8192&name=assets/images/[name].[hash].[ext]',
                        'image-webpack'
                    ]
                }
            ]
        },

        imageWebpackLoader: {
            pngquant:{
                quality: "65-90",
                speed: 4
            },
            svgo:{
                plugins: [
                    {
                        removeViewBox: false
                    },
                    {
                        removeEmptyAttrs: false
                    }
                ]
            }
        },
        sassLoader: {
            precision: 8
        },
        // post css
        postcss: [autoprefixer({browsers: ['last 5 versions']})],

        // load plugins
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.join(_path, 'src', 'index.html'),
                    to: path.join(_path, 'dist', 'index.html')
                },
            ]),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                riot: "riot"
            }),
            new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.js'),
            new TextPlugin('assets/css/[name].css'),
            new Manifest(path.join(_path + '/config', 'manifest.json'), {
                rootAssetPath: rootAssetPath,
                ignorePaths: ['.DS_Store']
            }),
            new HtmlPlugin({
                title: 'Rambler Webpack Dev Boilerplate',
                chunks: ['application', 'vendors'],
                filename: 'index.html',
                template: path.join(_path, 'src', 'index.html')
            })
        ]
    };
};
