const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const baseConfig = require('./webpack.config.js');

const pathDist = path.resolve(__dirname, 'dist');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: '[name].bundle.[chunkhash].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.[chunkhash].css',
            chunkFilename: '[id].css'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true
            })
          ]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [Autoprefixer]
                        }
                    },
                    'sass-loader',
                ],
            }
        ]
    }
});