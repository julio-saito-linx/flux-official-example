/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require('flux').Dispatcher;
var splice = Array.prototype.splice;

var dispatch_original = Dispatcher.prototype.dispatch;
Dispatcher.prototype.dispatch = function() {
	var args = splice.call(arguments, 0);
	console.debug('Dispatcher.dispatch:', args[0]);
	return dispatch_original.apply(this, args);
};

var dispatcher = new Dispatcher();
module.exports = dispatcher;
