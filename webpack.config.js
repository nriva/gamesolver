const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  resolve: {fallback: {
    "assert": false,
    "fs": false,
    "tls": false,
    "net": false,
    "path": false,
    "zlib": false,
    "http": false,
    "https": false,
    "stream": false,
    "crypto": false,
    "crypto-browserify": false},
      // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      /*
      {
        test: /sudoku-deep-solver\.worker\.ts$/i,
        loader: "worker-loader",
        options: {
          filename: "sudoku.worker.js",
        },
      },
      {
        test: /solitaire-deep-solver\.worker\.ts$/i,
        loader: "worker-loader",
        options: {
          filename: "solitaire.worker.js",
        },
      },
      */

      {
        test: /\.ts$/,
        use: [{
            loader: 'ts-loader',
            options: {
                configFile: "tsconfig.json"
            }
        }],
        exclude: /node_modules/,
      },

      /*
      {
          test: /\.worker\.ts$/,
          use: { loader: 'worker-loader' }
      }
      */
      /*
      {
        test: /solitaire\-deep\-solver\-worker\.js$/i,
        loader: "worker-loader",
        options: {
          filename: "pippo.worker.js",
        },
      }
      */
      /*{
      test: /\.html$/,
      exclude: /node_modules/,
      use: {loader: 'html-loader'}
      }*/
    ],
  },
};