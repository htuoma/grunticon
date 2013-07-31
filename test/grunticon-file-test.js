/*global require:true*/
/*global exports:true*/
/*global __dirname:true*/
(function(){
	'use strict';
	var path = require( 'path' );
	var fs = require( 'fs' );

	var GruntiFile = require('../lib/grunticon-file.js').grunticonFile;

	var arraysEqual = function(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;

		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	};
	/*
		======== A Handy Little Nodeunit Reference ========
		https://github.com/caolan/nodeunit

		Test methods:
			test.expect(numAssertions)
			test.done()
		Test assertions:
			test.ok(value, [message])
			test.equal(actual, expected, [message])
			test.notEqual(actual, expected, [message])
			test.deepEqual(actual, expected, [message])
			test.notDeepEqual(actual, expected, [message])
			test.strictEqual(actual, expected, [message])
			test.notStrictEqual(actual, expected, [message])
			test.throws(block, [error], [message])
			test.doesNotThrow(block, [error], [message])
			test.ifError(value)
	*/

	exports.GruntiFile = {
		setUp: function(done) {
			// setup here
			done();
		},
		'initialize no args': function( test ){
			test.throws(function(){
				var g = new GruntiFile();
			}, Error, "Must initialize Gruntifile with filename" );
			test.done();
		},
		'initialize with filename that is svg': function( test ){
			test.expect( 3 );
			var filename = "foo.svg";
			var g = new GruntiFile( filename );
			test.equal( g.filename , filename );
			test.equal( g.filenamenoext , "foo" );
			test.ok( g.isSvg );
			test.done();
		},
		'initialize with filename that is png': function( test ){
			test.expect( 3 );
			var filename = "foo.png";
			var g = new GruntiFile( filename );
			test.equal( g.filename , filename );
			test.equal( g.filenamenoext , "foo" );
			test.ok( !g.isSvg );
			test.done();
		},
		'generateColorFiles with file that has none': function( test ){
			var filename = "foo.svg";
			var g = new GruntiFile( filename );
			var testDir = path.resolve( __dirname );
			g.generateColorFiles( testDir )
			.then(function( files ){
				test.ok( arraysEqual( files, [] ) );
				test.done();
			});
		},
		'generateColorFiles with file that has colors': function( test ){
			var testDir = __dirname;
			var expectedGenFiles = [ path.resolve( path.join( testDir , 'bear.svg' ) ),
																path.resolve( path.join( testDir, 'bear-cHJpbWFyeQ.svg' )),
																path.resolve( path.join( testDir, 'bear-Ymx1ZQ.svg' )),
																path.resolve( path.join( testDir, 'bear-I2FhMDAwMA.svg' ))];
			test.expect( expectedGenFiles.length + 2 );
			var filename = "bear.colors-primary-blue-aa0000.svg";
			var g = new GruntiFile( filename );
			g.generateColorFiles( testDir )
			.then( function( files ){
				test.ok( arraysEqual( files,  expectedGenFiles ), "generated files are not as expected, actually: " + files.toString() );
				test.ok( arraysEqual( g.colorFiles, expectedGenFiles ) , "generated files not set as attr, actually: " + g.colorFiles );
				expectedGenFiles.forEach( function( file ){
					if( !fs.existsSync( file ) ){
						test.ok( false , "File doesn't exist where it should, looking for: " + file );
					} else {
						test.ok( true );
					}
				});
				test.done();
			});
		}

		/**
		'getFileContent no args': function(test) {
			test.expect(1);
			// tests here
			var fc = .getFileContent();
			fc.then( function( ){
			}, function( data ){
				test.equal(data ,  "File Not Passed" , 'should be File Not Passed.');
				test.done();
			});
		},
	 **/
	};

}());
