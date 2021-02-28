"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchemaManagerSodoku = void 0;
var game_schema_manager_1 = require("../game-types/game-schema-manager");
var GameSchemaManagerSodoku = /** @class */ (function (_super) {
    __extends(GameSchemaManagerSodoku, _super);
    function GameSchemaManagerSodoku(schema) {
        var _this = _super.call(this, schema) || this;
        _this.schema = schema;
        return _this;
    }
    GameSchemaManagerSodoku.prototype.getCellValueRep = function (row, col) {
        var values = this.getCellValuesRep(row, col);
        var value = this.schema.getCellValue(row, col);
        return "" + (value === 0 ? '' : String(value)) + values;
    };
    GameSchemaManagerSodoku.prototype.getCellValuesRep = function (row, col) {
        var html = '';
        var values = this.schema.getCellValueSet(row, col);
        if (values.length > 0) {
            var dim = 3;
            var fontSize = "xx-small";
            if (values.length <= 4) {
                dim = 2;
                fontSize = "x-small";
            }
            fontSize = "medium";
            var r = 0;
            var c = 0;
            html = "<table style=\"font-size: " + fontSize + "; margin-left: auto; margin-right: auto; width:100%\">";
            for (var index = 0; index < dim * dim; index++) {
                var value = '';
                if (index < values.length)
                    value = String(values[index]);
                c = index % dim;
                r = Math.floor(index / dim);
                if (c === 0)
                    html += '<tr>';
                html += "<td style=\"text-align: center\">" + value + "</td>";
                if (c === dim - 1)
                    html += '</tr>';
            }
            html += '</table>';
        }
        return html;
    };
    return GameSchemaManagerSodoku;
}(game_schema_manager_1.GameSchemaManager));
exports.GameSchemaManagerSodoku = GameSchemaManagerSodoku;
//# sourceMappingURL=game-schema-manager.js.map