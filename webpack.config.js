const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const vendor = require('./config/vendor.json');


module.exports = {
    entry: {
        bundle: ['./app/index.js'],
        vendor: vendor.dependencies
    },
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: '[name].js',
        resolve: {
            extensions: ['', '.js', '.json', '.css', '.html'],
            modulesDirectories: ['node_modules', 'bower_components', 'app']
        }
    },
    devtool: "source-map",
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
        }),
        new CopyWebpackPlugin([
                {
                    context: path.resolve(__dirname, 'app'),
                    from: '*.html',
                    to: path.resolve(__dirname, 'web')
                }],
            {
                copyUnmodified: true
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            beautify: true,
            mangle: false
        })
    ],

    module: {
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/, /bower_components/], loader: "babel-loader"}
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'web'),
        outputPath: path.resolve(__dirname, 'app'),
        hot: true,
        watch: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        inline: true,
        historyApiFallback: true,
        compress: true,
        headers: {"X-Custom-Header": "yes"},
        stats: 'errors-only',
        port: 7777,
    }
};