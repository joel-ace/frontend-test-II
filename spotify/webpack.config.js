const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const publicFolder = `${__dirname}/public`;

module.exports = {
	devtool: 'source-map',
	entry: ['babel-polyfill', './src/index.js', './scss/main.scss'],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader'],
					publicPath: publicFolder,
				}),
			},
		],
	},
	output: {
		path: publicFolder,
		filename: './js/bundle.min.js',
		publicPath: '/',
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: publicFolder,
		port: 8080,
		stats: 'errors-only',
		historyApiFallback: true,
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer(),
				]
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
			sourceMap: true,
		}),
		new ExtractTextPlugin({
			filename: './css/main.css',
			disable: false,
			allChunks: true,
		}),
	],
};
