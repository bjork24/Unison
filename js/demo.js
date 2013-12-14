var Unison = Unison || {};

Unison.Demo = (function() {

  'use strict';

  var toggleInfo = function(e) {
    var body = document.body;
    if ( body.className === '' ) {
      body.className = 'show-debug';
    } else {
      body.removeAttribute('class');
    }
    e.preventDefault();
  };

  document.addEventListener('DOMContentLoaded', function(event) {
    document.getElementById('js-toggle-info').addEventListener('click', toggleInfo.bind());
  });

})();