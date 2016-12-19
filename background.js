/******/ (function(modules) { // webpackBootstrap
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

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	chrome.browserAction.onClicked.addListener(function (tab) {
	    chrome.tabs.executeScript(null, {
	        code: '(' + _app2.default + ')()'
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var s = '#TRNcontainer01 > table:nth-child(12) > tbody > tr:nth-child(1) > td:nth-child(4) table tbody tr';

	    function parseDate(text) {
	        var values = text.split('/'),
	            dia = values[0],
	            mes = values[1];
	        return new Date(new Date().getFullYear(), parseInt(mes) - 1, parseInt(dia));
	    }

	    function parseMoney(text) {
	        return parseFloat(text.replace('.', '').replace(',', '.'));
	    }

	    function toMoney(v) {
	        return v.toFixed(2);
	    }

	    function toDate(d) {
	        return '' + d.getFullYear() + zeroPad(d.getMonth() + 1) + zeroPad(d.getDate()) + '100000';
	    }

	    function zeroPad(value) {
	        return value < 10 ? '0' + value : value;
	    }

	    var transactions = [];
	    document.querySelectorAll(s).forEach(function (row) {
	        var cols = row.querySelectorAll('td');
	        if (cols.length == 3) {
	            var c = Array.prototype.map.call(cols, function (e) {
	                return e.innerText;
	            });
	            if (c[0].match(/^\d{2}\/\d{2}/)) {
	                var data = c[0],
	                    description = c[1],
	                    value = c[2];
	                transactions.push({
	                    date: parseDate(data),
	                    description: description,
	                    value: -parseMoney(value)
	                });
	            }
	        }
	    });

	    function buildOfx(transactions) {
	        var ofxHeader = 'OFXHEADER:100\nDATA:OFXSGML\nVERSION:102\nSECURITY:NONE\nENCODING:USASCII\nCHARSET:1252\nCOMPRESSION:NONE\nOLDFILEUID:NONE\nNEWFILEUID:NONE\n\n<OFX>\n<SIGNONMSGSRSV1>\n<SONRS>\n<STATUS>\n<CODE>0\n<SEVERITY>INFO\n</STATUS>\n<DTSERVER>' + toDate(new Date()) + '[-03:EST]\n<LANGUAGE>POR\n</SONRS>\n</SIGNONMSGSRSV1>\n<BANKMSGSRSV1>\n<STMTTRNRS>\n<TRNUID>1001\n<STATUS>\n<CODE>0\n<SEVERITY>INFO\n</STATUS>\n<STMTRS>\n<CURDEF>BRL\n<BANKTRANLIST>\r\n';

	        ofxHeader += transactions.map(function (_ref) {
	            var date = _ref.date,
	                value = _ref.value,
	                description = _ref.description;

	            return '<STMTTRN>\n<TRNTYPE>' + (value < 0 ? 'DEBIT' : 'CREDIT') + '\n<DTPOSTED>' + toDate(date) + '[-03:EST]\n<TRNAMT>' + toMoney(value) + '\n<MEMO>' + description + '\n</STMTTRN>\r\n';
	        }).join("");

	        return ofxHeader + '</BANKTRANLIST>\n</STMTRS>\n</STMTTRNRS>\n</BANKMSGSRSV1>\n</OFX>';
	    }

	    var a = document.createElement("a");
	    a.download = "visa.ofx";
	    a.href = "data:application/x-ofx;charset=utf-8," + encodeURIComponent(buildOfx(transactions));
	    a.click();
	};

/***/ }
/******/ ]);