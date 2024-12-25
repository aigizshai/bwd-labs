const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Плагин для копирования статичных файлов

module.exports = {
  entry: './src/index.js', // Точка входа для сборки проекта
  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: true, // Включает обработку url() в CSS
          },
        },
      ],
    },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Для обработки изображений
        use: ['file-loader'], // Используем file-loader для обработки изображений
      },
      {
        test: /\.ico$/, // Для обработки иконок
        use: ['file-loader'], // Используем file-loader для обработки иконок
      },
      {
        test: /\.js$/, // Для обработки скриптов
        exclude: /node_modules/, // Исключаем node_modules
        use: {
          loader: 'babel-loader', // Используем babel-loader для транспиляции JavaScript
        },
      },
       {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Шрифты будут скопированы с хешем
            },
          },
        ],
      },
    ],
  }, plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/task.html',
      inject: true,
      chunks: ['index'],
      filename: 'task.html', 
    }),
    new HtmlWebpackPlugin({
      template: './src/project.html',
      inject: true,
      chunks: ['index'],
      filename: 'project.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      inject: true,
      chunks: ['index'],
      filename: 'about.html',
    }),
   
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
        { from: 'src/scripts', to: 'scripts' }, 
        { from: 'src/styles', to: 'styles' },
        { from: 'src/fonts', to: 'styles/fonts'}
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },
  mode: 'development', // Режим сборки
};
