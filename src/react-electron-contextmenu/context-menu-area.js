"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var electron_1 = require("electron");
var Menu = electron_1.remote.Menu;
var ContextMenuArea = /** @class */ (function (_super) {
    tslib_1.__extends(ContextMenuArea, _super);
    function ContextMenuArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._menu = new Menu();
        _this._rootElement = null;
        return _this;
    }
    ContextMenuArea.prototype.componentDidMount = function () {
        var _this = this;
        this._menu = Menu.buildFromTemplate(this.props.menuItems);
        this._rootElement.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            //self._rightClickPosition = { x: e.x, y: e.y };
            _this._menu.popup(electron_1.remote.getCurrentWindow());
        }, false);
    };
    ContextMenuArea.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { 
            style: tslib_1.__assign({}, this.props.style), ref: function (ref) { return (_this._rootElement = ref); } 
        }, this.props.children));
    };
    return ContextMenuArea;
}(React.Component));
exports.ContextMenuArea = ContextMenuArea;
exports.default = ContextMenuArea;
//# sourceMappingURL=context-menu-area.js.map