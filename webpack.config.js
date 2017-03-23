const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vendor = require('./config/vendor.json');


module.exports = {
    entry: {
        bundle: ['./app/index.js'],
        vendor: vendor.dependencies,
        assets: ['./app/assets/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: '[name].js',
        resolve: {
            extensions: ['', '.js', '.json', '.css', '.html'],
            modulesDirectories: ['node_modules', 'bower_components', 'app', 'app/assets']
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
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
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
            {test: /\.js$/, exclude: [/node_modules/, /bower_components/], loader: "babel-loader"},
            { test: /\.scss/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css"),
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