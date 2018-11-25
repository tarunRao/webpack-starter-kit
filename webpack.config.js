const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Autoprefixer = require('autoprefixer');

const pathSrc = path.resolve(__dirname, 'src');
const pathDist = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    entry: [path.join(pathSrc, 'index.js'), path.join(pathSrc, 'main.scss')],
    output: {
        filename: 'bundle.js',
        path: pathDist,
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Portfolio',
            template: path.join(pathSrc, 'index.html'),
            filename: path.join(pathDist, 'index.html')
        })
    ],
    module: {
        rules: [
            // Javascript files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            // Css files
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
    },
    stats: {
        colors: true
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: pathDist
    }
}