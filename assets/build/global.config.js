const path = require( 'path' );

const globalConfig = {

  // css + js entries point
  entry: {
    app: [
    	'./assets/css/app.scss',
			'./assets/js/app.js'
		]
  },

	host: 'localhost', // server host, without http://
  port: 1337, // asset server port

  assetsPublicPath: '/assets/', // assets public path, ex: domain.com/assetpath/ => /assetpath/
  assetsPath: './public/assets/', // assets build path

	pathRoot: path.resolve( __dirname, '..', '..' ),
	pathAssets: path.resolve( __dirname, '..' ),
	pathBuild: path.resolve( __dirname ),
	pathPublic: path.resolve( __dirname, '..', '..', 'public' ),

	outputHtml: false, // if true, output an index.html page with HtmlWebpackPlugin
	genFavicon: false, // generate favicon or not
	baseFaviconPath: path.resolve( __dirname, '..', 'base-favicon.png' ),

	// file(s) who performs a page reload when modified,
	// ex: [ './app/views/*.twig', './app/controlers/*.php' ]
	watchForRefresh: [ './public/index.php' ],

	browsers: [ 'last 2 versions', 'ie > 8' ] // autoprefixer config

};

module.exports = globalConfig;
