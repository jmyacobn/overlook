/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #faf0ca;\n  margin: 0px;\n  min-height: 100vh;\n  width: 100vw;\n  display:flex;\n  flex-direction: column;\n}\n\n.login-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: #0d3b66;\n}\n\n.login-image {\n  height: 10%;\n  width: 10%;\n  margin-top: 10vh;\n}\n\n.login-form {\n  display:flex;\n  flex-direction: column;\n  height: 20vh;\n  font-size: 1.5em;\n}\n\n.login-button {\n  font-size: 0.8em;\n  height: 4vh;\n  width: 10vw;\n  margin-top: 2vh;\n  margin-left: 5vw;\n}\n\nheader {\n  background-color: #0d3b66;\n  color: #f4d35e;\n  height: 22vh;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\nh2 {\n  margin-left: 2vw;\n  font-size: 1.75em;\n  margin-bottom: 1vh;\n}\n\np {\n  margin-left: 2vw;\n  font-size: 1.25em;\n  margin-top: 2vh;\n  margin-bottom: 2vh;\n}\n\nimg {\n  height: 25%;\n  width: 25%;\n}\n\n.logo {\n  display: flex;\n  width: 20vw;\n  flex-direction: column;\n  align-items: center;\n}\n\nmain {\n  display: flex;\n  min-height: 78vh;\n}\n\n.request-booking-section {\n  background-color: #f4d35e;\n  width: 15vw;\n  color: #0d3b66;\n}\n\n.required-message {\n  color:#6f1d1b;\n  font-size: 0.8em;\n  margin: 0;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  margin-left: 2vw;\n  font-size: 1.25em;\n  width: fit-content;\n  height: 30vh;\n  justify-content: space-evenly;\n}\n\nbutton {\n  background-color: #0d3b66;\n  color: #f4d35e;\n  border-radius: 0.2rem;\n  height: 4vh;\n  cursor: pointer;\n}\n\n.bookings {\n  width: 85vw;\n  color: #0d3b66;\n}\n\n.booking-cards {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-gap: 3vh;\n  margin-left: 2vw;\n  margin-right: 3vw;\n}\n\n.booking-card {\n  width: 15vw;\n  background-color: #fdfcdc;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);\n}\n\n.book-room {\n  margin-left: 2vw;\n  margin-bottom: 2vh;\n}\n\n.user-message {\n  color: #6f1d1b;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,WAAW;EACX,iBAAiB;EACjB,YAAY;EACZ,YAAY;EACZ,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,sBAAsB;EACtB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,WAAW;EACX,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,WAAW;EACX,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;EAClB,YAAY;EACZ,6BAA6B;AAC/B;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,qBAAqB;EACrB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,aAAa;EACb,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,yBAAyB;EACzB,0CAA0C;AAC5C;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;AACf","sourcesContent":["body {\n  background-color: #faf0ca;\n  margin: 0px;\n  min-height: 100vh;\n  width: 100vw;\n  display:flex;\n  flex-direction: column;\n}\n\n.login-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: #0d3b66;\n}\n\n.login-image {\n  height: 10%;\n  width: 10%;\n  margin-top: 10vh;\n}\n\n.login-form {\n  display:flex;\n  flex-direction: column;\n  height: 20vh;\n  font-size: 1.5em;\n}\n\n.login-button {\n  font-size: 0.8em;\n  height: 4vh;\n  width: 10vw;\n  margin-top: 2vh;\n  margin-left: 5vw;\n}\n\nheader {\n  background-color: #0d3b66;\n  color: #f4d35e;\n  height: 22vh;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\nh2 {\n  margin-left: 2vw;\n  font-size: 1.75em;\n  margin-bottom: 1vh;\n}\n\np {\n  margin-left: 2vw;\n  font-size: 1.25em;\n  margin-top: 2vh;\n  margin-bottom: 2vh;\n}\n\nimg {\n  height: 25%;\n  width: 25%;\n}\n\n.logo {\n  display: flex;\n  width: 20vw;\n  flex-direction: column;\n  align-items: center;\n}\n\nmain {\n  display: flex;\n  min-height: 78vh;\n}\n\n.request-booking-section {\n  background-color: #f4d35e;\n  width: 15vw;\n  color: #0d3b66;\n}\n\n.required-message {\n  color:#6f1d1b;\n  font-size: 0.8em;\n  margin: 0;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  margin-left: 2vw;\n  font-size: 1.25em;\n  width: fit-content;\n  height: 30vh;\n  justify-content: space-evenly;\n}\n\nbutton {\n  background-color: #0d3b66;\n  color: #f4d35e;\n  border-radius: 0.2rem;\n  height: 4vh;\n  cursor: pointer;\n}\n\n.bookings {\n  width: 85vw;\n  color: #0d3b66;\n}\n\n.booking-cards {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-gap: 3vh;\n  margin-left: 2vw;\n  margin-right: 3vw;\n}\n\n.booking-card {\n  width: 15vw;\n  background-color: #fdfcdc;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);\n}\n\n.book-room {\n  margin-left: 2vw;\n  margin-bottom: 2vh;\n}\n\n.user-message {\n  color: #6f1d1b;\n}\n\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/5-stars.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const getData = (dataSource) => {
    return fetch(`http://localhost:3001/api/v1/${dataSource}`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Sorry, we were unable to retreive your account information. Please try again.")
            }
            return response.json()
        })
}

