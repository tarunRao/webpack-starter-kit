const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Portfolio',
            template: path.join(pathSrc, 'index.html'),
            filename: path.join(pathDist, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    },
    stats: {
        colors: true
    }
}