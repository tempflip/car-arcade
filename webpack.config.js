const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    watch : true,
    entry: './src/game.js',
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins : [new HtmlWebpackPlugin(
        {
            template : 'game.html'
        }
    )],
    optimization: {
        minimize: false
    }
};