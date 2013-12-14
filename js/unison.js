Unison = (function() {

  "use strict";

  // get breakpoint object
  var getBreakpoints = function(allBreakpoints) {
    var allBP, currentBP, usnBP = {}, i = 0;
    function cleanMQstr(el) {
      var str = window.getComputedStyle(el, null).getPropertyValue('font-family');
      return str.replace(/"/g, '').replace(/'/g, '');
    }
    currentBP = cleanMQstr(document.head).split(' ');
    allBP = cleanMQstr(document.querySelector('title')).split(',');
    usnBP.currentBP = {
      name : currentBP[0],
      width : currentBP[1]
    };
    usnBP.allBP = {};
    for ( ; i < allBP.length; i++ ) {
      var mq = allBP[i].trim().split(' ');
      usnBP.allBP[mq[0]] = mq[1];
    }
    return ( typeof allBreakpoints === 'boolean' ) ? usnBP.allBP : usnBP ;
  };

  // return some stuff because people like to see stuff in the console
  return {
    getBreakpoints : getBreakpoints
  };

})();