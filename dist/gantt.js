(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Gantt = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	unwrapExports(assign$1);

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _assign2 = _interopRequireDefault(assign$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};
	});

	var _extends$1 = unwrapExports(_extends);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty, __esModule: true };
	});

	var _Object$defineProperty = unwrapExports(defineProperty$1);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	function addChild(c, childNodes) {
	  if (c === null || c === undefined) return;

	  if (typeof c === 'string' || typeof c === 'number') {
	    childNodes.push(c.toString());
	  } else if (Array.isArray(c)) {
	    for (var i = 0; i < c.length; i++) {
	      addChild(c[i], childNodes);
	    }
	  } else {
	    childNodes.push(c);
	  }
	}

	function h(tag, props) {
	  var childNodes = [];

	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }

	  addChild(children, childNodes);

	  if (typeof tag === 'function') {
	    return tag(_extends$1({}, props, { children: childNodes }));
	  }

	  return {
	    tag: tag,
	    props: props,
	    children: childNodes
	  };
	}

	var tippy_all = createCommonjsModule(function (module, exports) {
	/*!
	* Tippy.js v2.5.3
	* (c) 2017-2018 atomiks
	* MIT
	*/
	(function (global, factory) {
		module.exports = factory();
	}(commonjsGlobal, (function () {
	var styles = ".tippy-touch{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{max-width:350px;-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[data-html]{max-width:96%;max-width:calc(100% - 20px)}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 90%;transform-origin:0 90%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-50%,25%);transform:scale(6) translate(-50%,25%);opacity:1}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1) translate(-50%,25%);transform:scale(1) translate(-50%,25%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(90deg);transform:translateY(0) rotateX(90deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -90%;transform-origin:0 -90%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-50%,-125%);transform:scale(6) translate(-50%,-125%);opacity:1}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1) translate(-50%,-125%);transform:scale(1) translate(-50%,-125%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-90deg);transform:translateY(0) rotateX(-90deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:100% 0;transform-origin:100% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(40%,-50%);transform:scale(6) translate(40%,-50%);opacity:1}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1.5) translate(40%,-50%);transform:scale(1.5) translate(40%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-90deg);transform:translateX(0) rotateY(-90deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-100% 0;transform-origin:-100% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(6) translate(-140%,-50%);transform:scale(6) translate(-140%,-50%);opacity:1}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(1.5) translate(-140%,-50%);transform:scale(1.5) translate(-140%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(90deg);transform:translateX(0) rotateY(90deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-animatefill] .tippy-content{transition:-webkit-clip-path cubic-bezier(.46,.1,.52,.98);transition:clip-path cubic-bezier(.46,.1,.52,.98);transition:clip-path cubic-bezier(.46,.1,.52,.98),-webkit-clip-path cubic-bezier(.46,.1,.52,.98)}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:26%;left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:\"\";float:left;padding-top:100%}body:not(.tippy-touch) .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(100% 100% at 50% 50%);clip-path:ellipse(100% 100% at 50% 50%)}body:not(.tippy-touch) .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(5% 50% at 50% 50%);clip-path:ellipse(5% 50% at 50% 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=right] .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(135% 100% at 0 50%);clip-path:ellipse(135% 100% at 0 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=right] .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(40% 100% at 0 50%);clip-path:ellipse(40% 100% at 0 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=left] .tippy-tooltip[data-animatefill][data-state=visible] .tippy-content{-webkit-clip-path:ellipse(135% 100% at 100% 50%);clip-path:ellipse(135% 100% at 100% 50%)}body:not(.tippy-touch) .tippy-popper[x-placement=left] .tippy-tooltip[data-animatefill][data-state=hidden] .tippy-content{-webkit-clip-path:ellipse(40% 100% at 100% 50%);clip-path:ellipse(40% 100% at 100% 50%)}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}";

	var version = "2.5.3";

	var isBrowser = typeof window !== 'undefined';

	var isIE = isBrowser && /MSIE |Trident\//.test(navigator.userAgent);

	var browser = {};

	if (isBrowser) {
	  browser.supported = 'requestAnimationFrame' in window;
	  browser.supportsTouch = 'ontouchstart' in window;
	  browser.usingTouch = false;
	  browser.dynamicInputDetection = true;
	  browser.iOS = /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream;
	  browser.onUserInputChange = function () {};
	}

	/**
	 * Selector constants used for grabbing elements
	 */
	var selectors = {
	  POPPER: '.tippy-popper',
	  TOOLTIP: '.tippy-tooltip',
	  CONTENT: '.tippy-content',
	  BACKDROP: '.tippy-backdrop',
	  ARROW: '.tippy-arrow',
	  ROUND_ARROW: '.tippy-roundarrow',
	  REFERENCE: '[data-tippy]'
	};

	var defaults = {
	  placement: 'top',
	  livePlacement: true,
	  trigger: 'mouseenter focus',
	  animation: 'shift-away',
	  html: false,
	  animateFill: true,
	  arrow: false,
	  delay: 0,
	  duration: [350, 300],
	  interactive: false,
	  interactiveBorder: 2,
	  theme: 'dark',
	  size: 'regular',
	  distance: 10,
	  offset: 0,
	  hideOnClick: true,
	  multiple: false,
	  followCursor: false,
	  inertia: false,
	  updateDuration: 350,
	  sticky: false,
	  appendTo: function appendTo() {
	    return document.body;
	  },
	  zIndex: 9999,
	  touchHold: false,
	  performance: false,
	  dynamicTitle: false,
	  flip: true,
	  flipBehavior: 'flip',
	  arrowType: 'sharp',
	  arrowTransform: '',
	  maxWidth: '',
	  target: null,
	  allowTitleHTML: true,
	  popperOptions: {},
	  createPopperInstanceOnInit: false,
	  onShow: function onShow() {},
	  onShown: function onShown() {},
	  onHide: function onHide() {},
	  onHidden: function onHidden() {}
	};

	/**
	 * The keys of the defaults object for reducing down into a new object
	 * Used in `getIndividualOptions()`
	 */
	var defaultsKeys = browser.supported && Object.keys(defaults);

	/**
	 * Determines if a value is an object literal
	 * @param {*} value
	 * @return {Boolean}
	 */
	function isObjectLiteral(value) {
	  return {}.toString.call(value) === '[object Object]';
	}

	/**
	 * Ponyfill for Array.from
	 * @param {*} value
	 * @return {Array}
	 */
	function toArray(value) {
	  return [].slice.call(value);
	}

	/**
	 * Returns an array of elements based on the selector input
	 * @param {String|Element|Element[]|NodeList|Object} selector
	 * @return {Element[]}
	 */
	function getArrayOfElements(selector) {
	  if (selector instanceof Element || isObjectLiteral(selector)) {
	    return [selector];
	  }

	  if (selector instanceof NodeList) {
	    return toArray(selector);
	  }

	  if (Array.isArray(selector)) {
	    return selector;
	  }

	  try {
	    return toArray(document.querySelectorAll(selector));
	  } catch (_) {
	    return [];
	  }
	}

	/**
	 * Polyfills needed props/methods for a virtual reference object
	 * NOTE: in v3.0 this will be pure
	 * @param {Object} reference
	 */
	function polyfillVirtualReferenceProps(reference) {
	  reference.refObj = true;
	  reference.attributes = reference.attributes || {};
	  reference.setAttribute = function (key, val) {
	    reference.attributes[key] = val;
	  };
	  reference.getAttribute = function (key) {
	    return reference.attributes[key];
	  };
	  reference.removeAttribute = function (key) {
	    delete reference.attributes[key];
	  };
	  reference.hasAttribute = function (key) {
	    return key in reference.attributes;
	  };
	  reference.addEventListener = function () {};
	  reference.removeEventListener = function () {};
	  reference.classList = {
	    classNames: {},
	    add: function add(key) {
	      return reference.classList.classNames[key] = true;
	    },
	    remove: function remove(key) {
	      delete reference.classList.classNames[key];
	      return true;
	    },
	    contains: function contains(key) {
	      return key in reference.classList.classNames;
	    }
	  };
	}

	/**
	 * Returns the supported prefixed property - only `webkit` is needed, `moz`, `ms` and `o` are obsolete
	 * @param {String} property
	 * @return {String} - browser supported prefixed property
	 */
	function prefix(property) {
	  var prefixes = ['', 'webkit'];
	  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	  for (var i = 0; i < prefixes.length; i++) {
	    var _prefix = prefixes[i];
	    var prefixedProp = _prefix ? _prefix + upperProp : property;
	    if (typeof document.body.style[prefixedProp] !== 'undefined') {
	      return prefixedProp;
	    }
	  }

	  return null;
	}

	/**
	 * Creates a div element
	 * @return {Element}
	 */
	function div() {
	  return document.createElement('div');
	}

	/**
	 * Creates a popper element then returns it
	 * @param {Number} id - the popper id
	 * @param {String} title - the tooltip's `title` attribute
	 * @param {Object} options - individual options
	 * @return {Element} - the popper element
	 */
	function createPopperElement(id, title, options) {
	  var popper = div();
	  popper.setAttribute('class', 'tippy-popper');
	  popper.setAttribute('role', 'tooltip');
	  popper.setAttribute('id', 'tippy-' + id);
	  popper.style.zIndex = options.zIndex;
	  popper.style.maxWidth = options.maxWidth;

	  var tooltip = div();
	  tooltip.setAttribute('class', 'tippy-tooltip');
	  tooltip.setAttribute('data-size', options.size);
	  tooltip.setAttribute('data-animation', options.animation);
	  tooltip.setAttribute('data-state', 'hidden');
	  options.theme.split(' ').forEach(function (t) {
	    tooltip.classList.add(t + '-theme');
	  });

	  var content = div();
	  content.setAttribute('class', 'tippy-content');

	  if (options.arrow) {
	    var arrow = div();
	    arrow.style[prefix('transform')] = options.arrowTransform;

	    if (options.arrowType === 'round') {
	      arrow.classList.add('tippy-roundarrow');
	      arrow.innerHTML = '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>';
	    } else {
	      arrow.classList.add('tippy-arrow');
	    }

	    tooltip.appendChild(arrow);
	  }

	  if (options.animateFill) {
	    // Create animateFill circle element for animation
	    tooltip.setAttribute('data-animatefill', '');
	    var backdrop = div();
	    backdrop.classList.add('tippy-backdrop');
	    backdrop.setAttribute('data-state', 'hidden');
	    tooltip.appendChild(backdrop);
	  }

	  if (options.inertia) {
	    // Change transition timing function cubic bezier
	    tooltip.setAttribute('data-inertia', '');
	  }

	  if (options.interactive) {
	    tooltip.setAttribute('data-interactive', '');
	  }

	  var html = options.html;
	  if (html) {
	    var templateId = void 0;

	    if (html instanceof Element) {
	      content.appendChild(html);
	      templateId = '#' + (html.id || 'tippy-html-template');
	    } else {
	      // trick linters: https://github.com/atomiks/tippyjs/issues/197
	      content['innerHTML'] = document.querySelector(html)['innerHTML'];
	      templateId = html;
	    }

	    popper.setAttribute('data-html', '');
	    tooltip.setAttribute('data-template-id', templateId);

	    if (options.interactive) {
	      popper.setAttribute('tabindex', '-1');
	    }
	  } else {
	    content[options.allowTitleHTML ? 'innerHTML' : 'textContent'] = title;
	  }

	  tooltip.appendChild(content);
	  popper.appendChild(tooltip);

	  return popper;
	}

	/**
	 * Creates a trigger by adding the necessary event listeners to the reference element
	 * @param {String} eventType - the custom event specified in the `trigger` setting
	 * @param {Element} reference
	 * @param {Object} handlers - the handlers for each event
	 * @param {Object} options
	 * @return {Array} - array of listener objects
	 */
	function createTrigger(eventType, reference, handlers, options) {
	  var onTrigger = handlers.onTrigger,
	      onMouseLeave = handlers.onMouseLeave,
	      onBlur = handlers.onBlur,
	      onDelegateShow = handlers.onDelegateShow,
	      onDelegateHide = handlers.onDelegateHide;

	  var listeners = [];

	  if (eventType === 'manual') return listeners;

	  var on = function on(eventType, handler) {
	    reference.addEventListener(eventType, handler);
	    listeners.push({ event: eventType, handler: handler });
	  };

	  if (!options.target) {
	    on(eventType, onTrigger);

	    if (browser.supportsTouch && options.touchHold) {
	      on('touchstart', onTrigger);
	      on('touchend', onMouseLeave);
	    }
	    if (eventType === 'mouseenter') {
	      on('mouseleave', onMouseLeave);
	    }
	    if (eventType === 'focus') {
	      on(isIE ? 'focusout' : 'blur', onBlur);
	    }
	  } else {
	    if (browser.supportsTouch && options.touchHold) {
	      on('touchstart', onDelegateShow);
	      on('touchend', onDelegateHide);
	    }
	    if (eventType === 'mouseenter') {
	      on('mouseover', onDelegateShow);
	      on('mouseout', onDelegateHide);
	    }
	    if (eventType === 'focus') {
	      on('focusin', onDelegateShow);
	      on('focusout', onDelegateHide);
	    }
	    if (eventType === 'click') {
	      on('click', onDelegateShow);
	    }
	  }

	  return listeners;
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();







	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Returns an object of settings to override global settings
	 * @param {Element} reference
	 * @param {Object} instanceOptions
	 * @return {Object} - individual options
	 */
	function getIndividualOptions(reference, instanceOptions) {
	  var options = defaultsKeys.reduce(function (acc, key) {
	    var val = reference.getAttribute('data-tippy-' + key.toLowerCase()) || instanceOptions[key];

	    // Convert strings to booleans
	    if (val === 'false') val = false;
	    if (val === 'true') val = true;

	    // Convert number strings to true numbers
	    if (isFinite(val) && !isNaN(parseFloat(val))) {
	      val = parseFloat(val);
	    }

	    // Convert array strings to actual arrays
	    if (key !== 'target' && typeof val === 'string' && val.trim().charAt(0) === '[') {
	      val = JSON.parse(val);
	    }

	    acc[key] = val;

	    return acc;
	  }, {});

	  return _extends({}, instanceOptions, options);
	}

	/**
	 * Evaluates/modifies the options object for appropriate behavior
	 * @param {Element|Object} reference
	 * @param {Object} options
	 * @return {Object} modified/evaluated options
	 */
	function evaluateOptions(reference, options) {
	  // animateFill is disabled if an arrow is true
	  if (options.arrow) {
	    options.animateFill = false;
	  }

	  if (options.appendTo && typeof options.appendTo === 'function') {
	    options.appendTo = options.appendTo();
	  }

	  if (typeof options.html === 'function') {
	    options.html = options.html(reference);
	  }

	  return options;
	}

	/**
	 * Returns inner elements of the popper element
	 * @param {Element} popper
	 * @return {Object}
	 */
	function getInnerElements(popper) {
	  var select = function select(s) {
	    return popper.querySelector(s);
	  };
	  return {
	    tooltip: select(selectors.TOOLTIP),
	    backdrop: select(selectors.BACKDROP),
	    content: select(selectors.CONTENT),
	    arrow: select(selectors.ARROW) || select(selectors.ROUND_ARROW)
	  };
	}

	/**
	 * Removes the title from an element, setting `data-original-title`
	 * appropriately
	 * @param {Element} el
	 */
	function removeTitle(el) {
	  var title = el.getAttribute('title');
	  // Only set `data-original-title` attr if there is a title
	  if (title) {
	    el.setAttribute('data-original-title', title);
	  }
	  el.removeAttribute('title');
	}

	/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.14.3
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined';

	var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	var timeoutDuration = 0;
	for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	  if (isBrowser$1 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
	    timeoutDuration = 1;
	    break;
	  }
	}

	function microtaskDebounce(fn) {
	  var called = false;
	  return function () {
	    if (called) {
	      return;
	    }
	    called = true;
	    window.Promise.resolve().then(function () {
	      called = false;
	      fn();
	    });
	  };
	}

	function taskDebounce(fn) {
	  var scheduled = false;
	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      setTimeout(function () {
	        scheduled = false;
	        fn();
	      }, timeoutDuration);
	    }
	  };
	}

	var supportsMicroTasks = isBrowser$1 && window.Promise;

	/**
	* Create a debounced version of a method, that's asynchronously deferred
	* but called in the minimum time possible.
	*
	* @method
	* @memberof Popper.Utils
	* @argument {Function} fn
	* @returns {Function}
	*/
	var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

	/**
	 * Check if the given variable is a function
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Any} functionToCheck - variable to check
	 * @returns {Boolean} answer to: is a function?
	 */
	function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	/**
	 * Get CSS computed property of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Eement} element
	 * @argument {String} property
	 */
	function getStyleComputedProperty(element, property) {
	  if (element.nodeType !== 1) {
	    return [];
	  }
	  // NOTE: 1 DOM access here
	  var css = getComputedStyle(element, null);
	  return property ? css[property] : css;
	}

	/**
	 * Returns the parentNode or the host of the element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} parent
	 */
	function getParentNode(element) {
	  if (element.nodeName === 'HTML') {
	    return element;
	  }
	  return element.parentNode || element.host;
	}

	/**
	 * Returns the scrolling parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} scroll parent
	 */
	function getScrollParent(element) {
	  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
	  if (!element) {
	    return document.body;
	  }

	  switch (element.nodeName) {
	    case 'HTML':
	    case 'BODY':
	      return element.ownerDocument.body;
	    case '#document':
	      return element.body;
	  }

	  // Firefox want us to check `-x` and `-y` variations as well

	  var _getStyleComputedProp = getStyleComputedProperty(element),
	      overflow = _getStyleComputedProp.overflow,
	      overflowX = _getStyleComputedProp.overflowX,
	      overflowY = _getStyleComputedProp.overflowY;

	  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
	    return element;
	  }

	  return getScrollParent(getParentNode(element));
	}

	var isIE11 = isBrowser$1 && !!(window.MSInputMethodContext && document.documentMode);
	var isIE10 = isBrowser$1 && /MSIE 10/.test(navigator.userAgent);

	/**
	 * Determines if the browser is Internet Explorer
	 * @method
	 * @memberof Popper.Utils
	 * @param {Number} version to check
	 * @returns {Boolean} isIE
	 */
	function isIE$1(version) {
	  if (version === 11) {
	    return isIE11;
	  }
	  if (version === 10) {
	    return isIE10;
	  }
	  return isIE11 || isIE10;
	}

	/**
	 * Returns the offset parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} offset parent
	 */
	function getOffsetParent(element) {
	  if (!element) {
	    return document.documentElement;
	  }

	  var noOffsetParent = isIE$1(10) ? document.body : null;

	  // NOTE: 1 DOM access here
	  var offsetParent = element.offsetParent;
	  // Skip hidden elements which don't have an offsetParent
	  while (offsetParent === noOffsetParent && element.nextElementSibling) {
	    offsetParent = (element = element.nextElementSibling).offsetParent;
	  }

	  var nodeName = offsetParent && offsetParent.nodeName;

	  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	    return element ? element.ownerDocument.documentElement : document.documentElement;
	  }

	  // .offsetParent will return the closest TD or TABLE in case
	  // no offsetParent is present, I hate this job...
	  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
	    return getOffsetParent(offsetParent);
	  }

	  return offsetParent;
	}

	function isOffsetContainer(element) {
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY') {
	    return false;
	  }
	  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
	}

	/**
	 * Finds the root node (document, shadowDOM root) of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} node
	 * @returns {Element} root node
	 */
	function getRoot(node) {
	  if (node.parentNode !== null) {
	    return getRoot(node.parentNode);
	  }

	  return node;
	}

	/**
	 * Finds the offset parent common to the two provided nodes
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element1
	 * @argument {Element} element2
	 * @returns {Element} common offset parent
	 */
	function findCommonOffsetParent(element1, element2) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
	    return document.documentElement;
	  }

	  // Here we make sure to give as "start" the element that comes first in the DOM
	  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  var start = order ? element1 : element2;
	  var end = order ? element2 : element1;

	  // Get common ancestor container
	  var range = document.createRange();
	  range.setStart(start, 0);
	  range.setEnd(end, 0);
	  var commonAncestorContainer = range.commonAncestorContainer;

	  // Both nodes are inside #document

	  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
	    if (isOffsetContainer(commonAncestorContainer)) {
	      return commonAncestorContainer;
	    }

	    return getOffsetParent(commonAncestorContainer);
	  }

	  // one of the nodes is inside shadowDOM, find which one
	  var element1root = getRoot(element1);
	  if (element1root.host) {
	    return findCommonOffsetParent(element1root.host, element2);
	  } else {
	    return findCommonOffsetParent(element1, getRoot(element2).host);
	  }
	}

	/**
	 * Gets the scroll value of the given element in the given side (top and left)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {String} side `top` or `left`
	 * @returns {number} amount of scrolled pixels
	 */
	function getScroll(element) {
	  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    var html = element.ownerDocument.documentElement;
	    var scrollingElement = element.ownerDocument.scrollingElement || html;
	    return scrollingElement[upperSide];
	  }

	  return element[upperSide];
	}

	/*
	 * Sum or subtract the element scroll values (left and top) from a given rect object
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} rect - Rect object you want to change
	 * @param {HTMLElement} element - The element from the function reads the scroll values
	 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
	 * @return {Object} rect - The modifier rect object
	 */
	function includeScroll(rect, element) {
	  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var scrollTop = getScroll(element, 'top');
	  var scrollLeft = getScroll(element, 'left');
	  var modifier = subtract ? -1 : 1;
	  rect.top += scrollTop * modifier;
	  rect.bottom += scrollTop * modifier;
	  rect.left += scrollLeft * modifier;
	  rect.right += scrollLeft * modifier;
	  return rect;
	}

	/*
	 * Helper to detect borders of a given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {CSSStyleDeclaration} styles
	 * Result of `getStyleComputedProperty` on the given element
	 * @param {String} axis - `x` or `y`
	 * @return {number} borders - The borders size of the given axis
	 */

	function getBordersSize(styles, axis) {
	  var sideA = axis === 'x' ? 'Left' : 'Top';
	  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
	}

	function getSize(axis, body, html, computedStyle) {
	  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE$1(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
	}

	function getWindowSizes() {
	  var body = document.body;
	  var html = document.documentElement;
	  var computedStyle = isIE$1(10) && getComputedStyle(html);

	  return {
	    height: getSize('Height', body, html, computedStyle),
	    width: getSize('Width', body, html, computedStyle)
	  };
	}

	var classCallCheck$1 = function classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass$1 = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineProperty$1 = function defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends$1 = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Given element offsets, generate an output similar to getBoundingClientRect
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} offsets
	 * @returns {Object} ClientRect like output
	 */
	function getClientRect(offsets) {
	  return _extends$1({}, offsets, {
	    right: offsets.left + offsets.width,
	    bottom: offsets.top + offsets.height
	  });
	}

	/**
	 * Get bounding client rect of given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} element
	 * @return {Object} client rect
	 */
	function getBoundingClientRect(element) {
	  var rect = {};

	  // IE10 10 FIX: Please, don't ask, the element isn't
	  // considered in DOM in some circumstances...
	  // This isn't reproducible in IE10 compatibility mode of IE11
	  try {
	    if (isIE$1(10)) {
	      rect = element.getBoundingClientRect();
	      var scrollTop = getScroll(element, 'top');
	      var scrollLeft = getScroll(element, 'left');
	      rect.top += scrollTop;
	      rect.left += scrollLeft;
	      rect.bottom += scrollTop;
	      rect.right += scrollLeft;
	    } else {
	      rect = element.getBoundingClientRect();
	    }
	  } catch (e) {}

	  var result = {
	    left: rect.left,
	    top: rect.top,
	    width: rect.right - rect.left,
	    height: rect.bottom - rect.top
	  };

	  // subtract scrollbar size from sizes
	  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
	  var width = sizes.width || element.clientWidth || result.right - result.left;
	  var height = sizes.height || element.clientHeight || result.bottom - result.top;

	  var horizScrollbar = element.offsetWidth - width;
	  var vertScrollbar = element.offsetHeight - height;

	  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	  // we make this check conditional for performance reasons
	  if (horizScrollbar || vertScrollbar) {
	    var styles = getStyleComputedProperty(element);
	    horizScrollbar -= getBordersSize(styles, 'x');
	    vertScrollbar -= getBordersSize(styles, 'y');

	    result.width -= horizScrollbar;
	    result.height -= vertScrollbar;
	  }

	  return getClientRect(result);
	}

	function getOffsetRectRelativeToArbitraryNode(children, parent) {
	  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var isIE10 = isIE$1(10);
	  var isHTML = parent.nodeName === 'HTML';
	  var childrenRect = getBoundingClientRect(children);
	  var parentRect = getBoundingClientRect(parent);
	  var scrollParent = getScrollParent(children);

	  var styles = getStyleComputedProperty(parent);
	  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
	  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

	  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
	  if (fixedPosition && parent.nodeName === 'HTML') {
	    parentRect.top = Math.max(parentRect.top, 0);
	    parentRect.left = Math.max(parentRect.left, 0);
	  }
	  var offsets = getClientRect({
	    top: childrenRect.top - parentRect.top - borderTopWidth,
	    left: childrenRect.left - parentRect.left - borderLeftWidth,
	    width: childrenRect.width,
	    height: childrenRect.height
	  });
	  offsets.marginTop = 0;
	  offsets.marginLeft = 0;

	  // Subtract margins of documentElement in case it's being used as parent
	  // we do this only on HTML because it's the only element that behaves
	  // differently when margins are applied to it. The margins are included in
	  // the box of the documentElement, in the other cases not.
	  if (!isIE10 && isHTML) {
	    var marginTop = parseFloat(styles.marginTop, 10);
	    var marginLeft = parseFloat(styles.marginLeft, 10);

	    offsets.top -= borderTopWidth - marginTop;
	    offsets.bottom -= borderTopWidth - marginTop;
	    offsets.left -= borderLeftWidth - marginLeft;
	    offsets.right -= borderLeftWidth - marginLeft;

	    // Attach marginTop and marginLeft because in some circumstances we may need them
	    offsets.marginTop = marginTop;
	    offsets.marginLeft = marginLeft;
	  }

	  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
	    offsets = includeScroll(offsets, parent);
	  }

	  return offsets;
	}

	function getViewportOffsetRectRelativeToArtbitraryNode(element) {
	  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var html = element.ownerDocument.documentElement;
	  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
	  var width = Math.max(html.clientWidth, window.innerWidth || 0);
	  var height = Math.max(html.clientHeight, window.innerHeight || 0);

	  var scrollTop = !excludeScroll ? getScroll(html) : 0;
	  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

	  var offset = {
	    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
	    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
	    width: width,
	    height: height
	  };

	  return getClientRect(offset);
	}

	/**
	 * Check if the given element is fixed or is inside a fixed parent
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {Element} customContainer
	 * @returns {Boolean} answer to "isFixed?"
	 */
	function isFixed(element) {
	  var nodeName = element.nodeName;
	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    return false;
	  }
	  if (getStyleComputedProperty(element, 'position') === 'fixed') {
	    return true;
	  }
	  return isFixed(getParentNode(element));
	}

	/**
	 * Finds the first parent of an element that has a transformed property defined
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} first transformed parent or documentElement
	 */

	function getFixedPositionOffsetParent(element) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element || !element.parentElement || isIE$1()) {
	    return document.documentElement;
	  }
	  var el = element.parentElement;
	  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
	    el = el.parentElement;
	  }
	  return el || document.documentElement;
	}

	/**
	 * Computed the boundaries limits and return them
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} popper
	 * @param {HTMLElement} reference
	 * @param {number} padding
	 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
	 * @param {Boolean} fixedPosition - Is in fixed position mode
	 * @returns {Object} Coordinates of the boundaries
	 */
	function getBoundaries(popper, reference, padding, boundariesElement) {
	  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  // NOTE: 1 DOM access here

	  var boundaries = { top: 0, left: 0 };
	  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

	  // Handle viewport case
	  if (boundariesElement === 'viewport') {
	    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
	  } else {
	    // Handle other cases based on DOM element used as boundaries
	    var boundariesNode = void 0;
	    if (boundariesElement === 'scrollParent') {
	      boundariesNode = getScrollParent(getParentNode(reference));
	      if (boundariesNode.nodeName === 'BODY') {
	        boundariesNode = popper.ownerDocument.documentElement;
	      }
	    } else if (boundariesElement === 'window') {
	      boundariesNode = popper.ownerDocument.documentElement;
	    } else {
	      boundariesNode = boundariesElement;
	    }

	    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

	    // In case of HTML, we need a different computation
	    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
	      var _getWindowSizes = getWindowSizes(),
	          height = _getWindowSizes.height,
	          width = _getWindowSizes.width;

	      boundaries.top += offsets.top - offsets.marginTop;
	      boundaries.bottom = height + offsets.top;
	      boundaries.left += offsets.left - offsets.marginLeft;
	      boundaries.right = width + offsets.left;
	    } else {
	      // for all the other DOM elements, this one is good
	      boundaries = offsets;
	    }
	  }

	  // Add paddings
	  boundaries.left += padding;
	  boundaries.top += padding;
	  boundaries.right -= padding;
	  boundaries.bottom -= padding;

	  return boundaries;
	}

	function getArea(_ref) {
	  var width = _ref.width,
	      height = _ref.height;

	  return width * height;
	}

	/**
	 * Utility used to transform the `auto` placement to the placement with more
	 * available space.
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
	  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	  if (placement.indexOf('auto') === -1) {
	    return placement;
	  }

	  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

	  var rects = {
	    top: {
	      width: boundaries.width,
	      height: refRect.top - boundaries.top
	    },
	    right: {
	      width: boundaries.right - refRect.right,
	      height: boundaries.height
	    },
	    bottom: {
	      width: boundaries.width,
	      height: boundaries.bottom - refRect.bottom
	    },
	    left: {
	      width: refRect.left - boundaries.left,
	      height: boundaries.height
	    }
	  };

	  var sortedAreas = Object.keys(rects).map(function (key) {
	    return _extends$1({
	      key: key
	    }, rects[key], {
	      area: getArea(rects[key])
	    });
	  }).sort(function (a, b) {
	    return b.area - a.area;
	  });

	  var filteredAreas = sortedAreas.filter(function (_ref2) {
	    var width = _ref2.width,
	        height = _ref2.height;
	    return width >= popper.clientWidth && height >= popper.clientHeight;
	  });

	  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

	  var variation = placement.split('-')[1];

	  return computedPlacement + (variation ? '-' + variation : '');
	}

	/**
	 * Get offsets to the reference element
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} state
	 * @param {Element} popper - the popper element
	 * @param {Element} reference - the reference element (the popper will be relative to this)
	 * @param {Element} fixedPosition - is in fixed position mode
	 * @returns {Object} An object containing the offsets which will be applied to the popper
	 */
	function getReferenceOffsets(state, popper, reference) {
	  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
	  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
	}

	/**
	 * Get the outer sizes of the given element (offset size + margins)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Object} object containing width and height properties
	 */
	function getOuterSizes(element) {
	  var styles = getComputedStyle(element);
	  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
	  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
	  var result = {
	    width: element.offsetWidth + y,
	    height: element.offsetHeight + x
	  };
	  return result;
	}

	/**
	 * Get the opposite placement of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement
	 * @returns {String} flipped placement
	 */
	function getOppositePlacement(placement) {
	  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	/**
	 * Get offsets to the popper
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} position - CSS position the Popper will get applied
	 * @param {HTMLElement} popper - the popper element
	 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
	 * @param {String} placement - one of the valid placement options
	 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
	 */
	function getPopperOffsets(popper, referenceOffsets, placement) {
	  placement = placement.split('-')[0];

	  // Get popper node sizes
	  var popperRect = getOuterSizes(popper);

	  // Add position, width and height to our offsets object
	  var popperOffsets = {
	    width: popperRect.width,
	    height: popperRect.height
	  };

	  // depending by the popper placement we have to compute its offsets slightly differently
	  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
	  var mainSide = isHoriz ? 'top' : 'left';
	  var secondarySide = isHoriz ? 'left' : 'top';
	  var measurement = isHoriz ? 'height' : 'width';
	  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

	  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
	  if (placement === secondarySide) {
	    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	  } else {
	    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	  }

	  return popperOffsets;
	}

	/**
	 * Mimics the `find` method of Array
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function find(arr, check) {
	  // use native find if supported
	  if (Array.prototype.find) {
	    return arr.find(check);
	  }

	  // use `filter` to obtain the same behavior of `find`
	  return arr.filter(check)[0];
	}

	/**
	 * Return the index of the matching object
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function findIndex(arr, prop, value) {
	  // use native findIndex if supported
	  if (Array.prototype.findIndex) {
	    return arr.findIndex(function (cur) {
	      return cur[prop] === value;
	    });
	  }

	  // use `find` + `indexOf` if `findIndex` isn't supported
	  var match = find(arr, function (obj) {
	    return obj[prop] === value;
	  });
	  return arr.indexOf(match);
	}

	/**
	 * Loop trough the list of modifiers and run them in order,
	 * each of them will then edit the data object.
	 * @method
	 * @memberof Popper.Utils
	 * @param {dataObject} data
	 * @param {Array} modifiers
	 * @param {String} ends - Optional modifier name used as stopper
	 * @returns {dataObject}
	 */
	function runModifiers(modifiers, data, ends) {
	  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

	  modifiersToRun.forEach(function (modifier) {
	    if (modifier['function']) {
	      // eslint-disable-line dot-notation
	      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
	    }
	    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
	    if (modifier.enabled && isFunction(fn)) {
	      // Add properties to offsets to make them a complete clientRect object
	      // we do this before each modifier to make sure the previous one doesn't
	      // mess with these values
	      data.offsets.popper = getClientRect(data.offsets.popper);
	      data.offsets.reference = getClientRect(data.offsets.reference);

	      data = fn(data, modifier);
	    }
	  });

	  return data;
	}

	/**
	 * Updates the position of the popper, computing the new offsets and applying
	 * the new style.<br />
	 * Prefer `scheduleUpdate` over `update` because of performance reasons.
	 * @method
	 * @memberof Popper
	 */
	function update() {
	  // if popper is destroyed, don't perform any further update
	  if (this.state.isDestroyed) {
	    return;
	  }

	  var data = {
	    instance: this,
	    styles: {},
	    arrowStyles: {},
	    attributes: {},
	    flipped: false,
	    offsets: {}
	  };

	  // compute reference element offsets
	  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

	  // store the computed placement inside `originalPlacement`
	  data.originalPlacement = data.placement;

	  data.positionFixed = this.options.positionFixed;

	  // compute the popper offsets
	  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

	  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

	  // run the modifiers
	  data = runModifiers(this.modifiers, data);

	  // the first `update` will call `onCreate` callback
	  // the other ones will call `onUpdate` callback
	  if (!this.state.isCreated) {
	    this.state.isCreated = true;
	    this.options.onCreate(data);
	  } else {
	    this.options.onUpdate(data);
	  }
	}

	/**
	 * Helper used to know if the given modifier is enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean}
	 */
	function isModifierEnabled(modifiers, modifierName) {
	  return modifiers.some(function (_ref) {
	    var name = _ref.name,
	        enabled = _ref.enabled;
	    return enabled && name === modifierName;
	  });
	}

	/**
	 * Get the prefixed supported property name
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} property (camelCase)
	 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
	 */
	function getSupportedPropertyName(property) {
	  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
	  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	  for (var i = 0; i < prefixes.length; i++) {
	    var prefix = prefixes[i];
	    var toCheck = prefix ? '' + prefix + upperProp : property;
	    if (typeof document.body.style[toCheck] !== 'undefined') {
	      return toCheck;
	    }
	  }
	  return null;
	}

	/**
	 * Destroy the popper
	 * @method
	 * @memberof Popper
	 */
	function destroy() {
	  this.state.isDestroyed = true;

	  // touch DOM only if `applyStyle` modifier is enabled
	  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
	    this.popper.removeAttribute('x-placement');
	    this.popper.style.position = '';
	    this.popper.style.top = '';
	    this.popper.style.left = '';
	    this.popper.style.right = '';
	    this.popper.style.bottom = '';
	    this.popper.style.willChange = '';
	    this.popper.style[getSupportedPropertyName('transform')] = '';
	  }

	  this.disableEventListeners();

	  // remove the popper if user explicity asked for the deletion on destroy
	  // do not use `remove` because IE11 doesn't support it
	  if (this.options.removeOnDestroy) {
	    this.popper.parentNode.removeChild(this.popper);
	  }
	  return this;
	}

	/**
	 * Get the window associated with the element
	 * @argument {Element} element
	 * @returns {Window}
	 */
	function getWindow(element) {
	  var ownerDocument = element.ownerDocument;
	  return ownerDocument ? ownerDocument.defaultView : window;
	}

	function attachToScrollParents(scrollParent, event, callback, scrollParents) {
	  var isBody = scrollParent.nodeName === 'BODY';
	  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
	  target.addEventListener(event, callback, { passive: true });

	  if (!isBody) {
	    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
	  }
	  scrollParents.push(target);
	}

	/**
	 * Setup needed event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function setupEventListeners(reference, options, state, updateBound) {
	  // Resize event listener on window
	  state.updateBound = updateBound;
	  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

	  // Scroll event listener on scroll parents
	  var scrollElement = getScrollParent(reference);
	  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
	  state.scrollElement = scrollElement;
	  state.eventsEnabled = true;

	  return state;
	}

	/**
	 * It will add resize/scroll events and start recalculating
	 * position of the popper element when they are triggered.
	 * @method
	 * @memberof Popper
	 */
	function enableEventListeners() {
	  if (!this.state.eventsEnabled) {
	    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	  }
	}

	/**
	 * Remove event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function removeEventListeners(reference, state) {
	  // Remove resize event listener on window
	  getWindow(reference).removeEventListener('resize', state.updateBound);

	  // Remove scroll event listener on scroll parents
	  state.scrollParents.forEach(function (target) {
	    target.removeEventListener('scroll', state.updateBound);
	  });

	  // Reset state
	  state.updateBound = null;
	  state.scrollParents = [];
	  state.scrollElement = null;
	  state.eventsEnabled = false;
	  return state;
	}

	/**
	 * It will remove resize/scroll events and won't recalculate popper position
	 * when they are triggered. It also won't trigger onUpdate callback anymore,
	 * unless you call `update` method manually.
	 * @method
	 * @memberof Popper
	 */
	function disableEventListeners() {
	  if (this.state.eventsEnabled) {
	    cancelAnimationFrame(this.scheduleUpdate);
	    this.state = removeEventListeners(this.reference, this.state);
	  }
	}

	/**
	 * Tells if a given input is a number
	 * @method
	 * @memberof Popper.Utils
	 * @param {*} input to check
	 * @return {Boolean}
	 */
	function isNumeric(n) {
	  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Set the style to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the style to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setStyles(element, styles) {
	  Object.keys(styles).forEach(function (prop) {
	    var unit = '';
	    // add unit if the value is numeric and is one of the following
	    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
	      unit = 'px';
	    }
	    element.style[prop] = styles[prop] + unit;
	  });
	}

	/**
	 * Set the attributes to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the attributes to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setAttributes(element, attributes) {
	  Object.keys(attributes).forEach(function (prop) {
	    var value = attributes[prop];
	    if (value !== false) {
	      element.setAttribute(prop, attributes[prop]);
	    } else {
	      element.removeAttribute(prop);
	    }
	  });
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} data.styles - List of style properties - values to apply to popper element
	 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The same data object
	 */
	function applyStyle(data) {
	  // any property present in `data.styles` will be applied to the popper,
	  // in this way we can make the 3rd party modifiers add custom styles to it
	  // Be aware, modifiers could override the properties defined in the previous
	  // lines of this modifier!
	  setStyles(data.instance.popper, data.styles);

	  // any property present in `data.attributes` will be applied to the popper,
	  // they will be set as HTML attributes of the element
	  setAttributes(data.instance.popper, data.attributes);

	  // if arrowElement is defined and arrowStyles has some properties
	  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
	    setStyles(data.arrowElement, data.arrowStyles);
	  }

	  return data;
	}

	/**
	 * Set the x-placement attribute before everything else because it could be used
	 * to add margins to the popper margins needs to be calculated to get the
	 * correct popper offsets.
	 * @method
	 * @memberof Popper.modifiers
	 * @param {HTMLElement} reference - The reference element used to position the popper
	 * @param {HTMLElement} popper - The HTML element used as popper
	 * @param {Object} options - Popper.js options
	 */
	function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
	  // compute reference element offsets
	  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

	  popper.setAttribute('x-placement', placement);

	  // Apply `position` to popper before anything else because
	  // without the position applied we can't guarantee correct computations
	  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

	  return options;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeStyle(data, options) {
	  var x = options.x,
	      y = options.y;
	  var popper = data.offsets.popper;

	  // Remove this legacy support in Popper.js v2

	  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'applyStyle';
	  }).gpuAcceleration;
	  if (legacyGpuAccelerationOption !== undefined) {
	    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
	  }
	  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

	  var offsetParent = getOffsetParent(data.instance.popper);
	  var offsetParentRect = getBoundingClientRect(offsetParent);

	  // Styles
	  var styles = {
	    position: popper.position
	  };

	  // Avoid blurry text by using full pixel integers.
	  // For pixel-perfect positioning, top/bottom prefers rounded
	  // values, while left/right prefers floored values.
	  var offsets = {
	    left: Math.floor(popper.left),
	    top: Math.round(popper.top),
	    bottom: Math.round(popper.bottom),
	    right: Math.floor(popper.right)
	  };

	  var sideA = x === 'bottom' ? 'top' : 'bottom';
	  var sideB = y === 'right' ? 'left' : 'right';

	  // if gpuAcceleration is set to `true` and transform is supported,
	  //  we use `translate3d` to apply the position to the popper we
	  // automatically use the supported prefixed version if needed
	  var prefixedProperty = getSupportedPropertyName('transform');

	  // now, let's make a step back and look at this code closely (wtf?)
	  // If the content of the popper grows once it's been positioned, it
	  // may happen that the popper gets misplaced because of the new content
	  // overflowing its reference element
	  // To avoid this problem, we provide two options (x and y), which allow
	  // the consumer to define the offset origin.
	  // If we position a popper on top of a reference element, we can set
	  // `x` to `top` to make the popper grow towards its top instead of
	  // its bottom.
	  var left = void 0,
	      top = void 0;
	  if (sideA === 'bottom') {
	    top = -offsetParentRect.height + offsets.bottom;
	  } else {
	    top = offsets.top;
	  }
	  if (sideB === 'right') {
	    left = -offsetParentRect.width + offsets.right;
	  } else {
	    left = offsets.left;
	  }
	  if (gpuAcceleration && prefixedProperty) {
	    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	    styles[sideA] = 0;
	    styles[sideB] = 0;
	    styles.willChange = 'transform';
	  } else {
	    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
	    var invertTop = sideA === 'bottom' ? -1 : 1;
	    var invertLeft = sideB === 'right' ? -1 : 1;
	    styles[sideA] = top * invertTop;
	    styles[sideB] = left * invertLeft;
	    styles.willChange = sideA + ', ' + sideB;
	  }

	  // Attributes
	  var attributes = {
	    'x-placement': data.placement
	  };

	  // Update `data` attributes, styles and arrowStyles
	  data.attributes = _extends$1({}, attributes, data.attributes);
	  data.styles = _extends$1({}, styles, data.styles);
	  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

	  return data;
	}

	/**
	 * Helper used to know if the given modifier depends from another one.<br />
	 * It checks if the needed modifier is listed and enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @param {Array} modifiers - list of modifiers
	 * @param {String} requestingName - name of requesting modifier
	 * @param {String} requestedName - name of requested modifier
	 * @returns {Boolean}
	 */
	function isModifierRequired(modifiers, requestingName, requestedName) {
	  var requesting = find(modifiers, function (_ref) {
	    var name = _ref.name;
	    return name === requestingName;
	  });

	  var isRequired = !!requesting && modifiers.some(function (modifier) {
	    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	  });

	  if (!isRequired) {
	    var _requesting = '`' + requestingName + '`';
	    var requested = '`' + requestedName + '`';
	    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
	  }
	  return isRequired;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function arrow(data, options) {
	  var _data$offsets$arrow;

	  // arrow depends on keepTogether in order to work
	  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
	    return data;
	  }

	  var arrowElement = options.element;

	  // if arrowElement is a string, suppose it's a CSS selector
	  if (typeof arrowElement === 'string') {
	    arrowElement = data.instance.popper.querySelector(arrowElement);

	    // if arrowElement is not found, don't run the modifier
	    if (!arrowElement) {
	      return data;
	    }
	  } else {
	    // if the arrowElement isn't a query selector we must check that the
	    // provided DOM node is child of its popper node
	    if (!data.instance.popper.contains(arrowElement)) {
	      console.warn('WARNING: `arrow.element` must be child of its popper element!');
	      return data;
	    }
	  }

	  var placement = data.placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

	  var len = isVertical ? 'height' : 'width';
	  var sideCapitalized = isVertical ? 'Top' : 'Left';
	  var side = sideCapitalized.toLowerCase();
	  var altSide = isVertical ? 'left' : 'top';
	  var opSide = isVertical ? 'bottom' : 'right';
	  var arrowElementSize = getOuterSizes(arrowElement)[len];

	  //
	  // extends keepTogether behavior making sure the popper and its
	  // reference have enough pixels in conjuction
	  //

	  // top/left side
	  if (reference[opSide] - arrowElementSize < popper[side]) {
	    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
	  }
	  // bottom/right side
	  if (reference[side] + arrowElementSize > popper[opSide]) {
	    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
	  }
	  data.offsets.popper = getClientRect(data.offsets.popper);

	  // compute center of the popper
	  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	  // Compute the sideValue using the updated popper offsets
	  // take popper margin in account because we don't have this info available
	  var css = getStyleComputedProperty(data.instance.popper);
	  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
	  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
	  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

	  // prevent arrowElement from being placed not contiguously to its popper
	  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	  data.arrowElement = arrowElement;
	  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

	  return data;
	}

	/**
	 * Get the opposite placement variation of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement variation
	 * @returns {String} flipped placement variation
	 */
	function getOppositeVariation(variation) {
	  if (variation === 'end') {
	    return 'start';
	  } else if (variation === 'start') {
	    return 'end';
	  }
	  return variation;
	}

	/**
	 * List of accepted placements to use as values of the `placement` option.<br />
	 * Valid placements are:
	 * - `auto`
	 * - `top`
	 * - `right`
	 * - `bottom`
	 * - `left`
	 *
	 * Each placement can have a variation from this list:
	 * - `-start`
	 * - `-end`
	 *
	 * Variations are interpreted easily if you think of them as the left to right
	 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
	 * is right.<br />
	 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
	 *
	 * Some valid examples are:
	 * - `top-end` (on top of reference, right aligned)
	 * - `right-start` (on right of reference, top aligned)
	 * - `bottom` (on bottom, centered)
	 * - `auto-right` (on the side with more space available, alignment depends by placement)
	 *
	 * @static
	 * @type {Array}
	 * @enum {String}
	 * @readonly
	 * @method placements
	 * @memberof Popper
	 */
	var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	// Get rid of `auto` `auto-start` and `auto-end`
	var validPlacements = placements.slice(3);

	/**
	 * Given an initial placement, returns all the subsequent placements
	 * clockwise (or counter-clockwise).
	 *
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement - A valid placement (it accepts variations)
	 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
	 * @returns {Array} placements including their variations
	 */
	function clockwise(placement) {
	  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var index = validPlacements.indexOf(placement);
	  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
	  return counter ? arr.reverse() : arr;
	}

	var BEHAVIORS = {
	  FLIP: 'flip',
	  CLOCKWISE: 'clockwise',
	  COUNTERCLOCKWISE: 'counterclockwise'
	};

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function flip(data, options) {
	  // if `inner` modifier is enabled, we can't use the `flip` modifier
	  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
	    return data;
	  }

	  if (data.flipped && data.placement === data.originalPlacement) {
	    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	    return data;
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

	  var placement = data.placement.split('-')[0];
	  var placementOpposite = getOppositePlacement(placement);
	  var variation = data.placement.split('-')[1] || '';

	  var flipOrder = [];

	  switch (options.behavior) {
	    case BEHAVIORS.FLIP:
	      flipOrder = [placement, placementOpposite];
	      break;
	    case BEHAVIORS.CLOCKWISE:
	      flipOrder = clockwise(placement);
	      break;
	    case BEHAVIORS.COUNTERCLOCKWISE:
	      flipOrder = clockwise(placement, true);
	      break;
	    default:
	      flipOrder = options.behavior;
	  }

	  flipOrder.forEach(function (step, index) {
	    if (placement !== step || flipOrder.length === index + 1) {
	      return data;
	    }

	    placement = data.placement.split('-')[0];
	    placementOpposite = getOppositePlacement(placement);

	    var popperOffsets = data.offsets.popper;
	    var refOffsets = data.offsets.reference;

	    // using floor because the reference offsets may contain decimals we are not going to consider here
	    var floor = Math.floor;
	    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

	    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
	    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
	    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
	    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

	    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

	    // flip the variation if required
	    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	    if (overlapsRef || overflowsBoundaries || flippedVariation) {
	      // this boolean to detect any flip loop
	      data.flipped = true;

	      if (overlapsRef || overflowsBoundaries) {
	        placement = flipOrder[index + 1];
	      }

	      if (flippedVariation) {
	        variation = getOppositeVariation(variation);
	      }

	      data.placement = placement + (variation ? '-' + variation : '');

	      // this object contains `position`, we want to preserve it along with
	      // any additional property we may add in the future
	      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

	      data = runModifiers(data.instance.modifiers, data, 'flip');
	    }
	  });
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function keepTogether(data) {
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var placement = data.placement.split('-')[0];
	  var floor = Math.floor;
	  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	  var side = isVertical ? 'right' : 'bottom';
	  var opSide = isVertical ? 'left' : 'top';
	  var measurement = isVertical ? 'width' : 'height';

	  if (popper[side] < floor(reference[opSide])) {
	    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
	  }
	  if (popper[opSide] > floor(reference[side])) {
	    data.offsets.popper[opSide] = floor(reference[side]);
	  }

	  return data;
	}

	/**
	 * Converts a string containing value + unit into a px value number
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} str - Value + unit string
	 * @argument {String} measurement - `height` or `width`
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @returns {Number|String}
	 * Value in pixels, or original string if no values were extracted
	 */
	function toValue(str, measurement, popperOffsets, referenceOffsets) {
	  // separate value from unit
	  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
	  var value = +split[1];
	  var unit = split[2];

	  // If it's not a number it's an operator, I guess
	  if (!value) {
	    return str;
	  }

	  if (unit.indexOf('%') === 0) {
	    var element = void 0;
	    switch (unit) {
	      case '%p':
	        element = popperOffsets;
	        break;
	      case '%':
	      case '%r':
	      default:
	        element = referenceOffsets;
	    }

	    var rect = getClientRect(element);
	    return rect[measurement] / 100 * value;
	  } else if (unit === 'vh' || unit === 'vw') {
	    // if is a vh or vw, we calculate the size based on the viewport
	    var size = void 0;
	    if (unit === 'vh') {
	      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    } else {
	      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    }
	    return size / 100 * value;
	  } else {
	    // if is an explicit pixel unit, we get rid of the unit and keep the value
	    // if is an implicit unit, it's px, and we return just the value
	    return value;
	  }
	}

	/**
	 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} offset
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @argument {String} basePlacement
	 * @returns {Array} a two cells array with x and y offsets in numbers
	 */
	function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
	  var offsets = [0, 0];

	  // Use height if placement is left or right and index is 0 otherwise use width
	  // in this way the first offset will use an axis and the second one
	  // will use the other one
	  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

	  // Split the offset string to obtain a list of values and operands
	  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
	  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
	    return frag.trim();
	  });

	  // Detect if the offset string contains a pair of values or a single one
	  // they could be separated by comma or space
	  var divider = fragments.indexOf(find(fragments, function (frag) {
	    return frag.search(/,|\s/) !== -1;
	  }));

	  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
	    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
	  }

	  // If divider is found, we divide the list of values and operands to divide
	  // them by ofset X and Y.
	  var splitRegex = /\s*,\s*|\s+/;
	  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

	  // Convert the values with units to absolute pixels to allow our computations
	  ops = ops.map(function (op, index) {
	    // Most of the units rely on the orientation of the popper
	    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
	    var mergeWithPrevious = false;
	    return op
	    // This aggregates any `+` or `-` sign that aren't considered operators
	    // e.g.: 10 + +5 => [10, +, +5]
	    .reduce(function (a, b) {
	      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
	        a[a.length - 1] = b;
	        mergeWithPrevious = true;
	        return a;
	      } else if (mergeWithPrevious) {
	        a[a.length - 1] += b;
	        mergeWithPrevious = false;
	        return a;
	      } else {
	        return a.concat(b);
	      }
	    }, [])
	    // Here we convert the string values into number values (in px)
	    .map(function (str) {
	      return toValue(str, measurement, popperOffsets, referenceOffsets);
	    });
	  });

	  // Loop trough the offsets arrays and execute the operations
	  ops.forEach(function (op, index) {
	    op.forEach(function (frag, index2) {
	      if (isNumeric(frag)) {
	        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
	      }
	    });
	  });
	  return offsets;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @argument {Number|String} options.offset=0
	 * The offset value as described in the modifier description
	 * @returns {Object} The data object, properly modified
	 */
	function offset(data, _ref) {
	  var offset = _ref.offset;
	  var placement = data.placement,
	      _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var basePlacement = placement.split('-')[0];

	  var offsets = void 0;
	  if (isNumeric(+offset)) {
	    offsets = [+offset, 0];
	  } else {
	    offsets = parseOffset(offset, popper, reference, basePlacement);
	  }

	  if (basePlacement === 'left') {
	    popper.top += offsets[0];
	    popper.left -= offsets[1];
	  } else if (basePlacement === 'right') {
	    popper.top += offsets[0];
	    popper.left += offsets[1];
	  } else if (basePlacement === 'top') {
	    popper.left += offsets[0];
	    popper.top -= offsets[1];
	  } else if (basePlacement === 'bottom') {
	    popper.left += offsets[0];
	    popper.top += offsets[1];
	  }

	  data.popper = popper;
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function preventOverflow(data, options) {
	  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

	  // If offsetParent is the reference element, we really want to
	  // go one step up and use the next offsetParent as reference to
	  // avoid to make this modifier completely useless and look like broken
	  if (data.instance.reference === boundariesElement) {
	    boundariesElement = getOffsetParent(boundariesElement);
	  }

	  // NOTE: DOM access here
	  // resets the popper's position so that the document size can be calculated excluding
	  // the size of the popper element itself
	  var transformProp = getSupportedPropertyName('transform');
	  var popperStyles = data.instance.popper.style; // assignment to help minification
	  var top = popperStyles.top,
	      left = popperStyles.left,
	      transform = popperStyles[transformProp];

	  popperStyles.top = '';
	  popperStyles.left = '';
	  popperStyles[transformProp] = '';

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

	  // NOTE: DOM access here
	  // restores the original style properties after the offsets have been computed
	  popperStyles.top = top;
	  popperStyles.left = left;
	  popperStyles[transformProp] = transform;

	  options.boundaries = boundaries;

	  var order = options.priority;
	  var popper = data.offsets.popper;

	  var check = {
	    primary: function primary(placement) {
	      var value = popper[placement];
	      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
	        value = Math.max(popper[placement], boundaries[placement]);
	      }
	      return defineProperty$1({}, placement, value);
	    },
	    secondary: function secondary(placement) {
	      var mainSide = placement === 'right' ? 'left' : 'top';
	      var value = popper[mainSide];
	      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	      }
	      return defineProperty$1({}, mainSide, value);
	    }
	  };

	  order.forEach(function (placement) {
	    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	    popper = _extends$1({}, popper, check[side](placement));
	  });

	  data.offsets.popper = popper;

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function shift(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var shiftvariation = placement.split('-')[1];

	  // if shift shiftvariation is specified, run the modifier
	  if (shiftvariation) {
	    var _data$offsets = data.offsets,
	        reference = _data$offsets.reference,
	        popper = _data$offsets.popper;

	    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
	    var side = isVertical ? 'left' : 'top';
	    var measurement = isVertical ? 'width' : 'height';

	    var shiftOffsets = {
	      start: defineProperty$1({}, side, reference[side]),
	      end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
	    };

	    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function hide(data) {
	  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
	    return data;
	  }

	  var refRect = data.offsets.reference;
	  var bound = find(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'preventOverflow';
	  }).boundaries;

	  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === true) {
	      return data;
	    }

	    data.hide = true;
	    data.attributes['x-out-of-boundaries'] = '';
	  } else {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === false) {
	      return data;
	    }

	    data.hide = false;
	    data.attributes['x-out-of-boundaries'] = false;
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function inner(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

	  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

	  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

	  data.placement = getOppositePlacement(placement);
	  data.offsets.popper = getClientRect(popper);

	  return data;
	}

	/**
	 * Modifier function, each modifier can have a function of this type assigned
	 * to its `fn` property.<br />
	 * These functions will be called on each update, this means that you must
	 * make sure they are performant enough to avoid performance bottlenecks.
	 *
	 * @function ModifierFn
	 * @argument {dataObject} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {dataObject} The data object, properly modified
	 */

	/**
	 * Modifiers are plugins used to alter the behavior of your poppers.<br />
	 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
	 * needed by the library.
	 *
	 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
	 * All the other properties are configurations that could be tweaked.
	 * @namespace modifiers
	 */
	var modifiers = {
	  /**
	   * Modifier used to shift the popper on the start or end of its reference
	   * element.<br />
	   * It will read the variation of the `placement` property.<br />
	   * It can be one either `-end` or `-start`.
	   * @memberof modifiers
	   * @inner
	   */
	  shift: {
	    /** @prop {number} order=100 - Index used to define the order of execution */
	    order: 100,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: shift
	  },

	  /**
	   * The `offset` modifier can shift your popper on both its axis.
	   *
	   * It accepts the following units:
	   * - `px` or unitless, interpreted as pixels
	   * - `%` or `%r`, percentage relative to the length of the reference element
	   * - `%p`, percentage relative to the length of the popper element
	   * - `vw`, CSS viewport width unit
	   * - `vh`, CSS viewport height unit
	   *
	   * For length is intended the main axis relative to the placement of the popper.<br />
	   * This means that if the placement is `top` or `bottom`, the length will be the
	   * `width`. In case of `left` or `right`, it will be the height.
	   *
	   * You can provide a single value (as `Number` or `String`), or a pair of values
	   * as `String` divided by a comma or one (or more) white spaces.<br />
	   * The latter is a deprecated method because it leads to confusion and will be
	   * removed in v2.<br />
	   * Additionally, it accepts additions and subtractions between different units.
	   * Note that multiplications and divisions aren't supported.
	   *
	   * Valid examples are:
	   * ```
	   * 10
	   * '10%'
	   * '10, 10'
	   * '10%, 10'
	   * '10 + 10%'
	   * '10 - 5vh + 3%'
	   * '-10px + 5vh, 5px - 6%'
	   * ```
	   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
	   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
	   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  offset: {
	    /** @prop {number} order=200 - Index used to define the order of execution */
	    order: 200,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: offset,
	    /** @prop {Number|String} offset=0
	     * The offset value as described in the modifier description
	     */
	    offset: 0
	  },

	  /**
	   * Modifier used to prevent the popper from being positioned outside the boundary.
	   *
	   * An scenario exists where the reference itself is not within the boundaries.<br />
	   * We can say it has "escaped the boundaries" — or just "escaped".<br />
	   * In this case we need to decide whether the popper should either:
	   *
	   * - detach from the reference and remain "trapped" in the boundaries, or
	   * - if it should ignore the boundary and "escape with its reference"
	   *
	   * When `escapeWithReference` is set to`true` and reference is completely
	   * outside its boundaries, the popper will overflow (or completely leave)
	   * the boundaries in order to remain attached to the edge of the reference.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  preventOverflow: {
	    /** @prop {number} order=300 - Index used to define the order of execution */
	    order: 300,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: preventOverflow,
	    /**
	     * @prop {Array} [priority=['left','right','top','bottom']]
	     * Popper will try to prevent overflow following these priorities by default,
	     * then, it could overflow on the left and on top of the `boundariesElement`
	     */
	    priority: ['left', 'right', 'top', 'bottom'],
	    /**
	     * @prop {number} padding=5
	     * Amount of pixel used to define a minimum distance between the boundaries
	     * and the popper this makes sure the popper has always a little padding
	     * between the edges of its container
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='scrollParent'
	     * Boundaries used by the modifier, can be `scrollParent`, `window`,
	     * `viewport` or any DOM element.
	     */
	    boundariesElement: 'scrollParent'
	  },

	  /**
	   * Modifier used to make sure the reference and its popper stay near eachothers
	   * without leaving any gap between the two. Expecially useful when the arrow is
	   * enabled and you want to assure it to point to its reference element.
	   * It cares only about the first axis, you can still have poppers with margin
	   * between the popper and its reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  keepTogether: {
	    /** @prop {number} order=400 - Index used to define the order of execution */
	    order: 400,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: keepTogether
	  },

	  /**
	   * This modifier is used to move the `arrowElement` of the popper to make
	   * sure it is positioned between the reference element and its popper element.
	   * It will read the outer size of the `arrowElement` node to detect how many
	   * pixels of conjuction are needed.
	   *
	   * It has no effect if no `arrowElement` is provided.
	   * @memberof modifiers
	   * @inner
	   */
	  arrow: {
	    /** @prop {number} order=500 - Index used to define the order of execution */
	    order: 500,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: arrow,
	    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
	    element: '[x-arrow]'
	  },

	  /**
	   * Modifier used to flip the popper's placement when it starts to overlap its
	   * reference element.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   *
	   * **NOTE:** this modifier will interrupt the current update cycle and will
	   * restart it if it detects the need to flip the placement.
	   * @memberof modifiers
	   * @inner
	   */
	  flip: {
	    /** @prop {number} order=600 - Index used to define the order of execution */
	    order: 600,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: flip,
	    /**
	     * @prop {String|Array} behavior='flip'
	     * The behavior used to change the popper's placement. It can be one of
	     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
	     * placements (with optional variations).
	     */
	    behavior: 'flip',
	    /**
	     * @prop {number} padding=5
	     * The popper will flip if it hits the edges of the `boundariesElement`
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='viewport'
	     * The element which will define the boundaries of the popper position,
	     * the popper will never be placed outside of the defined boundaries
	     * (except if keepTogether is enabled)
	     */
	    boundariesElement: 'viewport'
	  },

	  /**
	   * Modifier used to make the popper flow toward the inner of the reference element.
	   * By default, when this modifier is disabled, the popper will be placed outside
	   * the reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  inner: {
	    /** @prop {number} order=700 - Index used to define the order of execution */
	    order: 700,
	    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
	    enabled: false,
	    /** @prop {ModifierFn} */
	    fn: inner
	  },

	  /**
	   * Modifier used to hide the popper when its reference element is outside of the
	   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
	   * be used to hide with a CSS selector the popper when its reference is
	   * out of boundaries.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   * @memberof modifiers
	   * @inner
	   */
	  hide: {
	    /** @prop {number} order=800 - Index used to define the order of execution */
	    order: 800,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: hide
	  },

	  /**
	   * Computes the style that will be applied to the popper element to gets
	   * properly positioned.
	   *
	   * Note that this modifier will not touch the DOM, it just prepares the styles
	   * so that `applyStyle` modifier can apply it. This separation is useful
	   * in case you need to replace `applyStyle` with a custom implementation.
	   *
	   * This modifier has `850` as `order` value to maintain backward compatibility
	   * with previous versions of Popper.js. Expect the modifiers ordering method
	   * to change in future major versions of the library.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  computeStyle: {
	    /** @prop {number} order=850 - Index used to define the order of execution */
	    order: 850,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: computeStyle,
	    /**
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: true,
	    /**
	     * @prop {string} [x='bottom']
	     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
	     * Change this if your popper should grow in a direction different from `bottom`
	     */
	    x: 'bottom',
	    /**
	     * @prop {string} [x='left']
	     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
	     * Change this if your popper should grow in a direction different from `right`
	     */
	    y: 'right'
	  },

	  /**
	   * Applies the computed styles to the popper element.
	   *
	   * All the DOM manipulations are limited to this modifier. This is useful in case
	   * you want to integrate Popper.js inside a framework or view library and you
	   * want to delegate all the DOM manipulations to it.
	   *
	   * Note that if you disable this modifier, you must make sure the popper element
	   * has its position set to `absolute` before Popper.js can do its work!
	   *
	   * Just disable this modifier and define you own to achieve the desired effect.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  applyStyle: {
	    /** @prop {number} order=900 - Index used to define the order of execution */
	    order: 900,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: applyStyle,
	    /** @prop {Function} */
	    onLoad: applyStyleOnLoad,
	    /**
	     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: undefined
	  }
	};

	/**
	 * The `dataObject` is an object containing all the informations used by Popper.js
	 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
	 * @name dataObject
	 * @property {Object} data.instance The Popper.js instance
	 * @property {String} data.placement Placement applied to popper
	 * @property {String} data.originalPlacement Placement originally defined on init
	 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
	 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
	 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
	 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.boundaries Offsets of the popper boundaries
	 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
	 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
	 */

	/**
	 * Default options provided to Popper.js constructor.<br />
	 * These can be overriden using the `options` argument of Popper.js.<br />
	 * To override an option, simply pass as 3rd argument an object with the same
	 * structure of this object, example:
	 * ```
	 * new Popper(ref, pop, {
	 *   modifiers: {
	 *     preventOverflow: { enabled: false }
	 *   }
	 * })
	 * ```
	 * @type {Object}
	 * @static
	 * @memberof Popper
	 */
	var Defaults = {
	  /**
	   * Popper's placement
	   * @prop {Popper.placements} placement='bottom'
	   */
	  placement: 'bottom',

	  /**
	   * Set this to true if you want popper to position it self in 'fixed' mode
	   * @prop {Boolean} positionFixed=false
	   */
	  positionFixed: false,

	  /**
	   * Whether events (resize, scroll) are initially enabled
	   * @prop {Boolean} eventsEnabled=true
	   */
	  eventsEnabled: true,

	  /**
	   * Set to true if you want to automatically remove the popper when
	   * you call the `destroy` method.
	   * @prop {Boolean} removeOnDestroy=false
	   */
	  removeOnDestroy: false,

	  /**
	   * Callback called when the popper is created.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onCreate}
	   */
	  onCreate: function onCreate() {},

	  /**
	   * Callback called when the popper is updated, this callback is not called
	   * on the initialization/creation of the popper, but only on subsequent
	   * updates.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onUpdate}
	   */
	  onUpdate: function onUpdate() {},

	  /**
	   * List of modifiers used to modify the offsets before they are applied to the popper.
	   * They provide most of the functionalities of Popper.js
	   * @prop {modifiers}
	   */
	  modifiers: modifiers
	};

	/**
	 * @callback onCreate
	 * @param {dataObject} data
	 */

	/**
	 * @callback onUpdate
	 * @param {dataObject} data
	 */

	// Utils
	// Methods
	var Popper = function () {
	  /**
	   * Create a new Popper.js instance
	   * @class Popper
	   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
	   * @param {HTMLElement} popper - The HTML element used as popper.
	   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
	   * @return {Object} instance - The generated Popper.js instance
	   */
	  function Popper(reference, popper) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    classCallCheck$1(this, Popper);

	    this.scheduleUpdate = function () {
	      return requestAnimationFrame(_this.update);
	    };

	    // make update() debounced, so that it only runs at most once-per-tick
	    this.update = debounce(this.update.bind(this));

	    // with {} we create a new object with the options inside it
	    this.options = _extends$1({}, Popper.Defaults, options);

	    // init state
	    this.state = {
	      isDestroyed: false,
	      isCreated: false,
	      scrollParents: []
	    };

	    // get reference and popper elements (allow jQuery wrappers)
	    this.reference = reference && reference.jquery ? reference[0] : reference;
	    this.popper = popper && popper.jquery ? popper[0] : popper;

	    // Deep merge modifiers options
	    this.options.modifiers = {};
	    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
	      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
	    });

	    // Refactoring modifiers' list (Object => Array)
	    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
	      return _extends$1({
	        name: name
	      }, _this.options.modifiers[name]);
	    })
	    // sort the modifiers by order
	    .sort(function (a, b) {
	      return a.order - b.order;
	    });

	    // modifiers have the ability to execute arbitrary code when Popper.js get inited
	    // such code is executed in the same order of its modifier
	    // they could add new properties to their options configuration
	    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
	    this.modifiers.forEach(function (modifierOptions) {
	      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
	        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
	      }
	    });

	    // fire the first update to position the popper in the right place
	    this.update();

	    var eventsEnabled = this.options.eventsEnabled;
	    if (eventsEnabled) {
	      // setup event listeners, they will take care of update the position in specific situations
	      this.enableEventListeners();
	    }

	    this.state.eventsEnabled = eventsEnabled;
	  }

	  // We can't use class properties because they don't get listed in the
	  // class prototype and break stuff like Sinon stubs


	  createClass$1(Popper, [{
	    key: 'update',
	    value: function update$$1() {
	      return update.call(this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy$$1() {
	      return destroy.call(this);
	    }
	  }, {
	    key: 'enableEventListeners',
	    value: function enableEventListeners$$1() {
	      return enableEventListeners.call(this);
	    }
	  }, {
	    key: 'disableEventListeners',
	    value: function disableEventListeners$$1() {
	      return disableEventListeners.call(this);
	    }

	    /**
	     * Schedule an update, it will run on the next UI update available
	     * @method scheduleUpdate
	     * @memberof Popper
	     */

	    /**
	     * Collection of utilities useful when writing custom modifiers.
	     * Starting from version 1.7, this method is available only if you
	     * include `popper-utils.js` before `popper.js`.
	     *
	     * **DEPRECATION**: This way to access PopperUtils is deprecated
	     * and will be removed in v2! Use the PopperUtils module directly instead.
	     * Due to the high instability of the methods contained in Utils, we can't
	     * guarantee them to follow semver. Use them at your own risk!
	     * @static
	     * @private
	     * @type {Object}
	     * @deprecated since version 1.8
	     * @member Utils
	     * @memberof Popper
	     */

	  }]);
	  return Popper;
	}();

	/**
	 * The `referenceObject` is an object that provides an interface compatible with Popper.js
	 * and lets you use it as replacement of a real DOM node.<br />
	 * You can use this method to position a popper relatively to a set of coordinates
	 * in case you don't have a DOM node to use as reference.
	 *
	 * ```
	 * new Popper(referenceObject, popperNode);
	 * ```
	 *
	 * NB: This feature isn't supported in Internet Explorer 10
	 * @name referenceObject
	 * @property {Function} data.getBoundingClientRect
	 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
	 * @property {number} data.clientWidth
	 * An ES6 getter that will return the width of the virtual reference element.
	 * @property {number} data.clientHeight
	 * An ES6 getter that will return the height of the virtual reference element.
	 */

	Popper.Utils = (typeof window !== 'undefined' ? window : commonjsGlobal).PopperUtils;
	Popper.placements = placements;
	Popper.Defaults = Defaults;

	/**
	 * Triggers document reflow.
	 * Use void because some minifiers or engines think simply accessing the property
	 * is unnecessary.
	 * @param {Element} popper
	 */
	function reflow(popper) {
	  void popper.offsetHeight;
	}

	/**
	 * Wrapper util for popper position updating.
	 * Updates the popper's position and invokes the callback on update.
	 * Hackish workaround until Popper 2.0's update() becomes sync.
	 * @param {Popper} popperInstance
	 * @param {Function} callback: to run once popper's position was updated
	 * @param {Boolean} updateAlreadyCalled: was scheduleUpdate() already called?
	 */
	function updatePopperPosition(popperInstance, callback, updateAlreadyCalled) {
	  var popper = popperInstance.popper,
	      options = popperInstance.options;

	  var onCreate = options.onCreate;
	  var onUpdate = options.onUpdate;

	  options.onCreate = options.onUpdate = function () {
	    reflow(popper), callback && callback(), onUpdate();
	    options.onCreate = onCreate;
	    options.onUpdate = onUpdate;
	  };

	  if (!updateAlreadyCalled) {
	    popperInstance.scheduleUpdate();
	  }
	}

	/**
	 * Returns the core placement ('top', 'bottom', 'left', 'right') of a popper
	 * @param {Element} popper
	 * @return {String}
	 */
	function getPopperPlacement(popper) {
	  return popper.getAttribute('x-placement').replace(/-.+/, '');
	}

	/**
	 * Determines if the mouse's cursor is outside the interactive border
	 * @param {MouseEvent} event
	 * @param {Element} popper
	 * @param {Object} options
	 * @return {Boolean}
	 */
	function cursorIsOutsideInteractiveBorder(event, popper, options) {
	  if (!popper.getAttribute('x-placement')) return true;

	  var x = event.clientX,
	      y = event.clientY;
	  var interactiveBorder = options.interactiveBorder,
	      distance = options.distance;


	  var rect = popper.getBoundingClientRect();
	  var placement = getPopperPlacement(popper);
	  var borderWithDistance = interactiveBorder + distance;

	  var exceeds = {
	    top: rect.top - y > interactiveBorder,
	    bottom: y - rect.bottom > interactiveBorder,
	    left: rect.left - x > interactiveBorder,
	    right: x - rect.right > interactiveBorder
	  };

	  switch (placement) {
	    case 'top':
	      exceeds.top = rect.top - y > borderWithDistance;
	      break;
	    case 'bottom':
	      exceeds.bottom = y - rect.bottom > borderWithDistance;
	      break;
	    case 'left':
	      exceeds.left = rect.left - x > borderWithDistance;
	      break;
	    case 'right':
	      exceeds.right = x - rect.right > borderWithDistance;
	      break;
	  }

	  return exceeds.top || exceeds.bottom || exceeds.left || exceeds.right;
	}

	/**
	 * Transforms the `arrowTransform` numbers based on the placement axis
	 * @param {String} type 'scale' or 'translate'
	 * @param {Number[]} numbers
	 * @param {Boolean} isVertical
	 * @param {Boolean} isReverse
	 * @return {String}
	 */
	function transformNumbersBasedOnPlacementAxis(type, numbers, isVertical, isReverse) {
	  if (!numbers.length) return '';

	  var transforms = {
	    scale: function () {
	      if (numbers.length === 1) {
	        return '' + numbers[0];
	      } else {
	        return isVertical ? numbers[0] + ', ' + numbers[1] : numbers[1] + ', ' + numbers[0];
	      }
	    }(),
	    translate: function () {
	      if (numbers.length === 1) {
	        return isReverse ? -numbers[0] + 'px' : numbers[0] + 'px';
	      } else {
	        if (isVertical) {
	          return isReverse ? numbers[0] + 'px, ' + -numbers[1] + 'px' : numbers[0] + 'px, ' + numbers[1] + 'px';
	        } else {
	          return isReverse ? -numbers[1] + 'px, ' + numbers[0] + 'px' : numbers[1] + 'px, ' + numbers[0] + 'px';
	        }
	      }
	    }()
	  };

	  return transforms[type];
	}

	/**
	 * Transforms the `arrowTransform` x or y axis based on the placement axis
	 * @param {String} axis 'X', 'Y', ''
	 * @param {Boolean} isVertical
	 * @return {String}
	 */
	function transformAxis(axis, isVertical) {
	  if (!axis) return '';
	  var map = {
	    X: 'Y',
	    Y: 'X'
	  };
	  return isVertical ? axis : map[axis];
	}

	/**
	 * Computes and applies the necessary arrow transform
	 * @param {Element} popper
	 * @param {Element} arrow
	 * @param {String} arrowTransform
	 */
	function computeArrowTransform(popper, arrow, arrowTransform) {
	  var placement = getPopperPlacement(popper);
	  var isVertical = placement === 'top' || placement === 'bottom';
	  var isReverse = placement === 'right' || placement === 'bottom';

	  var getAxis = function getAxis(re) {
	    var match = arrowTransform.match(re);
	    return match ? match[1] : '';
	  };

	  var getNumbers = function getNumbers(re) {
	    var match = arrowTransform.match(re);
	    return match ? match[1].split(',').map(parseFloat) : [];
	  };

	  var re = {
	    translate: /translateX?Y?\(([^)]+)\)/,
	    scale: /scaleX?Y?\(([^)]+)\)/
	  };

	  var matches = {
	    translate: {
	      axis: getAxis(/translate([XY])/),
	      numbers: getNumbers(re.translate)
	    },
	    scale: {
	      axis: getAxis(/scale([XY])/),
	      numbers: getNumbers(re.scale)
	    }
	  };

	  var computedTransform = arrowTransform.replace(re.translate, 'translate' + transformAxis(matches.translate.axis, isVertical) + '(' + transformNumbersBasedOnPlacementAxis('translate', matches.translate.numbers, isVertical, isReverse) + ')').replace(re.scale, 'scale' + transformAxis(matches.scale.axis, isVertical) + '(' + transformNumbersBasedOnPlacementAxis('scale', matches.scale.numbers, isVertical, isReverse) + ')');

	  arrow.style[prefix('transform')] = computedTransform;
	}

	/**
	 * Returns the distance taking into account the default distance due to
	 * the transform: translate setting in CSS
	 * @param {Number} distance
	 * @return {String}
	 */
	function getOffsetDistanceInPx(distance) {
	  return -(distance - defaults.distance) + 'px';
	}

	/**
	 * Waits until next repaint to execute a fn
	 * @param {Function} fn
	 */
	function defer(fn) {
	  requestAnimationFrame(function () {
	    setTimeout(fn, 1);
	  });
	}

	var matches = {};

	if (isBrowser) {
	  var e = Element.prototype;
	  matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function (s) {
	    var matches = (this.document || this.ownerDocument).querySelectorAll(s);
	    var i = matches.length;
	    while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-empty
	    return i > -1;
	  };
	}

	var matches$1 = matches;

	/**
	 * Ponyfill to get the closest parent element
	 * @param {Element} element - child of parent to be returned
	 * @param {String} parentSelector - selector to match the parent if found
	 * @return {Element}
	 */
	function closest(element, parentSelector) {
	  var fn = Element.prototype.closest || function (selector) {
	    var el = this;
	    while (el) {
	      if (matches$1.call(el, selector)) {
	        return el;
	      }
	      el = el.parentElement;
	    }
	  };

	  return fn.call(element, parentSelector);
	}

	/**
	 * Returns the value taking into account the value being either a number or array
	 * @param {Number|Array} value
	 * @param {Number} index
	 * @return {Number}
	 */
	function getValue(value, index) {
	  return Array.isArray(value) ? value[index] : value;
	}

	/**
	 * Sets the visibility state of an element for transition to begin
	 * @param {Element[]} els - array of elements
	 * @param {String} type - 'visible' or 'hidden'
	 */
	function setVisibilityState(els, type) {
	  els.forEach(function (el) {
	    if (!el) return;
	    el.setAttribute('data-state', type);
	  });
	}

	/**
	 * Sets the transition property to each element
	 * @param {Element[]} els - Array of elements
	 * @param {String} value
	 */
	function applyTransitionDuration(els, value) {
	  els.filter(Boolean).forEach(function (el) {
	    el.style[prefix('transitionDuration')] = value + 'ms';
	  });
	}

	/**
	 * Focuses an element while preventing a scroll jump if it's not entirely within the viewport
	 * @param {Element} el
	 */
	function focus(el) {
	  var x = window.scrollX || window.pageXOffset;
	  var y = window.scrollY || window.pageYOffset;
	  el.focus();
	  scroll(x, y);
	}

	var key = {};
	var store = function store(data) {
	  return function (k) {
	    return k === key && data;
	  };
	};

	var Tippy = function () {
	  function Tippy(config) {
	    classCallCheck(this, Tippy);

	    for (var _key in config) {
	      this[_key] = config[_key];
	    }

	    this.state = {
	      destroyed: false,
	      visible: false,
	      enabled: true
	    };

	    this._ = store({
	      mutationObservers: []
	    });
	  }

	  /**
	   * Enables the tooltip to allow it to show or hide
	   * @memberof Tippy
	   * @public
	   */


	  createClass(Tippy, [{
	    key: 'enable',
	    value: function enable() {
	      this.state.enabled = true;
	    }

	    /**
	     * Disables the tooltip from showing or hiding, but does not destroy it
	     * @memberof Tippy
	     * @public
	     */

	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.state.enabled = false;
	    }

	    /**
	     * Shows the tooltip
	     * @param {Number} duration in milliseconds
	     * @memberof Tippy
	     * @public
	     */

	  }, {
	    key: 'show',
	    value: function show(duration) {
	      var _this = this;

	      if (this.state.destroyed || !this.state.enabled) return;

	      var popper = this.popper,
	          reference = this.reference,
	          options = this.options;

	      var _getInnerElements = getInnerElements(popper),
	          tooltip = _getInnerElements.tooltip,
	          backdrop = _getInnerElements.backdrop,
	          content = _getInnerElements.content;

	      // If the `dynamicTitle` option is true, the instance is allowed
	      // to be created with an empty title. Make sure that the tooltip
	      // content is not empty before showing it


	      if (options.dynamicTitle && !reference.getAttribute('data-original-title')) {
	        return;
	      }

	      // Do not show tooltip if reference contains 'disabled' attribute. FF fix for #221
	      if (reference.hasAttribute('disabled')) return;

	      // Destroy tooltip if the reference element is no longer on the DOM
	      if (!reference.refObj && !document.documentElement.contains(reference)) {
	        this.destroy();
	        return;
	      }

	      options.onShow.call(popper, this);

	      duration = getValue(duration !== undefined ? duration : options.duration, 0);

	      // Prevent a transition when popper changes position
	      applyTransitionDuration([popper, tooltip, backdrop], 0);

	      popper.style.visibility = 'visible';
	      this.state.visible = true;

	      _mount.call(this, function () {
	        if (!_this.state.visible) return;

	        if (!_hasFollowCursorBehavior.call(_this)) {
	          // FIX: Arrow will sometimes not be positioned correctly. Force another update.
	          _this.popperInstance.scheduleUpdate();
	        }

	        // Set initial position near the cursor
	        if (_hasFollowCursorBehavior.call(_this)) {
	          _this.popperInstance.disableEventListeners();
	          var delay = getValue(options.delay, 0);
	          var lastTriggerEvent = _this._(key).lastTriggerEvent;
	          if (lastTriggerEvent) {
	            _this._(key).followCursorListener(delay && _this._(key).lastMouseMoveEvent ? _this._(key).lastMouseMoveEvent : lastTriggerEvent);
	          }
	        }

	        // Re-apply transition durations
	        applyTransitionDuration([tooltip, backdrop, backdrop ? content : null], duration);

	        if (backdrop) {
	          getComputedStyle(backdrop)[prefix('transform')];
	        }

	        if (options.interactive) {
	          reference.classList.add('tippy-active');
	        }

	        if (options.sticky) {
	          _makeSticky.call(_this);
	        }

	        setVisibilityState([tooltip, backdrop], 'visible');

	        _onTransitionEnd.call(_this, duration, function () {
	          if (!options.updateDuration) {
	            tooltip.classList.add('tippy-notransition');
	          }

	          if (options.interactive) {
	            focus(popper);
	          }

	          reference.setAttribute('aria-describedby', 'tippy-' + _this.id);

	          options.onShown.call(popper, _this);
	        });
	      });
	    }

	    /**
	     * Hides the tooltip
	     * @param {Number} duration in milliseconds
	     * @memberof Tippy
	     * @public
	     */

	  }, {
	    key: 'hide',
	    value: function hide(duration) {
	      var _this2 = this;

	      if (this.state.destroyed || !this.state.enabled) return;

	      var popper = this.popper,
	          reference = this.reference,
	          options = this.options;

	      var _getInnerElements2 = getInnerElements(popper),
	          tooltip = _getInnerElements2.tooltip,
	          backdrop = _getInnerElements2.backdrop,
	          content = _getInnerElements2.content;

	      options.onHide.call(popper, this);

	      duration = getValue(duration !== undefined ? duration : options.duration, 1);

	      if (!options.updateDuration) {
	        tooltip.classList.remove('tippy-notransition');
	      }

	      if (options.interactive) {
	        reference.classList.remove('tippy-active');
	      }

	      popper.style.visibility = 'hidden';
	      this.state.visible = false;

	      applyTransitionDuration([tooltip, backdrop, backdrop ? content : null], duration);

	      setVisibilityState([tooltip, backdrop], 'hidden');

	      if (options.interactive && options.trigger.indexOf('click') > -1) {
	        focus(reference);
	      }

	      /*
	      * This call is deferred because sometimes when the tooltip is still transitioning in but hide()
	      * is called before it finishes, the CSS transition won't reverse quickly enough, meaning
	      * the CSS transition will finish 1-2 frames later, and onHidden() will run since the JS set it
	      * more quickly. It should actually be onShown(). Seems to be something Chrome does, not Safari
	      */
	      defer(function () {
	        _onTransitionEnd.call(_this2, duration, function () {
	          if (_this2.state.visible || !options.appendTo.contains(popper)) return;

	          if (!_this2._(key).isPreparingToShow) {
	            document.removeEventListener('mousemove', _this2._(key).followCursorListener);
	            _this2._(key).lastMouseMoveEvent = null;
	          }

	          if (_this2.popperInstance) {
	            _this2.popperInstance.disableEventListeners();
	          }

	          reference.removeAttribute('aria-describedby');

	          options.appendTo.removeChild(popper);

	          options.onHidden.call(popper, _this2);
	        });
	      });
	    }

	    /**
	     * Destroys the tooltip instance
	     * @param {Boolean} destroyTargetInstances - relevant only when destroying delegates
	     * @memberof Tippy
	     * @public
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      var destroyTargetInstances = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      if (this.state.destroyed) return;

	      // Ensure the popper is hidden
	      if (this.state.visible) {
	        this.hide(0);
	      }

	      this.listeners.forEach(function (listener) {
	        _this3.reference.removeEventListener(listener.event, listener.handler);
	      });

	      // Restore title
	      if (this.title) {
	        this.reference.setAttribute('title', this.title);
	      }

	      delete this.reference._tippy;

	      var attributes = ['data-original-title', 'data-tippy', 'data-tippy-delegate'];
	      attributes.forEach(function (attr) {
	        _this3.reference.removeAttribute(attr);
	      });

	      if (this.options.target && destroyTargetInstances) {
	        toArray(this.reference.querySelectorAll(this.options.target)).forEach(function (child) {
	          return child._tippy && child._tippy.destroy();
	        });
	      }

	      if (this.popperInstance) {
	        this.popperInstance.destroy();
	      }

	      this._(key).mutationObservers.forEach(function (observer) {
	        observer.disconnect();
	      });

	      this.state.destroyed = true;
	    }
	  }]);
	  return Tippy;
	}();

	/**
	 * ------------------------------------------------------------------------
	 * Private methods
	 * ------------------------------------------------------------------------
	 * Standalone functions to be called with the instance's `this` context to make
	 * them truly private and not accessible on the prototype
	 */

	/**
	 * Determines if the tooltip instance has followCursor behavior
	 * @return {Boolean}
	 * @memberof Tippy
	 * @private
	 */
	function _hasFollowCursorBehavior() {
	  var lastTriggerEvent = this._(key).lastTriggerEvent;
	  return this.options.followCursor && !browser.usingTouch && lastTriggerEvent && lastTriggerEvent.type !== 'focus';
	}

	/**
	 * Creates the Tippy instance for the child target of the delegate container
	 * @param {Event} event
	 * @memberof Tippy
	 * @private
	 */
	function _createDelegateChildTippy(event) {
	  var targetEl = closest(event.target, this.options.target);
	  if (targetEl && !targetEl._tippy) {
	    var title = targetEl.getAttribute('title') || this.title;
	    if (title) {
	      targetEl.setAttribute('title', title);
	      tippy(targetEl, _extends({}, this.options, { target: null }));
	      _enter.call(targetEl._tippy, event);
	    }
	  }
	}

	/**
	 * Method used by event listeners to invoke the show method, taking into account delays and
	 * the `wait` option
	 * @param {Event} event
	 * @memberof Tippy
	 * @private
	 */
	function _enter(event) {
	  var _this4 = this;

	  var options = this.options;


	  _clearDelayTimeouts.call(this);

	  if (this.state.visible) return;

	  // Is a delegate, create Tippy instance for the child target
	  if (options.target) {
	    _createDelegateChildTippy.call(this, event);
	    return;
	  }

	  this._(key).isPreparingToShow = true;

	  if (options.wait) {
	    options.wait.call(this.popper, this.show.bind(this), event);
	    return;
	  }

	  // If the tooltip has a delay, we need to be listening to the mousemove as soon as the trigger
	  // event is fired so that it's in the correct position upon mount.
	  if (_hasFollowCursorBehavior.call(this)) {
	    if (!this._(key).followCursorListener) {
	      _setFollowCursorListener.call(this);
	    }

	    var _getInnerElements3 = getInnerElements(this.popper),
	        arrow = _getInnerElements3.arrow;

	    if (arrow) arrow.style.margin = '0';
	    document.addEventListener('mousemove', this._(key).followCursorListener);
	  }

	  var delay = getValue(options.delay, 0);

	  if (delay) {
	    this._(key).showTimeout = setTimeout(function () {
	      _this4.show();
	    }, delay);
	  } else {
	    this.show();
	  }
	}

	/**
	 * Method used by event listeners to invoke the hide method, taking into account delays
	 * @memberof Tippy
	 * @private
	 */
	function _leave() {
	  var _this5 = this;

	  _clearDelayTimeouts.call(this);

	  if (!this.state.visible) return;

	  this._(key).isPreparingToShow = false;

	  var delay = getValue(this.options.delay, 1);

	  if (delay) {
	    this._(key).hideTimeout = setTimeout(function () {
	      if (_this5.state.visible) {
	        _this5.hide();
	      }
	    }, delay);
	  } else {
	    this.hide();
	  }
	}

	/**
	 * Returns relevant listeners for the instance
	 * @return {Object} of listeners
	 * @memberof Tippy
	 * @private
	 */
	function _getEventListeners() {
	  var _this6 = this;

	  var onTrigger = function onTrigger(event) {
	    if (!_this6.state.enabled) return;

	    var shouldStopEvent = browser.supportsTouch && browser.usingTouch && ['mouseenter', 'mouseover', 'focus'].indexOf(event.type) > -1;

	    if (shouldStopEvent && _this6.options.touchHold) return;

	    _this6._(key).lastTriggerEvent = event;

	    // Toggle show/hide when clicking click-triggered tooltips
	    if (event.type === 'click' && _this6.options.hideOnClick !== 'persistent' && _this6.state.visible) {
	      _leave.call(_this6);
	    } else {
	      _enter.call(_this6, event);
	    }
	  };

	  var onMouseLeave = function onMouseLeave(event) {
	    if (['mouseleave', 'mouseout'].indexOf(event.type) > -1 && browser.supportsTouch && browser.usingTouch && _this6.options.touchHold) return;

	    if (_this6.options.interactive) {
	      var hide = _leave.bind(_this6);

	      var onMouseMove = function onMouseMove(event) {
	        var referenceCursorIsOver = closest(event.target, selectors.REFERENCE);
	        var cursorIsOverPopper = closest(event.target, selectors.POPPER) === _this6.popper;
	        var cursorIsOverReference = referenceCursorIsOver === _this6.reference;

	        if (cursorIsOverPopper || cursorIsOverReference) return;

	        if (cursorIsOutsideInteractiveBorder(event, _this6.popper, _this6.options)) {
	          document.body.removeEventListener('mouseleave', hide);
	          document.removeEventListener('mousemove', onMouseMove);

	          _leave.call(_this6, onMouseMove);
	        }
	      };

	      document.body.addEventListener('mouseleave', hide);
	      document.addEventListener('mousemove', onMouseMove);
	      return;
	    }

	    _leave.call(_this6);
	  };

	  var onBlur = function onBlur(event) {
	    if (event.target !== _this6.reference || browser.usingTouch) return;

	    if (_this6.options.interactive) {
	      if (!event.relatedTarget) return;
	      if (closest(event.relatedTarget, selectors.POPPER)) return;
	    }

	    _leave.call(_this6);
	  };

	  var onDelegateShow = function onDelegateShow(event) {
	    if (closest(event.target, _this6.options.target)) {
	      _enter.call(_this6, event);
	    }
	  };

	  var onDelegateHide = function onDelegateHide(event) {
	    if (closest(event.target, _this6.options.target)) {
	      _leave.call(_this6);
	    }
	  };

	  return {
	    onTrigger: onTrigger,
	    onMouseLeave: onMouseLeave,
	    onBlur: onBlur,
	    onDelegateShow: onDelegateShow,
	    onDelegateHide: onDelegateHide
	  };
	}

	/**
	 * Creates and returns a new popper instance
	 * @return {Popper}
	 * @memberof Tippy
	 * @private
	 */
	function _createPopperInstance() {
	  var _this7 = this;

	  var popper = this.popper,
	      reference = this.reference,
	      options = this.options;

	  var _getInnerElements4 = getInnerElements(popper),
	      tooltip = _getInnerElements4.tooltip;

	  var popperOptions = options.popperOptions;

	  var arrowSelector = options.arrowType === 'round' ? selectors.ROUND_ARROW : selectors.ARROW;
	  var arrow = tooltip.querySelector(arrowSelector);

	  var config = _extends({
	    placement: options.placement
	  }, popperOptions || {}, {
	    modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
	      arrow: _extends({
	        element: arrowSelector
	      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.arrow : {}),
	      flip: _extends({
	        enabled: options.flip,
	        padding: options.distance + 5 /* 5px from viewport boundary */
	        , behavior: options.flipBehavior
	      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}),
	      offset: _extends({
	        offset: options.offset
	      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
	    }),
	    onCreate: function onCreate() {
	      tooltip.style[getPopperPlacement(popper)] = getOffsetDistanceInPx(options.distance);

	      if (arrow && options.arrowTransform) {
	        computeArrowTransform(popper, arrow, options.arrowTransform);
	      }
	    },
	    onUpdate: function onUpdate() {
	      var styles = tooltip.style;
	      styles.top = '';
	      styles.bottom = '';
	      styles.left = '';
	      styles.right = '';
	      styles[getPopperPlacement(popper)] = getOffsetDistanceInPx(options.distance);

	      if (arrow && options.arrowTransform) {
	        computeArrowTransform(popper, arrow, options.arrowTransform);
	      }
	    }
	  });

	  _addMutationObserver.call(this, {
	    target: popper,
	    callback: function callback() {
	      _this7.popperInstance.update();
	    },
	    options: {
	      childList: true,
	      subtree: true,
	      characterData: true
	    }
	  });

	  return new Popper(reference, popper, config);
	}

	/**
	 * Appends the popper element to the DOM, updating or creating the popper instance
	 * @param {Function} callback
	 * @memberof Tippy
	 * @private
	 */
	function _mount(callback) {
	  var options = this.options;


	  if (!this.popperInstance) {
	    this.popperInstance = _createPopperInstance.call(this);
	    if (!options.livePlacement) {
	      this.popperInstance.disableEventListeners();
	    }
	  } else {
	    this.popperInstance.scheduleUpdate();
	    if (options.livePlacement && !_hasFollowCursorBehavior.call(this)) {
	      this.popperInstance.enableEventListeners();
	    }
	  }

	  // If the instance previously had followCursor behavior, it will be positioned incorrectly
	  // if triggered by `focus` afterwards - update the reference back to the real DOM element
	  if (!_hasFollowCursorBehavior.call(this)) {
	    var _getInnerElements5 = getInnerElements(this.popper),
	        arrow = _getInnerElements5.arrow;

	    if (arrow) arrow.style.margin = '';
	    this.popperInstance.reference = this.reference;
	  }

	  updatePopperPosition(this.popperInstance, callback, true);

	  if (!options.appendTo.contains(this.popper)) {
	    options.appendTo.appendChild(this.popper);
	  }
	}

	/**
	 * Clears the show and hide delay timeouts
	 * @memberof Tippy
	 * @private
	 */
	function _clearDelayTimeouts() {
	  var _ref = this._(key),
	      showTimeout = _ref.showTimeout,
	      hideTimeout = _ref.hideTimeout;

	  clearTimeout(showTimeout);
	  clearTimeout(hideTimeout);
	}

	/**
	 * Sets the mousemove event listener function for `followCursor` option
	 * @memberof Tippy
	 * @private
	 */
	function _setFollowCursorListener() {
	  var _this8 = this;

	  this._(key).followCursorListener = function (event) {
	    var _$lastMouseMoveEvent = _this8._(key).lastMouseMoveEvent = event,
	        clientX = _$lastMouseMoveEvent.clientX,
	        clientY = _$lastMouseMoveEvent.clientY;

	    if (!_this8.popperInstance) return;

	    _this8.popperInstance.reference = {
	      getBoundingClientRect: function getBoundingClientRect() {
	        return {
	          width: 0,
	          height: 0,
	          top: clientY,
	          left: clientX,
	          right: clientX,
	          bottom: clientY
	        };
	      },
	      clientWidth: 0,
	      clientHeight: 0
	    };

	    _this8.popperInstance.scheduleUpdate();
	  };
	}

	/**
	 * Updates the popper's position on each animation frame
	 * @memberof Tippy
	 * @private
	 */
	function _makeSticky() {
	  var _this9 = this;

	  var applyTransitionDuration$$1 = function applyTransitionDuration$$1() {
	    _this9.popper.style[prefix('transitionDuration')] = _this9.options.updateDuration + 'ms';
	  };

	  var removeTransitionDuration = function removeTransitionDuration() {
	    _this9.popper.style[prefix('transitionDuration')] = '';
	  };

	  var updatePosition = function updatePosition() {
	    if (_this9.popperInstance) {
	      _this9.popperInstance.update();
	    }

	    applyTransitionDuration$$1();

	    if (_this9.state.visible) {
	      requestAnimationFrame(updatePosition);
	    } else {
	      removeTransitionDuration();
	    }
	  };

	  updatePosition();
	}

	/**
	 * Adds a mutation observer to an element and stores it in the instance
	 * @param {Object}
	 * @memberof Tippy
	 * @private
	 */
	function _addMutationObserver(_ref2) {
	  var target = _ref2.target,
	      callback = _ref2.callback,
	      options = _ref2.options;

	  if (!window.MutationObserver) return;

	  var observer = new MutationObserver(callback);
	  observer.observe(target, options);

	  this._(key).mutationObservers.push(observer);
	}

	/**
	 * Fires the callback functions once the CSS transition ends for `show` and `hide` methods
	 * @param {Number} duration
	 * @param {Function} callback - callback function to fire once transition completes
	 * @memberof Tippy
	 * @private
	 */
	function _onTransitionEnd(duration, callback) {
	  // Make callback synchronous if duration is 0
	  if (!duration) {
	    return callback();
	  }

	  var _getInnerElements6 = getInnerElements(this.popper),
	      tooltip = _getInnerElements6.tooltip;

	  var toggleListeners = function toggleListeners(action, listener) {
	    if (!listener) return;
	    tooltip[action + 'EventListener']('ontransitionend' in window ? 'transitionend' : 'webkitTransitionEnd', listener);
	  };

	  var listener = function listener(e) {
	    if (e.target === tooltip) {
	      toggleListeners('remove', listener);
	      callback();
	    }
	  };

	  toggleListeners('remove', this._(key).transitionendListener);
	  toggleListeners('add', listener);

	  this._(key).transitionendListener = listener;
	}

	var idCounter = 1;

	/**
	 * Creates tooltips for each reference element
	 * @param {Element[]} els
	 * @param {Object} config
	 * @return {Tippy[]} Array of Tippy instances
	 */
	function createTooltips(els, config) {
	  return els.reduce(function (acc, reference) {
	    var id = idCounter;

	    var options = evaluateOptions(reference, config.performance ? config : getIndividualOptions(reference, config));

	    var title = reference.getAttribute('title');

	    // Don't create an instance when:
	    // * the `title` attribute is falsy (null or empty string), and
	    // * it's not a delegate for tooltips, and
	    // * there is no html template specified, and
	    // * `dynamicTitle` option is false
	    if (!title && !options.target && !options.html && !options.dynamicTitle) {
	      return acc;
	    }

	    // Delegates should be highlighted as different
	    reference.setAttribute(options.target ? 'data-tippy-delegate' : 'data-tippy', '');

	    removeTitle(reference);

	    var popper = createPopperElement(id, title, options);

	    var tippy = new Tippy({
	      id: id,
	      reference: reference,
	      popper: popper,
	      options: options,
	      title: title,
	      popperInstance: null
	    });

	    if (options.createPopperInstanceOnInit) {
	      tippy.popperInstance = _createPopperInstance.call(tippy);
	      tippy.popperInstance.disableEventListeners();
	    }

	    var listeners = _getEventListeners.call(tippy);
	    tippy.listeners = options.trigger.trim().split(' ').reduce(function (acc, eventType) {
	      return acc.concat(createTrigger(eventType, reference, listeners, options));
	    }, []);

	    // Update tooltip content whenever the title attribute on the reference changes
	    if (options.dynamicTitle) {
	      _addMutationObserver.call(tippy, {
	        target: reference,
	        callback: function callback() {
	          var _getInnerElements = getInnerElements(popper),
	              content = _getInnerElements.content;

	          var title = reference.getAttribute('title');
	          if (title) {
	            content[options.allowTitleHTML ? 'innerHTML' : 'textContent'] = tippy.title = title;
	            removeTitle(reference);
	          }
	        },

	        options: {
	          attributes: true
	        }
	      });
	    }

	    // Shortcuts
	    reference._tippy = tippy;
	    popper._tippy = tippy;
	    popper._reference = reference;

	    acc.push(tippy);

	    idCounter++;

	    return acc;
	  }, []);
	}

	/**
	 * Hides all poppers
	 * @param {Tippy} excludeTippy - tippy to exclude if needed
	 */
	function hideAllPoppers(excludeTippy) {
	  var poppers = toArray(document.querySelectorAll(selectors.POPPER));

	  poppers.forEach(function (popper) {
	    var tippy = popper._tippy;
	    if (!tippy) return;

	    var options = tippy.options;


	    if ((options.hideOnClick === true || options.trigger.indexOf('focus') > -1) && (!excludeTippy || popper !== excludeTippy.popper)) {
	      tippy.hide();
	    }
	  });
	}

	/**
	 * Adds the needed event listeners
	 */
	function bindEventListeners() {
	  var onDocumentTouch = function onDocumentTouch() {
	    if (browser.usingTouch) return;

	    browser.usingTouch = true;

	    if (browser.iOS) {
	      document.body.classList.add('tippy-touch');
	    }

	    if (browser.dynamicInputDetection && window.performance) {
	      document.addEventListener('mousemove', onDocumentMouseMove);
	    }

	    browser.onUserInputChange('touch');
	  };

	  var onDocumentMouseMove = function () {
	    var time = void 0;

	    return function () {
	      var now = performance.now();

	      // Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference
	      if (now - time < 20) {
	        browser.usingTouch = false;
	        document.removeEventListener('mousemove', onDocumentMouseMove);
	        if (!browser.iOS) {
	          document.body.classList.remove('tippy-touch');
	        }
	        browser.onUserInputChange('mouse');
	      }

	      time = now;
	    };
	  }();

	  var onDocumentClick = function onDocumentClick(event) {
	    // Simulated events dispatched on the document
	    if (!(event.target instanceof Element)) {
	      return hideAllPoppers();
	    }

	    var reference = closest(event.target, selectors.REFERENCE);
	    var popper = closest(event.target, selectors.POPPER);

	    if (popper && popper._tippy && popper._tippy.options.interactive) {
	      return;
	    }

	    if (reference && reference._tippy) {
	      var options = reference._tippy.options;

	      var isClickTrigger = options.trigger.indexOf('click') > -1;
	      var isMultiple = options.multiple;

	      // Hide all poppers except the one belonging to the element that was clicked
	      if (!isMultiple && browser.usingTouch || !isMultiple && isClickTrigger) {
	        return hideAllPoppers(reference._tippy);
	      }

	      if (options.hideOnClick !== true || isClickTrigger) {
	        return;
	      }
	    }

	    hideAllPoppers();
	  };

	  var onWindowBlur = function onWindowBlur() {
	    var _document = document,
	        el = _document.activeElement;

	    if (el && el.blur && matches$1.call(el, selectors.REFERENCE)) {
	      el.blur();
	    }
	  };

	  var onWindowResize = function onWindowResize() {
	    toArray(document.querySelectorAll(selectors.POPPER)).forEach(function (popper) {
	      var tippyInstance = popper._tippy;
	      if (tippyInstance && !tippyInstance.options.livePlacement) {
	        tippyInstance.popperInstance.scheduleUpdate();
	      }
	    });
	  };

	  document.addEventListener('click', onDocumentClick);
	  document.addEventListener('touchstart', onDocumentTouch);
	  window.addEventListener('blur', onWindowBlur);
	  window.addEventListener('resize', onWindowResize);

	  if (!browser.supportsTouch && (navigator.maxTouchPoints || navigator.msMaxTouchPoints)) {
	    document.addEventListener('pointerdown', onDocumentTouch);
	  }
	}

	var eventListenersBound = false;

	/**
	 * Exported module
	 * @param {String|Element|Element[]|NodeList|Object} selector
	 * @param {Object} options
	 * @param {Boolean} one - create one tooltip
	 * @return {Object}
	 */
	function tippy(selector, options, one) {
	  if (browser.supported && !eventListenersBound) {
	    bindEventListeners();
	    eventListenersBound = true;
	  }

	  if (isObjectLiteral(selector)) {
	    polyfillVirtualReferenceProps(selector);
	  }

	  options = _extends({}, defaults, options);

	  var references = getArrayOfElements(selector);
	  var firstReference = references[0];

	  return {
	    selector: selector,
	    options: options,
	    tooltips: browser.supported ? createTooltips(one && firstReference ? [firstReference] : references, options) : [],
	    destroyAll: function destroyAll() {
	      this.tooltips.forEach(function (tooltip) {
	        return tooltip.destroy();
	      });
	      this.tooltips = [];
	    }
	  };
	}

	tippy.version = version;
	tippy.browser = browser;
	tippy.defaults = defaults;
	tippy.one = function (selector, options) {
	  return tippy(selector, options, true).tooltips[0];
	};
	tippy.disableAnimations = function () {
	  defaults.updateDuration = defaults.duration = 0;
	  defaults.animateFill = false;
	};

	/**
	 * Injects CSS styles to document head
	 * @param {String} css
	 */
	function injectCSS() {
	  var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isBrowser && browser.supported) {
	    var head = document.head || document.querySelector('head');
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    head.insertBefore(style, head.firstChild);

	    if (style.styleSheet) {
	      style.styleSheet.cssText = css;
	    } else {
	      style.appendChild(document.createTextNode(css));
	    }
	  }
	}

	injectCSS(styles);

	return tippy;

	})));
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine = _hide;

	var _iterators = {};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from = _core.Array.from;

	var from$1 = createCommonjsModule(function (module) {
	module.exports = { "default": from, __esModule: true };
	});

	unwrapExports(from$1);

	var toConsumableArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _from2 = _interopRequireDefault(from$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	function padZero(date) {
	  return ('0' + date).slice(-2);
	}

	var DAY = 24 * 3600 * 1000;

	var UNIT = {
	  day: DAY / 28,
	  week: 7 * DAY / 56,
	  month: 30 * DAY / 56
	};

	function addDays(date, days) {
	  date.setDate(date.getDate() + days);
	  return date;
	}

	function getDates(begin, end) {
	  var dates = [];
	  var s = new Date(begin);
	  s.setHours(24, 0, 0, 0);
	  while (s.getTime() <= end) {
	    dates.push(s.getTime());
	    addDays(s, 1);
	  }
	  return dates;
	}

	var ctx = null;
	function textWidth(text, font, pad) {
	  ctx = ctx || document.createElement('canvas').getContext('2d');
	  ctx.font = font;
	  return ctx.measureText(text).width + pad;
	}

	function formatMonth(date) {
	  var y = date.getFullYear();
	  var m = date.getMonth() + 1;
	  return y + '/' + (m > 9 ? m : '0' + m);
	}

	function formatTime(date) {
	  var Y = date.getFullYear();
	  var M = padZero(date.getMonth() + 1);
	  var D = padZero(date.getDate());
	  var h = padZero(date.getHours());
	  var m = padZero(date.getMinutes());
	  var s = padZero(date.getSeconds());
	  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
	}

	function formatData(data) {
	  return data.map(function (v) {
	    return {
	      id: v.id,
	      name: v.name,
	      init_time: new Date(v.init_time).getTime(),
	      expect_from: v.expect_from ? new Date(v.expect_from).getTime() : null,
	      expect_to: v.expect_to ? new Date(v.expect_to).getTime() : null,
	      reality_from: v.reality_from ? new Date(v.reality_from).getTime() : null,
	      reality_to: v.reality_to ? new Date(v.reality_to).getTime() : null,
	      addon: v.addon,
	      important: v.important
	    };
	  });
	}

	function getExtremeTimeByDataMode(_ref) {
	  var data = _ref.data,
	      dataMode = _ref.dataMode,
	      current = _ref.current,
	      unit = _ref.unit;

	  var minCol = void 0;
	  var maxCol = void 0;
	  switch (dataMode) {
	    case 'all':
	      minCol = [].concat(_toConsumableArray(data.map(function (v) {
	        return v.expect_from;
	      })), _toConsumableArray(data.map(function (v) {
	        return v.reality_from;
	      })), _toConsumableArray(data.map(function (v) {
	        return v.init_time;
	      }))).filter(function (v) {
	        return Boolean(v);
	      });
	      maxCol = [].concat(_toConsumableArray(data.map(function (v) {
	        return v.expect_to;
	      })), _toConsumableArray(data.map(function (v) {
	        return v.reality_to;
	      }))).filter(function (v) {
	        return Boolean(v);
	      });
	      break;
	    case 'expect':
	      minCol = [].concat(_toConsumableArray(data.map(function (v) {
	        return v.expect_from;
	      })), _toConsumableArray(data.map(function (v) {
	        return v.init_time;
	      }))).filter(function (v) {
	        return Boolean(v);
	      });
	      maxCol = data.map(function (v) {
	        return v.expect_to;
	      });
	      break;
	    case 'reality':
	      minCol = [].concat(_toConsumableArray(data.map(function (v) {
	        return v.reality_from;
	      })), _toConsumableArray(data.map(function (v) {
	        return v.init_time;
	      }))).filter(function (v) {
	        return Boolean(v);
	      });
	      maxCol = data.map(function (v) {
	        return v.reality_to;
	      }).filter(function (v) {
	        return Boolean(v);
	      });
	      if (!maxCol.length) maxCol = [current];
	      break;
	  }
	  var minTime = Math.min.apply(null, minCol) - unit * 40;
	  var maxTime = Math.max.apply(null, maxCol) + unit * 40;
	  return { minTime: minTime, maxTime: maxTime };
	}

	function Layout(_ref) {
	  var styles = _ref.styles,
	      width = _ref.width,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      thickWidth = _ref.thickWidth,
	      maxTextWidth = _ref.maxTextWidth;

	  var x0 = thickWidth / 2;
	  var W = width - thickWidth;
	  var H = height - thickWidth;
	  return h(
	    'g',
	    null,
	    h('rect', { x: x0, y: x0, width: W, height: H, style: styles.box }),
	    h('line', { x1: 0, x2: width, y1: offsetY - x0, y2: offsetY - x0, style: styles.bline }),
	    h('line', { x1: maxTextWidth, x2: width, y1: offsetY / 2, y2: offsetY / 2, style: styles.line })
	  );
	}

	function YearMonth(_ref) {
	  var styles = _ref.styles,
	      dates = _ref.dates,
	      unit = _ref.unit,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      maxTextWidth = _ref.maxTextWidth;

	  var months = dates.filter(function (v) {
	    return new Date(v).getDate() === 1;
	  });

	  months.unshift(minTime);
	  months.push(maxTime);

	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y2 = offsetY / 2;
	  var len = months.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(months[i]);
	    var str = formatMonth(cur);
	    var x = x0 + (months[i] - minTime) / unit;
	    var t = (months[i + 1] - months[i]) / unit;
	    ticks.push(h(
	      'g',
	      null,
	      h('line', { x1: x, x2: x, y1: 0, y2: y2, style: styles.line }),
	      t > 50 ? h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.25, style: styles.text3 },
	        str
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    ticks
	  );
	}

	function DayHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth,
	      footerHeight = _ref.footerHeight;

	  var dates = getDates(minTime, maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var RH = height - y0 - footerHeight;
	  var len = dates.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(dates[i]);
	    var day = cur.getDay();
	    var x = x0 + (dates[i] - minTime) / unit;
	    var t = (dates[i + 1] - dates[i]) / unit;
	    ticks.push(h(
	      'g',
	      null,
	      day === 0 || day === 6 ? h('rect', { x: x, y: y0, width: t, height: RH, style: styles.week }) : null,
	      h('line', { x1: x, x2: x, y1: y0, y2: offsetY, style: styles.line }),
	      h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.75, style: styles.text3 },
	        cur.getDate()
	      ),
	      i === len - 1 ? h('line', { x1: x + t, x2: x + t, y1: y0, y2: offsetY, style: styles.line }) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    h(YearMonth, {
	      styles: styles,
	      unit: unit,
	      dates: dates,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth
	    }),
	    ticks
	  );
	}

	function WeekHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth,
	      footerHeight = _ref.footerHeight;

	  var dates = getDates(minTime, maxTime);
	  var weeks = dates.filter(function (v) {
	    return new Date(v).getDay() === 0;
	  });
	  weeks.push(maxTime);
	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var RH = height - y0 - footerHeight;
	  var d = DAY / unit;
	  var len = weeks.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(weeks[i]);
	    var x = x0 + (weeks[i] - minTime) / unit;
	    var curDay = cur.getDate();
	    var prevDay = addDays(cur, -1).getDate();
	    ticks.push(h(
	      'g',
	      null,
	      h('rect', { x: x - d, y: y0, width: d * 2, height: RH, style: styles.week }),
	      h('line', { x1: x, x2: x, y1: y0, y2: offsetY, style: styles.line }),
	      h(
	        'text',
	        { x: x + 3, y: offsetY * 0.75, style: styles.text2 },
	        curDay
	      ),
	      x - x0 > 28 ? h(
	        'text',
	        { x: x - 3, y: offsetY * 0.75, style: styles.text1 },
	        prevDay
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    h(YearMonth, {
	      styles: styles,
	      unit: unit,
	      dates: dates,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth
	    }),
	    ticks
	  );
	}

	function Year(_ref) {
	  var styles = _ref.styles,
	      months = _ref.months,
	      unit = _ref.unit,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      maxTextWidth = _ref.maxTextWidth;

	  var years = months.filter(function (v) {
	    return new Date(v).getMonth() === 0;
	  });

	  years.unshift(minTime);
	  years.push(maxTime);

	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y2 = offsetY / 2;
	  var len = years.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(years[i]);
	    var x = x0 + (years[i] - minTime) / unit;
	    var t = (years[i + 1] - years[i]) / unit;
	    ticks.push(h(
	      'g',
	      null,
	      h('line', { x1: x, x2: x, y1: 0, y2: y2, style: styles.line }),
	      t > 35 ? h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.25, style: styles.text3 },
	        cur.getFullYear()
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    ticks
	  );
	}

	function MonthHeader(_ref) {
	  var styles = _ref.styles,
	      unit = _ref.unit,
	      minTime = _ref.minTime,
	      maxTime = _ref.maxTime,
	      offsetY = _ref.offsetY,
	      maxTextWidth = _ref.maxTextWidth;

	  var MONTH = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	  // const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	  var dates = getDates(minTime, maxTime);
	  var months = dates.filter(function (v) {
	    return new Date(v).getDate() === 1;
	  });

	  months.unshift(minTime);
	  months.push(maxTime);

	  var ticks = [];
	  var x0 = maxTextWidth;
	  var y0 = offsetY / 2;
	  var len = months.length - 1;
	  for (var i = 0; i < len; i++) {
	    var cur = new Date(months[i]);
	    var month = cur.getMonth();
	    var x = x0 + (months[i] - minTime) / unit;
	    var t = (months[i + 1] - months[i]) / unit;
	    ticks.push(h(
	      'g',
	      null,
	      h('line', { x1: x, x2: x, y1: y0, y2: offsetY, style: styles.line }),
	      t > 30 ? h(
	        'text',
	        { x: x + t / 2, y: offsetY * 0.75, style: styles.text3 },
	        MONTH[month]
	      ) : null
	    ));
	  }
	  return h(
	    'g',
	    null,
	    h(Year, {
	      styles: styles,
	      unit: unit,
	      months: months,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth
	    }),
	    ticks
	  );
	}

	function Grid(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      width = _ref.width,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      thickWidth = _ref.thickWidth,
	      rowHeight = _ref.rowHeight,
	      footerHeight = _ref.footerHeight,
	      maxTextWidth = _ref.maxTextWidth;

	  var W = width - thickWidth * 2;
	  var H = height - footerHeight;
	  return h(
	    "g",
	    { "class": "grid" },
	    data.map(function (v, i) {
	      var y = i * rowHeight + offsetY;
	      return h("rect", { x: thickWidth, y: y, width: W, height: rowHeight, style: styles.groupBg });
	    }),
	    data.map(function (v, i) {
	      var y = (i + 1) * rowHeight + offsetY;
	      return h("line", { key: i, x1: 0, x2: width, y1: y, y2: y, style: styles.line });
	    }),
	    h("line", { x1: maxTextWidth, x2: maxTextWidth, y1: 0, y2: H, style: styles.bline })
	  );
	}

	function Labels(_ref) {
	  var styles = _ref.styles,
	      data = _ref.data,
	      onLabelClick = _ref.onLabelClick,
	      rowHeight = _ref.rowHeight,
	      offsetY = _ref.offsetY;

	  return h(
	    'g',
	    { 'class': 'labels' },
	    data.map(function (v, i) {
	      var handler = function handler() {
	        return onLabelClick(v);
	      };
	      return h(
	        'g',
	        { key: i, style: { cursor: 'pointer' }, onClick: handler },
	        h(
	          'text',
	          {
	            x: 10,
	            y: (i + 0.5) * rowHeight + offsetY,
	            style: v.important ? styles.addressLabel : styles.groupLabel
	          },
	          v.name
	        )
	      );
	    })
	  );
	}

	var All = function All(_ref) {
	  var x0 = _ref.x0,
	      y0 = _ref.y0,
	      cur = _ref.cur,
	      current = _ref.current,
	      styles = _ref.styles,
	      data = _ref.data,
	      unit = _ref.unit,
	      height = _ref.height,
	      offsetY = _ref.offsetY,
	      minTime = _ref.minTime,
	      rowHeight = _ref.rowHeight,
	      barHeight = _ref.barHeight,
	      footerHeight = _ref.footerHeight,
	      onClick = _ref.onClick;

	  return h(
	    'g',
	    { 'class': 'bar' },
	    h('line', { x1: cur, x2: cur, y1: offsetY, y2: height - footerHeight, style: styles.cline }),
	    data.map(function (v, i) {
	      var x = 0,
	          x1 = 0,
	          w1 = 0,
	          w2 = 0,
	          w3 = 0;

	      if (!v.expect_to) {
	        return h('g', null);
	      } else {
	        if (!v.expect_from) {
	          x = x0 + (v.init_time - minTime) / unit;
	          w1 = (v.expect_to - v.init_time) / unit;
	        } else {
	          x = x0 + (v.expect_from - minTime) / unit;
	          w1 = (v.expect_to - v.expect_from) / unit;
	        }
	      }
	      if (v.reality_from) {
	        x1 = x0 + (v.reality_from - minTime) / unit;
	        if (!v.reality_to) {
	          w3 = (current - v.reality_from) / unit || 1;
	        } else {
	          w2 = (v.reality_to - v.reality_from) / unit;
	        }
	      } else if (v.reality_to) {
	        x1 = x0 + (v.init_time - minTime) / unit;
	        w2 = (v.reality_to - v.init_time) / unit;
	      }
	      var y = y0 + i * rowHeight;
	      var EY = y + barHeight / 4;
	      var handler = function handler() {
	        return onClick(v);
	      };
	      var title = '<p>' + v.name + '-' + v.addon.status + '</p>\n        <p>\u6807\u7B7E\uFF1A' + v.addon.label + '</p>\n        <p>\u88AB\u6307\u6D3E\u4EBA\uFF1A' + v.addon.assigned_user + '</p>\n        <p>\u671F\u671B\u8D77\u6B62\u65F6\u95F4\uFF1A' + formatTime(new Date(v.expect_from)) + ' \u81F3 ' + formatTime(new Date(v.expect_to)) + '</p>\n        <p>\u5B9E\u9645\u8D77\u6B62\u65F6\u95F4\uFF1A' + (v.reality_from ? formatTime(new Date(v.reality_from)) : '未开始') + ' ' + (v.reality_to ? '至 ' + formatTime(new Date(v.reality_to)) : v.reality_from ? '未结束' : '') + '</p>';
	      return h(
	        'g',
	        { title: title, key: i, style: { cursor: 'pointer' }, onClick: handler },
	        h('rect', { x: x, y: EY, width: w1, height: barHeight / 2, rx: 1.8, ry: 1.8, style: styles.yellow }),
	        w2 ? h('rect', { x: x1, y: y, width: w2, height: barHeight, rx: 1.8, ry: 1.8, style: styles.greenA }) : null,
	        w3 > 0 ? h('rect', { x: x1, y: y, width: w3, height: barHeight, style: styles.buleA }) : null,
	        w3 > 0 ? h('path', { d: 'M' + (x1 + w3) + ' ' + y + ' L' + (x1 + w3) + ' ' + (y + barHeight) + ' L' + (x1 + w3 + 2 * barHeight / 3) + ' ' + (y + barHeight / 2) + ' Z', style: styles.buleA }) : null
	      );
	    })
	  );
	};

	var Expect = function Expect(_ref2) {
	  var x0 = _ref2.x0,
	      y0 = _ref2.y0,
	      cur = _ref2.cur,
	      styles = _ref2.styles,
	      data = _ref2.data,
	      unit = _ref2.unit,
	      height = _ref2.height,
	      offsetY = _ref2.offsetY,
	      minTime = _ref2.minTime,
	      rowHeight = _ref2.rowHeight,
	      barHeight = _ref2.barHeight,
	      footerHeight = _ref2.footerHeight,
	      onClick = _ref2.onClick;

	  return h(
	    'g',
	    { 'class': 'bar' },
	    h('line', { x1: cur, x2: cur, y1: offsetY, y2: height - footerHeight, style: styles.cline }),
	    data.map(function (v, i) {
	      var x = 0,
	          w1 = 0;

	      if (!v.expect_to) {
	        return h('g', null);
	      } else {
	        if (!v.expect_from) {
	          x = x0 + (v.init_time - minTime) / unit;
	          w1 = (v.expect_to - v.init_time) / unit;
	        } else {
	          x = x0 + (v.expect_from - minTime) / unit;
	          w1 = (v.expect_to - v.expect_from) / unit;
	        }
	      }
	      var y = y0 + i * rowHeight;
	      var handler = function handler() {
	        return onClick(v);
	      };
	      var title = '<p>' + v.name + '-' + v.addon.status + '</p>\n        <p>\u6807\u7B7E\uFF1A' + v.addon.label + '</p>\n        <p>\u88AB\u6307\u6D3E\u4EBA\uFF1A' + v.addon.assigned_user + '</p>\n        <p>\u671F\u671B\u8D77\u6B62\u65F6\u95F4\uFF1A' + formatTime(new Date(v.expect_from)) + ' \u81F3 ' + formatTime(new Date(v.expect_to)) + '</p>';
	      return h(
	        'g',
	        { title: title, key: i, style: { cursor: 'pointer' }, onClick: handler },
	        h('rect', { x: x, y: y, width: w1, height: barHeight, rx: 1.8, ry: 1.8, style: styles.yellow })
	      );
	    })
	  );
	};

	var Reality = function Reality(_ref3) {
	  var x0 = _ref3.x0,
	      y0 = _ref3.y0,
	      cur = _ref3.cur,
	      current = _ref3.current,
	      styles = _ref3.styles,
	      data = _ref3.data,
	      unit = _ref3.unit,
	      height = _ref3.height,
	      offsetY = _ref3.offsetY,
	      minTime = _ref3.minTime,
	      rowHeight = _ref3.rowHeight,
	      barHeight = _ref3.barHeight,
	      footerHeight = _ref3.footerHeight,
	      onClick = _ref3.onClick;

	  return h(
	    'g',
	    { 'class': 'bar' },
	    h('line', { x1: cur, x2: cur, y1: offsetY, y2: height - footerHeight, style: styles.cline }),
	    data.map(function (v, i) {
	      var x1 = 0,
	          w1 = 0,
	          w2 = 0;

	      if (v.reality_from) {
	        x1 = x0 + (v.reality_from - minTime) / unit;
	        if (!v.reality_to) {
	          w2 = (current - v.reality_from) / unit || 1;
	        } else {
	          w1 = (v.reality_to - v.reality_from) / unit;
	        }
	      } else if (v.reality_to) {
	        x1 = x0 + (v.init_time - minTime) / unit;
	        w1 = (v.reality_to - v.init_time) / unit;
	      } else {
	        return h('g', null);
	      }
	      var y = y0 + i * rowHeight;
	      var reality_from = v.reality_from || v.init_time;
	      var handler = function handler() {
	        return onClick(v);
	      };
	      var title = '<p>' + v.name + '-' + v.addon.status + '</p>\n        <p>\u6807\u7B7E\uFF1A' + v.addon.label + '</p>\n        <p>\u88AB\u6307\u6D3E\u4EBA\uFF1A' + v.addon.assigned_user + '</p>\n        <p>\u5B9E\u9645\u8D77\u6B62\u65F6\u95F4\uFF1A' + formatTime(new Date(reality_from)) + ' \u81F3 ' + (v.reality_to ? formatTime(new Date(v.reality_to)) : '未结束') + '</p>';
	      return h(
	        'g',
	        { title: title, key: i, style: { cursor: 'pointer' }, onClick: handler },
	        w1 ? h('rect', { x: x1, y: y, width: w1, height: barHeight, rx: 1.8, ry: 1.8, style: styles.greenA }) : null,
	        w2 ? h('rect', { x: x1, y: y, width: w2, height: barHeight, style: styles.buleA }) : null,
	        w2 ? h('path', { d: 'M' + (x1 + w2) + ' ' + y + ' L' + (x1 + w2) + ' ' + (y + barHeight) + ' L' + (x1 + w2 + 2 * barHeight / 3) + ' ' + (y + barHeight / 2) + ' Z', style: styles.buleA }) : null
	      );
	    })
	  );
	};

	function Bar(props) {
	  var unit = props.unit,
	      dataMode = props.dataMode,
	      offsetY = props.offsetY,
	      minTime = props.minTime,
	      rowHeight = props.rowHeight,
	      barHeight = props.barHeight,
	      maxTextWidth = props.maxTextWidth,
	      current = props.current;

	  var x0 = maxTextWidth;
	  var y0 = (rowHeight - barHeight) / 2 + offsetY;
	  var cur = x0 + (current - minTime) / unit;
	  var mode = { all: All, expect: Expect, reality: Reality };
	  return mode[dataMode](_extends$1({ x0: x0, y0: y0, cur: cur }, props));
	}

	function Legend(_ref) {
	  var styles = _ref.styles,
	      legends = _ref.legends,
	      width = _ref.width,
	      height = _ref.height,
	      barHeight = _ref.barHeight,
	      footerHeight = _ref.footerHeight;

	  var W = 100;
	  var len = legends.length;
	  return h(
	    'g',
	    null,
	    legends.map(function (v, i) {
	      var x = (width - len * W) / 2 + i * W;
	      var y = height - footerHeight / 2;
	      var RY = y - barHeight / 2;
	      return h(
	        'g',
	        { key: i },
	        h('rect', { x: x, y: RY, width: barHeight, height: barHeight, style: styles[v.type] }),
	        h(
	          'text',
	          { x: x + barHeight + 5, y: y, style: styles.label },
	          v.name
	        )
	      );
	    })
	  );
	}

	var SIZE = '14px';
	var TYPE = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

	function getFont(_ref) {
	  var _ref$fontSize = _ref.fontSize,
	      fontSize = _ref$fontSize === undefined ? SIZE : _ref$fontSize,
	      _ref$fontFamily = _ref.fontFamily,
	      fontFamily = _ref$fontFamily === undefined ? TYPE : _ref$fontFamily;

	  return 'bold ' + fontSize + ' ' + fontFamily;
	}

	function getStyles(_ref2) {
	  var _ref2$BG = _ref2.BG,
	      BG = _ref2$BG === undefined ? '#fff' : _ref2$BG,
	      _ref2$groupBg = _ref2.groupBg,
	      groupBg = _ref2$groupBg === undefined ? 'rgba(0,0,0,0)' : _ref2$groupBg,
	      _ref2$lineColor = _ref2.lineColor,
	      lineColor = _ref2$lineColor === undefined ? '#eee' : _ref2$lineColor,
	      _ref2$redLineColor = _ref2.redLineColor,
	      redLineColor = _ref2$redLineColor === undefined ? '#ed3f14' : _ref2$redLineColor,
	      _ref2$baseBar = _ref2.baseBar,
	      baseBar = _ref2$baseBar === undefined ? '#b8c2cc' : _ref2$baseBar,
	      _ref2$whiteBar = _ref2.whiteBar,
	      whiteBar = _ref2$whiteBar === undefined ? '#ffffff' : _ref2$whiteBar,
	      _ref2$greenBar = _ref2.greenBar,
	      greenBar = _ref2$greenBar === undefined ? '#52c41a' : _ref2$greenBar,
	      _ref2$greenBarA = _ref2.greenBarA,
	      greenBarA = _ref2$greenBarA === undefined ? 'rgba(82, 196, 26, .5)' : _ref2$greenBarA,
	      _ref2$groupBar = _ref2.groupBar,
	      groupBar = _ref2$groupBar === undefined ? '#52c41a' : _ref2$groupBar,
	      _ref2$redBar = _ref2.redBar,
	      redBar = _ref2$redBar === undefined ? '#ed3f14' : _ref2$redBar,
	      _ref2$redBarA = _ref2.redBarA,
	      redBarA = _ref2$redBarA === undefined ? 'rgba(237, 63, 20, .5)' : _ref2$redBarA,
	      _ref2$yellowBar = _ref2.yellowBar,
	      yellowBar = _ref2$yellowBar === undefined ? '#ff9900' : _ref2$yellowBar,
	      _ref2$yellowBarA = _ref2.yellowBarA,
	      yellowBarA = _ref2$yellowBarA === undefined ? 'rgba(255, 153, 0, .5)' : _ref2$yellowBarA,
	      _ref2$buleBarA = _ref2.buleBarA,
	      buleBarA = _ref2$buleBarA === undefined ? 'rgba(45, 140, 240, 0.52)' : _ref2$buleBarA,
	      _ref2$greyBar = _ref2.greyBar,
	      greyBar = _ref2$greyBar === undefined ? '#dddee1' : _ref2$greyBar,
	      _ref2$textColor = _ref2.textColor,
	      textColor = _ref2$textColor === undefined ? '#222' : _ref2$textColor,
	      _ref2$lightTextColor = _ref2.lightTextColor,
	      lightTextColor = _ref2$lightTextColor === undefined ? '#999' : _ref2$lightTextColor,
	      _ref2$lineWidth = _ref2.lineWidth,
	      lineWidth = _ref2$lineWidth === undefined ? '1px' : _ref2$lineWidth,
	      _ref2$thickLineWidth = _ref2.thickLineWidth,
	      thickLineWidth = _ref2$thickLineWidth === undefined ? '1.4px' : _ref2$thickLineWidth,
	      _ref2$fontSize = _ref2.fontSize,
	      fontSize = _ref2$fontSize === undefined ? SIZE : _ref2$fontSize,
	      _ref2$smallFontSize = _ref2.smallFontSize,
	      smallFontSize = _ref2$smallFontSize === undefined ? '12px' : _ref2$smallFontSize,
	      _ref2$fontFamily = _ref2.fontFamily,
	      fontFamily = _ref2$fontFamily === undefined ? TYPE : _ref2$fontFamily;

	  var line = {
	    stroke: lineColor,
	    'stroke-width': lineWidth
	  };
	  var redLine = {
	    stroke: redLineColor,
	    'stroke-width': lineWidth
	  };
	  var thickLine = {
	    stroke: lineColor,
	    'stroke-width': thickLineWidth
	  };
	  var text = {
	    fill: textColor,
	    'dominant-baseline': 'central',
	    'font-size': fontSize,
	    'font-family': fontFamily
	  };
	  var addressText = {
	    fill: redBar,
	    'dominant-baseline': 'central',
	    'font-size': fontSize,
	    'font-family': fontFamily
	  };
	  var smallText = {
	    fill: lightTextColor,
	    'font-size': smallFontSize
	  };
	  return {
	    week: {
	      fill: 'rgba(252, 248, 227, .6)'
	    },
	    box: _extends$1({}, thickLine, {
	      fill: BG
	    }),
	    line: line,
	    cline: redLine,
	    bline: thickLine,
	    groupBg: {
	      fill: groupBg
	    },
	    label: text,
	    groupLabel: _extends$1({}, text, {
	      'font-weight': '600'
	    }),
	    addressLabel: _extends$1({}, addressText, {
	      'font-weight': '600'
	    }),
	    text1: _extends$1({}, text, smallText, {
	      'text-anchor': 'end'
	    }),
	    text2: _extends$1({}, text, smallText),
	    text3: _extends$1({}, text, smallText, {
	      'text-anchor': 'middle'
	    }),
	    bar: {
	      fill: baseBar
	    },
	    white: {
	      fill: whiteBar
	    },
	    green: {
	      fill: greenBar
	    },
	    greenA: {
	      fill: greenBarA
	    },
	    red: {
	      fill: redBar
	    },
	    redA: {
	      fill: redBarA
	    },
	    buleA: {
	      fill: buleBarA
	    },
	    yellow: {
	      fill: yellowBar
	    },
	    yellowA: {
	      fill: yellowBarA
	    },
	    grey: {
	      fill: greyBar
	    },
	    group: {
	      fill: groupBar
	    }
	  };
	}

	var LEGENDS = [{
	  type: 'yellow',
	  name: '期望'
	}, {
	  type: 'greenA',
	  name: '实际'
	}, {
	  type: 'buleA',
	  name: '进行中'
	}];
	var UNIT$1 = {
	  day: DAY / 28,
	  week: 7 * DAY / 56,
	  month: 30 * DAY / 56
	};
	function NOOP() {}

	function Gantt(_ref) {
	  var _ref$data = _ref.data,
	      data = _ref$data === undefined ? [] : _ref$data,
	      _ref$onClick = _ref.onClick,
	      onClick = _ref$onClick === undefined ? NOOP : _ref$onClick,
	      _ref$onLabelClick = _ref.onLabelClick,
	      onLabelClick = _ref$onLabelClick === undefined ? NOOP : _ref$onLabelClick,
	      _ref$viewMode = _ref.viewMode,
	      viewMode = _ref$viewMode === undefined ? 'week' : _ref$viewMode,
	      _ref$dataMode = _ref.dataMode,
	      dataMode = _ref$dataMode === undefined ? 'all' : _ref$dataMode,
	      _ref$maxTextWidth = _ref.maxTextWidth,
	      maxTextWidth = _ref$maxTextWidth === undefined ? 140 : _ref$maxTextWidth,
	      _ref$offsetY = _ref.offsetY,
	      offsetY = _ref$offsetY === undefined ? 60 : _ref$offsetY,
	      _ref$rowHeight = _ref.rowHeight,
	      rowHeight = _ref$rowHeight === undefined ? 40 : _ref$rowHeight,
	      _ref$barHeight = _ref.barHeight,
	      barHeight = _ref$barHeight === undefined ? 16 : _ref$barHeight,
	      _ref$thickWidth = _ref.thickWidth,
	      thickWidth = _ref$thickWidth === undefined ? 1.4 : _ref$thickWidth,
	      _ref$footerHeight = _ref.footerHeight,
	      footerHeight = _ref$footerHeight === undefined ? 50 : _ref$footerHeight,
	      _ref$legends = _ref.legends,
	      legends = _ref$legends === undefined ? LEGENDS : _ref$legends,
	      _ref$styleOptions = _ref.styleOptions,
	      styleOptions = _ref$styleOptions === undefined ? {} : _ref$styleOptions;

	  var unit = UNIT$1[viewMode];
	  var current = new Date().getTime();

	  var _getExtremeTimeByData = getExtremeTimeByDataMode({ data: data, dataMode: dataMode, current: current, unit: unit }),
	      minTime = _getExtremeTimeByData.minTime,
	      maxTime = _getExtremeTimeByData.maxTime;

	  var width = (maxTime - minTime) / unit + maxTextWidth;
	  var height = data.length * rowHeight + offsetY + footerHeight;
	  var box = '0 0 ' + width + ' ' + height;
	  var styles = getStyles(styleOptions);

	  return h(
	    'svg',
	    { width: width, height: height, viewBox: box },
	    h(Layout, {
	      styles: styles,
	      width: width,
	      height: height,
	      offsetY: offsetY,
	      thickWidth: thickWidth,
	      maxTextWidth: maxTextWidth
	    }),
	    viewMode === 'day' ? h(DayHeader, {
	      styles: styles,
	      unit: unit,
	      height: height,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }) : null,
	    viewMode === 'week' ? h(WeekHeader, {
	      styles: styles,
	      unit: unit,
	      height: height,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }) : null,
	    viewMode === 'month' ? h(MonthHeader, {
	      styles: styles,
	      unit: unit,
	      offsetY: offsetY,
	      minTime: minTime,
	      maxTime: maxTime,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }) : null,
	    h(Grid, {
	      styles: styles,
	      data: data,
	      width: width,
	      height: height,
	      offsetY: offsetY,
	      rowHeight: rowHeight,
	      thickWidth: thickWidth,
	      footerHeight: footerHeight,
	      maxTextWidth: maxTextWidth
	    }),
	    h(Labels, {
	      styles: styles,
	      data: data,
	      onLabelClick: onLabelClick,
	      offsetY: offsetY,
	      rowHeight: rowHeight
	    }),
	    h(Bar, {
	      styles: styles,
	      data: data,
	      dataMode: dataMode,
	      unit: unit,
	      height: height,
	      current: current,
	      offsetY: offsetY,
	      minTime: minTime,
	      onClick: onClick,
	      rowHeight: rowHeight,
	      barHeight: barHeight,
	      maxTextWidth: maxTextWidth,
	      footerHeight: footerHeight
	    }),
	    h(Legend, {
	      styles: styles,
	      legends: legends,
	      width: width,
	      height: height,
	      barHeight: barHeight,
	      footerHeight: footerHeight
	    })
	  );
	}

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	var f$3 = _wks;

	var _wksExt = {
		f: f$3
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty$2 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": keys, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$1);

	var NS = 'http://www.w3.org/2000/svg';
	var doc = document;

	function applyProperties(node, props) {
	  _Object$keys(props).forEach(function (k) {
	    var v = props[k];
	    if (k === 'style' && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
	      _Object$keys(v).forEach(function (sk) {
	        // eslint-disable-next-line
	        node.style[sk] = v[sk];
	      });
	    } else if (k === 'onClick') {
	      if (typeof v === 'function' && node.tagName === 'g') {
	        node.addEventListener('click', v);
	      }
	    } else {
	      node.setAttribute(k, v);
	    }
	  });
	}

	function render(vnode, ctx) {
	  var tag = vnode.tag,
	      props = vnode.props,
	      children = vnode.children;

	  var node = doc.createElementNS(NS, tag);

	  if (props) {
	    applyProperties(node, props);
	  }

	  children.forEach(function (v) {
	    node.appendChild(typeof v === 'string' ? doc.createTextNode(v) : render(v, ctx));
	  });
	  return node;
	}

	var SVGGantt = function () {
	  function SVGGantt(element, data) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, SVGGantt);

	    this.dom = typeof element === 'string' ? document.querySelector(element) : element;
	    this.data = formatData(data);
	    this.options = options;
	    this.render();
	  }

	  _createClass(SVGGantt, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.data = formatData(data);
	      this.render();
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.options = _extends$1({}, this.options, options);
	      this.render();
	    }
	  }, {
	    key: 'getXaxisByTime',
	    value: function getXaxisByTime(time) {
	      var unit = UNIT[this.options.viewMode];
	      var current = new Date().getTime();

	      var _getExtremeTimeByData = getExtremeTimeByDataMode({
	        data: this.data,
	        dataMode: this.options.dataMode,
	        current: current,
	        unit: unit
	      }),
	          minTime = _getExtremeTimeByData.minTime,
	          maxTime = _getExtremeTimeByData.maxTime;

	      if (time >= minTime && time <= maxTime) {
	        return this.options.maxTextWidth + (time - minTime) / unit;
	      }
	      return false;
	    }
	  }, {
	    key: 'render',
	    value: function render$$1() {
	      var data = this.data,
	          options = this.options;

	      if (this.tree) {
	        this.dom.removeChild(this.tree);
	      }
	      var font = getFont(options.styleOptions || {});
	      options.maxTextWidth = Math.max.apply(null, data.map(function (v) {
	        return textWidth(v.name, font, 20);
	      }));
	      this.tree = render(h(Gantt, _extends$1({ data: data }, options)));
	      this.dom.appendChild(this.tree);
	      if (options.toolTip) {
	        var tip = typeof options.toolTip === 'boolean' ? {} : options.toolTip;
	        tippy_all('.bar>g', tip);
	      }
	    }
	  }]);

	  return SVGGantt;
	}();

	function render$1(vnode, ctx, e) {
	  var tag = vnode.tag,
	      props = vnode.props,
	      children = vnode.children;

	  if (tag === 'svg') {
	    var width = props.width,
	        height = props.height;

	    ctx.width = width;
	    ctx.height = height;
	  }
	  if (tag === 'line') {
	    var x1 = props.x1,
	        x2 = props.x2,
	        y1 = props.y1,
	        y2 = props.y2,
	        _props$style = props.style,
	        style = _props$style === undefined ? {} : _props$style;

	    if (style.stroke) {
	      ctx.strokeStyle = style.stroke;
	      ctx.lineWidth = parseFloat(style['stroke-width'] || 1);
	    }
	    ctx.beginPath();
	    ctx.moveTo(x1, y1);
	    ctx.lineTo(x2, y2);
	    ctx.stroke();
	  }
	  if (tag === 'rect') {
	    var x = props.x,
	        y = props.y,
	        _width = props.width,
	        _height = props.height,
	        _props$rx = props.rx,
	        rx = _props$rx === undefined ? 0 : _props$rx,
	        _props$ry = props.ry,
	        ry = _props$ry === undefined ? 0 : _props$ry,
	        onClick = props.onClick,
	        _props$style2 = props.style,
	        _style = _props$style2 === undefined ? {} : _props$style2;

	    // From https://github.com/canvg/canvg


	    ctx.beginPath();
	    ctx.moveTo(x + rx, y);
	    ctx.lineTo(x + _width - rx, y);
	    ctx.quadraticCurveTo(x + _width, y, x + _width, y + ry);
	    ctx.lineTo(x + _width, y + _height - ry);
	    ctx.quadraticCurveTo(x + _width, y + _height, x + _width - rx, y + _height);
	    ctx.lineTo(x + rx, y + _height);
	    ctx.quadraticCurveTo(x, y + _height, x, y + _height - ry);
	    ctx.lineTo(x, y + ry);
	    ctx.quadraticCurveTo(x, y, x + rx, y);
	    if (e && onClick && ctx.isPointInPath(e.x, e.y)) {
	      onClick();
	    }
	    ctx.closePath();

	    if (_style.fill) {
	      ctx.fillStyle = _style.fill;
	    }
	    ctx.fill();
	    if (_style.stroke) {
	      ctx.strokeStyle = _style.stroke;
	      ctx.lineWidth = parseFloat(_style['stroke-width'] || 1);
	      ctx.stroke();
	    }
	  }
	  if (tag === 'text') {
	    var _x = props.x,
	        _y = props.y,
	        _style2 = props.style;

	    if (_style2) {
	      ctx.fillStyle = _style2.fill;
	      var BL = {
	        central: 'middle',
	        middle: 'middle',
	        hanging: 'hanging',
	        alphabetic: 'alphabetic',
	        ideographic: 'ideographic'
	      };
	      var AL = {
	        start: 'start',
	        middle: 'center',
	        end: 'end'
	      };
	      ctx.textBaseline = BL[_style2['dominant-baseline']] || 'alphabetic';
	      ctx.textAlign = AL[_style2['text-anchor']] || 'start';
	      ctx.font = (_style2['font-weight'] || '') + ' ' + _style2['font-size'] + ' ' + _style2['font-family'];
	    }
	    ctx.fillText(children.join(''), _x, _y);
	  }

	  children.forEach(function (v) {
	    if (typeof v !== 'string') {
	      render$1(v, ctx, e);
	    }
	  });
	}

	function createContext(dom) {
	  var canvas = typeof dom === 'string' ? document.querySelector(dom) : dom;
	  var ctx = canvas.getContext('2d');
	  var backingStore = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	  var ratio = (window.devicePixelRatio || 1) / backingStore;

	  ['width', 'height'].forEach(function (key) {
	    _Object$defineProperty(ctx, key, {
	      get: function get() {
	        return canvas[key] / ratio;
	      },
	      set: function set(v) {
	        canvas[key] = v * ratio;
	        canvas.style[key] = v + 'px';
	        ctx.scale(ratio, ratio);
	      },

	      enumerable: true,
	      configurable: true
	    });
	  });
	  canvas.addEventListener('click', function (e) {
	    if (!ctx.onClick) return;
	    var rect = canvas.getBoundingClientRect();
	    ctx.onClick({
	      x: (e.clientX - rect.left) * ratio,
	      y: (e.clientY - rect.top) * ratio
	    });
	  });
	  return ctx;
	}

	var CanvasGantt = function () {
	  function CanvasGantt(element, data) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, CanvasGantt);

	    this.ctx = createContext(element);
	    this.data = formatData(data);
	    this.options = options;
	    this.render();
	    this.ctx.onClick = function (e) {
	      return _this.render(e);
	    };
	  }

	  _createClass(CanvasGantt, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.data = formatData(data);
	      this.render();
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.options = _extends$1({}, this.options, options);
	      this.render();
	    }
	  }, {
	    key: 'render',
	    value: function render(e) {
	      var data = this.data,
	          options = this.options;

	      if (!options.maxTextWidth) {
	        var font = getFont(options.styleOptions || {});
	        options.maxTextWidth = Math.max.apply(null, data.map(function (v) {
	          return textWidth(v.name, font, 20);
	        }));
	      }
	      render$1(h(Gantt, _extends$1({ data: data }, options)), this.ctx, e);
	    }
	  }]);

	  return CanvasGantt;
	}();

	function attrEscape(str) {
	  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
	}
	function escape(str) {
	  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
	}

	function render$2(vnode, ctx) {
	  var tag = vnode.tag,
	      props = vnode.props,
	      children = vnode.children;

	  var tokens = [];
	  tokens.push('<' + tag);

	  _Object$keys(props || {}).forEach(function (k) {
	    var v = props[k];
	    if (k === 'onClick') return;
	    if (k === 'style' && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
	      v = _Object$keys(v).map(function (i) {
	        return i + ':' + v[i] + ';';
	      }).join('');
	    }
	    tokens.push(' ' + k + '="' + attrEscape(v) + '"');
	  });

	  if (!children || !children.length) {
	    tokens.push(' />');
	    return tokens.join('');
	  }

	  tokens.push('>');

	  children.forEach(function (v) {
	    if (typeof v === 'string') {
	      tokens.push(escape(v));
	    } else {
	      tokens.push(render$2(v, ctx));
	    }
	  });

	  tokens.push('</' + tag + '>');
	  return tokens.join('');
	}

	var StrGantt = function () {
	  function StrGantt(data) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, StrGantt);

	    this.data = formatData(data);
	    this.options = options;
	  }

	  _createClass(StrGantt, [{
	    key: 'setData',
	    value: function setData(data) {
	      this.data = formatData(data);
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.options = _extends$1({}, this.options, options);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.data,
	          options = this.options;

	      return render$2(h(Gantt, _extends$1({ data: data }, options)));
	    }
	  }]);

	  return StrGantt;
	}();

	exports.default = CanvasGantt;
	exports.SVGGantt = SVGGantt;
	exports.CanvasGantt = CanvasGantt;
	exports.StrGantt = StrGantt;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
