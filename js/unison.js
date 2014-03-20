Unison = (function() {

  'use strict';

  var win = window;
  var doc = document;
  var head = doc.head;
  var eventCache = {};
  var unisonReady = false;
  var currentBP;

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
    on : function(event, callback) {
      if ( !util.isObject(eventCache[event]) ) {
        eventCache[event] = [];
      }
      eventCache[event].push(callback);
    },
    emit : function(event, data) {
      if ( util.isObject(eventCache[event]) ) {
        var eventQ = eventCache[event].slice();
        for ( var i = 0; i < eventQ.length; i++ ) {
          eventQ[i].call(this, data);
        }
      }
    }
  };

  var breakpoints = {
    all : function() {
      var BPs = {};
      var allBP = util.parseMQ(doc.querySelector('title')).split(',');
      for ( var i = 0; i < allBP.length; i++ ) {
        var mq = allBP[i].trim().split(' ');
        BPs[mq[0]] = mq[1];
      }
      return ( unisonReady ) ? BPs : null ;
    },
    now : function(callback) {
      var nowBP = util.parseMQ(head).split(' ');
      var now = {
        name : nowBP[0],
        width : nowBP[1]
      };
      return ( unisonReady ) ? (( util.isUndefined(callback) ) ? now : callback(now)) : null ;
    },
    update : function() {
      breakpoints.now(function(bp) {
        if ( bp.name !== currentBP ) {
          events.emit(bp.name);
          events.emit('change', bp);
          currentBP = bp.name;
        }
      });
    }
  };

  win.onresize = util.debounce(breakpoints.update, 100);
  doc.addEventListener('DOMContentLoaded', function(){
    unisonReady = win.getComputedStyle(head, null).getPropertyValue('clear') !== 'none';
    breakpoints.update();
  });

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