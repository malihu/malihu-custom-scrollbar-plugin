(function () {
    'use strict';

    angular.module('malihu.scrollbar', []).directive('mhScrollbar', mhScrollbar);

    function mhScrollbar() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var conf = getConf(attrs);
                element.mCustomScrollbar(conf);
            }
        }
    }

    function getConf(attrs) {
        var confObj = {};

        for (var attr in attrs) {
            if (attr.indexOf('mcs') === 0)
            {
                var field = attr.charAt(3).toLowerCase() + attr.substring(4, attr.length);
                confObj[field] = (isNaN(attrs[attr])) ? attrs[attr] : parseInt(attrs[attr]);
            }
        }

        return confObj;
    }

})();