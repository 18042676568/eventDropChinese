(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["eventDrops"] = factory();
	else
		root["eventDrops"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var md5 = __webpack_require__(2);
	var repositories = __webpack_require__(3);
	
	var colors = d3.scale.category10();
	var gravatar = function gravatar(email) {
	    return 'https://www.gravatar.com/avatar/' + md5(email.trim().toLowerCase());
	};
	
	// September 4 1986 8:30 PM
	var humanizeDate = function humanizeDate(date) {
	    var monthNames = ['Jan.', 'Feb.', 'March', 'Apr.', 'May', 'June', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
	
	    return '\n        ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + '\n        ' + date.getHours() + ':' + date.getMinutes() + '\n    ';
	};
	
	var FONT_SIZE = 16; // in pixels
	var TOOLTIP_WIDTH = 30; // in rem
	
	// we're gonna create a tooltip per drop to prevent from transition issues
	var showTooltip = function showTooltip(commit) {
	    d3.select('body').selectAll('.tooltip').remove();
	
	    var tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0); // hide it by default
	
	    // show the tooltip with a small animation
	    tooltip.transition().duration(200).each('start', function start() {
	        d3.select(this).style('block');
	    }).style('opacity', 1);
	
	    var rightOrLeftLimit = FONT_SIZE * TOOLTIP_WIDTH;
	    var direction = d3.event.pageX > rightOrLeftLimit ? 'right' : 'left';
	
	    var ARROW_MARGIN = 1.65;
	    var ARROW_WIDTH = FONT_SIZE;
	    var left = direction === 'right' ? d3.event.pageX - rightOrLeftLimit : d3.event.pageX - ARROW_MARGIN * FONT_SIZE - ARROW_WIDTH / 2;
	
	    tooltip.html('\n            <div class="commit">\n                <img class="avatar" src="' + gravatar(commit.author.email) + '" alt="' + commit.author.name + '" title="' + commit.author.name + '" />\n                <div class="content">\n                    <h3 class="message">' + commit.message + '</h3>\n                    <p>\n                        <a href="https://www.github.com/' + commit.author.name + '" class="author">' + commit.author.name + '</a>\n                        on <span class="date">' + humanizeDate(new Date(commit.date)) + '</span> -\n                        <a class="sha" href="' + commit.sha + '">' + commit.sha.substr(0, 10) + '</a>\n                    </p>\n                </div>\n            </div>\n        ').classed(direction, true).style({
	        left: left + 'px',
	        top: d3.event.pageY + 16 + 'px'
	    });
	};
	
	var hideTooltip = function hideTooltip() {
	    d3.select('.tooltip').transition().duration(200).each('end', function end() {
	        this.remove();
	    }).style('opacity', 0);
	};
	
	var chart = d3.chart.eventDrops().start(new Date(new Date().getTime() - 3600000 * 24 * 365)) // one year ago
	.end(new Date()).eventLineColor(function (d, i) {
	    return colors(i);
	}).date(function (d) {
	    return new Date(d.date);
	}).mouseover(showTooltip).mouseout(hideTooltip);
	
	var element = d3.select('#eventdrops-demo').datum(repositories.map(function (repository) {
	    return {
	        name: repository.name,
	        data: repository.commits
	    };
	}));
	
	chart(element);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	// @see https://css-tricks.com/snippets/javascript/javascript-md5/
	module.exports = function (string) {
	
	        function RotateLeft(lValue, iShiftBits) {
	                return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
	        }
	
	        function AddUnsigned(lX, lY) {
	                var lX4, lY4, lX8, lY8, lResult;
	                lX8 = lX & 0x80000000;
	                lY8 = lY & 0x80000000;
	                lX4 = lX & 0x40000000;
	                lY4 = lY & 0x40000000;
	                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
	                if (lX4 & lY4) {
	                        return lResult ^ 0x80000000 ^ lX8 ^ lY8;
	                }
	                if (lX4 | lY4) {
	                        if (lResult & 0x40000000) {
	                                return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
	                        } else {
	                                return lResult ^ 0x40000000 ^ lX8 ^ lY8;
	                        }
	                } else {
	                        return lResult ^ lX8 ^ lY8;
	                }
	        }
	
	        function F(x, y, z) {
	                return x & y | ~x & z;
	        }
	        function G(x, y, z) {
	                return x & z | y & ~z;
	        }
	        function H(x, y, z) {
	                return x ^ y ^ z;
	        }
	        function I(x, y, z) {
	                return y ^ (x | ~z);
	        }
	
	        function FF(a, b, c, d, x, s, ac) {
	                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
	                return AddUnsigned(RotateLeft(a, s), b);
	        };
	
	        function GG(a, b, c, d, x, s, ac) {
	                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	                return AddUnsigned(RotateLeft(a, s), b);
	        };
	
	        function HH(a, b, c, d, x, s, ac) {
	                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	                return AddUnsigned(RotateLeft(a, s), b);
	        };
	
	        function II(a, b, c, d, x, s, ac) {
	                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	                return AddUnsigned(RotateLeft(a, s), b);
	        };
	
	        function ConvertToWordArray(string) {
	                var lWordCount;
	                var lMessageLength = string.length;
	                var lNumberOfWords_temp1 = lMessageLength + 8;
	                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
	                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
	                var lWordArray = Array(lNumberOfWords - 1);
	                var lBytePosition = 0;
	                var lByteCount = 0;
	                while (lByteCount < lMessageLength) {
	                        lWordCount = (lByteCount - lByteCount % 4) / 4;
	                        lBytePosition = lByteCount % 4 * 8;
	                        lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
	                        lByteCount++;
	                }
	                lWordCount = (lByteCount - lByteCount % 4) / 4;
	                lBytePosition = lByteCount % 4 * 8;
	                lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
	                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
	                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
	                return lWordArray;
	        };
	
	        function WordToHex(lValue) {
	                var WordToHexValue = "",
	                    WordToHexValue_temp = "",
	                    lByte,
	                    lCount;
	                for (lCount = 0; lCount <= 3; lCount++) {
	                        lByte = lValue >>> lCount * 8 & 255;
	                        WordToHexValue_temp = "0" + lByte.toString(16);
	                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
	                }
	                return WordToHexValue;
	        };
	
	        function Utf8Encode(string) {
	                string = string.replace(/\r\n/g, "\n");
	                var utftext = "";
	
	                for (var n = 0; n < string.length; n++) {
	
	                        var c = string.charCodeAt(n);
	
	                        if (c < 128) {
	                                utftext += String.fromCharCode(c);
	                        } else if (c > 127 && c < 2048) {
	                                utftext += String.fromCharCode(c >> 6 | 192);
	                                utftext += String.fromCharCode(c & 63 | 128);
	                        } else {
	                                utftext += String.fromCharCode(c >> 12 | 224);
	                                utftext += String.fromCharCode(c >> 6 & 63 | 128);
	                                utftext += String.fromCharCode(c & 63 | 128);
	                        }
	                }
	
	                return utftext;
	        };
	
	        var x = Array();
	        var k, AA, BB, CC, DD, a, b, c, d;
	        var S11 = 7,
	            S12 = 12,
	            S13 = 17,
	            S14 = 22;
	        var S21 = 5,
	            S22 = 9,
	            S23 = 14,
	            S24 = 20;
	        var S31 = 4,
	            S32 = 11,
	            S33 = 16,
	            S34 = 23;
	        var S41 = 6,
	            S42 = 10,
	            S43 = 15,
	            S44 = 21;
	
	        string = Utf8Encode(string);
	
	        x = ConvertToWordArray(string);
	
	        a = 0x67452301;b = 0xEFCDAB89;c = 0x98BADCFE;d = 0x10325476;
	
	        for (k = 0; k < x.length; k += 16) {
	                AA = a;BB = b;CC = c;DD = d;
	                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
	                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
	                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
	                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
	                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
	                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
	                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
	                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
	                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
	                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
	                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
	                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
	                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
	                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
	                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
	                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
	                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
	                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
	                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
	                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
	                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
	                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
	                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
	                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
	                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
	                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
	                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
	                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
	                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
	                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
	                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
	                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
	                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
	                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
	                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
	                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
	                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
	                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
	                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
	                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
	                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
	                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
	                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
	                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
	                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
	                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
	                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
	                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
	                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
	                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
	                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
	                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
	                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
	                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
	                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
	                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
	                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
	                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
	                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
	                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
	                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
	                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
	                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
	                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
	                a = AddUnsigned(a, AA);
	                b = AddUnsigned(b, BB);
	                c = AddUnsigned(c, CC);
	                d = AddUnsigned(d, DD);
	        }
	
	        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
	
	        return temp.toLowerCase();
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "admin-on-rest",
			"commits": [
				{
					"sha": "ad4a690c2708e11156e24534e01238df16b07f23",
					"message": "Merge-pull-request-19-from-marmelab-jpetitcolas-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Sep 2016 12:04:14 +0200"
				},
				{
					"sha": "8110e85434d4cc87212dc5d8534e3e1069e174c2",
					"message": "Doc-how-to-use-dev-version-in-real-world-project",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 7 Sep 2016 11:16:40 +0200"
				},
				{
					"sha": "91e994dd41c08d3186c729f19992cb94a3d8bb9e",
					"message": "Merge-pull-request-16-from-marmelab-reference_input_child",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 7 Sep 2016 09:12:45 +0200"
				},
				{
					"sha": "4bf8e462ae8d4c21a91269bbfd0d515ece7a2f0c",
					"message": "Fix-layout-bugs-add-RadioButtonGroupInput-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Sep 2016 00:07:30 +0200"
				},
				{
					"sha": "b054519f6f8e3feaed5490fffa76dfd247a43223",
					"message": "Merge-pull-request-17-from-marmelab-fetchutil_export",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 23:57:53 +0200"
				},
				{
					"sha": "3bf05063e6a6b71c35bc921a09a7511e1a0aca48",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 22:11:33 +0200"
				},
				{
					"sha": "6776008c66bd050af494ba801148e9ed678b22fe",
					"message": "Merge-SelectInput-and-SelectObjectInput-change-attribute-names",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 21:56:09 +0200"
				},
				{
					"sha": "c3f8bc9dea822c191879f6a5203a39606aee5892",
					"message": "Fix-fetchUtil-export",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 19:27:20 +0200"
				},
				{
					"sha": "f875c0976257713aa7db47ecb1ed3e2139ab235b",
					"message": "Merge-pull-request-11-from-greg0ire-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 19:07:49 +0200"
				},
				{
					"sha": "071f7a36f354c7f3374b44b2e62e1120b9239520",
					"message": "Merge-pull-request-13-from-greg0ire-fix_case_mismatch",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 19:07:16 +0200"
				},
				{
					"sha": "4f5b4089263596db67599c695fd66faa1763bbe5",
					"message": "Move-ReferenceInput-display-logic-to-a-child-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 19:00:29 +0200"
				},
				{
					"sha": "08dd694ef2547d47d5a75f89c7ded535cff926cf",
					"message": "Match-definition-and-call-together",
					"author": {
						"name": "Grégoire Paris",
						"email": "gparis@universcine.com"
					},
					"date": "Tue, 6 Sep 2016 18:01:26 +0200"
				},
				{
					"sha": "867c9181adb802cedf1c80c259eb0c17e7cd9d1c",
					"message": "Recommend-the-local-version-of-the-tutorial",
					"author": {
						"name": "Grégoire Paris",
						"email": "postmaster@greg0ire.fr"
					},
					"date": "Tue, 6 Sep 2016 16:35:35 +0200"
				},
				{
					"sha": "8bbfad9b2d27cc6e2611ee91bcc0f1c5d8416764",
					"message": "Merge-pull-request-10-from-marmelab-allow_reference_to_repository_in_npm",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 17:32:38 +0200"
				},
				{
					"sha": "e41a6d470b715a96e511cea2a9426190bb0bfdb0",
					"message": "Merge-pull-request-12-from-greg0ire-patch-2",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 17:11:12 +0200"
				},
				{
					"sha": "6da44a27ce733133d3c01c7d4692dc3d3f4c890f",
					"message": "Proofread-the-tutorial",
					"author": {
						"name": "Grégoire Paris",
						"email": "postmaster@greg0ire.fr"
					},
					"date": "Tue, 6 Sep 2016 17:03:53 +0200"
				},
				{
					"sha": "7790cfc5df62e344a690ea1c9854ed9a08457bbb",
					"message": "Merge-pull-request-9-from-VaclavSir-install-babel-runtime",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 17:01:22 +0200"
				},
				{
					"sha": "b79045a41ca35d58e9074833a5526c8e3356513e",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 16:51:27 +0200"
				},
				{
					"sha": "7e941d1890bca0d209a63312ea8379f51f7d7b5e",
					"message": "RFR-Added-to-npm",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 16:17:39 +0200"
				},
				{
					"sha": "ec741c5a08bd29378e8d8bf5bd4ab488381720d3",
					"message": "npm-install-save-babel-runtime",
					"author": {
						"name": "Václav Šír",
						"email": "vaclav.sir@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 12:46:26 +0200"
				},
				{
					"sha": "de4e498407a94cbb0a9427cdb6f5483d81d3cd91",
					"message": "Merge-pull-request-6-from-marmelab-single_field_list",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 14:45:52 +0200"
				},
				{
					"sha": "3f617cef30809477ccbdabeee713274de8f18036",
					"message": "Fix-unit-tests-after-moving-file",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 13:50:30 +0200"
				},
				{
					"sha": "b0dad70093b62fb6c1590a144ef1572b5616446c",
					"message": "Fix-tests-move-list-component-to-list-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 13:28:00 +0200"
				},
				{
					"sha": "16b36bad9c73345b57779a565def662ae7b1fc46",
					"message": "Remove-ReferenceManyListField-introduce-SingleFieldList",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 13:20:43 +0200"
				},
				{
					"sha": "2a547afa9143a99e3d1372ae74c52b4d46ec742f",
					"message": "Merge-pull-request-2-from-marmelab-reference_many",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 12:43:12 +0200"
				},
				{
					"sha": "dd786f53d050183b8c75714f64f98ae915354ef2",
					"message": "Improve-code-readability",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 12:41:06 +0200"
				},
				{
					"sha": "878422edea449e3a8b359453e0c08871aff0ff2a",
					"message": "Merge-pull-request-5-from-marmelab-simple_title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 12:01:09 +0200"
				},
				{
					"sha": "9be483ad267f6ebbac020eba0b4bdbf0af355252",
					"message": "even-simpler-to-use-through-props-on-component",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 11:53:06 +0200"
				},
				{
					"sha": "ce0ee256788b1f436caa2a022b65124e892c9447",
					"message": "remove-debug",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 11:39:34 +0200"
				},
				{
					"sha": "71abad76b546a99560a948a8ae55e632b5349792",
					"message": "missing-file",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 11:27:03 +0200"
				},
				{
					"sha": "fa17a9dd5b1b14bf779a38bd0538ecd17db40161",
					"message": "remove-debug",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 11:23:32 +0200"
				},
				{
					"sha": "9d8646fe3ce52ac40103c113902274a1a6164353",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 11:22:47 +0200"
				},
				{
					"sha": "3d749922f601a94975e7ae048d0f3fca2e540ac1",
					"message": "Automate-label-handling",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 09:58:40 +0200"
				},
				{
					"sha": "1681b7f4bd40da2f82a1aa3d85133566c086c7bc",
					"message": "fix-deps",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 08:24:54 +0200"
				},
				{
					"sha": "67d71599c6105105ff883e33ff30157e35d0785e",
					"message": "Use-React.cloneElement-instead-of-children.type-.props",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 23:20:32 +0200"
				},
				{
					"sha": "df66802ef7fa20ba9dadc0ef0a5859ef1aed4bf3",
					"message": "Make-Datagrid-element-public-push-its-use-in-ReferenceManyListField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 23:08:42 +0200"
				},
				{
					"sha": "a2e4e6c93311bc9faf50c1e27a307d9e6f7eb909",
					"message": "RFR-Make-overring-the-title-easier",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 20:57:14 +0200"
				},
				{
					"sha": "9ec65e14a82b570a423b8fe1dcbc4a0376fc4c75",
					"message": "Merge-pull-request-4-from-marmelab-fix_filter_reset",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 19:02:05 +0200"
				},
				{
					"sha": "734015aefb2bbc05321959e760fd9932009b0ffc",
					"message": "Add-unit-test-for-ReferenceManyField-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 19:01:09 +0200"
				},
				{
					"sha": "988e3597cb8d656bd737dada389367a7d902d044",
					"message": "Change-ReferenceField-to-use-a-child-field-to-display-ref-source",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 16:52:48 +0200"
				},
				{
					"sha": "af78ae3d8c225b6b6cfdaef4b09f74ec8e1dcfcf",
					"message": "RFR-Fix-list-filter-reset",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 15:12:35 +0200"
				},
				{
					"sha": "fe981dc9b7aad1df2e8177068c6198bd99cfd529",
					"message": "Reverted-example-to-use-ReferenceManyDatagridField-for-posts",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 3 Sep 2016 23:30:54 +0200"
				},
				{
					"sha": "36dad06b8ff192dc918b148bf89431ebe84f9de0",
					"message": "Don-t-Repeat-Yourself",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 3 Sep 2016 23:05:19 +0200"
				},
				{
					"sha": "983e59fbfc6537c61c201adb8e2e03fb767dd2f4",
					"message": "Introducing-ChipField-to-be-used-in-ReferenceManyField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 3 Sep 2016 23:02:42 +0200"
				},
				{
					"sha": "2dc4fac60c3851a5a311227391dcc54503c00620",
					"message": "Introducing-ReferenceManyField-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 3 Sep 2016 22:44:10 +0200"
				},
				{
					"sha": "c8539f7f09a8c312cfc9a4ebb5a8f42048fee9db",
					"message": "Move-label-out-of-ReferenceManyField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 3 Sep 2016 22:10:58 +0200"
				},
				{
					"sha": "6ae3eb84c0ae0cba75a561adee2cec585f07d6ac",
					"message": "Impove-look-and-feel",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 21 Aug 2016 13:27:08 +0200"
				},
				{
					"sha": "31f8b97f63b02a5b996eedfab2fa430c763f7209",
					"message": "Implement-basic-one-to-many-field-WIP",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 21 Aug 2016 12:51:59 +0200"
				},
				{
					"sha": "0d19e5374529d40138987bd15ed3ad1b10af283e",
					"message": "Refactor-reference-fetch-to-prepare-for-the-reference_many-impl",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 21 Aug 2016 11:15:07 +0200"
				},
				{
					"sha": "ed27f0a8a07dd22b127ffff71102c04a10a55a9d",
					"message": "Switch-Travis-badge-to-Travis.org-now-that-the-lib-is-OSS",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 3 Sep 2016 23:08:30 +0200"
				},
				{
					"sha": "42523dd6f2d7350f292bb5dd65967bcb1cc7bf5f",
					"message": "Add-build-status",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Aug 2016 09:20:54 +0200"
				},
				{
					"sha": "d59184912fffba58f4d50fcff2a6c40e559a4dfc",
					"message": "Merge-pull-request-1-from-marmelab-continuous_integration",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Aug 2016 09:19:47 +0200"
				},
				{
					"sha": "4020e69ae8f0d4230933c515e8e62850717da747",
					"message": "Add-Travis-CI-build-config",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Aug 2016 09:17:26 +0200"
				},
				{
					"sha": "415c6b4c8706811201b2dfe97f9137b9f09eb944",
					"message": "Add-basic-mui-component-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Aug 2016 16:47:10 +0200"
				},
				{
					"sha": "0f4cf1a6f3ed9475cd6454d95e0b82b854eada73",
					"message": "Remove-hard-copy-of-FakeRest-use-npm-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 16:09:34 +0200"
				},
				{
					"sha": "4286be58e00ad130cae91f98777aa9b78d744d21",
					"message": "Remove-no-longer-userful-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:55:31 +0200"
				},
				{
					"sha": "a17a39c588a3e2dee0b4c532daf3a038b38b0b30",
					"message": "Add-basic-reducer-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:50:06 +0200"
				},
				{
					"sha": "bf903e0619c8252517b16e01ba4a6a7b103b2738",
					"message": "Reduce-nb-files-in-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:39:14 +0200"
				},
				{
					"sha": "656ee31ee163f72863244796ee342aefa71e8ba3",
					"message": "Fix-typo-in-tutorial-link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:30:57 +0200"
				},
				{
					"sha": "99b61b313e4ca9cd9bb633358ff15b484df3da9e",
					"message": "Fix-typo-in-filename",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:29:43 +0200"
				},
				{
					"sha": "ac925dbed77e87a5c94a55d274b8429d3eff82db",
					"message": "Push-version-to-0.2.0",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:25:09 +0200"
				},
				{
					"sha": "e6b19f31e7fa306e3c68872f56f2efbe562a52b9",
					"message": "Hide-ugly-underline-on-app-title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:24:27 +0200"
				},
				{
					"sha": "9551d9822dbec8a2d7294ed1314795eee943b14b",
					"message": "Add-screenshots-to-tutorial",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 15:22:59 +0200"
				},
				{
					"sha": "584a5de7e754e69c20ca783b3d4f0976a652920f",
					"message": "Add-screencast",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 14:51:40 +0200"
				},
				{
					"sha": "7af80a5bffc3d8552e597827cf331d7dffe73270",
					"message": "Fix-DateField-sending-serialized-date-objects",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 14:38:43 +0200"
				},
				{
					"sha": "d416c035af4e7de4af7d1f986de50cfe64715fe6",
					"message": "Fix-redirect-breaks-loader",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 14:22:06 +0200"
				},
				{
					"sha": "d852e0c7849764e30d88ecc6c1225985c20ae964",
					"message": "Remove-useless-repetitions-in-tutorial",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 13:49:23 +0200"
				},
				{
					"sha": "cb996401127c6ae162bb7804155daf8abecaa018",
					"message": "Add-delay-on-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 13:49:03 +0200"
				},
				{
					"sha": "0288cbb6bc0fdebecafe82cb6415cca7e832f031",
					"message": "Finalize-tutorial",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 13:24:15 +0200"
				},
				{
					"sha": "fb728c6c7746915e600dfd8a12ea59a78a2c65ef",
					"message": "Export-REST-types-constants",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 12:53:32 +0200"
				},
				{
					"sha": "0ff6cc6f3ef7b87de2e72c0575bfd6956e1d2c3f",
					"message": "Add-link-to-dashboard-in-app-title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 12:39:41 +0200"
				},
				{
					"sha": "1f65a55170c69d494a620abe9480b6f5e0497778",
					"message": "Add-ability-to-define-a-custom-dashboard-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 11:50:52 +0200"
				},
				{
					"sha": "70da79972fcd788a1aa317852328a5ab22248722",
					"message": "Rename-Datagrid-to-List-and-introduce-Datagrid-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Aug 2016 11:50:32 +0200"
				},
				{
					"sha": "c3e4b4a0fe6d8ee81fb9bbccb604eb1f59507413",
					"message": "Add-tutorial-first-part",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 19:28:33 +0200"
				},
				{
					"sha": "3cd7cecaa4b48af31c67ed96b6c93b48585dfd17",
					"message": "Build-for-production",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 18:25:14 +0200"
				},
				{
					"sha": "99b444ef40ddf9c8979a36eb3d6bb491c2ce1747",
					"message": "Fix-bug-in-datagrid-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 18:24:58 +0200"
				},
				{
					"sha": "2e2604d0d93a420dc61e1b30d5f6dada501e4f12",
					"message": "Reenable-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 18:04:02 +0200"
				},
				{
					"sha": "583e971f4ba0b15169a4880600ce4de341914ff4",
					"message": "Move-list-params-state-from-redux-to-router",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 16:06:00 +0200"
				},
				{
					"sha": "4ffb9c31dfcd08865393f2366a55a7305d923d00",
					"message": "push-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 12:09:42 +0200"
				},
				{
					"sha": "0ca8a27a4011df2a83ce70029b51573618ea0256",
					"message": "Fix-webpack-yelling-at-me-with-no-intelligible-error-message",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 12:06:44 +0200"
				},
				{
					"sha": "2043e8e203b2d0e4b2498eb98c2bf493baf03d13",
					"message": "Remove-warnings-and-finalize-packaging",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 11:40:15 +0200"
				},
				{
					"sha": "952bfa6f23050dfe4e539b3036b440bc31e076aa",
					"message": "Testing-with-json-server",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 12 Aug 2016 09:48:04 +0200"
				},
				{
					"sha": "6ed63bd4fd6ab1adbdaba3f6f04c898adb21758b",
					"message": "Fix-typo-in-package.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 11 Aug 2016 15:17:23 +0200"
				},
				{
					"sha": "8bfdc6c74f7fdae97ad47c9ba9ed52f3d07ecb57",
					"message": "Add-License",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 11 Aug 2016 15:16:02 +0200"
				},
				{
					"sha": "dcf96e95822e99c2addeeb4a44e7bf08f527dc43",
					"message": "Fix-absolute-paths-in-require",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 17:03:08 +0200"
				},
				{
					"sha": "0bc636f03a80e9e37e48627262b2efdb63aabfe7",
					"message": "remove-old-useless-file",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 16:59:51 +0200"
				},
				{
					"sha": "b2718eab2c36248bd68eafca2d9cb9c42b9de70a",
					"message": "simplify-example-directory-structure",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 16:57:53 +0200"
				},
				{
					"sha": "7c93bbb2b637ceabb13d9292870baeef8f90be48",
					"message": "Move-config-components-out-of-the-mui-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 16:55:55 +0200"
				},
				{
					"sha": "667f743120185fcc3aa9bfdf4dbd05acd8fed19d",
					"message": "Visual-adjustments-on-reference-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 16:48:34 +0200"
				},
				{
					"sha": "92f5d8a80ce2bbd534b706f7049f72efd07f0cb5",
					"message": "Tweak-filter-for-references",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 16:33:21 +0200"
				},
				{
					"sha": "1cb8bba824dd5be115ec7f1f964eb19ca77f314f",
					"message": "Make-active-zones-stand-out-more",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 15:35:17 +0200"
				},
				{
					"sha": "da657941671482aab3c70a4e8a6a7a6382b2d34f",
					"message": "Add-filter-button",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 8 Aug 2016 15:30:54 +0200"
				},
				{
					"sha": "594955dfe67f24809b97ee91f63ad14d2ef6c653",
					"message": "Introducing-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 7 Aug 2016 23:23:49 +0200"
				},
				{
					"sha": "c1e63f9a97ecec44e0b08caa6ca391be76d19e17",
					"message": "minor-fixes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 7 Aug 2016 23:21:03 +0200"
				},
				{
					"sha": "418d0bd5d3a4f83c2926d47d4ffbc1e9c14de8d9",
					"message": "Add-deletion-handling",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 6 Aug 2016 23:26:22 +0200"
				},
				{
					"sha": "a9af460c7b54c8e865a8fb3282fcb6ba79891698",
					"message": "Prevent-duplicate-rendering-on-top-level-components",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 6 Aug 2016 22:40:48 +0200"
				},
				{
					"sha": "381d05076ba91acdd5fcca66e5e305de1dac0d77",
					"message": "Slightly-improve-display-performance-of-detail-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 6 Aug 2016 21:09:21 +0200"
				},
				{
					"sha": "b39a219dcb17726621d485c0b9a3cc241389be92",
					"message": "Improve-view-title-configurability-and-default-value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 6 Aug 2016 19:34:08 +0200"
				},
				{
					"sha": "cd8a324fbf2c1480b373d4ce38b6c4b6d8d9dc3b",
					"message": "Improve-Flex-layout",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 6 Aug 2016 14:59:08 +0200"
				},
				{
					"sha": "fb0c2530cac2eef4b67d95e5ec226fe51dd68ef6",
					"message": "Introducing-Menu-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 6 Aug 2016 14:49:57 +0200"
				},
				{
					"sha": "978f2f8a8870baaf2330b8200a705a27d5c4f786",
					"message": "Harmonize-wording-for-configuration-only-components",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Aug 2016 22:16:20 +0200"
				},
				{
					"sha": "f0b76db110654432b0c3968a4501c52ea1fb0d0b",
					"message": "Do-not-display-create-button-if-there-is-no-create-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Aug 2016 22:15:56 +0200"
				},
				{
					"sha": "b79de8689e0c975e6470bf1c1859620083ae5adf",
					"message": "BasePAth-is-injected-to-all-fields",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Aug 2016 22:15:20 +0200"
				},
				{
					"sha": "df3922663e720c33df74227fba3aaba2dc69fe2f",
					"message": "Improve-documentation-for-simple-REST-client",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Aug 2016 22:00:49 +0200"
				},
				{
					"sha": "7a27d54c1a539a9a7b4a418b1c19df0fcc711304",
					"message": "Move-double-action-logic-from-saga-to-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Aug 2016 21:51:06 +0200"
				},
				{
					"sha": "edea5db08a60d0ca9bbb82d02f2e5aebb81a0680",
					"message": "Handle-cache-invalidation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Aug 2016 21:38:59 +0200"
				},
				{
					"sha": "7800995e8e3a69b2e098191c8938f27d0d083d66",
					"message": "small-refactoring-on-data-reducer",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 19:38:47 +0200"
				},
				{
					"sha": "ba9834f5427e229bc00d2940854616f59b50c94e",
					"message": "Make-reference-edition-work-on-creation-page",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 19:26:49 +0200"
				},
				{
					"sha": "20ad79024d061c713cacb547efd0259c1a44fbee",
					"message": "Handle-reference-change",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 18:58:59 +0200"
				},
				{
					"sha": "76ce08786f047258136675ec9d4abfa4da154e11",
					"message": "Load-possible-choices-for-reference-input",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 18:38:14 +0200"
				},
				{
					"sha": "7ee6640e47dbbb77d01c3ebfb928f3ef1a9c7a33",
					"message": "introducing-the-CRUD_GET_ONE_REFERENCE_AND_OPTIONS-action",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 17:40:09 +0200"
				},
				{
					"sha": "023d186b142ef4008f96c116efa8f57098f6f3c9",
					"message": "Introducing-ReferenceInput-does-not-fetch-possible-values-yet",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 17:11:54 +0200"
				},
				{
					"sha": "39ee5eaa9e1775d36f762f66dc1ecf11955090f0",
					"message": "Fix-JSDoc-format-in-rest-client-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 16:19:21 +0200"
				},
				{
					"sha": "0ff59e1aac45ccabe566d763777d1a159a62e75b",
					"message": "detach-REST-types-from-action-names-simplify-REST-response-format",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 16:17:29 +0200"
				},
				{
					"sha": "bf8f868e5653bf8ad9f48d4a1bb5553c422f6b20",
					"message": "Simplify-REST-server-handling-by-introducing-the-REST-client-function",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Jul 2016 15:28:34 +0200"
				},
				{
					"sha": "62aa524ca730e8a4bf9c091a4fccf64ba94254a6",
					"message": "Display-loader-on-reference-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 17:32:01 +0200"
				},
				{
					"sha": "c1c05106541b163298bde1dc754e81c71422f637",
					"message": "Fix-bug-in-Resource-handling",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 16:16:19 +0200"
				},
				{
					"sha": "026a3ff2915989dc909189f2e07b6bfcb0317f14",
					"message": "Introduce-the-Resource-component-to-use-only-components",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 14:59:09 +0200"
				},
				{
					"sha": "b6d3c138434e41fd5f16218624a4cdd0e48e27a0",
					"message": "fix-Typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 14:25:46 +0200"
				},
				{
					"sha": "f46ea83511d18782f1b88af33d1b13668317a3a7",
					"message": "Introduce-the-Admin-component-simplifies-setup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 14:24:20 +0200"
				},
				{
					"sha": "d13b0e0614b7961fb7bfdfef245fedf8c4a7dd5f",
					"message": "Fix-a-bug-where-loader-disappears-when-navigating-too-fast",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 14:00:27 +0200"
				},
				{
					"sha": "0c186f8809df032f3051d6d64f9ae3c7a4672c94",
					"message": "Main-view-appears-tainted-until-the-data-is-fresh",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:55:35 +0200"
				},
				{
					"sha": "a1d95a542729bc7c0b5483dc83008501bea04adf",
					"message": "Fix-typo-in-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:47:51 +0200"
				},
				{
					"sha": "f0d2a376b67cecdfa2c3eb9af85fd4b88d69f360",
					"message": "Document-saga-signature",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:47:00 +0200"
				},
				{
					"sha": "63a577388b0c5d7702da0e0f9d04645cd3047a82",
					"message": "Simplify-example-by-removing-debug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:46:44 +0200"
				},
				{
					"sha": "071c32f84f868534b43abd4e86e6289bdbd36e0c",
					"message": "remove-one-directory-level-in-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:37:50 +0200"
				},
				{
					"sha": "b43bd8b73ae439b1af0f10f432a4008ba35f84d5",
					"message": "Simplify-export-of-actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:24:40 +0200"
				},
				{
					"sha": "51ec69706c3853b958ea6e8cb29b30042131ab46",
					"message": "Rename-default-app",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:21:28 +0200"
				},
				{
					"sha": "3a4b26740cda37f44107738017f07f5787fad716",
					"message": "Move-admin-reducers-under-the-admin-level",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:19:21 +0200"
				},
				{
					"sha": "c6f72fcac3bcd26087350e305bcde1f735d193c3",
					"message": "Better-transpilation-presets-inspired-by-react-router",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 12:04:54 +0200"
				},
				{
					"sha": "01c32e55847a5297638c6f59106197b346265d3b",
					"message": "Move-components-up-one-directory-for-easier-usage",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 11:59:32 +0200"
				},
				{
					"sha": "d3557df2a7744d759e1cb1863b4caa7ab36622ae",
					"message": "Add-index-files-for-components",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 11:48:43 +0200"
				},
				{
					"sha": "9f28c124c82bd1b0672f0c633b1140dd7606e108",
					"message": "Use-real-ilb-name-in-examples",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 11:41:13 +0200"
				},
				{
					"sha": "4d5ab0f0cd5d1b94a77f35395fb7a9d268433167",
					"message": "Build-script",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 11:23:01 +0200"
				},
				{
					"sha": "032403231a7f886f3ab03bae6b3d9b09eda435a3",
					"message": "Move-side-effects-to-saga-subfolder",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 11:06:30 +0200"
				},
				{
					"sha": "796a448bb25008149794c8f3e24341132a19035c",
					"message": "MAke-side-effects-easier-to-configure",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 11:03:56 +0200"
				},
				{
					"sha": "fc1555c01efc079176ee911763c00700feb8ff1f",
					"message": "Fix-issue-in-reference-fetcher",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 10:43:56 +0200"
				},
				{
					"sha": "0a56cde2973e416f48843d2f4ab9ca22c018ad88",
					"message": "Change-name",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Jul 2016 10:36:18 +0200"
				},
				{
					"sha": "0506a828bf5491f18175260f9e2930c2e44ffcb8",
					"message": "Use-ES6-for-event-handler-auto-binding",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 16:16:16 +0200"
				},
				{
					"sha": "d71cc7beecdd64dc913a4003f37fad9b4a979dd2",
					"message": "Add-date-field-and-input",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 16:12:55 +0200"
				},
				{
					"sha": "037a9bdf0b2f98ef94bb0c5d6ae91ede91e79de2",
					"message": "Facilitate-the-reuse-of-bundled-components-by-adding-index",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 15:36:43 +0200"
				},
				{
					"sha": "0cbd671e90d7bfc30866b657349f537cb16ec0e4",
					"message": "Fetch-references-using-CRUD_GET_MANY",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 14:42:18 +0200"
				},
				{
					"sha": "264d2c340c89af6192e0783d90983799298041ad",
					"message": "Dispatch-reference-action-when-displaying-reference",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 09:28:35 +0200"
				},
				{
					"sha": "3bdd11c7b9a850061b975fcc644711345f6c69df",
					"message": "Keep-all-data-in-state",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 09:19:45 +0200"
				},
				{
					"sha": "86e27a20eac32518fb017b3bb739586b08465a88",
					"message": "Fix-loading-indicator-after-refactoring",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 09:19:21 +0200"
				},
				{
					"sha": "33ea93f68d48e23d80399ac78e876d24c59047b3",
					"message": "Add-reference-field-no-reference-fetching-for-now",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 09:14:04 +0200"
				},
				{
					"sha": "0ca4f560eeefbeeacc08621d1ebfc57c9cb89175",
					"message": "Simplify-CRUD_CREATE-success-response",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Jul 2016 08:57:18 +0200"
				},
				{
					"sha": "a0cfcc8f1c0bcf2feaaa5449fc842b3518b73820",
					"message": "Action-files-group-code-by-action",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 25 Jul 2016 18:31:37 +0200"
				},
				{
					"sha": "e5947dac970f1b0429d7581e468f82c6e6e74d61",
					"message": "reducer-dir-structure-mimics-state-structure",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 25 Jul 2016 18:29:52 +0200"
				},
				{
					"sha": "ef311bf68016ba5afc9665ea3da886249f183c46",
					"message": "Move-REST-flavor-logic-to-dedicated-file",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 25 Jul 2016 18:20:07 +0200"
				},
				{
					"sha": "8544b985b86380486e5123c6e84ddfac018f55ff",
					"message": "Add-icons-to-the-menu",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 16:27:56 +0200"
				},
				{
					"sha": "7501986e9e8a8b5030a27ab6f46b7bf972c1cd32",
					"message": "All-projects-MUST-HAVE-a-make-install.-That-s-the-law",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 16:20:35 +0200"
				},
				{
					"sha": "fdec76208e3a6606568fa62e7a91fb1e07a23fd5",
					"message": "Show-error-message-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 16:12:09 +0200"
				},
				{
					"sha": "91315f5a23927eca4580c61d89f9d52c62634dc6",
					"message": "Add-notifications",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 14:32:07 +0200"
				},
				{
					"sha": "f70fe4075969c67675c04c204d3643368df0ebc1",
					"message": "Fix-CSS-glitch-in-datagrid-buttons",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 13:43:33 +0200"
				},
				{
					"sha": "7e97c535e8d9dbb6e0b0d61152472d590b32e993",
					"message": "Update-paths",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 13:40:34 +0200"
				},
				{
					"sha": "00b8a0ddf4b2b23f4fda6af5586876092604a906",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 13:34:57 +0200"
				},
				{
					"sha": "b832f8b25204b7a2b7c41605b667f4187da6e959",
					"message": "Move-components-to-material-ui-theme",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 12:38:59 +0200"
				},
				{
					"sha": "8498b7fc15f6c942f9061ff9f0b358179d44b46f",
					"message": "Move-CrudRoute-to-root",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 11:16:16 +0200"
				},
				{
					"sha": "2a78b882578d593c893fb4d3f17ff0100f91981f",
					"message": "Moving-actions-to-actions-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 11:14:10 +0200"
				},
				{
					"sha": "391b3dc4f3569283e6d6e9d3b0e00316aa530dbf",
					"message": "Move-reducers-to-dedicated-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 11:08:51 +0200"
				},
				{
					"sha": "98647168ba52aae2325ac89967906816ec58d992",
					"message": "Include-base-saga-in-the-project-source",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 10:52:41 +0200"
				},
				{
					"sha": "dd7648c6bb542f0b2e58e4bb4af49df5369ecd00",
					"message": "Add-EditButton",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 09:28:50 +0200"
				},
				{
					"sha": "e60bee067e50ab21f8b4b587e4011caa60ac2605",
					"message": "Redirect-after-post",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 Jul 2016 09:17:33 +0200"
				},
				{
					"sha": "e45648e7bd24abacd7b9f4ad0b93ac0aef3f02ab",
					"message": "ToolbarGroup-injects-styles-according-to-children-type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 23:22:56 +0200"
				},
				{
					"sha": "42ff7baf134e18eb0291d946b735acda5d0f41b0",
					"message": "React-devtools-appers-but-not-in-webpack-dev-server-frame",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 23:22:36 +0200"
				},
				{
					"sha": "ba67f8502a08a74f378ce02fa4fa4ee3bd28ddfd",
					"message": "Fix-linter-warnings",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 23:08:58 +0200"
				},
				{
					"sha": "2377bb9e9dc55107aeb73eff8b19e305307e3a3b",
					"message": "Add-buttons",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 22:41:35 +0200"
				},
				{
					"sha": "f06ad1420eb9f866ee9c59ccb5b770eb16c3f56c",
					"message": "Add-create-handling-no-feedback",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 21:33:26 +0200"
				},
				{
					"sha": "7739e772694b661d55014c11fe9deca6bd9b3c8c",
					"message": "Rename-show-to-detail",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 18:17:28 +0200"
				},
				{
					"sha": "afea055878969c6d495eb3c883492a562abfe69f",
					"message": "Switch-to-using-a-meta-for-fetch-middleware",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 18:08:41 +0200"
				},
				{
					"sha": "884b232fba4988a087de97b1675a43b7b9696a00",
					"message": "Submitting-Detail-form-posts-PUT-request",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 13:47:55 +0200"
				},
				{
					"sha": "fede219e9cb2e85ab622f21e187205eaa25a3f28",
					"message": "Introduce-Input-components",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 09:05:36 +0200"
				},
				{
					"sha": "390b52d758e0fc18e04e3d8099f9841bc06e9f47",
					"message": "Rename-Column-to-Field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 12 Jul 2016 08:10:29 +0200"
				},
				{
					"sha": "a773d2e0655a01594cfdbaf2fd3a428bb402ee4c",
					"message": "Add-comments-menu-and-sidebar",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 18:55:17 +0200"
				},
				{
					"sha": "fc1877c67b62757c9267eaab3489790e7be24ade",
					"message": "Remove-side-effect-from-crud",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 16:56:24 +0200"
				},
				{
					"sha": "b00187d697e090cf0a57b3a296acabd75191e372",
					"message": "Move-side-effects-to-userland-sagas",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 16:52:44 +0200"
				},
				{
					"sha": "3eb3978c50b7f0d69f817d84a9dd54062298575c",
					"message": "Improve-list-link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 14:17:31 +0200"
				},
				{
					"sha": "a58b22120670cb5c8c692ae3d4cccb48e90a5f6b",
					"message": "Exploding-data-in-state",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 13:41:52 +0200"
				},
				{
					"sha": "d7df2f647605c84272d440113fca6aa19daeab9f",
					"message": "Cleanup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 13:03:53 +0200"
				},
				{
					"sha": "7e59db3c6a386dd73e0c63135113f17e89990500",
					"message": "CrudRoutes-is-now-a-component-passes-info-down-to-Crud-components",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 8 Jul 2016 22:19:41 +0200"
				},
				{
					"sha": "76bf02307e1a0704ff3cb4d7d3f2d507f12ae5cf",
					"message": "Dynamic-routing-FTW",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 8 Jul 2016 20:16:06 +0200"
				},
				{
					"sha": "16a686d9ff1615b93e02d0b0a91191339265466d",
					"message": "Add-show-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jul 2016 15:56:12 +0200"
				},
				{
					"sha": "a5696fd00b73099b220e462d5a77eb0e7b6e57d2",
					"message": "Move-admin-components-back-to-src",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jul 2016 13:41:12 +0200"
				},
				{
					"sha": "b44b8bad10b02ab8928a0fb59cf96b2b30bc7943",
					"message": "Introducing-React-Router",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jul 2016 13:22:29 +0200"
				},
				{
					"sha": "e323fa9f1f46a54d38b02f5bd2a823e98203bec0",
					"message": "Changing-sort-order-resets-paginatino",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jul 2016 12:10:30 +0200"
				},
				{
					"sha": "93aa7861dce41b318b4eb9a0378a421c16112bfb",
					"message": "Add-pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jul 2016 12:07:12 +0200"
				},
				{
					"sha": "556dcf2d2000ec3aa787955d17436f9f281d4c65",
					"message": "Improve-material-look-and-feel",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 6 Jul 2016 23:37:01 +0200"
				},
				{
					"sha": "88d0a71b334ee8c41e3a7823d6a03e980d94a660",
					"message": "Using-column-as-renderer",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 6 Jul 2016 22:47:37 +0200"
				},
				{
					"sha": "2cb50fb204750924a50f1b34937fdab6e9ec55da",
					"message": "Add-material-UI-a-d-loader-indicator",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 6 Jul 2016 21:54:42 +0200"
				},
				{
					"sha": "af9604f4f2c2d33ed1105e6152d51554a319e3c1",
					"message": "Replace-farfetched-with-fetch-mock-add-Column",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 6 Jul 2016 15:20:00 +0200"
				},
				{
					"sha": "bb089cba5ea46811c91f83f0e6b0f8293384808f",
					"message": "Introduce-Resource-component",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 5 Jul 2016 17:06:22 +0200"
				},
				{
					"sha": "5dc7f004de2c08ede782d324fc029dbfb8d400f0",
					"message": "Initial-commit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 5 Jul 2016 16:00:32 +0200"
				}
			]
		},
		{
			"name": "ng-admin",
			"commits": [
				{
					"sha": "1dc0cacf8b0c5136117d4d74456a8803fadb919b",
					"message": "Merge-pull-request-1159-from-RichardBradley-1157-issue-template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Aug 2016 18:12:21 +0200"
				},
				{
					"sha": "8a56831fd19317b013ade93e98f5c648d8e1fc7c",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Aug 2016 11:36:37 +0200"
				},
				{
					"sha": "68a8986cb058940d5a8cfafb59b6f55908618c4e",
					"message": "1157-add-an-issue-template-with-a-request-for-Plunkr-repro-steps",
					"author": {
						"name": "Richard Bradley",
						"email": "Richard.Bradley@softwire.com"
					},
					"date": "Wed, 20 Jul 2016 11:20:39 +0100"
				},
				{
					"sha": "9eef85c3459420ce3f812fcd1dfdf4e8d9100405",
					"message": "Merge-pull-request-1140-from-marmelab-delete_progress",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Wed, 29 Jun 2016 13:36:30 +0200"
				},
				{
					"sha": "42697c750cbf7c6e89609357c96bf88f2a36b6af",
					"message": "Remove-useless-else-statement",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 29 Jun 2016 11:19:17 +0200"
				},
				{
					"sha": "277663c3f92cf7ff1af68fd2974b3d9b0e400255",
					"message": "Merge-pull-request-1121-from-marcelometal-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 28 Jun 2016 18:36:49 +0200"
				},
				{
					"sha": "17a1f994945891ee9b1d1b386bdc4487a94a8219",
					"message": "Merge-pull-request-1132-from-marmelab-reference_many_export",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 28 Jun 2016 18:36:15 +0200"
				},
				{
					"sha": "0c89bd3b8f0ecbe6536b0ff95de4bdc8560d8b05",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 28 Jun 2016 17:28:23 +0200"
				},
				{
					"sha": "d547c05504f4ae9660861293c8a657bacbe3e492",
					"message": "Add-progression-to-batch-delete-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 28 Jun 2016 09:28:11 +0200"
				},
				{
					"sha": "6feb35774f5ccf2fa2e4e33f141d936e827763b4",
					"message": "Display-progress-bar-when-deleting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 28 Jun 2016 09:12:25 +0200"
				},
				{
					"sha": "f8cbb558d9b02188da1b79da4c1fe9604b415a31",
					"message": "allow-to-export-reference_many-fields",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 17 Jun 2016 14:04:00 +0200"
				},
				{
					"sha": "9a6efe9084d45d247f4d88f3543c1a78eb0350db",
					"message": "Fixed-typo-in-README.md",
					"author": {
						"name": "Marcelo Jorge Vieira",
						"email": "metal@alucinados.com"
					},
					"date": "Mon, 13 Jun 2016 14:32:55 -0300"
				},
				{
					"sha": "5912c701fe42a5e47d4ae9df5efa7e1bdf2a8887",
					"message": "Merge-pull-request-1092-from-marmelab-fix_datagrid_sort",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jun 2016 23:55:13 +0200"
				},
				{
					"sha": "b097d8aa07b2891f00b687c134d5d0ae58d0f896",
					"message": "Merge-pull-request-1108-from-strathausen-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jun 2016 23:54:36 +0200"
				},
				{
					"sha": "9a7266b156a03cd6e3b71f7c717b75a3fa821943",
					"message": "Merge-pull-request-1101-from-talaviss-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jun 2016 23:54:17 +0200"
				},
				{
					"sha": "135beb77e0cb6d651ad03a104516b176785b6c2d",
					"message": "Getting-started.md-typo-ms-md",
					"author": {
						"name": "Johann Philipp Strathausen",
						"email": "philipp@stratha.us"
					},
					"date": "Tue, 7 Jun 2016 14:59:08 +0200"
				},
				{
					"sha": "c421e8cdb1b41a0ea57fec08299ebeab2213669c",
					"message": "Update-Custom-types.md",
					"author": {
						"name": "tal avissar",
						"email": "talaviss2@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 17:56:03 +0300"
				},
				{
					"sha": "921bea73c862ed47923f6e493d45976e4d6f208d",
					"message": "Show-sort-column-in-datagrid-even-with-default-sort",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 26 May 2016 09:29:30 +0200"
				},
				{
					"sha": "4faeb7dbe7d32c6a9d00ba2fd7a759721778fbe6",
					"message": "Merge-pull-request-1088-from-RichardBradley-entity-id-url-encoding",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 May 2016 16:31:28 +0200"
				},
				{
					"sha": "97460f14970568df32c47db18862288ba492a92a",
					"message": "Merge-pull-request-1081-from-bestori-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 May 2016 16:11:29 +0200"
				},
				{
					"sha": "7153f73867e5d74eb5ea79767ee341c311ac1448",
					"message": "1041-fix-encoding-of-entity-ids-in-REST-URLs",
					"author": {
						"name": "Richard Bradley",
						"email": "Richard.Bradley@softwire.com"
					},
					"date": "Tue, 24 May 2016 10:26:40 +0100"
				},
				{
					"sha": "fab44e50fd44d6b8931a51f3faf6a6fa9a20fb4f",
					"message": "FIX-wording-typo-Typo-in-Documentation-1078",
					"author": {
						"name": "Ori",
						"email": "ori@bestori.com"
					},
					"date": "Mon, 23 May 2016 11:05:09 +0300"
				},
				{
					"sha": "1d5bb9e5ef4412ce4ca8d6443877edb2ce5f1cbc",
					"message": "Merge-pull-request-1044-from-marmelab-bootstrap_labels_datagrid",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 May 2016 21:02:00 +0200"
				},
				{
					"sha": "a98411614a178efff617ecb012141a6ce4bc0b66",
					"message": "Merge-pull-request-1028-from-ganlhi-fix-form-controller",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 May 2016 21:01:08 +0200"
				},
				{
					"sha": "e676352860b0e772aeaf7c71598b7cdbebe353ec",
					"message": "Merge-pull-request-1053-from-SublimeWajih-FixFrenchTranslations",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 May 2016 21:00:16 +0200"
				},
				{
					"sha": "71f42cf93339f6fe0decd4bdefa74baa610ea81b",
					"message": "Merge-pull-request-1043-from-schmittr-patch-1",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 9 May 2016 18:03:00 +0200"
				},
				{
					"sha": "e62cae905da38c2c68ff15a61baa86d14ba1206e",
					"message": "Fix-French-Translations",
					"author": {
						"name": "Wajih Galai",
						"email": "wajih@sublimeskinz.com"
					},
					"date": "Tue, 3 May 2016 10:36:48 +0200"
				},
				{
					"sha": "9994a0f82bf234c3c20a110ba339de7c9e188b6c",
					"message": "RFR-In-datagrids-apply-label-styles-to-all-labels-not-just",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 21 Apr 2016 08:42:40 +0200"
				},
				{
					"sha": "d863a39b28491e5003787969fb24a68316fb6fb0",
					"message": "Grammar",
					"author": {
						"name": "Raphael Schmitt",
						"email": "schmittr@users.noreply.github.com"
					},
					"date": "Wed, 20 Apr 2016 16:12:19 +0200"
				},
				{
					"sha": "5a29901f1d153c0e6312a14289e99c3e1f6adc1a",
					"message": "Merge-pull-request-1042-from-marmelab-filters_translations",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 20 Apr 2016 10:54:26 +0200"
				},
				{
					"sha": "e36512af76493f72cf4c832e35b958fb1f3d9853",
					"message": "RFR-Filter-button-now-translate-the-labels-too",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 19 Apr 2016 15:49:05 +0200"
				},
				{
					"sha": "8c4b3470c71ac56bce6ec7f39c1e36ab335fd2eb",
					"message": "Release-1.0.0-alpha4",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 19 Apr 2016 11:55:39 +0200"
				},
				{
					"sha": "798bfb3d1300cf9fbe5110b496f864cd1960268e",
					"message": "publish-alpha3",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 19 Apr 2016 11:38:10 +0200"
				},
				{
					"sha": "213ff5a09eff6568c7f52fce1ded2ad1e706b452",
					"message": "Upadate-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 19 Apr 2016 11:37:37 +0200"
				},
				{
					"sha": "ab80db5db9ddd87fba0a9488c72244c576cc4a27",
					"message": "Merge-pull-request-1034-from-marmelab-translations_plus",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 19 Apr 2016 10:50:59 +0200"
				},
				{
					"sha": "3b8ec6441795bd6dd00844cbf2709fbf2e87dc41",
					"message": "Updated-translations-documentation",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Apr 2016 10:29:49 +0200"
				},
				{
					"sha": "8dc27feb19abfa478258291bab6e07b2714a8e16",
					"message": "WIP-Make-custom-elements-translatable",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sat, 16 Apr 2016 20:48:03 +0200"
				},
				{
					"sha": "57060670683f02601b436d1804fd09503ac42681",
					"message": "Fixed-reference-to-notification-service",
					"author": {
						"name": "Guilhem Brouat",
						"email": "guilhem.brouat@docdoku.com"
					},
					"date": "Tue, 12 Apr 2016 12:16:53 +0200"
				},
				{
					"sha": "c9dc3efdba38f8953535f2b6da715693f97c19c1",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 18:50:07 +0200"
				},
				{
					"sha": "65e445a6204b929a452a2a3a614693867ddcbc34",
					"message": "publish-1.0.0-alpha2",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 18:46:50 +0200"
				},
				{
					"sha": "4e7c60cd3c25ecfe37f395a9f4c000aa42155fc0",
					"message": "Hotfix-broken-edition-because-of-translation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 18:46:05 +0200"
				},
				{
					"sha": "97c64ce1bd1fa9c1e49fd023dedeb36168b3f223",
					"message": "Merge-pull-request-990-from-SebLours-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 17:45:00 +0200"
				},
				{
					"sha": "ff685e717e663e9dca0af3aaaa3be313c5dd1efc",
					"message": "Merge-pull-request-1001-from-geecu-doc-custom-type-fieldview-not-used",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 17:44:24 +0200"
				},
				{
					"sha": "922942589d33ead36bb00fb29be6a5ecdd09e71c",
					"message": "Merge-pull-request-1011-from-marmelab-change_referrer",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 17:37:22 +0200"
				},
				{
					"sha": "927e1a2e23de6cc13b059d5618a9637803d846a0",
					"message": "Merge-pull-request-1010-from-mjlescano-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 31 Mar 2016 00:09:11 +0200"
				},
				{
					"sha": "f15e9cf2752b1d9d64d3b09cffe28918df43a204",
					"message": "Fix-creationView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Mar 2016 23:25:38 +0200"
				},
				{
					"sha": "df7641db88c48f4473466d86e75ec781f3f9d751",
					"message": "Change-referring-target-after-form-submit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Mar 2016 23:05:58 +0200"
				},
				{
					"sha": "3563b69f331320b693762b97ef74a607f9782d0e",
					"message": "Fix-typo-Themind.md-Theming.md",
					"author": {
						"name": "Matias Lescano",
						"email": "mjlescano@users.noreply.github.com"
					},
					"date": "Wed, 30 Mar 2016 17:27:17 -0300"
				},
				{
					"sha": "3934e71eb1b93080a5f0e7340b8245005928089d",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 28 Mar 2016 23:17:35 +0200"
				},
				{
					"sha": "b40d8435457d9fd86c646648423e4d7c0e711308",
					"message": "Merge-pull-request-1006-from-schmijos-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 28 Mar 2016 22:39:03 +0200"
				},
				{
					"sha": "368e0ce27c21b9f63db4d2ecbb26b9a145092b03",
					"message": "correct-usage-of-field-factory",
					"author": {
						"name": "Josua Schmid",
						"email": "jschmid@fastmail.net"
					},
					"date": "Sun, 27 Mar 2016 21:01:00 +0200"
				},
				{
					"sha": "a4d0f86640a87828c8086c111d49b8d579799abb",
					"message": "Merge-pull-request-1003-from-marmelab-translate",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sat, 26 Mar 2016 10:58:50 +0100"
				},
				{
					"sha": "fe53d46bd9ab01ac8ce4ec2bf55e745a8cd9e316",
					"message": "moved-setting-_type-in-the-first-example-of-the-field-type",
					"author": {
						"name": "Gunther Konig",
						"email": "gunther.s.konig@gmail.com"
					},
					"date": "Fri, 25 Mar 2016 19:30:27 +0200"
				},
				{
					"sha": "217d505cad2223af942570346541496d91930ce7",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 25 Mar 2016 17:04:47 +0100"
				},
				{
					"sha": "03dd7c6b2299397fcc3b20cd7d5b579005caca8a",
					"message": "Fix-unit-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 25 Mar 2016 16:56:50 +0100"
				},
				{
					"sha": "93b714346f42ecfb0d10c7b91a954fe74f64ab6d",
					"message": "Merge-pull-request-998-from-schmijos-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 25 Mar 2016 15:27:44 +0100"
				},
				{
					"sha": "97cd9095f788e10db2cc554af75fc9a603adb372",
					"message": "Allow-to-translate-the-interface",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 25 Mar 2016 00:10:43 +0100"
				},
				{
					"sha": "9e09980f0c409fef8de8c92a46c1dcd1d4d6f10a",
					"message": "Document-setting-the-type-for-the-field",
					"author": {
						"name": "Gunther Konig",
						"email": "gunther.s.konig@gmail.com"
					},
					"date": "Thu, 24 Mar 2016 14:32:36 +0200"
				},
				{
					"sha": "de0c5d6deb98c19de37b1d70c43b755af707a172",
					"message": "fix-typo",
					"author": {
						"name": "Josua Schmid",
						"email": "jschmid@fastmail.net"
					},
					"date": "Wed, 23 Mar 2016 22:38:33 +0100"
				},
				{
					"sha": "41b9d41a0fc05950e5c1767935f433eb5e2f9811",
					"message": "Make-webpack-way-less-verbose",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 23:30:54 +0100"
				},
				{
					"sha": "8c6d74bde7ca0281739f171f1353e8d40bfc59e6",
					"message": "Merge-pull-request-996-from-albogdano-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 23:21:23 +0100"
				},
				{
					"sha": "96b3c900651313e21ee9699b77e8adf1249c2ad1",
					"message": "Merge-pull-request-995-from-marmelab-fix_datefield_default_value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 23:11:22 +0100"
				},
				{
					"sha": "0da0596d25d5c5c97baf518f4b62d8c39975f036",
					"message": "Update-API-mapping.md",
					"author": {
						"name": "Alex Bogdanovski",
						"email": "alex@erudika.com"
					},
					"date": "Wed, 23 Mar 2016 00:10:53 +0200"
				},
				{
					"sha": "91ec0509fd100ae4318cd9a73d9b00b3941163b8",
					"message": "Fix-null-default-value-for-DateField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 23:01:46 +0100"
				},
				{
					"sha": "3586a6abbfdbdaaf5a9c1f124e4234146c2b757b",
					"message": "Merge-pull-request-982-from-marmelab-delete_custom_error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 16:51:06 +0100"
				},
				{
					"sha": "ba78799448f9b936e306f785d411c87407bfcbca",
					"message": "Merge-pull-request-993-from-marmelab-submit_button_directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 16:49:48 +0100"
				},
				{
					"sha": "e2623d5571721b1351561bb6474862a8a32b7e4c",
					"message": "Forgot-the-new-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 15:31:53 +0100"
				},
				{
					"sha": "c2951c7f6e6996db1cf10fb163e9ed83fc219190",
					"message": "Add-submit-button-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 15:26:10 +0100"
				},
				{
					"sha": "1b1b917fb29cf6fd6a547f6a4cae716981939fda",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 22 Mar 2016 12:09:37 +0100"
				},
				{
					"sha": "b8cb1b9b8cec568a335f1b5682a80796bb1e6901",
					"message": "Merge-pull-request-969-from-marmelab-fix_datepicker",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Mon, 21 Mar 2016 10:54:37 +0100"
				},
				{
					"sha": "d89dc8b0ebf76c207148fa889a09d6307e072b73",
					"message": "Added-missing-EditView.getUrl-parameter",
					"author": {
						"name": "Sébastien Lourseau",
						"email": "s.lourseau@gmail.com"
					},
					"date": "Sat, 19 Mar 2016 13:41:09 +0100"
				},
				{
					"sha": "88e9493fd1317c7ae8dd28356b47d4d328b452b3",
					"message": "Fix-test-in-PhantomJS",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Mar 2016 22:17:59 +0100"
				},
				{
					"sha": "d40ab91cea5b6bec174bc0d80de0674c4d357568",
					"message": "Merge-pull-request-989-from-Dan-Nolan-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Mar 2016 21:38:25 +0100"
				},
				{
					"sha": "baeb65ae0526ab89c57ee847a34d9cc601af862c",
					"message": "Update-field-list",
					"author": {
						"name": "Dan Nolan",
						"email": "DanNolan99@gmail.com"
					},
					"date": "Fri, 18 Mar 2016 11:26:04 -0700"
				},
				{
					"sha": "675a07e41423b8c8e00217060e7ea3d4e3ed9aa9",
					"message": "Add-ability-to-customize-delete-error-message",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 16 Mar 2016 17:07:57 +0100"
				},
				{
					"sha": "1d037932d264473f158a998ced1b1ab554ec350b",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Mar 2016 10:31:00 +0100"
				},
				{
					"sha": "320ca07121e69a47ee7fc2ac8e22665cace8e8ac",
					"message": "Merge-pull-request-971-from-marmelab-brikou-trailing-commas",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Mar 2016 09:47:05 +0100"
				},
				{
					"sha": "000cb8228a41022d20097419b5d7e2e5941ec89f",
					"message": "Add-missing-trailing-comma",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 13:53:12 +0100"
				},
				{
					"sha": "709ef87d1983613f94f2ae5bffb23ba0eedcfcdc",
					"message": "Fix-Datepicker-JS-error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 12:14:55 +0100"
				},
				{
					"sha": "b4ee818d14ef92c77cb284a8053e88d0b6e6b3b4",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Mar 2016 08:56:39 +0100"
				},
				{
					"sha": "0e65b59a759b9ebbdd2612482b99fd2d022a3f48",
					"message": "Merge-pull-request-966-from-marmelab-mobile_menu_toggle",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 8 Mar 2016 08:46:58 +0100"
				},
				{
					"sha": "ebeb186c0cc74d004265b5b5be385763e93de921",
					"message": "Fix-mobile-menu-toggle",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Mar 2016 23:55:12 +0100"
				},
				{
					"sha": "4bad7776cd5d67f8128ca1f871b4a1c95b27e2d9",
					"message": "Update-built-files",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 3 Mar 2016 11:06:06 +0100"
				},
				{
					"sha": "3b62405f40ffaca6b77860f40cd2e2ccc023670a",
					"message": "Merge-pull-request-956-from-marmelab-fix_autorefresh_current",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 3 Mar 2016 10:43:15 +0100"
				},
				{
					"sha": "c66c4df620a15cf89a8c4d8d966d8386ec3dd324",
					"message": "Update-built-files",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 3 Mar 2016 09:24:56 +0100"
				},
				{
					"sha": "0dc84f60412642939ce57ba03bed7fdad750838c",
					"message": "Merge-pull-request-954-from-marmelab-sort_export",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 3 Mar 2016 09:22:42 +0100"
				},
				{
					"sha": "60b4ac82d9f951e632c0d8c9a7f6ecb2afc0b418",
					"message": "Fix-current-choice-does-not-appear-in-autocomplete-reference-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 08:11:12 +0100"
				},
				{
					"sha": "41ce211ce9f8ed7cbaeaf19b2909393e39e1da84",
					"message": "Fix-export-sort-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 07:31:41 +0100"
				},
				{
					"sha": "a4597f8ebfddb8b05a46e513dd7a0c98bdccd75a",
					"message": "Move-angular-version-warning-to-upgrade-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 22:43:36 +0100"
				},
				{
					"sha": "044e9fd3c1a0e3ea27ddda8eaaffffd5e8fe5a20",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 22:04:15 +0100"
				},
				{
					"sha": "05f893305b54f5a2bba22c8852ad91ebd4faaf77",
					"message": "Merge-pull-request-953-from-marmelab-update_node-sass",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 21:31:34 +0100"
				},
				{
					"sha": "1a6985bdf77251e0428e1f9eab7ba5312483963d",
					"message": "Merge-pull-request-932-from-marmelab-embedded_list_remove_2",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 21:00:36 +0100"
				},
				{
					"sha": "48c44d8e7d90b3024714fcac4dc231a1c9eef487",
					"message": "Update-node-sass-version-dependency-to-avoid-install-error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 20:58:24 +0100"
				},
				{
					"sha": "2106c0a5c04aa3badf40a39a93425ee170a2ce4a",
					"message": "Move-Remove-button-for-embedded-lists-out-of-the-way",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 13 Feb 2016 16:27:07 +0100"
				},
				{
					"sha": "97af73a21c5f98ef9142a0da1cd7764f0a7d92d9",
					"message": "Merge-pull-request-951-from-marmelab-update_karma",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 19:08:49 +0100"
				},
				{
					"sha": "47af825609ef491dd0bc5d2748df1a40aa83300c",
					"message": "Merge-pull-request-949-from-marmelab-fix_export_template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 19:07:58 +0100"
				},
				{
					"sha": "2d6242026801cfa69c41a5212aca6f2fcd3d58d6",
					"message": "Merge-pull-request-947-from-marmelab-update_ui_bootstrap",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 19:06:25 +0100"
				},
				{
					"sha": "2bdf6ef421982402d5c47bc2347ea45ab1c7121c",
					"message": "Merge-pull-request-950-from-marmelab-upgrade_restangular",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 18:54:41 +0100"
				},
				{
					"sha": "f2531bf914f803abecd22de8868ce0e8c5fb4b35",
					"message": "Update-karma",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 17:42:33 +0100"
				},
				{
					"sha": "7020cd9fc0b0fb0b2d98dfbcf63329e0b665edd5",
					"message": "Update-restangular-to-version-1.5.2",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 17:20:29 +0100"
				},
				{
					"sha": "d3df64c9c11e3fab45fe3c2bb42966339701d97d",
					"message": "Update-documentation-about-export",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 17:04:44 +0100"
				},
				{
					"sha": "f189cfd58f6b5998fccf6d0311e0af2907a7e5a7",
					"message": "Fix-export-on-field-with-type-template",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 16:40:20 +0100"
				},
				{
					"sha": "057eda861824d9970f747d414b6a6b3f30ac5556",
					"message": "Fix-test",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 09:17:07 +0100"
				},
				{
					"sha": "0605ce0619fd36a4c8f6f3e761236e2b513a8f6f",
					"message": "ui-bootstrap-upgrade-to-v1.0.0",
					"author": {
						"name": "Abdellatif Ait boudad",
						"email": "a.aitboudad@gmail.com"
					},
					"date": "Fri, 8 Jan 2016 20:19:43 +0000"
				},
				{
					"sha": "e2b527ecf709e696d44eba7b236d6e5be41cb3a7",
					"message": "Merge-pull-request-946-from-marmelab-remove_grunt",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 11:28:56 +0100"
				},
				{
					"sha": "8e6d701ab6fb63ae1c6c72a6eadbc4e420d7e870",
					"message": "Launch-a-static-server-from-protractor-configuration",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 2 Mar 2016 06:53:08 +0100"
				},
				{
					"sha": "da2372744edac31746bc58811f8a7f1dec0e7261",
					"message": "Remove-grunt-and-lauch-protractor-from-makefile",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 1 Mar 2016 17:33:32 +0100"
				},
				{
					"sha": "6924888053c13cf12897b248bea890ced2dd94a2",
					"message": "Prepare-e2e-tests-without-grunt",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 1 Mar 2016 16:06:52 +0100"
				},
				{
					"sha": "b3f4c0c67ed747a5c9044a342d37fa3a83632163",
					"message": "Merge-pull-request-945-from-marmelab-upgrade_angular_1_4",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 18:13:43 +0100"
				},
				{
					"sha": "a02e1642fa0c828f8c1f5a564738916684a3a66c",
					"message": "Update-readme-about-angular-version",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 1 Mar 2016 09:55:31 +0100"
				},
				{
					"sha": "35ecd3d5a248d265c0da8eca2a6798a8a46116f1",
					"message": "Update-grunt-protractor",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 29 Feb 2016 18:17:28 +0100"
				},
				{
					"sha": "fe0bbed3c4e6e7806d7fbfaef2c301a264291ac2",
					"message": "Fix-travis-config",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 29 Feb 2016 14:03:19 +0100"
				},
				{
					"sha": "ea833ef2052dc5fe6c42df051222c30b2e74d1c3",
					"message": "Update-node-on-Travis",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 29 Feb 2016 13:56:33 +0100"
				},
				{
					"sha": "ce3fca5498b1ecc93dd7f0b20f7aa6ab065fc14e",
					"message": "Update-angualar-to-1.4",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 29 Feb 2016 13:50:04 +0100"
				},
				{
					"sha": "7cf44298b530df8f7217274853c3a710fa20f02d",
					"message": "Fix-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 29 Feb 2016 11:48:32 +0100"
				},
				{
					"sha": "97ede9a91e4f12d6029348aa796690147960374f",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Feb 2016 14:07:30 +0100"
				},
				{
					"sha": "35ce8261f9db6cb2e9effbad5d86fd972df39a26",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Feb 2016 08:55:15 +0100"
				},
				{
					"sha": "147629df32852c9d15d8ce79375215debb0f6565",
					"message": "Merge-pull-request-942-from-nschappl-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Feb 2016 23:25:38 +0100"
				},
				{
					"sha": "ddf48232271f6fe78d39539b93014c6ee93d1d58",
					"message": "fixing-frontend-pagination-typo-from-1-10-on-15-to-1-10-of-15",
					"author": {
						"name": "Nick Schappler",
						"email": "nickschappler@gmail.com"
					},
					"date": "Thu, 25 Feb 2016 13:39:07 -0500"
				},
				{
					"sha": "3c3f680fdd28cbf4cd182dd1269ffc9c2b722bfa",
					"message": "Document-menu.template-method",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 20:46:47 +0100"
				},
				{
					"sha": "41c4f4994a77709ea3aa27b4452d5a4f6a0cc5f5",
					"message": "Merge-pull-request-937-from-Sicaine-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 20 Feb 2016 14:20:39 +0100"
				},
				{
					"sha": "128135d8c38e1e3e557f04adbd773643f10b0d58",
					"message": "fix-typo-litteral-literal",
					"author": {
						"name": "Sigi",
						"email": "sicaine@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 15:23:12 +0100"
				},
				{
					"sha": "859345865435e6f9fe15ce70974570f9cbf38024",
					"message": "Update-built-files",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Tue, 16 Feb 2016 10:10:19 +0100"
				},
				{
					"sha": "abe3fc7e7bc06b2d1f7ca47f0e75b328ce0cfa19",
					"message": "Merge-pull-request-933-from-marmelab-export_options",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Tue, 16 Feb 2016 09:54:59 +0100"
				},
				{
					"sha": "98df75b2c275245b94a4567cab957d76d17af301",
					"message": "Add-ability-to-customize-CSV-export-format",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Feb 2016 22:21:43 +0100"
				},
				{
					"sha": "a7695a4734abc510cadbffa321f7d270daf33a3c",
					"message": "Merge-pull-request-929-from-marmelab-ref_many_filter",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 14:19:35 +0100"
				},
				{
					"sha": "3543c6f339c28c2a7dc49e5269cc366034c1e4f4",
					"message": "Fix-wrong-closing-tag-in-reference_many-filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 13:33:03 +0100"
				},
				{
					"sha": "9f8b0161f018e0a1e31db6f3ba9973aefaeeb161",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Feb 2016 08:26:14 +0100"
				},
				{
					"sha": "4ed91301175bc525636f3cebebdf2be5ea615672",
					"message": "Merge-pull-request-927-from-marmelab-filter_doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Feb 2016 22:14:58 +0100"
				},
				{
					"sha": "f37c585a35e00a656540b4c0e6e78c8030521a4d",
					"message": "Merge-pull-request-926-from-marmelab-embedded_list_remove",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Feb 2016 22:14:48 +0100"
				},
				{
					"sha": "ee91bab0864ce780a33adf4ac93194d4c6f420d5",
					"message": "Fix-filter-doc-showing-wrong-API-call",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Feb 2016 22:11:05 +0100"
				},
				{
					"sha": "2b0ae16d8d4db5049b0f78c4220826437805a201",
					"message": "Fix-embedded_list-remove-button-not-clickable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Feb 2016 21:41:34 +0100"
				},
				{
					"sha": "57e0fb5b47cc5ef4d3329180bb479d559f485539",
					"message": "Merge-pull-request-889-from-aitboudad-ma-column",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Feb 2016 21:28:18 +0100"
				},
				{
					"sha": "ea83b422cf5abfc02e3c61721d6834ed9064bd41",
					"message": "Merge-pull-request-923-from-vasiakorobkin-webpack-dev-server_web-socket_error_fix",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Feb 2016 21:24:28 +0100"
				},
				{
					"sha": "5788a37ca99bef5bde111b5fb6cbde825189c766",
					"message": "Fix-webpack-dev-server-web-socket-error",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@mail.ru"
					},
					"date": "Tue, 9 Feb 2016 00:07:08 +0300"
				},
				{
					"sha": "511ce64dcf8476f7d262a608373349097604245b",
					"message": "skip-DetailLink-when-entry-is-not-defined",
					"author": {
						"name": "Abdellatif Ait boudad",
						"email": "a.aitboudad@gmail.com"
					},
					"date": "Mon, 1 Feb 2016 15:09:30 +0000"
				},
				{
					"sha": "aa488fe074f536f7f36c504c694a75d1f9b4a8e4",
					"message": "Merge-pull-request-908-from-SebLours-SebLours-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 31 Jan 2016 23:18:25 +0100"
				},
				{
					"sha": "ea9c414d375226fa9766c4544e55d9ffa80502f0",
					"message": "Removed-unnecessary-this-reference",
					"author": {
						"name": "Sébastien Lourseau",
						"email": "sebastien@emagma.fr"
					},
					"date": "Wed, 27 Jan 2016 16:32:23 +0100"
				},
				{
					"sha": "23f1d59d986ab1815e192cb519ce8f081403d0f6",
					"message": "Merge-pull-request-905-from-marmelab-refence_many_filter",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 11:16:57 +0100"
				},
				{
					"sha": "291b1d2350f39fbda545d76d1f257586ee822790",
					"message": "Merge-pull-request-904-from-marmelab-fix_multiple_choice_remove",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 11:05:31 +0100"
				},
				{
					"sha": "b194cd37e0f1932d1d7c8f5af95b901ebf1e0180",
					"message": "Allow-reference_many-field-to-be-used-as-filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 23 Jan 2016 19:38:43 +0100"
				},
				{
					"sha": "4cbd48c4e94c47515f8d1d35465a84014dcc9ecf",
					"message": "Fix-select-multiple-fails-ro-add-choice-when-removing-value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 23 Jan 2016 19:29:05 +0100"
				},
				{
					"sha": "58d997fc96570f021ca929aa941e8437068fe210",
					"message": "update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 20 Jan 2016 14:59:25 +0100"
				},
				{
					"sha": "6d74cf7e4dfe47c9d544f823ad5c132b7767e0e4",
					"message": "Merge-pull-request-898-from-marmelab-edition_creation_hooks",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 20 Jan 2016 14:54:51 +0100"
				},
				{
					"sha": "50b9f51df37ba5632aaf9c38079b80b96f8dc384",
					"message": "Add-edition-and-creation-hooks",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 19 Jan 2016 11:16:42 +0100"
				},
				{
					"sha": "e0c813e59ba109cd2085b7757ab30c89048d6e92",
					"message": "Merge-pull-request-888-from-aitboudad-clean",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jan 2016 09:32:26 +0100"
				},
				{
					"sha": "31effb124f3a51f4ce82b7e063f68a81a31e71c2",
					"message": "apply-some-cs-jshint",
					"author": {
						"name": "Abdellatif Ait boudad",
						"email": "a.aitboudad@gmail.com"
					},
					"date": "Mon, 11 Jan 2016 08:23:30 +0000"
				},
				{
					"sha": "593a569f832db03912da446d945afb6156455972",
					"message": "Merge-pull-request-868-from-mdhooge-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 Jan 2016 09:03:30 +0100"
				},
				{
					"sha": "bb956c8cd3b9451c1666c0958317b5e39f5f058c",
					"message": "update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jan 2016 17:36:40 +0100"
				},
				{
					"sha": "e7bdd5bd479944ec54eb854a0881d487a6447353",
					"message": "Merge-pull-request-884-from-marmelab-prepare_end",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Thu, 7 Jan 2016 17:31:57 +0100"
				},
				{
					"sha": "8a3bd6285c287486b4de872666691d9ddb046fd0",
					"message": "Fix-prepare-doesn-t-get-fully-populated-datastore",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jan 2016 17:12:49 +0100"
				},
				{
					"sha": "b55432e584866aecd0a43c0c126e41163a2c26ac",
					"message": "Merge-pull-request-881-from-marmelab-windows",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 Jan 2016 17:12:21 +0100"
				},
				{
					"sha": "f78358c24482ea1cb45b487feb0883ec8a77f12a",
					"message": "Fix-build-on-Windows",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 5 Jan 2016 10:14:35 +0100"
				},
				{
					"sha": "c429f3113cb5a95b194c1792f911eeb8e8b7a2c0",
					"message": "Small-inline-doc-improvement-for-date-widgets",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 5 Jan 2016 09:38:46 +0100"
				},
				{
					"sha": "5bad68ea66e39f36d9ef5617e372e34c6d3cad02",
					"message": "reference_many-example-uses-tags-not-comments",
					"author": {
						"name": "Michel D'HOOGE",
						"email": "michel.dhooge@gmail.com"
					},
					"date": "Wed, 23 Dec 2015 10:23:37 +0100"
				},
				{
					"sha": "14d6e079a4e85fd0c3dc7841dca7d0471a13dbcf",
					"message": "Merge-pull-request-858-from-marmelab-embedded_boolean_field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 14 Dec 2015 22:58:20 +0100"
				},
				{
					"sha": "c8d6941a6577ce508d75ef7b9c2693218b43935a",
					"message": "Merge-pull-request-857-from-marmelab-fix_embedded_list_non_editable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 14 Dec 2015 22:58:11 +0100"
				},
				{
					"sha": "76462c6d001975c6db7d8910a9c9ea24bf2ba555",
					"message": "Fix-display-of-boolean-field-in-embedded_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 14 Dec 2015 22:48:33 +0100"
				},
				{
					"sha": "426dcba0c0deacaaacbe2fd9f3f743e8e8043cc6",
					"message": "Fix-non-editable-fields-in-embedded-lists",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 14 Dec 2015 22:25:57 +0100"
				},
				{
					"sha": "71622b0c46458169f85aea8d0a4c6289e9e696f3",
					"message": "update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Dec 2015 17:18:09 +0100"
				},
				{
					"sha": "6dc73bf957e487c2a510de01a3e19ea376deebcd",
					"message": "Merge-pull-request-850-from-marmelab-dashboard_bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Dec 2015 17:16:26 +0100"
				},
				{
					"sha": "0b5eb40f80ee098ac4898ba6275a3ca28b7ecca8",
					"message": "Fix-Dashboard-bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Dec 2015 16:59:39 +0100"
				},
				{
					"sha": "5ec6efd25865361249966e5585f4203a39bfe42a",
					"message": "Merge-pull-request-849-from-marmelab-direct_karma",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 22:23:46 +0100"
				},
				{
					"sha": "a0e71df5337d3b96b617f45f7daa256dfdf50529",
					"message": "Merge-pull-request-848-from-marmelab-view_title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 22:19:36 +0100"
				},
				{
					"sha": "c71103ed5aafedfd3e282ba8196716ebd7cd1fee",
					"message": "Use-Karma-directly-not-through-grunt",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 22:13:45 +0100"
				},
				{
					"sha": "bbef1206b51bfb9c09161ee9eecfde5b935402d5",
					"message": "Use-entity-label-instead-of-name-for-viewn-titles",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 21:22:32 +0100"
				},
				{
					"sha": "b55b682f6fcf05fa94eb9ec9eb7bd017a3f6ddd5",
					"message": "Merge-pull-request-842-from-lucval-reload-export-data",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 17:53:08 +0100"
				},
				{
					"sha": "177a70f5d65d453d629ec55777125abcbf534950",
					"message": "Merge-pull-request-845-from-marmelab-remove_lodash",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 17:52:26 +0100"
				},
				{
					"sha": "6a90e7614c48a97a598db1f9097ce177b39f12ae",
					"message": "Remove-Lodash",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 17:45:11 +0100"
				},
				{
					"sha": "c82d94cd6476c60845714f99874468a19b6d4331",
					"message": "Remove-unused-search-param-from-directives",
					"author": {
						"name": "Luca Valtulina",
						"email": "luca@devesb2.speakup.nl"
					},
					"date": "Thu, 10 Dec 2015 17:27:22 +0100"
				},
				{
					"sha": "ec4eb9be1fa210ce4b2de4acdcbae7036b8dac5e",
					"message": "Merge-pull-request-844-from-lucval-entry_css_classes_in_referenced_lists",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 17:25:40 +0100"
				},
				{
					"sha": "aca87ff200591c04905d1e0f4437249aadfaafd4",
					"message": "Update-admin-config-dependency",
					"author": {
						"name": "Luca Valtulina",
						"email": "luca@devesb2.speakup.nl"
					},
					"date": "Thu, 10 Dec 2015 17:20:00 +0100"
				},
				{
					"sha": "ebc84268e42f362eaae44674f03b82255b6ccefd",
					"message": "Merge-pull-request-843-from-lucval-double-click-bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 17:17:31 +0100"
				},
				{
					"sha": "5c99b823368c8ab6186e33cf89a12d9e50e447ea",
					"message": "Add-entryCssClasses-functionality-to-referenced-list-field",
					"author": {
						"name": "Luca Valtulina",
						"email": "luca@devesb2.speakup.nl"
					},
					"date": "Thu, 10 Dec 2015 13:52:16 +0100"
				},
				{
					"sha": "886e8ed1e179e4bad2318e44fcfcf3a6ca410610",
					"message": "Use-separate-block-to-specify-CSS-classes-in-show-item-view",
					"author": {
						"name": "Luca Valtulina",
						"email": "luca@devesb2.speakup.nl"
					},
					"date": "Thu, 10 Dec 2015 13:27:46 +0100"
				},
				{
					"sha": "2801917ab1f74cf71068a8ca841a96b0ccdb8abe",
					"message": "Fix-ng-admin-issue-738",
					"author": {
						"name": "Luca Valtulina",
						"email": "luca@devesb2.speakup.nl"
					},
					"date": "Mon, 7 Dec 2015 16:05:40 +0100"
				},
				{
					"sha": "23a6bac5869d0319ac064f5b573d7207376b6388",
					"message": "Fix-typo-in-Custom-Pages-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 4 Dec 2015 11:23:22 +0100"
				},
				{
					"sha": "b4c0f8a66f4d0b0670823bb1ef1d8d09e048bf3b",
					"message": "Merge-pull-request-827-from-rpg600-patch-3",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Dec 2015 14:35:08 +0100"
				},
				{
					"sha": "fc6250a65b9e35d52add489e2f49f0676cc3d747",
					"message": "Fixed-typos-in-Field.md",
					"author": {
						"name": "Reinis Grinbergs",
						"email": "rpg600@gmail.com"
					},
					"date": "Tue, 1 Dec 2015 10:12:44 +0100"
				},
				{
					"sha": "b6b583c6fd99e5f9059954fde2a37ab59f5d0d97",
					"message": "Merge-pull-request-815-from-dunglas-patch-2",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 Nov 2015 07:22:38 +0100"
				},
				{
					"sha": "b17b91d6ea3ce1e6fcc11b6f4bc3a45e42ef2d5c",
					"message": "Merge-pull-request-814-from-dunglas-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 Nov 2015 07:21:50 +0100"
				},
				{
					"sha": "ba23d53b11915aaa2e44a645b69653aeb2ca5ef4",
					"message": "Minor-fix-some-typos-in-Getting-started.md",
					"author": {
						"name": "Kévin Dunglas",
						"email": "dunglas@gmail.com"
					},
					"date": "Tue, 24 Nov 2015 20:48:02 +0100"
				},
				{
					"sha": "fd7b9dd53ec68ace8f1164ef2dff3c29b6350e71",
					"message": "Minor-fix-typo-in-README.md",
					"author": {
						"name": "Kévin Dunglas",
						"email": "dunglas@gmail.com"
					},
					"date": "Tue, 24 Nov 2015 20:45:28 +0100"
				},
				{
					"sha": "bd734ba347add0c2aed6ab995585fb723b04cbd7",
					"message": "Merge-pull-request-807-from-marmelab-fedotxxl-upstream",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Nov 2015 00:17:24 +0100"
				},
				{
					"sha": "e712d122df5318179048e5e2320cc9dea81330a7",
					"message": "Add-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Nov 2015 00:12:41 +0100"
				},
				{
					"sha": "8f9950a150e0017344bea790311333ca1363ff60",
					"message": "Add-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Nov 2015 00:05:22 +0100"
				},
				{
					"sha": "c97a0df557071356fa85f9887829fe4efb959c74",
					"message": "Pass-the-function-with-one-way-databinding",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Nov 2015 23:57:46 +0100"
				},
				{
					"sha": "4700b5a39820f9f65f23e7a148b94a917ec6733d",
					"message": "794",
					"author": {
						"name": "fbelov",
						"email": "fedor.belov@mail.ru"
					},
					"date": "Mon, 16 Nov 2015 15:47:11 +0300"
				},
				{
					"sha": "257a579b9c31dcb7ee77fdf16bc214e53bd9af92",
					"message": "Merge-pull-request-804-from-marmelab-boolean_filter_choices",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Nov 2015 23:44:01 +0100"
				},
				{
					"sha": "2c929dcd77718b413f40d81f1b3594ab0da8505b",
					"message": "Fix-dumb-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Nov 2015 23:37:55 +0100"
				},
				{
					"sha": "264a7242b1b975e5e66daacf1985f2261477d3ce",
					"message": "Allow-boolean-filter-labels-to-be-overridden",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Nov 2015 23:19:24 +0100"
				},
				{
					"sha": "31ce30b3a57dfbcd76a72d030ae25593b3eab372",
					"message": "Merge-pull-request-803-from-marmelab-fix_choices_14wq",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Nov 2015 22:41:48 +0100"
				},
				{
					"sha": "2bbe2378ace8bd3d970b117e1ce56c24b137e3e0",
					"message": "Fix-maChoiceField-for-Angular-1.4",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Nov 2015 22:35:18 +0100"
				},
				{
					"sha": "caf78d5f21d05d7c359807b0be5d81117f44961c",
					"message": "update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Nov 2015 17:12:51 +0100"
				},
				{
					"sha": "f1bf7d3f61314e67b7dec0df7c371521efdaf8d8",
					"message": "Merge-pull-request-796-from-marmelab-fix_slow_api",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 Nov 2015 13:17:20 +0100"
				},
				{
					"sha": "ba22a68564d14c925d034a7445f8c523d22dc311",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 Nov 2015 13:09:06 +0100"
				},
				{
					"sha": "3062585c87d05c0284200930367584986dd6b22a",
					"message": "Fix-navigation-with-slow-API",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 Nov 2015 12:25:46 +0100"
				},
				{
					"sha": "0f8719f700d191cfb300297d16b5345bdf0ca6c6",
					"message": "Merge-pull-request-788-from-kenegozi-remote-complete-filtering",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 16 Nov 2015 18:23:15 +0100"
				},
				{
					"sha": "1879f4d138531dc07b41cc6c8d07d4c500ba0974",
					"message": "Merge-pull-request-785-from-marmelab-ui-sref",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 16 Nov 2015 11:30:09 +0100"
				},
				{
					"sha": "8dcaa1295c06f96c48272e9e96786a5ddeddc0fa",
					"message": "remote-complete-issue-results-are-not-set-if-term-does-not-perfectly-match-part-of-the-choice",
					"author": {
						"name": "Ken Egozi",
						"email": "mail@kenegozi.com"
					},
					"date": "Fri, 13 Nov 2015 15:56:18 -0800"
				},
				{
					"sha": "5453ad4f17f5a3cb511d407e017d22e0fb73e6b6",
					"message": "Fix-referenced_list-links",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 13 Nov 2015 22:21:16 +0100"
				},
				{
					"sha": "f2fdc873db9ea5a28da31682aade28e258d29344",
					"message": "Use-ui-sref-for-links-instead-of-ng-click",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 13 Nov 2015 22:08:57 +0100"
				},
				{
					"sha": "36d23e3583f4505f7c8ecc9cdfc6e51a2a9b8314",
					"message": "Merge-pull-request-761-from-lucval-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 12 Nov 2015 15:30:56 +0100"
				},
				{
					"sha": "12aa9736c07f65d6244481124b8e17f4498d14f9",
					"message": "Merge-pull-request-772-from-marmelab-template_with_label",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 12 Nov 2015 15:25:42 +0100"
				},
				{
					"sha": "2d635ffa64165a8bba7b004981261b7b63754761",
					"message": "Merge-pull-request-776-from-neo-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 12 Nov 2015 10:42:55 +0100"
				},
				{
					"sha": "a250ecb0ec9f15a5a0e243e6839fd9575220de92",
					"message": "Fix-typo-in-arguments-to-prepare-in-router",
					"author": {
						"name": "yarbelk",
						"email": "james.rivettcarnac@gmail.com"
					},
					"date": "Thu, 12 Nov 2015 14:05:09 +0800"
				},
				{
					"sha": "55697c0771066cb87f5ca3c5367120e7d0059bb3",
					"message": "Clarify-cssClasses-parameter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Nov 2015 23:48:20 +0100"
				},
				{
					"sha": "eceedb13807da8b6ce30ee82df3bbeeddae445b7",
					"message": "Document-entity-identifier",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Nov 2015 23:28:11 +0100"
				},
				{
					"sha": "42c8c8eee371a2b3957df29e91a9a79c7cecb93a",
					"message": "Add-doc-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Nov 2015 23:13:01 +0100"
				},
				{
					"sha": "2b1b9d587e3010213b60777dd8d372e85bb3aa83",
					"message": "Add-support-for-templates-with-label",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Nov 2015 22:43:17 +0100"
				},
				{
					"sha": "da7f3a1975a4b9c159b040b13ea3df3b3bd2d563",
					"message": "Merge-pull-request-758-from-marmelab-cleanup",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Nov 2015 15:00:37 +0100"
				},
				{
					"sha": "bf61feb14e6c146cb578c318d6f22dc859e0b3a2",
					"message": "Support-template-field-in-CSV-ExportFields-list",
					"author": {
						"name": "Luca Valtulina",
						"email": "luca@devesb2.speakup.nl"
					},
					"date": "Wed, 4 Nov 2015 11:28:47 +0100"
				},
				{
					"sha": "acd007d39a5e190c13ed37c8586746bae8c7f968",
					"message": "Normalize-directive-function-names",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Nov 2015 22:02:13 +0100"
				},
				{
					"sha": "51fd99ba9b98cb4145cef596c1cf59bc0790cf1d",
					"message": "ES2015",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Nov 2015 21:16:33 +0100"
				},
				{
					"sha": "6e08848e0426c9b509a423bb302f17bd48146cb4",
					"message": "Remove-tests-moved-to-admin-config",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Nov 2015 21:16:07 +0100"
				},
				{
					"sha": "e7468270dfe97c2db94d604bde8df6a8a77ad733",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Nov 2015 09:24:08 +0100"
				},
				{
					"sha": "bd28d9ffcee064394001dfe618e812495cb595ea",
					"message": "Merge-pull-request-756-from-marmelab-prepare",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 2 Nov 2015 09:16:34 +0100"
				},
				{
					"sha": "de98b9d9540897ceaa6968010b564f52481e0865",
					"message": "Add-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Nov 2015 22:20:14 +0100"
				},
				{
					"sha": "a88b9481868c1262b953b47058d9cacd8cec4ca2",
					"message": "Add-working-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Nov 2015 09:19:55 +0100"
				},
				{
					"sha": "2595ef5e18ccc1d8ffa73b5a18a2f6be1e9d3e69",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Oct 2015 21:49:51 +0100"
				},
				{
					"sha": "79f721e26c493162b50c6ac341c7b201dc7be7f8",
					"message": "Add-support-for-the-View.prepare-logic",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Oct 2015 21:45:17 +0100"
				},
				{
					"sha": "45b62a150580c0f7435185e9fcf7e2b6986bcd61",
					"message": "Bumping-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Oct 2015 17:05:34 +0100"
				},
				{
					"sha": "637e12aea92f72c37e137471a878d9fb99477f4a",
					"message": "Republishing-npm-package-with-built-sources",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Oct 2015 10:17:27 +0100"
				},
				{
					"sha": "a664abbe87a8f59e92429bb30797f41b81baab36",
					"message": "Add-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Oct 2015 10:10:48 +0100"
				},
				{
					"sha": "a735113fcbd17b44cce0e764988db68daedaa679",
					"message": "Preparing-0.9.0-release",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Oct 2015 10:04:26 +0100"
				},
				{
					"sha": "3966bbe76df34f16c0acf14e21e139e3d0cc7fb7",
					"message": "Add-quick-filter-screenshot",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 16:49:34 +0100"
				},
				{
					"sha": "acb028539687d5a4a07e749d6269c75593d5bd1f",
					"message": "change-link-to-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 15:44:59 +0100"
				},
				{
					"sha": "f383f43ce14a454136c4eb75827d17f28ab97a72",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 10:48:34 +0100"
				},
				{
					"sha": "b3db8f23dc48deec40d0d26b727c5bef2c55b1ed",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 10:22:14 +0100"
				},
				{
					"sha": "b76dfbcd8c0893467b64ce5df4b245a9a67c9838",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 10:16:58 +0100"
				},
				{
					"sha": "8f197928fd8f508a6cac5103e82f4aeb1a837794",
					"message": "Fix-anchor-links-in-Fields-reference",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 10:05:48 +0100"
				},
				{
					"sha": "b75ba9e71740164f519dc08e5e1eed698171c254",
					"message": "Merge-pull-request-751-from-kenegozi-missing-reference",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Oct 2015 09:55:35 +0100"
				},
				{
					"sha": "fba50af959828519c2ab5bb5564da33b38408235",
					"message": "update-wording",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 22:11:25 +0100"
				},
				{
					"sha": "abcff39b513f9f435b7163be2acc6c56ecfcc55c",
					"message": "Update-screencast-for-0.9",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 22:06:25 +0100"
				},
				{
					"sha": "2d20b9a0fc1d33806b6882571b4db78f90d7fe89",
					"message": "Add-missing-image-in-getting-started-tutorial",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 17:04:42 +0100"
				},
				{
					"sha": "b2c2f8de15268b1f468e2a9342403e41f05acaaf",
					"message": "Add-missing-image",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:50:18 +0100"
				},
				{
					"sha": "b6d6432544cc48daac70921d80c46f482d6e52d3",
					"message": "Update-doc-FAQ.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:45:12 +0100"
				},
				{
					"sha": "07a9eaa3c1faad43381a813c2ccca15e86d7989d",
					"message": "Update-doc-reference-Field.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:42:50 +0100"
				},
				{
					"sha": "59413749664e5a321bc1ef849c022639ec93b203",
					"message": "Update-doc-reference-View.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:41:43 +0100"
				},
				{
					"sha": "0e80ba64a27b9e51ae0fb128adceb0124789031b",
					"message": "Update-doc-reference-Entity.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:40:21 +0100"
				},
				{
					"sha": "b6f101a48385ef0db79125a011f4f18e0d5c4b35",
					"message": "Update-doc-reference-Entity.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:36:33 +0100"
				},
				{
					"sha": "8d177e0d982c5e80b8cd306cc8cf641087b983b3",
					"message": "Update-doc-reference-Application.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:34:00 +0100"
				},
				{
					"sha": "1b15fbe57387a049c88f0369b85836eba0bb5a70",
					"message": "Update-doc-reference-ngAdminConfigurationProvider.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:33:22 +0100"
				},
				{
					"sha": "26ed0d88982f077313f594e7c40572566c7a534d",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:31:00 +0100"
				},
				{
					"sha": "f0b68865bda2506c7881d5bb8ea71cced17fae91",
					"message": "Link-to-the-online-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:15:15 +0100"
				},
				{
					"sha": "910561e8ea517a569e81ab9d53079f30d0061036",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:02:28 +0100"
				},
				{
					"sha": "eac55ad62712ea487dc8ebe525e55e46721c870d",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:02:00 +0100"
				},
				{
					"sha": "6ed1ee18fa83c50f42825034462410c9aebf56b6",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:01:30 +0100"
				},
				{
					"sha": "93880d57dc8764258ac6d4f8fb6a9b032ff6dd7e",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:01:12 +0100"
				},
				{
					"sha": "4882df53c1ae4544c18b02e86e0cd803edf072b7",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 16:00:17 +0100"
				},
				{
					"sha": "1cbef9197b0115418f57a83b43e0c140b2b5c48e",
					"message": "Update-doc-Relationships.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:56:09 +0100"
				},
				{
					"sha": "57c476f593de57f8b75430660f76208fccf38e9f",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:54:53 +0100"
				},
				{
					"sha": "afa2938444974304d0787e7558607ddd35a45542",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:54:45 +0100"
				},
				{
					"sha": "4d3033551b3604abf0bdc55d57f28e45653dea13",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:54:42 +0100"
				},
				{
					"sha": "808f7ce468dfba07dade7861bd08c244bf9a512e",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:54:37 +0100"
				},
				{
					"sha": "230af1f641a05b4f76b9eddcf3f22b6ef90f2d28",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:54:33 +0100"
				},
				{
					"sha": "376773b94c8a740f967af9ee0d9a34d0f9b072e3",
					"message": "Update-doc-Getting-started.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:53:09 +0100"
				},
				{
					"sha": "b8214e3c969d861c39cb1c472fe3c218df5eb1bb",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:48:56 +0100"
				},
				{
					"sha": "38198659c5a932a877c2fe5fa8750f2d3cdf82a7",
					"message": "Update-doc-Relationships.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:48:12 +0100"
				},
				{
					"sha": "45c08e4243901b5c21e5725966792e191ee2894b",
					"message": "Update-doc-reference-Field.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:46:44 +0100"
				},
				{
					"sha": "67142a749be2425a8243ba409396717e3634cedc",
					"message": "Update-doc-Configuration-reference.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:44:34 +0100"
				},
				{
					"sha": "8df5990af95aec3e3a1c140afe9d0f15814a2be8",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:44:06 +0100"
				},
				{
					"sha": "5a94df15c7d66b7a0a9b637c5433d8324c59c907",
					"message": "Create-doc-reference-Field.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:44:04 +0100"
				},
				{
					"sha": "097fb2e4487c945b70f3048855c0f09dd61a77fb",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:43:54 +0100"
				},
				{
					"sha": "d476c45a92274cf100a01cf75243d5e82c68f869",
					"message": "Update-doc-reference-View.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:43:39 +0100"
				},
				{
					"sha": "da4c9be6a132cc7becb8a986d592d75556ee2e90",
					"message": "Update-doc-Configuration-reference.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:42:31 +0100"
				},
				{
					"sha": "965c0f1a33937a460365a00cb57e6f3dea990abd",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:41:46 +0100"
				},
				{
					"sha": "2dada564d82ea9181aef54ba361405e52a36dc6d",
					"message": "Create-doc-reference-View.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:41:44 +0100"
				},
				{
					"sha": "843f55a76b366c0e0146040c70b1a480a416321a",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:41:34 +0100"
				},
				{
					"sha": "57d5698b1d0d1e75f9f9e24d0e2ac86497c919d6",
					"message": "Update-doc-reference-Entity.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:41:10 +0100"
				},
				{
					"sha": "850ef85d6572deb4e3d7e600186a240c77dd4b54",
					"message": "Update-doc-Configuration-reference.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:40:56 +0100"
				},
				{
					"sha": "511226c26865c7c655d158513fbd949fc27e9d79",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:40:15 +0100"
				},
				{
					"sha": "e7e27fa9460cbf8f593a190e17223386689ef87a",
					"message": "Create-doc-reference-Entity.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:40:13 +0100"
				},
				{
					"sha": "604a449dcd146189cdfae1c1c325d8633bfcfc8c",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:40:01 +0100"
				},
				{
					"sha": "36b4482a39ce41bc100353c85b9515d9066fefe8",
					"message": "Update-doc-reference-ngAdminConfigurationProvider.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:39:45 +0100"
				},
				{
					"sha": "a57f58761d83332830b4213161e878a2885bbfbd",
					"message": "Update-doc-reference-Application.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:39:29 +0100"
				},
				{
					"sha": "03dc1efed33f9d6566a204c3254270338f49bf6a",
					"message": "Update-doc-Configuration-reference.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:38:38 +0100"
				},
				{
					"sha": "0ee2bda7a448a478030ef2b9e345759e445fe2f6",
					"message": "Update-doc-Configuration-reference.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:38:02 +0100"
				},
				{
					"sha": "9db970004a8016b89e625ec072481b9ae3c0b962",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:36:59 +0100"
				},
				{
					"sha": "e66430447b59e6312247f368f2b9929aa22dd2bc",
					"message": "Create-doc-reference-Application.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:36:58 +0100"
				},
				{
					"sha": "3b94184924f79e21c9e0371c90014cdf236e7547",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:36:42 +0100"
				},
				{
					"sha": "243495a2fd975e5c06f5f53913d6808e0e276b1a",
					"message": "Delete-doc-reference-Application.md-application_configuration.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:36:30 +0100"
				},
				{
					"sha": "e5b566a54718d4606a17cadd540160025d8edefc",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:36:10 +0100"
				},
				{
					"sha": "d0077101a54f9da577eb22e1286edb4c3701a0d5",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:35:58 +0100"
				},
				{
					"sha": "f41b78367cfb6ffe7e1979fc1189333fc74ea2a2",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:35:38 +0100"
				},
				{
					"sha": "1ac3a001d5c7dacb3916e3570c2266bf94f50dc1",
					"message": "Create-doc-reference-Application.md-application_configuration.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:35:36 +0100"
				},
				{
					"sha": "caeeaf2ce2f12227ed91622b9b2f8d3755d9bc82",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:35:06 +0100"
				},
				{
					"sha": "6cb068208d4c07bf4e8cd46491baeb91e5a1b408",
					"message": "Update-doc-reference-ngAdminConfigurationProvider.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:34:27 +0100"
				},
				{
					"sha": "40ca600038171b750df4cb459756cb5fccefcd35",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:33:37 +0100"
				},
				{
					"sha": "0dcbda8668c20b49ef98982dc32f2e289994386d",
					"message": "Create-doc-reference-ngAdminConfigurationProvider.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:33:35 +0100"
				},
				{
					"sha": "8648a52605819ffc3c18cd9be3476f8840451045",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:32:48 +0100"
				},
				{
					"sha": "86028f1db834e06efd78409cc3f6807e66aec751",
					"message": "Update-doc-Getting-started.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:31:13 +0100"
				},
				{
					"sha": "d5ed71fff683126c174b2f4e70d587d77d7e9e5d",
					"message": "Update-doc-Installation.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:29:05 +0100"
				},
				{
					"sha": "67f014f67de31367f56018cf3dc4c1b037daf76a",
					"message": "Update-doc-Usage-example.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 15:01:14 +0100"
				},
				{
					"sha": "824861ef00ae6aba966c872442e3d4ba0f9b1231",
					"message": "Add-demo-screenshots",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:52:12 +0100"
				},
				{
					"sha": "6ee30906c7a1ce434adf9abc06284e462a76f2fe",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:47:52 +0100"
				},
				{
					"sha": "db1d2b200240e45610b070d7ff7c5aca64e9d80d",
					"message": "Create-doc-Usage-example.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:47:50 +0100"
				},
				{
					"sha": "0683f369582c3f92165a40d560b95b117dff13e7",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:47:03 +0100"
				},
				{
					"sha": "9d4a0556f4ef54e4c2cae1b39035ba13dc0a66a7",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:46:05 +0100"
				},
				{
					"sha": "a953c33f8588f2e683d8db773239d7175255fc1a",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:42:20 +0100"
				},
				{
					"sha": "50644c10a89f78167e26d94ec3d8453bdf357a79",
					"message": "Delete-doc-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:42:19 +0100"
				},
				{
					"sha": "3195a9d5c88297dc7e6b6b8cff19f56d8700e46e",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:42:09 +0100"
				},
				{
					"sha": "83fa6af1a51be5c070d9bc642001485911f50ae4",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:41:54 +0100"
				},
				{
					"sha": "757b12add869d4614b4307345110672b3634570b",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:41:14 +0100"
				},
				{
					"sha": "2dd8f6297630cbb1cde44818f7f6e1331efe0b20",
					"message": "Update-doc-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:39:35 +0100"
				},
				{
					"sha": "a851f690e554da84fd80b63466753de75e1953c7",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:38:09 +0100"
				},
				{
					"sha": "7717ab4e3edbb891c7bfe0fbd80410f0b258f3be",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:36:41 +0100"
				},
				{
					"sha": "8c45cb27cc774366b930b77a182569497a0a94ab",
					"message": "Update-doc-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:35:42 +0100"
				},
				{
					"sha": "cdfa7a7ea713a53dd8b386a8e8434f60554d8696",
					"message": "Create-doc-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:35:23 +0100"
				},
				{
					"sha": "fdfecc694f5b128dd4e3d41f489fdad69150ce4c",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:34:59 +0100"
				},
				{
					"sha": "ed482e00642e931dce3da44f7e0e4ac11a8e4a59",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:34:39 +0100"
				},
				{
					"sha": "9260efd5995c63b4f8c7d838ebc75809dd4a8083",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:33:36 +0100"
				},
				{
					"sha": "727df626ee2b5501f95a9063335134fab9d50945",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:33:12 +0100"
				},
				{
					"sha": "2cde0e9ccc2fd615e43843b3d2e8da8af6aa78cd",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:33:07 +0100"
				},
				{
					"sha": "6d2c789627d364d0ea2d6789a7e8fe1124f8a222",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:33:00 +0100"
				},
				{
					"sha": "2661f9fc319f0f4e966c7bc50a81589bdc39cf6c",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:32:56 +0100"
				},
				{
					"sha": "6fef06886b97376cb88b3e6d6d7cf900432903f8",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:32:47 +0100"
				},
				{
					"sha": "a20c52e15a2837c4ad6052e6927b1ee744af6c7a",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:32:39 +0100"
				},
				{
					"sha": "663eaa1deb6b2b4c1be6664fbff87d9a350d05a0",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:32:33 +0100"
				},
				{
					"sha": "ecb186d9a7af70a10f67e49aff10b6b52ad43b5b",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:32:25 +0100"
				},
				{
					"sha": "36ce6e512ab869cdb74be654ec015d4b9c56d723",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:31:26 +0100"
				},
				{
					"sha": "6810277786c58b7bac07e1e0ab350e98fc35c6a7",
					"message": "Update-doc-Installation.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:30:43 +0100"
				},
				{
					"sha": "16253d38bcd0ef292a58b4660c255d81158515ce",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:29:21 +0100"
				},
				{
					"sha": "9d423f64d8e072bf434ea84c5ec3edfefe360116",
					"message": "Create-doc-Installation.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:29:19 +0100"
				},
				{
					"sha": "0cfa9251a96257c4646e12070a628f864d3a8e80",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:28:35 +0100"
				},
				{
					"sha": "63659d2c5ae6bdeb4cc6253ce3ecf0f631bd0931",
					"message": "Update-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:23:50 +0100"
				},
				{
					"sha": "a287cfab1ab3998d470b9673b112bac13bde1176",
					"message": "Create-book.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:21:32 +0100"
				},
				{
					"sha": "c3d77c16da9bac5e4d9d9c4a4633411e1e29549d",
					"message": "Update-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:21:01 +0100"
				},
				{
					"sha": "3aa1b8b12d75b05d7996b8258af4c8a340337439",
					"message": "Create-SUMMARY.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 28 Oct 2015 14:20:32 +0100"
				},
				{
					"sha": "9b1d8a7dbcd175240d573ddde819c6b469a80d7f",
					"message": "fix-JS-error-values-of-undefined-on-a-missing-reference-in-a-column",
					"author": {
						"name": "Ken Egozi",
						"email": "mail@kenegozi.com"
					},
					"date": "Thu, 22 Oct 2015 10:36:48 -0700"
				},
				{
					"sha": "3c69410139fbb08435fe4e6bfa5573ee75b2ed69",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Oct 2015 10:17:06 +0100"
				},
				{
					"sha": "cbe589109813982ffaa28205c184f31b303b520b",
					"message": "Merge-pull-request-753-from-marmelab-relationships_do",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Oct 2015 16:02:53 +0200"
				},
				{
					"sha": "11cd4bd3182b8d8974b0d4ce5165dccf29f0ec1a",
					"message": "finalize-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Oct 2015 15:39:07 +0200"
				},
				{
					"sha": "289649d1c3b811c7763eda282ab8698c034d93e8",
					"message": "Add-Relationships-doc-chapter-to-clarify-field-types",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 22 Oct 2015 18:36:27 +0200"
				},
				{
					"sha": "3b282b62f079aaf081c90c3b4c8f10333f6d8351",
					"message": "Fix-wrong-directive-names-in-action-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Oct 2015 21:55:41 +0200"
				},
				{
					"sha": "eb5624960e6e2b5272b398253b4daecfacdc28c5",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Oct 2015 21:38:11 +0200"
				},
				{
					"sha": "0d95179c6abb11a129b201bc0c8fef6dd629e8c0",
					"message": "Merge-pull-request-714-from-marmelab-embedded_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Oct 2015 21:31:09 +0200"
				},
				{
					"sha": "c16e73961308a8ac7a4f33c5d566a1cfe73e5e7f",
					"message": "Merge-pull-request-744-from-marmelab-fix_checkbpx_field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Oct 2015 21:28:25 +0200"
				},
				{
					"sha": "f3d88a5f207b71f5188d98d104ac10590bac6358",
					"message": "the-non-required-version-is-affected-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Oct 2015 21:04:00 +0200"
				},
				{
					"sha": "0b6a70c40a8e32c068ad7872e97da4f1006774d0",
					"message": "Fix-checkbox-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Oct 2015 20:59:55 +0200"
				},
				{
					"sha": "7e45502a5e892718faa631f7e47ca3ccc358bfbf",
					"message": "Merge-pull-request-732-from-marmelab-fix_reference_field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 19 Oct 2015 14:34:53 +0200"
				},
				{
					"sha": "be707ea458a9b6e9724e71ebdec884b0e7451c4f",
					"message": "Merge-pull-request-740-from-marmelab-fix_ui_select_multi",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 19 Oct 2015 14:23:11 +0200"
				},
				{
					"sha": "e27d874652d61394218a21740fe421985a0eb869",
					"message": "Fix-and-clean-test-remove-ReferenceRefresher-getInitialChoices-method",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 19 Oct 2015 14:14:06 +0200"
				},
				{
					"sha": "2f156870118768c45a72bc77e77cc36acb9f3d8e",
					"message": "Fix-doc-remoteComplete-configuration-reference-code-block-indentation",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sun, 18 Oct 2015 23:07:02 +0200"
				},
				{
					"sha": "bb8cd4519610a8bc137d03b41cee58ba5b55cd2a",
					"message": "Fix-double-call-on-reference_many-fields",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sun, 18 Oct 2015 23:04:19 +0200"
				},
				{
					"sha": "40e98b5f4ad71db7001e7df5b7e4cb649103dcee",
					"message": "Fix-UI-select-multi-style",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sun, 18 Oct 2015 14:16:28 +0200"
				},
				{
					"sha": "51ea070fac5f5cffa46b4abbc34c2be5e30b591a",
					"message": "Document-default-value-attribute-in-ma-create-button",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 16 Oct 2015 17:30:13 +0200"
				},
				{
					"sha": "ba8398fa358d030fa3e1754aac854b43bc38caf9",
					"message": "There-is-no-template-type-anymore",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 16 Oct 2015 17:10:18 +0200"
				},
				{
					"sha": "844eb2236ee1d1072edd41de6d73fa99a8d8db30",
					"message": "Add-a-little-more-details-about-reference_many",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 16 Oct 2015 13:28:29 +0200"
				},
				{
					"sha": "bfe32800175c946714fab0b779badfb1d870dbc4",
					"message": "document-the-embedded_list-type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 16 Oct 2015 13:13:42 +0200"
				},
				{
					"sha": "043a3801137488ae2264d4cde50696b85b5e704d",
					"message": "Rewrite-the-reference-and-referenced_list-field-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 15 Oct 2015 08:48:36 +0200"
				},
				{
					"sha": "5b0496f645affbee37d40abb7edc77b296470acc",
					"message": "Add-basic-e2e-test-for-EmbeddedListField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 15 Oct 2015 07:44:14 +0200"
				},
				{
					"sha": "0f32e66dbb24b72b951b6275f4b731b1c071311a",
					"message": "Add-e2e-tests-for-maEmbeddedListColumn",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 13 Oct 2015 23:49:08 +0200"
				},
				{
					"sha": "d7957df7aee78a7ca0634c8015f9b0b6a262eba4",
					"message": "add-unit-tests-for-maEmbeddedListField-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 13 Oct 2015 23:35:04 +0200"
				},
				{
					"sha": "eeb33316ba1d17630b71b753e4a2187c02adb444",
					"message": "Add-test-for-maEmbeddedListColumn",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 13 Oct 2015 22:59:30 +0200"
				},
				{
					"sha": "15cb799b1aa68d3d65ea500dd3b6163455c768a4",
					"message": "Fix-double-call-on-reference-fields",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 12 Oct 2015 16:03:51 +0200"
				},
				{
					"sha": "eb7614ec507a8517dddb96e964608bee94d1a6b9",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Oct 2015 16:54:18 +0200"
				},
				{
					"sha": "b8cea76ee69b26495285862ab96de612cdd489fd",
					"message": "Merge-pull-request-726-from-marmelab-filter_transform",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Oct 2015 16:45:53 +0200"
				},
				{
					"sha": "2070d0ae5bb49455bb95cca68818d2e041c8d3d4",
					"message": "Make-Field.transform-work-on-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Oct 2015 16:29:54 +0200"
				},
				{
					"sha": "40dad41d76aae66d1ddf2cfa26b3d06e366b47d3",
					"message": "Implement-column-sorting-in-embedded_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Oct 2015 16:03:08 +0200"
				},
				{
					"sha": "4bbf48ca9458b04055ccefb9959a75405729589d",
					"message": "Merge-pull-request-724-from-daveshah-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Oct 2015 08:46:10 +0200"
				},
				{
					"sha": "4d2d5ee50cf8ebe4a445cfe69de677b0cc48db08",
					"message": "Fix-another-broken-link",
					"author": {
						"name": "Dave Shah",
						"email": "david.a.shah@gmail.com"
					},
					"date": "Thu, 8 Oct 2015 17:32:14 -0400"
				},
				{
					"sha": "12aff98ff69455de81b80716531300115684819f",
					"message": "Merge-pull-request-718-from-rndstr-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Oct 2015 16:36:28 +0200"
				},
				{
					"sha": "576a8e341b4c20cb222f9574fb71d94f810c9de6",
					"message": "fix-typo-in-README",
					"author": {
						"name": "Roland Schilter",
						"email": "roli@schilter.me"
					},
					"date": "Tue, 6 Oct 2015 16:33:04 +0200"
				},
				{
					"sha": "e8a9b13cb1c172bf3abba52092bf25749f12dfb5",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Oct 2015 12:36:00 +0200"
				},
				{
					"sha": "811182b45c4976616d784677ad1342b7e242a7f8",
					"message": "Fix-embeddd_list-formatting-in-small-screens",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Oct 2015 08:28:28 +0200"
				},
				{
					"sha": "b287082b015526362fbc400f93705d9e8b07f4dc",
					"message": "Make-embedded_list-work-without-an-id",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 2 Oct 2015 22:49:19 +0200"
				},
				{
					"sha": "f84ad570c23157b906fb107ffcb5fa9a05f37d46",
					"message": "add-maEmbeddedListField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 2 Oct 2015 16:01:08 +0200"
				},
				{
					"sha": "b89a36571fda8087c79cc932a08af2552ce6cfff",
					"message": "Introducing-embbeded_list-type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 2 Oct 2015 11:51:06 +0200"
				},
				{
					"sha": "4298be81cd16406701ebd9e838e3d4b9e2537cd5",
					"message": "Merge-pull-request-713-from-marmelab-all_fields_have_template",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 18:29:31 +0200"
				},
				{
					"sha": "e09bd7c06db3c8d85986c5b4263300c722898c10",
					"message": "Fix-typos",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 18:27:33 +0200"
				},
				{
					"sha": "3d6f5b5ce8326b84998567570c0efe5f7621c0ac",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 18:25:37 +0200"
				},
				{
					"sha": "edabd0957e3e98c7c25aa2de17eaa6ec0ac99562",
					"message": "Fix-validation-bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 15:48:58 +0200"
				},
				{
					"sha": "15586612cef2a16e651be9c372a770f0e8efbf5f",
					"message": "Fix-more-bugs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 15:13:30 +0200"
				},
				{
					"sha": "5ea24c7167a885401b5e86eda544fcb498e2e362",
					"message": "Fix-bugs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 14:59:52 +0200"
				},
				{
					"sha": "463112e01cb4049b19364ad0eda6ac3b958760c5",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 14:25:11 +0200"
				},
				{
					"sha": "379e3c5e8ea7ddcc09f54608f8e525025bea13a7",
					"message": "Siplify-fieldView-configuration-now-that-value-is-in-every-scope",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 13:10:57 +0200"
				},
				{
					"sha": "cfc389f815a93ce6ea7ba5e724fb7aee5144a42b",
					"message": "Explicit-template-type-deprecation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 09:37:54 +0200"
				},
				{
					"sha": "70c88f263c917e974ab91fab400aa5608f40e372",
					"message": "Add-doc-make-value-always-available-in-scope-for-template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 09:34:16 +0200"
				},
				{
					"sha": "15279e1960518b3b36a607ca2a6a4585a99349bc",
					"message": "Add-unit-tests-for-maColumn-and-maFilter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 08:49:11 +0200"
				},
				{
					"sha": "7fd429bb855b582f92e0c6bb1d5eb0cd27aadca8",
					"message": "Add-test-for-maField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 23:37:38 +0200"
				},
				{
					"sha": "be18f4d070a13cf5c9606a5493a9cde28ec55030",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 22:59:49 +0200"
				},
				{
					"sha": "8cc18a8db1f4e9d0ac7cc774af188801c53817e6",
					"message": "use-compatible-admin-config-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 14:46:58 +0200"
				},
				{
					"sha": "2b31ad301e61658b7dbfb9b8ad2dc2cb41da05da",
					"message": "Handle-template-for-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 14:13:07 +0200"
				},
				{
					"sha": "d5fff296b688b47d6f13dd6fbfd2b6bb3040d91a",
					"message": "Add-support-for-.template-to-all-field-types",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 10 Sep 2015 08:39:20 +0200"
				},
				{
					"sha": "de546b7a7681afae0ea6df24423b9948e9197836",
					"message": "Merge-pull-request-709-from-marmelab-inifinite_loading_references",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 10:28:28 +0200"
				},
				{
					"sha": "34da7250a377cc5923ef3059725bcb69a9de590d",
					"message": "Merge-pull-request-707-from-marmelab-required_boolean",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 10:27:30 +0200"
				},
				{
					"sha": "c2abaf718bf7270bbf4e968837a19f4097ea0aa1",
					"message": "Added-tests-for-ma-boolean-column-and-ma-checkbox-field-directives",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 19:12:09 +0200"
				},
				{
					"sha": "981509b2f97b8fd371f61adb972af26658231444",
					"message": "Fixed-blog-config",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 18:50:51 +0200"
				},
				{
					"sha": "75b16842464883a1eba4306702715d144bbb38b0",
					"message": "Merge-pull-request-711-from-marmelab-nested_url",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 10:18:42 +0200"
				},
				{
					"sha": "b8a1b8f36f5ffe08d139b98c7dadc06a7e7c099f",
					"message": "Fixes-after-review",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 18:47:13 +0200"
				},
				{
					"sha": "2fc3d96fade39635d1c7772c965834dc9dfeb0c1",
					"message": "Fixed-tests",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 15:27:06 +0200"
				},
				{
					"sha": "8c635a1a5901a14159c1c9d13d25643d643740eb",
					"message": "Required-boolean-fields-use-a-checkbox-for-edition-instad-of-a-dropdown",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 14:50:59 +0200"
				},
				{
					"sha": "851f21e0e151a8a104dd9bd9be85d810152ad54f",
					"message": "Document-the-way-to-define-nested-entity-urls-for-relationships",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 30 Sep 2015 10:09:40 +0200"
				},
				{
					"sha": "71f703eaeb8dd8b53ffa54dd5db109198829882a",
					"message": "Merge-pull-request-708-from-marmelab-fix_datagrid_header",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 29 Sep 2015 16:56:11 +0200"
				},
				{
					"sha": "2bd9ac6c17f0140d6e593fb26e172af765b7304f",
					"message": "Added-back-the-call-to-getCssClasses-in-datagrid-header",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 29 Sep 2015 09:13:57 +0200"
				},
				{
					"sha": "21e3b64d83d633a91ff4a6e176b925e5e3d7f4e0",
					"message": "define-to-export-default",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 29 Sep 2015 09:06:16 +0200"
				},
				{
					"sha": "d74498224d3663069d17f7264543e8ea282a9210",
					"message": "Fixes-624",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 17:58:37 +0200"
				},
				{
					"sha": "ae5afa2401b8d32f0601efd1c1e723bc4e7c065a",
					"message": "Merge-pull-request-706-from-marmelab-sinon",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 16:19:01 +0200"
				},
				{
					"sha": "15673d8368fb87b08bfc75e0babe151d368de018",
					"message": "Fix-invalid-reference-to-entry-in-datagrid-header",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 15:44:33 +0200"
				},
				{
					"sha": "7e9f0c2cc3437a1a3abdd35b642988509cd7cf17",
					"message": "use-sinon-14.1-in-grunt-too",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 15:10:29 +0200"
				},
				{
					"sha": "b41610e1a3de75469f6fc23d284076c43f0eac27",
					"message": "Fixed-Build-demo",
					"author": {
						"name": "Gildas",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 12:29:32 +0200"
				},
				{
					"sha": "9ebc515c7261c36756ebdea9193f907539708f93",
					"message": "Merge-pull-request-702-from-marmelab-format_doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 23 Sep 2015 13:56:36 +0200"
				},
				{
					"sha": "3fa4221e3f73b99cf3090ca6000d4d057f4ba243",
					"message": "Merge-pull-request-704-from-SebLours-SebLours-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 23 Sep 2015 13:55:24 +0200"
				},
				{
					"sha": "b255ecfacd586f0ad11ada35fa465d3629711efa",
					"message": "Doc-fixed-bad-method-name-Reference-targetLabel",
					"author": {
						"name": "Sébastien Lourseau",
						"email": "sebastien@emagma.fr"
					},
					"date": "Wed, 23 Sep 2015 11:00:32 +0200"
				},
				{
					"sha": "5f3c898cd9ea7f44fbb6385b4f8c56bf7ee73014",
					"message": "Add-doc-on-input-date-requirement-for-format",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 22 Sep 2015 18:06:23 +0200"
				},
				{
					"sha": "9b443ec9ecd737374e772e58dd50a3035946d8fc",
					"message": "Fix-first-install",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 21 Sep 2015 14:59:25 +0200"
				},
				{
					"sha": "c27730911e231c9d2d7a2bc4f3e6fa10353910d2",
					"message": "Merge-pull-request-696-from-marmelab-create_default_value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 21 Sep 2015 14:57:02 +0200"
				},
				{
					"sha": "8267d9530e50eb0e44a850806db3cb05705e256e",
					"message": "Merge-pull-request-697-from-VincentBel-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 21 Sep 2015 10:20:48 +0200"
				},
				{
					"sha": "9b23d1cdf55fdd2f66ed5ae3bf9130bc056c18a3",
					"message": "Correct-spelling-error-in-Configuration-reference",
					"author": {
						"name": "Vincent Bel",
						"email": "buaazqh@gmail.com"
					},
					"date": "Sat, 19 Sep 2015 16:32:03 +0800"
				},
				{
					"sha": "cbc624b03b3372d3718e68f6e4cb65428f4d784c",
					"message": "Fix-scope-bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Sep 2015 23:58:28 +0200"
				},
				{
					"sha": "c33e988ac74dd63e382a5c0f158a7cdc0f5c137b",
					"message": "Refactor-button-difrectives-to-accept-entityName",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Sep 2015 23:25:04 +0200"
				},
				{
					"sha": "16ced650d4982459817aff04c9d2db1e62b05d75",
					"message": "Allow-entity-creation-with-default-values",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Sep 2015 22:51:35 +0200"
				},
				{
					"sha": "7ee0efc11b9d78dfbffdeac11b3198eeb65b204e",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Sep 2015 21:20:46 +0200"
				},
				{
					"sha": "acda6cff829495382d65c426ad0567053892e419",
					"message": "Update-admin-config-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 18 Sep 2015 21:20:13 +0200"
				},
				{
					"sha": "7d954db6f42254f275c4298fc1a4b3c00a7f5b13",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 17 Sep 2015 18:50:48 +0200"
				},
				{
					"sha": "2436aa2e534679384fb5164a9a2a66b081261574",
					"message": "Merge-pull-request-694-from-marmelab-hotfox_optimized_queries",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 17 Sep 2015 18:48:53 +0200"
				},
				{
					"sha": "417a993f7b042c3596ac9600a7aa14d178628458",
					"message": "Fix-dashboard-and-global-variable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 17 Sep 2015 18:44:33 +0200"
				},
				{
					"sha": "2137fd28b7298475ba525f2089ab372001831515",
					"message": "Fix-optimized-queries",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 17 Sep 2015 18:42:41 +0200"
				},
				{
					"sha": "a5c96bcc44484dcf3beca517fc6eb50851de8490",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 17 Sep 2015 09:27:08 +0200"
				},
				{
					"sha": "8bb1e36a27a0262d96c64505d738963a70c9dff2",
					"message": "Merge-pull-request-688-from-marmelab-referenced_list_references",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 17 Sep 2015 09:24:50 +0200"
				},
				{
					"sha": "e9b16e7f89babd06b923e5cebbee83f128c13871",
					"message": "Refactor-for-better-clarity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Sep 2015 17:41:55 +0200"
				},
				{
					"sha": "ed8ad21f874afc4b6d9b8c3afb1da3c277e974e1",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Sep 2015 14:57:59 +0200"
				},
				{
					"sha": "2ebcec2a1a14e8aaf2fce0d7f367c1c1bddd2b4b",
					"message": "Merge-pull-request-691-from-marmelab-default_filter_fix",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Sep 2015 14:38:53 +0200"
				},
				{
					"sha": "2b3a3baa31cf73a7d4350e9f7dcc40a43440fd42",
					"message": "Fix-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Sep 2015 14:31:36 +0200"
				},
				{
					"sha": "3d5dda15a2b58d0c07138465e25233a26118a845",
					"message": "Fix-unit-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Sep 2015 14:28:55 +0200"
				},
				{
					"sha": "ae956c3ba7593ccd33138d455dd130704fc69eb5",
					"message": "Fix-default-filter-glotch",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Sep 2015 14:17:42 +0200"
				},
				{
					"sha": "b36634e2d7bdedeaf2aa1e6ea80369705fcd6e5c",
					"message": "Rebuild-files",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 14 Sep 2015 16:15:39 +0200"
				},
				{
					"sha": "e183397c496d3af8d0eb431c90192307623f7373",
					"message": "Merge-pull-request-642-from-marmelab-show_list_redirect",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 14 Sep 2015 16:08:37 +0200"
				},
				{
					"sha": "e9a73af645a6a68eaf738d1c016d66d4c0d6a4ff",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 14 Sep 2015 15:39:21 +0200"
				},
				{
					"sha": "4785a0588dbf86dec0fc512ff71aca392caadbd8",
					"message": "Preload-references-in-refrenced_list-entries",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Sep 2015 16:25:21 +0200"
				},
				{
					"sha": "5a952b416d6e7527ec1118cbafc0db6f5e802e86",
					"message": "Code-review",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 11 Sep 2015 16:36:03 +0200"
				},
				{
					"sha": "2dadf409faddf83cf119ed966f35865accf45754",
					"message": "Remove-sinon-dependency",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 11 Sep 2015 10:17:46 +0200"
				},
				{
					"sha": "25208606c270b1afbf1ca72893cab6966e5adb62",
					"message": "Retrigger-Travis",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 10 Sep 2015 17:58:58 +0200"
				},
				{
					"sha": "359d2dd76b4e7a2b96fdaa75af4a2f1ecbb2465d",
					"message": "Code-cleaning",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 10 Sep 2015 11:56:12 +0200"
				},
				{
					"sha": "f654de3a0fb17404918faa6bc2fc3afadb6d88d9",
					"message": "Redirect-to-list-if-previous-page-was-related-to-deleted-entity",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 10 Sep 2015 11:53:28 +0200"
				},
				{
					"sha": "c1e1e246ded5a417ae0fdb2a5a57adb0fa7bfb29",
					"message": "Update-tests-still-in-draft",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 09:54:08 +0200"
				},
				{
					"sha": "ff49cd0877c1c6d184fe18b89da14fe1cf63b5f3",
					"message": "Return-to-list-view-when-deleting-a-record",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 15:09:02 +0200"
				},
				{
					"sha": "b0c8acb43232f102645a26c57178ba9ce1b7b91b",
					"message": "Merge-pull-request-686-from-AndreiRailean-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 11 Sep 2015 08:45:45 +0200"
				},
				{
					"sha": "c9e51344db73e65cec814c1c16a224f77fd14616",
					"message": "Fix-link-to-Theming-doc",
					"author": {
						"name": "Andrei Railean",
						"email": "andrei@siter.com.au"
					},
					"date": "Fri, 11 Sep 2015 12:16:33 +1000"
				},
				{
					"sha": "60da219f083ae4f37e00d1f91846027a483bfc5c",
					"message": "Fix-broken-link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 16:58:46 +0200"
				},
				{
					"sha": "45ae22c1667acc3346e7ae4ffa39215a20cc5f6e",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 14:53:32 +0200"
				},
				{
					"sha": "3d20505803d9ff1a851d0c2b1d6a13c2430b7db7",
					"message": "Merge-pull-request-677-from-marmelab-datastore_unique",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 14:28:06 +0200"
				},
				{
					"sha": "637128e3fdace48146745f043bcb0155c2859e95",
					"message": "Fix-bug-with-datastore-when-two-references-are-on-the-same-entity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 14:18:31 +0200"
				},
				{
					"sha": "f358afeabbdb3917dcbe367830a93fda71736717",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 12:24:22 +0200"
				},
				{
					"sha": "d41cda45f631aab28135a32da421f7fbf64862a6",
					"message": "Merge-pull-request-675-from-marmelab-view_actions_reponsive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 12:18:10 +0200"
				},
				{
					"sha": "bd77c92a31926212732f4fe534209bbf86deaa0a",
					"message": "Merge-pull-request-676-from-marmelab-right_number",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 12:02:00 +0200"
				},
				{
					"sha": "9f126d232daa35c4b0451ca2c191a1b876e5e074",
					"message": "Align-number-fields-right-in-the-datagrid",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 11:58:18 +0200"
				},
				{
					"sha": "4fc346403abc1b727fb7858462e195a5e45b2c4e",
					"message": "Make-view-actions-more-responsive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 11:49:55 +0200"
				},
				{
					"sha": "d4e47c03a376f9fdb9cd17cbf4316e96ce383688",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 10:26:52 +0200"
				},
				{
					"sha": "789235e30e1b49e1f14d34b5fd6e87eaee0fa729",
					"message": "Merge-pull-request-674-from-marmelab-css_class_list",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 09:45:30 +0200"
				},
				{
					"sha": "7208f6423ffd4aa951d9d2495a29a03b99a184aa",
					"message": "Merge-pull-request-673-from-marmelab-date_widget",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 09:44:31 +0200"
				},
				{
					"sha": "506868277ba5e5553c9a515e1669c9776b78f997",
					"message": "Merge-pull-request-672-from-marmelab-responsive",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 09:43:59 +0200"
				},
				{
					"sha": "d9a5fc31737c19ecc209ba84ecb4ae4e98e7a423",
					"message": "Fix-tests-again",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 08:55:53 +0200"
				},
				{
					"sha": "12c7fb21633c1050f16b12394ae165b432efd0f6",
					"message": "Add-field-type-classes-to-list-show-and-edition-creation-views",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 8 Sep 2015 08:47:37 +0200"
				},
				{
					"sha": "37a0c7ec1230c6ad409f73310d3425f4a56485ac",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 23:11:15 +0200"
				},
				{
					"sha": "dfb4b66e46861f4500e76cc955908a738d3c911d",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 23:01:23 +0200"
				},
				{
					"sha": "de7e882a5b48dbb39cb47ae69ba2878acfd76c74",
					"message": "Fix-inconsistencies-in-file-naming",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 22:49:26 +0200"
				},
				{
					"sha": "27d06beef15f98124c42aa8271da0df34389d36b",
					"message": "Apply-cssClasses-both-to-th-and-td-in-listView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 22:42:56 +0200"
				},
				{
					"sha": "2e84074e8a48341ed6cb8bc51e8f1975f5003ec0",
					"message": "Fix-date-widget-formatting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 22:20:23 +0200"
				},
				{
					"sha": "428f3b6159a06710014e83ee49133519139420c2",
					"message": "Make-dashboard-responsive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 21:33:11 +0200"
				},
				{
					"sha": "3ad141811e7bfcb5a3bbc1a8ed1fc76b636790d2",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 7 Sep 2015 17:31:53 +0200"
				},
				{
					"sha": "de0a6e4ed8214ffd0f14c99c85f97aa940ac15b7",
					"message": "Merge-pull-request-667-from-marmelab-menu_autoclose",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 17:26:34 +0200"
				},
				{
					"sha": "cd3440c13921ac153f7132969518f7a34ce4cd9f",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 7 Sep 2015 17:01:13 +0200"
				},
				{
					"sha": "5d91a6e1b0f292690527d707d0b1e3a83b668fb3",
					"message": "add-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 7 Sep 2015 16:44:35 +0200"
				},
				{
					"sha": "74fe1e8a12ce58985547e40584375aa0961b19c2",
					"message": "Merge-pull-request-669-from-JacoKoster-patch-1",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 12:17:49 +0200"
				},
				{
					"sha": "2b5bda8545c881bb3f36657d7f2d0cf2aa298a31",
					"message": "Fixed-the-link-to-the-configuration-reference-API",
					"author": {
						"name": "Jaco Koster",
						"email": "JacoKoster@users.noreply.github.com"
					},
					"date": "Mon, 7 Sep 2015 12:14:38 +0200"
				},
				{
					"sha": "fae5da423d9cb89bbdedf6fb7bc5afbf87a37331",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 11:17:49 +0200"
				},
				{
					"sha": "f25adb4e3419cc0837ceb85576a688df63b969c4",
					"message": "fix-referenced_lists-don-t-account-for-permanent_filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 11:14:24 +0200"
				},
				{
					"sha": "72847bf7abd24b9c40cf1df49a2604ce01f83a7e",
					"message": "update-documentation",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 7 Sep 2015 10:53:08 +0200"
				},
				{
					"sha": "393316f2960e1d2d2f6bdba133cc37188874c058",
					"message": "correctly-initialize-openMenus",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 7 Sep 2015 10:44:22 +0200"
				},
				{
					"sha": "650146640a4b967a226842c77f967a66acfddac0",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Sep 2015 10:12:39 +0200"
				},
				{
					"sha": "900e745561e557c7cb4011ab76c93c7792bfb1ef",
					"message": "allow-to-deactivate-automatic-closing-on-menu",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 4 Sep 2015 17:48:03 +0200"
				},
				{
					"sha": "b7f3a5ad05255411facbe3c1056b6f6d63d2e370",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 4 Sep 2015 18:14:05 +0200"
				},
				{
					"sha": "ee76f32df3cf752375b66a45d3354a8fdd7fa932",
					"message": "Update-link-to-the-demo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 4 Sep 2015 13:38:19 +0200"
				},
				{
					"sha": "5adc4656e546c7af5bafb1dd2dad807abe5db1c8",
					"message": "Fix-663-in-a-better-way",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 4 Sep 2015 10:26:49 +0200"
				},
				{
					"sha": "6b09e767c32068839c5345b23872a90946a88c23",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 4 Sep 2015 10:10:00 +0200"
				},
				{
					"sha": "f0ecf4ff115dd29d70f96ce7da51cf30fdfb2735",
					"message": "Merge-pull-request-663-from-marmelab-fix_filter_conflict",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 4 Sep 2015 10:04:29 +0200"
				},
				{
					"sha": "59c00880b82ed6118d14f0eafbb22842e0df9ef8",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Sep 2015 21:14:56 +0200"
				},
				{
					"sha": "477a8f7603eff6aeca245eb8bf5b0dcb87be76d2",
					"message": "fix-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 3 Sep 2015 18:12:57 +0200"
				},
				{
					"sha": "9915c3df540fac597270728735005c838b58c912",
					"message": "add-a-test-to-reproduce-the-bug",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 3 Sep 2015 17:05:10 +0200"
				},
				{
					"sha": "d47edb59b2a6ed10829eac425d1166b28f130731",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 3 Sep 2015 14:53:25 +0200"
				},
				{
					"sha": "b2efd6a1af518b649eac16d8abeceb2bacd161e4",
					"message": "Merge-pull-request-661-from-marmelab-allow_filter_custom_action",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 3 Sep 2015 14:50:54 +0200"
				},
				{
					"sha": "4020adb42c6b994fb4ebf38073fd5e5d0da231f0",
					"message": "allow-to-add-filter-when-using-custom-actions",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 3 Sep 2015 14:23:40 +0200"
				},
				{
					"sha": "9a6150de0e6f7c8c4ea58ceeac66dbd99e19f33c",
					"message": "update-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 3 Sep 2015 13:50:50 +0200"
				},
				{
					"sha": "ea57d23c4ecbb9977ec4913f2186d2254eecd2d4",
					"message": "Merge-pull-request-659-from-marmelab-reference_map",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Sep 2015 11:31:10 +0200"
				},
				{
					"sha": "06ae688f557f752f0996c5323482d9ccc809e389",
					"message": "Fix-inconsistency-in-remote-reference-map",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Sep 2015 10:03:24 +0200"
				},
				{
					"sha": "cc6a89d62e33aff47ebb618931a2571e85070a77",
					"message": "Merge-pull-request-625-from-marmelab-fakerest",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Sep 2015 11:19:18 +0200"
				},
				{
					"sha": "30b520e55535428059b5d608f23c51bff7e1ab6e",
					"message": "Merge-pull-request-655-from-marmelab-referenced_list_actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 3 Sep 2015 11:05:10 +0200"
				},
				{
					"sha": "d437e9f9d29cef96686d7fa41d67fc79a62d14a0",
					"message": "Remove-json-server-stub",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 02:15:20 +0200"
				},
				{
					"sha": "f4474372d1e0da4182a02dee7ffc04841604b96b",
					"message": "Remove-file-field-in-config",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 02:13:28 +0200"
				},
				{
					"sha": "8ce1a16c07218d05881549315e3c447ec73fd624",
					"message": "Remove-usage-of-json-server-and-clean-gruntfile",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 01:52:16 +0200"
				},
				{
					"sha": "c4d1700cbfe53c195cbf714aa191ba6810db7bb7",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 01:31:19 +0200"
				},
				{
					"sha": "ece2365dc89362e9a7a53620a0d2ae3810839b98",
					"message": "Update-fakerest-dependency",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 00:30:34 +0200"
				},
				{
					"sha": "138e018fde6f368fe75b89c33f63c5076ea71ad8",
					"message": "Use-jasmine-spyOn-instead-of-sinon",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 00:15:13 +0200"
				},
				{
					"sha": "1004157e6c2ec100592522fae097244f56c1cfa0",
					"message": "Use-fakerest-and-webpack-dev-server-for-blog-example",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 27 Aug 2015 09:38:58 +0200"
				},
				{
					"sha": "e2b1536a4d0b61fa2179446e79c7a224e0893b16",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 23:14:50 +0200"
				},
				{
					"sha": "e179a5b2c0e61457b63fdb704debee469080eec5",
					"message": "Merge-pull-request-651-from-marmelab-filter_state",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 23:10:31 +0200"
				},
				{
					"sha": "5d4795b44de9b4c9f5c9794b15bd0b0f2671b344",
					"message": "New-attempt-at-fixing-bad-asynchronous-handling-by-protractor",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 23:05:32 +0200"
				},
				{
					"sha": "04d8f2d37a1e06c80763ead8b1081ee69dfbc70f",
					"message": "re-add-listActions-support-on-referencedList",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 22:56:15 +0200"
				},
				{
					"sha": "c44f00e3af1aaa44396426f5131faa370b471f23",
					"message": "Merge-pull-request-654-from-marmelab-referenced_link_target_entity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 22:13:14 +0200"
				},
				{
					"sha": "eb41fdc50b0ed8e899b92f67e5ca17dd0c4e5615",
					"message": "Fix-referenced_list-loses-detailLink-when-using-new-entity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 21:52:13 +0200"
				},
				{
					"sha": "4e0c502eb6124bb82e3720ebfecfd77653901099",
					"message": "Merge-pull-request-653-from-marmelab-getFieldConstructor",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 18:46:15 +0200"
				},
				{
					"sha": "7d2b8133728653090dda57fddfdcf5cef85bb9a0",
					"message": "Another-try",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 18:27:01 +0200"
				},
				{
					"sha": "1f020f48461d4c95edf740dca468efa42bff9ae8",
					"message": "Expose-field-constructors-to-avoid-Webpack-Babel-fuss",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 18:13:02 +0200"
				},
				{
					"sha": "7783da868c3e35609710afa11e80ea2af3e9a7fb",
					"message": "Trying-to-overcome-failing-filter-on-Saucelabs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 18:02:46 +0200"
				},
				{
					"sha": "b4bd09dada57c71b07da81069bd41181647f9e5b",
					"message": "Fix-bug-where-filters-are-freezed-when-url-changes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 13:25:54 +0200"
				},
				{
					"sha": "7a7d3a0e379df4f9098f85212135f3f6f4892af4",
					"message": "Fix-broken-build",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 14:49:14 +0200"
				},
				{
					"sha": "85e7e1127546c6eda74eb4bc91dfd921bd7aa04d",
					"message": "Update-webpack-conf-to-allow-proper-CSS-cascade",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 13:54:49 +0200"
				},
				{
					"sha": "c31c873b98c604cd4b8aa1323d19ce093f6c5d38",
					"message": "Merge-pull-request-650-from-marmelab-custom_menu_link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 13:24:27 +0200"
				},
				{
					"sha": "18cd655868db722f623e9fd5ddcfb65842081142",
					"message": "Fix-flickering-when-using-custom-menu-link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 12:46:57 +0200"
				},
				{
					"sha": "e60ea22ea4afc10680e94ef1d210d2a44e244960",
					"message": "Merge-pull-request-645-from-powize-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 2 Sep 2015 10:30:59 +0200"
				},
				{
					"sha": "d0df403baeafe39a7a882fff399962acf6d4e7e6",
					"message": "Update-Configuration-reference.md",
					"author": {
						"name": "Powize",
						"email": "contact@powize.com"
					},
					"date": "Tue, 1 Sep 2015 17:50:55 +0200"
				},
				{
					"sha": "a6aa7b34dc290a183eafa1d244137ab38240366a",
					"message": "Merge-pull-request-643-from-marmelab-custom_types_doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 16:33:47 +0200"
				},
				{
					"sha": "e7487fb754df55c5d202e716c4ccacfc222fd2de",
					"message": "Merge-pull-request-644-from-marmelab-menu_template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 15:37:55 +0200"
				},
				{
					"sha": "d9afca75601c19a58a8e3e3e81b4d3fe7ff0a27c",
					"message": "Allow-the-main-menu-to-use-a-custom-template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 15:25:09 +0200"
				},
				{
					"sha": "aeac51ea48595b8e3cc446446e6be2f2bf8423fd",
					"message": "Better-explain-custom-types",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 15:19:24 +0200"
				},
				{
					"sha": "8d7b72a15be662d1ac2e2f0486116d1615151cff",
					"message": "Merge-pull-request-640-from-marmelab-local_grunt",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 13:07:34 +0200"
				},
				{
					"sha": "d168f41b0ebc5384ec1c802d3e8241a56d6c7583",
					"message": "Use-local-grunt-instead-of-global",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 11:19:39 +0200"
				},
				{
					"sha": "18d290ba395de4d90900833cf7740ad1a89a8251",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 10:56:34 +0200"
				},
				{
					"sha": "6b308aef8038e7751a4e0f20487556bee608ac1f",
					"message": "Merge-pull-request-639-from-marmelab-filter_default_value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 10:48:06 +0200"
				},
				{
					"sha": "bc7084d40dc1d005672a4d912f432bd40a2d0529",
					"message": "Introducing-filter-default-value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Sep 2015 10:28:23 +0200"
				},
				{
					"sha": "0ad9b5fd4c5877364afd52acb029a9c0c74e6e24",
					"message": "Merge-pull-request-629-from-marmelab-boolean-choice",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 31 Aug 2015 17:42:43 +0200"
				},
				{
					"sha": "dc2aae54aad67be2545fad581209c291cd18f017",
					"message": "Fix-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 31 Aug 2015 11:08:28 +0200"
				},
				{
					"sha": "e2a48da39350c28071dae4396f13a85c2bb78a39",
					"message": "clarify-contribution-process",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 14:53:50 +0200"
				},
				{
					"sha": "98e3261e1de743ae05aad2a1f70877c00a6a1145",
					"message": "Merge-pull-request-630-from-Benew-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 14:41:20 +0200"
				},
				{
					"sha": "91b675dcb755c3ddd593e41f0d63395bbea0eaf1",
					"message": "Merge-pull-request-1-from-marmelab-master",
					"author": {
						"name": "Armel Larcier",
						"email": "armel.larcier@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 11:48:39 +0200"
				},
				{
					"sha": "27606e9ed8891f71c4cdab341d77ce0aa4c0bc8e",
					"message": "Fix-typo-in-template-definition",
					"author": {
						"name": "Armel Larcier",
						"email": "armel.larcier@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 11:43:36 +0200"
				},
				{
					"sha": "cd7aa5a2c182adc4a4908cd278997cf9134578b0",
					"message": "Add-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 00:28:55 +0200"
				},
				{
					"sha": "0f0693647f252783d7cb4b0ecd6f1ef00c333167",
					"message": "Make-the-boolean-type-handle-null-values",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Aug 2015 00:10:39 +0200"
				},
				{
					"sha": "5e3e581a1c62b3b68ddbc978e0fb449010daec91",
					"message": "Merge-pull-request-628-from-marmelab-reference_many_placeholder",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 27 Aug 2015 22:52:45 +0200"
				},
				{
					"sha": "bc87817921bc721ae502449b59e322fd6e310aa8",
					"message": "Allow-to-customize-multiple-choices-placeholder",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 27 Aug 2015 17:31:47 +0200"
				},
				{
					"sha": "668bf1030f3d24aa5b5e0301821592e2cac1c4cc",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Aug 2015 15:35:57 +0200"
				},
				{
					"sha": "6f9d99b67cf78a27ccd3774f1f054eea9c68b848",
					"message": "Merge-pull-request-621-from-marmelab-file_field_fix",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Aug 2015 15:21:48 +0200"
				},
				{
					"sha": "d3dcbb4e41837d48d8fdebb3b546309485476fb1",
					"message": "Bump-version-to-0.9.0-dev",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Aug 2015 15:23:15 +0200"
				},
				{
					"sha": "29b1407de51033e6f411a4cb4a29fb849cae9fd9",
					"message": "Remove-debug",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 26 Aug 2015 13:46:29 +0200"
				},
				{
					"sha": "891e53f1aea4582798865495f3eb7d0bf275d095",
					"message": "Preparing-0.8.0-release",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Aug 2015 14:11:32 +0200"
				},
				{
					"sha": "5e5026d4fbe4f35f44a6f96857d91c10bcc915ec",
					"message": "Add-mention-of-Entity.createMethod",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Aug 2015 10:46:34 +0200"
				},
				{
					"sha": "f6e6fe6bc82fae17560a1c3aa32354115461cfab",
					"message": "Fix-file-field",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 23:49:30 +0200"
				},
				{
					"sha": "abf03ef499f556aae5f618911d80d373e243e4a9",
					"message": "Merge-pull-request-620-from-marmelab-ci_sudo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 16:55:20 +0200"
				},
				{
					"sha": "8b352d525bbe8b6cb6eb24aa6b16aaea97fb1eb6",
					"message": "Test-new-Travis-CI-infrastructure",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 16:48:41 +0200"
				},
				{
					"sha": "8b9d1868e42828d45636fd6a2e939cbaee97cc8f",
					"message": "Clarify-custom-types-in-configuration",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 16:43:13 +0200"
				},
				{
					"sha": "eae12f2899712588e2bce58b05ddebaf7d21e5b6",
					"message": "Merge-pull-request-619-from-marmelab-sourcemaps",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 16:02:05 +0200"
				},
				{
					"sha": "bd7a00f6ecc62da95eede98ef4c69dd574dcc183",
					"message": "Accelerate-CI-build-even-further",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 15:50:40 +0200"
				},
				{
					"sha": "0d1faed05dde623630f363683e08e220c6f8c3fc",
					"message": "MAke-CI-build-faster",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 15:43:35 +0200"
				},
				{
					"sha": "1b2dbc721b653bcf716bcc066b06c760fe9198a9",
					"message": "Add-sourcemaps-to-the-build-process-to-ease-debugging",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 15:24:39 +0200"
				},
				{
					"sha": "f8a97258273acc73d71f2ffe9317063603c84bce",
					"message": "Fix-formatting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 12:22:48 +0200"
				},
				{
					"sha": "f1ba3b75ed645b3f44fa7c2c691926913cc43960",
					"message": "Merge-pull-request-618-from-marmelab-FAQ",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 12:18:55 +0200"
				},
				{
					"sha": "1b11f5c8cdf1e4c5a97ba596db295e20c3b890e5",
					"message": "Add-a-Frequently-Asked-Question-page",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 12:19:03 +0200"
				},
				{
					"sha": "ca9367d70f00c20d7144235406cffed29222c71a",
					"message": "Update-admin-config-version-and-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Aug 2015 12:08:42 +0200"
				},
				{
					"sha": "296d132bfcb5a91a42538a24c8b11146bec852ff",
					"message": "Merge-pull-request-613-from-Benew-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 17:58:14 +0200"
				},
				{
					"sha": "9fb02d9e88061b8e8b709041729c1be4666fcaba",
					"message": "Merge-pull-request-612-from-marmelab-deselect",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 17:56:51 +0200"
				},
				{
					"sha": "bf58345a65502a9cff987c27a7b67137bb143db2",
					"message": "Update-README.md",
					"author": {
						"name": "Armel Larcier",
						"email": "armel.larcier@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 17:55:17 +0200"
				},
				{
					"sha": "b1071d44220b75d8f03e81f2d586259d12457267",
					"message": "Allow-deselection-to-send-null-value-in-choice-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 17:45:54 +0200"
				},
				{
					"sha": "bfa6cb01d90d56e79767c582f97c4625f97ff82d",
					"message": "Merge-pull-request-611-from-marmelab-choice_placeholder",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 16:47:35 +0200"
				},
				{
					"sha": "07be0e0b471a3c03cd593ba5d9f32bd92a927460",
					"message": "Allow-placeholder-to-be-overridden-on-choice-fields",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 16:34:57 +0200"
				},
				{
					"sha": "810c5628cc51e5f333f3410958c4fdc7c36a689f",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 16:20:13 +0200"
				},
				{
					"sha": "bda5edf10e4338763b4e76475dc22636a71ffb4c",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Aug 2015 08:40:57 +0200"
				},
				{
					"sha": "093d7eef3f1e78ff3b6440824b894187c31efdcb",
					"message": "Fix-changelog-line-endings",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 23:53:55 +0200"
				},
				{
					"sha": "bbdf30eea2e3a6540f2ec8825f1de5a907a89312",
					"message": "Update-changelog-for-0.8",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 23:50:10 +0200"
				},
				{
					"sha": "f42983ed2172f06ca4b4c469ab372d39e82f30fb",
					"message": "Merge-pull-request-607-from-marmelab-improve_doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 23:46:33 +0200"
				},
				{
					"sha": "b0b7d983f6de75ab62b59fd0cc2e21374638f86e",
					"message": "Crop-images-with-too-much-white",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 23:47:17 +0200"
				},
				{
					"sha": "4b684adda3b7dd8a954db10aac0d0f05c2458588",
					"message": "Add-complete-source-at-the-end",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 23:44:45 +0200"
				},
				{
					"sha": "e141a67ee07e3f0033b0f017504ea0c8af98a1ed",
					"message": "Add-images-to-Getting-Started",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 23:39:47 +0200"
				},
				{
					"sha": "95c813a8811ca3a4096504330e8d318ab49a3660",
					"message": "Fix-typos",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 22:58:30 +0200"
				},
				{
					"sha": "1f8bdc45bd4001ef37409d7b18cc4ed41917d6b7",
					"message": "Enrich-getting-started-tutorial",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 22:26:59 +0200"
				},
				{
					"sha": "4f20fb955f2e11641c20b1a7e477d5d9d4551f11",
					"message": "Add-more-chapters-to-the-Getting-Started-tutorial",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 00:09:26 +0200"
				},
				{
					"sha": "ec568680be556aa5fbc1dbbe0fc3b4200a1ded4f",
					"message": "Fix-typos",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 22 Aug 2015 23:28:00 +0200"
				},
				{
					"sha": "6d053dc10bc470bd5debb9d4ea5e1a14548a892f",
					"message": "improve-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 22 Aug 2015 00:37:52 +0200"
				},
				{
					"sha": "316fcf60207edfee4f88cb2a928af812a0d5b10a",
					"message": "Merge-pull-request-606-from-marmelab-wq",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 22:29:51 +0200"
				},
				{
					"sha": "6f47faac100837760c2ff0a6ac70e6fa7d661fa0",
					"message": "Add-support-for-pattern-validation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 22:27:35 +0200"
				},
				{
					"sha": "76dbdbe40fa8e036c873030e90211ced609776ed",
					"message": "Merge-pull-request-605-from-marmelab-detail_link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 16:36:06 +0200"
				},
				{
					"sha": "4d14c7df28af09ec504e104d6a46b451c0b94a74",
					"message": "Clarify-and-fix-the-detailLink-logic",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 15:51:36 +0200"
				},
				{
					"sha": "6a5eb30eab12dd65fdb6698c2543490869b183a6",
					"message": "Merge-pull-request-604-from-marmelab-debounce_filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 00:37:54 +0200"
				},
				{
					"sha": "a10a843931b367ca54c70dc8ef03a76a5a3f30ac",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Aug 2015 00:30:38 +0200"
				},
				{
					"sha": "f48d61bffcbc65686fa75c081228e019fd83a0c7",
					"message": "Add-debounce-to-the-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 22 Aug 2015 23:29:00 +0200"
				},
				{
					"sha": "eb30bc1cf00ec1fe6b9fd1405d030fc16b2e6e03",
					"message": "Merge-pull-request-593-from-marmelab-custom_attributes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 6 Aug 2015 18:45:55 +0200"
				},
				{
					"sha": "c941da457f0811da1623a4d345a51512ab80b169",
					"message": "karma-cleanup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 6 Aug 2015 18:43:17 +0200"
				},
				{
					"sha": "83fdf561643cc99ad6f56218e22b2459fae77545",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 6 Aug 2015 18:38:26 +0200"
				},
				{
					"sha": "4d75d27fbc62023a7778957ec24a517d9f259804",
					"message": "Fix-custom-attributes-on-fields",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 6 Aug 2015 18:02:27 +0200"
				},
				{
					"sha": "21aaaec88cce712794ae48336ce24f9c8b8f6c5b",
					"message": "Remove-useless-build-step-and-traceur-dependency",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 6 Aug 2015 18:23:13 +0200"
				},
				{
					"sha": "80f289e9270a3d6770f512fcaf3df524393c4869",
					"message": "Merge-pull-request-592-from-marmelab-search_query",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 23:28:20 +0200"
				},
				{
					"sha": "f065dd2e01ed9fe7884cbea1ec78ea6103a34aa8",
					"message": "Update-remoteComplete-API-for-better-configurability",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 23:06:41 +0200"
				},
				{
					"sha": "d8521366f103e467dea2aa9dee91a1d55e43635e",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 17:41:26 +0200"
				},
				{
					"sha": "33c78242537ed9e40761152b442d04a84f750245",
					"message": "Merge-pull-request-590-from-marmelab-duble_reference",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 17:38:22 +0200"
				},
				{
					"sha": "1a250bfc5b38168b614f85f4462a8033f0b4accf",
					"message": "Fix-problem-with-multiple-references-on-same-entity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 17:28:00 +0200"
				},
				{
					"sha": "693f7127c4f87af7832dbcaebd68be2fdfe80148",
					"message": "Merge-pull-request-589-from-marmelab-reference_order",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 16:57:59 +0200"
				},
				{
					"sha": "8bea3133377af8f5b77ab5285b39ebb1ddafe5d9",
					"message": "Fix-reference-list-order",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 16:49:39 +0200"
				},
				{
					"sha": "c8635c20ecec676d0b2482142c9eae96472365b3",
					"message": "Merge-pull-request-588-from-marmelab-permanent_filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 15:49:16 +0200"
				},
				{
					"sha": "fd7f7b5e26b7b51424f005147fbbc42b3385b890",
					"message": "You-can-also-install-with-npm",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 15:33:41 +0200"
				},
				{
					"sha": "92651f22fc6aea6df7c517c03516585e0a15a095",
					"message": "Remove-useless-prod-dependencies",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 15:24:59 +0200"
				},
				{
					"sha": "74ce69744635cc987417575b04c4a529919542eb",
					"message": "bump-version-to-0.8.0-dev",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 15:16:55 +0200"
				},
				{
					"sha": "6038c23a51776435b4bb395dba4cc1087744ba89",
					"message": "Add-permanent-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 15:10:15 +0200"
				},
				{
					"sha": "86b526046e56dd6234ce919eb7bb8d1f65cf4c3f",
					"message": "Merge-pull-request-587-from-marmelab-no_more_bower",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 14:09:21 +0200"
				},
				{
					"sha": "f3d5541dbc917f691b565106d58f5024cd5fcb55",
					"message": ".but-we-need-grunt",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 11:36:07 +0200"
				},
				{
					"sha": "c4233865fc6bd67027032c763e4f3bcad5f6ad3f",
					"message": "really-we-don-t-need-no-bower",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:56:04 +0200"
				},
				{
					"sha": "f6e041ca3f350992aee75cd397513f94d632c66c",
					"message": "Bower-is-no-longer-necessary-to-the-build",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:42:53 +0200"
				},
				{
					"sha": "641c903abe206b0c288a8c2db06731fd95b95109",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:38:54 +0200"
				},
				{
					"sha": "c626c560aa1ace16860517a0b0d2e34e6b516d2c",
					"message": "Bump-admin-config-dependency",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:35:15 +0200"
				},
				{
					"sha": "794e9e2a067f3f0632b7495077d253e97a2bcf1b",
					"message": "update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:20:35 +0200"
				},
				{
					"sha": "8b9b5c396f3acdb6b966ea77832f9c1ecfe17ddc",
					"message": "Merge-pull-request-586-from-marmelab-fix_infinite_pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:16:48 +0200"
				},
				{
					"sha": "f54f31fe0bbb8cb5274e5d0a256c7780503e403b",
					"message": "Fix-typo-in-infinite-pagination-controller",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 10:17:08 +0200"
				},
				{
					"sha": "5716bf0964b75d26e084ab92aeae53e3b7c05dfd",
					"message": "Fix-karma-webpack-dependency-breaks-build",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 5 Aug 2015 00:08:23 +0200"
				},
				{
					"sha": "3befbae60d75708d16397dd6ec0cc5cab4ee3e89",
					"message": "Fix-vendor-issue",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 4 Aug 2015 23:44:59 +0200"
				},
				{
					"sha": "f8ee3fb77700e2cde3d691f11a3b52ac01c7b0a8",
					"message": "Merge-pull-request-577-from-marmelab-number_export",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 4 Aug 2015 22:31:45 +0200"
				},
				{
					"sha": "cd0e0b5d334283e779246988aa35d36d72e05c6f",
					"message": "Merge-pull-request-575-from-marmelab-fat_arrow_field_view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 4 Aug 2015 22:30:23 +0200"
				},
				{
					"sha": "edfa3e7952136028f90d797e322b03f3bdf24f38",
					"message": "format-number-for-export",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 30 Jul 2015 13:47:13 +0200"
				},
				{
					"sha": "fb0418ae5efe4ae0775bb53083a38399e87462fa",
					"message": "harmonize-fireldview-syntax-using-fat-arrows",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 28 Jul 2015 23:41:31 +0200"
				},
				{
					"sha": "fff704493eece3a4f3bfc76a221caffd82b6e0ce",
					"message": "Rebuild",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 24 Jul 2015 15:52:38 +0200"
				},
				{
					"sha": "5fb803602e4a83b9401d1c19efbb64c398412e8d",
					"message": "Merge-pull-request-538-from-vasiakorobkin-delete_back_to_prev",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 24 Jul 2015 15:50:55 +0200"
				},
				{
					"sha": "0becc8c27d452f84bf1ae294a4b37fd479bf61d3",
					"message": "Merge-pull-request-560-from-vasiakorobkin-go_to_detail_state_params_override",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 24 Jul 2015 15:28:39 +0200"
				},
				{
					"sha": "f6cdd0ecaca07274352e9140299f11e3ec944aba",
					"message": "Rebuild",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 24 Jul 2015 14:42:51 +0200"
				},
				{
					"sha": "f1859429270723fd3ddb16ac51f32998c58acbaa",
					"message": "Fixes-from-jpetitcolas-s-comments",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@mail.ru"
					},
					"date": "Thu, 2 Jul 2015 13:10:14 +0300"
				},
				{
					"sha": "ba10f2afac6dc5209b3af89272f6fb5d681a8e78",
					"message": "Fixes-from-fzaninotto-s-comment-adjusted-failing-e2e-test",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@mail.ru"
					},
					"date": "Wed, 1 Jul 2015 23:47:22 +0300"
				},
				{
					"sha": "9acf6165d5c11539d75c4c15093f033c5a201967",
					"message": "Delete-view-back-to-previous-state-not-edit-or-list-view",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@mail.ru"
					},
					"date": "Tue, 30 Jun 2015 11:23:44 +0300"
				},
				{
					"sha": "3fefac8157c5d4ce4afa3363b2a26d9e3a19e923",
					"message": "Bug-fix-go_to_detail_state_params_override",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@mail.ru"
					},
					"date": "Fri, 24 Jul 2015 11:34:26 +0300"
				},
				{
					"sha": "e891f63657c2ed86ecb9f077083e2beed4d64673",
					"message": "Added-e2e-test-to-demonstrate-a-problem",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@mail.ru"
					},
					"date": "Fri, 24 Jul 2015 11:33:25 +0300"
				},
				{
					"sha": "265642a33b03bd7eb425efed24722202318b30a0",
					"message": "Merge-pull-request-568-from-marmelab-many_field_bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 24 Jul 2015 09:56:19 +0200"
				},
				{
					"sha": "396295c7b2cc522b84e422ac920315b69b87ff98",
					"message": "Code-review",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 24 Jul 2015 09:30:05 +0200"
				},
				{
					"sha": "172df398093e10910c1ef75a8ee69dd1bd7d90d4",
					"message": "Fix-reference_many-field-when-value-is",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 23 Jul 2015 13:07:25 +0200"
				},
				{
					"sha": "de7ed47faf65e98be2ee56c1b7fab33532d393ab",
					"message": "Merge-pull-request-566-from-marmelab-remove_duplicate_multiple_only",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 23 Jul 2015 18:33:57 +0200"
				},
				{
					"sha": "cc7496d2b85947e60bdb2ed21db7ef431f09b1ce",
					"message": "Do-not-deduplicate-single-choice-remote-complete-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 22 Jul 2015 16:41:29 +0200"
				},
				{
					"sha": "428c22cb4cb35acee1798a7f923a0ef329e5daf3",
					"message": "Merge-pull-request-570-from-marmelab-fix_tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 23 Jul 2015 14:51:56 +0200"
				},
				{
					"sha": "24922d9ac2e8abac3a8f68a76cf5612f7afc29a8",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 23 Jul 2015 14:35:10 +0200"
				},
				{
					"sha": "58919a556bb6b52cdb2b898eddb0afb32473a9c0",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 23 Jul 2015 14:16:49 +0200"
				},
				{
					"sha": "d2653978f86f5e403d3fc8da8a4763b2a1950494",
					"message": "Merge-pull-request-565-from-marmelab-webpack_be_quiet",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 23 Jul 2015 09:45:03 +0200"
				},
				{
					"sha": "e808fc8bbbe682dbd568d6ae5e6c394e9d54ce6f",
					"message": "Webpack-be-more-quiet-please",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 22 Jul 2015 16:01:07 +0200"
				},
				{
					"sha": "90d71c49a2bc00ff354932c210db82375dec6f49",
					"message": "Fix-wrong-configuration-in-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 19 Jul 2015 15:13:03 +0200"
				},
				{
					"sha": "737964c30ec31ace3e5d3dd78cb3198f3fecc35a",
					"message": "Merge-pull-request-556-from-marmelab-fix_menu_collapse",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 13 Jul 2015 17:59:05 +0200"
				},
				{
					"sha": "54f50e8e9b647966014dec3ec91bc6282cc57b65",
					"message": "Document-the-new-method-override",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 13 Jul 2015 16:28:02 +0200"
				},
				{
					"sha": "41457aa7e99229c94a894fd410415774f925797f",
					"message": "Fix-menu-collapse-on-second-click",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 13 Jul 2015 15:06:36 +0200"
				},
				{
					"sha": "a8d6c8ba0e1deba012b64e42633814688f8e8b3b",
					"message": "Mention-CORS-woes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 13 Jul 2015 11:36:14 +0200"
				},
				{
					"sha": "16b9d8efcf54f7783d42ac5391fdf0ff626e7e27",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 10 Jul 2015 12:01:56 +0200"
				},
				{
					"sha": "d404831d3d68ce2702977f27b115c652c27469ac",
					"message": "Merge-pull-request-549-from-marmelab-map_transform",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 10 Jul 2015 09:37:41 +0200"
				},
				{
					"sha": "e1dacb1a0bf6d41d002981b4d6ca1b5c53166db6",
					"message": "Bump-to-new-fixed-admin-config-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 14:21:39 +0200"
				},
				{
					"sha": "f2e87b99724bc083acf043dc37ee82449fab617f",
					"message": "Merge-pull-request-554-from-marmelab-spaced_actions",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 13:49:29 +0200"
				},
				{
					"sha": "d301650d1fbf6709785fd957528c91305adb5cdc",
					"message": "No-need-to-define-the-label-anymore",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 11:01:14 +0200"
				},
				{
					"sha": "7461a649b2356473232cd274d7fa0060a4eb095d",
					"message": "Improve-Edition-test-to-actually-save-a-modification",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 10:47:43 +0200"
				},
				{
					"sha": "7e3f9e1d487794aea3c5eed9d712ac67b30464a3",
					"message": "Add-doc-about-the-new-deeply-nested-capabilities",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 10:47:06 +0200"
				},
				{
					"sha": "5c6825c07f9c802ace665214f8596a780ec8196b",
					"message": "Disable-grunt-server-logging",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 10:18:55 +0200"
				},
				{
					"sha": "987d7047c83aa1c7d6fafb48b6dfd036dbbf8d7a",
					"message": "bump-json-server-to-get-q-filtering-on-nested-vales",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 09:59:22 +0200"
				},
				{
					"sha": "01fb978fba7c895fec94419c84ea79aa949caaf1",
					"message": "mention-the-change-in-map-behavior",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 08:52:53 +0200"
				},
				{
					"sha": "d3f2d4dc6caa19b2bacaa0301aae68fcd5b4b876",
					"message": "Add-e2e-test-for-nested-inputs-display-in-edit-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 00:34:52 +0200"
				},
				{
					"sha": "95c362bb8f5f4fdfcd07061cf1b92388d99e27eb",
					"message": "Fix-missing-license-in-package.json",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 00:03:51 +0200"
				},
				{
					"sha": "7fea3624dd1b74574d62a4037687cd73d237fe82",
					"message": "Update-ListViewSpec-to-use-new-syntax",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 23:56:27 +0200"
				},
				{
					"sha": "ad0241c3aeb04a6ae17926187d2840bcd637e033",
					"message": "Remove-call-from-datastore.mapEntries-in-the-dashboard",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 23:52:36 +0200"
				},
				{
					"sha": "8d7f7338ffe77d0d1c026ac53c268f630fe87cf8",
					"message": "Remove-call-from-dataStore.mapEntries-in-infinite-pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 23:47:12 +0200"
				},
				{
					"sha": "d4f6c420244b56c52f637f12d842e29e2f016939",
					"message": "Use-new-RestMapper-in-export-to-CSV-button",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 23:35:34 +0200"
				},
				{
					"sha": "8ade32e23cb28f35881111ef04b5ce174564cb4d",
					"message": "Fix-wrong-calls-to-reference-populator",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 23:35:10 +0200"
				},
				{
					"sha": "bd13dc65b441c94976eea239902074e2fc38cc10",
					"message": "Handle-creation-of-nested-properties",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 23:13:56 +0200"
				},
				{
					"sha": "53c14fcb7d34295507c3194158ad3ee29ed65f69",
					"message": "Add-space-between-view-action-buttons",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 21:49:30 +0200"
				},
				{
					"sha": "cb6786d0bd33b20aca6aa3ea24a33c72e86fd059",
					"message": "Update-admin-config-dependency-to-updated-package",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Jul 2015 18:20:59 +0200"
				},
				{
					"sha": "ea57757ded294e367a39ef0236b41fb4a32ab79b",
					"message": "Use-Entry-mapping-capacities-from-Entry-not-DataStore",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 7 Jul 2015 09:45:45 +0200"
				},
				{
					"sha": "1510029765143feb11b452aa81d7a0d4e24215c8",
					"message": "Add-nested-entries",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 3 Jul 2015 19:16:42 +0200"
				},
				{
					"sha": "804e1f21b72a6a1db9177bac332ac4a90b45e790",
					"message": "Add-transform-to-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Jun 2015 00:17:33 +0200"
				},
				{
					"sha": "b6749a69f498db801e9e12268cfd3a1cd5ebc316",
					"message": "Prepare-move-of-mapEntry-from-datastore-to-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 27 Jun 2015 22:38:08 +0200"
				},
				{
					"sha": "5e16a3c30ec5ce6f913a1dd7d393d2397a30fbd3",
					"message": "Rebuild",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 2 Jul 2015 10:35:03 +0200"
				},
				{
					"sha": "a05cdd1475752c817671d6f0eb8f267b816d41ef",
					"message": "Merge-pull-request-522-from-marmelab-filter_ui",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 30 Jun 2015 15:30:37 +0200"
				},
				{
					"sha": "26fbd2589a1a82fccb39927f1db05b92a19e73e3",
					"message": "Added-link-to-support",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 30 Jun 2015 09:29:48 +0200"
				},
				{
					"sha": "9910554a88c30c6d316a21202a6000181c956c7a",
					"message": "Use-ES6-compliant-syntax",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 29 Jun 2015 21:53:32 +0200"
				},
				{
					"sha": "5e9521953b758993d3e05229b977744398deae44",
					"message": "Make-e2e-test-more-ribust-by-forcing-asynchronous-testing",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Jun 2015 23:02:46 +0200"
				},
				{
					"sha": "19b50084c27ccbf6babe40b907210e46052415e4",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 10:33:33 +0200"
				},
				{
					"sha": "608a06f731392ac6db5e6777df5307802152c411",
					"message": "Introducing-pinned-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Jun 2015 18:39:51 +0200"
				},
				{
					"sha": "e8ab4dd3de5b069934fb905533700426832c7927",
					"message": "Fix-adding-the-same-filter-twice-keeps-the-filter-value",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Jun 2015 17:53:47 +0200"
				},
				{
					"sha": "58e422b554eaa02a3698e456deffac874c417e44",
					"message": "Fix-selection-and-batch-actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Jun 2015 13:08:22 +0200"
				},
				{
					"sha": "d5be0052eb651ff118a532d9b0d5dc3b67ed9672",
					"message": "Split-list-view-into-listLayout-and-grid-to-prevent-filter-focus-loss",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 22 Jun 2015 21:12:08 +0200"
				},
				{
					"sha": "a5cbeed77c174a18aad0a8977544a43206985a10",
					"message": "Make-filter-form-update-in-real-time",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 22 Jun 2015 15:12:27 +0200"
				},
				{
					"sha": "21f3e8f9dac11dc1d64ef18f78a324dc33ea13cd",
					"message": "Move-maViewBatchActions-directive-to-button-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 21 Jun 2015 21:11:32 +0200"
				},
				{
					"sha": "2d13d2d9a7c7b7f6c791fdde3787f9a8c55864d3",
					"message": "Merge-pull-request-508-from-marmelab-ui_select_queries",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Jun 2015 23:12:13 +0200"
				},
				{
					"sha": "ac00db7beee8904f67c0b9c6166ea60b8bec3ed8",
					"message": "Update-admin-config",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 14:28:24 +0200"
				},
				{
					"sha": "ae14c3187904e2f4034397432a4f5dcf9b215a12",
					"message": "Fix-last-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 10:25:44 +0200"
				},
				{
					"sha": "9c95ec51bfa3ee90e6367b6cb9cfd6a1b13953a4",
					"message": "Rename-autocomplete-to-remoteComplete",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 09:53:02 +0200"
				},
				{
					"sha": "b312057d050daf4ea1e6c85bfd54e6ba535f805a",
					"message": "Update-ui-select-version",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 17:12:34 +0200"
				},
				{
					"sha": "c895200db35261de263e066381d073ce9cb91b09",
					"message": "Use-autocompleteOptions-instead-of-refreshDelay-option",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 16:11:53 +0200"
				},
				{
					"sha": "a1578ebb93ef692a81e9b0c9f76cbfb6c1c77460",
					"message": "Update-reference-many-field-with-Refresher-getInitialChoices-method",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 12:00:05 +0200"
				},
				{
					"sha": "be7832e9bf10152d564e3fb284399a49217a84eb",
					"message": "Add-more-unit-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 10:42:30 +0200"
				},
				{
					"sha": "6133a65f3c7c70db3513640fc3245ef756f463dd",
					"message": "Start-optimizing-requests-for-autocomplete",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 24 Jun 2015 18:11:28 +0200"
				},
				{
					"sha": "2a74e74e9b8395ddd21393a51f12c49d0ff2dda8",
					"message": "Merge-pull-request-528-from-marmelab-date_filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 24 Jun 2015 16:08:18 +0200"
				},
				{
					"sha": "59e7d250e8544b97f1f123c1095e6480e8a13b33",
					"message": "Fix-default-date-format-in-date-field",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 24 Jun 2015 15:14:00 +0200"
				},
				{
					"sha": "145019a5168c60e4fcf8f8a22f4b9b9300957a82",
					"message": "Rebuilding-files",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 23 Jun 2015 17:17:50 +0200"
				},
				{
					"sha": "1f16774bb8184e9f442fe19ba8e74852ec2b8e88",
					"message": "Update-configuration",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 23 Jun 2015 09:40:28 +0200"
				},
				{
					"sha": "3e2dcad84a53869a14468999c0f19712d3d3f78f",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 23 Jun 2015 09:35:43 +0200"
				},
				{
					"sha": "797be96be9c0e9539b5c130b285c43c6d78e2978",
					"message": "Fix-last-unit-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 22 Jun 2015 18:13:47 +0200"
				},
				{
					"sha": "1d3feec4a0481650a14ec07ff988e8b47f18800b",
					"message": "Create-ReferenceRefresher-service",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 22 Jun 2015 17:23:55 +0200"
				},
				{
					"sha": "f0aa34047955f58d2b0a87dc5c1f30b73e0e1b01",
					"message": "Base-Reference-Many-fields-on-Choice-s-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 22 Jun 2015 10:50:57 +0200"
				},
				{
					"sha": "f4e695db9ea800d10d0306424b9befaa145c0176",
					"message": "Fix-dependencies",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 18:14:23 +0200"
				},
				{
					"sha": "4f01bb1c7adcd4ba1188ddd7a50faa256ff34acb",
					"message": "Apply-map-functions-on-reference-labels",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 15:01:35 +0200"
				},
				{
					"sha": "8295a3b689516619964b296d202e865b18786d49",
					"message": "Allow-to-embed-all-references-in-select-list-without-API-requests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 18 Jun 2015 17:12:57 +0200"
				},
				{
					"sha": "68ffb96dd29ab9422c9b85881fb068e59679820d",
					"message": "Fix-various-issues-on-reference-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 18 Jun 2015 16:21:48 +0200"
				},
				{
					"sha": "1d30f8db08995166c04d9722b1cad784c6aef4b0",
					"message": "Update-documentation",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 15:30:11 +0200"
				},
				{
					"sha": "118c1a0b3fdf9494b4017c727fd82b62ae3f7c1f",
					"message": "Add-more-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 14:45:51 +0200"
				},
				{
					"sha": "092d62f5623e9399a7e3b426173ab730e167fca0",
					"message": "Add-remote-API-call-to-reference-many-field",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 18:31:57 +0200"
				},
				{
					"sha": "d7bf2a5fa9efa0cca946ca1077e9d729e250f927",
					"message": "Implement-last-tests-on-reference-field",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 15:53:28 +0200"
				},
				{
					"sha": "d91da772d439bc1d08c3caa1fcf57e7b0e609c65",
					"message": "Add-ReferenceFieldView-test",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 14:46:45 +0200"
				},
				{
					"sha": "d9942ae48f5e755f93bd153e6c7a87620d9adace",
					"message": "Send-API-request-on-reference-auto-complete",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 15 Jun 2015 12:14:48 +0200"
				},
				{
					"sha": "e4b33a53f16fc90cd6b522d060685c7ba9bd279a",
					"message": "Merge-pull-request-509-from-marmelab-new_dashboard",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 18:14:54 +0200"
				},
				{
					"sha": "a4187de0cd7c54363cc6225f72fe9093b8a8b4c8",
					"message": "Fix-dashboard-panel-title-when-dashboard-is-undefined",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 18:00:04 +0200"
				},
				{
					"sha": "c9b84c8b7d7ab637d1a42c3b966475afe980fdad",
					"message": "Code-review",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 17:43:08 +0200"
				},
				{
					"sha": "204b5da5188c4975cd3593071f038328bb99556c",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 17:39:39 +0200"
				},
				{
					"sha": "b587c08e824c51a84d19ddd724b4e2baa3e298f1",
					"message": "Merge-pull-request-519-from-marmelab-ie11_shim",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 10:52:54 +0200"
				},
				{
					"sha": "b256ce2f400fe4ab0624ee535dec7e1ce4d1ecc2",
					"message": "Add-promise-shim-for-some-browsers-IE11-I-m-watching-you",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Jun 2015 10:23:28 +0200"
				},
				{
					"sha": "45e421f9f843623d5a626890d6163ee05ed41831",
					"message": "push-admin-config-version-requirement",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Jun 2015 15:36:55 +0200"
				},
				{
					"sha": "5639bd6716eb991a4bc49630ca080a6813ae9ba6",
					"message": "Merge-pull-request-516-from-marmelab-jpetitcolas-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Jun 2015 15:27:59 +0200"
				},
				{
					"sha": "09cfad6f926947f982caa6e596a7b88b05578560",
					"message": "Simplify-dashboard-configuration",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Jun 2015 14:08:34 +0200"
				},
				{
					"sha": "733a3ee1e19c98f8900ee40a18233f843081e2e9",
					"message": "move-PanelBuilder-logic-to-routing",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 21:47:41 +0200"
				},
				{
					"sha": "795627df7fa203498efb265017aae49c68e1efaa",
					"message": "Simplify-panel-markup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 19:22:09 +0200"
				},
				{
					"sha": "1289081f31e3ddad786d1af4ba36628eeeac0a9d",
					"message": "Update-build-to-fix-issues-on-MacOS-fixes-515",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 16:23:32 +0200"
				},
				{
					"sha": "c145cb5b9d5118055b00fc2467acc1cb143432b4",
					"message": "deprecate-dashboardView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 08:51:22 +0200"
				},
				{
					"sha": "5356efc038cbbf23331a3f775a1439eb3444d2fe",
					"message": "Add-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Jun 2015 08:45:36 +0200"
				},
				{
					"sha": "f38b0acded307d8493b5db8081a599bdad3053e2",
					"message": "Merge-pull-request-511-from-marmelab-set_default_date_format",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 21:14:41 +0200"
				},
				{
					"sha": "4d51ad184e80abdad7233cc204723fe1efac7bbc",
					"message": "Set-default-format-in-date-fields",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 17:55:25 +0200"
				},
				{
					"sha": "92b860798648e7b425b70e210fd4aa429eafbdf9",
					"message": "Introduce-new-way-to-define-dashboard-datasources",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Jun 2015 23:29:09 +0200"
				},
				{
					"sha": "724fd3bb45b701ae471f47c53a14fa1329d41efd",
					"message": "Merge-pull-request-507-from-kkirsche-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Jun 2015 11:16:19 +0200"
				},
				{
					"sha": "43c650d1a16a70446f09132cc0f358b236cf8e02",
					"message": "Merge-pull-request-505-from-marmelab-select2",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Jun 2015 09:24:35 +0200"
				},
				{
					"sha": "670933cca02ae6c4e94deeeb6d36f832de81ea7d",
					"message": "Fix-multiple-required-field",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 12 Jun 2015 15:33:27 +0200"
				},
				{
					"sha": "c491ab9ec3588c15417d6ac109f6c96e701c0e1a",
					"message": "Fix-logical-issue-in-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 12 Jun 2015 11:46:26 +0200"
				},
				{
					"sha": "8a1c271333c84f55e2ffc38fd187b4b8bbe14d5f",
					"message": "Fix-last-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 12 Jun 2015 11:35:52 +0200"
				},
				{
					"sha": "b43de23dd9b5ff86a3251cd20713a5bed1efaa8a",
					"message": "Add-flag-to-run-Karma-in-not-singleMode",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 12 Jun 2015 11:06:49 +0200"
				},
				{
					"sha": "ec3a4ec0f35c61374ab47a1e66e0688980c0ae33",
					"message": "Remove-moot-version-property-from-bower.json",
					"author": {
						"name": "Kevin Kirsche",
						"email": "Kev.Kirsche+GitHub@gmail.com"
					},
					"date": "Thu, 11 Jun 2015 22:39:58 -0400"
				},
				{
					"sha": "32990bc0441d7658e1e696bfb6add15b08fac464",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 11 Jun 2015 14:39:33 +0200"
				},
				{
					"sha": "d06fc655a52cf331d4152ac9716c13d1b3979efe",
					"message": "Fix-Choices-directive-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 11 Jun 2015 14:28:57 +0200"
				},
				{
					"sha": "cf3564456d3eea6754acaaaff01b18e36cf29992",
					"message": "Review-Choice-field-directive-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 11 Jun 2015 14:03:34 +0200"
				},
				{
					"sha": "950e5a3df81e71f4f41fc7bdde630deedc33b1fa",
					"message": "Use-ui-select-for-Choice-and-Choices-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 10 Jun 2015 15:36:23 +0200"
				},
				{
					"sha": "388cfc668f67f15e334cb4b028c22b9fdaf9d02e",
					"message": "Update-built-files-with-latest-dependencies-versions",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 11 Jun 2015 11:41:31 +0200"
				},
				{
					"sha": "f130f8eae56d197aef2e53c57c40d9dca1061226",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 10 Jun 2015 11:16:52 +0200"
				},
				{
					"sha": "4dfe7f577abbc6fa4e60c63c2a787d512d9e70a0",
					"message": "Merge-pull-request-503-from-marmelab-fix_batch_delete",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 10 Jun 2015 11:13:28 +0200"
				},
				{
					"sha": "cd5b9af1f7b612808459649290c4ad709e6c6fd2",
					"message": "Fix-typo-in-example-custom-page-configuration",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 10 Jun 2015 11:04:38 +0200"
				},
				{
					"sha": "d7594da88cbfb77870abf694960aa0fa8ec7821c",
					"message": "add-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 9 Jun 2015 23:10:55 +0200"
				},
				{
					"sha": "9a7ec90d1bc88edc8e748a091bdd90c6d9f2fd00",
					"message": "fix-back-method-on-batchDeleteController",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 9 Jun 2015 17:15:48 +0200"
				},
				{
					"sha": "982f16eb7bf7fb056f0c4a7f97511865c8471f59",
					"message": "Update-admin-config-dependency-and-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 10 Jun 2015 10:49:21 +0200"
				},
				{
					"sha": "3cc43dbdd7e66ed2c103aef751ac2b938305aab6",
					"message": "Remove-quotmark-from-jshintrc",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 10 Jun 2015 10:47:32 +0200"
				},
				{
					"sha": "1e915c3a168789c40dd0a230e66b81a17e794999",
					"message": "Merge-pull-request-502-from-marmelab-new_field_export",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 9 Jun 2015 19:47:23 +0200"
				},
				{
					"sha": "91b71731e24bbd66b3f000d0d6071d38b19ee18d",
					"message": "Update-admin-config-dependency-and-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 9 Jun 2015 17:30:46 +0200"
				},
				{
					"sha": "34c66beea72a8b686a39af07bece50453b64b30f",
					"message": "add-new-field-in-entryFormatter",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 9 Jun 2015 16:50:42 +0200"
				},
				{
					"sha": "47ed9762a6299dd4862ff4516c7eaf0ea29fc836",
					"message": "Merge-pull-request-501-from-marmelab-fix_file_field",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 9 Jun 2015 16:49:52 +0200"
				},
				{
					"sha": "f35039d23a31b0995c7126ecd5a50fda95d9f086",
					"message": "Fix-maFileField-and-use-latest-version-of-ng-file-upload",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 9 Jun 2015 16:23:39 +0200"
				},
				{
					"sha": "15eb0a729f5fc43f1c3170a92cd89fdf90b8455b",
					"message": "Remove-extra-resolution-from-bower.json",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 9 Jun 2015 14:50:37 +0200"
				},
				{
					"sha": "79408d12320073ceeef544362fa7ea09614cb73d",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 9 Jun 2015 12:37:43 +0200"
				},
				{
					"sha": "392cf360518879f797f7490da04a97b5bc430046",
					"message": "Merge-pull-request-494-from-marmelab-bc_step_issue",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Jun 2015 16:42:32 +0200"
				},
				{
					"sha": "99608a91e2c614c310248ae77bed532fe1330e80",
					"message": "Fix-BC-issue-with-step-attribute",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 5 Jun 2015 10:24:41 +0200"
				},
				{
					"sha": "db27d140e4cf352a1d4d11333b386a76d72ad690",
					"message": "Merge-pull-request-487-from-marmelab-invite",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 4 Jun 2015 17:07:55 +0200"
				},
				{
					"sha": "36518a95c4a4989927b5f8407041fbbe7fdc8907",
					"message": "Add-link-to-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Jun 2015 11:24:50 +0200"
				},
				{
					"sha": "f989ea11a7984c173a0e1430e559c97752308617",
					"message": "Update-admin-config-dependency-and-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 4 Jun 2015 10:49:03 +0200"
				},
				{
					"sha": "722dc4ad21e88a690693400cd228488b74acc456",
					"message": "Merge-pull-request-491-from-matsluni-userDefinedHTTPMethods",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Jun 2015 10:25:50 +0200"
				},
				{
					"sha": "095ffcd50d97c90d53b69a4e4b25dd95cc281b21",
					"message": "added-userdefined-create-and-update-HTTP-Method",
					"author": {
						"name": "Matthias Lüneberg",
						"email": "mail@matthias-lueneberg.de"
					},
					"date": "Wed, 3 Jun 2015 22:20:44 +0700"
				},
				{
					"sha": "ee74a60f03bcedc3777b0ea57224c2874cb79047",
					"message": "Update-admin-config-dependency-and-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 3 Jun 2015 14:30:37 +0200"
				},
				{
					"sha": "c50889f9b8ef41e80a0ca1bf70dc89f3606b2d4b",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Jun 2015 12:28:16 +0200"
				},
				{
					"sha": "1ca24fdebea88badf79f4652e4056b5589f2ab71",
					"message": "Merge-pull-request-488-from-marmelab-fix_dashboard_references",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Jun 2015 12:21:52 +0200"
				},
				{
					"sha": "0dd441c100f6a4c9011bef76c54b1b0db9769cf2",
					"message": "Fix-PanelBuilder-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 2 Jun 2015 17:04:22 +0200"
				},
				{
					"sha": "23c24380368a04369104f693fca5df19d73a1d71",
					"message": "Fix-dashboard-not-retrieve-entity-references",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 2 Jun 2015 15:26:14 +0200"
				},
				{
					"sha": "220310f49fe5bf71a0b31e748af4d7f692af32b6",
					"message": "Merge-pull-request-489-from-marmelab-fix_gottodetail_remmeber_list_filter",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Jun 2015 11:59:19 +0200"
				},
				{
					"sha": "5c0b417363d3d59898362b0bb27428a5ffe71a3d",
					"message": "Fix-gotoDetail-should-remember-list-filter-and-replace-some-.path-by-.go",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 3 Jun 2015 11:45:11 +0200"
				},
				{
					"sha": "07d69f96e8d6504350884082675c7f6406c5cde5",
					"message": "fix-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 2 Jun 2015 15:51:35 +0200"
				},
				{
					"sha": "40461aaa941fbbbfa14c149e2608e539e7bcef8f",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 2 Jun 2015 10:51:25 +0200"
				},
				{
					"sha": "756e8af01bb724d54ef0f4f653f3e5900d78b7fd",
					"message": "Merge-pull-request-484-from-marmelab-fix_filter_false_boolean",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 2 Jun 2015 10:48:17 +0200"
				},
				{
					"sha": "79ffe53559e66699c3169c54cc9ca1f41927d581",
					"message": "fix-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 2 Jun 2015 10:30:21 +0200"
				},
				{
					"sha": "075ae2b8173c170b2d9de07ec5b4f8dbbcfd7b0f",
					"message": "Merge-pull-request-486-from-marmelab-fix_delete",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 2 Jun 2015 10:08:56 +0200"
				},
				{
					"sha": "52652349b1792613f1649e09db42046b73baca1c",
					"message": "Improve-first-contact-add-invite-after-setup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Jun 2015 08:26:33 +0200"
				},
				{
					"sha": "b93823d1d78bef1d6dedebe832cb36019b6d0d8b",
					"message": "Fix-delete-title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 22:42:40 +0200"
				},
				{
					"sha": "9bb6a5d4b8526e33c1336ad83759f237e92bc0c7",
					"message": "Merge-pull-request-426-from-marmelab-float_type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 21:04:47 +0200"
				},
				{
					"sha": "82cee63a2e8ffc2942249e72e2b4e943b6e323cc",
					"message": "Merge-pull-request-477-from-marmelab-build_optimizations",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 21:01:50 +0200"
				},
				{
					"sha": "b214ae7c5c35ba02f01d0e6acdac87681184850e",
					"message": "Optimize-build-process",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 29 May 2015 10:03:36 +0200"
				},
				{
					"sha": "cd215863f80d805d89af846f29c015693845471e",
					"message": "Revert-built-files",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 17:41:37 +0200"
				},
				{
					"sha": "1e136c38a2b8e20775a6c6bb1edb523e94a522da",
					"message": "Remove-file-already-in-admin-config",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 29 May 2015 10:00:03 +0200"
				},
				{
					"sha": "bc3c8b6d12c389761a2d0a5e66f40f29611b1136",
					"message": "Add-some-tests-on-Float-field",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 29 May 2015 09:39:42 +0200"
				},
				{
					"sha": "ae8f1a56bd05d0013f008b9531b8caf77ee63fe6",
					"message": "Introduce-float-type",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 11 May 2015 11:49:50 +0200"
				},
				{
					"sha": "7d517bf612e09159559b2d48763a79006e236338",
					"message": "accept-false-value-in-filter",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 1 Jun 2015 17:04:41 +0200"
				},
				{
					"sha": "790869dac01810ba53f90339d95649a76b59cc0f",
					"message": "Update-admin-config-dependency-and-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 15:52:11 +0200"
				},
				{
					"sha": "d8c34856a7b3e4ac7deb7b5ad436d5b0700406be",
					"message": "update-admin-config-and-rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 1 Jun 2015 11:29:38 +0200"
				},
				{
					"sha": "993269060954cff9abeda83c3043e7f21f315184",
					"message": "Merge-pull-request-482-from-marmelab-fix_sort",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 1 Jun 2015 11:15:57 +0200"
				},
				{
					"sha": "14ee18829254fabd2c56dbd58f70a444ebec09ce",
					"message": "Fix-e2e-tests-for-ShowView",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 10:38:51 +0200"
				},
				{
					"sha": "8ff3b7cab99443c86ea8d2582b100ec2e25b3693",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 10:33:59 +0200"
				},
				{
					"sha": "bf4a775ab9e2d4bddae0db29d909bcc6a53d7911",
					"message": "Merge-pull-request-480-from-marmelab-fix_pagination",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 10:29:29 +0200"
				},
				{
					"sha": "809c01e647ee672ae1aa28407dba1b032283b5da",
					"message": "Fix-sort-for-ReferenceListField-and-dashboard",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sat, 30 May 2015 01:19:24 +0200"
				},
				{
					"sha": "f3a975a03e0539e3d989b1db006f5b638e579508",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 1 Jun 2015 09:33:00 +0200"
				},
				{
					"sha": "a7cc56da34ed9f249df003128594124e9b2b632e",
					"message": "Merge-pull-request-483-from-marmelab-angular_1-3",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 1 Jun 2015 09:31:44 +0200"
				},
				{
					"sha": "12af1ea0435b171fcc44c615cd0e8d095c97ed43",
					"message": "Stay-on-Angularjs-1.3-version",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sat, 30 May 2015 23:17:36 +0200"
				},
				{
					"sha": "c5c61670a352de126ff0f5c7e9c43a93029412c2",
					"message": "fix-pagination",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 29 May 2015 17:12:08 +0200"
				},
				{
					"sha": "a87124a5391d111824e96521bd5c05965c904818",
					"message": "Fix-wrong-rebase-done-in-428",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 29 May 2015 16:25:35 +0200"
				},
				{
					"sha": "85f994b39d9eedde3bcb713e7fcc57b298baccca",
					"message": "Updte-admin-config-dependency",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 29 May 2015 12:29:02 +0200"
				},
				{
					"sha": "95eb46e9874dc586a8cb86f6facd4db73d3529de",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 28 May 2015 17:00:05 +0200"
				},
				{
					"sha": "c695c72091cee2ed07dccaea8eef774c339d5f5f",
					"message": "Merge-pull-request-471-from-marmelab-jpetitcolas-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 28 May 2015 10:47:02 +0200"
				},
				{
					"sha": "20e53ae823cd3d7b07eef581855ae98572cd2cda",
					"message": "Fix-outdated-method-name-in-doc",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 27 May 2015 19:16:28 +0200"
				},
				{
					"sha": "af440242d53ed1ff058c9dcb64afb01a5ad0e270",
					"message": "Merge-pull-request-468-from-marmelab-css_fixes",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 16:28:28 +0200"
				},
				{
					"sha": "417bc997e3f52f26fdec7fe465c64242567b2ee6",
					"message": "Fix-top-margin-regressions",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 26 May 2015 16:22:22 +0200"
				},
				{
					"sha": "8909542915184e86cdeb655e0593c19eb0dd08c4",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 12:20:06 +0200"
				},
				{
					"sha": "057302231f7e0b65046a7ba58932891270da9c30",
					"message": "Merge-pull-request-467-from-marmelab-fix_firefox_export_csv",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 26 May 2015 12:16:09 +0200"
				},
				{
					"sha": "5a7054438c5807a2eff8fa4c1d5150eb1643328b",
					"message": "Fix-export-CSV-in-firefox",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 12:11:11 +0200"
				},
				{
					"sha": "d4d7c65c75a6fb3029287158a2d7e70d7e0fad5b",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 11:37:11 +0200"
				},
				{
					"sha": "56a8016b6516606a0f44c15746e44ae0b1e0c589",
					"message": "Merge-pull-request-466-from-marmelab-lib_names",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 11:35:19 +0200"
				},
				{
					"sha": "1fce094fd1a27a18d1efe814e98771134cbb9cd6",
					"message": "Rename-lib-files-to-keep-BC",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 26 May 2015 11:23:25 +0200"
				},
				{
					"sha": "1bc14772faec14a94280c6699a8abc971d4d93f5",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 11:05:23 +0200"
				},
				{
					"sha": "54a09b9ca1b5f0a2b58734cbf229322df731a9b4",
					"message": "Merge-pull-request-461-from-marmelab-fix_export_to_csv_button",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 May 2015 10:51:21 +0200"
				},
				{
					"sha": "e04333128875a5e60703064a670304e305ee6ba0",
					"message": "Fix-maExportToCsvButton-does-not-return-entries-references-and-empty-data-when-filters-contains-boolean-field",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 22 May 2015 23:55:48 +0200"
				},
				{
					"sha": "d50933b5bb77b339d078f9598049d256a98e5ae0",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 22 May 2015 16:24:21 +0200"
				},
				{
					"sha": "89c5aa1b47d00db75fdcee47e507499a6a1b2ec3",
					"message": "Merge-pull-request-460-from-marmelab-bug_fixes",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 22 May 2015 16:16:00 +0200"
				},
				{
					"sha": "0c3676180479936daed38727db6cce91b12b8aea",
					"message": "Remove-debug-and-fix-typo",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 22 May 2015 16:02:05 +0200"
				},
				{
					"sha": "278c3d85642e2d17c2acfcf95c8995bc3c37082e",
					"message": "Fix-several-bugs",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 22 May 2015 15:36:52 +0200"
				},
				{
					"sha": "02fb6171f53c7eb9663690b332eb8949a5984da1",
					"message": "Merge-pull-request-457-from-marmelab-use_admin_config",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 22 May 2015 13:53:50 +0200"
				},
				{
					"sha": "b2dd40b75e3652a0451d6a328aedc5471a384739",
					"message": "Code-review",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 22 May 2015 12:05:34 +0200"
				},
				{
					"sha": "2fae95e60832689b3e61da62f9e5b936f7d9fff1",
					"message": "Update-es6-lib-path-in-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 22 May 2015 12:00:58 +0200"
				},
				{
					"sha": "1153a5b2940ed0723e0ca08eb96e41c13c11a86b",
					"message": "Use-admin-config-files",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 22 May 2015 11:46:40 +0200"
				},
				{
					"sha": "232395f6384c9b0dfd6c100a6c957709a13dd3b9",
					"message": "Merge-pull-request-456-from-marmelab-webpack_readme",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 22 May 2015 10:01:57 +0200"
				},
				{
					"sha": "d8f0cddef0ca58e0d44827108f690e9a33011955",
					"message": "Update-README-for-Webpack",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 22 May 2015 09:30:26 +0200"
				},
				{
					"sha": "93244dcd829502925c550a4756ba454eb741cd43",
					"message": "Merge-pull-request-428-from-marmelab-webpack",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 22 May 2015 09:11:49 +0200"
				},
				{
					"sha": "d9a29cd598ba31cd99896b3ea998000ef775f2ca",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 21 May 2015 18:24:49 +0200"
				},
				{
					"sha": "9e108eaf34a83fae718d107afb44856aaf0edd13",
					"message": "Rebuild-ng-admin-with-latest-version",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 21 May 2015 09:47:48 +0200"
				},
				{
					"sha": "8479566f3987fe0b3b20ba537cebf8f4c35d9472",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 21 May 2015 09:32:00 +0200"
				},
				{
					"sha": "90a9c2991a1d20b1c7639f45ecdbf588e4286e77",
					"message": "Fix-missing-dependencies",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 20 May 2015 10:22:39 +0200"
				},
				{
					"sha": "41baed3b233c1b6af92b997469219259c4f1eda7",
					"message": "Cleaning-up",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 19 May 2015 11:33:42 +0200"
				},
				{
					"sha": "3c6db30cc2acd52bc4d22934b2ece29b8a59f988",
					"message": "Remove-obsolete-styles",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 19 May 2015 11:27:09 +0200"
				},
				{
					"sha": "73b7fa932e05c96ad6656c25be0ea663b63e7292",
					"message": "Fix-Protractor-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 19 May 2015 11:21:12 +0200"
				},
				{
					"sha": "933365354bb08286b5508ad37bf84734edd4351c",
					"message": "Fix-Karma-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 18 May 2015 18:01:48 +0200"
				},
				{
					"sha": "74d75cadcd236bbb982005a58a903c97004680f6",
					"message": "Cleanup",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:59:35 +0200"
				},
				{
					"sha": "b130aeffb505e672faa4516248b9c9464115afdb",
					"message": "Cleaning",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:33:10 +0200"
				},
				{
					"sha": "10e64dac06d4283f65407c37206b2c5a8dd63f99",
					"message": "Create-build-task-with-standalone-and-light-versions",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:30:01 +0200"
				},
				{
					"sha": "38087e8ca7a73bf43c91480988f316aefe393cd2",
					"message": "Fix-rebase-issues",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 18 May 2015 14:56:22 +0200"
				},
				{
					"sha": "ab917bc702cd2865a0018d2822c90a7b14d990c6",
					"message": "Bootstrap-Webpack-configuration",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 11 May 2015 18:05:27 +0200"
				},
				{
					"sha": "3a1b030ad186cca859f6f26c81c21d3be1be2912",
					"message": "Fix-build-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 20 May 2015 16:46:46 +0200"
				},
				{
					"sha": "b37c1201e69629fca6a2970526d99b30e03ec736",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 20 May 2015 14:16:40 +0200"
				},
				{
					"sha": "71d27212702b2f2d6da61e0be42d56603c4d5c57",
					"message": "Merge-pull-request-418-from-marmelab-back_to_filtered_list",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 20 May 2015 14:14:19 +0200"
				},
				{
					"sha": "a2ea0ec02fffe85cdba57a7d81076cf86eccff04",
					"message": "Merge-pull-request-449-from-marmelab-list_buttons_without_listview",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 20 May 2015 14:10:32 +0200"
				},
				{
					"sha": "7ba34e99b8bd75a59542604f7b7ddf788569d5bb",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 20 May 2015 11:27:51 +0200"
				},
				{
					"sha": "9b4b5653316a1e2d1846d8c9bd077288d7a1d0fd",
					"message": "Disable-views-by-default",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 20 May 2015 10:09:02 +0200"
				},
				{
					"sha": "4ca15ad02367a2d4bf11f6d4599f23c3639048f0",
					"message": "Fix-button-display-when-a-view-is-disabled",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 20 May 2015 09:44:19 +0200"
				},
				{
					"sha": "3c3245247e20e9f38df541c21be8aae31928eff3",
					"message": "skip-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 19 May 2015 14:11:24 +0200"
				},
				{
					"sha": "0a59a961f295f3a1b88052fd0295ad0db4a0a6a2",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 18 May 2015 15:10:13 +0200"
				},
				{
					"sha": "298a48160c1da8339efaafc59285f60df6c33280",
					"message": "add-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 12 May 2015 11:20:01 +0200"
				},
				{
					"sha": "48fdb3b83d0e70b1a98bbe412b3dce456d7ddacb",
					"message": "pass-state.params-in-list-only-if-it-is-the-same-entity",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 11 May 2015 09:42:37 +0200"
				},
				{
					"sha": "b847bea26b6457fad10c130e018a77563b85667e",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 11 May 2015 09:42:06 +0200"
				},
				{
					"sha": "dd4a1973a90bafe14e6538a01ba4cbb1dfcb1ceb",
					"message": "use-state.params-instead-of-stateParams-when-appropriate",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 5 May 2015 11:23:37 +0200"
				},
				{
					"sha": "042bea52a09cfa5881033764b8d7df5a509c0003",
					"message": "save-search-state-for-show-view",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 5 May 2015 11:15:35 +0200"
				},
				{
					"sha": "50e36a66d9f6bbcf64b9594871a7d87df37bde01",
					"message": "save-filter-page-and-sort-in-state-when-going-from-list-to-edit-create-delete-batchdelete-page",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 4 May 2015 16:55:33 +0200"
				},
				{
					"sha": "a312bdc3a1d2505dc403449c36597a8e1f78099f",
					"message": "Merge-pull-request-445-from-marmelab-fix_listview_e2e_tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 19 May 2015 10:09:31 +0200"
				},
				{
					"sha": "4ae74a3f5f069e7a010f3e5a2f3235de2b1ff386",
					"message": "Fix-ListView-e2e-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:46:36 +0200"
				},
				{
					"sha": "6c3d53d8ac16016afec817618babdc3e8e6b587a",
					"message": "Merge-pull-request-444-from-marmelab-refactor_referenced_data",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 19 May 2015 09:49:40 +0200"
				},
				{
					"sha": "dd19ceef17d07bfb27c16cb13f4297a0d5127017",
					"message": "Update-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 17:21:27 +0200"
				},
				{
					"sha": "532392d3d639ea07e4b608f6da7b7c92c7304684",
					"message": "Fix-functions-call-in-routing",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 17:07:16 +0200"
				},
				{
					"sha": "17a6b428299f5f69c61066980d5dc819ad5e746f",
					"message": "Minor-fixes",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 17:00:16 +0200"
				},
				{
					"sha": "da50b73349183c686c2b50334581ab7959907384",
					"message": "Call-fillFilteredReferencedData-fillOptimizedReferencedData",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:06:43 +0200"
				},
				{
					"sha": "22a9a668c8ea51ec6fd2143076ae433a5e64df64",
					"message": "Call-getNonOptimizedReferences-getOptimizedReferences-in-routing",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 11:42:19 +0200"
				},
				{
					"sha": "4d730330b3ecc54eb2ef2eb378e88f0bec487035",
					"message": "Split-getReferencedData-into-getFilteredReferenceData-getOptimizedReferencedData-getAllReferencedData",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 11:20:25 +0200"
				},
				{
					"sha": "6b787fa3ee6e2bd60bc295b05ff0a8530cc4efbf",
					"message": "Merge-pull-request-442-from-marmelab-es6_promises_resolver",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:28:26 +0200"
				},
				{
					"sha": "8de0a9114a6f5cd054412818d89c94226115ce48",
					"message": "Try-to-fix-e2e-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:21:11 +0200"
				},
				{
					"sha": "448a7784bb3f58eb99cf46ec894e2e5769a8ae22",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 15:09:25 +0200"
				},
				{
					"sha": "d4b2fd5f189fc5e6c4ccd3aeddeaf446b8f2066a",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 14:45:08 +0200"
				},
				{
					"sha": "77b81b1c4c9f7771e17ba8a49c807cef55e5caf7",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 10:41:20 +0200"
				},
				{
					"sha": "1aedf285e80bd10815be13a0ffa14e01c48336f6",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 May 2015 09:37:59 +0200"
				},
				{
					"sha": "477a711543ab9bc31a47504d7a08d65e411505c7",
					"message": "Move-PromisesResolver-to-ES6",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 17:42:17 +0200"
				},
				{
					"sha": "d55fb8bf817e8a9e75434e98b088eaa6b24c484d",
					"message": "Fix-karma-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 12:46:11 +0200"
				},
				{
					"sha": "7815563d7bb1e1835e8710e12ee5a3d2995b6a0c",
					"message": "Use-svg-image-for-travis-build-status-ci-skip",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 12:34:55 +0200"
				},
				{
					"sha": "7ae83585895fcb8e63744da25ad15e6778bd70f2",
					"message": "Enable-travis-build-for-master-branch",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 12:30:58 +0200"
				},
				{
					"sha": "1370e66b332e1882f8b3279cf25058ee52278952",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 12:22:22 +0200"
				},
				{
					"sha": "db10369b359b26666b39725d2a66529cdfe9628e",
					"message": "Merge-pull-request-441-from-marmelab-fix_empty_listactions",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 10:14:10 +0200"
				},
				{
					"sha": "b65f3611d0ffac1b0098264d30af60a7ed0e10ed",
					"message": "Merge-pull-request-427-from-marmelab-es6_queries",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 18 May 2015 10:13:10 +0200"
				},
				{
					"sha": "68e0fbcdf148596d31654c562100c1e3e47b0316",
					"message": "Code-review",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 18:11:57 +0200"
				},
				{
					"sha": "8035564d0855e7f5108c44482deb154701181ea9",
					"message": "Merge-pull-request-440-from-marmelab-fix_edition_link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 15 May 2015 18:05:06 +0200"
				},
				{
					"sha": "cb0dd0906ef53917661b66561bb419624e887e67",
					"message": "Update-ES6-files",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 14:30:14 +0200"
				},
				{
					"sha": "bb09f340a5469b0cd6f9fdbf6e1fd6cb6092d088",
					"message": "Replace-var-by-let-in-es6-scripts",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 14:22:33 +0200"
				},
				{
					"sha": "091099d99f61bc15c481ea0cbae0839f748687a1",
					"message": "Fix-rebase",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 12:03:57 +0200"
				},
				{
					"sha": "60c2a5039b1734b24a6f759c14104b48696abec5",
					"message": "Move-Queries-test-to-es6",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 11:26:27 +0200"
				},
				{
					"sha": "a37fc7b28628bfb98cd81ae0cdb00996e131cc24",
					"message": "Rewrite-WriteQueries-tests",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 10:41:51 +0200"
				},
				{
					"sha": "6506666ab0a3da897da8150e8b5ae986c8d322c2",
					"message": "Rename-Create-Update-Delete-Queries-to-WriteQueries",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 11 May 2015 17:31:07 +0200"
				},
				{
					"sha": "d26c59fb5f87e4ed6082bde0d423f993eaef64e1",
					"message": "Move-RetrieveQueries-into-a-separate-es6-file",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 11 May 2015 16:55:56 +0200"
				},
				{
					"sha": "b68168a327bd7ac9623e1f40d7aef1c327660d12",
					"message": "Merge-pull-request-431-from-marmelab-remove_angular_filters",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 15:57:43 +0200"
				},
				{
					"sha": "1820df37576c620ef417435e78bee9561c78b716",
					"message": "Fix-empty-list-actions-column",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 15:55:01 +0200"
				},
				{
					"sha": "e1833c81f4247d6b8bba4f93046f8bb7522fe559",
					"message": "Revert-gruntfile",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 15:32:23 +0200"
				},
				{
					"sha": "867ddcfc6f92df69b11376c7b78ccffe3b5fddc3",
					"message": "Fix-edit-show-links",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 15:27:44 +0200"
				},
				{
					"sha": "e53e6ac40ed24c6f4e5b19ebaf9b7628b638d430",
					"message": "Merge-pull-request-435-from-marmelab-choice_field_required",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 15 May 2015 09:33:25 +0200"
				},
				{
					"sha": "08ea55d76dc781f2396163b47e7bbcf616689ae3",
					"message": "Merge-pull-request-429-from-marmelab-remove_referenced_view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 15 May 2015 09:18:02 +0200"
				},
				{
					"sha": "54bd1e7f189c3869d205951a070720e471a784a5",
					"message": "Merge-pull-request-437-from-marmelab-update_protractor",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 14 May 2015 15:02:24 +0200"
				},
				{
					"sha": "21e8706dcb0074f5e713b6f0a2b58e4c4c2294c7",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 17:43:57 +0200"
				},
				{
					"sha": "7235ea45bd9c8de9970e91632a2af836a7c1eb59",
					"message": "Update-protractor-to-1.8-version",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 17:41:28 +0200"
				},
				{
					"sha": "9201c70f297334feeec73b6a724c8c0da0084562",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 17:40:42 +0200"
				},
				{
					"sha": "9bae51f03ffb141ebcf7d22a1180b7070c72383a",
					"message": "Fix-karma-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 15:49:55 +0200"
				},
				{
					"sha": "6366fc3a6cb000e6ce2c6f2c2f8f77a73ec4a4e2",
					"message": "Make-choice-field-required-works-and-fix-angular-add-empty-first-option",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 15:09:08 +0200"
				},
				{
					"sha": "c95fb69eed5ba6a6343f478e0dcda919e247ae33",
					"message": "Fix-typo-in-upgrade-to-0.8-doc-ci-skip",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 12:33:21 +0200"
				},
				{
					"sha": "974339e05cc00614b9cfc21e14e962c9f33b3517",
					"message": "Merge-pull-request-434-from-marmelab-dashbooard_panel_title_link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 13 May 2015 12:17:41 +0200"
				},
				{
					"sha": "33379fdc58793ada01745c31036119d43a585427",
					"message": "Merge-pull-request-433-from-marmelab-boost_angular_performance",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 13 May 2015 11:51:05 +0200"
				},
				{
					"sha": "b146aec997e0d7cb7999e20155ca3b96b0d2d2ef",
					"message": "Make-debug-configurable-and-update-documentation",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 11:28:15 +0200"
				},
				{
					"sha": "db571d07cba240df14e312370ae93107f21ca3f2",
					"message": "Add-note-in-README-ci-skip",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 13 May 2015 10:30:07 +0200"
				},
				{
					"sha": "e0da9fa7c6ddf9c6421390e32e6906fb4c2d5d30",
					"message": "Merge-pull-request-430-from-marmelab-remove_validator_service",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 12 May 2015 22:02:05 +0200"
				},
				{
					"sha": "f07ce5bc2b6238bd14b447d2e21b2208fc365621",
					"message": "Fix-dashboard-panel-heading-link",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 18:06:04 +0200"
				},
				{
					"sha": "1f4a4ccd30f757953adb7bd6c4892b02a655e4c0",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 17:25:11 +0200"
				},
				{
					"sha": "5d1fe684694fe03dc84f07d51537ea06ec5d57ab",
					"message": "Fix-PanelBuilder-karam-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 17:13:12 +0200"
				},
				{
					"sha": "39a4d4989d4d3c999d25196de9670be1228e7680",
					"message": "Boost-Angular-performance-by-disable-debug-and-add-ng-strict-di-in-demo-app",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 17:06:04 +0200"
				},
				{
					"sha": "c469be22e620fe84894a319900651f7f63c57a4d",
					"message": "Fix-Application.getViewsOfType-method-and-add-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 16:17:19 +0200"
				},
				{
					"sha": "60fd2127c81d27b4c97125a180a18bf263f871d9",
					"message": "Add-missing-call-to-controller-scope-destroy-event",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 15:44:50 +0200"
				},
				{
					"sha": "997dead35582d697b5551aff44d18e85bf99e112",
					"message": "Move-orderElement-angular-filter-to-es6-class-and-remove-angular-enabled-filter",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 14:54:55 +0200"
				},
				{
					"sha": "a84587ab85ba8ee643a843451d4207993bfe0dcf",
					"message": "Move-Validator-service-to-view.validate-method",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 12:06:01 +0200"
				},
				{
					"sha": "0436ba2c45df92b759660d1d8677ecbee333b18c",
					"message": "Add-upgrade-instructions-and-fix-README-ci-skip",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 11:48:06 +0200"
				},
				{
					"sha": "2d7ac42c7cb91a6bf645b8092992b8a8626264b4",
					"message": "Fix-karma-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 11:00:31 +0200"
				},
				{
					"sha": "5512cbc0fcea27e880c207bb7dd67cf149e967e9",
					"message": "Fix-mocha-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 12 May 2015 00:11:49 +0200"
				},
				{
					"sha": "294e3376f9592533ef7cf8371a9673e4ccf94ab5",
					"message": "Remove-referencedView-created-by-code-for-ReferenceField-and-fix-sort-parameter-ma-datagrid-directive-attribute",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 11 May 2015 18:07:12 +0200"
				},
				{
					"sha": "cfa5b3cbb6c5fd95a7a62a094924819f18e61e69",
					"message": "Merge-pull-request-425-from-marmelab-remove_ui_bootstrap_monkeypatch",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 11 May 2015 14:31:18 +0200"
				},
				{
					"sha": "9ee522ab7bd79a3b28544134bf75c42e291ad0ff",
					"message": "Merge-pull-request-410-from-marmelab-introducing_datastore",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 11 May 2015 12:15:21 +0200"
				},
				{
					"sha": "8b7429f3c1298412123bb2388649a03087c48e62",
					"message": "Remove-ui-bootstrap-datepicker-monkey-patch",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 11 May 2015 11:33:53 +0200"
				},
				{
					"sha": "19f61d65a3a42974784b86938a34124d26eb46e2",
					"message": "Code-review",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 11 May 2015 11:22:20 +0200"
				},
				{
					"sha": "4d8b06170772ef6587d6647143d641f8022648cd",
					"message": "Fix-panels-in-dashboard",
					"author": {
						"name": "Emmanuel QUENTIN",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 11 May 2015 11:16:25 +0200"
				},
				{
					"sha": "45ea6e691a8ad3c0665623353d297edae7f72c12",
					"message": "Merge-pull-request-422-from-marmelab-readme_typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 7 May 2015 14:42:36 +0200"
				},
				{
					"sha": "405c7ede211da965a4a6a237bf2e7bcbbfbbe3e0",
					"message": "Fix-typo-in-README",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 7 May 2015 12:29:16 +0200"
				},
				{
					"sha": "f78cae4d8782a37062b234baefd72b1674a0bf79",
					"message": "Preparing-0.7.0-release",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 6 May 2015 16:25:23 +0200"
				},
				{
					"sha": "b9c3b2bbf4d2574aac7e17603864f06b43123aa2",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 6 May 2015 09:19:49 +0200"
				},
				{
					"sha": "7f7c2dba4b10f24879d1ebaad9d0c3bf9dd8468f",
					"message": "Merge-pull-request-419-from-Xennis-fix_doc",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 5 May 2015 18:17:41 +0200"
				},
				{
					"sha": "d0eab972d64bc2fd08d360f89dcee15194514ad7",
					"message": "Change-the-variable-name-of-the-ng-admin-app-in-the-Menu-Configuration-section-from-admin-to-app-since-1-nowhere-is-described-what-admin-should-be-and-2-it-does-not-fit-to-the-code-from-the-above-Example-Configuration-section",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Tue, 5 May 2015 00:23:00 +0200"
				},
				{
					"sha": "5fc2e693cf75b6c057e4648d65dd8a5812030dd9",
					"message": "Fix-mistake-and-broken-link",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Tue, 5 May 2015 00:11:05 +0200"
				},
				{
					"sha": "e0bdf66d20e9650c22df5d88d5eb793153375786",
					"message": "Fix-typo-in-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 4 May 2015 15:58:53 +0200"
				},
				{
					"sha": "79f2882e29ee2dcff5811767d21f77d896238c0f",
					"message": "Add-changelog-for-0.7.0",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 3 May 2015 22:55:55 +0200"
				},
				{
					"sha": "66fc9f09ab091d2edadbb29fa043f00b2b43ffcf",
					"message": "Merge-pull-request-415-from-marmelab-baseApiUrl_bug",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sat, 2 May 2015 00:58:29 +0200"
				},
				{
					"sha": "aa23b19ca51c6959aba4a0bb13aeec0a0e0c0cb8",
					"message": "Merge-pull-request-416-from-marmelab-empty_select",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Sat, 2 May 2015 00:57:31 +0200"
				},
				{
					"sha": "26a1a27478a4ee4231a54d3d7fb59aa562b75767",
					"message": "ReferenceField-does-not-extend-ChoiceField-anymore",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 1 May 2015 19:35:31 +0200"
				},
				{
					"sha": "a69a4fde10b72bda241e56efbb340cf794893e32",
					"message": "Remove-global-instance-of-DataStore",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 1 May 2015 18:17:03 +0200"
				},
				{
					"sha": "9cadf984cc7d69ba3cf80ac04a8f30e5f553c82b",
					"message": "Use-DataStore-everywhere-and-create-one-instance-by-url",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 1 May 2015 17:24:23 +0200"
				},
				{
					"sha": "74a841c0e570f7059f66dec7edfe1a8991bf1582",
					"message": "Hide-empty-option-in-choice-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Apr 2015 17:57:25 +0200"
				},
				{
					"sha": "21550fbf621d039f87352abcef3a5a1108285ca5",
					"message": "Fix-relative-baseApiUrl-gets-doubled-in-the-URL",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Apr 2015 17:26:04 +0200"
				},
				{
					"sha": "b39f019fe2f987805ed1c7b3c94fe07783faa34d",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 30 Apr 2015 16:35:50 +0200"
				},
				{
					"sha": "d0312db30c64ef8ec6d1537cb721f600cdc3e03e",
					"message": "Merge-pull-request-407-from-marmelab-button_label",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Apr 2015 15:13:58 +0200"
				},
				{
					"sha": "069a7bd65dc93a2b3a312ff13bc50a167748a8f1",
					"message": "Merge-pull-request-412-from-marmelab-accordion_effect",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Thu, 30 Apr 2015 15:09:40 +0200"
				},
				{
					"sha": "40e999c326fff876c5a487d7af0d00b398bf4ea1",
					"message": "Merge-pull-request-413-from-marmelab-file_field_accept",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Thu, 30 Apr 2015 15:09:16 +0200"
				},
				{
					"sha": "60f5021405e77566a2230730358ec06afa570d12",
					"message": "Update-README",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 30 Apr 2015 15:02:19 +0200"
				},
				{
					"sha": "f2fcb57aea44997e6624bdd2a24f918f9ee02c08",
					"message": "Fix-accept-type-in-file-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 29 Apr 2015 19:31:08 +0200"
				},
				{
					"sha": "1a478c4c8062184c179e36b3e2042a315cd59fd7",
					"message": "Fix-accordion-effect-on-sidebar-menu",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 29 Apr 2015 19:25:01 +0200"
				},
				{
					"sha": "cded3119fb09a8cbf5eeef8029ad7c139245227d",
					"message": "Fix-test-after-DataStore-introduction",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 29 Apr 2015 14:38:41 +0200"
				},
				{
					"sha": "7320cd209f36c83cce4ce874b9a7306f02ae8665",
					"message": "Use-global-DataStore-instead-of-View-one-and-move-all-related-Entry-functions-to-DataStore",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 28 Apr 2015 18:16:57 +0200"
				},
				{
					"sha": "04dc4a10d1c09e941d6c827136a6aa8dfdfc8721",
					"message": "Add-one-time-binding",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Tue, 28 Apr 2015 09:58:52 +0200"
				},
				{
					"sha": "6b9a0d71ed843d00302c41e8a50812561c5d4082",
					"message": "Introduce-DataStore-and-remove-entries-for-ReferenceField",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 27 Apr 2015 18:17:24 +0200"
				},
				{
					"sha": "1aaa56b0883ec7e3ee33aeaa72d45f77a1b47fb7",
					"message": "Update-ngAnnotate-and-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 27 Apr 2015 10:55:42 +0200"
				},
				{
					"sha": "50442bf432667e8ca9f56323d900007c51c109c2",
					"message": "Add-label-attribute-on-button-directives",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sat, 25 Apr 2015 14:00:06 +0200"
				},
				{
					"sha": "07fc50df94ce82fed39638c3db40d37ea408bce0",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 16 Apr 2015 17:45:17 +0200"
				},
				{
					"sha": "2f7dababa0402616d17cb56e84be3221b3dd9d02",
					"message": "Merge-pull-request-401-from-marmelab-fix_datagrid_track_by",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 16 Apr 2015 16:30:26 +0200"
				},
				{
					"sha": "15fdb6684397753d775c9cdc0689269412e99a82",
					"message": "Fix-rendering-on-datagrid-by-using-entry.identifierValue-as-hashKey",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 16 Apr 2015 15:53:55 +0200"
				},
				{
					"sha": "f8a84762e56194887d0859c19099077fb02e49d1",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 15 Apr 2015 18:08:19 +0200"
				},
				{
					"sha": "be6a8c81b1010d12e9e61a6461cc131267da840a",
					"message": "Merge-pull-request-398-from-marmelab-kenegozi-master",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 17:34:31 +0200"
				},
				{
					"sha": "be7882921f94bf16e1e3aafe2aeaacd7f5edb143",
					"message": "Merge-pull-request-397-from-marmelab-custom_header",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 17:32:13 +0200"
				},
				{
					"sha": "887d4e1ac062e3a547090be0fa17e0a136d59363",
					"message": "Merge-pull-request-400-from-marmelab-disabled_view",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 17:29:11 +0200"
				},
				{
					"sha": "cc59e9b029e3ce972d7e9b277c10e97e356c6f4a",
					"message": "add-type-string-back-in-entry-formatter",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 15 Apr 2015 09:43:46 +0200"
				},
				{
					"sha": "d8a686daa94bb11ac59764a131d0b55c4d3e21ec",
					"message": "Display-error-message-when-routing-error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 09:37:00 +0200"
				},
				{
					"sha": "b74a8ba3f4317b69537e4ad42d9c08d992e2dae7",
					"message": "Fix-links-and-redirects-to-editionView-when-it-is-disabled",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 09:25:58 +0200"
				},
				{
					"sha": "3139e93769129ce44f92025ed235b58f6f59817d",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 15 Apr 2015 09:21:51 +0200"
				},
				{
					"sha": "d81792933be596c9aa2d04b5d128dc140054da8a",
					"message": "Merge-pull-request-396-from-marmelab-export_format_date",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 08:20:18 +0200"
				},
				{
					"sha": "d9383715d659f0d8450589b44df6189ff38b357a",
					"message": "Add-e2e-tests-for-choices-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 15 Apr 2015 00:25:02 +0200"
				},
				{
					"sha": "7319c3b9166aee1e0ac89fa6daf79b5b896c673d",
					"message": "Fix-subcategories-in-show-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 23:50:32 +0200"
				},
				{
					"sha": "4470c1138b7eb5f156db4efc8f7edd2c03538912",
					"message": "Fix-broken-ReferenceField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 23:43:16 +0200"
				},
				{
					"sha": "853dcb0cd4f69e835335b0f281392ede9aa513a1",
					"message": "Merge-pull-request-399-from-marmelab-404-page",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 14 Apr 2015 23:16:38 +0200"
				},
				{
					"sha": "de4bd9366d4f0dc2d69d422bfb3a6451efb250ee",
					"message": "Improve-error-handling",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 22:52:56 +0200"
				},
				{
					"sha": "5753f1486e3d438a548e4facb1fd53c54f957d91",
					"message": "Prevent-an-infinite-digest-loop-error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 20:47:17 +0200"
				},
				{
					"sha": "563d45fb728af4205d7f92141708fdb16998944a",
					"message": "Improve-choices-function",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 18:41:37 +0200"
				},
				{
					"sha": "ae87c37c4f66a6e0cc30b8e79e54f0258fe253ad",
					"message": "Covering-ChoicesField-and-adding-example-and-docs",
					"author": {
						"name": "Ken Egozi",
						"email": "mail@kenegozi.com"
					},
					"date": "Wed, 18 Mar 2015 13:32:47 -0700"
				},
				{
					"sha": "6681671e50d18ef7c174697aef323cbcbe5f2601",
					"message": "support-for-parameterizing-choice-fields-by-the-current-entry-which-opens-up-contextual-select-tags-e.g.-cascading-selects",
					"author": {
						"name": "Ken Egozi",
						"email": "mail@kenegozi.com"
					},
					"date": "Tue, 17 Mar 2015 16:26:50 -0700"
				},
				{
					"sha": "37fe70e1d40d9e184a835a0feabac74a5557d0b1",
					"message": "Add-custom-header-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 18:12:03 +0200"
				},
				{
					"sha": "d638f76c4ca57955dad81c5a0b99917beee94600",
					"message": "Add-ability-to-customize-the-admin-header",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Apr 2015 18:00:16 +0200"
				},
				{
					"sha": "22d099a32436ec74fa7795e9acf7c512dd0660aa",
					"message": "add-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 14 Apr 2015 17:34:03 +0200"
				},
				{
					"sha": "234f479decf24f6351f30654af398e51c95159a9",
					"message": "refactor-entryFormatter-to-use-date-field-format",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 14 Apr 2015 17:12:04 +0200"
				},
				{
					"sha": "f3d4ed2ec683f3c0699a1d3113a8cfdf2cd9eb01",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 14 Apr 2015 09:23:18 +0200"
				},
				{
					"sha": "618bd9cbbd829d1da91b40e176a760a142cda3d0",
					"message": "Merge-pull-request-394-from-marmelab-fix_order_bug",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 13 Apr 2015 19:22:29 +0200"
				},
				{
					"sha": "3b5909c075a532d80013f48476c0cd60904b062c",
					"message": "add-a-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 13 Apr 2015 16:40:06 +0200"
				},
				{
					"sha": "eee2e1fe28581903015f1583ddf22b769a97b49e",
					"message": "Fix-outdated-configuration-in-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 13 Apr 2015 07:22:05 +0200"
				},
				{
					"sha": "a84c2858319f181ff1befc9ac7e148c00d8b5b2b",
					"message": "fix-ordering-when-more-than-10-fields",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 10 Apr 2015 17:33:44 +0200"
				},
				{
					"sha": "716d17c76e056aecd103e9e6822a5769af2e061f",
					"message": "Merge-pull-request-391-from-marmelab-fix_e2e",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Apr 2015 14:09:47 +0200"
				},
				{
					"sha": "caff0d2ff64c98ddb8802e79c3ec06f369e2bb20",
					"message": "Disjoin-buttons-that-wre-sticked-in-the-filter-form",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Apr 2015 07:55:00 +0200"
				},
				{
					"sha": "96661f4cab5c7f270197dc9e28c5877f0648d814",
					"message": "Fix-missing-var-makese2e-tests-fail",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 9 Apr 2015 07:51:03 +0200"
				},
				{
					"sha": "8c9f11842d63a1d4c18f8742010c67dff64870a0",
					"message": "rebuild",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 8 Apr 2015 18:41:10 +0200"
				},
				{
					"sha": "a248ee17cd88876a905b0793e0c46dcff67f35ff",
					"message": "Merge-pull-request-389-from-marmelab-export_fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 18:38:45 +0200"
				},
				{
					"sha": "3d4f75be0e61bacc75db3b6053219c6d99215e2c",
					"message": "Merge-pull-request-388-from-marmelab-default_title",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 18:33:38 +0200"
				},
				{
					"sha": "11fdf6f1f1c5a7b2c4e48525135b5aabb6312f3d",
					"message": "Merge-pull-request-387-from-marmelab-longer_notif",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 18:33:11 +0200"
				},
				{
					"sha": "f158624c76950c0b740e0b7e85d2d6a0241fcbe9",
					"message": "Re-add-listView.exportFields-to-configure-export-button",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 18:29:30 +0200"
				},
				{
					"sha": "accac14998425b2f0e774d13701da91f75423407",
					"message": "Add-default-admin-title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 17:50:58 +0200"
				},
				{
					"sha": "b88080681dfc1d397ec56999307552de8c6459d5",
					"message": "Add-missing-notifications-make-notifications-last-longer",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 17:26:24 +0200"
				},
				{
					"sha": "65aa66ed3cea9e68b64e7ba4ae2a8c0db4a69bff",
					"message": "update-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 8 Apr 2015 15:47:04 +0200"
				},
				{
					"sha": "eca341de7dae8de2f0891de22a93d6ee45b47ef0",
					"message": "Merge-pull-request-386-from-marmelab-export_view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 15:45:07 +0200"
				},
				{
					"sha": "354435d4f4f3f61a66815d6f615f3a418de061a3",
					"message": "fix-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 8 Apr 2015 14:31:25 +0200"
				},
				{
					"sha": "8d237ff30f6d4819a4c6e643a4ff91b2c70bd87b",
					"message": "remove-exportFields-config-entry",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 17:44:59 +0200"
				},
				{
					"sha": "a10c9eafbb80e48969c976f7f276690c6d4c3f37",
					"message": "add-exportView",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 16:55:48 +0200"
				},
				{
					"sha": "66898f72a25f2ef2ba25ffffb506e45f52cc6576",
					"message": "Wording-fixes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 09:10:08 +0200"
				},
				{
					"sha": "5efd203655ae0bc36030b1999c7a467775f0226f",
					"message": "Merge-pull-request-384-from-marmelab-fields_array",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 8 Apr 2015 08:54:24 +0200"
				},
				{
					"sha": "36cde665eb1376aff9a277af60a83bc4f4f12305",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 16:59:12 +0200"
				},
				{
					"sha": "91d36b8df64d3d6c4dfe03fd77fd0b65c4091426",
					"message": "update-doc",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 14:29:28 +0200"
				},
				{
					"sha": "5b9430de1c8baa0068d744fb66bf6ce5f05094c6",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 14:05:27 +0200"
				},
				{
					"sha": "2c040768e1de2e895ff6c3928dcbd38f9f8a9595",
					"message": "update-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 12:16:32 +0200"
				},
				{
					"sha": "d25c4cd7cb7e79ebceedf1c97d6847217c8fc1be",
					"message": "Merge-pull-request-381-from-marmelab-fix_exportfields_config",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 7 Apr 2015 11:22:19 +0200"
				},
				{
					"sha": "75b5018421c49e7dea73b8d87fa4f7268846a9b2",
					"message": "update-example-to-stop-using-order-on-field",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 09:31:36 +0200"
				},
				{
					"sha": "fe5dd62b3486aeefc50200a9863780cb6f3b478a",
					"message": "refactor-Field.order-to-be-used-only-in-view.Field",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 7 Apr 2015 09:24:18 +0200"
				},
				{
					"sha": "57dde1b226088687ce26afaf58950bdcdd7249e0",
					"message": "add-deprecation-message-when-passing-literal-to-fields",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Sat, 4 Apr 2015 22:05:44 +0200"
				},
				{
					"sha": "2651ace87789499681f8a1c4ded7763459eae633",
					"message": "use-array-instead-of-literal-for-the-result-of-all-field-method-in-View",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 3 Apr 2015 21:51:55 +0200"
				},
				{
					"sha": "9516e658e972e3821102a6d1b4b1ac1141bfc2bb",
					"message": "refactored-fields-to-return-an-array-instead-of-a-literal",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 3 Apr 2015 21:01:15 +0200"
				},
				{
					"sha": "28fce90f47f0cc8e76cc2a7ceae04ce1e0ed6104",
					"message": "fix_typo",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 3 Apr 2015 18:15:02 +0200"
				},
				{
					"sha": "2aa963281a6e8f1c86d5b7a6d9f7ff631cb3df1e",
					"message": "update-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 3 Apr 2015 18:11:58 +0200"
				},
				{
					"sha": "3176ba9eed624170c0f6e3bd78bb02828b981b1f",
					"message": "refactor-exportFields-to-convert-literal-to-array-if-receiving-one",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 3 Apr 2015 18:11:34 +0200"
				},
				{
					"sha": "f2b35bcf474678b336c7f888410ecdb8a225f545",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 3 Apr 2015 11:39:21 +0200"
				},
				{
					"sha": "1c38c4584f4d355445aa85660f4983c00252cd01",
					"message": "Merge-pull-request-376-from-marmelab-custom_menu_2",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 3 Apr 2015 11:25:33 +0200"
				},
				{
					"sha": "328485a906af0d036d47c670ee3eec980b37b22e",
					"message": "Merge-pull-request-316-from-marmelab-csv_export",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 3 Apr 2015 10:21:50 +0200"
				},
				{
					"sha": "1698abd2ab3841c217c1689935627a7cd2d5b537",
					"message": "Mention-new-actions-in-the-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 3 Apr 2015 10:09:26 +0200"
				},
				{
					"sha": "4254d153c6f17734f29caffe51d5d98691c348a3",
					"message": "Rename-exprt-button-to-export",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 3 Apr 2015 10:07:53 +0200"
				},
				{
					"sha": "c00d5eb16b142a0860466ca1ce8d5ed0a208b9cf",
					"message": "Add-doc-and-default-export-fields",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 3 Apr 2015 10:03:34 +0200"
				},
				{
					"sha": "663a2dcc38a08ed5cf2fec58d957e1fbe01cc0da",
					"message": "fix-entryFormater",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 2 Apr 2015 22:47:35 +0200"
				},
				{
					"sha": "5f75803f667b02c40da467cb38fa7f0160ab298d",
					"message": "use-current-list-order-to-export-to-csv",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 1 Apr 2015 23:15:31 +0200"
				},
				{
					"sha": "8f67f75ec5f49e5deefe10e8122349b5a089e013",
					"message": "add-export-field-configuration",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 1 Apr 2015 10:02:40 +0200"
				},
				{
					"sha": "3cbe1928e8746ce8bc1fddec82de2c3b28582194",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Feb 2015 17:08:16 +0100"
				},
				{
					"sha": "f053884b8c4b561a47e54cc292e5df820218a41f",
					"message": "integrate-export-to-csv-directive-into-ng-admin",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 16 Feb 2015 14:10:17 +0100"
				},
				{
					"sha": "5ee3013d0917bb5daafb71ee8268bd1a974fcb1f",
					"message": "Merge-pull-request-380-from-marmelab-batch_actions_config",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 2 Apr 2015 10:49:33 +0200"
				},
				{
					"sha": "ab1ff08a9c6c25e306b35d419b8c299753176e97",
					"message": "update-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 2 Apr 2015 10:46:26 +0200"
				},
				{
					"sha": "31120baaa3bbdcfb85fa5e9cd2241d4b7c4980e4",
					"message": "allow-to-add-batch-actions-when-costumizing-list-actions",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 2 Apr 2015 10:45:15 +0200"
				},
				{
					"sha": "94fdf1d46c74103cfc4a9d1d92626c3e8fb8ce69",
					"message": "Fix-README-formatting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 22:49:56 +0200"
				},
				{
					"sha": "f1b3831bf95cf8687a7daccda02f5409b80a412b",
					"message": "Remove-mention-of-non-existent-method",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 22:47:20 +0200"
				},
				{
					"sha": "27da2fdcf8734fd3ce1b2d4ba6f3334674410405",
					"message": "Switch-new-route-to-entity-name-first-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 22:34:47 +0200"
				},
				{
					"sha": "b539168cd6e3214df35f6e84f2d1dc5be6c30456",
					"message": "Fix-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 17:45:07 +0200"
				},
				{
					"sha": "1fafb2e74402b5c8d29b031044e24eefd0044efc",
					"message": "Document-menus",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 17:43:05 +0200"
				},
				{
					"sha": "68fdf8fbdd37c41cba2ba96846e0d0e3b8044b64",
					"message": "Submenu-animation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 17:28:35 +0200"
				},
				{
					"sha": "5ed6d87306432339aa98350211038d7882ce7a71",
					"message": "Handle-submenus",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 31 Mar 2015 18:26:00 +0200"
				},
				{
					"sha": "2b231612f79416c72c83b52519f3e7fa3abf7f8a",
					"message": "Fix-dashboard-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 31 Mar 2015 09:45:15 +0200"
				},
				{
					"sha": "d98d1565f7e35f4683056de05edb97f6997dde94",
					"message": "Add-upgrade-guide-for-menus",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 31 Mar 2015 09:42:41 +0200"
				},
				{
					"sha": "790feca1de0d58efa3a2ca341a922dede21f4a9b",
					"message": "Allow-user-to-create-custom-menus",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 31 Mar 2015 09:11:00 +0200"
				},
				{
					"sha": "0af93201fb1a88520c55ac0e5f0e6d73d5d3aae1",
					"message": "Improve-performance-by-redrawing-menu-manually-only-when-necessary",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 31 Mar 2015 08:29:35 +0200"
				},
				{
					"sha": "18d148b3e6a6d01c5cfb733bb2f18167c7aedc94",
					"message": "Replace-SidebarController-with-a-MenuBar-directive-based-on-Menu",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 30 Mar 2015 23:46:38 +0200"
				},
				{
					"sha": "619147c710a226f23d11810ee6abfd6c91c0b344",
					"message": "Use-new-routing-pattern-in-Menu",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 30 Mar 2015 22:50:59 +0200"
				},
				{
					"sha": "71de70e54012d77de2ac9b59ee421ee12945eb71",
					"message": "Change-internal-routing-pattern-to-ease-URL-detection",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 30 Mar 2015 22:42:06 +0200"
				},
				{
					"sha": "a05e163300254ac68454b1bd5846ab77a950a2d5",
					"message": "Allow-creation-of-Menu-from-entities",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 30 Mar 2015 22:17:20 +0200"
				},
				{
					"sha": "a76c6e01741665f8ee5203eca1558e6546583c94",
					"message": "Build-menu-from-entity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 30 Mar 2015 21:20:59 +0200"
				},
				{
					"sha": "9ca361fa8453178fcfbabd8fae7d3b02c7422539",
					"message": "Add-Menu-item",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 30 Mar 2015 21:01:57 +0200"
				},
				{
					"sha": "c04b5ca1b5fef475e2366ffd970493841aaf6e6c",
					"message": "Merge-pull-request-374-from-marmelab-multi_select_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 22:22:04 +0200"
				},
				{
					"sha": "13fe5a39f1efb1700c1cb5e59ca1edb19670c2d8",
					"message": "Improved-batch-actions-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 21:59:36 +0200"
				},
				{
					"sha": "d36f61a05040b1f954b8a361574559cb2cd3bc81",
					"message": "Pass-ids-to-the-batchDelete-route",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 21:29:15 +0200"
				},
				{
					"sha": "d3b3e0b7ab58d533b331f28b93acb13155820b17",
					"message": "Move-batchDeleteController-to-delete-folder",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 21:02:47 +0200"
				},
				{
					"sha": "cd58de66be422543bc581b8eeec29005470012fe",
					"message": "Display-number-of-items-to-be-deleted",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 20:56:46 +0200"
				},
				{
					"sha": "714a25c0fd24c3e31b4956e95822dcc8dda3869a",
					"message": "Fix-dropdown-style",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 20:53:33 +0200"
				},
				{
					"sha": "20fc605f5236dce6e3acb49be7a06f4c885884f0",
					"message": "Fix-missing-batchActions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 20:50:51 +0200"
				},
				{
					"sha": "f50876d7a4d1378122e2511b8a966f63242f29c1",
					"message": "batch-button-is-a-button-like-others-breaks-things",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 19:33:29 +0200"
				},
				{
					"sha": "2d88d5d5de8380c5e36db1656eaae923d08ad526",
					"message": "Simplify-checkbox-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 19:28:21 +0200"
				},
				{
					"sha": "53f914ac130d0ae4e406c4c01c0ab2fd72b26884",
					"message": "Merge-pull-request-367-from-marmelab-referenced_list_order",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 1 Apr 2015 16:24:12 +0200"
				},
				{
					"sha": "684b0b83981dde837552b44f1ce148b461ec4078",
					"message": "fix-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 31 Mar 2015 17:57:30 +0200"
				},
				{
					"sha": "bd594e7f9e7ac8718d5b533aba1b4dedb007bfad",
					"message": "hide-batch-action-when-no-selection",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 31 Mar 2015 17:27:38 +0200"
				},
				{
					"sha": "09c119f9cff8712f46a1504f5730dcbf2d1d44a7",
					"message": "fix-batch-actions-directive-to-work-without-jQuery",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 31 Mar 2015 09:34:58 +0200"
				},
				{
					"sha": "8f769f4fa1e5f0be9cf6fb8f3aa6eb14412fd4e5",
					"message": "fix-dropdown-button-style",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 30 Mar 2015 18:22:23 +0200"
				},
				{
					"sha": "47c1f6440c6f3921ac67d904b13fc9785bf60716",
					"message": "remove-batchAction-from-batchDeleteView",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 30 Mar 2015 15:33:25 +0200"
				},
				{
					"sha": "eb757ee8837be63d385af97d1c95a58e54a6a8d0",
					"message": "add-batch-delete-queries",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 30 Mar 2015 14:46:01 +0200"
				},
				{
					"sha": "389bd524a2a124f98b03b82b84b26775f45cdb3d",
					"message": "add-batchDelete-view",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 30 Mar 2015 11:47:09 +0200"
				},
				{
					"sha": "5f171b28962919913118e1acf2172e1275c84884",
					"message": "add-batchActions",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 26 Mar 2015 16:21:53 +0100"
				},
				{
					"sha": "b09564cb8c040abb29c78c3c2cb65b75a5bc3e8a",
					"message": "update-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 25 Mar 2015 15:35:24 +0100"
				},
				{
					"sha": "223c69403eeabddf0c897bfb4471a33e3be4a80b",
					"message": "allow-to-activate-deactivate-selection-via-listView.selectable",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 25 Mar 2015 15:28:18 +0100"
				},
				{
					"sha": "24d736e2d0c849996390eec81e77dacbf077db44",
					"message": "give-listActions-access-to-the-selection",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 25 Mar 2015 15:11:20 +0100"
				},
				{
					"sha": "06d8b477aebcffc294638651f996a451d25d1bba",
					"message": "consider-selection-to-be-complete-even-if-order-do-not-match",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 25 Mar 2015 14:20:48 +0100"
				},
				{
					"sha": "fc29d91a3550f32e95990dce6ce7349da670c92c",
					"message": "move-selection-logic-in-datagridController",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 25 Mar 2015 13:28:26 +0100"
				},
				{
					"sha": "c21ea2fd29519fd1d9b0c4964350eb836e73b78e",
					"message": "use-selectors-in-list-datagrid",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Mar 2015 18:12:43 +0100"
				},
				{
					"sha": "82e104bb47aca0e726741c63f6ac848f948b76d0",
					"message": "add-maDatagridMultiSelector-directive",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Mar 2015 15:41:00 +0100"
				},
				{
					"sha": "17efb870afbb1b5f9e58a37af5580b63cd5afb43",
					"message": "add-maDatagridItemSelector",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Mar 2015 10:24:55 +0100"
				},
				{
					"sha": "6c4cc99f67a3c1a8aed98bb6feb859c2ba685774",
					"message": "Merge-pull-request-349-from-marmelab-reference_failed",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 31 Mar 2015 07:37:17 +0200"
				},
				{
					"sha": "3cade9c053c51eb9b95a0308c4531b4df98159a9",
					"message": "Allow-referenced_list-to-be-ordered-by-configuration",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 21:44:25 +0100"
				},
				{
					"sha": "30223f1c263d89c573e53615869100035e96e461",
					"message": "Code-Review",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 17:32:14 +0100"
				},
				{
					"sha": "34514a86f6cce0502360bfccbbf2b6e476f1476f",
					"message": "USe-spaces-instead-of-tabs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 17:26:58 +0100"
				},
				{
					"sha": "4b34b19bd1f9c788d71774e74589bbda90f99c28",
					"message": "Code-Review",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 17:25:53 +0100"
				},
				{
					"sha": "4f9c8f6fe0a12a30b7d95a1d948f277b7dc0f5f5",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 13 Mar 2015 19:06:01 +0100"
				},
				{
					"sha": "7adcc760d0e4e46035a39582dd77136f928774fe",
					"message": "Move-specific-promise-resolver-to-a-standalone-service",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 12:57:36 +0100"
				},
				{
					"sha": "2b6f220e917ecd9619e29c6c32b75e0bb1455291",
					"message": "Allow-to-display-the-listView-even-with-missing-references",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 12:39:37 +0100"
				},
				{
					"sha": "54cefb5d01ec2f0228ba7b238535ddaa72172b36",
					"message": "Merge-pull-request-361-from-marmelab-fix_tests",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 27 Mar 2015 18:14:31 +0100"
				},
				{
					"sha": "af4d303edfc1149861de0a1dea2fdd212afcebcc",
					"message": "Fix-all-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 27 Mar 2015 17:56:23 +0100"
				},
				{
					"sha": "e66d0ae78cad6ee393b9e674f75d9a254cfd637e",
					"message": "Fix-CI-Karma-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 26 Mar 2015 09:33:45 +0100"
				},
				{
					"sha": "76ee25ef3e1e7426815351dc448540a5878eabba",
					"message": "use-ng-annotate-0.4.0-and-build-with-node-0.10.36",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Mar 2015 10:45:03 +0100"
				},
				{
					"sha": "ba941d890e09d388307d8fe2a6f4fc4b704602f2",
					"message": "Allow-compatibility-with-node-0.12",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Mar 2015 16:50:49 +0100"
				},
				{
					"sha": "3992a407833b6fa6fdf4d458402b063298a99002",
					"message": "Fix-coding-standards-and-rebuild",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Mar 2015 16:50:32 +0100"
				},
				{
					"sha": "ddf6361539cb0c2727d08ae5c4d2a5d45f5e2c31",
					"message": "Merge-pull-request-370-from-ihrigb-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Mar 2015 16:40:02 +0100"
				},
				{
					"sha": "4c8213db3a9f662ad823d5bcd2300294909f4545",
					"message": "Documentation-for-enablable-sanitization-of-wysiwyg-field",
					"author": {
						"name": "Benjamin",
						"email": "benjamin.ihrig@gmail.com"
					},
					"date": "Mon, 23 Mar 2015 14:00:08 +0100"
				},
				{
					"sha": "f94901c6097f7172b89c58417e99482192deff82",
					"message": "Support-to-make-wysiwyg-field-value-sanitizing-enablable-by-configuration",
					"author": {
						"name": "Benjamin",
						"email": "benjamin.ihrig@gmail.com"
					},
					"date": "Mon, 23 Mar 2015 13:48:33 +0100"
				},
				{
					"sha": "d02f11c90f5dd9ea0d6110846e62faf4f710b2c4",
					"message": "Use-explicit-variable-name",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 21:26:13 +0100"
				},
				{
					"sha": "8edb31e3af7c0477c7980effa44c59b512a5fbac",
					"message": "Merge-pull-request-334-from-vasiakorobkin-bugix_identity_field_edit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 21:25:52 +0100"
				},
				{
					"sha": "89f29991f87ecd49fec23be042dae4d8155d2777",
					"message": "Merge-pull-request-342-from-vasiakorobkin-uneditable_reference",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 17:44:03 +0100"
				},
				{
					"sha": "d8c9e612b30b7593fc94a449046d6f4589e179c6",
					"message": "Merge-pull-request-360-from-marmelab-clean-build-task",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 18 Mar 2015 16:52:59 +0100"
				},
				{
					"sha": "27602c16ac435f0f624ca04a1028c65b7a4c36ec",
					"message": "fix-build",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 17 Mar 2015 09:48:08 +0100"
				},
				{
					"sha": "18724a4044636ef0bdce683c27eeab45b54bff05",
					"message": "Rebuild-with-latest-changes",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 17 Mar 2015 09:13:53 +0100"
				},
				{
					"sha": "2e081318da64e0467b9f72be23a9edc90186a1f8",
					"message": "Better-clean-of-ng-admin-build",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 17 Mar 2015 09:04:41 +0100"
				},
				{
					"sha": "ff9671d857805d3eb6b092792e19baa3102b81aa",
					"message": "Merge-pull-request-359-from-marmelab-numeral",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 17 Mar 2015 08:53:46 +0100"
				},
				{
					"sha": "587fd2c13cb3be1cdb82c55d5ac03f629cce6650",
					"message": "Add-NumberField.format-relying-on-numeraljs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 Mar 2015 07:52:55 +0100"
				},
				{
					"sha": "c7dd9a484150703a951042bcf10650be16d09b9c",
					"message": "Fix-missing-icons",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 16 Mar 2015 11:37:44 +0100"
				},
				{
					"sha": "6484162af75e9e804e04d1fc05b6ad07c9f6507b",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 16 Mar 2015 10:44:33 +0100"
				},
				{
					"sha": "0086b082cca22739d8e5fb3ffaf9cef533dbec7f",
					"message": "Merge-pull-request-357-from-marmelab-add_option_to_file_field",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 16 Mar 2015 09:49:17 +0100"
				},
				{
					"sha": "191212be562bd1f31cafc75c08918c00e72e5b03",
					"message": "add-option-to-filefield-to-recovering-the-serverside-filename",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 16 Mar 2015 09:04:01 +0100"
				},
				{
					"sha": "b71d686ec268287d0166565ddfe2dc8dc6bda0b8",
					"message": "v3-fix-.editable-false-on-reference-type-field-in-EditView",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@taxasoftware.com"
					},
					"date": "Sun, 15 Mar 2015 18:48:41 +0300"
				},
				{
					"sha": "3eff936de9149af9b6565813634bd86a2bdf93c9",
					"message": "Readd-build-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 12 Mar 2015 09:59:02 +0100"
				},
				{
					"sha": "ca7af35de805fde8b632fee2038570690f841ce1",
					"message": "Merge-pull-request-356-from-marmelab-backward_compatibility",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 12 Mar 2015 09:55:31 +0100"
				},
				{
					"sha": "2be055ab5122a40f0517f28311263250ed2b8f95",
					"message": "Don-t-depreciate-NgAdminConfigurationProvider-proxy-methods",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 12 Mar 2015 09:43:56 +0100"
				},
				{
					"sha": "96c9e4bde66a2d3b198178967914ea82f6748fde",
					"message": "Update-README-and-UPGRADE-files",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 11 Mar 2015 17:50:46 +0100"
				},
				{
					"sha": "e9a2e2a7e0c4aa1a24c174cb91f7ab5897640022",
					"message": "Fix-issue-with-perPage",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 11 Mar 2015 14:15:59 +0100"
				},
				{
					"sha": "8733d41f1936cad5001d460e546b4151b29c3483",
					"message": "Add-proxy-method-to-ConfigurationProvider-for-BC",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 11 Mar 2015 09:46:28 +0100"
				},
				{
					"sha": "209087dafec1ae460a26c5bd288f5278e6554e80",
					"message": "Fix-build-process",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 11 Mar 2015 09:12:19 +0100"
				},
				{
					"sha": "76174e545cbbed8d68da38462031b340b24bc240",
					"message": "Fix-forgotten-field-type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 17:33:06 +0100"
				},
				{
					"sha": "e21f9f6fd075948f9bf5931105e6a67b772c4082",
					"message": "Update-DI-for-AdminDescription",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:59:57 +0100"
				},
				{
					"sha": "699a7042b14b65162e0afce668bde5d79dfbf6f7",
					"message": "Fix-wysiwyg-stripTags-in-blog-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:56:27 +0100"
				},
				{
					"sha": "e8c5c32ae9964f04293785ade3028c49cd47e1b6",
					"message": "Merge-pull-request-353-from-gitter-badger-gitter-badge",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:50:27 +0100"
				},
				{
					"sha": "b873f1095c740bad130bbfd146e5a2c8ac7323c7",
					"message": "Merge-pull-request-354-from-marmelab-es6_cleanup",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:50:16 +0100"
				},
				{
					"sha": "844af09629703909d023faf844ccb6f42a76db40",
					"message": "Merge-pull-request-355-from-marmelab-timezone_travis",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:49:55 +0100"
				},
				{
					"sha": "735014b9030003dd0213df27e261529665e04bda",
					"message": "Fix-test-on-maDateField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:29:01 +0100"
				},
				{
					"sha": "d9e2e601a284811b9065a3c0d3b188c24573c696",
					"message": "Change-Travis-timezone",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:24:28 +0100"
				},
				{
					"sha": "40e6d79b41f0c776cdb10e92acb707e60d7c419c",
					"message": "Cleanup-after-ES6-refactoring",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 15:19:32 +0100"
				},
				{
					"sha": "b701dfc6bf4e64b502ee9568eeed29b08ac2891f",
					"message": "Added-Gitter-badge",
					"author": {
						"name": "The Gitter Badger",
						"email": "badger@gitter.im"
					},
					"date": "Tue, 10 Mar 2015 12:50:20 +0000"
				},
				{
					"sha": "a8f0a451c6459f126a855e7f0bbf137a77356d14",
					"message": "Remove-outdated-elements",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 13:34:12 +0100"
				},
				{
					"sha": "b4365985f2787b6b9a4b1777539e97f0b02cb89c",
					"message": "Merge-pull-request-330-from-marmelab-es6",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 13:22:03 +0100"
				},
				{
					"sha": "984398d8f2e6dda68d5ec63ead9041a211a28683",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 9 Mar 2015 14:18:28 +0100"
				},
				{
					"sha": "f57da4172eac3d023fd043b7b4695779df72901d",
					"message": "Code-review",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 9 Mar 2015 13:59:20 +0100"
				},
				{
					"sha": "ef41bc1269b46164703b2404a777f1ab047d7d69",
					"message": "Create-an-Angular-NgAdminConfigurationFactoryProvider",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 17:53:45 +0100"
				},
				{
					"sha": "8ae6d873ddc3794b0168cdc4c5d436cb7d34acc9",
					"message": "Fix-Protractor-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 16:15:15 +0100"
				},
				{
					"sha": "e6ac1fe98ccdcd6bc381cc8c23c8e4b33394b0b2",
					"message": "Add-mocha-to-Grunt",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 15:21:04 +0100"
				},
				{
					"sha": "9f19f5ed58cbb28c00932a04a6c0c845352ba86f",
					"message": "Fix-Karma-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 12:11:49 +0100"
				},
				{
					"sha": "67b9b1abeb4d7a9a8704e85c26f36be68e61721d",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 09:55:22 +0100"
				},
				{
					"sha": "30e18fa367d83d5616c0fd7c8630f8b55b0c8a37",
					"message": "Fix-some-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 18:20:23 +0100"
				},
				{
					"sha": "17312495a17b1b77115207f8b39b55bd7efb863b",
					"message": "Add-configuration-build-into-Grunt",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 16:40:24 +0100"
				},
				{
					"sha": "11fed537ea9ceb8d4d8c7d8e76685f340d187cd8",
					"message": "Fix-ES6-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 14:41:18 +0100"
				},
				{
					"sha": "e472743735fb6cf2072d8be417fdaf9e22619699",
					"message": "Remove-obsolete-code",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 12:03:10 +0100"
				},
				{
					"sha": "6b38ed2b7326a2b3db18b3d2865a70c21d0566ae",
					"message": "Use-core-js-polyfill",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 11:35:49 +0100"
				},
				{
					"sha": "c8f0d7eea8c4a2b90df667aad924c4b96edf8ba2",
					"message": "Add-back-detail-links",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 10:14:27 +0100"
				},
				{
					"sha": "bd99fa74788dc3eed9f5e3c0e48bdc033ad00be6",
					"message": "Fix-show-view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 09:42:15 +0100"
				},
				{
					"sha": "c233f88218eb7033b535c1358702720ab6062a9f",
					"message": "Fix-comment-creation-view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 Mar 2015 09:38:31 +0100"
				},
				{
					"sha": "f00227cc0980d8f5a08e52d9b418d1f089e050e1",
					"message": "Fix-deletion-view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 3 Mar 2015 19:14:41 +0100"
				},
				{
					"sha": "fd5cc5c86fc0c3674f1a64e4be111d77e5ee7ad6",
					"message": "Fix-edition-view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 3 Mar 2015 18:50:19 +0100"
				},
				{
					"sha": "d3306dbebb3cb37da436dbde8815315159e4a779",
					"message": "Fix-creation-view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 3 Mar 2015 15:27:39 +0100"
				},
				{
					"sha": "2b53a08b883306b09ed7d9c1d120fcb98efe7979",
					"message": "Fix-reference-fields-on-list-view",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 3 Mar 2015 11:56:47 +0100"
				},
				{
					"sha": "4dc28505f8e8b7da09ca6588fadad44bad242b86",
					"message": "Start-migrating-some-classes-to-ES6",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 26 Feb 2015 09:08:27 +0100"
				},
				{
					"sha": "b23d2bd4e233e389b3c9da9f1ffdbc95f4259dec",
					"message": "Merge-pull-request-351-from-marmelab-number_column",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 9 Mar 2015 10:34:40 +0100"
				},
				{
					"sha": "c8960a4182073a866d1230b0aeed10f5cfe4d84b",
					"message": "v2-fix-.editable-false-on-reference-type-field-in-EditView",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@taxasoftware.com"
					},
					"date": "Sat, 7 Mar 2015 13:21:56 +0300"
				},
				{
					"sha": "ecde8ba1339476640f9c437bd911b81451a48d89",
					"message": "Merge-pull-request-339-from-marmelab-ma-filtered-list-button",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 22:36:09 +0100"
				},
				{
					"sha": "9d4c285c253f9b195b5e3d85d26c755a4a7e1f29",
					"message": "ignore-assets-file-in-blog-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 18:26:09 +0100"
				},
				{
					"sha": "b5b07d9e0ab01f4367f2bad8a6115c96500712d5",
					"message": "Add-mention-of-parameter-in-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 18:25:05 +0100"
				},
				{
					"sha": "7d8e98eaed2b8dc702969af56be992442c97aa7f",
					"message": "Number-field-can-now-set-fractionSize",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 18:22:12 +0100"
				},
				{
					"sha": "009cb9204c1c781367bf96b58c3b3b2e2631b305",
					"message": "Use-object-for-filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 16:56:32 +0100"
				},
				{
					"sha": "cb705d63bfca038628b9559734f065e14a88e185",
					"message": "Merge-pull-request-348-from-marmelab-date_timezone",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 14:30:46 +0100"
				},
				{
					"sha": "03712dbf1e5d0a1bf732faf5b6681d4cda082950",
					"message": "Fix-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Mar 2015 12:43:53 +0100"
				},
				{
					"sha": "53ebd28db00e4c909ac812a54e70faba3fd7bb5f",
					"message": "Fix-wrong-factory-name",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 14:56:08 +0100"
				},
				{
					"sha": "4a74ad46f7e3bd6dee29187019b2739c8562c086",
					"message": "Introducing-datetime-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 14:51:08 +0100"
				},
				{
					"sha": "50129b8efced8bf1b7c6f426a83159daba4efd84",
					"message": "Merge-pull-request-347-from-marmelab-example_date",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 09:28:54 +0100"
				},
				{
					"sha": "f46956d22698cdc9c3cfa9cb7b508d3bdef043c5",
					"message": "Fix-date-sent-to-json_server-closes-345",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 08:34:53 +0100"
				},
				{
					"sha": "10608f3971091c253f5e4d6f4d35b07967720022",
					"message": "Merge-pull-request-340-from-vasiakorobkin-404_webfonts",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 07:41:40 +0100"
				},
				{
					"sha": "e71f5b788d832bc3073bcc08f95d832ebc7b1dc8",
					"message": "Document-link-to-prefiltered-list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Mar 2015 17:41:45 +0100"
				},
				{
					"sha": "f3719daa7113f284123c0f6f40a5e20b32ece899",
					"message": "fix-404-error-for-fontawesome-webfont-when-running-make-run",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@taxasoftware.com"
					},
					"date": "Tue, 3 Mar 2015 16:24:17 +0300"
				},
				{
					"sha": "e8ec7ab2b6ec32ec5c39fa750053dcd45e29026a",
					"message": "Fix-.editable-false-on-reference-type-field-in-EditView",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@taxasoftware.com"
					},
					"date": "Tue, 3 Mar 2015 17:35:08 +0300"
				},
				{
					"sha": "e7f7cbdec964211342a97c01130c6d0836674573",
					"message": "Add-ma-filtered-list-button-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Mar 2015 10:35:00 +0100"
				},
				{
					"sha": "aae5145fc2b10d2d92ec622fa21f7b1def37601d",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Mar 2015 18:34:01 +0100"
				},
				{
					"sha": "a534d4401ba72c98cec40797ec3d0ca2b788302e",
					"message": "Fix-pagination-directive-usage-in-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Mar 2015 18:32:41 +0100"
				},
				{
					"sha": "4962426bafb593fbf9595b983e509a19fe8b6fc7",
					"message": "Merge-pull-request-298-from-marmelab-pagination_test",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 2 Mar 2015 14:41:25 +0100"
				},
				{
					"sha": "9a538df8267c2a1a0f8fb5a7366ca554d5f394da",
					"message": "Merge-pull-request-327-from-marmelab-factory_3",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 2 Mar 2015 14:37:20 +0100"
				},
				{
					"sha": "c6b7af8e4e541575da5a2df1f922f68c8e2692f9",
					"message": "Add-pagination-e2e-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Mar 2015 23:51:55 +0100"
				},
				{
					"sha": "0ffd5cde4d84a7339334e801775b6678240385cc",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Mar 2015 23:26:14 +0100"
				},
				{
					"sha": "0653e4c83a9f58b3459495c1ac7e03e74861f7d9",
					"message": "Reduce-the-number-of-buttons-in-the-pagination-9-at-most",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Mar 2015 23:12:44 +0100"
				},
				{
					"sha": "e0698a0d5fcaa3c79e5769872fd4d8c2d9edcc70",
					"message": "Move-infinite-pagination-to-a-standalone-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Mar 2015 22:45:50 +0100"
				},
				{
					"sha": "ee52ddc75cc84667eae83cd0dc8de7a077f56158",
					"message": "Move-setPage-logic-from-pagination-directive-to-list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Mar 2015 21:58:47 +0100"
				},
				{
					"sha": "9dd1a1a86cb55bb741494ed0bf58ff76d472205d",
					"message": "Fix-pagination-buttons-markup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 1 Mar 2015 14:57:55 +0100"
				},
				{
					"sha": "237c7fb3a52dc7a98938167bb449dc536c5d060c",
					"message": "Make-paginatino-directive-isolated-from-location",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 27 Feb 2015 18:53:47 +0100"
				},
				{
					"sha": "d14e4c21dfb049ee53cd03e2a3beb5e9de0741a7",
					"message": "Bootstrap-tests-on-datagrid-pagination",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 6 Feb 2015 14:31:42 +0100"
				},
				{
					"sha": "4d44644decf4b8223e26bcd34e0660a50421cfbf",
					"message": "Merge-pull-request-336-from-easel-missing-requires",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 27 Feb 2015 21:05:39 +0100"
				},
				{
					"sha": "005359df6f67683bfe9104a1f37f3553b0c1e48a",
					"message": "Add-missing-require-parameters",
					"author": {
						"name": "Erik LaBianca",
						"email": "erik.labianca@gmail.com"
					},
					"date": "Wed, 25 Feb 2015 22:01:06 -0500"
				},
				{
					"sha": "0945d2ccb4cb392e3ec7e1eee26a7c53fbbeac30",
					"message": "Fix-typo",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 27 Feb 2015 18:34:52 +0100"
				},
				{
					"sha": "65c5207112aa030c69bd13bc59bda4b0d069758b",
					"message": "fix-Edit-identity-primary-key-field-332-issue-on-GitHub",
					"author": {
						"name": "Vasia Korobkin",
						"email": "vasyakorobkin@taxasoftware.com"
					},
					"date": "Fri, 27 Feb 2015 16:57:44 +0300"
				},
				{
					"sha": "c9fcfec71ccc8beb7325a79fa202cc72049efa21",
					"message": "Now-that-0.6-is-out-make-it-clear-that-BC-is-broken",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 27 Feb 2015 12:11:08 +0100"
				},
				{
					"sha": "4cf6e253f425e2b6cab986b8aa4298d6a3324b59",
					"message": "Switch-maColumn-to-imperative-style",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 17:32:58 +0100"
				},
				{
					"sha": "c3bbf537ec7043ebd579671ae8c659fac08700fb",
					"message": "Expand-config-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 17:08:30 +0100"
				},
				{
					"sha": "2b89fe234674a5097e83e95ed5e7910f768e011a",
					"message": "Emphasize-on-BC-break",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 16:33:57 +0100"
				},
				{
					"sha": "3785d022163e44692d7b42b17780197a10d2dd92",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 16:33:46 +0100"
				},
				{
					"sha": "c70e8c11ec812f1a8a5fbb06c69419d47bd24a2a",
					"message": "Remove-needless-method-added-by-Configurable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 09:21:23 +0100"
				},
				{
					"sha": "352c6f5818e93c573e1503dc268ad350e8b06432",
					"message": "Move-file-field-logic-to-subclass",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 09:19:33 +0100"
				},
				{
					"sha": "a8a4004bf3377b7d63365b4293aa232237eb95cd",
					"message": "Move-Reference-field-types-to-subclasses",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 09:15:40 +0100"
				},
				{
					"sha": "23dd42b299f84f41a1332088ce96f1d8223b9cc1",
					"message": "Move-choice-and-template-field-type-logic-to-subclasses",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 09:04:27 +0100"
				},
				{
					"sha": "525f6d10b94118ab26235382172c17b69c7de670",
					"message": "Move-date-and-wysiwyg-field-logic-to-subclasses",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 08:52:59 +0100"
				},
				{
					"sha": "b3c7b1afc6a52651df6ba4454d8461620339b4da",
					"message": "Bootstrap-0.7.0",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 Feb 2015 15:14:24 +0100"
				},
				{
					"sha": "c39449b6e1d0dcf66251829ba86c0d58a12bd5e6",
					"message": "Prepare-0.6.0",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 Feb 2015 15:13:28 +0100"
				},
				{
					"sha": "2632b70639c348795ba50e5d8e22bf95e4608f3a",
					"message": "Merge-pull-request-325-from-marmelab-factory_2",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 12:16:19 +0100"
				},
				{
					"sha": "64d0f6a7b8a2e2c8bb014b1d9b2df4ef2460cc9d",
					"message": "Merge-pull-request-313-from-marmelab-mixed_actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Feb 2015 22:53:24 +0100"
				},
				{
					"sha": "5337a6bfc5530080cde5dffa22b0cf1b65586851",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Feb 2015 22:51:34 +0100"
				},
				{
					"sha": "713ead513573cac205501a0271558218a390f3e6",
					"message": "allow-actions-and-list-actions-to-accept-template-in-array",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 13 Feb 2015 13:50:47 +0100"
				},
				{
					"sha": "b883059517f3217bdc0fd2d548d1042630d917a0",
					"message": "Merge-pull-request-323-from-marmelab-reference_filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Feb 2015 22:47:34 +0100"
				},
				{
					"sha": "8e571ac43ffc285a41854470afd0168925fd955a",
					"message": "Document-custom-types",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Feb 2015 22:44:38 +0100"
				},
				{
					"sha": "031612f4e7d793fa742081e3450fda0228a14bf9",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Feb 2015 22:07:52 +0100"
				},
				{
					"sha": "9500530c935d6aeeab57dbbc6026c1d64f6c23fb",
					"message": "Move-crud-config-to-a-dedicated-config-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 23 Feb 2015 21:58:05 +0100"
				},
				{
					"sha": "fcd51528f26a8b3807f8e429626d174c580bed46",
					"message": "Make-filters-use-fieldView-factories",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Feb 2015 13:56:37 +0100"
				},
				{
					"sha": "f1d2ce1b3a1d5e10fa885bb7f3a09ef03008d3b2",
					"message": "ma-password-columns-doesn-t-make-sense-removing-it",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Feb 2015 00:33:14 +0100"
				},
				{
					"sha": "09ba18d90dfb04c948dac1847b169ca6cd2c2a25",
					"message": "Edition-and-creation-view-now-use-fieldViews-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Feb 2015 00:28:03 +0100"
				},
				{
					"sha": "f1a1fab61934f15a96b963cba0743cf277df05cd",
					"message": "Add-fileFieldView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 23:52:24 +0100"
				},
				{
					"sha": "1c061f6892ac348879046455616e87615aff43c2",
					"message": "Introduce-FieldViews-to-allow-overriding-views-per-type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 23:37:29 +0100"
				},
				{
					"sha": "91305b14ea92dcbdd460bfce59720ae2d5e9974d",
					"message": "Fields-are-now-registered-and-can-be-overridden",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 12 Feb 2015 17:19:26 +0100"
				},
				{
					"sha": "6269322f3544e07a86e73a1f3ac0d5b5337e40a8",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Feb 2015 17:12:43 +0100"
				},
				{
					"sha": "ce2d0f49076d18f77425d38d1c5629219dfe1222",
					"message": "Merge-pull-request-288-from-marmelab-date_format_display",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 20 Feb 2015 17:09:19 +0100"
				},
				{
					"sha": "3874db8f6416b52499dd945e2d577e86f6eb59b3",
					"message": "refactor-parse-to-be-a-function-instead-of-a-date-filter-format",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 6 Feb 2015 14:21:25 +0100"
				},
				{
					"sha": "a4865e5d081b815734cd36d2834d686e12c94a8c",
					"message": "rename-format-to-parse-and-formatDisplay-to-format",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 5 Feb 2015 13:54:20 +0100"
				},
				{
					"sha": "8efeeac1becab362084aa2e4985aff7896cd633a",
					"message": "update-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 4 Feb 2015 14:39:15 +0100"
				},
				{
					"sha": "1e3e0661c60a83445d4ea539946c05eee6aa1a03",
					"message": "add-displayFormat-option-for-date-field-to-allow-to-separate-entity-date-format-from-displayed-format",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 4 Feb 2015 14:32:46 +0100"
				},
				{
					"sha": "7180fe3e8d687e45f7476e17b15f8081fc22e5f3",
					"message": "Set-Reference-field-filters-config-property-default-to-false",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 20:19:44 +0100"
				},
				{
					"sha": "0f3badc6fb15ff95aa3c965ed1f0042cceb18aae",
					"message": "Add-possibility-to-filter-references-results",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 18:16:12 +0100"
				},
				{
					"sha": "313fe12a4e4a4359b67abf939f87ce4bb4b2fbd4",
					"message": "Merge-pull-request-321-from-marmelab-dashboard_panel_title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 13:59:10 +0100"
				},
				{
					"sha": "601bc9cb9297e5cc29db086022c4008f8eedf56e",
					"message": "Use-entity-label-when-no-dashboard-title-is-provided",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 10:45:11 +0100"
				},
				{
					"sha": "f53dbfb832491399c4545c29ca6dda943dac12a0",
					"message": "Merge-pull-request-319-from-easel-missing-require",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 09:00:02 +0100"
				},
				{
					"sha": "bd8bb2d70df0c4add1a110f0522c55097635a10a",
					"message": "Add-missing-require-parameter-to-NgAdminConfiguration",
					"author": {
						"name": "Erik LaBianca",
						"email": "erik.labianca@gmail.com"
					},
					"date": "Thu, 19 Feb 2015 00:37:13 -0500"
				},
				{
					"sha": "e2155db7fd6e3dd538d65a1fdd0ae81d5ddebfe3",
					"message": "Fix-typo",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 16 Feb 2015 15:52:31 +0100"
				},
				{
					"sha": "2d2516b64adf7f6d305804f570f4fa54695c8468",
					"message": "Merge-pull-request-305-from-marmelab-list_actions_edit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 12 Feb 2015 22:06:21 +0100"
				},
				{
					"sha": "fcb0636b06a85b7ceb5ae9d2ffa4a40fbdb8e707",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 12 Feb 2015 15:25:28 +0100"
				},
				{
					"sha": "f507267dc7e421d8549338c7815029ac493e9392",
					"message": "Merge-pull-request-307-from-marmelab-factory",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 12 Feb 2015 14:57:11 +0100"
				},
				{
					"sha": "746094f686d75682594bbe92476ab2e9bb5acaa1",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 11 Feb 2015 09:52:55 +0100"
				},
				{
					"sha": "8e6e0f83ff19179bd1d69851f1258006c5c78643",
					"message": "Add-upgrade-guide",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 11 Feb 2015 08:42:28 +0100"
				},
				{
					"sha": "020c3dcad0f47728be0b3106e17d2dc308397c3f",
					"message": "Update-documentation-for-factories",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 11 Feb 2015 08:30:43 +0100"
				},
				{
					"sha": "f4af51edc539ecac5c3596384c27e7586d1b8d50",
					"message": "Application-uses-factory-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 11 Feb 2015 08:04:46 +0100"
				},
				{
					"sha": "a72ec7138cf7d44c00ca68c7db8e0092845de297",
					"message": "References-use-factory-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 11 Feb 2015 08:03:13 +0100"
				},
				{
					"sha": "233ae64353f9623bbcda598543b464be5325efc5",
					"message": "introduce-factories-for-entity-and-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 11 Feb 2015 07:57:03 +0100"
				},
				{
					"sha": "e922c6da083c49754b4d25e648ffcb73bd3e917d",
					"message": "Merge-pull-request-293-from-Xennis-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Feb 2015 22:53:18 +0100"
				},
				{
					"sha": "1dd4f47d828d894684be86c31cb8fc88209caf8b",
					"message": "Merge-pull-request-303-from-marmelab-file_field_fix",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Feb 2015 22:31:07 +0100"
				},
				{
					"sha": "d8be43d1aa7a1f08334235bd4f016a06d21fd06b",
					"message": "Merge-pull-request-304-from-marmelab-fix_list_actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Feb 2015 22:19:31 +0100"
				},
				{
					"sha": "daee44b3218bedb7fd827c64ec2ad270510cc05b",
					"message": "Allow-listActions-in-ReferenceList-to-show-in-editionView-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Feb 2015 22:18:11 +0100"
				},
				{
					"sha": "2f515362ece39aa5b38cf31d2c05fe762b629e12",
					"message": "fix-listActions-buttons-attributes-binding",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 10 Feb 2015 17:02:44 +0100"
				},
				{
					"sha": "bfb63737d967fe628580defe3ac28aeba2a64b9f",
					"message": "Remove-file-field-reqquirement-on-edition-and-remove-file-upload-progress-bar-on-end",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 10 Feb 2015 16:36:28 +0100"
				},
				{
					"sha": "21a884412e2a80d1a83a420b78422259972ba3bb",
					"message": "Update-doc-of-the-description-field",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Thu, 5 Feb 2015 09:01:27 +0000"
				},
				{
					"sha": "4f0860b775145c6fadcc7320c4ceb0415166782b",
					"message": "Compile-description-field",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Thu, 5 Feb 2015 08:55:00 +0000"
				},
				{
					"sha": "3ffdcfd7e6332acec04d132698d3946a1c6be321",
					"message": "Change-screencast",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 4 Feb 2015 14:58:33 +0100"
				},
				{
					"sha": "fc8d95431f1e0a88c81784a0ccc39d049c556086",
					"message": "Init-v0.6.0",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 4 Feb 2015 14:45:51 +0100"
				},
				{
					"sha": "dcfa77c7584839bf4504e4e808732ca80a58e7b7",
					"message": "Publish-v0.5.0",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 4 Feb 2015 14:44:53 +0100"
				},
				{
					"sha": "48a79e164e2cd43c5842a4a11fc6162b18136376",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 4 Feb 2015 14:02:17 +0100"
				},
				{
					"sha": "c321bdd68ba9e1062fef35742617faf15fa2e544",
					"message": "Merge-pull-request-282-from-marmelab-create_validation",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 4 Feb 2015 13:51:20 +0100"
				},
				{
					"sha": "064a17979a5d3b209d32502f259f152e900be505",
					"message": "Merge-pull-request-285-from-marmelab-all_filter_types",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 23:20:47 +0100"
				},
				{
					"sha": "a4e8c73ed95effb46c48b6ccfea9563220490455",
					"message": "Finish-refactoring-of-FormController",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 22:24:08 +0100"
				},
				{
					"sha": "ae5b3446d29fa22ff1a217b7329ffbd03eb1eb63",
					"message": "Refactor-form-field-validation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 22:11:44 +0100"
				},
				{
					"sha": "1ecedcc8f691c1fde6433be4b992ad2de0ecbf15",
					"message": "Add-more-field-types-to-filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 18:08:09 +0100"
				},
				{
					"sha": "a38efd20164d7080723525a567a103502fe4d1fe",
					"message": "Fix-form-validation-in-create-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 13:01:18 +0100"
				},
				{
					"sha": "fcb7666f1a93f0321ccfd2d86cdf0711082d0ce5",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 10:51:44 +0100"
				},
				{
					"sha": "fc6a7963fae1df62f9c68205e26329b4f7e1d7bc",
					"message": "Merge-pull-request-277-from-marmelab-infinite_pagination_filter",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 3 Feb 2015 08:01:03 +0100"
				},
				{
					"sha": "ee8a51cef175afbac4f588ac7a0e5a087b94ce58",
					"message": "Merge-pull-request-276-from-marmelab-dashboard_link",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 3 Feb 2015 00:15:08 +0100"
				},
				{
					"sha": "45c2cd7fccfed20a7af3c41ddc06ce960e8e3a20",
					"message": "Fix-infinite-pagination-not-keeping-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 23:22:23 +0100"
				},
				{
					"sha": "2e3545773121f57913cfee66ccaab843e1032d2f",
					"message": "Dashboard-panel-titles-now-link-to-list-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 22:13:18 +0100"
				},
				{
					"sha": "e012adb6e16a3a2df8c2379c6c3cedb147a21f31",
					"message": "Update-API-mapping-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 21:30:26 +0100"
				},
				{
					"sha": "c5e5a62ac3a1134f59c3b8c6ccb9ae97f30ca432",
					"message": "Merge-pull-request-274-from-Xennis-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 21:26:55 +0100"
				},
				{
					"sha": "725750e79f8fcc0113e40361598b8d07b352c418",
					"message": "Merge",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Mon, 2 Feb 2015 18:13:14 +0100"
				},
				{
					"sha": "1364566885ae8b2c55023acb4013cadfe64082fa",
					"message": "Merge-pull-request-270-from-marmelab-referenced_list_actions",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 17:11:58 +0100"
				},
				{
					"sha": "23755442cf786c5802788805adba70b461c45902",
					"message": "Merge-pull-request-256-from-marmelab-file_field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 17:08:20 +0100"
				},
				{
					"sha": "885efa242fb1c5bd6a71da11f17d70a5e8292f2d",
					"message": "Add-mention-of-file-field-in-the-README",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 2 Feb 2015 13:53:43 +0100"
				},
				{
					"sha": "b1393e3f7583931a38f7ece37d27233df4091749",
					"message": "Move-request-interceptor-paragraph-to-section-entry-format-and-remove-the-paragraph-about-the-response-interceptor",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Mon, 2 Feb 2015 13:14:36 +0100"
				},
				{
					"sha": "b46fce690fbc8d01f8953abc8fe21201dfac97f5",
					"message": "Diplay-all-uploaded-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 15:37:03 +0100"
				},
				{
					"sha": "e6fc405df938b777779699af32e3939c7b160840",
					"message": "Fix-multiple-and-accept-parameters-was-not-working-for-file-field",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 28 Jan 2015 23:45:04 +0100"
				},
				{
					"sha": "a26d1e6238991a0e931e15d77b1836e86eefe308",
					"message": "Remove-upload-multiple-option-from-default-because-it-does-not-work-for-now",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 28 Jan 2015 09:48:14 +0100"
				},
				{
					"sha": "a82c9e61ad735c607e928f1cf4848abc157adb40",
					"message": "Remove-usage-of-jQuery-plugin-and-add-progress",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 16:56:40 +0100"
				},
				{
					"sha": "1a6b0fb588b789f3ec7bfabb38c7d8be17dea401",
					"message": "Use-danialfarid-angular-file-upload",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 15:45:30 +0100"
				},
				{
					"sha": "aea3dcac08bef0ae229e736b54e53395ce848b8f",
					"message": "work-on-FormController",
					"author": {
						"name": "gregbiv",
						"email": "gregbiv@gmail.com"
					},
					"date": "Tue, 28 Oct 2014 18:52:12 +0600"
				},
				{
					"sha": "0403162c3cbfe4b828316a6e27ce85acda907c35",
					"message": "switched-to-different-file-uploader-to-remove-nested-dependencies-and-add-crud-control-for-uploads",
					"author": {
						"name": "gregbiv",
						"email": "gregbiv@gmail.com"
					},
					"date": "Fri, 24 Oct 2014 17:59:30 +0600"
				},
				{
					"sha": "ed5b1f42ab9ddcca458f500f9fb2ceba24f0db3d",
					"message": "prototype",
					"author": {
						"name": "gregbiv",
						"email": "gregbiv@gmail.com"
					},
					"date": "Fri, 24 Oct 2014 12:13:30 +0600"
				},
				{
					"sha": "45bc554dbff0442420b55c1c4fbb17ee6803b210",
					"message": "Problems-with-that-occour-in-272-and-also-I-had-this-problems-too.-It-s-common-that-an-API-returns-meta-information-and-so-on-so-I-thought-it-would-be-useful-to-add-it-to-the-documentation.-May-the-heading-name-is-not-choosen-well-and-you-pick-another-one",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Sun, 1 Feb 2015 18:37:41 +0100"
				},
				{
					"sha": "4bd1ede269a3c8ae5b6ea4b49c8cc79c2b672ee1",
					"message": "JSON-field-was-added-with-243",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Sun, 1 Feb 2015 18:33:52 +0100"
				},
				{
					"sha": "f61533bbc220b16d799b62f7d8ab72c85283b5bd",
					"message": "Allow-listActions-on-ReferencedList",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 31 Jan 2015 20:47:45 +0100"
				},
				{
					"sha": "cb22edb139e38870a6df9f0cf872cd09d120d86e",
					"message": "Merge-pull-request-268-from-marmelab-custom_pages",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 31 Jan 2015 10:52:17 +0100"
				},
				{
					"sha": "9c55a1c071cdd3d918fb37d1937599c0e46e30a6",
					"message": "Merge-pull-request-267-from-marmelab-filter_reset_page",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 31 Jan 2015 10:51:33 +0100"
				},
				{
					"sha": "ce7958e6e6bffa71c20f4a2fd9c21607d72208b6",
					"message": "Merge-pull-request-266-from-marmelab-reference_detail_disable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Jan 2015 20:55:07 +0100"
				},
				{
					"sha": "403042bb4c6f78bf8317b999585f1886bf4cb377",
					"message": "Added-example-and-documentation-about-adding-a-custom-page",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 30 Jan 2015 20:50:29 +0100"
				},
				{
					"sha": "694d82cf71630f2184e45fec114eec8d2bc5430e",
					"message": "Filter-form-now-reset-page-number-on-submit",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 30 Jan 2015 00:30:41 +0100"
				},
				{
					"sha": "c2c1ee8931b2f3e907a9fcdfaaa14fd3ac293443",
					"message": "Allow-isEditLink-to-disable-links-on-references",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 18:46:25 +0100"
				},
				{
					"sha": "3ec23419f92409e96567d2e6c9ccbb1d74ee3b67",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 16:07:38 +0100"
				},
				{
					"sha": "442442c162e58edc98803cd9a01a656263ec5c8b",
					"message": "Merge-pull-request-265-from-marmelab-edit_column",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 15:59:05 +0100"
				},
				{
					"sha": "287bdffaa2b9dfe78f53503b81547d58ffce233e",
					"message": "frallback-to-column-for-non-editable-fields-in-form",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 15:38:27 +0100"
				},
				{
					"sha": "cc52ee7ddc21caf77466694032e747806d1333b7",
					"message": "Merge-pull-request-264-from-marmelab-double_map",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 15:23:43 +0100"
				},
				{
					"sha": "1d4ccfae544ff6550ef252701909ae02b327073b",
					"message": "Fix-column-display-of-choice-field-type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 15:21:53 +0100"
				},
				{
					"sha": "06b9d8684821ce96fae0a763902a2239f8671d4b",
					"message": "Fix-map-being-called-twice-on-the-listView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 29 Jan 2015 15:06:51 +0100"
				},
				{
					"sha": "b9b22cb794a8f92b01b63352e1bbbf8dcb294995",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 21:13:47 +0100"
				},
				{
					"sha": "d92024d120f82666b39007a70cf3def2d2a397cd",
					"message": "Merge-pull-request-262-from-marmelab-fix_undefined_reference_many",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 21:12:08 +0100"
				},
				{
					"sha": "bf1d1fb2314412c70cc75dd15ee9b68c266e2aec",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 15:40:19 +0100"
				},
				{
					"sha": "ca28835002c266aabf1086298c992eb11c29b87c",
					"message": "Fix-Reference-identifiers",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 15:06:38 +0100"
				},
				{
					"sha": "b51ae80ceaa3305fbdfbb453dd0032c51d560dcc",
					"message": "Merge-pull-request-260-from-marmelab-CHANGELOG",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 00:32:25 +0100"
				},
				{
					"sha": "186bf41f887963781025af1baa0fb69e189fcdaf",
					"message": "Update-UPGRADE-0.5.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 00:31:30 +0100"
				},
				{
					"sha": "dbe9d66276ffafce9000858fff74d5eb9dcb65c8",
					"message": "Add-changelog",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 27 Jan 2015 00:23:20 +0100"
				},
				{
					"sha": "0d3e9a59c03c7b617952d8847e700888597f7b2d",
					"message": "Merge-pull-request-259-from-Xennis-fix_referencedlist_sorting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 23:30:00 +0100"
				},
				{
					"sha": "f9f4def6f174e5b615570db782920cd78d2fde43",
					"message": "Fix-the-sorting-of-ReferencedList-fields-in-the-showView.-254-commit-bc7745e54b6a1308d3b753fd6a65364bcbc1cc3f-wasn-t-enough-to-really-fix-it",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Mon, 26 Jan 2015 20:42:19 +0000"
				},
				{
					"sha": "807ebc5dcd92c2f7bb5ef31fb56d0acb0e48d2d1",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 16:28:47 +0100"
				},
				{
					"sha": "f7293164d885f2b489374215142952c67eda5c56",
					"message": "Merge-pull-request-257-from-marmelab-sb-markup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 16:19:56 +0100"
				},
				{
					"sha": "f41c9fdc98b5bcd854410bb8e94013d3bcda56b6",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 16:08:21 +0100"
				},
				{
					"sha": "d3890b67044e61d9a3ef12782faa988d8ff44a74",
					"message": "Cleanup-markup-to-adhere-to-the-sb-admin-standard",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 15:52:58 +0100"
				},
				{
					"sha": "7bac3bfb22b079a8e4d3dd767d33aa283717a550",
					"message": "Merge-pull-request-246-from-Xennis-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 14:54:44 +0100"
				},
				{
					"sha": "f82740bba95d4f6e4a0c56e3ad417a028e008c06",
					"message": "Merge-pull-request-254-from-marmelab-reference_field_order",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 14:30:00 +0100"
				},
				{
					"sha": "798d6b1f7c54204fc244cc7bb3debc6e28e65739",
					"message": "Merge-pull-request-243-from-marmelab-json_field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 14:29:15 +0100"
				},
				{
					"sha": "412d8a37acb06ff3a2887ab618155b71496c1e86",
					"message": "Add-functinoal-test-for-edit-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 14:21:43 +0100"
				},
				{
					"sha": "bc7745e54b6a1308d3b753fd6a65364bcbc1cc3f",
					"message": "Make-ReferencedList-sortable-in-showView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 13:55:02 +0100"
				},
				{
					"sha": "9b328f822c506d13a6370ac93ab79c6324d7fb18",
					"message": "Reference-field-now-has-the-correct-column-order-in-edition-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 26 Jan 2015 13:49:01 +0100"
				},
				{
					"sha": "7169005202911b62c9d8b2dbff0f66c49121ef1f",
					"message": "Merge-pull-request-252-from-megazoll-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 18:48:12 +0100"
				},
				{
					"sha": "c957e022d2c91e9200f9373879b084e7fcff8ecf",
					"message": "Fixed-a-typo-in-README",
					"author": {
						"name": "Vyacheslav Salakhutdinov",
						"email": "megazoll@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 17:34:53 +0300"
				},
				{
					"sha": "58f0b2fa794a410c758fcf3aed4bbd9ce0ad4500",
					"message": "Fix-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 15:19:58 +0100"
				},
				{
					"sha": "f2f90e6407b8879f66e810a65b39639de7aac557",
					"message": "Fix-glyphicons-not-properly-bundled",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 15:09:56 +0100"
				},
				{
					"sha": "cf696b34230e8fbab6490ebaf3d63c3a26240580",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 14:50:34 +0100"
				},
				{
					"sha": "40e4f52fb19762c164045981576d9196c54ab125",
					"message": "Merge-pull-request-251-from-marmelab-fix_referenced_list_fields_order",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 23 Jan 2015 14:49:09 +0100"
				},
				{
					"sha": "12d23b2984d9348af12d4ec0afa207288b4deece",
					"message": "Improve-documentation-of-detailLinkRoute-in-the-documentation",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Fri, 23 Jan 2015 10:01:09 +0000"
				},
				{
					"sha": "40ce7a4144633513043fa440a7a8b1f29f645f37",
					"message": "Remove-dead-code-and-update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 09:54:06 +0100"
				},
				{
					"sha": "afe0500546f544f282355cb861757871080de8d0",
					"message": "Move-json-validator-from-main-to-crud-module",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 01:52:45 +0100"
				},
				{
					"sha": "f5f153d66b894cfc1d2889019f09e930b78d5ec1",
					"message": "Add-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 21:13:16 +0100"
				},
				{
					"sha": "49ba870f26619203643cb5c8f8e5e7cc55fccca0",
					"message": "Fix-ReferencedList-field-order",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 20:49:35 +0100"
				},
				{
					"sha": "5e1f0b9457ccba137415aab50869e114fc417e96",
					"message": "Use-jsonlint-from-bower-and-fix-karam-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 18:24:07 +0100"
				},
				{
					"sha": "bf4da5331598ecebdf820b8ee02e974f73ac5260",
					"message": "Set-default-value-already-in-the-config-object",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Thu, 22 Jan 2015 16:00:04 +0000"
				},
				{
					"sha": "513b34670db4fe00375de1ea192a7b434da4d269",
					"message": "Add-json-column-use-codemirror-directive-for-json-field-and-add-form-validation",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 09:41:53 +0100"
				},
				{
					"sha": "74f3bdbdeb5c6a6a1d6f08e1c54977a87bb57c2c",
					"message": "Simple-json-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 08:20:02 +0100"
				},
				{
					"sha": "840da80389e4f7084ed27b275ea6fa72c2a99aa3",
					"message": "Merge-pull-request-248-from-marmelab-reference_per_page",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 13:42:14 +0100"
				},
				{
					"sha": "981fd6efd5c4e309eedd321925672a595c0eb92d",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 11:15:56 +0100"
				},
				{
					"sha": "bee10f79ab584423606fc5d1fb6a1c345418f68b",
					"message": "Allow-Embedded-datagrids-to-be-limited",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 22 Jan 2015 08:53:08 +0100"
				},
				{
					"sha": "00e0bf6c387d5d574b715282b52152260d17b936",
					"message": "Merge-pull-request-245-from-marmelab-datagrid_show_edit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 22:26:49 +0100"
				},
				{
					"sha": "8cc7ce31473cd265304a09c88d5239a9a4a78aee",
					"message": "Fix-link-in-Theming.md",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Wed, 21 Jan 2015 20:46:31 +0000"
				},
				{
					"sha": "6350074e71d203a7db0adc65287dddc182b4b68c",
					"message": "Fix-link-in-Theming.md",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Wed, 21 Jan 2015 20:44:42 +0000"
				},
				{
					"sha": "24f62c5963ccaa01f190ae64b48e171261500c84",
					"message": "Add-option-to-define-the-route-for-a-detail-linked-field",
					"author": {
						"name": "Xennis",
						"email": "code@xennis.org"
					},
					"date": "Wed, 21 Jan 2015 20:43:04 +0000"
				},
				{
					"sha": "d8db2d5c258f9d3708dec745da590a38dbf22e57",
					"message": "Fix-css-built-file",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 11:19:47 +0100"
				},
				{
					"sha": "9b600387251541191aa6cac3512def87e88eb4ce",
					"message": "Hotfix-add-limit-to-1000-for-referencedList-field-entries-in-edit-and-show-view",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 11:12:59 +0100"
				},
				{
					"sha": "cabc768fa53a86fc676b1b0b143f6c9998113461",
					"message": "Update-built-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 09:51:42 +0100"
				},
				{
					"sha": "5c44936d7d590e6f2fe65d9b94bf304858682ae0",
					"message": "Hot-fix-display-1000-entries-of-reference-field",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 09:47:17 +0100"
				},
				{
					"sha": "952fce225ca1dd43106d08b4ffc62f4650453de9",
					"message": "Fix-datagrid-in-show-view-fix-default-filter-param-on-datagrids-for-edit-and-show-view",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 09:28:00 +0100"
				},
				{
					"sha": "7a1f56c8e6fac537c46d44ade5f38d35658bc817",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 21 Jan 2015 08:45:03 +0100"
				},
				{
					"sha": "7749984414a8e2c9415fe00c134d4137efea3099",
					"message": "Merge-pull-request-237-from-marmelab-filter_reference",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 19:30:25 +0100"
				},
				{
					"sha": "1bfaba860626c5f7071cbe7360fd47d7abc423b8",
					"message": "Reduce-filter-select-size",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 13:26:53 +0100"
				},
				{
					"sha": "ab947f16719d0127c278411b905449c382f57578",
					"message": "Merge-pull-request-240-from-marmelab-ng-repeat_filter",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 13:54:25 +0100"
				},
				{
					"sha": "f526b22006d42fb98546115d486f3768367a8f90",
					"message": "Merge-pull-request-244-from-marmelab-custom_template",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 13:51:22 +0100"
				},
				{
					"sha": "a6901fa5e4b7fda30afb2874b4bce72b36af954d",
					"message": "Fix-protractor-test",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 15:26:12 +0100"
				},
				{
					"sha": "13a8816fe231a9cc92f9d340d4fc588c6e1e74a4",
					"message": "Fix-ShowController",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 23:26:36 +0100"
				},
				{
					"sha": "2597a8d4ec0fef8269bb6f604703eae9ded86679",
					"message": "Allow-overriding-the-main-template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 08:45:40 +0100"
				},
				{
					"sha": "e75cd0222d69afc635f777feba3e1964c3813d45",
					"message": "Merge-pull-request-242-from-Xennis-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 20 Jan 2015 08:28:27 +0100"
				},
				{
					"sha": "425d097653392aa6e05e53d4a9eb8ff4244448a8",
					"message": "Update-README.md",
					"author": {
						"name": "Xennis",
						"email": "Xennis@users.noreply.github.com"
					},
					"date": "Mon, 19 Jan 2015 20:41:18 +0100"
				},
				{
					"sha": "ee77df6dd93a4869e5cd1c2e5aee1ca3535c62c1",
					"message": "Merge-pull-request-233-from-marmelab-fix_reference_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 18 Jan 2015 20:05:33 +0100"
				},
				{
					"sha": "a96c86921f26bd5ec9242a92b861f68cfe3f93db",
					"message": "Fix-typo-in-FormController",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 23:15:07 +0100"
				},
				{
					"sha": "1a00613199ec0ce160751c7219c699326b280a57",
					"message": "Remove-a-test-on-maDatagrid-because-it-cannot-be-tested-here-anymore",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 18:39:01 +0100"
				},
				{
					"sha": "836d2937ba3196066df138ba312cd0e08c622d87",
					"message": "Avoid-using-filter-on-ng-repeat",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 18:03:03 +0100"
				},
				{
					"sha": "891d001be70f146f3d42076be3582652da9fe94e",
					"message": "Remove-uneeded-filter-created-View",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 13:02:40 +0100"
				},
				{
					"sha": "e63ae4c8779e9808c19efc827b4298ac2ad76ba6",
					"message": "Add-e2e-for-reference-filtering",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 16 Jan 2015 10:11:18 +0100"
				},
				{
					"sha": "c39f1e144230f8c06130347e257de7a7377153f7",
					"message": "Allow-ListView-filters-on-references",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 15 Jan 2015 16:42:50 +0100"
				},
				{
					"sha": "2338183dd3e6877977952b4dc0d2efbc9d43d7d3",
					"message": "Fix-getRawValues-params-order",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 15 Jan 2015 13:57:39 +0100"
				},
				{
					"sha": "ac9a4ddc56941b149e386087bb9197e56ca57dec",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 23:37:46 +0100"
				},
				{
					"sha": "1412dc27a287e60fa02c54265f399738deb12b1a",
					"message": "Merge-pull-request-222-from-marmelab-custom_error_messages",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 23:33:45 +0100"
				},
				{
					"sha": "6319aa82bdaed5771e5f42ec34162dc9a3a1f2f7",
					"message": "Merge-pull-request-232-from-marmelab-fix_infinite_handler",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 23:33:04 +0100"
				},
				{
					"sha": "a797047ef5c696a6cd34fc0ffddfd8c17ae1f06e",
					"message": "Remove-scroll-listener-on-infinite-pagination-destroy",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 22:51:34 +0100"
				},
				{
					"sha": "771e80ecbf595b22e375ffadf6ab6f3fb6069e00",
					"message": "Merge-pull-request-231-from-marmelab-list_sort",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 22:45:32 +0100"
				},
				{
					"sha": "fc5fa29e5d95a193cf744ecefb1932ca94ed9b21",
					"message": "Fix-filter-float-issue",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 22:41:47 +0100"
				},
				{
					"sha": "00e38f4b0e28924b8d35917378be0137038bb6c1",
					"message": "Readd-the-ability-to-customize-sort-per-entity",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 22:38:30 +0100"
				},
				{
					"sha": "60e3b7ea9976781df6bfccf2725e6a568d50b4a6",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 22:06:11 +0100"
				},
				{
					"sha": "095a006ff52456bebb513a8eb412c9fe85ae819b",
					"message": "Merge-pull-request-226-from-marmelab-examples",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 22:04:50 +0100"
				},
				{
					"sha": "0be66af1e8e42325fe2f94403fa788ef12ec829e",
					"message": "Reorder-Grunt-tasks",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 21:37:26 +0100"
				},
				{
					"sha": "ec2655de106dba42efe3695a1e40783a4b60b2c3",
					"message": "Fix-grunt-test-command",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 18:22:32 +0100"
				},
				{
					"sha": "9435d08bb854e56dd61eba17dfcf235d941988b6",
					"message": "Fix-Protractor-tests-on-Saucelabs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 13 Jan 2015 18:10:19 +0100"
				},
				{
					"sha": "02a81fc8bf89131015d70c917b83d07481da6d3d",
					"message": "Move-example-to-example-directory",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 13 Jan 2015 16:12:31 +0100"
				},
				{
					"sha": "67aabaad5053ecfa433902bdf8328f7187772405",
					"message": "Add-documentation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 12 Jan 2015 14:00:06 +0100"
				},
				{
					"sha": "0e735e8c9f1ec307a9ad6e454efc9cf1d0710330",
					"message": "Add-tests-for-app.getErrorMessageFor",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 12 Jan 2015 13:50:36 +0100"
				},
				{
					"sha": "4c1923e26e7a8cc94a36254fbc4be6f8a1ea8a4c",
					"message": "Allows-to-customize-error-messages",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 14:09:32 +0100"
				},
				{
					"sha": "0ecd29b27808df8463a152dc7530c0f527820be7",
					"message": "Merge-pull-request-223-from-marmelab-filters_in_list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 12 Jan 2015 16:59:49 +0100"
				},
				{
					"sha": "b92cbf2c646e05216971fcacb590c129aad19982",
					"message": "Quick-filters-are-now-simple-filters",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 11 Jan 2015 23:15:53 +0100"
				},
				{
					"sha": "dc4e076ea52cab0a15a864059a65e751b13122d0",
					"message": "Move-filters-from-filterView-to-listView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 18:06:25 +0100"
				},
				{
					"sha": "8c17af660770ea8353d988f1ec096972085f152f",
					"message": "Make-fields-generic-fix-bug-in-ReferencedList",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 17:33:26 +0100"
				},
				{
					"sha": "86fbfbfc5303ca004aa43c3e5cfb76894edb9868",
					"message": "Merge-pull-request-218-from-marmelab-strip_tags_wysiwyg_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 14:21:28 +0100"
				},
				{
					"sha": "648cd77743ddff42f49be7f24cf1b599222060dc",
					"message": "Strip-tags-in-list-wysiwyg-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 14:06:19 +0100"
				},
				{
					"sha": "1c7756b6a6cbc38b0ec818eb2b87e0c97c317d85",
					"message": "Merge-pull-request-221-from-marmelab-fix_dashboard_disable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 11:19:04 +0100"
				},
				{
					"sha": "64bf3be4b7b529e97ef26985dc74387a17af4a82",
					"message": "Fix-dashboardView.disable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 9 Jan 2015 09:11:33 +0100"
				},
				{
					"sha": "1d776b2314f1d62d0ea5120ad8cee8f92333e76e",
					"message": "Merge-pull-request-220-from-marmelab-fix_edit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 23:44:24 +0100"
				},
				{
					"sha": "0f88cb02bf4e667b3294ea5f61d3af808eed794b",
					"message": "Fix-edit-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 23:34:26 +0100"
				},
				{
					"sha": "54b23f9d4462074a33bc5635b9d14c3c8361ed01",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:59:05 +0100"
				},
				{
					"sha": "ac11daa22c02493184ef9e80606d5debf32c747e",
					"message": "Merge-pull-request-214-from-marmelab-rich_example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:58:06 +0100"
				},
				{
					"sha": "277992cda0732a2127ee52c57213a7281ccf377c",
					"message": "Tests-couldn-t-pass-that-way",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:49:49 +0100"
				},
				{
					"sha": "93f29c60ac723c80bab39b1379e42bbade1c97fe",
					"message": "Better-FieldCollection-detection",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:34:17 +0100"
				},
				{
					"sha": "edece49b3099258f59ba35aa3f97393089a70cba",
					"message": "Try-a-more-legitimate-way-to-determine-if-argument-is-array",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:16:46 +0100"
				},
				{
					"sha": "30f60d69f1a4d9affa485a9b083ecd796e864172",
					"message": "Force-protractor-tests-on-PR",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:08:05 +0100"
				},
				{
					"sha": "7709ac81e87346b7617c4b17f7e13b5be8295e48",
					"message": "Merge-pull-request-207-from-marmelab-datagrid_pagination_isolation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 22:02:01 +0100"
				},
				{
					"sha": "4b17a01107948a1d85898c9f3d6f0622f0f8306d",
					"message": "Improve-pagination-alignment-simplify-markup",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 21:54:43 +0100"
				},
				{
					"sha": "7649080c9cff95374653e5b021aaef46ffa8fadc",
					"message": "Fix-bug-on-one-way-binding",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 21:50:25 +0100"
				},
				{
					"sha": "dba046870c2c36ea9f87cab5c6a3aadf31675109",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 13:48:53 +0100"
				},
				{
					"sha": "349a94d4e5444024bc9a105b289c728435f462c9",
					"message": "Merge-pull-request-215-from-endel-patch-1",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 13:35:08 +0100"
				},
				{
					"sha": "8e064c72e479e1a344cc431a9814af1ef4a0c7d6",
					"message": "Document-View.fields",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 00:34:51 +0100"
				},
				{
					"sha": "1d1537d6372e273ef841caed84924675acea706f",
					"message": "Add-polish",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 00:30:10 +0100"
				},
				{
					"sha": "c96b974d1572d57a0b437d4e161c06f1b17f22a0",
					"message": "Improve-edition-and-showview-usability-by-adding-more-blank",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 00:29:39 +0100"
				},
				{
					"sha": "270c52ab1da272b7bb5fcbc32d89e7ef7ed88e26",
					"message": "Make-example-richer-fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 00:29:17 +0100"
				},
				{
					"sha": "1fb87d81f4b03b4869fed10065a73459fdc818ca",
					"message": "Add-View.fields-as-a-smart-setter-getter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Jan 2015 23:36:22 +0100"
				},
				{
					"sha": "31b379e3fca268602231c6d6ee796ffd5bc4d6f4",
					"message": "Improve-date-widget-alignment",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Jan 2015 23:03:38 +0100"
				},
				{
					"sha": "3fd69b0b4dbd31e74acfbdc53e1a13088a558ff8",
					"message": "Merge-pull-request-217-from-marmelab-build-dev",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 09:00:56 +0100"
				},
				{
					"sha": "3754049b4774f331f068df6748c5550fd748008a",
					"message": "Document-build-dev-make-command",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 8 Jan 2015 08:56:42 +0100"
				},
				{
					"sha": "3f71417647c44a68b5e9f67967430b73d544c8b0",
					"message": "retrieve-identifiers-before-getSingleApiCall-call",
					"author": {
						"name": "Endel Dreyer",
						"email": "endel.dreyer@gmail.com"
					},
					"date": "Wed, 7 Jan 2015 22:57:12 -0200"
				},
				{
					"sha": "2143a79272371fada413a81e220488f3e910965d",
					"message": "Merge-pull-request-211-from-marmelab-interceptors",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Jan 2015 22:57:00 +0100"
				},
				{
					"sha": "a74d1b0c5e66046d865e1c74dcffc0ac4ddb7612",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Jan 2015 00:02:53 +0100"
				},
				{
					"sha": "e8e43b1c8273d3df372799818ba23900d54516b1",
					"message": "Finishing-touches",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Jan 2015 00:00:53 +0100"
				},
				{
					"sha": "d2b372e3c53efa5aeac5000796490f1817c0383c",
					"message": "MAke-code-a-bit-more-concise",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Jan 2015 23:29:06 +0100"
				},
				{
					"sha": "e83e8fe3b73f617f559ab0adf668fc570859f6ee",
					"message": "Split-README-to-ease-readbility",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Jan 2015 23:28:17 +0100"
				},
				{
					"sha": "351ec3961acdb91b82d159498723aa55868d0c3b",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Jan 2015 23:03:16 +0100"
				},
				{
					"sha": "9ca6cb5c775c0a89c1ef7bf46c7de278832a27fd",
					"message": "Offload-all-REST-mapping-tasks-to-Restangular",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 6 Jan 2015 19:29:58 +0100"
				},
				{
					"sha": "8e922225c38d57cbb14ef1cd209e0db39f17085d",
					"message": "Don-t-transit-pagination-through-datagrid",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 18:22:37 +0100"
				},
				{
					"sha": "e7fac0788d43af0855a918055e22d0849df0f85f",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 17:46:28 +0100"
				},
				{
					"sha": "90d4a8f75336dcdb381d59576b4221deeb2d4c81",
					"message": "Merge-pull-request-203-from-marmelab-isolate_pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 17:42:10 +0100"
				},
				{
					"sha": "9ee846b778185f4910a510cd258bb6ca19f9e421",
					"message": "Merge-pull-request-204-from-marmelab-fix_show_extra_calls",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 17:37:40 +0100"
				},
				{
					"sha": "34c39b839e5580dbb6ec3560186e1cdab4270a53",
					"message": "Avoid-to-call-entire-API-collection-for-References-in-show-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 16:38:51 +0100"
				},
				{
					"sha": "ed677dea93f4290cd64c89e244a7f2bef6602970",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 16:27:19 +0100"
				},
				{
					"sha": "525a87e2f18bc77a0747ef1e96fa37b482d0784c",
					"message": "Fix-sorting-arrow-direction",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 16:19:38 +0100"
				},
				{
					"sha": "2b20a385e011c6e0f75e7b9e1f5a6fb34746d0af",
					"message": "Prefix-datagridPagination",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 16:18:03 +0100"
				},
				{
					"sha": "77fab6050282beca67dae3cc926e34c5a2f2f063",
					"message": "Isolate-datagrid-pagination-directive",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Dec 2014 16:12:15 +0100"
				},
				{
					"sha": "ffee65a66785ca64297e82d65b7d90c5dcc1ca0b",
					"message": "Merge-pull-request-198-from-marmelab-form-control-static",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 27 Dec 2014 21:06:17 +0100"
				},
				{
					"sha": "90896378a1fdce0ff3b425e8105f4f16d668438f",
					"message": "Merge-pull-request-199-from-marmelab-correct_readme",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 27 Dec 2014 21:06:10 +0100"
				},
				{
					"sha": "02ac95120440b17a4aeec8cc8412d975af615761",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 27 Dec 2014 21:02:33 +0100"
				},
				{
					"sha": "8a71d12ced91bdd73eed332d28f5459a7e303dba",
					"message": "Fix-readme-example-and-remove-documentation-of-deprecated-APIs",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 27 Dec 2014 20:49:02 +0100"
				},
				{
					"sha": "5fa6887d745f914497003f8b0d187a1947b421f9",
					"message": "Use-Bootstrap-s-built-in-form-control-static-to-style-text-in-forms",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 27 Dec 2014 20:05:35 +0100"
				},
				{
					"sha": "ffcefa272f34f1c594685808cfe7aad8f84a55d1",
					"message": "Merge-pull-request-192-from-marmelab-theming",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 27 Dec 2014 10:19:35 +0100"
				},
				{
					"sha": "c5149cf1c1785001c9d972fc8f8c73f667c69d11",
					"message": "Normalize-usage-of-entity-in-button-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Dec 2014 22:54:56 +0100"
				},
				{
					"sha": "0ee5eb054ecee258d6064cefd334536967cd5817",
					"message": "Add-table-of-contents-to-the-long-readme",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Dec 2014 22:20:05 +0100"
				},
				{
					"sha": "0d73cab9e87a2cbf228a3fd459ef2b13ae96389d",
					"message": "Add-support-for-application-wide-custom-view-templates",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Dec 2014 22:02:32 +0100"
				},
				{
					"sha": "0a936db42f1eb95c7c0165bbf4769c94bd651409",
					"message": "Merge-pull-request-191-from-marmelab-validation_dirty",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Dec 2014 21:33:39 +0100"
				},
				{
					"sha": "40e57e755ee55056d619e1200b4edcb5822eef86",
					"message": "filed.cssClasses-can-take-a-functino-argument",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Dec 2014 21:32:25 +0100"
				},
				{
					"sha": "de938a958c4d75f15b3a1c64963952da7f75285b",
					"message": "Add-cssClasses-support-to-columns",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 22:33:26 +0100"
				},
				{
					"sha": "ebb6c2d12bcdaec507c48e260f3fcb6993c492e1",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 22:04:51 +0100"
				},
				{
					"sha": "9b527b6fe79ea1035d6d6ce6be1d1ab0a3274274",
					"message": "Isolate-column-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 21:55:51 +0100"
				},
				{
					"sha": "9566086e73f0217f8607e7cb581ae0bb7e7aef6a",
					"message": "namespace-column-directives-and-reduce-the-number-of-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 20:00:18 +0100"
				},
				{
					"sha": "6559325e97968e6b6e9da716893f25bebfdc3ba0",
					"message": "Remove-column-directives-without-any-logic",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 19:33:18 +0100"
				},
				{
					"sha": "379b317c71bbe0300d0105a154cca90f567f032f",
					"message": "Make-routing-even-a-bit-more-DRY",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 18:29:04 +0100"
				},
				{
					"sha": "82421a22576c643eef2129d627473a5cb0d0d02c",
					"message": "Update-tests-to-pass-on-Jasmine-2",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 18:28:34 +0100"
				},
				{
					"sha": "f99f90deb5810f3e074f1bb7fda0c305f67eebab",
					"message": "Use-Jasmine-2.0-for-unit-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 18:26:55 +0100"
				},
				{
					"sha": "7694167c9fe9789e521c20f5b912837792a1d7df",
					"message": "Make-router-more-D.R.Y",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 16:40:09 +0100"
				},
				{
					"sha": "2cb8c8f6f779c6e70600a511d79cd4c5bef10939",
					"message": "Add-ability-to-customize-template-for-each-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 25 Dec 2014 11:17:47 +0100"
				},
				{
					"sha": "5291dd6697cbec90308ae443a288429cadc89022",
					"message": "Validation-status-behaves-the-same-in-edit-and-create",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Dec 2014 23:55:35 +0100"
				},
				{
					"sha": "03d088967f1e44ce7afee2b17eeb60296bbe9d4d",
					"message": "Add-grunt-task-to-launch-e2e-tests-only",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Dec 2014 23:53:24 +0100"
				},
				{
					"sha": "ce05e71072099d06473485d46207c06ccd9571a2",
					"message": "Merge-pull-request-187-from-marmelab-filter_well",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 20 Dec 2014 14:33:11 +0100"
				},
				{
					"sha": "84d95ecc234c327bd686168ecce52877648447a9",
					"message": "Put-filters-into-a-well",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 18:12:35 +0100"
				},
				{
					"sha": "7d29074431d92e3967f9205df9986e4c6b432e5d",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 17:49:31 +0100"
				},
				{
					"sha": "ffd927bd729affffc159ac42197ff2ccedc2ab7d",
					"message": "Fix-multiple-map",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 17:44:03 +0100"
				},
				{
					"sha": "0ebf36fad80de54693fe373e0a68876b795c8325",
					"message": "Fix-multiple-reference-call",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 15:29:38 +0100"
				},
				{
					"sha": "6de9d7374a6b27cdfd080a12fab53dffa107c170",
					"message": "Merge-pull-request-186-from-marmelab-custom_controller",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 15:03:38 +0100"
				},
				{
					"sha": "81b3bcdd19979d4bf4a2670c4860ca1c41dc196b",
					"message": "Merge-pull-request-184-from-marmelab-add_doc_assumptions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 15:00:32 +0100"
				},
				{
					"sha": "5fd2227d2c540c982386a014af126c844cdb415b",
					"message": "proofreading",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 14:59:43 +0100"
				},
				{
					"sha": "de7f5b4d19c010256e9173730bca1b9d4173072f",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 11:35:31 +0100"
				},
				{
					"sha": "3f0c71349ee335be3067c5b0b19f3ab1dd0a9d59",
					"message": "Fix-button-scope",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 11:33:34 +0100"
				},
				{
					"sha": "5df55747bae81a98d24ff5f2b070838c1d2bab3d",
					"message": "Add-example-of-custom-page-in-ng-admin",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 11:10:31 +0100"
				},
				{
					"sha": "7d1240ecbfbe7efe8ee9af972b45067585cafc86",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 10:40:40 +0100"
				},
				{
					"sha": "54f54f24550778b3b97d73f4e41f5ec38a493932",
					"message": "Merge-pull-request-185-from-marmelab-fix_actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 10:05:59 +0100"
				},
				{
					"sha": "87f0876b73f4ec5475a3e475525848be1a964b0c",
					"message": "Fix-view-actions-directive-name",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Dec 2014 09:45:10 +0100"
				},
				{
					"sha": "5663b41b545505558a5b72971ff86c053577098e",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:40:39 +0100"
				},
				{
					"sha": "0bbbb6fa822d7308ed64801af53fff5ba2980775",
					"message": "Add-oldParams-when-calling-getQueryParams",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:39:05 +0100"
				},
				{
					"sha": "ff7a7cbb6529ab360cd0132dc9049acf93e92ea2",
					"message": "Fix-search-persistance",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:29:04 +0100"
				},
				{
					"sha": "2271ede89c5141235763dd1281bac1db2f1e4cc8",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:19:19 +0100"
				},
				{
					"sha": "2fdbf0ccbcb299f5dba079ebc81f17a28b6a8e18",
					"message": "Fix-getMappedValue-params-bis",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:14:46 +0100"
				},
				{
					"sha": "4eed84d4d43d69f6a14caec5af29aeed81ca0afc",
					"message": "Fix-getMappedValue-params",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:11:56 +0100"
				},
				{
					"sha": "b29b44b3a1707fd558d410853e1af7eec5a7484f",
					"message": "Fix-reference-in-edti-views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 17:04:49 +0100"
				},
				{
					"sha": "cbb454b1f94ac8aa375ac8c650be8bc72ab296ff",
					"message": "Fix-template-directive-in-list-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 16:21:53 +0100"
				},
				{
					"sha": "5c0992f98799d66b1ced95cdd0dadef5a8bee5ce",
					"message": "Add-mention-of-directive-prefix-in-upgrade",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 16:18:45 +0100"
				},
				{
					"sha": "18710539e72bcdd7f3444b596a75ca0a04e7d01f",
					"message": "Some-CS",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:55:00 +0100"
				},
				{
					"sha": "d04407c143aeaa00253375114a0e1ad85bb118a2",
					"message": "Add-documentation-about-assumptions",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:54:53 +0100"
				},
				{
					"sha": "25f16eca56fac42e5086406c79bbbb38ecdf46bb",
					"message": "fix-filter-input-rounded-border-when-no-label",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:42:07 +0100"
				},
				{
					"sha": "03782ed65bbbf4c340df44e761d845950ad75660",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:21:23 +0100"
				},
				{
					"sha": "508f2775278942ea490e4eaaf67656dca06547f2",
					"message": "Fix-regression-in-Reference-mapping",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:16:23 +0100"
				},
				{
					"sha": "1bf9f49cad4e0ea97dbcfb3cd1fab4536098c5ec",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:06:35 +0100"
				},
				{
					"sha": "20116f2f956d09f403ff46493080727c59ec8cf8",
					"message": "Merge-pull-request-178-from-marmelab-improve_relation_fetching",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 15:04:20 +0100"
				},
				{
					"sha": "532354c9a821c0458fcc3e37c7fdcb11f3b2b126",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:57:51 +0100"
				},
				{
					"sha": "4996511bce815ec833d96f3746941d54be930fc4",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 11:38:50 +0100"
				},
				{
					"sha": "ccf35e1026fc8cfc70c528f4fb5bd980c3f615de",
					"message": "Call-API-multiple-time-for-non-filtered-Reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 09:55:12 +0100"
				},
				{
					"sha": "15d9a08ee8186429c8fc8cfcac43ff1cf9880e01",
					"message": "Allows-to-filter-multiple-values-for-Reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 17:00:01 +0100"
				},
				{
					"sha": "323b38b01976dbfaf908e9c9c239f153f89e81fb",
					"message": "Improve-ReferencedList-fetching",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 16:15:36 +0100"
				},
				{
					"sha": "5fa3c9918b7d449419e8cb0bc16f6f563242a728",
					"message": "Fix-built-css",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:45:54 +0100"
				},
				{
					"sha": "7d2b47efcc6a3837659d00ade751f5d67039653e",
					"message": "Add-upgrade-to-0.5",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:42:46 +0100"
				},
				{
					"sha": "a209beabe6f249f2b14ead57c78c44094be42a8a",
					"message": "CHange-filter-height",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:42:52 +0100"
				},
				{
					"sha": "543773ae82c179753389dd3b80b6c5d33a3f87a6",
					"message": "Merge-pull-request-182-from-marmelab-change_filter_display",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:29:41 +0100"
				},
				{
					"sha": "4091ba55c9d9f8b944d64f07159d4b30bc6d81bc",
					"message": "Uniformize-view-actions",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:25:49 +0100"
				},
				{
					"sha": "a6ac6f539f652f6a55b6b72e8709d993ffb37183",
					"message": "Change-filter-display",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 14:25:23 +0100"
				},
				{
					"sha": "9345efd1800a3f0cdef05d61fb1839dc30c5669d",
					"message": "Merge-pull-request-181-from-marmelab-fix_filter_display",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 13:54:32 +0100"
				},
				{
					"sha": "9ba3bd19ab2a7fa36fdb3d1f344056cec3bd095e",
					"message": "Fix-filters-dislay",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 13:53:02 +0100"
				},
				{
					"sha": "d23a7fe4f844b9fe309c8a9aef640bb91ef470ea",
					"message": "Merge-pull-request-176-from-marmelab-deprecate_pagination_per_page",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 13:45:52 +0100"
				},
				{
					"sha": "3a94bd578644de18914ed96b642440eb1d21c892",
					"message": "Fix-caf4130d0089dc9858099b5b906b05eba7f96ea2-rebuilt-files",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 12:20:01 +0100"
				},
				{
					"sha": "fcbec158bfc22c8ddf8e4042b25979630078ad39",
					"message": "Code-review",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 09:50:49 +0100"
				},
				{
					"sha": "438304c4ea3859e897fb99aad8c48b9707979c27",
					"message": "Mark-pagination-sortParams-as-deprecated",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 10:01:38 +0100"
				},
				{
					"sha": "e7a12a34204e5ebe560ce8b5741ce9c6eff12f7e",
					"message": "Try-to-fix-travis",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 09:59:07 +0100"
				},
				{
					"sha": "0ecbd12c005546719b5fa6b98683bdcf4f4dd0af",
					"message": "Increase-Travis-build-speed",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 18 Dec 2014 08:49:50 +0100"
				},
				{
					"sha": "41abffa20692e4eb604aac1790d50f067685199a",
					"message": "Merge-pull-request-177-from-marmelab-fix_undefined_raw_entry",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 23:12:29 +0100"
				},
				{
					"sha": "ad23f6256259ca557ce7b8c9ee68588cb793fa97",
					"message": "Merge-pull-request-173-from-marmelab-filter_column",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 23:07:32 +0100"
				},
				{
					"sha": "caf4130d0089dc9858099b5b906b05eba7f96ea2",
					"message": "Fix-issue-with-fonts-during-last-build",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 20:09:44 +0100"
				},
				{
					"sha": "fe87cb2eae5a0ab0abd0e7309a0c777caaedf1e2",
					"message": "Merge-pull-request-179-from-marmelab-fix_checkout",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 20:01:07 +0100"
				},
				{
					"sha": "ea0dd19baf61574f78efe319034f3094531302c3",
					"message": "Remove-bad-input-closing-tag",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 19:54:51 +0100"
				},
				{
					"sha": "532520af818cf254888fb08a1c1ebf9b4bf61396",
					"message": "Fix-checkbox-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 19:52:25 +0100"
				},
				{
					"sha": "82344f72192e2369451948d97b68ea51ed8c99b8",
					"message": "Add-test-on-directives",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 15:42:20 +0100"
				},
				{
					"sha": "95c33299d4aa0ad27cde9562bed653a019d97a16",
					"message": "Add-functionnal-test-for-filters",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 13:17:06 +0100"
				},
				{
					"sha": "98a0b5088816e505a29136fbba9eaaf3411432fa",
					"message": "Avoid-to-map-undefined-rawEntry",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 11:29:29 +0100"
				},
				{
					"sha": "9e4fe86ec2bc4a87c760fb5f3d7f3d50594f8d70",
					"message": "Improve-display",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 10:45:56 +0100"
				},
				{
					"sha": "6ec12e6e939a52f741ec7cf17ac04e4b4eeca01e",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 09:29:13 +0100"
				},
				{
					"sha": "1d4ee54a975d5d1946e1d454616b5dd7facba264",
					"message": "Fix-date-filter-format",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Dec 2014 07:58:04 +0100"
				},
				{
					"sha": "b9224ab3a752c77d1cb91e651d43b96bf5b32d2e",
					"message": "Use-ui-router-json-type-for-search-query-params",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Dec 2014 17:03:11 +0100"
				},
				{
					"sha": "96c7d8a1731b89d06a8301b06e8a55ec5022e775",
					"message": "Add-filterView",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Dec 2014 15:34:11 +0100"
				},
				{
					"sha": "a80f31de24dae10a98fcd0d2b68e2739042be498",
					"message": "Rename-button-to-ma-button",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Dec 2014 10:25:10 +0100"
				},
				{
					"sha": "a782971e1790528c15ad2919732768579c1b64d0",
					"message": "Use-ma-datagrid-everywhere",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Dec 2014 09:41:07 +0100"
				},
				{
					"sha": "c9263ae115813518932b72b0d42820387a000418",
					"message": "Update-isolated-datagrid-in-dashboard",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 18:29:49 +0100"
				},
				{
					"sha": "59cdd2c4433d7d6c79a31b5ee7117d8ded6e3102",
					"message": "Isolate-datagrid-quickfilter-directive",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 16:48:22 +0100"
				},
				{
					"sha": "682cfda56ea95b6bec08d11354c02d8a3402e964",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 18:37:15 +0100"
				},
				{
					"sha": "d9a00977e7bcebd64e56d3c33713c657766acc25",
					"message": "Merge-pull-request-170-from-marmelab-specific_endpoints",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 18:35:42 +0100"
				},
				{
					"sha": "4a072b55288eca278a88f67b3331ee308bb23c6d",
					"message": "Code-review",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 17:38:27 +0100"
				},
				{
					"sha": "471e40a32bf967ce0e5d6d653e88bb19b328336e",
					"message": "Merge-pull-request-172-from-marmelab-fix_home_button",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 17:31:41 +0100"
				},
				{
					"sha": "88f22f44580477e4b5bd0acdcd4e35840635ef42",
					"message": "Fix-home-link",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 17:06:56 +0100"
				},
				{
					"sha": "8f9496ad013ebfb0f53906b0375de81eb5eb81b8",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 14:48:38 +0100"
				},
				{
					"sha": "46a9a9a6277e01a7c9f0d1db51487c3075ebe5ed",
					"message": "Allows-to-override-query-params",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 12:24:02 +0100"
				},
				{
					"sha": "84d1bf289bdb5d53ad60344e37c5133643877eb7",
					"message": "Add-documentation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 11:45:25 +0100"
				},
				{
					"sha": "e7fd5b4e4b28ed2fd179706d337fd7fe4142f833",
					"message": "Fix-home-button",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 11:40:32 +0100"
				},
				{
					"sha": "c3ee243f27b39eb717cfa9391956213a5dd5e3f0",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 11:35:02 +0100"
				},
				{
					"sha": "cd253ea0b4515851497d19ae8b20848ae21b055d",
					"message": "Add-test-on-view-entity-.url-function",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 11:23:35 +0100"
				},
				{
					"sha": "4e4d67d41c8dd4fa477eba75d9cc8c17e5b8dcb0",
					"message": "Allows-url-to-be-a-string-or-a-function",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 11:21:04 +0100"
				},
				{
					"sha": "ba4bd2b595bdeb3fe8641c81b349da5b7abf2a40",
					"message": "Use-custom-route-for-each-CRUD-actions",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 11:20:48 +0100"
				},
				{
					"sha": "2876aedd346bd22bd85eff60d82d1f38310a6b97",
					"message": "Fix-assets-path",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 10:51:23 +0100"
				},
				{
					"sha": "b5d90e00f7f05d5ea2f6cec03c2c742ffc6d9bc0",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 10:48:14 +0100"
				},
				{
					"sha": "51c6a98d888a30a0fdc7ffa8936cfe2fcaf40efd",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 10:20:22 +0100"
				},
				{
					"sha": "5e7f07a3524a35b1d16ff6e0167aa60dc89e4ed9",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 10:17:19 +0100"
				},
				{
					"sha": "57ec6d80311c7073f5a2ed71b01b245b1abb428c",
					"message": "Allows-to-define-endpoint-for-view-entity",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 10:17:10 +0100"
				},
				{
					"sha": "c9d67d518a7c9d9842afccef37e53143f1ab460c",
					"message": "Merge-pull-request-166-from-marmelab-testable_directives",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Dec 2014 09:30:07 +0100"
				},
				{
					"sha": "70ca3573c7d1d81f48e824b2e3fe6c893302f8a0",
					"message": "Speed-up-forms-by-binding-the-field-only-once",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 14 Dec 2014 14:12:58 +0100"
				},
				{
					"sha": "548a2b53872710bbd6a987d632f45c68f7e93583",
					"message": "Remove-ReferenceField-and-ReferenceManyField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 13 Dec 2014 22:34:01 +0100"
				},
				{
					"sha": "f2b9292fd774f2776c4a69f7f5e0040b88ad1ce7",
					"message": "Replace-number-field-with-more-traditional-input-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 13 Dec 2014 22:05:37 +0100"
				},
				{
					"sha": "3bb0b742927569e73fd92d495a23e28abf157333",
					"message": "Test-and-fix-maChoicesField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 11 Dec 2014 08:50:40 +0100"
				},
				{
					"sha": "b505f30ce06cd7fd937fbce04cfa7b82c5b1640f",
					"message": "unit-test-maChoiceField",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 11 Dec 2014 08:07:54 +0100"
				},
				{
					"sha": "91787c24d5df27116d0092ac0604445fa92b82af",
					"message": "namespace-edition-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 18:56:02 +0100"
				},
				{
					"sha": "5289f9807d82a700d3c9cd1ef2a9182c977671dd",
					"message": "Test-more-directives-introduce-the-attributes-field-method",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 17:25:57 +0100"
				},
				{
					"sha": "f8ed25cb4507330198ea43fd240135b36d363987",
					"message": "Add-NumberField-Unit-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 09:07:11 +0100"
				},
				{
					"sha": "8897f6e5da78a4fd5285da25d188c974e88be664",
					"message": "Simplify-edit-fields-to-avoid-repetition",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 01:23:24 +0100"
				},
				{
					"sha": "78282d34d2e991fffd02abd1d68830f81d0897a6",
					"message": "Refactor-common-input-field-logic-into-a-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 01:10:36 +0100"
				},
				{
					"sha": "0df18eb5cc7ed2c6215e36789c2e170b97753b60",
					"message": "Add-first-directive-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 00:48:50 +0100"
				},
				{
					"sha": "60c7a11624de174db9f9e53b9eae62578b14d1f8",
					"message": "Isolate-field-directives-scope-to-make-them-testable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 00:44:44 +0100"
				},
				{
					"sha": "68a376967861ca878adadbb2ee9daf1e05b615c6",
					"message": "Add-livereload-speed-up-default-task",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 18:51:31 +0100"
				},
				{
					"sha": "673563fde64a40bcb81babf0f280ea77da27daa6",
					"message": "Merge-pull-request-168-from-marmelab-dev_experience",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 12:59:52 +0100"
				},
				{
					"sha": "15380d92c45f184dd140c5d35c933434a248c2a8",
					"message": "Make-the-first-contact-easier-for-hackers",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 11:34:59 +0100"
				},
				{
					"sha": "6b9f8b25743fbd8cb0351551604eda4bdb9ce78d",
					"message": "Fix-menu-order",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 10:40:43 +0100"
				},
				{
					"sha": "b14776348f47574dfd2731fbbd06b74a50e867fe",
					"message": "Merge-pull-request-167-from-marmelab-protractor_test_fix",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 10:36:20 +0100"
				},
				{
					"sha": "cff23d93467b9911a048629feabfe2b038f7a661",
					"message": "Add-missing-tasks-for-test-automation",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 10 Dec 2014 10:02:44 +0100"
				},
				{
					"sha": "4909f3e0aee3bcae9229492fe54a41d59b424f8f",
					"message": "Update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 21:29:47 +0100"
				},
				{
					"sha": "27ad05e1ddae862a40e8889653d35a362b08989d",
					"message": "Fix-e2e-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 21:11:03 +0100"
				},
				{
					"sha": "b6094f204ae0b94ce5759279d2e582992494769d",
					"message": "Remove-old-file-from-gitignore",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 20:50:25 +0100"
				},
				{
					"sha": "8943722f852d45c0b5910bc7e4fb0e17de22f33c",
					"message": "Merge-pull-request-158-from-marmelab-protractor_tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 20:48:03 +0100"
				},
				{
					"sha": "18dde72264b54723fbcff4d846bdf464c4197482",
					"message": "Merge-pull-request-164-from-marmelab-display_errors",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 20:47:47 +0100"
				},
				{
					"sha": "c2da2ca28c296fee6bdecaff084339290ed19f9a",
					"message": "Code-review",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 19:09:54 +0100"
				},
				{
					"sha": "d84aac73ac8f8de3197512a3525e097a0935dc65",
					"message": "Update-travis-SauceLabs-credentials",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 10:45:08 +0100"
				},
				{
					"sha": "f93de7c9905a4c959764a3bfa3e55863f096b3a0",
					"message": "Remove-server-dist.json-and-disable-end-2-end-test-on-pull-requests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 8 Dec 2014 15:51:40 +0100"
				},
				{
					"sha": "5b747b73f2aa44e6ce8e2a7a0b6d1666630e5b4d",
					"message": "Code-review",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Dec 2014 07:13:25 +0100"
				},
				{
					"sha": "f2529e7e811d5cd8f46ee4c5bc8e0ff41ce85f12",
					"message": "Add-erorrs-handling",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Dec 2014 17:33:12 +0100"
				},
				{
					"sha": "a322ab0c4f93f0d85e3fab9a9b93939b9b6d93f5",
					"message": "Merge-pull-request-162-from-marmelab-menu_view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Dec 2014 11:56:40 +0100"
				},
				{
					"sha": "807d007fe4a2926a79221b3b3a0fb014a9ef29f9",
					"message": "Merge-pull-request-160-from-marmelab-split_repositories",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 7 Dec 2014 22:41:11 +0100"
				},
				{
					"sha": "16d5d11c02c67309424d1ed1fccec03cc5635a3a",
					"message": "Upgrade-version-to-0.5-dev",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 7 Dec 2014 22:40:42 +0100"
				},
				{
					"sha": "a95c1af083db5a6dffaa34712bca92405af79e79",
					"message": "Add-menuView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 7 Dec 2014 22:38:25 +0100"
				},
				{
					"sha": "6ff50b302f708d87d120de4d13e3db773fc7a027",
					"message": "Fix-service-names",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 7 Dec 2014 21:37:17 +0100"
				},
				{
					"sha": "521131c2233d3f94b9cdbc29b13f93b6c4c2ebba",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 6 Dec 2014 10:48:21 +0100"
				},
				{
					"sha": "db29db43dde59a7c3dcd7452768c6f2468f93551",
					"message": "Try-to-fix-Travis-CI-build",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 22:39:07 +0100"
				},
				{
					"sha": "f02ad6ce60c1eeda77c25919e5758f3664050817",
					"message": "Remove-log-file-and-update-builded-assets",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 20:46:54 +0100"
				},
				{
					"sha": "ee491584000011e180cd8b9e80796287000a291e",
					"message": "Launch-test-with-builded-assets-and-update-build",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 19:43:06 +0100"
				},
				{
					"sha": "d613656fd26ce807f70edca94c153b704e459d3c",
					"message": "Integrate-protractor-tests-into-Travis-ci-and-SauceLabs",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 17:58:59 +0100"
				},
				{
					"sha": "d121be19c70ce6de3063efa3a0e5672b3a729143",
					"message": "Bootstrap-protractor-tests",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 23:04:38 +0100"
				},
				{
					"sha": "c9d860fb75b7a531b372782775b799e4d04c68fe",
					"message": "Rename-Repostories-to-Queries",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 15:17:48 +0100"
				},
				{
					"sha": "162611db7534c1f7c84b02aa7006f5105544d7f8",
					"message": "Add-link-to-0.4-blog-post-in-upgrade-guide",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 11:23:29 +0100"
				},
				{
					"sha": "c5dcea58651140f634b3fa27a5a96f4dff57e6cd",
					"message": "Merge-pull-request-159-from-marmelab-prepare_04",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 5 Dec 2014 11:18:01 +0100"
				},
				{
					"sha": "1bd64477b7f6132921e2a68c0054038c1024eeaa",
					"message": "Split-repositories",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 23:21:59 +0100"
				},
				{
					"sha": "6462e1d7beb408c3531033800f106bb54215ae3f",
					"message": "Prepare-0.4-release",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 23:06:45 +0100"
				},
				{
					"sha": "14541560036d1ea8b28becbb43ea339f456b054d",
					"message": "Merge-pull-request-157-from-marmelab-fix_datagrid_edition_link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 18:06:53 +0100"
				},
				{
					"sha": "280365504f926b04295e49f1308befc85a19a7af",
					"message": "Fix-datagrid-edition-link",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 17:59:11 +0100"
				},
				{
					"sha": "d0e596cea5480ec707080647b27c6e64544b9d2d",
					"message": "Update-build-file-to-0.4",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 17:39:14 +0100"
				},
				{
					"sha": "cb3b4ca6be0e3519638fd5cc58b6f8b9401d90c2",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 09:37:04 +0100"
				},
				{
					"sha": "ce19a75df73ccb37bead7735241cfa6f73f4f756",
					"message": "Merge-pull-request-156-from-marmelab-fix_referenced_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Dec 2014 09:36:14 +0100"
				},
				{
					"sha": "4bb6fd3c77adf4a807322948e524b59cc4a88fb5",
					"message": "Fix-ReferencedList-scope",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 23:31:50 +0100"
				},
				{
					"sha": "258d8250775c666cb927ecee007ee02f83ad785c",
					"message": "Tweak-list-view-title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 22:52:34 +0100"
				},
				{
					"sha": "5f7649c8c17e1e113f673626e12eacfef23b7ef3",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 22:45:58 +0100"
				},
				{
					"sha": "60b700b77297d6b8444482b4af635f7d4b13c4c4",
					"message": "Tweak-titles",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 22:45:13 +0100"
				},
				{
					"sha": "cbf905f346663e377a12029e345e219f2c4307cd",
					"message": "Merge-pull-request-155-from-marmelab-move_around",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 22:34:39 +0100"
				},
				{
					"sha": "b70d8d96233a06421093b391adb0bfb353087742",
					"message": "Move-tests-as-well",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 21:38:12 +0100"
				},
				{
					"sha": "3d3a44de7e313fc12481f2328646b738121c9c9d",
					"message": "Fix-deprecation-warnings",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 11:48:14 +0100"
				},
				{
					"sha": "f9821b660de3c7c07a7f95b4c33f8e4726502a53",
					"message": "Move-things-around-for-bettera-maintainability",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 11:15:47 +0100"
				},
				{
					"sha": "629fbea8f7cd0d12b46d6ddc79ec89f4a48634d2",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 11:20:41 +0100"
				},
				{
					"sha": "17ceb783f8355b99f19b920608d35f51fd524d17",
					"message": "Merge-pull-request-154-from-marmelab-read_only",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Dec 2014 11:02:42 +0100"
				},
				{
					"sha": "0db067a91737a5acfca851ac91bcea9f3dbeb1d6",
					"message": "Remove-listValueIds-to-use-values",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 23:22:35 +0100"
				},
				{
					"sha": "c8379187a7fa724386b9293158d113501e014e87",
					"message": "Add-minimum-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 22:39:45 +0100"
				},
				{
					"sha": "40c7149af372507f8383ed884be857c2d864fe5e",
					"message": "Add-read-only-mode",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 22:25:27 +0100"
				},
				{
					"sha": "48903d53e3bfb8ac7e9ad8f405518522a2a605af",
					"message": "Update-version",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 18:12:33 +0100"
				},
				{
					"sha": "98eae673a7354fedf7515d18516cd3fccc18c26d",
					"message": "Merge-pull-request-153-from-marmelab-configurable_actions",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 17:54:05 +0100"
				},
				{
					"sha": "33b06a3defa79b58790e4f736434a1312cca3b02",
					"message": "Fix-last-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 14:32:02 +0100"
				},
				{
					"sha": "02f350089456fc9099022850fe4b99ba2394e49d",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 14:21:22 +0100"
				},
				{
					"sha": "df061072de13a31d71c64fe54d33823b15fc399a",
					"message": "listActions-are-now-a-directive-too",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 13:50:15 +0100"
				},
				{
					"sha": "595a8948b76d19712ccdd442bca7e6993b6c86ab",
					"message": "Move-listActions-logic-to-a-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 13:34:05 +0100"
				},
				{
					"sha": "ec0dba6f3add0f399459494f96ac1b623f6443a3",
					"message": "Document-view-actions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 13:13:59 +0100"
				},
				{
					"sha": "e3f9aedc59859a0957865058b3dd73261c3a0f41",
					"message": "Tweak-view-header-alignment",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 13:05:14 +0100"
				},
				{
					"sha": "57feaef9ed56f3f61594367abb4bb786afcd72e1",
					"message": "Move-all-view-actions-to-a-new-view-actions-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 12:42:13 +0100"
				},
				{
					"sha": "eeeec2e3c49994fe58da1feb1b43e3604fa14b3e",
					"message": "Make-view-actions-configurable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 12:02:34 +0100"
				},
				{
					"sha": "96b7fb522ff2acae6c20d1d09e88d03d55c9cf9d",
					"message": "Readd-inflectino-global-update-build-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 08:52:35 +0100"
				},
				{
					"sha": "412fc5b428afd8277b0882edae19bc949bd201c2",
					"message": "Merge-pull-request-148-from-marmelab-show_view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 08:44:18 +0100"
				},
				{
					"sha": "51cc706abde835bf763b87098d9fa00cb75aaa82",
					"message": "Fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 08:04:33 +0100"
				},
				{
					"sha": "f368b2ee06cbbb8b010cfd26e23a068abe51f929",
					"message": "Add-create-list-and-back-buttons",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 2 Dec 2014 00:06:20 +0100"
				},
				{
					"sha": "8d096d35387da653ee31db3d3482c25802271578",
					"message": "Use-button-directives-where-available",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 23:55:09 +0100"
				},
				{
					"sha": "d14b84bd20b551572248a06fcc9735d060ed28bf",
					"message": "Visual-adjustments",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 22:43:49 +0100"
				},
				{
					"sha": "5ae14e4cac90745d742852afa095922b02f73993",
					"message": "Document-show-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 22:29:32 +0100"
				},
				{
					"sha": "91045e83ccae9f403ecb2b6d49b07bde92df08e0",
					"message": "Allows-Reference-in-show-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 22:28:02 +0100"
				},
				{
					"sha": "6f69af76b4038bc6f90a15c07df6f5910ac3f5af",
					"message": "Add-show-button-directive",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 22:24:26 +0100"
				},
				{
					"sha": "e6fa1663b673bf0ae7af7fdc2d0abd411f39e360",
					"message": "Update-view-title-handling-after-rebase",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 22:22:12 +0100"
				},
				{
					"sha": "8440099337f468c21a07345a30341dae20ea779f",
					"message": "Try-to-reuse-list-directives-for-show-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Nov 2014 17:36:57 +0100"
				},
				{
					"sha": "28ea2fa83f76e362635179b080330c60acfa70fc",
					"message": "Bootstrap-showView",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 18:42:24 +0100"
				},
				{
					"sha": "15775f5a2143828ec2a9ff2847e67ba549f2fc49",
					"message": "Merge-pull-request-152-from-marmelab-view_title_template",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 11:50:43 +0100"
				},
				{
					"sha": "85d04de890c6cf14ffbe24d340ba6f025995a824",
					"message": "Fix-global-variable",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 1 Dec 2014 09:35:36 +0100"
				},
				{
					"sha": "75cd9a06e977cbf0fe5d98bde74e1d89ef42d5bc",
					"message": "Copy-whole-response-into-entry-by-default",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 30 Nov 2014 17:15:10 +0100"
				},
				{
					"sha": "e87506a9956e8d0676dc1ae4212d144b5d4e6f9b",
					"message": "Fix-test",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 29 Nov 2014 23:43:09 +0100"
				},
				{
					"sha": "6beff9ce9e8a89b191de9dba1780f387ab34d060",
					"message": "Remove-Entity.addMappedField-all-fields-are-mapped-by-default",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 29 Nov 2014 23:34:58 +0100"
				},
				{
					"sha": "0c8682ad0188d2f4102af822456593870e912045",
					"message": "Make-the-compile-directive-transclusive-title-is-now-string-only",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 29 Nov 2014 23:23:49 +0100"
				},
				{
					"sha": "2bcf4402b1fbb47711df10884b21a5a38e6bbdea",
					"message": "Use-singular-or-plural-name-in-title",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 29 Nov 2014 14:44:25 +0100"
				},
				{
					"sha": "a8a32c5ee0f27c3e0c2c32dce6b10c03356e0369",
					"message": "View-title-is-now-an-angular-template",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 29 Nov 2014 14:12:35 +0100"
				},
				{
					"sha": "b0f56afb8f9c3f3a4ef9767d389d2b1ceda9e6ff",
					"message": "Merge-pull-request-151-from-marmelab-update_ui_router",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Nov 2014 17:51:03 +0100"
				},
				{
					"sha": "b57455d08c5a3a3be584af74188659ed080579e6",
					"message": "Update-ui-router-version",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 28 Nov 2014 16:56:16 +0100"
				},
				{
					"sha": "bf0cb7cf918cf0b2cf273f2b0c44ec70d2b043ee",
					"message": "Apmhasize-default-value-in-doc",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Nov 2014 14:00:22 +0100"
				},
				{
					"sha": "662e474899d981def10210b06efaba75b18f5deb",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 28 Nov 2014 13:24:30 +0100"
				},
				{
					"sha": "89ae414471e0700f4e4c325447419c1726d7f676",
					"message": "Merge-pull-request-145-from-marmelab-reusable_directives",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 28 Nov 2014 12:12:39 +0100"
				},
				{
					"sha": "1aea85abe99ca37b8ec16d3c55ab278d0506af56",
					"message": "Use-isolated-scope-for-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 27 Nov 2014 09:50:44 +0100"
				},
				{
					"sha": "667962cb43cbfbec9210d4ff9085f6e948d0b989",
					"message": "Update-edit-button.html",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 21:43:55 +0100"
				},
				{
					"sha": "8949ffa1d7be6c00d04285055398318069083ea8",
					"message": "Update-delete-button.html",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 21:43:42 +0100"
				},
				{
					"sha": "093cbacb30c7ab69738a93f78eefa65f55b13280",
					"message": "Merge-pull-request-144-from-marmelab-reference_link",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 20:13:25 +0100"
				},
				{
					"sha": "ef5df86ea78f44382a7d82271952693e2cfaf36b",
					"message": "Add-unit-tests-for-listActions",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 17:54:43 +0100"
				},
				{
					"sha": "3c462c703f55f9cca070f77e4b759dfd2b2b4eff",
					"message": "Add-listView.listActions-helper",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 17:14:12 +0100"
				},
				{
					"sha": "ed14c8ad30a9c1f497e0002e2e24ccd61dd70dc7",
					"message": "Document-new-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 26 Nov 2014 14:01:44 +0100"
				},
				{
					"sha": "4da07a9fc6a037d5095e94f0feb076c1273d458a",
					"message": "Introduce-edit-button-and-delete-button-directives",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Nov 2014 09:57:40 +0100"
				},
				{
					"sha": "803539f1df70dac2f33aa8deb7ab9ef66a7284ab",
					"message": "Make-Reference-column-link-to-related-edit-view-by-default",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Nov 2014 09:52:50 +0100"
				},
				{
					"sha": "165a82bfd1b5c349c04d142a72e1fc2b7d329931",
					"message": "Merge-pull-request-143-from-marmelab-remove_view_entity_association",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 25 Nov 2014 09:51:19 +0100"
				},
				{
					"sha": "556ec9f78d806bcec0dbfee4a43b1c93fbe9035e",
					"message": "Remove-link-between-field-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 25 Nov 2014 08:41:06 +0100"
				},
				{
					"sha": "e68beaa227d2fa36139c4797e17d926ca3930363",
					"message": "Fix-ng-required-not-added-to-string-field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Nov 2014 09:31:25 +0100"
				},
				{
					"sha": "55a74fa8a035a5f6ce22b5cecb7aa47beeb07f32",
					"message": "Update-built-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Nov 2014 09:12:20 +0100"
				},
				{
					"sha": "5c222e8cced8b70f841494f74af6684e107e1b95",
					"message": "Merge-pull-request-140-from-marmelab-auto_label",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Nov 2014 09:10:33 +0100"
				},
				{
					"sha": "37c9834c990eafde24e7ff1a5ebb810bf31def60",
					"message": "Update-auto-camelCase-for-labels-again",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 24 Nov 2014 09:08:53 +0100"
				},
				{
					"sha": "4d9478fb8c3a8af9f5d730225136b36eba3a5ca5",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 23 Nov 2014 21:03:03 +0100"
				},
				{
					"sha": "0dbc781d9d49ff37e1172de6b52408e2fabf4ed3",
					"message": "Merge-pull-request-137-from-marmelab-validation_default",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 23 Nov 2014 20:59:06 +0100"
				},
				{
					"sha": "3ce083830f9c3038409f17bfb0654f03bb9b98c8",
					"message": "USe-alternative-getter-detection-for-consistency",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sun, 23 Nov 2014 20:49:34 +0100"
				},
				{
					"sha": "70fe6d09a64ea1196f61df96e7371b29f2ec4868",
					"message": "Merge-pull-request-136-from-marmelab-better_camelcase",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 23 Nov 2014 11:15:01 +0100"
				},
				{
					"sha": "835e3521de5e5f300113b3051ed1e05e70973079",
					"message": "Merge-pull-request-139-from-marmelab-header_class",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 23 Nov 2014 11:12:22 +0100"
				},
				{
					"sha": "08356bcffd6166957e8d3151ff0b47c7879669af",
					"message": "Add-a-css-class-to-datagrid-headers-to-help-style-column-width",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 22 Nov 2014 23:32:12 +0100"
				},
				{
					"sha": "9c1b53bddbd174a3fa68fa3938ee094d5f752e01",
					"message": "field.validation-obj-merges-obj-with-the-default-config",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 22 Nov 2014 22:53:25 +0100"
				},
				{
					"sha": "9c9a3ddd54d5ee72deb7ee835be95f68a31796da",
					"message": "Improve-field-default-title-by-taking-_-into-account",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 22 Nov 2014 22:05:42 +0100"
				},
				{
					"sha": "9f0fc2d5ce4beff5afd415d22b336336ce3f1685",
					"message": "Merge-pull-request-135-from-tobiasoberrauch-master",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 22 Nov 2014 21:03:55 +0100"
				},
				{
					"sha": "d0e31f1716ea98a2d4c47128ec2c74f2c39e4041",
					"message": "Define-main-files-in-bower-config",
					"author": {
						"name": "Tobias Oberrauch",
						"email": "tobias.oberrauch@1und1.de"
					},
					"date": "Sat, 22 Nov 2014 01:01:34 +0100"
				},
				{
					"sha": "77858bf2c04275fd5559ba5fb17986d5a25e4025",
					"message": "Merge-pull-request-132-from-marmelab-disable_view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 21 Nov 2014 18:41:06 +0100"
				},
				{
					"sha": "4a9d764c5689b02c258330fbd7206d71a8c4b1b7",
					"message": "Add-minified-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 21 Nov 2014 15:18:16 +0100"
				},
				{
					"sha": "da0aae375954202d066d14f3788053b5a903c510",
					"message": "Take-disable-into-account-for-edition-deletion-views",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 21 Nov 2014 15:16:05 +0100"
				},
				{
					"sha": "32cbac5d2e538c309a9966e96121bce9ac1e9c4f",
					"message": "Add-a-way-to-disable-a-view",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 20 Nov 2014 22:29:50 +0100"
				},
				{
					"sha": "83d5218128a84c62ba206b226f88ff5e3a88f9c1",
					"message": "Merge-pull-request-133-from-marmelab-fix_test",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 21 Nov 2014 14:52:51 +0100"
				},
				{
					"sha": "e0556176a06beae10b423d475dc179f8b2bc6d51",
					"message": "Fix-tests-broken-since-view-refactoring",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 20 Nov 2014 23:32:24 +0100"
				},
				{
					"sha": "5686ec065c236fa2c1c561af29e4886f8f3ed9cd",
					"message": "Merge-pull-request-120-from-marmelab-sort_order_reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 20 Nov 2014 09:27:09 +0100"
				},
				{
					"sha": "34128786c827889d1d3b3a869236130e29ca0dbd",
					"message": "fix-typo-in-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 20 Nov 2014 09:15:25 +0100"
				},
				{
					"sha": "8c1a077596b71c1f68442c9c8251bf4486d6c658",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 19 Nov 2014 15:58:22 +0100"
				},
				{
					"sha": "67ef62cba56db8313945d9b13f811a7d3d328c17",
					"message": "allow-map-function-to-acces-to-corresponding-entry",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 18 Nov 2014 16:31:40 +0100"
				},
				{
					"sha": "d53d19f999209029b17f1ac63c57fb65ded9610b",
					"message": "add-test-for-getChoices-method",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 18 Nov 2014 15:28:31 +0100"
				},
				{
					"sha": "9104a8a3b8b7bcf7ac4578824678df542302d3ca",
					"message": "add-reference.getSortField-method",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 18 Nov 2014 15:16:29 +0100"
				},
				{
					"sha": "a452455c4ea657f9189ece3578b1f4c59aeab368",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 18 Nov 2014 14:43:33 +0100"
				},
				{
					"sha": "32c1041e8aa9ac9187f98642271b3e48a022fa8c",
					"message": "rename-getChoices-to-getChoicesById-add-a-new-getChoices-method-that-return-an-array",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 18 Nov 2014 14:11:55 +0100"
				},
				{
					"sha": "7105a4730ef8ef339f56c5c6675ee47eee2f7390",
					"message": "allow-to-sort-item-in-reference-select",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 12 Nov 2014 18:12:03 +0100"
				},
				{
					"sha": "04aea5ab78424ac6a5050ce033e221772b4161a8",
					"message": "Merge-pull-request-128-from-marmelab-condensed_datagrid",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 19 Nov 2014 15:17:13 +0100"
				},
				{
					"sha": "0c42df038cda5ee841b11fa0b2598b24ded98754",
					"message": "Add-minified-files",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 19 Nov 2014 15:15:30 +0100"
				},
				{
					"sha": "a8a006b407816553c2e51842aa78259db766d34b",
					"message": "Condense-data-in-datagrid-for-more-content-on-screen",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 19 Nov 2014 15:11:48 +0100"
				},
				{
					"sha": "063c1fd684c8efc52e46b2d1dcae6fdd6b798a71",
					"message": "Merge-pull-request-127-from-marmelab-fix_bootstap3_3_assets",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 19 Nov 2014 15:00:08 +0100"
				},
				{
					"sha": "55230771400f091a825b381789cd4c53b417d694",
					"message": "Fix-bootstrap-3.3-assets-path",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 19 Nov 2014 14:01:39 +0100"
				},
				{
					"sha": "562939055c94ebdc5c95477383dcdf0fc27205bd",
					"message": "Merge-pull-request-124-from-marmelab-default_views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 19 Nov 2014 13:52:00 +0100"
				},
				{
					"sha": "938c4e580aeb365ccf3c7ad191c6325d1d92138f",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 18 Nov 2014 10:45:11 +0100"
				},
				{
					"sha": "b0e37d312d9b549dca40ffa5909fcfbc451e8504",
					"message": "rename-editView-to-editionView-to-avoid-confision-with-mutation-methods",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 18 Nov 2014 08:22:43 +0100"
				},
				{
					"sha": "efcaa94e6c9bf961b5d346dc60ff703e210d643b",
					"message": "Fix-undefined-error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 18 Nov 2014 07:02:39 +0100"
				},
				{
					"sha": "fb3b43018dee76c234e3383898e8fa3198deec77",
					"message": "Readd-addView-to-allow-BC",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 17 Nov 2014 20:28:03 +0100"
				},
				{
					"sha": "b0ae6f69928cc1e74b23b32044561c8182b33045",
					"message": "Ease-configuration-by-presetting-views",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 17 Nov 2014 09:41:36 +0100"
				},
				{
					"sha": "2f2f6f9ce511e0f6013ec8d1fe8a5fa465e6db78",
					"message": "Merge-pull-request-125-from-marmelab-fix-ui-router-version",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 17 Nov 2014 23:26:23 +0100"
				},
				{
					"sha": "3d75d059393f65ad213fc117c5a5d565a3a30450",
					"message": "Update-route-definition",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 17 Nov 2014 22:52:08 +0100"
				},
				{
					"sha": "15acf6cfa9ed68dd806060961542f53a9d49cb4b",
					"message": "Merge-pull-request-122-from-marmelab-wysiwyg_column",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 17 Nov 2014 06:43:30 +0100"
				},
				{
					"sha": "806ed0b4c4af299378789748e94cce7bef7df959",
					"message": "Merge-pull-request-119-from-marmelab-genuine_bootstrap",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 17 Nov 2014 06:42:58 +0100"
				},
				{
					"sha": "4611dd524c8bf266448bdefb293c3f0602625375",
					"message": "Update-example",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 16 Nov 2014 12:41:00 +0100"
				},
				{
					"sha": "99470ef5be8b1e68c68186c622c03e79bfdb2b33",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 16 Nov 2014 12:38:00 +0100"
				},
				{
					"sha": "1eafea7abc93edecfc0c0f93bf4cd6bbd67b0130",
					"message": "Fix-wysiwyg-column-display",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 15 Nov 2014 00:55:18 +0100"
				},
				{
					"sha": "62ca4e584dad8d2c1035ba28578d77d7ed8e3336",
					"message": "Fix-active-menu-detection",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 15 Nov 2014 00:43:06 +0100"
				},
				{
					"sha": "113f63755165e2c265fe06537724207005398402",
					"message": "Fix-pointer-on-navbar",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 15 Nov 2014 00:20:02 +0100"
				},
				{
					"sha": "8fed09076617c449adc6aa60bf98f616290250e3",
					"message": "Fix-rich-text-formatting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 15 Nov 2014 00:11:47 +0100"
				},
				{
					"sha": "6085c1dc82afb26449ac3741cac4df237cc35928",
					"message": "Improve-list-view-responsiveness",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Sat, 15 Nov 2014 00:02:24 +0100"
				},
				{
					"sha": "dee914d204739f656c421dd34fe8976e9fade5a7",
					"message": "Use-stabdard-sb-admin-structure-upgrade-bootstrap",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 23:25:27 +0100"
				},
				{
					"sha": "9bda6a9a3b5587cdaf4896899109504e91b07d61",
					"message": "Use-genuine-bootstrap-styling-for-the-datagrid",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 17:47:24 +0100"
				},
				{
					"sha": "81fa68101e57f877bb87b320deb9ddefeed80e16",
					"message": "Proper-table-headers",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 16:45:57 +0100"
				},
				{
					"sha": "6ba328880c6aabd4663df6f5d33359621bca7951",
					"message": "Merge-pull-request-117-from-marmelab-tr-th",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 16:27:28 +0100"
				},
				{
					"sha": "136896e40aca83f1d7d34b5bd29184a228467022",
					"message": "Merge-pull-request-116-from-marmelab-fix_date_format",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 16:21:57 +0100"
				},
				{
					"sha": "f24680bcb620ca8335178cc39a5a4a0537ebe285",
					"message": "Fix-semantic-HTML-in-datagrid",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 16:20:49 +0100"
				},
				{
					"sha": "fff806f4648b48ca95a3936d81e3f616ed5cc783",
					"message": "date-format-filter-on-date-column",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 14 Nov 2014 16:19:03 +0100"
				},
				{
					"sha": "1acde9a08ccf9f898fc3cb63f57c85bc436e9687",
					"message": "Merge-pull-request-112-from-marmelab-fix_template_dashboard",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 15:08:34 +0100"
				},
				{
					"sha": "0d1d8f6ceecad2ccaa570c88a99742e064613798",
					"message": "Fix-template-field-in-dashboard-panel",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 13:36:53 +0100"
				},
				{
					"sha": "80a31e7244d08ba0c777d69fb02f59bdce00a8e4",
					"message": "Remove-view.label",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 13:00:06 +0100"
				},
				{
					"sha": "205be0dbe10ca1b0f663df8c46a279d14d1e5b91",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 12:45:24 +0100"
				},
				{
					"sha": "9c939cdaddae3ec00f878d1220f550390a7f76ca",
					"message": "Change-default-number-step-to-any",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 14 Nov 2014 12:44:09 +0100"
				},
				{
					"sha": "65a00740ff95cfed818559b5077f83b0f2112c40",
					"message": "move-things-around-for-better-legibility",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 14:43:47 +0100"
				},
				{
					"sha": "8ba0dbaa3ca585977c26723f9f7937a3fc1007f1",
					"message": "More-code-formatting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 14:31:28 +0100"
				},
				{
					"sha": "31dcdca38af395a7350522ead9886e1434d734d1",
					"message": "Fix-whitespace-typos",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 14:25:42 +0100"
				},
				{
					"sha": "962e0b57e20fd10e65d6ad54309edcf6290079e1",
					"message": "Improve-code-snippets-indentation-in-documentation",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 14:21:21 +0100"
				},
				{
					"sha": "8abc37b5388a1892786462c80c440d217840a920",
					"message": "Merge-pull-request-108-from-marmelab-doc_views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 14:08:10 +0100"
				},
				{
					"sha": "2d11a4f3e1f9d8262e18b2c727a59f557ceb6a91",
					"message": "Improve-documentation-about-Views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 14:07:47 +0100"
				},
				{
					"sha": "503a9c6201ddb807cd2b4767ea10ef536f86f83b",
					"message": "Remove-useless-clone-method",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 12:30:10 +0100"
				},
				{
					"sha": "804b31035c7c1466ef7806ecfbc6573827694309",
					"message": "Merge-pull-request-105-from-marmelab-upgrade_guide_angular",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 12:17:33 +0100"
				},
				{
					"sha": "cfc1c6b72c4f8bb96594371cb024d4048dade509",
					"message": "Fix-wording",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 11:57:44 +0100"
				},
				{
					"sha": "0890387b5a41b6f5132de825dc862b598fe160f0",
					"message": "Merge-pull-request-106-from-marmelab-fix_validation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 11:55:17 +0100"
				},
				{
					"sha": "a5e898ecff4d8cfe856f89b8da9f18e52a26bbee",
					"message": "Fix-validation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 11:51:05 +0100"
				},
				{
					"sha": "b333ddd2bdd03177fca6cfe72c99b063e1df960a",
					"message": "Add-Angularjs-requirement-section-to-0.3-upgrade",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:38:45 +0100"
				},
				{
					"sha": "49c54fb97e0c2514c107cc3a57f5270b575637d8",
					"message": "Merge-pull-request-104-from-marmelab-0.3",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:30:44 +0100"
				},
				{
					"sha": "c3b7c948292bb804be7998a1dc7654be4a591b39",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:22:44 +0100"
				},
				{
					"sha": "2da7b4edfe195caa71b9bf25efa0aca92fcf7fb7",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:16:19 +0100"
				},
				{
					"sha": "5c3a9bd9649890b0920eca068432f9ca63f82e04",
					"message": "Update-example-configuration-in-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:14:02 +0100"
				},
				{
					"sha": "c23164d44d00ec308acfcf3572eaceb5127ec1e0",
					"message": "Fix-glyphicon-class-in-boolean-column",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:07:11 +0100"
				},
				{
					"sha": "d0da9db19640c08bccdc4ed75cd33ae29aa47b26",
					"message": "Ignore-files-in-bower.json",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:02:03 +0100"
				},
				{
					"sha": "d66cbc37068d4942ed1741b790787151641f3083",
					"message": "Update-config-dist.js",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 10:02:08 +0100"
				},
				{
					"sha": "c31715ad6127eb56b17a5d25908badd2ad71cb6a",
					"message": "Add-field-id-by-default-to-an-entity",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 09:57:45 +0100"
				},
				{
					"sha": "084dab5d69b96c38892c6d38b09bf0f558bb4c1c",
					"message": "Change-configuration-order-for-more-readbility",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 09:50:02 +0100"
				},
				{
					"sha": "b4a3d67c018600aaba9755c5c35e141acdf72219",
					"message": "Add-more-details-and-reformat-example-config",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 09:42:17 +0100"
				},
				{
					"sha": "72931b9a2f013cf4eb4540f0bf41bda0b84550ec",
					"message": "Add-more-details-in-the-UPGRADE-manual",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 09:13:10 +0100"
				},
				{
					"sha": "326671da96d6d55d7739fc6586ed05f9ea58bcad",
					"message": "Fix-identifier-name-after-creation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 08:11:55 +0100"
				},
				{
					"sha": "d8399b420f2c9fd0c2a002cb982ace921ea24df1",
					"message": "Rename-callback-to-template",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 08:07:38 +0100"
				},
				{
					"sha": "b5f420fd30cc1d646cb892631fb0f5f7684c873a",
					"message": "Rename-valueTransformer-to-map",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 07:47:06 +0100"
				},
				{
					"sha": "6f11f743e6eaf9875f59d5fec13cc3cba0e932ff",
					"message": "camelCase-field-name-as-label-by-default",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 07:38:50 +0100"
				},
				{
					"sha": "4fd13baea7a2b150467cfa03136602932891f80f",
					"message": "Rename-truncateListValue-into-map-generate-random-name",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 13 Nov 2014 07:21:53 +0100"
				},
				{
					"sha": "db220d2edf6db9acf763852a274b957d52c1a0b6",
					"message": "Introduce-generic-form-validation",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Wed, 12 Nov 2014 14:40:29 +0100"
				},
				{
					"sha": "c8c701b2cfe35168f370b47086f815dde67aafc0",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 12 Nov 2014 11:28:12 +0100"
				},
				{
					"sha": "4afa0665985973c4e4d7f8ea9a84641afe68eb76",
					"message": "Update-built-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 12 Nov 2014 11:18:21 +0100"
				},
				{
					"sha": "38752452eff115b79e09f7d46fff6a55badea740",
					"message": "Fix-README-c-p-typos",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 12 Nov 2014 11:08:00 +0100"
				},
				{
					"sha": "f9daa320ea7ac67c73bb4914dccb8a7886198a66",
					"message": "Fix-pagination",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 7 Nov 2014 15:02:38 +0100"
				},
				{
					"sha": "edd69bec1d43783467ffd4b78eddece6a06d6bd0",
					"message": "Do-not-minify-angular",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 7 Nov 2014 14:34:01 +0100"
				},
				{
					"sha": "034bd37d4a4839263d925a074ec7edbff58f0f92",
					"message": "Update-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 7 Nov 2014 14:32:22 +0100"
				},
				{
					"sha": "c5019857b3219f07ccb768209468b6b0d4861772",
					"message": "introduce-Entry-entity-to-not-clone-entire-View-in-lists",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 7 Nov 2014 10:23:38 +0100"
				},
				{
					"sha": "b1356ea8f915c8f9c115574408c6dd154154b05c",
					"message": "Update-build-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 23:32:46 +0100"
				},
				{
					"sha": "2170a643deec1cbb6e3d6beeace3f100e9717298",
					"message": "Fix-minification",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 23:18:16 +0100"
				},
				{
					"sha": "ccc953fa1c8fa79f35060df20d99dd565aa48edc",
					"message": "Fix-minification",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 18:48:27 +0100"
				},
				{
					"sha": "5e0597734599165e5fc35fc6b7dd08211c382a5b",
					"message": "Fix-pagination-loss-in-Reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 08:42:08 +0100"
				},
				{
					"sha": "a3b0ed358dbc5009cea216df8b0afeed66484a98",
					"message": "Allows-validator-to-return-an-error",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 08:16:34 +0100"
				},
				{
					"sha": "f956a684fc7905e8367dcaba24fcd18d446567b2",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 08:05:50 +0100"
				},
				{
					"sha": "2a30d19d410013c307078feed0828cfbdf4cc2c2",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 13:46:58 +0100"
				},
				{
					"sha": "335434b9fff6aab415509d48dd4a451cb3b5e579",
					"message": "Fix-force-rebase",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 13:33:40 +0100"
				},
				{
					"sha": "dcc6a7c69a87e3c620d9667cffd38fbe137c79bc",
					"message": "Update-doc-example",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 08:32:09 +0100"
				},
				{
					"sha": "74649b469ea4e83939d87a0db16bc5b2d0152070",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 07:23:10 +0100"
				},
				{
					"sha": "b661c3255e370a0fdb607f214c05515d5468a601",
					"message": "Fix-cursor-on-links",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 07:14:55 +0100"
				},
				{
					"sha": "e458321d6c7ae6aecc00047a835681cc522cbddc",
					"message": "rebase-Add-defaultValue-property-for-fields",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:24:13 +0100"
				},
				{
					"sha": "f7425dbd22b7fe17aa749196e10217d2f335d75e",
					"message": "rebase-Fix-app-title-isEditLink",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:17:49 +0100"
				},
				{
					"sha": "6eea9ce6b41f66ba7f58b72581c357723e71ea38",
					"message": "rebase-use-array-instead-of-literal-to-preserve-choices-order",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:07:07 +0100"
				},
				{
					"sha": "f94493777129c0bad5b1ba2f63c628894813468a",
					"message": "rebase-add-humane-and-nprogress-service-to-make-the-2-library-injectable",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:02:45 +0100"
				},
				{
					"sha": "8bc97ca84229663e893854ede028b52a062e05dc",
					"message": "Fix-callback-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 17:56:33 +0100"
				},
				{
					"sha": "a151f9bf306c5d20d18563b234b23d5d73d1fd74",
					"message": "Update-referencedListView",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 16:07:35 +0100"
				},
				{
					"sha": "b8ca41a922035bd973910e66314c5737e8e1b189",
					"message": "Update-callback-Reference-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 07:58:20 +0100"
				},
				{
					"sha": "a011cb3a5d9128fab58e9e6dd1a16a3bb2dd9899",
					"message": "Update-Reference-infinitePagination-quickFilters",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 1 Nov 2014 11:17:35 +0100"
				},
				{
					"sha": "8aab1ed8abef4e9e94485f2ac16c037cce99c1a5",
					"message": "Fix-truncateList-callback",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 31 Oct 2014 19:13:48 +0100"
				},
				{
					"sha": "ff5368c5662bee9b4a54c10932caff8ad2329ff6",
					"message": "Fix-column-sorting",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 31 Oct 2014 18:57:50 +0100"
				},
				{
					"sha": "80fa5071061e30a1dc8125e4962a4cd06fbb2136",
					"message": "Update-dashboard-list-create-edit-delete-views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 31 Oct 2014 18:08:04 +0100"
				},
				{
					"sha": "0957fb321292dbbe30ee56e5a0d87068aa440b04",
					"message": "Fix-codestyle",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 17:38:19 +0100"
				},
				{
					"sha": "6ad07fb890b124b3ccf7866bc9c6d4b80b50c914",
					"message": "Add-tests-for-ListViewRepository",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 14:08:40 +0100"
				},
				{
					"sha": "7606145a3843a451e420a52aea87bf8279f478b1",
					"message": "Refactor-methods-of-ListViewRepository-into-views-entities-1-2",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 28 Oct 2014 18:29:30 +0100"
				},
				{
					"sha": "dd6f833f43cb974df1b5d6db0c780e6d9be17e46",
					"message": "Add-dashboardController-orderElement-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 21 Oct 2014 07:59:52 +0200"
				},
				{
					"sha": "7022433548e55d8fa482736873fccefd8dc7077f",
					"message": "Add-some-test-for-main-module",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 16 Oct 2014 08:00:45 +0200"
				},
				{
					"sha": "88158905c330805365833f86a4e953692bfeef63",
					"message": "wip-add-service-config-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 15 Oct 2014 08:04:46 +0200"
				},
				{
					"sha": "9f050cec7e8a04ad82d8700e1a5d6d63bf8d2d73",
					"message": "Allows-view-inheritance",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 14 Oct 2014 07:47:38 +0200"
				},
				{
					"sha": "7bbd7bc720f84f8a87c5c604fb3a31e3b96f175e",
					"message": "Add-view-entities",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 10 Oct 2014 08:02:26 +0200"
				},
				{
					"sha": "3adba4d5822df5e94543095e53bc6e9da9caba3d",
					"message": "Update-version",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 7 Nov 2014 15:51:49 +0100"
				},
				{
					"sha": "cfae8a8fa7c79b265621bae565f4ade788deddc3",
					"message": "Merge-pull-request-102-from-luiscoimbra-master",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 7 Nov 2014 15:28:32 +0100"
				},
				{
					"sha": "71ccc2e0a68eb9c59fbf8d4dfbd371352536517d",
					"message": "Merge-remote-tracking-branch-upstream-master",
					"author": {
						"name": "Luis Coimbra",
						"email": "programador.luis@gmail.com"
					},
					"date": "Thu, 6 Nov 2014 23:09:40 -0200"
				},
				{
					"sha": "d248b0a6e4e19e48c5beec2c80fafc67ce4e84a7",
					"message": "added-PasswordField-type-to-forms",
					"author": {
						"name": "Luis Coimbra",
						"email": "programador.luis@gmail.com"
					},
					"date": "Thu, 6 Nov 2014 23:05:33 -0200"
				},
				{
					"sha": "3cf368db2bc8f193f1f0dd3e75b863f0d1fe5d02",
					"message": "Merge-pull-request-99-from-marmelab-revert-76-add_views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 6 Nov 2014 18:11:37 +0100"
				},
				{
					"sha": "9614ec9de726ebe2440b69447e7ebadf97cd9eb8",
					"message": "Revert-RFR-Introduce-views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 6 Nov 2014 18:11:22 +0100"
				},
				{
					"sha": "dddc08a75af0e15f766e6ed4d03cf44b3ad06acb",
					"message": "Merge-pull-request-76-from-marmelab-add_views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 23:40:21 +0100"
				},
				{
					"sha": "3aa5a98f2ca25ccf992091ff857e7d568dc86052",
					"message": "Update-build-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 23:32:46 +0100"
				},
				{
					"sha": "39c0d6ec072d390785f63d4030f5359418f3a714",
					"message": "Fix-minification",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 23:18:16 +0100"
				},
				{
					"sha": "f3bb30d117a1026a030bca61836a6192c72c996f",
					"message": "Fix-minification",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 18:48:27 +0100"
				},
				{
					"sha": "32b94428d374889dcb1cbbb0f6fd7d753dec74ff",
					"message": "Fix-pagination-loss-in-Reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 08:42:08 +0100"
				},
				{
					"sha": "e134d0a0ca9edd44a535f713b405a7f2067c6393",
					"message": "Allows-validator-to-return-an-error",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 08:16:34 +0100"
				},
				{
					"sha": "b72448b97c2592077b686ba2b08d150addf25d63",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 5 Nov 2014 08:05:50 +0100"
				},
				{
					"sha": "8e8d7d424d7ab1b56924f839d3f60761774fd591",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 13:46:58 +0100"
				},
				{
					"sha": "1c8c53fc32759921ac8dd5b7866b19af8f57ac69",
					"message": "Fix-force-rebase",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 13:33:40 +0100"
				},
				{
					"sha": "dec3a998d24c2e0905f53f9b77fcc3f0f0cf1ed8",
					"message": "Update-doc-example",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 08:32:09 +0100"
				},
				{
					"sha": "f9b44301c0c3cd4498b64744e098a1c0e0d26a34",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 07:23:10 +0100"
				},
				{
					"sha": "94968a2c254b125b55c9e3a562bcefb2f74c131b",
					"message": "Fix-cursor-on-links",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 4 Nov 2014 07:14:55 +0100"
				},
				{
					"sha": "c48935358b7c82791fbac8d739625b9c2b28fc1c",
					"message": "rebase-Add-defaultValue-property-for-fields",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:24:13 +0100"
				},
				{
					"sha": "f73f7612a3f93468f51bab98a1343a80b863d03d",
					"message": "rebase-Fix-app-title-isEditLink",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:17:49 +0100"
				},
				{
					"sha": "59dcd1969216e915a1711fbbf0f802782202593c",
					"message": "rebase-use-array-instead-of-literal-to-preserve-choices-order",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:07:07 +0100"
				},
				{
					"sha": "2c2d11d18167f45df24250b626a7067cc9417e18",
					"message": "rebase-add-humane-and-nprogress-service-to-make-the-2-library-injectable",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 18:02:45 +0100"
				},
				{
					"sha": "2e500d051e843676637052d1a40fa61ec47998f4",
					"message": "Fix-callback-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 17:56:33 +0100"
				},
				{
					"sha": "f0123e1cbfdb97e0a548d71329efb019432ac62e",
					"message": "Update-referencedListView",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 16:07:35 +0100"
				},
				{
					"sha": "ca3420dfd40c38cdcff9fbabc56d298b786c8c80",
					"message": "Update-callback-Reference-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 3 Nov 2014 07:58:20 +0100"
				},
				{
					"sha": "3cbab301dff33f16b84708075843f6603ccfe958",
					"message": "Update-Reference-infinitePagination-quickFilters",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 1 Nov 2014 11:17:35 +0100"
				},
				{
					"sha": "55493d025cd601dc9b6028886002e7aa58e4964e",
					"message": "Fix-truncateList-callback",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 31 Oct 2014 19:13:48 +0100"
				},
				{
					"sha": "6a971d1caaa5b5d5d2aef60dac2d7991f14c2717",
					"message": "Fix-column-sorting",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 31 Oct 2014 18:57:50 +0100"
				},
				{
					"sha": "17655e23fb9a9a960dded0d337ae5abba316257d",
					"message": "Update-dashboard-list-create-edit-delete-views",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 31 Oct 2014 18:08:04 +0100"
				},
				{
					"sha": "1fedcd7caeb95ef68a947ff508202a26e50b86df",
					"message": "Fix-codestyle",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 17:38:19 +0100"
				},
				{
					"sha": "2638421295fd48bf37264c797442a9fc6cb2d9a3",
					"message": "Add-tests-for-ListViewRepository",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 14:08:40 +0100"
				},
				{
					"sha": "dfe97656747b49885c3087c89c3e4a2ed02b975c",
					"message": "Refactor-methods-of-ListViewRepository-into-views-entities-1-2",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 28 Oct 2014 18:29:30 +0100"
				},
				{
					"sha": "8605a4ba884e1ae809111498798c952d7597e1c2",
					"message": "Add-dashboardController-orderElement-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 21 Oct 2014 07:59:52 +0200"
				},
				{
					"sha": "49c7a3aecfc1250218bc4aa373ecf5c4d3024049",
					"message": "Add-some-test-for-main-module",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 16 Oct 2014 08:00:45 +0200"
				},
				{
					"sha": "f0841c4e4f2a8d00b0ce40efd6754bbd883d913d",
					"message": "wip-add-service-config-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 15 Oct 2014 08:04:46 +0200"
				},
				{
					"sha": "d17c15613a7f22fd7c51e2a4e2203138e4549815",
					"message": "Allows-view-inheritance",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 14 Oct 2014 07:47:38 +0200"
				},
				{
					"sha": "3dad1403a30cab0008c5b0a07ea067718c6d2c05",
					"message": "Add-view-entities",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 10 Oct 2014 08:02:26 +0200"
				},
				{
					"sha": "b00567c2a8c2b4f056dab795b12e67fcf38fdb06",
					"message": "Merge-pull-request-97-from-marmelab-callback_consistency",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 27 Oct 2014 22:17:40 +0100"
				},
				{
					"sha": "135fec87ec0c0877f7ddd68f137e6e66698c9444",
					"message": "Merge-pull-request-98-from-concreted-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 27 Oct 2014 07:48:15 +0100"
				},
				{
					"sha": "8d90cf562177b2425820c6bae92b6341323d2a3d",
					"message": "Grammar-fixes-in-README.md",
					"author": {
						"name": "Aric Huang",
						"email": "arichuang@gmail.com"
					},
					"date": "Sun, 26 Oct 2014 17:32:46 -0700"
				},
				{
					"sha": "8c50328aefe2ec105117ddd065c007e6b9baa757",
					"message": "Fix-callback-argument-value-to-use-entity-object",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 24 Oct 2014 11:27:23 +0200"
				},
				{
					"sha": "26e3b2ceadb6073ecbc0132af35c832f7a4b399b",
					"message": "Add-link-to-demo-source",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 17:57:49 +0200"
				},
				{
					"sha": "b62642a5976340565e975c7171e1ef83d40244be",
					"message": "Merge-pull-request-91-from-marmelab-default_value",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 17:04:14 +0200"
				},
				{
					"sha": "57d6499b58eb2684e1ce816ed140c760d57bba23",
					"message": "Add-default-value-to-reference-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 16:42:32 +0200"
				},
				{
					"sha": "1f458952de90d47fe8fc290792d0943e4efc5c2c",
					"message": "Add-defaultValue-property-for-fields",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 14:58:19 +0200"
				},
				{
					"sha": "acd3cab6dcf4a187b503b0ce7926b6cefb973c71",
					"message": "Merge-pull-request-93-from-marmelab-more_css",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 16:09:10 +0200"
				},
				{
					"sha": "a2fe1562ef64e7f3b5f961550aeb3c4b0423181b",
					"message": "Add-CSS-ids-to-form-rows",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 15:59:35 +0200"
				},
				{
					"sha": "0f1ad93e72f65b76f3f18966d40d7c7e4348de24",
					"message": "Merge-pull-request-92-from-marmelab-humane_nprogress_service_2",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 15:34:27 +0200"
				},
				{
					"sha": "b6932a8db8d00bfceb4f61855d643a91e73cef16",
					"message": "correct-jsdoc-and-remove-unneeded-require",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 20 Oct 2014 15:17:52 +0200"
				},
				{
					"sha": "f09409be01e7cab9a6afcea1f745f508818759d4",
					"message": "Merge-pull-request-90-from-marmelab-fix_boolean",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 14:19:04 +0200"
				},
				{
					"sha": "1a4db45dc3951731c58f8a350a00731bb482b476",
					"message": "Merge-pull-request-88-from-marmelab-humane_nprogress_service",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 14:13:30 +0200"
				},
				{
					"sha": "059a0e887f4ef9aba18c298682ce137929d9406b",
					"message": "Merge-pull-request-89-from-marmelab-checkbox_style_fix",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 14:13:15 +0200"
				},
				{
					"sha": "f7159e890034ab60cc479989ff0f57af03314eb6",
					"message": "Fix-boolean-type-on-list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 14:12:49 +0200"
				},
				{
					"sha": "e3b0f571ad0bca6378ce06078aa3807c251abe02",
					"message": "Fix-checkboxes-style",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 20 Oct 2014 12:46:19 +0200"
				},
				{
					"sha": "fda4def445e83a393dcdb609f7c03138f159813f",
					"message": "rename-NProgressService-to-progress-and-humaneService-to-notification",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 17 Oct 2014 16:29:16 +0200"
				},
				{
					"sha": "6676661cf9241085a195af8db382f0abbe76a1d8",
					"message": "replace-service-by-factory",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 17 Oct 2014 16:17:39 +0200"
				},
				{
					"sha": "a4c8bf6a46b476dbd1fc292e5c06134746ecd7c2",
					"message": "add-humane-and-nprogress-service-to-make-the-2-library-injectable",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 17 Oct 2014 15:59:44 +0200"
				},
				{
					"sha": "cd3c4a7fce7a1c37857eaedceb197c1676f5450c",
					"message": "Merge-pull-request-82-from-marmelab-format_date_list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 17 Oct 2014 10:36:45 +0200"
				},
				{
					"sha": "39a0bb83e76b648330803b62a6228202bb1dfe44",
					"message": "use-format-filter-for-date-type-in-list",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 13 Oct 2014 16:14:54 +0200"
				},
				{
					"sha": "0865c49ae465b079e5eb2aff2ddb9eb9fb10f7f7",
					"message": "Update-version",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 16 Oct 2014 08:01:34 +0200"
				},
				{
					"sha": "1d1f7f743ed7d620082b8f223315d931d995774a",
					"message": "Update-builded-scripts",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Oct 2014 12:13:07 +0200"
				},
				{
					"sha": "25558a11fb163a00d47db984cc750758dc664010",
					"message": "Merge-pull-request-85-from-marmelab-fix_infinite_pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 14 Oct 2014 12:01:57 +0200"
				},
				{
					"sha": "eeab4a017eb03889f1f28bfdc11d1dffa0087e52",
					"message": "Fix-infinite-pagination-add-deleted-success-message",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 14 Oct 2014 11:50:34 +0200"
				},
				{
					"sha": "57b0051fc44611d01756b38c51546045e7775eaf",
					"message": "Merge-pull-request-83-from-marmelab-fix_title_edit_link",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 13 Oct 2014 23:02:13 +0200"
				},
				{
					"sha": "63f7fee8685d5da9ba291f80d7c0caf9bf7b215b",
					"message": "Fix-app-title-isEditLink",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 13 Oct 2014 21:49:11 +0200"
				},
				{
					"sha": "8c447537cf57dd5fde77df5c9b8d44a4cc866050",
					"message": "Merge-pull-request-81-from-marmelab-choice_field_2",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 13 Oct 2014 16:55:05 +0200"
				},
				{
					"sha": "5cf6e0e73e7ce8bc8011d18eb3411b66bac0704b",
					"message": "use-array-instead-of-literal-to-preserve-choices-order",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 13 Oct 2014 15:43:57 +0200"
				},
				{
					"sha": "5ad912caa48a25a0ba953bdbbfd9f86b04f5fac0",
					"message": "Merge-pull-request-80-from-marmelab-choice_field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 13 Oct 2014 15:24:07 +0200"
				},
				{
					"sha": "f032f256a92c3dec8245dcab0d8f561e2a015041",
					"message": "enable-choice-field",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 13 Oct 2014 15:21:03 +0200"
				},
				{
					"sha": "640f811931911bc4c5388acc6ad48f3648f418bc",
					"message": "Merge-pull-request-79-from-marmelab-floating_number",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 13 Oct 2014 10:49:02 +0200"
				},
				{
					"sha": "12148a323cb4a0b3b9397a3823634c950d4cf142",
					"message": "allow-to-configure-step-on-number-input",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 13 Oct 2014 10:46:14 +0200"
				},
				{
					"sha": "a30f1850bcc96fb39ec131450e1f41a2610e0e08",
					"message": "Merge-pull-request-78-from-richguan-patch-1",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sat, 11 Oct 2014 10:26:27 +0200"
				},
				{
					"sha": "d7a562da9a60d07938bb4cf042bcfb33e5feae79",
					"message": "Update-README-for-consistency",
					"author": {
						"name": "Richard Guan",
						"email": "guan.rich@gmail.com"
					},
					"date": "Fri, 10 Oct 2014 21:34:24 -0700"
				},
				{
					"sha": "7b372c4e0bfb812afa2a370122da94b74f903e11",
					"message": "Update-verstion-to-0.2.3",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 8 Oct 2014 12:11:16 +0200"
				},
				{
					"sha": "86b3c39fbc6c2a618a113450ec31c8b3890cdcce",
					"message": "Update-start.frag",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 8 Oct 2014 10:43:39 +0200"
				},
				{
					"sha": "3304bc6c06ab24febd23ba6e224e06608e070e1a",
					"message": "Fix-error-with-empty-value-for-truncate-list-update-example",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 8 Oct 2014 08:24:43 +0200"
				},
				{
					"sha": "200a77ed64e4f41bc5a0c06a32211340e451c3c3",
					"message": "Merge-pull-request-73-from-marmelab-add_tests",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Tue, 7 Oct 2014 23:04:57 +0200"
				},
				{
					"sha": "d7401630956b37dc09eec59a03dea6c106ea516e",
					"message": "Add-more-test-for-CrudManager",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 6 Oct 2014 19:25:38 +0200"
				},
				{
					"sha": "712ac231e1450df845206433585dcd6679cdfff4",
					"message": "Add-CrudManager-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 6 Oct 2014 08:41:16 +0200"
				},
				{
					"sha": "f965f0ca2f5598ce44912aa33226d7b73d5b359d",
					"message": "Merge-pull-request-71-from-FrankFang-patch-1",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 6 Oct 2014 07:23:41 +0200"
				},
				{
					"sha": "748d8475c859a6bb375fca626678f01bfad4cd37",
					"message": "Update-README.md",
					"author": {
						"name": "Frank Fang",
						"email": "FrankFang1990@gmail.com"
					},
					"date": "Mon, 6 Oct 2014 10:23:42 +0800"
				},
				{
					"sha": "9cd7956612653a1000b86c6ac0dfca10fa9cc13a",
					"message": "Syntax-error-expected",
					"author": {
						"name": "Frank Fang",
						"email": "FrankFang1990@gmail.com"
					},
					"date": "Mon, 6 Oct 2014 10:19:38 +0800"
				},
				{
					"sha": "6b264b86cf86c884610b854119d44cac50b28af2",
					"message": "Merge-pull-request-70-from-marmelab-fix_creation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 5 Oct 2014 19:31:38 +0200"
				},
				{
					"sha": "44f5aec5d03e2d521fc7a6b437d58447e37adefa",
					"message": "Fix-entity-creation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 5 Oct 2014 16:04:15 +0200"
				},
				{
					"sha": "1a429279e28a7fdd313a46067542ff6325764b02",
					"message": "Merge-pull-request-66-from-BrainCrumbz-doctype-case",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 2 Oct 2014 07:32:23 +0200"
				},
				{
					"sha": "d89ddf4753545dbdff31a020fb3d9661d07359a7",
					"message": "Normalised-DOCTYPE-case-in-index.html",
					"author": {
						"name": "Giuseppe Piscopo",
						"email": "piscopo.giuseppe@gmail.com"
					},
					"date": "Thu, 2 Oct 2014 03:00:03 +0200"
				},
				{
					"sha": "72b7d0c6dfaf942751b5f0a9e91c5743af91fc7e",
					"message": "Merge-pull-request-63-from-BrainCrumbz-grunt-map-deleted",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 23:04:00 +0200"
				},
				{
					"sha": "e56a6f2f0a1a6c2057e7cf1fa1a5ac4e2628b5fc",
					"message": "Generate-source-map-during-minification",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 23:00:20 +0200"
				},
				{
					"sha": "dc6bd690f34226aae1d611a3ab53dc16c5b281f2",
					"message": "Exclude-.map-output-files-from-clean-grunt-task",
					"author": {
						"name": "BrainCrumbz",
						"email": "BrainCrumbz@users.noreply.github.com"
					},
					"date": "Tue, 30 Sep 2014 19:59:18 +0200"
				},
				{
					"sha": "e848e3475de52bf63a153a337c841768f7f4d51f",
					"message": "Update-version",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 19:22:02 +0200"
				},
				{
					"sha": "63cd90179482ef6217a01812c305468a56f35ee9",
					"message": "Merge-pull-request-62-from-marmelab-fix_filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 19:12:33 +0200"
				},
				{
					"sha": "45357a799e030b792fbaf07f479e8006dbde012b",
					"message": "Fix-filter-display",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 18:57:45 +0200"
				},
				{
					"sha": "de848454a539fb262cb42158704ffe7daad0a40f",
					"message": "Merge-branch-master-of-github.com-marmelab-ng-admin",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 18:50:23 +0200"
				},
				{
					"sha": "8fad80ef3b93987c103fa344fd7b4da29182dd31",
					"message": "Fix-fontawesome-path-in-prod-env",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 17:06:28 +0200"
				},
				{
					"sha": "81a5947d5ab3e301acb6bdcab1e72ec3c6787d6e",
					"message": "Update-README.md",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 09:46:53 +0200"
				},
				{
					"sha": "d2a4ecdb9d4f07a5fe6eac0cf10f6b16052ef7c5",
					"message": "Merge-pull-request-60-from-BrainCrumbz-readme-typos",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 30 Sep 2014 08:03:34 +0200"
				},
				{
					"sha": "218ed3ce6416f79394b435170cf1f0601c12acc4",
					"message": "Fixed-missing-parenthesis-typo-in-readme",
					"author": {
						"name": "BrainCrumbz",
						"email": "BrainCrumbz@users.noreply.github.com"
					},
					"date": "Tue, 30 Sep 2014 01:41:06 +0200"
				},
				{
					"sha": "9c0f113769087ff0780156e4630aa24ad19bbba3",
					"message": "Fixed-typos-in-readme",
					"author": {
						"name": "BrainCrumbz",
						"email": "BrainCrumbz@users.noreply.github.com"
					},
					"date": "Tue, 30 Sep 2014 01:27:51 +0200"
				},
				{
					"sha": "2c58f3899ea59100113d0a80e423a9262a1c4f5d",
					"message": "Update-version",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Sep 2014 17:40:12 +0200"
				},
				{
					"sha": "4d6c15a434c5b9fd143ea2e623b9233f9adac0e6",
					"message": "Merge-pull-request-57-from-marmelab-fix_pagination_count",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Sep 2014 17:36:00 +0200"
				},
				{
					"sha": "313bcecedae33ff55c62782e5428cbad106fffd5",
					"message": "Fix-withPagination-attribute",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Sep 2014 17:22:41 +0200"
				},
				{
					"sha": "6c0956d6481769961801acbe385d4f9f4254f196",
					"message": "Fix-datagrid-pagination-count",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Sep 2014 17:03:37 +0200"
				},
				{
					"sha": "ed936858618d8f98811feb8e404b20d91c3bd481",
					"message": "Fix-date-field-controller",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 28 Sep 2014 17:02:30 +0200"
				},
				{
					"sha": "821e0013ecf19c73f4b226a8d90cc4e1829d88a5",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 18:13:38 +0200"
				},
				{
					"sha": "8dc1dc38cf9e4c377106b0a85a7a8df5f6371a08",
					"message": "Merge-pull-request-55-from-marmelab-add_directive",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 18:11:52 +0200"
				},
				{
					"sha": "e8b7a92abb95aa822e7c06ef7c44ee59a80da5ec",
					"message": "temporary-change-date-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 18:10:36 +0200"
				},
				{
					"sha": "5446cc3556ba8b88e1c59145597c7f93b7ab41f6",
					"message": "Add-directives-for-dashboard-menu",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 17:12:55 +0200"
				},
				{
					"sha": "ea0081f16e282d0a20d85cff8243d0e7777ef14e",
					"message": "Add-quick-filter-directive",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 16:45:21 +0200"
				},
				{
					"sha": "c344c61e08fe0e3406d41e4a3ef1189d947f8a08",
					"message": "Add-directive-for-datagrid-pagination",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 16:01:32 +0200"
				},
				{
					"sha": "a5a7dcabc4701c75b30e6e90ce1f6457d47bb35a",
					"message": "Add-directives-for-each-column-type",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 12:02:35 +0200"
				},
				{
					"sha": "7aa5c62636469c7aa649e27e84054cc9a34846bb",
					"message": "Rename-some-field-name",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 11:31:59 +0200"
				},
				{
					"sha": "6742a6892e88008d51466baf5a5e2fa7274ee1e2",
					"message": "Add-directive-for-fields",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 26 Sep 2014 11:15:46 +0200"
				},
				{
					"sha": "efc2955081a32b5d965bda40d98fc391e15eb911",
					"message": "Merge-pull-request-54-from-marmelab-ng_anotate",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 18:03:36 +0200"
				},
				{
					"sha": "151a8a7b5595be01d71fd50c165367055a7bfb70",
					"message": "Use-ng-annotate-in-build-process",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 17:53:16 +0200"
				},
				{
					"sha": "070590a8d1dc79322f5d2a3d6aa7ceba35eed016",
					"message": "Update-version",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 17:37:31 +0200"
				},
				{
					"sha": "ff6867e3fe201412fc3e0d0d83756990208547e4",
					"message": "Merge-pull-request-53-from-marmelab-use_same_structure_everywhere",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 17:28:09 +0200"
				},
				{
					"sha": "ecd5cd9bbb27de5030fc94e6ae09c7c698790bab",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 17:20:01 +0200"
				},
				{
					"sha": "8c4e6fd169d3bb2fc804804b7c735ea9d2ff367c",
					"message": "Fix-dashboard-entries",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 17:12:03 +0200"
				},
				{
					"sha": "5afc4224d7067a43cf1a1193f022028e700b64e9",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 16:16:48 +0200"
				},
				{
					"sha": "3f1541055a3cdc1496373b90d8b1f6e6eaf6b550",
					"message": "Fix-callback-context",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 15:52:52 +0200"
				},
				{
					"sha": "363ab61d3a423a407cc9ddb18a2318e2a8246b2e",
					"message": "Use-same-entity-structure-everywhere",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 25 Sep 2014 14:48:36 +0200"
				},
				{
					"sha": "7c1d9e5b9e5d3bcf406b1a2bff1420cc367f491d",
					"message": "Merge-pull-request-47-from-marmelab-callback_type",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 17:09:21 +0200"
				},
				{
					"sha": "db67ab88f50568eda0bc93ff5269d8a0133ba9b6",
					"message": "Add-a-directive-to-compile-custom-data",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 16:18:09 +0200"
				},
				{
					"sha": "1f301e2f166a8a72f4b0dae44d2d0335006e7a0d",
					"message": "wip-add-directive-callback",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 09:13:44 +0200"
				},
				{
					"sha": "db7990a36bcf45575728b6cf551b0d4763fa79f2",
					"message": "Add-callback-field-type",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 18:04:11 +0200"
				},
				{
					"sha": "306aa683de4d66893a6707de2ef3107a0a603d7b",
					"message": "Merge-pull-request-49-from-marmelab-add_testangular",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 16:52:27 +0200"
				},
				{
					"sha": "9280425406edff1ae7e34c6d50bb58e6e5dcf503",
					"message": "Merge-pull-request-51-from-marmelab-display_list_total",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 16:50:10 +0200"
				},
				{
					"sha": "ea4da5c9b46fdfdd06e026eb4b27e79a003d4a02",
					"message": "Add-total-in-list-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 16:32:08 +0200"
				},
				{
					"sha": "11a06e4d7b66db21e8e7616cc12b9e1a44016910",
					"message": "Merge-pull-request-50-from-marmelab-add_quick_filter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 16:42:39 +0200"
				},
				{
					"sha": "1419fa5429856b574a5015173937b4d527d49507",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 15:03:30 +0200"
				},
				{
					"sha": "3e792a49e738b1702e2620afdeea8656daaaa643",
					"message": "Allows-to-add-quick-filters",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 14:38:22 +0200"
				},
				{
					"sha": "5a822d21511bd73bfbb50180c49382f71b55561f",
					"message": "Add-wysiwyg-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 24 Sep 2014 10:07:36 +0200"
				},
				{
					"sha": "7f4818d298ccfd731d8d10d58b1b6bee3c99dec6",
					"message": "Merge-pull-request-48-from-marmelab-fix_infinite_sort",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 18:54:54 +0200"
				},
				{
					"sha": "ba0ab70fa811c91a0b3db7407734284490cc57ab",
					"message": "Fix-sorting-during-infinite-scroll",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 18:27:50 +0200"
				},
				{
					"sha": "6d8013606b80c4858277f9c535fcf4810656027a",
					"message": "Merge-pull-request-45-from-marmelab-sort_field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:53:55 +0200"
				},
				{
					"sha": "baeb4f3017fdb7ead102a83e0be9e0f7d74a7147",
					"message": "Update-doc",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:53:25 +0200"
				},
				{
					"sha": "453646c3895b068fb165a251164b0feec30f70a7",
					"message": "Add-build-files",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:37:44 +0200"
				},
				{
					"sha": "2ff7d73b9914b6c1cb3d05696d02d7edf3b79b46",
					"message": "Fix-routing",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:36:27 +0200"
				},
				{
					"sha": "5abcc1c6479ebeb5099e8a56e79299e23e3c82dd",
					"message": "Allows-to-sort-list-in-details-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:09:04 +0200"
				},
				{
					"sha": "b5487ffb939ed6f2e7097047a87c39a4d1cdaa82",
					"message": "Add-sorting-on-list-view-in-detail-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Sep 2014 16:42:54 +0200"
				},
				{
					"sha": "b08bcfe60950712ee961259f0076b55b2b17149b",
					"message": "Add-sort-params-for-each-entities",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Sep 2014 08:17:31 +0200"
				},
				{
					"sha": "7b8af11dad14c5513c9898517876ebb9bee94abe",
					"message": "Fix-build-process-for-dev-env",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 14:47:21 +0200"
				},
				{
					"sha": "9124c585f27df6eca84663b5553676b9f396c7d6",
					"message": "Update-README.md",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 12:13:36 +0200"
				},
				{
					"sha": "e55cf17b9034bc13c493d595b8f72af2bfb256af",
					"message": "Merge-pull-request-46-from-marmelab-change_build_structure",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 12:10:30 +0200"
				},
				{
					"sha": "44628b0b5bb0afde7d4c86050b65ec542c2c39b5",
					"message": "Improve-build-process",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 12:05:02 +0200"
				},
				{
					"sha": "b0969a67b642674af3cb034f99141c78f53843e6",
					"message": "Merge-pull-request-31-from-marmelab-build-app",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 09:45:37 +0200"
				},
				{
					"sha": "000748e2ff1c3005db1045c8c624e73c5dc150a8",
					"message": "Add-minification-process",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 22 Sep 2014 23:30:42 +0200"
				},
				{
					"sha": "b4d2e4678a094c541fe7794db072ee0315f8509d",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 22 Sep 2014 22:11:00 +0200"
				},
				{
					"sha": "d0af5017c13ce8e80133bc4037162f812dbc7dfb",
					"message": "Rename-configuration-to-NgAdminConfiguration",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 22 Sep 2014 08:32:15 +0200"
				},
				{
					"sha": "a7dbef7b6f578f50228b3108e72638cb891f024e",
					"message": "Update-test-configuration",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 22 Sep 2014 08:14:04 +0200"
				},
				{
					"sha": "e38e3e57254a282386d767fb5fc852d31c65a77c",
					"message": "Add-build-process",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 22 Sep 2014 08:07:17 +0200"
				},
				{
					"sha": "5e31beefab81673c78f6afe1b3c01514f1a65f63",
					"message": "WIP-build-app",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 10:40:40 +0200"
				},
				{
					"sha": "a4b93e6a4bf659128299555ff21fcff100daad4e",
					"message": "Add-a-provider-to-configure-app-from-another-app",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Sep 2014 18:45:32 +0200"
				},
				{
					"sha": "df30da9e7b53f6d5b6003c65f686bc2b15a71341",
					"message": "wip-use-ng-admin-with-another-app",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Sep 2014 07:20:10 +0200"
				},
				{
					"sha": "5ceeaca07c95ec80ec9ba6844a341f0c5636409f",
					"message": "wip-add-minification",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Sep 2014 08:19:28 +0200"
				},
				{
					"sha": "2b77bb6df5a3cdfc3ec935940ecd02a810e73594",
					"message": "Add-build-process",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Sep 2014 08:14:38 +0200"
				},
				{
					"sha": "4c4515688d6d8def8984c8eb4299c3b67427ac33",
					"message": "Update-README.md",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 15:51:42 +0200"
				},
				{
					"sha": "aaf4b25ea4dcb8d2b9fcd9d876e66c2a6bd8dff4",
					"message": "Update-README.md",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 15:51:26 +0200"
				},
				{
					"sha": "30977cd3c1485c03c95c82adb570de382e2601cd",
					"message": "Merge-branch-master-of-github.com-marmelab-ng-admin",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 15:47:52 +0200"
				},
				{
					"sha": "4008f076413c90350c3f519b840c02b9256abdd9",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 15:37:55 +0200"
				},
				{
					"sha": "6f97c76d70e67e3ff4c10ca9744661d174459097",
					"message": "Fix-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 10:43:52 +0200"
				},
				{
					"sha": "54b535de87be5042aed5c09ead85c4c86cc68339",
					"message": "Merge-pull-request-44-from-marmelab-authentication",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 10:19:10 +0200"
				},
				{
					"sha": "1c2aa29133ec39d74b8ce90bf40bb947a234f51c",
					"message": "Allows-to-add-extra-headers-for-each-actions",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 18 Sep 2014 07:52:49 +0200"
				},
				{
					"sha": "0b4d7d331cda7cc61c816c43e30c9794b726b8dd",
					"message": "Merge-pull-request-41-from-marmelab-fix_tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Sep 2014 10:45:00 +0200"
				},
				{
					"sha": "eec65bf2765ad2ed77408089a9c0989ec8ada9bd",
					"message": "Merge-pull-request-40-from-marmelab-fix_filter_pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 17 Sep 2014 10:44:39 +0200"
				},
				{
					"sha": "3c8713a5cb19a368cf031a6f49d2f4176725f5a8",
					"message": "Bootstrap-tests-on-travis",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Sep 2014 08:38:44 +0200"
				},
				{
					"sha": "68805953bdd057dc6f088633d3b00b878b3684fe",
					"message": "Preserve-filter-during-pagination",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 17 Sep 2014 08:00:09 +0200"
				},
				{
					"sha": "0ffa90e5901eb657c374ab2b18972ae1fcb0227a",
					"message": "Merge-pull-request-38-from-marmelab-use_nprogress",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 16 Sep 2014 22:53:01 +0200"
				},
				{
					"sha": "25c9115648f9fa5a6f76a4a53e22779507efd233",
					"message": "Merge-pull-request-37-from-marmelab-fix_npm_bower",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 16 Sep 2014 22:51:41 +0200"
				},
				{
					"sha": "41fe24ea5341a756e12849c91d05b061f351d117",
					"message": "Use-nprogress-instead-of-css-spinner",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Sep 2014 22:00:48 +0200"
				},
				{
					"sha": "4cebb5db851a0812013e5ed2394904e664b68b08",
					"message": "Fix-npm-bower-install",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 16 Sep 2014 21:22:35 +0200"
				},
				{
					"sha": "8f4494bd5512933e8726e4b044c1d354153637c9",
					"message": "add-link-to-the-launch-post",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 18:14:34 +0200"
				},
				{
					"sha": "542644f0998a0017e227504b19f647e9ad5b6329",
					"message": "Update-README.md",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 17:51:42 +0200"
				},
				{
					"sha": "2df48065c877d2aa5a61b392ffc61a47ac016c3d",
					"message": "Add-link-to-demo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 17:00:17 +0200"
				},
				{
					"sha": "872900de3cf539e3dd61f97814420aa29e3eb5ac",
					"message": "Add-link-to-screencast",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 15:47:51 +0200"
				},
				{
					"sha": "04476f13cfd036345c7d578d3eaa3a3c4a85a198",
					"message": "Fix-clean-form-for-ReferenceMany-fields",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 15:00:28 +0200"
				},
				{
					"sha": "df9591414858ceab27350511fdba5242e0d3c56c",
					"message": "Merge-pull-request-30-from-marmelab-pre-publish",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Mon, 15 Sep 2014 14:35:07 +0200"
				},
				{
					"sha": "f0473c0fd7c2ff42647973c03740d473b25ac2ad",
					"message": "Change-create-edit-success-message",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 14:32:34 +0200"
				},
				{
					"sha": "392660204372a215005dde754b8db23f69249b00",
					"message": "Truncate-values-in-list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 14:24:01 +0200"
				},
				{
					"sha": "0c8f3329b7342a6e7f518c01944b99cfc1b40521",
					"message": "Allows-to-edit-title-description",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 13:09:57 +0200"
				},
				{
					"sha": "643a10d9a04154bf8604823d86eb2f835dc6164a",
					"message": "small-improvements-pre-publish",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 11:28:01 +0200"
				},
				{
					"sha": "3d3bf18dfef4fd96b1b22c4b981b84f9caca7b7e",
					"message": "Fix-dashboard-links",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 15 Sep 2014 10:45:48 +0200"
				},
				{
					"sha": "b4b3cb4dcde6e061a082b9cbf807fff70fcc1472",
					"message": "Merge-pull-request-29-from-marmelab-fix_relations",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Sun, 14 Sep 2014 22:28:40 +0200"
				},
				{
					"sha": "1fe667f15a6db8bbf5e82cfb64edfdce6c48874f",
					"message": "Fix-sass-font-URL",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Sun, 14 Sep 2014 21:44:52 +0200"
				},
				{
					"sha": "07a39841e2ac39dd217c1a8a706840ab53d1d82b",
					"message": "Scroll-to-top-after-each-route-changes",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 11 Sep 2014 23:43:23 +0200"
				},
				{
					"sha": "427d7825be5aba250baf1d88f112ffee55ddf549",
					"message": "wrap-filter-into-a-form-to-submit-with-enter-key",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 11 Sep 2014 23:32:08 +0200"
				},
				{
					"sha": "b28beb71d59786bd0d02fb1cf8fba6cf3ddd8386",
					"message": "Refactor-edit-create-controller-into-form-controller",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 11 Sep 2014 23:16:05 +0200"
				},
				{
					"sha": "63cdcbbe13c99797f57989148e2516d07af92dde",
					"message": "Remove-type-check-when-using-ng-options",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 11 Sep 2014 19:16:32 +0200"
				},
				{
					"sha": "c72877adbb71a5480666a58c13e1f4f2e3007115",
					"message": "Fix-filter",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 11 Sep 2014 09:50:42 +0200"
				},
				{
					"sha": "1a95f3fd508b4831f95f5fb670a5a0215673699a",
					"message": "Merge-pull-request-28-from-marmelab-add_filter",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 11 Sep 2014 07:20:32 +0200"
				},
				{
					"sha": "c60be179823049d150d761cec38343daca86c394",
					"message": "update-readme",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Wed, 10 Sep 2014 23:13:17 +0200"
				},
				{
					"sha": "0bf43e211210ff07429bcee47103296ecc669ddf",
					"message": "filter-query-optional",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Wed, 10 Sep 2014 23:10:19 +0200"
				},
				{
					"sha": "629ed2799504578fade2ef9a3471661dd18f7d49",
					"message": "Filter-elements-on-list-view",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Wed, 10 Sep 2014 23:02:14 +0200"
				},
				{
					"sha": "fc6d6fccdca7b6bb558cf6b9b0f1f79afd7c60aa",
					"message": "Merge-pull-request-27-from-marmelab-cosmetic_fixes",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Wed, 10 Sep 2014 21:13:04 +0200"
				},
				{
					"sha": "d8714e60b2a4b67e1ae9ee7b95d5d2de20533274",
					"message": "Fix-in-form-for-required-fields",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 10 Sep 2014 08:27:20 +0200"
				},
				{
					"sha": "8fecd125cebf33c795bf7b5b4b05337f00ce8a29",
					"message": "Rename-app-folder-to-src",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 10 Sep 2014 08:21:15 +0200"
				},
				{
					"sha": "0d534a19876b6b48c7f15062a6a14dbe1e942c1f",
					"message": "Some-code-style",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 10 Sep 2014 07:54:44 +0200"
				},
				{
					"sha": "d8fcc3fbf3f8f45d5d4d07034de161b973bdca14",
					"message": "Add-examples-fix-read-only-display",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 23:36:24 +0200"
				},
				{
					"sha": "9755f46eddc9e381139e0eb40f92f3152e521810",
					"message": "Fix-reference-many-in-reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 23:00:44 +0200"
				},
				{
					"sha": "7b6d357dbe60f03daf793a55a9deee2860fa6a49",
					"message": "Display-N-N-in-list-with-bootstrap-labels",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 22:13:36 +0200"
				},
				{
					"sha": "6e3807e606059b2dad668760068529781f976745",
					"message": "Merge-pull-request-26-from-marmelab-add_textarea",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Tue, 9 Sep 2014 21:14:17 +0200"
				},
				{
					"sha": "153412cdf9d5c4cec82a002962abd661bdab7b7a",
					"message": "Fix-referenced-list-valueTransformer",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 21:09:42 +0200"
				},
				{
					"sha": "8d248c33731a8580773c6e8b839add17ea1fc5f5",
					"message": "Add-textarea-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 21:06:23 +0200"
				},
				{
					"sha": "11818e15d7b7c507c8772fa7cfde18fbf5e0119a",
					"message": "Merge-pull-request-25-from-marmelab-remove_famous",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Tue, 9 Sep 2014 21:12:57 +0200"
				},
				{
					"sha": "8c6a8a3a53a5c61dee85c2dde4c5793d9d462095",
					"message": "Fix-ReferenceMany-edition-config",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 21:01:34 +0200"
				},
				{
					"sha": "e9eee1b0242475f7ea5055c800c27dc44761d1fb",
					"message": "Fix-dashboard-layout",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 07:59:55 +0200"
				},
				{
					"sha": "dbd949ce2f17048057743c68f56f019cf3940668",
					"message": "Remove-famous",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 9 Sep 2014 07:50:19 +0200"
				},
				{
					"sha": "88dc7b6d1442abb50648ab5ea1e8b300fdada462",
					"message": "Fix-loader",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 22:32:13 +0200"
				},
				{
					"sha": "2c8048996d026cdff9720954f080701e8c2db31d",
					"message": "Merge-pull-request-23-from-marmelab-minor_fixes",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Mon, 8 Sep 2014 22:29:53 +0200"
				},
				{
					"sha": "443010e5a3bf42f94dafbcb30866959df06ce6a6",
					"message": "Boostrap-in-app-file",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 22:18:44 +0200"
				},
				{
					"sha": "a84e56a897d502a4119d2fe6b0e0ff9f63bb4a73",
					"message": "Routing-that-works",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 21:14:26 +0200"
				},
				{
					"sha": "6b83cda5e6e8ab7100158638edcb83dc621ed336",
					"message": "Display-referenceMany-values-in-list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 20:22:34 +0200"
				},
				{
					"sha": "795291de8e926f68d209e3459c0697114d183ac3",
					"message": "Merge-pull-request-22-from-marmelab-readme",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 17:03:21 +0200"
				},
				{
					"sha": "25a2ab29f265b1789113cb29315e42fe802a77a5",
					"message": "Add-README",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 17:01:41 +0200"
				},
				{
					"sha": "b94404c035ff631abc6f00544f5434d0bc49f04a",
					"message": "Merge-pull-request-21-from-marmelab-n_n_relation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 16:21:26 +0200"
				},
				{
					"sha": "fe0fa146b5ceb2b9ad1d58bba6fd4d89b4f8555c",
					"message": "Merge-pull-request-20-from-marmelab-use_famous_really",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Mon, 8 Sep 2014 16:20:29 +0200"
				},
				{
					"sha": "d54cc7b2c2080c72d82b4f48890aaaa71f16efa8",
					"message": "Add-relation-N-N-fix-field-order",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 16:19:46 +0200"
				},
				{
					"sha": "5fdad40c123d013993b28a97e337366e93e63ead",
					"message": "Use-famous-really",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 16:12:46 +0200"
				},
				{
					"sha": "85c3c18c94026be4ae40b7d2a81d13c1b5cfa8da",
					"message": "Merge-pull-request-19-from-marmelab-fix_errors",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 14:04:58 +0200"
				},
				{
					"sha": "4c13fad19ac97de0a1f4c413976e690d52dbda10",
					"message": "Fix-validation-error",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 14:00:33 +0200"
				},
				{
					"sha": "4edd979582415af6133371481aad07126e6822f3",
					"message": "Merge-pull-request-18-from-marmelab-minor_fixes",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 11:11:46 +0200"
				},
				{
					"sha": "62006348b9d215512e0df9ff17e135c3c95cb5f9",
					"message": "Remove-debug",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 11:05:28 +0200"
				},
				{
					"sha": "dcec326b4dfa88b87041534d7c339422cb03940b",
					"message": "Fix-datepicker",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 10:58:00 +0200"
				},
				{
					"sha": "d7aa3981ded67e74d5def340a72fbb41ccaeefd6",
					"message": "Show-active-entity-on-sidebar-layout-update",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 8 Sep 2014 09:36:03 +0200"
				},
				{
					"sha": "1213cd18956fe2f8b41dc452cc7e7e4b0c3c3f10",
					"message": "Fix-validation-configuration",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 7 Sep 2014 17:37:25 +0200"
				},
				{
					"sha": "f958d01ade9ae852330a7f6ebd0dfcf28120a935",
					"message": "Minor-fixes",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 7 Sep 2014 17:24:55 +0200"
				},
				{
					"sha": "50e6f31cb3e733b25647659baaf22ed32afc2908",
					"message": "Merge-pull-request-16-from-marmelab-fix_ordering",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Mon, 8 Sep 2014 11:00:01 +0200"
				},
				{
					"sha": "323af087496a2ddcbf995683a282673752821fbb",
					"message": "Merge-pull-request-15-from-marmelab-add_loader",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Mon, 8 Sep 2014 10:59:51 +0200"
				},
				{
					"sha": "be72000331683dd67fcc0554f717a1a40913dade",
					"message": "Display-loader-at-the-bottom-of-the-list-when-infinite-scrolling",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Sep 2014 16:19:15 +0200"
				},
				{
					"sha": "16407ebcc55c1332919ad9db6e8462e16b71b156",
					"message": "Fix-loader",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Sep 2014 15:02:52 +0200"
				},
				{
					"sha": "bba0c404de1d506c5d59d3c6772d8f1a46ff70d3",
					"message": "Fix-field-ordering",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Sep 2014 09:41:32 +0200"
				},
				{
					"sha": "ec908ee5d186736c94d750135c14e59d861fda35",
					"message": "Merge-pull-request-13-from-marmelab-customize_url",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Sep 2014 18:38:11 +0200"
				},
				{
					"sha": "273fbbc269b7636ab09086c65c5abfd10d86ef02",
					"message": "Merge-pull-request-17-from-marmelab-move_var_to_controller",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Sep 2014 17:15:06 +0200"
				},
				{
					"sha": "ae27a72561b616bfb2325b30cd319ff282cd09bd",
					"message": "Move-variables-to-controllers",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 4 Sep 2014 08:02:37 +0200"
				},
				{
					"sha": "a42005021667bd075b204afd81b82a4524265a13",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 1 Sep 2014 08:29:01 +0200"
				},
				{
					"sha": "5d5b8d5dea17b320dae061406180e82fd48b31a4",
					"message": "Add-valueTransformers",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 1 Sep 2014 07:47:12 +0200"
				},
				{
					"sha": "73c978871fc6183e20d1e8a09cc2498ffc734d5e",
					"message": "Allows-better-configuration",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 28 Aug 2014 09:10:40 +0200"
				},
				{
					"sha": "ee9f0a30dd5c822d923bced2256f3db9d9bbd217",
					"message": "Merge-pull-request-14-from-marmelab-1_n_relationship",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 3 Sep 2014 18:15:07 +0200"
				},
				{
					"sha": "9f2d6fd07ba53a0e26932490e230c68dcdf17ec1",
					"message": "Set-field-order-automatically",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Sep 2014 07:59:36 +0200"
				},
				{
					"sha": "06a748f50d74ec8519cc13713682cacea1da372c",
					"message": "Add-view-list-in-edit-view",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 3 Sep 2014 07:41:28 +0200"
				},
				{
					"sha": "74599e4b27045c2ed502f86874d57e41a777e97e",
					"message": "Add-one-to-many-relationship",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 2 Sep 2014 08:33:03 +0200"
				},
				{
					"sha": "bd3e361e5bb6412460bc3c306474c0eeff292bc3",
					"message": "Merge-pull-request-12-from-marmelab-fix_grunt_serve",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 29 Aug 2014 09:05:49 +0200"
				},
				{
					"sha": "6ad9ebbb87514ad7a74e08b876023d0d2fcd04ba",
					"message": "Merge-pull-request-11-from-marmelab-reference_in_list",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 28 Aug 2014 22:09:20 +0200"
				},
				{
					"sha": "b23ebd63ef372a16bc52a2959b0916e554c80ebb",
					"message": "Use-crudManager.getAll-in-panelBuilder",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 27 Aug 2014 16:54:25 +0200"
				},
				{
					"sha": "c8407fe763ab5a55bd9631d76b909817623f047b",
					"message": "Allows-to-display-reference-value-in-list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 27 Aug 2014 15:37:31 +0200"
				},
				{
					"sha": "048d132b855b3770c208afff203d5e3887a8b64c",
					"message": "Use-grunt-to-serve-static-content",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 27 Aug 2014 16:40:09 +0200"
				},
				{
					"sha": "a205d0a7545ae9e0cbefa95a4929a888690cb197",
					"message": "Merge-pull-request-10-from-marmelab-configurable_pagination",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Aug 2014 16:25:11 +0200"
				},
				{
					"sha": "f388b209f3fac0fa301b3e21c531e98fd825c731",
					"message": "Add-infinite-pagination",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 27 Aug 2014 11:09:11 +0200"
				},
				{
					"sha": "7cde2ed5672e03d3dda92df1798b0289feade1ad",
					"message": "Add-nextPage-method",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 Aug 2014 23:21:13 +0200"
				},
				{
					"sha": "20989643022ee944dd771f2f1c1afdaf0d57b096",
					"message": "Add-infinite-pagination-directive",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 Aug 2014 09:14:40 +0200"
				},
				{
					"sha": "af0c22ab1d9f99c05786f8a50d849680d9394c3f",
					"message": "Add-configurable-pagination-params",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 26 Aug 2014 08:06:51 +0200"
				},
				{
					"sha": "d7defd0ce3edf84ff1b87c660121ddd80e6f9871",
					"message": "Add-programmatic-configuration",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 Aug 2014 07:22:53 +0200"
				},
				{
					"sha": "4ed723e6f8cb1eb28c43d3d8a6543b38791d5f2e",
					"message": "Merge-pull-request-9-from-marmelab-add_reference_field",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 27 Aug 2014 09:59:47 +0200"
				},
				{
					"sha": "06503b235fd26f421f03f2308e1b3a2fa0165d10",
					"message": "Add-tests",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Thu, 21 Aug 2014 20:59:04 +0200"
				},
				{
					"sha": "e77dabba6b08a8e5311fa674d9c956ec2c3943e1",
					"message": "Change-test-bootstrap-to-use-new-structure",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Wed, 20 Aug 2014 07:54:28 +0200"
				},
				{
					"sha": "0b14dc52eee2905614090479b9343ceb4bac014a",
					"message": "Add-a-select-to-choose-reference",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 19 Aug 2014 22:08:33 +0200"
				},
				{
					"sha": "0395136c49d55e2098bdc2636056ffd38de0bcc8",
					"message": "Add-reference-field",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 19 Aug 2014 07:52:51 +0200"
				},
				{
					"sha": "ecd286108f7c0b2b4d9b507f9b01e27df4b3b868",
					"message": "Merge-pull-request-7-from-marmelab-programmatic_configuration",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Aug 2014 18:33:08 +0200"
				},
				{
					"sha": "88856b608609ba856d6c5ac209c29bb44462bd43",
					"message": "Add-programmatic-configuration",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 Aug 2014 07:22:53 +0200"
				},
				{
					"sha": "de5d17c6c4025012a10467e7b31d21d52bd81166",
					"message": "Merge-pull-request-8-from-marmelab-add_some_input_type",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 26 Aug 2014 09:03:19 +0200"
				},
				{
					"sha": "16b17ce9ae0d10b1fd7bbd2e652d8a1167d0c445",
					"message": "Minor-fixes",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 18 Aug 2014 07:26:10 +0200"
				},
				{
					"sha": "a61499ee0f268b2c6d4df6b8b431f33455d14d61",
					"message": "Merge-pull-request-6-from-marmelab-add_datepicker",
					"author": {
						"name": "Daphné Popin",
						"email": "DaphDaOne@users.noreply.github.com"
					},
					"date": "Mon, 21 Jul 2014 17:31:17 +0200"
				},
				{
					"sha": "7e15fd00c14cd20bc5827ef15fd56a1fb25a1c43",
					"message": "Add-datepicker",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 17:25:41 +0200"
				},
				{
					"sha": "26e8e47d69868d4a3d93c8a1e3d18a28eb975088",
					"message": "Merge-pull-request-5-from-marmelab-fix_error_double_creation",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 17:19:04 +0200"
				},
				{
					"sha": "ee948820d529f0dd303ad5ed3ff8a003344a2b65",
					"message": "Fix-error-after-double-creation",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 17:17:43 +0200"
				},
				{
					"sha": "215abbb5450ca9076b83595315f7d83476e92677",
					"message": "Merge-pull-request-4-from-marmelab-add_loader",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 16:54:30 +0200"
				},
				{
					"sha": "83570d5a320f58bc6ba4a46f1600c0dc23e58f68",
					"message": "Code-review",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 16:53:56 +0200"
				},
				{
					"sha": "bad61223986be1d1b1150e4bfa53992c1d557905",
					"message": "Fix-dashboard",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 16:40:49 +0200"
				},
				{
					"sha": "18bbd50de97910ac416880ab7c959a453aeedf3b",
					"message": "Add-Spinner-on-submit-location-change",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 16:33:20 +0200"
				},
				{
					"sha": "1191ce90b7ce7d0ec6daf045070e4b03a5f7e124",
					"message": "Merge-pull-request-3-from-marmelab-change_structure",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 15:30:26 +0200"
				},
				{
					"sha": "18f7d9461cf167d3b822428c858ef5f40af57725",
					"message": "Fix-edition-update-config-field-structure-to-keep-defined-order",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 15:27:38 +0200"
				},
				{
					"sha": "d1261268ee2364c2937091f1fc5d1bddcbdfc6ee",
					"message": "Fix-edition-creation-pagination",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 15:14:32 +0200"
				},
				{
					"sha": "9c34d324bd7a818c411dabf49dc9727556ed1b22",
					"message": "Update-edition",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 14:43:41 +0200"
				},
				{
					"sha": "546d20fa58bc26d2911f6beac2e63b0808a6e644",
					"message": "Add-otherwise-URL",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 14:30:29 +0200"
				},
				{
					"sha": "878c86627ad51659b1ff317f903970701d2f1043",
					"message": "Fix-route-for-edition",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 14:35:14 +0200"
				},
				{
					"sha": "0a261f8074a40bde5a07895ec11137891547cd0d",
					"message": "Add-controllerAs-in-sideBar",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 14:20:45 +0200"
				},
				{
					"sha": "08338459fdaf195ccc962181e0bb2bb91a6c344d",
					"message": "Fix-list",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 14:17:39 +0200"
				},
				{
					"sha": "18666745881d5a0d2cb830801d52d49ef3581c92",
					"message": "Fix-error-on-dashboard",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 13:53:48 +0200"
				},
				{
					"sha": "4ec1dfb42ecafed8b77871adf3066776475196cf",
					"message": "Fix-styles",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 13:32:54 +0200"
				},
				{
					"sha": "076f6638d8e5f2234e39541bcbf809cac0315edc",
					"message": "Change-angular-architecture",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Mon, 21 Jul 2014 12:30:38 +0200"
				},
				{
					"sha": "03b8d32c34b1fd40b679aa51bde7c6dfde5509ac",
					"message": "Merge-pull-request-2-from-marmelab-famous_grid",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 9 Jun 2014 13:31:42 +0200"
				},
				{
					"sha": "279142299207f218b7398a4dfba6de687491df74",
					"message": "Remove-commented-code",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 9 Jun 2014 00:05:44 +0200"
				},
				{
					"sha": "a865337ffbb067566162c2b9c1dece2169a76218",
					"message": "Fix-regression-on-edition-form",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 8 Jun 2014 23:19:52 +0200"
				},
				{
					"sha": "c1c3e02c25a609486ffa3ab609b193c66485c6bd",
					"message": "Bootstrap-requirejs-for-tests",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 8 Jun 2014 23:01:11 +0200"
				},
				{
					"sha": "604030aa18b7dba111ab687cd37dde1c68680e6c",
					"message": "use-requirejs",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Fri, 6 Jun 2014 15:07:27 +0200"
				},
				{
					"sha": "54baa8013c078b8b74ce94683de4195477ded11d",
					"message": "Define-requirejs-baseUrl-in-app.js-instead-of-index.html",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 17:08:06 +0200"
				},
				{
					"sha": "62413dc03113b39ff3324970c913a32892eb03c8",
					"message": "Add-basic-pagination",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 17:03:07 +0200"
				},
				{
					"sha": "91621746b57815ab1243893c793632b87743b722",
					"message": "Remove-obsolete-ng-grid-files",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 14:46:23 +0200"
				},
				{
					"sha": "83b65067463deef6c2e2efce803bbad75b6eb2c7",
					"message": "Code-review-remove-angular-animate",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 14:10:28 +0200"
				},
				{
					"sha": "e9427de02b17e247b9ff0c04d02334b7dde339e8",
					"message": "Code-review",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 13:30:00 +0200"
				},
				{
					"sha": "997ca198f5ec451a95842094eaae4a3b7e09254e",
					"message": "Remove-ng-grid-replace-by-famous-angular",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 12:06:41 +0200"
				},
				{
					"sha": "a682eb4d99744fb2da3c87ddc5555b79165b3bfd",
					"message": "Merge-pull-request-1-from-marmelab-init_project",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 13:28:22 +0200"
				},
				{
					"sha": "ce8d186f1e0442e9143075704670fc38742c8494",
					"message": "Remove-useless-add-missing-reject",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Thu, 5 Jun 2014 09:35:09 +0200"
				},
				{
					"sha": "ba025b7494ced0c06f7c7de4c1ced877a8b58829",
					"message": "Complete-a-test-fix-some-jsdoc",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 2 Jun 2014 15:47:46 +0200"
				},
				{
					"sha": "1b2ded51bcb69ba6f75f96d3e63e8bb4965d6d60",
					"message": "Add-some-tests",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 2 Jun 2014 15:36:37 +0200"
				},
				{
					"sha": "8d6c6e9ea6ea012ceb8fd49f5026a6ea332895f9",
					"message": "Remove-debug",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 2 Jun 2014 15:15:42 +0200"
				},
				{
					"sha": "9d748a60ffec60a8573565dbca56a355d8985fa5",
					"message": "Fix-tests",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 2 Jun 2014 15:14:02 +0200"
				},
				{
					"sha": "89942d6a4dbdd99524447bc11340488f40a5d5d9",
					"message": "Remove-async",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 2 Jun 2014 14:50:35 +0200"
				},
				{
					"sha": "727c6afad9a95236382b27e1f47f4e550f9feaf2",
					"message": "code-review",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Mon, 2 Jun 2014 11:26:54 +0200"
				},
				{
					"sha": "a40a7f369b7ddc0753c9684332f0d913a938ef9b",
					"message": "Change-config-file-structure-add-tests",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Fri, 30 May 2014 19:25:15 +0200"
				},
				{
					"sha": "2f1f567f402969e4adad78c8d882f47b4968ac7c",
					"message": "Code-review",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Wed, 28 May 2014 14:21:29 +0200"
				},
				{
					"sha": "fd0c58ffc2ab3be7c3873a841f94f91cbfbd84b8",
					"message": "Remove-css-files-from-repo",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Wed, 28 May 2014 10:29:30 +0200"
				},
				{
					"sha": "a911781fb5082b07b2dc58fa20aa06636bb573a0",
					"message": "Basic-style-ng-grid",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Wed, 28 May 2014 10:24:26 +0200"
				},
				{
					"sha": "9b2cd585826fb1399c135da15881c7b92fdc7361",
					"message": "Add-humanejs-for-basic-confirmation-messages",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Tue, 27 May 2014 22:14:35 +0200"
				},
				{
					"sha": "951b25311c862f8ecef2cf670468214d9cd066ad",
					"message": "Add-update-create-actions",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Tue, 27 May 2014 00:14:10 +0200"
				},
				{
					"sha": "d31154af99e465e7065b11846ef5ffa7bbfa290d",
					"message": "Refactor-to-a-crudManager-add-delete-action",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 25 May 2014 21:59:40 +0200"
				},
				{
					"sha": "4da1b37db3f9ee99c6db143879cd3c6cb308a605",
					"message": "Basic-display-of-edition-form",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 25 May 2014 02:26:42 +0200"
				},
				{
					"sha": "add5d8c3ff51b89f3a0d706c60dffcbda2ad7573",
					"message": "Add-link-to-edit-form-in-ng-grid",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 25 May 2014 01:51:19 +0200"
				},
				{
					"sha": "b529db0798afb68a3940b21b711510589c7f3e29",
					"message": "Init-project",
					"author": {
						"name": "Daphné Popin",
						"email": "daphne.popin@gmail.com"
					},
					"date": "Sun, 25 May 2014 00:39:04 +0200"
				},
				{
					"sha": "f1a6afd476bb749c62a125b45fb00a42c25e374b",
					"message": "Initial-commit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 22 May 2014 05:00:10 -0700"
				}
			]
		},
		{
			"name": "EventDrops",
			"commits": [
				{
					"sha": "854d17d21dd30e73128f134574c1a26877663369",
					"message": "Push-v0.3.0-alpha1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 16:47:24 +0200"
				},
				{
					"sha": "44b9bcb1cd722f7ffcb98755c17faf0bcfe4630a",
					"message": "Merge-pull-request-95-from-marmelab-deployment",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 16:40:09 +0200"
				},
				{
					"sha": "2e4732cce480cb9fee4aefccdf40a23bb257ea76",
					"message": "Exclude-built-files-from-repository",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 16:02:40 +0200"
				},
				{
					"sha": "a80b351dd0a2979b010c0a85a1958644436e8425",
					"message": "Merge-pull-request-87-from-marmelab-events_renaming",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 15:56:11 +0200"
				},
				{
					"sha": "050643b0a154f5ecbbc63762d333d8742c392514",
					"message": "Merge-pull-request-92-from-Smart-Sports-feature-package-cleanup",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 1 Sep 2016 10:46:51 +0200"
				},
				{
					"sha": "65c41d3b18b55f28d7252d735d4d1202f5f0b403",
					"message": "Package-cleanup",
					"author": {
						"name": "Simon Hartcher",
						"email": "simon@simonhartcher.com"
					},
					"date": "Thu, 1 Sep 2016 17:20:54 +1000"
				},
				{
					"sha": "5733a24c6fbe11f20583b39e6a0c319929259d77",
					"message": "Better-events-naming",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 17:40:17 +0200"
				},
				{
					"sha": "c55c939e0a71ed285429efbb6d2643b080fec948",
					"message": "Merge-pull-request-86-from-marmelab-mouseout",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Tue, 12 Jul 2016 18:02:18 +0200"
				},
				{
					"sha": "6f1cb61925235410cfbcefc4b9c37e47a4313dca",
					"message": "Update-CHANGELOG-and-README",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 17:24:22 +0200"
				},
				{
					"sha": "35b1e2228413d67376d75216465f7f930c86e392",
					"message": "Add-mouseout-handler",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 11 Jul 2016 17:22:47 +0200"
				},
				{
					"sha": "beb984beefbfef512dedc17010c80dcc6699a748",
					"message": "Merge-pull-request-73-from-marmelab-labels-width",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 6 Jul 2016 17:29:50 +0200"
				},
				{
					"sha": "d71ab2567c3a8bf76764849da9195f79215a34ae",
					"message": "Fix-tests-and-first-code-review",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 4 Jul 2016 18:19:42 +0200"
				},
				{
					"sha": "c6183995fc8be2e37df1abb57daeb4d001ef5e97",
					"message": "Remove-magical-constants",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 29 Jun 2016 18:39:41 +0200"
				},
				{
					"sha": "74d335c756e696c3f019bc7c2f76fa99bffe8829",
					"message": "Trying-to-fix-npm-issues",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 30 Mar 2016 11:58:21 +0200"
				},
				{
					"sha": "a85ed9486555e3105b117f05b4188f4c22e033e9",
					"message": "Added-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 30 Mar 2016 11:36:40 +0200"
				},
				{
					"sha": "76766343b793064cd1b09db0e3d1c1f7dd215c52",
					"message": "RFR-Configurable-labels-width",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 30 Mar 2016 10:01:23 +0200"
				},
				{
					"sha": "0a48a8abeeeb61fe916315696f0d673b22642aaa",
					"message": "Merge-pull-request-80-from-marmelab-responsive",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 27 Jun 2016 17:53:24 +0200"
				},
				{
					"sha": "020b43c90189d36ebfb097faa20e7b31da5c62d9",
					"message": "Update-demo",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 15 Jun 2016 14:19:06 +0200"
				},
				{
					"sha": "23f8aa5d9ef058610071bdef41e116d7753b496a",
					"message": "Rebuild-lib",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 15 Jun 2016 14:13:11 +0200"
				},
				{
					"sha": "f4545da382b1ed2956e64e37ee2993537f7e4544",
					"message": "Code-reviews",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 15 Jun 2016 14:09:05 +0200"
				},
				{
					"sha": "b4ac4b263962ce67dbbae5b678681d36688c1fb0",
					"message": "Fix-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 2 Jun 2016 13:47:08 +0200"
				},
				{
					"sha": "fd227dc1cd29db0f9ecb77d6b95af9dc81c24225",
					"message": "Use-clientWidth-instead-of-offsetWidth",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 24 May 2016 17:34:09 +0200"
				},
				{
					"sha": "59b9647a69adbbbf7688649f4969ea7a47375cd9",
					"message": "SVG-now-fits-parent-dimensions",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 23 May 2016 18:19:41 +0200"
				},
				{
					"sha": "ad3deff1af6fa2d62174d2391bb23bdee2e47631",
					"message": "Merge-pull-request-76-from-anicke-master",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 15 Jun 2016 14:02:51 +0200"
				},
				{
					"sha": "9a78b424245215a77d45cd1130571e9752f43a62",
					"message": "Enable-extra-information-in-passed-data",
					"author": {
						"name": "Niklas Aronsson",
						"email": "niklas.aronsson@ericsson.com"
					},
					"date": "Mon, 2 May 2016 13:16:12 +0200"
				},
				{
					"sha": "78a1520466347640914928d9fb2da3972f88d4e9",
					"message": "Merge-pull-request-79-from-marmelab-zoom_center",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 10:09:25 +0200"
				},
				{
					"sha": "db72a2b3983d1b02ec64c97222723672ce4393ab",
					"message": "Add-back-node_modules-cache",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 08:18:48 +0200"
				},
				{
					"sha": "3c7f5c6e9b46b159c1d6e1e359a22b9d3e93ab46",
					"message": "Try-to-fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 08:08:29 +0200"
				},
				{
					"sha": "23ff6a0887802010109c993d9b1874a8c364097c",
					"message": "Add-unit-test-to-prove-zoom-center-issue-resolution",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 23 May 2016 17:39:37 +0200"
				},
				{
					"sha": "adccdc8f580999b7b89436ab4901de9e9391bd19",
					"message": "Fix-zoom-center-position",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 23 May 2016 17:33:52 +0200"
				},
				{
					"sha": "e7ac586020269bef08e9789329339afe01040b0f",
					"message": "Merge-pull-request-74-from-marmelab-help-makefile",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 21 Apr 2016 14:09:00 +0200"
				},
				{
					"sha": "20abe7baeb3cfd05fad85b5484f0b90e4150f78c",
					"message": "make-help",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 21 Apr 2016 14:07:23 +0200"
				},
				{
					"sha": "9aee348a51e5897ac78e92a89b65c8847c9adef4",
					"message": "Update-version-to-0.2.0",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 09:13:04 +0100"
				},
				{
					"sha": "59be9cb67b851c07f99b90b5cd9978f1e6ef8896",
					"message": "Merge-pull-request-68-from-marmelab-contributors",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 09:07:04 +0100"
				},
				{
					"sha": "39a90e3458dd4615bdb7f106804b306dbdb223cc",
					"message": "Merge-pull-request-69-from-marmelab-CHANGELOG",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 09:06:46 +0100"
				},
				{
					"sha": "cd78e8af32de88fb6aa026173dbc3bd4ee18bf1b",
					"message": "Add-CHANGELOG-file",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 8 Mar 2016 18:27:44 +0100"
				},
				{
					"sha": "4ee78ea631fa79fc8d90be909c4a97af3e294669",
					"message": "Add-contributors",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 8 Mar 2016 18:23:49 +0100"
				},
				{
					"sha": "598fbb3f2df099fd5ed1618b4798dea113aec0f7",
					"message": "Rebuild-files",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 12:43:16 +0100"
				},
				{
					"sha": "573202c41b802c9fd31263c0bbd86a7fe864b42b",
					"message": "Merge-pull-request-66-from-marmelab-clippath",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 10:30:45 +0100"
				},
				{
					"sha": "c82f025851b3bc4383cc174a86066e507eb3711b",
					"message": "Fix-clip-path-issue-on-Firefox",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 09:51:43 +0100"
				},
				{
					"sha": "3f7d3f7fca68f8e5cc40fc2f4bd5252483d399bf",
					"message": "Merge-pull-request-62-from-marmelab-configurable",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Tue, 23 Feb 2016 21:23:38 +0100"
				},
				{
					"sha": "b4fb53bcb6faa1cf2425ae13260f4beafd8497fb",
					"message": "Fix-configurable-require",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 23 Feb 2016 21:10:53 +0100"
				},
				{
					"sha": "a0cd0b22cbbff2bef2a4f37ac305579b92d6bce0",
					"message": "Use-recently-published-configurable.js-library",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 23 Feb 2016 21:08:40 +0100"
				},
				{
					"sha": "f4ea8213ead06641d9f8d201188a793d4a8810b4",
					"message": "Update-built-files",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 17:40:58 +0100"
				},
				{
					"sha": "42c6e1d241349b349bc5aea6b97d6f038dffbdc1",
					"message": "Update-configurable.js-dependency-path-to-make-Travis-pass",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 18:40:57 +0100"
				},
				{
					"sha": "c1b20665c2dbdb69e308f65f6820e6c52b19a966",
					"message": "Use-correct-configurable-repository",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 18:17:17 +0100"
				},
				{
					"sha": "0be6800308590d94875110751c0cf50e01029394",
					"message": "Use-external-configurable-library",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 18 Feb 2016 18:21:54 +0100"
				},
				{
					"sha": "76b101b49743f03c498f21b85062c9277ac434f4",
					"message": "Merge-pull-request-58-from-marmelab-hover_fixes",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 19 Feb 2016 18:15:18 +0100"
				},
				{
					"sha": "9dd25365af453c1aa6d1a5208647abf49576e136",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 18:10:21 +0100"
				},
				{
					"sha": "5e1a6b90c8a47849a2e18dc09c7e1c3b041de74b",
					"message": "Merge-pull-request-56-from-marmelab-css_fix",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 19 Feb 2016 09:29:54 +0100"
				},
				{
					"sha": "52d357a58d2ed3077999ac4ae171fb3cc9bc868c",
					"message": "Code-cleanup",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 18 Feb 2016 18:12:35 +0100"
				},
				{
					"sha": "a043f793ced89347ce45bfff9c7d0100a25e34e5",
					"message": "Add-tests-for-event-handlers",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 18 Feb 2016 18:04:16 +0100"
				},
				{
					"sha": "c8be6fc3c5976f623d98a26ea14ce407aa679336",
					"message": "Fix-some-ES6-inconsistencies",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 09:12:50 +0100"
				},
				{
					"sha": "f80530a735d821739711aaa4ba1cef91f6fb433c",
					"message": "Fix-event-listeners",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 09:10:42 +0100"
				},
				{
					"sha": "9f013dee789801f2e958623375ed471bcea7e8a3",
					"message": "Fix-version-for-extract-text-webpack-plugin",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 8 Feb 2016 09:04:32 +0100"
				},
				{
					"sha": "957a13a0aad39487a38dac3decae4816eab82962",
					"message": "Update-deploy-demo-command",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 4 Feb 2016 09:25:14 +0100"
				},
				{
					"sha": "8ab22a9960c0ca668b991986070f2f032faf72d6",
					"message": "Use-ExtractTextPlugin-to-deal-with-CSS",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 4 Feb 2016 09:23:27 +0100"
				},
				{
					"sha": "3ae4e222307f58d87b79240d601224beeda97761",
					"message": "Merge-pull-request-61-from-marmelab-umd",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 19 Feb 2016 09:21:23 +0100"
				},
				{
					"sha": "4c120e2680592caed5ccd448ca90edac7072f6c8",
					"message": "Merge-pull-request-60-from-marmelab-remove_phantomjs",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 19 Feb 2016 09:20:57 +0100"
				},
				{
					"sha": "033923abea5298dcb11195b2002317c95105f34c",
					"message": "Export-library-in-UMD-format",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 08:15:15 +0100"
				},
				{
					"sha": "0aacc8a421d6c2c451733d207d93ca0472a436c0",
					"message": "Fix-Travis-build",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 08:01:47 +0100"
				},
				{
					"sha": "2c3074fb45ae70369e1b652e05472c16543345ff",
					"message": "Speed-up-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 07:43:02 +0100"
				},
				{
					"sha": "c91cc99a8708e72929ae3a1f20dc38a32e629f43",
					"message": "Use-Firefox-instead-of-PhantomJS-for-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 07:37:30 +0100"
				},
				{
					"sha": "daeadcbc0194f8d37bf4d6809e9bfc0538005732",
					"message": "Merge-pull-request-57-from-marmelab-removing_bower",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 8 Feb 2016 09:14:08 +0100"
				},
				{
					"sha": "ad40dd6bcea81960d4921a37f21f171adc46297f",
					"message": "Remove-Bower-support",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 8 Feb 2016 09:06:47 +0100"
				},
				{
					"sha": "8cf94ca69c2a2bc0d27eb8d96765762f2ad0b0a2",
					"message": "Merge-pull-request-54-from-marmelab-multiple_calls",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Wed, 3 Feb 2016 09:51:35 +0100"
				},
				{
					"sha": "046d2a2e18f57ead77ce73fb46fdacf3b8e0b81d",
					"message": "Prevent-duplicating-charts-on-consecutive-calls",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 3 Feb 2016 09:28:21 +0100"
				},
				{
					"sha": "a7748bd804eefda4924b94f79286771ff9ab949b",
					"message": "Merge-pull-request-53-from-marmelab-configurable_zoom",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Wed, 3 Feb 2016 09:47:18 +0100"
				},
				{
					"sha": "15db138480e25dab0c9efc4d4295a01af39d2d61",
					"message": "Fix-some-linting-issues",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 3 Feb 2016 09:06:11 +0100"
				},
				{
					"sha": "4d16f2114ad24300c82e64e3f6e0021c7a2c94e9",
					"message": "Update-doc",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 2 Feb 2016 09:33:08 +0100"
				},
				{
					"sha": "34ca4c907abd4076bfef8982a7e6281c64cce468",
					"message": "Render-zoom-handlers-optional",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Tue, 2 Feb 2016 09:30:50 +0100"
				},
				{
					"sha": "1b1eb4f153f3a5b1acbfb06eb5395282b59cb547",
					"message": "Merge-pull-request-52-from-marmelab-babel6",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 29 Jan 2016 10:48:21 +0100"
				},
				{
					"sha": "7de21484fd0fc952443a78b06f7f91a9906352c2",
					"message": "Remove-dead-code",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 29 Jan 2016 10:40:41 +0100"
				},
				{
					"sha": "468e0be9eebfd85c274d3ff2b6ee0ea6040331ae",
					"message": "Fix-test-command",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 09:26:57 +0100"
				},
				{
					"sha": "4287208e8dfd47382e0958568cec9f2ef3a20c13",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 09:20:29 +0100"
				},
				{
					"sha": "5194b8cdb2d6ca4d401b84adb30e8922ceef7439",
					"message": "Fix-ES6-inconsistencies",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 21 Jan 2016 09:14:36 +0100"
				},
				{
					"sha": "d19119cca76a45c4a95083b16c1b2f17be46d6d7",
					"message": "Upgrade-Babel-to-Babel6",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 20 Jan 2016 09:24:34 +0100"
				},
				{
					"sha": "4be35609e9821ee4b3773a043ec284c18121eed1",
					"message": "Merge-pull-request-43-from-marmelab-code_splitting",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Mon, 25 Jan 2016 09:32:11 +0100"
				},
				{
					"sha": "18bc7fd5508005229a17ab27ad7de0bb3445a013",
					"message": "Code-review-second-round",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 22 Jan 2016 09:20:33 +0100"
				},
				{
					"sha": "0cfde0930c5bc987084ebb27b1524a46981014c1",
					"message": "Code-review",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 21 Jan 2016 09:07:18 +0100"
				},
				{
					"sha": "d8edad1a3055cca999823e47010bffb3b1dee8f4",
					"message": "Remove-commented-code",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 20 Jan 2016 09:08:58 +0100"
				},
				{
					"sha": "fd824df102e16b94d10676521cd75d9297c7f0dc",
					"message": "Update-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 14 Jan 2016 18:15:15 +0100"
				},
				{
					"sha": "ce944c9b5252ff26f36fff1cefcf3fd12ed03d59",
					"message": "Fix-existing-Karma-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 14 Dec 2015 18:58:25 +0100"
				},
				{
					"sha": "e77286758276df747a41e601d134db6540bdf0b2",
					"message": "Fix-axes-display",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 19:11:06 +0100"
				},
				{
					"sha": "7becc2f4eddcf51f476fd6d4191f10250e2db61b",
					"message": "Better-use-of-enter-and-exit",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 10 Dec 2015 18:43:46 +0100"
				},
				{
					"sha": "f39ae42f3a708517b27829ac1993d8bbc16fd975",
					"message": "Add-back-delimiters",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 27 Nov 2015 19:56:04 +0100"
				},
				{
					"sha": "214c65c94a58105c5cac6f62f760cae08b2673d3",
					"message": "Fix-zoom-center",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 27 Nov 2015 19:30:12 +0100"
				},
				{
					"sha": "1915ecc062e132d876a14bc2ef620430fdd5f859",
					"message": "Add-back-line-colors",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 27 Nov 2015 19:15:15 +0100"
				},
				{
					"sha": "62b0d6ddee6eb22792bf36642f49d7eda1dd91ce",
					"message": "Add-clip-mask",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 27 Nov 2015 18:58:02 +0100"
				},
				{
					"sha": "3821aa5c49512a69e3582ddd1697eb7aa5f9b3be",
					"message": "Clean-general-structure",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 25 Nov 2015 09:17:13 +0100"
				},
				{
					"sha": "256064789264ada37bb8bc1505a9ba454bf93a93",
					"message": "Clean-Zoomer",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 23 Oct 2015 18:04:03 +0200"
				},
				{
					"sha": "701cfdddb924c3055f1353e347dd700dcd2ce208",
					"message": "Replace-eventLine-by-two-drawers",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 12 Oct 2015 09:21:03 +0200"
				},
				{
					"sha": "c7f95c45023798d3f8e1ee7a50494650bd188610",
					"message": "Split-axes-drawing-into-dedicated-drawers",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 8 Oct 2015 09:49:36 +0200"
				},
				{
					"sha": "d1bf522c967d290a4959aa92fde13d3aeb6a20af",
					"message": "Start-splitting-code-early-WIP",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 17:48:07 +0200"
				},
				{
					"sha": "d55f8b001dc659eacef20edfec8b7159cffaa923",
					"message": "Merge-pull-request-50-from-messense-messense-patch-1",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 4 Dec 2015 10:56:48 +0100"
				},
				{
					"sha": "64d558a799b94c0468866d486b7af4613df521e0",
					"message": "Fix-main-in-package.json",
					"author": {
						"name": "messense",
						"email": "messense@icloud.com"
					},
					"date": "Fri, 4 Dec 2015 17:03:31 +0800"
				},
				{
					"sha": "3c2e4d176cf84531bf0015e3af6089aef19ad3bb",
					"message": "Merge-pull-request-48-from-marmelab-fix_css_error",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 6 Nov 2015 08:51:58 +0100"
				},
				{
					"sha": "e93ab2c1942cc95aa93a2193c3ec60dba12f4531",
					"message": "fix-make-run",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 5 Nov 2015 20:13:51 +0100"
				},
				{
					"sha": "837d701ec2247590670f1395715b9dd6b4b2bd42",
					"message": "fix-css",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 5 Nov 2015 20:13:39 +0100"
				},
				{
					"sha": "80f11b2ecd64653f933a57265eea0b0ce621c747",
					"message": "Merge-pull-request-44-from-marmelab-deploy_gh_pages",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Oct 2015 09:22:48 +0200"
				},
				{
					"sha": "b8ed52eeca33320334ee9d53a89c442028b67ae3",
					"message": "Fix-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 7 Oct 2015 09:12:39 +0200"
				},
				{
					"sha": "d9079a485b0b185843c71eeaee01eb71b354f5f5",
					"message": "Better-cleaning-after-demo-deployment",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 7 Oct 2015 09:09:18 +0200"
				},
				{
					"sha": "fe8a3b264a511e6730c95104c3607107e8ed286f",
					"message": "Add-link-to-the-demo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 1 Oct 2015 23:27:39 +0200"
				},
				{
					"sha": "5424a76273994120abeb432972fcadbd146fc5d4",
					"message": "Create-a-deploy-gh-pages-task",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 28 Sep 2015 18:22:04 +0200"
				},
				{
					"sha": "ea3db91a543e4edfb1efb204ab7ddf9c87ef880c",
					"message": "Merge-pull-request-42-from-marmelab-webpack",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 25 Sep 2015 13:55:28 +0200"
				},
				{
					"sha": "dcb31cfe1b95f23ff1f277886916a24e51a5526e",
					"message": "Fix-test",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 13:53:29 +0200"
				},
				{
					"sha": "473f5393dd944c40f800d15c827bfb1eb7a95c95",
					"message": "Add-live-reload",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 13:49:51 +0200"
				},
				{
					"sha": "63ff9be337438b9a7dc7802776b393b68b8f6b08",
					"message": "Update-README-with-Webpack-use",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 11:46:40 +0200"
				},
				{
					"sha": "c8ebebc4090e41bb6adc88db65bcb3ac05980025",
					"message": "Do-not-use-a-CDN-for-D3.js",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 11:41:55 +0200"
				},
				{
					"sha": "70e595638f19ef043c5053021f9ec1193276fc08",
					"message": "Remove-require-UMD-wrapper",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 11:29:59 +0200"
				},
				{
					"sha": "dd9a245e71bbcc5c0253203907d069d2f9198b74",
					"message": "Serve-demo-with-Webpack",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 11:29:28 +0200"
				},
				{
					"sha": "48c0e73f439f26377d591b2caeff63397e86654a",
					"message": "Remove-obsolete-packages",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 09:44:39 +0200"
				},
				{
					"sha": "932760189f82119d8586f9258f9c05523f7a0105",
					"message": "Bootstrap-Webpack-configuration",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 09:40:11 +0200"
				},
				{
					"sha": "31d45c15bcad2cfde8cdf0e9dbc9cd0347ab6c2f",
					"message": "Merge-pull-request-41-from-marmelab-fix_test",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 25 Sep 2015 13:43:59 +0200"
				},
				{
					"sha": "c9948ae8d78e3424cd4441e5bba19f427b9e6147",
					"message": "Update-required-D3-version-for-tests",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 12:27:23 +0200"
				},
				{
					"sha": "6e2c2232a7c13892c760142b67bf42da1bae8f62",
					"message": "Merge-pull-request-40-from-marmelab-svg",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 25 Sep 2015 09:24:55 +0200"
				},
				{
					"sha": "0f7b55509b12c9720131cf33ba2a0b8589044d77",
					"message": "Metaballs-in-svg",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Fri, 18 Sep 2015 17:08:43 +0200"
				},
				{
					"sha": "cdedacf40066077d0a5f3d06e39499927c4c4598",
					"message": "Merge-pull-request-37-from-marmelab-optim",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 21 Jul 2015 10:00:50 +0200"
				},
				{
					"sha": "08e27a2d5e963d235f081c26a16cc0b54dd880b9",
					"message": "Fixing-reviewed-issues",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Mon, 20 Jul 2015 17:42:08 +0200"
				},
				{
					"sha": "56f82ebfd0b4bd83e7c5357679f26a8515473687",
					"message": "Fixing-tests",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Mon, 20 Jul 2015 17:01:10 +0200"
				},
				{
					"sha": "01aa37c1719b7fb68e22292dc14ea9ba6ed213a4",
					"message": "back-to-old-versions-for-jsdom-d3",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Fri, 3 Jul 2015 15:01:34 +0200"
				},
				{
					"sha": "b673ca2057fb4ddf2c622ea89c519fa1db92a33d",
					"message": "fixing-mocha-tests-es6",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Fri, 3 Jul 2015 14:50:34 +0200"
				},
				{
					"sha": "aeee4ba9f7f528e633c36ef3cdfed3a73bb7a757",
					"message": "xAxis-opitimized-factorized",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Thu, 2 Jul 2015 15:36:17 +0200"
				},
				{
					"sha": "e0934d1ccd0a8eeba918c0cf335edd6d3c34d0e1",
					"message": "xAxis-optimized",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 1 Jul 2015 17:15:16 +0200"
				},
				{
					"sha": "a10b8bd94ab235d0ff20b4e02fb2c8928f54935a",
					"message": "initialization-graph-body-and-delimiter",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 1 Jul 2015 14:08:57 +0200"
				},
				{
					"sha": "759faba8903a90ffca25312469b4967d930ababf",
					"message": "function-to-optimize",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Tue, 30 Jun 2015 18:02:08 +0200"
				},
				{
					"sha": "04e4f66e1081ac0a09b9c6e53723bc6301284664",
					"message": "Merge-pull-request-36-from-JoanYin-issueDblClick",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 9 Jul 2015 10:40:50 +0200"
				},
				{
					"sha": "973ec385b0c55ba8e1082cf8917bc3e5a9bfece3",
					"message": "Fixed-issue-33-With-3.5.5-d3.js-double-click-throws-Uncaught-TypeError-Cannot-read-property-toString-of-null",
					"author": {
						"name": "Joan Yin",
						"email": "joan.yin@tanium.com"
					},
					"date": "Thu, 25 Jun 2015 08:15:32 -0700"
				},
				{
					"sha": "9f5814211111de9e4bacb50fa5ced2c32091aed1",
					"message": "Fix-watch-command",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 10:06:32 +0200"
				},
				{
					"sha": "7e56abfa0d71eb7d1ec40cdd51109ea865506cc9",
					"message": "Merge-pull-request-35-from-marmelab-remove_gulp",
					"author": {
						"name": "benmoufm",
						"email": "m.benmouffek@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 09:52:22 +0200"
				},
				{
					"sha": "b666d554106b58f0631f1589203e7702b1dc9d29",
					"message": "Fix-Travis",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 09:48:28 +0200"
				},
				{
					"sha": "00a5da9cfab0e12031b50f50e3615308861e505e",
					"message": "Remove-Gulp-depedency-and-create-replacement-Makefile",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 09:42:13 +0200"
				},
				{
					"sha": "570cbdc04c00d1a4dbe98a3f0d65b09a8e198b71",
					"message": "Merge-pull-request-32-from-marmelab-gulp",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 24 Jun 2015 14:30:21 +0200"
				},
				{
					"sha": "c3520840f8a1fd1c0ea28f1c43f44054904114d9",
					"message": "unused-parameter-deleted-from-function-bundle-in-gulpFile",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 24 Jun 2015 14:11:05 +0200"
				},
				{
					"sha": "79c9d7dfcff2bcb13fe0a1364a22efd67cf4af0b",
					"message": "gulp-watch-updates-the-page-without-being-killed",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 24 Jun 2015 12:08:17 +0200"
				},
				{
					"sha": "6a407bc39b57b669eaa0d1d919065436d376750d",
					"message": "suppressing-react-in-the-gulpFile",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 24 Jun 2015 11:03:18 +0200"
				},
				{
					"sha": "785069077ae96634da02bf3b8fa3ff8fdc1f73ad",
					"message": "suppressing-useless-comments-in-gulpFile",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 24 Jun 2015 10:29:44 +0200"
				},
				{
					"sha": "04ff709e3b6c3091afd490df68e4f09d5df490c3",
					"message": "changes-in-the-gulpfile-for-watch",
					"author": {
						"name": "Mélodie Benmouffek",
						"email": "melodie.benmouffek@ensimag.imag.fr"
					},
					"date": "Wed, 24 Jun 2015 10:18:15 +0200"
				},
				{
					"sha": "4a9f0b5cb532b381b429c68ac3c3a82a7ffdd18a",
					"message": "Merge-pull-request-25-from-chad-ramos-add-event-click",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 4 Jun 2015 14:54:25 +0200"
				},
				{
					"sha": "d87465101e987198316e5e90047b3cfccce6b92d",
					"message": "version-0.1.2-d3-dependency",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 1 Jun 2015 14:16:06 +0200"
				},
				{
					"sha": "3294dde4aa8cb0304042f44b9fe5cf348f05fc22",
					"message": "Merge-pull-request-23-from-marmelab-update_dependencies",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 1 Jun 2015 13:55:23 +0200"
				},
				{
					"sha": "a3f422931a27fda4f4596098da943ac8edefb841",
					"message": "fix-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Sun, 31 May 2015 11:47:25 +0200"
				},
				{
					"sha": "6bcbd674e8386afc576343fc026daaa81fb82afe",
					"message": "Bug-Fix-Re-display-zoom-element-after-el-is-grabbed-on-click-event",
					"author": {
						"name": "Chad Ramos",
						"email": "jedi_obi_wan_@hotmail.com"
					},
					"date": "Wed, 27 May 2015 11:46:29 -0500"
				},
				{
					"sha": "26e61d6cc0d972ddfc8d23addf6448bfff795842",
					"message": "Added-on-click-event-and-updated-documentation",
					"author": {
						"name": "Chad Ramos",
						"email": "jedi_obi_wan_@hotmail.com"
					},
					"date": "Mon, 18 May 2015 12:53:11 -0500"
				},
				{
					"sha": "ce3cd86c0b8d165b580e88d474224f68a6b0dfb5",
					"message": "made-gulp-browserify-return-only-when-done",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 13 Mar 2015 18:15:59 +0100"
				},
				{
					"sha": "d4ade460cebad943a174a0de472227046de2ac4c",
					"message": "make-test-pass-on-travis",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 10 Mar 2015 17:25:15 +0100"
				},
				{
					"sha": "abf552b626e1a7e79c4c73169a37b417a5dfe076",
					"message": "add-.travis.yml",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 10 Mar 2015 17:06:05 +0100"
				},
				{
					"sha": "97fba75f1442c54e2267d61605d887ceb426d55c",
					"message": "move-d3-to-npm-dependencies-and-add-it-to-bower.json",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 26 Feb 2015 14:37:35 +0100"
				},
				{
					"sha": "59e22edd6b7672fed0e8257b008bc768dee0ccb9",
					"message": "Merge-pull-request-22-from-marmelab-publish-to-bower",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 24 Feb 2015 19:50:34 +0100"
				},
				{
					"sha": "1cdcf9995b9f962a5b24ea787f5ac9c0699ad38b",
					"message": "update-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Feb 2015 11:25:19 +0100"
				},
				{
					"sha": "1217d2c4ac3dbb11bc3b3d5a07f68cd238dcb838",
					"message": "add-bower.json",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 24 Feb 2015 11:11:33 +0100"
				},
				{
					"sha": "ceae9d85de140a03248ba504d6f4bda66ae4139b",
					"message": "Update-version-to-retrigger-npm-publish",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Fri, 23 Jan 2015 14:45:57 +0100"
				},
				{
					"sha": "7ca29aa9bae4b3bfda874907cfd8382b61d62640",
					"message": "Merge-pull-request-19-from-marmelab-limit_zoom",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 14:28:11 +0100"
				},
				{
					"sha": "f85d233c48456711e6869ed4943b907aa5130621",
					"message": "add-reset-zoom-button-in-example",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 21 Jan 2015 13:33:31 +0100"
				},
				{
					"sha": "3a6795e10597923358c4a23320dad983dbc47945",
					"message": "add-minScale-and-maxScale-config",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 14 Jan 2015 13:57:05 +0100"
				},
				{
					"sha": "2c6863127857b277c8beb6e35c8c32fdf28d5c72",
					"message": "Merge-pull-request-17-from-marmelab-zoom_event",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 23 Jan 2015 11:41:56 +0100"
				},
				{
					"sha": "ec7bab3390a8338581bf1955a8c08821bcc54fcf",
					"message": "publish-on-npm",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 23 Jan 2015 10:22:21 +0100"
				},
				{
					"sha": "e1a8a4fdf6ac31a96cfcb6124fb1b70040eecbe4",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 12 Jan 2015 13:30:15 +0100"
				},
				{
					"sha": "aac4b35fb0d518f9dc48e32f1a9d06742d4bf3e2",
					"message": "update-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 9 Jan 2015 14:01:56 +0100"
				},
				{
					"sha": "1fcb0bc1f7555e9383d2213e65c87606e49295d7",
					"message": "add-a-simple-exemple",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 9 Jan 2015 13:59:37 +0100"
				},
				{
					"sha": "0c31368fb89ffff76c4ce3416a1d11e309ee5878",
					"message": "add-new-eventZomm-config-to-add-custom-behavior-on-zoom",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 8 Jan 2015 14:05:27 +0100"
				},
				{
					"sha": "040867bb49d83b9ef0b21257247480c3f01a29e9",
					"message": "Merge-pull-request-18-from-marmelab-color_by_point",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 14 Jan 2015 16:54:22 +0100"
				},
				{
					"sha": "87958e7853ae95abe07241dd1dded433529b421d",
					"message": "update-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 13 Jan 2015 13:40:42 +0100"
				},
				{
					"sha": "04b49a874f08f6ccc8268d3e4e7a8f558d8eaee0",
					"message": "add-example",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 13 Jan 2015 13:39:03 +0100"
				},
				{
					"sha": "89e67c8f7209ecd6f4297a5ca197d03730ddb6dc",
					"message": "add-eventColor-config-to-color-event-based-on-its-date",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 12 Jan 2015 14:03:05 +0100"
				},
				{
					"sha": "c1980ae7ebb3fa02086934efaeccd3f4914362f1",
					"message": "rename-eventColor-config-to-eventLineColor",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 12 Jan 2015 13:50:10 +0100"
				},
				{
					"sha": "fae2e9d0124fe7bc2bdbe59721580736726a673b",
					"message": "Merge-pull-request-14-from-marmelab-add_gulp",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 5 Dec 2014 18:00:56 +0100"
				},
				{
					"sha": "1fb99576a3cfda7460a57f090445a7803dab8daf",
					"message": "Update-README.md",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Dec 2014 21:42:37 +0100"
				},
				{
					"sha": "f189d3524e9f0a5ffe106874ff6019b0a56d713e",
					"message": "update-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Dec 2014 21:40:03 +0100"
				},
				{
					"sha": "b1248854ae827330bff7f8618f39c4e9eb17f375",
					"message": "remove-makefile",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Dec 2014 21:27:46 +0100"
				},
				{
					"sha": "2b5059f2b5459c6079725ab7ddc1a95fb7226afd",
					"message": "add-gulp",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 3 Dec 2014 21:26:31 +0100"
				},
				{
					"sha": "8330783361086d350d3ea01085f54ab4c23a3d72",
					"message": "Update-custom-color-example",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 15:37:25 +0100"
				},
				{
					"sha": "6871e9f3c4ba416a5df87a320dd0af66d63ddddc",
					"message": "Update-compiled-source",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 15:36:22 +0100"
				},
				{
					"sha": "08f340baef0210003517f3a1f6606e9b64eaefcc",
					"message": "Merge-pull-request-11-from-chulkilee-fix-locale",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 15:28:24 +0100"
				},
				{
					"sha": "24f2fc9afd59a7a9a1fc0013791e19350ef80128",
					"message": "Update-sourcemap-and-fix-absolute-path",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 30 Oct 2014 15:26:36 +0100"
				},
				{
					"sha": "d2710e716c216445168782a6a865cda28af64f13",
					"message": "fix-undefined-locale",
					"author": {
						"name": "Chulki Lee",
						"email": "chulki.lee@gmail.com"
					},
					"date": "Sat, 11 Oct 2014 12:38:13 -0700"
				},
				{
					"sha": "83880925b51a3386838cb496ed141314f6b0c5f3",
					"message": "Merge-pull-request-7-from-jbschlosser-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 29 Sep 2014 09:02:29 +0200"
				},
				{
					"sha": "740b97f58c2ccf4bbae176576b115183464db01a",
					"message": "Fix-event-hover-for-Firefox",
					"author": {
						"name": "Joel Schlosser",
						"email": "joel.schlosser@gtri.gatech.edu"
					},
					"date": "Fri, 26 Sep 2014 14:44:45 -0400"
				},
				{
					"sha": "6bb4d98a370b3b8c10f40d0766dd2a06ccce2f58",
					"message": "Update-README.md",
					"author": {
						"name": "Emmanuel Quentin",
						"email": "manu.quentin@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 16:08:25 +0200"
				},
				{
					"sha": "88592ab4bd9e408a674590cf205654601605a339",
					"message": "add-link-to-screencast",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 16:02:04 +0200"
				},
				{
					"sha": "f944415f1c283bd1bdc56673d34655d7123129cf",
					"message": "Add-tick-customization",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:53:02 +0200"
				},
				{
					"sha": "0a9befc92a305c309a7203af7c75c9d1ebb7c1fc",
					"message": "Add-hover-abilities",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 15:43:00 +0200"
				},
				{
					"sha": "9d77e8a6884d20295b33dbefa38cc94733f732df",
					"message": "Fix-typo",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 14:45:36 +0200"
				},
				{
					"sha": "575f438d30e7b1b2f9c434187f7d23bb86a3acc8",
					"message": "Fix-margin-delimiter-and-codehints",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 14:43:31 +0200"
				},
				{
					"sha": "5883ce4d2a726e4f3049144d2433dea9ba6defe3",
					"message": "Fix-list-formatting",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 14:43:03 +0200"
				},
				{
					"sha": "d4cd0d87a2ac3a4f64632598f1a868a78e4a0a06",
					"message": "wording-fixes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 14:40:53 +0200"
				},
				{
					"sha": "f927208aec729b6f5a1d0318f6d0211cb761217e",
					"message": "Wording-fixes",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 23 Sep 2014 11:58:30 +0200"
				},
				{
					"sha": "255c770778959cea557eb8233a79aa5ed1ebd7d4",
					"message": "Merge-pull-request-6-from-marmelab-no_locale_by_default",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 22 Sep 2014 12:05:58 +0200"
				},
				{
					"sha": "941785d54aff766ce23c3b07592bcb7d99000cd2",
					"message": "code-review-and-updated-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 14:47:41 +0200"
				},
				{
					"sha": "7a9ee8307767a86c983ee9714b99428f1ec84d05",
					"message": "load-config-tickFormat-in-given-locale-if-any-or-in-d3-default-locale",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 14:25:38 +0200"
				},
				{
					"sha": "17e951b871347dd37373b25c6d1899ef81734372",
					"message": "use-d3-default-for-locale-english",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 12:34:28 +0200"
				},
				{
					"sha": "1c4b579a6d10dc32cac0c27bce50eb7c7cdd1d57",
					"message": "Merge-pull-request-5-from-marmelab-add_readme",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 14:35:43 +0200"
				},
				{
					"sha": "6aaa38f460105975b56767dee9f17d095231646c",
					"message": "Merge-pull-request-4-from-marmelab-amd_require",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 14:34:53 +0200"
				},
				{
					"sha": "5737132bc44b371be2c36c61740abf484dcc2a9f",
					"message": "complete-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 12:13:23 +0200"
				},
				{
					"sha": "24e2ace0265f2409c5a4ebfbf2603ba929bdc3b5",
					"message": "code-review",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 11:31:18 +0200"
				},
				{
					"sha": "57f54ac72673eddae73681f591b7ae632e7ddeb6",
					"message": "fix-bottom-axis",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 11:27:58 +0200"
				},
				{
					"sha": "a5c157a99a113c7af16efa5d981ff2fae9f220cd",
					"message": "minify-browserify-output",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 09:25:58 +0200"
				},
				{
					"sha": "740f6d4a822c1956b93c1f53984718e5260bdcd7",
					"message": "add-readme",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Fri, 19 Sep 2014 11:04:32 +0200"
				},
				{
					"sha": "3abe730b423b4c519f2f92fb7e6a0e4d2418d86f",
					"message": "rename-eventDrop-to-eventDrops",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 17:48:45 +0200"
				},
				{
					"sha": "ad7cbf963522ec92d1bc33d6dba93a67da5b75d1",
					"message": "ensure-node-and-browser-compatibility-too",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 17:25:27 +0200"
				},
				{
					"sha": "4a4ec47f5dd677632f8b16fa4c63c0390005d6b8",
					"message": "made-chart-compatible-with-requirejs",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 16:44:46 +0200"
				},
				{
					"sha": "ad30bc48a7ca9ca47c0df57f2fc177c8ca185251",
					"message": "Merge-pull-request-3-from-marmelab-eventdrops_rename",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Sep 2014 09:12:30 +0200"
				},
				{
					"sha": "ffa59c64399fed01587548d7c57abb9794c92c95",
					"message": "made-event-color-configurale",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 15:35:14 +0200"
				},
				{
					"sha": "82800142faff501f675a3287894da8db87ac9700",
					"message": "made-xAxis-presence-configurable",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 14:51:27 +0200"
				},
				{
					"sha": "8ccffd24140d834865205499cbb3becc6e93bd5d",
					"message": "add-addLine-and-removeLine-button-to-example",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 14:08:54 +0200"
				},
				{
					"sha": "e24759f4e7acf56283b186de8a57cd7df25f233d",
					"message": "made-delimiter-configurable",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 12:19:01 +0200"
				},
				{
					"sha": "e9eb132e269e153db81b34b8cef16167dfa27794",
					"message": "add-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 12:13:59 +0200"
				},
				{
					"sha": "2559842378e5f0998b53ca1445b87b1ba088a0b3",
					"message": "fix-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 09:58:10 +0200"
				},
				{
					"sha": "7508c9082b89d25b919d19e8ae3f7e099e5be07e",
					"message": "make-eventDrop-a-reusable-chart",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 17 Sep 2014 17:31:20 +0200"
				},
				{
					"sha": "249ec74f67082b928cccc6e4d768a769d3bbd270",
					"message": "use-eventLine-in-eventDrop",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 17 Sep 2014 15:07:49 +0200"
				},
				{
					"sha": "202bb90946c3983a167967de43d0aa1d42b4c5cf",
					"message": "refactor-eventLine-test-to-use-mocha-separate-karma-test-from-mocha-one",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 17 Sep 2014 12:08:24 +0200"
				},
				{
					"sha": "7f82b10932e12b4844e9194aebde827a01f2041c",
					"message": "replaced-filterDate-By-FilterData-that-work-with-any-data-and-scale",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 17 Sep 2014 11:34:16 +0200"
				},
				{
					"sha": "6a96d483b0dd04e2cacc26b041793104fab70ab5",
					"message": "add-eventLine-chart-that-handle-only-the-eventline-and-test-it",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 17 Sep 2014 10:14:44 +0200"
				},
				{
					"sha": "ef77b337445fb5e0f6c63b0f295510a9c48d5c98",
					"message": "rename-eventline-test-to-eventDrop",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Wed, 17 Sep 2014 09:40:03 +0200"
				},
				{
					"sha": "5d735058d20575e11e93c5db3852bf049bd99cf2",
					"message": "init-xScale-once",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 18:25:35 +0200"
				},
				{
					"sha": "11b4106d709038c61e0327a69ed21039bc97ee15",
					"message": "removed-fields-from-config-and-added-several-line-to-the-examples",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 14:43:10 +0200"
				},
				{
					"sha": "04f19272e7bcbd22c0a4b490abe467e47885fa71",
					"message": "move-eventDrops-into-d3.chart",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 14:18:45 +0200"
				},
				{
					"sha": "2f83b268e7a040636a7d2e74d4ceaa2ed33bdc21",
					"message": "rename-timeline-to-eventDrops",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 14:09:37 +0200"
				},
				{
					"sha": "7cb1fde0c587706d0fde9da85cdeca51f90fdb09",
					"message": "Merge-pull-request-2-from-marmelab-remove_moment_dependency",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Thu, 18 Sep 2014 09:22:11 +0200"
				},
				{
					"sha": "333dfab35b9ed795c0a14624a49946250ce3b568",
					"message": "refactor-filterArray-to-a-separate-filterDate-module",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 13:57:29 +0200"
				},
				{
					"sha": "2e952ef7952d9025f97408326bc6a465242b20c8",
					"message": "remove-moment-from-tests",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 13:50:24 +0200"
				},
				{
					"sha": "6a5281b2f4283a6b424232dcc018ef03d8057f58",
					"message": "use-date-instead-of-timestamp",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 12:08:05 +0200"
				},
				{
					"sha": "57a1b39eeb1c4db0ebf2f54cdbb3cf433c6c4584",
					"message": "better-format-delimiter",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 11:58:00 +0200"
				},
				{
					"sha": "bf1aa83b1d9277ff10c869081c9ffd39a56e5900",
					"message": "remove-moment",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 11:40:54 +0200"
				},
				{
					"sha": "e26fbd344faab9e20c87679a90106e71094622c6",
					"message": "better-place-y-axis-text",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 11:24:49 +0200"
				},
				{
					"sha": "7530195d761eb401ea4148b03be078c992ab2bdf",
					"message": "adding-a-listener-mechanic-to-configurable",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 10:11:15 +0200"
				},
				{
					"sha": "118d720ded8e5b21da7dfa1c194b39ce90fa9c9b",
					"message": "made-locale-tickformat-and-lang-configurable",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Tue, 16 Sep 2014 09:54:44 +0200"
				},
				{
					"sha": "e3b925ae9b2b97dbaf7b7ce993653905f2ed78ef",
					"message": "add-scale-on-the-bottom-todo-make-it-optional",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Sep 2014 18:42:16 +0200"
				},
				{
					"sha": "5af9162ecd11c66493f3eae257e0e99468bada7d",
					"message": "move-delimiter-in-the-svg-aligned-with-the-scale",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Sep 2014 18:29:34 +0200"
				},
				{
					"sha": "ef2bbdd41697d9bc657da1140cf52d215f40d8d3",
					"message": "add-test",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Sep 2014 17:44:16 +0200"
				},
				{
					"sha": "e7589d5f6070779669648d5d5523ede7902a4a85",
					"message": "adapt-angular-service-as-a-standalone-chart",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Sep 2014 16:35:28 +0200"
				},
				{
					"sha": "d301b0056e3cd7010e01fd711d54bbf7bc15d9df",
					"message": "add-timeline-chart-to-d3-that-append-a-simple-svg-element",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Sep 2014 14:56:16 +0200"
				},
				{
					"sha": "d2587e24ab63dd821915a14c0d7eb0ece79da2c7",
					"message": "start",
					"author": {
						"name": "ThieryMichel",
						"email": "thiery@marmelab.com"
					},
					"date": "Mon, 15 Sep 2014 14:11:14 +0200"
				}
			]
		},
		{
			"name": "javascript-boilerplate",
			"commits": [
				{
					"sha": "52d8effce41cfd9ad1320f8ffcfc2f61bb549363",
					"message": "Merge-pull-request-107-from-marmelab-redux_without_profanity_2",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 7 Sep 2016 09:44:15 +0200"
				},
				{
					"sha": "2bc30d50431f7c04e1b172cfe7390771216c8750",
					"message": "removed-unused-deps",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 6 Sep 2016 16:47:31 +0200"
				},
				{
					"sha": "e006ce5f772b1da7115a588e232b47e8851fcd21",
					"message": "Fix-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 22:03:07 +0200"
				},
				{
					"sha": "485ead00ff6b2399f09636c1a189d50751352e74",
					"message": "RFR-Simplified-entities-fetching-sagas",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 21:56:01 +0200"
				},
				{
					"sha": "782d6f10263fbfe8612526cd397ab87a25e07b67",
					"message": "Merge-pull-request-105-from-marmelab-redux_without_profanity",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Tue, 6 Sep 2016 16:24:36 +0200"
				},
				{
					"sha": "a53afa219fa29d5bc9afa5c6d49dfacaba5c252c",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 14:26:35 +0200"
				},
				{
					"sha": "8e155f2a0283f80e4bad57edd1d53e8eec1f0689",
					"message": "x-Cleaned-dependencies",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 20:15:40 +0200"
				},
				{
					"sha": "fa6b829a60c3b17051a0c1cbee2f17ced78c5e40",
					"message": "fix-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 16:03:38 +0200"
				},
				{
					"sha": "74250265faffe24c39300eec1985e2d977d0bc8d",
					"message": "More-separation-between-containers-and-pure-ui-components",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 15:48:40 +0200"
				},
				{
					"sha": "9084488266efab141d8c6a8e63138c90769e172c",
					"message": "eslint",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 15:19:52 +0200"
				},
				{
					"sha": "e9b2e274aa0cbd0b687cf9da3e5484f66fa10b29",
					"message": "Updated-some-packages-including-redux-form",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 14:59:58 +0200"
				},
				{
					"sha": "a3568f22710d278df1a3bb0c4efd2d216e638dba",
					"message": "x-Removed-old-redux-devtools-completely",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 14:57:38 +0200"
				},
				{
					"sha": "c9b82ef44e5cd996bd20b999826f811b8737103c",
					"message": "Merge-pull-request-109-from-marmelab-fix_frontend",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 09:16:03 +0200"
				},
				{
					"sha": "cfe56b2cf3080d2eaa7d79f3364574af84c12d83",
					"message": "Merge-pull-request-106-from-marmelab-makefile_and_packages",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 5 Sep 2016 09:15:36 +0200"
				},
				{
					"sha": "af161c64152afc62691dc55ffc9d3cbd27eb5bd3",
					"message": "RFR-Fix-frontend-by-completely-removing-old-redux-devtools",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 4 Sep 2016 15:46:51 +0200"
				},
				{
					"sha": "271444fd545df8059a6a91c7194e9eec080ea796",
					"message": "fix-dependencies",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 18:31:29 +0200"
				},
				{
					"sha": "13769def4cd495adfcf405bbc0287d18ee262140",
					"message": "missing-packages",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 18:29:35 +0200"
				},
				{
					"sha": "a302de9a4a24086b9bc776198728c6a7585899fb",
					"message": "RFR-Makefile-update-and-packages",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 18:27:13 +0200"
				},
				{
					"sha": "b900b18ea2840e6af8e0df6b32e8f75ce484073d",
					"message": "Merge-pull-request-102-from-marmelab-fixes_after_packages_update",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 2 Sep 2016 10:55:03 +0200"
				},
				{
					"sha": "66ed03404f88d9cd6082a4ec99158e63ebfc8f3c",
					"message": "RFR-Fixes-required-by-last-packages-update",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 10:48:37 +0200"
				},
				{
					"sha": "db4cdbe5db3c6d073897e01c885f8c61ecd65f36",
					"message": "Merge-pull-request-100-from-marmelab-packages_update",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 2 Sep 2016 10:15:24 +0200"
				},
				{
					"sha": "d1720af9df6e52280cfa832cad0cc7b80c5c8bba",
					"message": "Merge-pull-request-98-from-marmelab-nodium",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Aug 2016 18:16:53 +0200"
				},
				{
					"sha": "89a220b7560ef0c6f5128ac3900d8d6b8608ddc1",
					"message": "RFR-Upgrade-to-node-6.4-and-update-all-deps",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 21 Aug 2016 12:17:07 +0200"
				},
				{
					"sha": "c28b609debc7335c109fab0d3e08a90ad2dea81f",
					"message": "Fix-nodium-usage-to-prevent-random-e2e-frontend-tests-failures",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 21 Aug 2016 16:20:34 +0200"
				},
				{
					"sha": "9762835ac4a30129f335bc322d773041ea24dcec",
					"message": "Use-webdriver-control-flow",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 12:47:22 +0200"
				},
				{
					"sha": "0e370b83991d8d361a42853ec5b0862ac68757e3",
					"message": "attempt-to-use-chrome-on-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 09:51:27 +0200"
				},
				{
					"sha": "2b57df7267cc759c4426a4ce7d3ccb39bae18405",
					"message": "Increase-timeouts-to-make-tests-pass-on-firefox-locally-firefox-take-a-long-time-to-boot",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 09:26:43 +0200"
				},
				{
					"sha": "a88af5091ff2a7e7822f8c876febaad1f5440c15",
					"message": "Removed-nightwatch-ensure-we-use-firefox-for-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 1 Jun 2016 09:13:08 +0200"
				},
				{
					"sha": "96d4dd791ce8f9649c5b61a387bdfbd8826b2e73",
					"message": "RFR-Uses-nodium-for-e2e-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 31 May 2016 17:17:07 +0200"
				},
				{
					"sha": "737293d4a8ec119fc6336f8e46a7a57620a2dba8",
					"message": "Merge-pull-request-99-from-marmelab-fix-cors-origins-tada",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 3 Jun 2016 10:06:02 +0200"
				},
				{
					"sha": "42490023e0a66fe69cefbdf830690214594a759b",
					"message": "renamed-allowOrigin-into-allowedOrigins",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 3 Jun 2016 09:56:28 +0200"
				},
				{
					"sha": "d7d61275e552701f0893683b55bbe83ce5e7be0c",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 3 Jun 2016 09:46:55 +0200"
				},
				{
					"sha": "cb6f628a71c62a218d4e2192001e5632ecc7d1ca",
					"message": "Fix-npm-shrinkwrap-trying-to-make-travis-work",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 2 Jun 2016 16:34:48 +0200"
				},
				{
					"sha": "500b2c0e8927af347cdc00e74ba8a081b94c6891",
					"message": "RFR-Fix-CORS-allow-origin",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 2 Jun 2016 16:01:29 +0200"
				},
				{
					"sha": "6bcd8c3840dcc3321e11abac62212a78a9d05eb7",
					"message": "Merge-pull-request-97-from-marmelab-api_params_ngadmin",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 30 May 2016 12:17:38 +0200"
				},
				{
					"sha": "3be4600a1463392000795a0758d625e4caa48fbe",
					"message": "RFR-Handle-ngadmin-list-parameters-without-transformation-client-side",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 30 May 2016 12:00:55 +0200"
				},
				{
					"sha": "10e774b7ef951a0475f0ffd7b20fb8ea901ddee5",
					"message": "Merge-pull-request-96-from-marmelab-packages_update",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 27 May 2016 10:53:38 +0200"
				},
				{
					"sha": "4cf195be5e6d96d138056267389fb83c4db0cb83",
					"message": "WIP-Npm-packages-update",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 26 May 2016 19:29:53 +0200"
				},
				{
					"sha": "a3d118641947283dcb25ef811822c90243401ecc",
					"message": "Merge-pull-request-95-from-marmelab-linting",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 27 May 2016 10:26:08 +0200"
				},
				{
					"sha": "ce2926b7586ad615e8c0f31188b4d30e1c6160a6",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 27 May 2016 10:20:43 +0200"
				},
				{
					"sha": "bbfdd5ea6cfe3225ae2c7541b2451a3d09d8e301",
					"message": "More-linting-using-babel-eslint",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 26 May 2016 11:05:48 +0200"
				},
				{
					"sha": "398a69d9071c5344c229a99a25b24d3241b67d43",
					"message": "WIP-Linting",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 26 May 2016 10:15:04 +0200"
				},
				{
					"sha": "e8ab1c4462854c22f205e7f8dc3d14a39aa4438a",
					"message": "Merge-pull-request-94-from-marmelab-redux_factories",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 27 May 2016 10:11:10 +0200"
				},
				{
					"sha": "7ba5264bee2d912f3e957c82e9d5842415f0c774",
					"message": "RFR-Redux-factories-to-reduce-boilerplate",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 23 May 2016 17:47:16 +0200"
				},
				{
					"sha": "f4da18051bd5994b8aa6899899a91e83d9a25590",
					"message": "Merge-pull-request-93-from-marmelab-unhandled-promises",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 May 2016 12:35:38 +0200"
				},
				{
					"sha": "836e9c13a899e31014961a3cfd40f61a0f278ad2",
					"message": "Merge-pull-request-92-from-marmelab-db_es6",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 May 2016 12:35:11 +0200"
				},
				{
					"sha": "91310c92e1e1f39c151ae34261c4755a42abce7e",
					"message": "RFR-Add-handler-for-node-unhandled-promise-rejections",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 23 May 2016 15:18:48 +0200"
				},
				{
					"sha": "9411004bb37281499a0d6a6c00c1537d4fb04d45",
					"message": "Code-format-and-es6",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 23 May 2016 14:51:15 +0200"
				},
				{
					"sha": "aca800d605c73638810c169fa3d9cb94c9192e8d",
					"message": "Merge-pull-request-91-from-SherylHohman-patch-1",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 19 May 2016 14:10:10 +0200"
				},
				{
					"sha": "968b1b6b99290632414cebc1ee158e80e8b1776e",
					"message": "fix-typo",
					"author": {
						"name": "Sheryl Hohman",
						"email": "SherylHohman@users.noreply.github.com"
					},
					"date": "Thu, 19 May 2016 03:59:05 -0700"
				},
				{
					"sha": "7f631c00e60de45948d073ade9b3a865667c2bdc",
					"message": "Merge-pull-request-81-from-marmelab-webpack_config",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 23 Mar 2016 10:35:55 +0100"
				},
				{
					"sha": "244433d2de1ffa0825086b7447dd65e616f22e84",
					"message": "Removed-unecessary-eslint-comments",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 21 Mar 2016 10:18:13 +0100"
				},
				{
					"sha": "c7c31193e9ab7451fd019b7600980300381e81e6",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 10 Mar 2016 15:03:41 +0100"
				},
				{
					"sha": "b18ee33f06726bcf58634a35ca7e3d7248de8ea3",
					"message": "Fixed-loaders-for-frontend",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 15:43:03 +0100"
				},
				{
					"sha": "f0964f3f0e61a42e98e81c5757cd7543c65cdf81",
					"message": "Review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 15:39:48 +0100"
				},
				{
					"sha": "2a1c5393b641fcc060427e9782bafa095d1390e5",
					"message": "Reverted-use-of-browserHistory-which-does-not-work-for-e2e-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 14:27:15 +0100"
				},
				{
					"sha": "f613c6c1b487332a6213a982da745eb8e99548b5",
					"message": "RFR-Refactored-webpack-configuration",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 12:07:22 +0100"
				},
				{
					"sha": "e4d6274a3da12e6e2c4733e61ae7dec38f3dbdc1",
					"message": "Merge-pull-request-84-from-marmelab-rewrite_sagas",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Tue, 22 Mar 2016 16:57:14 +0100"
				},
				{
					"sha": "e38729b90010db26a61e3a6f57d8c08e3cd98435",
					"message": "Merge-pull-request-78-from-marmelab-doc-and-demo-code",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 21 Mar 2016 10:18:48 +0100"
				},
				{
					"sha": "c2a1510ee8368251110e38419a425a3756e35fb2",
					"message": "Merge-pull-request-82-from-marmelab-eslint_env",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 21 Mar 2016 10:16:57 +0100"
				},
				{
					"sha": "feaa81b3cca4b5f9a5ab84cc5fe7f7c845c4e81a",
					"message": "RFR-Rewrite-sagas",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 21 Mar 2016 10:15:19 +0100"
				},
				{
					"sha": "6f0d18378f775c9e88ffc08df8f4d3ad3a60a4c7",
					"message": "Merge-pull-request-83-from-marmelab-ratelimiter",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 16 Mar 2016 12:10:42 +0100"
				},
				{
					"sha": "8433753e32ed28a9853edd2e66c34b253c51f4ce",
					"message": "RFR-Uses-marmelab-fork-for-koa-ratelimit",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 16 Mar 2016 11:50:06 +0100"
				},
				{
					"sha": "1f563ff7d7019776cd24a9bb1e218e2dc3b4bf2b",
					"message": "Add-missing-env",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 11 Mar 2016 17:19:35 +0100"
				},
				{
					"sha": "0349ad42d3c603a1a7622085cb93f44374c4a01f",
					"message": "Review",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 9 Mar 2016 09:36:00 +0100"
				},
				{
					"sha": "0ed893f46f4331db425944423087091343def2b4",
					"message": "Merge-pull-request-80-from-marmelab-brikou-using-strict",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 09:28:22 +0100"
				},
				{
					"sha": "27440b9b90a88035d77f8c2d22fed0bee9be6ef5",
					"message": "Merge-pull-request-79-from-marmelab-fix-deployment",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 09:23:23 +0100"
				},
				{
					"sha": "eee9881c32b70e905e98819f75a5e73315c51139",
					"message": "Force-strict-DI",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Wed, 9 Mar 2016 09:08:48 +0100"
				},
				{
					"sha": "65774c24a3de46eda86d4fda99c348b5e1dedcf5",
					"message": "Fix-deployment-process",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 8 Mar 2016 17:53:27 +0100"
				},
				{
					"sha": "128348a88a19df820c7c469dda12fbcb9b622967",
					"message": "Add-admin",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 8 Mar 2016 10:42:05 +0100"
				},
				{
					"sha": "130c1aeeae4fbef53e58bf7e5fc6fc476b188ae7",
					"message": "Remove-demo-code-warning-and-doc",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 8 Mar 2016 10:15:20 +0100"
				},
				{
					"sha": "c805fc11446d1f904b333ae0dd616d7f222dca65",
					"message": "Add-Travis-build-status",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 7 Mar 2016 22:39:03 +0100"
				},
				{
					"sha": "7ae27a7ef447202772c01a8a0ac3e987375a4510",
					"message": "Merge-pull-request-77-from-marmelab-clear-build",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 7 Mar 2016 17:46:08 +0100"
				},
				{
					"sha": "966813b530a1a6a08a7cad7cc72cdf6acbcc8769",
					"message": "Clear-build-files-before-run-build",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 7 Mar 2016 14:02:42 +0100"
				},
				{
					"sha": "f29b6572af981baa918bf560ba2e76f798db3aaa",
					"message": "Merge-pull-request-75-from-marmelab-ratelimiting_config",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 4 Mar 2016 15:47:45 +0100"
				},
				{
					"sha": "8f1cae544bfe39afa2b0a48874c4a6d893fdc2f6",
					"message": "RFR-Reasonable-rate-limiting",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 14:24:04 +0100"
				},
				{
					"sha": "a9b7cfabf6feba065e1b925ace88c92141dda9c8",
					"message": "Merge-pull-request-74-from-marmelab-eslinting",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 14:11:21 +0100"
				},
				{
					"sha": "5f340fa2b5f6359b8cc4e2989628583670a3f5e3",
					"message": "Merge-pull-request-73-from-marmelab-update_test_config",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 14:04:10 +0100"
				},
				{
					"sha": "2710cab9764380b65cf9a54b7f445a289c538c5a",
					"message": "Lint",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 13:59:40 +0100"
				},
				{
					"sha": "2855ec9de2adb3fb06ad7dd78be6dd5f1ae38a09",
					"message": "Remove-history-entry-from-test-config",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 13:51:42 +0100"
				},
				{
					"sha": "e517bfcf9c1ad1fae9e8f345d0cd44b5a584feb6",
					"message": "Merge-pull-request-72-from-marmelab-router_v4",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 13:26:14 +0100"
				},
				{
					"sha": "9775f3cfd29c1f176c3fdf4e810264951f28e9ee",
					"message": "Use-routerActions-creator",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 13:08:15 +0100"
				},
				{
					"sha": "90811e9d15278f251c8201f5c4e579a30cf953cf",
					"message": "Upgrade-Redux-Router",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 11:11:56 +0100"
				},
				{
					"sha": "01a8cccd1844fa7819ce0b37e9702758477e811d",
					"message": "Merge-pull-request-71-from-marmelab-fixes",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 10:07:47 +0100"
				},
				{
					"sha": "1498f4dd27f128eccc6b12ef7fa234b180c698c6",
					"message": "Renamed-reducers-to-rootReducer-to-avoid-misinterpretation",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 09:57:30 +0100"
				},
				{
					"sha": "0f2de9d4c9301ab0c46427a5403773b7bb135500",
					"message": "RFR-Code-cleaning",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 09:53:36 +0100"
				},
				{
					"sha": "d232454062789562bce9ec03aa276cdc91246917",
					"message": "Merge-pull-request-70-from-marmelab-send-mail",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 4 Mar 2016 09:04:15 +0100"
				},
				{
					"sha": "43c2d18d9a2b313f32d6c786a64958e6433674b9",
					"message": "Remove-ejs-as-dependency",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 3 Mar 2016 16:05:43 +0100"
				},
				{
					"sha": "bea6526f03d9fe159d80c4f3d3d0d0ff06df2a33",
					"message": "Coding-style-review",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 3 Mar 2016 15:55:34 +0100"
				},
				{
					"sha": "27d9752afc67d62881c3aedd30a66467daf0ab09",
					"message": "Mail-lib-and-send-a-mail-after-new-order",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 3 Mar 2016 15:34:08 +0100"
				},
				{
					"sha": "1134ed1e09bd985798b56439c4e1e85f8a17a985",
					"message": "Merge-pull-request-69-from-marmelab-ratelimiting",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Thu, 3 Mar 2016 17:09:01 +0100"
				},
				{
					"sha": "9b5239fa03dcbfca625bdc53e1bfbab36b44dfa6",
					"message": "Merge-pull-request-68-from-marmelab-major_updates",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 15:49:34 +0100"
				},
				{
					"sha": "bafa4fd7d2fb70f387c1af9d0ebec9899b459fac",
					"message": "Applied-rate-limiting-to-all-api-calls",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 15:47:31 +0100"
				},
				{
					"sha": "830c49fb1667ebbe88b11f2684332b4267f7b6e8",
					"message": "WIP-Rate-limiting",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 15:00:16 +0100"
				},
				{
					"sha": "332c7ceea016346a2231c5634fc17539045c161e",
					"message": "Upgrade-history-deps",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 14:54:43 +0100"
				},
				{
					"sha": "4c8fa03860eca4889026c711f95e96db3d2fdb00",
					"message": "Upgrade-redux-devtools-dock-monitor-fix-hotkeys",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 11:27:53 +0100"
				},
				{
					"sha": "f1b78b29fcc60b827cfe5bce4d1d6596ffe359fb",
					"message": "Upgrade-extract-text-webpack-plugin-linting",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:59:41 +0100"
				},
				{
					"sha": "22a86a77e9a5f5376e056bd1f9ea32bb35f64d93",
					"message": "Merge-pull-request-67-from-marmelab-webpack-images",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:47:12 +0100"
				},
				{
					"sha": "bcefe3aaa71dd55702aef52357ddb644affa1f94",
					"message": "Upgrade-babel-core",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:38:54 +0100"
				},
				{
					"sha": "49d6526f65de7307d0eabdcb75d33d7a7c5721a9",
					"message": "Upgrade-babel-cli",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:37:21 +0100"
				},
				{
					"sha": "02ddf4d3bc840270432dc5e2387d6408b7b4ab54",
					"message": "Remove-jsdom-as-useless-oudated-enzyme-is-enough",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:33:58 +0100"
				},
				{
					"sha": "8fb332e324be454fb42f4c871d651e2aa165fe0a",
					"message": "Remove-nock-as-outdated-and-not-used",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:30:31 +0100"
				},
				{
					"sha": "774ddcfb10795250889d73451f03aafa7aceebd0",
					"message": "Upgrade-selenium-standalone",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:29:19 +0100"
				},
				{
					"sha": "2815b7923d901f71df58f76323fcb85668e339a6",
					"message": "Webpack-image-loader",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 3 Mar 2016 10:20:03 +0100"
				},
				{
					"sha": "a4fb2e6db18f675fe65f60602fd90e1d71c7b7e3",
					"message": "Upgrade-winston",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 10:18:33 +0100"
				},
				{
					"sha": "15dee4101f638c350273e5c311eb802dc78f16ea",
					"message": "Merge-pull-request-66-from-marmelab-clean-deps",
					"author": {
						"name": "Brikou CARRE",
						"email": "brikou@gmail.com"
					},
					"date": "Thu, 3 Mar 2016 09:44:09 +0100"
				},
				{
					"sha": "7acf43abc7ec4260ab098e490026b4391c5c528c",
					"message": "Update-README",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 2 Mar 2016 17:01:44 +0100"
				},
				{
					"sha": "0d427a2993251f8c47f2a347915f901d1eee70b2",
					"message": "Merge-pull-request-64-from-marmelab-fix_json",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 2 Mar 2016 17:50:01 +0100"
				},
				{
					"sha": "5e8a8e18bdec56f3e35accace2aa0da356ef3821",
					"message": "Merge-pull-request-61-from-marmelab-ng-admin-filter",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 17:19:49 +0100"
				},
				{
					"sha": "9b4be4d7a8a08068e57cc1300524eff5a0c2691b",
					"message": "Clean-dependencies",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 2 Mar 2016 16:12:09 +0100"
				},
				{
					"sha": "994957e57a493a19e24ef73fceddbd93be498586",
					"message": "Fix-JSON",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 15:48:41 +0100"
				},
				{
					"sha": "b23a1b3b61ff3d902d5316c20e0c06ef6c114feb",
					"message": "Merge-pull-request-63-from-marmelab-fix_clean_recipe",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 2 Mar 2016 14:33:31 +0100"
				},
				{
					"sha": "303566b741e238ed9680daee016cc8701773a5d2",
					"message": "Fix-clean-recipe",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 14:07:24 +0100"
				},
				{
					"sha": "984e30fcd4c1ab8971d41cb7ea013fe5f97bcda0",
					"message": "Remove-useless-redirect",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 2 Mar 2016 13:55:47 +0100"
				},
				{
					"sha": "6d39218fb7bd4494d282f20c535c8decf5d49c7e",
					"message": "Merge-pull-request-62-from-marmelab-exact_versions",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 2 Mar 2016 13:52:32 +0100"
				},
				{
					"sha": "7a8a866d6db6077e8a389816034c348b8e081413",
					"message": "Upgrade-rev-fixed-deps",
					"author": {
						"name": "Brikou Carré",
						"email": "brikou@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 12:15:59 +0100"
				},
				{
					"sha": "ebb4a62f770cde1885962cfc69f69debc7be503e",
					"message": "Fix-ng-admin-filter",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 2 Mar 2016 12:11:57 +0100"
				},
				{
					"sha": "c258597c5a68ef788d842f50d63d36ba084f8fca",
					"message": "Merge-pull-request-58-from-marmelab-frontend-functionnal-tests",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 2 Mar 2016 11:07:32 +0100"
				},
				{
					"sha": "d140eee78fecf10821b3a21b43d14c419d36b014",
					"message": "Fix-frontend-functionnal-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 1 Mar 2016 15:40:44 +0100"
				},
				{
					"sha": "2023f87aaf543068566ea321ad8b17fd4a377818",
					"message": "Merge-pull-request-59-from-marmelab-animations",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 2 Mar 2016 09:29:58 +0100"
				},
				{
					"sha": "4e42ff9048d5eb79de721d5c60d4f48773a43b00",
					"message": "RFR-Animated-router-transitions-slide",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 18:43:39 +0100"
				},
				{
					"sha": "565678a974baf286768f56fd59e2a67e33cdfe91",
					"message": "Merge-pull-request-56-from-marmelab-shrinkwrap",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 15:33:54 +0100"
				},
				{
					"sha": "c8164d467daf35a7e7f28cd41d8702c791def26e",
					"message": "npm-shrinkwrap-for-production",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 1 Mar 2016 15:27:08 +0100"
				},
				{
					"sha": "bd6f0c3d0397c37db2cebd1011c11de91697e244",
					"message": "Merge-pull-request-55-from-marmelab-default-pagination",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 10:33:55 +0100"
				},
				{
					"sha": "ec9d370a8edc3cc5416f4c9e836a112de4ff4f2c",
					"message": "Merge-pull-request-54-from-marmelab-port-tip",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 10:32:48 +0100"
				},
				{
					"sha": "8d6d9a51aeee136c77a129798f7ad82ffffad44e",
					"message": "Add-default-pagination",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 1 Mar 2016 10:27:01 +0100"
				},
				{
					"sha": "5c45ec1d16e91dd9f171fc70cd6d7cc136069b25",
					"message": "Add-a-tip-to-explain-how-to-change-API-port",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 1 Mar 2016 10:16:33 +0100"
				},
				{
					"sha": "cdc1a5e3a249adf6aa70967bc00067456206d0a9",
					"message": "Merge-pull-request-50-from-marmelab-readme",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 09:53:17 +0100"
				},
				{
					"sha": "4a30564677a7fe764c4d57d43eb154129a7ae92a",
					"message": "RFR-Readme",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 09:22:33 +0100"
				},
				{
					"sha": "d46a6e74556c68448dd56c54dab56db651fd8515",
					"message": "Merge-pull-request-47-from-marmelab-test-react-component2",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 1 Mar 2016 08:53:40 +0100"
				},
				{
					"sha": "c08a0e1a93f0909747c9d3229cd94e4160f4d4d7",
					"message": "Add-links-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 29 Feb 2016 18:31:06 +0100"
				},
				{
					"sha": "41e41f7c47fc66bf9dadb4948d8b4da8cc0eae4d",
					"message": "Merge-pull-request-45-from-marmelab-healthcare",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 29 Feb 2016 16:50:25 +0100"
				},
				{
					"sha": "0f746645e839a50fbe99a7f50b613dde7e39d83f",
					"message": "Remove-useless-deps",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 29 Feb 2016 16:43:29 +0100"
				},
				{
					"sha": "c1b3379bb94a4a7811f0bc61fe4f0cf470988689",
					"message": "Link-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 29 Feb 2016 15:52:13 +0100"
				},
				{
					"sha": "92034a696ec786e498b27819d5fed60205b69926",
					"message": "Unit-test-a-React-component-reviews",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 29 Feb 2016 11:17:16 +0100"
				},
				{
					"sha": "bcc21e6d061c19a4fe87a1bf39b54f62141dd5b7",
					"message": "Simplified-healthcare-results-and-added-functional-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 16:37:32 +0100"
				},
				{
					"sha": "dc7410f76aa2e1c631ba468cd9eaab30c91ac22f",
					"message": "Fix-config",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 15:59:45 +0100"
				},
				{
					"sha": "d92de83e09e7a3ad2419ce1f3ba2358ccdf20801",
					"message": "RFR-API-Healthcare",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 15:58:08 +0100"
				},
				{
					"sha": "b6c79de516e0414568f3d65576ee1ad2bdb5a166",
					"message": "Merge-pull-request-49-from-marmelab-travis-node-version",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 16:38:07 +0100"
				},
				{
					"sha": "811129cf9cbaffbfde90541c917be65d8ea6a35e",
					"message": "Merge-pull-request-48-from-marmelab-makefile_doc",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 29 Feb 2016 16:36:16 +0100"
				},
				{
					"sha": "71df21165b289aee7f46e7a7245102f19482e810",
					"message": "Change-Travis-node-version",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 29 Feb 2016 16:28:58 +0100"
				},
				{
					"sha": "0f3e03f395ffecd1052eba1249b48becb7a2803e",
					"message": "Review-and-test-fixes",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 16:27:13 +0100"
				},
				{
					"sha": "3a48c7ac23641a660c78386f4d2046da1ff56b25",
					"message": "RFR-Self-documented-makefile",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 16:23:02 +0100"
				},
				{
					"sha": "22715531fd7f905a5e46f2aabdbd0656d7142b27",
					"message": "Merge-pull-request-44-from-marmelab-fix_frontend_order",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 29 Feb 2016 15:54:01 +0100"
				},
				{
					"sha": "b4d4a67a64feaf9943f3bced94b937f66d5b426f",
					"message": "Merge-pull-request-43-from-marmelab-react-hot-loader",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 29 Feb 2016 14:53:40 +0100"
				},
				{
					"sha": "25d32caf39ac0c70c4bfc9cd81299749245c4dbc",
					"message": "RFR-Fix-props-on-Order-components",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 14:49:58 +0100"
				},
				{
					"sha": "c0d8872a4386566bf504fe58c7902561d96870d9",
					"message": "RFR-Added-React-hot-reload",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 12:08:10 +0100"
				},
				{
					"sha": "cfd6d6b7ed2ab76c2045c4af9c8936c0d3c57d61",
					"message": "Merge-pull-request-36-from-marmelab-frontend-new-order",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 29 Feb 2016 12:02:16 +0100"
				},
				{
					"sha": "c84e7294c44196a2efc1e4ccc0fac48fbc6b151d",
					"message": "review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 11:56:29 +0100"
				},
				{
					"sha": "8baca1eb1828d5e5cc927f233e02e11d8b3f2898",
					"message": "Clear-shoppingcart-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 13:52:49 +0100"
				},
				{
					"sha": "db5a759c2d8dae70727575cc2b482455df16270c",
					"message": "Clear-shoppingcart-after-a-new-order-has-been-successfully-created",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 13:51:47 +0100"
				},
				{
					"sha": "243fd1919afbec1cf9e1c1bf4ebf70be73681639",
					"message": "Fix-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 13:45:29 +0100"
				},
				{
					"sha": "8347a364c186276ce837c32f78bbfe1fc7546c8c",
					"message": "Finished-order-creation",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 12:27:49 +0100"
				},
				{
					"sha": "1fe6ffec535f7bae44a76cc3d25d88a669ce252b",
					"message": "Added-unit-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 21 Feb 2016 19:05:12 +0100"
				},
				{
					"sha": "61d02bcbb8fddbe9fddce67c7d4c9468862ce03e",
					"message": "Added-shopping-cart-for-real-order-still-missing-the-API-part",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Sun, 21 Feb 2016 18:43:51 +0100"
				},
				{
					"sha": "144e41458073da828b369b522dcf3ff0a766b7cf",
					"message": "WIP-Order-a-product",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 18:41:12 +0100"
				},
				{
					"sha": "702cece170c758ad0adebf20a70a2c411e8981bf",
					"message": "Merge-pull-request-41-from-marmelab-logs-and-errors",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Feb 2016 11:47:46 +0100"
				},
				{
					"sha": "f16f02baaa368bbcffb36cd37bd042197b537c51",
					"message": "Fix-dev-logs-and-standardize-koa-error",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 29 Feb 2016 10:25:42 +0100"
				},
				{
					"sha": "3a7977e0ff6d821ce38c7844dc0a152a4289095d",
					"message": "Fix-typo",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Sat, 27 Feb 2016 07:29:26 +0100"
				},
				{
					"sha": "619e197a023883231e09dd75f70fe60577dc2795",
					"message": "expand-readme-a-little-bit",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 26 Feb 2016 11:37:57 +0100"
				},
				{
					"sha": "b88d540dfa298dae18ef4076506841b151ba27dd",
					"message": "makefile-oversight",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 23 Feb 2016 10:07:01 +0100"
				},
				{
					"sha": "b98b2469bf37a838e15fb9f82433f58ddd96356c",
					"message": "Merge-pull-request-38-from-marmelab-more_doc",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 22 Feb 2016 16:44:53 +0100"
				},
				{
					"sha": "c721c64c635e6ae569ac70245a0a8fd955f33a05",
					"message": "Code-review",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 16:39:41 +0100"
				},
				{
					"sha": "c0309d7d12fb39b1ebcf70cd6f436c086c4ecad5",
					"message": "Add-more-doc-for-newcomers",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 22 Feb 2016 16:27:57 +0100"
				},
				{
					"sha": "b5fe6858940ab355ca20862993bdde46743cb56f",
					"message": "Merge-pull-request-34-from-marmelab-cookie-based-token-storage",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 18:25:14 +0100"
				},
				{
					"sha": "7c61fd57a4b9506b9540aa5b1b60fa6c771609f1",
					"message": "localStorage-instead-of-sessionStorage-and-token-expiration",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 19 Feb 2016 15:07:44 +0100"
				},
				{
					"sha": "15eb528a090a8e0248e147b0d4cd170dd59fba30",
					"message": "Fix-tests-and-add-cookie-token-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 19 Feb 2016 14:10:38 +0100"
				},
				{
					"sha": "19374df22406135b07520a26440b843da0bdcd56",
					"message": "Cookie-based-token-storage-without-DB",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 19 Feb 2016 11:48:24 +0100"
				},
				{
					"sha": "e079d816c5e09df44d58b1bf051b9fd681a22882",
					"message": "Merge-pull-request-35-from-marmelab-frontend-signup",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 19 Feb 2016 18:13:07 +0100"
				},
				{
					"sha": "0b84183454afc83e7950e76985c4f9c83cc0230f",
					"message": "RFR-Added-Frontend-sign-up.-Cleaned-up-some-names",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 17:50:54 +0100"
				},
				{
					"sha": "6ef49de958218b43c35f239cb4a7ca2ccf0a9e5d",
					"message": "Merge-pull-request-33-from-marmelab-react-frontend-standardize-sagas",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 19 Feb 2016 11:07:18 +0100"
				},
				{
					"sha": "dbe1b3b1ae3ef2c395959919332eb2032cfec517",
					"message": "Review-and-applied-standardization-to-user-actions-reducers-and-sagas",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 11:02:54 +0100"
				},
				{
					"sha": "37e1e5fea2ecc47fe5616b44aebb23e1125dc88b",
					"message": "RFR-Standardize-actions-reducers-and-sagas",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 19 Feb 2016 09:23:34 +0100"
				},
				{
					"sha": "ad4dd2d583da82d06c8a527b66fbb86fc6a047c8",
					"message": "Merge-pull-request-27-from-marmelab-react-frontend-product",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Thu, 18 Feb 2016 14:46:54 +0100"
				},
				{
					"sha": "a761003a52d44a84101268adc3a6c61719aa570a",
					"message": "Review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 18 Feb 2016 14:38:04 +0100"
				},
				{
					"sha": "1ce93af6beba54fc4b08ab074416aa126e7051af",
					"message": "Disable-frontend-functional-tests-which-pass-on-local-but-not-on-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 17:03:19 +0100"
				},
				{
					"sha": "e9d5cef6a3fae327d9ec1ac7a7cfb742e0839867",
					"message": "update-selenium",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 16:50:32 +0100"
				},
				{
					"sha": "56eff16c17b50f003fc965038b82b715f7f29388",
					"message": "Don-t-use-default-chromium-installed-by-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 16:33:42 +0100"
				},
				{
					"sha": "48884dea10425f838c3fc245b5322bf55f9c1afd",
					"message": "Better-API-call-error-handling.-Tries-to-make-chrome-works-on-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 16:28:13 +0100"
				},
				{
					"sha": "fa4d2ab2ed40ba866124b07d5f4614f357b5de5b",
					"message": "Added-logs-for-travis-debugging",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 15:48:14 +0100"
				},
				{
					"sha": "a8a4a384a6f14b2ce09d78e64db748843dc54b08",
					"message": "Fix-travis-env",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 14:51:03 +0100"
				},
				{
					"sha": "9cf6689a8180d71ccc9ef7a9a6b1a6bdbde31559",
					"message": "Force-test-env-on-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 14:43:24 +0100"
				},
				{
					"sha": "8dab0862bcffc68ff7bf64991a0e5541eeb4ddb7",
					"message": "Increased-tests-timeout-for-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 11:57:03 +0100"
				},
				{
					"sha": "d42258617b0a029f9e256bdd93e869c1ad4881d4",
					"message": "Updated-config-for-travis",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 18:17:47 +0100"
				},
				{
					"sha": "41dc1c62d2da22f893a6932a4ada3e8ad719c33c",
					"message": "Missing-file",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 18:09:11 +0100"
				},
				{
					"sha": "e77ba87aba75bfeda311f056ff57f5586c132c5a",
					"message": "Fix-functional-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 18:08:55 +0100"
				},
				{
					"sha": "65fe2e4e263e8aa8d7b80cf40deaaf1c9f7c255f",
					"message": "Removed-unused-file",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 12:38:00 +0100"
				},
				{
					"sha": "270343cb4f1f47f40c7732d7a07e1fc75794b32b",
					"message": "WIP-Products-with-API",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 12:37:21 +0100"
				},
				{
					"sha": "5ecabaf0f401e60dc7ccc0ad33ce0fe11484b308",
					"message": "Merge-pull-request-30-from-marmelab-fix_authenticate_routes",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 17 Feb 2016 10:28:24 +0100"
				},
				{
					"sha": "6ef52fccc0fb63d5cb9b01b6d19d2bbfd1e0092c",
					"message": "Review",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 17 Feb 2016 09:23:49 +0100"
				},
				{
					"sha": "3cf703d6b4052b69f7f250ea5ac861f644c8eae4",
					"message": "Move-the-responsability-of-response-code-error",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 16 Feb 2016 08:39:04 +0100"
				},
				{
					"sha": "19ef2de60a05d91c6ef50ea6d09db5200d55c947",
					"message": "Review",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 17:36:08 +0100"
				},
				{
					"sha": "99dff6e066d9334b313c23663c22be390fac049f",
					"message": "Refactoring-authenticate-routes",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 16:56:50 +0100"
				},
				{
					"sha": "8f2a40251eb1a95c43532a815739698970e840cc",
					"message": "Merge-pull-request-32-from-marmelab-fix_test_body_as_error_info",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Tue, 16 Feb 2016 09:42:03 +0100"
				},
				{
					"sha": "a9b797ba2db358e67021f6ee440e6c5b1afa7d84",
					"message": "Small-fix",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Tue, 16 Feb 2016 09:33:38 +0100"
				},
				{
					"sha": "aeeafc5c37142dd0e4fe27740ad0e740de0eb5a4",
					"message": "Merge-pull-request-31-from-marmelab-e2e_test_improvement",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 17:26:13 +0100"
				},
				{
					"sha": "d68f6fc6d8d8cebbc305ffe13118b7f51eff9410",
					"message": "Use-body-as-test-fail-explanation",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 17:02:23 +0100"
				},
				{
					"sha": "f3910c82985592d38de616c25f6288cd364aab8c",
					"message": "Merge-pull-request-28-from-marmelab-webpack_es6",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 15:46:49 +0100"
				},
				{
					"sha": "2e072f4ee13fea21bbf23008a0d37d940b7a18e7",
					"message": "Using-ES6-with-Webpack",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 14:59:34 +0100"
				},
				{
					"sha": "ce27a0b0c78cba977f30a16db2cd6386389a1e1c",
					"message": "Merge-pull-request-24-from-marmelab-react-frontend-order",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 15 Feb 2016 12:26:16 +0100"
				},
				{
					"sha": "e5fdff5b29f2a17a7203ef13e14cbcd8f687db5c",
					"message": "Moved-rateLimiter-to-lib",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 12:18:23 +0100"
				},
				{
					"sha": "f6d63785210799c945fecd9970e065ce28262d24",
					"message": "Fix-createAdmin-binary",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 11:57:45 +0100"
				},
				{
					"sha": "c019c76dc2feb4445150b7a22195426ab8a4a90d",
					"message": "Fix-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 11:26:43 +0100"
				},
				{
					"sha": "04d2e8baefaf25d3f8c7a7458eb7480900b8e418",
					"message": "Updated-redux-saga",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 11:22:21 +0100"
				},
				{
					"sha": "83fbc2fe5818864feb81b61693c6bdf55674ed08",
					"message": "Real-bootstrap-integration-better-user-menu",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 10:48:32 +0100"
				},
				{
					"sha": "edf4b20bd4d63895b6284e9dcb3ab990e586cea7",
					"message": "More-consistant-error-handling",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 10:02:24 +0100"
				},
				{
					"sha": "4aef1433a0c0c249961d6a62e5b6d1044d8659e0",
					"message": "Reviewed-authentication-with-redux-saga",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 08:57:45 +0100"
				},
				{
					"sha": "8861cfed87275321127cf9d757b469861b3b262d",
					"message": "WIP-React-frontend-authentication-and-orders",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 19:18:18 +0100"
				},
				{
					"sha": "22cb9b27faf605efdae3025f4fff7ae64287883b",
					"message": "Merge-pull-request-25-from-marmelab-improve-security",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 12:09:40 +0100"
				},
				{
					"sha": "a8736bc9fd325eee817376db1be93d3a934b6616",
					"message": "Merge-pull-request-26-from-marmelab-stability-warning",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 15 Feb 2016 12:06:07 +0100"
				},
				{
					"sha": "0275a982c7ec22899abdbce51a4ac5b87b9c018f",
					"message": "Stability-warning-in-README",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 15 Feb 2016 11:47:01 +0100"
				},
				{
					"sha": "646c21b3a8ba1054ef7976c4a044691cbd2e0732",
					"message": "Increase-rate-limit-for-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 15 Feb 2016 11:50:04 +0100"
				},
				{
					"sha": "5edd2c766a1999eabf5e7843f430ea4e50fcb652",
					"message": "Improve-security",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 15 Feb 2016 11:30:30 +0100"
				},
				{
					"sha": "88bec55a0981332979df646ae0e9498069e2a26b",
					"message": "Merge-pull-request-23-from-marmelab-api_public",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 15 Feb 2016 11:36:03 +0100"
				},
				{
					"sha": "56d955a00db2aaa3c4e504cc821c491b87a542b0",
					"message": "Add-more-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 11:29:11 +0100"
				},
				{
					"sha": "1e6c96a43898bd1c22417ea3fc1c39efce27cfb5",
					"message": "Review",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 11:20:38 +0100"
				},
				{
					"sha": "d20ad73acc8a0c1f26e8d501b967ec6730d07b22",
					"message": "delete-order-from-api-with-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 11:02:44 +0100"
				},
				{
					"sha": "093aa87c69f1e4ed6f3ed7b84a6dd2da34bba49f",
					"message": "Review-from-Jonathan",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 09:48:25 +0100"
				},
				{
					"sha": "4ee8fe3cb64be3dd2079eefbae62fd8b76dc4879",
					"message": "Test-API-POST-order",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 09:40:54 +0100"
				},
				{
					"sha": "fd496a536d1b283fb9bed49767e78300473229bd",
					"message": "Refoctoring-CRUD-Middleware",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Mon, 15 Feb 2016 09:39:50 +0100"
				},
				{
					"sha": "f75f9e83d8037700b0fe8f6a8cc378a274e5fdb3",
					"message": "Rename-e2e-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 22:56:37 +0100"
				},
				{
					"sha": "51d8a9242478de10d5e1ecdb15fca02851539caa",
					"message": "Get-user-orders-with-test",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 22:52:52 +0100"
				},
				{
					"sha": "c374682b416507589c067daaec61c2efd4ba5d3f",
					"message": "Test-authentication-entry-point",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 21:06:30 +0100"
				},
				{
					"sha": "212747c5cd8f1f7ab8adbf6336c026e570a03848",
					"message": "Move-middlewares-in-lib-folder",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 14:26:58 +0100"
				},
				{
					"sha": "0735c6ae8a29de36e6b1344ea9c8943cc2c4ff3b",
					"message": "Using-requestFilter-Middleware-on-api",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 14:16:07 +0100"
				},
				{
					"sha": "a02aab7fa14b8113bf7193217bf45dd3337fc800",
					"message": "Add-Api-orders-route",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 14:15:13 +0100"
				},
				{
					"sha": "e567fdbf47b9982b43e996185f6c6337fcc676b7",
					"message": "Add-a-methodfilter-middleware",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 14:14:36 +0100"
				},
				{
					"sha": "461fbd6a65660092d7db9c6619ac342680db14d3",
					"message": "Using-crud-middleware-on-products-api",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 14:14:12 +0100"
				},
				{
					"sha": "5373c06f0a283d3ca5c4e688de684dafa8b80377",
					"message": "Refactoring-CRUD-lib-as-moddleware",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sun, 14 Feb 2016 14:12:02 +0100"
				},
				{
					"sha": "01d6849c15edfd87f7a45a3563acdc9ceb4e36c9",
					"message": "Test-another-test-naming-convention",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sat, 13 Feb 2016 18:48:10 +0100"
				},
				{
					"sha": "65a2fc4a5adbaf0e5422482d39dfeea18076b8eb",
					"message": "specific-product-entry-point-with-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sat, 13 Feb 2016 18:32:35 +0100"
				},
				{
					"sha": "aad8efa4326a47d65b26ea4333df1d940d25be75",
					"message": "Change-api-e2e-folder-structure",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Sat, 13 Feb 2016 17:08:51 +0100"
				},
				{
					"sha": "85b0189223c9845954eb3c982dbc2821348dd692",
					"message": "Fix-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:14:15 +0100"
				},
				{
					"sha": "ae99aa4216f48292bb89f0a4121d4fdbbbd6a8ed",
					"message": "First-test-on-public-api",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:04:57 +0100"
				},
				{
					"sha": "e1babd00be2ddad59f7ed92881030c46932ebadd",
					"message": "Bootstrap-api-functionnal-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:04:37 +0100"
				},
				{
					"sha": "d62be4f9fb92e7d19ad4c6fb89306a162e3232ab",
					"message": "Load-fixtures-for-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:04:10 +0100"
				},
				{
					"sha": "75b51c38dea3b784140dfd54128c007548cd499a",
					"message": "Add-a-thunkified-request-for-tests",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:03:23 +0100"
				},
				{
					"sha": "e09f5baa61e0f7d3e06924360dc8b42a51b0c45c",
					"message": "Remove-auth-from-public-api",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:02:47 +0100"
				},
				{
					"sha": "a3bc928f580bd39972e034efff2a69c4426c40c3",
					"message": "Rename-db-tables-from-plural-to-singular",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 18:01:42 +0100"
				},
				{
					"sha": "fd6bd42e013d90ff429019228197f309984af607",
					"message": "WIP",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 14:39:18 +0100"
				},
				{
					"sha": "fbb1bceff5a136d700d8ddc8903eeb9f954bda7b",
					"message": "Merge-pull-request-18-from-marmelab-doc_pm2",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Mon, 15 Feb 2016 10:21:15 +0100"
				},
				{
					"sha": "8f1e03332c97233a7588d45a8e9f05244ea69b0c",
					"message": "Review",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 09:52:30 +0100"
				},
				{
					"sha": "d5f36dc22669991f86ae16eda857eaf890caf510",
					"message": "Update-the-readme-with-some-pm2-explanations",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 11 Feb 2016 15:54:02 +0100"
				},
				{
					"sha": "549a8daf00e599258eb5ccf7b63d3787805dee64",
					"message": "Merge-pull-request-20-from-marmelab-react-frontend",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Fri, 12 Feb 2016 17:46:20 +0100"
				},
				{
					"sha": "04c2185c374f3988b466116d8d1e465c0ab039d0",
					"message": "use-es6-for-exports",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 17:40:28 +0100"
				},
				{
					"sha": "f20aec38ad0a8e81fb8bd6c501e550056709140f",
					"message": "Merge-pull-request-21-from-marmelab-deployment",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 16:36:22 +0100"
				},
				{
					"sha": "561d2a26336f99fc4076aff61601e331805d7603",
					"message": "Display-the-app-name-from-config",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 16:33:06 +0100"
				},
				{
					"sha": "8c949ae45fca353dd037bb5adb97104259cb53a1",
					"message": "Added-some-functional-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 16:23:52 +0100"
				},
				{
					"sha": "273e542efc0196ece0ddaf05021098feaf9a5618",
					"message": "English",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 12 Feb 2016 15:44:05 +0100"
				},
				{
					"sha": "7eaf818f37fa66d821616e83ecc1065be8e74b11",
					"message": "Document-deployment",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 12 Feb 2016 15:35:27 +0100"
				},
				{
					"sha": "3875c0c5c8304a6c5cafee04f133f9d8e1c44330",
					"message": "Move-local-static-deployment-into-fabfile",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 12 Feb 2016 14:46:10 +0100"
				},
				{
					"sha": "00598fb5a32d8afd47b92487675adcaad3a40210",
					"message": "Deployment-process",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 12 Feb 2016 14:26:05 +0100"
				},
				{
					"sha": "cfcbc0c46c76b1bec5f4c11c9a0941177a87ab2c",
					"message": "Merge-branch-react-frontend-of-github.com-marmelab-javascript-boilerplate-into-react-frontend",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 12:50:22 +0100"
				},
				{
					"sha": "dee88731d5b43fa8239638eee542ccf42a946d65",
					"message": "Better-product-list-and-product-details-pages",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 12:46:48 +0100"
				},
				{
					"sha": "2c12e41f1a48b0dc34617ba27480f91bea2e9a28",
					"message": "Added-some-twitter-bootstrap-structure.-Added-basic-pages-for-product-list-and-product-item",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 11:50:18 +0100"
				},
				{
					"sha": "e260d7656865d88f985ede1d23ebc443c099c206",
					"message": "WIP-React-frontend",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 11:08:54 +0100"
				},
				{
					"sha": "7450bf132502625e0ceffcd425dc203e01279208",
					"message": "WIP-React-frontend",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 12 Feb 2016 11:08:54 +0100"
				},
				{
					"sha": "e7ad36894e09f6d71813f3ca66b722c071387b69",
					"message": "Merge-pull-request-19-from-marmelab-organization",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Fri, 12 Feb 2016 09:50:23 +0100"
				},
				{
					"sha": "d6ff7bf34b71173db6457bb18e0ee14b7b491676",
					"message": "Remove-console.log",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 12 Feb 2016 09:42:31 +0100"
				},
				{
					"sha": "6b957eaa646aa9f8dd38fb5c24f0cebb4ca3859c",
					"message": "Remove-nightwatch-reports-from-git",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 18:06:39 +0100"
				},
				{
					"sha": "facddc58e71c83811aa7bc3caebe9038d9075d91",
					"message": "Fix-configuration-files-and-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 18:02:38 +0100"
				},
				{
					"sha": "2160f9bc167ab868e84bf49b91c800cef3f6eaf9",
					"message": "Fix-pm2-for-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 17:26:34 +0100"
				},
				{
					"sha": "1db8b0d5ae8feb7014f44c81894c3c875e777534",
					"message": "WIP-Review-project-organization",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 17:12:33 +0100"
				},
				{
					"sha": "e6fa72002f1973f373a4dcaa24c20ba276e0baaf",
					"message": "Merge-pull-request-14-from-marmelab-feature-admin",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 11 Feb 2016 15:51:37 +0100"
				},
				{
					"sha": "beacc40f49d8388d55e8a5b6516669466380004a",
					"message": "Add-token-to-http-resquet-from-admin",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 11 Feb 2016 15:45:44 +0100"
				},
				{
					"sha": "8b7250bd4c508a80871eb7b78af9a64d034a4288",
					"message": "Remove-commented-code-and-admin-filters",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 11 Feb 2016 14:08:00 +0100"
				},
				{
					"sha": "aeb8a8b6b63eac0f8f41dd7362be8dc0cdfba906",
					"message": "Order-admin",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 11 Feb 2016 12:39:46 +0100"
				},
				{
					"sha": "8da79d7174ff6de26818e2c2c661de52f2245fbc",
					"message": "Product-admin",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 11 Feb 2016 12:14:14 +0100"
				},
				{
					"sha": "e9bc3418db0069b7ea6f4cd7b439780f8904e4cc",
					"message": "Merge-pull-request-16-from-marmelab-authentication",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Thu, 11 Feb 2016 15:24:05 +0100"
				},
				{
					"sha": "f4918bf5a5f26c429a8f43e5ad9ddde9a846a44a",
					"message": "Removed-unecessary-middleware",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 15:09:48 +0100"
				},
				{
					"sha": "3dca3f8a019e62b3756a1e69c8feb2ebb777de3c",
					"message": "RFR-Authentication-for-api-admin-api",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 14:27:27 +0100"
				},
				{
					"sha": "d8cbc0d8c7476d5fac1d279f5cfee4d0c753156d",
					"message": "Merge-pull-request-11-from-marmelab-using_pm2_for_test_servers",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Thu, 11 Feb 2016 15:13:22 +0100"
				},
				{
					"sha": "f4cdf6e16e91a445357ac35c9564cb4786123ad2",
					"message": "autorestart-true",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 11 Feb 2016 15:03:06 +0100"
				},
				{
					"sha": "01cf610cfbdd8a07cb3950191185d5352bbe08e3",
					"message": "Merge-pull-request-15-from-marmelab-remove-mobile",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 14:30:54 +0100"
				},
				{
					"sha": "d41309f80e18cb3c635efd66d308dc3bedc043b3",
					"message": "Remove-mobile-app",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 11 Feb 2016 14:20:50 +0100"
				},
				{
					"sha": "e2f459335120bdf0167f94a9324eab3b1fe29b9c",
					"message": "Merge-pull-request-13-from-marmelab-webpack",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Thu, 11 Feb 2016 11:34:52 +0100"
				},
				{
					"sha": "2b3e4a380fb7adec5fb9246bc21e0cb22efdc145",
					"message": "Fix-app-name",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 11:12:22 +0100"
				},
				{
					"sha": "be5a3c2157b3b081dd017ec67eb8cd9bbab63a97",
					"message": "RFR-Fix-webpack-configuration-and-updated-admin",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 11:09:13 +0100"
				},
				{
					"sha": "99634f8042fd49ab4916d69173d63878a47868b5",
					"message": "Merge-pull-request-12-from-marmelab-feature-models",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 11 Feb 2016 11:07:56 +0100"
				},
				{
					"sha": "e76102b42093b962de3316fe65ca840efcc643a9",
					"message": "Review",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 11 Feb 2016 11:01:01 +0100"
				},
				{
					"sha": "c1275bcb698018dac265d15799c28570c0afe367",
					"message": "Add-feature-models-Product-and-Order",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 11 Feb 2016 10:58:52 +0100"
				},
				{
					"sha": "315fd595366a4d6cd6e064703a8e24a600e1a911",
					"message": "Some-improvments",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 10 Feb 2016 16:26:22 +0100"
				},
				{
					"sha": "4cbfb84c5e4a1f613e53f8eeca451e19efb1319b",
					"message": "remove-nodemon",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 28 Jan 2016 22:46:35 +0100"
				},
				{
					"sha": "c79fd28c744e17587f067b7cc855650598c33204",
					"message": "Add-frontend-functional-tests-for-Travis",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 28 Jan 2016 21:37:40 +0100"
				},
				{
					"sha": "391cf206901ebbb77eef82336bee4fbce5ae3316",
					"message": "Dev-servers-managment-with-pm2",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 28 Jan 2016 21:30:16 +0100"
				},
				{
					"sha": "9af8e9a97dc27eb0276a26b9482e28a9c3fccfc6",
					"message": "management-of-test-servers-with-pm2",
					"author": {
						"name": "alexisjanvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Thu, 28 Jan 2016 21:07:50 +0100"
				},
				{
					"sha": "554f68bd0c76184cf3a5a7ac0ad60e94c677aac2",
					"message": "Merge-pull-request-10-from-marmelab-webpack_html_2",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 27 Jan 2016 11:47:30 +0100"
				},
				{
					"sha": "89bf97f1950a94f7ca39eee97c4157916075c0c3",
					"message": "missing-scss-file",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 11:41:41 +0100"
				},
				{
					"sha": "096c27e3eb1e35ce3a2f1840bc237907c03dd709",
					"message": "improvements-based-on-jpetitcolas-comments-on-9",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 11:33:56 +0100"
				},
				{
					"sha": "9bd31d89dfda8d7d045d8acbd8001b93433c1293",
					"message": "Merge-pull-request-8-from-marmelab-database2",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 11:32:32 +0100"
				},
				{
					"sha": "ecb1924059bc7b08cf3ea7c0b07c920e95fd8734",
					"message": "Clean-migration-file",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 27 Jan 2016 11:22:44 +0100"
				},
				{
					"sha": "84dbcf291281893586d674f44d0e61c2f3928fe5",
					"message": "Review-feedbacks",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 20 Jan 2016 18:45:03 +0100"
				},
				{
					"sha": "92c8abf27ddda09c0b2f90a1fecf7bf7c96ebb4f",
					"message": "Very-basic-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 19 Jan 2016 16:54:03 +0100"
				},
				{
					"sha": "ad28f6b2946cade56fb1ab6e109c5bbf30e50208",
					"message": "User-example",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 19 Jan 2016 16:09:42 +0100"
				},
				{
					"sha": "c326295078539242b95ec15d8e6bc6d5e9aa9e99",
					"message": "Database-queries",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 19 Jan 2016 12:19:07 +0100"
				},
				{
					"sha": "9f12c93131879394f0075e8d6fb00551f77ffa5d",
					"message": "PostgreSQL-connection",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 18 Jan 2016 18:07:36 +0100"
				},
				{
					"sha": "c0758296ced14339b87c9da4ec7e2ff4d243ffe7",
					"message": "Merge-pull-request-9-from-marmelab-webpack_html",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Wed, 27 Jan 2016 10:58:15 +0100"
				},
				{
					"sha": "ce57a7b53b2c7f0ef3d1b313d1187860d335fb80",
					"message": "Remove-webpack-sources-and-use-inline-option-for-webpack-dev-server",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 27 Jan 2016 10:50:47 +0100"
				},
				{
					"sha": "9d8b63bf8738656359cc2d68523c1e38d24f9c18",
					"message": "Fixes-after-code-review",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Wed, 20 Jan 2016 09:30:44 +0100"
				},
				{
					"sha": "44de8487fdee75ebaeb722205520c0900d07cc9a",
					"message": "Updated-webapck-fixes-2",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 19 Jan 2016 16:08:30 +0100"
				},
				{
					"sha": "b59c543fb2b0c4b446bfc07518e2c56ed4e3ba4f",
					"message": "Merge-pull-request-1-from-marmelab-bootstrap-app-unit-tests",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Tue, 19 Jan 2016 14:48:52 +0100"
				},
				{
					"sha": "10d20488059611e3cb1daadeb8b1b7c383f86c96",
					"message": "comment-functional-tests-as-I-have-been-unable-to-make-them-work-on-travis-they-work-locally",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Tue, 19 Jan 2016 12:37:42 +0100"
				},
				{
					"sha": "1427ed3e3bee043c85a1adef39e2dfd250333cb6",
					"message": "added-alias-for-isomorphic-folder",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 14:36:49 +0100"
				},
				{
					"sha": "61f649bda4a115f7b7ac1d13160162522ff86f0b",
					"message": "Fix-babel-cli-version",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 14:33:23 +0100"
				},
				{
					"sha": "d6dd0e9b92adfae939efd1d97c537b3f47f9d56a",
					"message": "Fixed-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 11:45:24 +0100"
				},
				{
					"sha": "1b59b66c4242970df13e1766c4b3521e47879c5f",
					"message": "Added-tests-for-fetchMiddleware",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 11:13:33 +0100"
				},
				{
					"sha": "c5dcede10fc8fbd309dd1215734f21d3b17941c8",
					"message": "Bootstraped-app-unit-tests",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 10:36:43 +0100"
				},
				{
					"sha": "8e08a7e09e8745cbd614bfcec953fa7d2c333498",
					"message": "Merge-pull-request-7-from-marmelab-api-more-secure",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 16:27:58 +0100"
				},
				{
					"sha": "d1758333eadf5fa7e7dc76af40e3074b652a2bca",
					"message": "Hide-failed-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 18 Jan 2016 16:23:06 +0100"
				},
				{
					"sha": "ac0863e3e964c9b73e4904e82a20b47d712a0a02",
					"message": "Improve-code-quality",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 18 Jan 2016 16:13:44 +0100"
				},
				{
					"sha": "5a50d249aaee2748009c24179e7af74717351eb9",
					"message": "API-security-improvement",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 18 Jan 2016 15:25:01 +0100"
				},
				{
					"sha": "bd353bf8a7e4086d0b2d00de40ba23fde1cea9b3",
					"message": "Hotfix-fixed-frontend-redirection-url",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 10:16:09 +0100"
				},
				{
					"sha": "d4b158943dfaf10def8e736b168b8f38cb4209b0",
					"message": "Hotfix-fixes-webpack-configs",
					"author": {
						"name": "djhi",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 18 Jan 2016 10:15:05 +0100"
				},
				{
					"sha": "9d333f1b99366d66830de4059941443880420249",
					"message": "First-commit",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 18 Jan 2016 10:08:22 +0100"
				}
			]
		},
		{
			"name": "sedy",
			"commits": [
				{
					"sha": "1922b58229ffb7dfff0211632d2565bfcd0968a3",
					"message": "Fix-parser-from-deprecated-usage",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 26 Aug 2016 18:29:54 +0200"
				},
				{
					"sha": "75edce0a8b718b7624c3d7978c823484fdde849e",
					"message": "Clean-fixer-and-add-a-test-for-diff-interpreter",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 26 Aug 2016 18:19:06 +0200"
				},
				{
					"sha": "958f73ca0240d5b564116983038de4f5e37f155f",
					"message": "Merge-pull-request-32-from-marmelab-better-response",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 29 Aug 2016 09:06:24 +0200"
				},
				{
					"sha": "db3faa87d19ead8184a8467a497cd4eaab02e906",
					"message": "Improve-Sedy-s-response-to-the-world",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 26 Aug 2016 17:41:02 +0200"
				},
				{
					"sha": "a8eed8c509f6051f0af108b6c7376505e30082ee",
					"message": "Merge-pull-request-28-from-marmelab-new-commit-date",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 25 Aug 2016 18:11:26 +0200"
				},
				{
					"sha": "7858801ee4977691e7bbeabc84a8fc775223ff49",
					"message": "Merge-pull-request-27-from-marmelab-twice-build",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Thu, 25 Aug 2016 18:10:15 +0200"
				},
				{
					"sha": "b22522e6e67e6a899b666e84f0765ef9f59faccd",
					"message": "Avoid-to-build-twice-in-a-row",
					"author": {
						"name": "Kmaschta",
						"email": "Kmaschta@users.noreply.github.com"
					},
					"date": "Tue, 23 Aug 2016 18:49:49 +0200"
				},
				{
					"sha": "39c066d6b4552d1c15b7f0a90f4668f2cc9ff05b",
					"message": "Merge-pull-request-26-from-marmelab-fix-tests",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 24 Aug 2016 09:31:22 +0200"
				},
				{
					"sha": "4ac378df145ca7d5d17f97d51e0ece38cef6b12b",
					"message": "Fix-commit-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 23 Aug 2016 18:44:20 +0200"
				},
				{
					"sha": "19da67897b37bedb16381da75eca9c1f2e570595",
					"message": "Remove-co-mocha-and-remove-Object.assign",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 23 Aug 2016 18:23:04 +0200"
				},
				{
					"sha": "a1e82392da5b4d3031bcf1d68767f7c9aad5ec2e",
					"message": "Add-node-version-to-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 23 Aug 2016 17:51:57 +0200"
				},
				{
					"sha": "20a98de669c2bcbcbe73c056cb9319dd8524989c",
					"message": "Linting",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 23 Aug 2016 17:49:57 +0200"
				},
				{
					"sha": "4afc56722b921a6ab60e19e316ec2fc4b9fd6aee",
					"message": "Merge-pull-request-24-from-marmelab-git-client",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 19 Aug 2016 18:06:25 +0200"
				},
				{
					"sha": "44e87a24b36ce77eb340b8f67e0c18984d1e3042",
					"message": "Replace-commiter-behavior-with-git-client",
					"author": {
						"name": "Kmaschta",
						"email": "maschtaler.kevin.iris@gmail.com"
					},
					"date": "Sat, 13 Aug 2016 21:40:46 +0200"
				},
				{
					"sha": "ec13192afd7cdc642c61c68a815203d0f06c9dd6",
					"message": "Implement-basic-git-commands",
					"author": {
						"name": "Kmaschta",
						"email": "maschtaler.kevin.iris@gmail.com"
					},
					"date": "Sat, 13 Aug 2016 19:57:54 +0200"
				},
				{
					"sha": "bfea88205c0077c73e3653e7d71ba71f33d3dbbb",
					"message": "Typo-fix-authored-by-Kmaschta",
					"author": {
						"name": "marmelab-bot",
						"email": "info@marmelab.com"
					},
					"date": "Sun, 24 Jul 2016 00:49:30 +0200"
				},
				{
					"sha": "89d89b47060b04adf017a4aefb4dcf7d39df5928",
					"message": "Reviews-avoid-a-dependency",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 25 Aug 2016 17:53:22 +0200"
				},
				{
					"sha": "32afa14578eb890db49c30cf01837e5325e4f1dd",
					"message": "Add-current-date-to-new-commits",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 24 Aug 2016 18:10:18 +0200"
				},
				{
					"sha": "b6e6d3a0507879f2138c26b8d2c98d106494df33",
					"message": "Separate-config-from-index-add-git-reference-object",
					"author": {
						"name": "Kmaschta",
						"email": "maschtaler.kevin.iris@gmail.com"
					},
					"date": "Sat, 23 Jul 2016 21:48:53 +0200"
				},
				{
					"sha": "85fdebf279ddb80dcb8cd0e32e8216f5eaa11879",
					"message": "Add-some-validations-tests",
					"author": {
						"name": "Kmaschta",
						"email": "maschtaler.kevin.iris@gmail.com"
					},
					"date": "Sat, 23 Jul 2016 19:53:10 +0200"
				},
				{
					"sha": "fc8063b2896ee1b47c882f1a7a9269e7327125bc",
					"message": "Implement-a-basic-store",
					"author": {
						"name": "Kmaschta",
						"email": "maschtaler.kevin.iris@gmail.com"
					},
					"date": "Sat, 23 Jul 2016 18:39:13 +0200"
				},
				{
					"sha": "a54effbcb20126cfff5bf021fa5b614c64f0845e",
					"message": "Add-test-to-git-library",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 22 Jul 2016 18:01:14 +0200"
				},
				{
					"sha": "673354215220d93f58905924116e7c3a438ac1e4",
					"message": "Git-client-structure-fixer-git-usage",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 21 Jul 2016 18:23:54 +0200"
				},
				{
					"sha": "9836c044ff1affdb9cbabc7ff0992ffacd188b0c",
					"message": "Merge-pull-request-23-from-marmelab-struct-update",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 22 Jul 2016 18:02:18 +0200"
				},
				{
					"sha": "a917e7b50e62ab24e4c6aec62854108c7efe2961",
					"message": "Add-babel-stage-0-preset",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Thu, 21 Jul 2016 17:46:10 +0200"
				},
				{
					"sha": "c18e75189396c64a4a765ee8e7a4c45f05aed5af",
					"message": "Merge-pull-request-21-from-marmelab-created-comment-only",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 30 May 2016 16:07:56 +0200"
				},
				{
					"sha": "64cc111cbe5ad811a1619bb6dcb6df74275cd19a",
					"message": "Parser-should-refuse-edited-and-deleted-comments",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 30 May 2016 16:00:03 +0200"
				},
				{
					"sha": "e8344498d370942b6c1c1d222ce0dd53d77f213c",
					"message": "Merge-pull-request-20-from-marmelab-logger",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 30 May 2016 15:09:50 +0200"
				},
				{
					"sha": "5d3bc5de41562c43ea98bd0fc2e0f186c30bddcf",
					"message": "Change-structure-add-a-logger",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 30 May 2016 15:01:17 +0200"
				},
				{
					"sha": "1db2560431c4e92d1a3fee70759466f7acef5624",
					"message": "Merge-pull-request-19-from-marmelab-babel-issues",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 30 May 2016 12:10:10 +0200"
				},
				{
					"sha": "81bca7227b9681928057ea91a93a15d69dd2cea3",
					"message": "Fix-babel-polyfill-issue",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Mon, 30 May 2016 12:00:38 +0200"
				},
				{
					"sha": "af5baebe69557a1444bc9fa9b988d98ec09f5303",
					"message": "Merge-pull-request-15-from-marmelab-commiter-tests",
					"author": {
						"name": "Alexis Janvier",
						"email": "contact@alexisjanvier.net"
					},
					"date": "Wed, 18 May 2016 07:07:54 +0200"
				},
				{
					"sha": "98d9c95989b4f39757a478aaf565fd3a1e952ccc",
					"message": "Merge-pull-request-16-from-marmelab-deps-badge",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 17 May 2016 18:29:38 +0200"
				},
				{
					"sha": "41ac3a79e1d133a46018ae64f6e359fff25dd754",
					"message": "Dependencies-badge",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 17 May 2016 18:26:45 +0200"
				},
				{
					"sha": "e5e4de74128ac7efe3ed7567501843cd251586d2",
					"message": "Commiter-tests",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 17 May 2016 18:20:10 +0200"
				},
				{
					"sha": "2144744a606b4c4a464da17d8859e62d57dba56c",
					"message": "Commiter-first-test",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Fri, 6 May 2016 18:13:18 +0200"
				},
				{
					"sha": "8cce6ae84b1453b2fddb88982b71b1a2f1d3ea1d",
					"message": "Merge-pull-request-11-from-marmelab-authorization",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 4 May 2016 10:35:46 +0200"
				},
				{
					"sha": "fe4c185fdaa38a3beaa7c99099767ffb6cb660ba",
					"message": "Authorization-to-users-only",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 4 May 2016 10:16:01 +0200"
				},
				{
					"sha": "6330b9a745ef6cead8e8c7ff2a66175284df782e",
					"message": "Merge-pull-request-12-from-marmelab-typo",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Wed, 4 May 2016 10:22:50 +0200"
				},
				{
					"sha": "74afe0e7f19281e2efb6fb767f05beb78a6a8349",
					"message": "Typo-in-a-typo-fixer-sic",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Wed, 4 May 2016 10:19:45 +0200"
				},
				{
					"sha": "e275a5c4e6ad5bb6178da4eb8aede046a8307b20",
					"message": "Travis",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 3 May 2016 18:18:09 +0200"
				},
				{
					"sha": "f30d945a8413db98a3b0120941915d2b7ad8fe63",
					"message": "First-commit",
					"author": {
						"name": "Kmaschta",
						"email": "kevin@marmelab.com"
					},
					"date": "Tue, 3 May 2016 18:11:20 +0200"
				}
			]
		},
		{
			"name": "restful.js",
			"commits": [
				{
					"sha": "fcdd988aa244cbd6137baa7428c6f95b5228fceb",
					"message": "Merge-pull-request-90-from-rundef-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 16 Aug 2016 10:53:31 +0200"
				},
				{
					"sha": "9768aa33d66d4135b9893c2a98406ed2b46e9ede",
					"message": "Fix-typo",
					"author": {
						"name": "Mickael Burguet",
						"email": "mickael.burguet@ssense.com"
					},
					"date": "Thu, 11 Aug 2016 10:26:33 -0400"
				},
				{
					"sha": "f2e098ce7a8b1898b9985658b8b0cb81d53a94e8",
					"message": "0.9.6",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sat, 27 Feb 2016 19:41:52 +0100"
				},
				{
					"sha": "a5ea03c5697392deca2ff6a083096e108c0a4ac0",
					"message": "Merge-pull-request-83-from-opengeek-upper-patch",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Sat, 27 Feb 2016 19:36:52 +0100"
				},
				{
					"sha": "bfa852b438477c593c92133e644c29f14effe9f4",
					"message": "Define-all-used-HTTP-methods-as-uppercase-according-to-spec",
					"author": {
						"name": "Jason Coward",
						"email": "jason@opengeek.com"
					},
					"date": "Wed, 24 Feb 2016 10:07:17 -0700"
				},
				{
					"sha": "29887ad9200aedc2f407b126747a9d82a2dce884",
					"message": "Merge-pull-request-78-from-marmelab-0.9.5",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 11 Feb 2016 15:42:17 +0100"
				},
				{
					"sha": "dfc4d3ef540b53be3ac3908a4bb21fefff1aa0dc",
					"message": "Add-changelog",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 11 Feb 2016 11:58:44 +0100"
				},
				{
					"sha": "eea7174751d6f2ac2c244c7166fb70982a884583",
					"message": "Build-for-0.9.5",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 10 Feb 2016 17:42:26 +0100"
				},
				{
					"sha": "a322a659e86f98cad039763a85c5bf1babd081c0",
					"message": "Merge-pull-request-77-from-yborunov-access-headers-fix",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Wed, 10 Feb 2016 16:25:27 +0100"
				},
				{
					"sha": "8ee16889a8ce2735f46886063fda698f295815ad",
					"message": "use-different-methods-to-get-headers-depend-on-what-is-available-forEach-keys-or-simply-return-Headers-object-otherwise",
					"author": {
						"name": "Yuri Borunov",
						"email": "yborunov@infomart.com"
					},
					"date": "Tue, 9 Feb 2016 18:00:14 -0500"
				},
				{
					"sha": "2a11828dc17117c12cb1ae020ad3cf03f6becfbc",
					"message": "Build-and-upgrade-version",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 29 Jan 2016 09:59:54 +0100"
				},
				{
					"sha": "bd6b47ec1cf6b1772dbe786dca1b35f52c02bac3",
					"message": "Merge-pull-request-70-from-marmelab-firefox_fixes",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 29 Jan 2016 09:51:06 +0100"
				},
				{
					"sha": "83a33380260b693cf5b6598f10d8fe6bfe39fe12",
					"message": "Remove-unrelated-code",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 29 Jan 2016 09:31:16 +0100"
				},
				{
					"sha": "339f0aec0cc04a3f694a0a2a1d661c877f3ba2c7",
					"message": "Fix-firefox-issue-with-headers.forEach",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 28 Jan 2016 17:47:45 +0100"
				},
				{
					"sha": "647788b34655979f7bf375f36bf8b95afa893dd0",
					"message": "Build-0.9.3",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 16 Oct 2015 17:49:15 +0200"
				},
				{
					"sha": "e02470d7f1f38ad4b3edf17142fe68f839d7613b",
					"message": "Merge-pull-request-59-from-marmelab-interceptor_events",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Fri, 16 Oct 2015 17:43:58 +0200"
				},
				{
					"sha": "f87940383a3b23d16b550e73a7d8058c7d49142b",
					"message": "Add-interceptor-events",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 16 Oct 2015 17:15:39 +0200"
				},
				{
					"sha": "9c5baf1cef988f28ea5ccf47bc77d0134c0c132e",
					"message": "Merge-pull-request-56-from-abhishekisnot-master",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Tue, 13 Oct 2015 17:22:33 +0200"
				},
				{
					"sha": "08035b4c0bba053e2bab83804fe90daca1cd5b4e",
					"message": "closes-55-move-babel-loade-to-dev-dependency-change-repo-field-to-match-package.json-schema",
					"author": {
						"name": "Abhishek Shende",
						"email": "abhishekisnot@gmail.com"
					},
					"date": "Tue, 13 Oct 2015 01:38:42 +0000"
				},
				{
					"sha": "c545a92bb5a8c788ab5985568b4f19a5603bb85f",
					"message": "Build-0.9.2",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 12 Oct 2015 17:56:12 +0200"
				},
				{
					"sha": "7561b5d706674f6293f516e227caaf64943d4706",
					"message": "Merge-pull-request-54-from-marmelab-fetch_querystring",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Mon, 12 Oct 2015 17:50:23 +0200"
				},
				{
					"sha": "1f90c4439f07b2eb87cb1734e7a4c6cdd11daf1a",
					"message": "Fix-params-issue-in-fetch-http-backend",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 12 Oct 2015 17:43:59 +0200"
				},
				{
					"sha": "58c8e4e2a6f9d0ffb371b5014117b01e17198573",
					"message": "Merge-pull-request-53-from-marmelab-RobinBressan-patch-1",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 8 Oct 2015 09:50:50 +0200"
				},
				{
					"sha": "f9c39a267bda950cb9b19a8fc222f864489932dd",
					"message": "Remove-useless-conf",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Thu, 8 Oct 2015 09:23:10 +0200"
				},
				{
					"sha": "16464a58a7041015a17953c248fbecd1b4b6206e",
					"message": "Merge-pull-request-52-from-marmelab-backend_docs",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 29 Sep 2015 22:49:51 +0200"
				},
				{
					"sha": "116fc42c94a43040cb44fff3b2c5f2bfb838a285",
					"message": "Add-doc-about-HTTP-backends",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Tue, 29 Sep 2015 22:41:17 +0200"
				},
				{
					"sha": "9f6a927f0653c4c293c52363cf2745be3eefcf1e",
					"message": "Fix-204-response-on-fetch",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 28 Sep 2015 16:35:21 +0200"
				},
				{
					"sha": "15c834346e16ac5808f5c90084311424dcea1832",
					"message": "Build-0.9.1",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 28 Sep 2015 16:18:44 +0200"
				},
				{
					"sha": "ba6e2d0c14ac16a93d99670da6007f1a862ada3d",
					"message": "Merge-pull-request-51-from-marmelab-fixes",
					"author": {
						"name": "Gildas Garcia",
						"email": "gildas.garcia@gmail.com"
					},
					"date": "Mon, 28 Sep 2015 15:37:33 +0200"
				},
				{
					"sha": "e2903b89b39096a03071cec086939a5f834eb026",
					"message": "Fix-npm-main-param-and-issue-on-collection-decorator",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 28 Sep 2015 15:34:01 +0200"
				},
				{
					"sha": "0f725b588efa3e9837b7fe41f1534c1f8e534d39",
					"message": "Build",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 28 Sep 2015 13:35:34 +0200"
				},
				{
					"sha": "b14af848b9772670583e4b07bbb4a11e0c58f9a3",
					"message": "Merge-pull-request-50-from-marmelab-0.9",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Mon, 28 Sep 2015 13:33:37 +0200"
				},
				{
					"sha": "ea020974e36347d40de03a587c675ecf2dfe0dbe",
					"message": "README-review",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 28 Sep 2015 13:31:25 +0200"
				},
				{
					"sha": "c4ba7dd4d4ffde20f23447de92ffdb3026d1f8df",
					"message": "Add-promise-note-in-upgrade",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 28 Sep 2015 09:52:57 +0200"
				},
				{
					"sha": "2dbe8159b78299f5890ab714e1ea0a459c8c0a51",
					"message": "Add-upgrade-guide",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sat, 26 Sep 2015 15:04:51 +0200"
				},
				{
					"sha": "7ec1b55a4c30629956f2015f0feadeb749c4ad02",
					"message": "Add-es5-build",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sat, 26 Sep 2015 08:11:07 +0200"
				},
				{
					"sha": "7d18a06c9dc28253f5754eb959f4d3f73421f087",
					"message": "Fix-README",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sat, 26 Sep 2015 07:54:24 +0200"
				},
				{
					"sha": "48ba2de65e2738fe62c464de997704ce8618355b",
					"message": "Update-README",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 18:33:17 +0200"
				},
				{
					"sha": "c89b9ca6ca1fd1b66067cbbbcf49a43763280bad",
					"message": "Remove-useless-conf",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 17:00:48 +0200"
				},
				{
					"sha": "e8888271d1d12024e5b048bf32d9b25fff5e37c3",
					"message": "Fix-header-retrieval-for-fetch-and-remove-useless-debug-service",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 16:13:44 +0200"
				},
				{
					"sha": "8b9ce96746a92b68ffa5e99a8d3a558ad44c39aa",
					"message": "Add-fetch-http-backend-tests",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 15:48:29 +0200"
				},
				{
					"sha": "a863ad6425128f756d59a92830b7b487a88a5133",
					"message": "Moving-request-and-fetch-to-optionnal-dependencies",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 15:28:19 +0200"
				},
				{
					"sha": "5aab4b358210ecdd60c4c50127282c54c4e8c45c",
					"message": "Add-request-install-for-travis",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 15:18:10 +0200"
				},
				{
					"sha": "1729464bf2bd5e3defe3933851a456fc504cf137",
					"message": "Add-request-http-backend-tests",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 15:13:33 +0200"
				},
				{
					"sha": "e159a8401203dc220df8feadd2824952a205b3c7",
					"message": "Complete-tests",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 14:30:56 +0200"
				},
				{
					"sha": "13b49598a818d23365daca79d44e26c22ba69f49",
					"message": "Add-nock-test",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 12:32:30 +0200"
				},
				{
					"sha": "709ae121e261b3bbf95f1d4af1d1e12dc61badb2",
					"message": "Add-immutable.js",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 25 Sep 2015 09:10:05 +0200"
				},
				{
					"sha": "a516ac5a4d5315f6d8427b0fb4e8b26b8381021a",
					"message": "Add-error-interceptors",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Tue, 22 Sep 2015 13:58:39 +0200"
				},
				{
					"sha": "93ff107faacf54f24125a21e9bc2d287cc29fffe",
					"message": "Fix-tests",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 21 Sep 2015 10:27:22 +0200"
				},
				{
					"sha": "9b56a5a736a79ec14d81e97c0f71b0d748d4299e",
					"message": "Update-build-process",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 20 Sep 2015 15:18:34 +0200"
				},
				{
					"sha": "be082f07c4471665b594dcc576a7512a4c131b8e",
					"message": "Move-fetch-and-request-to-peerDependencies",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 20 Sep 2015 14:04:02 +0200"
				},
				{
					"sha": "001ce237cf699a591ca325664beb75f7c63de7ca",
					"message": "Add-test-for-response-model",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 20 Sep 2015 13:34:15 +0200"
				},
				{
					"sha": "2b79bdfdcc6e30d33c9c7f075eaad4370807c18c",
					"message": "Add-tests-for-entity-model",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 20 Sep 2015 12:16:58 +0200"
				},
				{
					"sha": "3f34f8eec2c1c606cc1a3f7994eb866ff5279479",
					"message": "Code-review-by-brikou",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 20 Sep 2015 11:56:34 +0200"
				},
				{
					"sha": "840b813c348ab1cac01bb1f7bddaea2f9f05eaef",
					"message": "Rewrite-all-restful-for-better-future",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sat, 19 Sep 2015 14:40:16 +0200"
				},
				{
					"sha": "c55aa1d552ce492f7703533159323cfc44f592df",
					"message": "Merge-pull-request-37-from-bkotyik-master",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 21 Jul 2015 11:05:18 +0200"
				},
				{
					"sha": "9fb33a30c1166e7d8b9d98598c7759ec7b3f6ab9",
					"message": "fixed-readme",
					"author": {
						"name": "unknown",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Fri, 3 Jul 2015 16:45:01 +0200"
				},
				{
					"sha": "9f82e43140300dab71c9345d4bac8e3ead4ba07c",
					"message": "Coding-style-correction",
					"author": {
						"name": "unknown",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Fri, 3 Jul 2015 12:23:08 +0200"
				},
				{
					"sha": "ed442f67b754b69b6b01a10a8f141e2e4911a772",
					"message": "changed-the-order-of-the-parameters-in-delete-from-delete-header-data-to",
					"author": {
						"name": "unknown",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Fri, 3 Jul 2015 12:19:31 +0200"
				},
				{
					"sha": "45bcf61a5e1f43ae28536576601d526d85c32240",
					"message": "quick-revert-in-gitignore",
					"author": {
						"name": "Bálint Márton",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Wed, 1 Jul 2015 08:54:07 +0200"
				},
				{
					"sha": "33db08772ca710299bfe106e380718bfd75bd073",
					"message": "coding-style-corrections-and-minor-fixis-according-to-pull-request-review",
					"author": {
						"name": "Bálint Márton",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Wed, 1 Jul 2015 08:48:48 +0200"
				},
				{
					"sha": "a0483f6948ccf8ac4f452501abfd43c0d02c3437",
					"message": "reverted-gitignore",
					"author": {
						"name": "Bálint Márton",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Wed, 1 Jul 2015 08:37:51 +0200"
				},
				{
					"sha": "c0ed4cbb61fb7d41e06467496fac1923cf0f867f",
					"message": "modified-readme",
					"author": {
						"name": "Bálint Márton",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Tue, 30 Jun 2015 17:56:19 +0200"
				},
				{
					"sha": "207d90ae8823e0ea43f3223569df2b7cc591f7f1",
					"message": "Added-the-ability-to-pass-data-when-deleting-collection-or-single-item",
					"author": {
						"name": "Bálint Márton",
						"email": "96166@hszk.bme.hu"
					},
					"date": "Tue, 30 Jun 2015 17:55:29 +0200"
				},
				{
					"sha": "693f9138bcb7e5de944fb4c468bd388ad80d49fc",
					"message": "Merge-pull-request-32-from-marmelab-full_request_interceptor",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 17:20:58 +0200"
				},
				{
					"sha": "5afa628491b719456deffce8f0758769b123b388",
					"message": "Code-review",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 17:14:27 +0200"
				},
				{
					"sha": "5dad85ff7995bf346db6272163e71d71ff47c3e3",
					"message": "Fix-README",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 15:17:04 +0200"
				},
				{
					"sha": "20bb1eb96e7eef9e02e28a237dc88ab7c3be7fd6",
					"message": "Add-ability-to-intercept-method-config-and-add-doc",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 15:11:15 +0200"
				},
				{
					"sha": "489d75fd3cec58895123a01471980a5b0b9876e0",
					"message": "Update-built-file",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 12:13:43 +0200"
				},
				{
					"sha": "5f3680cb2220089ef58bd2ad677981253ebd5aa7",
					"message": "Fix-fullResponseInterceptor",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 11:18:26 +0200"
				},
				{
					"sha": "7a082d9e724552e2d6378e38d0c55eb655db7d9c",
					"message": "Handle-case-when-there-is-no-result-for-fullResponseInterceptor",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 15:55:07 +0200"
				},
				{
					"sha": "353b8b48ebe0840c4f8c6fbacbcd0ac984ae29bb",
					"message": "Remove-es6-syntax-from-test-spec",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 15:29:19 +0200"
				},
				{
					"sha": "c14d7c58720037533035bfbae040f818b1f09503",
					"message": "Update-dependencies-and-built-file",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 15:20:22 +0200"
				},
				{
					"sha": "b2b1690c9703fe59573f5b99fe77408875a78845",
					"message": "Add-fullResponseInterceptor-resource-possibility",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 25 Jun 2015 15:20:02 +0200"
				},
				{
					"sha": "5cbde584f632f5f3a231ecae387af4e8ebe9939a",
					"message": "Update-built-file",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 17:37:03 +0200"
				},
				{
					"sha": "5561f4c7ccc8cb6a37a6c0858a4757297c0a7b52",
					"message": "Implement-fullRequestInterceptors-to-be-able-to-alter-url-params-headers-and-or-data",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 16 Jun 2015 16:39:34 +0200"
				},
				{
					"sha": "0caf76b51d6f0832224a6845fefaf8731a689128",
					"message": "Merge-pull-request-36-from-marmelab-jshint",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 12:10:06 +0200"
				},
				{
					"sha": "a01e62d9f54558ecec7e815546e3bf7b164369a8",
					"message": "Add-JSHint-and-fix-minor-issues",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 11:41:38 +0200"
				},
				{
					"sha": "b91b2bee74d75ddddd47cb70c5fd8bd5f6253446",
					"message": "Update-version-number-for-next-release",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Fri, 26 Jun 2015 11:17:43 +0200"
				},
				{
					"sha": "091444b88b2a6019b918ffaf2e0ed2ae45e34bff",
					"message": "Merge-pull-request-26-from-marmelab-custom_url",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Sat, 30 May 2015 10:40:05 +0200"
				},
				{
					"sha": "ca156223a6d8af2dd39e28c6110db4d195c6388e",
					"message": "Allow-chainable-custom-URLs",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 26 May 2015 12:26:04 +0200"
				},
				{
					"sha": "d80c2dba75f3a6130f3dbcbea0983369ba500793",
					"message": "Update-README",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 26 May 2015 11:48:25 +0200"
				},
				{
					"sha": "cd107abac279d090f5e68a2ad9cc34f2947f4286",
					"message": "Update-built-file",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 26 May 2015 10:32:33 +0200"
				},
				{
					"sha": "660e86f6fa1772e4cb8cddec6762ca002f157987",
					"message": "Add-Restful.allUrl-and-Restful.oneUrl-methods-to-allow-custom-urls",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Tue, 26 May 2015 10:04:46 +0200"
				},
				{
					"sha": "be75cbe47a38655cd549752de91cccdef505f73a",
					"message": "Use-container-based-travis-infrastructure",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 28 May 2015 11:23:42 +0200"
				},
				{
					"sha": "5e8329d50485402574a9102f7d011ea4f0bc7217",
					"message": "Only-run-travis-build-on-push-for-master-branch",
					"author": {
						"name": "Jérôme Macias",
						"email": "jerome.macias@gmail.com"
					},
					"date": "Thu, 28 May 2015 10:04:31 +0200"
				},
				{
					"sha": "09cdf728e8fe59390e5c30dc56406441d233137f",
					"message": "Hotfix-about-assign-polyfill",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 29 Mar 2015 19:26:54 +0200"
				},
				{
					"sha": "403741a53bc66ccbd6c7fbdee0456e462fecb8a9",
					"message": "Update-version",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 29 Mar 2015 17:55:50 +0200"
				},
				{
					"sha": "9e174457a9ff78466c3a3dbc9638a736a3003c5d",
					"message": "Merge-pull-request-16-from-marmelab-fix_babel_polyfill",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 26 Mar 2015 16:43:36 +0100"
				},
				{
					"sha": "743851a2aef07f145cf3a8c641f08d9d32242f4e",
					"message": "Use-object-assign-ponyfill",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 25 Mar 2015 13:36:32 +0100"
				},
				{
					"sha": "ad51c26dcf71353c0a636ef34af5a81cbb2caaab",
					"message": "Fix-build-status",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Wed, 25 Mar 2015 09:25:52 +0100"
				},
				{
					"sha": "2f57c82e89fb35dac19a27418afff910c838418e",
					"message": "Merge-pull-request-14-from-marmelab-response_model",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Wed, 25 Mar 2015 09:24:29 +0100"
				},
				{
					"sha": "ae0063b1610ffa70f06b0800277cba8e4cd78757",
					"message": "Update-build-icon",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 23 Mar 2015 18:19:55 +0100"
				},
				{
					"sha": "99322f01452779a222651a3f3e2ab3030d2970b2",
					"message": "Update-README-and-add-response-for-every-request-type",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 20 Mar 2015 15:56:19 +0100"
				},
				{
					"sha": "5290082fc61fd4b429e9a668a91a0e91d236b711",
					"message": "Add-response-builder-to-resolve-or-reject-the-response-promise-depending-on-the-response-status-code",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 20 Mar 2015 15:27:17 +0100"
				},
				{
					"sha": "f05d9addc3f18dc9b879b1414d1b19b50ce3d1d0",
					"message": "Fix-existing-tests",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 20 Mar 2015 12:14:18 +0100"
				},
				{
					"sha": "762d0f59a7f9760245f926a3d62bdb85f0c5dad2",
					"message": "Add-response-model",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Fri, 20 Mar 2015 12:03:26 +0100"
				},
				{
					"sha": "35187598866e4d2661a9b567cfcf5c01d76ce918",
					"message": "Upgrade-version-in-bower-package.json",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 12 Mar 2015 14:52:18 +0100"
				},
				{
					"sha": "17527a61448851be211aeeed75f44bec4d84b1d2",
					"message": "Merge-pull-request-9-from-marmelab-resource_model_fix",
					"author": {
						"name": "Jonathan Petitcolas",
						"email": "petitcolas.jonathan@gmail.com"
					},
					"date": "Thu, 12 Mar 2015 13:37:06 +0100"
				},
				{
					"sha": "923261dc6056fa9a101b69a220cd45ef6851ff07",
					"message": "Merge-pull-request-6-from-NikolayGalkin-master",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Thu, 12 Mar 2015 13:32:20 +0100"
				},
				{
					"sha": "ec1087675ec331651e6e817f369b7854863b9d73",
					"message": "fixed-typo-in-readme",
					"author": {
						"name": "Nikolay Galkin",
						"email": "mr.galkin@gmail.com"
					},
					"date": "Wed, 11 Mar 2015 13:07:30 +0000"
				},
				{
					"sha": "65dc46ba993872d0a60bd4f027bc1bdccae47c2f",
					"message": "Fix-var-naming",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 11 Mar 2015 12:25:51 +0100"
				},
				{
					"sha": "b643711bc8839e3026ad29a71b2c9ce7df48a05d",
					"message": "Fix-issue-in-resource-model-chaining",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 11 Mar 2015 12:21:23 +0100"
				},
				{
					"sha": "b606d9564301a6d9efbb20ab4535d5e74e8a0bb9",
					"message": "Fixed-main-script",
					"author": {
						"name": "Nikolay Galkin",
						"email": "mr.galkin@gmail.com"
					},
					"date": "Wed, 11 Mar 2015 09:54:03 +0000"
				},
				{
					"sha": "0e33f7d252628b094ea4ed709bdc56b34cf4fe43",
					"message": "Merge-pull-request-5-from-marmelab-no_closure",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Tue, 10 Mar 2015 12:44:58 +0100"
				},
				{
					"sha": "9757235259baf004cfa97248a023d443e538b609",
					"message": "Switch-to-a-method-based-exploration-of-entities",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Tue, 10 Mar 2015 12:26:46 +0100"
				},
				{
					"sha": "2c71ac1bede97fd2ebf4686e22579034cc45ff42",
					"message": "Update-README.md",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Tue, 10 Mar 2015 09:33:12 +0100"
				},
				{
					"sha": "21b799e17a39d7b2a0595dc62f1550b77b4e8e69",
					"message": "Merge-pull-request-4-from-marmelab-readme_again",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Tue, 10 Mar 2015 09:24:09 +0100"
				},
				{
					"sha": "bc7d4bdbb6ef214cea1a2b9177a921c6c1fe70a4",
					"message": "Fix-minor-errors-in-the-readme",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Tue, 10 Mar 2015 09:23:28 +0100"
				},
				{
					"sha": "b3823ebf6d2a93793ed2575dfa023a3a041177bd",
					"message": "Use-more-consistent-naming-in-README",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 9 Mar 2015 18:36:45 +0100"
				},
				{
					"sha": "9549ca5935541a9c722f50ba84097bb4bf72c6c8",
					"message": "Update-package.json-version",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Mon, 9 Mar 2015 15:33:07 +0100"
				},
				{
					"sha": "62ba90a5203dee1c0313f0261923de6c5456f7a7",
					"message": "Update-bower.json-version",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Mon, 9 Mar 2015 15:32:48 +0100"
				},
				{
					"sha": "8b9f4139d6d7717863d616e92568a651236745c4",
					"message": "Add-method-and-url-in-interceptors",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Mon, 9 Mar 2015 12:03:22 +0100"
				},
				{
					"sha": "e30a0cfc292a4cc23f3455452446bc8ab55305a8",
					"message": "Add-headers-in-interceptors-and-update-README",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 8 Mar 2015 12:28:25 +0100"
				},
				{
					"sha": "b945bd44690bc6c2c211bd8bbc91c4be335d9de1",
					"message": "Update-README.md",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Sun, 8 Mar 2015 11:55:32 +0100"
				},
				{
					"sha": "9b39cc524e388963f1061259e3f8f35a19c24e40",
					"message": "Update-bower.json",
					"author": {
						"name": "Robin Bressan",
						"email": "robinbressan@users.noreply.github.com"
					},
					"date": "Sun, 8 Mar 2015 11:54:24 +0100"
				},
				{
					"sha": "e6f55766a51eef98d4f0eed9c8bb737c750b23c5",
					"message": "Fix-http-method-issue",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 5 Mar 2015 10:36:58 +0100"
				},
				{
					"sha": "74ce9fb26d41b00b574db6eb4aef5d7b4150e1a5",
					"message": "Merge-pull-request-3-from-marmelab-es6",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Thu, 5 Mar 2015 07:36:43 +0100"
				},
				{
					"sha": "d0f2e14ee8c2eeb8722579c9b96a4d7f57050c3b",
					"message": "Convert-to-es6-syntax",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 4 Mar 2015 22:30:45 +0100"
				},
				{
					"sha": "60f4c33628e66950135ffa39a5f6b2e2dfa88f57",
					"message": "Merge-pull-request-2-from-marmelab-endpoint_url",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Mon, 2 Mar 2015 00:01:12 +0100"
				},
				{
					"sha": "165cf50e47b8e86603b6d8fc1db900e06ad17c6c",
					"message": "Add-missing-comment",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 1 Mar 2015 20:36:40 +0100"
				},
				{
					"sha": "eb6703fbfe8fb900d6c7af02ab0dd2a78e09fa85",
					"message": "Move-url-computation-on-collection-member-level",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Sun, 1 Mar 2015 15:29:19 +0100"
				},
				{
					"sha": "2df0495ba97df97b9ae0263cf9300e918ac3dccc",
					"message": "Merge-pull-request-1-from-marmelab-basis",
					"author": {
						"name": "Francois Zaninotto",
						"email": "fzaninotto@gmail.com"
					},
					"date": "Fri, 27 Feb 2015 18:04:14 +0100"
				},
				{
					"sha": "646033c7a4d2cb944f9c5a28036e251c3fea7403",
					"message": "Fix-http-layer",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 26 Feb 2015 22:21:13 +0100"
				},
				{
					"sha": "8061901e4cd4bcceb617b0cf4d9918b7dcb95006",
					"message": "Add-shortcut-methods-on-resource-and-update-README",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 25 Feb 2015 12:27:25 +0100"
				},
				{
					"sha": "5f79fee62521ed2d1d0d52877e6113a528514bbf",
					"message": "Refactor-common-method-into-resource.js",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 25 Feb 2015 12:10:17 +0100"
				},
				{
					"sha": "f523cfb366384c104af632bc674ffd1c6afde862",
					"message": "Propagate-configuration-into-collection-member-chain",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 25 Feb 2015 11:58:29 +0100"
				},
				{
					"sha": "a5a24e4fd86b405cbc2e4396568e3a3c6340c8c6",
					"message": "Rethink-the-basis",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Tue, 24 Feb 2015 11:48:55 +0100"
				},
				{
					"sha": "fedb040ad2b5b6229cc59159ac73327d5f90f891",
					"message": "Fix-post",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 28 Jan 2015 14:04:54 +0100"
				},
				{
					"sha": "78b564bceb2805cb124ff92c3789dd020d88bcfa",
					"message": "Add-patch-and-head-method",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 22:31:24 +0100"
				},
				{
					"sha": "75606f20369cbda37cd45b95d7d9e96ae3966162",
					"message": "Fix-inheritance-pattern-and-update-tests",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 21:50:25 +0100"
				},
				{
					"sha": "1ec553701fff0c651c1b42c0d3e5f2bca0673774",
					"message": "Add-global-headers",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 20:41:35 +0100"
				},
				{
					"sha": "bf95699355367978a8919ad318f4c4dd36a29294",
					"message": "Make-methods-description-in-README-more-readable",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 20:23:08 +0100"
				},
				{
					"sha": "4e0c0716626cabcd9e73350235b5deea95cfe2a0",
					"message": "Update-README",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 19:58:30 +0100"
				},
				{
					"sha": "4262c0fe59db4591ede4602dc16fc6e2d767b8e5",
					"message": "Prefix-private-config-key",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 19:53:50 +0100"
				},
				{
					"sha": "727a3bd27098113e555e32d2c70803fbf339f1c9",
					"message": "Remove-useless-legacy-code",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 13:41:35 +0100"
				},
				{
					"sha": "39307cbe06f5a4f1cdf0e8ef36cc65b70543c49d",
					"message": "Add-try-catch-on-JSON.parse",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 13:39:55 +0100"
				},
				{
					"sha": "654e9d1bcd1e342a6ae7443fb0cad92e25fce032",
					"message": "Add-optionnal-args-in-methods-description",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 13:25:19 +0100"
				},
				{
					"sha": "412a71481f94e845cb1e920616136a9221b91c17",
					"message": "Update-watch-target",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 13:13:56 +0100"
				},
				{
					"sha": "ae145441f60e9475e19de37d44b4842260af7d08",
					"message": "Use-browserify",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 12:28:22 +0100"
				},
				{
					"sha": "2040299a8fe6c586a702382b50a63d7abb8fcff3",
					"message": "Rename-to-restful.js",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Thu, 22 Jan 2015 09:03:39 +0100"
				},
				{
					"sha": "eea59ff38abb348fd71ec4716250f21fc94edd0f",
					"message": "first-commit",
					"author": {
						"name": "Robin Bressan",
						"email": "robin@buddey.net"
					},
					"date": "Wed, 21 Jan 2015 14:07:20 +0100"
				}
			]
		}
	];

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=demo.js.map