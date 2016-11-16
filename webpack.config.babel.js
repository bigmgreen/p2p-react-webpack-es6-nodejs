import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import glob  from 'glob';
import HtmlWebpackPlugin from'html-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
/**
 * 页面配置的数据标题和meta值
 */
import htmlHead from './client/html-head-config';
const NODE_DIR = path.resolve(__dirname, 'node_modules');

/**
 * 获取所有view
 * @param globPath 路径  './client/common/lib/bootstrap/css/bootstrap.css'
 * @returns {{base: string[]}...}
 */
var getEntry = function (globPath) {
    var entries = {
        base: ['jquery', 'bootstrap','react', 'react-dom'] // 类库
    };
    glob.sync(globPath).forEach(function (entry) {
        var pathname = entry.split('/').splice(-3, 2).join('/').split('.')[0];
        entries[pathname] = [entry];
    });
    return entries;
};

var entries = getEntry('./client/views/user/login/login.js');

/**
 * 插件配置
 * @type {*[]}
 */
var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        React: 'react',
        ReactDOM: 'react-dom'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'base',
        filename: 'js/[name].js'
    }),
    new CleanPlugin(['build']),
    // 这个是性能杀手啊 热启动直接4s+    不要它直接500ms-
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),
    new ExtractTextPlugin('css/[name].css', {
        publicPath: '../'
    })
];

/**
 * 生成多个生成HTML文件的插件配置
 */
Object.keys(entries).forEach(function (pathname) {
    if (pathname == 'base') {
        return;
    }
    var pageName = pathname.split('/').pop();
    var conf = {
        filename: './' + pageName + '.html',
        template: './client/template.html',
        inject: 'body',
        favicon: './client/common/img/favicon.ico',
        minify: {
            removeComments: true,
            collapseWhitespace: false
        },
        chunks: ['base', pathname],
        hash: false
    };

    var headInfo = htmlHead[pageName];
    if (headInfo instanceof Object) {
        conf.title= headInfo.title;
        conf.keywords= headInfo.keywords;
        conf.desc= headInfo.desc;
    } else {
        console.log(pageName + '页面配置的数据标题和meta值是' + headInfo);
    }
    // 生成HTML文件
    plugins.push(new HtmlWebpackPlugin(conf));
});


/**
 * webpack 配置
 */
module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, './build'),
        filename: 'js/[name].js'
    },
    module: {
        // noParse: [
        //     path.join(NODE_DIR, 'react/dist/react.min.js'),
        //     path.join(NODE_DIR, 'react-dom/dist/react-dom.min.js')
        // ],
        loaders: [{
            test: /\.jsx?$/,
            include: path.resolve(__dirname, 'client'),
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'url?limit=1024&name=img/[name].[ext]'
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        root: path.join(__dirname, 'client'),
        alias: {
            'react': path.join(NODE_DIR, 'react'),
            'react-dom': path.join(NODE_DIR, 'react-dom'),
            'jquery': path.join(NODE_DIR, 'jquery/dist/jquery.min.js')
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    //     jquery: 'jquery'
    // }
};
