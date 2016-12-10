const globalConfig = require( './global.config' );
const webpackConfig = require( './webpack-dev.config' );

const path = require( 'path' );
const express = require( 'express' );
const chokidar = require( 'chokidar' );

const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );

const compiler = webpack( webpackConfig );

const devMiddleware = webpackDevMiddleware( compiler, {
	publicPath: webpackConfig.output.publicPath,
	noInfo: true,
	headers: { "Access-Control-Allow-Origin": "*" },
	stats: {
		colors: true
	}
});

const hotMiddleware = webpackHotMiddleware( compiler, {
	log: console.log,
	heartbeat: 10 * 1000,
	//timeout: 10000,
	//overlay: false
});

const app = express();
app.use( devMiddleware );
app.use( hotMiddleware );

/*
app.get( '*', function( req, res ) {
	res.sendFile( path.join( __dirname, '\\..\\..\\public\\index.html' ));
});
*/

app.listen( globalConfig.port, 'localhost', function( err ) {

	if ( err ) return console.error( err );

	chokidar
		.watch( globalConfig.watchForRefresh )
		.on( 'change', function ( path ) {
			console.log( '-> ' + path + ' has changed > perform reload' );
			hotMiddleware.publish({ action: 'reload' });
		});

	console.log( 'Listening http://' + globalConfig.host + ':' + globalConfig.port );

});
