const path = require('path');
const baseConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Autoprefixer = require('autoprefixer');

const pathSrc = path.resolve(__dirname, 'src');
const pathDist = path.resolve(__dirname, 'dist');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1',
                    'sass-loader',
                ],
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        // contentBase: pathDist
        inline: true,
        contentBase: pathSrc,
        port: '3000',
    }
});