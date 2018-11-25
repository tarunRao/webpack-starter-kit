var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pathSrc = path.resolve(__dirname, 'src');
var pathDist = path.resolve(__dirname, 'dist');

module.exports = {
    entry: path.join(pathSrc, 'index.js'),
    output: {
        filename: 'bundle.js',
        path: pathDist
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Portfolio',
            template: path.join(pathSrc, 'index.html'),
            filename: path.join(pathDist, 'index.html')
        })
    ]
}