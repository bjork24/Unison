Unison = (function() {

  "use strict";

  // attributes
  var usn = {
    trigger : 'data-poof-if',
    mqs : {},
    noMatchMediaSize : '800px'
  };

  // get breakpoint object
  var getBreakpoint = function(allBreakpoints) {
    var allMQ, currentMQ, poofMQ = {}, i = 0;
    function cleanMQstr(el) {
      var str = window.getComputedStyle(el, null).getPropertyValue('font-family');
      return str.replace(/"/g, '').replace(/'/g, '');
    }
    currentMQ = cleanMQstr(document.head).split(' ');
    allMQ = cleanMQstr(document.querySelector('title')).split(', ');
    poofMQ.currentMQ = {
      name : currentMQ[0],
      width : currentMQ[1]
    };
    poofMQ.allMQ = {};
    for ( ; i < allMQ.length; i++ ) {
      var mq = allMQ[i].split(' ');
      poofMQ.allMQ[mq[0]] = mq[1];
    }
    return (typeof allBreakpoints === 'boolean') ? poofMQ.allMQ : poofMQ ;
  };

  // cache responsive comments nodes and breakpoint data
  var cacheNodes = function(nodes) {
    var l = nodes.length, mqs = [], el, obj, i = 0;
    for( ; i < l; i++ ) {
      el = nodes[i];
      obj = {
        'element' : el,
        'breakpoint' :  el.getAttribute(usn.trigger)
      };
      mqs.push(obj);
    }
    usn.mqs = getBreakpoint(true);
    return mqs;
  };

  // test nodes against named breakpoints
  var testNodes = function() {
    this.forEach(function(node) {
      var mediaMatch = ( !window.matchMedia ) ? noMatchMediaSize : usn.mqs[node.breakpoint] ;
      if( window.matchMedia('(min-width: ' + mediaMatch + ')').matches && node.element.getAttribute('title') !== 'loaded' ) {
        insertNode.apply(node);
        return;
      }
    });
    return;
  };

  // loop round child nodes, find commented content
  var insertNode = function() {
    var l = this.element.childNodes.length, i = 0;
    for( ; i < l; i++ ) {
      if(this.element.childNodes[i].nodeType === 8) {
        this.element.insertAdjacentHTML('beforebegin', this.element.childNodes[i].textContent);
        dispatchEvent.apply(this);
        this.element.setAttribute('title', 'loaded');
        this.element.parentElement.removeChild(this.element);
      }
    }
  };

  // dispatch CustomEvent if supported with media query and insert type detail
  var dispatchEvent = function() {
    var ev;
    if ( typeof CustomEvent === 'function' ) {
      ev = new CustomEvent('poofResponse', { detail : {} });
    } else if( document.createEvent ) {
      ev = document.createEvent('Event');
      ev.initEvent('poofResponse', true, true);
    } else {
      return false;
    }
    this.element.dispatchEvent(ev);
  };

  // debounce function from underscore for resize
  var debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if ( last < wait ) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if ( !immediate ) {
            result = func.apply(context, args);
          }
        }
      };
      var callNow = immediate && !timeout;
      if ( !timeout ) {
        timeout = setTimeout(later, wait);
      }
      if ( callNow ) {
        result = func.apply(context, args);
      }
      return result;
    };
  };

  // initiate when DOM ready
  document.addEventListener("DOMContentLoaded", function(event) {
    var nodes = cacheNodes( document.querySelectorAll('[' + usn.trigger + ']') );
    window.addEventListener('resize', function() {
      debounce(testNodes.bind(nodes), 250)();
    });
    window.addEventListener('load', function() {
      testNodes.bind(nodes)();
    });
  });

  // return some stuff because people like to see stuff in the console
  return {
    getBreakpoint : getBreakpoint
  };

})();