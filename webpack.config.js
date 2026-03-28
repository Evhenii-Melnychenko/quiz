const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = (devMode, directories) => {
  return {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'eval-cheap-module-source-map' : false,

    output: {
      path: path.resolve(
        __dirname,
        devMode ? directories.dev + 'js/' : directories.public + 'js/'
      ),
      filename: 'main.js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

    optimization: {
      minimize: !devMode,
    },

    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          devMode ? directories.dev + 'js/*' : directories.public + 'js/*',
        ],
      }),
    ],
  };
};

module.exports = webpackConfig;