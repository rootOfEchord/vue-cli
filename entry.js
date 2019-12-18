const argv = require('yargs').alias('e', 'entry').argv
const entry = argv.entry || process.argv[6]
console.log(process.argv,entry)
console.log('process.env', process.env.NODE_ENV)
console.log('argv', argv)
console.log(process.env.NODE_ENV==='development'?'正在编译---':'正在打包---', entry)


const pages = {
	test: {
		// page 的入口
		entry: 'src/pages/test/main.js',
		// 模板来源
		template: 'src/pages/test/index.html',
		// 在 dist/index.html 的输出
		filename: 'index.html',
		// 是否使用rem移动端适配
		useRem: false,
		// 是否在build时使用预渲染
		preRender: false
	},
	home: {
		// page 的入口
		entry: 'src/pages/home/main.js',
		// 模板来源
		template: 'src/pages/home/index.html',
		// 在 dist/index.html 的输出
		filename: 'index.html',
		useRem: false,
		// 是否在build时使用预渲染
		preRender: true
	},
}
const page = {}
page[entry] = pages[entry]
module.exports = page