const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const cssnano = require('cssnano')

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: [path.resolve(__dirname, 'src/index.tsx')],

	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less', 'json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src/components'),
			pages: path.resolve(__dirname, 'src/pages'),
			fetch: path.resolve(__dirname, 'src/fetch'),
			mock: path.resolve(__dirname, 'mock'),
			iconfont: path.resolve(__dirname, 'src/static/iconfont'),
			static: path.resolve(__dirname, 'src/static'),
			store: path.resolve(__dirname, 'src/store'),
			reducers: path.resolve(__dirname, 'src/redux/reducers'),
			utils: path.resolve(__dirname, 'src/utils'),
			public: path.resolve(__dirname, 'public')
		}
	},

	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								'@babel/preset-env',
								{ targets: { browsers: 'last 2 versions' } } // or whatever your project requires
							],
							'@babel/preset-typescript',
							'@babel/preset-react'
						],
						plugins: [
							// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
							['@babel/plugin-proposal-decorators', { legacy: true }],
							['@babel/plugin-proposal-class-properties', { loose: true }],
							'react-hot-loader/babel',
							['import', { libraryName: 'antd', style: 'css' }]
						]
					}
				}
			},
			{
				test: /\.(css|less)$/,
				exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/static')],
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'style-loader',
						options: {
							// singleton: true,
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							sourceMap: true,
							localIdentName: '[name]_[local]_[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: () => [
								// 修复flexbug
								require('postcss-flexbugs-fixes'),
								postcssImport({}),
								postcssUrl({}),
								postcssPresetEnv({}),
								cssnano({
									"cssnano-preset-advanced": {
						        zindex: false,
						        autoprefixer: false
						      },
								})
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
							  modifyVars: {
							  	'font-size-base': '14px', // 主字号
							    'primary-color': '#2c50ee', // 全局主色
							  },
							  javascriptEnabled: true,
							},
						},
					}
				]
			},
			// 针对编译外来的UI库antd的css，就要全局编译，不加css module
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/static')],
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: () => [
								postcssImport({}),
								postcssUrl({}),
								postcssPresetEnv({}),
								cssnano({
									"cssnano-preset-advanced": {
						        zindex: false,
						        autoprefixer: false
						      },
								})
							]
						}
					}
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				exclude: /node_modules/,
				loader: 'url-loader',
				options: {
					limit: 10240,
					name: 'static/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.(eot|svg|ttf|otf|woff?|woff2?)$/i,
				exclude: /node_modules/,
				loader: 'url-loader?limit=5000'
			}
		]
	},
	plugins: [
		// html 模板插件
		new htmlWebpackPlugin({
			title: '车辆下线诊断系统',
			favicon: __dirname + '/public/favicon.ico',
			template: __dirname + '/public/index.html'
		}),

		// 热加载插件
		new webpack.HotModuleReplacementPlugin(),

		// 在打包时忽略本地化内容
		new webpack.IgnorePlugin(/\/public$/),

		// 在「生产/开发」构建中使用不同的服务URL(Service URLs)
		new webpack.DefinePlugin({
			'process.env.APP_URL': JSON.stringify('http://192.168.1.136:7778')
		})
	],

	externals: {
		AMap: 'AMap'
	},

	devServer: {
		contentBase: './public', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
		historyApiFallback: true, //不跳转。在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		inline: true, //实时刷新
		hot: true,
		open: true,
		compress: true,
		port: 8088,
		proxy: {
			// 凡是 '/api' 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
			// koa 代码在  ./mock 目录中，启动命令为 npm run mock
			'/api': {
				target: 'http://localhost:3000',
				secure: false
			}
		}
	}
}
