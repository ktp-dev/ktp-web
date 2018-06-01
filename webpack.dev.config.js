var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var devConfig = {
    entry: [
        'babel-polyfill',
        './app/app.js',
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client'
    ],
    output: {
        publicPath: (process.env.HOST || 'http://localhost:4000') + '/',
        path: '/',
        filename: 'js/app.js'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                enforce: 'pre',
                use: ['eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',
                    'postcss-loader?' + JSON.stringify(
                    [ autoprefixer({ browsers: ['last 3 versions'] }) ]
                )]
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                use: 'url-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        // inject styles and javascript into index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Build',
            template: './app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = devConfig;
