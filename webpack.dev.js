const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const glob = require('glob');

/**
 * entry 单入口entry文件
 */

/**
module.exports = {
    entry: './path/src/index',
} */


/**
 * entry 多入口entry文件，是一个js键值对形式
 */
/**
 module.exports = {
    entry: {
        app: './src/index.js',
        login: './src/helloworld.js',
    }
} */

/**
 * output不管是单入口还是多入口entry配置，output都只有一种配置，多入口entry时用占位符形式配置
 */
/**
 module.exports = {
    entry: {
        app: './src/index.js',
        helloWorld: './src/helloworld.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    mode: 'production'
} */

/**
 * Loaders 
 * 作用：webpack本身只支持js和json两种文件类型，通过loaders去支持其他文件类型，并将它们转化为有效的模块，可以添加到依赖图中
 * loaders本身只是一个函数，接受源文件为参数，返回转换的结果。
 */
 /**
  module.exports = {
     entry: {
        app: './src/index.js'
     },
     output: {
         filename: '[name].js',
         path: path.join(__dirname, 'dist'),
     },
     module: {
         rules: [
             { test: /\.txt$/, use: 'raw-loader'},
         ]
     }
 } */

 /**
  * plugins: 用于打包输出文件的优化，资源管理，环境变量注入，作用于整个构建过程，整个构建过程都可以使用plugins
  * 所有用loaders不能解决的都可以使用plugins处理。
  * 只需要将需要使用的plugin放在在plugins数组中即可
  */
/**
module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
} */

/**
   * glob用于读取文件
   */

const setMPA = function() {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]; 
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: ['commons', pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
            }
        }))
    });
    return {
        entry,
        htmlWebpackPlugins,
    }
}
const { entry, htmlWebpackPlugins} = setMPA();

module.exports = {
    entry,
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader', 
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ],
            }
        ]
    },
    mode: 'development',
    plugins: [
        /**
         * 将css提取到单独文件中
         */
        new MiniCssExtractPlugin({
            filename: '[name].css' // 注意这里是filename字段，而不是name
        }),
        /**
         * 压缩css文件
         */
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
        }),
        ...htmlWebpackPlugins,
        // HtmlWebpackExternalsPlugin插件需要放在htmlWebpackPlugin后面才生效，可以从cdn引入库，从bundle中分离
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
        //             global: 'React',
        //         }, {
        //             module: 'react-dom',
        //             entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
        //             global: 'ReactDOM',
        //         }
        //     ]
        // }),

        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
    // optimization: {
    //     splitChunks: {
    //       cacheGroups: {
    //         commons: {
    //           test: /(react|react-dom)/,
    //           name: 'vendors',
    //           chunks: 'all',
    //         },
    //       }
    //     }
    // },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                }
            }
        }
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 9111
    }
}