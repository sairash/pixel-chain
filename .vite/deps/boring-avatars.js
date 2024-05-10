import {
  require_react
} from "./chunk-PMYDY72F.js";
import {
  __commonJS
} from "./chunk-ZS7NZCD4.js";

// node_modules/boring-avatars/build/index.js
var require_build = __commonJS({
  "node_modules/boring-avatars/build/index.js"(exports, module) {
    !function(e, t) {
      if ("object" === typeof exports && "object" === typeof module)
        module.exports = t(require_react());
      else if ("function" === typeof define && define.amd)
        define(["react"], t);
      else {
        var r = "object" === typeof exports ? t(require_react()) : t(e.react);
        for (var l in r)
          ("object" === typeof exports ? exports : e)[l] = r[l];
      }
    }(exports, function(e) {
      return function(e2) {
        var t = {};
        function r(l) {
          if (t[l])
            return t[l].exports;
          var i = t[l] = { i: l, l: false, exports: {} };
          return e2[l].call(i.exports, i, i.exports, r), i.l = true, i.exports;
        }
        return r.m = e2, r.c = t, r.d = function(e3, t2, l) {
          r.o(e3, t2) || Object.defineProperty(e3, t2, { enumerable: true, get: l });
        }, r.r = function(e3) {
          "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
        }, r.t = function(e3, t2) {
          if (1 & t2 && (e3 = r(e3)), 8 & t2)
            return e3;
          if (4 & t2 && "object" === typeof e3 && e3 && e3.__esModule)
            return e3;
          var l = /* @__PURE__ */ Object.create(null);
          if (r.r(l), Object.defineProperty(l, "default", { enumerable: true, value: e3 }), 2 & t2 && "string" != typeof e3)
            for (var i in e3)
              r.d(l, i, (function(t3) {
                return e3[t3];
              }).bind(null, i));
          return l;
        }, r.n = function(e3) {
          var t2 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return r.d(t2, "a", t2), t2;
        }, r.o = function(e3, t2) {
          return Object.prototype.hasOwnProperty.call(e3, t2);
        }, r.p = "/", r(r.s = 1);
      }([function(t, r) {
        t.exports = e;
      }, function(e2, t, r) {
        e2.exports = r(2);
      }, function(e2, t, r) {
        "use strict";
        function l(e3, t2, r2) {
          return t2 in e3 ? Object.defineProperty(e3, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e3[t2] = r2, e3;
        }
        function i(e3, t2) {
          var r2 = Object.keys(e3);
          if (Object.getOwnPropertySymbols) {
            var l2 = Object.getOwnPropertySymbols(e3);
            t2 && (l2 = l2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
            })), r2.push.apply(r2, l2);
          }
          return r2;
        }
        function a(e3, t2) {
          if (null == e3)
            return {};
          var r2, l2, i2 = function(e4, t3) {
            if (null == e4)
              return {};
            var r3, l3, i3 = {}, a3 = Object.keys(e4);
            for (l3 = 0; l3 < a3.length; l3++)
              r3 = a3[l3], t3.indexOf(r3) >= 0 || (i3[r3] = e4[r3]);
            return i3;
          }(e3, t2);
          if (Object.getOwnPropertySymbols) {
            var a2 = Object.getOwnPropertySymbols(e3);
            for (l2 = 0; l2 < a2.length; l2++)
              r2 = a2[l2], t2.indexOf(r2) >= 0 || Object.prototype.propertyIsEnumerable.call(e3, r2) && (i2[r2] = e3[r2]);
          }
          return i2;
        }
        r.r(t);
        var n = r(0), c = r.n(n), h = function(e3) {
          for (var t2 = 0, r2 = 0; r2 < e3.length; r2++) {
            t2 = (t2 << 5) - t2 + e3.charCodeAt(r2), t2 &= t2;
          }
          return Math.abs(t2);
        }, o = function(e3, t2) {
          return Math.floor(e3 / Math.pow(10, t2) % 10);
        }, s = function(e3, t2) {
          return !(o(e3, t2) % 2);
        }, f = function(e3, t2, r2) {
          var l2 = e3 % t2;
          return r2 && o(e3, r2) % 2 === 0 ? -l2 : l2;
        }, m = function(e3, t2, r2) {
          return t2[e3 % r2];
        };
        var u = function(e3) {
          var t2 = function(e4, t3) {
            var r3 = h(e4), l2 = t3 && t3.length;
            return Array.from({ length: 4 }, function(e5, i2) {
              return { color: m(r3 + i2, t3, l2), translateX: f(r3 * (i2 + 1), 40 - (i2 + 17), 1), translateY: f(r3 * (i2 + 1), 40 - (i2 + 17), 2), rotate: f(r3 * (i2 + 1), 360), isSquare: s(r3, 2) };
            });
          }(e3.name, e3.colors), r2 = n.useId();
          return n.createElement("svg", { viewBox: "0 0 80 80", fill: "none", role: "img", xmlns: "http://www.w3.org/2000/svg", width: e3.size, height: e3.size }, e3.title && n.createElement("title", null, e3.name), n.createElement("mask", { id: r2, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 80, height: 80 }, n.createElement("rect", { width: 80, height: 80, rx: e3.square ? void 0 : 160, fill: "#FFFFFF" })), n.createElement("g", { mask: "url(#".concat(r2, ")") }, n.createElement("rect", { width: 80, height: 80, fill: t2[0].color }), n.createElement("rect", { x: 10, y: 30, width: 80, height: t2[1].isSquare ? 80 : 10, fill: t2[1].color, transform: "translate(" + t2[1].translateX + " " + t2[1].translateY + ") rotate(" + t2[1].rotate + " 40 40)" }), n.createElement("circle", { cx: 40, cy: 40, fill: t2[2].color, r: 16, transform: "translate(" + t2[2].translateX + " " + t2[2].translateY + ")" }), n.createElement("line", { x1: 0, y1: 40, x2: 80, y2: 40, strokeWidth: 2, stroke: t2[3].color, transform: "translate(" + t2[3].translateX + " " + t2[3].translateY + ") rotate(" + t2[3].rotate + " 40 40)" })));
        };
        var d = function(e3) {
          var t2 = function(e4, t3) {
            var r3 = h(t3), l2 = e4 && e4.length, i2 = Array.from({ length: 5 }, function(t4, i3) {
              return m(r3 + i3, e4, l2);
            }), a2 = [];
            return a2[0] = i2[0], a2[1] = i2[1], a2[2] = i2[1], a2[3] = i2[2], a2[4] = i2[2], a2[5] = i2[3], a2[6] = i2[3], a2[7] = i2[0], a2[8] = i2[4], a2;
          }(e3.colors, e3.name), r2 = c.a.useId();
          return c.a.createElement("svg", { viewBox: "0 0 90 90", fill: "none", role: "img", xmlns: "http://www.w3.org/2000/svg", width: e3.size, height: e3.size }, e3.title && c.a.createElement("title", null, e3.name), c.a.createElement("mask", { id: r2, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 90, height: 90 }, c.a.createElement("rect", { width: 90, height: 90, rx: e3.square ? void 0 : 180, fill: "#FFFFFF" })), c.a.createElement("g", { mask: "url(#".concat(r2, ")") }, c.a.createElement("path", { d: "M0 0h90v45H0z", fill: t2[0] }), c.a.createElement("path", { d: "M0 45h90v45H0z", fill: t2[1] }), c.a.createElement("path", { d: "M83 45a38 38 0 00-76 0h76z", fill: t2[2] }), c.a.createElement("path", { d: "M83 45a38 38 0 01-76 0h76z", fill: t2[3] }), c.a.createElement("path", { d: "M77 45a32 32 0 10-64 0h64z", fill: t2[4] }), c.a.createElement("path", { d: "M77 45a32 32 0 11-64 0h64z", fill: t2[5] }), c.a.createElement("path", { d: "M71 45a26 26 0 00-52 0h52z", fill: t2[6] }), c.a.createElement("path", { d: "M71 45a26 26 0 01-52 0h52z", fill: t2[7] }), c.a.createElement("circle", { cx: 45, cy: 45, r: 23, fill: t2[8] })));
        };
        var g = function(e3) {
          var t2 = function(e4, t3) {
            var r3 = h(e4), l2 = t3 && t3.length;
            return Array.from({ length: 64 }, function(e5, i2) {
              return m(r3 % (i2 + 1), t3, l2);
            });
          }(e3.name, e3.colors), r2 = n.useId();
          return n.createElement("svg", { viewBox: "0 0 80 80", fill: "none", role: "img", xmlns: "http://www.w3.org/2000/svg", width: e3.size, height: e3.size }, e3.title && n.createElement("title", null, e3.name), n.createElement("mask", { id: r2, "mask-type": "alpha", maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 80, height: 80 }, n.createElement("rect", { width: 80, height: 80, rx: e3.square ? void 0 : 160, fill: "#FFFFFF" })), n.createElement("g", { mask: "url(#".concat(r2, ")") }, n.createElement("rect", { width: 10, height: 10, fill: t2[0] }), n.createElement("rect", { x: 20, width: 10, height: 10, fill: t2[1] }), n.createElement("rect", { x: 40, width: 10, height: 10, fill: t2[2] }), n.createElement("rect", { x: 60, width: 10, height: 10, fill: t2[3] }), n.createElement("rect", { x: 10, width: 10, height: 10, fill: t2[4] }), n.createElement("rect", { x: 30, width: 10, height: 10, fill: t2[5] }), n.createElement("rect", { x: 50, width: 10, height: 10, fill: t2[6] }), n.createElement("rect", { x: 70, width: 10, height: 10, fill: t2[7] }), n.createElement("rect", { y: 10, width: 10, height: 10, fill: t2[8] }), n.createElement("rect", { y: 20, width: 10, height: 10, fill: t2[9] }), n.createElement("rect", { y: 30, width: 10, height: 10, fill: t2[10] }), n.createElement("rect", { y: 40, width: 10, height: 10, fill: t2[11] }), n.createElement("rect", { y: 50, width: 10, height: 10, fill: t2[12] }), n.createElement("rect", { y: 60, width: 10, height: 10, fill: t2[13] }), n.createElement("rect", { y: 70, width: 10, height: 10, fill: t2[14] }), n.createElement("rect", { x: 20, y: 10, width: 10, height: 10, fill: t2[15] }), n.createElement("rect", { x: 20, y: 20, width: 10, height: 10, fill: t2[16] }), n.createElement("rect", { x: 20, y: 30, width: 10, height: 10, fill: t2[17] }), n.createElement("rect", { x: 20, y: 40, width: 10, height: 10, fill: t2[18] }), n.createElement("rect", { x: 20, y: 50, width: 10, height: 10, fill: t2[19] }), n.createElement("rect", { x: 20, y: 60, width: 10, height: 10, fill: t2[20] }), n.createElement("rect", { x: 20, y: 70, width: 10, height: 10, fill: t2[21] }), n.createElement("rect", { x: 40, y: 10, width: 10, height: 10, fill: t2[22] }), n.createElement("rect", { x: 40, y: 20, width: 10, height: 10, fill: t2[23] }), n.createElement("rect", { x: 40, y: 30, width: 10, height: 10, fill: t2[24] }), n.createElement("rect", { x: 40, y: 40, width: 10, height: 10, fill: t2[25] }), n.createElement("rect", { x: 40, y: 50, width: 10, height: 10, fill: t2[26] }), n.createElement("rect", { x: 40, y: 60, width: 10, height: 10, fill: t2[27] }), n.createElement("rect", { x: 40, y: 70, width: 10, height: 10, fill: t2[28] }), n.createElement("rect", { x: 60, y: 10, width: 10, height: 10, fill: t2[29] }), n.createElement("rect", { x: 60, y: 20, width: 10, height: 10, fill: t2[30] }), n.createElement("rect", { x: 60, y: 30, width: 10, height: 10, fill: t2[31] }), n.createElement("rect", { x: 60, y: 40, width: 10, height: 10, fill: t2[32] }), n.createElement("rect", { x: 60, y: 50, width: 10, height: 10, fill: t2[33] }), n.createElement("rect", { x: 60, y: 60, width: 10, height: 10, fill: t2[34] }), n.createElement("rect", { x: 60, y: 70, width: 10, height: 10, fill: t2[35] }), n.createElement("rect", { x: 10, y: 10, width: 10, height: 10, fill: t2[36] }), n.createElement("rect", { x: 10, y: 20, width: 10, height: 10, fill: t2[37] }), n.createElement("rect", { x: 10, y: 30, width: 10, height: 10, fill: t2[38] }), n.createElement("rect", { x: 10, y: 40, width: 10, height: 10, fill: t2[39] }), n.createElement("rect", { x: 10, y: 50, width: 10, height: 10, fill: t2[40] }), n.createElement("rect", { x: 10, y: 60, width: 10, height: 10, fill: t2[41] }), n.createElement("rect", { x: 10, y: 70, width: 10, height: 10, fill: t2[42] }), n.createElement("rect", { x: 30, y: 10, width: 10, height: 10, fill: t2[43] }), n.createElement("rect", { x: 30, y: 20, width: 10, height: 10, fill: t2[44] }), n.createElement("rect", { x: 30, y: 30, width: 10, height: 10, fill: t2[45] }), n.createElement("rect", { x: 30, y: 40, width: 10, height: 10, fill: t2[46] }), n.createElement("rect", { x: 30, y: 50, width: 10, height: 10, fill: t2[47] }), n.createElement("rect", { x: 30, y: 60, width: 10, height: 10, fill: t2[48] }), n.createElement("rect", { x: 30, y: 70, width: 10, height: 10, fill: t2[49] }), n.createElement("rect", { x: 50, y: 10, width: 10, height: 10, fill: t2[50] }), n.createElement("rect", { x: 50, y: 20, width: 10, height: 10, fill: t2[51] }), n.createElement("rect", { x: 50, y: 30, width: 10, height: 10, fill: t2[52] }), n.createElement("rect", { x: 50, y: 40, width: 10, height: 10, fill: t2[53] }), n.createElement("rect", { x: 50, y: 50, width: 10, height: 10, fill: t2[54] }), n.createElement("rect", { x: 50, y: 60, width: 10, height: 10, fill: t2[55] }), n.createElement("rect", { x: 50, y: 70, width: 10, height: 10, fill: t2[56] }), n.createElement("rect", { x: 70, y: 10, width: 10, height: 10, fill: t2[57] }), n.createElement("rect", { x: 70, y: 20, width: 10, height: 10, fill: t2[58] }), n.createElement("rect", { x: 70, y: 30, width: 10, height: 10, fill: t2[59] }), n.createElement("rect", { x: 70, y: 40, width: 10, height: 10, fill: t2[60] }), n.createElement("rect", { x: 70, y: 50, width: 10, height: 10, fill: t2[61] }), n.createElement("rect", { x: 70, y: 60, width: 10, height: 10, fill: t2[62] }), n.createElement("rect", { x: 70, y: 70, width: 10, height: 10, fill: t2[63] })));
        };
        var w = function(e3) {
          var t2 = function(e4, t3) {
            var r3, l2 = h(e4), i2 = t3 && t3.length, a2 = m(l2, t3, i2), n2 = f(l2, 10, 1), c2 = n2 < 5 ? n2 + 4 : n2, o2 = f(l2, 10, 2), u2 = o2 < 5 ? o2 + 4 : o2;
            return { wrapperColor: a2, faceColor: (r3 = a2, "#" === r3.slice(0, 1) && (r3 = r3.slice(1)), (299 * parseInt(r3.substr(0, 2), 16) + 587 * parseInt(r3.substr(2, 2), 16) + 114 * parseInt(r3.substr(4, 2), 16)) / 1e3 >= 128 ? "#000000" : "#FFFFFF"), backgroundColor: m(l2 + 13, t3, i2), wrapperTranslateX: c2, wrapperTranslateY: u2, wrapperRotate: f(l2, 360), wrapperScale: 1 + f(l2, 3) / 10, isMouthOpen: s(l2, 2), isCircle: s(l2, 1), eyeSpread: f(l2, 5), mouthSpread: f(l2, 3), faceRotate: f(l2, 10, 3), faceTranslateX: c2 > 6 ? c2 / 2 : f(l2, 8, 1), faceTranslateY: u2 > 6 ? u2 / 2 : f(l2, 7, 2) };
          }(e3.name, e3.colors), r2 = n.useId();
          return n.createElement("svg", { viewBox: "0 0 36 36", fill: "none", role: "img", xmlns: "http://www.w3.org/2000/svg", width: e3.size, height: e3.size }, e3.title && n.createElement("title", null, e3.name), n.createElement("mask", { id: r2, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 36, height: 36 }, n.createElement("rect", { width: 36, height: 36, rx: e3.square ? void 0 : 72, fill: "#FFFFFF" })), n.createElement("g", { mask: "url(#".concat(r2, ")") }, n.createElement("rect", { width: 36, height: 36, fill: t2.backgroundColor }), n.createElement("rect", { x: "0", y: "0", width: 36, height: 36, transform: "translate(" + t2.wrapperTranslateX + " " + t2.wrapperTranslateY + ") rotate(" + t2.wrapperRotate + " 18 18) scale(" + t2.wrapperScale + ")", fill: t2.wrapperColor, rx: t2.isCircle ? 36 : 6 }), n.createElement("g", { transform: "translate(" + t2.faceTranslateX + " " + t2.faceTranslateY + ") rotate(" + t2.faceRotate + " 18 18)" }, t2.isMouthOpen ? n.createElement("path", { d: "M15 " + (19 + t2.mouthSpread) + "c2 1 4 1 6 0", stroke: t2.faceColor, fill: "none", strokeLinecap: "round" }) : n.createElement("path", { d: "M13," + (19 + t2.mouthSpread) + " a1,0.75 0 0,0 10,0", fill: t2.faceColor }), n.createElement("rect", { x: 14 - t2.eyeSpread, y: 14, width: 1.5, height: 2, rx: 1, stroke: "none", fill: t2.faceColor }), n.createElement("rect", { x: 20 + t2.eyeSpread, y: 14, width: 1.5, height: 2, rx: 1, stroke: "none", fill: t2.faceColor }))));
        };
        var E = function(e3) {
          var t2 = function(e4, t3) {
            var r3 = h(e4), l3 = t3 && t3.length;
            return Array.from({ length: 4 }, function(e5, i2) {
              return m(r3 + i2, t3, l3);
            });
          }(e3.name, e3.colors), r2 = e3.name.replace(/\s/g, ""), l2 = n.useId();
          return n.createElement("svg", { viewBox: "0 0 80 80", fill: "none", role: "img", xmlns: "http://www.w3.org/2000/svg", width: e3.size, height: e3.size }, e3.title && n.createElement("title", null, e3.name), n.createElement("mask", { id: l2, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 80, height: 80 }, n.createElement("rect", { width: 80, height: 80, rx: e3.square ? void 0 : 160, fill: "#FFFFFF" })), n.createElement("g", { mask: "url(#".concat(l2, ")") }, n.createElement("path", { fill: "url(#gradient_paint0_linear_" + r2 + ")", d: "M0 0h80v40H0z" }), n.createElement("path", { fill: "url(#gradient_paint1_linear_" + r2 + ")", d: "M0 40h80v40H0z" })), n.createElement("defs", null, n.createElement("linearGradient", { id: "gradient_paint0_linear_" + r2, x1: 40, y1: 0, x2: 40, y2: 40, gradientUnits: "userSpaceOnUse" }, n.createElement("stop", { stopColor: t2[0] }), n.createElement("stop", { offset: 1, stopColor: t2[1] })), n.createElement("linearGradient", { id: "gradient_paint1_linear_" + r2, x1: 40, y1: 40, x2: 40, y2: 80, gradientUnits: "userSpaceOnUse" }, n.createElement("stop", { stopColor: t2[2] }), n.createElement("stop", { offset: 1, stopColor: t2[3] }))));
        };
        var p = function(e3) {
          var t2 = function(e4, t3) {
            var r3 = h(e4), l2 = t3 && t3.length;
            return Array.from({ length: 3 }, function(e5, i2) {
              return { color: m(r3 + i2, t3, l2), translateX: f(r3 * (i2 + 1), 8, 1), translateY: f(r3 * (i2 + 1), 8, 2), scale: 1.2 + f(r3 * (i2 + 1), 4) / 10, rotate: f(r3 * (i2 + 1), 360, 1) };
            });
          }(e3.name, e3.colors), r2 = n.useId();
          return n.createElement("svg", { viewBox: "0 0 80 80", fill: "none", role: "img", xmlns: "http://www.w3.org/2000/svg", width: e3.size, height: e3.size }, e3.title && n.createElement("title", null, e3.name), n.createElement("mask", { id: r2, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 80, height: 80 }, n.createElement("rect", { width: 80, height: 80, rx: e3.square ? void 0 : 160, fill: "#FFFFFF" })), n.createElement("g", { mask: "url(#".concat(r2, ")") }, n.createElement("rect", { width: 80, height: 80, fill: t2[0].color }), n.createElement("path", { filter: "url(#filter_".concat(r2, ")"), d: "M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z", fill: t2[1].color, transform: "translate(" + t2[1].translateX + " " + t2[1].translateY + ") rotate(" + t2[1].rotate + " 40 40) scale(" + t2[2].scale + ")" }), n.createElement("path", { filter: "url(#filter_".concat(r2, ")"), style: { mixBlendMode: "overlay" }, d: "M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z", fill: t2[2].color, transform: "translate(" + t2[2].translateX + " " + t2[2].translateY + ") rotate(" + t2[2].rotate + " 40 40) scale(" + t2[2].scale + ")" })), n.createElement("defs", null, n.createElement("filter", { id: "filter_".concat(r2), filterUnits: "userSpaceOnUse", colorInterpolationFilters: "sRGB" }, n.createElement("feFlood", { floodOpacity: 0, result: "BackgroundImageFix" }), n.createElement("feBlend", { in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), n.createElement("feGaussianBlur", { stdDeviation: 7, result: "effect1_foregroundBlur" }))));
        }, y = ["pixel", "bauhaus", "ring", "beam", "sunset", "marble"], x = { geometric: "beam", abstract: "bauhaus" }, v = function(e3) {
          var t2 = e3.variant, r2 = void 0 === t2 ? "marble" : t2, n2 = e3.colors, h2 = void 0 === n2 ? ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"] : n2, o2 = e3.name, s2 = void 0 === o2 ? "Clara Barton" : o2, f2 = e3.square, m2 = void 0 !== f2 && f2, v2 = e3.title, b = void 0 !== v2 && v2, F = e3.size, O = function(e4) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var r3 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? i(Object(r3), true).forEach(function(t4) {
                l(e4, t4, r3[t4]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(r3)) : i(Object(r3)).forEach(function(t4) {
                Object.defineProperty(e4, t4, Object.getOwnPropertyDescriptor(r3, t4));
              });
            }
            return e4;
          }({ colors: h2, name: s2, title: b, size: void 0 === F ? 40 : F, square: m2 }, a(e3, ["variant", "colors", "name", "square", "title", "size"]));
          return { pixel: c.a.createElement(g, O), bauhaus: c.a.createElement(u, O), ring: c.a.createElement(d, O), beam: c.a.createElement(w, O), sunset: c.a.createElement(E, O), marble: c.a.createElement(p, O) }[Object.keys(x).includes(r2) ? x[r2] : y.includes(r2) ? r2 : "marble"];
        };
        t.default = v;
      }]);
    });
  }
});
export default require_build();
//# sourceMappingURL=boring-avatars.js.map
