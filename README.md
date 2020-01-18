Unison.js
=========

*NOTE:* I'm looking for someone to take over maintaining this repo. See more [here](https://github.com/bjork24/Unison/issues/18).

Syncing named breakpoints across CSS, JS, and HTML.

Demo and more information [here](http://bjork24.github.io/Unison).

SASS Integration
================

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

LESS Integration
================

Declare breakpoints and specify names in `breakpoints.less`

```less
// declare breakpoints
@usn-x-small         : 200px;
@usn-small           : 400px;
@usn-small-medium    : 600px;
@usn-medium          : 800px;
@usn-large-medium    : 1000px;
@usn-large           : 1200px;
@usn-x-large         : 1400px;

// create list to pass media query data
// if a breakpoint name changes, remember to
// update it in the list below as well
@breakpoints: "usn-x-small @{usn-x-small}",
              "usn-small @{usn-small}",
              "usn-small-medium @{usn-small-medium}",
              "usn-medium @{usn-medium}",
              "usn-large-medium @{usn-large-medium}",
              "usn-large @{usn-large}",
              "usn-x-large @{usn-x-large}";

// you need to explicity tell LESS how many
// breakpoints you have
@number-of-breakpoints: 7;
```

Stylus Integration
==================

Declase breakpoints and specify names in `breakpoints.styl`

```styl
// declare breakpoints
$usn-x-small         = 200px
$usn-small           = 400px
$usn-small-medium    = 600px
$usn-medium          = 800px
$usn-large-medium    = 1000px
$usn-large           = 1200px
$usn-x-large         = 1400px

// create list to pass media query data
// if a breakpoint name changes, remember to
// update it in the list below as well
$mq-sync = usn-x-small        $usn-x-small,
           usn-small          $usn-small,
           usn-small-medium   $usn-small-medium,
           usn-medium         $usn-medium,
           usn-large-medium   $usn-large-medium,
           usn-large          $usn-large,
           usn-x-large        $usn-x-large
```

Manual Installation
===================

Include `unison.min.js` on your page:

`<script src="unison.min.js"></script>`

Verify everything is working by entering `Unison.fetch.all()` in the javascript 
console of your browser. If the CSS is not set up properly, or your page is 
missing the title tag, the returned value will be `null`.

Bower Installation
==================

If you're using Bower:

`bower install unison`

Then point to the script within the `bower_components` directory:

`<script src="bower_components/unison/js/unison.min.js"></script>`

The various preprocessor partials can be found in `bower_components/unison/css/`.

Unison Responsive Comments
==========================

Please view the [demo page](http://bjork24.github.io/Unison) to see how Responsive 
Comments conditional loading is implemented via Unison.

Version History
===============

**0.6.0** - Mar 20, 2014 - Added events and refactored conditional comments to not 
use matchMedia.

**0.5.1** - Jan 15, 2014 - Updated to include Bower integration.

**0.5.0** - Dec 29, 2013 - First release. Basic breakpoint syncing.

License
=======

The MIT License (MIT)

Copyright (c) 2014 Dan Chilton

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
