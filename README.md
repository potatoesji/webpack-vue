文件说明
==========

# package.json #

    *配置node各种安装依赖包
    *`scripts`下配置npm 命令 如： build ，执行npm run build  执行文件的打包压缩命令
    *`dependencies`依赖包

# webpack.config.js #

    `##webpack配置文件`
    * `const require引入获取import引入`
    * `const  isDev =process.env.NODE_ENV === "development";` 判断执行环境
    * `const config={}` 配置文本pack  其中：`entry`为入口文件 `output`为出口文件 `module`为各种配置规则 `plugins`为webpack中用到的插件
        * `new webpack.HotModuleReplacementPlugin` webpack热加载插件

# postcss.config.js #

    ## `css`处理文件 如 ：`autoprefixer` 添加css厂商前缀

# .babelrc #


# src #
    * `assets`：静态文件  styl文件为css文件
    * `jsx`：文件不能放置css 需要外部引入
