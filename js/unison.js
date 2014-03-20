Unison = (function() {

  'use strict';

  var win = window;
  var doc = document;
  var head = doc.head;
  var eventCache = {};
  var unisonReady = win.getComputedStyle(head, null).getPropertyValue('clear') !== 'none';

  var util = {
    parseMQ : function(el) {
      var str = win.getComputedStyle(el, null).getPropertyValue('font-family');
      return str.replace(/"/g, '').replace(/'/g, '');
    },
    debounce : function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        }, wait);
        if (immediate && !timeout) {
          func.apply(context, args);
        }
      };
    },
    isObject : function(e) { return typeof e === 'object'; },
    isUndefined : function(e) { return typeof e === 'undefined'; }
  };

  var events = {
    on : function(bp, callback) {
      if ( !util.isObject(eventCache[bp]) ) {
        eventCache[bp] = [];
      }
      eventCache[bp].push(callback);
    },
    emit : function(bp) {
      var args = [].slice.call(arguments, 1);
      if ( util.isObject(eventCache[bp]) ) {
        eventCache[bp].slice().forEach(function(listener){
          listener.apply(this, args);
        });
      }
    }
  };

  var breakpoints = {
    all : function() {
      var BPs = {};
      var allBP = util.parseMQ(doc.querySelector('title')).split(',');
      allBP.forEach(function(bp) {
        var mq = bp.trim().split(' ');
        BPs[mq[0]] = mq[1];
      });
      return ( unisonReady ) ? BPs : null ;
    },
    now : function(callback) {
      var nowBP = util.parseMQ(head).split(' ');
      var now = {
        name : nowBP[0],
        width : nowBP[1]
      };
      return ( unisonReady ) ? (( util.isUndefined(callback) ) ? now : callback(now)) : null ;
    }
  };

  win.onresize = util.debounce(function() {
    breakpoints.now(function(bp){
      events.emit(bp.name);
    });
  }, 100);

  return {
    fetch : {
      all : breakpoints.all,
      now : breakpoints.now
    },
    on : events.on,
    emit : events.emit,
    util : {
      debounce : util.debounce,
      isObject : util.isObject
    }
  };

})();