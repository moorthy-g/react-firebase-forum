const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const buildDirectory = path.resolve(__dirname, 'build');
const isDevelopment = process.env.NODE_ENV !== 'production';
const dotenv = require('dotenv').config();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8000;
const generateManifest = process.env.GENERATE_MANIFEST === 'true';
const generateReport = process.env.GENERATE_REPORT === 'true';
const generateBuildSourceMap = process.env.GENERATE_BUILD_SOURCEMAP === 'true';

const enableHMR = isDevelopment;
const generateCSSSourceMap = isDevelopment || generateBuildSourceMap;
const WebpackAssetsManifest = generateManifest && require('webpack-assets-manifest');
const BundleAnalyzerPlugin = generateReport && require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ClearConsolePlugin = function() {}
ClearConsolePlugin.prototype.apply = function(compiler) {
  compiler.plugin('watch-run', function(compilation, callback){
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    callback();
  })
}

const rules = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, 'src'),
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  },
  {
    test: /\.less$/,
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      publicPath: '../',
      use: [
        //minimize css in prod build to avoid bundling newline chars in js chunk
        {
          loader: 'css-loader',
          options: { sourceMap: generateCSSSourceMap, minimize: !generateCSSSourceMap }
        },
        { loader: 'postcss-loader', options: { sourceMap: generateCSSSourceMap } },
        { loader: 'less-loader', options: { sourceMap: generateCSSSourceMap } }
      ]
    })
  },
  {
    test: /\.(jpe?g|png|gif|webp|svg)$/,
    loader: 'file-loader?name=img/[name].[hash:8].[ext]'
  },
  {
    test: /\.(woff|woff2|ttf|eot)$/,
    loader: 'file-loader?name=font/[name].[hash:8].[ext]'
  }
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    )
  }),
  new ExtractTextWebpackPlugin({
    filename: 'style/[name].[contenthash:20].css',
    disable: enableHMR
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    favicon: path.resolve(__dirname, 'src/favicon.png'),
    minify: isDevelopment
      ? false
      : {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
  }),
  // extract all vendor chunks in node_modules to single file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module) {
      return module.context && module.context.includes('node_modules')
    }
  }),
  // To prevent longterm cache of vendor chunks
  // extract a 'manifest' chunk, then include it to the app
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  // Prevent importing all moment locales
  // You can remove this if you don't use Moment.js:
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];

generateManifest &&
  plugins.push(
    new WebpackAssetsManifest({
      output: path.resolve(buildDirectory, 'webpack-manifest.json'),
      writeToDisk: true
    })
  );

generateReport &&
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'report.html'),
      openAnalyzer: false
    })
  );

const devPlugins = enableHMR
  ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ClearConsolePlugin()
    ]
  : new Array();

const buildPlugins = [
  new CleanWebpackPlugin(buildDirectory),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true,
      warnings: false
    },
    mangle: {
      safari10: true,
    },
    sourceMap: generateBuildSourceMap
  })
];

let mainEntry = [path.resolve(__dirname, 'src/js/main')];
isDevelopment && mainEntry.push('react-hot-loader/patch');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index')
  },

  output: {
    path: buildDirectory,
    //HMR requires [hash]. It doesn't work with [chunkhash]
    filename: enableHMR
      ? 'js/[name].[hash:20].js'
      : 'js/[name].[chunkhash:20].js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
    path
      .relative(path.resolve('src'), info.absoluteResourcePath)
      .replace(/\\/g, '/')
  },

  module: {
    rules: rules
  },

  devtool: isDevelopment ? 'cheap-module-source-map' : generateBuildSourceMap ? 'source-map' : false,

  plugins: isDevelopment
    ? [].concat(plugins, devPlugins)
    : [].concat(plugins, buildPlugins),

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      modules: path.resolve(__dirname, 'src/modules')
    }
  },

  devServer: {
    host: host,
    port: port,
    disableHostCheck: true,
    inline: true,
    hot: enableHMR,
    compress: true,
    stats: 'errors-only'
  },

  stats: 'minimal',

  watchOptions: {
    ignored: /(node_modules)/
  }
};
