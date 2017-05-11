import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {

    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/client/app')

  },
  target: 'web',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
      // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      title:'M.I.C',
      fullTitle: 'Movie Information System',
      template: 'src/server/views/index.ejs',
      minify: {
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
      },
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: '14541560b2b94bae97aed36710c81c08'

    }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //You can add global references here
    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options:{
        presets: ['es2015']}
      },
      //this is for loading Less and CSS
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less?sourceMap",
        include: path.join(__dirname, 'src/client/public/styles')
      },
      //This is for loading image files and fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=10000'
      },
  {  test: /\.(jpg|png|gif|svg)$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'file-loader',
  options: {
    name: '[images][name].[ext]',
  }
},
      {
        test: /\.html$/,
        ignoreCustomFragments: [/\{\{.*?}}/],
        exclude: /node_modules/,
        loader: "raw-loader"
      },
    {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
};