const postData = (newBooking) => {
    return fetch('http://localhost:3001/api/v1/bookings', newBooking)
        .then(response => {
            if(!response.ok) {
                throw new Error("Sorry, your booking request did not go through. Please try again.")
            }
            return response.json()
        })
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
    }
    getAllBookings(bookingData) {
        return bookingData.filter(booking => this.id === booking.userID)
    }
    getBookingsByType(bookingData, currDate, type) {
        if (type === "past") {
            return this.getAllBookings(bookingData).filter(booking => booking.date < currDate)
        } else {
            return this.getAllBookings(bookingData).filter(booking => booking.date >= currDate)
        }
    }
    getTotalCost(bookingData, roomData) {
        const costOfAllBookedRooms = this.getAllBookings(bookingData).reduce((totalCost, booking) => {
            let customerRoom = roomData.find(room => {
                return room.number === booking.roomNumber
            })
            totalCost += customerRoom.costPerNight
            return totalCost
        }, 0)
        return costOfAllBookedRooms
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_5_stars_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _classes_Customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
// ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~





// ~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~
let allCustomers
let allRooms
let allBookings
let currentCustomer
let filteredRooms = []
let userID

// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~
const greeting = document.querySelector('#greeting')
const cost = document.querySelector('#costSummary')
const pastBookings = document.querySelector('#pastBookingDisplay')
const upcomingBookings = document.querySelector('#upcomingBookingDisplay')
const submitButton = document.querySelector('#submitButton')
const selectedDate = document.querySelector('#checkInDate') 
const selectedRoom = document.querySelector('#roomType')
const availableRooms = document.querySelector('#availableRoomsDisplay')
const loginButton = document.querySelector('#loginButton')
const loginPage = document.querySelector('#loginPage')
const loginError = document.querySelector('#loginError')
const header = document.querySelector('header')
const main = document.querySelector('main')

// ~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~
submitButton.addEventListener('click', displayAvailableRooms)
availableRooms.addEventListener('click', bookRoom)
loginButton.addEventListener('click', verifyUserLogin)
selectedDate.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      displayAvailableRooms()
    }
  })
selectedRoom.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      displayAvailableRooms()
    }
  })

// ~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~
function verifyUserLogin() {
    userID = Number(username.value.slice(8))
    if(username.value.slice(0, 8) === 'customer' && userID > 0 && userID <= 50 && password.value === 'overlook2021') {
        fetchData(userID)
    } else if (username.value === "" || password.value === "" ) {
        loginError.innerText = `You must enter both a username and password.`
    } else if (password.value !== 'overlook2021' || (username.value.slice(0, 8) !== 'customer' && !userID > 0 && !userID <= 50)) {
        loginError.innerText = `Please enter valid username and password.`
    }
}

function fetchData(userID) {
    Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getData)(`customers/${userID}`), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getData)('rooms'), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getData)('bookings')])
    .then(data => {
        allCustomers = data[0]
        allRooms = data[1].rooms
        allBookings = data[2].bookings
        currentCustomer = new _classes_Customer__WEBPACK_IMPORTED_MODULE_3__.default(allCustomers)
        displayCustomerData(currentCustomer, allRooms, allBookings)
    })
}

function displayCustomerData(currentCustomer, allRooms, allBookings) {
    loginPage.classList.add("hidden")
    header.classList.remove("hidden")
    main.classList.remove("hidden")
    greeting.innerText = `Welcome, ${currentCustomer.name}!`
    cost.innerHTML = `Your total cost of bookings is $${currentCustomer.getTotalCost(allBookings, allRooms).toFixed(2)}.`
    displayCardsByType("upcoming")
    displayCardsByType("past")
}

