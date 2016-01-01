(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone.marionette"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone.marionette", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["marionette-throttle"] = factory(require("backbone.marionette"), require("underscore"));
	else
		root["marionette-throttle"] = factory(root["Backbone.Marionette"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	exports.default = _backbone2.default.Behavior.extend({
	    defaults: {
	        methods: [],
	        className: 'throttled'
	    },
	    isEnabled: {},
	    toggleEl: function toggleEl(method, $el, enable) {
	        if (!this.view.isDestroyed) {
	            this.view.triggerMethod('throttle:' + method + ':disabled');

	            if ($el) {
	                // Special case forms, so that if a submit is triggered
	                // using for example an enter, the className is properly
	                // bound.
	                if ($el.is('form')) {
	                    $el.find('[type="submit"]').toggleClass(this.options.className, enable).prop('disabled', enable);
	                }

	                $el.toggleClass(this.options.className, enable).prop('disabled', enable);
	            }
	        }
	    },
	    enable: function enable(method, $el) {
	        this.isEnabled[method] = true;
	        this.toggleEl(method, $el, false);
	    },
	    disable: function disable(method, $el) {
	        this.isEnabled[method] = false;
	        this.toggleEl(method, $el, true);
	    },
	    initialize: function initialize() {
	        var _this = this;

	        _underscore2.default.each(this.options.methods, function (method) {
	            // Enable all methods.
	            _this.isEnabled[method] = true;

	            // Wrap original method.
	            _this.view[method] = (function (original) {
	                return function () {
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }

	                    var e = args[0];

	                    if (_this.isEnabled[method]) {
	                        var _ret = (function () {
	                            var xhr = original.apply(_this.view, args);
	                            var $el = null;

	                            if (e && e.currentTarget) {
	                                $el = _this.view.$(e.currentTarget);
	                            }

	                            // Prevent default action. We don't want to submit a
	                            // form for example.
	                            if (e && e.preventDefault) {
	                                e.preventDefault();
	                            }

	                            if (xhr && xhr.always) {
	                                _this.disable(method, $el);

	                                xhr.always(function () {
	                                    _this.enable(method, $el);
	                                });
	                            }

	                            return {
	                                v: xhr
	                            };
	                        })();

	                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                    }
	                };
	            })(_this.view[method]);
	        });
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;