"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOffset = exports.useCamPos = exports.CameraZone = void 0;
var _react = _interopRequireWildcard(require("react"));
var _zustand = require("zustand");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var CameraData = {
  Speed: 2
};
var directions = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
  ArrowUp: [0, -1],
  ArrowLeft: [-1, 0],
  ArrowDown: [0, 1],
  ArrowRight: [1, 0]
};
var useCameraStore = (0, _zustand.create)(function (set) {
  return {
    position: [0, 0],
    setPosition: function setPosition(position) {
      return set({
        position: position || [0, 0]
      });
    }
  };
});
var offsetStore = (0, _zustand.create)(function (set) {
  return {
    offset: [window.innerWidth / 2, window.innerHeight / 2],
    setOffset: function setOffset(offset) {
      return set({
        offset: offset || [window.innerWidth / 2, window.innerHeight / 2]
      });
    }
  };
});
var CameraZone = exports.CameraZone = /*#__PURE__*/function (_Component) {
  function CameraZone(props) {
    var _this;
    _classCallCheck(this, CameraZone);
    _this = _callSuper(this, CameraZone, [props]);
    _this.props = props || {};
    _this.state = {
      position: useCameraStore.getState().position,
      viewportSize: offsetStore.getState().offset,
      pressedKeys: {}
    };
    _this.containerRef = /*#__PURE__*/_react["default"].createRef();
    _this.handleResize = _this.handleResize.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    return _this;
  }
  _inherits(CameraZone, _Component);
  return _createClass(CameraZone, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      this.interval = setInterval(this.updatePosition.bind(this), 1);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      clearInterval(this.interval);
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.setState({
        viewportSize: [window.innerWidth / 2, window.innerHeight / 2]
      });
      offsetStore.setState({
        offset: [window.innerWidth / 2, window.innerHeight / 2]
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (directions[event.key] && !this.state.pressedKeys[event.key]) {
        this.setState(function (prevState) {
          return {
            pressedKeys: _objectSpread(_objectSpread({}, prevState.pressedKeys), {}, _defineProperty({}, event.key, true))
          };
        });
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      if (directions[event.key]) {
        this.setState(function (prevState) {
          return {
            pressedKeys: _objectSpread(_objectSpread({}, prevState.pressedKeys), {}, _defineProperty({}, event.key, false))
          };
        });
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var _this2 = this;
      var deltaX = 0;
      var deltaY = 0;
      Object.keys(this.state.pressedKeys).forEach(function (key) {
        if (_this2.state.pressedKeys[key]) {
          var direction = directions[key];
          deltaX += direction[0] * CameraData.Speed;
          deltaY += direction[1] * CameraData.Speed;
        }
      });
      if (deltaX !== 0 || deltaY !== 0) {
        var newPosition = [this.state.position[0] + deltaX, this.state.position[1] + deltaY];
        this.setState({
          position: newPosition
        });
        useCameraStore.setState({
          position: newPosition
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var styles = this.props.positionStyles || {
        color: 'white',
        zIndex: 100,
        position: 'absolute',
        top: 0,
        left: 0,
        margin: "20px"
      };
      var _this$state = this.state,
        position = _this$state.position,
        viewportSize = _this$state.viewportSize;
      var transformStyle = {
        transform: "translate(".concat(viewportSize[0] - position[0], "px, ").concat(viewportSize[1] - position[1], "px)")
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "camera-zone",
        ref: this.containerRef,
        style: {
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 1
        }
      }, /*#__PURE__*/_react["default"].createElement("p", {
        id: "posText",
        style: this.props.hideCoordinates ? _objectSpread(_objectSpread({}, styles), {}, {
          display: 'none'
        }) : _objectSpread(_objectSpread({}, styles), {}, {
          display: 'block'
        })
      }, "".concat(Math.floor(position[0] / 15), ", ").concat(-Math.floor(position[1] / 15))), /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread(_objectSpread({}, transformStyle), {}, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      }, _react.Children.map(children, function (child) {
        var childPos = child.props.pos;
        var childStyle = {
          position: 'absolute',
          left: "".concat(childPos[0], "px"),
          top: "".concat(childPos[1], "px"),
          zIndex: "inherit"
        };
        return /*#__PURE__*/(0, _react.cloneElement)(child, {
          style: _objectSpread(_objectSpread({}, child.props.style), childStyle)
        });
      })));
    }
  }]);
}(_react.Component);
var useCamPos = exports.useCamPos = function useCamPos() {
  return useCameraStore(function (state) {
    return state.position;
  });
};
var useOffset = exports.useOffset = function useOffset() {
  return offsetStore(function (state) {
    return state.offset;
  });
};