function displayAvailableRooms() {
    availableRooms.innerHTML = ''
    filterRoomsByType()
    if(filteredRooms.length === 0) {
        availableRooms.innerHTML += `<p class="user-message">We are so sorry. There are no available rooms for your search criteria. Please try again.</p>`
    } else if (selectedDate.value !== "") {
        filteredRooms.forEach(room => {
            availableRooms.innerHTML += availableRoomCards(room)
        })
    } else {
        availableRooms.innerHTML += `<p class="user-message">You must select a date to see avilable rooms.</p>`
    }
}

function bookRoom(event) {
    if(event.target.classList.contains('book-room')) {
        filteredRooms.forEach(room => {
            const roomID = selectedDate.value + "-" + room.number
            if(event.target.parentNode.id === roomID) {
                const customerBooking = {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify({"userID": currentCustomer.id, "date": selectedDate.value.split("-").join("/"), "roomNumber": room.number})
                }
                ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.postData)(customerBooking)
                    .then((response) => response)
                    .then(() => {
                        availableRooms.innerHTML = `<p class="user-message">BOOKING CONFIRMED!</p>`
                        setTimeout(() => {
                            resetCustomerDashboard()
                            fetchData(userID)
                        }, 3000)
                        })
            }
        })
    }
}

// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~
function findRoomsByDate() {
    const roomsFilteredByDate = allBookings.filter(booking => {
        const selectedDateReformatted = selectedDate.value.split("-").join("/")
        return (booking.date === selectedDateReformatted)
        }).map(bookedRoom => bookedRoom.roomNumber)
        const stuff = allRooms.reduce((acc, room) => {
            if(!roomsFilteredByDate.includes(room.number)) {
                acc.push(room)
            }
            return acc
        }, [])
        filteredRooms = stuff
}
function filterRoomsByType() {
    findRoomsByDate()
    const roomsFilteredByType = filteredRooms.filter(room => {
        const selectedRoomReformatted = selectedRoom.value.split("-").join(" ")
        if(room.roomType === selectedRoomReformatted) {
            return room
        } else if (selectedRoomReformatted === "all rooms") {
            return room
        }
    })
    filteredRooms = roomsFilteredByType
}

function displayCardsByType(type) {
    let userBookings
    if (type === "upcoming") {
        userBookings = currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type)
        userBookings.forEach(booking => {
            allRooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    upcomingBookings.innerHTML += renderCards(booking, room)
                }
            })
        })
    } else {
        userBookings = currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type)
        userBookings.forEach(booking => {
            allRooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    pastBookings.innerHTML += renderCards(booking, room)
                }
            })
        })
    }  
    if (type === "upcoming" && !userBookings.length) {
        upcomingBookings.innerHTML += `<p class="user-message">You do not have any upcoming reservations with us. Book now!</p>`
    } else if (type === "past" && !userBookings.length) {
        pastBookings.innerHTML += `<p class="user-message">You do not have any past reservations with us.</p>`
    }
}

function resetCustomerDashboard() {
    selectedDate.value = ''
    selectedRoom.value = 'all-rooms'
    availableRooms.innerHTML = `<p class="user-message">Select a date and room type to search available rooms.</p>`
}

function renderCards(booking, room) {
    return (`<article class="booking-card" tabindex="0">
                <p>Date: ${booking.date}</p>
                <p>Room #${booking.roomNumber}</p>
                <p>${room.roomType.toUpperCase()}</p>
                <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
                <p>Bidet: ${displayBidetStatus(room)}</p>
                <p>$${room.costPerNight}</p>
            </article>`)
}

function availableRoomCards(room) {
    return (`<article class="booking-card" id="${selectedDate.value}-${room.number}" tabindex="0">
                <p>Date: ${selectedDate.value}</p>
                <p>Room #${room.number}</p>
                <p>${room.roomType.toUpperCase()}</p>
                <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
                <p>Bidet: ${displayBidetStatus(room)}</p>
                <p>$${room.costPerNight}</p>
                <button class="book-room" label="book-room" type="button" id="bookRoom" tabindex="0">Book Room</button>
            </article>`)
}

function getCurrentDate() {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currDate = `${year}/${month}/${day}`
    return currDate
}

function displayBidetStatus(room) {
    if (room.bidet) {
        return "Yes"
    } else {
        return "No"
    }
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map