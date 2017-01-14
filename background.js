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

	var _itaucard = __webpack_require__(1);

	var _itaucard2 = _interopRequireDefault(_itaucard);

	var _amex = __webpack_require__(2);

	var _amex2 = _interopRequireDefault(_amex);

	var _buildOFX = __webpack_require__(3);

	var _buildOFX2 = _interopRequireDefault(_buildOFX);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	chrome.browserAction.onClicked.addListener(function (tab) {
	    var script = null;
	    var name = null;
	    if (tab.url.match(/americanexpressonline/)) {
	        script = _amex2.default;
	        name = 'amex';
	    } else if (tab.url.match(/itaubankline\.itau\.com\.br/)) {
	        script = _itaucard2.default;
	        name = 'itaucard';
	    }
	    if (script) {
	        chrome.tabs.executeScript(null, {
	            code: '(' + _buildOFX2.default + ')((' + script + ')(), \'' + name + '\')'
	        });
	    }
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
	    return transactions;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = parseAmex;
	// parse www.americanexpressonline.com.br/amex/extrato
	function parseAmex() {
	    function filter(e) {
	        return e.querySelectorAll('td').length == 3;
	    }

	    var elements = [].slice.call(document.querySelectorAll('.sldLanctos table tr:not(.infoBarTit):not(.data)'));
	    return elements.filter(filter).map(function (row) {
	        var cols = [].slice.call(row.querySelectorAll('td')).map(function (col, i) {
	            return col.innerText;
	        });
	        var date = cols[0].split("/");
	        var description = cols[1].split("\n");
	        return {
	            date: new Date(date[2], parseInt(date[1]) - 1, date[0]),
	            description: description[0].trim(),
	            memo: (description[1] || '').trim(),
	            value: parseFloat(cols[2].replace('R$', '').trim().replace('.', '').replace(',', '.'))
	        };
	    });
	}
	console.log(parseAmex());

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = buildOfx;
	function buildOfx(transactions, name) {

	    function toMoney(v) {
	        return v.toFixed(2);
	    }

	    function toDate(d) {
	        return '' + d.getFullYear() + zeroPad(d.getMonth() + 1) + zeroPad(d.getDate()) + '100000';
	    }

	    function zeroPad(value) {
	        return value < 10 ? '0' + value : value;
	    }

	    var ofxHeader = 'OFXHEADER:100\nDATA:OFXSGML\nVERSION:102\nSECURITY:NONE\nENCODING:USASCII\nCHARSET:1252\nCOMPRESSION:NONE\nOLDFILEUID:NONE\nNEWFILEUID:NONE\n\n<OFX>\n<SIGNONMSGSRSV1>\n<SONRS>\n<STATUS>\n<CODE>0\n<SEVERITY>INFO\n</STATUS>\n<DTSERVER>' + toDate(new Date()) + '[-03:EST]\n<LANGUAGE>POR\n</SONRS>\n</SIGNONMSGSRSV1>\n<BANKMSGSRSV1>\n<STMTTRNRS>\n<TRNUID>1001\n<STATUS>\n<CODE>0\n<SEVERITY>INFO\n</STATUS>\n<STMTRS>\n<CURDEF>BRL\n<BANKTRANLIST>\r\n';

	    ofxHeader += transactions.map(function (_ref) {
	        var date = _ref.date,
	            value = _ref.value,
	            description = _ref.description;

	        return '<STMTTRN>\n<TRNTYPE>' + (value < 0 ? 'DEBIT' : 'CREDIT') + '\n<DTPOSTED>' + toDate(date) + '[-03:EST]\n<TRNAMT>' + toMoney(value) + '\n<MEMO>' + description + '\n</STMTTRN>\r\n';
	    }).join("");

	    var content = ofxHeader + '</BANKTRANLIST>\n</STMTRS>\n</STMTTRNRS>\n</BANKMSGSRSV1>\n</OFX>';

	    var a = document.createElement("a");
	    a.download = name + ".ofx";
	    a.href = "data:application/x-ofx;charset=utf-8," + encodeURIComponent(content);
	    a.click();
	}

/***/ }
/******/ ]);