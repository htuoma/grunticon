/*global require:true*/
/*global Buffer:true*/
(function( exports ){
	"use strict";
	var fs = require( 'fs' );
	var path = require( 'path' );
	var RSVP = require( './rsvp' );

	var colorsRegx = /\.colors\-([^\.]+)/i;

	var isHex = function( val ){
		return (/^[0-9a-f]{3}(?:[0-9a-f]{3})?$/i).test( val );
	};

	var getColorConfig = function( str ){
		var colors = str.match( colorsRegx );
		if( colors ){
			colors = colors[ 1 ].split( "-" );
			colors.forEach( function( color, i ){
				if( isHex( color ) ){
					colors[ i ] = "#" + color;
				}
			});
			return colors;
		}
		else {
			return [];
		}
	}; //getColorConfig

	var filenameEncode = function( unencoded ){
		var buf = new Buffer( unencoded || '' );
		var encoded = buf.toString('base64');
		return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
	};

	var Gfile = function( filename ){
		if( typeof filename === "undefined" || filename === null || filename === "" ){
			throw new Error( "Must initialize Gruntifile with filename" );
		}
		var svgRegex = /\.svg$/i,
			pngRegex = /\.png$/i,
			isSvg = filename.match( svgRegex ),
			isPng = filename.match( pngRegex );

		this.filename = filename;
		this.isSvg = isSvg;
		this.filenamenoext = filename.replace( isSvg ? svgRegex : pngRegex, "" );
	};

	Gfile.prototype.setImageData = function( inputdir ){
		this.imagedata = fs.read(  inputdir + this.filename ) || "";
	};


	/**
	 * takes filename and generates other color files, loc kept as array attr
	 * returns array attr
	 */
	Gfile.prototype.generateColorFiles = function( tempdir ){
		var files = [];
		var promise = new RSVP.Promise();
		var promises = [];

		if( this.isSvg ){
			if( tempdir === undefined || tempdir === null ){
				tempdir = "";
			}
			var filename = this.filenamenoext;
			var colors = getColorConfig( filename );
			var tempFilename = path.resolve( path.join( tempdir , filename.replace( colorsRegx , "" ) ) );
			if( colors.length ){
				files.push( tempFilename + ".svg" );
				colors.forEach(function( color ){
					files.push( tempFilename + "-" + filenameEncode( color ) + ".svg" );
				});
			}
			this.colorFiles = files;
			files.forEach( function( file ){
				var p = new RSVP.Promise();
				fs.writeFile( file , function( err ){
					if( err ){
						p.reject( err );
					} else {
						p.resolve( file );
					}
				});
				promises.push( p );
			});
			RSVP.all( promises )
			.then( function( fileArr , err ){
				if( err ){
					promise.reject( err );
				}
				promise.resolve( fileArr );
			});
		} else {
			promise.resolve();
		}
		return promise;
	};

	/**
	 * Uses SVGO to compress SVG down, stores SVG in tempdir
	 */
	Gfile.prototype.compressSVG = function( tempdir ){
	};

	/**
	 * returns stats on the grunticon file as a JSON object, if
	 * stats are passed in, it melds them first
	 */
	Gfile.prototype.stats = function( stats ){
	};
	/**
	 * requires: options.outputDir (should be temp), stats.width, stats.height, stats.filenamenoext
	 * options.inputDir, stats.filename
	 *
	 * output: file location
	 */
	Gfile.prototype.renderPNG = function( stats , options ){
	};

	/**
	*
	* requires: Temporary directory (used on SVGs), pngoutput folder name,
	* output dir, output filename, pngcrushpath (as obj)
	*		crusher.crush({
	*				input: tmp + pngfolder,
	*				outputDir:  config.dest + pngfolder,
	*				crushPath: crushPath
	*			}, function( stdout , stderr ){
	* optional: callback
	*
	* returns: compressPNG location as obj
	 */
	Gfile.prototype.compressPNG = function( input, outputDir, outputFilename, crushPath, callback ){
	};

	/**
	 * reads pngFile's base64, returns base64 val with image/data prelude
	 */
	Gfile.prototype.base64PNG = function(){

	};

	/**
	 * returns relevant CSS Data, SVG as image/data, compressed base64 for png image/data,
	 * compressed png location, if data passed in, it melds appropriately
	 */
	Gfile.prototype.cssData = function( data ){
	};

	/**
	 * Deletes all temporary files created during this process
	 */
	Gfile.prototype.clean = function(){
	};
	/**
	 * Utility function for writing CSS
	 *
	 * requires: dataArray of cssData for each gruntifile
	 *           outputOpts listing the file locations to write to
	 *
	 * returns: a promise that resolves
	 */
	Gfile.writeCSS = function( dataArr, outputOpts ){
	};


	exports.grunticonFile = Gfile;
}(typeof exports === 'object' && exports || this));
