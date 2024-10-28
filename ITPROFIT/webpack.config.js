const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/app/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/i,
                loader: 'esbuild-loader',
                options: {
                    target: 'es2015',
                },
            },
            { 
                test: /\.(png|jp(e*)g|svg|gif|mp3)$/, 
                use: ['file-loader'], 
            },
            {
                test: /\.(jpg|png|svg|jpeg|gif|mp3)$/,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.sass'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/app/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'js' }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        open: true,
        host: "localhost",
      },
};

module.exports = baseConfig;
