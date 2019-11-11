module.exports = {
    plugins: [
        // require autoprefixer 不加overrideBrowserslist参数不会在编译后的css文件中添加css前缀
        require('autoprefixer')({
            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'] 
        })
    ]
}