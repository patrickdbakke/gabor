"use strict";
Gabor.prototype.on = function(eventName, eventHandler, scope) {
	var that = this;
	that.__binds = that.__binds || {};
	that.__binds[eventName] = that.__binds[eventName] || [];
	that.__binds[eventName].push({
		func: eventHandler,
		scope: scope || this
	});
};
Gabor.prototype.off = function(eventName, func) {
	var that = this;
	that.__binds = that.__binds || {};
	if(that.__binds[eventName]){
		if (func) {
			that.__binds[eventName] = _.reject(that.__binds[eventName], {
				func: func
			});
		} else {
			that.__binds[eventName] = [];
		}
	}
};
Gabor.prototype.emit = function() {
	var that = this;
	var eventName = arguments[0];
	var args = [].splice.call(arguments, 1);
	
	that.__binds = that.__binds || {};
	if(that.__binds[eventName]){
		_.each(that.__binds[eventName], function(eventHandler){
			eventHandler.func.apply(eventHandler.scope, args);
		});
	}
};