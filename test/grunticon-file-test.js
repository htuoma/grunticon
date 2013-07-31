/*global require:true*/
/*global exports:true*/
(function(){
	'use strict';

	var GruntiFile = require('../lib/grunticon-file.js').grunticonFile;

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
