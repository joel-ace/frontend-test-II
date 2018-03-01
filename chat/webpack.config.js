const webpack = require('webpack');

const publicFolder = `${__dirname}/public`;

module.exports = {
	devtool: 'source-map',
	entry: ['babel-polyfill', './src/index.js'],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
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
		port: 8081,
		stats: 'errors-only',
		historyApiFallback: true,
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
			sourceMap: true,
		}),
	],
};
