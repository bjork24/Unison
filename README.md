Unison.js
=========

Syncing named breakpoints across CSS, JS, and HTML.

Demo and more information [here](http://bjork24.github.io/Unison).

Installation
============

Declare breakpoints and specify names in `_breakpoints.scss`

```scss
// declare breakpoints
$usn-x-small         : 200px;
$usn-small           : 400px;
$usn-small-medium    : 600px;
$usn-medium          : 800px;
$usn-large-medium    : 1000px;
$usn-large           : 1200px;
$usn-x-large         : 1400px;

// create sass list to pass media query data
// if a breakpoint name changes, remember to
// update it in the list below as well
$mq-sync:
  usn-x-small        $usn-x-small,
  usn-small          $usn-small,
  usn-small-medium   $usn-small-medium,
  usn-medium         $usn-medium,
  usn-large-medium   $usn-large-medium,
  usn-large          $usn-large,
  usn-x-large        $usn-x-large
;
```

Include `unison.min.js` on your page:

`<script src="unison.min.js"></script>`

Verify everything is working by entering `Unison.getBreakpoints()` in the javascript console of your browser.

Unison Responsive Comments
==========================

Please view the [demo page](http://bjork24.github.io/Unison) to see how Responsive Comments conditional loading is implimented via Unison.

License
=======

The MIT License (MIT)

Copyright (c) 2013 Dan Chilton

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
