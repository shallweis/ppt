var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: './js/app.js',
    output: {
        filename: 'build.js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: '#source-map',
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['latest']
                  }
            }
        ],
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        noInfo: true
    },
}
