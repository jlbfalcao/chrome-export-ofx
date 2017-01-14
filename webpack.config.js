var path = require('path');

module.exports = {
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    entry: {
        itaucard: "./src/itaucard",
        amex: "./src/amex"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    }
};