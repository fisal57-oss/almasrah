(() => {
  // D:/برامجي/كراسي المسرح/dist/assets/index-Bk0bwvm2.js
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
    new MutationObserver((n) => {
      for (const s of n) if (s.type === "childList") for (const i of s.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
    }).observe(document, { childList: true, subtree: true });
    function t(n) {
      const s = {};
      return n.integrity && (s.integrity = n.integrity), n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? s.credentials = "include" : n.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
    }
    function r(n) {
      if (n.ep) return;
      n.ep = true;
      const s = t(n);
      fetch(n.href, s);
    }
  })();
  function U0(A2) {
    return A2 && A2.__esModule && Object.prototype.hasOwnProperty.call(A2, "default") ? A2.default : A2;
  }
  var Ed = { exports: {} };
  var zi = {};
  var Id = { exports: {} };
  var W = {};
  var Zn = Symbol.for("react.element");
  var F0 = Symbol.for("react.portal");
  var x0 = Symbol.for("react.fragment");
  var y0 = Symbol.for("react.strict_mode");
  var E0 = Symbol.for("react.profiler");
  var I0 = Symbol.for("react.provider");
  var H0 = Symbol.for("react.context");
  var S0 = Symbol.for("react.forward_ref");
  var b0 = Symbol.for("react.suspense");
  var L0 = Symbol.for("react.memo");
  var N0 = Symbol.for("react.lazy");
  var Yu = Symbol.iterator;
  function k0(A2) {
    return A2 === null || typeof A2 != "object" ? null : (A2 = Yu && A2[Yu] || A2["@@iterator"], typeof A2 == "function" ? A2 : null);
  }
  var Hd = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } };
  var Sd = Object.assign;
  var bd = {};
  function Pr(A2, e, t) {
    this.props = A2, this.context = e, this.refs = bd, this.updater = t || Hd;
  }
  Pr.prototype.isReactComponent = {};
  Pr.prototype.setState = function(A2, e) {
    if (typeof A2 != "object" && typeof A2 != "function" && A2 != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, A2, e, "setState");
  };
  Pr.prototype.forceUpdate = function(A2) {
    this.updater.enqueueForceUpdate(this, A2, "forceUpdate");
  };
  function Ld() {
  }
  Ld.prototype = Pr.prototype;
  function Oo(A2, e, t) {
    this.props = A2, this.context = e, this.refs = bd, this.updater = t || Hd;
  }
  var jo = Oo.prototype = new Ld();
  jo.constructor = Oo;
  Sd(jo, Pr.prototype);
  jo.isPureReactComponent = true;
  var Zu = Array.isArray;
  var Nd = Object.prototype.hasOwnProperty;
  var Po = { current: null };
  var kd = { key: true, ref: true, __self: true, __source: true };
  function Td(A2, e, t) {
    var r, n = {}, s = null, i = null;
    if (e != null) for (r in e.ref !== void 0 && (i = e.ref), e.key !== void 0 && (s = "" + e.key), e) Nd.call(e, r) && !kd.hasOwnProperty(r) && (n[r] = e[r]);
    var l2 = arguments.length - 2;
    if (l2 === 1) n.children = t;
    else if (1 < l2) {
      for (var a = Array(l2), o = 0; o < l2; o++) a[o] = arguments[o + 2];
      n.children = a;
    }
    if (A2 && A2.defaultProps) for (r in l2 = A2.defaultProps, l2) n[r] === void 0 && (n[r] = l2[r]);
    return { $$typeof: Zn, type: A2, key: s, ref: i, props: n, _owner: Po.current };
  }
  function T0(A2, e) {
    return { $$typeof: Zn, type: A2.type, key: e, ref: A2.ref, props: A2.props, _owner: A2._owner };
  }
  function _o(A2) {
    return typeof A2 == "object" && A2 !== null && A2.$$typeof === Zn;
  }
  function K0(A2) {
    var e = { "=": "=0", ":": "=2" };
    return "$" + A2.replace(/[=:]/g, function(t) {
      return e[t];
    });
  }
  var $u = /\/+/g;
  function va(A2, e) {
    return typeof A2 == "object" && A2 !== null && A2.key != null ? K0("" + A2.key) : e.toString(36);
  }
  function Ws(A2, e, t, r, n) {
    var s = typeof A2;
    (s === "undefined" || s === "boolean") && (A2 = null);
    var i = false;
    if (A2 === null) i = true;
    else switch (s) {
      case "string":
      case "number":
        i = true;
        break;
      case "object":
        switch (A2.$$typeof) {
          case Zn:
          case F0:
            i = true;
        }
    }
    if (i) return i = A2, n = n(i), A2 = r === "" ? "." + va(i, 0) : r, Zu(n) ? (t = "", A2 != null && (t = A2.replace($u, "$&/") + "/"), Ws(n, e, t, "", function(o) {
      return o;
    })) : n != null && (_o(n) && (n = T0(n, t + (!n.key || i && i.key === n.key ? "" : ("" + n.key).replace($u, "$&/") + "/") + A2)), e.push(n)), 1;
    if (i = 0, r = r === "" ? "." : r + ":", Zu(A2)) for (var l2 = 0; l2 < A2.length; l2++) {
      s = A2[l2];
      var a = r + va(s, l2);
      i += Ws(s, e, t, a, n);
    }
    else if (a = k0(A2), typeof a == "function") for (A2 = a.call(A2), l2 = 0; !(s = A2.next()).done; ) s = s.value, a = r + va(s, l2++), i += Ws(s, e, t, a, n);
    else if (s === "object") throw e = String(A2), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(A2).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
    return i;
  }
  function ss(A2, e, t) {
    if (A2 == null) return A2;
    var r = [], n = 0;
    return Ws(A2, r, "", "", function(s) {
      return e.call(t, s, n++);
    }), r;
  }
  function D0(A2) {
    if (A2._status === -1) {
      var e = A2._result;
      e = e(), e.then(function(t) {
        (A2._status === 0 || A2._status === -1) && (A2._status = 1, A2._result = t);
      }, function(t) {
        (A2._status === 0 || A2._status === -1) && (A2._status = 2, A2._result = t);
      }), A2._status === -1 && (A2._status = 0, A2._result = e);
    }
    if (A2._status === 1) return A2._result.default;
    throw A2._result;
  }
  var zA = { current: null };
  var zs = { transition: null };
  var M0 = { ReactCurrentDispatcher: zA, ReactCurrentBatchConfig: zs, ReactCurrentOwner: Po };
  function Kd() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  W.Children = { map: ss, forEach: function(A2, e, t) {
    ss(A2, function() {
      e.apply(this, arguments);
    }, t);
  }, count: function(A2) {
    var e = 0;
    return ss(A2, function() {
      e++;
    }), e;
  }, toArray: function(A2) {
    return ss(A2, function(e) {
      return e;
    }) || [];
  }, only: function(A2) {
    if (!_o(A2)) throw Error("React.Children.only expected to receive a single React element child.");
    return A2;
  } };
  W.Component = Pr;
  W.Fragment = x0;
  W.Profiler = E0;
  W.PureComponent = Oo;
  W.StrictMode = y0;
  W.Suspense = b0;
  W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = M0;
  W.act = Kd;
  W.cloneElement = function(A2, e, t) {
    if (A2 == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + A2 + ".");
    var r = Sd({}, A2.props), n = A2.key, s = A2.ref, i = A2._owner;
    if (e != null) {
      if (e.ref !== void 0 && (s = e.ref, i = Po.current), e.key !== void 0 && (n = "" + e.key), A2.type && A2.type.defaultProps) var l2 = A2.type.defaultProps;
      for (a in e) Nd.call(e, a) && !kd.hasOwnProperty(a) && (r[a] = e[a] === void 0 && l2 !== void 0 ? l2[a] : e[a]);
    }
    var a = arguments.length - 2;
    if (a === 1) r.children = t;
    else if (1 < a) {
      l2 = Array(a);
      for (var o = 0; o < a; o++) l2[o] = arguments[o + 2];
      r.children = l2;
    }
    return { $$typeof: Zn, type: A2.type, key: n, ref: s, props: r, _owner: i };
  };
  W.createContext = function(A2) {
    return A2 = { $$typeof: H0, _currentValue: A2, _currentValue2: A2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, A2.Provider = { $$typeof: I0, _context: A2 }, A2.Consumer = A2;
  };
  W.createElement = Td;
  W.createFactory = function(A2) {
    var e = Td.bind(null, A2);
    return e.type = A2, e;
  };
  W.createRef = function() {
    return { current: null };
  };
  W.forwardRef = function(A2) {
    return { $$typeof: S0, render: A2 };
  };
  W.isValidElement = _o;
  W.lazy = function(A2) {
    return { $$typeof: N0, _payload: { _status: -1, _result: A2 }, _init: D0 };
  };
  W.memo = function(A2, e) {
    return { $$typeof: L0, type: A2, compare: e === void 0 ? null : e };
  };
  W.startTransition = function(A2) {
    var e = zs.transition;
    zs.transition = {};
    try {
      A2();
    } finally {
      zs.transition = e;
    }
  };
  W.unstable_act = Kd;
  W.useCallback = function(A2, e) {
    return zA.current.useCallback(A2, e);
  };
  W.useContext = function(A2) {
    return zA.current.useContext(A2);
  };
  W.useDebugValue = function() {
  };
  W.useDeferredValue = function(A2) {
    return zA.current.useDeferredValue(A2);
  };
  W.useEffect = function(A2, e) {
    return zA.current.useEffect(A2, e);
  };
  W.useId = function() {
    return zA.current.useId();
  };
  W.useImperativeHandle = function(A2, e, t) {
    return zA.current.useImperativeHandle(A2, e, t);
  };
  W.useInsertionEffect = function(A2, e) {
    return zA.current.useInsertionEffect(A2, e);
  };
  W.useLayoutEffect = function(A2, e) {
    return zA.current.useLayoutEffect(A2, e);
  };
  W.useMemo = function(A2, e) {
    return zA.current.useMemo(A2, e);
  };
  W.useReducer = function(A2, e, t) {
    return zA.current.useReducer(A2, e, t);
  };
  W.useRef = function(A2) {
    return zA.current.useRef(A2);
  };
  W.useState = function(A2) {
    return zA.current.useState(A2);
  };
  W.useSyncExternalStore = function(A2, e, t) {
    return zA.current.useSyncExternalStore(A2, e, t);
  };
  W.useTransition = function() {
    return zA.current.useTransition();
  };
  W.version = "18.3.1";
  Id.exports = W;
  var uA = Id.exports;
  var UA = U0(uA);
  var R0 = uA;
  var O0 = Symbol.for("react.element");
  var j0 = Symbol.for("react.fragment");
  var P0 = Object.prototype.hasOwnProperty;
  var _0 = R0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
  var V0 = { key: true, ref: true, __self: true, __source: true };
  function Dd(A2, e, t) {
    var r, n = {}, s = null, i = null;
    t !== void 0 && (s = "" + t), e.key !== void 0 && (s = "" + e.key), e.ref !== void 0 && (i = e.ref);
    for (r in e) P0.call(e, r) && !V0.hasOwnProperty(r) && (n[r] = e[r]);
    if (A2 && A2.defaultProps) for (r in e = A2.defaultProps, e) n[r] === void 0 && (n[r] = e[r]);
    return { $$typeof: O0, type: A2, key: s, ref: i, props: n, _owner: _0.current };
  }
  zi.Fragment = j0;
  zi.jsx = Dd;
  zi.jsxs = Dd;
  Ed.exports = zi;
  var u = Ed.exports;
  var qu = {};
  var Md = { exports: {} };
  var ue = {};
  var Rd = { exports: {} };
  var Od = {};
  (function(A2) {
    function e(b, j) {
      var Q = b.length;
      b.push(j);
      A: for (; 0 < Q; ) {
        var g = Q - 1 >>> 1, E = b[g];
        if (0 < n(E, j)) b[g] = j, b[Q] = E, Q = g;
        else break A;
      }
    }
    function t(b) {
      return b.length === 0 ? null : b[0];
    }
    function r(b) {
      if (b.length === 0) return null;
      var j = b[0], Q = b.pop();
      if (Q !== j) {
        b[0] = Q;
        A: for (var g = 0, E = b.length, N2 = E >>> 1; g < N2; ) {
          var k = 2 * (g + 1) - 1, M2 = b[k], R = k + 1, y2 = b[R];
          if (0 > n(M2, Q)) R < E && 0 > n(y2, M2) ? (b[g] = y2, b[R] = Q, g = R) : (b[g] = M2, b[k] = Q, g = k);
          else if (R < E && 0 > n(y2, Q)) b[g] = y2, b[R] = Q, g = R;
          else break A;
        }
      }
      return j;
    }
    function n(b, j) {
      var Q = b.sortIndex - j.sortIndex;
      return Q !== 0 ? Q : b.id - j.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var s = performance;
      A2.unstable_now = function() {
        return s.now();
      };
    } else {
      var i = Date, l2 = i.now();
      A2.unstable_now = function() {
        return i.now() - l2;
      };
    }
    var a = [], o = [], c = 1, f = null, d = 3, m2 = false, w2 = false, C2 = false, U = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(b) {
      for (var j = t(o); j !== null; ) {
        if (j.callback === null) r(o);
        else if (j.startTime <= b) r(o), j.sortIndex = j.expirationTime, e(a, j);
        else break;
        j = t(o);
      }
    }
    function v2(b) {
      if (C2 = false, p(b), !w2) if (t(a) !== null) w2 = true, AA(x);
      else {
        var j = t(o);
        j !== null && $(v2, j.startTime - b);
      }
    }
    function x(b, j) {
      w2 = false, C2 && (C2 = false, h(H), H = -1), m2 = true;
      var Q = d;
      try {
        for (p(j), f = t(a); f !== null && (!(f.expirationTime > j) || b && !_()); ) {
          var g = f.callback;
          if (typeof g == "function") {
            f.callback = null, d = f.priorityLevel;
            var E = g(f.expirationTime <= j);
            j = A2.unstable_now(), typeof E == "function" ? f.callback = E : f === t(a) && r(a), p(j);
          } else r(a);
          f = t(a);
        }
        if (f !== null) var N2 = true;
        else {
          var k = t(o);
          k !== null && $(v2, k.startTime - j), N2 = false;
        }
        return N2;
      } finally {
        f = null, d = Q, m2 = false;
      }
    }
    var F = false, I = null, H = -1, L = 5, K2 = -1;
    function _() {
      return !(A2.unstable_now() - K2 < L);
    }
    function rA() {
      if (I !== null) {
        var b = A2.unstable_now();
        K2 = b;
        var j = true;
        try {
          j = I(true, b);
        } finally {
          j ? V() : (F = false, I = null);
        }
      } else F = false;
    }
    var V;
    if (typeof B == "function") V = function() {
      B(rA);
    };
    else if (typeof MessageChannel < "u") {
      var G = new MessageChannel(), Z = G.port2;
      G.port1.onmessage = rA, V = function() {
        Z.postMessage(null);
      };
    } else V = function() {
      U(rA, 0);
    };
    function AA(b) {
      I = b, F || (F = true, V());
    }
    function $(b, j) {
      H = U(function() {
        b(A2.unstable_now());
      }, j);
    }
    A2.unstable_IdlePriority = 5, A2.unstable_ImmediatePriority = 1, A2.unstable_LowPriority = 4, A2.unstable_NormalPriority = 3, A2.unstable_Profiling = null, A2.unstable_UserBlockingPriority = 2, A2.unstable_cancelCallback = function(b) {
      b.callback = null;
    }, A2.unstable_continueExecution = function() {
      w2 || m2 || (w2 = true, AA(x));
    }, A2.unstable_forceFrameRate = function(b) {
      0 > b || 125 < b ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < b ? Math.floor(1e3 / b) : 5;
    }, A2.unstable_getCurrentPriorityLevel = function() {
      return d;
    }, A2.unstable_getFirstCallbackNode = function() {
      return t(a);
    }, A2.unstable_next = function(b) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = d;
      }
      var Q = d;
      d = j;
      try {
        return b();
      } finally {
        d = Q;
      }
    }, A2.unstable_pauseExecution = function() {
    }, A2.unstable_requestPaint = function() {
    }, A2.unstable_runWithPriority = function(b, j) {
      switch (b) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          b = 3;
      }
      var Q = d;
      d = b;
      try {
        return j();
      } finally {
        d = Q;
      }
    }, A2.unstable_scheduleCallback = function(b, j, Q) {
      var g = A2.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? g + Q : g) : Q = g, b) {
        case 1:
          var E = -1;
          break;
        case 2:
          E = 250;
          break;
        case 5:
          E = 1073741823;
          break;
        case 4:
          E = 1e4;
          break;
        default:
          E = 5e3;
      }
      return E = Q + E, b = { id: c++, callback: j, priorityLevel: b, startTime: Q, expirationTime: E, sortIndex: -1 }, Q > g ? (b.sortIndex = Q, e(o, b), t(a) === null && b === t(o) && (C2 ? (h(H), H = -1) : C2 = true, $(v2, Q - g))) : (b.sortIndex = E, e(a, b), w2 || m2 || (w2 = true, AA(x))), b;
    }, A2.unstable_shouldYield = _, A2.unstable_wrapCallback = function(b) {
      var j = d;
      return function() {
        var Q = d;
        d = j;
        try {
          return b.apply(this, arguments);
        } finally {
          d = Q;
        }
      };
    };
  })(Od);
  Rd.exports = Od;
  var G0 = Rd.exports;
  var X0 = uA;
  var oe = G0;
  function S(A2) {
    for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + A2, t = 1; t < arguments.length; t++) e += "&args[]=" + encodeURIComponent(arguments[t]);
    return "Minified React error #" + A2 + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var jd = /* @__PURE__ */ new Set();
  var bn = {};
  function Ar(A2, e) {
    kr(A2, e), kr(A2 + "Capture", e);
  }
  function kr(A2, e) {
    for (bn[A2] = e, A2 = 0; A2 < e.length; A2++) jd.add(e[A2]);
  }
  var $e = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u");
  var pl = Object.prototype.hasOwnProperty;
  var W0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
  var Ac = {};
  var ec = {};
  function z0(A2) {
    return pl.call(ec, A2) ? true : pl.call(Ac, A2) ? false : W0.test(A2) ? ec[A2] = true : (Ac[A2] = true, false);
  }
  function J0(A2, e, t, r) {
    if (t !== null && t.type === 0) return false;
    switch (typeof e) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        return r ? false : t !== null ? !t.acceptsBooleans : (A2 = A2.toLowerCase().slice(0, 5), A2 !== "data-" && A2 !== "aria-");
      default:
        return false;
    }
  }
  function Y0(A2, e, t, r) {
    if (e === null || typeof e > "u" || J0(A2, e, t, r)) return true;
    if (r) return false;
    if (t !== null) switch (t.type) {
      case 3:
        return !e;
      case 4:
        return e === false;
      case 5:
        return isNaN(e);
      case 6:
        return isNaN(e) || 1 > e;
    }
    return false;
  }
  function JA(A2, e, t, r, n, s, i) {
    this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = r, this.attributeNamespace = n, this.mustUseProperty = t, this.propertyName = A2, this.type = e, this.sanitizeURL = s, this.removeEmptyString = i;
  }
  var MA = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(A2) {
    MA[A2] = new JA(A2, 0, false, A2, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(A2) {
    var e = A2[0];
    MA[e] = new JA(e, 1, false, A2[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(A2) {
    MA[A2] = new JA(A2, 2, false, A2.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(A2) {
    MA[A2] = new JA(A2, 2, false, A2, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(A2) {
    MA[A2] = new JA(A2, 3, false, A2.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(A2) {
    MA[A2] = new JA(A2, 3, true, A2, null, false, false);
  });
  ["capture", "download"].forEach(function(A2) {
    MA[A2] = new JA(A2, 4, false, A2, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(A2) {
    MA[A2] = new JA(A2, 6, false, A2, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(A2) {
    MA[A2] = new JA(A2, 5, false, A2.toLowerCase(), null, false, false);
  });
  var Vo = /[\-:]([a-z])/g;
  function Go(A2) {
    return A2[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(A2) {
    var e = A2.replace(Vo, Go);
    MA[e] = new JA(e, 1, false, A2, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(A2) {
    var e = A2.replace(Vo, Go);
    MA[e] = new JA(e, 1, false, A2, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(A2) {
    var e = A2.replace(Vo, Go);
    MA[e] = new JA(e, 1, false, A2, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(A2) {
    MA[A2] = new JA(A2, 1, false, A2.toLowerCase(), null, false, false);
  });
  MA.xlinkHref = new JA("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(A2) {
    MA[A2] = new JA(A2, 1, false, A2.toLowerCase(), null, true, true);
  });
  function Xo(A2, e, t, r) {
    var n = MA.hasOwnProperty(e) ? MA[e] : null;
    (n !== null ? n.type !== 0 : r || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (Y0(e, t, n, r) && (t = null), r || n === null ? z0(e) && (t === null ? A2.removeAttribute(e) : A2.setAttribute(e, "" + t)) : n.mustUseProperty ? A2[n.propertyName] = t === null ? n.type === 3 ? false : "" : t : (e = n.attributeName, r = n.attributeNamespace, t === null ? A2.removeAttribute(e) : (n = n.type, t = n === 3 || n === 4 && t === true ? "" : "" + t, r ? A2.setAttributeNS(r, e, t) : A2.setAttribute(e, t))));
  }
  var rt = X0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var is = Symbol.for("react.element");
  var dr = Symbol.for("react.portal");
  var Br = Symbol.for("react.fragment");
  var Wo = Symbol.for("react.strict_mode");
  var ml = Symbol.for("react.profiler");
  var Pd = Symbol.for("react.provider");
  var _d = Symbol.for("react.context");
  var zo = Symbol.for("react.forward_ref");
  var Cl = Symbol.for("react.suspense");
  var Ql = Symbol.for("react.suspense_list");
  var Jo = Symbol.for("react.memo");
  var lt = Symbol.for("react.lazy");
  var Vd = Symbol.for("react.offscreen");
  var tc = Symbol.iterator;
  function Xr(A2) {
    return A2 === null || typeof A2 != "object" ? null : (A2 = tc && A2[tc] || A2["@@iterator"], typeof A2 == "function" ? A2 : null);
  }
  var pA = Object.assign;
  var Ua;
  function nn(A2) {
    if (Ua === void 0) try {
      throw Error();
    } catch (t) {
      var e = t.stack.trim().match(/\n( *(at )?)/);
      Ua = e && e[1] || "";
    }
    return `
` + Ua + A2;
  }
  var Fa = false;
  function xa(A2, e) {
    if (!A2 || Fa) return "";
    Fa = true;
    var t = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (e) if (e = function() {
        throw Error();
      }, Object.defineProperty(e.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(e, []);
        } catch (o) {
          var r = o;
        }
        Reflect.construct(A2, [], e);
      } else {
        try {
          e.call();
        } catch (o) {
          r = o;
        }
        A2.call(e.prototype);
      }
      else {
        try {
          throw Error();
        } catch (o) {
          r = o;
        }
        A2();
      }
    } catch (o) {
      if (o && r && typeof o.stack == "string") {
        for (var n = o.stack.split(`
`), s = r.stack.split(`
`), i = n.length - 1, l2 = s.length - 1; 1 <= i && 0 <= l2 && n[i] !== s[l2]; ) l2--;
        for (; 1 <= i && 0 <= l2; i--, l2--) if (n[i] !== s[l2]) {
          if (i !== 1 || l2 !== 1) do
            if (i--, l2--, 0 > l2 || n[i] !== s[l2]) {
              var a = `
` + n[i].replace(" at new ", " at ");
              return A2.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", A2.displayName)), a;
            }
          while (1 <= i && 0 <= l2);
          break;
        }
      }
    } finally {
      Fa = false, Error.prepareStackTrace = t;
    }
    return (A2 = A2 ? A2.displayName || A2.name : "") ? nn(A2) : "";
  }
  function Z0(A2) {
    switch (A2.tag) {
      case 5:
        return nn(A2.type);
      case 16:
        return nn("Lazy");
      case 13:
        return nn("Suspense");
      case 19:
        return nn("SuspenseList");
      case 0:
      case 2:
      case 15:
        return A2 = xa(A2.type, false), A2;
      case 11:
        return A2 = xa(A2.type.render, false), A2;
      case 1:
        return A2 = xa(A2.type, true), A2;
      default:
        return "";
    }
  }
  function vl(A2) {
    if (A2 == null) return null;
    if (typeof A2 == "function") return A2.displayName || A2.name || null;
    if (typeof A2 == "string") return A2;
    switch (A2) {
      case Br:
        return "Fragment";
      case dr:
        return "Portal";
      case ml:
        return "Profiler";
      case Wo:
        return "StrictMode";
      case Cl:
        return "Suspense";
      case Ql:
        return "SuspenseList";
    }
    if (typeof A2 == "object") switch (A2.$$typeof) {
      case _d:
        return (A2.displayName || "Context") + ".Consumer";
      case Pd:
        return (A2._context.displayName || "Context") + ".Provider";
      case zo:
        var e = A2.render;
        return A2 = A2.displayName, A2 || (A2 = e.displayName || e.name || "", A2 = A2 !== "" ? "ForwardRef(" + A2 + ")" : "ForwardRef"), A2;
      case Jo:
        return e = A2.displayName || null, e !== null ? e : vl(A2.type) || "Memo";
      case lt:
        e = A2._payload, A2 = A2._init;
        try {
          return vl(A2(e));
        } catch {
        }
    }
    return null;
  }
  function $0(A2) {
    var e = A2.type;
    switch (A2.tag) {
      case 24:
        return "Cache";
      case 9:
        return (e.displayName || "Context") + ".Consumer";
      case 10:
        return (e._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return A2 = e.render, A2 = A2.displayName || A2.name || "", e.displayName || (A2 !== "" ? "ForwardRef(" + A2 + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return e;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return vl(e);
      case 8:
        return e === Wo ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof e == "function") return e.displayName || e.name || null;
        if (typeof e == "string") return e;
    }
    return null;
  }
  function Ht(A2) {
    switch (typeof A2) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return A2;
      case "object":
        return A2;
      default:
        return "";
    }
  }
  function Gd(A2) {
    var e = A2.type;
    return (A2 = A2.nodeName) && A2.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function q0(A2) {
    var e = Gd(A2) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(A2.constructor.prototype, e), r = "" + A2[e];
    if (!A2.hasOwnProperty(e) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
      var n = t.get, s = t.set;
      return Object.defineProperty(A2, e, { configurable: true, get: function() {
        return n.call(this);
      }, set: function(i) {
        r = "" + i, s.call(this, i);
      } }), Object.defineProperty(A2, e, { enumerable: t.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(i) {
        r = "" + i;
      }, stopTracking: function() {
        A2._valueTracker = null, delete A2[e];
      } };
    }
  }
  function as(A2) {
    A2._valueTracker || (A2._valueTracker = q0(A2));
  }
  function Xd(A2) {
    if (!A2) return false;
    var e = A2._valueTracker;
    if (!e) return true;
    var t = e.getValue(), r = "";
    return A2 && (r = Gd(A2) ? A2.checked ? "true" : "false" : A2.value), A2 = r, A2 !== t ? (e.setValue(A2), true) : false;
  }
  function ui(A2) {
    if (A2 = A2 || (typeof document < "u" ? document : void 0), typeof A2 > "u") return null;
    try {
      return A2.activeElement || A2.body;
    } catch {
      return A2.body;
    }
  }
  function Ul(A2, e) {
    var t = e.checked;
    return pA({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: t ?? A2._wrapperState.initialChecked });
  }
  function rc(A2, e) {
    var t = e.defaultValue == null ? "" : e.defaultValue, r = e.checked != null ? e.checked : e.defaultChecked;
    t = Ht(e.value != null ? e.value : t), A2._wrapperState = { initialChecked: r, initialValue: t, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
  }
  function Wd(A2, e) {
    e = e.checked, e != null && Xo(A2, "checked", e, false);
  }
  function Fl(A2, e) {
    Wd(A2, e);
    var t = Ht(e.value), r = e.type;
    if (t != null) r === "number" ? (t === 0 && A2.value === "" || A2.value != t) && (A2.value = "" + t) : A2.value !== "" + t && (A2.value = "" + t);
    else if (r === "submit" || r === "reset") {
      A2.removeAttribute("value");
      return;
    }
    e.hasOwnProperty("value") ? xl(A2, e.type, t) : e.hasOwnProperty("defaultValue") && xl(A2, e.type, Ht(e.defaultValue)), e.checked == null && e.defaultChecked != null && (A2.defaultChecked = !!e.defaultChecked);
  }
  function nc(A2, e, t) {
    if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
      var r = e.type;
      if (!(r !== "submit" && r !== "reset" || e.value !== void 0 && e.value !== null)) return;
      e = "" + A2._wrapperState.initialValue, t || e === A2.value || (A2.value = e), A2.defaultValue = e;
    }
    t = A2.name, t !== "" && (A2.name = ""), A2.defaultChecked = !!A2._wrapperState.initialChecked, t !== "" && (A2.name = t);
  }
  function xl(A2, e, t) {
    (e !== "number" || ui(A2.ownerDocument) !== A2) && (t == null ? A2.defaultValue = "" + A2._wrapperState.initialValue : A2.defaultValue !== "" + t && (A2.defaultValue = "" + t));
  }
  var sn = Array.isArray;
  function Er(A2, e, t, r) {
    if (A2 = A2.options, e) {
      e = {};
      for (var n = 0; n < t.length; n++) e["$" + t[n]] = true;
      for (t = 0; t < A2.length; t++) n = e.hasOwnProperty("$" + A2[t].value), A2[t].selected !== n && (A2[t].selected = n), n && r && (A2[t].defaultSelected = true);
    } else {
      for (t = "" + Ht(t), e = null, n = 0; n < A2.length; n++) {
        if (A2[n].value === t) {
          A2[n].selected = true, r && (A2[n].defaultSelected = true);
          return;
        }
        e !== null || A2[n].disabled || (e = A2[n]);
      }
      e !== null && (e.selected = true);
    }
  }
  function yl(A2, e) {
    if (e.dangerouslySetInnerHTML != null) throw Error(S(91));
    return pA({}, e, { value: void 0, defaultValue: void 0, children: "" + A2._wrapperState.initialValue });
  }
  function sc(A2, e) {
    var t = e.value;
    if (t == null) {
      if (t = e.children, e = e.defaultValue, t != null) {
        if (e != null) throw Error(S(92));
        if (sn(t)) {
          if (1 < t.length) throw Error(S(93));
          t = t[0];
        }
        e = t;
      }
      e == null && (e = ""), t = e;
    }
    A2._wrapperState = { initialValue: Ht(t) };
  }
  function zd(A2, e) {
    var t = Ht(e.value), r = Ht(e.defaultValue);
    t != null && (t = "" + t, t !== A2.value && (A2.value = t), e.defaultValue == null && A2.defaultValue !== t && (A2.defaultValue = t)), r != null && (A2.defaultValue = "" + r);
  }
  function ic(A2) {
    var e = A2.textContent;
    e === A2._wrapperState.initialValue && e !== "" && e !== null && (A2.value = e);
  }
  function Jd(A2) {
    switch (A2) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function El(A2, e) {
    return A2 == null || A2 === "http://www.w3.org/1999/xhtml" ? Jd(e) : A2 === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : A2;
  }
  var ls;
  var Yd = function(A2) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, t, r, n) {
      MSApp.execUnsafeLocalFunction(function() {
        return A2(e, t, r, n);
      });
    } : A2;
  }(function(A2, e) {
    if (A2.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in A2) A2.innerHTML = e;
    else {
      for (ls = ls || document.createElement("div"), ls.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = ls.firstChild; A2.firstChild; ) A2.removeChild(A2.firstChild);
      for (; e.firstChild; ) A2.appendChild(e.firstChild);
    }
  });
  function Ln(A2, e) {
    if (e) {
      var t = A2.firstChild;
      if (t && t === A2.lastChild && t.nodeType === 3) {
        t.nodeValue = e;
        return;
      }
    }
    A2.textContent = e;
  }
  var hn = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true };
  var Aw = ["Webkit", "ms", "Moz", "O"];
  Object.keys(hn).forEach(function(A2) {
    Aw.forEach(function(e) {
      e = e + A2.charAt(0).toUpperCase() + A2.substring(1), hn[e] = hn[A2];
    });
  });
  function Zd(A2, e, t) {
    return e == null || typeof e == "boolean" || e === "" ? "" : t || typeof e != "number" || e === 0 || hn.hasOwnProperty(A2) && hn[A2] ? ("" + e).trim() : e + "px";
  }
  function $d(A2, e) {
    A2 = A2.style;
    for (var t in e) if (e.hasOwnProperty(t)) {
      var r = t.indexOf("--") === 0, n = Zd(t, e[t], r);
      t === "float" && (t = "cssFloat"), r ? A2.setProperty(t, n) : A2[t] = n;
    }
  }
  var ew = pA({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function Il(A2, e) {
    if (e) {
      if (ew[A2] && (e.children != null || e.dangerouslySetInnerHTML != null)) throw Error(S(137, A2));
      if (e.dangerouslySetInnerHTML != null) {
        if (e.children != null) throw Error(S(60));
        if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML)) throw Error(S(61));
      }
      if (e.style != null && typeof e.style != "object") throw Error(S(62));
    }
  }
  function Hl(A2, e) {
    if (A2.indexOf("-") === -1) return typeof e.is == "string";
    switch (A2) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var Sl = null;
  function Yo(A2) {
    return A2 = A2.target || A2.srcElement || window, A2.correspondingUseElement && (A2 = A2.correspondingUseElement), A2.nodeType === 3 ? A2.parentNode : A2;
  }
  var bl = null;
  var Ir = null;
  var Hr = null;
  function ac(A2) {
    if (A2 = As(A2)) {
      if (typeof bl != "function") throw Error(S(280));
      var e = A2.stateNode;
      e && (e = qi(e), bl(A2.stateNode, A2.type, e));
    }
  }
  function qd(A2) {
    Ir ? Hr ? Hr.push(A2) : Hr = [A2] : Ir = A2;
  }
  function AB() {
    if (Ir) {
      var A2 = Ir, e = Hr;
      if (Hr = Ir = null, ac(A2), e) for (A2 = 0; A2 < e.length; A2++) ac(e[A2]);
    }
  }
  function eB(A2, e) {
    return A2(e);
  }
  function tB() {
  }
  var ya = false;
  function rB(A2, e, t) {
    if (ya) return A2(e, t);
    ya = true;
    try {
      return eB(A2, e, t);
    } finally {
      ya = false, (Ir !== null || Hr !== null) && (tB(), AB());
    }
  }
  function Nn(A2, e) {
    var t = A2.stateNode;
    if (t === null) return null;
    var r = qi(t);
    if (r === null) return null;
    t = r[e];
    A: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (A2 = A2.type, r = !(A2 === "button" || A2 === "input" || A2 === "select" || A2 === "textarea")), A2 = !r;
        break A;
      default:
        A2 = false;
    }
    if (A2) return null;
    if (t && typeof t != "function") throw Error(S(231, e, typeof t));
    return t;
  }
  var Ll = false;
  if ($e) try {
    Wr = {};
    Object.defineProperty(Wr, "passive", { get: function() {
      Ll = true;
    } }), window.addEventListener("test", Wr, Wr), window.removeEventListener("test", Wr, Wr);
  } catch {
    Ll = false;
  }
  var Wr;
  function tw(A2, e, t, r, n, s, i, l2, a) {
    var o = Array.prototype.slice.call(arguments, 3);
    try {
      e.apply(t, o);
    } catch (c) {
      this.onError(c);
    }
  }
  var wn = false;
  var ci = null;
  var fi = false;
  var Nl = null;
  var rw = { onError: function(A2) {
    wn = true, ci = A2;
  } };
  function nw(A2, e, t, r, n, s, i, l2, a) {
    wn = false, ci = null, tw.apply(rw, arguments);
  }
  function sw(A2, e, t, r, n, s, i, l2, a) {
    if (nw.apply(this, arguments), wn) {
      if (wn) {
        var o = ci;
        wn = false, ci = null;
      } else throw Error(S(198));
      fi || (fi = true, Nl = o);
    }
  }
  function er(A2) {
    var e = A2, t = A2;
    if (A2.alternate) for (; e.return; ) e = e.return;
    else {
      A2 = e;
      do
        e = A2, e.flags & 4098 && (t = e.return), A2 = e.return;
      while (A2);
    }
    return e.tag === 3 ? t : null;
  }
  function nB(A2) {
    if (A2.tag === 13) {
      var e = A2.memoizedState;
      if (e === null && (A2 = A2.alternate, A2 !== null && (e = A2.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function lc(A2) {
    if (er(A2) !== A2) throw Error(S(188));
  }
  function iw(A2) {
    var e = A2.alternate;
    if (!e) {
      if (e = er(A2), e === null) throw Error(S(188));
      return e !== A2 ? null : A2;
    }
    for (var t = A2, r = e; ; ) {
      var n = t.return;
      if (n === null) break;
      var s = n.alternate;
      if (s === null) {
        if (r = n.return, r !== null) {
          t = r;
          continue;
        }
        break;
      }
      if (n.child === s.child) {
        for (s = n.child; s; ) {
          if (s === t) return lc(n), A2;
          if (s === r) return lc(n), e;
          s = s.sibling;
        }
        throw Error(S(188));
      }
      if (t.return !== r.return) t = n, r = s;
      else {
        for (var i = false, l2 = n.child; l2; ) {
          if (l2 === t) {
            i = true, t = n, r = s;
            break;
          }
          if (l2 === r) {
            i = true, r = n, t = s;
            break;
          }
          l2 = l2.sibling;
        }
        if (!i) {
          for (l2 = s.child; l2; ) {
            if (l2 === t) {
              i = true, t = s, r = n;
              break;
            }
            if (l2 === r) {
              i = true, r = s, t = n;
              break;
            }
            l2 = l2.sibling;
          }
          if (!i) throw Error(S(189));
        }
      }
      if (t.alternate !== r) throw Error(S(190));
    }
    if (t.tag !== 3) throw Error(S(188));
    return t.stateNode.current === t ? A2 : e;
  }
  function sB(A2) {
    return A2 = iw(A2), A2 !== null ? iB(A2) : null;
  }
  function iB(A2) {
    if (A2.tag === 5 || A2.tag === 6) return A2;
    for (A2 = A2.child; A2 !== null; ) {
      var e = iB(A2);
      if (e !== null) return e;
      A2 = A2.sibling;
    }
    return null;
  }
  var aB = oe.unstable_scheduleCallback;
  var oc = oe.unstable_cancelCallback;
  var aw = oe.unstable_shouldYield;
  var lw = oe.unstable_requestPaint;
  var FA = oe.unstable_now;
  var ow = oe.unstable_getCurrentPriorityLevel;
  var Zo = oe.unstable_ImmediatePriority;
  var lB = oe.unstable_UserBlockingPriority;
  var di = oe.unstable_NormalPriority;
  var uw = oe.unstable_LowPriority;
  var oB = oe.unstable_IdlePriority;
  var Ji = null;
  var Re = null;
  function cw(A2) {
    if (Re && typeof Re.onCommitFiberRoot == "function") try {
      Re.onCommitFiberRoot(Ji, A2, void 0, (A2.current.flags & 128) === 128);
    } catch {
    }
  }
  var Se = Math.clz32 ? Math.clz32 : Bw;
  var fw = Math.log;
  var dw = Math.LN2;
  function Bw(A2) {
    return A2 >>>= 0, A2 === 0 ? 32 : 31 - (fw(A2) / dw | 0) | 0;
  }
  var os = 64;
  var us = 4194304;
  function an(A2) {
    switch (A2 & -A2) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return A2 & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return A2 & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return A2;
    }
  }
  function Bi(A2, e) {
    var t = A2.pendingLanes;
    if (t === 0) return 0;
    var r = 0, n = A2.suspendedLanes, s = A2.pingedLanes, i = t & 268435455;
    if (i !== 0) {
      var l2 = i & ~n;
      l2 !== 0 ? r = an(l2) : (s &= i, s !== 0 && (r = an(s)));
    } else i = t & ~n, i !== 0 ? r = an(i) : s !== 0 && (r = an(s));
    if (r === 0) return 0;
    if (e !== 0 && e !== r && !(e & n) && (n = r & -r, s = e & -e, n >= s || n === 16 && (s & 4194240) !== 0)) return e;
    if (r & 4 && (r |= t & 16), e = A2.entangledLanes, e !== 0) for (A2 = A2.entanglements, e &= r; 0 < e; ) t = 31 - Se(e), n = 1 << t, r |= A2[t], e &= ~n;
    return r;
  }
  function gw(A2, e) {
    switch (A2) {
      case 1:
      case 2:
      case 4:
        return e + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function hw(A2, e) {
    for (var t = A2.suspendedLanes, r = A2.pingedLanes, n = A2.expirationTimes, s = A2.pendingLanes; 0 < s; ) {
      var i = 31 - Se(s), l2 = 1 << i, a = n[i];
      a === -1 ? (!(l2 & t) || l2 & r) && (n[i] = gw(l2, e)) : a <= e && (A2.expiredLanes |= l2), s &= ~l2;
    }
  }
  function kl(A2) {
    return A2 = A2.pendingLanes & -1073741825, A2 !== 0 ? A2 : A2 & 1073741824 ? 1073741824 : 0;
  }
  function uB() {
    var A2 = os;
    return os <<= 1, !(os & 4194240) && (os = 64), A2;
  }
  function Ea(A2) {
    for (var e = [], t = 0; 31 > t; t++) e.push(A2);
    return e;
  }
  function $n(A2, e, t) {
    A2.pendingLanes |= e, e !== 536870912 && (A2.suspendedLanes = 0, A2.pingedLanes = 0), A2 = A2.eventTimes, e = 31 - Se(e), A2[e] = t;
  }
  function ww(A2, e) {
    var t = A2.pendingLanes & ~e;
    A2.pendingLanes = e, A2.suspendedLanes = 0, A2.pingedLanes = 0, A2.expiredLanes &= e, A2.mutableReadLanes &= e, A2.entangledLanes &= e, e = A2.entanglements;
    var r = A2.eventTimes;
    for (A2 = A2.expirationTimes; 0 < t; ) {
      var n = 31 - Se(t), s = 1 << n;
      e[n] = 0, r[n] = -1, A2[n] = -1, t &= ~s;
    }
  }
  function $o(A2, e) {
    var t = A2.entangledLanes |= e;
    for (A2 = A2.entanglements; t; ) {
      var r = 31 - Se(t), n = 1 << r;
      n & e | A2[r] & e && (A2[r] |= e), t &= ~n;
    }
  }
  var tA = 0;
  function cB(A2) {
    return A2 &= -A2, 1 < A2 ? 4 < A2 ? A2 & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var fB;
  var qo;
  var dB;
  var BB;
  var gB;
  var Tl = false;
  var cs = [];
  var pt = null;
  var mt = null;
  var Ct = null;
  var kn = /* @__PURE__ */ new Map();
  var Tn = /* @__PURE__ */ new Map();
  var ct = [];
  var pw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function uc(A2, e) {
    switch (A2) {
      case "focusin":
      case "focusout":
        pt = null;
        break;
      case "dragenter":
      case "dragleave":
        mt = null;
        break;
      case "mouseover":
      case "mouseout":
        Ct = null;
        break;
      case "pointerover":
      case "pointerout":
        kn.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tn.delete(e.pointerId);
    }
  }
  function zr(A2, e, t, r, n, s) {
    return A2 === null || A2.nativeEvent !== s ? (A2 = { blockedOn: e, domEventName: t, eventSystemFlags: r, nativeEvent: s, targetContainers: [n] }, e !== null && (e = As(e), e !== null && qo(e)), A2) : (A2.eventSystemFlags |= r, e = A2.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), A2);
  }
  function mw(A2, e, t, r, n) {
    switch (e) {
      case "focusin":
        return pt = zr(pt, A2, e, t, r, n), true;
      case "dragenter":
        return mt = zr(mt, A2, e, t, r, n), true;
      case "mouseover":
        return Ct = zr(Ct, A2, e, t, r, n), true;
      case "pointerover":
        var s = n.pointerId;
        return kn.set(s, zr(kn.get(s) || null, A2, e, t, r, n)), true;
      case "gotpointercapture":
        return s = n.pointerId, Tn.set(s, zr(Tn.get(s) || null, A2, e, t, r, n)), true;
    }
    return false;
  }
  function hB(A2) {
    var e = Ot(A2.target);
    if (e !== null) {
      var t = er(e);
      if (t !== null) {
        if (e = t.tag, e === 13) {
          if (e = nB(t), e !== null) {
            A2.blockedOn = e, gB(A2.priority, function() {
              dB(t);
            });
            return;
          }
        } else if (e === 3 && t.stateNode.current.memoizedState.isDehydrated) {
          A2.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
          return;
        }
      }
    }
    A2.blockedOn = null;
  }
  function Js(A2) {
    if (A2.blockedOn !== null) return false;
    for (var e = A2.targetContainers; 0 < e.length; ) {
      var t = Kl(A2.domEventName, A2.eventSystemFlags, e[0], A2.nativeEvent);
      if (t === null) {
        t = A2.nativeEvent;
        var r = new t.constructor(t.type, t);
        Sl = r, t.target.dispatchEvent(r), Sl = null;
      } else return e = As(t), e !== null && qo(e), A2.blockedOn = t, false;
      e.shift();
    }
    return true;
  }
  function cc(A2, e, t) {
    Js(A2) && t.delete(e);
  }
  function Cw() {
    Tl = false, pt !== null && Js(pt) && (pt = null), mt !== null && Js(mt) && (mt = null), Ct !== null && Js(Ct) && (Ct = null), kn.forEach(cc), Tn.forEach(cc);
  }
  function Jr(A2, e) {
    A2.blockedOn === e && (A2.blockedOn = null, Tl || (Tl = true, oe.unstable_scheduleCallback(oe.unstable_NormalPriority, Cw)));
  }
  function Kn(A2) {
    function e(n) {
      return Jr(n, A2);
    }
    if (0 < cs.length) {
      Jr(cs[0], A2);
      for (var t = 1; t < cs.length; t++) {
        var r = cs[t];
        r.blockedOn === A2 && (r.blockedOn = null);
      }
    }
    for (pt !== null && Jr(pt, A2), mt !== null && Jr(mt, A2), Ct !== null && Jr(Ct, A2), kn.forEach(e), Tn.forEach(e), t = 0; t < ct.length; t++) r = ct[t], r.blockedOn === A2 && (r.blockedOn = null);
    for (; 0 < ct.length && (t = ct[0], t.blockedOn === null); ) hB(t), t.blockedOn === null && ct.shift();
  }
  var Sr = rt.ReactCurrentBatchConfig;
  var gi = true;
  function Qw(A2, e, t, r) {
    var n = tA, s = Sr.transition;
    Sr.transition = null;
    try {
      tA = 1, Au(A2, e, t, r);
    } finally {
      tA = n, Sr.transition = s;
    }
  }
  function vw(A2, e, t, r) {
    var n = tA, s = Sr.transition;
    Sr.transition = null;
    try {
      tA = 4, Au(A2, e, t, r);
    } finally {
      tA = n, Sr.transition = s;
    }
  }
  function Au(A2, e, t, r) {
    if (gi) {
      var n = Kl(A2, e, t, r);
      if (n === null) Da(A2, e, r, hi, t), uc(A2, r);
      else if (mw(n, A2, e, t, r)) r.stopPropagation();
      else if (uc(A2, r), e & 4 && -1 < pw.indexOf(A2)) {
        for (; n !== null; ) {
          var s = As(n);
          if (s !== null && fB(s), s = Kl(A2, e, t, r), s === null && Da(A2, e, r, hi, t), s === n) break;
          n = s;
        }
        n !== null && r.stopPropagation();
      } else Da(A2, e, r, null, t);
    }
  }
  var hi = null;
  function Kl(A2, e, t, r) {
    if (hi = null, A2 = Yo(r), A2 = Ot(A2), A2 !== null) if (e = er(A2), e === null) A2 = null;
    else if (t = e.tag, t === 13) {
      if (A2 = nB(e), A2 !== null) return A2;
      A2 = null;
    } else if (t === 3) {
      if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
      A2 = null;
    } else e !== A2 && (A2 = null);
    return hi = A2, null;
  }
  function wB(A2) {
    switch (A2) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ow()) {
          case Zo:
            return 1;
          case lB:
            return 4;
          case di:
          case uw:
            return 16;
          case oB:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var dt = null;
  var eu = null;
  var Ys = null;
  function pB() {
    if (Ys) return Ys;
    var A2, e = eu, t = e.length, r, n = "value" in dt ? dt.value : dt.textContent, s = n.length;
    for (A2 = 0; A2 < t && e[A2] === n[A2]; A2++) ;
    var i = t - A2;
    for (r = 1; r <= i && e[t - r] === n[s - r]; r++) ;
    return Ys = n.slice(A2, 1 < r ? 1 - r : void 0);
  }
  function Zs(A2) {
    var e = A2.keyCode;
    return "charCode" in A2 ? (A2 = A2.charCode, A2 === 0 && e === 13 && (A2 = 13)) : A2 = e, A2 === 10 && (A2 = 13), 32 <= A2 || A2 === 13 ? A2 : 0;
  }
  function fs() {
    return true;
  }
  function fc() {
    return false;
  }
  function ce(A2) {
    function e(t, r, n, s, i) {
      this._reactName = t, this._targetInst = n, this.type = r, this.nativeEvent = s, this.target = i, this.currentTarget = null;
      for (var l2 in A2) A2.hasOwnProperty(l2) && (t = A2[l2], this[l2] = t ? t(s) : s[l2]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === false) ? fs : fc, this.isPropagationStopped = fc, this;
    }
    return pA(e.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var t = this.nativeEvent;
      t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = false), this.isDefaultPrevented = fs);
    }, stopPropagation: function() {
      var t = this.nativeEvent;
      t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = true), this.isPropagationStopped = fs);
    }, persist: function() {
    }, isPersistent: fs }), e;
  }
  var _r = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(A2) {
    return A2.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 };
  var tu = ce(_r);
  var qn = pA({}, _r, { view: 0, detail: 0 });
  var Uw = ce(qn);
  var Ia;
  var Ha;
  var Yr;
  var Yi = pA({}, qn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ru, button: 0, buttons: 0, relatedTarget: function(A2) {
    return A2.relatedTarget === void 0 ? A2.fromElement === A2.srcElement ? A2.toElement : A2.fromElement : A2.relatedTarget;
  }, movementX: function(A2) {
    return "movementX" in A2 ? A2.movementX : (A2 !== Yr && (Yr && A2.type === "mousemove" ? (Ia = A2.screenX - Yr.screenX, Ha = A2.screenY - Yr.screenY) : Ha = Ia = 0, Yr = A2), Ia);
  }, movementY: function(A2) {
    return "movementY" in A2 ? A2.movementY : Ha;
  } });
  var dc = ce(Yi);
  var Fw = pA({}, Yi, { dataTransfer: 0 });
  var xw = ce(Fw);
  var yw = pA({}, qn, { relatedTarget: 0 });
  var Sa = ce(yw);
  var Ew = pA({}, _r, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
  var Iw = ce(Ew);
  var Hw = pA({}, _r, { clipboardData: function(A2) {
    return "clipboardData" in A2 ? A2.clipboardData : window.clipboardData;
  } });
  var Sw = ce(Hw);
  var bw = pA({}, _r, { data: 0 });
  var Bc = ce(bw);
  var Lw = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" };
  var Nw = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" };
  var kw = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Tw(A2) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(A2) : (A2 = kw[A2]) ? !!e[A2] : false;
  }
  function ru() {
    return Tw;
  }
  var Kw = pA({}, qn, { key: function(A2) {
    if (A2.key) {
      var e = Lw[A2.key] || A2.key;
      if (e !== "Unidentified") return e;
    }
    return A2.type === "keypress" ? (A2 = Zs(A2), A2 === 13 ? "Enter" : String.fromCharCode(A2)) : A2.type === "keydown" || A2.type === "keyup" ? Nw[A2.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ru, charCode: function(A2) {
    return A2.type === "keypress" ? Zs(A2) : 0;
  }, keyCode: function(A2) {
    return A2.type === "keydown" || A2.type === "keyup" ? A2.keyCode : 0;
  }, which: function(A2) {
    return A2.type === "keypress" ? Zs(A2) : A2.type === "keydown" || A2.type === "keyup" ? A2.keyCode : 0;
  } });
  var Dw = ce(Kw);
  var Mw = pA({}, Yi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
  var gc = ce(Mw);
  var Rw = pA({}, qn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ru });
  var Ow = ce(Rw);
  var jw = pA({}, _r, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
  var Pw = ce(jw);
  var _w = pA({}, Yi, { deltaX: function(A2) {
    return "deltaX" in A2 ? A2.deltaX : "wheelDeltaX" in A2 ? -A2.wheelDeltaX : 0;
  }, deltaY: function(A2) {
    return "deltaY" in A2 ? A2.deltaY : "wheelDeltaY" in A2 ? -A2.wheelDeltaY : "wheelDelta" in A2 ? -A2.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 });
  var Vw = ce(_w);
  var Gw = [9, 13, 27, 32];
  var nu = $e && "CompositionEvent" in window;
  var pn = null;
  $e && "documentMode" in document && (pn = document.documentMode);
  var Xw = $e && "TextEvent" in window && !pn;
  var mB = $e && (!nu || pn && 8 < pn && 11 >= pn);
  var hc = " ";
  var wc = false;
  function CB(A2, e) {
    switch (A2) {
      case "keyup":
        return Gw.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function QB(A2) {
    return A2 = A2.detail, typeof A2 == "object" && "data" in A2 ? A2.data : null;
  }
  var gr = false;
  function Ww(A2, e) {
    switch (A2) {
      case "compositionend":
        return QB(e);
      case "keypress":
        return e.which !== 32 ? null : (wc = true, hc);
      case "textInput":
        return A2 = e.data, A2 === hc && wc ? null : A2;
      default:
        return null;
    }
  }
  function zw(A2, e) {
    if (gr) return A2 === "compositionend" || !nu && CB(A2, e) ? (A2 = pB(), Ys = eu = dt = null, gr = false, A2) : null;
    switch (A2) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return mB && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Jw = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function pc(A2) {
    var e = A2 && A2.nodeName && A2.nodeName.toLowerCase();
    return e === "input" ? !!Jw[A2.type] : e === "textarea";
  }
  function vB(A2, e, t, r) {
    qd(r), e = wi(e, "onChange"), 0 < e.length && (t = new tu("onChange", "change", null, t, r), A2.push({ event: t, listeners: e }));
  }
  var mn = null;
  var Dn = null;
  function Yw(A2) {
    NB(A2, 0);
  }
  function Zi(A2) {
    var e = pr(A2);
    if (Xd(e)) return A2;
  }
  function Zw(A2, e) {
    if (A2 === "change") return e;
  }
  var UB = false;
  if ($e) {
    if ($e) {
      La = "oninput" in document;
      if (!La) {
        mc = document.createElement("div");
        mc.setAttribute("oninput", "return;"), La = typeof mc.oninput == "function";
      }
      ba = La;
    } else ba = false;
    UB = ba && (!document.documentMode || 9 < document.documentMode);
  }
  var ba;
  var La;
  var mc;
  function Cc() {
    mn && (mn.detachEvent("onpropertychange", FB), Dn = mn = null);
  }
  function FB(A2) {
    if (A2.propertyName === "value" && Zi(Dn)) {
      var e = [];
      vB(e, Dn, A2, Yo(A2)), rB(Yw, e);
    }
  }
  function $w(A2, e, t) {
    A2 === "focusin" ? (Cc(), mn = e, Dn = t, mn.attachEvent("onpropertychange", FB)) : A2 === "focusout" && Cc();
  }
  function qw(A2) {
    if (A2 === "selectionchange" || A2 === "keyup" || A2 === "keydown") return Zi(Dn);
  }
  function Ap(A2, e) {
    if (A2 === "click") return Zi(e);
  }
  function ep(A2, e) {
    if (A2 === "input" || A2 === "change") return Zi(e);
  }
  function tp(A2, e) {
    return A2 === e && (A2 !== 0 || 1 / A2 === 1 / e) || A2 !== A2 && e !== e;
  }
  var Le = typeof Object.is == "function" ? Object.is : tp;
  function Mn(A2, e) {
    if (Le(A2, e)) return true;
    if (typeof A2 != "object" || A2 === null || typeof e != "object" || e === null) return false;
    var t = Object.keys(A2), r = Object.keys(e);
    if (t.length !== r.length) return false;
    for (r = 0; r < t.length; r++) {
      var n = t[r];
      if (!pl.call(e, n) || !Le(A2[n], e[n])) return false;
    }
    return true;
  }
  function Qc(A2) {
    for (; A2 && A2.firstChild; ) A2 = A2.firstChild;
    return A2;
  }
  function vc(A2, e) {
    var t = Qc(A2);
    A2 = 0;
    for (var r; t; ) {
      if (t.nodeType === 3) {
        if (r = A2 + t.textContent.length, A2 <= e && r >= e) return { node: t, offset: e - A2 };
        A2 = r;
      }
      A: {
        for (; t; ) {
          if (t.nextSibling) {
            t = t.nextSibling;
            break A;
          }
          t = t.parentNode;
        }
        t = void 0;
      }
      t = Qc(t);
    }
  }
  function xB(A2, e) {
    return A2 && e ? A2 === e ? true : A2 && A2.nodeType === 3 ? false : e && e.nodeType === 3 ? xB(A2, e.parentNode) : "contains" in A2 ? A2.contains(e) : A2.compareDocumentPosition ? !!(A2.compareDocumentPosition(e) & 16) : false : false;
  }
  function yB() {
    for (var A2 = window, e = ui(); e instanceof A2.HTMLIFrameElement; ) {
      try {
        var t = typeof e.contentWindow.location.href == "string";
      } catch {
        t = false;
      }
      if (t) A2 = e.contentWindow;
      else break;
      e = ui(A2.document);
    }
    return e;
  }
  function su(A2) {
    var e = A2 && A2.nodeName && A2.nodeName.toLowerCase();
    return e && (e === "input" && (A2.type === "text" || A2.type === "search" || A2.type === "tel" || A2.type === "url" || A2.type === "password") || e === "textarea" || A2.contentEditable === "true");
  }
  function rp(A2) {
    var e = yB(), t = A2.focusedElem, r = A2.selectionRange;
    if (e !== t && t && t.ownerDocument && xB(t.ownerDocument.documentElement, t)) {
      if (r !== null && su(t)) {
        if (e = r.start, A2 = r.end, A2 === void 0 && (A2 = e), "selectionStart" in t) t.selectionStart = e, t.selectionEnd = Math.min(A2, t.value.length);
        else if (A2 = (e = t.ownerDocument || document) && e.defaultView || window, A2.getSelection) {
          A2 = A2.getSelection();
          var n = t.textContent.length, s = Math.min(r.start, n);
          r = r.end === void 0 ? s : Math.min(r.end, n), !A2.extend && s > r && (n = r, r = s, s = n), n = vc(t, s);
          var i = vc(t, r);
          n && i && (A2.rangeCount !== 1 || A2.anchorNode !== n.node || A2.anchorOffset !== n.offset || A2.focusNode !== i.node || A2.focusOffset !== i.offset) && (e = e.createRange(), e.setStart(n.node, n.offset), A2.removeAllRanges(), s > r ? (A2.addRange(e), A2.extend(i.node, i.offset)) : (e.setEnd(i.node, i.offset), A2.addRange(e)));
        }
      }
      for (e = [], A2 = t; A2 = A2.parentNode; ) A2.nodeType === 1 && e.push({ element: A2, left: A2.scrollLeft, top: A2.scrollTop });
      for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++) A2 = e[t], A2.element.scrollLeft = A2.left, A2.element.scrollTop = A2.top;
    }
  }
  var np = $e && "documentMode" in document && 11 >= document.documentMode;
  var hr = null;
  var Dl = null;
  var Cn = null;
  var Ml = false;
  function Uc(A2, e, t) {
    var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
    Ml || hr == null || hr !== ui(r) || (r = hr, "selectionStart" in r && su(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Cn && Mn(Cn, r) || (Cn = r, r = wi(Dl, "onSelect"), 0 < r.length && (e = new tu("onSelect", "select", null, e, t), A2.push({ event: e, listeners: r }), e.target = hr)));
  }
  function ds(A2, e) {
    var t = {};
    return t[A2.toLowerCase()] = e.toLowerCase(), t["Webkit" + A2] = "webkit" + e, t["Moz" + A2] = "moz" + e, t;
  }
  var wr = { animationend: ds("Animation", "AnimationEnd"), animationiteration: ds("Animation", "AnimationIteration"), animationstart: ds("Animation", "AnimationStart"), transitionend: ds("Transition", "TransitionEnd") };
  var Na = {};
  var EB = {};
  $e && (EB = document.createElement("div").style, "AnimationEvent" in window || (delete wr.animationend.animation, delete wr.animationiteration.animation, delete wr.animationstart.animation), "TransitionEvent" in window || delete wr.transitionend.transition);
  function $i(A2) {
    if (Na[A2]) return Na[A2];
    if (!wr[A2]) return A2;
    var e = wr[A2], t;
    for (t in e) if (e.hasOwnProperty(t) && t in EB) return Na[A2] = e[t];
    return A2;
  }
  var IB = $i("animationend");
  var HB = $i("animationiteration");
  var SB = $i("animationstart");
  var bB = $i("transitionend");
  var LB = /* @__PURE__ */ new Map();
  var Fc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Lt(A2, e) {
    LB.set(A2, e), Ar(e, [A2]);
  }
  for (ka = 0; ka < Fc.length; ka++) {
    Ta = Fc[ka], sp = Ta.toLowerCase(), ip = Ta[0].toUpperCase() + Ta.slice(1);
    Lt(sp, "on" + ip);
  }
  var Ta;
  var sp;
  var ip;
  var ka;
  Lt(IB, "onAnimationEnd");
  Lt(HB, "onAnimationIteration");
  Lt(SB, "onAnimationStart");
  Lt("dblclick", "onDoubleClick");
  Lt("focusin", "onFocus");
  Lt("focusout", "onBlur");
  Lt(bB, "onTransitionEnd");
  kr("onMouseEnter", ["mouseout", "mouseover"]);
  kr("onMouseLeave", ["mouseout", "mouseover"]);
  kr("onPointerEnter", ["pointerout", "pointerover"]);
  kr("onPointerLeave", ["pointerout", "pointerover"]);
  Ar("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  Ar("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  Ar("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  Ar("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  Ar("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  Ar("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
  var ap = new Set("cancel close invalid load scroll toggle".split(" ").concat(ln));
  function xc(A2, e, t) {
    var r = A2.type || "unknown-event";
    A2.currentTarget = t, sw(r, e, void 0, A2), A2.currentTarget = null;
  }
  function NB(A2, e) {
    e = (e & 4) !== 0;
    for (var t = 0; t < A2.length; t++) {
      var r = A2[t], n = r.event;
      r = r.listeners;
      A: {
        var s = void 0;
        if (e) for (var i = r.length - 1; 0 <= i; i--) {
          var l2 = r[i], a = l2.instance, o = l2.currentTarget;
          if (l2 = l2.listener, a !== s && n.isPropagationStopped()) break A;
          xc(n, l2, o), s = a;
        }
        else for (i = 0; i < r.length; i++) {
          if (l2 = r[i], a = l2.instance, o = l2.currentTarget, l2 = l2.listener, a !== s && n.isPropagationStopped()) break A;
          xc(n, l2, o), s = a;
        }
      }
    }
    if (fi) throw A2 = Nl, fi = false, Nl = null, A2;
  }
  function oA(A2, e) {
    var t = e[_l];
    t === void 0 && (t = e[_l] = /* @__PURE__ */ new Set());
    var r = A2 + "__bubble";
    t.has(r) || (kB(e, A2, 2, false), t.add(r));
  }
  function Ka(A2, e, t) {
    var r = 0;
    e && (r |= 4), kB(t, A2, r, e);
  }
  var Bs = "_reactListening" + Math.random().toString(36).slice(2);
  function Rn(A2) {
    if (!A2[Bs]) {
      A2[Bs] = true, jd.forEach(function(t) {
        t !== "selectionchange" && (ap.has(t) || Ka(t, false, A2), Ka(t, true, A2));
      });
      var e = A2.nodeType === 9 ? A2 : A2.ownerDocument;
      e === null || e[Bs] || (e[Bs] = true, Ka("selectionchange", false, e));
    }
  }
  function kB(A2, e, t, r) {
    switch (wB(e)) {
      case 1:
        var n = Qw;
        break;
      case 4:
        n = vw;
        break;
      default:
        n = Au;
    }
    t = n.bind(null, e, t, A2), n = void 0, !Ll || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = true), r ? n !== void 0 ? A2.addEventListener(e, t, { capture: true, passive: n }) : A2.addEventListener(e, t, true) : n !== void 0 ? A2.addEventListener(e, t, { passive: n }) : A2.addEventListener(e, t, false);
  }
  function Da(A2, e, t, r, n) {
    var s = r;
    if (!(e & 1) && !(e & 2) && r !== null) A: for (; ; ) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var l2 = r.stateNode.containerInfo;
        if (l2 === n || l2.nodeType === 8 && l2.parentNode === n) break;
        if (i === 4) for (i = r.return; i !== null; ) {
          var a = i.tag;
          if ((a === 3 || a === 4) && (a = i.stateNode.containerInfo, a === n || a.nodeType === 8 && a.parentNode === n)) return;
          i = i.return;
        }
        for (; l2 !== null; ) {
          if (i = Ot(l2), i === null) return;
          if (a = i.tag, a === 5 || a === 6) {
            r = s = i;
            continue A;
          }
          l2 = l2.parentNode;
        }
      }
      r = r.return;
    }
    rB(function() {
      var o = s, c = Yo(t), f = [];
      A: {
        var d = LB.get(A2);
        if (d !== void 0) {
          var m2 = tu, w2 = A2;
          switch (A2) {
            case "keypress":
              if (Zs(t) === 0) break A;
            case "keydown":
            case "keyup":
              m2 = Dw;
              break;
            case "focusin":
              w2 = "focus", m2 = Sa;
              break;
            case "focusout":
              w2 = "blur", m2 = Sa;
              break;
            case "beforeblur":
            case "afterblur":
              m2 = Sa;
              break;
            case "click":
              if (t.button === 2) break A;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              m2 = dc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              m2 = xw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              m2 = Ow;
              break;
            case IB:
            case HB:
            case SB:
              m2 = Iw;
              break;
            case bB:
              m2 = Pw;
              break;
            case "scroll":
              m2 = Uw;
              break;
            case "wheel":
              m2 = Vw;
              break;
            case "copy":
            case "cut":
            case "paste":
              m2 = Sw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              m2 = gc;
          }
          var C2 = (e & 4) !== 0, U = !C2 && A2 === "scroll", h = C2 ? d !== null ? d + "Capture" : null : d;
          C2 = [];
          for (var B = o, p; B !== null; ) {
            p = B;
            var v2 = p.stateNode;
            if (p.tag === 5 && v2 !== null && (p = v2, h !== null && (v2 = Nn(B, h), v2 != null && C2.push(On(B, v2, p)))), U) break;
            B = B.return;
          }
          0 < C2.length && (d = new m2(d, w2, null, t, c), f.push({ event: d, listeners: C2 }));
        }
      }
      if (!(e & 7)) {
        A: {
          if (d = A2 === "mouseover" || A2 === "pointerover", m2 = A2 === "mouseout" || A2 === "pointerout", d && t !== Sl && (w2 = t.relatedTarget || t.fromElement) && (Ot(w2) || w2[qe])) break A;
          if ((m2 || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, m2 ? (w2 = t.relatedTarget || t.toElement, m2 = o, w2 = w2 ? Ot(w2) : null, w2 !== null && (U = er(w2), w2 !== U || w2.tag !== 5 && w2.tag !== 6) && (w2 = null)) : (m2 = null, w2 = o), m2 !== w2)) {
            if (C2 = dc, v2 = "onMouseLeave", h = "onMouseEnter", B = "mouse", (A2 === "pointerout" || A2 === "pointerover") && (C2 = gc, v2 = "onPointerLeave", h = "onPointerEnter", B = "pointer"), U = m2 == null ? d : pr(m2), p = w2 == null ? d : pr(w2), d = new C2(v2, B + "leave", m2, t, c), d.target = U, d.relatedTarget = p, v2 = null, Ot(c) === o && (C2 = new C2(h, B + "enter", w2, t, c), C2.target = p, C2.relatedTarget = U, v2 = C2), U = v2, m2 && w2) e: {
              for (C2 = m2, h = w2, B = 0, p = C2; p; p = tr(p)) B++;
              for (p = 0, v2 = h; v2; v2 = tr(v2)) p++;
              for (; 0 < B - p; ) C2 = tr(C2), B--;
              for (; 0 < p - B; ) h = tr(h), p--;
              for (; B--; ) {
                if (C2 === h || h !== null && C2 === h.alternate) break e;
                C2 = tr(C2), h = tr(h);
              }
              C2 = null;
            }
            else C2 = null;
            m2 !== null && yc(f, d, m2, C2, false), w2 !== null && U !== null && yc(f, U, w2, C2, true);
          }
        }
        A: {
          if (d = o ? pr(o) : window, m2 = d.nodeName && d.nodeName.toLowerCase(), m2 === "select" || m2 === "input" && d.type === "file") var x = Zw;
          else if (pc(d)) if (UB) x = ep;
          else {
            x = qw;
            var F = $w;
          }
          else (m2 = d.nodeName) && m2.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (x = Ap);
          if (x && (x = x(A2, o))) {
            vB(f, x, t, c);
            break A;
          }
          F && F(A2, d, o), A2 === "focusout" && (F = d._wrapperState) && F.controlled && d.type === "number" && xl(d, "number", d.value);
        }
        switch (F = o ? pr(o) : window, A2) {
          case "focusin":
            (pc(F) || F.contentEditable === "true") && (hr = F, Dl = o, Cn = null);
            break;
          case "focusout":
            Cn = Dl = hr = null;
            break;
          case "mousedown":
            Ml = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ml = false, Uc(f, t, c);
            break;
          case "selectionchange":
            if (np) break;
          case "keydown":
          case "keyup":
            Uc(f, t, c);
        }
        var I;
        if (nu) A: {
          switch (A2) {
            case "compositionstart":
              var H = "onCompositionStart";
              break A;
            case "compositionend":
              H = "onCompositionEnd";
              break A;
            case "compositionupdate":
              H = "onCompositionUpdate";
              break A;
          }
          H = void 0;
        }
        else gr ? CB(A2, t) && (H = "onCompositionEnd") : A2 === "keydown" && t.keyCode === 229 && (H = "onCompositionStart");
        H && (mB && t.locale !== "ko" && (gr || H !== "onCompositionStart" ? H === "onCompositionEnd" && gr && (I = pB()) : (dt = c, eu = "value" in dt ? dt.value : dt.textContent, gr = true)), F = wi(o, H), 0 < F.length && (H = new Bc(H, A2, null, t, c), f.push({ event: H, listeners: F }), I ? H.data = I : (I = QB(t), I !== null && (H.data = I)))), (I = Xw ? Ww(A2, t) : zw(A2, t)) && (o = wi(o, "onBeforeInput"), 0 < o.length && (c = new Bc("onBeforeInput", "beforeinput", null, t, c), f.push({ event: c, listeners: o }), c.data = I));
      }
      NB(f, e);
    });
  }
  function On(A2, e, t) {
    return { instance: A2, listener: e, currentTarget: t };
  }
  function wi(A2, e) {
    for (var t = e + "Capture", r = []; A2 !== null; ) {
      var n = A2, s = n.stateNode;
      n.tag === 5 && s !== null && (n = s, s = Nn(A2, t), s != null && r.unshift(On(A2, s, n)), s = Nn(A2, e), s != null && r.push(On(A2, s, n))), A2 = A2.return;
    }
    return r;
  }
  function tr(A2) {
    if (A2 === null) return null;
    do
      A2 = A2.return;
    while (A2 && A2.tag !== 5);
    return A2 || null;
  }
  function yc(A2, e, t, r, n) {
    for (var s = e._reactName, i = []; t !== null && t !== r; ) {
      var l2 = t, a = l2.alternate, o = l2.stateNode;
      if (a !== null && a === r) break;
      l2.tag === 5 && o !== null && (l2 = o, n ? (a = Nn(t, s), a != null && i.unshift(On(t, a, l2))) : n || (a = Nn(t, s), a != null && i.push(On(t, a, l2)))), t = t.return;
    }
    i.length !== 0 && A2.push({ event: e, listeners: i });
  }
  var lp = /\r\n?/g;
  var op = /\u0000|\uFFFD/g;
  function Ec(A2) {
    return (typeof A2 == "string" ? A2 : "" + A2).replace(lp, `
`).replace(op, "");
  }
  function gs(A2, e, t) {
    if (e = Ec(e), Ec(A2) !== e && t) throw Error(S(425));
  }
  function pi() {
  }
  var Rl = null;
  var Ol = null;
  function jl(A2, e) {
    return A2 === "textarea" || A2 === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Pl = typeof setTimeout == "function" ? setTimeout : void 0;
  var up = typeof clearTimeout == "function" ? clearTimeout : void 0;
  var Ic = typeof Promise == "function" ? Promise : void 0;
  var cp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ic < "u" ? function(A2) {
    return Ic.resolve(null).then(A2).catch(fp);
  } : Pl;
  function fp(A2) {
    setTimeout(function() {
      throw A2;
    });
  }
  function Ma(A2, e) {
    var t = e, r = 0;
    do {
      var n = t.nextSibling;
      if (A2.removeChild(t), n && n.nodeType === 8) if (t = n.data, t === "/$") {
        if (r === 0) {
          A2.removeChild(n), Kn(e);
          return;
        }
        r--;
      } else t !== "$" && t !== "$?" && t !== "$!" || r++;
      t = n;
    } while (t);
    Kn(e);
  }
  function Qt(A2) {
    for (; A2 != null; A2 = A2.nextSibling) {
      var e = A2.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = A2.data, e === "$" || e === "$!" || e === "$?") break;
        if (e === "/$") return null;
      }
    }
    return A2;
  }
  function Hc(A2) {
    A2 = A2.previousSibling;
    for (var e = 0; A2; ) {
      if (A2.nodeType === 8) {
        var t = A2.data;
        if (t === "$" || t === "$!" || t === "$?") {
          if (e === 0) return A2;
          e--;
        } else t === "/$" && e++;
      }
      A2 = A2.previousSibling;
    }
    return null;
  }
  var Vr = Math.random().toString(36).slice(2);
  var Me = "__reactFiber$" + Vr;
  var jn = "__reactProps$" + Vr;
  var qe = "__reactContainer$" + Vr;
  var _l = "__reactEvents$" + Vr;
  var dp = "__reactListeners$" + Vr;
  var Bp = "__reactHandles$" + Vr;
  function Ot(A2) {
    var e = A2[Me];
    if (e) return e;
    for (var t = A2.parentNode; t; ) {
      if (e = t[qe] || t[Me]) {
        if (t = e.alternate, e.child !== null || t !== null && t.child !== null) for (A2 = Hc(A2); A2 !== null; ) {
          if (t = A2[Me]) return t;
          A2 = Hc(A2);
        }
        return e;
      }
      A2 = t, t = A2.parentNode;
    }
    return null;
  }
  function As(A2) {
    return A2 = A2[Me] || A2[qe], !A2 || A2.tag !== 5 && A2.tag !== 6 && A2.tag !== 13 && A2.tag !== 3 ? null : A2;
  }
  function pr(A2) {
    if (A2.tag === 5 || A2.tag === 6) return A2.stateNode;
    throw Error(S(33));
  }
  function qi(A2) {
    return A2[jn] || null;
  }
  var Vl = [];
  var mr = -1;
  function Nt(A2) {
    return { current: A2 };
  }
  function cA(A2) {
    0 > mr || (A2.current = Vl[mr], Vl[mr] = null, mr--);
  }
  function lA(A2, e) {
    mr++, Vl[mr] = A2.current, A2.current = e;
  }
  var St = {};
  var VA = Nt(St);
  var Ae = Nt(false);
  var zt = St;
  function Tr(A2, e) {
    var t = A2.type.contextTypes;
    if (!t) return St;
    var r = A2.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === e) return r.__reactInternalMemoizedMaskedChildContext;
    var n = {}, s;
    for (s in t) n[s] = e[s];
    return r && (A2 = A2.stateNode, A2.__reactInternalMemoizedUnmaskedChildContext = e, A2.__reactInternalMemoizedMaskedChildContext = n), n;
  }
  function ee(A2) {
    return A2 = A2.childContextTypes, A2 != null;
  }
  function mi() {
    cA(Ae), cA(VA);
  }
  function Sc(A2, e, t) {
    if (VA.current !== St) throw Error(S(168));
    lA(VA, e), lA(Ae, t);
  }
  function TB(A2, e, t) {
    var r = A2.stateNode;
    if (e = e.childContextTypes, typeof r.getChildContext != "function") return t;
    r = r.getChildContext();
    for (var n in r) if (!(n in e)) throw Error(S(108, $0(A2) || "Unknown", n));
    return pA({}, t, r);
  }
  function Ci(A2) {
    return A2 = (A2 = A2.stateNode) && A2.__reactInternalMemoizedMergedChildContext || St, zt = VA.current, lA(VA, A2), lA(Ae, Ae.current), true;
  }
  function bc(A2, e, t) {
    var r = A2.stateNode;
    if (!r) throw Error(S(169));
    t ? (A2 = TB(A2, e, zt), r.__reactInternalMemoizedMergedChildContext = A2, cA(Ae), cA(VA), lA(VA, A2)) : cA(Ae), lA(Ae, t);
  }
  var We = null;
  var Aa = false;
  var Ra = false;
  function KB(A2) {
    We === null ? We = [A2] : We.push(A2);
  }
  function gp(A2) {
    Aa = true, KB(A2);
  }
  function kt() {
    if (!Ra && We !== null) {
      Ra = true;
      var A2 = 0, e = tA;
      try {
        var t = We;
        for (tA = 1; A2 < t.length; A2++) {
          var r = t[A2];
          do
            r = r(true);
          while (r !== null);
        }
        We = null, Aa = false;
      } catch (n) {
        throw We !== null && (We = We.slice(A2 + 1)), aB(Zo, kt), n;
      } finally {
        tA = e, Ra = false;
      }
    }
    return null;
  }
  var Cr = [];
  var Qr = 0;
  var Qi = null;
  var vi = 0;
  var de = [];
  var Be = 0;
  var Jt = null;
  var ze = 1;
  var Je = "";
  function Dt(A2, e) {
    Cr[Qr++] = vi, Cr[Qr++] = Qi, Qi = A2, vi = e;
  }
  function DB(A2, e, t) {
    de[Be++] = ze, de[Be++] = Je, de[Be++] = Jt, Jt = A2;
    var r = ze;
    A2 = Je;
    var n = 32 - Se(r) - 1;
    r &= ~(1 << n), t += 1;
    var s = 32 - Se(e) + n;
    if (30 < s) {
      var i = n - n % 5;
      s = (r & (1 << i) - 1).toString(32), r >>= i, n -= i, ze = 1 << 32 - Se(e) + n | t << n | r, Je = s + A2;
    } else ze = 1 << s | t << n | r, Je = A2;
  }
  function iu(A2) {
    A2.return !== null && (Dt(A2, 1), DB(A2, 1, 0));
  }
  function au(A2) {
    for (; A2 === Qi; ) Qi = Cr[--Qr], Cr[Qr] = null, vi = Cr[--Qr], Cr[Qr] = null;
    for (; A2 === Jt; ) Jt = de[--Be], de[Be] = null, Je = de[--Be], de[Be] = null, ze = de[--Be], de[Be] = null;
  }
  var le = null;
  var ae = null;
  var BA = false;
  var He = null;
  function MB(A2, e) {
    var t = he(5, null, null, 0);
    t.elementType = "DELETED", t.stateNode = e, t.return = A2, e = A2.deletions, e === null ? (A2.deletions = [t], A2.flags |= 16) : e.push(t);
  }
  function Lc(A2, e) {
    switch (A2.tag) {
      case 5:
        var t = A2.type;
        return e = e.nodeType !== 1 || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (A2.stateNode = e, le = A2, ae = Qt(e.firstChild), true) : false;
      case 6:
        return e = A2.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (A2.stateNode = e, le = A2, ae = null, true) : false;
      case 13:
        return e = e.nodeType !== 8 ? null : e, e !== null ? (t = Jt !== null ? { id: ze, overflow: Je } : null, A2.memoizedState = { dehydrated: e, treeContext: t, retryLane: 1073741824 }, t = he(18, null, null, 0), t.stateNode = e, t.return = A2, A2.child = t, le = A2, ae = null, true) : false;
      default:
        return false;
    }
  }
  function Gl(A2) {
    return (A2.mode & 1) !== 0 && (A2.flags & 128) === 0;
  }
  function Xl(A2) {
    if (BA) {
      var e = ae;
      if (e) {
        var t = e;
        if (!Lc(A2, e)) {
          if (Gl(A2)) throw Error(S(418));
          e = Qt(t.nextSibling);
          var r = le;
          e && Lc(A2, e) ? MB(r, t) : (A2.flags = A2.flags & -4097 | 2, BA = false, le = A2);
        }
      } else {
        if (Gl(A2)) throw Error(S(418));
        A2.flags = A2.flags & -4097 | 2, BA = false, le = A2;
      }
    }
  }
  function Nc(A2) {
    for (A2 = A2.return; A2 !== null && A2.tag !== 5 && A2.tag !== 3 && A2.tag !== 13; ) A2 = A2.return;
    le = A2;
  }
  function hs(A2) {
    if (A2 !== le) return false;
    if (!BA) return Nc(A2), BA = true, false;
    var e;
    if ((e = A2.tag !== 3) && !(e = A2.tag !== 5) && (e = A2.type, e = e !== "head" && e !== "body" && !jl(A2.type, A2.memoizedProps)), e && (e = ae)) {
      if (Gl(A2)) throw RB(), Error(S(418));
      for (; e; ) MB(A2, e), e = Qt(e.nextSibling);
    }
    if (Nc(A2), A2.tag === 13) {
      if (A2 = A2.memoizedState, A2 = A2 !== null ? A2.dehydrated : null, !A2) throw Error(S(317));
      A: {
        for (A2 = A2.nextSibling, e = 0; A2; ) {
          if (A2.nodeType === 8) {
            var t = A2.data;
            if (t === "/$") {
              if (e === 0) {
                ae = Qt(A2.nextSibling);
                break A;
              }
              e--;
            } else t !== "$" && t !== "$!" && t !== "$?" || e++;
          }
          A2 = A2.nextSibling;
        }
        ae = null;
      }
    } else ae = le ? Qt(A2.stateNode.nextSibling) : null;
    return true;
  }
  function RB() {
    for (var A2 = ae; A2; ) A2 = Qt(A2.nextSibling);
  }
  function Kr() {
    ae = le = null, BA = false;
  }
  function lu(A2) {
    He === null ? He = [A2] : He.push(A2);
  }
  var hp = rt.ReactCurrentBatchConfig;
  function Zr(A2, e, t) {
    if (A2 = t.ref, A2 !== null && typeof A2 != "function" && typeof A2 != "object") {
      if (t._owner) {
        if (t = t._owner, t) {
          if (t.tag !== 1) throw Error(S(309));
          var r = t.stateNode;
        }
        if (!r) throw Error(S(147, A2));
        var n = r, s = "" + A2;
        return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === s ? e.ref : (e = function(i) {
          var l2 = n.refs;
          i === null ? delete l2[s] : l2[s] = i;
        }, e._stringRef = s, e);
      }
      if (typeof A2 != "string") throw Error(S(284));
      if (!t._owner) throw Error(S(290, A2));
    }
    return A2;
  }
  function ws(A2, e) {
    throw A2 = Object.prototype.toString.call(e), Error(S(31, A2 === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : A2));
  }
  function kc(A2) {
    var e = A2._init;
    return e(A2._payload);
  }
  function OB(A2) {
    function e(h, B) {
      if (A2) {
        var p = h.deletions;
        p === null ? (h.deletions = [B], h.flags |= 16) : p.push(B);
      }
    }
    function t(h, B) {
      if (!A2) return null;
      for (; B !== null; ) e(h, B), B = B.sibling;
      return null;
    }
    function r(h, B) {
      for (h = /* @__PURE__ */ new Map(); B !== null; ) B.key !== null ? h.set(B.key, B) : h.set(B.index, B), B = B.sibling;
      return h;
    }
    function n(h, B) {
      return h = xt(h, B), h.index = 0, h.sibling = null, h;
    }
    function s(h, B, p) {
      return h.index = p, A2 ? (p = h.alternate, p !== null ? (p = p.index, p < B ? (h.flags |= 2, B) : p) : (h.flags |= 2, B)) : (h.flags |= 1048576, B);
    }
    function i(h) {
      return A2 && h.alternate === null && (h.flags |= 2), h;
    }
    function l2(h, B, p, v2) {
      return B === null || B.tag !== 6 ? (B = Xa(p, h.mode, v2), B.return = h, B) : (B = n(B, p), B.return = h, B);
    }
    function a(h, B, p, v2) {
      var x = p.type;
      return x === Br ? c(h, B, p.props.children, v2, p.key) : B !== null && (B.elementType === x || typeof x == "object" && x !== null && x.$$typeof === lt && kc(x) === B.type) ? (v2 = n(B, p.props), v2.ref = Zr(h, B, p), v2.return = h, v2) : (v2 = ni(p.type, p.key, p.props, null, h.mode, v2), v2.ref = Zr(h, B, p), v2.return = h, v2);
    }
    function o(h, B, p, v2) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== p.containerInfo || B.stateNode.implementation !== p.implementation ? (B = Wa(p, h.mode, v2), B.return = h, B) : (B = n(B, p.children || []), B.return = h, B);
    }
    function c(h, B, p, v2, x) {
      return B === null || B.tag !== 7 ? (B = Gt(p, h.mode, v2, x), B.return = h, B) : (B = n(B, p), B.return = h, B);
    }
    function f(h, B, p) {
      if (typeof B == "string" && B !== "" || typeof B == "number") return B = Xa("" + B, h.mode, p), B.return = h, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case is:
            return p = ni(B.type, B.key, B.props, null, h.mode, p), p.ref = Zr(h, null, B), p.return = h, p;
          case dr:
            return B = Wa(B, h.mode, p), B.return = h, B;
          case lt:
            var v2 = B._init;
            return f(h, v2(B._payload), p);
        }
        if (sn(B) || Xr(B)) return B = Gt(B, h.mode, p, null), B.return = h, B;
        ws(h, B);
      }
      return null;
    }
    function d(h, B, p, v2) {
      var x = B !== null ? B.key : null;
      if (typeof p == "string" && p !== "" || typeof p == "number") return x !== null ? null : l2(h, B, "" + p, v2);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case is:
            return p.key === x ? a(h, B, p, v2) : null;
          case dr:
            return p.key === x ? o(h, B, p, v2) : null;
          case lt:
            return x = p._init, d(h, B, x(p._payload), v2);
        }
        if (sn(p) || Xr(p)) return x !== null ? null : c(h, B, p, v2, null);
        ws(h, p);
      }
      return null;
    }
    function m2(h, B, p, v2, x) {
      if (typeof v2 == "string" && v2 !== "" || typeof v2 == "number") return h = h.get(p) || null, l2(B, h, "" + v2, x);
      if (typeof v2 == "object" && v2 !== null) {
        switch (v2.$$typeof) {
          case is:
            return h = h.get(v2.key === null ? p : v2.key) || null, a(B, h, v2, x);
          case dr:
            return h = h.get(v2.key === null ? p : v2.key) || null, o(B, h, v2, x);
          case lt:
            var F = v2._init;
            return m2(h, B, p, F(v2._payload), x);
        }
        if (sn(v2) || Xr(v2)) return h = h.get(p) || null, c(B, h, v2, x, null);
        ws(B, v2);
      }
      return null;
    }
    function w2(h, B, p, v2) {
      for (var x = null, F = null, I = B, H = B = 0, L = null; I !== null && H < p.length; H++) {
        I.index > H ? (L = I, I = null) : L = I.sibling;
        var K2 = d(h, I, p[H], v2);
        if (K2 === null) {
          I === null && (I = L);
          break;
        }
        A2 && I && K2.alternate === null && e(h, I), B = s(K2, B, H), F === null ? x = K2 : F.sibling = K2, F = K2, I = L;
      }
      if (H === p.length) return t(h, I), BA && Dt(h, H), x;
      if (I === null) {
        for (; H < p.length; H++) I = f(h, p[H], v2), I !== null && (B = s(I, B, H), F === null ? x = I : F.sibling = I, F = I);
        return BA && Dt(h, H), x;
      }
      for (I = r(h, I); H < p.length; H++) L = m2(I, h, H, p[H], v2), L !== null && (A2 && L.alternate !== null && I.delete(L.key === null ? H : L.key), B = s(L, B, H), F === null ? x = L : F.sibling = L, F = L);
      return A2 && I.forEach(function(_) {
        return e(h, _);
      }), BA && Dt(h, H), x;
    }
    function C2(h, B, p, v2) {
      var x = Xr(p);
      if (typeof x != "function") throw Error(S(150));
      if (p = x.call(p), p == null) throw Error(S(151));
      for (var F = x = null, I = B, H = B = 0, L = null, K2 = p.next(); I !== null && !K2.done; H++, K2 = p.next()) {
        I.index > H ? (L = I, I = null) : L = I.sibling;
        var _ = d(h, I, K2.value, v2);
        if (_ === null) {
          I === null && (I = L);
          break;
        }
        A2 && I && _.alternate === null && e(h, I), B = s(_, B, H), F === null ? x = _ : F.sibling = _, F = _, I = L;
      }
      if (K2.done) return t(h, I), BA && Dt(h, H), x;
      if (I === null) {
        for (; !K2.done; H++, K2 = p.next()) K2 = f(h, K2.value, v2), K2 !== null && (B = s(K2, B, H), F === null ? x = K2 : F.sibling = K2, F = K2);
        return BA && Dt(h, H), x;
      }
      for (I = r(h, I); !K2.done; H++, K2 = p.next()) K2 = m2(I, h, H, K2.value, v2), K2 !== null && (A2 && K2.alternate !== null && I.delete(K2.key === null ? H : K2.key), B = s(K2, B, H), F === null ? x = K2 : F.sibling = K2, F = K2);
      return A2 && I.forEach(function(rA) {
        return e(h, rA);
      }), BA && Dt(h, H), x;
    }
    function U(h, B, p, v2) {
      if (typeof p == "object" && p !== null && p.type === Br && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case is:
            A: {
              for (var x = p.key, F = B; F !== null; ) {
                if (F.key === x) {
                  if (x = p.type, x === Br) {
                    if (F.tag === 7) {
                      t(h, F.sibling), B = n(F, p.props.children), B.return = h, h = B;
                      break A;
                    }
                  } else if (F.elementType === x || typeof x == "object" && x !== null && x.$$typeof === lt && kc(x) === F.type) {
                    t(h, F.sibling), B = n(F, p.props), B.ref = Zr(h, F, p), B.return = h, h = B;
                    break A;
                  }
                  t(h, F);
                  break;
                } else e(h, F);
                F = F.sibling;
              }
              p.type === Br ? (B = Gt(p.props.children, h.mode, v2, p.key), B.return = h, h = B) : (v2 = ni(p.type, p.key, p.props, null, h.mode, v2), v2.ref = Zr(h, B, p), v2.return = h, h = v2);
            }
            return i(h);
          case dr:
            A: {
              for (F = p.key; B !== null; ) {
                if (B.key === F) if (B.tag === 4 && B.stateNode.containerInfo === p.containerInfo && B.stateNode.implementation === p.implementation) {
                  t(h, B.sibling), B = n(B, p.children || []), B.return = h, h = B;
                  break A;
                } else {
                  t(h, B);
                  break;
                }
                else e(h, B);
                B = B.sibling;
              }
              B = Wa(p, h.mode, v2), B.return = h, h = B;
            }
            return i(h);
          case lt:
            return F = p._init, U(h, B, F(p._payload), v2);
        }
        if (sn(p)) return w2(h, B, p, v2);
        if (Xr(p)) return C2(h, B, p, v2);
        ws(h, p);
      }
      return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, B !== null && B.tag === 6 ? (t(h, B.sibling), B = n(B, p), B.return = h, h = B) : (t(h, B), B = Xa(p, h.mode, v2), B.return = h, h = B), i(h)) : t(h, B);
    }
    return U;
  }
  var Dr = OB(true);
  var jB = OB(false);
  var Ui = Nt(null);
  var Fi = null;
  var vr = null;
  var ou = null;
  function uu() {
    ou = vr = Fi = null;
  }
  function cu(A2) {
    var e = Ui.current;
    cA(Ui), A2._currentValue = e;
  }
  function Wl(A2, e, t) {
    for (; A2 !== null; ) {
      var r = A2.alternate;
      if ((A2.childLanes & e) !== e ? (A2.childLanes |= e, r !== null && (r.childLanes |= e)) : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e), A2 === t) break;
      A2 = A2.return;
    }
  }
  function br(A2, e) {
    Fi = A2, ou = vr = null, A2 = A2.dependencies, A2 !== null && A2.firstContext !== null && (A2.lanes & e && (qA = true), A2.firstContext = null);
  }
  function Ce(A2) {
    var e = A2._currentValue;
    if (ou !== A2) if (A2 = { context: A2, memoizedValue: e, next: null }, vr === null) {
      if (Fi === null) throw Error(S(308));
      vr = A2, Fi.dependencies = { lanes: 0, firstContext: A2 };
    } else vr = vr.next = A2;
    return e;
  }
  var jt = null;
  function fu(A2) {
    jt === null ? jt = [A2] : jt.push(A2);
  }
  function PB(A2, e, t, r) {
    var n = e.interleaved;
    return n === null ? (t.next = t, fu(e)) : (t.next = n.next, n.next = t), e.interleaved = t, At(A2, r);
  }
  function At(A2, e) {
    A2.lanes |= e;
    var t = A2.alternate;
    for (t !== null && (t.lanes |= e), t = A2, A2 = A2.return; A2 !== null; ) A2.childLanes |= e, t = A2.alternate, t !== null && (t.childLanes |= e), t = A2, A2 = A2.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ot = false;
  function du(A2) {
    A2.updateQueue = { baseState: A2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function _B(A2, e) {
    A2 = A2.updateQueue, e.updateQueue === A2 && (e.updateQueue = { baseState: A2.baseState, firstBaseUpdate: A2.firstBaseUpdate, lastBaseUpdate: A2.lastBaseUpdate, shared: A2.shared, effects: A2.effects });
  }
  function Ye(A2, e) {
    return { eventTime: A2, lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function vt(A2, e, t) {
    var r = A2.updateQueue;
    if (r === null) return null;
    if (r = r.shared, Y & 2) {
      var n = r.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), r.pending = e, At(A2, t);
    }
    return n = r.interleaved, n === null ? (e.next = e, fu(r)) : (e.next = n.next, n.next = e), r.interleaved = e, At(A2, t);
  }
  function $s(A2, e, t) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (t & 4194240) !== 0)) {
      var r = e.lanes;
      r &= A2.pendingLanes, t |= r, e.lanes = t, $o(A2, t);
    }
  }
  function Tc(A2, e) {
    var t = A2.updateQueue, r = A2.alternate;
    if (r !== null && (r = r.updateQueue, t === r)) {
      var n = null, s = null;
      if (t = t.firstBaseUpdate, t !== null) {
        do {
          var i = { eventTime: t.eventTime, lane: t.lane, tag: t.tag, payload: t.payload, callback: t.callback, next: null };
          s === null ? n = s = i : s = s.next = i, t = t.next;
        } while (t !== null);
        s === null ? n = s = e : s = s.next = e;
      } else n = s = e;
      t = { baseState: r.baseState, firstBaseUpdate: n, lastBaseUpdate: s, shared: r.shared, effects: r.effects }, A2.updateQueue = t;
      return;
    }
    A2 = t.lastBaseUpdate, A2 === null ? t.firstBaseUpdate = e : A2.next = e, t.lastBaseUpdate = e;
  }
  function xi(A2, e, t, r) {
    var n = A2.updateQueue;
    ot = false;
    var s = n.firstBaseUpdate, i = n.lastBaseUpdate, l2 = n.shared.pending;
    if (l2 !== null) {
      n.shared.pending = null;
      var a = l2, o = a.next;
      a.next = null, i === null ? s = o : i.next = o, i = a;
      var c = A2.alternate;
      c !== null && (c = c.updateQueue, l2 = c.lastBaseUpdate, l2 !== i && (l2 === null ? c.firstBaseUpdate = o : l2.next = o, c.lastBaseUpdate = a));
    }
    if (s !== null) {
      var f = n.baseState;
      i = 0, c = o = a = null, l2 = s;
      do {
        var d = l2.lane, m2 = l2.eventTime;
        if ((r & d) === d) {
          c !== null && (c = c.next = { eventTime: m2, lane: 0, tag: l2.tag, payload: l2.payload, callback: l2.callback, next: null });
          A: {
            var w2 = A2, C2 = l2;
            switch (d = e, m2 = t, C2.tag) {
              case 1:
                if (w2 = C2.payload, typeof w2 == "function") {
                  f = w2.call(m2, f, d);
                  break A;
                }
                f = w2;
                break A;
              case 3:
                w2.flags = w2.flags & -65537 | 128;
              case 0:
                if (w2 = C2.payload, d = typeof w2 == "function" ? w2.call(m2, f, d) : w2, d == null) break A;
                f = pA({}, f, d);
                break A;
              case 2:
                ot = true;
            }
          }
          l2.callback !== null && l2.lane !== 0 && (A2.flags |= 64, d = n.effects, d === null ? n.effects = [l2] : d.push(l2));
        } else m2 = { eventTime: m2, lane: d, tag: l2.tag, payload: l2.payload, callback: l2.callback, next: null }, c === null ? (o = c = m2, a = f) : c = c.next = m2, i |= d;
        if (l2 = l2.next, l2 === null) {
          if (l2 = n.shared.pending, l2 === null) break;
          d = l2, l2 = d.next, d.next = null, n.lastBaseUpdate = d, n.shared.pending = null;
        }
      } while (true);
      if (c === null && (a = f), n.baseState = a, n.firstBaseUpdate = o, n.lastBaseUpdate = c, e = n.shared.interleaved, e !== null) {
        n = e;
        do
          i |= n.lane, n = n.next;
        while (n !== e);
      } else s === null && (n.shared.lanes = 0);
      Zt |= i, A2.lanes = i, A2.memoizedState = f;
    }
  }
  function Kc(A2, e, t) {
    if (A2 = e.effects, e.effects = null, A2 !== null) for (e = 0; e < A2.length; e++) {
      var r = A2[e], n = r.callback;
      if (n !== null) {
        if (r.callback = null, r = t, typeof n != "function") throw Error(S(191, n));
        n.call(r);
      }
    }
  }
  var es = {};
  var Oe = Nt(es);
  var Pn = Nt(es);
  var _n = Nt(es);
  function Pt(A2) {
    if (A2 === es) throw Error(S(174));
    return A2;
  }
  function Bu(A2, e) {
    switch (lA(_n, e), lA(Pn, A2), lA(Oe, es), A2 = e.nodeType, A2) {
      case 9:
      case 11:
        e = (e = e.documentElement) ? e.namespaceURI : El(null, "");
        break;
      default:
        A2 = A2 === 8 ? e.parentNode : e, e = A2.namespaceURI || null, A2 = A2.tagName, e = El(e, A2);
    }
    cA(Oe), lA(Oe, e);
  }
  function Mr() {
    cA(Oe), cA(Pn), cA(_n);
  }
  function VB(A2) {
    Pt(_n.current);
    var e = Pt(Oe.current), t = El(e, A2.type);
    e !== t && (lA(Pn, A2), lA(Oe, t));
  }
  function gu(A2) {
    Pn.current === A2 && (cA(Oe), cA(Pn));
  }
  var hA = Nt(0);
  function yi(A2) {
    for (var e = A2; e !== null; ) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t !== null && (t = t.dehydrated, t === null || t.data === "$?" || t.data === "$!")) return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
        if (e.flags & 128) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === A2) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === A2) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Oa = [];
  function hu() {
    for (var A2 = 0; A2 < Oa.length; A2++) Oa[A2]._workInProgressVersionPrimary = null;
    Oa.length = 0;
  }
  var qs = rt.ReactCurrentDispatcher;
  var ja = rt.ReactCurrentBatchConfig;
  var Yt = 0;
  var wA = null;
  var IA = null;
  var LA = null;
  var Ei = false;
  var Qn = false;
  var Vn = 0;
  var wp = 0;
  function RA() {
    throw Error(S(321));
  }
  function wu(A2, e) {
    if (e === null) return false;
    for (var t = 0; t < e.length && t < A2.length; t++) if (!Le(A2[t], e[t])) return false;
    return true;
  }
  function pu(A2, e, t, r, n, s) {
    if (Yt = s, wA = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, qs.current = A2 === null || A2.memoizedState === null ? Qp : vp, A2 = t(r, n), Qn) {
      s = 0;
      do {
        if (Qn = false, Vn = 0, 25 <= s) throw Error(S(301));
        s += 1, LA = IA = null, e.updateQueue = null, qs.current = Up, A2 = t(r, n);
      } while (Qn);
    }
    if (qs.current = Ii, e = IA !== null && IA.next !== null, Yt = 0, LA = IA = wA = null, Ei = false, e) throw Error(S(300));
    return A2;
  }
  function mu() {
    var A2 = Vn !== 0;
    return Vn = 0, A2;
  }
  function De() {
    var A2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return LA === null ? wA.memoizedState = LA = A2 : LA = LA.next = A2, LA;
  }
  function Qe() {
    if (IA === null) {
      var A2 = wA.alternate;
      A2 = A2 !== null ? A2.memoizedState : null;
    } else A2 = IA.next;
    var e = LA === null ? wA.memoizedState : LA.next;
    if (e !== null) LA = e, IA = A2;
    else {
      if (A2 === null) throw Error(S(310));
      IA = A2, A2 = { memoizedState: IA.memoizedState, baseState: IA.baseState, baseQueue: IA.baseQueue, queue: IA.queue, next: null }, LA === null ? wA.memoizedState = LA = A2 : LA = LA.next = A2;
    }
    return LA;
  }
  function Gn(A2, e) {
    return typeof e == "function" ? e(A2) : e;
  }
  function Pa(A2) {
    var e = Qe(), t = e.queue;
    if (t === null) throw Error(S(311));
    t.lastRenderedReducer = A2;
    var r = IA, n = r.baseQueue, s = t.pending;
    if (s !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = s.next, s.next = i;
      }
      r.baseQueue = n = s, t.pending = null;
    }
    if (n !== null) {
      s = n.next, r = r.baseState;
      var l2 = i = null, a = null, o = s;
      do {
        var c = o.lane;
        if ((Yt & c) === c) a !== null && (a = a.next = { lane: 0, action: o.action, hasEagerState: o.hasEagerState, eagerState: o.eagerState, next: null }), r = o.hasEagerState ? o.eagerState : A2(r, o.action);
        else {
          var f = { lane: c, action: o.action, hasEagerState: o.hasEagerState, eagerState: o.eagerState, next: null };
          a === null ? (l2 = a = f, i = r) : a = a.next = f, wA.lanes |= c, Zt |= c;
        }
        o = o.next;
      } while (o !== null && o !== s);
      a === null ? i = r : a.next = l2, Le(r, e.memoizedState) || (qA = true), e.memoizedState = r, e.baseState = i, e.baseQueue = a, t.lastRenderedState = r;
    }
    if (A2 = t.interleaved, A2 !== null) {
      n = A2;
      do
        s = n.lane, wA.lanes |= s, Zt |= s, n = n.next;
      while (n !== A2);
    } else n === null && (t.lanes = 0);
    return [e.memoizedState, t.dispatch];
  }
  function _a(A2) {
    var e = Qe(), t = e.queue;
    if (t === null) throw Error(S(311));
    t.lastRenderedReducer = A2;
    var r = t.dispatch, n = t.pending, s = e.memoizedState;
    if (n !== null) {
      t.pending = null;
      var i = n = n.next;
      do
        s = A2(s, i.action), i = i.next;
      while (i !== n);
      Le(s, e.memoizedState) || (qA = true), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), t.lastRenderedState = s;
    }
    return [s, r];
  }
  function GB() {
  }
  function XB(A2, e) {
    var t = wA, r = Qe(), n = e(), s = !Le(r.memoizedState, n);
    if (s && (r.memoizedState = n, qA = true), r = r.queue, Cu(JB.bind(null, t, r, A2), [A2]), r.getSnapshot !== e || s || LA !== null && LA.memoizedState.tag & 1) {
      if (t.flags |= 2048, Xn(9, zB.bind(null, t, r, n, e), void 0, null), NA === null) throw Error(S(349));
      Yt & 30 || WB(t, e, n);
    }
    return n;
  }
  function WB(A2, e, t) {
    A2.flags |= 16384, A2 = { getSnapshot: e, value: t }, e = wA.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, wA.updateQueue = e, e.stores = [A2]) : (t = e.stores, t === null ? e.stores = [A2] : t.push(A2));
  }
  function zB(A2, e, t, r) {
    e.value = t, e.getSnapshot = r, YB(e) && ZB(A2);
  }
  function JB(A2, e, t) {
    return t(function() {
      YB(e) && ZB(A2);
    });
  }
  function YB(A2) {
    var e = A2.getSnapshot;
    A2 = A2.value;
    try {
      var t = e();
      return !Le(A2, t);
    } catch {
      return true;
    }
  }
  function ZB(A2) {
    var e = At(A2, 1);
    e !== null && be(e, A2, 1, -1);
  }
  function Dc(A2) {
    var e = De();
    return typeof A2 == "function" && (A2 = A2()), e.memoizedState = e.baseState = A2, A2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Gn, lastRenderedState: A2 }, e.queue = A2, A2 = A2.dispatch = Cp.bind(null, wA, A2), [e.memoizedState, A2];
  }
  function Xn(A2, e, t, r) {
    return A2 = { tag: A2, create: e, destroy: t, deps: r, next: null }, e = wA.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, wA.updateQueue = e, e.lastEffect = A2.next = A2) : (t = e.lastEffect, t === null ? e.lastEffect = A2.next = A2 : (r = t.next, t.next = A2, A2.next = r, e.lastEffect = A2)), A2;
  }
  function $B() {
    return Qe().memoizedState;
  }
  function Ai(A2, e, t, r) {
    var n = De();
    wA.flags |= A2, n.memoizedState = Xn(1 | e, t, void 0, r === void 0 ? null : r);
  }
  function ea(A2, e, t, r) {
    var n = Qe();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (IA !== null) {
      var i = IA.memoizedState;
      if (s = i.destroy, r !== null && wu(r, i.deps)) {
        n.memoizedState = Xn(e, t, s, r);
        return;
      }
    }
    wA.flags |= A2, n.memoizedState = Xn(1 | e, t, s, r);
  }
  function Mc(A2, e) {
    return Ai(8390656, 8, A2, e);
  }
  function Cu(A2, e) {
    return ea(2048, 8, A2, e);
  }
  function qB(A2, e) {
    return ea(4, 2, A2, e);
  }
  function Ag(A2, e) {
    return ea(4, 4, A2, e);
  }
  function eg(A2, e) {
    if (typeof e == "function") return A2 = A2(), e(A2), function() {
      e(null);
    };
    if (e != null) return A2 = A2(), e.current = A2, function() {
      e.current = null;
    };
  }
  function tg(A2, e, t) {
    return t = t != null ? t.concat([A2]) : null, ea(4, 4, eg.bind(null, e, A2), t);
  }
  function Qu() {
  }
  function rg(A2, e) {
    var t = Qe();
    e = e === void 0 ? null : e;
    var r = t.memoizedState;
    return r !== null && e !== null && wu(e, r[1]) ? r[0] : (t.memoizedState = [A2, e], A2);
  }
  function ng(A2, e) {
    var t = Qe();
    e = e === void 0 ? null : e;
    var r = t.memoizedState;
    return r !== null && e !== null && wu(e, r[1]) ? r[0] : (A2 = A2(), t.memoizedState = [A2, e], A2);
  }
  function sg(A2, e, t) {
    return Yt & 21 ? (Le(t, e) || (t = uB(), wA.lanes |= t, Zt |= t, A2.baseState = true), e) : (A2.baseState && (A2.baseState = false, qA = true), A2.memoizedState = t);
  }
  function pp(A2, e) {
    var t = tA;
    tA = t !== 0 && 4 > t ? t : 4, A2(true);
    var r = ja.transition;
    ja.transition = {};
    try {
      A2(false), e();
    } finally {
      tA = t, ja.transition = r;
    }
  }
  function ig() {
    return Qe().memoizedState;
  }
  function mp(A2, e, t) {
    var r = Ft(A2);
    if (t = { lane: r, action: t, hasEagerState: false, eagerState: null, next: null }, ag(A2)) lg(e, t);
    else if (t = PB(A2, e, t, r), t !== null) {
      var n = WA();
      be(t, A2, r, n), og(t, e, r);
    }
  }
  function Cp(A2, e, t) {
    var r = Ft(A2), n = { lane: r, action: t, hasEagerState: false, eagerState: null, next: null };
    if (ag(A2)) lg(e, n);
    else {
      var s = A2.alternate;
      if (A2.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null)) try {
        var i = e.lastRenderedState, l2 = s(i, t);
        if (n.hasEagerState = true, n.eagerState = l2, Le(l2, i)) {
          var a = e.interleaved;
          a === null ? (n.next = n, fu(e)) : (n.next = a.next, a.next = n), e.interleaved = n;
          return;
        }
      } catch {
      } finally {
      }
      t = PB(A2, e, n, r), t !== null && (n = WA(), be(t, A2, r, n), og(t, e, r));
    }
  }
  function ag(A2) {
    var e = A2.alternate;
    return A2 === wA || e !== null && e === wA;
  }
  function lg(A2, e) {
    Qn = Ei = true;
    var t = A2.pending;
    t === null ? e.next = e : (e.next = t.next, t.next = e), A2.pending = e;
  }
  function og(A2, e, t) {
    if (t & 4194240) {
      var r = e.lanes;
      r &= A2.pendingLanes, t |= r, e.lanes = t, $o(A2, t);
    }
  }
  var Ii = { readContext: Ce, useCallback: RA, useContext: RA, useEffect: RA, useImperativeHandle: RA, useInsertionEffect: RA, useLayoutEffect: RA, useMemo: RA, useReducer: RA, useRef: RA, useState: RA, useDebugValue: RA, useDeferredValue: RA, useTransition: RA, useMutableSource: RA, useSyncExternalStore: RA, useId: RA, unstable_isNewReconciler: false };
  var Qp = { readContext: Ce, useCallback: function(A2, e) {
    return De().memoizedState = [A2, e === void 0 ? null : e], A2;
  }, useContext: Ce, useEffect: Mc, useImperativeHandle: function(A2, e, t) {
    return t = t != null ? t.concat([A2]) : null, Ai(4194308, 4, eg.bind(null, e, A2), t);
  }, useLayoutEffect: function(A2, e) {
    return Ai(4194308, 4, A2, e);
  }, useInsertionEffect: function(A2, e) {
    return Ai(4, 2, A2, e);
  }, useMemo: function(A2, e) {
    var t = De();
    return e = e === void 0 ? null : e, A2 = A2(), t.memoizedState = [A2, e], A2;
  }, useReducer: function(A2, e, t) {
    var r = De();
    return e = t !== void 0 ? t(e) : e, r.memoizedState = r.baseState = e, A2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: A2, lastRenderedState: e }, r.queue = A2, A2 = A2.dispatch = mp.bind(null, wA, A2), [r.memoizedState, A2];
  }, useRef: function(A2) {
    var e = De();
    return A2 = { current: A2 }, e.memoizedState = A2;
  }, useState: Dc, useDebugValue: Qu, useDeferredValue: function(A2) {
    return De().memoizedState = A2;
  }, useTransition: function() {
    var A2 = Dc(false), e = A2[0];
    return A2 = pp.bind(null, A2[1]), De().memoizedState = A2, [e, A2];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(A2, e, t) {
    var r = wA, n = De();
    if (BA) {
      if (t === void 0) throw Error(S(407));
      t = t();
    } else {
      if (t = e(), NA === null) throw Error(S(349));
      Yt & 30 || WB(r, e, t);
    }
    n.memoizedState = t;
    var s = { value: t, getSnapshot: e };
    return n.queue = s, Mc(JB.bind(null, r, s, A2), [A2]), r.flags |= 2048, Xn(9, zB.bind(null, r, s, t, e), void 0, null), t;
  }, useId: function() {
    var A2 = De(), e = NA.identifierPrefix;
    if (BA) {
      var t = Je, r = ze;
      t = (r & ~(1 << 32 - Se(r) - 1)).toString(32) + t, e = ":" + e + "R" + t, t = Vn++, 0 < t && (e += "H" + t.toString(32)), e += ":";
    } else t = wp++, e = ":" + e + "r" + t.toString(32) + ":";
    return A2.memoizedState = e;
  }, unstable_isNewReconciler: false };
  var vp = { readContext: Ce, useCallback: rg, useContext: Ce, useEffect: Cu, useImperativeHandle: tg, useInsertionEffect: qB, useLayoutEffect: Ag, useMemo: ng, useReducer: Pa, useRef: $B, useState: function() {
    return Pa(Gn);
  }, useDebugValue: Qu, useDeferredValue: function(A2) {
    var e = Qe();
    return sg(e, IA.memoizedState, A2);
  }, useTransition: function() {
    var A2 = Pa(Gn)[0], e = Qe().memoizedState;
    return [A2, e];
  }, useMutableSource: GB, useSyncExternalStore: XB, useId: ig, unstable_isNewReconciler: false };
  var Up = { readContext: Ce, useCallback: rg, useContext: Ce, useEffect: Cu, useImperativeHandle: tg, useInsertionEffect: qB, useLayoutEffect: Ag, useMemo: ng, useReducer: _a, useRef: $B, useState: function() {
    return _a(Gn);
  }, useDebugValue: Qu, useDeferredValue: function(A2) {
    var e = Qe();
    return IA === null ? e.memoizedState = A2 : sg(e, IA.memoizedState, A2);
  }, useTransition: function() {
    var A2 = _a(Gn)[0], e = Qe().memoizedState;
    return [A2, e];
  }, useMutableSource: GB, useSyncExternalStore: XB, useId: ig, unstable_isNewReconciler: false };
  function Ee(A2, e) {
    if (A2 && A2.defaultProps) {
      e = pA({}, e), A2 = A2.defaultProps;
      for (var t in A2) e[t] === void 0 && (e[t] = A2[t]);
      return e;
    }
    return e;
  }
  function zl(A2, e, t, r) {
    e = A2.memoizedState, t = t(r, e), t = t == null ? e : pA({}, e, t), A2.memoizedState = t, A2.lanes === 0 && (A2.updateQueue.baseState = t);
  }
  var ta = { isMounted: function(A2) {
    return (A2 = A2._reactInternals) ? er(A2) === A2 : false;
  }, enqueueSetState: function(A2, e, t) {
    A2 = A2._reactInternals;
    var r = WA(), n = Ft(A2), s = Ye(r, n);
    s.payload = e, t != null && (s.callback = t), e = vt(A2, s, n), e !== null && (be(e, A2, n, r), $s(e, A2, n));
  }, enqueueReplaceState: function(A2, e, t) {
    A2 = A2._reactInternals;
    var r = WA(), n = Ft(A2), s = Ye(r, n);
    s.tag = 1, s.payload = e, t != null && (s.callback = t), e = vt(A2, s, n), e !== null && (be(e, A2, n, r), $s(e, A2, n));
  }, enqueueForceUpdate: function(A2, e) {
    A2 = A2._reactInternals;
    var t = WA(), r = Ft(A2), n = Ye(t, r);
    n.tag = 2, e != null && (n.callback = e), e = vt(A2, n, r), e !== null && (be(e, A2, r, t), $s(e, A2, r));
  } };
  function Rc(A2, e, t, r, n, s, i) {
    return A2 = A2.stateNode, typeof A2.shouldComponentUpdate == "function" ? A2.shouldComponentUpdate(r, s, i) : e.prototype && e.prototype.isPureReactComponent ? !Mn(t, r) || !Mn(n, s) : true;
  }
  function ug(A2, e, t) {
    var r = false, n = St, s = e.contextType;
    return typeof s == "object" && s !== null ? s = Ce(s) : (n = ee(e) ? zt : VA.current, r = e.contextTypes, s = (r = r != null) ? Tr(A2, n) : St), e = new e(t, s), A2.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = ta, A2.stateNode = e, e._reactInternals = A2, r && (A2 = A2.stateNode, A2.__reactInternalMemoizedUnmaskedChildContext = n, A2.__reactInternalMemoizedMaskedChildContext = s), e;
  }
  function Oc(A2, e, t, r) {
    A2 = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(t, r), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(t, r), e.state !== A2 && ta.enqueueReplaceState(e, e.state, null);
  }
  function Jl(A2, e, t, r) {
    var n = A2.stateNode;
    n.props = t, n.state = A2.memoizedState, n.refs = {}, du(A2);
    var s = e.contextType;
    typeof s == "object" && s !== null ? n.context = Ce(s) : (s = ee(e) ? zt : VA.current, n.context = Tr(A2, s)), n.state = A2.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (zl(A2, e, s, t), n.state = A2.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (e = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), e !== n.state && ta.enqueueReplaceState(n, n.state, null), xi(A2, t, n, r), n.state = A2.memoizedState), typeof n.componentDidMount == "function" && (A2.flags |= 4194308);
  }
  function Rr(A2, e) {
    try {
      var t = "", r = e;
      do
        t += Z0(r), r = r.return;
      while (r);
      var n = t;
    } catch (s) {
      n = `
Error generating stack: ` + s.message + `
` + s.stack;
    }
    return { value: A2, source: e, stack: n, digest: null };
  }
  function Va(A2, e, t) {
    return { value: A2, source: null, stack: t ?? null, digest: e ?? null };
  }
  function Yl(A2, e) {
    try {
      console.error(e.value);
    } catch (t) {
      setTimeout(function() {
        throw t;
      });
    }
  }
  var Fp = typeof WeakMap == "function" ? WeakMap : Map;
  function cg(A2, e, t) {
    t = Ye(-1, t), t.tag = 3, t.payload = { element: null };
    var r = e.value;
    return t.callback = function() {
      Si || (Si = true, io = r), Yl(A2, e);
    }, t;
  }
  function fg(A2, e, t) {
    t = Ye(-1, t), t.tag = 3;
    var r = A2.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var n = e.value;
      t.payload = function() {
        return r(n);
      }, t.callback = function() {
        Yl(A2, e);
      };
    }
    var s = A2.stateNode;
    return s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      Yl(A2, e), typeof r != "function" && (Ut === null ? Ut = /* @__PURE__ */ new Set([this]) : Ut.add(this));
      var i = e.stack;
      this.componentDidCatch(e.value, { componentStack: i !== null ? i : "" });
    }), t;
  }
  function jc(A2, e, t) {
    var r = A2.pingCache;
    if (r === null) {
      r = A2.pingCache = new Fp();
      var n = /* @__PURE__ */ new Set();
      r.set(e, n);
    } else n = r.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), r.set(e, n));
    n.has(t) || (n.add(t), A2 = Mp.bind(null, A2, e, t), e.then(A2, A2));
  }
  function Pc(A2) {
    do {
      var e;
      if ((e = A2.tag === 13) && (e = A2.memoizedState, e = e !== null ? e.dehydrated !== null : true), e) return A2;
      A2 = A2.return;
    } while (A2 !== null);
    return null;
  }
  function _c(A2, e, t, r, n) {
    return A2.mode & 1 ? (A2.flags |= 65536, A2.lanes = n, A2) : (A2 === e ? A2.flags |= 65536 : (A2.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (e = Ye(-1, 1), e.tag = 2, vt(t, e, 1))), t.lanes |= 1), A2);
  }
  var xp = rt.ReactCurrentOwner;
  var qA = false;
  function XA(A2, e, t, r) {
    e.child = A2 === null ? jB(e, null, t, r) : Dr(e, A2.child, t, r);
  }
  function Vc(A2, e, t, r, n) {
    t = t.render;
    var s = e.ref;
    return br(e, n), r = pu(A2, e, t, r, s, n), t = mu(), A2 !== null && !qA ? (e.updateQueue = A2.updateQueue, e.flags &= -2053, A2.lanes &= ~n, et(A2, e, n)) : (BA && t && iu(e), e.flags |= 1, XA(A2, e, r, n), e.child);
  }
  function Gc(A2, e, t, r, n) {
    if (A2 === null) {
      var s = t.type;
      return typeof s == "function" && !Hu(s) && s.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (e.tag = 15, e.type = s, dg(A2, e, s, r, n)) : (A2 = ni(t.type, null, r, e, e.mode, n), A2.ref = e.ref, A2.return = e, e.child = A2);
    }
    if (s = A2.child, !(A2.lanes & n)) {
      var i = s.memoizedProps;
      if (t = t.compare, t = t !== null ? t : Mn, t(i, r) && A2.ref === e.ref) return et(A2, e, n);
    }
    return e.flags |= 1, A2 = xt(s, r), A2.ref = e.ref, A2.return = e, e.child = A2;
  }
  function dg(A2, e, t, r, n) {
    if (A2 !== null) {
      var s = A2.memoizedProps;
      if (Mn(s, r) && A2.ref === e.ref) if (qA = false, e.pendingProps = r = s, (A2.lanes & n) !== 0) A2.flags & 131072 && (qA = true);
      else return e.lanes = A2.lanes, et(A2, e, n);
    }
    return Zl(A2, e, t, r, n);
  }
  function Bg(A2, e, t) {
    var r = e.pendingProps, n = r.children, s = A2 !== null ? A2.memoizedState : null;
    if (r.mode === "hidden") if (!(e.mode & 1)) e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, lA(Fr, ie), ie |= t;
    else {
      if (!(t & 1073741824)) return A2 = s !== null ? s.baseLanes | t : t, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: A2, cachePool: null, transitions: null }, e.updateQueue = null, lA(Fr, ie), ie |= A2, null;
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = s !== null ? s.baseLanes : t, lA(Fr, ie), ie |= r;
    }
    else s !== null ? (r = s.baseLanes | t, e.memoizedState = null) : r = t, lA(Fr, ie), ie |= r;
    return XA(A2, e, n, t), e.child;
  }
  function gg(A2, e) {
    var t = e.ref;
    (A2 === null && t !== null || A2 !== null && A2.ref !== t) && (e.flags |= 512, e.flags |= 2097152);
  }
  function Zl(A2, e, t, r, n) {
    var s = ee(t) ? zt : VA.current;
    return s = Tr(e, s), br(e, n), t = pu(A2, e, t, r, s, n), r = mu(), A2 !== null && !qA ? (e.updateQueue = A2.updateQueue, e.flags &= -2053, A2.lanes &= ~n, et(A2, e, n)) : (BA && r && iu(e), e.flags |= 1, XA(A2, e, t, n), e.child);
  }
  function Xc(A2, e, t, r, n) {
    if (ee(t)) {
      var s = true;
      Ci(e);
    } else s = false;
    if (br(e, n), e.stateNode === null) ei(A2, e), ug(e, t, r), Jl(e, t, r, n), r = true;
    else if (A2 === null) {
      var i = e.stateNode, l2 = e.memoizedProps;
      i.props = l2;
      var a = i.context, o = t.contextType;
      typeof o == "object" && o !== null ? o = Ce(o) : (o = ee(t) ? zt : VA.current, o = Tr(e, o));
      var c = t.getDerivedStateFromProps, f = typeof c == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      f || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (l2 !== r || a !== o) && Oc(e, i, r, o), ot = false;
      var d = e.memoizedState;
      i.state = d, xi(e, r, i, n), a = e.memoizedState, l2 !== r || d !== a || Ae.current || ot ? (typeof c == "function" && (zl(e, t, c, r), a = e.memoizedState), (l2 = ot || Rc(e, t, l2, r, d, a, o)) ? (f || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = r, e.memoizedState = a), i.props = r, i.state = a, i.context = o, r = l2) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), r = false);
    } else {
      i = e.stateNode, _B(A2, e), l2 = e.memoizedProps, o = e.type === e.elementType ? l2 : Ee(e.type, l2), i.props = o, f = e.pendingProps, d = i.context, a = t.contextType, typeof a == "object" && a !== null ? a = Ce(a) : (a = ee(t) ? zt : VA.current, a = Tr(e, a));
      var m2 = t.getDerivedStateFromProps;
      (c = typeof m2 == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (l2 !== f || d !== a) && Oc(e, i, r, a), ot = false, d = e.memoizedState, i.state = d, xi(e, r, i, n);
      var w2 = e.memoizedState;
      l2 !== f || d !== w2 || Ae.current || ot ? (typeof m2 == "function" && (zl(e, t, m2, r), w2 = e.memoizedState), (o = ot || Rc(e, t, o, r, d, w2, a) || false) ? (c || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, w2, a), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, w2, a)), typeof i.componentDidUpdate == "function" && (e.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || l2 === A2.memoizedProps && d === A2.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || l2 === A2.memoizedProps && d === A2.memoizedState || (e.flags |= 1024), e.memoizedProps = r, e.memoizedState = w2), i.props = r, i.state = w2, i.context = a, r = o) : (typeof i.componentDidUpdate != "function" || l2 === A2.memoizedProps && d === A2.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || l2 === A2.memoizedProps && d === A2.memoizedState || (e.flags |= 1024), r = false);
    }
    return $l(A2, e, t, r, s, n);
  }
  function $l(A2, e, t, r, n, s) {
    gg(A2, e);
    var i = (e.flags & 128) !== 0;
    if (!r && !i) return n && bc(e, t, false), et(A2, e, s);
    r = e.stateNode, xp.current = e;
    var l2 = i && typeof t.getDerivedStateFromError != "function" ? null : r.render();
    return e.flags |= 1, A2 !== null && i ? (e.child = Dr(e, A2.child, null, s), e.child = Dr(e, null, l2, s)) : XA(A2, e, l2, s), e.memoizedState = r.state, n && bc(e, t, true), e.child;
  }
  function hg(A2) {
    var e = A2.stateNode;
    e.pendingContext ? Sc(A2, e.pendingContext, e.pendingContext !== e.context) : e.context && Sc(A2, e.context, false), Bu(A2, e.containerInfo);
  }
  function Wc(A2, e, t, r, n) {
    return Kr(), lu(n), e.flags |= 256, XA(A2, e, t, r), e.child;
  }
  var ql = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ao(A2) {
    return { baseLanes: A2, cachePool: null, transitions: null };
  }
  function wg(A2, e, t) {
    var r = e.pendingProps, n = hA.current, s = false, i = (e.flags & 128) !== 0, l2;
    if ((l2 = i) || (l2 = A2 !== null && A2.memoizedState === null ? false : (n & 2) !== 0), l2 ? (s = true, e.flags &= -129) : (A2 === null || A2.memoizedState !== null) && (n |= 1), lA(hA, n & 1), A2 === null) return Xl(e), A2 = e.memoizedState, A2 !== null && (A2 = A2.dehydrated, A2 !== null) ? (e.mode & 1 ? A2.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (i = r.children, A2 = r.fallback, s ? (r = e.mode, s = e.child, i = { mode: "hidden", children: i }, !(r & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = i) : s = sa(i, r, 0, null), A2 = Gt(A2, r, t, null), s.return = e, A2.return = e, s.sibling = A2, e.child = s, e.child.memoizedState = Ao(t), e.memoizedState = ql, A2) : vu(e, i));
    if (n = A2.memoizedState, n !== null && (l2 = n.dehydrated, l2 !== null)) return yp(A2, e, i, r, l2, n, t);
    if (s) {
      s = r.fallback, i = e.mode, n = A2.child, l2 = n.sibling;
      var a = { mode: "hidden", children: r.children };
      return !(i & 1) && e.child !== n ? (r = e.child, r.childLanes = 0, r.pendingProps = a, e.deletions = null) : (r = xt(n, a), r.subtreeFlags = n.subtreeFlags & 14680064), l2 !== null ? s = xt(l2, s) : (s = Gt(s, i, t, null), s.flags |= 2), s.return = e, r.return = e, r.sibling = s, e.child = r, r = s, s = e.child, i = A2.child.memoizedState, i = i === null ? Ao(t) : { baseLanes: i.baseLanes | t, cachePool: null, transitions: i.transitions }, s.memoizedState = i, s.childLanes = A2.childLanes & ~t, e.memoizedState = ql, r;
    }
    return s = A2.child, A2 = s.sibling, r = xt(s, { mode: "visible", children: r.children }), !(e.mode & 1) && (r.lanes = t), r.return = e, r.sibling = null, A2 !== null && (t = e.deletions, t === null ? (e.deletions = [A2], e.flags |= 16) : t.push(A2)), e.child = r, e.memoizedState = null, r;
  }
  function vu(A2, e) {
    return e = sa({ mode: "visible", children: e }, A2.mode, 0, null), e.return = A2, A2.child = e;
  }
  function ps(A2, e, t, r) {
    return r !== null && lu(r), Dr(e, A2.child, null, t), A2 = vu(e, e.pendingProps.children), A2.flags |= 2, e.memoizedState = null, A2;
  }
  function yp(A2, e, t, r, n, s, i) {
    if (t) return e.flags & 256 ? (e.flags &= -257, r = Va(Error(S(422))), ps(A2, e, i, r)) : e.memoizedState !== null ? (e.child = A2.child, e.flags |= 128, null) : (s = r.fallback, n = e.mode, r = sa({ mode: "visible", children: r.children }, n, 0, null), s = Gt(s, n, i, null), s.flags |= 2, r.return = e, s.return = e, r.sibling = s, e.child = r, e.mode & 1 && Dr(e, A2.child, null, i), e.child.memoizedState = Ao(i), e.memoizedState = ql, s);
    if (!(e.mode & 1)) return ps(A2, e, i, null);
    if (n.data === "$!") {
      if (r = n.nextSibling && n.nextSibling.dataset, r) var l2 = r.dgst;
      return r = l2, s = Error(S(419)), r = Va(s, r, void 0), ps(A2, e, i, r);
    }
    if (l2 = (i & A2.childLanes) !== 0, qA || l2) {
      if (r = NA, r !== null) {
        switch (i & -i) {
          case 4:
            n = 2;
            break;
          case 16:
            n = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            n = 32;
            break;
          case 536870912:
            n = 268435456;
            break;
          default:
            n = 0;
        }
        n = n & (r.suspendedLanes | i) ? 0 : n, n !== 0 && n !== s.retryLane && (s.retryLane = n, At(A2, n), be(r, A2, n, -1));
      }
      return Iu(), r = Va(Error(S(421))), ps(A2, e, i, r);
    }
    return n.data === "$?" ? (e.flags |= 128, e.child = A2.child, e = Rp.bind(null, A2), n._reactRetry = e, null) : (A2 = s.treeContext, ae = Qt(n.nextSibling), le = e, BA = true, He = null, A2 !== null && (de[Be++] = ze, de[Be++] = Je, de[Be++] = Jt, ze = A2.id, Je = A2.overflow, Jt = e), e = vu(e, r.children), e.flags |= 4096, e);
  }
  function zc(A2, e, t) {
    A2.lanes |= e;
    var r = A2.alternate;
    r !== null && (r.lanes |= e), Wl(A2.return, e, t);
  }
  function Ga(A2, e, t, r, n) {
    var s = A2.memoizedState;
    s === null ? A2.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: r, tail: t, tailMode: n } : (s.isBackwards = e, s.rendering = null, s.renderingStartTime = 0, s.last = r, s.tail = t, s.tailMode = n);
  }
  function pg(A2, e, t) {
    var r = e.pendingProps, n = r.revealOrder, s = r.tail;
    if (XA(A2, e, r.children, t), r = hA.current, r & 2) r = r & 1 | 2, e.flags |= 128;
    else {
      if (A2 !== null && A2.flags & 128) A: for (A2 = e.child; A2 !== null; ) {
        if (A2.tag === 13) A2.memoizedState !== null && zc(A2, t, e);
        else if (A2.tag === 19) zc(A2, t, e);
        else if (A2.child !== null) {
          A2.child.return = A2, A2 = A2.child;
          continue;
        }
        if (A2 === e) break A;
        for (; A2.sibling === null; ) {
          if (A2.return === null || A2.return === e) break A;
          A2 = A2.return;
        }
        A2.sibling.return = A2.return, A2 = A2.sibling;
      }
      r &= 1;
    }
    if (lA(hA, r), !(e.mode & 1)) e.memoizedState = null;
    else switch (n) {
      case "forwards":
        for (t = e.child, n = null; t !== null; ) A2 = t.alternate, A2 !== null && yi(A2) === null && (n = t), t = t.sibling;
        t = n, t === null ? (n = e.child, e.child = null) : (n = t.sibling, t.sibling = null), Ga(e, false, n, t, s);
        break;
      case "backwards":
        for (t = null, n = e.child, e.child = null; n !== null; ) {
          if (A2 = n.alternate, A2 !== null && yi(A2) === null) {
            e.child = n;
            break;
          }
          A2 = n.sibling, n.sibling = t, t = n, n = A2;
        }
        Ga(e, true, t, null, s);
        break;
      case "together":
        Ga(e, false, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ei(A2, e) {
    !(e.mode & 1) && A2 !== null && (A2.alternate = null, e.alternate = null, e.flags |= 2);
  }
  function et(A2, e, t) {
    if (A2 !== null && (e.dependencies = A2.dependencies), Zt |= e.lanes, !(t & e.childLanes)) return null;
    if (A2 !== null && e.child !== A2.child) throw Error(S(153));
    if (e.child !== null) {
      for (A2 = e.child, t = xt(A2, A2.pendingProps), e.child = t, t.return = e; A2.sibling !== null; ) A2 = A2.sibling, t = t.sibling = xt(A2, A2.pendingProps), t.return = e;
      t.sibling = null;
    }
    return e.child;
  }
  function Ep(A2, e, t) {
    switch (e.tag) {
      case 3:
        hg(e), Kr();
        break;
      case 5:
        VB(e);
        break;
      case 1:
        ee(e.type) && Ci(e);
        break;
      case 4:
        Bu(e, e.stateNode.containerInfo);
        break;
      case 10:
        var r = e.type._context, n = e.memoizedProps.value;
        lA(Ui, r._currentValue), r._currentValue = n;
        break;
      case 13:
        if (r = e.memoizedState, r !== null) return r.dehydrated !== null ? (lA(hA, hA.current & 1), e.flags |= 128, null) : t & e.child.childLanes ? wg(A2, e, t) : (lA(hA, hA.current & 1), A2 = et(A2, e, t), A2 !== null ? A2.sibling : null);
        lA(hA, hA.current & 1);
        break;
      case 19:
        if (r = (t & e.childLanes) !== 0, A2.flags & 128) {
          if (r) return pg(A2, e, t);
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), lA(hA, hA.current), r) break;
        return null;
      case 22:
      case 23:
        return e.lanes = 0, Bg(A2, e, t);
    }
    return et(A2, e, t);
  }
  var mg;
  var eo;
  var Cg;
  var Qg;
  mg = function(A2, e) {
    for (var t = e.child; t !== null; ) {
      if (t.tag === 5 || t.tag === 6) A2.appendChild(t.stateNode);
      else if (t.tag !== 4 && t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  };
  eo = function() {
  };
  Cg = function(A2, e, t, r) {
    var n = A2.memoizedProps;
    if (n !== r) {
      A2 = e.stateNode, Pt(Oe.current);
      var s = null;
      switch (t) {
        case "input":
          n = Ul(A2, n), r = Ul(A2, r), s = [];
          break;
        case "select":
          n = pA({}, n, { value: void 0 }), r = pA({}, r, { value: void 0 }), s = [];
          break;
        case "textarea":
          n = yl(A2, n), r = yl(A2, r), s = [];
          break;
        default:
          typeof n.onClick != "function" && typeof r.onClick == "function" && (A2.onclick = pi);
      }
      Il(t, r);
      var i;
      t = null;
      for (o in n) if (!r.hasOwnProperty(o) && n.hasOwnProperty(o) && n[o] != null) if (o === "style") {
        var l2 = n[o];
        for (i in l2) l2.hasOwnProperty(i) && (t || (t = {}), t[i] = "");
      } else o !== "dangerouslySetInnerHTML" && o !== "children" && o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (bn.hasOwnProperty(o) ? s || (s = []) : (s = s || []).push(o, null));
      for (o in r) {
        var a = r[o];
        if (l2 = n != null ? n[o] : void 0, r.hasOwnProperty(o) && a !== l2 && (a != null || l2 != null)) if (o === "style") if (l2) {
          for (i in l2) !l2.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (t || (t = {}), t[i] = "");
          for (i in a) a.hasOwnProperty(i) && l2[i] !== a[i] && (t || (t = {}), t[i] = a[i]);
        } else t || (s || (s = []), s.push(o, t)), t = a;
        else o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l2 = l2 ? l2.__html : void 0, a != null && l2 !== a && (s = s || []).push(o, a)) : o === "children" ? typeof a != "string" && typeof a != "number" || (s = s || []).push(o, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && (bn.hasOwnProperty(o) ? (a != null && o === "onScroll" && oA("scroll", A2), s || l2 === a || (s = [])) : (s = s || []).push(o, a));
      }
      t && (s = s || []).push("style", t);
      var o = s;
      (e.updateQueue = o) && (e.flags |= 4);
    }
  };
  Qg = function(A2, e, t, r) {
    t !== r && (e.flags |= 4);
  };
  function $r(A2, e) {
    if (!BA) switch (A2.tailMode) {
      case "hidden":
        e = A2.tail;
        for (var t = null; e !== null; ) e.alternate !== null && (t = e), e = e.sibling;
        t === null ? A2.tail = null : t.sibling = null;
        break;
      case "collapsed":
        t = A2.tail;
        for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
        r === null ? e || A2.tail === null ? A2.tail = null : A2.tail.sibling = null : r.sibling = null;
    }
  }
  function OA(A2) {
    var e = A2.alternate !== null && A2.alternate.child === A2.child, t = 0, r = 0;
    if (e) for (var n = A2.child; n !== null; ) t |= n.lanes | n.childLanes, r |= n.subtreeFlags & 14680064, r |= n.flags & 14680064, n.return = A2, n = n.sibling;
    else for (n = A2.child; n !== null; ) t |= n.lanes | n.childLanes, r |= n.subtreeFlags, r |= n.flags, n.return = A2, n = n.sibling;
    return A2.subtreeFlags |= r, A2.childLanes = t, e;
  }
  function Ip(A2, e, t) {
    var r = e.pendingProps;
    switch (au(e), e.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return OA(e), null;
      case 1:
        return ee(e.type) && mi(), OA(e), null;
      case 3:
        return r = e.stateNode, Mr(), cA(Ae), cA(VA), hu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (A2 === null || A2.child === null) && (hs(e) ? e.flags |= 4 : A2 === null || A2.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, He !== null && (oo(He), He = null))), eo(A2, e), OA(e), null;
      case 5:
        gu(e);
        var n = Pt(_n.current);
        if (t = e.type, A2 !== null && e.stateNode != null) Cg(A2, e, t, r, n), A2.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
        else {
          if (!r) {
            if (e.stateNode === null) throw Error(S(166));
            return OA(e), null;
          }
          if (A2 = Pt(Oe.current), hs(e)) {
            r = e.stateNode, t = e.type;
            var s = e.memoizedProps;
            switch (r[Me] = e, r[jn] = s, A2 = (e.mode & 1) !== 0, t) {
              case "dialog":
                oA("cancel", r), oA("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                oA("load", r);
                break;
              case "video":
              case "audio":
                for (n = 0; n < ln.length; n++) oA(ln[n], r);
                break;
              case "source":
                oA("error", r);
                break;
              case "img":
              case "image":
              case "link":
                oA("error", r), oA("load", r);
                break;
              case "details":
                oA("toggle", r);
                break;
              case "input":
                rc(r, s), oA("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!s.multiple }, oA("invalid", r);
                break;
              case "textarea":
                sc(r, s), oA("invalid", r);
            }
            Il(t, s), n = null;
            for (var i in s) if (s.hasOwnProperty(i)) {
              var l2 = s[i];
              i === "children" ? typeof l2 == "string" ? r.textContent !== l2 && (s.suppressHydrationWarning !== true && gs(r.textContent, l2, A2), n = ["children", l2]) : typeof l2 == "number" && r.textContent !== "" + l2 && (s.suppressHydrationWarning !== true && gs(r.textContent, l2, A2), n = ["children", "" + l2]) : bn.hasOwnProperty(i) && l2 != null && i === "onScroll" && oA("scroll", r);
            }
            switch (t) {
              case "input":
                as(r), nc(r, s, true);
                break;
              case "textarea":
                as(r), ic(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof s.onClick == "function" && (r.onclick = pi);
            }
            r = n, e.updateQueue = r, r !== null && (e.flags |= 4);
          } else {
            i = n.nodeType === 9 ? n : n.ownerDocument, A2 === "http://www.w3.org/1999/xhtml" && (A2 = Jd(t)), A2 === "http://www.w3.org/1999/xhtml" ? t === "script" ? (A2 = i.createElement("div"), A2.innerHTML = "<script><\/script>", A2 = A2.removeChild(A2.firstChild)) : typeof r.is == "string" ? A2 = i.createElement(t, { is: r.is }) : (A2 = i.createElement(t), t === "select" && (i = A2, r.multiple ? i.multiple = true : r.size && (i.size = r.size))) : A2 = i.createElementNS(A2, t), A2[Me] = e, A2[jn] = r, mg(A2, e, false, false), e.stateNode = A2;
            A: {
              switch (i = Hl(t, r), t) {
                case "dialog":
                  oA("cancel", A2), oA("close", A2), n = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  oA("load", A2), n = r;
                  break;
                case "video":
                case "audio":
                  for (n = 0; n < ln.length; n++) oA(ln[n], A2);
                  n = r;
                  break;
                case "source":
                  oA("error", A2), n = r;
                  break;
                case "img":
                case "image":
                case "link":
                  oA("error", A2), oA("load", A2), n = r;
                  break;
                case "details":
                  oA("toggle", A2), n = r;
                  break;
                case "input":
                  rc(A2, r), n = Ul(A2, r), oA("invalid", A2);
                  break;
                case "option":
                  n = r;
                  break;
                case "select":
                  A2._wrapperState = { wasMultiple: !!r.multiple }, n = pA({}, r, { value: void 0 }), oA("invalid", A2);
                  break;
                case "textarea":
                  sc(A2, r), n = yl(A2, r), oA("invalid", A2);
                  break;
                default:
                  n = r;
              }
              Il(t, n), l2 = n;
              for (s in l2) if (l2.hasOwnProperty(s)) {
                var a = l2[s];
                s === "style" ? $d(A2, a) : s === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Yd(A2, a)) : s === "children" ? typeof a == "string" ? (t !== "textarea" || a !== "") && Ln(A2, a) : typeof a == "number" && Ln(A2, "" + a) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (bn.hasOwnProperty(s) ? a != null && s === "onScroll" && oA("scroll", A2) : a != null && Xo(A2, s, a, i));
              }
              switch (t) {
                case "input":
                  as(A2), nc(A2, r, false);
                  break;
                case "textarea":
                  as(A2), ic(A2);
                  break;
                case "option":
                  r.value != null && A2.setAttribute("value", "" + Ht(r.value));
                  break;
                case "select":
                  A2.multiple = !!r.multiple, s = r.value, s != null ? Er(A2, !!r.multiple, s, false) : r.defaultValue != null && Er(A2, !!r.multiple, r.defaultValue, true);
                  break;
                default:
                  typeof n.onClick == "function" && (A2.onclick = pi);
              }
              switch (t) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break A;
                case "img":
                  r = true;
                  break A;
                default:
                  r = false;
              }
            }
            r && (e.flags |= 4);
          }
          e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
        }
        return OA(e), null;
      case 6:
        if (A2 && e.stateNode != null) Qg(A2, e, A2.memoizedProps, r);
        else {
          if (typeof r != "string" && e.stateNode === null) throw Error(S(166));
          if (t = Pt(_n.current), Pt(Oe.current), hs(e)) {
            if (r = e.stateNode, t = e.memoizedProps, r[Me] = e, (s = r.nodeValue !== t) && (A2 = le, A2 !== null)) switch (A2.tag) {
              case 3:
                gs(r.nodeValue, t, (A2.mode & 1) !== 0);
                break;
              case 5:
                A2.memoizedProps.suppressHydrationWarning !== true && gs(r.nodeValue, t, (A2.mode & 1) !== 0);
            }
            s && (e.flags |= 4);
          } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[Me] = e, e.stateNode = r;
        }
        return OA(e), null;
      case 13:
        if (cA(hA), r = e.memoizedState, A2 === null || A2.memoizedState !== null && A2.memoizedState.dehydrated !== null) {
          if (BA && ae !== null && e.mode & 1 && !(e.flags & 128)) RB(), Kr(), e.flags |= 98560, s = false;
          else if (s = hs(e), r !== null && r.dehydrated !== null) {
            if (A2 === null) {
              if (!s) throw Error(S(318));
              if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(S(317));
              s[Me] = e;
            } else Kr(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
            OA(e), s = false;
          } else He !== null && (oo(He), He = null), s = true;
          if (!s) return e.flags & 65536 ? e : null;
        }
        return e.flags & 128 ? (e.lanes = t, e) : (r = r !== null, r !== (A2 !== null && A2.memoizedState !== null) && r && (e.child.flags |= 8192, e.mode & 1 && (A2 === null || hA.current & 1 ? SA === 0 && (SA = 3) : Iu())), e.updateQueue !== null && (e.flags |= 4), OA(e), null);
      case 4:
        return Mr(), eo(A2, e), A2 === null && Rn(e.stateNode.containerInfo), OA(e), null;
      case 10:
        return cu(e.type._context), OA(e), null;
      case 17:
        return ee(e.type) && mi(), OA(e), null;
      case 19:
        if (cA(hA), s = e.memoizedState, s === null) return OA(e), null;
        if (r = (e.flags & 128) !== 0, i = s.rendering, i === null) if (r) $r(s, false);
        else {
          if (SA !== 0 || A2 !== null && A2.flags & 128) for (A2 = e.child; A2 !== null; ) {
            if (i = yi(A2), i !== null) {
              for (e.flags |= 128, $r(s, false), r = i.updateQueue, r !== null && (e.updateQueue = r, e.flags |= 4), e.subtreeFlags = 0, r = t, t = e.child; t !== null; ) s = t, A2 = r, s.flags &= 14680066, i = s.alternate, i === null ? (s.childLanes = 0, s.lanes = A2, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = i.childLanes, s.lanes = i.lanes, s.child = i.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = i.memoizedProps, s.memoizedState = i.memoizedState, s.updateQueue = i.updateQueue, s.type = i.type, A2 = i.dependencies, s.dependencies = A2 === null ? null : { lanes: A2.lanes, firstContext: A2.firstContext }), t = t.sibling;
              return lA(hA, hA.current & 1 | 2), e.child;
            }
            A2 = A2.sibling;
          }
          s.tail !== null && FA() > Or && (e.flags |= 128, r = true, $r(s, false), e.lanes = 4194304);
        }
        else {
          if (!r) if (A2 = yi(i), A2 !== null) {
            if (e.flags |= 128, r = true, t = A2.updateQueue, t !== null && (e.updateQueue = t, e.flags |= 4), $r(s, true), s.tail === null && s.tailMode === "hidden" && !i.alternate && !BA) return OA(e), null;
          } else 2 * FA() - s.renderingStartTime > Or && t !== 1073741824 && (e.flags |= 128, r = true, $r(s, false), e.lanes = 4194304);
          s.isBackwards ? (i.sibling = e.child, e.child = i) : (t = s.last, t !== null ? t.sibling = i : e.child = i, s.last = i);
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = FA(), e.sibling = null, t = hA.current, lA(hA, r ? t & 1 | 2 : t & 1), e) : (OA(e), null);
      case 22:
      case 23:
        return Eu(), r = e.memoizedState !== null, A2 !== null && A2.memoizedState !== null !== r && (e.flags |= 8192), r && e.mode & 1 ? ie & 1073741824 && (OA(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : OA(e), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(S(156, e.tag));
  }
  function Hp(A2, e) {
    switch (au(e), e.tag) {
      case 1:
        return ee(e.type) && mi(), A2 = e.flags, A2 & 65536 ? (e.flags = A2 & -65537 | 128, e) : null;
      case 3:
        return Mr(), cA(Ae), cA(VA), hu(), A2 = e.flags, A2 & 65536 && !(A2 & 128) ? (e.flags = A2 & -65537 | 128, e) : null;
      case 5:
        return gu(e), null;
      case 13:
        if (cA(hA), A2 = e.memoizedState, A2 !== null && A2.dehydrated !== null) {
          if (e.alternate === null) throw Error(S(340));
          Kr();
        }
        return A2 = e.flags, A2 & 65536 ? (e.flags = A2 & -65537 | 128, e) : null;
      case 19:
        return cA(hA), null;
      case 4:
        return Mr(), null;
      case 10:
        return cu(e.type._context), null;
      case 22:
      case 23:
        return Eu(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ms = false;
  var _A = false;
  var Sp = typeof WeakSet == "function" ? WeakSet : Set;
  var O = null;
  function Ur(A2, e) {
    var t = A2.ref;
    if (t !== null) if (typeof t == "function") try {
      t(null);
    } catch (r) {
      CA(A2, e, r);
    }
    else t.current = null;
  }
  function to(A2, e, t) {
    try {
      t();
    } catch (r) {
      CA(A2, e, r);
    }
  }
  var Jc = false;
  function bp(A2, e) {
    if (Rl = gi, A2 = yB(), su(A2)) {
      if ("selectionStart" in A2) var t = { start: A2.selectionStart, end: A2.selectionEnd };
      else A: {
        t = (t = A2.ownerDocument) && t.defaultView || window;
        var r = t.getSelection && t.getSelection();
        if (r && r.rangeCount !== 0) {
          t = r.anchorNode;
          var n = r.anchorOffset, s = r.focusNode;
          r = r.focusOffset;
          try {
            t.nodeType, s.nodeType;
          } catch {
            t = null;
            break A;
          }
          var i = 0, l2 = -1, a = -1, o = 0, c = 0, f = A2, d = null;
          e: for (; ; ) {
            for (var m2; f !== t || n !== 0 && f.nodeType !== 3 || (l2 = i + n), f !== s || r !== 0 && f.nodeType !== 3 || (a = i + r), f.nodeType === 3 && (i += f.nodeValue.length), (m2 = f.firstChild) !== null; ) d = f, f = m2;
            for (; ; ) {
              if (f === A2) break e;
              if (d === t && ++o === n && (l2 = i), d === s && ++c === r && (a = i), (m2 = f.nextSibling) !== null) break;
              f = d, d = f.parentNode;
            }
            f = m2;
          }
          t = l2 === -1 || a === -1 ? null : { start: l2, end: a };
        } else t = null;
      }
      t = t || { start: 0, end: 0 };
    } else t = null;
    for (Ol = { focusedElem: A2, selectionRange: t }, gi = false, O = e; O !== null; ) if (e = O, A2 = e.child, (e.subtreeFlags & 1028) !== 0 && A2 !== null) A2.return = e, O = A2;
    else for (; O !== null; ) {
      e = O;
      try {
        var w2 = e.alternate;
        if (e.flags & 1024) switch (e.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (w2 !== null) {
              var C2 = w2.memoizedProps, U = w2.memoizedState, h = e.stateNode, B = h.getSnapshotBeforeUpdate(e.elementType === e.type ? C2 : Ee(e.type, C2), U);
              h.__reactInternalSnapshotBeforeUpdate = B;
            }
            break;
          case 3:
            var p = e.stateNode.containerInfo;
            p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(S(163));
        }
      } catch (v2) {
        CA(e, e.return, v2);
      }
      if (A2 = e.sibling, A2 !== null) {
        A2.return = e.return, O = A2;
        break;
      }
      O = e.return;
    }
    return w2 = Jc, Jc = false, w2;
  }
  function vn(A2, e, t) {
    var r = e.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var n = r = r.next;
      do {
        if ((n.tag & A2) === A2) {
          var s = n.destroy;
          n.destroy = void 0, s !== void 0 && to(e, t, s);
        }
        n = n.next;
      } while (n !== r);
    }
  }
  function ra(A2, e) {
    if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
      var t = e = e.next;
      do {
        if ((t.tag & A2) === A2) {
          var r = t.create;
          t.destroy = r();
        }
        t = t.next;
      } while (t !== e);
    }
  }
  function ro(A2) {
    var e = A2.ref;
    if (e !== null) {
      var t = A2.stateNode;
      switch (A2.tag) {
        case 5:
          A2 = t;
          break;
        default:
          A2 = t;
      }
      typeof e == "function" ? e(A2) : e.current = A2;
    }
  }
  function vg(A2) {
    var e = A2.alternate;
    e !== null && (A2.alternate = null, vg(e)), A2.child = null, A2.deletions = null, A2.sibling = null, A2.tag === 5 && (e = A2.stateNode, e !== null && (delete e[Me], delete e[jn], delete e[_l], delete e[dp], delete e[Bp])), A2.stateNode = null, A2.return = null, A2.dependencies = null, A2.memoizedProps = null, A2.memoizedState = null, A2.pendingProps = null, A2.stateNode = null, A2.updateQueue = null;
  }
  function Ug(A2) {
    return A2.tag === 5 || A2.tag === 3 || A2.tag === 4;
  }
  function Yc(A2) {
    A: for (; ; ) {
      for (; A2.sibling === null; ) {
        if (A2.return === null || Ug(A2.return)) return null;
        A2 = A2.return;
      }
      for (A2.sibling.return = A2.return, A2 = A2.sibling; A2.tag !== 5 && A2.tag !== 6 && A2.tag !== 18; ) {
        if (A2.flags & 2 || A2.child === null || A2.tag === 4) continue A;
        A2.child.return = A2, A2 = A2.child;
      }
      if (!(A2.flags & 2)) return A2.stateNode;
    }
  }
  function no(A2, e, t) {
    var r = A2.tag;
    if (r === 5 || r === 6) A2 = A2.stateNode, e ? t.nodeType === 8 ? t.parentNode.insertBefore(A2, e) : t.insertBefore(A2, e) : (t.nodeType === 8 ? (e = t.parentNode, e.insertBefore(A2, t)) : (e = t, e.appendChild(A2)), t = t._reactRootContainer, t != null || e.onclick !== null || (e.onclick = pi));
    else if (r !== 4 && (A2 = A2.child, A2 !== null)) for (no(A2, e, t), A2 = A2.sibling; A2 !== null; ) no(A2, e, t), A2 = A2.sibling;
  }
  function so(A2, e, t) {
    var r = A2.tag;
    if (r === 5 || r === 6) A2 = A2.stateNode, e ? t.insertBefore(A2, e) : t.appendChild(A2);
    else if (r !== 4 && (A2 = A2.child, A2 !== null)) for (so(A2, e, t), A2 = A2.sibling; A2 !== null; ) so(A2, e, t), A2 = A2.sibling;
  }
  var kA = null;
  var Ie = false;
  function st(A2, e, t) {
    for (t = t.child; t !== null; ) Fg(A2, e, t), t = t.sibling;
  }
  function Fg(A2, e, t) {
    if (Re && typeof Re.onCommitFiberUnmount == "function") try {
      Re.onCommitFiberUnmount(Ji, t);
    } catch {
    }
    switch (t.tag) {
      case 5:
        _A || Ur(t, e);
      case 6:
        var r = kA, n = Ie;
        kA = null, st(A2, e, t), kA = r, Ie = n, kA !== null && (Ie ? (A2 = kA, t = t.stateNode, A2.nodeType === 8 ? A2.parentNode.removeChild(t) : A2.removeChild(t)) : kA.removeChild(t.stateNode));
        break;
      case 18:
        kA !== null && (Ie ? (A2 = kA, t = t.stateNode, A2.nodeType === 8 ? Ma(A2.parentNode, t) : A2.nodeType === 1 && Ma(A2, t), Kn(A2)) : Ma(kA, t.stateNode));
        break;
      case 4:
        r = kA, n = Ie, kA = t.stateNode.containerInfo, Ie = true, st(A2, e, t), kA = r, Ie = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!_A && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          n = r = r.next;
          do {
            var s = n, i = s.destroy;
            s = s.tag, i !== void 0 && (s & 2 || s & 4) && to(t, e, i), n = n.next;
          } while (n !== r);
        }
        st(A2, e, t);
        break;
      case 1:
        if (!_A && (Ur(t, e), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount();
        } catch (l2) {
          CA(t, e, l2);
        }
        st(A2, e, t);
        break;
      case 21:
        st(A2, e, t);
        break;
      case 22:
        t.mode & 1 ? (_A = (r = _A) || t.memoizedState !== null, st(A2, e, t), _A = r) : st(A2, e, t);
        break;
      default:
        st(A2, e, t);
    }
  }
  function Zc(A2) {
    var e = A2.updateQueue;
    if (e !== null) {
      A2.updateQueue = null;
      var t = A2.stateNode;
      t === null && (t = A2.stateNode = new Sp()), e.forEach(function(r) {
        var n = Op.bind(null, A2, r);
        t.has(r) || (t.add(r), r.then(n, n));
      });
    }
  }
  function xe(A2, e) {
    var t = e.deletions;
    if (t !== null) for (var r = 0; r < t.length; r++) {
      var n = t[r];
      try {
        var s = A2, i = e, l2 = i;
        A: for (; l2 !== null; ) {
          switch (l2.tag) {
            case 5:
              kA = l2.stateNode, Ie = false;
              break A;
            case 3:
              kA = l2.stateNode.containerInfo, Ie = true;
              break A;
            case 4:
              kA = l2.stateNode.containerInfo, Ie = true;
              break A;
          }
          l2 = l2.return;
        }
        if (kA === null) throw Error(S(160));
        Fg(s, i, n), kA = null, Ie = false;
        var a = n.alternate;
        a !== null && (a.return = null), n.return = null;
      } catch (o) {
        CA(n, e, o);
      }
    }
    if (e.subtreeFlags & 12854) for (e = e.child; e !== null; ) xg(e, A2), e = e.sibling;
  }
  function xg(A2, e) {
    var t = A2.alternate, r = A2.flags;
    switch (A2.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (xe(e, A2), Te(A2), r & 4) {
          try {
            vn(3, A2, A2.return), ra(3, A2);
          } catch (C2) {
            CA(A2, A2.return, C2);
          }
          try {
            vn(5, A2, A2.return);
          } catch (C2) {
            CA(A2, A2.return, C2);
          }
        }
        break;
      case 1:
        xe(e, A2), Te(A2), r & 512 && t !== null && Ur(t, t.return);
        break;
      case 5:
        if (xe(e, A2), Te(A2), r & 512 && t !== null && Ur(t, t.return), A2.flags & 32) {
          var n = A2.stateNode;
          try {
            Ln(n, "");
          } catch (C2) {
            CA(A2, A2.return, C2);
          }
        }
        if (r & 4 && (n = A2.stateNode, n != null)) {
          var s = A2.memoizedProps, i = t !== null ? t.memoizedProps : s, l2 = A2.type, a = A2.updateQueue;
          if (A2.updateQueue = null, a !== null) try {
            l2 === "input" && s.type === "radio" && s.name != null && Wd(n, s), Hl(l2, i);
            var o = Hl(l2, s);
            for (i = 0; i < a.length; i += 2) {
              var c = a[i], f = a[i + 1];
              c === "style" ? $d(n, f) : c === "dangerouslySetInnerHTML" ? Yd(n, f) : c === "children" ? Ln(n, f) : Xo(n, c, f, o);
            }
            switch (l2) {
              case "input":
                Fl(n, s);
                break;
              case "textarea":
                zd(n, s);
                break;
              case "select":
                var d = n._wrapperState.wasMultiple;
                n._wrapperState.wasMultiple = !!s.multiple;
                var m2 = s.value;
                m2 != null ? Er(n, !!s.multiple, m2, false) : d !== !!s.multiple && (s.defaultValue != null ? Er(n, !!s.multiple, s.defaultValue, true) : Er(n, !!s.multiple, s.multiple ? [] : "", false));
            }
            n[jn] = s;
          } catch (C2) {
            CA(A2, A2.return, C2);
          }
        }
        break;
      case 6:
        if (xe(e, A2), Te(A2), r & 4) {
          if (A2.stateNode === null) throw Error(S(162));
          n = A2.stateNode, s = A2.memoizedProps;
          try {
            n.nodeValue = s;
          } catch (C2) {
            CA(A2, A2.return, C2);
          }
        }
        break;
      case 3:
        if (xe(e, A2), Te(A2), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
          Kn(e.containerInfo);
        } catch (C2) {
          CA(A2, A2.return, C2);
        }
        break;
      case 4:
        xe(e, A2), Te(A2);
        break;
      case 13:
        xe(e, A2), Te(A2), n = A2.child, n.flags & 8192 && (s = n.memoizedState !== null, n.stateNode.isHidden = s, !s || n.alternate !== null && n.alternate.memoizedState !== null || (xu = FA())), r & 4 && Zc(A2);
        break;
      case 22:
        if (c = t !== null && t.memoizedState !== null, A2.mode & 1 ? (_A = (o = _A) || c, xe(e, A2), _A = o) : xe(e, A2), Te(A2), r & 8192) {
          if (o = A2.memoizedState !== null, (A2.stateNode.isHidden = o) && !c && A2.mode & 1) for (O = A2, c = A2.child; c !== null; ) {
            for (f = O = c; O !== null; ) {
              switch (d = O, m2 = d.child, d.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  vn(4, d, d.return);
                  break;
                case 1:
                  Ur(d, d.return);
                  var w2 = d.stateNode;
                  if (typeof w2.componentWillUnmount == "function") {
                    r = d, t = d.return;
                    try {
                      e = r, w2.props = e.memoizedProps, w2.state = e.memoizedState, w2.componentWillUnmount();
                    } catch (C2) {
                      CA(r, t, C2);
                    }
                  }
                  break;
                case 5:
                  Ur(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    qc(f);
                    continue;
                  }
              }
              m2 !== null ? (m2.return = d, O = m2) : qc(f);
            }
            c = c.sibling;
          }
          A: for (c = null, f = A2; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  n = f.stateNode, o ? (s = n.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (l2 = f.stateNode, a = f.memoizedProps.style, i = a != null && a.hasOwnProperty("display") ? a.display : null, l2.style.display = Zd("display", i));
                } catch (C2) {
                  CA(A2, A2.return, C2);
                }
              }
            } else if (f.tag === 6) {
              if (c === null) try {
                f.stateNode.nodeValue = o ? "" : f.memoizedProps;
              } catch (C2) {
                CA(A2, A2.return, C2);
              }
            } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === A2) && f.child !== null) {
              f.child.return = f, f = f.child;
              continue;
            }
            if (f === A2) break A;
            for (; f.sibling === null; ) {
              if (f.return === null || f.return === A2) break A;
              c === f && (c = null), f = f.return;
            }
            c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
          }
        }
        break;
      case 19:
        xe(e, A2), Te(A2), r & 4 && Zc(A2);
        break;
      case 21:
        break;
      default:
        xe(e, A2), Te(A2);
    }
  }
  function Te(A2) {
    var e = A2.flags;
    if (e & 2) {
      try {
        A: {
          for (var t = A2.return; t !== null; ) {
            if (Ug(t)) {
              var r = t;
              break A;
            }
            t = t.return;
          }
          throw Error(S(160));
        }
        switch (r.tag) {
          case 5:
            var n = r.stateNode;
            r.flags & 32 && (Ln(n, ""), r.flags &= -33);
            var s = Yc(A2);
            so(A2, s, n);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo, l2 = Yc(A2);
            no(A2, l2, i);
            break;
          default:
            throw Error(S(161));
        }
      } catch (a) {
        CA(A2, A2.return, a);
      }
      A2.flags &= -3;
    }
    e & 4096 && (A2.flags &= -4097);
  }
  function Lp(A2, e, t) {
    O = A2, yg(A2);
  }
  function yg(A2, e, t) {
    for (var r = (A2.mode & 1) !== 0; O !== null; ) {
      var n = O, s = n.child;
      if (n.tag === 22 && r) {
        var i = n.memoizedState !== null || ms;
        if (!i) {
          var l2 = n.alternate, a = l2 !== null && l2.memoizedState !== null || _A;
          l2 = ms;
          var o = _A;
          if (ms = i, (_A = a) && !o) for (O = n; O !== null; ) i = O, a = i.child, i.tag === 22 && i.memoizedState !== null ? Af(n) : a !== null ? (a.return = i, O = a) : Af(n);
          for (; s !== null; ) O = s, yg(s), s = s.sibling;
          O = n, ms = l2, _A = o;
        }
        $c(A2);
      } else n.subtreeFlags & 8772 && s !== null ? (s.return = n, O = s) : $c(A2);
    }
  }
  function $c(A2) {
    for (; O !== null; ) {
      var e = O;
      if (e.flags & 8772) {
        var t = e.alternate;
        try {
          if (e.flags & 8772) switch (e.tag) {
            case 0:
            case 11:
            case 15:
              _A || ra(5, e);
              break;
            case 1:
              var r = e.stateNode;
              if (e.flags & 4 && !_A) if (t === null) r.componentDidMount();
              else {
                var n = e.elementType === e.type ? t.memoizedProps : Ee(e.type, t.memoizedProps);
                r.componentDidUpdate(n, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var s = e.updateQueue;
              s !== null && Kc(e, s, r);
              break;
            case 3:
              var i = e.updateQueue;
              if (i !== null) {
                if (t = null, e.child !== null) switch (e.child.tag) {
                  case 5:
                    t = e.child.stateNode;
                    break;
                  case 1:
                    t = e.child.stateNode;
                }
                Kc(e, i, t);
              }
              break;
            case 5:
              var l2 = e.stateNode;
              if (t === null && e.flags & 4) {
                t = l2;
                var a = e.memoizedProps;
                switch (e.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && t.focus();
                    break;
                  case "img":
                    a.src && (t.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (e.memoizedState === null) {
                var o = e.alternate;
                if (o !== null) {
                  var c = o.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && Kn(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(S(163));
          }
          _A || e.flags & 512 && ro(e);
        } catch (d) {
          CA(e, e.return, d);
        }
      }
      if (e === A2) {
        O = null;
        break;
      }
      if (t = e.sibling, t !== null) {
        t.return = e.return, O = t;
        break;
      }
      O = e.return;
    }
  }
  function qc(A2) {
    for (; O !== null; ) {
      var e = O;
      if (e === A2) {
        O = null;
        break;
      }
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, O = t;
        break;
      }
      O = e.return;
    }
  }
  function Af(A2) {
    for (; O !== null; ) {
      var e = O;
      try {
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            var t = e.return;
            try {
              ra(4, e);
            } catch (a) {
              CA(e, t, a);
            }
            break;
          case 1:
            var r = e.stateNode;
            if (typeof r.componentDidMount == "function") {
              var n = e.return;
              try {
                r.componentDidMount();
              } catch (a) {
                CA(e, n, a);
              }
            }
            var s = e.return;
            try {
              ro(e);
            } catch (a) {
              CA(e, s, a);
            }
            break;
          case 5:
            var i = e.return;
            try {
              ro(e);
            } catch (a) {
              CA(e, i, a);
            }
        }
      } catch (a) {
        CA(e, e.return, a);
      }
      if (e === A2) {
        O = null;
        break;
      }
      var l2 = e.sibling;
      if (l2 !== null) {
        l2.return = e.return, O = l2;
        break;
      }
      O = e.return;
    }
  }
  var Np = Math.ceil;
  var Hi = rt.ReactCurrentDispatcher;
  var Uu = rt.ReactCurrentOwner;
  var me = rt.ReactCurrentBatchConfig;
  var Y = 0;
  var NA = null;
  var yA = null;
  var DA = 0;
  var ie = 0;
  var Fr = Nt(0);
  var SA = 0;
  var Wn = null;
  var Zt = 0;
  var na = 0;
  var Fu = 0;
  var Un = null;
  var $A = null;
  var xu = 0;
  var Or = 1 / 0;
  var Xe = null;
  var Si = false;
  var io = null;
  var Ut = null;
  var Cs = false;
  var Bt = null;
  var bi = 0;
  var Fn = 0;
  var ao = null;
  var ti = -1;
  var ri = 0;
  function WA() {
    return Y & 6 ? FA() : ti !== -1 ? ti : ti = FA();
  }
  function Ft(A2) {
    return A2.mode & 1 ? Y & 2 && DA !== 0 ? DA & -DA : hp.transition !== null ? (ri === 0 && (ri = uB()), ri) : (A2 = tA, A2 !== 0 || (A2 = window.event, A2 = A2 === void 0 ? 16 : wB(A2.type)), A2) : 1;
  }
  function be(A2, e, t, r) {
    if (50 < Fn) throw Fn = 0, ao = null, Error(S(185));
    $n(A2, t, r), (!(Y & 2) || A2 !== NA) && (A2 === NA && (!(Y & 2) && (na |= t), SA === 4 && ft(A2, DA)), te(A2, r), t === 1 && Y === 0 && !(e.mode & 1) && (Or = FA() + 500, Aa && kt()));
  }
  function te(A2, e) {
    var t = A2.callbackNode;
    hw(A2, e);
    var r = Bi(A2, A2 === NA ? DA : 0);
    if (r === 0) t !== null && oc(t), A2.callbackNode = null, A2.callbackPriority = 0;
    else if (e = r & -r, A2.callbackPriority !== e) {
      if (t != null && oc(t), e === 1) A2.tag === 0 ? gp(ef.bind(null, A2)) : KB(ef.bind(null, A2)), cp(function() {
        !(Y & 6) && kt();
      }), t = null;
      else {
        switch (cB(r)) {
          case 1:
            t = Zo;
            break;
          case 4:
            t = lB;
            break;
          case 16:
            t = di;
            break;
          case 536870912:
            t = oB;
            break;
          default:
            t = di;
        }
        t = kg(t, Eg.bind(null, A2));
      }
      A2.callbackPriority = e, A2.callbackNode = t;
    }
  }
  function Eg(A2, e) {
    if (ti = -1, ri = 0, Y & 6) throw Error(S(327));
    var t = A2.callbackNode;
    if (Lr() && A2.callbackNode !== t) return null;
    var r = Bi(A2, A2 === NA ? DA : 0);
    if (r === 0) return null;
    if (r & 30 || r & A2.expiredLanes || e) e = Li(A2, r);
    else {
      e = r;
      var n = Y;
      Y |= 2;
      var s = Hg();
      (NA !== A2 || DA !== e) && (Xe = null, Or = FA() + 500, Vt(A2, e));
      do
        try {
          Kp();
          break;
        } catch (l2) {
          Ig(A2, l2);
        }
      while (true);
      uu(), Hi.current = s, Y = n, yA !== null ? e = 0 : (NA = null, DA = 0, e = SA);
    }
    if (e !== 0) {
      if (e === 2 && (n = kl(A2), n !== 0 && (r = n, e = lo(A2, n))), e === 1) throw t = Wn, Vt(A2, 0), ft(A2, r), te(A2, FA()), t;
      if (e === 6) ft(A2, r);
      else {
        if (n = A2.current.alternate, !(r & 30) && !kp(n) && (e = Li(A2, r), e === 2 && (s = kl(A2), s !== 0 && (r = s, e = lo(A2, s))), e === 1)) throw t = Wn, Vt(A2, 0), ft(A2, r), te(A2, FA()), t;
        switch (A2.finishedWork = n, A2.finishedLanes = r, e) {
          case 0:
          case 1:
            throw Error(S(345));
          case 2:
            Mt(A2, $A, Xe);
            break;
          case 3:
            if (ft(A2, r), (r & 130023424) === r && (e = xu + 500 - FA(), 10 < e)) {
              if (Bi(A2, 0) !== 0) break;
              if (n = A2.suspendedLanes, (n & r) !== r) {
                WA(), A2.pingedLanes |= A2.suspendedLanes & n;
                break;
              }
              A2.timeoutHandle = Pl(Mt.bind(null, A2, $A, Xe), e);
              break;
            }
            Mt(A2, $A, Xe);
            break;
          case 4:
            if (ft(A2, r), (r & 4194240) === r) break;
            for (e = A2.eventTimes, n = -1; 0 < r; ) {
              var i = 31 - Se(r);
              s = 1 << i, i = e[i], i > n && (n = i), r &= ~s;
            }
            if (r = n, r = FA() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Np(r / 1960)) - r, 10 < r) {
              A2.timeoutHandle = Pl(Mt.bind(null, A2, $A, Xe), r);
              break;
            }
            Mt(A2, $A, Xe);
            break;
          case 5:
            Mt(A2, $A, Xe);
            break;
          default:
            throw Error(S(329));
        }
      }
    }
    return te(A2, FA()), A2.callbackNode === t ? Eg.bind(null, A2) : null;
  }
  function lo(A2, e) {
    var t = Un;
    return A2.current.memoizedState.isDehydrated && (Vt(A2, e).flags |= 256), A2 = Li(A2, e), A2 !== 2 && (e = $A, $A = t, e !== null && oo(e)), A2;
  }
  function oo(A2) {
    $A === null ? $A = A2 : $A.push.apply($A, A2);
  }
  function kp(A2) {
    for (var e = A2; ; ) {
      if (e.flags & 16384) {
        var t = e.updateQueue;
        if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
          var n = t[r], s = n.getSnapshot;
          n = n.value;
          try {
            if (!Le(s(), n)) return false;
          } catch {
            return false;
          }
        }
      }
      if (t = e.child, e.subtreeFlags & 16384 && t !== null) t.return = e, e = t;
      else {
        if (e === A2) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === A2) return true;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return true;
  }
  function ft(A2, e) {
    for (e &= ~Fu, e &= ~na, A2.suspendedLanes |= e, A2.pingedLanes &= ~e, A2 = A2.expirationTimes; 0 < e; ) {
      var t = 31 - Se(e), r = 1 << t;
      A2[t] = -1, e &= ~r;
    }
  }
  function ef(A2) {
    if (Y & 6) throw Error(S(327));
    Lr();
    var e = Bi(A2, 0);
    if (!(e & 1)) return te(A2, FA()), null;
    var t = Li(A2, e);
    if (A2.tag !== 0 && t === 2) {
      var r = kl(A2);
      r !== 0 && (e = r, t = lo(A2, r));
    }
    if (t === 1) throw t = Wn, Vt(A2, 0), ft(A2, e), te(A2, FA()), t;
    if (t === 6) throw Error(S(345));
    return A2.finishedWork = A2.current.alternate, A2.finishedLanes = e, Mt(A2, $A, Xe), te(A2, FA()), null;
  }
  function yu(A2, e) {
    var t = Y;
    Y |= 1;
    try {
      return A2(e);
    } finally {
      Y = t, Y === 0 && (Or = FA() + 500, Aa && kt());
    }
  }
  function $t(A2) {
    Bt !== null && Bt.tag === 0 && !(Y & 6) && Lr();
    var e = Y;
    Y |= 1;
    var t = me.transition, r = tA;
    try {
      if (me.transition = null, tA = 1, A2) return A2();
    } finally {
      tA = r, me.transition = t, Y = e, !(Y & 6) && kt();
    }
  }
  function Eu() {
    ie = Fr.current, cA(Fr);
  }
  function Vt(A2, e) {
    A2.finishedWork = null, A2.finishedLanes = 0;
    var t = A2.timeoutHandle;
    if (t !== -1 && (A2.timeoutHandle = -1, up(t)), yA !== null) for (t = yA.return; t !== null; ) {
      var r = t;
      switch (au(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && mi();
          break;
        case 3:
          Mr(), cA(Ae), cA(VA), hu();
          break;
        case 5:
          gu(r);
          break;
        case 4:
          Mr();
          break;
        case 13:
          cA(hA);
          break;
        case 19:
          cA(hA);
          break;
        case 10:
          cu(r.type._context);
          break;
        case 22:
        case 23:
          Eu();
      }
      t = t.return;
    }
    if (NA = A2, yA = A2 = xt(A2.current, null), DA = ie = e, SA = 0, Wn = null, Fu = na = Zt = 0, $A = Un = null, jt !== null) {
      for (e = 0; e < jt.length; e++) if (t = jt[e], r = t.interleaved, r !== null) {
        t.interleaved = null;
        var n = r.next, s = t.pending;
        if (s !== null) {
          var i = s.next;
          s.next = n, r.next = i;
        }
        t.pending = r;
      }
      jt = null;
    }
    return A2;
  }
  function Ig(A2, e) {
    do {
      var t = yA;
      try {
        if (uu(), qs.current = Ii, Ei) {
          for (var r = wA.memoizedState; r !== null; ) {
            var n = r.queue;
            n !== null && (n.pending = null), r = r.next;
          }
          Ei = false;
        }
        if (Yt = 0, LA = IA = wA = null, Qn = false, Vn = 0, Uu.current = null, t === null || t.return === null) {
          SA = 1, Wn = e, yA = null;
          break;
        }
        A: {
          var s = A2, i = t.return, l2 = t, a = e;
          if (e = DA, l2.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
            var o = a, c = l2, f = c.tag;
            if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
              var d = c.alternate;
              d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
            }
            var m2 = Pc(i);
            if (m2 !== null) {
              m2.flags &= -257, _c(m2, i, l2, s, e), m2.mode & 1 && jc(s, o, e), e = m2, a = o;
              var w2 = e.updateQueue;
              if (w2 === null) {
                var C2 = /* @__PURE__ */ new Set();
                C2.add(a), e.updateQueue = C2;
              } else w2.add(a);
              break A;
            } else {
              if (!(e & 1)) {
                jc(s, o, e), Iu();
                break A;
              }
              a = Error(S(426));
            }
          } else if (BA && l2.mode & 1) {
            var U = Pc(i);
            if (U !== null) {
              !(U.flags & 65536) && (U.flags |= 256), _c(U, i, l2, s, e), lu(Rr(a, l2));
              break A;
            }
          }
          s = a = Rr(a, l2), SA !== 4 && (SA = 2), Un === null ? Un = [s] : Un.push(s), s = i;
          do {
            switch (s.tag) {
              case 3:
                s.flags |= 65536, e &= -e, s.lanes |= e;
                var h = cg(s, a, e);
                Tc(s, h);
                break A;
              case 1:
                l2 = a;
                var B = s.type, p = s.stateNode;
                if (!(s.flags & 128) && (typeof B.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (Ut === null || !Ut.has(p)))) {
                  s.flags |= 65536, e &= -e, s.lanes |= e;
                  var v2 = fg(s, l2, e);
                  Tc(s, v2);
                  break A;
                }
            }
            s = s.return;
          } while (s !== null);
        }
        bg(t);
      } catch (x) {
        e = x, yA === t && t !== null && (yA = t = t.return);
        continue;
      }
      break;
    } while (true);
  }
  function Hg() {
    var A2 = Hi.current;
    return Hi.current = Ii, A2 === null ? Ii : A2;
  }
  function Iu() {
    (SA === 0 || SA === 3 || SA === 2) && (SA = 4), NA === null || !(Zt & 268435455) && !(na & 268435455) || ft(NA, DA);
  }
  function Li(A2, e) {
    var t = Y;
    Y |= 2;
    var r = Hg();
    (NA !== A2 || DA !== e) && (Xe = null, Vt(A2, e));
    do
      try {
        Tp();
        break;
      } catch (n) {
        Ig(A2, n);
      }
    while (true);
    if (uu(), Y = t, Hi.current = r, yA !== null) throw Error(S(261));
    return NA = null, DA = 0, SA;
  }
  function Tp() {
    for (; yA !== null; ) Sg(yA);
  }
  function Kp() {
    for (; yA !== null && !aw(); ) Sg(yA);
  }
  function Sg(A2) {
    var e = Ng(A2.alternate, A2, ie);
    A2.memoizedProps = A2.pendingProps, e === null ? bg(A2) : yA = e, Uu.current = null;
  }
  function bg(A2) {
    var e = A2;
    do {
      var t = e.alternate;
      if (A2 = e.return, e.flags & 32768) {
        if (t = Hp(t, e), t !== null) {
          t.flags &= 32767, yA = t;
          return;
        }
        if (A2 !== null) A2.flags |= 32768, A2.subtreeFlags = 0, A2.deletions = null;
        else {
          SA = 6, yA = null;
          return;
        }
      } else if (t = Ip(t, e, ie), t !== null) {
        yA = t;
        return;
      }
      if (e = e.sibling, e !== null) {
        yA = e;
        return;
      }
      yA = e = A2;
    } while (e !== null);
    SA === 0 && (SA = 5);
  }
  function Mt(A2, e, t) {
    var r = tA, n = me.transition;
    try {
      me.transition = null, tA = 1, Dp(A2, e, t, r);
    } finally {
      me.transition = n, tA = r;
    }
    return null;
  }
  function Dp(A2, e, t, r) {
    do
      Lr();
    while (Bt !== null);
    if (Y & 6) throw Error(S(327));
    t = A2.finishedWork;
    var n = A2.finishedLanes;
    if (t === null) return null;
    if (A2.finishedWork = null, A2.finishedLanes = 0, t === A2.current) throw Error(S(177));
    A2.callbackNode = null, A2.callbackPriority = 0;
    var s = t.lanes | t.childLanes;
    if (ww(A2, s), A2 === NA && (yA = NA = null, DA = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || Cs || (Cs = true, kg(di, function() {
      return Lr(), null;
    })), s = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || s) {
      s = me.transition, me.transition = null;
      var i = tA;
      tA = 1;
      var l2 = Y;
      Y |= 4, Uu.current = null, bp(A2, t), xg(t, A2), rp(Ol), gi = !!Rl, Ol = Rl = null, A2.current = t, Lp(t), lw(), Y = l2, tA = i, me.transition = s;
    } else A2.current = t;
    if (Cs && (Cs = false, Bt = A2, bi = n), s = A2.pendingLanes, s === 0 && (Ut = null), cw(t.stateNode), te(A2, FA()), e !== null) for (r = A2.onRecoverableError, t = 0; t < e.length; t++) n = e[t], r(n.value, { componentStack: n.stack, digest: n.digest });
    if (Si) throw Si = false, A2 = io, io = null, A2;
    return bi & 1 && A2.tag !== 0 && Lr(), s = A2.pendingLanes, s & 1 ? A2 === ao ? Fn++ : (Fn = 0, ao = A2) : Fn = 0, kt(), null;
  }
  function Lr() {
    if (Bt !== null) {
      var A2 = cB(bi), e = me.transition, t = tA;
      try {
        if (me.transition = null, tA = 16 > A2 ? 16 : A2, Bt === null) var r = false;
        else {
          if (A2 = Bt, Bt = null, bi = 0, Y & 6) throw Error(S(331));
          var n = Y;
          for (Y |= 4, O = A2.current; O !== null; ) {
            var s = O, i = s.child;
            if (O.flags & 16) {
              var l2 = s.deletions;
              if (l2 !== null) {
                for (var a = 0; a < l2.length; a++) {
                  var o = l2[a];
                  for (O = o; O !== null; ) {
                    var c = O;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        vn(8, c, s);
                    }
                    var f = c.child;
                    if (f !== null) f.return = c, O = f;
                    else for (; O !== null; ) {
                      c = O;
                      var d = c.sibling, m2 = c.return;
                      if (vg(c), c === o) {
                        O = null;
                        break;
                      }
                      if (d !== null) {
                        d.return = m2, O = d;
                        break;
                      }
                      O = m2;
                    }
                  }
                }
                var w2 = s.alternate;
                if (w2 !== null) {
                  var C2 = w2.child;
                  if (C2 !== null) {
                    w2.child = null;
                    do {
                      var U = C2.sibling;
                      C2.sibling = null, C2 = U;
                    } while (C2 !== null);
                  }
                }
                O = s;
              }
            }
            if (s.subtreeFlags & 2064 && i !== null) i.return = s, O = i;
            else A: for (; O !== null; ) {
              if (s = O, s.flags & 2048) switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  vn(9, s, s.return);
              }
              var h = s.sibling;
              if (h !== null) {
                h.return = s.return, O = h;
                break A;
              }
              O = s.return;
            }
          }
          var B = A2.current;
          for (O = B; O !== null; ) {
            i = O;
            var p = i.child;
            if (i.subtreeFlags & 2064 && p !== null) p.return = i, O = p;
            else A: for (i = B; O !== null; ) {
              if (l2 = O, l2.flags & 2048) try {
                switch (l2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ra(9, l2);
                }
              } catch (x) {
                CA(l2, l2.return, x);
              }
              if (l2 === i) {
                O = null;
                break A;
              }
              var v2 = l2.sibling;
              if (v2 !== null) {
                v2.return = l2.return, O = v2;
                break A;
              }
              O = l2.return;
            }
          }
          if (Y = n, kt(), Re && typeof Re.onPostCommitFiberRoot == "function") try {
            Re.onPostCommitFiberRoot(Ji, A2);
          } catch {
          }
          r = true;
        }
        return r;
      } finally {
        tA = t, me.transition = e;
      }
    }
    return false;
  }
  function tf(A2, e, t) {
    e = Rr(t, e), e = cg(A2, e, 1), A2 = vt(A2, e, 1), e = WA(), A2 !== null && ($n(A2, 1, e), te(A2, e));
  }
  function CA(A2, e, t) {
    if (A2.tag === 3) tf(A2, A2, t);
    else for (; e !== null; ) {
      if (e.tag === 3) {
        tf(e, A2, t);
        break;
      } else if (e.tag === 1) {
        var r = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ut === null || !Ut.has(r))) {
          A2 = Rr(t, A2), A2 = fg(e, A2, 1), e = vt(e, A2, 1), A2 = WA(), e !== null && ($n(e, 1, A2), te(e, A2));
          break;
        }
      }
      e = e.return;
    }
  }
  function Mp(A2, e, t) {
    var r = A2.pingCache;
    r !== null && r.delete(e), e = WA(), A2.pingedLanes |= A2.suspendedLanes & t, NA === A2 && (DA & t) === t && (SA === 4 || SA === 3 && (DA & 130023424) === DA && 500 > FA() - xu ? Vt(A2, 0) : Fu |= t), te(A2, e);
  }
  function Lg(A2, e) {
    e === 0 && (A2.mode & 1 ? (e = us, us <<= 1, !(us & 130023424) && (us = 4194304)) : e = 1);
    var t = WA();
    A2 = At(A2, e), A2 !== null && ($n(A2, e, t), te(A2, t));
  }
  function Rp(A2) {
    var e = A2.memoizedState, t = 0;
    e !== null && (t = e.retryLane), Lg(A2, t);
  }
  function Op(A2, e) {
    var t = 0;
    switch (A2.tag) {
      case 13:
        var r = A2.stateNode, n = A2.memoizedState;
        n !== null && (t = n.retryLane);
        break;
      case 19:
        r = A2.stateNode;
        break;
      default:
        throw Error(S(314));
    }
    r !== null && r.delete(e), Lg(A2, t);
  }
  var Ng;
  Ng = function(A2, e, t) {
    if (A2 !== null) if (A2.memoizedProps !== e.pendingProps || Ae.current) qA = true;
    else {
      if (!(A2.lanes & t) && !(e.flags & 128)) return qA = false, Ep(A2, e, t);
      qA = !!(A2.flags & 131072);
    }
    else qA = false, BA && e.flags & 1048576 && DB(e, vi, e.index);
    switch (e.lanes = 0, e.tag) {
      case 2:
        var r = e.type;
        ei(A2, e), A2 = e.pendingProps;
        var n = Tr(e, VA.current);
        br(e, t), n = pu(null, e, r, A2, n, t);
        var s = mu();
        return e.flags |= 1, typeof n == "object" && n !== null && typeof n.render == "function" && n.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, ee(r) ? (s = true, Ci(e)) : s = false, e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, du(e), n.updater = ta, e.stateNode = n, n._reactInternals = e, Jl(e, r, A2, t), e = $l(null, e, r, true, s, t)) : (e.tag = 0, BA && s && iu(e), XA(null, e, n, t), e = e.child), e;
      case 16:
        r = e.elementType;
        A: {
          switch (ei(A2, e), A2 = e.pendingProps, n = r._init, r = n(r._payload), e.type = r, n = e.tag = Pp(r), A2 = Ee(r, A2), n) {
            case 0:
              e = Zl(null, e, r, A2, t);
              break A;
            case 1:
              e = Xc(null, e, r, A2, t);
              break A;
            case 11:
              e = Vc(null, e, r, A2, t);
              break A;
            case 14:
              e = Gc(null, e, r, Ee(r.type, A2), t);
              break A;
          }
          throw Error(S(306, r, ""));
        }
        return e;
      case 0:
        return r = e.type, n = e.pendingProps, n = e.elementType === r ? n : Ee(r, n), Zl(A2, e, r, n, t);
      case 1:
        return r = e.type, n = e.pendingProps, n = e.elementType === r ? n : Ee(r, n), Xc(A2, e, r, n, t);
      case 3:
        A: {
          if (hg(e), A2 === null) throw Error(S(387));
          r = e.pendingProps, s = e.memoizedState, n = s.element, _B(A2, e), xi(e, r, null, t);
          var i = e.memoizedState;
          if (r = i.element, s.isDehydrated) if (s = { element: r, isDehydrated: false, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
            n = Rr(Error(S(423)), e), e = Wc(A2, e, r, t, n);
            break A;
          } else if (r !== n) {
            n = Rr(Error(S(424)), e), e = Wc(A2, e, r, t, n);
            break A;
          } else for (ae = Qt(e.stateNode.containerInfo.firstChild), le = e, BA = true, He = null, t = jB(e, null, r, t), e.child = t; t; ) t.flags = t.flags & -3 | 4096, t = t.sibling;
          else {
            if (Kr(), r === n) {
              e = et(A2, e, t);
              break A;
            }
            XA(A2, e, r, t);
          }
          e = e.child;
        }
        return e;
      case 5:
        return VB(e), A2 === null && Xl(e), r = e.type, n = e.pendingProps, s = A2 !== null ? A2.memoizedProps : null, i = n.children, jl(r, n) ? i = null : s !== null && jl(r, s) && (e.flags |= 32), gg(A2, e), XA(A2, e, i, t), e.child;
      case 6:
        return A2 === null && Xl(e), null;
      case 13:
        return wg(A2, e, t);
      case 4:
        return Bu(e, e.stateNode.containerInfo), r = e.pendingProps, A2 === null ? e.child = Dr(e, null, r, t) : XA(A2, e, r, t), e.child;
      case 11:
        return r = e.type, n = e.pendingProps, n = e.elementType === r ? n : Ee(r, n), Vc(A2, e, r, n, t);
      case 7:
        return XA(A2, e, e.pendingProps, t), e.child;
      case 8:
        return XA(A2, e, e.pendingProps.children, t), e.child;
      case 12:
        return XA(A2, e, e.pendingProps.children, t), e.child;
      case 10:
        A: {
          if (r = e.type._context, n = e.pendingProps, s = e.memoizedProps, i = n.value, lA(Ui, r._currentValue), r._currentValue = i, s !== null) if (Le(s.value, i)) {
            if (s.children === n.children && !Ae.current) {
              e = et(A2, e, t);
              break A;
            }
          } else for (s = e.child, s !== null && (s.return = e); s !== null; ) {
            var l2 = s.dependencies;
            if (l2 !== null) {
              i = s.child;
              for (var a = l2.firstContext; a !== null; ) {
                if (a.context === r) {
                  if (s.tag === 1) {
                    a = Ye(-1, t & -t), a.tag = 2;
                    var o = s.updateQueue;
                    if (o !== null) {
                      o = o.shared;
                      var c = o.pending;
                      c === null ? a.next = a : (a.next = c.next, c.next = a), o.pending = a;
                    }
                  }
                  s.lanes |= t, a = s.alternate, a !== null && (a.lanes |= t), Wl(s.return, t, e), l2.lanes |= t;
                  break;
                }
                a = a.next;
              }
            } else if (s.tag === 10) i = s.type === e.type ? null : s.child;
            else if (s.tag === 18) {
              if (i = s.return, i === null) throw Error(S(341));
              i.lanes |= t, l2 = i.alternate, l2 !== null && (l2.lanes |= t), Wl(i, t, e), i = s.sibling;
            } else i = s.child;
            if (i !== null) i.return = s;
            else for (i = s; i !== null; ) {
              if (i === e) {
                i = null;
                break;
              }
              if (s = i.sibling, s !== null) {
                s.return = i.return, i = s;
                break;
              }
              i = i.return;
            }
            s = i;
          }
          XA(A2, e, n.children, t), e = e.child;
        }
        return e;
      case 9:
        return n = e.type, r = e.pendingProps.children, br(e, t), n = Ce(n), r = r(n), e.flags |= 1, XA(A2, e, r, t), e.child;
      case 14:
        return r = e.type, n = Ee(r, e.pendingProps), n = Ee(r.type, n), Gc(A2, e, r, n, t);
      case 15:
        return dg(A2, e, e.type, e.pendingProps, t);
      case 17:
        return r = e.type, n = e.pendingProps, n = e.elementType === r ? n : Ee(r, n), ei(A2, e), e.tag = 1, ee(r) ? (A2 = true, Ci(e)) : A2 = false, br(e, t), ug(e, r, n), Jl(e, r, n, t), $l(null, e, r, true, A2, t);
      case 19:
        return pg(A2, e, t);
      case 22:
        return Bg(A2, e, t);
    }
    throw Error(S(156, e.tag));
  };
  function kg(A2, e) {
    return aB(A2, e);
  }
  function jp(A2, e, t, r) {
    this.tag = A2, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function he(A2, e, t, r) {
    return new jp(A2, e, t, r);
  }
  function Hu(A2) {
    return A2 = A2.prototype, !(!A2 || !A2.isReactComponent);
  }
  function Pp(A2) {
    if (typeof A2 == "function") return Hu(A2) ? 1 : 0;
    if (A2 != null) {
      if (A2 = A2.$$typeof, A2 === zo) return 11;
      if (A2 === Jo) return 14;
    }
    return 2;
  }
  function xt(A2, e) {
    var t = A2.alternate;
    return t === null ? (t = he(A2.tag, e, A2.key, A2.mode), t.elementType = A2.elementType, t.type = A2.type, t.stateNode = A2.stateNode, t.alternate = A2, A2.alternate = t) : (t.pendingProps = e, t.type = A2.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = A2.flags & 14680064, t.childLanes = A2.childLanes, t.lanes = A2.lanes, t.child = A2.child, t.memoizedProps = A2.memoizedProps, t.memoizedState = A2.memoizedState, t.updateQueue = A2.updateQueue, e = A2.dependencies, t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, t.sibling = A2.sibling, t.index = A2.index, t.ref = A2.ref, t;
  }
  function ni(A2, e, t, r, n, s) {
    var i = 2;
    if (r = A2, typeof A2 == "function") Hu(A2) && (i = 1);
    else if (typeof A2 == "string") i = 5;
    else A: switch (A2) {
      case Br:
        return Gt(t.children, n, s, e);
      case Wo:
        i = 8, n |= 8;
        break;
      case ml:
        return A2 = he(12, t, e, n | 2), A2.elementType = ml, A2.lanes = s, A2;
      case Cl:
        return A2 = he(13, t, e, n), A2.elementType = Cl, A2.lanes = s, A2;
      case Ql:
        return A2 = he(19, t, e, n), A2.elementType = Ql, A2.lanes = s, A2;
      case Vd:
        return sa(t, n, s, e);
      default:
        if (typeof A2 == "object" && A2 !== null) switch (A2.$$typeof) {
          case Pd:
            i = 10;
            break A;
          case _d:
            i = 9;
            break A;
          case zo:
            i = 11;
            break A;
          case Jo:
            i = 14;
            break A;
          case lt:
            i = 16, r = null;
            break A;
        }
        throw Error(S(130, A2 == null ? A2 : typeof A2, ""));
    }
    return e = he(i, t, e, n), e.elementType = A2, e.type = r, e.lanes = s, e;
  }
  function Gt(A2, e, t, r) {
    return A2 = he(7, A2, r, e), A2.lanes = t, A2;
  }
  function sa(A2, e, t, r) {
    return A2 = he(22, A2, r, e), A2.elementType = Vd, A2.lanes = t, A2.stateNode = { isHidden: false }, A2;
  }
  function Xa(A2, e, t) {
    return A2 = he(6, A2, null, e), A2.lanes = t, A2;
  }
  function Wa(A2, e, t) {
    return e = he(4, A2.children !== null ? A2.children : [], A2.key, e), e.lanes = t, e.stateNode = { containerInfo: A2.containerInfo, pendingChildren: null, implementation: A2.implementation }, e;
  }
  function _p(A2, e, t, r, n) {
    this.tag = e, this.containerInfo = A2, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ea(0), this.expirationTimes = Ea(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ea(0), this.identifierPrefix = r, this.onRecoverableError = n, this.mutableSourceEagerHydrationData = null;
  }
  function Su(A2, e, t, r, n, s, i, l2, a) {
    return A2 = new _p(A2, e, t, l2, a), e === 1 ? (e = 1, s === true && (e |= 8)) : e = 0, s = he(3, null, null, e), A2.current = s, s.stateNode = A2, s.memoizedState = { element: r, isDehydrated: t, cache: null, transitions: null, pendingSuspenseBoundaries: null }, du(s), A2;
  }
  function Vp(A2, e, t) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: dr, key: r == null ? null : "" + r, children: A2, containerInfo: e, implementation: t };
  }
  function Tg(A2) {
    if (!A2) return St;
    A2 = A2._reactInternals;
    A: {
      if (er(A2) !== A2 || A2.tag !== 1) throw Error(S(170));
      var e = A2;
      do {
        switch (e.tag) {
          case 3:
            e = e.stateNode.context;
            break A;
          case 1:
            if (ee(e.type)) {
              e = e.stateNode.__reactInternalMemoizedMergedChildContext;
              break A;
            }
        }
        e = e.return;
      } while (e !== null);
      throw Error(S(171));
    }
    if (A2.tag === 1) {
      var t = A2.type;
      if (ee(t)) return TB(A2, t, e);
    }
    return e;
  }
  function Kg(A2, e, t, r, n, s, i, l2, a) {
    return A2 = Su(t, r, true, A2, n, s, i, l2, a), A2.context = Tg(null), t = A2.current, r = WA(), n = Ft(t), s = Ye(r, n), s.callback = e ?? null, vt(t, s, n), A2.current.lanes = n, $n(A2, n, r), te(A2, r), A2;
  }
  function ia(A2, e, t, r) {
    var n = e.current, s = WA(), i = Ft(n);
    return t = Tg(t), e.context === null ? e.context = t : e.pendingContext = t, e = Ye(s, i), e.payload = { element: A2 }, r = r === void 0 ? null : r, r !== null && (e.callback = r), A2 = vt(n, e, i), A2 !== null && (be(A2, n, i, s), $s(A2, n, i)), i;
  }
  function Ni(A2) {
    if (A2 = A2.current, !A2.child) return null;
    switch (A2.child.tag) {
      case 5:
        return A2.child.stateNode;
      default:
        return A2.child.stateNode;
    }
  }
  function rf(A2, e) {
    if (A2 = A2.memoizedState, A2 !== null && A2.dehydrated !== null) {
      var t = A2.retryLane;
      A2.retryLane = t !== 0 && t < e ? t : e;
    }
  }
  function bu(A2, e) {
    rf(A2, e), (A2 = A2.alternate) && rf(A2, e);
  }
  function Gp() {
    return null;
  }
  var Dg = typeof reportError == "function" ? reportError : function(A2) {
    console.error(A2);
  };
  function Lu(A2) {
    this._internalRoot = A2;
  }
  aa.prototype.render = Lu.prototype.render = function(A2) {
    var e = this._internalRoot;
    if (e === null) throw Error(S(409));
    ia(A2, e, null, null);
  };
  aa.prototype.unmount = Lu.prototype.unmount = function() {
    var A2 = this._internalRoot;
    if (A2 !== null) {
      this._internalRoot = null;
      var e = A2.containerInfo;
      $t(function() {
        ia(null, A2, null, null);
      }), e[qe] = null;
    }
  };
  function aa(A2) {
    this._internalRoot = A2;
  }
  aa.prototype.unstable_scheduleHydration = function(A2) {
    if (A2) {
      var e = BB();
      A2 = { blockedOn: null, target: A2, priority: e };
      for (var t = 0; t < ct.length && e !== 0 && e < ct[t].priority; t++) ;
      ct.splice(t, 0, A2), t === 0 && hB(A2);
    }
  };
  function Nu(A2) {
    return !(!A2 || A2.nodeType !== 1 && A2.nodeType !== 9 && A2.nodeType !== 11);
  }
  function la(A2) {
    return !(!A2 || A2.nodeType !== 1 && A2.nodeType !== 9 && A2.nodeType !== 11 && (A2.nodeType !== 8 || A2.nodeValue !== " react-mount-point-unstable "));
  }
  function nf() {
  }
  function Xp(A2, e, t, r, n) {
    if (n) {
      if (typeof r == "function") {
        var s = r;
        r = function() {
          var o = Ni(i);
          s.call(o);
        };
      }
      var i = Kg(e, r, A2, 0, null, false, false, "", nf);
      return A2._reactRootContainer = i, A2[qe] = i.current, Rn(A2.nodeType === 8 ? A2.parentNode : A2), $t(), i;
    }
    for (; n = A2.lastChild; ) A2.removeChild(n);
    if (typeof r == "function") {
      var l2 = r;
      r = function() {
        var o = Ni(a);
        l2.call(o);
      };
    }
    var a = Su(A2, 0, false, null, null, false, false, "", nf);
    return A2._reactRootContainer = a, A2[qe] = a.current, Rn(A2.nodeType === 8 ? A2.parentNode : A2), $t(function() {
      ia(e, a, t, r);
    }), a;
  }
  function oa(A2, e, t, r, n) {
    var s = t._reactRootContainer;
    if (s) {
      var i = s;
      if (typeof n == "function") {
        var l2 = n;
        n = function() {
          var a = Ni(i);
          l2.call(a);
        };
      }
      ia(e, i, A2, n);
    } else i = Xp(t, e, A2, n, r);
    return Ni(i);
  }
  fB = function(A2) {
    switch (A2.tag) {
      case 3:
        var e = A2.stateNode;
        if (e.current.memoizedState.isDehydrated) {
          var t = an(e.pendingLanes);
          t !== 0 && ($o(e, t | 1), te(e, FA()), !(Y & 6) && (Or = FA() + 500, kt()));
        }
        break;
      case 13:
        $t(function() {
          var r = At(A2, 1);
          if (r !== null) {
            var n = WA();
            be(r, A2, 1, n);
          }
        }), bu(A2, 1);
    }
  };
  qo = function(A2) {
    if (A2.tag === 13) {
      var e = At(A2, 134217728);
      if (e !== null) {
        var t = WA();
        be(e, A2, 134217728, t);
      }
      bu(A2, 134217728);
    }
  };
  dB = function(A2) {
    if (A2.tag === 13) {
      var e = Ft(A2), t = At(A2, e);
      if (t !== null) {
        var r = WA();
        be(t, A2, e, r);
      }
      bu(A2, e);
    }
  };
  BB = function() {
    return tA;
  };
  gB = function(A2, e) {
    var t = tA;
    try {
      return tA = A2, e();
    } finally {
      tA = t;
    }
  };
  bl = function(A2, e, t) {
    switch (e) {
      case "input":
        if (Fl(A2, t), e = t.name, t.type === "radio" && e != null) {
          for (t = A2; t.parentNode; ) t = t.parentNode;
          for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < t.length; e++) {
            var r = t[e];
            if (r !== A2 && r.form === A2.form) {
              var n = qi(r);
              if (!n) throw Error(S(90));
              Xd(r), Fl(r, n);
            }
          }
        }
        break;
      case "textarea":
        zd(A2, t);
        break;
      case "select":
        e = t.value, e != null && Er(A2, !!t.multiple, e, false);
    }
  };
  eB = yu;
  tB = $t;
  var Wp = { usingClientEntryPoint: false, Events: [As, pr, qi, qd, AB, yu] };
  var qr = { findFiberByHostInstance: Ot, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var zp = { bundleType: qr.bundleType, version: qr.version, rendererPackageName: qr.rendererPackageName, rendererConfig: qr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(A2) {
    return A2 = sB(A2), A2 === null ? null : A2.stateNode;
  }, findFiberByHostInstance: qr.findFiberByHostInstance || Gp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    Qs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qs.isDisabled && Qs.supportsFiber) try {
      Ji = Qs.inject(zp), Re = Qs;
    } catch {
    }
  }
  var Qs;
  ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wp;
  ue.createPortal = function(A2, e) {
    var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Nu(e)) throw Error(S(200));
    return Vp(A2, e, null, t);
  };
  ue.createRoot = function(A2, e) {
    if (!Nu(A2)) throw Error(S(299));
    var t = false, r = "", n = Dg;
    return e != null && (e.unstable_strictMode === true && (t = true), e.identifierPrefix !== void 0 && (r = e.identifierPrefix), e.onRecoverableError !== void 0 && (n = e.onRecoverableError)), e = Su(A2, 1, false, null, null, t, false, r, n), A2[qe] = e.current, Rn(A2.nodeType === 8 ? A2.parentNode : A2), new Lu(e);
  };
  ue.findDOMNode = function(A2) {
    if (A2 == null) return null;
    if (A2.nodeType === 1) return A2;
    var e = A2._reactInternals;
    if (e === void 0) throw typeof A2.render == "function" ? Error(S(188)) : (A2 = Object.keys(A2).join(","), Error(S(268, A2)));
    return A2 = sB(e), A2 = A2 === null ? null : A2.stateNode, A2;
  };
  ue.flushSync = function(A2) {
    return $t(A2);
  };
  ue.hydrate = function(A2, e, t) {
    if (!la(e)) throw Error(S(200));
    return oa(null, A2, e, true, t);
  };
  ue.hydrateRoot = function(A2, e, t) {
    if (!Nu(A2)) throw Error(S(405));
    var r = t != null && t.hydratedSources || null, n = false, s = "", i = Dg;
    if (t != null && (t.unstable_strictMode === true && (n = true), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), e = Kg(e, null, A2, 1, t ?? null, n, false, s, i), A2[qe] = e.current, Rn(A2), r) for (A2 = 0; A2 < r.length; A2++) t = r[A2], n = t._getVersion, n = n(t._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, n] : e.mutableSourceEagerHydrationData.push(t, n);
    return new aa(e);
  };
  ue.render = function(A2, e, t) {
    if (!la(e)) throw Error(S(200));
    return oa(null, A2, e, false, t);
  };
  ue.unmountComponentAtNode = function(A2) {
    if (!la(A2)) throw Error(S(40));
    return A2._reactRootContainer ? ($t(function() {
      oa(null, null, A2, false, function() {
        A2._reactRootContainer = null, A2[qe] = null;
      });
    }), true) : false;
  };
  ue.unstable_batchedUpdates = yu;
  ue.unstable_renderSubtreeIntoContainer = function(A2, e, t, r) {
    if (!la(t)) throw Error(S(200));
    if (A2 == null || A2._reactInternals === void 0) throw Error(S(38));
    return oa(A2, e, t, false, r);
  };
  ue.version = "18.3.1-next-f1338f8080-20240426";
  function Mg() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mg);
    } catch (A2) {
      console.error(A2);
    }
  }
  Mg(), Md.exports = ue;
  var Jp = Md.exports;
  var sf = Jp;
  qu.createRoot = sf.createRoot, qu.hydrateRoot = sf.hydrateRoot;
  var Yp = (A2) => A2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var Rg = (...A2) => A2.filter((e, t, r) => !!e && e.trim() !== "" && r.indexOf(e) === t).join(" ").trim();
  var Zp = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  var $p = uA.forwardRef(({ color: A2 = "currentColor", size: e = 24, strokeWidth: t = 2, absoluteStrokeWidth: r, className: n = "", children: s, iconNode: i, ...l2 }, a) => uA.createElement("svg", { ref: a, ...Zp, width: e, height: e, stroke: A2, strokeWidth: r ? Number(t) * 24 / Number(e) : t, className: Rg("lucide", n), ...l2 }, [...i.map(([o, c]) => uA.createElement(o, c)), ...Array.isArray(s) ? s : [s]]));
  var gA = (A2, e) => {
    const t = uA.forwardRef(({ className: r, ...n }, s) => uA.createElement($p, { ref: s, iconNode: e, className: Rg(`lucide-${Yp(A2)}`, r), ...n }));
    return t.displayName = `${A2}`, t;
  };
  var ki = gA("Armchair", [["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3", key: "irtipd" }], ["path", { d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z", key: "1qyhux" }], ["path", { d: "M5 18v2", key: "ppbyun" }], ["path", { d: "M19 18v2", key: "gy7782" }]]);
  var af = gA("Calendar", [["path", { d: "M8 2v4", key: "1cmpym" }], ["path", { d: "M16 2v4", key: "4m81vk" }], ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }], ["path", { d: "M3 10h18", key: "8toen8" }]]);
  var qp = gA("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
  var Xx = gA("CircleCheck", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]]);
  var lf = gA("Clock", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]]);
  var Wx = gA("Compass", [["path", { d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z", key: "9ktpf1" }], ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
  var zx = gA("Copy", [["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }], ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]]);
  var Am = gA("Crown", [["path", { d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z", key: "1vdc57" }], ["path", { d: "M5 21h14", key: "11awu3" }]]);
  var of = gA("DoorClosed", [["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "36qu9e" }], ["path", { d: "M2 20h20", key: "owomy5" }], ["path", { d: "M14 12v.01", key: "xfcn54" }]]);
  var em = gA("Download", [["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }], ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }], ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]]);
  var uf = gA("MapPin", [["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0", key: "1r0f0z" }], ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]]);
  var tm = gA("Plus", [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]]);
  var rm = gA("Printer", [["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", key: "143wyd" }], ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }], ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]]);
  var nm = gA("RefreshCw", [["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }], ["path", { d: "M21 3v5h-5", key: "1q7to0" }], ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }], ["path", { d: "M8 16H3v5", key: "1cv678" }]]);
  var cf = gA("RotateCcw", [["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }], ["path", { d: "M3 3v5h5", key: "1xhq8a" }]]);
  var sm = gA("Save", [["path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", key: "1c8476" }], ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }], ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]]);
  var im = gA("Search", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]]);
  var uo = gA("Ticket", [["path", { d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z", key: "qn84l0" }], ["path", { d: "M13 5v2", key: "dyzc3o" }], ["path", { d: "M13 17v2", key: "1ont0d" }], ["path", { d: "M13 11v2", key: "1wjjxi" }]]);
  var vs = gA("Trash2", [["path", { d: "M3 6h18", key: "d0wm0j" }], ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }], ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }], ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }], ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]]);
  var am = gA("UserCheck", [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }], ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }], ["polyline", { points: "16 11 18 13 22 9", key: "1pwet4" }]]);
  var ff = gA("User", [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]]);
  var Og = gA("X", [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]]);
  var df = gA("ZoomIn", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }], ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }], ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]]);
  var Bf = gA("ZoomOut", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }], ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]]);
  var ku = {};
  (function A(e, t, r, n) {
    var s = !!(e.Worker && e.Blob && e.Promise && e.OffscreenCanvas && e.OffscreenCanvasRenderingContext2D && e.HTMLCanvasElement && e.HTMLCanvasElement.prototype.transferControlToOffscreen && e.URL && e.URL.createObjectURL), i = typeof Path2D == "function" && typeof DOMMatrix == "function", l2 = function() {
      if (!e.OffscreenCanvas) return false;
      try {
        var Q = new OffscreenCanvas(1, 1), g = Q.getContext("2d");
        g.fillRect(0, 0, 1, 1);
        var E = Q.transferToImageBitmap();
        g.createPattern(E, "no-repeat");
      } catch {
        return false;
      }
      return true;
    }();
    function a() {
    }
    function o(Q) {
      var g = t.exports.Promise, E = g !== void 0 ? g : e.Promise;
      return typeof E == "function" ? new E(Q) : (Q(a, a), null);
    }
    var c = /* @__PURE__ */ function(Q, g) {
      return { transform: function(E) {
        if (Q) return E;
        if (g.has(E)) return g.get(E);
        var N2 = new OffscreenCanvas(E.width, E.height), k = N2.getContext("2d");
        return k.drawImage(E, 0, 0), g.set(E, N2), N2;
      }, clear: function() {
        g.clear();
      } };
    }(l2, /* @__PURE__ */ new Map()), f = function() {
      var Q = Math.floor(16.666666666666668), g, E, N2 = {}, k = 0;
      return typeof requestAnimationFrame == "function" && typeof cancelAnimationFrame == "function" ? (g = function(M2) {
        var R = Math.random();
        return N2[R] = requestAnimationFrame(function y2(P) {
          k === P || k + Q - 1 < P ? (k = P, delete N2[R], M2()) : N2[R] = requestAnimationFrame(y2);
        }), R;
      }, E = function(M2) {
        N2[M2] && cancelAnimationFrame(N2[M2]);
      }) : (g = function(M2) {
        return setTimeout(M2, Q);
      }, E = function(M2) {
        return clearTimeout(M2);
      }), { frame: g, cancel: E };
    }(), d = /* @__PURE__ */ function() {
      var Q, g, E = {};
      function N2(k) {
        function M2(R, y2) {
          k.postMessage({ options: R || {}, callback: y2 });
        }
        k.init = function(y2) {
          var P = y2.transferControlToOffscreen();
          k.postMessage({ canvas: P }, [P]);
        }, k.fire = function(y2, P, q) {
          if (g) return M2(y2, null), g;
          var iA = Math.random().toString(36).slice(2);
          return g = o(function(sA) {
            function fA(EA) {
              EA.data.callback === iA && (delete E[iA], k.removeEventListener("message", fA), g = null, c.clear(), q(), sA());
            }
            k.addEventListener("message", fA), M2(y2, iA), E[iA] = fA.bind(null, { data: { callback: iA } });
          }), g;
        }, k.reset = function() {
          k.postMessage({ reset: true });
          for (var y2 in E) E[y2](), delete E[y2];
        };
      }
      return function() {
        if (Q) return Q;
        if (!r && s) {
          var k = ["var CONFETTI, SIZE = {}, module = {};", "(" + A.toString() + ")(this, module, true, SIZE);", "onmessage = function(msg) {", "  if (msg.data.options) {", "    CONFETTI(msg.data.options).then(function () {", "      if (msg.data.callback) {", "        postMessage({ callback: msg.data.callback });", "      }", "    });", "  } else if (msg.data.reset) {", "    CONFETTI && CONFETTI.reset();", "  } else if (msg.data.resize) {", "    SIZE.width = msg.data.resize.width;", "    SIZE.height = msg.data.resize.height;", "  } else if (msg.data.canvas) {", "    SIZE.width = msg.data.canvas.width;", "    SIZE.height = msg.data.canvas.height;", "    CONFETTI = module.exports.create(msg.data.canvas);", "  }", "}"].join(`
`);
          try {
            Q = new Worker(URL.createObjectURL(new Blob([k])));
          } catch (M2) {
            return typeof console < "u" && typeof console.warn == "function" && console.warn("\u{1F38A} Could not load worker", M2), null;
          }
          N2(Q);
        }
        return Q;
      };
    }(), m2 = { particleCount: 50, angle: 90, spread: 45, startVelocity: 45, decay: 0.9, gravity: 1, drift: 0, ticks: 200, x: 0.5, y: 0.5, shapes: ["square", "circle"], zIndex: 100, colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"], disableForReducedMotion: false, scalar: 1 };
    function w2(Q, g) {
      return g ? g(Q) : Q;
    }
    function C2(Q) {
      return Q != null;
    }
    function U(Q, g, E) {
      return w2(Q && C2(Q[g]) ? Q[g] : m2[g], E);
    }
    function h(Q) {
      return Q < 0 ? 0 : Math.floor(Q);
    }
    function B(Q, g) {
      return Math.floor(Math.random() * (g - Q)) + Q;
    }
    function p(Q) {
      return parseInt(Q, 16);
    }
    function v2(Q) {
      return Q.map(x);
    }
    function x(Q) {
      var g = String(Q).replace(/[^0-9a-f]/gi, "");
      return g.length < 6 && (g = g[0] + g[0] + g[1] + g[1] + g[2] + g[2]), { r: p(g.substring(0, 2)), g: p(g.substring(2, 4)), b: p(g.substring(4, 6)) };
    }
    function F(Q) {
      var g = U(Q, "origin", Object);
      return g.x = U(g, "x", Number), g.y = U(g, "y", Number), g;
    }
    function I(Q) {
      Q.width = document.documentElement.clientWidth, Q.height = document.documentElement.clientHeight;
    }
    function H(Q) {
      var g = Q.getBoundingClientRect();
      Q.width = g.width, Q.height = g.height;
    }
    function L(Q) {
      var g = document.createElement("canvas");
      return g.style.position = "fixed", g.style.top = "0px", g.style.left = "0px", g.style.pointerEvents = "none", g.style.zIndex = Q, g;
    }
    function K2(Q, g, E, N2, k, M2, R, y2, P) {
      Q.save(), Q.translate(g, E), Q.rotate(M2), Q.scale(N2, k), Q.arc(0, 0, 1, R, y2, P), Q.restore();
    }
    function _(Q) {
      var g = Q.angle * (Math.PI / 180), E = Q.spread * (Math.PI / 180);
      return { x: Q.x, y: Q.y, wobble: Math.random() * 10, wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05), velocity: Q.startVelocity * 0.5 + Math.random() * Q.startVelocity, angle2D: -g + (0.5 * E - Math.random() * E), tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI, color: Q.color, shape: Q.shape, tick: 0, totalTicks: Q.ticks, decay: Q.decay, drift: Q.drift, random: Math.random() + 2, tiltSin: 0, tiltCos: 0, wobbleX: 0, wobbleY: 0, gravity: Q.gravity * 3, ovalScalar: 0.6, scalar: Q.scalar, flat: Q.flat };
    }
    function rA(Q, g) {
      g.x += Math.cos(g.angle2D) * g.velocity + g.drift, g.y += Math.sin(g.angle2D) * g.velocity + g.gravity, g.velocity *= g.decay, g.flat ? (g.wobble = 0, g.wobbleX = g.x + 10 * g.scalar, g.wobbleY = g.y + 10 * g.scalar, g.tiltSin = 0, g.tiltCos = 0, g.random = 1) : (g.wobble += g.wobbleSpeed, g.wobbleX = g.x + 10 * g.scalar * Math.cos(g.wobble), g.wobbleY = g.y + 10 * g.scalar * Math.sin(g.wobble), g.tiltAngle += 0.1, g.tiltSin = Math.sin(g.tiltAngle), g.tiltCos = Math.cos(g.tiltAngle), g.random = Math.random() + 2);
      var E = g.tick++ / g.totalTicks, N2 = g.x + g.random * g.tiltCos, k = g.y + g.random * g.tiltSin, M2 = g.wobbleX + g.random * g.tiltCos, R = g.wobbleY + g.random * g.tiltSin;
      if (Q.fillStyle = "rgba(" + g.color.r + ", " + g.color.g + ", " + g.color.b + ", " + (1 - E) + ")", Q.beginPath(), i && g.shape.type === "path" && typeof g.shape.path == "string" && Array.isArray(g.shape.matrix)) Q.fill($(g.shape.path, g.shape.matrix, g.x, g.y, Math.abs(M2 - N2) * 0.1, Math.abs(R - k) * 0.1, Math.PI / 10 * g.wobble));
      else if (g.shape.type === "bitmap") {
        var y2 = Math.PI / 10 * g.wobble, P = Math.abs(M2 - N2) * 0.1, q = Math.abs(R - k) * 0.1, iA = g.shape.bitmap.width * g.scalar, sA = g.shape.bitmap.height * g.scalar, fA = new DOMMatrix([Math.cos(y2) * P, Math.sin(y2) * P, -Math.sin(y2) * q, Math.cos(y2) * q, g.x, g.y]);
        fA.multiplySelf(new DOMMatrix(g.shape.matrix));
        var EA = Q.createPattern(c.transform(g.shape.bitmap), "no-repeat");
        EA.setTransform(fA), Q.globalAlpha = 1 - E, Q.fillStyle = EA, Q.fillRect(g.x - iA / 2, g.y - sA / 2, iA, sA), Q.globalAlpha = 1;
      } else if (g.shape === "circle") Q.ellipse ? Q.ellipse(g.x, g.y, Math.abs(M2 - N2) * g.ovalScalar, Math.abs(R - k) * g.ovalScalar, Math.PI / 10 * g.wobble, 0, 2 * Math.PI) : K2(Q, g.x, g.y, Math.abs(M2 - N2) * g.ovalScalar, Math.abs(R - k) * g.ovalScalar, Math.PI / 10 * g.wobble, 0, 2 * Math.PI);
      else if (g.shape === "star") for (var J = Math.PI / 2 * 3, YA = 4 * g.scalar, Ue = 8 * g.scalar, Fe = g.x, _e = g.y, Tt = 5, ke = Math.PI / Tt; Tt--; ) Fe = g.x + Math.cos(J) * Ue, _e = g.y + Math.sin(J) * Ue, Q.lineTo(Fe, _e), J += ke, Fe = g.x + Math.cos(J) * YA, _e = g.y + Math.sin(J) * YA, Q.lineTo(Fe, _e), J += ke;
      else Q.moveTo(Math.floor(g.x), Math.floor(g.y)), Q.lineTo(Math.floor(g.wobbleX), Math.floor(k)), Q.lineTo(Math.floor(M2), Math.floor(R)), Q.lineTo(Math.floor(N2), Math.floor(g.wobbleY));
      return Q.closePath(), Q.fill(), g.tick < g.totalTicks;
    }
    function V(Q, g, E, N2, k) {
      var M2 = g.slice(), R = Q.getContext("2d"), y2, P, q = o(function(iA) {
        function sA() {
          y2 = P = null, R.clearRect(0, 0, N2.width, N2.height), c.clear(), k(), iA();
        }
        function fA() {
          r && !(N2.width === n.width && N2.height === n.height) && (N2.width = Q.width = n.width, N2.height = Q.height = n.height), !N2.width && !N2.height && (E(Q), N2.width = Q.width, N2.height = Q.height), R.clearRect(0, 0, N2.width, N2.height), M2 = M2.filter(function(EA) {
            return rA(R, EA);
          }), M2.length ? y2 = f.frame(fA) : sA();
        }
        y2 = f.frame(fA), P = sA;
      });
      return { addFettis: function(iA) {
        return M2 = M2.concat(iA), q;
      }, canvas: Q, promise: q, reset: function() {
        y2 && f.cancel(y2), P && P();
      } };
    }
    function G(Q, g) {
      var E = !Q, N2 = !!U(g || {}, "resize"), k = false, M2 = U(g, "disableForReducedMotion", Boolean), R = s && !!U(g || {}, "useWorker"), y2 = R ? d() : null, P = E ? I : H, q = Q && y2 ? !!Q.__confetti_initialized : false, iA = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion)").matches, sA;
      function fA(J, YA, Ue) {
        for (var Fe = U(J, "particleCount", h), _e = U(J, "angle", Number), Tt = U(J, "spread", Number), ke = U(J, "startVelocity", Number), g0 = U(J, "decay", Number), h0 = U(J, "gravity", Number), w0 = U(J, "drift", Number), Xu = U(J, "colors", v2), p0 = U(J, "ticks", Number), Wu = U(J, "shapes"), m0 = U(J, "scalar"), C0 = !!U(J, "flat"), zu = F(J), Ju = Fe, Qa = [], Q0 = Q.width * zu.x, v0 = Q.height * zu.y; Ju--; ) Qa.push(_({ x: Q0, y: v0, angle: _e, spread: Tt, startVelocity: ke, color: Xu[Ju % Xu.length], shape: Wu[B(0, Wu.length)], ticks: p0, decay: g0, gravity: h0, drift: w0, scalar: m0, flat: C0 }));
        return sA ? sA.addFettis(Qa) : (sA = V(Q, Qa, P, YA, Ue), sA.promise);
      }
      function EA(J) {
        var YA = M2 || U(J, "disableForReducedMotion", Boolean), Ue = U(J, "zIndex", Number);
        if (YA && iA) return o(function(ke) {
          ke();
        });
        E && sA ? Q = sA.canvas : E && !Q && (Q = L(Ue), document.body.appendChild(Q)), N2 && !q && P(Q);
        var Fe = { width: Q.width, height: Q.height };
        y2 && !q && y2.init(Q), q = true, y2 && (Q.__confetti_initialized = true);
        function _e() {
          if (y2) {
            var ke = { getBoundingClientRect: function() {
              if (!E) return Q.getBoundingClientRect();
            } };
            P(ke), y2.postMessage({ resize: { width: ke.width, height: ke.height } });
            return;
          }
          Fe.width = Fe.height = null;
        }
        function Tt() {
          sA = null, N2 && (k = false, e.removeEventListener("resize", _e)), E && Q && (document.body.contains(Q) && document.body.removeChild(Q), Q = null, q = false);
        }
        return N2 && !k && (k = true, e.addEventListener("resize", _e, false)), y2 ? y2.fire(J, Fe, Tt) : fA(J, Fe, Tt);
      }
      return EA.reset = function() {
        y2 && y2.reset(), sA && sA.reset();
      }, EA;
    }
    var Z;
    function AA() {
      return Z || (Z = G(null, { useWorker: true, resize: true })), Z;
    }
    function $(Q, g, E, N2, k, M2, R) {
      var y2 = new Path2D(Q), P = new Path2D();
      P.addPath(y2, new DOMMatrix(g));
      var q = new Path2D();
      return q.addPath(P, new DOMMatrix([Math.cos(R) * k, Math.sin(R) * k, -Math.sin(R) * M2, Math.cos(R) * M2, E, N2])), q;
    }
    function b(Q) {
      if (!i) throw new Error("path confetti are not supported in this browser");
      var g, E;
      typeof Q == "string" ? g = Q : (g = Q.path, E = Q.matrix);
      var N2 = new Path2D(g), k = document.createElement("canvas"), M2 = k.getContext("2d");
      if (!E) {
        for (var R = 1e3, y2 = R, P = R, q = 0, iA = 0, sA, fA, EA = 0; EA < R; EA += 2) for (var J = 0; J < R; J += 2) M2.isPointInPath(N2, EA, J, "nonzero") && (y2 = Math.min(y2, EA), P = Math.min(P, J), q = Math.max(q, EA), iA = Math.max(iA, J));
        sA = q - y2, fA = iA - P;
        var YA = 10, Ue = Math.min(YA / sA, YA / fA);
        E = [Ue, 0, 0, Ue, -Math.round(sA / 2 + y2) * Ue, -Math.round(fA / 2 + P) * Ue];
      }
      return { type: "path", path: g, matrix: E };
    }
    function j(Q) {
      var g, E = 1, N2 = "#000000", k = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
      typeof Q == "string" ? g = Q : (g = Q.text, E = "scalar" in Q ? Q.scalar : E, k = "fontFamily" in Q ? Q.fontFamily : k, N2 = "color" in Q ? Q.color : N2);
      var M2 = 10 * E, R = "" + M2 + "px " + k, y2 = new OffscreenCanvas(M2, M2), P = y2.getContext("2d");
      P.font = R;
      var q = P.measureText(g), iA = Math.ceil(q.actualBoundingBoxRight + q.actualBoundingBoxLeft), sA = Math.ceil(q.actualBoundingBoxAscent + q.actualBoundingBoxDescent), fA = 2, EA = q.actualBoundingBoxLeft + fA, J = q.actualBoundingBoxAscent + fA;
      iA += fA + fA, sA += fA + fA, y2 = new OffscreenCanvas(iA, sA), P = y2.getContext("2d"), P.font = R, P.fillStyle = N2, P.fillText(g, EA, J);
      var YA = 1 / E;
      return { type: "bitmap", bitmap: y2.transferToImageBitmap(), matrix: [YA, 0, 0, YA, -iA * YA / 2, -sA * YA / 2] };
    }
    t.exports = function() {
      return AA().apply(this, arguments);
    }, t.exports.reset = function() {
      AA().reset();
    }, t.exports.create = G, t.exports.shapeFromPath = b, t.exports.shapeFromText = j;
  })(/* @__PURE__ */ function() {
    return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
  }(), ku, false);
  var Jx = ku.exports;
  ku.exports.create;
  var jg = "theaterReservations_v2";
  var Pg = "theater_event_v2";
  var gf = { title: "\u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u0631\u0626\u064A\u0633\u064A - \u062D\u0641\u0644 \u0627\u0644\u062A\u0643\u0631\u064A\u0645 \u0648\u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D", organizer: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0631\u062D \u0648\u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0627\u062A", date: "\u0627\u0644\u062C\u0645\u0639\u0629\u060C 25 \u0623\u0643\u062A\u0648\u0628\u0631 2026", time: "08:00 \u0645\u0633\u0627\u0621\u064B (\u062A\u0641\u062A\u062D \u0627\u0644\u0623\u0628\u0648\u0627\u0628 07:00 \u0645\u0633\u0627\u0621\u064B)", venue: "\u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u0631\u0626\u064A\u0633\u064A - \u0627\u0644\u0642\u0627\u0639\u0629 \u0627\u0644\u0643\u0628\u0631\u0649", city: "\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629", logoText: "\u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u0631\u0626\u064A\u0633\u064A", logoUrl: "ministry_logo.png", theaterImageUrl: "", note: "\u064A\u0631\u062C\u0649 \u0625\u0628\u0631\u0627\u0632 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062D\u0636\u0648\u0631 \u0639\u0646\u062F \u0645\u062F\u062E\u0644 \u0627\u0644\u0645\u0633\u0631\u062D \u0644\u0644\u062A\u062D\u0642\u0642 \u0639\u0628\u0631 \u0627\u0644\u0640 QR Code." };
  function _g(A2, e = "") {
    var s;
    if (!A2) return e || "";
    const t = e || (typeof window < "u" ? window.location.origin + window.location.pathname : ""), r = new URLSearchParams(), n = ((s = A2.guest) == null ? void 0 : s.token) || A2.id || "INV";
    return r.set("invitation", n), A2.row && r.set("row", A2.row), A2.number && r.set("seat", String(parseInt(A2.number, 10))), A2.level && r.set("level", A2.level), A2.sector && r.set("sec", A2.sector), A2.gate && r.set("gate", A2.gate), A2.guest && (A2.guest.name && r.set("name", A2.guest.name), A2.guest.jobTitle && r.set("role", A2.guest.jobTitle), A2.guest.category && r.set("cat", A2.guest.category)), `${t}?${r.toString()}`;
  }
  var hf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  function lm() {
    const A2 = [];
    return hf.slice(0, 21).forEach((r, n) => {
      const s = n === 0 ? [6, 10, 6] : [7, 12, 7];
      let i = 1;
      s.forEach((l2, a) => {
        let o = "\u0627\u0644\u064A\u0633\u0627\u0631", c = "left";
        a === 1 ? (o = "\u0627\u0644\u0648\u0633\u0637", c = "center") : a === 2 && (o = "\u0627\u0644\u064A\u0645\u064A\u0646", c = "right");
        for (let f = 0; f < l2; f++) {
          const d = String(i).padStart(2, "0"), m2 = `G-${r}-${d}`;
          A2.push({ id: m2, level: "G", levelName: "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A", row: r, number: d, rawNumber: i, sector: o, sectorKey: c, status: "available", guest: null }), i++;
        }
      });
    }), hf.slice(0, 8).forEach((r, n) => {
      const s = n === 0 ? [6, 10, 6] : [7, 12, 7];
      let i = 1;
      s.forEach((l2, a) => {
        let o = "\u0627\u0644\u064A\u0633\u0627\u0631", c = "left";
        a === 1 ? (o = "\u0627\u0644\u0648\u0633\u0637", c = "center") : a === 2 && (o = "\u0627\u0644\u064A\u0645\u064A\u0646", c = "right");
        for (let f = 0; f < l2; f++) {
          const d = String(i).padStart(2, "0"), m2 = `B-${r}-${d}`;
          A2.push({ id: m2, level: "B", levelName: "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062B\u0627\u0646\u064A - \u0627\u0644\u0628\u0644\u0643\u0648\u0646\u0629", row: r, number: d, rawNumber: i, sector: o, sectorKey: c, status: "available", guest: null }), i++;
        }
      });
    }), A2;
  }
  function nt() {
    try {
      const e = localStorage.getItem(jg);
      if (e) {
        const t = JSON.parse(e);
        let r = false;
        return t.forEach((n) => {
          n.guest && n.guest.jobTitle === void 0 && (n.guest.name && n.guest.name.includes("\u062E\u0627\u0644\u062F \u0627\u0644\u0633\u0644\u064A\u0645\u0627\u0646") ? n.guest.jobTitle = "\u0645\u0634\u0631\u0641 \u062A\u0631\u0628\u0648\u064A \u0628\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645" : n.guest.name && n.guest.name.includes("\u0627\u0644\u0634\u0645\u0631\u064A") ? n.guest.jobTitle = "\u0648\u0643\u064A\u0644 \u0627\u0644\u0648\u0632\u0627\u0631\u0629 \u0644\u0644\u062A\u0639\u0644\u064A\u0645" : n.guest.name && n.guest.name.includes("\u0633\u0627\u0631\u0629") ? n.guest.jobTitle = "\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0627\u0644\u0625\u0634\u0631\u0627\u0641 \u0627\u0644\u062A\u0631\u0628\u0648\u064A" : n.guest.name && n.guest.name.includes("\u0627\u0644\u0639\u062A\u064A\u0628\u064A") ? n.guest.jobTitle = "\u0645\u062F\u064A\u0631 \u0625\u062F\u0627\u0631\u0629 \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A" : n.guest.jobTitle = "", r = true);
        }), r && ve(t), t;
      }
    } catch (e) {
      console.error("Error loading seats", e);
    }
    const A2 = lm();
    return ve(A2), A2;
  }
  function ve(A2) {
    try {
      localStorage.setItem(jg, JSON.stringify(A2));
    } catch (e) {
      console.error("Error saving seats", e);
    }
  }
  function Tu() {
    try {
      const A2 = localStorage.getItem(Pg);
      if (A2) {
        const e = JSON.parse(A2);
        return e.logoUrl || (e.logoUrl = "ministry_logo.png"), { ...gf, ...e };
      }
    } catch (A2) {
      console.error("Error loading event", A2);
    }
    return gf;
  }
  function Vg(A2) {
    try {
      localStorage.setItem(Pg, JSON.stringify(A2));
    } catch (e) {
      console.error("Error saving event", e);
    }
  }
  function Gg() {
    return "INV-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
  function xn(A2) {
    return A2 ? `${A2.level === "G" ? "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A" : "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062B\u0627\u0646\u064A"} \u2013 ${A2.row}-${A2.number}` : "";
  }
  function om(A2, e) {
    const t = nt(), r = t.findIndex((i) => i.id === A2);
    if (r === -1) return { success: false, error: "\u0627\u0644\u0645\u0642\u0639\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" };
    const n = Gg(), s = (/* @__PURE__ */ new Date()).toISOString();
    return t[r].status = "reserved", t[r].guest = { name: e.name || "\u0636\u064A\u0641 \u0645\u0643\u0631\u0651\u0645", jobTitle: e.jobTitle || e.position || "", phone: e.phone || "", category: e.category || "\u0639\u0627\u0645", notes: e.notes || "", token: n, bookedAt: s, checkedInAt: null }, ve(t), { success: true, seat: t[r], token: n };
  }
  function um(A2, e, t, r = 1, n = true) {
    const s = nt(), i = A2 === "G" ? { levelName: "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A" } : { levelName: "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062B\u0627\u0646\u064A - \u0627\u0644\u0628\u0644\u0643\u0648\u0646\u0629" }, a = { left: "\u0627\u0644\u064A\u0633\u0627\u0631", center: "\u0627\u0644\u0648\u0633\u0637", right: "\u0627\u0644\u064A\u0645\u064A\u0646" }[t] || "\u0627\u0644\u0648\u0633\u0637", o = s.filter((w2) => w2.level === A2 && w2.row === e && w2.sectorKey === t), c = o.length > 0 ? Math.max(...o.map((w2) => w2.rawNumber || parseInt(w2.number) || 0)) : 0, f = [], d = Date.now();
    for (let w2 = 0; w2 < Number(r); w2++) {
      const C2 = c + 1 + w2, U = `${A2}-${e}-${t}-${d}-${w2}`;
      f.push({ id: U, level: A2, levelName: i.levelName, row: e, number: String(C2).padStart(2, "0"), rawNumber: C2, sector: a, sectorKey: t, status: "available", guest: null });
    }
    return ve([...s, ...f]), { success: true, seats: co(), addedCount: f.length };
  }
  function cm(A2) {
    const e = nt(), t = e.find((n) => n.id === A2);
    if (!t) return { success: false, message: "\u0627\u0644\u0645\u0642\u0639\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" };
    if (t.status !== "available") return { success: false, message: "\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0632\u0627\u0644\u0629 \u0645\u0642\u0639\u062F \u0645\u062D\u062C\u0648\u0632 \u0623\u0648 \u0645\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644! \u064A\u0631\u062C\u0649 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u062C\u0632 \u0623\u0648\u0644\u0627\u064B." };
    const r = e.filter((n) => n.id !== A2);
    return ve(r), { success: true, seats: r };
  }
  function co() {
    const A2 = nt(), e = {};
    A2.forEach((n) => {
      const s = `${n.level}-${n.row}`;
      e[s] || (e[s] = []), e[s].push(n);
    });
    const t = { left: 0, center: 1, right: 2 }, r = [];
    return Object.keys(e).sort().forEach((n) => {
      const s = e[n];
      s.sort((i, l2) => {
        const a = (t[i.sectorKey] ?? 1) - (t[l2.sectorKey] ?? 1);
        return a !== 0 ? a : (i.rawNumber || 0) - (l2.rawNumber || 0);
      }), s.forEach((i, l2) => {
        const a = l2 + 1, o = String(a).padStart(2, "0"), c = `${i.level}-${i.row}-${o}`;
        r.push({ ...i, id: c, number: o, rawNumber: a });
      });
    }), ve(r), r;
  }
  async function qx() {
    try {
      const A2 = await fetch("/api/seats", { cache: "no-store" });
      if (A2.ok) {
        const e = await A2.json();
        if (Array.isArray(e) && e.length > 0) return ve(e), e;
      }
    } catch {
    }
    return nt();
  }
  async function Ay() {
    try {
      const A2 = await fetch("/api/event", { cache: "no-store" });
      if (A2.ok) {
        const e = await A2.json();
        if (e && e.title) return Vg(e), e;
      }
    } catch {
    }
    return Tu();
  }
  async function ey(A2, e) {
    try {
      const t = await fetch("/api/seats/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seatId: A2, guest: e }) });
      if (t.ok) {
        const r = await t.json();
        if (r.success && r.seats) return ve(r.seats), { success: true, seat: r.seat, seats: r.seats };
      }
    } catch {
    }
    return om(A2, e);
  }
  var Us = [{ id: "staff_gate_1", name: "\u0645\u0646\u0638\u0645 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 1", username: "gate1", password: "gate123", role: "\u0645\u0646\u0638\u0645 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u062E\u0648\u0644", gate: "\u0627\u0644\u0645\u062F\u062E\u0644 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", active: true, createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "staff_usher_1", name: "\u0645\u0631\u0634\u062F \u0645\u0642\u0627\u0639\u062F \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A", username: "usher1", password: "usher123", role: "\u0625\u0631\u0634\u0627\u062F \u0648\u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0636\u064A\u0648\u0641", gate: "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A", active: true, createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "staff_vip_1", name: "\u0645\u0646\u0638\u0645 \u0643\u0628\u0627\u0631 \u0627\u0644\u0634\u062E\u0635\u064A\u0627\u062A VIP", username: "vip1", password: "vip123", role: "\u0627\u0633\u062A\u0642\u0628\u0627\u0644 \u0636\u064A\u0648\u0641 \u0627\u0644\u0634\u0631\u0641", gate: "\u0645\u062F\u062E\u0644 VIP", active: true, createdAt: (/* @__PURE__ */ new Date()).toISOString() }];
  var wf = [{ key: "left", name: "\u0627\u0644\u064A\u0633\u0627\u0631" }, { key: "center", name: "\u0627\u0644\u0648\u0633\u0637" }, { key: "right", name: "\u0627\u0644\u064A\u0645\u064A\u0646" }];
  function ly({ seats: A2, onSelectSeat: e, onSeatsUpdated: t, highlightSeatId: r = null, isBeneficiaryView: n = false }) {
    const [s, i] = uA.useState("G"), [l2, a] = uA.useState("all"), [o, c] = uA.useState(""), [f, d] = uA.useState(1), [m2, w2] = uA.useState(false), [C2, U] = uA.useState("");
    UA.useEffect(() => {
      if (r) {
        const g = A2.find((E) => E.id === r);
        g && g.level && i(g.level);
      }
    }, [r, A2]);
    const [h, B] = uA.useState(null), [p, v2] = uA.useState({ sectorKey: "center", count: 1, autoRenumber: true }), [x, F] = uA.useState(false), [I, H] = uA.useState(""), L = A2.filter((g) => g.level === s), K2 = L.filter((g) => {
      var E, N2;
      if (l2 !== "all" && g.status !== l2) return false;
      if (o.trim()) {
        const k = o.trim().toLowerCase(), M2 = g.id.toLowerCase(), R = xn(g).toLowerCase(), y2 = ((N2 = (E = g.guest) == null ? void 0 : E.name) == null ? void 0 : N2.toLowerCase()) || "";
        return M2.includes(k) || R.includes(k) || y2.includes(k);
      }
      return true;
    }), _ = Array.from(new Set(L.map((g) => g.row))).sort(), rA = (g) => {
      H(""), B({ row: g, level: s });
      const E = A2.filter((M2) => M2.level === s && M2.row === g), N2 = { left: 0, center: 0, right: 0 };
      E.forEach((M2) => {
        N2[M2.sectorKey] !== void 0 && N2[M2.sectorKey]++;
      });
      const k = Object.entries(N2).sort((M2, R) => M2[1] - R[1])[0][0];
      v2({ sectorKey: k, count: 1, autoRenumber: true });
    }, V = () => {
      if (!h) return;
      F(true);
      const g = um(s, h.row, p.sectorKey, p.count, p.autoRenumber);
      {
        t && t(g.seats), F(false);
        const E = wf.find((N2) => N2.key === p.sectorKey);
        H(`\u2705 \u0623\u064F\u0636\u064A\u0641 ${g.addedCount} \u0645\u0642\u0639\u062F \u0644\u0642\u0637\u0627\u0639 ${(E == null ? void 0 : E.name) || "\u0627\u0644\u0648\u0633\u0637"} \u0628\u0627\u0644\u0635\u0641 ${h.row}`), setTimeout(() => {
          B(null), H("");
        }, 1200);
      }
    }, [G, Z] = uA.useState(null), [AA, $] = uA.useState(true), b = (g) => {
      var E;
      if (g.status !== "available") {
        alert(`\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0639\u062F \u0644\u0623\u0646\u0647 \u0645\u062D\u062C\u0648\u0632 \u0628\u0627\u0633\u0645: ${((E = g.guest) == null ? void 0 : E.name) || "\u0636\u064A\u0641"}. \u064A\u062C\u0628 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u062C\u0632 \u0623\u0648\u0644\u0627\u064B.`);
        return;
      }
      Z(g);
    }, j = () => {
      if (!G) return;
      const g = G, E = xn(g), N2 = cm(g.id);
      if (N2.success) {
        let k = N2.seats;
        AA && (k = co()), t && t(k), U(`\u2705 \u062A\u0645 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0639\u062F (${E}) \u0628\u0646\u062C\u0627\u062D`), setTimeout(() => U(""), 3500), Z(null);
      } else alert(N2.message);
    }, Q = () => {
      if (confirm("\u0647\u0644 \u062A\u0631\u063A\u0628 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u0642\u064A\u0645 \u062C\u0645\u064A\u0639 \u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u0631\u062D \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0627\u0644\u062A\u0633\u0644\u0633\u0644 (01, 02, 03...) \u0645\u0646 \u0627\u0644\u064A\u0633\u0627\u0631 \u0644\u0644\u064A\u0645\u064A\u0646\u061F")) {
        const g = co();
        t && t(g), U("\u2705 \u062A\u0645\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u0642\u064A\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0628\u0646\u062C\u0627\u062D"), setTimeout(() => U(""), 3e3);
      }
    };
    return u.jsxs("div", { className: "w-full flex flex-col gap-6", children: [C2 && u.jsxs("div", { className: "p-3.5 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl text-cyan-200 font-bold text-xs flex items-center justify-between animate-fade-in shadow-lg", children: [u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx(qp, { className: "w-4 h-4 text-cyan-300" }), u.jsx("span", { children: C2 })] }), u.jsx("button", { onClick: () => U(""), className: "text-white/60 hover:text-white text-xs", children: "\u2715" })] }), n ? u.jsxs("div", { className: "glass-panel-luxury p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-white/15", children: [u.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [u.jsxs("span", { className: "text-xs text-amber-300 font-bold flex items-center gap-1.5", children: [u.jsx(ki, { className: "w-3.5 h-3.5" }), u.jsx("span", { children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631:" })] }), u.jsxs("div", { className: "flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/15", children: [u.jsxs("button", { type: "button", onClick: () => i("G"), className: `px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${s === "G" ? "bg-gradient-to-r from-[#00d2ff] to-[#7952b3] text-white shadow-md" : "text-slate-300 hover:text-white"}`, children: ["\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A (", A2.filter((g) => g.level === "G").length, " \u0645\u0642\u0639\u062F)"] }), u.jsxs("button", { type: "button", onClick: () => i("B"), className: `px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${s === "B" ? "bg-gradient-to-r from-[#00d2ff] to-[#7952b3] text-white shadow-md" : "text-slate-300 hover:text-white"}`, children: ["\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062B\u0627\u0646\u064A - \u0627\u0644\u0628\u0644\u0643\u0648\u0646\u0629 (", A2.filter((g) => g.level === "B").length, " \u0645\u0642\u0639\u062F)"] })] })] }), u.jsxs("div", { className: "flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/15", children: [u.jsx("button", { type: "button", onClick: () => d((g) => Math.min(g + 0.15, 1.5)), className: "p-1.5 rounded-lg text-white hover:text-amber-300", title: "\u062A\u0643\u0628\u064A\u0631", children: u.jsx(df, { className: "w-3.5 h-3.5" }) }), u.jsxs("span", { className: "text-[10px] text-amber-300 font-mono px-1", children: [Math.round(f * 100), "%"] }), u.jsx("button", { type: "button", onClick: () => d((g) => Math.max(g - 0.15, 0.65)), className: "p-1.5 rounded-lg text-white hover:text-amber-300", title: "\u062A\u0635\u063A\u064A\u0631", children: u.jsx(Bf, { className: "w-3.5 h-3.5" }) }), u.jsx("button", { type: "button", onClick: () => d(1), className: "p-1.5 rounded-lg text-white hover:text-amber-300", title: "\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637 \u0627\u0644\u062D\u062C\u0645", children: u.jsx(cf, { className: "w-3.5 h-3.5" }) })] })] }) : u.jsxs("div", { className: "glass-panel-luxury p-4 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-4", children: [u.jsxs("div", { className: "flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 w-full lg:w-auto", children: [u.jsxs("button", { type: "button", onClick: () => i("G"), className: `flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black transition-all ${s === "G" ? "bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-lg shadow-cyan-500/30" : "text-slate-100 hover:text-white hover:bg-white/10"}`, children: [u.jsx(ki, { className: "w-4 h-4" }), u.jsxs("span", { children: ["\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A (", A2.filter((g) => g.level === "G").length, " \u0645\u0642\u0639\u062F)"] })] }), u.jsxs("button", { type: "button", onClick: () => i("B"), className: `flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black transition-all ${s === "B" ? "bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-lg shadow-cyan-500/30" : "text-slate-100 hover:text-white hover:bg-white/10"}`, children: [u.jsx(Am, { className: "w-4 h-4 text-cyan-300" }), u.jsxs("span", { children: ["\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062B\u0627\u0646\u064A - \u0627\u0644\u0628\u0644\u0643\u0648\u0646\u0629 (", A2.filter((g) => g.level === "B").length, " \u0645\u0642\u0639\u062F)"] })] })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsxs("button", { type: "button", onClick: () => w2(!m2), className: `flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-black border transition-all ${m2 ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/40 animate-pulse" : "bg-white/10 hover:bg-rose-500/20 text-rose-300 border-rose-400/30 hover:border-rose-400/60"}`, title: "\u062A\u0641\u0639\u064A\u0644 \u0648\u0636\u0639 \u062D\u0630\u0641 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0628\u0627\u0644\u0646\u0642\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631", children: [u.jsx(vs, { className: "w-4 h-4" }), u.jsx("span", { children: m2 ? "\u0625\u064A\u0642\u0627\u0641 \u0648\u0636\u0639 \u0627\u0644\u062D\u0630\u0641 \u2715" : "\u0648\u0636\u0639 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u{1F5D1}" })] }), u.jsxs("button", { type: "button", onClick: Q, className: "flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-cyan-200 border border-cyan-400/30 transition-all", title: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628 \u0648\u062A\u0631\u0642\u064A\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0645\u0646 01 \u062A\u0635\u0627\u0639\u062F\u064A\u0627\u064B", children: [u.jsx(nm, { className: "w-3.5 h-3.5 text-cyan-300" }), u.jsx("span", { className: "hidden sm:inline", children: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0643\u0644" })] })] }), u.jsxs("div", { className: "flex flex-wrap items-center gap-3 w-full lg:w-auto", children: [u.jsxs("div", { className: "flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20", children: [u.jsx("button", { type: "button", onClick: () => d((g) => Math.min(g + 0.15, 1.5)), className: "p-2 rounded-xl text-white hover:text-yellow-300 hover:bg-white/10", title: "\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629", children: u.jsx(df, { className: "w-4 h-4" }) }), u.jsxs("span", { className: "text-[11px] text-yellow-300 font-mono px-1", children: [Math.round(f * 100), "%"] }), u.jsx("button", { type: "button", onClick: () => d((g) => Math.max(g - 0.15, 0.65)), className: "p-2 rounded-xl text-white hover:text-yellow-300 hover:bg-white/10", title: "\u062A\u0635\u063A\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629", children: u.jsx(Bf, { className: "w-4 h-4" }) }), u.jsx("button", { type: "button", onClick: () => d(1), className: "p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10", title: "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A", children: u.jsx(cf, { className: "w-3.5 h-3.5" }) })] }), u.jsxs("div", { className: "relative flex-1 lg:w-64", children: [u.jsx(im, { className: "w-4 h-4 text-yellow-300 absolute right-3.5 top-3.5" }), u.jsx("input", { type: "text", placeholder: "\u0627\u0628\u062D\u062B \u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0639\u0648 \u0623\u0648 \u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0639\u062F...", value: o, onChange: (g) => c(g.target.value), className: "w-full bg-white/15 backdrop-blur-md border border-white/30 focus:border-yellow-300 rounded-2xl pr-10 pl-8 py-2.5 text-xs text-white placeholder-slate-200 outline-none transition-all" }), o && u.jsx("button", { type: "button", onClick: () => c(""), className: "absolute left-3 top-3 text-xs text-slate-300 hover:text-white", children: "\u2715" })] }), u.jsxs("div", { className: "flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20 text-xs", children: [u.jsx("button", { type: "button", onClick: () => a("all"), className: `px-3 py-1.5 rounded-xl font-bold transition-all ${l2 === "all" ? "bg-white/20 text-white shadow-md" : "text-slate-200 hover:text-white"}`, children: "\u0627\u0644\u0643\u0644" }), u.jsx("button", { type: "button", onClick: () => a("available"), className: `px-3 py-1.5 rounded-xl font-bold transition-all ${l2 === "available" ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/40" : "text-slate-200 hover:text-emerald-300"}`, children: "\u0645\u062A\u0627\u062D" }), u.jsx("button", { type: "button", onClick: () => a("reserved"), className: `px-3 py-1.5 rounded-xl font-bold transition-all ${l2 === "reserved" ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/40" : "text-slate-200 hover:text-cyan-300"}`, children: "\u0645\u062D\u062C\u0648\u0632" }), u.jsx("button", { type: "button", onClick: () => a("checked_in"), className: `px-3 py-1.5 rounded-xl font-bold transition-all ${l2 === "checked_in" ? "bg-purple-500/30 text-purple-200 border border-purple-400/40" : "text-slate-200 hover:text-purple-300"}`, children: "\u062A\u0645 \u0627\u0644\u062F\u062E\u0648\u0644" })] })] })] }), !n && m2 && u.jsxs("div", { className: "p-3 bg-rose-500/20 border border-rose-400/50 rounded-2xl flex items-center justify-between text-xs text-rose-200 animate-pulse", children: [u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx(vs, { className: "w-4 h-4 text-rose-400" }), u.jsx("span", { className: "font-extrabold text-sm", children: "\u0648\u0636\u0639 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0646\u0634\u0637:" }), u.jsx("span", { children: "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0642\u0639\u062F \u0645\u062A\u0627\u062D (\u0623\u062E\u0636\u0631) \u0644\u0625\u0632\u0627\u0644\u062A\u0647 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u062E\u0637\u0637. (\u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0645\u062D\u062C\u0648\u0632\u0629 \u0645\u062D\u0645\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0630\u0641)." })] }), u.jsx("button", { type: "button", onClick: () => w2(false), className: "px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold", children: "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0648\u0636\u0639" })] }), n ? u.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-inner", children: [u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-3.5 h-3.5 rounded-md bg-gradient-to-b from-red-500 to-red-700 animate-pulse border-2 border-white shadow-lg shadow-red-500/80" }), u.jsx("span", { className: "text-red-300 font-black", children: "\u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0645\u062E\u0635\u0635 (\u0623\u062D\u0645\u0631 \u0645\u062A\u0648\u0647\u062C \u{1F534})" })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-3.5 h-3.5 rounded-md bg-white/20 border border-white/30" }), u.jsx("span", { className: "text-slate-300 font-medium", children: "\u0628\u0627\u0642\u064A \u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u0631\u062D" })] })] }) : u.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-5 px-6 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-inner", children: [u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-4 h-4 rounded-md bg-gradient-to-b from-emerald-400 to-emerald-700 shadow-md shadow-emerald-500/30 border border-emerald-300/40" }), u.jsx("span", { className: "text-white font-bold", children: "\u0645\u062A\u0627\u062D \u0644\u0644\u062D\u062C\u0632" })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-4 h-4 rounded-md bg-gradient-to-b from-cyan-400 to-blue-700 shadow-md shadow-cyan-500/30 border border-cyan-300/40" }), u.jsx("span", { className: "text-white font-bold", children: "\u0645\u062D\u062C\u0648\u0632 (\u062A\u0630\u0643\u0631\u0629 \u0645\u062C\u0647\u0632\u0629)" })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-4 h-4 rounded-md bg-gradient-to-b from-purple-400 to-purple-800 shadow-md shadow-purple-500/30 border border-purple-300/40" }), u.jsx("span", { className: "text-white font-bold", children: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-4 h-4 rounded-md bg-gradient-to-b from-red-500 to-red-700 animate-pulse border-2 border-white shadow-lg shadow-red-500/80" }), u.jsx("span", { className: "text-red-300 font-extrabold", children: "\u0645\u0642\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F (\u0623\u062D\u0645\u0631 \u0645\u062A\u0648\u0647\u062C \u{1F534})" })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-black", children: "+" }), u.jsx("span", { className: "text-emerald-300 font-bold", children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0639\u062F \u0644\u0644\u0635\u0641" })] }), u.jsxs("div", { className: "flex items-center gap-2 text-rose-300 font-medium", children: [u.jsx("span", { className: "text-white/60", children: "\u{1F4A1} \u062A\u0644\u0645\u064A\u062D:" }), u.jsx("span", { children: "\u064A\u0645\u0643\u0646\u0643 \u0623\u064A\u0636\u0627\u064B \u0627\u0644\u0646\u0642\u0631 \u0628\u0632\u0631 \u0627\u0644\u0641\u0623\u0631\u0629 \u0627\u0644\u0623\u064A\u0645\u0646 \u0639\u0644\u0649 \u0623\u064A \u0645\u0642\u0639\u062F \u0645\u062A\u0627\u062D \u0644\u062D\u0630\u0641\u0647 \u0645\u0628\u0627\u0634\u0631\u0629" })] })] }), u.jsxs("div", { className: "glass-panel-luxury p-3 sm:p-6 lg:p-8 rounded-3xl border-2 border-white/20 shadow-2xl relative w-full overflow-hidden", children: [u.jsx("div", { className: "lg:hidden mb-3 flex items-center justify-center gap-1.5 text-[11px] text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-400/20 py-1.5 px-3 rounded-xl select-none", children: u.jsx("span", { children: "\u2194\uFE0F \u0627\u0633\u062D\u0628 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0623\u0641\u0642\u064A\u0627\u064B \u0644\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0648\u0627\u0644\u0623\u062C\u0646\u062D\u0629" }) }), u.jsx("div", { className: "overflow-x-auto pb-4 custom-scrollbar", children: u.jsxs("div", { className: "min-w-[920px] mx-auto", children: [u.jsx("div", { className: "mb-10 text-center relative", children: u.jsxs("div", { className: "stage-spotlight max-w-2xl mx-auto py-3.5 px-10 rounded-b-3xl", children: [u.jsx("div", { className: "flex items-center justify-center gap-3", children: u.jsx("span", { className: "text-lg font-black tracking-widest text-cyan-200 uppercase drop-shadow-md", children: "\u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u2022 STAGE" }) }), u.jsx("div", { className: "text-[10px] text-cyan-100 mt-0.5 tracking-widest font-mono", children: s === "G" ? `\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A - ${_.length} \u0635\u0641\u0627\u064B` : `\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062B\u0627\u0646\u064A - ${_.length} \u0635\u0641\u0648\u0641` })] }) }), u.jsx("div", { className: "flex flex-col gap-2.5 transition-transform origin-top duration-300 items-center", style: { transform: `scale(${f})` }, children: _.map((g) => {
      const E = L.filter((y2) => y2.row === g), N2 = E.filter((y2) => y2.sectorKey === "left"), k = E.filter((y2) => y2.sectorKey === "center"), M2 = E.filter((y2) => y2.sectorKey === "right"), R = (h == null ? void 0 : h.row) === g && (h == null ? void 0 : h.level) === s;
      return u.jsxs("div", { children: [u.jsxs("div", { className: "flex items-center justify-center gap-2 sm:gap-4 py-0.5 px-2 rounded-xl hover:bg-white/10 transition-all w-full", children: [u.jsx("div", { className: "w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg backdrop-blur-md", children: g }), u.jsx("div", { className: "flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-inner flex-nowrap shrink-0", children: N2.map((y2) => u.jsx(za, { seat: y2, onClick: () => m2 ? b(y2) : e(y2), onContextMenu: (P) => {
        P.preventDefault(), y2.status === "available" && b(y2);
      }, deleteMode: m2, isHighlighted: r === y2.id, isFilteredOut: !K2.some((P) => P.id === y2.id) }, y2.id)) }), u.jsxs("div", { className: "w-8 flex items-center justify-center shrink-0 self-stretch relative", children: [u.jsx("div", { className: "w-px h-full bg-gradient-to-b from-cyan-400/10 via-cyan-400/30 to-cyan-400/10" }), u.jsx("div", { className: "absolute w-1.5 h-1.5 rounded-full bg-cyan-400/50 border border-cyan-300/70 shadow-sm shadow-cyan-400/60" })] }), u.jsx("div", { className: "flex items-center gap-1.5 bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-cyan-400/30 shadow-lg flex-nowrap shrink-0", children: k.map((y2) => u.jsx(za, { seat: y2, onClick: () => m2 ? b(y2) : e(y2), onContextMenu: (P) => {
        P.preventDefault(), y2.status === "available" && b(y2);
      }, deleteMode: m2, isHighlighted: r === y2.id, isFilteredOut: !K2.some((P) => P.id === y2.id) }, y2.id)) }), u.jsxs("div", { className: "w-8 flex items-center justify-center shrink-0 self-stretch relative", children: [u.jsx("div", { className: "w-px h-full bg-gradient-to-b from-cyan-400/10 via-cyan-400/30 to-cyan-400/10" }), u.jsx("div", { className: "absolute w-1.5 h-1.5 rounded-full bg-cyan-400/50 border border-cyan-300/70 shadow-sm shadow-cyan-400/60" })] }), u.jsx("div", { className: "flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-inner flex-nowrap shrink-0", children: M2.map((y2) => u.jsx(za, { seat: y2, onClick: () => m2 ? b(y2) : e(y2), onContextMenu: (P) => {
        P.preventDefault(), y2.status === "available" && b(y2);
      }, deleteMode: m2, isHighlighted: r === y2.id, isFilteredOut: !K2.some((P) => P.id === y2.id) }, y2.id)) }), u.jsx("div", { className: "w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg backdrop-blur-md", children: g }), !n && t && u.jsx("button", { type: "button", onClick: () => R ? B(null) : rA(g), title: `\u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0639\u062F \u062C\u062F\u064A\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0635\u0641 (${g})`, className: `w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition-all shrink-0 ${R ? "bg-rose-500 text-white shadow-md" : "bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-400/30 hover:scale-105"}`, children: R ? u.jsx(Og, { className: "w-3.5 h-3.5" }) : u.jsx(tm, { className: "w-3.5 h-3.5" }) })] }), R && u.jsxs("div", { className: "mx-auto mt-1 mb-2 p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl flex flex-wrap items-center gap-3 max-w-2xl text-xs animate-fade-in shadow-xl", children: [u.jsxs("span", { className: "text-emerald-300 font-black text-sm", children: ["+ \u0627\u0644\u0635\u0641 ", g] }), u.jsx("div", { className: "flex items-center gap-1", children: wf.map((y2) => u.jsx("button", { onClick: () => v2((P) => ({ ...P, sectorKey: y2.key })), className: `px-2.5 py-1 rounded-lg font-bold border transition-all ${p.sectorKey === y2.key ? "bg-emerald-500/40 text-emerald-200 border-emerald-400/50 shadow" : "bg-white/5 text-white/60 border-white/10 hover:text-white"}`, children: y2.name }, y2.key)) }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("span", { className: "text-white/60 font-bold", children: "\u0627\u0644\u0639\u062F\u062F:" }), u.jsx("button", { onClick: () => v2((y2) => ({ ...y2, count: Math.max(1, y2.count - 1) })), className: "w-6 h-6 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-black", children: "\u2212" }), u.jsx("span", { className: "text-white font-black w-6 text-center", children: p.count }), u.jsx("button", { onClick: () => v2((y2) => ({ ...y2, count: Math.min(20, y2.count + 1) })), className: "w-6 h-6 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-black", children: "+" })] }), u.jsxs("label", { className: "flex items-center gap-1.5 text-slate-200 cursor-pointer select-none", children: [u.jsx("input", { type: "checkbox", checked: p.autoRenumber, onChange: (y2) => v2((P) => ({ ...P, autoRenumber: y2.target.checked })), className: "accent-cyan-400 rounded" }), u.jsx("span", { className: "text-[11px]", children: "\u062A\u0631\u0642\u064A\u0645 \u062A\u0633\u0644\u0633\u0644\u064A \u062A\u0644\u0642\u0627\u0626\u064A" })] }), I ? u.jsx("span", { className: "text-emerald-300 font-black", children: I }) : u.jsxs("button", { onClick: V, disabled: x, className: "px-4 py-1.5 rounded-xl bg-gradient-to-l from-[#00d2ff] to-[#7952b3] text-white font-black shadow hover:scale-105 transition-all flex items-center gap-1.5", children: [u.jsx(sm, { className: "w-3.5 h-3.5" }), "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0622\u0646"] })] })] }, g);
    }) })] }) })] }), G && u.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-md animate-fade-in", children: u.jsxs("div", { className: "relative w-full max-w-md glass-panel-luxury rounded-3xl p-6 shadow-2xl border border-rose-500/40 text-center space-y-4", children: [u.jsx("div", { className: "w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 shadow-lg", children: u.jsx(vs, { className: "w-7 h-7" }) }), u.jsxs("div", { children: [u.jsx("h3", { className: "text-lg font-black text-white", children: "\u062A\u0623\u0643\u064A\u062F \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0639\u062F \u0646\u0647\u0627\u0626\u064A\u0627\u064B" }), u.jsx("p", { className: "text-cyan-300 font-black text-base mt-1", children: xn(G) }), u.jsxs("p", { className: "text-xs text-slate-300 mt-1", children: ["\u0627\u0644\u0642\u0637\u0627\u0639: ", G.sector, " \u2022 \u0627\u0644\u0643\u0648\u062F: ", G.id] })] }), u.jsxs("div", { className: "bg-white/5 p-3 rounded-2xl border border-white/10 text-xs text-slate-300 text-right space-y-2", children: [u.jsxs("label", { className: "flex items-center gap-2 cursor-pointer select-none", children: [u.jsx("input", { type: "checkbox", checked: AA, onChange: (g) => $(g.target.checked), className: "accent-cyan-400 rounded w-4 h-4" }), u.jsx("span", { className: "text-white font-bold", children: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u0642\u064A\u0645 \u062C\u0645\u064A\u0639 \u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0635\u0641 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062D\u0630\u0641" })] }), u.jsx("p", { className: "text-[11px] text-slate-400", children: "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0639\u062F \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0648\u062A\u062D\u062F\u064A\u062B \u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0642\u0627\u0639\u0629 \u0641\u0648\u0631\u0627\u064B." })] }), u.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [u.jsxs("button", { onClick: j, className: "flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2", children: [u.jsx(vs, { className: "w-4 h-4" }), u.jsx("span", { children: "\u0646\u0639\u0645\u060C \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0639\u062F" })] }), u.jsx("button", { onClick: () => Z(null), className: "py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs border border-white/20 transition-all", children: "\u0625\u0644\u063A\u0627\u0621" })] })] }) })] });
  }
  function za({ seat: A2, onClick: e, onContextMenu: t, deleteMode: r, isHighlighted: n, isFilteredOut: s }) {
    let i = "seat-available";
    A2.status === "reserved" ? i = "seat-reserved" : A2.status === "checked_in" && (i = "seat-checkedin"), n && (i = "guest-seat-highlight"), s && (i = "bg-white/5 text-slate-400 border border-white/10 opacity-25 cursor-not-allowed");
    const l2 = r && A2.status === "available";
    return u.jsxs("div", { className: "relative group inline-block shrink-0", children: [u.jsxs("button", { onClick: e, onContextMenu: t, disabled: s, className: `seat-3d w-7 h-7 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[10px] font-black transition-all relative ${i} ${l2 ? "!border-rose-400 !bg-rose-600/60 hover:!bg-rose-600 hover:scale-110 !shadow-rose-500/50" : ""}`, children: [u.jsx("span", { className: "leading-none tracking-tight", children: A2.number }), l2 && u.jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black shadow", children: "\u2715" })] }), u.jsxs("div", { className: "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-48 animate-fade-in", children: [u.jsxs("div", { className: "glass-panel-luxury text-slate-100 p-2.5 rounded-2xl border border-white/30 shadow-2xl text-[11px] w-full text-center space-y-1", children: [u.jsx("div", { className: "font-black text-cyan-300 text-xs", children: xn(A2) }), u.jsxs("div", { className: "text-[10px] text-slate-200", children: ["\u0627\u0644\u0642\u0637\u0627\u0639: ", u.jsx("strong", { className: "text-white", children: A2.sector })] }), A2.guest ? u.jsxs("div", { className: "mt-1 pt-1 border-t border-white/20 text-emerald-300 font-bold truncate flex items-center justify-center gap-1", children: [u.jsx(am, { className: "w-3.5 h-3.5" }), u.jsx("span", { children: A2.guest.name })] }) : r ? u.jsx("div", { className: "mt-1 text-rose-300 font-bold text-[10px] bg-rose-500/20 py-0.5 rounded-lg border border-rose-400/30", children: "\u{1F5D1} \u0627\u0646\u0642\u0631 \u0644\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0639\u062F" }) : u.jsxs("div", { className: "space-y-0.5", children: [u.jsx("div", { className: "mt-1 text-emerald-200 font-bold text-[10px] bg-emerald-500/20 py-0.5 rounded-lg border border-emerald-400/30", children: "\u2728 \u0627\u0646\u0642\u0631 \u0644\u0644\u062D\u062C\u0632" }), u.jsx("div", { className: "text-[9px] text-rose-300/80", children: "(\u0632\u0631 \u0627\u0644\u0641\u0623\u0631\u0629 \u0627\u0644\u0623\u064A\u0645\u0646 \u0644\u0644\u0625\u0632\u0627\u0644\u0629)" })] })] }), u.jsx("div", { className: "w-2 h-2 bg-indigo-950 rotate-45 border-r border-b border-white/30 -mt-1" })] })] });
  }
  var dm = Object.defineProperty;
  var Ti = Object.getOwnPropertySymbols;
  var Xg = Object.prototype.hasOwnProperty;
  var Wg = Object.prototype.propertyIsEnumerable;
  var pf = (A2, e, t) => e in A2 ? dm(A2, e, { enumerable: true, configurable: true, writable: true, value: t }) : A2[e] = t;
  var Bo = (A2, e) => {
    for (var t in e || (e = {})) Xg.call(e, t) && pf(A2, t, e[t]);
    if (Ti) for (var t of Ti(e)) Wg.call(e, t) && pf(A2, t, e[t]);
    return A2;
  };
  var go = (A2, e) => {
    var t = {};
    for (var r in A2) Xg.call(A2, r) && e.indexOf(r) < 0 && (t[r] = A2[r]);
    if (A2 != null && Ti) for (var r of Ti(A2)) e.indexOf(r) < 0 && Wg.call(A2, r) && (t[r] = A2[r]);
    return t;
  };
  var qt;
  ((A2) => {
    const e = class X {
      constructor(a, o, c, f) {
        if (this.version = a, this.errorCorrectionLevel = o, this.modules = [], this.isFunction = [], a < X.MIN_VERSION || a > X.MAX_VERSION) throw new RangeError("Version value out of range");
        if (f < -1 || f > 7) throw new RangeError("Mask value out of range");
        this.size = a * 4 + 17;
        let d = [];
        for (let w2 = 0; w2 < this.size; w2++) d.push(false);
        for (let w2 = 0; w2 < this.size; w2++) this.modules.push(d.slice()), this.isFunction.push(d.slice());
        this.drawFunctionPatterns();
        const m2 = this.addEccAndInterleave(c);
        if (this.drawCodewords(m2), f == -1) {
          let w2 = 1e9;
          for (let C2 = 0; C2 < 8; C2++) {
            this.applyMask(C2), this.drawFormatBits(C2);
            const U = this.getPenaltyScore();
            U < w2 && (f = C2, w2 = U), this.applyMask(C2);
          }
        }
        n(0 <= f && f <= 7), this.mask = f, this.applyMask(f), this.drawFormatBits(f), this.isFunction = [];
      }
      static encodeText(a, o) {
        const c = A2.QrSegment.makeSegments(a);
        return X.encodeSegments(c, o);
      }
      static encodeBinary(a, o) {
        const c = A2.QrSegment.makeBytes(a);
        return X.encodeSegments([c], o);
      }
      static encodeSegments(a, o, c = 1, f = 40, d = -1, m2 = true) {
        if (!(X.MIN_VERSION <= c && c <= f && f <= X.MAX_VERSION) || d < -1 || d > 7) throw new RangeError("Invalid value");
        let w2, C2;
        for (w2 = c; ; w2++) {
          const p = X.getNumDataCodewords(w2, o) * 8, v2 = i.getTotalBits(a, w2);
          if (v2 <= p) {
            C2 = v2;
            break;
          }
          if (w2 >= f) throw new RangeError("Data too long");
        }
        for (const p of [X.Ecc.MEDIUM, X.Ecc.QUARTILE, X.Ecc.HIGH]) m2 && C2 <= X.getNumDataCodewords(w2, p) * 8 && (o = p);
        let U = [];
        for (const p of a) {
          t(p.mode.modeBits, 4, U), t(p.numChars, p.mode.numCharCountBits(w2), U);
          for (const v2 of p.getData()) U.push(v2);
        }
        n(U.length == C2);
        const h = X.getNumDataCodewords(w2, o) * 8;
        n(U.length <= h), t(0, Math.min(4, h - U.length), U), t(0, (8 - U.length % 8) % 8, U), n(U.length % 8 == 0);
        for (let p = 236; U.length < h; p ^= 253) t(p, 8, U);
        let B = [];
        for (; B.length * 8 < U.length; ) B.push(0);
        return U.forEach((p, v2) => B[v2 >>> 3] |= p << 7 - (v2 & 7)), new X(w2, o, B, d);
      }
      getModule(a, o) {
        return 0 <= a && a < this.size && 0 <= o && o < this.size && this.modules[o][a];
      }
      getModules() {
        return this.modules;
      }
      drawFunctionPatterns() {
        for (let c = 0; c < this.size; c++) this.setFunctionModule(6, c, c % 2 == 0), this.setFunctionModule(c, 6, c % 2 == 0);
        this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
        const a = this.getAlignmentPatternPositions(), o = a.length;
        for (let c = 0; c < o; c++) for (let f = 0; f < o; f++) c == 0 && f == 0 || c == 0 && f == o - 1 || c == o - 1 && f == 0 || this.drawAlignmentPattern(a[c], a[f]);
        this.drawFormatBits(0), this.drawVersion();
      }
      drawFormatBits(a) {
        const o = this.errorCorrectionLevel.formatBits << 3 | a;
        let c = o;
        for (let d = 0; d < 10; d++) c = c << 1 ^ (c >>> 9) * 1335;
        const f = (o << 10 | c) ^ 21522;
        n(f >>> 15 == 0);
        for (let d = 0; d <= 5; d++) this.setFunctionModule(8, d, r(f, d));
        this.setFunctionModule(8, 7, r(f, 6)), this.setFunctionModule(8, 8, r(f, 7)), this.setFunctionModule(7, 8, r(f, 8));
        for (let d = 9; d < 15; d++) this.setFunctionModule(14 - d, 8, r(f, d));
        for (let d = 0; d < 8; d++) this.setFunctionModule(this.size - 1 - d, 8, r(f, d));
        for (let d = 8; d < 15; d++) this.setFunctionModule(8, this.size - 15 + d, r(f, d));
        this.setFunctionModule(8, this.size - 8, true);
      }
      drawVersion() {
        if (this.version < 7) return;
        let a = this.version;
        for (let c = 0; c < 12; c++) a = a << 1 ^ (a >>> 11) * 7973;
        const o = this.version << 12 | a;
        n(o >>> 18 == 0);
        for (let c = 0; c < 18; c++) {
          const f = r(o, c), d = this.size - 11 + c % 3, m2 = Math.floor(c / 3);
          this.setFunctionModule(d, m2, f), this.setFunctionModule(m2, d, f);
        }
      }
      drawFinderPattern(a, o) {
        for (let c = -4; c <= 4; c++) for (let f = -4; f <= 4; f++) {
          const d = Math.max(Math.abs(f), Math.abs(c)), m2 = a + f, w2 = o + c;
          0 <= m2 && m2 < this.size && 0 <= w2 && w2 < this.size && this.setFunctionModule(m2, w2, d != 2 && d != 4);
        }
      }
      drawAlignmentPattern(a, o) {
        for (let c = -2; c <= 2; c++) for (let f = -2; f <= 2; f++) this.setFunctionModule(a + f, o + c, Math.max(Math.abs(f), Math.abs(c)) != 1);
      }
      setFunctionModule(a, o, c) {
        this.modules[o][a] = c, this.isFunction[o][a] = true;
      }
      addEccAndInterleave(a) {
        const o = this.version, c = this.errorCorrectionLevel;
        if (a.length != X.getNumDataCodewords(o, c)) throw new RangeError("Invalid argument");
        const f = X.NUM_ERROR_CORRECTION_BLOCKS[c.ordinal][o], d = X.ECC_CODEWORDS_PER_BLOCK[c.ordinal][o], m2 = Math.floor(X.getNumRawDataModules(o) / 8), w2 = f - m2 % f, C2 = Math.floor(m2 / f);
        let U = [];
        const h = X.reedSolomonComputeDivisor(d);
        for (let p = 0, v2 = 0; p < f; p++) {
          let x = a.slice(v2, v2 + C2 - d + (p < w2 ? 0 : 1));
          v2 += x.length;
          const F = X.reedSolomonComputeRemainder(x, h);
          p < w2 && x.push(0), U.push(x.concat(F));
        }
        let B = [];
        for (let p = 0; p < U[0].length; p++) U.forEach((v2, x) => {
          (p != C2 - d || x >= w2) && B.push(v2[p]);
        });
        return n(B.length == m2), B;
      }
      drawCodewords(a) {
        if (a.length != Math.floor(X.getNumRawDataModules(this.version) / 8)) throw new RangeError("Invalid argument");
        let o = 0;
        for (let c = this.size - 1; c >= 1; c -= 2) {
          c == 6 && (c = 5);
          for (let f = 0; f < this.size; f++) for (let d = 0; d < 2; d++) {
            const m2 = c - d, C2 = (c + 1 & 2) == 0 ? this.size - 1 - f : f;
            !this.isFunction[C2][m2] && o < a.length * 8 && (this.modules[C2][m2] = r(a[o >>> 3], 7 - (o & 7)), o++);
          }
        }
        n(o == a.length * 8);
      }
      applyMask(a) {
        if (a < 0 || a > 7) throw new RangeError("Mask value out of range");
        for (let o = 0; o < this.size; o++) for (let c = 0; c < this.size; c++) {
          let f;
          switch (a) {
            case 0:
              f = (c + o) % 2 == 0;
              break;
            case 1:
              f = o % 2 == 0;
              break;
            case 2:
              f = c % 3 == 0;
              break;
            case 3:
              f = (c + o) % 3 == 0;
              break;
            case 4:
              f = (Math.floor(c / 3) + Math.floor(o / 2)) % 2 == 0;
              break;
            case 5:
              f = c * o % 2 + c * o % 3 == 0;
              break;
            case 6:
              f = (c * o % 2 + c * o % 3) % 2 == 0;
              break;
            case 7:
              f = ((c + o) % 2 + c * o % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          !this.isFunction[o][c] && f && (this.modules[o][c] = !this.modules[o][c]);
        }
      }
      getPenaltyScore() {
        let a = 0;
        for (let d = 0; d < this.size; d++) {
          let m2 = false, w2 = 0, C2 = [0, 0, 0, 0, 0, 0, 0];
          for (let U = 0; U < this.size; U++) this.modules[d][U] == m2 ? (w2++, w2 == 5 ? a += X.PENALTY_N1 : w2 > 5 && a++) : (this.finderPenaltyAddHistory(w2, C2), m2 || (a += this.finderPenaltyCountPatterns(C2) * X.PENALTY_N3), m2 = this.modules[d][U], w2 = 1);
          a += this.finderPenaltyTerminateAndCount(m2, w2, C2) * X.PENALTY_N3;
        }
        for (let d = 0; d < this.size; d++) {
          let m2 = false, w2 = 0, C2 = [0, 0, 0, 0, 0, 0, 0];
          for (let U = 0; U < this.size; U++) this.modules[U][d] == m2 ? (w2++, w2 == 5 ? a += X.PENALTY_N1 : w2 > 5 && a++) : (this.finderPenaltyAddHistory(w2, C2), m2 || (a += this.finderPenaltyCountPatterns(C2) * X.PENALTY_N3), m2 = this.modules[U][d], w2 = 1);
          a += this.finderPenaltyTerminateAndCount(m2, w2, C2) * X.PENALTY_N3;
        }
        for (let d = 0; d < this.size - 1; d++) for (let m2 = 0; m2 < this.size - 1; m2++) {
          const w2 = this.modules[d][m2];
          w2 == this.modules[d][m2 + 1] && w2 == this.modules[d + 1][m2] && w2 == this.modules[d + 1][m2 + 1] && (a += X.PENALTY_N2);
        }
        let o = 0;
        for (const d of this.modules) o = d.reduce((m2, w2) => m2 + (w2 ? 1 : 0), o);
        const c = this.size * this.size, f = Math.ceil(Math.abs(o * 20 - c * 10) / c) - 1;
        return n(0 <= f && f <= 9), a += f * X.PENALTY_N4, n(0 <= a && a <= 2568888), a;
      }
      getAlignmentPatternPositions() {
        if (this.version == 1) return [];
        {
          const a = Math.floor(this.version / 7) + 2, o = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (a * 2 - 2)) * 2;
          let c = [6];
          for (let f = this.size - 7; c.length < a; f -= o) c.splice(1, 0, f);
          return c;
        }
      }
      static getNumRawDataModules(a) {
        if (a < X.MIN_VERSION || a > X.MAX_VERSION) throw new RangeError("Version number out of range");
        let o = (16 * a + 128) * a + 64;
        if (a >= 2) {
          const c = Math.floor(a / 7) + 2;
          o -= (25 * c - 10) * c - 55, a >= 7 && (o -= 36);
        }
        return n(208 <= o && o <= 29648), o;
      }
      static getNumDataCodewords(a, o) {
        return Math.floor(X.getNumRawDataModules(a) / 8) - X.ECC_CODEWORDS_PER_BLOCK[o.ordinal][a] * X.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][a];
      }
      static reedSolomonComputeDivisor(a) {
        if (a < 1 || a > 255) throw new RangeError("Degree out of range");
        let o = [];
        for (let f = 0; f < a - 1; f++) o.push(0);
        o.push(1);
        let c = 1;
        for (let f = 0; f < a; f++) {
          for (let d = 0; d < o.length; d++) o[d] = X.reedSolomonMultiply(o[d], c), d + 1 < o.length && (o[d] ^= o[d + 1]);
          c = X.reedSolomonMultiply(c, 2);
        }
        return o;
      }
      static reedSolomonComputeRemainder(a, o) {
        let c = o.map((f) => 0);
        for (const f of a) {
          const d = f ^ c.shift();
          c.push(0), o.forEach((m2, w2) => c[w2] ^= X.reedSolomonMultiply(m2, d));
        }
        return c;
      }
      static reedSolomonMultiply(a, o) {
        if (a >>> 8 || o >>> 8) throw new RangeError("Byte out of range");
        let c = 0;
        for (let f = 7; f >= 0; f--) c = c << 1 ^ (c >>> 7) * 285, c ^= (o >>> f & 1) * a;
        return n(c >>> 8 == 0), c;
      }
      finderPenaltyCountPatterns(a) {
        const o = a[1];
        n(o <= this.size * 3);
        const c = o > 0 && a[2] == o && a[3] == o * 3 && a[4] == o && a[5] == o;
        return (c && a[0] >= o * 4 && a[6] >= o ? 1 : 0) + (c && a[6] >= o * 4 && a[0] >= o ? 1 : 0);
      }
      finderPenaltyTerminateAndCount(a, o, c) {
        return a && (this.finderPenaltyAddHistory(o, c), o = 0), o += this.size, this.finderPenaltyAddHistory(o, c), this.finderPenaltyCountPatterns(c);
      }
      finderPenaltyAddHistory(a, o) {
        o[0] == 0 && (a += this.size), o.pop(), o.unshift(a);
      }
    };
    e.MIN_VERSION = 1, e.MAX_VERSION = 40, e.PENALTY_N1 = 3, e.PENALTY_N2 = 3, e.PENALTY_N3 = 40, e.PENALTY_N4 = 10, e.ECC_CODEWORDS_PER_BLOCK = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]], e.NUM_ERROR_CORRECTION_BLOCKS = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]], A2.QrCode = e;
    function t(l2, a, o) {
      if (a < 0 || a > 31 || l2 >>> a) throw new RangeError("Value out of range");
      for (let c = a - 1; c >= 0; c--) o.push(l2 >>> c & 1);
    }
    function r(l2, a) {
      return (l2 >>> a & 1) != 0;
    }
    function n(l2) {
      if (!l2) throw new Error("Assertion error");
    }
    const s = class mA {
      constructor(a, o, c) {
        if (this.mode = a, this.numChars = o, this.bitData = c, o < 0) throw new RangeError("Invalid argument");
        this.bitData = c.slice();
      }
      static makeBytes(a) {
        let o = [];
        for (const c of a) t(c, 8, o);
        return new mA(mA.Mode.BYTE, a.length, o);
      }
      static makeNumeric(a) {
        if (!mA.isNumeric(a)) throw new RangeError("String contains non-numeric characters");
        let o = [];
        for (let c = 0; c < a.length; ) {
          const f = Math.min(a.length - c, 3);
          t(parseInt(a.substring(c, c + f), 10), f * 3 + 1, o), c += f;
        }
        return new mA(mA.Mode.NUMERIC, a.length, o);
      }
      static makeAlphanumeric(a) {
        if (!mA.isAlphanumeric(a)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
        let o = [], c;
        for (c = 0; c + 2 <= a.length; c += 2) {
          let f = mA.ALPHANUMERIC_CHARSET.indexOf(a.charAt(c)) * 45;
          f += mA.ALPHANUMERIC_CHARSET.indexOf(a.charAt(c + 1)), t(f, 11, o);
        }
        return c < a.length && t(mA.ALPHANUMERIC_CHARSET.indexOf(a.charAt(c)), 6, o), new mA(mA.Mode.ALPHANUMERIC, a.length, o);
      }
      static makeSegments(a) {
        return a == "" ? [] : mA.isNumeric(a) ? [mA.makeNumeric(a)] : mA.isAlphanumeric(a) ? [mA.makeAlphanumeric(a)] : [mA.makeBytes(mA.toUtf8ByteArray(a))];
      }
      static makeEci(a) {
        let o = [];
        if (a < 0) throw new RangeError("ECI assignment value out of range");
        if (a < 128) t(a, 8, o);
        else if (a < 16384) t(2, 2, o), t(a, 14, o);
        else if (a < 1e6) t(6, 3, o), t(a, 21, o);
        else throw new RangeError("ECI assignment value out of range");
        return new mA(mA.Mode.ECI, 0, o);
      }
      static isNumeric(a) {
        return mA.NUMERIC_REGEX.test(a);
      }
      static isAlphanumeric(a) {
        return mA.ALPHANUMERIC_REGEX.test(a);
      }
      getData() {
        return this.bitData.slice();
      }
      static getTotalBits(a, o) {
        let c = 0;
        for (const f of a) {
          const d = f.mode.numCharCountBits(o);
          if (f.numChars >= 1 << d) return 1 / 0;
          c += 4 + d + f.bitData.length;
        }
        return c;
      }
      static toUtf8ByteArray(a) {
        a = encodeURI(a);
        let o = [];
        for (let c = 0; c < a.length; c++) a.charAt(c) != "%" ? o.push(a.charCodeAt(c)) : (o.push(parseInt(a.substring(c + 1, c + 3), 16)), c += 2);
        return o;
      }
    };
    s.NUMERIC_REGEX = /^[0-9]*$/, s.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/, s.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
    let i = s;
    A2.QrSegment = s;
  })(qt || (qt = {}));
  ((A2) => {
    ((e) => {
      const t = class {
        constructor(n, s) {
          this.ordinal = n, this.formatBits = s;
        }
      };
      t.LOW = new t(0, 1), t.MEDIUM = new t(1, 0), t.QUARTILE = new t(2, 3), t.HIGH = new t(3, 2), e.Ecc = t;
    })(A2.QrCode || (A2.QrCode = {}));
  })(qt || (qt = {}));
  ((A2) => {
    ((e) => {
      const t = class {
        constructor(n, s) {
          this.modeBits = n, this.numBitsCharCount = s;
        }
        numCharCountBits(n) {
          return this.numBitsCharCount[Math.floor((n + 7) / 17)];
        }
      };
      t.NUMERIC = new t(1, [10, 12, 14]), t.ALPHANUMERIC = new t(2, [9, 11, 13]), t.BYTE = new t(4, [8, 16, 16]), t.KANJI = new t(8, [8, 10, 12]), t.ECI = new t(7, [0, 0, 0]), e.Mode = t;
    })(A2.QrSegment || (A2.QrSegment = {}));
  })(qt || (qt = {}));
  var xr = qt;
  var Bm = { L: xr.QrCode.Ecc.LOW, M: xr.QrCode.Ecc.MEDIUM, Q: xr.QrCode.Ecc.QUARTILE, H: xr.QrCode.Ecc.HIGH };
  var zg = 128;
  var Jg = "L";
  var Yg = "#FFFFFF";
  var Zg = "#000000";
  var $g = false;
  var qg = 1;
  var gm = 4;
  var hm = 0;
  var wm = 0.1;
  function Ah(A2, e = 0) {
    const t = [];
    return A2.forEach(function(r, n) {
      let s = null;
      r.forEach(function(i, l2) {
        if (!i && s !== null) {
          t.push(`M${s + e} ${n + e}h${l2 - s}v1H${s + e}z`), s = null;
          return;
        }
        if (l2 === r.length - 1) {
          if (!i) return;
          s === null ? t.push(`M${l2 + e},${n + e} h1v1H${l2 + e}z`) : t.push(`M${s + e},${n + e} h${l2 + 1 - s}v1H${s + e}z`);
          return;
        }
        i && s === null && (s = l2);
      });
    }), t.join("");
  }
  function eh(A2, e) {
    return A2.slice().map((t, r) => r < e.y || r >= e.y + e.h ? t : t.map((n, s) => s < e.x || s >= e.x + e.w ? n : false));
  }
  function pm(A2, e, t, r) {
    if (r == null) return null;
    const n = A2.length + t * 2, s = Math.floor(e * wm), i = n / e, l2 = (r.width || s) * i, a = (r.height || s) * i, o = r.x == null ? A2.length / 2 - l2 / 2 : r.x * i, c = r.y == null ? A2.length / 2 - a / 2 : r.y * i, f = r.opacity == null ? 1 : r.opacity;
    let d = null;
    if (r.excavate) {
      let w2 = Math.floor(o), C2 = Math.floor(c), U = Math.ceil(l2 + o - w2), h = Math.ceil(a + c - C2);
      d = { x: w2, y: C2, w: U, h };
    }
    const m2 = r.crossOrigin;
    return { x: o, y: c, h: a, w: l2, excavation: d, opacity: f, crossOrigin: m2 };
  }
  function mm(A2, e) {
    return e != null ? Math.max(Math.floor(e), 0) : A2 ? gm : hm;
  }
  function th({ value: A2, level: e, minVersion: t, includeMargin: r, marginSize: n, imageSettings: s, size: i, boostLevel: l2 }) {
    let a = UA.useMemo(() => {
      const w2 = (Array.isArray(A2) ? A2 : [A2]).reduce((C2, U) => (C2.push(...xr.QrSegment.makeSegments(U)), C2), []);
      return xr.QrCode.encodeSegments(w2, Bm[e], t, void 0, void 0, l2);
    }, [A2, e, t, l2]);
    const { cells: o, margin: c, numCells: f, calculatedImageSettings: d } = UA.useMemo(() => {
      let m2 = a.getModules();
      const w2 = mm(r, n), C2 = m2.length + w2 * 2, U = pm(m2, i, w2, s);
      return { cells: m2, margin: w2, numCells: C2, calculatedImageSettings: U };
    }, [a, i, s, r, n]);
    return { qrcode: a, margin: c, cells: o, numCells: f, calculatedImageSettings: d };
  }
  var Cm = function() {
    try {
      new Path2D().addPath(new Path2D());
    } catch {
      return false;
    }
    return true;
  }();
  var Qm = UA.forwardRef(function(e, t) {
    const r = e, { value: n, size: s = zg, level: i = Jg, bgColor: l2 = Yg, fgColor: a = Zg, includeMargin: o = $g, minVersion: c = qg, boostLevel: f, marginSize: d, imageSettings: m2 } = r, C2 = go(r, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "boostLevel", "marginSize", "imageSettings"]), { style: U } = C2, h = go(C2, ["style"]), B = m2 == null ? void 0 : m2.src, p = UA.useRef(null), v2 = UA.useRef(null), x = UA.useCallback((G) => {
      p.current = G, typeof t == "function" ? t(G) : t && (t.current = G);
    }, [t]), [F, I] = UA.useState(false), { margin: H, cells: L, numCells: K2, calculatedImageSettings: _ } = th({ value: n, level: i, minVersion: c, boostLevel: f, includeMargin: o, marginSize: d, imageSettings: m2, size: s });
    UA.useEffect(() => {
      if (p.current != null) {
        const G = p.current, Z = G.getContext("2d");
        if (!Z) return;
        let AA = L;
        const $ = v2.current, b = _ != null && $ !== null && $.complete && $.naturalHeight !== 0 && $.naturalWidth !== 0;
        b && _.excavation != null && (AA = eh(L, _.excavation));
        const j = window.devicePixelRatio || 1;
        G.height = G.width = s * j;
        const Q = s / K2 * j;
        Z.scale(Q, Q), Z.fillStyle = l2, Z.fillRect(0, 0, K2, K2), Z.fillStyle = a, Cm ? Z.fill(new Path2D(Ah(AA, H))) : L.forEach(function(g, E) {
          g.forEach(function(N2, k) {
            N2 && Z.fillRect(k + H, E + H, 1, 1);
          });
        }), _ && (Z.globalAlpha = _.opacity), b && Z.drawImage($, _.x + H, _.y + H, _.w, _.h);
      }
    }), UA.useEffect(() => {
      I(false);
    }, [B]);
    const rA = Bo({ height: s, width: s }, U);
    let V = null;
    return B != null && (V = UA.createElement("img", { src: B, key: B, style: { display: "none" }, onLoad: () => {
      I(true);
    }, ref: v2, crossOrigin: _ == null ? void 0 : _.crossOrigin })), UA.createElement(UA.Fragment, null, UA.createElement("canvas", Bo({ style: rA, height: s, width: s, ref: x, role: "img" }, h)), V);
  });
  Qm.displayName = "QRCodeCanvas";
  var si = UA.forwardRef(function(e, t) {
    const r = e, { value: n, size: s = zg, level: i = Jg, bgColor: l2 = Yg, fgColor: a = Zg, includeMargin: o = $g, minVersion: c = qg, boostLevel: f, title: d, marginSize: m2, imageSettings: w2 } = r, C2 = go(r, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "boostLevel", "title", "marginSize", "imageSettings"]), { margin: U, cells: h, numCells: B, calculatedImageSettings: p } = th({ value: n, level: i, minVersion: c, boostLevel: f, includeMargin: o, marginSize: m2, imageSettings: w2, size: s });
    let v2 = h, x = null;
    w2 != null && p != null && (p.excavation != null && (v2 = eh(h, p.excavation)), x = UA.createElement("image", { href: w2.src, height: p.h, width: p.w, x: p.x + U, y: p.y + U, preserveAspectRatio: "none", opacity: p.opacity, crossOrigin: p.crossOrigin }));
    const F = Ah(v2, U);
    return UA.createElement("svg", Bo({ height: s, width: s, viewBox: `0 0 ${B} ${B}`, ref: t, role: "img" }, C2), !!d && UA.createElement("title", null, d), UA.createElement("path", { fill: l2, d: `M0,0 h${B}v${B}H0z`, shapeRendering: "crispEdges" }), UA.createElement("path", { fill: a, d: F, shapeRendering: "crispEdges" }), x);
  });
  si.displayName = "QRCodeSVG";
  function vm(A2, e) {
    if (A2.match(/^[a-z]+:\/\//i)) return A2;
    if (A2.match(/^\/\//)) return window.location.protocol + A2;
    if (A2.match(/^[a-z]+:/i)) return A2;
    const t = document.implementation.createHTMLDocument(), r = t.createElement("base"), n = t.createElement("a");
    return t.head.appendChild(r), t.body.appendChild(n), e && (r.href = e), n.href = A2, n.href;
  }
  var Um = /* @__PURE__ */ (() => {
    let A2 = 0;
    const e = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
    return () => (A2 += 1, `u${e()}${A2}`);
  })();
  function yt(A2) {
    const e = [];
    for (let t = 0, r = A2.length; t < r; t++) e.push(A2[t]);
    return e;
  }
  var rr = null;
  function rh(A2 = {}) {
    return rr || (A2.includeStyleProperties ? (rr = A2.includeStyleProperties, rr) : (rr = yt(window.getComputedStyle(document.documentElement)), rr));
  }
  function Ki(A2, e) {
    const r = (A2.ownerDocument.defaultView || window).getComputedStyle(A2).getPropertyValue(e);
    return r ? parseFloat(r.replace("px", "")) : 0;
  }
  function Fm(A2) {
    const e = Ki(A2, "border-left-width"), t = Ki(A2, "border-right-width");
    return A2.clientWidth + e + t;
  }
  function xm(A2) {
    const e = Ki(A2, "border-top-width"), t = Ki(A2, "border-bottom-width");
    return A2.clientHeight + e + t;
  }
  function nh(A2, e = {}) {
    const t = e.width || Fm(A2), r = e.height || xm(A2);
    return { width: t, height: r };
  }
  function ym() {
    let A2, e;
    try {
      e = process;
    } catch {
    }
    const t = e && e.env ? e.env.devicePixelRatio : null;
    return t && (A2 = parseInt(t, 10), Number.isNaN(A2) && (A2 = 1)), A2 || window.devicePixelRatio || 1;
  }
  var ne = 16384;
  function Em(A2) {
    (A2.width > ne || A2.height > ne) && (A2.width > ne && A2.height > ne ? A2.width > A2.height ? (A2.height *= ne / A2.width, A2.width = ne) : (A2.width *= ne / A2.height, A2.height = ne) : A2.width > ne ? (A2.height *= ne / A2.width, A2.width = ne) : (A2.width *= ne / A2.height, A2.height = ne));
  }
  function Di(A2) {
    return new Promise((e, t) => {
      const r = new Image();
      r.onload = () => {
        r.decode().then(() => {
          requestAnimationFrame(() => e(r));
        });
      }, r.onerror = t, r.crossOrigin = "anonymous", r.decoding = "async", r.src = A2;
    });
  }
  async function Im(A2) {
    return Promise.resolve().then(() => new XMLSerializer().serializeToString(A2)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
  }
  async function Hm(A2, e, t) {
    const r = "http://www.w3.org/2000/svg", n = document.createElementNS(r, "svg"), s = document.createElementNS(r, "foreignObject");
    return n.setAttribute("width", `${e}`), n.setAttribute("height", `${t}`), n.setAttribute("viewBox", `0 0 ${e} ${t}`), s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("externalResourcesRequired", "true"), n.appendChild(s), s.appendChild(A2), Im(n);
  }
  var re = (A2, e) => {
    if (A2 instanceof e) return true;
    const t = Object.getPrototypeOf(A2);
    return t === null ? false : t.constructor.name === e.name || re(t, e);
  };
  function Sm(A2) {
    const e = A2.getPropertyValue("content");
    return `${A2.cssText} content: '${e.replace(/'|"/g, "")}';`;
  }
  function bm(A2, e) {
    return rh(e).map((t) => {
      const r = A2.getPropertyValue(t), n = A2.getPropertyPriority(t);
      return `${t}: ${r}${n ? " !important" : ""};`;
    }).join(" ");
  }
  function Lm(A2, e, t, r) {
    const n = `.${A2}:${e}`, s = t.cssText ? Sm(t) : bm(t, r);
    return document.createTextNode(`${n}{${s}}`);
  }
  function mf(A2, e, t, r) {
    const n = window.getComputedStyle(A2, t), s = n.getPropertyValue("content");
    if (s === "" || s === "none") return;
    const i = Um();
    try {
      e.className = `${e.className} ${i}`;
    } catch {
      return;
    }
    const l2 = document.createElement("style");
    l2.appendChild(Lm(i, t, n, r)), e.appendChild(l2);
  }
  function Nm(A2, e, t) {
    mf(A2, e, ":before", t), mf(A2, e, ":after", t);
  }
  var Cf = "application/font-woff";
  var Qf = "image/jpeg";
  var km = { woff: Cf, woff2: Cf, ttf: "application/font-truetype", eot: "application/vnd.ms-fontobject", png: "image/png", jpg: Qf, jpeg: Qf, gif: "image/gif", tiff: "image/tiff", svg: "image/svg+xml", webp: "image/webp" };
  function Tm(A2) {
    const e = /\.([^./]*?)$/g.exec(A2);
    return e ? e[1] : "";
  }
  function Du(A2) {
    const e = Tm(A2).toLowerCase();
    return km[e] || "";
  }
  function Km(A2) {
    return A2.split(/,/)[1];
  }
  function ho(A2) {
    return A2.search(/^(data:)/) !== -1;
  }
  function Dm(A2, e) {
    return `data:${e};base64,${A2}`;
  }
  async function sh(A2, e, t) {
    const r = await fetch(A2, e);
    if (r.status === 404) throw new Error(`Resource "${r.url}" not found`);
    const n = await r.blob();
    return new Promise((s, i) => {
      const l2 = new FileReader();
      l2.onerror = i, l2.onloadend = () => {
        try {
          s(t({ res: r, result: l2.result }));
        } catch (a) {
          i(a);
        }
      }, l2.readAsDataURL(n);
    });
  }
  var Ja = {};
  function Mm(A2, e, t) {
    let r = A2.replace(/\?.*/, "");
    return t && (r = A2), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), e ? `[${e}]${r}` : r;
  }
  async function Mu(A2, e, t) {
    const r = Mm(A2, e, t.includeQueryParams);
    if (Ja[r] != null) return Ja[r];
    t.cacheBust && (A2 += (/\?/.test(A2) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
    let n;
    try {
      const s = await sh(A2, t.fetchRequestInit, ({ res: i, result: l2 }) => (e || (e = i.headers.get("Content-Type") || ""), Km(l2)));
      n = Dm(s, e);
    } catch (s) {
      n = t.imagePlaceholder || "";
      let i = `Failed to fetch resource: ${A2}`;
      s && (i = typeof s == "string" ? s : s.message), i && console.warn(i);
    }
    return Ja[r] = n, n;
  }
  async function Rm(A2) {
    const e = A2.toDataURL();
    return e === "data:," ? A2.cloneNode(false) : Di(e);
  }
  async function Om(A2, e) {
    if (A2.currentSrc) {
      const s = document.createElement("canvas"), i = s.getContext("2d");
      s.width = A2.clientWidth, s.height = A2.clientHeight, i == null || i.drawImage(A2, 0, 0, s.width, s.height);
      const l2 = s.toDataURL();
      return Di(l2);
    }
    const t = A2.poster, r = Du(t), n = await Mu(t, r, e);
    return Di(n);
  }
  async function jm(A2, e) {
    var t;
    try {
      if (!((t = A2 == null ? void 0 : A2.contentDocument) === null || t === void 0) && t.body) return await ua(A2.contentDocument.body, e, true);
    } catch {
    }
    return A2.cloneNode(false);
  }
  async function Pm(A2, e) {
    return re(A2, HTMLCanvasElement) ? Rm(A2) : re(A2, HTMLVideoElement) ? Om(A2, e) : re(A2, HTMLIFrameElement) ? jm(A2, e) : A2.cloneNode(ih(A2));
  }
  var _m = (A2) => A2.tagName != null && A2.tagName.toUpperCase() === "SLOT";
  var ih = (A2) => A2.tagName != null && A2.tagName.toUpperCase() === "SVG";
  async function Vm(A2, e, t) {
    var r, n;
    if (ih(e)) return e;
    let s = [];
    return _m(A2) && A2.assignedNodes ? s = yt(A2.assignedNodes()) : re(A2, HTMLIFrameElement) && (!((r = A2.contentDocument) === null || r === void 0) && r.body) ? s = yt(A2.contentDocument.body.childNodes) : s = yt(((n = A2.shadowRoot) !== null && n !== void 0 ? n : A2).childNodes), s.length === 0 || re(A2, HTMLVideoElement) || await s.reduce((i, l2) => i.then(() => ua(l2, t)).then((a) => {
      a && e.appendChild(a);
    }), Promise.resolve()), e;
  }
  function Gm(A2, e, t) {
    const r = e.style;
    if (!r) return;
    const n = window.getComputedStyle(A2);
    n.cssText ? (r.cssText = n.cssText, r.transformOrigin = n.transformOrigin) : rh(t).forEach((s) => {
      let i = n.getPropertyValue(s);
      s === "font-size" && i.endsWith("px") && (i = `${Math.floor(parseFloat(i.substring(0, i.length - 2))) - 0.1}px`), re(A2, HTMLIFrameElement) && s === "display" && i === "inline" && (i = "block"), s === "d" && e.getAttribute("d") && (i = `path(${e.getAttribute("d")})`), r.setProperty(s, i, n.getPropertyPriority(s));
    });
  }
  function Xm(A2, e) {
    re(A2, HTMLTextAreaElement) && (e.innerHTML = A2.value), re(A2, HTMLInputElement) && e.setAttribute("value", A2.value);
  }
  function Wm(A2, e) {
    if (re(A2, HTMLSelectElement)) {
      const t = e, r = Array.from(t.children).find((n) => A2.value === n.getAttribute("value"));
      r && r.setAttribute("selected", "");
    }
  }
  function zm(A2, e, t) {
    return re(e, Element) && (Gm(A2, e, t), Nm(A2, e, t), Xm(A2, e), Wm(A2, e)), e;
  }
  async function Jm(A2, e) {
    const t = A2.querySelectorAll ? A2.querySelectorAll("use") : [];
    if (t.length === 0) return A2;
    const r = {};
    for (let s = 0; s < t.length; s++) {
      const l2 = t[s].getAttribute("xlink:href");
      if (l2) {
        const a = A2.querySelector(l2), o = document.querySelector(l2);
        !a && o && !r[l2] && (r[l2] = await ua(o, e, true));
      }
    }
    const n = Object.values(r);
    if (n.length) {
      const s = "http://www.w3.org/1999/xhtml", i = document.createElementNS(s, "svg");
      i.setAttribute("xmlns", s), i.style.position = "absolute", i.style.width = "0", i.style.height = "0", i.style.overflow = "hidden", i.style.display = "none";
      const l2 = document.createElementNS(s, "defs");
      i.appendChild(l2);
      for (let a = 0; a < n.length; a++) l2.appendChild(n[a]);
      A2.appendChild(i);
    }
    return A2;
  }
  async function ua(A2, e, t) {
    return !t && e.filter && !e.filter(A2) ? null : Promise.resolve(A2).then((r) => Pm(r, e)).then((r) => Vm(A2, r, e)).then((r) => zm(A2, r, e)).then((r) => Jm(r, e));
  }
  var ah = /url\((['"]?)([^'"]+?)\1\)/g;
  var Ym = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
  var Zm = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
  function $m(A2) {
    const e = A2.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
  }
  function qm(A2) {
    const e = [];
    return A2.replace(ah, (t, r, n) => (e.push(n), t)), e.filter((t) => !ho(t));
  }
  async function AC(A2, e, t, r, n) {
    try {
      const s = t ? vm(e, t) : e, i = Du(e);
      let l2;
      return n || (l2 = await Mu(s, i, r)), A2.replace($m(e), `$1${l2}$3`);
    } catch {
    }
    return A2;
  }
  function eC(A2, { preferredFontFormat: e }) {
    return e ? A2.replace(Zm, (t) => {
      for (; ; ) {
        const [r, , n] = Ym.exec(t) || [];
        if (!n) return "";
        if (n === e) return `src: ${r};`;
      }
    }) : A2;
  }
  function lh(A2) {
    return A2.search(ah) !== -1;
  }
  async function oh(A2, e, t) {
    if (!lh(A2)) return A2;
    const r = eC(A2, t);
    return qm(r).reduce((s, i) => s.then((l2) => AC(l2, i, e, t)), Promise.resolve(r));
  }
  async function nr(A2, e, t) {
    var r;
    const n = (r = e.style) === null || r === void 0 ? void 0 : r.getPropertyValue(A2);
    if (n) {
      const s = await oh(n, null, t);
      return e.style.setProperty(A2, s, e.style.getPropertyPriority(A2)), true;
    }
    return false;
  }
  async function tC(A2, e) {
    await nr("background", A2, e) || await nr("background-image", A2, e), await nr("mask", A2, e) || await nr("-webkit-mask", A2, e) || await nr("mask-image", A2, e) || await nr("-webkit-mask-image", A2, e);
  }
  async function rC(A2, e) {
    const t = re(A2, HTMLImageElement);
    if (!(t && !ho(A2.src)) && !(re(A2, SVGImageElement) && !ho(A2.href.baseVal))) return;
    const r = t ? A2.src : A2.href.baseVal, n = await Mu(r, Du(r), e);
    await new Promise((s, i) => {
      A2.onload = s, A2.onerror = e.onImageErrorHandler ? (...a) => {
        try {
          s(e.onImageErrorHandler(...a));
        } catch (o) {
          i(o);
        }
      } : i;
      const l2 = A2;
      l2.decode && (l2.decode = s), l2.loading === "lazy" && (l2.loading = "eager"), t ? (A2.srcset = "", A2.src = n) : A2.href.baseVal = n;
    });
  }
  async function nC(A2, e) {
    const r = yt(A2.childNodes).map((n) => uh(n, e));
    await Promise.all(r).then(() => A2);
  }
  async function uh(A2, e) {
    re(A2, Element) && (await tC(A2, e), await rC(A2, e), await nC(A2, e));
  }
  function sC(A2, e) {
    const { style: t } = A2;
    e.backgroundColor && (t.backgroundColor = e.backgroundColor), e.width && (t.width = `${e.width}px`), e.height && (t.height = `${e.height}px`);
    const r = e.style;
    return r != null && Object.keys(r).forEach((n) => {
      t[n] = r[n];
    }), A2;
  }
  var vf = {};
  async function Uf(A2) {
    let e = vf[A2];
    if (e != null) return e;
    const r = await (await fetch(A2)).text();
    return e = { url: A2, cssText: r }, vf[A2] = e, e;
  }
  async function Ff(A2, e) {
    let t = A2.cssText;
    const r = /url\(["']?([^"')]+)["']?\)/g, s = (t.match(/url\([^)]+\)/g) || []).map(async (i) => {
      let l2 = i.replace(r, "$1");
      return l2.startsWith("https://") || (l2 = new URL(l2, A2.url).href), sh(l2, e.fetchRequestInit, ({ result: a }) => (t = t.replace(i, `url(${a})`), [i, a]));
    });
    return Promise.all(s).then(() => t);
  }
  function xf(A2) {
    if (A2 == null) return [];
    const e = [], t = /(\/\*[\s\S]*?\*\/)/gi;
    let r = A2.replace(t, "");
    const n = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
    for (; ; ) {
      const a = n.exec(r);
      if (a === null) break;
      e.push(a[0]);
    }
    r = r.replace(n, "");
    const s = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, i = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", l2 = new RegExp(i, "gi");
    for (; ; ) {
      let a = s.exec(r);
      if (a === null) {
        if (a = l2.exec(r), a === null) break;
        s.lastIndex = l2.lastIndex;
      } else l2.lastIndex = s.lastIndex;
      e.push(a[0]);
    }
    return e;
  }
  async function iC(A2, e) {
    const t = [], r = [];
    return A2.forEach((n) => {
      if ("cssRules" in n) try {
        yt(n.cssRules || []).forEach((s, i) => {
          if (s.type === CSSRule.IMPORT_RULE) {
            let l2 = i + 1;
            const a = s.href, o = Uf(a).then((c) => Ff(c, e)).then((c) => xf(c).forEach((f) => {
              try {
                n.insertRule(f, f.startsWith("@import") ? l2 += 1 : n.cssRules.length);
              } catch (d) {
                console.error("Error inserting rule from remote css", { rule: f, error: d });
              }
            })).catch((c) => {
              console.error("Error loading remote css", c.toString());
            });
            r.push(o);
          }
        });
      } catch (s) {
        const i = A2.find((l2) => l2.href == null) || document.styleSheets[0];
        n.href != null && r.push(Uf(n.href).then((l2) => Ff(l2, e)).then((l2) => xf(l2).forEach((a) => {
          i.insertRule(a, i.cssRules.length);
        })).catch((l2) => {
          console.error("Error loading remote stylesheet", l2);
        })), console.error("Error inlining remote css file", s);
      }
    }), Promise.all(r).then(() => (A2.forEach((n) => {
      if ("cssRules" in n) try {
        yt(n.cssRules || []).forEach((s) => {
          t.push(s);
        });
      } catch (s) {
        console.error(`Error while reading CSS rules from ${n.href}`, s);
      }
    }), t));
  }
  function aC(A2) {
    return A2.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => lh(e.style.getPropertyValue("src")));
  }
  async function lC(A2, e) {
    if (A2.ownerDocument == null) throw new Error("Provided element is not within a Document");
    const t = yt(A2.ownerDocument.styleSheets), r = await iC(t, e);
    return aC(r);
  }
  function ch(A2) {
    return A2.trim().replace(/["']/g, "");
  }
  function oC(A2) {
    const e = /* @__PURE__ */ new Set();
    function t(r) {
      (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((s) => {
        e.add(ch(s));
      }), Array.from(r.children).forEach((s) => {
        s instanceof HTMLElement && t(s);
      });
    }
    return t(A2), e;
  }
  async function uC(A2, e) {
    const t = await lC(A2, e), r = oC(A2);
    return (await Promise.all(t.filter((s) => r.has(ch(s.style.fontFamily))).map((s) => {
      const i = s.parentStyleSheet ? s.parentStyleSheet.href : null;
      return oh(s.cssText, i, e);
    }))).join(`
`);
  }
  async function cC(A2, e) {
    const t = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await uC(A2, e);
    if (t) {
      const r = document.createElement("style"), n = document.createTextNode(t);
      r.appendChild(n), A2.firstChild ? A2.insertBefore(r, A2.firstChild) : A2.appendChild(r);
    }
  }
  async function fC(A2, e = {}) {
    const { width: t, height: r } = nh(A2, e), n = await ua(A2, e, true);
    return await cC(n, e), await uh(n, e), sC(n, e), await Hm(n, t, r);
  }
  async function dC(A2, e = {}) {
    const { width: t, height: r } = nh(A2, e), n = await fC(A2, e), s = await Di(n), i = document.createElement("canvas"), l2 = i.getContext("2d"), a = e.pixelRatio || ym(), o = e.canvasWidth || t, c = e.canvasHeight || r;
    return i.width = o * a, i.height = c * a, e.skipAutoScale || Em(i), i.style.width = `${o}`, i.style.height = `${c}`, e.backgroundColor && (l2.fillStyle = e.backgroundColor, l2.fillRect(0, 0, i.width, i.height)), l2.drawImage(s, 0, 0, i.width, i.height), i;
  }
  async function BC(A2, e = {}) {
    return (await dC(A2, e)).toDataURL();
  }
  var wo = function(A2, e) {
    return wo = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
      t.__proto__ = r;
    } || function(t, r) {
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }, wo(A2, e);
  };
  function Ne(A2, e) {
    if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    wo(A2, e);
    function t() {
      this.constructor = A2;
    }
    A2.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
  }
  var po = function() {
    return po = Object.assign || function(e) {
      for (var t, r = 1, n = arguments.length; r < n; r++) {
        t = arguments[r];
        for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
      }
      return e;
    }, po.apply(this, arguments);
  };
  function GA(A2, e, t, r) {
    function n(s) {
      return s instanceof t ? s : new t(function(i) {
        i(s);
      });
    }
    return new (t || (t = Promise))(function(s, i) {
      function l2(c) {
        try {
          o(r.next(c));
        } catch (f) {
          i(f);
        }
      }
      function a(c) {
        try {
          o(r.throw(c));
        } catch (f) {
          i(f);
        }
      }
      function o(c) {
        c.done ? s(c.value) : n(c.value).then(l2, a);
      }
      o((r = r.apply(A2, [])).next());
    });
  }
  function jA(A2, e) {
    var t = { label: 0, sent: function() {
      if (s[0] & 1) throw s[1];
      return s[1];
    }, trys: [], ops: [] }, r, n, s, i;
    return i = { next: l2(0), throw: l2(1), return: l2(2) }, typeof Symbol == "function" && (i[Symbol.iterator] = function() {
      return this;
    }), i;
    function l2(o) {
      return function(c) {
        return a([o, c]);
      };
    }
    function a(o) {
      if (r) throw new TypeError("Generator is already executing.");
      for (; t; ) try {
        if (r = 1, n && (s = o[0] & 2 ? n.return : o[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, o[1])).done) return s;
        switch (n = 0, s && (o = [o[0] & 2, s.value]), o[0]) {
          case 0:
          case 1:
            s = o;
            break;
          case 4:
            return t.label++, { value: o[1], done: false };
          case 5:
            t.label++, n = o[1], o = [0];
            continue;
          case 7:
            o = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (o[0] === 6 || o[0] === 2)) {
              t = 0;
              continue;
            }
            if (o[0] === 3 && (!s || o[1] > s[0] && o[1] < s[3])) {
              t.label = o[1];
              break;
            }
            if (o[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = o;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(o);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        o = e.call(A2, t);
      } catch (c) {
        o = [6, c], n = 0;
      } finally {
        r = s = 0;
      }
      if (o[0] & 5) throw o[1];
      return { value: o[0] ? o[1] : void 0, done: true };
    }
  }
  function Fs(A2, e, t) {
    if (arguments.length === 2) for (var r = 0, n = e.length, s; r < n; r++) (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
    return A2.concat(s || e);
  }
  var tt = function() {
    function A2(e, t, r, n) {
      this.left = e, this.top = t, this.width = r, this.height = n;
    }
    return A2.prototype.add = function(e, t, r, n) {
      return new A2(this.left + e, this.top + t, this.width + r, this.height + n);
    }, A2.fromClientRect = function(e, t) {
      return new A2(t.left + e.windowBounds.left, t.top + e.windowBounds.top, t.width, t.height);
    }, A2.fromDOMRectList = function(e, t) {
      var r = Array.from(t).find(function(n) {
        return n.width !== 0;
      });
      return r ? new A2(r.left + e.windowBounds.left, r.top + e.windowBounds.top, r.width, r.height) : A2.EMPTY;
    }, A2.EMPTY = new A2(0, 0, 0, 0), A2;
  }();
  var ca = function(A2, e) {
    return tt.fromClientRect(A2, e.getBoundingClientRect());
  };
  var gC = function(A2) {
    var e = A2.body, t = A2.documentElement;
    if (!e || !t) throw new Error("Unable to get document size");
    var r = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth)), n = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight));
    return new tt(0, 0, r, n);
  };
  var fa = function(A2) {
    for (var e = [], t = 0, r = A2.length; t < r; ) {
      var n = A2.charCodeAt(t++);
      if (n >= 55296 && n <= 56319 && t < r) {
        var s = A2.charCodeAt(t++);
        (s & 64512) === 56320 ? e.push(((n & 1023) << 10) + (s & 1023) + 65536) : (e.push(n), t--);
      } else e.push(n);
    }
    return e;
  };
  var vA = function() {
    for (var A2 = [], e = 0; e < arguments.length; e++) A2[e] = arguments[e];
    if (String.fromCodePoint) return String.fromCodePoint.apply(String, A2);
    var t = A2.length;
    if (!t) return "";
    for (var r = [], n = -1, s = ""; ++n < t; ) {
      var i = A2[n];
      i <= 65535 ? r.push(i) : (i -= 65536, r.push((i >> 10) + 55296, i % 1024 + 56320)), (n + 1 === t || r.length > 16384) && (s += String.fromCharCode.apply(String, r), r.length = 0);
    }
    return s;
  };
  var yf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var hC = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
  for (xs = 0; xs < yf.length; xs++) hC[yf.charCodeAt(xs)] = xs;
  var xs;
  var Ef = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var on = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
  for (ys = 0; ys < Ef.length; ys++) on[Ef.charCodeAt(ys)] = ys;
  var ys;
  var wC = function(A2) {
    var e = A2.length * 0.75, t = A2.length, r, n = 0, s, i, l2, a;
    A2[A2.length - 1] === "=" && (e--, A2[A2.length - 2] === "=" && e--);
    var o = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), c = Array.isArray(o) ? o : new Uint8Array(o);
    for (r = 0; r < t; r += 4) s = on[A2.charCodeAt(r)], i = on[A2.charCodeAt(r + 1)], l2 = on[A2.charCodeAt(r + 2)], a = on[A2.charCodeAt(r + 3)], c[n++] = s << 2 | i >> 4, c[n++] = (i & 15) << 4 | l2 >> 2, c[n++] = (l2 & 3) << 6 | a & 63;
    return o;
  };
  var pC = function(A2) {
    for (var e = A2.length, t = [], r = 0; r < e; r += 2) t.push(A2[r + 1] << 8 | A2[r]);
    return t;
  };
  var mC = function(A2) {
    for (var e = A2.length, t = [], r = 0; r < e; r += 4) t.push(A2[r + 3] << 24 | A2[r + 2] << 16 | A2[r + 1] << 8 | A2[r]);
    return t;
  };
  var Xt = 5;
  var Ru = 11;
  var Ya = 2;
  var CC = Ru - Xt;
  var fh = 65536 >> Xt;
  var QC = 1 << Xt;
  var Za = QC - 1;
  var vC = 1024 >> Xt;
  var UC = fh + vC;
  var FC = UC;
  var xC = 32;
  var yC = FC + xC;
  var EC = 65536 >> Ru;
  var IC = 1 << CC;
  var HC = IC - 1;
  var If = function(A2, e, t) {
    return A2.slice ? A2.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A2, e, t));
  };
  var SC = function(A2, e, t) {
    return A2.slice ? A2.slice(e, t) : new Uint32Array(Array.prototype.slice.call(A2, e, t));
  };
  var bC = function(A2, e) {
    var t = wC(A2), r = Array.isArray(t) ? mC(t) : new Uint32Array(t), n = Array.isArray(t) ? pC(t) : new Uint16Array(t), s = 24, i = If(n, s / 2, r[4] / 2), l2 = r[5] === 2 ? If(n, (s + r[4]) / 2) : SC(r, Math.ceil((s + r[4]) / 4));
    return new LC(r[0], r[1], r[2], r[3], i, l2);
  };
  var LC = function() {
    function A2(e, t, r, n, s, i) {
      this.initialValue = e, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = s, this.data = i;
    }
    return A2.prototype.get = function(e) {
      var t;
      if (e >= 0) {
        if (e < 55296 || e > 56319 && e <= 65535) return t = this.index[e >> Xt], t = (t << Ya) + (e & Za), this.data[t];
        if (e <= 65535) return t = this.index[fh + (e - 55296 >> Xt)], t = (t << Ya) + (e & Za), this.data[t];
        if (e < this.highStart) return t = yC - EC + (e >> Ru), t = this.index[t], t += e >> Xt & HC, t = this.index[t], t = (t << Ya) + (e & Za), this.data[t];
        if (e <= 1114111) return this.data[this.highValueIndex];
      }
      return this.errorValue;
    }, A2;
  }();
  var Hf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var NC = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
  for (Es = 0; Es < Hf.length; Es++) NC[Hf.charCodeAt(Es)] = Es;
  var Es;
  var kC = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==";
  var Sf = 50;
  var TC = 1;
  var dh = 2;
  var Bh = 3;
  var KC = 4;
  var DC = 5;
  var bf = 7;
  var gh = 8;
  var Lf = 9;
  var gt = 10;
  var mo = 11;
  var Nf = 12;
  var Co = 13;
  var MC = 14;
  var un = 15;
  var Qo = 16;
  var Is = 17;
  var An = 18;
  var RC = 19;
  var kf = 20;
  var vo = 21;
  var en = 22;
  var $a = 23;
  var sr = 24;
  var se = 25;
  var cn = 26;
  var fn = 27;
  var ir = 28;
  var OC = 29;
  var Rt = 30;
  var jC = 31;
  var Hs = 32;
  var Ss = 33;
  var Uo = 34;
  var Fo = 35;
  var xo = 36;
  var zn = 37;
  var yo = 38;
  var ii = 39;
  var ai = 40;
  var qa = 41;
  var hh = 42;
  var PC = 43;
  var _C = [9001, 65288];
  var wh = "!";
  var z = "\xD7";
  var bs = "\xF7";
  var Eo = bC(kC);
  var Ve = [Rt, xo];
  var Io = [TC, dh, Bh, DC];
  var ph = [gt, gh];
  var Tf = [fn, cn];
  var VC = Io.concat(ph);
  var Kf = [yo, ii, ai, Uo, Fo];
  var GC = [un, Co];
  var XC = function(A2, e) {
    e === void 0 && (e = "strict");
    var t = [], r = [], n = [];
    return A2.forEach(function(s, i) {
      var l2 = Eo.get(s);
      if (l2 > Sf ? (n.push(true), l2 -= Sf) : n.push(false), ["normal", "auto", "loose"].indexOf(e) !== -1 && [8208, 8211, 12316, 12448].indexOf(s) !== -1) return r.push(i), t.push(Qo);
      if (l2 === KC || l2 === mo) {
        if (i === 0) return r.push(i), t.push(Rt);
        var a = t[i - 1];
        return VC.indexOf(a) === -1 ? (r.push(r[i - 1]), t.push(a)) : (r.push(i), t.push(Rt));
      }
      if (r.push(i), l2 === jC) return t.push(e === "strict" ? vo : zn);
      if (l2 === hh || l2 === OC) return t.push(Rt);
      if (l2 === PC) return s >= 131072 && s <= 196605 || s >= 196608 && s <= 262141 ? t.push(zn) : t.push(Rt);
      t.push(l2);
    }), [r, t, n];
  };
  var Al = function(A2, e, t, r) {
    var n = r[t];
    if (Array.isArray(A2) ? A2.indexOf(n) !== -1 : A2 === n) for (var s = t; s <= r.length; ) {
      s++;
      var i = r[s];
      if (i === e) return true;
      if (i !== gt) break;
    }
    if (n === gt) for (var s = t; s > 0; ) {
      s--;
      var l2 = r[s];
      if (Array.isArray(A2) ? A2.indexOf(l2) !== -1 : A2 === l2) for (var a = t; a <= r.length; ) {
        a++;
        var i = r[a];
        if (i === e) return true;
        if (i !== gt) break;
      }
      if (l2 !== gt) break;
    }
    return false;
  };
  var Df = function(A2, e) {
    for (var t = A2; t >= 0; ) {
      var r = e[t];
      if (r === gt) t--;
      else return r;
    }
    return 0;
  };
  var WC = function(A2, e, t, r, n) {
    if (t[r] === 0) return z;
    var s = r - 1;
    if (Array.isArray(n) && n[s] === true) return z;
    var i = s - 1, l2 = s + 1, a = e[s], o = i >= 0 ? e[i] : 0, c = e[l2];
    if (a === dh && c === Bh) return z;
    if (Io.indexOf(a) !== -1) return wh;
    if (Io.indexOf(c) !== -1 || ph.indexOf(c) !== -1) return z;
    if (Df(s, e) === gh) return bs;
    if (Eo.get(A2[s]) === mo || (a === Hs || a === Ss) && Eo.get(A2[l2]) === mo || a === bf || c === bf || a === Lf || [gt, Co, un].indexOf(a) === -1 && c === Lf || [Is, An, RC, sr, ir].indexOf(c) !== -1 || Df(s, e) === en || Al($a, en, s, e) || Al([Is, An], vo, s, e) || Al(Nf, Nf, s, e)) return z;
    if (a === gt) return bs;
    if (a === $a || c === $a) return z;
    if (c === Qo || a === Qo) return bs;
    if ([Co, un, vo].indexOf(c) !== -1 || a === MC || o === xo && GC.indexOf(a) !== -1 || a === ir && c === xo || c === kf || Ve.indexOf(c) !== -1 && a === se || Ve.indexOf(a) !== -1 && c === se || a === fn && [zn, Hs, Ss].indexOf(c) !== -1 || [zn, Hs, Ss].indexOf(a) !== -1 && c === cn || Ve.indexOf(a) !== -1 && Tf.indexOf(c) !== -1 || Tf.indexOf(a) !== -1 && Ve.indexOf(c) !== -1 || [fn, cn].indexOf(a) !== -1 && (c === se || [en, un].indexOf(c) !== -1 && e[l2 + 1] === se) || [en, un].indexOf(a) !== -1 && c === se || a === se && [se, ir, sr].indexOf(c) !== -1) return z;
    if ([se, ir, sr, Is, An].indexOf(c) !== -1) for (var f = s; f >= 0; ) {
      var d = e[f];
      if (d === se) return z;
      if ([ir, sr].indexOf(d) !== -1) f--;
      else break;
    }
    if ([fn, cn].indexOf(c) !== -1) for (var f = [Is, An].indexOf(a) !== -1 ? i : s; f >= 0; ) {
      var d = e[f];
      if (d === se) return z;
      if ([ir, sr].indexOf(d) !== -1) f--;
      else break;
    }
    if (yo === a && [yo, ii, Uo, Fo].indexOf(c) !== -1 || [ii, Uo].indexOf(a) !== -1 && [ii, ai].indexOf(c) !== -1 || [ai, Fo].indexOf(a) !== -1 && c === ai || Kf.indexOf(a) !== -1 && [kf, cn].indexOf(c) !== -1 || Kf.indexOf(c) !== -1 && a === fn || Ve.indexOf(a) !== -1 && Ve.indexOf(c) !== -1 || a === sr && Ve.indexOf(c) !== -1 || Ve.concat(se).indexOf(a) !== -1 && c === en && _C.indexOf(A2[l2]) === -1 || Ve.concat(se).indexOf(c) !== -1 && a === An) return z;
    if (a === qa && c === qa) {
      for (var m2 = t[s], w2 = 1; m2 > 0 && (m2--, e[m2] === qa); ) w2++;
      if (w2 % 2 !== 0) return z;
    }
    return a === Hs && c === Ss ? z : bs;
  };
  var zC = function(A2, e) {
    e || (e = { lineBreak: "normal", wordBreak: "normal" });
    var t = XC(A2, e.lineBreak), r = t[0], n = t[1], s = t[2];
    (e.wordBreak === "break-all" || e.wordBreak === "break-word") && (n = n.map(function(l2) {
      return [se, Rt, hh].indexOf(l2) !== -1 ? zn : l2;
    }));
    var i = e.wordBreak === "keep-all" ? s.map(function(l2, a) {
      return l2 && A2[a] >= 19968 && A2[a] <= 40959;
    }) : void 0;
    return [r, n, i];
  };
  var JC = function() {
    function A2(e, t, r, n) {
      this.codePoints = e, this.required = t === wh, this.start = r, this.end = n;
    }
    return A2.prototype.slice = function() {
      return vA.apply(void 0, this.codePoints.slice(this.start, this.end));
    }, A2;
  }();
  var YC = function(A2, e) {
    var t = fa(A2), r = zC(t, e), n = r[0], s = r[1], i = r[2], l2 = t.length, a = 0, o = 0;
    return { next: function() {
      if (o >= l2) return { done: true, value: null };
      for (var c = z; o < l2 && (c = WC(t, s, n, ++o, i)) === z; ) ;
      if (c !== z || o === l2) {
        var f = new JC(t, c, a, o);
        return a = o, { value: f, done: false };
      }
      return { done: true, value: null };
    } };
  };
  var ZC = 1;
  var $C = 2;
  var rs = 4;
  var Mf = 8;
  var Mi = 10;
  var Rf = 47;
  var yn = 92;
  var qC = 9;
  var AQ = 32;
  var Ls = 34;
  var tn = 61;
  var eQ = 35;
  var tQ = 36;
  var rQ = 37;
  var Ns = 39;
  var ks = 40;
  var rn = 41;
  var nQ = 95;
  var ZA = 45;
  var sQ = 33;
  var iQ = 60;
  var aQ = 62;
  var lQ = 64;
  var oQ = 91;
  var uQ = 93;
  var cQ = 61;
  var fQ = 123;
  var Ts = 63;
  var dQ = 125;
  var Of = 124;
  var BQ = 126;
  var gQ = 128;
  var jf = 65533;
  var el = 42;
  var _t = 43;
  var hQ = 44;
  var wQ = 58;
  var pQ = 59;
  var Jn = 46;
  var mQ = 0;
  var CQ = 8;
  var QQ = 11;
  var vQ = 14;
  var UQ = 31;
  var FQ = 127;
  var Ke = -1;
  var mh = 48;
  var Ch = 97;
  var Qh = 101;
  var xQ = 102;
  var yQ = 117;
  var EQ = 122;
  var vh = 65;
  var Uh = 69;
  var Fh = 70;
  var IQ = 85;
  var HQ = 90;
  var PA = function(A2) {
    return A2 >= mh && A2 <= 57;
  };
  var SQ = function(A2) {
    return A2 >= 55296 && A2 <= 57343;
  };
  var ar = function(A2) {
    return PA(A2) || A2 >= vh && A2 <= Fh || A2 >= Ch && A2 <= xQ;
  };
  var bQ = function(A2) {
    return A2 >= Ch && A2 <= EQ;
  };
  var LQ = function(A2) {
    return A2 >= vh && A2 <= HQ;
  };
  var NQ = function(A2) {
    return bQ(A2) || LQ(A2);
  };
  var kQ = function(A2) {
    return A2 >= gQ;
  };
  var Ks = function(A2) {
    return A2 === Mi || A2 === qC || A2 === AQ;
  };
  var Ri = function(A2) {
    return NQ(A2) || kQ(A2) || A2 === nQ;
  };
  var Pf = function(A2) {
    return Ri(A2) || PA(A2) || A2 === ZA;
  };
  var TQ = function(A2) {
    return A2 >= mQ && A2 <= CQ || A2 === QQ || A2 >= vQ && A2 <= UQ || A2 === FQ;
  };
  var ut = function(A2, e) {
    return A2 !== yn ? false : e !== Mi;
  };
  var Ds = function(A2, e, t) {
    return A2 === ZA ? Ri(e) || ut(e, t) : Ri(A2) ? true : !!(A2 === yn && ut(A2, e));
  };
  var tl = function(A2, e, t) {
    return A2 === _t || A2 === ZA ? PA(e) ? true : e === Jn && PA(t) : PA(A2 === Jn ? e : A2);
  };
  var KQ = function(A2) {
    var e = 0, t = 1;
    (A2[e] === _t || A2[e] === ZA) && (A2[e] === ZA && (t = -1), e++);
    for (var r = []; PA(A2[e]); ) r.push(A2[e++]);
    var n = r.length ? parseInt(vA.apply(void 0, r), 10) : 0;
    A2[e] === Jn && e++;
    for (var s = []; PA(A2[e]); ) s.push(A2[e++]);
    var i = s.length, l2 = i ? parseInt(vA.apply(void 0, s), 10) : 0;
    (A2[e] === Uh || A2[e] === Qh) && e++;
    var a = 1;
    (A2[e] === _t || A2[e] === ZA) && (A2[e] === ZA && (a = -1), e++);
    for (var o = []; PA(A2[e]); ) o.push(A2[e++]);
    var c = o.length ? parseInt(vA.apply(void 0, o), 10) : 0;
    return t * (n + l2 * Math.pow(10, -i)) * Math.pow(10, a * c);
  };
  var DQ = { type: 2 };
  var MQ = { type: 3 };
  var RQ = { type: 4 };
  var OQ = { type: 13 };
  var jQ = { type: 8 };
  var PQ = { type: 21 };
  var _Q = { type: 9 };
  var VQ = { type: 10 };
  var GQ = { type: 11 };
  var XQ = { type: 12 };
  var WQ = { type: 14 };
  var Ms = { type: 23 };
  var zQ = { type: 1 };
  var JQ = { type: 25 };
  var YQ = { type: 24 };
  var ZQ = { type: 26 };
  var $Q = { type: 27 };
  var qQ = { type: 28 };
  var Av = { type: 29 };
  var ev = { type: 31 };
  var Ho = { type: 32 };
  var xh = function() {
    function A2() {
      this._value = [];
    }
    return A2.prototype.write = function(e) {
      this._value = this._value.concat(fa(e));
    }, A2.prototype.read = function() {
      for (var e = [], t = this.consumeToken(); t !== Ho; ) e.push(t), t = this.consumeToken();
      return e;
    }, A2.prototype.consumeToken = function() {
      var e = this.consumeCodePoint();
      switch (e) {
        case Ls:
          return this.consumeStringToken(Ls);
        case eQ:
          var t = this.peekCodePoint(0), r = this.peekCodePoint(1), n = this.peekCodePoint(2);
          if (Pf(t) || ut(r, n)) {
            var s = Ds(t, r, n) ? $C : ZC, i = this.consumeName();
            return { type: 5, value: i, flags: s };
          }
          break;
        case tQ:
          if (this.peekCodePoint(0) === tn) return this.consumeCodePoint(), OQ;
          break;
        case Ns:
          return this.consumeStringToken(Ns);
        case ks:
          return DQ;
        case rn:
          return MQ;
        case el:
          if (this.peekCodePoint(0) === tn) return this.consumeCodePoint(), WQ;
          break;
        case _t:
          if (tl(e, this.peekCodePoint(0), this.peekCodePoint(1))) return this.reconsumeCodePoint(e), this.consumeNumericToken();
          break;
        case hQ:
          return RQ;
        case ZA:
          var l2 = e, a = this.peekCodePoint(0), o = this.peekCodePoint(1);
          if (tl(l2, a, o)) return this.reconsumeCodePoint(e), this.consumeNumericToken();
          if (Ds(l2, a, o)) return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
          if (a === ZA && o === aQ) return this.consumeCodePoint(), this.consumeCodePoint(), YQ;
          break;
        case Jn:
          if (tl(e, this.peekCodePoint(0), this.peekCodePoint(1))) return this.reconsumeCodePoint(e), this.consumeNumericToken();
          break;
        case Rf:
          if (this.peekCodePoint(0) === el) for (this.consumeCodePoint(); ; ) {
            var c = this.consumeCodePoint();
            if (c === el && (c = this.consumeCodePoint(), c === Rf)) return this.consumeToken();
            if (c === Ke) return this.consumeToken();
          }
          break;
        case wQ:
          return ZQ;
        case pQ:
          return $Q;
        case iQ:
          if (this.peekCodePoint(0) === sQ && this.peekCodePoint(1) === ZA && this.peekCodePoint(2) === ZA) return this.consumeCodePoint(), this.consumeCodePoint(), JQ;
          break;
        case lQ:
          var f = this.peekCodePoint(0), d = this.peekCodePoint(1), m2 = this.peekCodePoint(2);
          if (Ds(f, d, m2)) {
            var i = this.consumeName();
            return { type: 7, value: i };
          }
          break;
        case oQ:
          return qQ;
        case yn:
          if (ut(e, this.peekCodePoint(0))) return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
          break;
        case uQ:
          return Av;
        case cQ:
          if (this.peekCodePoint(0) === tn) return this.consumeCodePoint(), jQ;
          break;
        case fQ:
          return GQ;
        case dQ:
          return XQ;
        case yQ:
        case IQ:
          var w2 = this.peekCodePoint(0), C2 = this.peekCodePoint(1);
          return w2 === _t && (ar(C2) || C2 === Ts) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
        case Of:
          if (this.peekCodePoint(0) === tn) return this.consumeCodePoint(), _Q;
          if (this.peekCodePoint(0) === Of) return this.consumeCodePoint(), PQ;
          break;
        case BQ:
          if (this.peekCodePoint(0) === tn) return this.consumeCodePoint(), VQ;
          break;
        case Ke:
          return Ho;
      }
      return Ks(e) ? (this.consumeWhiteSpace(), ev) : PA(e) ? (this.reconsumeCodePoint(e), this.consumeNumericToken()) : Ri(e) ? (this.reconsumeCodePoint(e), this.consumeIdentLikeToken()) : { type: 6, value: vA(e) };
    }, A2.prototype.consumeCodePoint = function() {
      var e = this._value.shift();
      return typeof e > "u" ? -1 : e;
    }, A2.prototype.reconsumeCodePoint = function(e) {
      this._value.unshift(e);
    }, A2.prototype.peekCodePoint = function(e) {
      return e >= this._value.length ? -1 : this._value[e];
    }, A2.prototype.consumeUnicodeRangeToken = function() {
      for (var e = [], t = this.consumeCodePoint(); ar(t) && e.length < 6; ) e.push(t), t = this.consumeCodePoint();
      for (var r = false; t === Ts && e.length < 6; ) e.push(t), t = this.consumeCodePoint(), r = true;
      if (r) {
        var n = parseInt(vA.apply(void 0, e.map(function(a) {
          return a === Ts ? mh : a;
        })), 16), s = parseInt(vA.apply(void 0, e.map(function(a) {
          return a === Ts ? Fh : a;
        })), 16);
        return { type: 30, start: n, end: s };
      }
      var i = parseInt(vA.apply(void 0, e), 16);
      if (this.peekCodePoint(0) === ZA && ar(this.peekCodePoint(1))) {
        this.consumeCodePoint(), t = this.consumeCodePoint();
        for (var l2 = []; ar(t) && l2.length < 6; ) l2.push(t), t = this.consumeCodePoint();
        var s = parseInt(vA.apply(void 0, l2), 16);
        return { type: 30, start: i, end: s };
      } else return { type: 30, start: i, end: i };
    }, A2.prototype.consumeIdentLikeToken = function() {
      var e = this.consumeName();
      return e.toLowerCase() === "url" && this.peekCodePoint(0) === ks ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === ks ? (this.consumeCodePoint(), { type: 19, value: e }) : { type: 20, value: e };
    }, A2.prototype.consumeUrlToken = function() {
      var e = [];
      if (this.consumeWhiteSpace(), this.peekCodePoint(0) === Ke) return { type: 22, value: "" };
      var t = this.peekCodePoint(0);
      if (t === Ns || t === Ls) {
        var r = this.consumeStringToken(this.consumeCodePoint());
        return r.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === Ke || this.peekCodePoint(0) === rn) ? (this.consumeCodePoint(), { type: 22, value: r.value }) : (this.consumeBadUrlRemnants(), Ms);
      }
      for (; ; ) {
        var n = this.consumeCodePoint();
        if (n === Ke || n === rn) return { type: 22, value: vA.apply(void 0, e) };
        if (Ks(n)) return this.consumeWhiteSpace(), this.peekCodePoint(0) === Ke || this.peekCodePoint(0) === rn ? (this.consumeCodePoint(), { type: 22, value: vA.apply(void 0, e) }) : (this.consumeBadUrlRemnants(), Ms);
        if (n === Ls || n === Ns || n === ks || TQ(n)) return this.consumeBadUrlRemnants(), Ms;
        if (n === yn) if (ut(n, this.peekCodePoint(0))) e.push(this.consumeEscapedCodePoint());
        else return this.consumeBadUrlRemnants(), Ms;
        else e.push(n);
      }
    }, A2.prototype.consumeWhiteSpace = function() {
      for (; Ks(this.peekCodePoint(0)); ) this.consumeCodePoint();
    }, A2.prototype.consumeBadUrlRemnants = function() {
      for (; ; ) {
        var e = this.consumeCodePoint();
        if (e === rn || e === Ke) return;
        ut(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
      }
    }, A2.prototype.consumeStringSlice = function(e) {
      for (var t = 5e4, r = ""; e > 0; ) {
        var n = Math.min(t, e);
        r += vA.apply(void 0, this._value.splice(0, n)), e -= n;
      }
      return this._value.shift(), r;
    }, A2.prototype.consumeStringToken = function(e) {
      var t = "", r = 0;
      do {
        var n = this._value[r];
        if (n === Ke || n === void 0 || n === e) return t += this.consumeStringSlice(r), { type: 0, value: t };
        if (n === Mi) return this._value.splice(0, r), zQ;
        if (n === yn) {
          var s = this._value[r + 1];
          s !== Ke && s !== void 0 && (s === Mi ? (t += this.consumeStringSlice(r), r = -1, this._value.shift()) : ut(n, s) && (t += this.consumeStringSlice(r), t += vA(this.consumeEscapedCodePoint()), r = -1));
        }
        r++;
      } while (true);
    }, A2.prototype.consumeNumber = function() {
      var e = [], t = rs, r = this.peekCodePoint(0);
      for ((r === _t || r === ZA) && e.push(this.consumeCodePoint()); PA(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
      r = this.peekCodePoint(0);
      var n = this.peekCodePoint(1);
      if (r === Jn && PA(n)) for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), t = Mf; PA(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
      r = this.peekCodePoint(0), n = this.peekCodePoint(1);
      var s = this.peekCodePoint(2);
      if ((r === Uh || r === Qh) && ((n === _t || n === ZA) && PA(s) || PA(n))) for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), t = Mf; PA(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
      return [KQ(e), t];
    }, A2.prototype.consumeNumericToken = function() {
      var e = this.consumeNumber(), t = e[0], r = e[1], n = this.peekCodePoint(0), s = this.peekCodePoint(1), i = this.peekCodePoint(2);
      if (Ds(n, s, i)) {
        var l2 = this.consumeName();
        return { type: 15, number: t, flags: r, unit: l2 };
      }
      return n === rQ ? (this.consumeCodePoint(), { type: 16, number: t, flags: r }) : { type: 17, number: t, flags: r };
    }, A2.prototype.consumeEscapedCodePoint = function() {
      var e = this.consumeCodePoint();
      if (ar(e)) {
        for (var t = vA(e); ar(this.peekCodePoint(0)) && t.length < 6; ) t += vA(this.consumeCodePoint());
        Ks(this.peekCodePoint(0)) && this.consumeCodePoint();
        var r = parseInt(t, 16);
        return r === 0 || SQ(r) || r > 1114111 ? jf : r;
      }
      return e === Ke ? jf : e;
    }, A2.prototype.consumeName = function() {
      for (var e = ""; ; ) {
        var t = this.consumeCodePoint();
        if (Pf(t)) e += vA(t);
        else if (ut(t, this.peekCodePoint(0))) e += vA(this.consumeEscapedCodePoint());
        else return this.reconsumeCodePoint(t), e;
      }
    }, A2;
  }();
  var yh = function() {
    function A2(e) {
      this._tokens = e;
    }
    return A2.create = function(e) {
      var t = new xh();
      return t.write(e), new A2(t.read());
    }, A2.parseValue = function(e) {
      return A2.create(e).parseComponentValue();
    }, A2.parseValues = function(e) {
      return A2.create(e).parseComponentValues();
    }, A2.prototype.parseComponentValue = function() {
      for (var e = this.consumeToken(); e.type === 31; ) e = this.consumeToken();
      if (e.type === 32) throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
      this.reconsumeToken(e);
      var t = this.consumeComponentValue();
      do
        e = this.consumeToken();
      while (e.type === 31);
      if (e.type === 32) return t;
      throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
    }, A2.prototype.parseComponentValues = function() {
      for (var e = []; ; ) {
        var t = this.consumeComponentValue();
        if (t.type === 32) return e;
        e.push(t), e.push();
      }
    }, A2.prototype.consumeComponentValue = function() {
      var e = this.consumeToken();
      switch (e.type) {
        case 11:
        case 28:
        case 2:
          return this.consumeSimpleBlock(e.type);
        case 19:
          return this.consumeFunction(e);
      }
      return e;
    }, A2.prototype.consumeSimpleBlock = function(e) {
      for (var t = { type: e, values: [] }, r = this.consumeToken(); ; ) {
        if (r.type === 32 || rv(r, e)) return t;
        this.reconsumeToken(r), t.values.push(this.consumeComponentValue()), r = this.consumeToken();
      }
    }, A2.prototype.consumeFunction = function(e) {
      for (var t = { name: e.value, values: [], type: 18 }; ; ) {
        var r = this.consumeToken();
        if (r.type === 32 || r.type === 3) return t;
        this.reconsumeToken(r), t.values.push(this.consumeComponentValue());
      }
    }, A2.prototype.consumeToken = function() {
      var e = this._tokens.shift();
      return typeof e > "u" ? Ho : e;
    }, A2.prototype.reconsumeToken = function(e) {
      this._tokens.unshift(e);
    }, A2;
  }();
  var ns = function(A2) {
    return A2.type === 15;
  };
  var Gr = function(A2) {
    return A2.type === 17;
  };
  var nA = function(A2) {
    return A2.type === 20;
  };
  var tv = function(A2) {
    return A2.type === 0;
  };
  var So = function(A2, e) {
    return nA(A2) && A2.value === e;
  };
  var Eh = function(A2) {
    return A2.type !== 31;
  };
  var jr = function(A2) {
    return A2.type !== 31 && A2.type !== 4;
  };
  var je = function(A2) {
    var e = [], t = [];
    return A2.forEach(function(r) {
      if (r.type === 4) {
        if (t.length === 0) throw new Error("Error parsing function args, zero tokens for arg");
        e.push(t), t = [];
        return;
      }
      r.type !== 31 && t.push(r);
    }), t.length && e.push(t), e;
  };
  var rv = function(A2, e) {
    return e === 11 && A2.type === 12 || e === 28 && A2.type === 29 ? true : e === 2 && A2.type === 3;
  };
  var bt = function(A2) {
    return A2.type === 17 || A2.type === 15;
  };
  var xA = function(A2) {
    return A2.type === 16 || bt(A2);
  };
  var Ih = function(A2) {
    return A2.length > 1 ? [A2[0], A2[1]] : [A2[0]];
  };
  var KA = { type: 17, number: 0, flags: rs };
  var Ou = { type: 16, number: 50, flags: rs };
  var ht = { type: 16, number: 100, flags: rs };
  var dn = function(A2, e, t) {
    var r = A2[0], n = A2[1];
    return [aA(r, e), aA(typeof n < "u" ? n : r, t)];
  };
  var aA = function(A2, e) {
    if (A2.type === 16) return A2.number / 100 * e;
    if (ns(A2)) switch (A2.unit) {
      case "rem":
      case "em":
        return 16 * A2.number;
      case "px":
      default:
        return A2.number;
    }
    return A2.number;
  };
  var Hh = "deg";
  var Sh = "grad";
  var bh = "rad";
  var Lh = "turn";
  var da = { name: "angle", parse: function(A2, e) {
    if (e.type === 15) switch (e.unit) {
      case Hh:
        return Math.PI * e.number / 180;
      case Sh:
        return Math.PI / 200 * e.number;
      case bh:
        return e.number;
      case Lh:
        return Math.PI * 2 * e.number;
    }
    throw new Error("Unsupported angle type");
  } };
  var Nh = function(A2) {
    return A2.type === 15 && (A2.unit === Hh || A2.unit === Sh || A2.unit === bh || A2.unit === Lh);
  };
  var kh = function(A2) {
    var e = A2.filter(nA).map(function(t) {
      return t.value;
    }).join(" ");
    switch (e) {
      case "to bottom right":
      case "to right bottom":
      case "left top":
      case "top left":
        return [KA, KA];
      case "to top":
      case "bottom":
        return we(0);
      case "to bottom left":
      case "to left bottom":
      case "right top":
      case "top right":
        return [KA, ht];
      case "to right":
      case "left":
        return we(90);
      case "to top left":
      case "to left top":
      case "right bottom":
      case "bottom right":
        return [ht, ht];
      case "to bottom":
      case "top":
        return we(180);
      case "to top right":
      case "to right top":
      case "left bottom":
      case "bottom left":
        return [ht, KA];
      case "to left":
      case "right":
        return we(270);
    }
    return 0;
  };
  var we = function(A2) {
    return Math.PI * A2 / 180;
  };
  var Et = { name: "color", parse: function(A2, e) {
    if (e.type === 18) {
      var t = nv[e.name];
      if (typeof t > "u") throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
      return t(A2, e.values);
    }
    if (e.type === 5) {
      if (e.value.length === 3) {
        var r = e.value.substring(0, 1), n = e.value.substring(1, 2), s = e.value.substring(2, 3);
        return wt(parseInt(r + r, 16), parseInt(n + n, 16), parseInt(s + s, 16), 1);
      }
      if (e.value.length === 4) {
        var r = e.value.substring(0, 1), n = e.value.substring(1, 2), s = e.value.substring(2, 3), i = e.value.substring(3, 4);
        return wt(parseInt(r + r, 16), parseInt(n + n, 16), parseInt(s + s, 16), parseInt(i + i, 16) / 255);
      }
      if (e.value.length === 6) {
        var r = e.value.substring(0, 2), n = e.value.substring(2, 4), s = e.value.substring(4, 6);
        return wt(parseInt(r, 16), parseInt(n, 16), parseInt(s, 16), 1);
      }
      if (e.value.length === 8) {
        var r = e.value.substring(0, 2), n = e.value.substring(2, 4), s = e.value.substring(4, 6), i = e.value.substring(6, 8);
        return wt(parseInt(r, 16), parseInt(n, 16), parseInt(s, 16), parseInt(i, 16) / 255);
      }
    }
    if (e.type === 20) {
      var l2 = Ze[e.value.toUpperCase()];
      if (typeof l2 < "u") return l2;
    }
    return Ze.TRANSPARENT;
  } };
  var It = function(A2) {
    return (255 & A2) === 0;
  };
  var bA = function(A2) {
    var e = 255 & A2, t = 255 & A2 >> 8, r = 255 & A2 >> 16, n = 255 & A2 >> 24;
    return e < 255 ? "rgba(" + n + "," + r + "," + t + "," + e / 255 + ")" : "rgb(" + n + "," + r + "," + t + ")";
  };
  var wt = function(A2, e, t, r) {
    return (A2 << 24 | e << 16 | t << 8 | Math.round(r * 255) << 0) >>> 0;
  };
  var _f = function(A2, e) {
    if (A2.type === 17) return A2.number;
    if (A2.type === 16) {
      var t = e === 3 ? 1 : 255;
      return e === 3 ? A2.number / 100 * t : Math.round(A2.number / 100 * t);
    }
    return 0;
  };
  var Vf = function(A2, e) {
    var t = e.filter(jr);
    if (t.length === 3) {
      var r = t.map(_f), n = r[0], s = r[1], i = r[2];
      return wt(n, s, i, 1);
    }
    if (t.length === 4) {
      var l2 = t.map(_f), n = l2[0], s = l2[1], i = l2[2], a = l2[3];
      return wt(n, s, i, a);
    }
    return 0;
  };
  function rl(A2, e, t) {
    return t < 0 && (t += 1), t >= 1 && (t -= 1), t < 1 / 6 ? (e - A2) * t * 6 + A2 : t < 1 / 2 ? e : t < 2 / 3 ? (e - A2) * 6 * (2 / 3 - t) + A2 : A2;
  }
  var Gf = function(A2, e) {
    var t = e.filter(jr), r = t[0], n = t[1], s = t[2], i = t[3], l2 = (r.type === 17 ? we(r.number) : da.parse(A2, r)) / (Math.PI * 2), a = xA(n) ? n.number / 100 : 0, o = xA(s) ? s.number / 100 : 0, c = typeof i < "u" && xA(i) ? aA(i, 1) : 1;
    if (a === 0) return wt(o * 255, o * 255, o * 255, 1);
    var f = o <= 0.5 ? o * (a + 1) : o + a - o * a, d = o * 2 - f, m2 = rl(d, f, l2 + 1 / 3), w2 = rl(d, f, l2), C2 = rl(d, f, l2 - 1 / 3);
    return wt(m2 * 255, w2 * 255, C2 * 255, c);
  };
  var nv = { hsl: Gf, hsla: Gf, rgb: Vf, rgba: Vf };
  var En = function(A2, e) {
    return Et.parse(A2, yh.create(e).parseComponentValue());
  };
  var Ze = { ALICEBLUE: 4042850303, ANTIQUEWHITE: 4209760255, AQUA: 16777215, AQUAMARINE: 2147472639, AZURE: 4043309055, BEIGE: 4126530815, BISQUE: 4293182719, BLACK: 255, BLANCHEDALMOND: 4293643775, BLUE: 65535, BLUEVIOLET: 2318131967, BROWN: 2771004159, BURLYWOOD: 3736635391, CADETBLUE: 1604231423, CHARTREUSE: 2147418367, CHOCOLATE: 3530104575, CORAL: 4286533887, CORNFLOWERBLUE: 1687547391, CORNSILK: 4294499583, CRIMSON: 3692313855, CYAN: 16777215, DARKBLUE: 35839, DARKCYAN: 9145343, DARKGOLDENROD: 3095837695, DARKGRAY: 2846468607, DARKGREEN: 6553855, DARKGREY: 2846468607, DARKKHAKI: 3182914559, DARKMAGENTA: 2332068863, DARKOLIVEGREEN: 1433087999, DARKORANGE: 4287365375, DARKORCHID: 2570243327, DARKRED: 2332033279, DARKSALMON: 3918953215, DARKSEAGREEN: 2411499519, DARKSLATEBLUE: 1211993087, DARKSLATEGRAY: 793726975, DARKSLATEGREY: 793726975, DARKTURQUOISE: 13554175, DARKVIOLET: 2483082239, DEEPPINK: 4279538687, DEEPSKYBLUE: 12582911, DIMGRAY: 1768516095, DIMGREY: 1768516095, DODGERBLUE: 512819199, FIREBRICK: 2988581631, FLORALWHITE: 4294635775, FORESTGREEN: 579543807, FUCHSIA: 4278255615, GAINSBORO: 3705462015, GHOSTWHITE: 4177068031, GOLD: 4292280575, GOLDENROD: 3668254975, GRAY: 2155905279, GREEN: 8388863, GREENYELLOW: 2919182335, GREY: 2155905279, HONEYDEW: 4043305215, HOTPINK: 4285117695, INDIANRED: 3445382399, INDIGO: 1258324735, IVORY: 4294963455, KHAKI: 4041641215, LAVENDER: 3873897215, LAVENDERBLUSH: 4293981695, LAWNGREEN: 2096890111, LEMONCHIFFON: 4294626815, LIGHTBLUE: 2916673279, LIGHTCORAL: 4034953471, LIGHTCYAN: 3774873599, LIGHTGOLDENRODYELLOW: 4210742015, LIGHTGRAY: 3553874943, LIGHTGREEN: 2431553791, LIGHTGREY: 3553874943, LIGHTPINK: 4290167295, LIGHTSALMON: 4288707327, LIGHTSEAGREEN: 548580095, LIGHTSKYBLUE: 2278488831, LIGHTSLATEGRAY: 2005441023, LIGHTSLATEGREY: 2005441023, LIGHTSTEELBLUE: 2965692159, LIGHTYELLOW: 4294959359, LIME: 16711935, LIMEGREEN: 852308735, LINEN: 4210091775, MAGENTA: 4278255615, MAROON: 2147483903, MEDIUMAQUAMARINE: 1724754687, MEDIUMBLUE: 52735, MEDIUMORCHID: 3126187007, MEDIUMPURPLE: 2473647103, MEDIUMSEAGREEN: 1018393087, MEDIUMSLATEBLUE: 2070474495, MEDIUMSPRINGGREEN: 16423679, MEDIUMTURQUOISE: 1221709055, MEDIUMVIOLETRED: 3340076543, MIDNIGHTBLUE: 421097727, MINTCREAM: 4127193855, MISTYROSE: 4293190143, MOCCASIN: 4293178879, NAVAJOWHITE: 4292783615, NAVY: 33023, OLDLACE: 4260751103, OLIVE: 2155872511, OLIVEDRAB: 1804477439, ORANGE: 4289003775, ORANGERED: 4282712319, ORCHID: 3664828159, PALEGOLDENROD: 4008225535, PALEGREEN: 2566625535, PALETURQUOISE: 2951671551, PALEVIOLETRED: 3681588223, PAPAYAWHIP: 4293907967, PEACHPUFF: 4292524543, PERU: 3448061951, PINK: 4290825215, PLUM: 3718307327, POWDERBLUE: 2967529215, PURPLE: 2147516671, REBECCAPURPLE: 1714657791, RED: 4278190335, ROSYBROWN: 3163525119, ROYALBLUE: 1097458175, SADDLEBROWN: 2336560127, SALMON: 4202722047, SANDYBROWN: 4104413439, SEAGREEN: 780883967, SEASHELL: 4294307583, SIENNA: 2689740287, SILVER: 3233857791, SKYBLUE: 2278484991, SLATEBLUE: 1784335871, SLATEGRAY: 1887473919, SLATEGREY: 1887473919, SNOW: 4294638335, SPRINGGREEN: 16744447, STEELBLUE: 1182971135, TAN: 3535047935, TEAL: 8421631, THISTLE: 3636451583, TOMATO: 4284696575, TRANSPARENT: 0, TURQUOISE: 1088475391, VIOLET: 4001558271, WHEAT: 4125012991, WHITE: 4294967295, WHITESMOKE: 4126537215, YELLOW: 4294902015, YELLOWGREEN: 2597139199 };
  var sv = { name: "background-clip", initialValue: "border-box", prefix: false, type: 1, parse: function(A2, e) {
    return e.map(function(t) {
      if (nA(t)) switch (t.value) {
        case "padding-box":
          return 1;
        case "content-box":
          return 2;
      }
      return 0;
    });
  } };
  var iv = { name: "background-color", initialValue: "transparent", prefix: false, type: 3, format: "color" };
  var Ba = function(A2, e) {
    var t = Et.parse(A2, e[0]), r = e[1];
    return r && xA(r) ? { color: t, stop: r } : { color: t, stop: null };
  };
  var Xf = function(A2, e) {
    var t = A2[0], r = A2[A2.length - 1];
    t.stop === null && (t.stop = KA), r.stop === null && (r.stop = ht);
    for (var n = [], s = 0, i = 0; i < A2.length; i++) {
      var l2 = A2[i].stop;
      if (l2 !== null) {
        var a = aA(l2, e);
        a > s ? n.push(a) : n.push(s), s = a;
      } else n.push(null);
    }
    for (var o = null, i = 0; i < n.length; i++) {
      var c = n[i];
      if (c === null) o === null && (o = i);
      else if (o !== null) {
        for (var f = i - o, d = n[o - 1], m2 = (c - d) / (f + 1), w2 = 1; w2 <= f; w2++) n[o + w2 - 1] = m2 * w2;
        o = null;
      }
    }
    return A2.map(function(C2, U) {
      var h = C2.color;
      return { color: h, stop: Math.max(Math.min(1, n[U] / e), 0) };
    });
  };
  var av = function(A2, e, t) {
    var r = e / 2, n = t / 2, s = aA(A2[0], e) - r, i = n - aA(A2[1], t);
    return (Math.atan2(i, s) + Math.PI * 2) % (Math.PI * 2);
  };
  var lv = function(A2, e, t) {
    var r = typeof A2 == "number" ? A2 : av(A2, e, t), n = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)), s = e / 2, i = t / 2, l2 = n / 2, a = Math.sin(r - Math.PI / 2) * l2, o = Math.cos(r - Math.PI / 2) * l2;
    return [n, s - o, s + o, i - a, i + a];
  };
  var ye = function(A2, e) {
    return Math.sqrt(A2 * A2 + e * e);
  };
  var Wf = function(A2, e, t, r, n) {
    var s = [[0, 0], [0, e], [A2, 0], [A2, e]];
    return s.reduce(function(i, l2) {
      var a = l2[0], o = l2[1], c = ye(t - a, r - o);
      return (n ? c < i.optimumDistance : c > i.optimumDistance) ? { optimumCorner: l2, optimumDistance: c } : i;
    }, { optimumDistance: n ? 1 / 0 : -1 / 0, optimumCorner: null }).optimumCorner;
  };
  var ov = function(A2, e, t, r, n) {
    var s = 0, i = 0;
    switch (A2.size) {
      case 0:
        A2.shape === 0 ? s = i = Math.min(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - n)) : A2.shape === 1 && (s = Math.min(Math.abs(e), Math.abs(e - r)), i = Math.min(Math.abs(t), Math.abs(t - n)));
        break;
      case 2:
        if (A2.shape === 0) s = i = Math.min(ye(e, t), ye(e, t - n), ye(e - r, t), ye(e - r, t - n));
        else if (A2.shape === 1) {
          var l2 = Math.min(Math.abs(t), Math.abs(t - n)) / Math.min(Math.abs(e), Math.abs(e - r)), a = Wf(r, n, e, t, true), o = a[0], c = a[1];
          s = ye(o - e, (c - t) / l2), i = l2 * s;
        }
        break;
      case 1:
        A2.shape === 0 ? s = i = Math.max(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - n)) : A2.shape === 1 && (s = Math.max(Math.abs(e), Math.abs(e - r)), i = Math.max(Math.abs(t), Math.abs(t - n)));
        break;
      case 3:
        if (A2.shape === 0) s = i = Math.max(ye(e, t), ye(e, t - n), ye(e - r, t), ye(e - r, t - n));
        else if (A2.shape === 1) {
          var l2 = Math.max(Math.abs(t), Math.abs(t - n)) / Math.max(Math.abs(e), Math.abs(e - r)), f = Wf(r, n, e, t, false), o = f[0], c = f[1];
          s = ye(o - e, (c - t) / l2), i = l2 * s;
        }
        break;
    }
    return Array.isArray(A2.size) && (s = aA(A2.size[0], r), i = A2.size.length === 2 ? aA(A2.size[1], n) : s), [s, i];
  };
  var uv = function(A2, e) {
    var t = we(180), r = [];
    return je(e).forEach(function(n, s) {
      if (s === 0) {
        var i = n[0];
        if (i.type === 20 && i.value === "to") {
          t = kh(n);
          return;
        } else if (Nh(i)) {
          t = da.parse(A2, i);
          return;
        }
      }
      var l2 = Ba(A2, n);
      r.push(l2);
    }), { angle: t, stops: r, type: 1 };
  };
  var Rs = function(A2, e) {
    var t = we(180), r = [];
    return je(e).forEach(function(n, s) {
      if (s === 0) {
        var i = n[0];
        if (i.type === 20 && ["top", "left", "right", "bottom"].indexOf(i.value) !== -1) {
          t = kh(n);
          return;
        } else if (Nh(i)) {
          t = (da.parse(A2, i) + we(270)) % we(360);
          return;
        }
      }
      var l2 = Ba(A2, n);
      r.push(l2);
    }), { angle: t, stops: r, type: 1 };
  };
  var cv = function(A2, e) {
    var t = we(180), r = [], n = 1, s = 0, i = 3, l2 = [];
    return je(e).forEach(function(a, o) {
      var c = a[0];
      if (o === 0) {
        if (nA(c) && c.value === "linear") {
          n = 1;
          return;
        } else if (nA(c) && c.value === "radial") {
          n = 2;
          return;
        }
      }
      if (c.type === 18) {
        if (c.name === "from") {
          var f = Et.parse(A2, c.values[0]);
          r.push({ stop: KA, color: f });
        } else if (c.name === "to") {
          var f = Et.parse(A2, c.values[0]);
          r.push({ stop: ht, color: f });
        } else if (c.name === "color-stop") {
          var d = c.values.filter(jr);
          if (d.length === 2) {
            var f = Et.parse(A2, d[1]), m2 = d[0];
            Gr(m2) && r.push({ stop: { type: 16, number: m2.number * 100, flags: m2.flags }, color: f });
          }
        }
      }
    }), n === 1 ? { angle: (t + we(180)) % we(360), stops: r, type: n } : { size: i, shape: s, stops: r, position: l2, type: n };
  };
  var Th = "closest-side";
  var Kh = "farthest-side";
  var Dh = "closest-corner";
  var Mh = "farthest-corner";
  var Rh = "circle";
  var Oh = "ellipse";
  var jh = "cover";
  var Ph = "contain";
  var fv = function(A2, e) {
    var t = 0, r = 3, n = [], s = [];
    return je(e).forEach(function(i, l2) {
      var a = true;
      if (l2 === 0) {
        var o = false;
        a = i.reduce(function(f, d) {
          if (o) if (nA(d)) switch (d.value) {
            case "center":
              return s.push(Ou), f;
            case "top":
            case "left":
              return s.push(KA), f;
            case "right":
            case "bottom":
              return s.push(ht), f;
          }
          else (xA(d) || bt(d)) && s.push(d);
          else if (nA(d)) switch (d.value) {
            case Rh:
              return t = 0, false;
            case Oh:
              return t = 1, false;
            case "at":
              return o = true, false;
            case Th:
              return r = 0, false;
            case jh:
            case Kh:
              return r = 1, false;
            case Ph:
            case Dh:
              return r = 2, false;
            case Mh:
              return r = 3, false;
          }
          else if (bt(d) || xA(d)) return Array.isArray(r) || (r = []), r.push(d), false;
          return f;
        }, a);
      }
      if (a) {
        var c = Ba(A2, i);
        n.push(c);
      }
    }), { size: r, shape: t, stops: n, position: s, type: 2 };
  };
  var Os = function(A2, e) {
    var t = 0, r = 3, n = [], s = [];
    return je(e).forEach(function(i, l2) {
      var a = true;
      if (l2 === 0 ? a = i.reduce(function(c, f) {
        if (nA(f)) switch (f.value) {
          case "center":
            return s.push(Ou), false;
          case "top":
          case "left":
            return s.push(KA), false;
          case "right":
          case "bottom":
            return s.push(ht), false;
        }
        else if (xA(f) || bt(f)) return s.push(f), false;
        return c;
      }, a) : l2 === 1 && (a = i.reduce(function(c, f) {
        if (nA(f)) switch (f.value) {
          case Rh:
            return t = 0, false;
          case Oh:
            return t = 1, false;
          case Ph:
          case Th:
            return r = 0, false;
          case Kh:
            return r = 1, false;
          case Dh:
            return r = 2, false;
          case jh:
          case Mh:
            return r = 3, false;
        }
        else if (bt(f) || xA(f)) return Array.isArray(r) || (r = []), r.push(f), false;
        return c;
      }, a)), a) {
        var o = Ba(A2, i);
        n.push(o);
      }
    }), { size: r, shape: t, stops: n, position: s, type: 2 };
  };
  var dv = function(A2) {
    return A2.type === 1;
  };
  var Bv = function(A2) {
    return A2.type === 2;
  };
  var ju = { name: "image", parse: function(A2, e) {
    if (e.type === 22) {
      var t = { url: e.value, type: 0 };
      return A2.cache.addImage(e.value), t;
    }
    if (e.type === 18) {
      var r = _h[e.name];
      if (typeof r > "u") throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
      return r(A2, e.values);
    }
    throw new Error("Unsupported image type " + e.type);
  } };
  function gv(A2) {
    return !(A2.type === 20 && A2.value === "none") && (A2.type !== 18 || !!_h[A2.name]);
  }
  var _h = { "linear-gradient": uv, "-moz-linear-gradient": Rs, "-ms-linear-gradient": Rs, "-o-linear-gradient": Rs, "-webkit-linear-gradient": Rs, "radial-gradient": fv, "-moz-radial-gradient": Os, "-ms-radial-gradient": Os, "-o-radial-gradient": Os, "-webkit-radial-gradient": Os, "-webkit-gradient": cv };
  var hv = { name: "background-image", initialValue: "none", type: 1, prefix: false, parse: function(A2, e) {
    if (e.length === 0) return [];
    var t = e[0];
    return t.type === 20 && t.value === "none" ? [] : e.filter(function(r) {
      return jr(r) && gv(r);
    }).map(function(r) {
      return ju.parse(A2, r);
    });
  } };
  var wv = { name: "background-origin", initialValue: "border-box", prefix: false, type: 1, parse: function(A2, e) {
    return e.map(function(t) {
      if (nA(t)) switch (t.value) {
        case "padding-box":
          return 1;
        case "content-box":
          return 2;
      }
      return 0;
    });
  } };
  var pv = { name: "background-position", initialValue: "0% 0%", type: 1, prefix: false, parse: function(A2, e) {
    return je(e).map(function(t) {
      return t.filter(xA);
    }).map(Ih);
  } };
  var mv = { name: "background-repeat", initialValue: "repeat", prefix: false, type: 1, parse: function(A2, e) {
    return je(e).map(function(t) {
      return t.filter(nA).map(function(r) {
        return r.value;
      }).join(" ");
    }).map(Cv);
  } };
  var Cv = function(A2) {
    switch (A2) {
      case "no-repeat":
        return 1;
      case "repeat-x":
      case "repeat no-repeat":
        return 2;
      case "repeat-y":
      case "no-repeat repeat":
        return 3;
      case "repeat":
      default:
        return 0;
    }
  };
  var Nr;
  (function(A2) {
    A2.AUTO = "auto", A2.CONTAIN = "contain", A2.COVER = "cover";
  })(Nr || (Nr = {}));
  var Qv = { name: "background-size", initialValue: "0", prefix: false, type: 1, parse: function(A2, e) {
    return je(e).map(function(t) {
      return t.filter(vv);
    });
  } };
  var vv = function(A2) {
    return nA(A2) || xA(A2);
  };
  var ga = function(A2) {
    return { name: "border-" + A2 + "-color", initialValue: "transparent", prefix: false, type: 3, format: "color" };
  };
  var Uv = ga("top");
  var Fv = ga("right");
  var xv = ga("bottom");
  var yv = ga("left");
  var ha = function(A2) {
    return { name: "border-radius-" + A2, initialValue: "0 0", prefix: false, type: 1, parse: function(e, t) {
      return Ih(t.filter(xA));
    } };
  };
  var Ev = ha("top-left");
  var Iv = ha("top-right");
  var Hv = ha("bottom-right");
  var Sv = ha("bottom-left");
  var wa = function(A2) {
    return { name: "border-" + A2 + "-style", initialValue: "solid", prefix: false, type: 2, parse: function(e, t) {
      switch (t) {
        case "none":
          return 0;
        case "dashed":
          return 2;
        case "dotted":
          return 3;
        case "double":
          return 4;
      }
      return 1;
    } };
  };
  var bv = wa("top");
  var Lv = wa("right");
  var Nv = wa("bottom");
  var kv = wa("left");
  var pa = function(A2) {
    return { name: "border-" + A2 + "-width", initialValue: "0", type: 0, prefix: false, parse: function(e, t) {
      return ns(t) ? t.number : 0;
    } };
  };
  var Tv = pa("top");
  var Kv = pa("right");
  var Dv = pa("bottom");
  var Mv = pa("left");
  var Rv = { name: "color", initialValue: "transparent", prefix: false, type: 3, format: "color" };
  var Ov = { name: "direction", initialValue: "ltr", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "rtl":
        return 1;
      case "ltr":
      default:
        return 0;
    }
  } };
  var jv = { name: "display", initialValue: "inline-block", prefix: false, type: 1, parse: function(A2, e) {
    return e.filter(nA).reduce(function(t, r) {
      return t | Pv(r.value);
    }, 0);
  } };
  var Pv = function(A2) {
    switch (A2) {
      case "block":
      case "-webkit-box":
        return 2;
      case "inline":
        return 4;
      case "run-in":
        return 8;
      case "flow":
        return 16;
      case "flow-root":
        return 32;
      case "table":
        return 64;
      case "flex":
      case "-webkit-flex":
        return 128;
      case "grid":
      case "-ms-grid":
        return 256;
      case "ruby":
        return 512;
      case "subgrid":
        return 1024;
      case "list-item":
        return 2048;
      case "table-row-group":
        return 4096;
      case "table-header-group":
        return 8192;
      case "table-footer-group":
        return 16384;
      case "table-row":
        return 32768;
      case "table-cell":
        return 65536;
      case "table-column-group":
        return 131072;
      case "table-column":
        return 262144;
      case "table-caption":
        return 524288;
      case "ruby-base":
        return 1048576;
      case "ruby-text":
        return 2097152;
      case "ruby-base-container":
        return 4194304;
      case "ruby-text-container":
        return 8388608;
      case "contents":
        return 16777216;
      case "inline-block":
        return 33554432;
      case "inline-list-item":
        return 67108864;
      case "inline-table":
        return 134217728;
      case "inline-flex":
        return 268435456;
      case "inline-grid":
        return 536870912;
    }
    return 0;
  };
  var _v = { name: "float", initialValue: "none", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "left":
        return 1;
      case "right":
        return 2;
      case "inline-start":
        return 3;
      case "inline-end":
        return 4;
    }
    return 0;
  } };
  var Vv = { name: "letter-spacing", initialValue: "0", prefix: false, type: 0, parse: function(A2, e) {
    return e.type === 20 && e.value === "normal" ? 0 : e.type === 17 || e.type === 15 ? e.number : 0;
  } };
  var Oi;
  (function(A2) {
    A2.NORMAL = "normal", A2.STRICT = "strict";
  })(Oi || (Oi = {}));
  var Gv = { name: "line-break", initialValue: "normal", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "strict":
        return Oi.STRICT;
      case "normal":
      default:
        return Oi.NORMAL;
    }
  } };
  var Xv = { name: "line-height", initialValue: "normal", prefix: false, type: 4 };
  var zf = function(A2, e) {
    return nA(A2) && A2.value === "normal" ? 1.2 * e : A2.type === 17 ? e * A2.number : xA(A2) ? aA(A2, e) : e;
  };
  var Wv = { name: "list-style-image", initialValue: "none", type: 0, prefix: false, parse: function(A2, e) {
    return e.type === 20 && e.value === "none" ? null : ju.parse(A2, e);
  } };
  var zv = { name: "list-style-position", initialValue: "outside", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "inside":
        return 0;
      case "outside":
      default:
        return 1;
    }
  } };
  var bo = { name: "list-style-type", initialValue: "none", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "disc":
        return 0;
      case "circle":
        return 1;
      case "square":
        return 2;
      case "decimal":
        return 3;
      case "cjk-decimal":
        return 4;
      case "decimal-leading-zero":
        return 5;
      case "lower-roman":
        return 6;
      case "upper-roman":
        return 7;
      case "lower-greek":
        return 8;
      case "lower-alpha":
        return 9;
      case "upper-alpha":
        return 10;
      case "arabic-indic":
        return 11;
      case "armenian":
        return 12;
      case "bengali":
        return 13;
      case "cambodian":
        return 14;
      case "cjk-earthly-branch":
        return 15;
      case "cjk-heavenly-stem":
        return 16;
      case "cjk-ideographic":
        return 17;
      case "devanagari":
        return 18;
      case "ethiopic-numeric":
        return 19;
      case "georgian":
        return 20;
      case "gujarati":
        return 21;
      case "gurmukhi":
        return 22;
      case "hebrew":
        return 22;
      case "hiragana":
        return 23;
      case "hiragana-iroha":
        return 24;
      case "japanese-formal":
        return 25;
      case "japanese-informal":
        return 26;
      case "kannada":
        return 27;
      case "katakana":
        return 28;
      case "katakana-iroha":
        return 29;
      case "khmer":
        return 30;
      case "korean-hangul-formal":
        return 31;
      case "korean-hanja-formal":
        return 32;
      case "korean-hanja-informal":
        return 33;
      case "lao":
        return 34;
      case "lower-armenian":
        return 35;
      case "malayalam":
        return 36;
      case "mongolian":
        return 37;
      case "myanmar":
        return 38;
      case "oriya":
        return 39;
      case "persian":
        return 40;
      case "simp-chinese-formal":
        return 41;
      case "simp-chinese-informal":
        return 42;
      case "tamil":
        return 43;
      case "telugu":
        return 44;
      case "thai":
        return 45;
      case "tibetan":
        return 46;
      case "trad-chinese-formal":
        return 47;
      case "trad-chinese-informal":
        return 48;
      case "upper-armenian":
        return 49;
      case "disclosure-open":
        return 50;
      case "disclosure-closed":
        return 51;
      case "none":
      default:
        return -1;
    }
  } };
  var ma = function(A2) {
    return { name: "margin-" + A2, initialValue: "0", prefix: false, type: 4 };
  };
  var Jv = ma("top");
  var Yv = ma("right");
  var Zv = ma("bottom");
  var $v = ma("left");
  var qv = { name: "overflow", initialValue: "visible", prefix: false, type: 1, parse: function(A2, e) {
    return e.filter(nA).map(function(t) {
      switch (t.value) {
        case "hidden":
          return 1;
        case "scroll":
          return 2;
        case "clip":
          return 3;
        case "auto":
          return 4;
        case "visible":
        default:
          return 0;
      }
    });
  } };
  var AU = { name: "overflow-wrap", initialValue: "normal", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "break-word":
        return "break-word";
      case "normal":
      default:
        return "normal";
    }
  } };
  var Ca = function(A2) {
    return { name: "padding-" + A2, initialValue: "0", prefix: false, type: 3, format: "length-percentage" };
  };
  var eU = Ca("top");
  var tU = Ca("right");
  var rU = Ca("bottom");
  var nU = Ca("left");
  var sU = { name: "text-align", initialValue: "left", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "right":
        return 2;
      case "center":
      case "justify":
        return 1;
      case "left":
      default:
        return 0;
    }
  } };
  var iU = { name: "position", initialValue: "static", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "relative":
        return 1;
      case "absolute":
        return 2;
      case "fixed":
        return 3;
      case "sticky":
        return 4;
    }
    return 0;
  } };
  var aU = { name: "text-shadow", initialValue: "none", type: 1, prefix: false, parse: function(A2, e) {
    return e.length === 1 && So(e[0], "none") ? [] : je(e).map(function(t) {
      for (var r = { color: Ze.TRANSPARENT, offsetX: KA, offsetY: KA, blur: KA }, n = 0, s = 0; s < t.length; s++) {
        var i = t[s];
        bt(i) ? (n === 0 ? r.offsetX = i : n === 1 ? r.offsetY = i : r.blur = i, n++) : r.color = Et.parse(A2, i);
      }
      return r;
    });
  } };
  var lU = { name: "text-transform", initialValue: "none", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "uppercase":
        return 2;
      case "lowercase":
        return 1;
      case "capitalize":
        return 3;
    }
    return 0;
  } };
  var oU = { name: "transform", initialValue: "none", prefix: true, type: 0, parse: function(A2, e) {
    if (e.type === 20 && e.value === "none") return null;
    if (e.type === 18) {
      var t = fU[e.name];
      if (typeof t > "u") throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
      return t(e.values);
    }
    return null;
  } };
  var uU = function(A2) {
    var e = A2.filter(function(t) {
      return t.type === 17;
    }).map(function(t) {
      return t.number;
    });
    return e.length === 6 ? e : null;
  };
  var cU = function(A2) {
    var e = A2.filter(function(a) {
      return a.type === 17;
    }).map(function(a) {
      return a.number;
    }), t = e[0], r = e[1];
    e[2], e[3];
    var n = e[4], s = e[5];
    e[6], e[7], e[8], e[9], e[10], e[11];
    var i = e[12], l2 = e[13];
    return e[14], e[15], e.length === 16 ? [t, r, n, s, i, l2] : null;
  };
  var fU = { matrix: uU, matrix3d: cU };
  var Jf = { type: 16, number: 50, flags: rs };
  var dU = [Jf, Jf];
  var BU = { name: "transform-origin", initialValue: "50% 50%", prefix: true, type: 1, parse: function(A2, e) {
    var t = e.filter(xA);
    return t.length !== 2 ? dU : [t[0], t[1]];
  } };
  var gU = { name: "visible", initialValue: "none", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "hidden":
        return 1;
      case "collapse":
        return 2;
      case "visible":
      default:
        return 0;
    }
  } };
  var In;
  (function(A2) {
    A2.NORMAL = "normal", A2.BREAK_ALL = "break-all", A2.KEEP_ALL = "keep-all";
  })(In || (In = {}));
  var hU = { name: "word-break", initialValue: "normal", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "break-all":
        return In.BREAK_ALL;
      case "keep-all":
        return In.KEEP_ALL;
      case "normal":
      default:
        return In.NORMAL;
    }
  } };
  var wU = { name: "z-index", initialValue: "auto", prefix: false, type: 0, parse: function(A2, e) {
    if (e.type === 20) return { auto: true, order: 0 };
    if (Gr(e)) return { auto: false, order: e.number };
    throw new Error("Invalid z-index number parsed");
  } };
  var Vh = { name: "time", parse: function(A2, e) {
    if (e.type === 15) switch (e.unit.toLowerCase()) {
      case "s":
        return 1e3 * e.number;
      case "ms":
        return e.number;
    }
    throw new Error("Unsupported time type");
  } };
  var pU = { name: "opacity", initialValue: "1", type: 0, prefix: false, parse: function(A2, e) {
    return Gr(e) ? e.number : 1;
  } };
  var mU = { name: "text-decoration-color", initialValue: "transparent", prefix: false, type: 3, format: "color" };
  var CU = { name: "text-decoration-line", initialValue: "none", prefix: false, type: 1, parse: function(A2, e) {
    return e.filter(nA).map(function(t) {
      switch (t.value) {
        case "underline":
          return 1;
        case "overline":
          return 2;
        case "line-through":
          return 3;
        case "none":
          return 4;
      }
      return 0;
    }).filter(function(t) {
      return t !== 0;
    });
  } };
  var QU = { name: "font-family", initialValue: "", prefix: false, type: 1, parse: function(A2, e) {
    var t = [], r = [];
    return e.forEach(function(n) {
      switch (n.type) {
        case 20:
        case 0:
          t.push(n.value);
          break;
        case 17:
          t.push(n.number.toString());
          break;
        case 4:
          r.push(t.join(" ")), t.length = 0;
          break;
      }
    }), t.length && r.push(t.join(" ")), r.map(function(n) {
      return n.indexOf(" ") === -1 ? n : "'" + n + "'";
    });
  } };
  var vU = { name: "font-size", initialValue: "0", prefix: false, type: 3, format: "length" };
  var UU = { name: "font-weight", initialValue: "normal", type: 0, prefix: false, parse: function(A2, e) {
    if (Gr(e)) return e.number;
    if (nA(e)) switch (e.value) {
      case "bold":
        return 700;
      case "normal":
      default:
        return 400;
    }
    return 400;
  } };
  var FU = { name: "font-variant", initialValue: "none", type: 1, prefix: false, parse: function(A2, e) {
    return e.filter(nA).map(function(t) {
      return t.value;
    });
  } };
  var xU = { name: "font-style", initialValue: "normal", prefix: false, type: 2, parse: function(A2, e) {
    switch (e) {
      case "oblique":
        return "oblique";
      case "italic":
        return "italic";
      case "normal":
      default:
        return "normal";
    }
  } };
  var HA = function(A2, e) {
    return (A2 & e) !== 0;
  };
  var yU = { name: "content", initialValue: "none", type: 1, prefix: false, parse: function(A2, e) {
    if (e.length === 0) return [];
    var t = e[0];
    return t.type === 20 && t.value === "none" ? [] : e;
  } };
  var EU = { name: "counter-increment", initialValue: "none", prefix: true, type: 1, parse: function(A2, e) {
    if (e.length === 0) return null;
    var t = e[0];
    if (t.type === 20 && t.value === "none") return null;
    for (var r = [], n = e.filter(Eh), s = 0; s < n.length; s++) {
      var i = n[s], l2 = n[s + 1];
      if (i.type === 20) {
        var a = l2 && Gr(l2) ? l2.number : 1;
        r.push({ counter: i.value, increment: a });
      }
    }
    return r;
  } };
  var IU = { name: "counter-reset", initialValue: "none", prefix: true, type: 1, parse: function(A2, e) {
    if (e.length === 0) return [];
    for (var t = [], r = e.filter(Eh), n = 0; n < r.length; n++) {
      var s = r[n], i = r[n + 1];
      if (nA(s) && s.value !== "none") {
        var l2 = i && Gr(i) ? i.number : 0;
        t.push({ counter: s.value, reset: l2 });
      }
    }
    return t;
  } };
  var HU = { name: "duration", initialValue: "0s", prefix: false, type: 1, parse: function(A2, e) {
    return e.filter(ns).map(function(t) {
      return Vh.parse(A2, t);
    });
  } };
  var SU = { name: "quotes", initialValue: "none", prefix: true, type: 1, parse: function(A2, e) {
    if (e.length === 0) return null;
    var t = e[0];
    if (t.type === 20 && t.value === "none") return null;
    var r = [], n = e.filter(tv);
    if (n.length % 2 !== 0) return null;
    for (var s = 0; s < n.length; s += 2) {
      var i = n[s].value, l2 = n[s + 1].value;
      r.push({ open: i, close: l2 });
    }
    return r;
  } };
  var Yf = function(A2, e, t) {
    if (!A2) return "";
    var r = A2[Math.min(e, A2.length - 1)];
    return r ? t ? r.open : r.close : "";
  };
  var bU = { name: "box-shadow", initialValue: "none", type: 1, prefix: false, parse: function(A2, e) {
    return e.length === 1 && So(e[0], "none") ? [] : je(e).map(function(t) {
      for (var r = { color: 255, offsetX: KA, offsetY: KA, blur: KA, spread: KA, inset: false }, n = 0, s = 0; s < t.length; s++) {
        var i = t[s];
        So(i, "inset") ? r.inset = true : bt(i) ? (n === 0 ? r.offsetX = i : n === 1 ? r.offsetY = i : n === 2 ? r.blur = i : r.spread = i, n++) : r.color = Et.parse(A2, i);
      }
      return r;
    });
  } };
  var LU = { name: "paint-order", initialValue: "normal", prefix: false, type: 1, parse: function(A2, e) {
    var t = [0, 1, 2], r = [];
    return e.filter(nA).forEach(function(n) {
      switch (n.value) {
        case "stroke":
          r.push(1);
          break;
        case "fill":
          r.push(0);
          break;
        case "markers":
          r.push(2);
          break;
      }
    }), t.forEach(function(n) {
      r.indexOf(n) === -1 && r.push(n);
    }), r;
  } };
  var NU = { name: "-webkit-text-stroke-color", initialValue: "currentcolor", prefix: false, type: 3, format: "color" };
  var kU = { name: "-webkit-text-stroke-width", initialValue: "0", type: 0, prefix: false, parse: function(A2, e) {
    return ns(e) ? e.number : 0;
  } };
  var TU = function() {
    function A2(e, t) {
      var r, n;
      this.animationDuration = D(e, HU, t.animationDuration), this.backgroundClip = D(e, sv, t.backgroundClip), this.backgroundColor = D(e, iv, t.backgroundColor), this.backgroundImage = D(e, hv, t.backgroundImage), this.backgroundOrigin = D(e, wv, t.backgroundOrigin), this.backgroundPosition = D(e, pv, t.backgroundPosition), this.backgroundRepeat = D(e, mv, t.backgroundRepeat), this.backgroundSize = D(e, Qv, t.backgroundSize), this.borderTopColor = D(e, Uv, t.borderTopColor), this.borderRightColor = D(e, Fv, t.borderRightColor), this.borderBottomColor = D(e, xv, t.borderBottomColor), this.borderLeftColor = D(e, yv, t.borderLeftColor), this.borderTopLeftRadius = D(e, Ev, t.borderTopLeftRadius), this.borderTopRightRadius = D(e, Iv, t.borderTopRightRadius), this.borderBottomRightRadius = D(e, Hv, t.borderBottomRightRadius), this.borderBottomLeftRadius = D(e, Sv, t.borderBottomLeftRadius), this.borderTopStyle = D(e, bv, t.borderTopStyle), this.borderRightStyle = D(e, Lv, t.borderRightStyle), this.borderBottomStyle = D(e, Nv, t.borderBottomStyle), this.borderLeftStyle = D(e, kv, t.borderLeftStyle), this.borderTopWidth = D(e, Tv, t.borderTopWidth), this.borderRightWidth = D(e, Kv, t.borderRightWidth), this.borderBottomWidth = D(e, Dv, t.borderBottomWidth), this.borderLeftWidth = D(e, Mv, t.borderLeftWidth), this.boxShadow = D(e, bU, t.boxShadow), this.color = D(e, Rv, t.color), this.direction = D(e, Ov, t.direction), this.display = D(e, jv, t.display), this.float = D(e, _v, t.cssFloat), this.fontFamily = D(e, QU, t.fontFamily), this.fontSize = D(e, vU, t.fontSize), this.fontStyle = D(e, xU, t.fontStyle), this.fontVariant = D(e, FU, t.fontVariant), this.fontWeight = D(e, UU, t.fontWeight), this.letterSpacing = D(e, Vv, t.letterSpacing), this.lineBreak = D(e, Gv, t.lineBreak), this.lineHeight = D(e, Xv, t.lineHeight), this.listStyleImage = D(e, Wv, t.listStyleImage), this.listStylePosition = D(e, zv, t.listStylePosition), this.listStyleType = D(e, bo, t.listStyleType), this.marginTop = D(e, Jv, t.marginTop), this.marginRight = D(e, Yv, t.marginRight), this.marginBottom = D(e, Zv, t.marginBottom), this.marginLeft = D(e, $v, t.marginLeft), this.opacity = D(e, pU, t.opacity);
      var s = D(e, qv, t.overflow);
      this.overflowX = s[0], this.overflowY = s[s.length > 1 ? 1 : 0], this.overflowWrap = D(e, AU, t.overflowWrap), this.paddingTop = D(e, eU, t.paddingTop), this.paddingRight = D(e, tU, t.paddingRight), this.paddingBottom = D(e, rU, t.paddingBottom), this.paddingLeft = D(e, nU, t.paddingLeft), this.paintOrder = D(e, LU, t.paintOrder), this.position = D(e, iU, t.position), this.textAlign = D(e, sU, t.textAlign), this.textDecorationColor = D(e, mU, (r = t.textDecorationColor) !== null && r !== void 0 ? r : t.color), this.textDecorationLine = D(e, CU, (n = t.textDecorationLine) !== null && n !== void 0 ? n : t.textDecoration), this.textShadow = D(e, aU, t.textShadow), this.textTransform = D(e, lU, t.textTransform), this.transform = D(e, oU, t.transform), this.transformOrigin = D(e, BU, t.transformOrigin), this.visibility = D(e, gU, t.visibility), this.webkitTextStrokeColor = D(e, NU, t.webkitTextStrokeColor), this.webkitTextStrokeWidth = D(e, kU, t.webkitTextStrokeWidth), this.wordBreak = D(e, hU, t.wordBreak), this.zIndex = D(e, wU, t.zIndex);
    }
    return A2.prototype.isVisible = function() {
      return this.display > 0 && this.opacity > 0 && this.visibility === 0;
    }, A2.prototype.isTransparent = function() {
      return It(this.backgroundColor);
    }, A2.prototype.isTransformed = function() {
      return this.transform !== null;
    }, A2.prototype.isPositioned = function() {
      return this.position !== 0;
    }, A2.prototype.isPositionedWithZIndex = function() {
      return this.isPositioned() && !this.zIndex.auto;
    }, A2.prototype.isFloating = function() {
      return this.float !== 0;
    }, A2.prototype.isInlineLevel = function() {
      return HA(this.display, 4) || HA(this.display, 33554432) || HA(this.display, 268435456) || HA(this.display, 536870912) || HA(this.display, 67108864) || HA(this.display, 134217728);
    }, A2;
  }();
  var KU = /* @__PURE__ */ function() {
    function A2(e, t) {
      this.content = D(e, yU, t.content), this.quotes = D(e, SU, t.quotes);
    }
    return A2;
  }();
  var Zf = /* @__PURE__ */ function() {
    function A2(e, t) {
      this.counterIncrement = D(e, EU, t.counterIncrement), this.counterReset = D(e, IU, t.counterReset);
    }
    return A2;
  }();
  var D = function(A2, e, t) {
    var r = new xh(), n = t !== null && typeof t < "u" ? t.toString() : e.initialValue;
    r.write(n);
    var s = new yh(r.read());
    switch (e.type) {
      case 2:
        var i = s.parseComponentValue();
        return e.parse(A2, nA(i) ? i.value : e.initialValue);
      case 0:
        return e.parse(A2, s.parseComponentValue());
      case 1:
        return e.parse(A2, s.parseComponentValues());
      case 4:
        return s.parseComponentValue();
      case 3:
        switch (e.format) {
          case "angle":
            return da.parse(A2, s.parseComponentValue());
          case "color":
            return Et.parse(A2, s.parseComponentValue());
          case "image":
            return ju.parse(A2, s.parseComponentValue());
          case "length":
            var l2 = s.parseComponentValue();
            return bt(l2) ? l2 : KA;
          case "length-percentage":
            var a = s.parseComponentValue();
            return xA(a) ? a : KA;
          case "time":
            return Vh.parse(A2, s.parseComponentValue());
        }
        break;
    }
  };
  var DU = "data-html2canvas-debug";
  var MU = function(A2) {
    var e = A2.getAttribute(DU);
    switch (e) {
      case "all":
        return 1;
      case "clone":
        return 2;
      case "parse":
        return 3;
      case "render":
        return 4;
      default:
        return 0;
    }
  };
  var Lo = function(A2, e) {
    var t = MU(A2);
    return t === 1 || e === t;
  };
  var Pe = /* @__PURE__ */ function() {
    function A2(e, t) {
      if (this.context = e, this.textNodes = [], this.elements = [], this.flags = 0, Lo(t, 3)) debugger;
      this.styles = new TU(e, window.getComputedStyle(t, null)), To(t) && (this.styles.animationDuration.some(function(r) {
        return r > 0;
      }) && (t.style.animationDuration = "0s"), this.styles.transform !== null && (t.style.transform = "none")), this.bounds = ca(this.context, t), Lo(t, 4) && (this.flags |= 16);
    }
    return A2;
  }();
  var RU = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=";
  var $f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var Bn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
  for (js = 0; js < $f.length; js++) Bn[$f.charCodeAt(js)] = js;
  var js;
  var OU = function(A2) {
    var e = A2.length * 0.75, t = A2.length, r, n = 0, s, i, l2, a;
    A2[A2.length - 1] === "=" && (e--, A2[A2.length - 2] === "=" && e--);
    var o = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), c = Array.isArray(o) ? o : new Uint8Array(o);
    for (r = 0; r < t; r += 4) s = Bn[A2.charCodeAt(r)], i = Bn[A2.charCodeAt(r + 1)], l2 = Bn[A2.charCodeAt(r + 2)], a = Bn[A2.charCodeAt(r + 3)], c[n++] = s << 2 | i >> 4, c[n++] = (i & 15) << 4 | l2 >> 2, c[n++] = (l2 & 3) << 6 | a & 63;
    return o;
  };
  var jU = function(A2) {
    for (var e = A2.length, t = [], r = 0; r < e; r += 2) t.push(A2[r + 1] << 8 | A2[r]);
    return t;
  };
  var PU = function(A2) {
    for (var e = A2.length, t = [], r = 0; r < e; r += 4) t.push(A2[r + 3] << 24 | A2[r + 2] << 16 | A2[r + 1] << 8 | A2[r]);
    return t;
  };
  var Wt = 5;
  var Pu = 11;
  var nl = 2;
  var _U = Pu - Wt;
  var Gh = 65536 >> Wt;
  var VU = 1 << Wt;
  var sl = VU - 1;
  var GU = 1024 >> Wt;
  var XU = Gh + GU;
  var WU = XU;
  var zU = 32;
  var JU = WU + zU;
  var YU = 65536 >> Pu;
  var ZU = 1 << _U;
  var $U = ZU - 1;
  var qf = function(A2, e, t) {
    return A2.slice ? A2.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A2, e, t));
  };
  var qU = function(A2, e, t) {
    return A2.slice ? A2.slice(e, t) : new Uint32Array(Array.prototype.slice.call(A2, e, t));
  };
  var AF = function(A2, e) {
    var t = OU(A2), r = Array.isArray(t) ? PU(t) : new Uint32Array(t), n = Array.isArray(t) ? jU(t) : new Uint16Array(t), s = 24, i = qf(n, s / 2, r[4] / 2), l2 = r[5] === 2 ? qf(n, (s + r[4]) / 2) : qU(r, Math.ceil((s + r[4]) / 4));
    return new eF(r[0], r[1], r[2], r[3], i, l2);
  };
  var eF = function() {
    function A2(e, t, r, n, s, i) {
      this.initialValue = e, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = s, this.data = i;
    }
    return A2.prototype.get = function(e) {
      var t;
      if (e >= 0) {
        if (e < 55296 || e > 56319 && e <= 65535) return t = this.index[e >> Wt], t = (t << nl) + (e & sl), this.data[t];
        if (e <= 65535) return t = this.index[Gh + (e - 55296 >> Wt)], t = (t << nl) + (e & sl), this.data[t];
        if (e < this.highStart) return t = JU - YU + (e >> Pu), t = this.index[t], t += e >> Wt & $U, t = this.index[t], t = (t << nl) + (e & sl), this.data[t];
        if (e <= 1114111) return this.data[this.highValueIndex];
      }
      return this.errorValue;
    }, A2;
  }();
  var Ad = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var tF = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
  for (Ps = 0; Ps < Ad.length; Ps++) tF[Ad.charCodeAt(Ps)] = Ps;
  var Ps;
  var rF = 1;
  var il = 2;
  var al = 3;
  var ed = 4;
  var td = 5;
  var nF = 7;
  var rd = 8;
  var ll = 9;
  var ol = 10;
  var nd = 11;
  var sd = 12;
  var id = 13;
  var ad = 14;
  var ul = 15;
  var sF = function(A2) {
    for (var e = [], t = 0, r = A2.length; t < r; ) {
      var n = A2.charCodeAt(t++);
      if (n >= 55296 && n <= 56319 && t < r) {
        var s = A2.charCodeAt(t++);
        (s & 64512) === 56320 ? e.push(((n & 1023) << 10) + (s & 1023) + 65536) : (e.push(n), t--);
      } else e.push(n);
    }
    return e;
  };
  var iF = function() {
    for (var A2 = [], e = 0; e < arguments.length; e++) A2[e] = arguments[e];
    if (String.fromCodePoint) return String.fromCodePoint.apply(String, A2);
    var t = A2.length;
    if (!t) return "";
    for (var r = [], n = -1, s = ""; ++n < t; ) {
      var i = A2[n];
      i <= 65535 ? r.push(i) : (i -= 65536, r.push((i >> 10) + 55296, i % 1024 + 56320)), (n + 1 === t || r.length > 16384) && (s += String.fromCharCode.apply(String, r), r.length = 0);
    }
    return s;
  };
  var aF = AF(RU);
  var fe = "\xD7";
  var cl = "\xF7";
  var lF = function(A2) {
    return aF.get(A2);
  };
  var oF = function(A2, e, t) {
    var r = t - 2, n = e[r], s = e[t - 1], i = e[t];
    if (s === il && i === al) return fe;
    if (s === il || s === al || s === ed || i === il || i === al || i === ed) return cl;
    if (s === rd && [rd, ll, nd, sd].indexOf(i) !== -1 || (s === nd || s === ll) && (i === ll || i === ol) || (s === sd || s === ol) && i === ol || i === id || i === td || i === nF || s === rF) return fe;
    if (s === id && i === ad) {
      for (; n === td; ) n = e[--r];
      if (n === ad) return fe;
    }
    if (s === ul && i === ul) {
      for (var l2 = 0; n === ul; ) l2++, n = e[--r];
      if (l2 % 2 === 0) return fe;
    }
    return cl;
  };
  var uF = function(A2) {
    var e = sF(A2), t = e.length, r = 0, n = 0, s = e.map(lF);
    return { next: function() {
      if (r >= t) return { done: true, value: null };
      for (var i = fe; r < t && (i = oF(e, s, ++r)) === fe; ) ;
      if (i !== fe || r === t) {
        var l2 = iF.apply(null, e.slice(n, r));
        return n = r, { value: l2, done: false };
      }
      return { done: true, value: null };
    } };
  };
  var cF = function(A2) {
    for (var e = uF(A2), t = [], r; !(r = e.next()).done; ) r.value && t.push(r.value.slice());
    return t;
  };
  var fF = function(A2) {
    var e = 123;
    if (A2.createRange) {
      var t = A2.createRange();
      if (t.getBoundingClientRect) {
        var r = A2.createElement("boundtest");
        r.style.height = e + "px", r.style.display = "block", A2.body.appendChild(r), t.selectNode(r);
        var n = t.getBoundingClientRect(), s = Math.round(n.height);
        if (A2.body.removeChild(r), s === e) return true;
      }
    }
    return false;
  };
  var dF = function(A2) {
    var e = A2.createElement("boundtest");
    e.style.width = "50px", e.style.display = "block", e.style.fontSize = "12px", e.style.letterSpacing = "0px", e.style.wordSpacing = "0px", A2.body.appendChild(e);
    var t = A2.createRange();
    e.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
    var r = e.firstChild, n = fa(r.data).map(function(a) {
      return vA(a);
    }), s = 0, i = {}, l2 = n.every(function(a, o) {
      t.setStart(r, s), t.setEnd(r, s + a.length);
      var c = t.getBoundingClientRect();
      s += a.length;
      var f = c.x > i.x || c.y > i.y;
      return i = c, o === 0 ? true : f;
    });
    return A2.body.removeChild(e), l2;
  };
  var BF = function() {
    return typeof new Image().crossOrigin < "u";
  };
  var gF = function() {
    return typeof new XMLHttpRequest().responseType == "string";
  };
  var hF = function(A2) {
    var e = new Image(), t = A2.createElement("canvas"), r = t.getContext("2d");
    if (!r) return false;
    e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
      r.drawImage(e, 0, 0), t.toDataURL();
    } catch {
      return false;
    }
    return true;
  };
  var ld = function(A2) {
    return A2[0] === 0 && A2[1] === 255 && A2[2] === 0 && A2[3] === 255;
  };
  var wF = function(A2) {
    var e = A2.createElement("canvas"), t = 100;
    e.width = t, e.height = t;
    var r = e.getContext("2d");
    if (!r) return Promise.reject(false);
    r.fillStyle = "rgb(0, 255, 0)", r.fillRect(0, 0, t, t);
    var n = new Image(), s = e.toDataURL();
    n.src = s;
    var i = No(t, t, 0, 0, n);
    return r.fillStyle = "red", r.fillRect(0, 0, t, t), od(i).then(function(l2) {
      r.drawImage(l2, 0, 0);
      var a = r.getImageData(0, 0, t, t).data;
      r.fillStyle = "red", r.fillRect(0, 0, t, t);
      var o = A2.createElement("div");
      return o.style.backgroundImage = "url(" + s + ")", o.style.height = t + "px", ld(a) ? od(No(t, t, 0, 0, o)) : Promise.reject(false);
    }).then(function(l2) {
      return r.drawImage(l2, 0, 0), ld(r.getImageData(0, 0, t, t).data);
    }).catch(function() {
      return false;
    });
  };
  var No = function(A2, e, t, r, n) {
    var s = "http://www.w3.org/2000/svg", i = document.createElementNS(s, "svg"), l2 = document.createElementNS(s, "foreignObject");
    return i.setAttributeNS(null, "width", A2.toString()), i.setAttributeNS(null, "height", e.toString()), l2.setAttributeNS(null, "width", "100%"), l2.setAttributeNS(null, "height", "100%"), l2.setAttributeNS(null, "x", t.toString()), l2.setAttributeNS(null, "y", r.toString()), l2.setAttributeNS(null, "externalResourcesRequired", "true"), i.appendChild(l2), l2.appendChild(n), i;
  };
  var od = function(A2) {
    return new Promise(function(e, t) {
      var r = new Image();
      r.onload = function() {
        return e(r);
      }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(A2));
    });
  };
  var TA = { get SUPPORT_RANGE_BOUNDS() {
    var A2 = fF(document);
    return Object.defineProperty(TA, "SUPPORT_RANGE_BOUNDS", { value: A2 }), A2;
  }, get SUPPORT_WORD_BREAKING() {
    var A2 = TA.SUPPORT_RANGE_BOUNDS && dF(document);
    return Object.defineProperty(TA, "SUPPORT_WORD_BREAKING", { value: A2 }), A2;
  }, get SUPPORT_SVG_DRAWING() {
    var A2 = hF(document);
    return Object.defineProperty(TA, "SUPPORT_SVG_DRAWING", { value: A2 }), A2;
  }, get SUPPORT_FOREIGNOBJECT_DRAWING() {
    var A2 = typeof Array.from == "function" && typeof window.fetch == "function" ? wF(document) : Promise.resolve(false);
    return Object.defineProperty(TA, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: A2 }), A2;
  }, get SUPPORT_CORS_IMAGES() {
    var A2 = BF();
    return Object.defineProperty(TA, "SUPPORT_CORS_IMAGES", { value: A2 }), A2;
  }, get SUPPORT_RESPONSE_TYPE() {
    var A2 = gF();
    return Object.defineProperty(TA, "SUPPORT_RESPONSE_TYPE", { value: A2 }), A2;
  }, get SUPPORT_CORS_XHR() {
    var A2 = "withCredentials" in new XMLHttpRequest();
    return Object.defineProperty(TA, "SUPPORT_CORS_XHR", { value: A2 }), A2;
  }, get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
    var A2 = !!(typeof Intl < "u" && Intl.Segmenter);
    return Object.defineProperty(TA, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: A2 }), A2;
  } };
  var Hn = /* @__PURE__ */ function() {
    function A2(e, t) {
      this.text = e, this.bounds = t;
    }
    return A2;
  }();
  var pF = function(A2, e, t, r) {
    var n = QF(e, t), s = [], i = 0;
    return n.forEach(function(l2) {
      if (t.textDecorationLine.length || l2.trim().length > 0) if (TA.SUPPORT_RANGE_BOUNDS) {
        var a = ud(r, i, l2.length).getClientRects();
        if (a.length > 1) {
          var o = _u(l2), c = 0;
          o.forEach(function(d) {
            s.push(new Hn(d, tt.fromDOMRectList(A2, ud(r, c + i, d.length).getClientRects()))), c += d.length;
          });
        } else s.push(new Hn(l2, tt.fromDOMRectList(A2, a)));
      } else {
        var f = r.splitText(l2.length);
        s.push(new Hn(l2, mF(A2, r))), r = f;
      }
      else TA.SUPPORT_RANGE_BOUNDS || (r = r.splitText(l2.length));
      i += l2.length;
    }), s;
  };
  var mF = function(A2, e) {
    var t = e.ownerDocument;
    if (t) {
      var r = t.createElement("html2canvaswrapper");
      r.appendChild(e.cloneNode(true));
      var n = e.parentNode;
      if (n) {
        n.replaceChild(r, e);
        var s = ca(A2, r);
        return r.firstChild && n.replaceChild(r.firstChild, r), s;
      }
    }
    return tt.EMPTY;
  };
  var ud = function(A2, e, t) {
    var r = A2.ownerDocument;
    if (!r) throw new Error("Node has no owner document");
    var n = r.createRange();
    return n.setStart(A2, e), n.setEnd(A2, e + t), n;
  };
  var _u = function(A2) {
    if (TA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
      var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
      return Array.from(e.segment(A2)).map(function(t) {
        return t.segment;
      });
    }
    return cF(A2);
  };
  var CF = function(A2, e) {
    if (TA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
      var t = new Intl.Segmenter(void 0, { granularity: "word" });
      return Array.from(t.segment(A2)).map(function(r) {
        return r.segment;
      });
    }
    return UF(A2, e);
  };
  var QF = function(A2, e) {
    return e.letterSpacing !== 0 ? _u(A2) : CF(A2, e);
  };
  var vF = [32, 160, 4961, 65792, 65793, 4153, 4241];
  var UF = function(A2, e) {
    for (var t = YC(A2, { lineBreak: e.lineBreak, wordBreak: e.overflowWrap === "break-word" ? "break-word" : e.wordBreak }), r = [], n, s = function() {
      if (n.value) {
        var i = n.value.slice(), l2 = fa(i), a = "";
        l2.forEach(function(o) {
          vF.indexOf(o) === -1 ? a += vA(o) : (a.length && r.push(a), r.push(vA(o)), a = "");
        }), a.length && r.push(a);
      }
    }; !(n = t.next()).done; ) s();
    return r;
  };
  var FF = /* @__PURE__ */ function() {
    function A2(e, t, r) {
      this.text = xF(t.data, r.textTransform), this.textBounds = pF(e, this.text, r, t);
    }
    return A2;
  }();
  var xF = function(A2, e) {
    switch (e) {
      case 1:
        return A2.toLowerCase();
      case 3:
        return A2.replace(yF, EF);
      case 2:
        return A2.toUpperCase();
      default:
        return A2;
    }
  };
  var yF = /(^|\s|:|-|\(|\))([a-z])/g;
  var EF = function(A2, e, t) {
    return A2.length > 0 ? e + t.toUpperCase() : A2;
  };
  var Xh = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n.src = r.currentSrc || r.src, n.intrinsicWidth = r.naturalWidth, n.intrinsicHeight = r.naturalHeight, n.context.cache.addImage(n.src), n;
    }
    return e;
  }(Pe);
  var Wh = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n.canvas = r, n.intrinsicWidth = r.width, n.intrinsicHeight = r.height, n;
    }
    return e;
  }(Pe);
  var zh = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this, s = new XMLSerializer(), i = ca(t, r);
      return r.setAttribute("width", i.width + "px"), r.setAttribute("height", i.height + "px"), n.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(r)), n.intrinsicWidth = r.width.baseVal.value, n.intrinsicHeight = r.height.baseVal.value, n.context.cache.addImage(n.svg), n;
    }
    return e;
  }(Pe);
  var Jh = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n.value = r.value, n;
    }
    return e;
  }(Pe);
  var ko = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n.start = r.start, n.reversed = typeof r.reversed == "boolean" && r.reversed === true, n;
    }
    return e;
  }(Pe);
  var IF = [{ type: 15, flags: 0, unit: "px", number: 3 }];
  var HF = [{ type: 16, flags: 0, number: 50 }];
  var SF = function(A2) {
    return A2.width > A2.height ? new tt(A2.left + (A2.width - A2.height) / 2, A2.top, A2.height, A2.height) : A2.width < A2.height ? new tt(A2.left, A2.top + (A2.height - A2.width) / 2, A2.width, A2.width) : A2;
  };
  var bF = function(A2) {
    var e = A2.type === LF ? new Array(A2.value.length + 1).join("\u2022") : A2.value;
    return e.length === 0 ? A2.placeholder || "" : e;
  };
  var ji = "checkbox";
  var Pi = "radio";
  var LF = "password";
  var cd = 707406591;
  var Vu = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      switch (n.type = r.type.toLowerCase(), n.checked = r.checked, n.value = bF(r), (n.type === ji || n.type === Pi) && (n.styles.backgroundColor = 3739148031, n.styles.borderTopColor = n.styles.borderRightColor = n.styles.borderBottomColor = n.styles.borderLeftColor = 2779096575, n.styles.borderTopWidth = n.styles.borderRightWidth = n.styles.borderBottomWidth = n.styles.borderLeftWidth = 1, n.styles.borderTopStyle = n.styles.borderRightStyle = n.styles.borderBottomStyle = n.styles.borderLeftStyle = 1, n.styles.backgroundClip = [0], n.styles.backgroundOrigin = [0], n.bounds = SF(n.bounds)), n.type) {
        case ji:
          n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = IF;
          break;
        case Pi:
          n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = HF;
          break;
      }
      return n;
    }
    return e;
  }(Pe);
  var Yh = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this, s = r.options[r.selectedIndex || 0];
      return n.value = s && s.text || "", n;
    }
    return e;
  }(Pe);
  var Zh = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n.value = r.value, n;
    }
    return e;
  }(Pe);
  var $h = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      n.src = r.src, n.width = parseInt(r.width, 10) || 0, n.height = parseInt(r.height, 10) || 0, n.backgroundColor = n.styles.backgroundColor;
      try {
        if (r.contentWindow && r.contentWindow.document && r.contentWindow.document.documentElement) {
          n.tree = A0(t, r.contentWindow.document.documentElement);
          var s = r.contentWindow.document.documentElement ? En(t, getComputedStyle(r.contentWindow.document.documentElement).backgroundColor) : Ze.TRANSPARENT, i = r.contentWindow.document.body ? En(t, getComputedStyle(r.contentWindow.document.body).backgroundColor) : Ze.TRANSPARENT;
          n.backgroundColor = It(s) ? It(i) ? n.styles.backgroundColor : i : s;
        }
      } catch {
      }
      return n;
    }
    return e;
  }(Pe);
  var NF = ["OL", "UL", "MENU"];
  var li = function(A2, e, t, r) {
    for (var n = e.firstChild, s = void 0; n; n = s) if (s = n.nextSibling, e0(n) && n.data.trim().length > 0) t.textNodes.push(new FF(A2, n, t.styles));
    else if (yr(n)) if (s0(n) && n.assignedNodes) n.assignedNodes().forEach(function(l2) {
      return li(A2, l2, t, r);
    });
    else {
      var i = qh(A2, n);
      i.styles.isVisible() && (kF(n, i, r) ? i.flags |= 4 : TF(i.styles) && (i.flags |= 2), NF.indexOf(n.tagName) !== -1 && (i.flags |= 8), t.elements.push(i), n.slot, n.shadowRoot ? li(A2, n.shadowRoot, i, r) : !_i(n) && !t0(n) && !Vi(n) && li(A2, n, i, r));
    }
  };
  var qh = function(A2, e) {
    return Ko(e) ? new Xh(A2, e) : r0(e) ? new Wh(A2, e) : t0(e) ? new zh(A2, e) : KF(e) ? new Jh(A2, e) : DF(e) ? new ko(A2, e) : MF(e) ? new Vu(A2, e) : Vi(e) ? new Yh(A2, e) : _i(e) ? new Zh(A2, e) : n0(e) ? new $h(A2, e) : new Pe(A2, e);
  };
  var A0 = function(A2, e) {
    var t = qh(A2, e);
    return t.flags |= 4, li(A2, e, t, t), t;
  };
  var kF = function(A2, e, t) {
    return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || Gu(A2) && t.styles.isTransparent();
  };
  var TF = function(A2) {
    return A2.isPositioned() || A2.isFloating();
  };
  var e0 = function(A2) {
    return A2.nodeType === Node.TEXT_NODE;
  };
  var yr = function(A2) {
    return A2.nodeType === Node.ELEMENT_NODE;
  };
  var To = function(A2) {
    return yr(A2) && typeof A2.style < "u" && !oi(A2);
  };
  var oi = function(A2) {
    return typeof A2.className == "object";
  };
  var KF = function(A2) {
    return A2.tagName === "LI";
  };
  var DF = function(A2) {
    return A2.tagName === "OL";
  };
  var MF = function(A2) {
    return A2.tagName === "INPUT";
  };
  var RF = function(A2) {
    return A2.tagName === "HTML";
  };
  var t0 = function(A2) {
    return A2.tagName === "svg";
  };
  var Gu = function(A2) {
    return A2.tagName === "BODY";
  };
  var r0 = function(A2) {
    return A2.tagName === "CANVAS";
  };
  var fd = function(A2) {
    return A2.tagName === "VIDEO";
  };
  var Ko = function(A2) {
    return A2.tagName === "IMG";
  };
  var n0 = function(A2) {
    return A2.tagName === "IFRAME";
  };
  var dd = function(A2) {
    return A2.tagName === "STYLE";
  };
  var OF = function(A2) {
    return A2.tagName === "SCRIPT";
  };
  var _i = function(A2) {
    return A2.tagName === "TEXTAREA";
  };
  var Vi = function(A2) {
    return A2.tagName === "SELECT";
  };
  var s0 = function(A2) {
    return A2.tagName === "SLOT";
  };
  var Bd = function(A2) {
    return A2.tagName.indexOf("-") > 0;
  };
  var jF = function() {
    function A2() {
      this.counters = {};
    }
    return A2.prototype.getCounterValue = function(e) {
      var t = this.counters[e];
      return t && t.length ? t[t.length - 1] : 1;
    }, A2.prototype.getCounterValues = function(e) {
      var t = this.counters[e];
      return t || [];
    }, A2.prototype.pop = function(e) {
      var t = this;
      e.forEach(function(r) {
        return t.counters[r].pop();
      });
    }, A2.prototype.parse = function(e) {
      var t = this, r = e.counterIncrement, n = e.counterReset, s = true;
      r !== null && r.forEach(function(l2) {
        var a = t.counters[l2.counter];
        a && l2.increment !== 0 && (s = false, a.length || a.push(1), a[Math.max(0, a.length - 1)] += l2.increment);
      });
      var i = [];
      return s && n.forEach(function(l2) {
        var a = t.counters[l2.counter];
        i.push(l2.counter), a || (a = t.counters[l2.counter] = []), a.push(l2.reset);
      }), i;
    }, A2;
  }();
  var gd = { integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] };
  var hd = { integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["\u0554", "\u0553", "\u0552", "\u0551", "\u0550", "\u054F", "\u054E", "\u054D", "\u054C", "\u054B", "\u054A", "\u0549", "\u0548", "\u0547", "\u0546", "\u0545", "\u0544", "\u0543", "\u0542", "\u0541", "\u0540", "\u053F", "\u053E", "\u053D", "\u053C", "\u053B", "\u053A", "\u0539", "\u0538", "\u0537", "\u0536", "\u0535", "\u0534", "\u0533", "\u0532", "\u0531"] };
  var PF = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["\u05D9\u05F3", "\u05D8\u05F3", "\u05D7\u05F3", "\u05D6\u05F3", "\u05D5\u05F3", "\u05D4\u05F3", "\u05D3\u05F3", "\u05D2\u05F3", "\u05D1\u05F3", "\u05D0\u05F3", "\u05EA", "\u05E9", "\u05E8", "\u05E7", "\u05E6", "\u05E4", "\u05E2", "\u05E1", "\u05E0", "\u05DE", "\u05DC", "\u05DB", "\u05D9\u05D8", "\u05D9\u05D7", "\u05D9\u05D6", "\u05D8\u05D6", "\u05D8\u05D5", "\u05D9", "\u05D8", "\u05D7", "\u05D6", "\u05D5", "\u05D4", "\u05D3", "\u05D2", "\u05D1", "\u05D0"] };
  var _F = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["\u10F5", "\u10F0", "\u10EF", "\u10F4", "\u10EE", "\u10ED", "\u10EC", "\u10EB", "\u10EA", "\u10E9", "\u10E8", "\u10E7", "\u10E6", "\u10E5", "\u10E4", "\u10F3", "\u10E2", "\u10E1", "\u10E0", "\u10DF", "\u10DE", "\u10DD", "\u10F2", "\u10DC", "\u10DB", "\u10DA", "\u10D9", "\u10D8", "\u10D7", "\u10F1", "\u10D6", "\u10D5", "\u10D4", "\u10D3", "\u10D2", "\u10D1", "\u10D0"] };
  var lr = function(A2, e, t, r, n, s) {
    return A2 < e || A2 > t ? Yn(A2, n, s.length > 0) : r.integers.reduce(function(i, l2, a) {
      for (; A2 >= l2; ) A2 -= l2, i += r.values[a];
      return i;
    }, "") + s;
  };
  var i0 = function(A2, e, t, r) {
    var n = "";
    do
      t || A2--, n = r(A2) + n, A2 /= e;
    while (A2 * e >= e);
    return n;
  };
  var QA = function(A2, e, t, r, n) {
    var s = t - e + 1;
    return (A2 < 0 ? "-" : "") + (i0(Math.abs(A2), s, r, function(i) {
      return vA(Math.floor(i % s) + e);
    }) + n);
  };
  var Kt = function(A2, e, t) {
    t === void 0 && (t = ". ");
    var r = e.length;
    return i0(Math.abs(A2), r, false, function(n) {
      return e[Math.floor(n % r)];
    }) + t;
  };
  var cr = 1;
  var it = 2;
  var at = 4;
  var gn = 8;
  var Ge = function(A2, e, t, r, n, s) {
    if (A2 < -9999 || A2 > 9999) return Yn(A2, 4, n.length > 0);
    var i = Math.abs(A2), l2 = n;
    if (i === 0) return e[0] + l2;
    for (var a = 0; i > 0 && a <= 4; a++) {
      var o = i % 10;
      o === 0 && HA(s, cr) && l2 !== "" ? l2 = e[o] + l2 : o > 1 || o === 1 && a === 0 || o === 1 && a === 1 && HA(s, it) || o === 1 && a === 1 && HA(s, at) && A2 > 100 || o === 1 && a > 1 && HA(s, gn) ? l2 = e[o] + (a > 0 ? t[a - 1] : "") + l2 : o === 1 && a > 0 && (l2 = t[a - 1] + l2), i = Math.floor(i / 10);
    }
    return (A2 < 0 ? r : "") + l2;
  };
  var wd = "\u5341\u767E\u5343\u842C";
  var pd = "\u62FE\u4F70\u4EDF\u842C";
  var md = "\u30DE\u30A4\u30CA\u30B9";
  var fl = "\uB9C8\uC774\uB108\uC2A4";
  var Yn = function(A2, e, t) {
    var r = t ? ". " : "", n = t ? "\u3001" : "", s = t ? ", " : "", i = t ? " " : "";
    switch (e) {
      case 0:
        return "\u2022" + i;
      case 1:
        return "\u25E6" + i;
      case 2:
        return "\u25FE" + i;
      case 5:
        var l2 = QA(A2, 48, 57, true, r);
        return l2.length < 4 ? "0" + l2 : l2;
      case 4:
        return Kt(A2, "\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", n);
      case 6:
        return lr(A2, 1, 3999, gd, 3, r).toLowerCase();
      case 7:
        return lr(A2, 1, 3999, gd, 3, r);
      case 8:
        return QA(A2, 945, 969, false, r);
      case 9:
        return QA(A2, 97, 122, false, r);
      case 10:
        return QA(A2, 65, 90, false, r);
      case 11:
        return QA(A2, 1632, 1641, true, r);
      case 12:
      case 49:
        return lr(A2, 1, 9999, hd, 3, r);
      case 35:
        return lr(A2, 1, 9999, hd, 3, r).toLowerCase();
      case 13:
        return QA(A2, 2534, 2543, true, r);
      case 14:
      case 30:
        return QA(A2, 6112, 6121, true, r);
      case 15:
        return Kt(A2, "\u5B50\u4E11\u5BC5\u536F\u8FB0\u5DF3\u5348\u672A\u7533\u9149\u620C\u4EA5", n);
      case 16:
        return Kt(A2, "\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678", n);
      case 17:
      case 48:
        return Ge(A2, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", wd, "\u8CA0", n, it | at | gn);
      case 47:
        return Ge(A2, "\u96F6\u58F9\u8CB3\u53C3\u8086\u4F0D\u9678\u67D2\u634C\u7396", pd, "\u8CA0", n, cr | it | at | gn);
      case 42:
        return Ge(A2, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", wd, "\u8D1F", n, it | at | gn);
      case 41:
        return Ge(A2, "\u96F6\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396", pd, "\u8D1F", n, cr | it | at | gn);
      case 26:
        return Ge(A2, "\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u5341\u767E\u5343\u4E07", md, n, 0);
      case 25:
        return Ge(A2, "\u96F6\u58F1\u5F10\u53C2\u56DB\u4F0D\u516D\u4E03\u516B\u4E5D", "\u62FE\u767E\u5343\u4E07", md, n, cr | it | at);
      case 31:
        return Ge(A2, "\uC601\uC77C\uC774\uC0BC\uC0AC\uC624\uC721\uCE60\uD314\uAD6C", "\uC2ED\uBC31\uCC9C\uB9CC", fl, s, cr | it | at);
      case 33:
        return Ge(A2, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u5341\u767E\u5343\u842C", fl, s, 0);
      case 32:
        return Ge(A2, "\u96F6\u58F9\u8CB3\u53C3\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u62FE\u767E\u5343", fl, s, cr | it | at);
      case 18:
        return QA(A2, 2406, 2415, true, r);
      case 20:
        return lr(A2, 1, 19999, _F, 3, r);
      case 21:
        return QA(A2, 2790, 2799, true, r);
      case 22:
        return QA(A2, 2662, 2671, true, r);
      case 22:
        return lr(A2, 1, 10999, PF, 3, r);
      case 23:
        return Kt(A2, "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3090\u3091\u3092\u3093");
      case 24:
        return Kt(A2, "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084\u307E\u3051\u3075\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059");
      case 27:
        return QA(A2, 3302, 3311, true, r);
      case 28:
        return Kt(A2, "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F0\u30F1\u30F2\u30F3", n);
      case 29:
        return Kt(A2, "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4\u30CD\u30CA\u30E9\u30E0\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE\u30B1\u30D5\u30B3\u30A8\u30C6\u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7\u30F1\u30D2\u30E2\u30BB\u30B9", n);
      case 34:
        return QA(A2, 3792, 3801, true, r);
      case 37:
        return QA(A2, 6160, 6169, true, r);
      case 38:
        return QA(A2, 4160, 4169, true, r);
      case 39:
        return QA(A2, 2918, 2927, true, r);
      case 40:
        return QA(A2, 1776, 1785, true, r);
      case 43:
        return QA(A2, 3046, 3055, true, r);
      case 44:
        return QA(A2, 3174, 3183, true, r);
      case 45:
        return QA(A2, 3664, 3673, true, r);
      case 46:
        return QA(A2, 3872, 3881, true, r);
      case 3:
      default:
        return QA(A2, 48, 57, true, r);
    }
  };
  var a0 = "data-html2canvas-ignore";
  var Cd = function() {
    function A2(e, t, r) {
      if (this.context = e, this.options = r, this.scrolledElements = [], this.referenceElement = t, this.counters = new jF(), this.quoteDepth = 0, !t.ownerDocument) throw new Error("Cloned element does not have an owner document");
      this.documentElement = this.cloneNode(t.ownerDocument.documentElement, false);
    }
    return A2.prototype.toIFrame = function(e, t) {
      var r = this, n = VF(e, t);
      if (!n.contentWindow) return Promise.reject("Unable to find iframe window");
      var s = e.defaultView.pageXOffset, i = e.defaultView.pageYOffset, l2 = n.contentWindow, a = l2.document, o = WF(n).then(function() {
        return GA(r, void 0, void 0, function() {
          var c, f;
          return jA(this, function(d) {
            switch (d.label) {
              case 0:
                return this.scrolledElements.forEach(ZF), l2 && (l2.scrollTo(t.left, t.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (l2.scrollY !== t.top || l2.scrollX !== t.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(l2.scrollX - t.left, l2.scrollY - t.top, 0, 0))), c = this.options.onclone, f = this.clonedReferenceElement, typeof f > "u" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : a.fonts && a.fonts.ready ? [4, a.fonts.ready] : [3, 2];
              case 1:
                d.sent(), d.label = 2;
              case 2:
                return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, XF(a)] : [3, 4];
              case 3:
                d.sent(), d.label = 4;
              case 4:
                return typeof c == "function" ? [2, Promise.resolve().then(function() {
                  return c(a, f);
                }).then(function() {
                  return n;
                })] : [2, n];
            }
          });
        });
      });
      return a.open(), a.write(JF(document.doctype) + "<html></html>"), YF(this.referenceElement.ownerDocument, s, i), a.replaceChild(a.adoptNode(this.documentElement), a.documentElement), a.close(), o;
    }, A2.prototype.createElementClone = function(e) {
      if (Lo(e, 2)) debugger;
      if (r0(e)) return this.createCanvasClone(e);
      if (fd(e)) return this.createVideoClone(e);
      if (dd(e)) return this.createStyleClone(e);
      var t = e.cloneNode(false);
      return Ko(t) && (Ko(e) && e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager")), Bd(t) ? this.createCustomElementClone(t) : t;
    }, A2.prototype.createCustomElementClone = function(e) {
      var t = document.createElement("html2canvascustomelement");
      return dl(e.style, t), t;
    }, A2.prototype.createStyleClone = function(e) {
      try {
        var t = e.sheet;
        if (t && t.cssRules) {
          var r = [].slice.call(t.cssRules, 0).reduce(function(s, i) {
            return i && typeof i.cssText == "string" ? s + i.cssText : s;
          }, ""), n = e.cloneNode(false);
          return n.textContent = r, n;
        }
      } catch (s) {
        if (this.context.logger.error("Unable to access cssRules property", s), s.name !== "SecurityError") throw s;
      }
      return e.cloneNode(false);
    }, A2.prototype.createCanvasClone = function(e) {
      var t;
      if (this.options.inlineImages && e.ownerDocument) {
        var r = e.ownerDocument.createElement("img");
        try {
          return r.src = e.toDataURL(), r;
        } catch {
          this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e);
        }
      }
      var n = e.cloneNode(false);
      try {
        n.width = e.width, n.height = e.height;
        var s = e.getContext("2d"), i = n.getContext("2d");
        if (i) if (!this.options.allowTaint && s) i.putImageData(s.getImageData(0, 0, e.width, e.height), 0, 0);
        else {
          var l2 = (t = e.getContext("webgl2")) !== null && t !== void 0 ? t : e.getContext("webgl");
          if (l2) {
            var a = l2.getContextAttributes();
            (a == null ? void 0 : a.preserveDrawingBuffer) === false && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e);
          }
          i.drawImage(e, 0, 0);
        }
        return n;
      } catch {
        this.context.logger.info("Unable to clone canvas as it is tainted", e);
      }
      return n;
    }, A2.prototype.createVideoClone = function(e) {
      var t = e.ownerDocument.createElement("canvas");
      t.width = e.offsetWidth, t.height = e.offsetHeight;
      var r = t.getContext("2d");
      try {
        return r && (r.drawImage(e, 0, 0, t.width, t.height), this.options.allowTaint || r.getImageData(0, 0, t.width, t.height)), t;
      } catch {
        this.context.logger.info("Unable to clone video as it is tainted", e);
      }
      var n = e.ownerDocument.createElement("canvas");
      return n.width = e.offsetWidth, n.height = e.offsetHeight, n;
    }, A2.prototype.appendChildNode = function(e, t, r) {
      (!yr(t) || !OF(t) && !t.hasAttribute(a0) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(t))) && (!this.options.copyStyles || !yr(t) || !dd(t)) && e.appendChild(this.cloneNode(t, r));
    }, A2.prototype.cloneChildNodes = function(e, t, r) {
      for (var n = this, s = e.shadowRoot ? e.shadowRoot.firstChild : e.firstChild; s; s = s.nextSibling) if (yr(s) && s0(s) && typeof s.assignedNodes == "function") {
        var i = s.assignedNodes();
        i.length && i.forEach(function(l2) {
          return n.appendChildNode(t, l2, r);
        });
      } else this.appendChildNode(t, s, r);
    }, A2.prototype.cloneNode = function(e, t) {
      if (e0(e)) return document.createTextNode(e.data);
      if (!e.ownerDocument) return e.cloneNode(false);
      var r = e.ownerDocument.defaultView;
      if (r && yr(e) && (To(e) || oi(e))) {
        var n = this.createElementClone(e);
        n.style.transitionProperty = "none";
        var s = r.getComputedStyle(e), i = r.getComputedStyle(e, ":before"), l2 = r.getComputedStyle(e, ":after");
        this.referenceElement === e && To(n) && (this.clonedReferenceElement = n), Gu(n) && Ax(n);
        var a = this.counters.parse(new Zf(this.context, s)), o = this.resolvePseudoContent(e, n, i, Sn.BEFORE);
        Bd(e) && (t = true), fd(e) || this.cloneChildNodes(e, n, t), o && n.insertBefore(o, n.firstChild);
        var c = this.resolvePseudoContent(e, n, l2, Sn.AFTER);
        return c && n.appendChild(c), this.counters.pop(a), (s && (this.options.copyStyles || oi(e)) && !n0(e) || t) && dl(s, n), (e.scrollTop !== 0 || e.scrollLeft !== 0) && this.scrolledElements.push([n, e.scrollLeft, e.scrollTop]), (_i(e) || Vi(e)) && (_i(n) || Vi(n)) && (n.value = e.value), n;
      }
      return e.cloneNode(false);
    }, A2.prototype.resolvePseudoContent = function(e, t, r, n) {
      var s = this;
      if (r) {
        var i = r.content, l2 = t.ownerDocument;
        if (!(!l2 || !i || i === "none" || i === "-moz-alt-content" || r.display === "none")) {
          this.counters.parse(new Zf(this.context, r));
          var a = new KU(this.context, r), o = l2.createElement("html2canvaspseudoelement");
          dl(r, o), a.content.forEach(function(f) {
            if (f.type === 0) o.appendChild(l2.createTextNode(f.value));
            else if (f.type === 22) {
              var d = l2.createElement("img");
              d.src = f.value, d.style.opacity = "1", o.appendChild(d);
            } else if (f.type === 18) {
              if (f.name === "attr") {
                var m2 = f.values.filter(nA);
                m2.length && o.appendChild(l2.createTextNode(e.getAttribute(m2[0].value) || ""));
              } else if (f.name === "counter") {
                var w2 = f.values.filter(jr), C2 = w2[0], U = w2[1];
                if (C2 && nA(C2)) {
                  var h = s.counters.getCounterValue(C2.value), B = U && nA(U) ? bo.parse(s.context, U.value) : 3;
                  o.appendChild(l2.createTextNode(Yn(h, B, false)));
                }
              } else if (f.name === "counters") {
                var p = f.values.filter(jr), C2 = p[0], v2 = p[1], U = p[2];
                if (C2 && nA(C2)) {
                  var x = s.counters.getCounterValues(C2.value), F = U && nA(U) ? bo.parse(s.context, U.value) : 3, I = v2 && v2.type === 0 ? v2.value : "", H = x.map(function(_) {
                    return Yn(_, F, false);
                  }).join(I);
                  o.appendChild(l2.createTextNode(H));
                }
              }
            } else if (f.type === 20) switch (f.value) {
              case "open-quote":
                o.appendChild(l2.createTextNode(Yf(a.quotes, s.quoteDepth++, true)));
                break;
              case "close-quote":
                o.appendChild(l2.createTextNode(Yf(a.quotes, --s.quoteDepth, false)));
                break;
              default:
                o.appendChild(l2.createTextNode(f.value));
            }
          }), o.className = Do + " " + Mo;
          var c = n === Sn.BEFORE ? " " + Do : " " + Mo;
          return oi(t) ? t.className.baseValue += c : t.className += c, o;
        }
      }
    }, A2.destroy = function(e) {
      return e.parentNode ? (e.parentNode.removeChild(e), true) : false;
    }, A2;
  }();
  var Sn;
  (function(A2) {
    A2[A2.BEFORE = 0] = "BEFORE", A2[A2.AFTER = 1] = "AFTER";
  })(Sn || (Sn = {}));
  var VF = function(A2, e) {
    var t = A2.createElement("iframe");
    return t.className = "html2canvas-container", t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0px", t.style.border = "0", t.width = e.width.toString(), t.height = e.height.toString(), t.scrolling = "no", t.setAttribute(a0, "true"), A2.body.appendChild(t), t;
  };
  var GF = function(A2) {
    return new Promise(function(e) {
      if (A2.complete) {
        e();
        return;
      }
      if (!A2.src) {
        e();
        return;
      }
      A2.onload = e, A2.onerror = e;
    });
  };
  var XF = function(A2) {
    return Promise.all([].slice.call(A2.images, 0).map(GF));
  };
  var WF = function(A2) {
    return new Promise(function(e, t) {
      var r = A2.contentWindow;
      if (!r) return t("No window assigned for iframe");
      var n = r.document;
      r.onload = A2.onload = function() {
        r.onload = A2.onload = null;
        var s = setInterval(function() {
          n.body.childNodes.length > 0 && n.readyState === "complete" && (clearInterval(s), e(A2));
        }, 50);
      };
    });
  };
  var zF = ["all", "d", "content"];
  var dl = function(A2, e) {
    for (var t = A2.length - 1; t >= 0; t--) {
      var r = A2.item(t);
      zF.indexOf(r) === -1 && e.style.setProperty(r, A2.getPropertyValue(r));
    }
    return e;
  };
  var JF = function(A2) {
    var e = "";
    return A2 && (e += "<!DOCTYPE ", A2.name && (e += A2.name), A2.internalSubset && (e += A2.internalSubset), A2.publicId && (e += '"' + A2.publicId + '"'), A2.systemId && (e += '"' + A2.systemId + '"'), e += ">"), e;
  };
  var YF = function(A2, e, t) {
    A2 && A2.defaultView && (e !== A2.defaultView.pageXOffset || t !== A2.defaultView.pageYOffset) && A2.defaultView.scrollTo(e, t);
  };
  var ZF = function(A2) {
    var e = A2[0], t = A2[1], r = A2[2];
    e.scrollLeft = t, e.scrollTop = r;
  };
  var $F = ":before";
  var qF = ":after";
  var Do = "___html2canvas___pseudoelement_before";
  var Mo = "___html2canvas___pseudoelement_after";
  var Qd = `{
    content: "" !important;
    display: none !important;
}`;
  var Ax = function(A2) {
    ex(A2, "." + Do + $F + Qd + `
         .` + Mo + qF + Qd);
  };
  var ex = function(A2, e) {
    var t = A2.ownerDocument;
    if (t) {
      var r = t.createElement("style");
      r.textContent = e, A2.appendChild(r);
    }
  };
  var l0 = function() {
    function A2() {
    }
    return A2.getOrigin = function(e) {
      var t = A2._link;
      return t ? (t.href = e, t.href = t.href, t.protocol + t.hostname + t.port) : "about:blank";
    }, A2.isSameOrigin = function(e) {
      return A2.getOrigin(e) === A2._origin;
    }, A2.setContext = function(e) {
      A2._link = e.document.createElement("a"), A2._origin = A2.getOrigin(e.location.href);
    }, A2._origin = "about:blank", A2;
  }();
  var tx = function() {
    function A2(e, t) {
      this.context = e, this._options = t, this._cache = {};
    }
    return A2.prototype.addImage = function(e) {
      var t = Promise.resolve();
      return this.has(e) || (gl(e) || ix(e)) && (this._cache[e] = this.loadImage(e)).catch(function() {
      }), t;
    }, A2.prototype.match = function(e) {
      return this._cache[e];
    }, A2.prototype.loadImage = function(e) {
      return GA(this, void 0, void 0, function() {
        var t, r, n, s, i = this;
        return jA(this, function(l2) {
          switch (l2.label) {
            case 0:
              return t = l0.isSameOrigin(e), r = !Bl(e) && this._options.useCORS === true && TA.SUPPORT_CORS_IMAGES && !t, n = !Bl(e) && !t && !gl(e) && typeof this._options.proxy == "string" && TA.SUPPORT_CORS_XHR && !r, !t && this._options.allowTaint === false && !Bl(e) && !gl(e) && !n && !r ? [2] : (s = e, n ? [4, this.proxy(s)] : [3, 2]);
            case 1:
              s = l2.sent(), l2.label = 2;
            case 2:
              return this.context.logger.debug("Added image " + e.substring(0, 256)), [4, new Promise(function(a, o) {
                var c = new Image();
                c.onload = function() {
                  return a(c);
                }, c.onerror = o, (ax(s) || r) && (c.crossOrigin = "anonymous"), c.src = s, c.complete === true && setTimeout(function() {
                  return a(c);
                }, 500), i._options.imageTimeout > 0 && setTimeout(function() {
                  return o("Timed out (" + i._options.imageTimeout + "ms) loading image");
                }, i._options.imageTimeout);
              })];
            case 3:
              return [2, l2.sent()];
          }
        });
      });
    }, A2.prototype.has = function(e) {
      return typeof this._cache[e] < "u";
    }, A2.prototype.keys = function() {
      return Promise.resolve(Object.keys(this._cache));
    }, A2.prototype.proxy = function(e) {
      var t = this, r = this._options.proxy;
      if (!r) throw new Error("No proxy defined");
      var n = e.substring(0, 256);
      return new Promise(function(s, i) {
        var l2 = TA.SUPPORT_RESPONSE_TYPE ? "blob" : "text", a = new XMLHttpRequest();
        a.onload = function() {
          if (a.status === 200) if (l2 === "text") s(a.response);
          else {
            var f = new FileReader();
            f.addEventListener("load", function() {
              return s(f.result);
            }, false), f.addEventListener("error", function(d) {
              return i(d);
            }, false), f.readAsDataURL(a.response);
          }
          else i("Failed to proxy resource " + n + " with status code " + a.status);
        }, a.onerror = i;
        var o = r.indexOf("?") > -1 ? "&" : "?";
        if (a.open("GET", "" + r + o + "url=" + encodeURIComponent(e) + "&responseType=" + l2), l2 !== "text" && a instanceof XMLHttpRequest && (a.responseType = l2), t._options.imageTimeout) {
          var c = t._options.imageTimeout;
          a.timeout = c, a.ontimeout = function() {
            return i("Timed out (" + c + "ms) proxying " + n);
          };
        }
        a.send();
      });
    }, A2;
  }();
  var rx = /^data:image\/svg\+xml/i;
  var nx = /^data:image\/.*;base64,/i;
  var sx = /^data:image\/.*/i;
  var ix = function(A2) {
    return TA.SUPPORT_SVG_DRAWING || !lx(A2);
  };
  var Bl = function(A2) {
    return sx.test(A2);
  };
  var ax = function(A2) {
    return nx.test(A2);
  };
  var gl = function(A2) {
    return A2.substr(0, 4) === "blob";
  };
  var lx = function(A2) {
    return A2.substr(-3).toLowerCase() === "svg" || rx.test(A2);
  };
  var T = function() {
    function A2(e, t) {
      this.type = 0, this.x = e, this.y = t;
    }
    return A2.prototype.add = function(e, t) {
      return new A2(this.x + e, this.y + t);
    }, A2;
  }();
  var or = function(A2, e, t) {
    return new T(A2.x + (e.x - A2.x) * t, A2.y + (e.y - A2.y) * t);
  };
  var _s = function() {
    function A2(e, t, r, n) {
      this.type = 1, this.start = e, this.startControl = t, this.endControl = r, this.end = n;
    }
    return A2.prototype.subdivide = function(e, t) {
      var r = or(this.start, this.startControl, e), n = or(this.startControl, this.endControl, e), s = or(this.endControl, this.end, e), i = or(r, n, e), l2 = or(n, s, e), a = or(i, l2, e);
      return t ? new A2(this.start, r, i, a) : new A2(a, l2, s, this.end);
    }, A2.prototype.add = function(e, t) {
      return new A2(this.start.add(e, t), this.startControl.add(e, t), this.endControl.add(e, t), this.end.add(e, t));
    }, A2.prototype.reverse = function() {
      return new A2(this.end, this.endControl, this.startControl, this.start);
    }, A2;
  }();
  var ge = function(A2) {
    return A2.type === 1;
  };
  var ox = /* @__PURE__ */ function() {
    function A2(e) {
      var t = e.styles, r = e.bounds, n = dn(t.borderTopLeftRadius, r.width, r.height), s = n[0], i = n[1], l2 = dn(t.borderTopRightRadius, r.width, r.height), a = l2[0], o = l2[1], c = dn(t.borderBottomRightRadius, r.width, r.height), f = c[0], d = c[1], m2 = dn(t.borderBottomLeftRadius, r.width, r.height), w2 = m2[0], C2 = m2[1], U = [];
      U.push((s + a) / r.width), U.push((w2 + f) / r.width), U.push((i + C2) / r.height), U.push((o + d) / r.height);
      var h = Math.max.apply(Math, U);
      h > 1 && (s /= h, i /= h, a /= h, o /= h, f /= h, d /= h, w2 /= h, C2 /= h);
      var B = r.width - a, p = r.height - d, v2 = r.width - f, x = r.height - C2, F = t.borderTopWidth, I = t.borderRightWidth, H = t.borderBottomWidth, L = t.borderLeftWidth, K2 = aA(t.paddingTop, e.bounds.width), _ = aA(t.paddingRight, e.bounds.width), rA = aA(t.paddingBottom, e.bounds.width), V = aA(t.paddingLeft, e.bounds.width);
      this.topLeftBorderDoubleOuterBox = s > 0 || i > 0 ? dA(r.left + L / 3, r.top + F / 3, s - L / 3, i - F / 3, eA.TOP_LEFT) : new T(r.left + L / 3, r.top + F / 3), this.topRightBorderDoubleOuterBox = s > 0 || i > 0 ? dA(r.left + B, r.top + F / 3, a - I / 3, o - F / 3, eA.TOP_RIGHT) : new T(r.left + r.width - I / 3, r.top + F / 3), this.bottomRightBorderDoubleOuterBox = f > 0 || d > 0 ? dA(r.left + v2, r.top + p, f - I / 3, d - H / 3, eA.BOTTOM_RIGHT) : new T(r.left + r.width - I / 3, r.top + r.height - H / 3), this.bottomLeftBorderDoubleOuterBox = w2 > 0 || C2 > 0 ? dA(r.left + L / 3, r.top + x, w2 - L / 3, C2 - H / 3, eA.BOTTOM_LEFT) : new T(r.left + L / 3, r.top + r.height - H / 3), this.topLeftBorderDoubleInnerBox = s > 0 || i > 0 ? dA(r.left + L * 2 / 3, r.top + F * 2 / 3, s - L * 2 / 3, i - F * 2 / 3, eA.TOP_LEFT) : new T(r.left + L * 2 / 3, r.top + F * 2 / 3), this.topRightBorderDoubleInnerBox = s > 0 || i > 0 ? dA(r.left + B, r.top + F * 2 / 3, a - I * 2 / 3, o - F * 2 / 3, eA.TOP_RIGHT) : new T(r.left + r.width - I * 2 / 3, r.top + F * 2 / 3), this.bottomRightBorderDoubleInnerBox = f > 0 || d > 0 ? dA(r.left + v2, r.top + p, f - I * 2 / 3, d - H * 2 / 3, eA.BOTTOM_RIGHT) : new T(r.left + r.width - I * 2 / 3, r.top + r.height - H * 2 / 3), this.bottomLeftBorderDoubleInnerBox = w2 > 0 || C2 > 0 ? dA(r.left + L * 2 / 3, r.top + x, w2 - L * 2 / 3, C2 - H * 2 / 3, eA.BOTTOM_LEFT) : new T(r.left + L * 2 / 3, r.top + r.height - H * 2 / 3), this.topLeftBorderStroke = s > 0 || i > 0 ? dA(r.left + L / 2, r.top + F / 2, s - L / 2, i - F / 2, eA.TOP_LEFT) : new T(r.left + L / 2, r.top + F / 2), this.topRightBorderStroke = s > 0 || i > 0 ? dA(r.left + B, r.top + F / 2, a - I / 2, o - F / 2, eA.TOP_RIGHT) : new T(r.left + r.width - I / 2, r.top + F / 2), this.bottomRightBorderStroke = f > 0 || d > 0 ? dA(r.left + v2, r.top + p, f - I / 2, d - H / 2, eA.BOTTOM_RIGHT) : new T(r.left + r.width - I / 2, r.top + r.height - H / 2), this.bottomLeftBorderStroke = w2 > 0 || C2 > 0 ? dA(r.left + L / 2, r.top + x, w2 - L / 2, C2 - H / 2, eA.BOTTOM_LEFT) : new T(r.left + L / 2, r.top + r.height - H / 2), this.topLeftBorderBox = s > 0 || i > 0 ? dA(r.left, r.top, s, i, eA.TOP_LEFT) : new T(r.left, r.top), this.topRightBorderBox = a > 0 || o > 0 ? dA(r.left + B, r.top, a, o, eA.TOP_RIGHT) : new T(r.left + r.width, r.top), this.bottomRightBorderBox = f > 0 || d > 0 ? dA(r.left + v2, r.top + p, f, d, eA.BOTTOM_RIGHT) : new T(r.left + r.width, r.top + r.height), this.bottomLeftBorderBox = w2 > 0 || C2 > 0 ? dA(r.left, r.top + x, w2, C2, eA.BOTTOM_LEFT) : new T(r.left, r.top + r.height), this.topLeftPaddingBox = s > 0 || i > 0 ? dA(r.left + L, r.top + F, Math.max(0, s - L), Math.max(0, i - F), eA.TOP_LEFT) : new T(r.left + L, r.top + F), this.topRightPaddingBox = a > 0 || o > 0 ? dA(r.left + Math.min(B, r.width - I), r.top + F, B > r.width + I ? 0 : Math.max(0, a - I), Math.max(0, o - F), eA.TOP_RIGHT) : new T(r.left + r.width - I, r.top + F), this.bottomRightPaddingBox = f > 0 || d > 0 ? dA(r.left + Math.min(v2, r.width - L), r.top + Math.min(p, r.height - H), Math.max(0, f - I), Math.max(0, d - H), eA.BOTTOM_RIGHT) : new T(r.left + r.width - I, r.top + r.height - H), this.bottomLeftPaddingBox = w2 > 0 || C2 > 0 ? dA(r.left + L, r.top + Math.min(x, r.height - H), Math.max(0, w2 - L), Math.max(0, C2 - H), eA.BOTTOM_LEFT) : new T(r.left + L, r.top + r.height - H), this.topLeftContentBox = s > 0 || i > 0 ? dA(r.left + L + V, r.top + F + K2, Math.max(0, s - (L + V)), Math.max(0, i - (F + K2)), eA.TOP_LEFT) : new T(r.left + L + V, r.top + F + K2), this.topRightContentBox = a > 0 || o > 0 ? dA(r.left + Math.min(B, r.width + L + V), r.top + F + K2, B > r.width + L + V ? 0 : a - L + V, o - (F + K2), eA.TOP_RIGHT) : new T(r.left + r.width - (I + _), r.top + F + K2), this.bottomRightContentBox = f > 0 || d > 0 ? dA(r.left + Math.min(v2, r.width - (L + V)), r.top + Math.min(p, r.height + F + K2), Math.max(0, f - (I + _)), d - (H + rA), eA.BOTTOM_RIGHT) : new T(r.left + r.width - (I + _), r.top + r.height - (H + rA)), this.bottomLeftContentBox = w2 > 0 || C2 > 0 ? dA(r.left + L + V, r.top + x, Math.max(0, w2 - (L + V)), C2 - (H + rA), eA.BOTTOM_LEFT) : new T(r.left + L + V, r.top + r.height - (H + rA));
    }
    return A2;
  }();
  var eA;
  (function(A2) {
    A2[A2.TOP_LEFT = 0] = "TOP_LEFT", A2[A2.TOP_RIGHT = 1] = "TOP_RIGHT", A2[A2.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", A2[A2.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
  })(eA || (eA = {}));
  var dA = function(A2, e, t, r, n) {
    var s = 4 * ((Math.sqrt(2) - 1) / 3), i = t * s, l2 = r * s, a = A2 + t, o = e + r;
    switch (n) {
      case eA.TOP_LEFT:
        return new _s(new T(A2, o), new T(A2, o - l2), new T(a - i, e), new T(a, e));
      case eA.TOP_RIGHT:
        return new _s(new T(A2, e), new T(A2 + i, e), new T(a, o - l2), new T(a, o));
      case eA.BOTTOM_RIGHT:
        return new _s(new T(a, e), new T(a, e + l2), new T(A2 + i, o), new T(A2, o));
      case eA.BOTTOM_LEFT:
      default:
        return new _s(new T(a, o), new T(a - i, o), new T(A2, e + l2), new T(A2, e));
    }
  };
  var Gi = function(A2) {
    return [A2.topLeftBorderBox, A2.topRightBorderBox, A2.bottomRightBorderBox, A2.bottomLeftBorderBox];
  };
  var ux = function(A2) {
    return [A2.topLeftContentBox, A2.topRightContentBox, A2.bottomRightContentBox, A2.bottomLeftContentBox];
  };
  var Xi = function(A2) {
    return [A2.topLeftPaddingBox, A2.topRightPaddingBox, A2.bottomRightPaddingBox, A2.bottomLeftPaddingBox];
  };
  var cx = /* @__PURE__ */ function() {
    function A2(e, t, r) {
      this.offsetX = e, this.offsetY = t, this.matrix = r, this.type = 0, this.target = 6;
    }
    return A2;
  }();
  var Vs = /* @__PURE__ */ function() {
    function A2(e, t) {
      this.path = e, this.target = t, this.type = 1;
    }
    return A2;
  }();
  var fx = /* @__PURE__ */ function() {
    function A2(e) {
      this.opacity = e, this.type = 2, this.target = 6;
    }
    return A2;
  }();
  var dx = function(A2) {
    return A2.type === 0;
  };
  var o0 = function(A2) {
    return A2.type === 1;
  };
  var Bx = function(A2) {
    return A2.type === 2;
  };
  var vd = function(A2, e) {
    return A2.length === e.length ? A2.some(function(t, r) {
      return t === e[r];
    }) : false;
  };
  var gx = function(A2, e, t, r, n) {
    return A2.map(function(s, i) {
      switch (i) {
        case 0:
          return s.add(e, t);
        case 1:
          return s.add(e + r, t);
        case 2:
          return s.add(e + r, t + n);
        case 3:
          return s.add(e, t + n);
      }
      return s;
    });
  };
  var u0 = /* @__PURE__ */ function() {
    function A2(e) {
      this.element = e, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
    }
    return A2;
  }();
  var c0 = function() {
    function A2(e, t) {
      if (this.container = e, this.parent = t, this.effects = [], this.curves = new ox(this.container), this.container.styles.opacity < 1 && this.effects.push(new fx(this.container.styles.opacity)), this.container.styles.transform !== null) {
        var r = this.container.bounds.left + this.container.styles.transformOrigin[0].number, n = this.container.bounds.top + this.container.styles.transformOrigin[1].number, s = this.container.styles.transform;
        this.effects.push(new cx(r, n, s));
      }
      if (this.container.styles.overflowX !== 0) {
        var i = Gi(this.curves), l2 = Xi(this.curves);
        vd(i, l2) ? this.effects.push(new Vs(i, 6)) : (this.effects.push(new Vs(i, 2)), this.effects.push(new Vs(l2, 4)));
      }
    }
    return A2.prototype.getEffects = function(e) {
      for (var t = [2, 3].indexOf(this.container.styles.position) === -1, r = this.parent, n = this.effects.slice(0); r; ) {
        var s = r.effects.filter(function(a) {
          return !o0(a);
        });
        if (t || r.container.styles.position !== 0 || !r.parent) {
          if (n.unshift.apply(n, s), t = [2, 3].indexOf(r.container.styles.position) === -1, r.container.styles.overflowX !== 0) {
            var i = Gi(r.curves), l2 = Xi(r.curves);
            vd(i, l2) || n.unshift(new Vs(l2, 6));
          }
        } else n.unshift.apply(n, s);
        r = r.parent;
      }
      return n.filter(function(a) {
        return HA(a.target, e);
      });
    }, A2;
  }();
  var Ro = function(A2, e, t, r) {
    A2.container.elements.forEach(function(n) {
      var s = HA(n.flags, 4), i = HA(n.flags, 2), l2 = new c0(n, A2);
      HA(n.styles.display, 2048) && r.push(l2);
      var a = HA(n.flags, 8) ? [] : r;
      if (s || i) {
        var o = s || n.styles.isPositioned() ? t : e, c = new u0(l2);
        if (n.styles.isPositioned() || n.styles.opacity < 1 || n.styles.isTransformed()) {
          var f = n.styles.zIndex.order;
          if (f < 0) {
            var d = 0;
            o.negativeZIndex.some(function(w2, C2) {
              return f > w2.element.container.styles.zIndex.order ? (d = C2, false) : d > 0;
            }), o.negativeZIndex.splice(d, 0, c);
          } else if (f > 0) {
            var m2 = 0;
            o.positiveZIndex.some(function(w2, C2) {
              return f >= w2.element.container.styles.zIndex.order ? (m2 = C2 + 1, false) : m2 > 0;
            }), o.positiveZIndex.splice(m2, 0, c);
          } else o.zeroOrAutoZIndexOrTransformedOrOpacity.push(c);
        } else n.styles.isFloating() ? o.nonPositionedFloats.push(c) : o.nonPositionedInlineLevel.push(c);
        Ro(l2, c, s ? c : t, a);
      } else n.styles.isInlineLevel() ? e.inlineLevel.push(l2) : e.nonInlineLevel.push(l2), Ro(l2, e, t, a);
      HA(n.flags, 8) && f0(n, a);
    });
  };
  var f0 = function(A2, e) {
    for (var t = A2 instanceof ko ? A2.start : 1, r = A2 instanceof ko ? A2.reversed : false, n = 0; n < e.length; n++) {
      var s = e[n];
      s.container instanceof Jh && typeof s.container.value == "number" && s.container.value !== 0 && (t = s.container.value), s.listValue = Yn(t, s.container.styles.listStyleType, true), t += r ? -1 : 1;
    }
  };
  var hx = function(A2) {
    var e = new c0(A2, null), t = new u0(e), r = [];
    return Ro(e, t, t, r), f0(e.container, r), t;
  };
  var Ud = function(A2, e) {
    switch (e) {
      case 0:
        return pe(A2.topLeftBorderBox, A2.topLeftPaddingBox, A2.topRightBorderBox, A2.topRightPaddingBox);
      case 1:
        return pe(A2.topRightBorderBox, A2.topRightPaddingBox, A2.bottomRightBorderBox, A2.bottomRightPaddingBox);
      case 2:
        return pe(A2.bottomRightBorderBox, A2.bottomRightPaddingBox, A2.bottomLeftBorderBox, A2.bottomLeftPaddingBox);
      case 3:
      default:
        return pe(A2.bottomLeftBorderBox, A2.bottomLeftPaddingBox, A2.topLeftBorderBox, A2.topLeftPaddingBox);
    }
  };
  var wx = function(A2, e) {
    switch (e) {
      case 0:
        return pe(A2.topLeftBorderBox, A2.topLeftBorderDoubleOuterBox, A2.topRightBorderBox, A2.topRightBorderDoubleOuterBox);
      case 1:
        return pe(A2.topRightBorderBox, A2.topRightBorderDoubleOuterBox, A2.bottomRightBorderBox, A2.bottomRightBorderDoubleOuterBox);
      case 2:
        return pe(A2.bottomRightBorderBox, A2.bottomRightBorderDoubleOuterBox, A2.bottomLeftBorderBox, A2.bottomLeftBorderDoubleOuterBox);
      case 3:
      default:
        return pe(A2.bottomLeftBorderBox, A2.bottomLeftBorderDoubleOuterBox, A2.topLeftBorderBox, A2.topLeftBorderDoubleOuterBox);
    }
  };
  var px = function(A2, e) {
    switch (e) {
      case 0:
        return pe(A2.topLeftBorderDoubleInnerBox, A2.topLeftPaddingBox, A2.topRightBorderDoubleInnerBox, A2.topRightPaddingBox);
      case 1:
        return pe(A2.topRightBorderDoubleInnerBox, A2.topRightPaddingBox, A2.bottomRightBorderDoubleInnerBox, A2.bottomRightPaddingBox);
      case 2:
        return pe(A2.bottomRightBorderDoubleInnerBox, A2.bottomRightPaddingBox, A2.bottomLeftBorderDoubleInnerBox, A2.bottomLeftPaddingBox);
      case 3:
      default:
        return pe(A2.bottomLeftBorderDoubleInnerBox, A2.bottomLeftPaddingBox, A2.topLeftBorderDoubleInnerBox, A2.topLeftPaddingBox);
    }
  };
  var mx = function(A2, e) {
    switch (e) {
      case 0:
        return Gs(A2.topLeftBorderStroke, A2.topRightBorderStroke);
      case 1:
        return Gs(A2.topRightBorderStroke, A2.bottomRightBorderStroke);
      case 2:
        return Gs(A2.bottomRightBorderStroke, A2.bottomLeftBorderStroke);
      case 3:
      default:
        return Gs(A2.bottomLeftBorderStroke, A2.topLeftBorderStroke);
    }
  };
  var Gs = function(A2, e) {
    var t = [];
    return ge(A2) ? t.push(A2.subdivide(0.5, false)) : t.push(A2), ge(e) ? t.push(e.subdivide(0.5, true)) : t.push(e), t;
  };
  var pe = function(A2, e, t, r) {
    var n = [];
    return ge(A2) ? n.push(A2.subdivide(0.5, false)) : n.push(A2), ge(t) ? n.push(t.subdivide(0.5, true)) : n.push(t), ge(r) ? n.push(r.subdivide(0.5, true).reverse()) : n.push(r), ge(e) ? n.push(e.subdivide(0.5, false).reverse()) : n.push(e), n;
  };
  var d0 = function(A2) {
    var e = A2.bounds, t = A2.styles;
    return e.add(t.borderLeftWidth, t.borderTopWidth, -(t.borderRightWidth + t.borderLeftWidth), -(t.borderTopWidth + t.borderBottomWidth));
  };
  var Wi = function(A2) {
    var e = A2.styles, t = A2.bounds, r = aA(e.paddingLeft, t.width), n = aA(e.paddingRight, t.width), s = aA(e.paddingTop, t.width), i = aA(e.paddingBottom, t.width);
    return t.add(r + e.borderLeftWidth, s + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + r + n), -(e.borderTopWidth + e.borderBottomWidth + s + i));
  };
  var Cx = function(A2, e) {
    return A2 === 0 ? e.bounds : A2 === 2 ? Wi(e) : d0(e);
  };
  var Qx = function(A2, e) {
    return A2 === 0 ? e.bounds : A2 === 2 ? Wi(e) : d0(e);
  };
  var hl = function(A2, e, t) {
    var r = Cx(fr(A2.styles.backgroundOrigin, e), A2), n = Qx(fr(A2.styles.backgroundClip, e), A2), s = vx(fr(A2.styles.backgroundSize, e), t, r), i = s[0], l2 = s[1], a = dn(fr(A2.styles.backgroundPosition, e), r.width - i, r.height - l2), o = Ux(fr(A2.styles.backgroundRepeat, e), a, s, r, n), c = Math.round(r.left + a[0]), f = Math.round(r.top + a[1]);
    return [o, c, f, i, l2];
  };
  var ur = function(A2) {
    return nA(A2) && A2.value === Nr.AUTO;
  };
  var Xs = function(A2) {
    return typeof A2 == "number";
  };
  var vx = function(A2, e, t) {
    var r = e[0], n = e[1], s = e[2], i = A2[0], l2 = A2[1];
    if (!i) return [0, 0];
    if (xA(i) && l2 && xA(l2)) return [aA(i, t.width), aA(l2, t.height)];
    var a = Xs(s);
    if (nA(i) && (i.value === Nr.CONTAIN || i.value === Nr.COVER)) {
      if (Xs(s)) {
        var o = t.width / t.height;
        return o < s != (i.value === Nr.COVER) ? [t.width, t.width / s] : [t.height * s, t.height];
      }
      return [t.width, t.height];
    }
    var c = Xs(r), f = Xs(n), d = c || f;
    if (ur(i) && (!l2 || ur(l2))) {
      if (c && f) return [r, n];
      if (!a && !d) return [t.width, t.height];
      if (d && a) {
        var m2 = c ? r : n * s, w2 = f ? n : r / s;
        return [m2, w2];
      }
      var C2 = c ? r : t.width, U = f ? n : t.height;
      return [C2, U];
    }
    if (a) {
      var h = 0, B = 0;
      return xA(i) ? h = aA(i, t.width) : xA(l2) && (B = aA(l2, t.height)), ur(i) ? h = B * s : (!l2 || ur(l2)) && (B = h / s), [h, B];
    }
    var p = null, v2 = null;
    if (xA(i) ? p = aA(i, t.width) : l2 && xA(l2) && (v2 = aA(l2, t.height)), p !== null && (!l2 || ur(l2)) && (v2 = c && f ? p / r * n : t.height), v2 !== null && ur(i) && (p = c && f ? v2 / n * r : t.width), p !== null && v2 !== null) return [p, v2];
    throw new Error("Unable to calculate background-size for element");
  };
  var fr = function(A2, e) {
    var t = A2[e];
    return typeof t > "u" ? A2[0] : t;
  };
  var Ux = function(A2, e, t, r, n) {
    var s = e[0], i = e[1], l2 = t[0], a = t[1];
    switch (A2) {
      case 2:
        return [new T(Math.round(r.left), Math.round(r.top + i)), new T(Math.round(r.left + r.width), Math.round(r.top + i)), new T(Math.round(r.left + r.width), Math.round(a + r.top + i)), new T(Math.round(r.left), Math.round(a + r.top + i))];
      case 3:
        return [new T(Math.round(r.left + s), Math.round(r.top)), new T(Math.round(r.left + s + l2), Math.round(r.top)), new T(Math.round(r.left + s + l2), Math.round(r.height + r.top)), new T(Math.round(r.left + s), Math.round(r.height + r.top))];
      case 1:
        return [new T(Math.round(r.left + s), Math.round(r.top + i)), new T(Math.round(r.left + s + l2), Math.round(r.top + i)), new T(Math.round(r.left + s + l2), Math.round(r.top + i + a)), new T(Math.round(r.left + s), Math.round(r.top + i + a))];
      default:
        return [new T(Math.round(n.left), Math.round(n.top)), new T(Math.round(n.left + n.width), Math.round(n.top)), new T(Math.round(n.left + n.width), Math.round(n.height + n.top)), new T(Math.round(n.left), Math.round(n.height + n.top))];
    }
  };
  var Fx = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  var Fd = "Hidden Text";
  var xx = function() {
    function A2(e) {
      this._data = {}, this._document = e;
    }
    return A2.prototype.parseMetrics = function(e, t) {
      var r = this._document.createElement("div"), n = this._document.createElement("img"), s = this._document.createElement("span"), i = this._document.body;
      r.style.visibility = "hidden", r.style.fontFamily = e, r.style.fontSize = t, r.style.margin = "0", r.style.padding = "0", r.style.whiteSpace = "nowrap", i.appendChild(r), n.src = Fx, n.width = 1, n.height = 1, n.style.margin = "0", n.style.padding = "0", n.style.verticalAlign = "baseline", s.style.fontFamily = e, s.style.fontSize = t, s.style.margin = "0", s.style.padding = "0", s.appendChild(this._document.createTextNode(Fd)), r.appendChild(s), r.appendChild(n);
      var l2 = n.offsetTop - s.offsetTop + 2;
      r.removeChild(s), r.appendChild(this._document.createTextNode(Fd)), r.style.lineHeight = "normal", n.style.verticalAlign = "super";
      var a = n.offsetTop - r.offsetTop + 2;
      return i.removeChild(r), { baseline: l2, middle: a };
    }, A2.prototype.getMetrics = function(e, t) {
      var r = e + " " + t;
      return typeof this._data[r] > "u" && (this._data[r] = this.parseMetrics(e, t)), this._data[r];
    }, A2;
  }();
  var B0 = /* @__PURE__ */ function() {
    function A2(e, t) {
      this.context = e, this.options = t;
    }
    return A2;
  }();
  var yx = 1e4;
  var Ex = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n._activeEffects = [], n.canvas = r.canvas ? r.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), r.canvas || (n.canvas.width = Math.floor(r.width * r.scale), n.canvas.height = Math.floor(r.height * r.scale), n.canvas.style.width = r.width + "px", n.canvas.style.height = r.height + "px"), n.fontMetrics = new xx(document), n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-r.x, -r.y), n.ctx.textBaseline = "bottom", n._activeEffects = [], n.context.logger.debug("Canvas renderer initialized (" + r.width + "x" + r.height + ") with scale " + r.scale), n;
    }
    return e.prototype.applyEffects = function(t) {
      for (var r = this; this._activeEffects.length; ) this.popEffect();
      t.forEach(function(n) {
        return r.applyEffect(n);
      });
    }, e.prototype.applyEffect = function(t) {
      this.ctx.save(), Bx(t) && (this.ctx.globalAlpha = t.opacity), dx(t) && (this.ctx.translate(t.offsetX, t.offsetY), this.ctx.transform(t.matrix[0], t.matrix[1], t.matrix[2], t.matrix[3], t.matrix[4], t.matrix[5]), this.ctx.translate(-t.offsetX, -t.offsetY)), o0(t) && (this.path(t.path), this.ctx.clip()), this._activeEffects.push(t);
    }, e.prototype.popEffect = function() {
      this._activeEffects.pop(), this.ctx.restore();
    }, e.prototype.renderStack = function(t) {
      return GA(this, void 0, void 0, function() {
        var r;
        return jA(this, function(n) {
          switch (n.label) {
            case 0:
              return r = t.element.container.styles, r.isVisible() ? [4, this.renderStackContent(t)] : [3, 2];
            case 1:
              n.sent(), n.label = 2;
            case 2:
              return [2];
          }
        });
      });
    }, e.prototype.renderNode = function(t) {
      return GA(this, void 0, void 0, function() {
        return jA(this, function(r) {
          switch (r.label) {
            case 0:
              if (HA(t.container.flags, 16)) debugger;
              return t.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(t)] : [3, 3];
            case 1:
              return r.sent(), [4, this.renderNodeContent(t)];
            case 2:
              r.sent(), r.label = 3;
            case 3:
              return [2];
          }
        });
      });
    }, e.prototype.renderTextWithLetterSpacing = function(t, r, n) {
      var s = this;
      if (r === 0) this.ctx.fillText(t.text, t.bounds.left, t.bounds.top + n);
      else {
        var i = _u(t.text);
        i.reduce(function(l2, a) {
          return s.ctx.fillText(a, l2, t.bounds.top + n), l2 + s.ctx.measureText(a).width;
        }, t.bounds.left);
      }
    }, e.prototype.createFontStyle = function(t) {
      var r = t.fontVariant.filter(function(i) {
        return i === "normal" || i === "small-caps";
      }).join(""), n = Lx(t.fontFamily).join(", "), s = ns(t.fontSize) ? "" + t.fontSize.number + t.fontSize.unit : t.fontSize.number + "px";
      return [[t.fontStyle, r, t.fontWeight, s, n].join(" "), n, s];
    }, e.prototype.renderTextNode = function(t, r) {
      return GA(this, void 0, void 0, function() {
        var n, s, i, l2, a, o, c, f, d = this;
        return jA(this, function(m2) {
          return n = this.createFontStyle(r), s = n[0], i = n[1], l2 = n[2], this.ctx.font = s, this.ctx.direction = r.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", a = this.fontMetrics.getMetrics(i, l2), o = a.baseline, c = a.middle, f = r.paintOrder, t.textBounds.forEach(function(w2) {
            f.forEach(function(C2) {
              switch (C2) {
                case 0:
                  d.ctx.fillStyle = bA(r.color), d.renderTextWithLetterSpacing(w2, r.letterSpacing, o);
                  var U = r.textShadow;
                  U.length && w2.text.trim().length && (U.slice(0).reverse().forEach(function(h) {
                    d.ctx.shadowColor = bA(h.color), d.ctx.shadowOffsetX = h.offsetX.number * d.options.scale, d.ctx.shadowOffsetY = h.offsetY.number * d.options.scale, d.ctx.shadowBlur = h.blur.number, d.renderTextWithLetterSpacing(w2, r.letterSpacing, o);
                  }), d.ctx.shadowColor = "", d.ctx.shadowOffsetX = 0, d.ctx.shadowOffsetY = 0, d.ctx.shadowBlur = 0), r.textDecorationLine.length && (d.ctx.fillStyle = bA(r.textDecorationColor || r.color), r.textDecorationLine.forEach(function(h) {
                    switch (h) {
                      case 1:
                        d.ctx.fillRect(w2.bounds.left, Math.round(w2.bounds.top + o), w2.bounds.width, 1);
                        break;
                      case 2:
                        d.ctx.fillRect(w2.bounds.left, Math.round(w2.bounds.top), w2.bounds.width, 1);
                        break;
                      case 3:
                        d.ctx.fillRect(w2.bounds.left, Math.ceil(w2.bounds.top + c), w2.bounds.width, 1);
                        break;
                    }
                  }));
                  break;
                case 1:
                  r.webkitTextStrokeWidth && w2.text.trim().length && (d.ctx.strokeStyle = bA(r.webkitTextStrokeColor), d.ctx.lineWidth = r.webkitTextStrokeWidth, d.ctx.lineJoin = window.chrome ? "miter" : "round", d.ctx.strokeText(w2.text, w2.bounds.left, w2.bounds.top + o)), d.ctx.strokeStyle = "", d.ctx.lineWidth = 0, d.ctx.lineJoin = "miter";
                  break;
              }
            });
          }), [2];
        });
      });
    }, e.prototype.renderReplacedElement = function(t, r, n) {
      if (n && t.intrinsicWidth > 0 && t.intrinsicHeight > 0) {
        var s = Wi(t), i = Xi(r);
        this.path(i), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(n, 0, 0, t.intrinsicWidth, t.intrinsicHeight, s.left, s.top, s.width, s.height), this.ctx.restore();
      }
    }, e.prototype.renderNodeContent = function(t) {
      return GA(this, void 0, void 0, function() {
        var r, n, s, i, l2, a, B, B, o, c, f, d, v2, m2, w2, x, C2, U, h, B, p, v2, x;
        return jA(this, function(F) {
          switch (F.label) {
            case 0:
              this.applyEffects(t.getEffects(4)), r = t.container, n = t.curves, s = r.styles, i = 0, l2 = r.textNodes, F.label = 1;
            case 1:
              return i < l2.length ? (a = l2[i], [4, this.renderTextNode(a, s)]) : [3, 4];
            case 2:
              F.sent(), F.label = 3;
            case 3:
              return i++, [3, 1];
            case 4:
              if (!(r instanceof Xh)) return [3, 8];
              F.label = 5;
            case 5:
              return F.trys.push([5, 7, , 8]), [4, this.context.cache.match(r.src)];
            case 6:
              return B = F.sent(), this.renderReplacedElement(r, n, B), [3, 8];
            case 7:
              return F.sent(), this.context.logger.error("Error loading image " + r.src), [3, 8];
            case 8:
              if (r instanceof Wh && this.renderReplacedElement(r, n, r.canvas), !(r instanceof zh)) return [3, 12];
              F.label = 9;
            case 9:
              return F.trys.push([9, 11, , 12]), [4, this.context.cache.match(r.svg)];
            case 10:
              return B = F.sent(), this.renderReplacedElement(r, n, B), [3, 12];
            case 11:
              return F.sent(), this.context.logger.error("Error loading svg " + r.svg.substring(0, 255)), [3, 12];
            case 12:
              return r instanceof $h && r.tree ? (o = new e(this.context, { scale: this.options.scale, backgroundColor: r.backgroundColor, x: 0, y: 0, width: r.width, height: r.height }), [4, o.render(r.tree)]) : [3, 14];
            case 13:
              c = F.sent(), r.width && r.height && this.ctx.drawImage(c, 0, 0, r.width, r.height, r.bounds.left, r.bounds.top, r.bounds.width, r.bounds.height), F.label = 14;
            case 14:
              if (r instanceof Vu && (f = Math.min(r.bounds.width, r.bounds.height), r.type === ji ? r.checked && (this.ctx.save(), this.path([new T(r.bounds.left + f * 0.39363, r.bounds.top + f * 0.79), new T(r.bounds.left + f * 0.16, r.bounds.top + f * 0.5549), new T(r.bounds.left + f * 0.27347, r.bounds.top + f * 0.44071), new T(r.bounds.left + f * 0.39694, r.bounds.top + f * 0.5649), new T(r.bounds.left + f * 0.72983, r.bounds.top + f * 0.23), new T(r.bounds.left + f * 0.84, r.bounds.top + f * 0.34085), new T(r.bounds.left + f * 0.39363, r.bounds.top + f * 0.79)]), this.ctx.fillStyle = bA(cd), this.ctx.fill(), this.ctx.restore()) : r.type === Pi && r.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(r.bounds.left + f / 2, r.bounds.top + f / 2, f / 4, 0, Math.PI * 2, true), this.ctx.fillStyle = bA(cd), this.ctx.fill(), this.ctx.restore())), Ix(r) && r.value.length) {
                switch (d = this.createFontStyle(s), v2 = d[0], m2 = d[1], w2 = this.fontMetrics.getMetrics(v2, m2).baseline, this.ctx.font = v2, this.ctx.fillStyle = bA(s.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = Sx(r.styles.textAlign), x = Wi(r), C2 = 0, r.styles.textAlign) {
                  case 1:
                    C2 += x.width / 2;
                    break;
                  case 2:
                    C2 += x.width;
                    break;
                }
                U = x.add(C2, 0, 0, -x.height / 2 + 1), this.ctx.save(), this.path([new T(x.left, x.top), new T(x.left + x.width, x.top), new T(x.left + x.width, x.top + x.height), new T(x.left, x.top + x.height)]), this.ctx.clip(), this.renderTextWithLetterSpacing(new Hn(r.value, U), s.letterSpacing, w2), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
              }
              if (!HA(r.styles.display, 2048)) return [3, 20];
              if (r.styles.listStyleImage === null) return [3, 19];
              if (h = r.styles.listStyleImage, h.type !== 0) return [3, 18];
              B = void 0, p = h.url, F.label = 15;
            case 15:
              return F.trys.push([15, 17, , 18]), [4, this.context.cache.match(p)];
            case 16:
              return B = F.sent(), this.ctx.drawImage(B, r.bounds.left - (B.width + 10), r.bounds.top), [3, 18];
            case 17:
              return F.sent(), this.context.logger.error("Error loading list-style-image " + p), [3, 18];
            case 18:
              return [3, 20];
            case 19:
              t.listValue && r.styles.listStyleType !== -1 && (v2 = this.createFontStyle(s)[0], this.ctx.font = v2, this.ctx.fillStyle = bA(s.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", x = new tt(r.bounds.left, r.bounds.top + aA(r.styles.paddingTop, r.bounds.width), r.bounds.width, zf(s.lineHeight, s.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new Hn(t.listValue, x), s.letterSpacing, zf(s.lineHeight, s.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), F.label = 20;
            case 20:
              return [2];
          }
        });
      });
    }, e.prototype.renderStackContent = function(t) {
      return GA(this, void 0, void 0, function() {
        var r, n, h, s, i, h, l2, a, h, o, c, h, f, d, h, m2, w2, h, C2, U, h;
        return jA(this, function(B) {
          switch (B.label) {
            case 0:
              if (HA(t.element.container.flags, 16)) debugger;
              return [4, this.renderNodeBackgroundAndBorders(t.element)];
            case 1:
              B.sent(), r = 0, n = t.negativeZIndex, B.label = 2;
            case 2:
              return r < n.length ? (h = n[r], [4, this.renderStack(h)]) : [3, 5];
            case 3:
              B.sent(), B.label = 4;
            case 4:
              return r++, [3, 2];
            case 5:
              return [4, this.renderNodeContent(t.element)];
            case 6:
              B.sent(), s = 0, i = t.nonInlineLevel, B.label = 7;
            case 7:
              return s < i.length ? (h = i[s], [4, this.renderNode(h)]) : [3, 10];
            case 8:
              B.sent(), B.label = 9;
            case 9:
              return s++, [3, 7];
            case 10:
              l2 = 0, a = t.nonPositionedFloats, B.label = 11;
            case 11:
              return l2 < a.length ? (h = a[l2], [4, this.renderStack(h)]) : [3, 14];
            case 12:
              B.sent(), B.label = 13;
            case 13:
              return l2++, [3, 11];
            case 14:
              o = 0, c = t.nonPositionedInlineLevel, B.label = 15;
            case 15:
              return o < c.length ? (h = c[o], [4, this.renderStack(h)]) : [3, 18];
            case 16:
              B.sent(), B.label = 17;
            case 17:
              return o++, [3, 15];
            case 18:
              f = 0, d = t.inlineLevel, B.label = 19;
            case 19:
              return f < d.length ? (h = d[f], [4, this.renderNode(h)]) : [3, 22];
            case 20:
              B.sent(), B.label = 21;
            case 21:
              return f++, [3, 19];
            case 22:
              m2 = 0, w2 = t.zeroOrAutoZIndexOrTransformedOrOpacity, B.label = 23;
            case 23:
              return m2 < w2.length ? (h = w2[m2], [4, this.renderStack(h)]) : [3, 26];
            case 24:
              B.sent(), B.label = 25;
            case 25:
              return m2++, [3, 23];
            case 26:
              C2 = 0, U = t.positiveZIndex, B.label = 27;
            case 27:
              return C2 < U.length ? (h = U[C2], [4, this.renderStack(h)]) : [3, 30];
            case 28:
              B.sent(), B.label = 29;
            case 29:
              return C2++, [3, 27];
            case 30:
              return [2];
          }
        });
      });
    }, e.prototype.mask = function(t) {
      this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(t.slice(0).reverse()), this.ctx.closePath();
    }, e.prototype.path = function(t) {
      this.ctx.beginPath(), this.formatPath(t), this.ctx.closePath();
    }, e.prototype.formatPath = function(t) {
      var r = this;
      t.forEach(function(n, s) {
        var i = ge(n) ? n.start : n;
        s === 0 ? r.ctx.moveTo(i.x, i.y) : r.ctx.lineTo(i.x, i.y), ge(n) && r.ctx.bezierCurveTo(n.startControl.x, n.startControl.y, n.endControl.x, n.endControl.y, n.end.x, n.end.y);
      });
    }, e.prototype.renderRepeat = function(t, r, n, s) {
      this.path(t), this.ctx.fillStyle = r, this.ctx.translate(n, s), this.ctx.fill(), this.ctx.translate(-n, -s);
    }, e.prototype.resizeImage = function(t, r, n) {
      var s;
      if (t.width === r && t.height === n) return t;
      var i = (s = this.canvas.ownerDocument) !== null && s !== void 0 ? s : document, l2 = i.createElement("canvas");
      l2.width = Math.max(1, r), l2.height = Math.max(1, n);
      var a = l2.getContext("2d");
      return a.drawImage(t, 0, 0, t.width, t.height, 0, 0, r, n), l2;
    }, e.prototype.renderBackgroundImage = function(t) {
      return GA(this, void 0, void 0, function() {
        var r, n, s, i, l2, a;
        return jA(this, function(o) {
          switch (o.label) {
            case 0:
              r = t.styles.backgroundImage.length - 1, n = function(c) {
                var f, d, m2, K2, AA, $, V, G, H, w2, K2, AA, $, V, G, C2, U, h, B, p, v2, x, F, I, H, L, K2, _, rA, V, G, Z, AA, $, b, j, Q, g, E, N2, k, M2;
                return jA(this, function(R) {
                  switch (R.label) {
                    case 0:
                      if (c.type !== 0) return [3, 5];
                      f = void 0, d = c.url, R.label = 1;
                    case 1:
                      return R.trys.push([1, 3, , 4]), [4, s.context.cache.match(d)];
                    case 2:
                      return f = R.sent(), [3, 4];
                    case 3:
                      return R.sent(), s.context.logger.error("Error loading background-image " + d), [3, 4];
                    case 4:
                      return f && (m2 = hl(t, r, [f.width, f.height, f.width / f.height]), K2 = m2[0], AA = m2[1], $ = m2[2], V = m2[3], G = m2[4], H = s.ctx.createPattern(s.resizeImage(f, V, G), "repeat"), s.renderRepeat(K2, H, AA, $)), [3, 6];
                    case 5:
                      dv(c) ? (w2 = hl(t, r, [null, null, null]), K2 = w2[0], AA = w2[1], $ = w2[2], V = w2[3], G = w2[4], C2 = lv(c.angle, V, G), U = C2[0], h = C2[1], B = C2[2], p = C2[3], v2 = C2[4], x = document.createElement("canvas"), x.width = V, x.height = G, F = x.getContext("2d"), I = F.createLinearGradient(h, p, B, v2), Xf(c.stops, U).forEach(function(y2) {
                        return I.addColorStop(y2.stop, bA(y2.color));
                      }), F.fillStyle = I, F.fillRect(0, 0, V, G), V > 0 && G > 0 && (H = s.ctx.createPattern(x, "repeat"), s.renderRepeat(K2, H, AA, $))) : Bv(c) && (L = hl(t, r, [null, null, null]), K2 = L[0], _ = L[1], rA = L[2], V = L[3], G = L[4], Z = c.position.length === 0 ? [Ou] : c.position, AA = aA(Z[0], V), $ = aA(Z[Z.length - 1], G), b = ov(c, AA, $, V, G), j = b[0], Q = b[1], j > 0 && Q > 0 && (g = s.ctx.createRadialGradient(_ + AA, rA + $, 0, _ + AA, rA + $, j), Xf(c.stops, j * 2).forEach(function(y2) {
                        return g.addColorStop(y2.stop, bA(y2.color));
                      }), s.path(K2), s.ctx.fillStyle = g, j !== Q ? (E = t.bounds.left + 0.5 * t.bounds.width, N2 = t.bounds.top + 0.5 * t.bounds.height, k = Q / j, M2 = 1 / k, s.ctx.save(), s.ctx.translate(E, N2), s.ctx.transform(1, 0, 0, k, 0, 0), s.ctx.translate(-E, -N2), s.ctx.fillRect(_, M2 * (rA - N2) + N2, V, G * M2), s.ctx.restore()) : s.ctx.fill())), R.label = 6;
                    case 6:
                      return r--, [2];
                  }
                });
              }, s = this, i = 0, l2 = t.styles.backgroundImage.slice(0).reverse(), o.label = 1;
            case 1:
              return i < l2.length ? (a = l2[i], [5, n(a)]) : [3, 4];
            case 2:
              o.sent(), o.label = 3;
            case 3:
              return i++, [3, 1];
            case 4:
              return [2];
          }
        });
      });
    }, e.prototype.renderSolidBorder = function(t, r, n) {
      return GA(this, void 0, void 0, function() {
        return jA(this, function(s) {
          return this.path(Ud(n, r)), this.ctx.fillStyle = bA(t), this.ctx.fill(), [2];
        });
      });
    }, e.prototype.renderDoubleBorder = function(t, r, n, s) {
      return GA(this, void 0, void 0, function() {
        var i, l2;
        return jA(this, function(a) {
          switch (a.label) {
            case 0:
              return r < 3 ? [4, this.renderSolidBorder(t, n, s)] : [3, 2];
            case 1:
              return a.sent(), [2];
            case 2:
              return i = wx(s, n), this.path(i), this.ctx.fillStyle = bA(t), this.ctx.fill(), l2 = px(s, n), this.path(l2), this.ctx.fill(), [2];
          }
        });
      });
    }, e.prototype.renderNodeBackgroundAndBorders = function(t) {
      return GA(this, void 0, void 0, function() {
        var r, n, s, i, l2, a, o, c, f = this;
        return jA(this, function(d) {
          switch (d.label) {
            case 0:
              return this.applyEffects(t.getEffects(2)), r = t.container.styles, n = !It(r.backgroundColor) || r.backgroundImage.length, s = [{ style: r.borderTopStyle, color: r.borderTopColor, width: r.borderTopWidth }, { style: r.borderRightStyle, color: r.borderRightColor, width: r.borderRightWidth }, { style: r.borderBottomStyle, color: r.borderBottomColor, width: r.borderBottomWidth }, { style: r.borderLeftStyle, color: r.borderLeftColor, width: r.borderLeftWidth }], i = Hx(fr(r.backgroundClip, 0), t.curves), n || r.boxShadow.length ? (this.ctx.save(), this.path(i), this.ctx.clip(), It(r.backgroundColor) || (this.ctx.fillStyle = bA(r.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(t.container)]) : [3, 2];
            case 1:
              d.sent(), this.ctx.restore(), r.boxShadow.slice(0).reverse().forEach(function(m2) {
                f.ctx.save();
                var w2 = Gi(t.curves), C2 = m2.inset ? 0 : yx, U = gx(w2, -C2 + (m2.inset ? 1 : -1) * m2.spread.number, (m2.inset ? 1 : -1) * m2.spread.number, m2.spread.number * (m2.inset ? -2 : 2), m2.spread.number * (m2.inset ? -2 : 2));
                m2.inset ? (f.path(w2), f.ctx.clip(), f.mask(U)) : (f.mask(w2), f.ctx.clip(), f.path(U)), f.ctx.shadowOffsetX = m2.offsetX.number + C2, f.ctx.shadowOffsetY = m2.offsetY.number, f.ctx.shadowColor = bA(m2.color), f.ctx.shadowBlur = m2.blur.number, f.ctx.fillStyle = m2.inset ? bA(m2.color) : "rgba(0,0,0,1)", f.ctx.fill(), f.ctx.restore();
              }), d.label = 2;
            case 2:
              l2 = 0, a = 0, o = s, d.label = 3;
            case 3:
              return a < o.length ? (c = o[a], c.style !== 0 && !It(c.color) && c.width > 0 ? c.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(c.color, c.width, l2, t.curves, 2)] : [3, 11]) : [3, 13];
            case 4:
              return d.sent(), [3, 11];
            case 5:
              return c.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(c.color, c.width, l2, t.curves, 3)];
            case 6:
              return d.sent(), [3, 11];
            case 7:
              return c.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(c.color, c.width, l2, t.curves)];
            case 8:
              return d.sent(), [3, 11];
            case 9:
              return [4, this.renderSolidBorder(c.color, l2, t.curves)];
            case 10:
              d.sent(), d.label = 11;
            case 11:
              l2++, d.label = 12;
            case 12:
              return a++, [3, 3];
            case 13:
              return [2];
          }
        });
      });
    }, e.prototype.renderDashedDottedBorder = function(t, r, n, s, i) {
      return GA(this, void 0, void 0, function() {
        var l2, a, o, c, f, d, m2, w2, C2, U, h, B, p, v2, x, F, x, F;
        return jA(this, function(I) {
          return this.ctx.save(), l2 = mx(s, n), a = Ud(s, n), i === 2 && (this.path(a), this.ctx.clip()), ge(a[0]) ? (o = a[0].start.x, c = a[0].start.y) : (o = a[0].x, c = a[0].y), ge(a[1]) ? (f = a[1].end.x, d = a[1].end.y) : (f = a[1].x, d = a[1].y), n === 0 || n === 2 ? m2 = Math.abs(o - f) : m2 = Math.abs(c - d), this.ctx.beginPath(), i === 3 ? this.formatPath(l2) : this.formatPath(a.slice(0, 2)), w2 = r < 3 ? r * 3 : r * 2, C2 = r < 3 ? r * 2 : r, i === 3 && (w2 = r, C2 = r), U = true, m2 <= w2 * 2 ? U = false : m2 <= w2 * 2 + C2 ? (h = m2 / (2 * w2 + C2), w2 *= h, C2 *= h) : (B = Math.floor((m2 + C2) / (w2 + C2)), p = (m2 - B * w2) / (B - 1), v2 = (m2 - (B + 1) * w2) / B, C2 = v2 <= 0 || Math.abs(C2 - p) < Math.abs(C2 - v2) ? p : v2), U && (i === 3 ? this.ctx.setLineDash([0, w2 + C2]) : this.ctx.setLineDash([w2, C2])), i === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = r) : this.ctx.lineWidth = r * 2 + 1.1, this.ctx.strokeStyle = bA(t), this.ctx.stroke(), this.ctx.setLineDash([]), i === 2 && (ge(a[0]) && (x = a[3], F = a[0], this.ctx.beginPath(), this.formatPath([new T(x.end.x, x.end.y), new T(F.start.x, F.start.y)]), this.ctx.stroke()), ge(a[1]) && (x = a[1], F = a[2], this.ctx.beginPath(), this.formatPath([new T(x.end.x, x.end.y), new T(F.start.x, F.start.y)]), this.ctx.stroke())), this.ctx.restore(), [2];
        });
      });
    }, e.prototype.render = function(t) {
      return GA(this, void 0, void 0, function() {
        var r;
        return jA(this, function(n) {
          switch (n.label) {
            case 0:
              return this.options.backgroundColor && (this.ctx.fillStyle = bA(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), r = hx(t), [4, this.renderStack(r)];
            case 1:
              return n.sent(), this.applyEffects([]), [2, this.canvas];
          }
        });
      });
    }, e;
  }(B0);
  var Ix = function(A2) {
    return A2 instanceof Zh || A2 instanceof Yh ? true : A2 instanceof Vu && A2.type !== Pi && A2.type !== ji;
  };
  var Hx = function(A2, e) {
    switch (A2) {
      case 0:
        return Gi(e);
      case 2:
        return ux(e);
      case 1:
      default:
        return Xi(e);
    }
  };
  var Sx = function(A2) {
    switch (A2) {
      case 1:
        return "center";
      case 2:
        return "right";
      case 0:
      default:
        return "left";
    }
  };
  var bx = ["-apple-system", "system-ui"];
  var Lx = function(A2) {
    return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? A2.filter(function(e) {
      return bx.indexOf(e) === -1;
    }) : A2;
  };
  var Nx = function(A2) {
    Ne(e, A2);
    function e(t, r) {
      var n = A2.call(this, t, r) || this;
      return n.canvas = r.canvas ? r.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), n.options = r, n.canvas.width = Math.floor(r.width * r.scale), n.canvas.height = Math.floor(r.height * r.scale), n.canvas.style.width = r.width + "px", n.canvas.style.height = r.height + "px", n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-r.x, -r.y), n.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + r.width + "x" + r.height + " at " + r.x + "," + r.y + ") with scale " + r.scale), n;
    }
    return e.prototype.render = function(t) {
      return GA(this, void 0, void 0, function() {
        var r, n;
        return jA(this, function(s) {
          switch (s.label) {
            case 0:
              return r = No(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, t), [4, kx(r)];
            case 1:
              return n = s.sent(), this.options.backgroundColor && (this.ctx.fillStyle = bA(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(n, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
          }
        });
      });
    }, e;
  }(B0);
  var kx = function(A2) {
    return new Promise(function(e, t) {
      var r = new Image();
      r.onload = function() {
        e(r);
      }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(A2));
    });
  };
  var Tx = function() {
    function A2(e) {
      var t = e.id, r = e.enabled;
      this.id = t, this.enabled = r, this.start = Date.now();
    }
    return A2.prototype.debug = function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      this.enabled && (typeof window < "u" && window.console && typeof console.debug == "function" ? console.debug.apply(console, Fs([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
    }, A2.prototype.getTime = function() {
      return Date.now() - this.start;
    }, A2.prototype.info = function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      this.enabled && typeof window < "u" && window.console && typeof console.info == "function" && console.info.apply(console, Fs([this.id, this.getTime() + "ms"], e));
    }, A2.prototype.warn = function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      this.enabled && (typeof window < "u" && window.console && typeof console.warn == "function" ? console.warn.apply(console, Fs([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
    }, A2.prototype.error = function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      this.enabled && (typeof window < "u" && window.console && typeof console.error == "function" ? console.error.apply(console, Fs([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
    }, A2.instances = {}, A2;
  }();
  var Kx = function() {
    function A2(e, t) {
      var r;
      this.windowBounds = t, this.instanceName = "#" + A2.instanceCount++, this.logger = new Tx({ id: this.instanceName, enabled: e.logging }), this.cache = (r = e.cache) !== null && r !== void 0 ? r : new tx(this, e);
    }
    return A2.instanceCount = 1, A2;
  }();
  var Dx = function(A2, e) {
    return e === void 0 && (e = {}), Mx(A2, e);
  };
  typeof window < "u" && l0.setContext(window);
  var Mx = function(A2, e) {
    return GA(void 0, void 0, void 0, function() {
      var t, r, n, s, i, l2, a, o, c, f, d, m2, w2, C2, U, h, B, p, v2, x, I, F, I, H, L, K2, _, rA, V, G, Z, AA, $, b, j, Q, g, E, N2, k;
      return jA(this, function(M2) {
        switch (M2.label) {
          case 0:
            if (!A2 || typeof A2 != "object") return [2, Promise.reject("Invalid element provided as first argument")];
            if (t = A2.ownerDocument, !t) throw new Error("Element is not attached to a Document");
            if (r = t.defaultView, !r) throw new Error("Document is not attached to a Window");
            return n = { allowTaint: (H = e.allowTaint) !== null && H !== void 0 ? H : false, imageTimeout: (L = e.imageTimeout) !== null && L !== void 0 ? L : 15e3, proxy: e.proxy, useCORS: (K2 = e.useCORS) !== null && K2 !== void 0 ? K2 : false }, s = po({ logging: (_ = e.logging) !== null && _ !== void 0 ? _ : true, cache: e.cache }, n), i = { windowWidth: (rA = e.windowWidth) !== null && rA !== void 0 ? rA : r.innerWidth, windowHeight: (V = e.windowHeight) !== null && V !== void 0 ? V : r.innerHeight, scrollX: (G = e.scrollX) !== null && G !== void 0 ? G : r.pageXOffset, scrollY: (Z = e.scrollY) !== null && Z !== void 0 ? Z : r.pageYOffset }, l2 = new tt(i.scrollX, i.scrollY, i.windowWidth, i.windowHeight), a = new Kx(s, l2), o = (AA = e.foreignObjectRendering) !== null && AA !== void 0 ? AA : false, c = { allowTaint: ($ = e.allowTaint) !== null && $ !== void 0 ? $ : false, onclone: e.onclone, ignoreElements: e.ignoreElements, inlineImages: o, copyStyles: o }, a.logger.debug("Starting document clone with size " + l2.width + "x" + l2.height + " scrolled to " + -l2.left + "," + -l2.top), f = new Cd(a, A2, c), d = f.clonedReferenceElement, d ? [4, f.toIFrame(t, l2)] : [2, Promise.reject("Unable to find element in cloned iframe")];
          case 1:
            return m2 = M2.sent(), w2 = Gu(d) || RF(d) ? gC(d.ownerDocument) : ca(a, d), C2 = w2.width, U = w2.height, h = w2.left, B = w2.top, p = Rx(a, d, e.backgroundColor), v2 = { canvas: e.canvas, backgroundColor: p, scale: (j = (b = e.scale) !== null && b !== void 0 ? b : r.devicePixelRatio) !== null && j !== void 0 ? j : 1, x: ((Q = e.x) !== null && Q !== void 0 ? Q : 0) + h, y: ((g = e.y) !== null && g !== void 0 ? g : 0) + B, width: (E = e.width) !== null && E !== void 0 ? E : Math.ceil(C2), height: (N2 = e.height) !== null && N2 !== void 0 ? N2 : Math.ceil(U) }, o ? (a.logger.debug("Document cloned, using foreign object rendering"), I = new Nx(a, v2), [4, I.render(d)]) : [3, 3];
          case 2:
            return x = M2.sent(), [3, 5];
          case 3:
            return a.logger.debug("Document cloned, element located at " + h + "," + B + " with size " + C2 + "x" + U + " using computed rendering"), a.logger.debug("Starting DOM parsing"), F = A0(a, d), p === F.styles.backgroundColor && (F.styles.backgroundColor = Ze.TRANSPARENT), a.logger.debug("Starting renderer for element at " + v2.x + "," + v2.y + " with size " + v2.width + "x" + v2.height), I = new Ex(a, v2), [4, I.render(F)];
          case 4:
            x = M2.sent(), M2.label = 5;
          case 5:
            return (!((k = e.removeContainer) !== null && k !== void 0) || k) && (Cd.destroy(m2) || a.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), a.logger.debug("Finished rendering"), [2, x];
        }
      });
    });
  };
  var Rx = function(A2, e, t) {
    var r = e.ownerDocument, n = r.documentElement ? En(A2, getComputedStyle(r.documentElement).backgroundColor) : Ze.TRANSPARENT, s = r.body ? En(A2, getComputedStyle(r.body).backgroundColor) : Ze.TRANSPARENT, i = typeof t == "string" ? En(A2, t) : t === null ? Ze.TRANSPARENT : 4294967295;
    return e === r.documentElement ? It(n) ? It(s) ? i : s : n : i;
  };
  async function Ox(A2, e = "ticket.png", t = {}) {
    if (!A2) return;
    try {
      document.fonts && document.fonts.ready && await document.fonts.ready;
    } catch (l2) {
      console.warn("Font loading check skipped", l2);
    }
    const { pixelRatio: r = 4, backgroundColor: n = null, onSuccess: s, onError: i } = t;
    try {
      const l2 = await BC(A2, { quality: 1, pixelRatio: r, cacheBust: true, backgroundColor: n, skipAutoScale: true, style: { transform: "none", margin: "0 auto" } }), a = document.createElement("a");
      return a.download = e, a.href = l2, document.body.appendChild(a), a.click(), document.body.removeChild(a), s && s(), true;
    } catch (l2) {
      console.warn("html-to-image primary export failed, falling back to html2canvas:", l2);
      try {
        return (await Dx(A2, { scale: r, useCORS: true, backgroundColor: n, logging: false, allowTaint: true })).toBlob((o) => {
          if (!o) {
            i && i(new Error("Canvas blob generation failed"));
            return;
          }
          const c = URL.createObjectURL(o), f = document.createElement("a");
          f.download = e, f.href = c, document.body.appendChild(f), f.click(), document.body.removeChild(f), setTimeout(() => URL.revokeObjectURL(c), 2e3), s && s();
        }, "image/png"), true;
      } catch (a) {
        throw console.error("All image export methods failed:", a), i && i(a), a;
      }
    }
  }
  var xd = "" + new URL("aseer_vertical_bg-q8xxwqRT.png", window.location.href).href;
  var jx = "" + new URL("aseer_seat_card_bg-BXroVpAV.png", window.location.href).href;
  function yd({ className: A2 = "w-7 h-7 text-[#162a5c]", flip: e = false }) {
    return u.jsxs("svg", { viewBox: "0 0 40 24", className: `${A2} ${e ? "scale-x-[-1]" : ""}`, fill: "currentColor", children: [u.jsx("path", { d: "M5,12 C12,6 24,5 35,2 C30,9 25,18 15,20 C10,21 6,17 5,12 Z", opacity: "0.95" }), u.jsx("path", { d: "M12,8 C18,3 26,4 32,2 C28,7 22,12 16,13 C13,13 11,11 12,8 Z", opacity: "0.8" }), u.jsx("path", { d: "M2,16 C7,14 14,15 20,13 C16,17 11,21 5,21 C3,21 2,19 2,16 Z", opacity: "0.7" })] });
  }
  function Px({ className: A2 = "w-28 h-2.5 text-[#162a5c]" }) {
    return u.jsxs("svg", { viewBox: "0 0 160 20", className: A2, fill: "currentColor", children: [u.jsx("path", { d: "M80,10 C70,10 50,2 20,4 C10,5 0,10 0,10 C15,8 40,8 75,13 L80,14 L85,13 C120,8 145,8 160,10 C160,10 150,5 140,4 C110,2 90,10 80,10 Z", opacity: "0.85" }), u.jsx("circle", { cx: "80", cy: "10", r: "2.5", fill: "#4f46e5" })] });
  }
  function _x({ code: A2 = "20261007A005", className: e = "h-7 sm:h-8" }) {
    const t = [];
    for (let r = 0; r < 48; r++) {
      const n = (r * 7 + A2.charCodeAt(r % A2.length)) % 3 === 0;
      r * 13 % 27 === 0 || t.push(n ? 3 : 1.3);
    }
    return u.jsxs("div", { className: "flex flex-col items-center justify-center", children: [u.jsx("div", { className: `flex items-center gap-[1.2px] ${e}`, children: t.map((r, n) => u.jsx("div", { className: "bg-[#0f1f4b] h-full", style: { width: `${r}px` } }, n)) }), u.jsx("span", { className: "font-mono text-[9.5px] sm:text-[10px] font-black text-[#0f1f4b] tracking-wider mt-0.5", children: A2 })] });
  }
  function wl({ className: A2 = "h-11", color: e = "#00a887", textColor: t = "#00a887", subColor: r = "#4a6b63" }) {
    const [n, s] = UA.useState(false);
    return n ? u.jsxs("div", { className: `flex items-center gap-2 select-none ${A2}`, children: [u.jsxs("svg", { viewBox: "0 0 100 80", className: "h-full w-auto shrink-0", fill: e, children: [u.jsx("circle", { cx: "20", cy: "18", r: "3.5" }), u.jsx("circle", { cx: "32", cy: "14", r: "3.5" }), u.jsx("circle", { cx: "44", cy: "12", r: "3.5" }), u.jsx("circle", { cx: "56", cy: "12", r: "3.5" }), u.jsx("circle", { cx: "68", cy: "14", r: "3.5" }), u.jsx("circle", { cx: "80", cy: "18", r: "3.5" }), u.jsx("circle", { cx: "16", cy: "30", r: "3.5" }), u.jsx("circle", { cx: "28", cy: "25", r: "3.5" }), u.jsx("circle", { cx: "40", cy: "22", r: "3.5" }), u.jsx("circle", { cx: "52", cy: "22", r: "3.5" }), u.jsx("circle", { cx: "64", cy: "25", r: "3.5" }), u.jsx("circle", { cx: "76", cy: "30", r: "3.5" }), u.jsx("circle", { cx: "20", cy: "42", r: "3.5" }), u.jsx("circle", { cx: "32", cy: "37", r: "3.5" }), u.jsx("circle", { cx: "44", cy: "34", r: "3.5" }), u.jsx("circle", { cx: "56", cy: "34", r: "3.5" }), u.jsx("circle", { cx: "68", cy: "37", r: "3.5" }), u.jsx("circle", { cx: "80", cy: "42", r: "3.5" }), u.jsx("circle", { cx: "28", cy: "50", r: "3" }), u.jsx("circle", { cx: "40", cy: "46", r: "3" }), u.jsx("circle", { cx: "52", cy: "46", r: "3" }), u.jsx("circle", { cx: "64", cy: "50", r: "3" }), u.jsx("circle", { cx: "36", cy: "60", r: "2.8" }), u.jsx("circle", { cx: "48", cy: "57", r: "2.8" }), u.jsx("circle", { cx: "60", cy: "60", r: "2.8" })] }), u.jsxs("div", { className: "flex flex-col text-right leading-none", children: [u.jsx("span", { className: "font-extrabold text-xs sm:text-sm tracking-normal font-sans", style: { color: t }, children: "\u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645" }), u.jsx("span", { className: "text-[7.5px] sm:text-[8.5px] font-sans font-semibold tracking-normal mt-0.5", style: { color: r }, children: "Ministry of Education" })] })] }) : u.jsx("img", { src: "ministry_logo.png", alt: "\u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645 - Ministry of Education", onError: () => s(true), className: `object-contain select-none max-h-14 ${A2}` });
  }
  function Vx({ seat: A2, eventDetails: e = {}, cardType: t = "attendance", orientation: r = "auto", customTitle: n, customSubtitle: s, customSlogan: i = "\u0646\u0644\u062A\u0642\u064A \u0644\u0646\u0635\u0646\u0639 \u0623\u062C\u0645\u0644 \u0627\u0644\u0644\u062D\u0638\u0627\u062A", className: l2 = "", innerRef: a }) {
    var K2, _, rA, V, G, Z, AA, $, b, j, Q, g, E, N2;
    if (!A2) return null;
    const o = typeof window < "u" ? window.location.origin + window.location.pathname : "";
    (K2 = A2.guest) != null && K2.token || A2.id;
    const c = _g(A2, o), f = e && (e.logoUrl || e.title) ? e : Tu(), d = f == null ? void 0 : f.logoUrl, [m2, w2] = uA.useState(false), C2 = A2.row || "A", U = String(A2.number).padStart(2, "0"), h = `${C2}-${U}`, B = n || (t === "invitation" ? "\u062F\u0639\u0648\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629" : t === "seat" ? "\u0628\u0637\u0627\u0642\u0629 \u062D\u062C\u0632 \u0645\u0642\u0639\u062F" : "\u0628\u0637\u0627\u0642\u0629 \u062D\u0636\u0648\u0631"), p = s || (t === "invitation" ? "ELECTRONIC INVITATION" : t === "seat" ? "SEAT RESERVATION PLACARD" : "ATTENDANCE TICKET");
    if (r === "landscape" || r === "auto" && t === "seat") {
      const k = A2.levelName || (A2.level === "B" ? "\u0627\u0644\u0628\u0644\u0643\u0648\u0646\u0629" : "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A"), M2 = A2.level === "B" || A2.levelName && A2.levelName.includes("\u0628\u0644\u0643\u0648\u0646") ? "BALCONY" : "GROUND FLOOR";
      let R = A2.sector || "\u0627\u0644\u064A\u0633\u0627\u0631", y2 = "LEFT";
      R.includes("\u064A\u0645\u064A\u0646") ? y2 = "RIGHT" : R.includes("\u0648\u0633\u0637") && (y2 = "CENTER");
      const P = (f == null ? void 0 : f.title) || "\u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u0631\u0626\u064A\u0633\u064A - \u062D\u0641\u0644 \u0627\u0644\u062A\u0643\u0631\u064A\u0645 \u0648\u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D", q = (f == null ? void 0 : f.subtitle) || "Main Theater - Honors and Opening Ceremony", iA = (f == null ? void 0 : f.venue) || "\u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u0631\u0626\u064A\u0633\u064A - \u0627\u0644\u0642\u0627\u0639\u0629 \u0627\u0644\u0643\u0628\u0631\u0649", sA = f != null && f.date ? f.date.split("(")[0].trim() : "\u0627\u0644\u062C\u0645\u0639\u0629\u060C 25 \u0623\u0643\u062A\u0648\u0628\u0631 2026", fA = f != null && f.time ? f.time.split("(")[0].trim() : "08:00 \u0645\u0633\u0627\u0621\u064B", EA = (f == null ? void 0 : f.doorsTime) || "07:00 \u0645\u0633\u0627\u0621\u064B";
      return u.jsxs("div", { ref: a, dir: "rtl", className: `printable-seat-card-landscape relative w-full max-w-[860px] aspect-[297/210] bg-gradient-to-b from-[#f8fbff] via-[#eef5fc] to-[#e4f0fa] text-[#0e2b5c] rounded-[24px] sm:rounded-[32px] shadow-[0_20px_60px_rgba(14,43,92,0.22)] border-2 border-[#00b4d8]/40 overflow-hidden select-none flex flex-col justify-between ${l2}`, style: { fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: "297 / 210" }, children: [u.jsx("div", { className: "absolute inset-0 z-0 bg-cover bg-center pointer-events-none", style: { backgroundImage: `url(${jx})` } }), u.jsx("div", { className: "absolute inset-0 z-0 pointer-events-none", style: { background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.82) 70%, rgba(255,255,255,0.2) 88%, rgba(255,255,255,0) 100%)" } }), u.jsxs("div", { className: "relative z-10 px-5 sm:px-8 pt-3 sm:pt-4 flex items-center justify-between gap-3", children: [u.jsxs("div", { className: "flex items-center gap-2.5 sm:gap-3 shrink-0", children: [d && !m2 ? u.jsx("img", { src: d, alt: (f == null ? void 0 : f.title) || "\u0634\u0639\u0627\u0631 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629", onError: () => w2(true), className: "h-11 sm:h-14 max-h-14 max-w-[140px] object-contain" }) : u.jsx(wl, { className: "h-10 sm:h-12", color: "#0c234b", textColor: "#0c234b", subColor: "#476694" }), u.jsx("div", { className: "h-10 w-px bg-slate-300/80 mx-0.5" }), u.jsxs("div", { className: "text-right leading-tight", children: [u.jsx("span", { className: "text-[10px] sm:text-[11px] font-bold text-slate-500 block", children: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629" }), u.jsx("span", { className: "text-xs sm:text-sm font-bold text-slate-700 block", children: "\u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645" }), u.jsx("span", { className: "text-xs sm:text-sm font-black text-[#0c234b] block", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645" }), u.jsx("span", { className: "text-xs sm:text-sm font-black text-[#0c234b] block", children: "\u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631" })] })] }), u.jsxs("div", { className: "text-center shrink-0 px-2 flex flex-col items-center", children: [u.jsx("div", { className: "text-[10px] sm:text-xs font-bold text-slate-600 font-serif mb-1 select-none", children: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0627\u0644\u0631\u064E\u0651\u062D\u0652\u0645\u064E\u0670\u0646\u0650 \u0627\u0644\u0631\u064E\u0651\u062D\u0650\u064A\u0645\u0650" }), u.jsx("h1", { className: "text-2xl sm:text-3xl font-black tracking-tight text-[#0c234b] leading-none mb-1.5 whitespace-nowrap", children: "\u0628\u0637\u0627\u0642\u0629 \u062D\u062C\u0632 \u0645\u0642\u0639\u062F" }), u.jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-1.5 opacity-80" }), u.jsx("p", { className: "text-[8px] sm:text-[9.5px] font-black text-[#476694] tracking-[0.25em] uppercase font-sans", children: "SEAT RESERVATION PLACARD" })] }), u.jsxs("div", { className: "w-[280px] sm:w-[310px] bg-white/80 backdrop-blur-md border border-cyan-300/80 rounded-2xl p-2 sm:p-2.5 shadow-xs text-right shrink-0", children: [u.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-black text-[#0c234b]", children: [u.jsx("svg", { className: "w-3.5 h-3.5 text-cyan-600 shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: u.jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }), u.jsx("span", { className: "truncate", children: iA })] }), u.jsx("div", { className: "text-[10px] text-slate-500 font-bold pr-5 truncate", children: P }), u.jsx("div", { className: "text-[8.5px] text-slate-400 font-medium pr-5 truncate font-sans", children: q }), u.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold text-slate-700 mt-1 pt-1 border-t border-slate-100", children: [u.jsxs("svg", { className: "w-3.5 h-3.5 text-cyan-600 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [u.jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", strokeWidth: "2" }), u.jsx("path", { strokeWidth: "2", d: "M16 2v4M8 2v4M3 10h18" })] }), u.jsx("span", { children: sA })] }), u.jsxs("div", { className: "flex items-center gap-1.5 text-[10.5px] font-mono font-bold text-slate-700 mt-0.5", children: [u.jsxs("svg", { className: "w-3.5 h-3.5 text-cyan-600 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [u.jsx("circle", { cx: "12", cy: "12", r: "9", strokeWidth: "2" }), u.jsx("path", { strokeWidth: "2", strokeLinecap: "round", d: "M12 7v5l3 3" })] }), u.jsx("span", { children: EA }), u.jsx("span", { className: "text-slate-300 font-normal", children: "|" }), u.jsx("span", { className: "text-[#0c234b] font-black", children: fA }), u.jsx("span", { className: "text-[10px] text-slate-500 font-sans font-normal", children: "(\u062A\u0641\u062A\u062D)" })] })] })] }), u.jsxs("div", { className: "relative z-10 mx-5 sm:mx-8 my-1 sm:my-1.5 bg-white/90 backdrop-blur-md border-2 border-cyan-300/80 rounded-2xl px-5 py-2.5 shadow-sm flex items-center justify-between", children: [u.jsxs("div", { className: "flex items-center gap-2 text-sm sm:text-base font-black text-[#008ba3] shrink-0", children: [u.jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-[#008ba3]", fill: "currentColor", viewBox: "0 0 20 20", children: u.jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }), u.jsx("span", { children: "\u0627\u0644\u0636\u064A\u0641 \u0627\u0644\u0645\u062D\u062A\u0631\u0645" })] }), u.jsxs("div", { className: "text-center px-4 flex-1 overflow-hidden", children: [u.jsx("h2", { className: "text-xl sm:text-2xl font-black text-[#0c234b] tracking-tight truncate leading-tight", children: ((_ = A2.guest) == null ? void 0 : _.name) || "\u0627\u0644\u0623\u0633\u062A\u0627\u0630\u0629 \u0633\u0627\u0631\u0629 \u0628\u0646 \u0639\u0628\u062F \u0627\u0644\u0644\u0647..." }), u.jsx("p", { className: "text-xs sm:text-sm font-bold text-[#008ba3] mt-0.5 truncate", children: ((rA = A2.guest) == null ? void 0 : rA.jobTitle) || ((V = A2.guest) != null && V.category ? A2.guest.category : "\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 \u0627\u0644\u0625\u0634\u0631\u0627\u0641 \u0627\u0644\u062A\u0631\u0628\u0648\u064A") })] }), u.jsxs("div", { className: "flex flex-col items-center gap-1 shrink-0", children: [u.jsx("span", { className: "text-[10px] sm:text-[11px] font-black text-cyan-900 bg-cyan-50 border border-cyan-200 px-3 py-0.5 rounded-lg shadow-2xs", children: (Z = (G = A2.guest) == null ? void 0 : G.category) != null && Z.includes("VIP") ? "\u0633\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0643\u0631\u0645" : "\u0627\u0644\u0645\u062D\u062A\u0631\u0645" }), u.jsx("span", { className: "text-[10px] sm:text-[11px] font-extrabold text-cyan-900 bg-cyan-100/70 border border-cyan-200 px-3 py-0.5 rounded-lg shadow-2xs", children: ((AA = A2.guest) == null ? void 0 : AA.category) || "\u0636\u064A\u0641 \u0634\u0631\u0641" })] })] }), u.jsxs("div", { className: "relative z-10 px-5 sm:px-8 py-1 flex items-center justify-between gap-4 flex-1", children: [u.jsxs("div", { className: "w-[180px] shrink-0 flex flex-col items-center justify-center text-center", children: [u.jsx("div", { className: "p-2 sm:p-2.5 bg-white rounded-2xl shadow-sm border border-slate-200/90", children: u.jsx(si, { value: c, size: 88, level: "M", fgColor: "#0c234b", bgColor: "#ffffff", includeMargin: true }) }), u.jsx("span", { className: "text-xs sm:text-[13px] font-black text-[#0c234b] mt-1.5 block leading-tight", children: "\u0627\u0645\u0633\u062D \u0644\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0645\u0648\u0642\u0639" }), u.jsx("span", { className: "text-[8px] sm:text-[9px] text-slate-500 font-medium block font-sans", children: "Scan for verification & map" }), u.jsx("span", { className: "text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 mt-0.5 block tracking-wider", children: ($ = A2.guest) != null && $.token ? A2.guest.token.substring(0, 12).toUpperCase() : A2.id || "INV-IMRT789" })] }), u.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center max-w-[420px]", children: [u.jsxs("div", { className: "text-center mb-1", children: [u.jsx("span", { className: "text-xs font-black text-[#0c234b] block", children: "\u0627\u0644\u0645\u0642\u0639\u062F \u0627\u0644\u0645\u062E\u0635\u0635" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-500 tracking-wider block font-sans", children: "ASSIGNED SEAT" })] }), u.jsx("div", { className: "w-full bg-[#0c2b64] text-white rounded-full py-1.5 sm:py-2 px-6 shadow-md mb-2 flex items-center justify-center", children: u.jsxs("span", { className: "font-mono text-3xl sm:text-4xl font-black tracking-widest leading-none", children: [C2, " - ", U] }) }), u.jsxs("div", { className: "w-full grid grid-cols-4 gap-1 sm:gap-1.5", children: [u.jsxs("div", { className: "bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs", children: [u.jsx("span", { className: "text-[9.5px] text-slate-500 font-semibold block", children: "\u0627\u0644\u0635\u0641" }), u.jsx("span", { className: "text-sm sm:text-base font-black font-mono text-[#0c234b] block leading-tight", children: C2 }), u.jsxs("span", { className: "text-[7.5px] text-slate-400 font-bold block font-sans uppercase", children: ["ROW", u.jsx("br", {}), C2] })] }), u.jsxs("div", { className: "bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs", children: [u.jsx("span", { className: "text-[9.5px] text-slate-500 font-semibold block", children: "\u0631\u0642\u0645 \u0627\u0644\u0643\u0631\u0633\u064A" }), u.jsx("span", { className: "text-sm sm:text-base font-black font-mono text-[#0c234b] block leading-tight", children: U }), u.jsxs("span", { className: "text-[7.5px] text-slate-400 font-bold block font-sans uppercase", children: ["SEAT NUMBER", u.jsx("br", {}), U] })] }), u.jsxs("div", { className: "bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs", children: [u.jsx("span", { className: "text-[9.5px] text-slate-500 font-semibold block", children: "\u0627\u0644\u062F\u0648\u0631" }), u.jsx("span", { className: "text-[11px] sm:text-xs font-black text-[#0c234b] block truncate leading-tight", children: k }), u.jsxs("span", { className: "text-[7.5px] text-slate-400 font-bold block font-sans uppercase", children: ["FLOOR", u.jsx("br", {}), M2] })] }), u.jsxs("div", { className: "bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs", children: [u.jsx("span", { className: "text-[9.5px] text-slate-500 font-semibold block", children: "\u0627\u0644\u0642\u0637\u0627\u0639" }), u.jsx("span", { className: "text-[11px] sm:text-xs font-black text-[#0c234b] block truncate leading-tight", children: R }), u.jsxs("span", { className: "text-[7.5px] text-slate-400 font-bold block font-sans uppercase", children: ["SECTION", u.jsx("br", {}), y2] })] })] })] }), u.jsxs("div", { className: "w-[190px] shrink-0 flex flex-col justify-center text-right pr-2", children: [u.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [u.jsx("div", { className: "h-px bg-cyan-300/80 flex-1" }), u.jsxs("div", { className: "flex items-center gap-1 text-xs font-black text-[#008ba3]", children: [u.jsx("span", { children: "\u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629" }), u.jsx("svg", { className: "w-3.5 h-3.5 text-[#008ba3]", fill: "currentColor", viewBox: "0 0 20 20", children: u.jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) })] })] }), u.jsx("h3", { className: "text-sm sm:text-base font-black text-[#0c234b] leading-snug mb-1", children: P }), u.jsx("p", { className: "text-[10px] sm:text-[11px] font-semibold text-slate-500 font-sans leading-tight", children: q })] })] }), u.jsx("div", { className: "w-full relative z-10 mt-auto", children: u.jsxs("div", { className: "bg-gradient-to-r from-[#0c1e45]/95 via-[#102a63]/95 to-[#0c1e45]/95 text-white py-2 sm:py-2.5 px-6 sm:px-10 flex items-center justify-between border-t border-cyan-400/30", children: [u.jsx("p", { className: "text-xs sm:text-sm font-black tracking-wide text-white", children: i || "\u0646\u0644\u062A\u0642\u064A \u0644\u0646\u0635\u0646\u0639 \u0623\u062C\u0645\u0644 \u0627\u0644\u0644\u062D\u0638\u0627\u062A" }), u.jsx("div", { className: "text-[10px] sm:text-xs text-cyan-200 font-medium", children: "\u0646\u0638\u0627\u0645 \u062D\u062C\u0632 \u0645\u0642\u0627\u0639\u062F \u0645\u0633\u0627\u0631\u062D \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631 \xA9 2026" })] }) })] });
    }
    if (t === "invitation") {
      const k = f != null && f.date ? f.date.split("(")[0].trim() : "2026 / 10 / 07", M2 = f != null && f.time ? f.time.split("(")[0].trim() : "07:00 \u0645", R = (f == null ? void 0 : f.venue) || "\u0645\u0633\u0631\u062D \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u062A\u0639\u0644\u064A\u0645 \u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631", y2 = A2.entrance || "\u0627\u0644\u0645\u062F\u062E\u0644 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", P = ((b = A2.guest) == null ? void 0 : b.name) || "\u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A", q = ((j = A2.guest) == null ? void 0 : j.jobTitle) || ((Q = A2.guest) != null && Q.category ? A2.guest.category : "\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A"), iA = `20261007${C2}${String(A2.number).padStart(3, "0")}`;
      return u.jsxs("div", { ref: a, dir: "rtl", className: `relative w-full max-w-[390px] aspect-[9/16] bg-gradient-to-b from-[#f8fbff] via-[#eef5fc] to-[#e4f0fa] text-[#162a5c] rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(14,43,92,0.28)] border-2 border-indigo-200/70 overflow-hidden select-none flex flex-col justify-between ${l2}`, style: { fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: "9 / 16" }, children: [u.jsx("div", { className: "absolute inset-0 z-0 bg-cover bg-center pointer-events-none", style: { backgroundImage: `url(${xd})` } }), u.jsx("div", { className: "absolute inset-0 z-0 pointer-events-none", style: { background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.85) 15%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.88) 68%, rgba(255,255,255,0.2) 88%, rgba(255,255,255,0) 100%)" } }), u.jsxs("div", { className: "relative z-10 px-4 pt-3.5 pb-1 flex items-start justify-between", children: [u.jsxs("div", { className: "flex flex-col items-center select-none text-center", children: [u.jsxs("div", { className: "flex flex-col text-[10px] sm:text-[11px] font-black text-[#162a5c] leading-[1.1] tracking-normal", children: [u.jsx("span", { children: "\u0645\u0646" }), u.jsx("span", { children: "\u0623\u062C\u0644" }), u.jsx("span", { children: "\u062A\u0639\u0644\u064A\u0645" }), u.jsx("span", { children: "\u0645\u0644\u0647\u0645" })] }), u.jsx("div", { className: "w-7 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full mt-1" })] }), u.jsx("div", { className: "flex items-center", children: d && !m2 ? u.jsx("img", { src: d, alt: (f == null ? void 0 : f.title) || "\u0634\u0639\u0627\u0631 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629", onError: () => w2(true), className: "h-10 sm:h-11 max-h-11 max-w-[130px] object-contain" }) : u.jsx(wl, { className: "h-10", color: "#00a887", textColor: "#00a887", subColor: "#4a6b63" }) })] }), u.jsxs("div", { className: "relative z-10 px-3 text-center -mt-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2", children: [u.jsx(yd, { className: "w-6 h-6 sm:w-7 sm:h-7 text-[#162a5c]" }), u.jsx("h1", { className: "text-2xl sm:text-[26px] font-black tracking-normal text-[#162a5c] leading-none", children: "\u062F\u064E\u0639\u0652\u0648\u064E\u0629\u064C \u062E\u064E\u0627\u0635\u0651\u064E\u0629" }), u.jsx(yd, { className: "w-6 h-6 sm:w-7 sm:h-7 text-[#162a5c]", flip: true })] }), u.jsx("div", { className: "text-[8px] sm:text-[8.5px] font-black text-[#162a5c] tracking-[0.25em] uppercase font-sans mt-0.5", children: "INVITATION & EVENT TICKET" }), u.jsxs("div", { className: "mt-1 space-y-0.5 leading-snug", children: [u.jsx("div", { className: "text-[11px] sm:text-[12px] font-black text-[#162a5c] tracking-normal", children: "\u062A\u062A\u0634\u0631\u0641 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u062A\u0639\u0644\u064A\u0645 \u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631" }), u.jsx("div", { className: "text-[10.5px] sm:text-[11px] font-bold text-[#162a5c] tracking-normal", children: "\u0628\u062F\u0639\u0648\u062A\u0643\u0645 \u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629" }), u.jsx("div", { className: "text-[9.5px] sm:text-[10px] font-bold text-slate-700 tracking-normal", dir: "rtl", children: f.title ? f.title : "\u0645\u0633\u0631\u062D \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u062A\u0639\u0644\u064A\u0645 \u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631" })] })] }), u.jsx("div", { className: "relative z-10 px-3 my-1", children: u.jsxs("div", { className: "bg-white/95 rounded-2xl p-2 px-3 border border-slate-200/90 shadow-sm flex items-center justify-between", children: [u.jsx("div", { className: "w-1 h-8 bg-indigo-500 rounded-full shrink-0" }), u.jsxs("div", { className: "flex-1 text-center px-1", children: [u.jsx("span", { className: "text-[9px] font-bold text-slate-500 block mb-0.5", children: "\u0627\u0633\u0645 \u0627\u0644\u0636\u064A\u0641" }), u.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [u.jsx("div", { className: "w-5 h-5 rounded-full bg-[#162a5c] flex items-center justify-center text-white shrink-0", children: u.jsx(ff, { className: "w-3 h-3" }) }), u.jsx("h2", { className: "text-base sm:text-lg font-black text-[#162a5c] leading-tight", children: P })] }), u.jsxs("div", { className: "mt-0.5 flex items-center justify-center gap-1", children: [u.jsx("span", { className: "text-[9px] text-slate-400 font-bold", children: "\u2014 \u0627\u0644\u0645\u0646\u0635\u0628 \u2014" }), u.jsx("span", { className: "text-[11px] sm:text-xs font-black text-[#008ba3]", children: q })] })] }), u.jsx("div", { className: "w-1 h-8 bg-indigo-500 rounded-full shrink-0" })] }) }), u.jsx("div", { className: "relative z-10 px-2.5 my-1", children: u.jsxs("div", { className: "bg-white/98 rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100", children: [u.jsxs("div", { className: "grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 py-1.5 px-1 text-center bg-slate-50/60", children: [u.jsxs("div", { className: "flex flex-col items-center justify-center px-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1 mb-0.5 text-blue-600", children: [u.jsx(ki, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-700", children: "\u0631\u0642\u0645 \u0627\u0644\u0635\u0641" })] }), u.jsx("span", { className: "font-mono text-base sm:text-lg font-black text-[#162a5c] leading-none", children: C2 }), u.jsx("span", { className: "text-[7px] text-slate-400 font-sans mt-0.5", children: "Row" })] }), u.jsxs("div", { className: "flex flex-col items-center justify-center px-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1 mb-0.5 text-blue-600", children: [u.jsx(uo, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-700", children: "\u0631\u0642\u0645 \u0627\u0644\u0645\u0642\u0639\u062F" })] }), u.jsx("span", { className: "font-mono text-sm sm:text-base font-black text-[#162a5c] leading-none", children: h }), u.jsx("span", { className: "text-[7px] text-slate-400 font-sans mt-0.5", children: "Seat No" })] }), u.jsxs("div", { className: "flex flex-col items-center justify-center px-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1 mb-0.5 text-blue-600", children: [u.jsx(of, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-700", children: "\u0627\u0644\u0645\u062F\u062E\u0644" })] }), u.jsx("span", { className: "text-[9.5px] sm:text-[10px] font-black text-[#162a5c] leading-tight text-center", children: y2 }), u.jsx("span", { className: "text-[7px] text-slate-400 font-sans mt-0.5", children: "Main Entrance" })] })] }), u.jsxs("div", { className: "grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 py-1.5 px-1 text-center bg-white", children: [u.jsxs("div", { className: "flex flex-col items-center justify-center px-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1 mb-0.5 text-blue-600", children: [u.jsx(uf, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-700", children: "\u0627\u0644\u0645\u0648\u0642\u0639" })] }), u.jsx("span", { className: "text-[9px] sm:text-[9.5px] font-black text-[#162a5c] leading-tight text-center", children: R }), u.jsx("span", { className: "text-[7px] text-slate-400 font-sans mt-0.5", children: "Theater Hall" })] }), u.jsxs("div", { className: "flex flex-col items-center justify-center px-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1 mb-0.5 text-blue-600", children: [u.jsx(lf, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-700", children: "\u0627\u0644\u0648\u0642\u062A" })] }), u.jsx("span", { className: "text-[9.5px] sm:text-[10px] font-black text-[#162a5c] leading-tight text-center", children: M2 }), u.jsx("span", { className: "text-[7px] text-slate-400 font-sans mt-0.5", children: "Time" })] }), u.jsxs("div", { className: "flex flex-col items-center justify-center px-1", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1 mb-0.5 text-blue-600", children: [u.jsx(af, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "text-[9px] font-bold text-slate-700", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" })] }), u.jsx("span", { className: "text-[9px] sm:text-[9.5px] font-black text-[#162a5c] leading-tight text-center", children: k }), u.jsx("span", { className: "text-[7px] text-slate-400 font-sans mt-0.5", children: "Date" })] })] })] }) }), u.jsxs("div", { className: "relative z-10 px-3 text-center my-1 space-y-0.5", children: [u.jsxs("p", { className: "text-[9.5px] sm:text-[10px] text-slate-800 leading-snug font-medium max-w-[310px] mx-auto tracking-normal", children: ["\u0646\u0623\u0645\u0644 \u0623\u0646 \u062A\u0634\u0631\u0641\u0648\u0646\u0627 \u0628\u062D\u0636\u0648\u0631\u0643\u0645 \u0648\u0645\u0634\u0627\u0631\u0643\u062A\u0643\u0645 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629", u.jsx("br", {}), "\u0627\u0644\u062A\u064A \u062A\u0623\u062A\u064A \u0636\u0645\u0646 \u062C\u0647\u0648\u062F\u0646\u0627 \u0641\u064A \u062F\u0639\u0645 \u0645\u0633\u064A\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0648\u0635\u0646\u0627\u0639\u0629 \u0645\u0633\u062A\u0642\u0628\u0644 \u0623\u0643\u062B\u0631 \u0625\u0634\u0631\u0627\u0642\u0627\u064B."] }), u.jsxs("div", { className: "pt-0.5", children: [u.jsx("div", { className: "text-base sm:text-lg font-black text-[#162a5c] tracking-normal leading-tight", children: "\u0648\u062C\u0648\u062F\u0643\u0645 \u064A\u0633\u0639\u062F\u0646\u0627" }), u.jsx("div", { className: "text-[7.5px] font-black text-[#162a5c] tracking-[0.2em] uppercase font-sans mt-0.5", children: "WE ARE HONORED BY YOUR PRESENCE" }), u.jsx("div", { className: "flex justify-center mt-0.5", children: u.jsx(Px, { className: "w-20 h-2 text-[#162a5c]" }) })] })] }), u.jsx("div", { className: "relative z-10 px-2.5 my-1", children: u.jsxs("div", { className: "bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm p-2 grid grid-cols-2 gap-1.5 relative select-none", children: [u.jsxs("div", { className: "flex flex-col items-center justify-center text-center pl-1 border-l border-dashed border-cyan-400/80", children: [u.jsxs("div", { className: "w-full bg-[#1e3a8a] text-white py-0.5 px-2 rounded-lg mb-1 shadow-sm", children: [u.jsx("span", { className: "text-[11px] font-black block leading-tight", children: "\u062A\u0630\u0643\u0631\u0629 \u062D\u0636\u0648\u0631" }), u.jsx("span", { className: "text-[6.5px] font-bold tracking-wider font-sans block uppercase text-blue-200", children: "EVENT TICKET" })] }), u.jsx("div", { className: "p-1 bg-white rounded-xl border border-slate-200 shadow-sm", children: u.jsx(si, { value: c, size: 66, level: "M", fgColor: "#0f1f4b", bgColor: "#ffffff", includeMargin: true }) }), u.jsx("span", { className: "text-[8px] font-black text-[#162a5c] block mt-0.5 leading-tight", children: "\u064A\u0631\u062C\u0649 \u0625\u0628\u0631\u0627\u0632 \u0627\u0644\u062A\u0630\u0643\u0631\u0629 \u0639\u0646\u062F \u0627\u0644\u062F\u062E\u0648\u0644" }), u.jsx("span", { className: "text-[6.5px] text-slate-500 font-sans block leading-none", children: "Please show your ticket at the entrance" })] }), u.jsxs("div", { className: "flex flex-col items-center justify-center text-center pr-1", children: [u.jsx(_x, { code: iA, className: "h-6 sm:h-7" }), u.jsxs("div", { className: "mt-1", children: [u.jsx("span", { className: "text-xs font-black text-[#162a5c] block leading-tight", children: "\u062A\u0639\u0644\u064A\u0645 \u064A\u0635\u0646\u0639 \u0627\u0644\u0641\u0631\u0635" }), u.jsx("span", { className: "text-[6.5px] font-bold text-slate-500 uppercase tracking-wider font-sans block mt-0.5", children: "EDUCATION CREATES OPPORTUNITIES" }), u.jsx("div", { className: "w-6 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full mx-auto mt-1" })] })] })] }) }), u.jsx("div", { className: "w-full mt-auto relative z-10", children: u.jsxs("div", { className: "bg-gradient-to-r from-[#202778] via-[#1a2f6e] to-[#121c4a] text-white py-1.5 px-3 rounded-b-[26px] sm:rounded-b-[30px] flex items-center justify-between shadow-lg", children: [u.jsxs("div", { className: "text-right flex items-center gap-1.5", children: [u.jsx("div", { className: "w-3.5 h-[2px] bg-cyan-400 rounded-full" }), u.jsxs("div", { children: [u.jsx("span", { className: "text-[8.5px] font-black block leading-tight", children: "\u0625\u062F\u0627\u0631\u0629 \u062A\u0639\u0644\u064A\u0645 \u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631" }), u.jsx("span", { className: "text-[6px] text-blue-200 font-sans tracking-wide block uppercase leading-none mt-0.5", children: "Aseer Education General Directorate" })] })] }), u.jsxs("div", { className: "text-left", children: [u.jsx("span", { className: "text-[8.5px] font-black block leading-tight", children: "\u062A\u0639\u0644\u064A\u0645 \u064A\u062F\u0639\u0645 .. \u0644\u0645\u062C\u062A\u0645\u0639 \u0627\u0644\u0641\u0631\u0635" }), u.jsx("span", { className: "text-[6px] text-blue-200 font-sans tracking-wide block uppercase leading-none mt-0.5", children: "EDUCATION SUPPORTS .. FOR A COMMUNITY OF OPPORTUNITIES" })] })] }) })] });
    }
    const x = f != null && f.date ? f.date.split("(")[0].trim() : "2026/10/07", F = f != null && f.time ? f.time.split("(")[0].trim() : "08:00 \u0645", I = (f == null ? void 0 : f.venue) || "\u0645\u0633\u0631\u062D \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645", H = A2.entrance || "\u0627\u0644\u0645\u062F\u062E\u0644 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", L = `20261007${C2}${String(A2.number).padStart(3, "0")}`;
    return u.jsxs("div", { ref: a, dir: "rtl", className: `relative w-full max-w-[360px] aspect-[9/16] bg-gradient-to-b from-[#f8fbff] via-[#eef5fc] to-[#e4f0fa] text-[#0e2b5c] rounded-[24px] sm:rounded-[28px] shadow-[0_16px_50px_rgba(14,43,92,0.25)] border-2 border-indigo-200/80 overflow-hidden select-none flex flex-col ${l2}`, style: { fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: "9 / 16" }, children: [u.jsx("div", { className: "absolute inset-0 z-0 bg-cover bg-center pointer-events-none", style: { backgroundImage: `url(${xd})` } }), u.jsx("div", { className: "absolute inset-0 z-0 pointer-events-none", style: { background: "linear-gradient(180deg, rgba(248,251,255,0.78) 0%, rgba(248,251,255,0.94) 18%, rgba(248,251,255,0.94) 62%, rgba(220,235,255,0.3) 84%, rgba(100,140,220,0) 100%)" } }), u.jsxs("div", { className: "relative z-10 pt-3.5 px-4 flex items-center justify-between", children: [u.jsx("div", { className: "flex items-center justify-center min-h-[42px]", children: d && !m2 ? u.jsx("img", { src: d, alt: (f == null ? void 0 : f.title) || "\u0634\u0639\u0627\u0631 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629", onError: () => w2(true), className: "h-10 max-h-10 max-w-[120px] object-contain" }) : u.jsx(wl, { className: "h-9", color: "#0e2b5c", textColor: "#0e2b5c", subColor: "#476694" }) }), u.jsxs("div", { className: "text-center flex-1 px-2", children: [u.jsx("div", { className: "text-[9px] font-bold text-slate-500 font-serif mb-0.5 select-none", children: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0627\u0644\u0631\u064E\u0651\u062D\u0652\u0645\u064E\u0670\u0646\u0650 \u0627\u0644\u0631\u064E\u0651\u062D\u0650\u064A\u0645\u0650" }), u.jsx("h1", { className: "text-lg sm:text-xl font-black tracking-tight text-[#0e2b5c] leading-none", children: B }), u.jsx("div", { className: "w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mx-auto mt-1" }), u.jsx("p", { className: "text-[7px] font-black text-slate-500 tracking-[0.2em] uppercase font-sans mt-0.5", children: p })] }), u.jsxs("div", { className: "bg-[#0e2b5c] text-white px-2.5 py-1.5 rounded-xl shadow-md min-w-[52px] text-center", children: [u.jsx("span", { className: "text-[8px] font-bold text-blue-200 block uppercase tracking-wider leading-none", children: "\u0645\u0642\u0639\u062F" }), u.jsx("span", { className: "font-mono text-base font-black tracking-widest leading-tight block", children: h })] })] }), ((g = A2.guest) == null ? void 0 : g.name) && u.jsxs("div", { className: "relative z-10 mx-3.5 mt-2 bg-white/90 backdrop-blur-sm border border-cyan-200 rounded-2xl px-3 py-2 shadow-sm text-center", children: [u.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-0.5", children: [u.jsx(ff, { className: "w-3 h-3 text-[#008ba3]" }), u.jsx("span", { className: "text-[9px] font-bold text-[#008ba3] uppercase tracking-wider", children: "\u0627\u0644\u0636\u064A\u0641 \u0627\u0644\u0645\u062D\u062A\u0631\u0645" })] }), u.jsx("span", { className: "text-sm font-black text-[#0e2b5c] block leading-tight truncate", children: A2.guest.name }), A2.guest.jobTitle && u.jsx("span", { className: "text-[10px] font-bold text-[#008ba3] block mt-0.5 truncate", children: A2.guest.jobTitle }), A2.guest.category && u.jsx("span", { className: "inline-block mt-1 text-[9px] font-black text-cyan-900 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full", children: A2.guest.category })] }), u.jsx("div", { className: "relative z-10 flex justify-center mt-2 mx-3.5", children: u.jsxs("div", { className: "w-full bg-white rounded-2xl border border-slate-200 shadow-md flex items-center gap-3 px-3 py-2.5", children: [u.jsx("div", { className: "shrink-0 p-1.5 bg-white border border-slate-100 rounded-xl", children: u.jsx(si, { value: c, size: (E = A2.guest) != null && E.name ? 94 : 108, level: "M", fgColor: "#0e2b5c", bgColor: "#ffffff", includeMargin: true }) }), u.jsxs("div", { className: "flex-1 text-right min-w-0", children: [u.jsxs("div", { className: "flex items-center justify-end gap-1 mb-1", children: [u.jsx("span", { className: "text-[9px] font-bold text-[#008ba3] uppercase tracking-wider", children: "\u0627\u0645\u0633\u062D \u0644\u0644\u062A\u062D\u0642\u0642" }), u.jsx("div", { className: "w-4 h-4 rounded-full bg-[#008ba3]/10 flex items-center justify-center", children: u.jsx("span", { className: "text-[8px]", children: "\u{1F4F2}" }) })] }), u.jsxs("div", { className: "bg-[#0e2b5c] text-white rounded-xl px-2 py-1 text-center mb-1.5", children: [u.jsx("span", { className: "text-[8px] font-bold text-blue-300 block leading-none", children: "\u0645\u0648\u0642\u0639 \u0645\u0642\u0639\u062F\u0643" }), u.jsx("span", { className: "font-mono text-xl font-black tracking-widest leading-tight block", children: h })] }), u.jsxs("div", { className: "space-y-0.5", children: [u.jsxs("div", { className: "flex items-center justify-end gap-1", children: [u.jsx("span", { className: "text-[9px] font-black text-[#0e2b5c]", children: A2.levelName || (A2.level === "B" ? "\u0627\u0644\u0628\u0644\u0643\u0648\u0646\u0629" : "\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0631\u0636\u064A") }), u.jsx("span", { className: "text-[8px] text-slate-500", children: ":\u0627\u0644\u062F\u0648\u0631" })] }), u.jsxs("div", { className: "flex items-center justify-end gap-1", children: [u.jsx("span", { className: "text-[9px] font-black text-[#0e2b5c]", children: A2.sector || "\u0627\u0644\u0648\u0633\u0637" }), u.jsx("span", { className: "text-[8px] text-slate-500", children: ":\u0627\u0644\u0642\u0637\u0627\u0639" })] }), u.jsx("div", { className: "text-[7px] font-mono text-slate-400 font-bold tracking-wider mt-0.5", children: L })] })] })] }) }), u.jsxs("div", { className: "relative z-10 mx-3.5 mt-2.5 flex-1", children: [u.jsxs("div", { className: "grid grid-cols-2 gap-1.5 mb-1.5", children: [u.jsxs("div", { className: "bg-white/90 backdrop-blur-sm border border-indigo-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs", children: [u.jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0", children: u.jsx(af, { className: "w-4 h-4 text-indigo-600" }) }), u.jsxs("div", { className: "text-right flex-1 min-w-0", children: [u.jsx("span", { className: "text-[8px] font-bold text-slate-400 block leading-none", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E" }), u.jsx("span", { className: "text-[10px] font-black text-[#0e2b5c] block leading-tight mt-0.5 truncate", children: x.includes("\u060C") && ((N2 = x.split("\u060C")[1]) == null ? void 0 : N2.trim()) || x }), u.jsx("span", { className: "text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5", children: x.includes("\u0627\u0644\u062C\u0645\u0639\u0629") ? "Friday" : x.includes("\u0627\u0644\u0633\u0628\u062A") ? "Saturday" : "Wednesday" })] })] }), u.jsxs("div", { className: "bg-white/90 backdrop-blur-sm border border-cyan-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs", children: [u.jsx("div", { className: "w-8 h-8 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0", children: u.jsx(lf, { className: "w-4 h-4 text-cyan-600" }) }), u.jsxs("div", { className: "text-right flex-1 min-w-0", children: [u.jsx("span", { className: "text-[8px] font-bold text-slate-400 block leading-none", children: "\u0627\u0644\u0648\u0642\u062A" }), u.jsx("span", { className: "text-[11px] font-black font-mono text-[#0e2b5c] block leading-tight mt-0.5", children: F }), u.jsx("span", { className: "text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5", children: "PM 07:00" })] })] })] }), u.jsxs("div", { className: "grid grid-cols-2 gap-1.5 mb-1.5", children: [u.jsxs("div", { className: "bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs", children: [u.jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0", children: u.jsx(uf, { className: "w-4 h-4 text-emerald-600" }) }), u.jsxs("div", { className: "text-right flex-1 min-w-0", children: [u.jsx("span", { className: "text-[8px] font-bold text-slate-400 block leading-none", children: "\u0627\u0644\u0645\u0648\u0642\u0639" }), u.jsx("span", { className: "text-[9px] font-black text-[#0e2b5c] block leading-tight mt-0.5 line-clamp-2", children: I }), u.jsx("span", { className: "text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5", children: "Theater" })] })] }), u.jsxs("div", { className: "bg-white/90 backdrop-blur-sm border border-amber-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs", children: [u.jsx("div", { className: "w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0", children: u.jsx(of, { className: "w-4 h-4 text-amber-600" }) }), u.jsxs("div", { className: "text-right flex-1 min-w-0", children: [u.jsx("span", { className: "text-[8px] font-bold text-slate-400 block leading-none", children: "\u0627\u0644\u0645\u062F\u062E\u0644" }), u.jsx("span", { className: "text-[9px] font-black text-[#0e2b5c] block leading-tight mt-0.5 line-clamp-2", children: H }), u.jsx("span", { className: "text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5", children: "Main Entrance" })] })] })] }), u.jsxs("div", { className: "grid grid-cols-2 gap-1.5", children: [u.jsxs("div", { className: "bg-gradient-to-br from-[#0c234b] to-[#1a3d7c] border border-indigo-700/60 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-sm", children: [u.jsx("div", { className: "w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0", children: u.jsx(ki, { className: "w-4 h-4 text-white" }) }), u.jsxs("div", { className: "text-right flex-1", children: [u.jsx("span", { className: "text-[8px] font-bold text-blue-300 block leading-none", children: "\u0631\u0642\u0645 \u0627\u0644\u0645\u0642\u0639\u062F" }), u.jsx("span", { className: "text-2xl font-black font-mono text-white block leading-tight mt-0.5", children: U }), u.jsx("span", { className: "text-[6.5px] text-blue-300 font-sans block leading-none", children: "Seat No." })] })] }), u.jsxs("div", { className: "bg-gradient-to-br from-[#0c234b] to-[#1a3d7c] border border-indigo-700/60 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-sm", children: [u.jsx("div", { className: "w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0", children: u.jsx(uo, { className: "w-4 h-4 text-white" }) }), u.jsxs("div", { className: "text-right flex-1", children: [u.jsx("span", { className: "text-[8px] font-bold text-blue-300 block leading-none", children: "\u0631\u0642\u0645 \u0627\u0644\u0635\u0641" }), u.jsx("span", { className: "text-2xl font-black font-mono text-white block leading-tight mt-0.5", children: C2 }), u.jsx("span", { className: "text-[6.5px] text-blue-300 font-sans block leading-none", children: "Row" })] })] })] })] }), u.jsx("div", { className: "w-full relative mt-auto z-10 pt-1.5", children: u.jsxs("div", { className: "bg-gradient-to-r from-[#0c1e45]/96 via-[#102a63]/96 to-[#0c1e45]/96 text-white py-2 px-3 text-center border-t border-cyan-400/30 shadow-inner rounded-b-[22px] sm:rounded-b-[26px]", children: [u.jsx("p", { className: "text-[10px] sm:text-[11px] font-bold tracking-wide", children: i }), u.jsx("p", { className: "text-[7px] text-cyan-200 font-sans mt-0.5 opacity-75", children: "\u0646\u0638\u0627\u0645 \u062D\u062C\u0632 \u0645\u0642\u0627\u0639\u062F \u0645\u0633\u0627\u0631\u062D \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631" })] }) })] });
  }
  function cy({ seat: A2, eventDetails: e = {}, onClose: t, onPreviewGuestView: r }) {
    const n = uA.useRef(null), [s, i] = uA.useState(false), [l2, a] = uA.useState(false), [o, c] = uA.useState(false);
    if (!A2 || !A2.guest) return null;
    const f = window.location.origin + window.location.pathname;
    _g(A2, f);
    const d = `${A2.row}${parseInt(A2.number, 10)}`;
    `${A2.row}${String(A2.number).padStart(3, "0")}`;
    const m2 = async () => {
      const U = n.current;
      if (U) {
        i(true);
        try {
          await Ox(U, `\u062A\u0630\u0643\u0631\u0629_\u062D\u0636\u0648\u0631_${A2.guest.name}_\u0645\u0642\u0639\u062F_${d}.png`, { pixelRatio: 3, backgroundColor: null, onSuccess: () => i(false), onError: () => i(false) });
        } catch (h) {
          console.error("Error rendering PNG ticket", h), alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."), i(false);
        }
      }
    }, w2 = () => {
      try {
        document.body.classList.add("is-printing-card"), window.print();
      } catch (U) {
        console.error("Print error:", U);
      } finally {
        setTimeout(() => {
          document.body.classList.remove("is-printing-card");
        }, 1200);
      }
    }, C2 = () => u.jsx(Vx, { innerRef: n, seat: A2, eventDetails: e, cardType: "attendance", customTitle: "\u0628\u0637\u0627\u0642\u0629 \u062D\u0636\u0648\u0631", customSubtitle: "ATTENDANCE TICKET", customSlogan: "\u0646\u0644\u062A\u0642\u064A \u0644\u0646\u0635\u0646\u0639 \u0623\u062C\u0645\u0644 \u0627\u0644\u0644\u062D\u0638\u0627\u062A", className: "shadow-[0_15px_40px_rgba(14,43,92,0.3)]" });
    return u.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 md:py-6 bg-[#030917]/90 backdrop-blur-2xl overflow-y-auto", children: u.jsxs("div", { className: "relative w-full max-w-xl my-2 flex flex-col items-center", children: [u.jsxs("div", { className: "no-print flex flex-wrap items-center justify-between mb-4 glass-panel-luxury p-3 sm:p-4 rounded-2xl border border-cyan-500/30 w-full gap-2 shadow-2xl", children: [u.jsxs("div", { className: "flex items-center gap-2.5", children: [u.jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md", children: u.jsx(uo, { className: "w-4 h-4" }) }), u.jsxs("div", { children: [u.jsx("span", { className: "text-xs sm:text-sm font-black text-white block", children: "\u062A\u0630\u0643\u0631\u0629 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0631\u0633\u0645\u064A\u0629 (\u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0639\u062A\u0645\u062F)" }), u.jsx("span", { className: "text-[10px] text-cyan-200", children: "\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0630\u0643\u064A \u0648\u0645\u0633\u0631\u062D \u062A\u0639\u0644\u064A\u0645 \u0639\u0633\u064A\u0631" })] })] }), u.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [u.jsxs("button", { onClick: m2, disabled: s, className: "px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5", children: [u.jsx(em, { className: "w-3.5 h-3.5" }), u.jsx("span", { children: s ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0643\u0635\u0648\u0631\u0629" })] }), u.jsxs("button", { onClick: w2, className: "px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5", children: [u.jsx(rm, { className: "w-3.5 h-3.5 text-cyan-300" }), u.jsx("span", { children: "\u0637\u0628\u0627\u0639\u0629" })] }), u.jsx("button", { onClick: t, className: "p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all", children: u.jsx(Og, { className: "w-5 h-5" }) })] })] }), u.jsx("div", { ref: n, dir: "rtl", className: "w-full max-w-md flex justify-center py-2", children: C2() })] }) });
  }

  // D:/برامجي/كراسي المسرح/dist/assets/BeneficiaryServicesGrid-CLcYA695.js
  var m = gA("Building2", [["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }], ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }], ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }], ["path", { d: "M10 6h4", key: "1itunk" }], ["path", { d: "M10 10h4", key: "tcdvrf" }], ["path", { d: "M10 14h4", key: "kelpxr" }], ["path", { d: "M10 18h4", key: "1ulq68" }]]);
  var l = gA("ChevronLeft", [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]);
  var y = gA("ExternalLink", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
  var w = gA("Info", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 16v-4", key: "1dtifu" }], ["path", { d: "M12 8h.01", key: "e9boi3" }]]);
  var v = gA("Maximize2", [["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }], ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }], ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }], ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]]);
  var N = gA("Minimize2", [["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }], ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }], ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }], ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]]);
  function M({ isOpen: d, onClose: s }) {
    const [t, a] = uA.useState(false), [h, x] = uA.useState(true), n = uA.useRef(null);
    if (!d) return null;
    const o = "https://fisal57-oss.github.io/itgan/booking_form_digital.html", f = () => {
      n.current && (x(true), n.current.src = o);
    }, b = () => {
      window.open(o, "_blank");
    };
    return u.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: { backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }, onClick: (c) => {
      c.target === c.currentTarget && s();
    }, children: u.jsxs("div", { className: `relative flex flex-col bg-slate-950 rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden transition-all duration-300 ${t ? "w-full h-full rounded-none" : "w-full max-w-4xl"}`, style: t ? {} : { height: "90vh" }, children: [u.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border-b border-amber-500/20 flex-shrink-0", children: [u.jsxs("div", { className: "flex items-center gap-3", children: [u.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20", children: u.jsx(m, { className: "w-5 h-5 text-slate-950" }) }), u.jsxs("div", { children: [u.jsx("h2", { className: "text-sm font-black text-white", children: "\u0646\u0645\u0648\u0630\u062C \u0637\u0644\u0628 \u062D\u062C\u0632 \u0642\u0627\u0639\u0629 / \u0645\u0633\u0631\u062D" }), u.jsx("p", { className: "text-[10px] text-amber-300/80 font-medium", children: "\u062A\u0639\u0644\u064A\u0645 \u0639\u0633\u064A\u0631 \u2014 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0631\u0633\u0645\u064A \u0627\u0644\u0631\u0642\u0645\u064A" })] })] }), u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsx("button", { onClick: f, title: "\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0645\u0648\u0630\u062C", className: "w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all", children: u.jsx(nm, { className: "w-4 h-4" }) }), u.jsx("button", { onClick: b, title: "\u0641\u062A\u062D \u0641\u064A \u062A\u0628\u0648\u064A\u0628 \u062C\u062F\u064A\u062F", className: "w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all", children: u.jsx(y, { className: "w-4 h-4" }) }), u.jsx("button", { onClick: () => a(!t), title: t ? "\u062A\u0635\u063A\u064A\u0631" : "\u062A\u0643\u0628\u064A\u0631", className: "w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all", children: t ? u.jsx(N, { className: "w-4 h-4" }) : u.jsx(v, { className: "w-4 h-4" }) }), u.jsx("button", { onClick: s, title: "\u0625\u063A\u0644\u0627\u0642", className: "w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all", children: u.jsx(Og, { className: "w-4 h-4" }) })] })] }), h && u.jsxs("div", { className: "absolute inset-0 top-[52px] flex flex-col items-center justify-center bg-slate-950 z-10", children: [u.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-amber-500/30 border-t-amber-400 animate-spin mb-4" }), u.jsx("p", { className: "text-slate-400 text-sm", children: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u062C\u0632..." })] }), u.jsx("iframe", { ref: n, src: o, title: "\u0646\u0645\u0648\u0630\u062C \u0637\u0644\u0628 \u062D\u062C\u0632 \u0642\u0627\u0639\u0629 / \u0645\u0633\u0631\u062D", className: "w-full flex-1 border-0", onLoad: () => x(false), style: { background: "#f1f5f9" }, allow: "clipboard-write" })] }) });
  }
  function C({ onOpenVenueModal: d, activeTab: s, onSelectTab: t, onFocusSearch: a }) {
    return u.jsxs("div", { className: "space-y-4", children: [u.jsxs("div", { className: "flex items-center justify-between px-1", children: [u.jsxs("div", { className: "flex items-center gap-2", children: [u.jsxs("span", { className: "relative flex h-3 w-3", children: [u.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }), u.jsx("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-amber-500" })] }), u.jsxs("h3", { className: "text-sm sm:text-base font-black text-white flex items-center gap-2", children: [u.jsx("span", { children: "\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0648\u062D\u062C\u0632 \u0627\u0644\u0642\u0627\u0639\u0627\u062A" }), u.jsx("span", { className: "text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold", children: "\u0645\u062A\u0627\u062D \u0644\u0644\u062C\u0647\u0627\u062A \u0648\u0627\u0644\u0636\u064A\u0648\u0641" })] })] }), u.jsx("span", { className: "text-xs text-slate-400 hidden sm:inline", children: "\u0627\u062E\u062A\u0631 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0633\u0631\u064A\u0639" })] }), u.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4", children: [u.jsxs("a", { href: "https://fisal57-oss.github.io/itgan/booking_form_digital.html", target: "_blank", rel: "noopener noreferrer", className: "glass-panel-luxury p-4 rounded-2xl border border-amber-500/40 hover:border-amber-400 bg-gradient-to-b from-amber-500/15 via-slate-900/70 to-slate-950/90 hover:from-amber-500/25 transition-all text-right group shadow-lg hover:shadow-amber-500/10 active:scale-95 flex flex-col justify-between cursor-pointer no-underline", children: [u.jsxs("div", { className: "flex items-start justify-between w-full mb-3", children: [u.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform", children: u.jsx(m, { className: "w-6 h-6 text-slate-950" }) }), u.jsx("span", { className: "text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold", children: "\u0645\u062A\u0627\u062D \u0644\u0644\u062C\u0647\u0627\u062A" })] }), u.jsxs("div", { children: [u.jsx("h4", { className: "text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors", children: "\u062D\u062C\u0632 \u0627\u0644\u0642\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u0645\u0633\u0627\u0631\u062D" }), u.jsx("p", { className: "text-[11px] text-slate-400 mt-1 line-clamp-2", children: "\u062A\u0642\u062F\u064A\u0645 \u0637\u0644\u0628 \u062D\u062C\u0632 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0644\u0645\u0633\u0627\u0631\u062D \u0648\u0642\u0627\u0639\u0627\u062A \u062A\u0639\u0644\u064A\u0645 \u0639\u0633\u064A\u0631" })] }), u.jsxs("div", { className: "mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-amber-400 font-bold", children: [u.jsx("span", { children: "\u0637\u0644\u0628 \u062D\u062C\u0632 \u0645\u0633\u0631\u062D / \u0642\u0627\u0639\u0629 \u{1F3DB}\uFE0F" }), u.jsx(l, { className: "w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" })] })] }), u.jsxs("button", { type: "button", onClick: () => {
      t && t("find"), a && a();
    }, className: `glass-panel-luxury p-4 rounded-2xl border ${s === "find" ? "border-cyan-400 bg-gradient-to-b from-cyan-500/25 via-slate-900/70 to-slate-950/90" : "border-cyan-500/30 hover:border-cyan-400 bg-gradient-to-b from-cyan-500/15 via-slate-900/70 to-slate-950/90 hover:from-cyan-500/25"} transition-all text-right group shadow-lg hover:shadow-cyan-500/10 active:scale-95 flex flex-col justify-between cursor-pointer`, children: [u.jsxs("div", { className: "flex items-start justify-between w-full mb-3", children: [u.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform", children: u.jsx(uo, { className: "w-6 h-6 text-slate-950" }) }), u.jsx("span", { className: "text-[9px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full font-bold", children: "\u0628\u062D\u062B \u0641\u0648\u0631\u064A" })] }), u.jsxs("div", { children: [u.jsx("h4", { className: "text-xs sm:text-sm font-black text-white group-hover:text-cyan-300 transition-colors", children: "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u062A\u0630\u0643\u0631\u062A\u064A \u0648\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F" }), u.jsx("p", { className: "text-[11px] text-slate-400 mt-1 line-clamp-2", children: "\u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644 \u0648\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062F\u062E\u0648\u0644" })] }), u.jsxs("div", { className: "mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-cyan-400 font-bold", children: [u.jsx("span", { children: "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u062A\u0630\u0643\u0631\u062A\u064A \u{1F39F}\uFE0F" }), u.jsx(l, { className: "w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" })] })] }), u.jsxs("button", { type: "button", onClick: () => t && t("map"), className: `glass-panel-luxury p-4 rounded-2xl border ${s === "map" ? "border-purple-400 bg-gradient-to-b from-purple-500/25 via-slate-900/70 to-slate-950/90" : "border-purple-500/30 hover:border-purple-400 bg-gradient-to-b from-purple-500/15 via-slate-900/70 to-slate-950/90 hover:from-purple-500/25"} transition-all text-right group shadow-lg hover:shadow-purple-500/10 active:scale-95 flex flex-col justify-between cursor-pointer`, children: [u.jsxs("div", { className: "flex items-start justify-between w-full mb-3", children: [u.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform", children: u.jsx(ki, { className: "w-6 h-6 text-slate-950" }) }), u.jsx("span", { className: "text-[9px] bg-purple-400/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full font-bold", children: "\u0645\u062E\u0637\u0637 \u0627\u0644\u0645\u0642\u0627\u0639\u062F" })] }), u.jsxs("div", { children: [u.jsx("h4", { className: "text-xs sm:text-sm font-black text-white group-hover:text-purple-300 transition-colors", children: "\u062E\u0631\u064A\u0637\u0629 \u0643\u0631\u0627\u0633\u064A \u0627\u0644\u0645\u0633\u0631\u062D" }), u.jsx("p", { className: "text-[11px] text-slate-400 mt-1 line-clamp-2", children: "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0648\u0645\u062F\u0631\u062C\u0627\u062A \u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629" })] }), u.jsxs("div", { className: "mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-purple-400 font-bold", children: [u.jsx("span", { children: "\u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u{1F5FA}\uFE0F" }), u.jsx(l, { className: "w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" })] })] }), u.jsxs("button", { type: "button", onClick: () => t && t("info"), className: `glass-panel-luxury p-4 rounded-2xl border ${s === "info" ? "border-emerald-400 bg-gradient-to-b from-emerald-500/25 via-slate-900/70 to-slate-950/90" : "border-emerald-500/30 hover:border-emerald-400 bg-gradient-to-b from-emerald-500/15 via-slate-900/70 to-slate-950/90 hover:from-emerald-500/25"} transition-all text-right group shadow-lg hover:shadow-emerald-500/10 active:scale-95 flex flex-col justify-between cursor-pointer`, children: [u.jsxs("div", { className: "flex items-start justify-between w-full mb-3", children: [u.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform", children: u.jsx(w, { className: "w-6 h-6 text-slate-950" }) }), u.jsx("span", { className: "text-[9px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold", children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631" })] }), u.jsxs("div", { children: [u.jsx("h4", { className: "text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition-colors", children: "\u062F\u0644\u064A\u0644 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629" }), u.jsx("p", { className: "text-[11px] text-slate-400 mt-1 line-clamp-2", children: "\u0627\u0644\u062A\u0648\u0642\u064A\u062A\u060C \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062C\u063A\u0631\u0627\u0641\u064A\u060C \u0648\u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629" })] }), u.jsxs("div", { className: "mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-emerald-400 font-bold", children: [u.jsx("span", { children: "\u0639\u0631\u0636 \u0627\u0644\u062F\u0644\u064A\u0644 \u{1F4CB}" }), u.jsx(l, { className: "w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" })] })] })] })] });
  }

  // D:/برامجي/كراسي المسرح/dist/assets/beneficiary-2SSGm8nB.js
  function we2() {
    const f = new URLSearchParams(window.location.search), g = f.get("q") || f.get("token") || f.get("invitation") || "", y2 = f.get("seat") || "", [j, S2] = uA.useState(nt()), [n, W2] = uA.useState(Tu()), [d, m2] = uA.useState("find"), [h, C2] = uA.useState(g), [t, b] = uA.useState(null), [X, I] = uA.useState(false), [$, L] = uA.useState(false), [Y2, v2] = uA.useState(false), [Ne2, Z] = uA.useState(null), [x, w2] = uA.useState(null), [p, B] = uA.useState(""), [M2, E] = uA.useState(""), [T2, A2] = uA.useState(false), [V, F] = uA.useState("");
    uA.useEffect(() => {
      async function s() {
        const [a, i] = await Promise.all([qx(), Ay()]);
        if (a && S2(a), i && W2(i), y2) {
          const r = a.find((c) => c.id.toLowerCase() === y2.toLowerCase());
          r && b(r);
        } else if (g) {
          const r = g.toLowerCase(), c = a.find((o) => o.guest && (o.guest.token && o.guest.token.toLowerCase() === r || o.guest.name.toLowerCase().includes(r) || o.id.toLowerCase() === r));
          c && b(c);
        }
      }
      s();
    }, [g, y2]);
    const R = j.filter((s) => s.guest && s.status !== "available"), k = R.filter((s) => {
      var P, D2, Q;
      if (!h.trim()) return false;
      const a = h.trim().toLowerCase(), i = (((P = s.guest) == null ? void 0 : P.name) || "").toLowerCase(), r = (((D2 = s.guest) == null ? void 0 : D2.phone) || "").toLowerCase(), c = (((Q = s.guest) == null ? void 0 : Q.token) || "").toLowerCase(), o = s.id.toLowerCase(), ae2 = xn(s).toLowerCase(), le2 = `${s.row}${parseInt(s.number, 10)}`.toLowerCase();
      return i.includes(a) || r.includes(a) || c.includes(a) || o.includes(a) || ae2.includes(a) || le2 === a;
    }), _ = j.filter((s) => s.status === "available").length, ee2 = (s) => {
      if (!s || !s.guest) return;
      const a = `\u{1F39F}\uFE0F \u062A\u0630\u0643\u0631\u0629 \u062D\u0636\u0648\u0631 \u0645\u0633\u0631\u062D \u0627\u0644\u062A\u0639\u0644\u064A\u0645
\u{1F464} \u0627\u0644\u0627\u0633\u0645: ${s.guest.name}
\u{1F4CD} \u0627\u0644\u0645\u0642\u0639\u062F: ${xn(s)} (${s.levelName} - \u0642\u0637\u0627\u0639 ${s.sector})
\u{1F4C5} \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629: ${n.title}
\u23F0 \u0627\u0644\u0645\u0648\u0639\u062F: ${n.date} - ${n.time}
\u{1F511} \u0631\u0645\u0632 \u0627\u0644\u062A\u0630\u0643\u0631\u0629: ${s.guest.token}`;
      navigator.clipboard.writeText(a), L(true), setTimeout(() => L(false), 2500);
    }, se2 = (s) => {
      s.status === "available" ? (w2(s), B(""), E("")) : (b(s), m2("find"));
    }, te2 = async (s) => {
      if (s.preventDefault(), !x || !p.trim()) return;
      A2(true);
      const a = { name: p.trim(), phone: M2.trim(), category: "\u0639\u0627\u0645", notes: "\u062D\u062C\u0632 \u0630\u0627\u062A\u064A \u0639\u0628\u0631 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F" }, i = await ey(x.id, a);
      if (A2(false), i.success) {
        try {
          Jx({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
        }
        const r = nt();
        S2(r);
        const c = r.find((o) => o.id === x.id);
        b(c || i.seat), w2(null), m2("find"), F(`\u062A\u0647\u0627\u0646\u064A\u0646\u0627 ${p}! \u062A\u0645 \u062D\u062C\u0632 \u0627\u0644\u0645\u0642\u0639\u062F (${xn(c || i.seat)}) \u0628\u0646\u062C\u0627\u062D.`), setTimeout(() => F(""), 6e3);
      } else alert("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062D\u062C\u0632\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");
    };
    return u.jsxs("div", { className: "min-h-screen bg-[#080E1A] text-white flex flex-col justify-between font-sans selection:bg-cyan-400 selection:text-slate-950", children: [u.jsxs("header", { className: "bg-[#060B14]/95 border-b border-cyan-500/20 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl", children: [u.jsxs("div", { className: "flex items-center gap-3", children: [n != null && n.logoUrl ? u.jsx("img", { src: n.logoUrl, alt: "\u0634\u0639\u0627\u0631 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629", className: "h-10 max-h-10 max-w-[120px] object-contain rounded-xl p-1 bg-white/10 border border-white/20 shadow-md shrink-0" }) : u.jsx("div", { className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-black", children: u.jsx(uo, { className: "w-5 h-5" }) }), u.jsxs("div", { children: [u.jsx("h1", { className: "text-base sm:text-lg font-black tracking-wide text-white", children: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F \u0648\u0627\u0644\u0636\u064A\u0648\u0641" }), u.jsx("p", { className: "text-[10px] text-cyan-300 font-bold tracking-wider", children: n.organizer || "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0631\u062D \u0648\u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0627\u062A" })] })] }), u.jsxs("nav", { className: "flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1 rounded-2xl border border-white/10 text-xs font-bold flex-wrap justify-end", children: [u.jsxs("button", { onClick: () => m2("find"), className: `flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${d === "find" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"}`, children: [u.jsx(im, { className: "w-3.5 h-3.5" }), u.jsx("span", { children: "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u062A\u0630\u0643\u0631\u062A\u064A" })] }), u.jsxs("button", { onClick: () => m2("map"), className: `flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${d === "map" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"}`, children: [u.jsx(Wx, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "hidden sm:inline", children: "\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0633\u0631\u062D" }), u.jsx("span", { className: "sm:hidden", children: "\u0627\u0644\u062E\u0631\u064A\u0637\u0629" })] }), u.jsxs("button", { onClick: () => m2("info"), className: `flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl transition-all ${d === "info" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md" : "text-slate-300 hover:text-white hover:bg-white/5"}`, children: [u.jsx(w, { className: "w-3.5 h-3.5" }), u.jsx("span", { className: "hidden sm:inline", children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629" }), u.jsx("span", { className: "sm:hidden", children: "\u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629" })] }), u.jsxs("button", { onClick: () => v2(true), className: "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 hover:from-amber-500/30 hover:to-yellow-400/30 text-amber-300 border border-amber-400/40 transition-all shadow-sm active:scale-95", title: "\u0637\u0644\u0628 \u062D\u062C\u0632 \u0645\u0633\u0631\u062D \u0623\u0648 \u0642\u0627\u0639\u0629 \u0631\u0633\u0645\u064A\u0629 \u0644\u0644\u0641\u0639\u0627\u0644\u064A\u0627\u062A", children: [u.jsx(m, { className: "w-3.5 h-3.5 text-amber-400" }), u.jsx("span", { children: "\u062D\u062C\u0632 \u0627\u0644\u0642\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u0645\u0633\u0627\u0631\u062D" }), u.jsx("span", { className: "text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full hidden sm:inline-block", children: "\u062C\u062F\u064A\u062F" })] })] })] }), u.jsxs("main", { className: "flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6", children: [u.jsx(C, { onOpenVenueModal: (s) => {
      Z(s || null), v2(true);
    }, activeTab: d, onSelectTab: m2, onFocusSearch: () => {
      const s = document.getElementById("ticketSearchInput");
      s && (s.focus(), s.scrollIntoView({ behavior: "smooth", block: "center" }));
    } }), V && u.jsxs("div", { className: "p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-lg animate-fade-in", children: [u.jsx(Xx, { className: "w-5 h-5 text-emerald-400 shrink-0" }), u.jsx("span", { children: V })] }), d === "find" && u.jsxs("div", { className: "space-y-6", children: [u.jsxs("div", { className: "glass-panel-luxury p-5 sm:p-6 rounded-3xl border border-white/15 space-y-4", children: [u.jsxs("label", { className: "text-xs sm:text-sm font-black text-white flex items-center justify-between", children: [u.jsxs("span", { className: "flex items-center gap-2", children: [u.jsx(im, { className: "w-4 h-4 text-cyan-400" }), u.jsx("span", { children: "\u0627\u0628\u062D\u062B \u0639\u0646 \u062A\u0630\u0643\u0631\u062A\u0643 \u0628\u0627\u0633\u0645\u0643\u060C \u0628\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644\u060C \u0623\u0648 \u0628\u0631\u0642\u0645 \u0627\u0644\u0645\u0642\u0639\u062F:" })] }), u.jsxs("span", { className: "text-[11px] text-slate-400 font-normal", children: ["(\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A: ", R.length, ")"] })] }), u.jsxs("div", { className: "relative", children: [u.jsx("input", { id: "ticketSearchInput", type: "text", placeholder: "\u0627\u0643\u062A\u0628 \u0627\u0633\u0645\u0643 \u0627\u0644\u0643\u0627\u0645\u0644 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0645\u0642\u0639\u062F \u0647\u0646\u0627...", value: h, onChange: (s) => C2(s.target.value), className: "w-full bg-slate-950/90 border-2 border-cyan-500/30 focus:border-cyan-400 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-white placeholder-slate-400 outline-none transition-all shadow-inner" }), h && u.jsx("button", { onClick: () => {
      C2(""), b(null);
    }, className: "absolute left-4 top-3.5 text-slate-400 hover:text-white text-xs font-bold bg-white/10 px-2 py-1 rounded-lg", children: "\u0645\u0633\u062D \u2715" })] }), h.trim() && u.jsx("div", { className: "pt-2", children: k.length === 0 ? u.jsxs("div", { className: "p-4 text-center text-slate-400 text-xs font-bold bg-slate-900/50 rounded-2xl border border-white/10", children: ['\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u064A \u062D\u062C\u0632 \u0645\u0631\u062A\u0628\u0637 \u0628\u0640 "', h, '". \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0643\u062A\u0627\u0628\u0629 \u0627\u0644\u0627\u0633\u0645 \u0628\u062F\u0642\u0629 \u0643\u0645\u0627 \u0633\u064F\u062C\u0651\u0644 \u0639\u0646\u062F \u0627\u0644\u062D\u062C\u0632.'] }) : u.jsxs("div", { className: "space-y-2 max-h-72 overflow-y-auto pr-1", children: [u.jsxs("div", { className: "text-[11px] text-cyan-300 font-bold px-1", children: ["\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0628\u062D\u062B (", k.length, " \u062D\u062C\u0632):"] }), k.map((s) => u.jsxs("button", { onClick: () => b(s), className: `w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${(t == null ? void 0 : t.id) === s.id ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg" : "bg-slate-900/80 border-white/10 hover:bg-slate-800 text-slate-200"}`, children: [u.jsxs("div", { className: "space-y-1", children: [u.jsxs("div", { className: "font-black text-sm text-white flex items-center gap-2", children: [u.jsx("span", { children: s.guest.name }), u.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30", children: s.guest.category })] }), u.jsxs("div", { className: "text-xs text-slate-400 font-mono", children: ["\u0627\u0644\u0645\u0642\u0639\u062F: ", xn(s), " \u2022 ", s.levelName, " (", s.sector, ")"] })] }), u.jsx("div", { className: "px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-xs shadow-md shrink-0", children: "\u0639\u0631\u0636 \u0627\u0644\u062A\u0630\u0643\u0631\u0629 \u{1F39F}\uFE0F" })] }, s.id))] }) })] }), t && u.jsxs("div", { className: "space-y-6 animate-fade-in", children: [u.jsxs("div", { className: "glass-panel-luxury p-5 sm:p-8 rounded-3xl border border-cyan-400/40 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c162b] via-[#080E1A] to-[#0c162b]", children: [u.jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" }), u.jsxs("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10", children: [u.jsxs("div", { children: [u.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30 mb-2", children: [u.jsx(Xx, { className: "w-3.5 h-3.5" }), u.jsx("span", { children: "\u062A\u0630\u0643\u0631\u0629 \u0645\u0624\u0643\u062F\u0629 \u0648\u0645\u0639\u062A\u0645\u062F\u0629" })] }), u.jsx("h3", { className: "text-xl sm:text-2xl font-black text-white", children: t.guest.name }), u.jsxs("p", { className: "text-xs text-cyan-300 font-bold mt-0.5", children: ["\u0627\u0644\u0641\u0626\u0629: ", t.guest.category, " ", t.guest.phone ? `\u2022 \u0627\u0644\u062C\u0648\u0627\u0644: ${t.guest.phone}` : ""] })] }), u.jsxs("div", { className: "flex flex-wrap items-center gap-2.5 w-full lg:w-auto", children: [u.jsxs("button", { onClick: () => I(true), className: "flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#334b85] to-[#7952b3] hover:brightness-110 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2", children: [u.jsx(uo, { className: "w-4 h-4" }), u.jsx("span", { children: "\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F \u{1F4C4}" })] }), u.jsxs("button", { onClick: () => ee2(t), className: "px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/15 transition-all flex items-center gap-1.5", title: "\u0646\u0633\u062E \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u062C\u0632", children: [$ ? u.jsx(qp, { className: "w-4 h-4 text-emerald-400" }) : u.jsx(zx, { className: "w-4 h-4" }), u.jsx("span", { children: $ ? "\u062A\u0645 \u0627\u0644\u0646\u0633\u062E!" : "\u0646\u0633\u062E" })] })] })] }), u.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center", children: [u.jsxs("div", { className: "bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner", children: [u.jsx("span", { className: "text-[11px] text-slate-400 block font-bold mb-0.5", children: "\u0627\u0644\u062F\u0648\u0631" }), u.jsx("strong", { className: "text-sm sm:text-base font-black text-cyan-300", children: t.levelName })] }), u.jsxs("div", { className: "bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner", children: [u.jsx("span", { className: "text-[11px] text-slate-400 block font-bold mb-0.5", children: "\u0627\u0644\u0642\u0637\u0627\u0639" }), u.jsxs("strong", { className: "text-sm sm:text-base font-black text-cyan-300", children: ["\u0642\u0637\u0627\u0639 ", t.sector] })] }), u.jsxs("div", { className: "bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner", children: [u.jsx("span", { className: "text-[11px] text-slate-400 block font-bold mb-0.5", children: "\u0627\u0644\u0635\u0641" }), u.jsxs("strong", { className: "text-sm sm:text-base font-black text-cyan-300", children: ["\u0627\u0644\u0635\u0641 (", t.row, ")"] })] }), u.jsxs("div", { className: "bg-slate-900/90 p-3.5 rounded-2xl border border-white/10 shadow-inner", children: [u.jsx("span", { className: "text-[11px] text-slate-400 block font-bold mb-0.5", children: "\u0631\u0642\u0645 \u0627\u0644\u0645\u0642\u0639\u062F" }), u.jsxs("strong", { className: "text-base sm:text-lg font-black text-rose-400 font-mono", children: [t.row, parseInt(t.number, 10)] })] })] })] }), u.jsxs("div", { className: "glass-panel-luxury p-4 sm:p-6 rounded-3xl border border-white/20 space-y-4", children: [u.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 gap-2", children: [u.jsxs("h3", { className: "text-sm sm:text-base font-black text-white flex items-center gap-2", children: [u.jsx(Wx, { className: "w-5 h-5 text-cyan-400 shrink-0" }), u.jsx("span", { children: "\u0645\u0648\u0642\u0639 \u0645\u0642\u0639\u062F\u0643 \u0639\u0644\u0649 \u0645\u062E\u0637\u0637 \u0627\u0644\u0645\u0633\u0631\u062D" })] }), u.jsxs("span", { className: "text-[11px] text-rose-300 font-black flex items-center gap-1.5 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30", children: [u.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" }), u.jsx("span", { children: "\u0645\u0642\u0639\u062F\u0643 \u0645\u064F\u0645\u064A\u0632 \u0628\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0623\u062D\u0645\u0631 \u0627\u0644\u0645\u062A\u0648\u0647\u062C \u{1F534}" })] })] }), u.jsxs("div", { className: "bg-slate-900/80 border border-cyan-500/20 p-2.5 rounded-xl text-xs text-slate-300 flex items-center justify-between", children: [u.jsx("span", { children: "\u{1F4A1} \u064A\u0645\u0643\u0646\u0643 \u0633\u062D\u0628 \u0648\u062A\u0643\u0628\u064A\u0631 \u0648\u062A\u0635\u063A\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0642\u0639\u062F \u0628\u062F\u0642\u0629." }), u.jsx("span", { className: "text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-500/30", children: "\u0627\u0633\u062D\u0628 \u0623\u0641\u0642\u064A\u0627\u064B \u{1F4F1}" })] }), u.jsx("div", { className: "bg-slate-950/90 p-2 sm:p-4 rounded-2xl border border-white/10 overflow-x-auto touch-pan-x", children: u.jsx(ly, { seats: j, onSelectSeat: () => {
    }, highlightSeatId: t.id, isBeneficiaryView: true }) })] })] })] }), d === "map" && u.jsxs("div", { className: "space-y-6 animate-fade-in", children: [u.jsxs("div", { className: "glass-panel-luxury p-5 rounded-3xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [u.jsxs("div", { children: [u.jsxs("h3", { className: "text-base font-black text-white flex items-center gap-2", children: [u.jsx(ki, { className: "w-5 h-5 text-cyan-400" }), u.jsx("span", { children: "\u0645\u062E\u0637\u0637 \u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u0631\u062D \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A" })] }), u.jsx("p", { className: "text-xs text-slate-300 mt-1", children: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0634\u0627\u063A\u0631\u0629 \u0648\u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0645\u0642\u0639\u062F \u0645\u062A\u0627\u062D \u0644\u062D\u062C\u0632\u0647 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u0630\u0643\u0631\u062A\u0643 \u0641\u0648\u0631\u0627\u064B." })] }), u.jsx("div", { className: "flex items-center gap-3", children: u.jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-300 flex items-center gap-1.5", children: [u.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400" }), u.jsxs("span", { children: ["\u0627\u0644\u0645\u0642\u0627\u0639\u062F \u0627\u0644\u0645\u062A\u0627\u062D\u0629: ", _, " \u0645\u0642\u0639\u062F"] })] }) })] }), u.jsx("div", { className: "glass-panel-luxury p-3 sm:p-6 rounded-3xl border border-white/20 overflow-x-auto", children: u.jsx(ly, { seats: j, onSelectSeat: se2, highlightSeatId: t == null ? void 0 : t.id, isBeneficiaryView: true }) })] }), d === "info" && u.jsx("div", { className: "space-y-6 animate-fade-in", children: u.jsxs("div", { className: "glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6", children: [u.jsxs("div", { className: "border-b border-white/10 pb-4", children: [u.jsxs("h3", { className: "text-lg sm:text-xl font-black text-white flex items-center gap-2", children: [u.jsx(w, { className: "w-5 h-5 text-cyan-400" }), u.jsx("span", { children: "\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0648\u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631" })] }), u.jsx("p", { className: "text-xs text-slate-300 mt-1", children: "\u064A\u0631\u062C\u0649 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0644\u0636\u0645\u0627\u0646 \u062A\u062C\u0631\u0628\u0629 \u062F\u062E\u0648\u0644 \u0633\u0644\u0633\u0629 \u0648\u0645\u0645\u062A\u0639\u0629 \u0644\u0643 \u0648\u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0636\u064A\u0648\u0641." })] }), u.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [u.jsxs("div", { className: "p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2", children: [u.jsxs("div", { className: "flex items-center gap-2 text-cyan-300 font-bold text-sm", children: [u.jsx(lf, { className: "w-4 h-4" }), u.jsx("span", { children: "\u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u0623\u0628\u0648\u0627\u0628" })] }), u.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "\u062A\u0641\u062A\u062D \u0623\u0628\u0648\u0627\u0628 \u0627\u0644\u0645\u0633\u0631\u062D \u0642\u0628\u0644 \u0628\u062F\u0621 \u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0629 \u0628\u0633\u0627\u0639\u0629 \u0643\u0627\u0645\u0644\u0629. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u062C\u062F \u0627\u0644\u0645\u0628\u0643\u0631 \u0644\u062A\u0641\u0627\u062F\u064A \u0627\u0644\u0627\u0632\u062F\u062D\u0627\u0645 \u0639\u0646\u062F \u0627\u0644\u0645\u062F\u0627\u062E\u0644." })] }), u.jsxs("div", { className: "p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2", children: [u.jsxs("div", { className: "flex items-center gap-2 text-cyan-300 font-bold text-sm", children: [u.jsx(uo, { className: "w-4 h-4" }), u.jsx("span", { children: "\u0631\u0645\u0632 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A (QR Code)" })] }), u.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "\u064A\u062C\u0628 \u0625\u0628\u0631\u0627\u0632 \u0631\u0645\u0632 \u0627\u0644\u0640 QR Code \u0627\u0644\u0645\u0648\u062C\u0648\u062F \u0641\u064A \u062A\u0630\u0643\u0631\u062A\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644." })] }), u.jsxs("div", { className: "p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2", children: [u.jsxs("div", { className: "flex items-center gap-2 text-cyan-300 font-bold text-sm", children: [u.jsx(ki, { className: "w-4 h-4" }), u.jsx("span", { children: "\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u0645\u0642\u0639\u062F \u0627\u0644\u0645\u062E\u0635\u0635" })] }), u.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "\u0644\u0643\u0644 \u0636\u064A\u0641 \u0645\u0642\u0639\u062F \u0645\u062E\u0635\u0635 \u0628\u0631\u0642\u0645 \u0627\u0644\u0635\u0641 \u0648\u0631\u0642\u0645 \u0627\u0644\u0645\u0642\u0639\u062F\u060C \u0646\u0631\u062C\u0648 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0627\u0644\u062A\u0627\u0645 \u0628\u0627\u0644\u0645\u0642\u0639\u062F \u0627\u0644\u0645\u0648\u0636\u062D \u0628\u062A\u0630\u0643\u0631\u062A\u0643." })] }), u.jsxs("div", { className: "p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2", children: [u.jsxs("div", { className: "flex items-center gap-2 text-cyan-300 font-bold text-sm", children: [u.jsx(uf, { className: "w-4 h-4" }), u.jsx("span", { children: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0642\u0627\u0639\u0629" })] }), u.jsxs("p", { className: "text-xs text-slate-300 leading-relaxed", children: [n.venue, " \u2022 ", n.city || "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629"] })] })] }), n.note && u.jsxs("div", { className: "p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-medium leading-relaxed", children: [u.jsx("strong", { children: "\u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0646 \u0627\u0644\u0645\u0646\u0638\u0645: " }), n.note] })] }) })] }), u.jsx("footer", { className: "py-4 px-8 border-t border-slate-800/60 text-center text-xs text-slate-500 bg-[#060B14]", children: u.jsx("p", { children: "\u0646\u0638\u0627\u0645 \u062D\u062C\u0632 \u0645\u0642\u0627\u0639\u062F \u0645\u0633\u0627\u0631\u062D \u0648\u0642\u0627\u0639\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0628\u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631 \xA9 2026" }) }), x && u.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in", children: u.jsxs("div", { className: "glass-panel-luxury max-w-md w-full p-6 rounded-3xl border-2 border-cyan-500/40 shadow-2xl bg-[#0b1426] space-y-5", children: [u.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [u.jsxs("h4", { className: "text-base font-black text-white flex items-center gap-2", children: [u.jsx(uo, { className: "w-5 h-5 text-cyan-400" }), u.jsx("span", { children: "\u062D\u062C\u0632 \u0645\u0642\u0639\u062F \u062C\u062F\u064A\u062F" })] }), u.jsx("button", { onClick: () => w2(null), className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white", children: "\u2715" })] }), u.jsxs("div", { className: "bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/30 space-y-1", children: [u.jsx("span", { className: "text-[11px] text-cyan-400 font-bold block", children: "\u0627\u0644\u0645\u0642\u0639\u062F \u0627\u0644\u0645\u062E\u062A\u0627\u0631:" }), u.jsx("div", { className: "text-sm font-black text-white", children: xn(x) }), u.jsxs("div", { className: "text-xs text-slate-400", children: [x.levelName, " \u2022 \u0642\u0637\u0627\u0639 ", x.sector] })] }), u.jsxs("form", { onSubmit: te2, className: "space-y-4", children: [u.jsxs("div", { className: "space-y-1.5", children: [u.jsx("label", { className: "text-xs font-bold text-slate-300 block", children: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 (\u0645\u0637\u0644\u0648\u0628):" }), u.jsx("input", { type: "text", required: true, placeholder: "\u0627\u0643\u062A\u0628 \u0627\u0633\u0645\u0643 \u0627\u0644\u062B\u0644\u0627\u062B\u064A \u0623\u0648 \u0627\u0644\u0644\u0642\u0628...", value: p, onChange: (s) => B(s.target.value), className: "w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none" })] }), u.jsxs("div", { className: "space-y-1.5", children: [u.jsx("label", { className: "text-xs font-bold text-slate-300 block", children: "\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):" }), u.jsx("input", { type: "tel", placeholder: "05xxxxxxxx", value: M2, onChange: (s) => E(s.target.value), className: "w-full bg-slate-950 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none" })] }), u.jsxs("div", { className: "pt-2 flex items-center gap-3", children: [u.jsx("button", { type: "submit", disabled: T2 || !p.trim(), className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-sm shadow-lg transition-all", children: T2 ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0623\u0643\u064A\u062F..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u062A\u0630\u0643\u0631\u0629 \u{1F39F}\uFE0F" }), u.jsx("button", { type: "button", onClick: () => w2(null), className: "px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold", children: "\u0625\u0644\u063A\u0627\u0621" })] })] })] }) }), X && t && u.jsx(cy, { seat: t, eventDetails: n, onClose: () => I(false) }), u.jsx(M, { isOpen: Y2, onClose: () => v2(false) })] });
  }
  var K = document.getElementById("beneficiary-root");
  K && qu.createRoot(K).render(u.jsx(UA.StrictMode, { children: u.jsx(we2, {}) }));
})();
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license React
* react-dom.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide-react v0.469.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license QR Code generator library (TypeScript)
* Copyright (c) Project Nayuki.
* SPDX-License-Identifier: MIT
*/
/**
* @license qrcode.react
* Copyright (c) Paul O'Shannessy
* SPDX-License-Identifier: ISC
*/
/*!
* html2canvas 1.4.1 <https://html2canvas.hertzen.com>
* Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
* Released under MIT License
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
