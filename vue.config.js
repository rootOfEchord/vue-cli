const argv = require('yargs').alias('e', 'entry').argv
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const pages = require('./entry')
const entry = argv.entry || process.argv[6]
console.log(process.argv,entry)
const useRem = pages[entry].useRem || ''
const preRender = pages[entry].preRender || ''
console.log('pages', pages, entry);

module.exports = {
    publicPath: '/',
    pages: pages,
    devServer: {
        host: 'localhost',
        port: 39200, // 端口号
        // inline: false,
        // open: true, //配置自动启动浏览器
    },
    chainWebpack: config => {
        if (useRem) {
            config.module
                .rule('css')
                .test(/\.css$/)
                .oneOf('vue')
                .resourceQuery(/\?vue/)
                .use('px2rem')
                .loader('px2rem-loader')
                .options({
                    remUnit: 75,
                })
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production' && preRender) {
            console.log('222222')
            // 为生产环境修改配置...
            return {
                plugins: [
                    // 预渲染配置
                    new PrerenderSPAPlugin({
                        //要求-给的WebPack-输出应用程序的路径预渲染。
                        staticDir: path.join(__dirname, 'dist'),
                        //必需，要渲染的路线。
                        routes: ['/','/about'],
                        //必须，要使用的实际渲染器，没有则不能预编译
                        renderer: new Renderer({
                            inject: {
                                foo: 'bar'
                            },
                            headless: false, //渲染时显示浏览器窗口。对调试很有用。  
                            //等待渲染，直到检测到指定元素。
                            //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))` 
                            renderAfterDocumentEvent: 'render-event'
                        })
                    })
                ],
            }
        }
    }
}