const path = require('path');

module.exports = {
    watch : true,
    entry: './src/game.js',
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false
    }
};