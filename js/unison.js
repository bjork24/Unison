Unison = (function() {

  "use strict";

  // get breakpoint object
  var getBreakpoint = function(allBreakpoints) {
    var allMQ, currentMQ, usnMQ = {}, i = 0;
    function cleanMQstr(el) {
      var str = window.getComputedStyle(el, null).getPropertyValue('font-family');
      return str.replace(/"/g, '').replace(/'/g, '');
    }
    currentMQ = cleanMQstr(document.head).split(' ');
    allMQ = cleanMQstr(document.querySelector('title')).split(',');
    usnMQ.currentMQ = {
      name : currentMQ[0],
      width : currentMQ[1]
    };
    usnMQ.allMQ = {};
    for ( ; i < allMQ.length; i++ ) {
      var mq = allMQ[i].trim().split(' ');
      usnMQ.allMQ[mq[0]] = mq[1];
    }
    return ( typeof allBreakpoints === 'boolean' ) ? usnMQ.allMQ : usnMQ ;
  };

  // return some stuff because people like to see stuff in the console
  return {
    getBreakpoint : getBreakpoint
  };

})();