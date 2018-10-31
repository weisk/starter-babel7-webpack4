

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const paths = {
//   publicPath = '/',
//   publicUrl = '/',
//   dotenv: resolveApp('.env'),
//   appBuild: resolveApp('build'),
//   appPublic: resolveApp('public'),
//   appHtml: resolveApp('public/index.html'),
//   appIndexJs: resolveApp('src/index.js'),
//   appPackageJson: resolveApp('package.json'),
//   appSrc: resolveApp('src'),
//   yarnLockFile: resolveApp('yarn.lock'),
//   testsSetup: resolveApp('src/setupTests.js'),
//   appNodeModules: resolveApp('node_modules'),
//   publicUrl: getPublicUrl(resolveApp('package.json')),
//   servedPath: getServedPath(resolveApp('package.json')),
// };

module.exports = {
  devServer: {
    publicPath: '/',
    port: 9000,
    contentBase: path.join(process.cwd(), 'dist'), // static file location
    host: 'localhost',
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    noInfo: false,
    // quiet: true,
    stats: 'minimal',
    hot: true  // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'lib': path.resolve('src/lib'),
      'assets': path.resolve('src/assets'),
      'components': path.resolve('src/components'),
      'containers': path.resolve('src/containers'),
      'styles': path.resolve('src/styles'),
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      // new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },{
            test: /\.(js|jsx|mjs)$/,
            exclude: /(node_modules)/,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                ['@babel/plugin-proposal-class-properties'],
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ],
              cacheDirectory: true,
            },
          },{
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: { importLoaders: 1 },
              }, {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ]
          },{
            test: /\.(sass|scss)$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'postcss-loader',
                options: {
                  plugins: function() {
                    autoprefixer({
                      browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
                    });
                  }
                }
              },
              { loader: 'sass-loader',
                options: {
                  includePaths: [
                    path.resolve(__dirname, 'src/styles'),
                  ]
                }
              }
            ]
          },{
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
