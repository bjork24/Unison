Unison = Unison || {};

Unison.ConditionalLoad = (function() {

  'use strict';

  var win = window;
  var doc = document;
  var trigger = 'data-usn-load-if';
  var nodeCache = {};
  var BPs = Unison.fetch.all();

  var cacheNodes = function(nodes) {
    [].forEach.call(nodes, function(el) {
      var bp = el.getAttribute(trigger);
      if ( !Unison.util.isObject(nodeCache[bp]) ) {
        nodeCache[bp] = [];
      }
      nodeCache[bp].push(el);
    });
  };

  var testNodes = function() {
    var breakpoints = Object.keys(BPs);
    var idx = breakpoints.indexOf(Unison.fetch.now().name) + 1;
    breakpoints.slice(0, idx).forEach(function(bp){
      if ( Unison.util.isObject(nodeCache[bp]) ) {
        nodeCache[bp].forEach(function(node) {
          if ( node.getAttribute('title') !== 'loaded' ) {
            insertNode(node);
          }
        });
      }
    });
  };

  var insertNode = function(nodeParent) {
    [].forEach.call(nodeParent.childNodes, function(node) {
      if(node.nodeType === 8) {
        nodeParent.insertAdjacentHTML('beforebegin', node.textContent);
        nodeParent.setAttribute('title', 'loaded');
        nodeParent.parentElement.removeChild(nodeParent);
      }
    });
  };

  doc.addEventListener("DOMContentLoaded", function(event) {
    var nodes = cacheNodes( doc.querySelectorAll('[' + trigger + ']') );
    window.addEventListener('resize', Unison.util.debounce(testNodes, 100));
    window.addEventListener('load', testNodes);
  });

})();