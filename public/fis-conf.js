
// @压缩小图标，变成一张sprite大图
// fis.match('::package', {
//     spriter: fis.plugin('csssprites')
// });

// @是否开启文件指纹
fis.match('*', {
    useHash: false
});

// @压缩js，节省代码体积
fis.match('*.js', {
    optimizer: fis.plugin('uglify-js', {
        mangle: false, // @不开启变量混淆
    })
});

// @压缩css
fis.match('*.css', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

// @压缩png图片
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

// @压缩html代码
// fis.match('*.html', {
//     optimizer: fis.plugin('html-compress')
// })

// @打包页面引用的文件
// fis.match('::package', {
//     postpackager: fis.plugin('loader', {
//         allInOne: true
//     })
// });

/**
 * 使用方法
 * fis3 release -d [目录]
 * 例如：fis3 release -d ./dist，如果当前目录下，dist目录不存在，那么就创建一个，并将代码压缩到dist目录下。
 */

