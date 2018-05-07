const path = require("path");
const HTMLPlugin = require("html-webpack-plugin")
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");
//单独打包css文件 插件  vue组件中不能单独打包 是因为vue组件渲染时才加载该组件的样式 这样可以节省流量
const  isDev =process.env.NODE_ENV === "development";
//判断是否是开发环境

const config = {
    target: "web",
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "boundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules:[
            {
                test:/\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {   //转化为base64
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: isDev ? '"development"':'"production'
            }
        }),
        new HTMLPlugin()
    ]
}

//判断环境 设置环境变量
if( isDev ) {  //开发环境时正常压缩
    config.module.rules.push({
        test: /\.styl/,
        use: [
            "style-loader",
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            },
            "stylus-loader"
        ]
    });
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: "0.0.0.0",
        overlay: {
            errors: true
        },
        hot: true
    },
    config.plugins.push(
       new webpack.HotModuleReplacementPlugin(), 
       new webpack.NoEmitOnErrorsPlugin()    
    )
} else { //线上环境时 添加hash 并抽离css生成 css文件
    config.entry = {
        app: path.join(__dirname, "src/index.js"),
        vendor: ['vue'],//可以将vue vue-router 等 框架放在vendor.js中
    }
    config.output.filename = '[name].[chunkhash:8].js';
    //hash 和 chunkhash 的区别 
    //单独打包时  hash值时一定的 而chunkhash是每一个都有一个hash 可以重复使用vendor.js
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    "stylus-loader"
                ]
            })
        }
    );
    config.plugins.push(
        new  ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }) 
        //把webpack相关的代码打包到runtime.js 添加新的模块时，会产生新的hash值 
    )
}

module.exports = config;
