(function () {
    'use strict';

    angular.module('malihu.scrollbar', []).directive('mhScrollbar', mhScrollbar);

    function mhScrollbar() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var conf = getConf(attrs, scope);
                element.mCustomScrollbar(conf);
            }
        }
    }

	function getConf(attrs, scope) {
		var confObj = {};

		for (var attr in attrs) {
			if (attr.indexOf('mcs') === 0)
			{
				var field = attr.charAt(3).toLowerCase() + attr.substring(4, attr.length);
				confObj[field] = convert(attrs[attr], scope);
			}
		}

		return confObj;
	}

	function convert(input, scope) {
		if (input === undefined || input === null)
			return null;

		//numbers, booleans
		var primary = primaryData(input, scope);
		if (primary !== null)
			return primary;

		//Object Json
		var parsed = null;
		try {
			var parser = JSON.parse;
			if (jQuery.parseJSON)
			    parser = jQuery.parseJSON;

			parsed = parser(input);
			return primaryData(parsed, scope);
		} catch (e) {
			//String
			return input;
		}        
	}

	function primaryData(input, scope) {
		//Number
		var temp = Number(input);
		if (!isNaN(temp)) {
			return temp;
		}

		//Boolean
		if (input === "true" || input === "false") {
			if (input === "true")
				return true;
			else
				return false;
		}

		//Object
		if (angular.isObject(input) && !angular.isDate(input) && !angular.isArray(input)) {
			for (var field in input) {
				var data = primaryData(input[field], scope);
				input[field] = (data !== null) ? data : parseFunctions(input[field], scope);
				return input;
			}
		}

		return null;
	}

	function parseFunctions(input,scope)
	{
		//Function - has the ()
		if (input.indexOf("()") > 0) {
			var splitted = input.split(".");
			var parsedFunc = scope;

			for (var i = 0, length = splitted.length; i < length-1; i++) {
				parsedFunc = parsedFunc[splitted[i]];
			}

			var last = splitted[splitted.length - 1].substring(0, splitted[splitted.length - 1].length - 2);

			return parsedFunc[last];
		}

		return null;
	}

})();