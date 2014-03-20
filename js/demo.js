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
    Unison.on('usn-medium', function() {
      console.log('medium breakpoint');
    });
    Unison.on('usn-small', function() {
      console.log('small breakpoint');
    });
    Unison.on('usn-medium', function() {
      console.log('another medium function');
    });
    Unison.on('change', function(bp) {
      console.log('breakpoint changed!');
      console.log(bp);
    });
  });

})();