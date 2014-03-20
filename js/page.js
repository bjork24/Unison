Unison = function() {
    "use strict";
    var a = window;
    var b = document;
    var c = b.head;
    var d = {};
    var e = a.getComputedStyle(c, null).getPropertyValue("clear") !== "none";
    var f = {
        parseMQ: function(b) {
            var c = a.getComputedStyle(b, null).getPropertyValue("font-family");
            return c.replace(/"/g, "").replace(/'/g, "");
        },
        debounce: function(a, b, c) {
            var d;
            return function() {
                var e = this, f = arguments;
                clearTimeout(d);
                d = setTimeout(function() {
                    d = null;
                    if (!c) {
                        a.apply(e, f);
                    }
                }, b);
                if (c && !d) {
                    a.apply(e, f);
                }
            };
        },
        isObject: function(a) {
            return typeof a === "object";
        },
        isUndefined: function(a) {
            return typeof a === "undefined";
        }
    };
    var g = {
        on: function(a, b) {
            if (!f.isObject(d[a])) {
                d[a] = [];
            }
            d[a].push(b);
        },
        emit: function(a) {
            var b = [].slice.call(arguments, 1);
            if (f.isObject(d[a])) {
                d[a].slice().forEach(function(a) {
                    a.apply(this, b);
                });
            }
        }
    };
    var h = {
        all: function() {
            var a = {};
            var c = f.parseMQ(b.querySelector("title")).split(",");
            c.forEach(function(b) {
                var c = b.trim().split(" ");
                a[c[0]] = c[1];
            });
            return e ? a : null;
        },
        now: function(a) {
            var b = f.parseMQ(c).split(" ");
            var d = {
                name: b[0],
                width: b[1]
            };
            return e ? f.isUndefined(a) ? d : a(d) : null;
        }
    };
    a.onresize = f.debounce(function() {
        h.now(function(a) {
            g.emit(a.name);
        });
    }, 100);
    return {
        fetch: {
            all: h.all,
            now: h.now
        },
        on: g.on,
        emit: g.emit,
        util: {
            debounce: f.debounce,
            isObject: f.isObject
        }
    };
}();

Unison = Unison || {};

Unison.ConditionalLoad = function() {
    "use strict";
    var a = window;
    var b = document;
    var c = "data-usn-load-if";
    var d = {};
    var e = Unison.fetch.all();
    var f = function(a) {
        [].forEach.call(a, function(a) {
            var b = a.getAttribute(c);
            if (!Unison.util.isObject(d[b])) {
                d[b] = [];
            }
            d[b].push(a);
        });
    };
    var g = function() {
        var a = Object.keys(e);
        var b = a.indexOf(Unison.fetch.now().name) + 1;
        a.slice(0, b).forEach(function(a) {
            if (Unison.util.isObject(d[a])) {
                d[a].forEach(function(a) {
                    if (a.getAttribute("title") !== "loaded") {
                        h(a);
                    }
                });
            }
        });
    };
    var h = function(a) {
        [].forEach.call(a.childNodes, function(b) {
            if (b.nodeType === 8) {
                a.insertAdjacentHTML("beforebegin", b.textContent);
                a.setAttribute("title", "loaded");
                a.parentElement.removeChild(a);
            }
        });
    };
    b.addEventListener("DOMContentLoaded", function(a) {
        var d = f(b.querySelectorAll("[" + c + "]"));
        window.addEventListener("resize", Unison.util.debounce(g, 100));
        window.addEventListener("load", g);
    });
}();

var Unison = Unison || {};

Unison.Demo = function() {
    "use strict";
    var a = function(a) {
        var b = document.body;
        if (b.className === "") {
            b.className = "show-debug";
        } else {
            b.removeAttribute("class");
        }
        a.preventDefault();
    };
    document.addEventListener("DOMContentLoaded", function(b) {
        document.getElementById("js-toggle-info").addEventListener("click", a.bind());
        Unison.on("usn-medium", function() {
            console.log("medium");
        });
        Unison.on("usn-small", function() {
            console.log("small");
        });
        Unison.on("usn-medium", function() {
            console.log("another medium");
        });
    });
}();