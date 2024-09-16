const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), 
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {     
                test: /\.s[ac]ss$/i, 
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Шаблон HTML файла
        }),
    ],
    devtool: 'source-map', // Настройка source maps для отладки
    devServer: {
        static: './dist', // Папка для dev сервера
        hot: true, // Включение hot reload
    },
    mode: 'development', // Режим разработки
};
