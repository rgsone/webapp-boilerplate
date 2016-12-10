const webpackHotMiddlewareClient = require(
	'webpack-hot-middleware/client?path=http://localhost:1337/__webpack_hmr&reload=true'
);

webpackHotMiddlewareClient.subscribe( function( payload ) {

	if ( payload.action === 'reload' )
		window.location.reload();

});

module.exports = webpackHotMiddlewareClient;
