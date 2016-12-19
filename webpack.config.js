module.exports = {
    entry: './plugin.js',
    output: {
        filename: 'background.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    }
};