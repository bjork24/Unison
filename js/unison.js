Unison = (function() {

  "use strict";

  // get breakpoint object
  var getBreakpoints = function(allBreakpoints) {
    var allBP, currentBP, usnBP = {}, i = 0, doc = document, head = doc.head, win = window;
    // check if css is passing breakpoints properly, if not return null for getBreakpoint()
    var unisonReady = ( win.getComputedStyle(head, null).getPropertyValue('clear') === 'none' ) ? false : true ;
    function cleanMQstr(el) {
      var str = win.getComputedStyle(el, null).getPropertyValue('font-family');
      return str.replace(/"/g, '').replace(/'/g, '');
    }
    currentBP = cleanMQstr(head).split(' ');
    allBP = cleanMQstr(doc.querySelector('title')).split(',');
    usnBP.currentBP = {
      name : currentBP[0],
      width : currentBP[1]
    };
    usnBP.allBP = {};
    for ( ; i < allBP.length; i++ ) {
      var mq = allBP[i].trim().split(' ');
      usnBP.allBP[mq[0]] = mq[1];
    }
    if ( unisonReady ) {
      return ( typeof allBreakpoints === 'boolean' ) ? usnBP.allBP : usnBP ;
    } else {
      return null;
    }
  };

  // return some stuff because people like to see stuff in the console
  return {
    getBreakpoints : getBreakpoints
  };

})();