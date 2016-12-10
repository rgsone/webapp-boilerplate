import globalConfig from './global.config';

import path from 'path';
import webpack from 'webpack';

import AssetsPlugin from 'assets-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';

import autoprefixer from 'autoprefixer';
import postcssDiscardComments from 'postcss-discard-comments'
import cssnano from 'cssnano';


const webpackProdConfig = {

	entry: globalConfig.entry,

	output: {
		path: globalConfig.assetsPath,
		publicPath: globalConfig.assetsPublicPath,
		filename: 'js/[name]-[chunkhash:8].js'
	},

	module: {

		rules: [

			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},

			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract([
					{
						loader: 'css-loader',
						query: {
							minimize: false,
							sourceMap: false,
							import: true
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						query: {
							outputStyle: 'compact',
							sourceMap: false
						}
					}
				])
			},

			{
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 1000,
					name: 'img/[name]-[hash:6].[ext]'
				}
			}

		]

	},

	plugins: [

		new CleanPlugin([ 'assets' ], {
			root: globalConfig.pathPublic,
			verbose: true,
			dry: false
		}),

		new ExtractTextPlugin({
			filename:  'css/[name]-[contenthash:8].css',
			disable: false,
			allChunks: true
		}),

		new AssetsPlugin({
			filename: 'assets.json',
			path: globalConfig.assetsPath,
			prettyPrint: false
		}),

		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({ browsers: globalConfig.browsers }),
					postcssDiscardComments({ discardComments: { removeAll: false } })
					//cssnano({ safe: true, discardComments: { removeAll: false }, colormin: true, mergedRules: true })
				]
			}
		}),

		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify( 'production' ) }
		}),

		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			beautify: false,
			comments: false,
			compress: {
				warnings: true,
				drop_console: false
			},
			mangle: {
				screw_ie8 : true,
				keep_fnames: true
			}
		})

	],

	devtool: false // 'source-map'

};

// output favicon

if ( globalConfig.genFavicon )
{
	webpackProdConfig.plugins.push(
		new FaviconsWebpackPlugin({
			logo: globalConfig.baseFaviconPath,
			prefix: 'icons-[hash:8]/',
			emitStats: true,
			statsFilename: 'iconstats.json',
			persistentCache: true,
			inject: true,
			background: '#fff',
			icons: {
				android: false,
				appleIcon: false,
				appleStartup: false,
				coast: false,
				favicons: true,
				firefox: false,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		})
	);
}

// output index.html

if ( globalConfig.outputHtml )
{
	webpackProdConfig.plugins.push(
		new HtmlPlugin({
			filename: '../index.html',
			template: './assets/index.html',
			inject: 'body'
		})
	);
}

export default webpackProdConfig;
