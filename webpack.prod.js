const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
 * mode 指定webpack打包的环境，production，development, 还是none
 * 设置mode可以使用webpack内置的函数，默认为production
 * 若设置为development会默认设置开发阶段的参数和函数，设置为none则什么都不处理。
 * development：设置process.env.NODE_ENV的值为development，开启namedChunksPlugin和NamedModulesPlugin.
 * 
 * production: 设置process.env.NODE_ENV的值为production, 开启FlagDependencyUsagePlugin,
 * FlagIncludedChunksPlugin,ModuleConcatenationPlugin,NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, 
 * SideEffectsFlagPlugin和TerserPlugin.
 * 
 * none: 不开启任何优化选项
 */

 /**
  * Hash: 和整个项目的构建有关，只要项目的文件有修改，整个项目构建的hash值就会更改
  * Chunkhash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值，一般js文件使用chunkhash
  * Contenthash: 根据文件内容来定义hash，文件内容不变，则contenthash不变。
  * 
  * js文件使用hash方式，在output的filename中设置[name]_[chunkhash].js
  * 
  * css文件使用hash的话，则需要将css以link的形式添加到页面中，而style-loader会将css-loader编译后的css文件通过style标签添加到页面的head中这时并没有独立的css文件，所以不需要hash.
  * 所以如果我们要给css文件生成hash,则需要使用mini-css-extract-plugin将css文件提取到单独的文件中，通过link的方式引入到页面中，则将module中的style-loader替换成MiniCssExtractPlugin.loader,
  * 并添加MiniCssExtractPlugin插件，filename设置为[name]_[contenthash:8].css, css的hash通常是使用contenthash来生成的，即根据文件内容生成的md5字符串，:8表示取md5串的前8位，md5默认是32位
  * 
  * 图片，字体等文件使用hash的方式，直接在loader的option中添加{name: 'img/[name]_[hash].[ext] }, 图片的hash就是根据文件内容生成的hash，默认是md5生成的。
  * 
  * 常用占位符和含义
  * [ext] 资源后缀名称
  * [name] 文件名称
  * [folder] 文件所在的文件夹
  * [path] 文件的相对路径
  * [contenthash] 文件的内容hash，默认md5生成
  * [hash] 文件内容的hash，默认md5生成
  * [emoji] 一个随机的指代文件内容的emoj
  * 
  * hash默认在development环境是不起作用的，所以我们要将mode设置位production，同时webpack-dev-server也只适用于开发环境
  * 
  * MiniCssExtractPlugin.loader和style-loader功能是互斥的，没办法同时运行，style-loader是将css内容通过style的方式加入到head中，而MiniCssExtractPlugin是将css文件提取成一个单独的css文件。
  */

/**
 * js文件压缩，webpack4在production模式下默认开启了uglifyjs插件，会自动压缩js文件，所以不需要特殊处理了。
 * css文件压缩，使用optimize-css-assets-webpack-plugin，这个插件依赖cssnano处理器，所以也要安装cssnano包。
 * html文件压缩，使用html-webpack-plugin，可以生成html文件，同时加载依赖，还可以压缩html文件。
 */

 /**
  * post-css可以给css加前缀，或者支持css modules，post-css可以通过plugins参数添加能力。post-css放置的位置通常是在less或者sass-loader之后，但是在css-loader之前，
  * css文件处理的顺序一般是先将scss通过sass-loader转换成css，再通过post-css对css文件添加css前缀，或者支持css module处理，生成新的css文件，最后通过css-loader将前面的css对象转换成webpack支持的js对象，
  * style-loader将css-loader转换过的这些css对象插入到html的style标签中。MiniCssExtractWebpackPlugin.loader将转换过的css对象生成到一个文件中，通过link的方式引用到页面中
  * 可以用postcss-loader搭配postcss.config.js使用也可以用下面的loader加options方式来配置
  * {
  *     loader: 'postcss-loader',
  *     options: {
  *            plugins: () => [
  *                    // require autoprefixer 不加overrideBrowserslist参数不会在编译后的css文件中添加css前缀
  *                    require('autoprefixer')({
  *                         overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'] 
  *                     })
  *                 ]
  *            }
  * },
  */

  /**
   *  px2rem-loader 将px转换成rem
   *  lib-flexible 自动计算跟元素的font-size
   */
  
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
               chunks: [pageName],
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
        filename: '[name]_[chunkhash:8].js',
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
                use: [ 
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 表示1rem = 75px
                            remPrecision: 8, // 表示px转换成rem之后保留小数点后的位数
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                        // url-loader默认会将小于10k的图片转换成base64的方式引入到代码中，所以为了体现图片文件的hash，这里先用file-loader将图片输出到文件中，可以查看文件名hash值的改变。
                        // options: {
                        //     limit: 10240,
                        // }
                        // 加上此参数图片显示不了
                    }
                ],
            }
        ]
    },
    mode: 'production',
    plugins: [
        /**
         * 将css提取到单独文件中
         */
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css' // 注意这里是filename字段，而不是name
        }),
        /**
         * 压缩css文件
         */
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
        }),
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin(),
    ]
}