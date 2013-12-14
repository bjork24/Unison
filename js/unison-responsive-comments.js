Unison = Unison || {};

Unison.ConditionalLoad = (function() {

  "use strict";

  // config attributes
  var usnCL = {
    trigger : 'data-usn-load-if',
    breakpoints : {},
    noMatchMediaSize : '800px'
  };

  // cache responsive comments nodes and breakpoint data
  var cacheNodes = function(nodes) {
    var l = nodes.length, breakpoints = [], el, obj, i = 0;
    for( ; i < l; i++ ) {
      el = nodes[i];
      obj = {
        'element' : el,
        'breakpoint' :  el.getAttribute(usnCL.trigger)
      };
      breakpoints.push(obj);
    }
    usnCL.breakpoints = Unison.getBreakpoints().allBP;
    return breakpoints;
  };

  // test nodes against named breakpoints
  var testNodes = function() {
    this.forEach(function(node) {
      var mediaMatch = ( !window.matchMedia ) ? noMatchMediaSize : usnCL.breakpoints[node.breakpoint] ;
      if( window.matchMedia('(min-width: ' + mediaMatch + ')').matches && node.element.getAttribute('title') !== 'loaded' ) {
        insertNode.apply(node);
        return;
      }
    });
    return;
  };

  // loop through nodes and insert comment elements
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

  // dispatch custom events (needs some work)
  var dispatchEvent = function() {
    var ev;
    if ( typeof CustomEvent === 'function' ) {
      ev = new CustomEvent('unisonResponse', { detail : {} });
    } else if( document.createEvent ) {
      ev = document.createEvent('Event');
      ev.initEvent('unisonResponse', true, true);
    } else {
      return false;
    }
    this.element.dispatchEvent(ev);
  };

  // _.debounce function for resize
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
    var nodes = cacheNodes( document.querySelectorAll('[' + usnCL.trigger + ']') );
    window.addEventListener('resize', debounce(testNodes.bind(nodes), 250));
    window.addEventListener('load', testNodes.bind(nodes));
  });

})();