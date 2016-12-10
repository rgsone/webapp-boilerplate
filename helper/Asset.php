<?php

namespace Helper;

class Asset
{
	public static $json = null;

	public static function getPath( $assetManifestFilePath )
	{

	}

  	public static function isLocal( $localhost = 'localhost' )
	{
		if ( !is_string( $localhost ) ) throw new \Exception( '$localhost must be a string' );
		return strpos( $_SERVER[ 'HTTP_HOST' ], $localhost ) !== false;
	}
}
