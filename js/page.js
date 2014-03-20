Unison = function() {
    "use strict";
    var a = window;
    var b = document;
    var c = b.head;
    var d = {};
    var e = false;
    var f;
    var g = {
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
    var h = {
        on: function(a, b) {
            if (!g.isObject(d[a])) {
                d[a] = [];
            }
            d[a].push(b);
        },
        emit: function(a, b) {
            if (g.isObject(d[a])) {
                var c = d[a].slice();
                for (var e = 0; e < c.length; e++) {
                    c[e].call(this, b);
                }
            }
        }
    };
    var i = {
        all: function() {
            var a = {};
            var c = g.parseMQ(b.querySelector("title")).split(",");
            for (var d = 0; d < c.length; d++) {
                var f = c[d].trim().split(" ");
                a[f[0]] = f[1];
            }
            return e ? a : null;
        },
        now: function(a) {
            var b = g.parseMQ(c).split(" ");
            var d = {
                name: b[0],
                width: b[1]
            };
            return e ? g.isUndefined(a) ? d : a(d) : null;
        },
        update: function() {
            i.now(function(a) {
                if (a.name !== f) {
                    h.emit(a.name);
                    h.emit("change", a);
                    f = a.name;
                }
            });
        }
    };
    a.onresize = g.debounce(i.update, 100);
    b.addEventListener("DOMContentLoaded", function() {
        e = a.getComputedStyle(c, null).getPropertyValue("clear") !== "none";
        i.update();
    });
    return {
        fetch: {
            all: i.all,
            now: i.now
        },
        on: h.on,
        emit: h.emit,
        util: {
            debounce: g.debounce,
            isObject: g.isObject
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
    var f = Object.keys(e);
    var g = function(a) {
        var b = [].slice.call(a);
        for (var e = 0; e < b.length; e++) {
            var f = b[e].getAttribute(c);
            if (!Unison.util.isObject(d[f])) {
                d[f] = [];
            }
            d[f].push(b[e]);
        }
    };
    var h = function() {
        var a = f.indexOf(Unison.fetch.now().name) + 1;
        var b = f.slice(0, a);
        for (var c = 0; c < b.length; c++) {
            var e = d[b[c]];
            if (Unison.util.isObject(e)) {
                i(e);
            }
        }
    };
    var i = function(a) {
        for (var b = 0; b < a.length; b++) {
            if (a[b].getAttribute("title") !== "loaded") {
                var c = a[b];
                var d = c.getAttribute("id");
                var e = [].slice.call(a[b].childNodes);
                for (var f = 0; f < e.length; f++) {
                    if (e[f].nodeType === 8) {
                        var g = e[f];
                        c.insertAdjacentHTML("beforebegin", g.textContent);
                        c.setAttribute("title", "loaded");
                        c.parentElement.removeChild(c);
                        if (d !== null) {
                            Unison.emit(d);
                        }
                    }
                }
            }
        }
    };
    var j = function(a, b) {
        Unison.on(a, b);
    };
    b.addEventListener("DOMContentLoaded", function(a) {
        var d = g(b.querySelectorAll("[" + c + "]"));
        window.addEventListener("resize", Unison.util.debounce(h, 100));
        window.addEventListener("load", h);
    });
    return {
        loads: j
    };
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
            console.log("medium breakpoint");
        });
        Unison.on("usn-small", function() {
            console.log("small breakpoint");
        });
        Unison.on("usn-medium", function() {
            console.log("another medium function");
        });
        Unison.on("change", function(a) {
            console.log("breakpoint changed!");
            console.log(a);
        });
    });
}();