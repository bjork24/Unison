Unison = Unison || {};

Unison.ConditionalLoad = (function() {

  'use strict';

  var win = window;
  var doc = document;
  var trigger = 'data-usn-load-if';
  var nodeCache = {};
  var BPs;
  var BPnames;

  var cacheNodes = function(nodesArr) {
    var nodes = [].slice.call(nodesArr);
    for ( var i = 0; i < nodes.length; i++ ) {
      var bp = nodes[i].getAttribute(trigger);
      if ( !Unison.util.isObject(nodeCache[bp]) ) {
        nodeCache[bp] = [];
      }
      nodeCache[bp].push(nodes[i]);
    }
  };

  var testNodes = function() {
    var idx = BPnames.indexOf(Unison.fetch.now().name) + 1;
    var activeBPs = BPnames.slice(0, idx);
    for ( var i = 0; i < activeBPs.length; i++ ) {
      var nodes = nodeCache[activeBPs[i]];
      if ( Unison.util.isObject(nodes) ) {
        insertNode(nodes);
      }
    }
  };

  var insertNode = function(nodes) {
    for ( var i = 0; i < nodes.length; i++ ) {
      if ( nodes[i].getAttribute('title') !== 'loaded' ) {
        var parent = nodes[i];
        var parentId = parent.getAttribute('id');
        var node = [].slice.call(nodes[i].childNodes);
        for (var j = 0; j < node.length; j++) {
          if ( node[j].nodeType === 8 ) {
            var comment = node[j];
            parent.insertAdjacentHTML('beforebegin', comment.textContent);
            parent.setAttribute('title', 'loaded');
            parent.parentElement.removeChild(parent);
            if ( parentId !== null ) {
              Unison.emit(parentId);
            }
          }
        }
      }
    }
  };

  var loads = function(id, callback) {
    Unison.on(id, callback);
  };

  doc.addEventListener("DOMContentLoaded", function(event) {
    BPs = Unison.fetch.all();
    BPnames = Object.keys(BPs);
    var nodes = cacheNodes( doc.querySelectorAll('[' + trigger + ']') );
    window.addEventListener('resize', Unison.util.debounce(testNodes, 100));
    window.addEventListener('load', testNodes);
  });

  return {
    loads : loads
  };

})();