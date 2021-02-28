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
exports.GameSchemaGeneratorSudoku = void 0;
var game_schema_generator_1 = require("../game-types/game-schema-generator");
var game_schema_1 = require("./game-schema");
var game_schema_solver_1 = require("./game-schema-solver");
var GameSchemaGeneratorSudoku = /** @class */ (function (_super) {
    __extends(GameSchemaGeneratorSudoku, _super);
    function GameSchemaGeneratorSudoku(N, K) {
        var _this = _super.call(this) || this;
        _this.solver = new game_schema_solver_1.GameSchemaSolverSudoku();
        _this.mat = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        _this.N = N;
        _this.K = K;
        // Compute square root of N
        var SRNd = Math.sqrt(N);
        _this.SRN = Math.floor(SRNd);
        return _this;
        //this.mat = new number[N][N]; 
    }
    GameSchemaGeneratorSudoku.prototype.generate = function () {
        this.fillValues();
        var schema = new game_schema_1.GameSchemaSudoku();
        schema.createCells();
        for (var row = 0; row < 9; row++)
            for (var col = 0; col < 9; col++)
                schema.getCell(row, col).initValue(this.mat[row][col]);
        return schema;
    };
    GameSchemaGeneratorSudoku.prototype.fillValues = function () {
        // Fill the diagonal of SRN x SRN matrices
        this.fillDiagonal();
        // Fill remaining blocks
        this.fillRemaining(0, this.SRN);
        // Remove Randomly K digits to make game
        this.removeKDigits();
    };
    /** Fill the diagonal SRN number of SRN x SRN matrices  */
    GameSchemaGeneratorSudoku.prototype.fillDiagonal = function () {
        for (var i = 0; i < this.N; i = i + this.SRN) {
            // for diagonal box, start coordinates->i==j 
            this.fillBox(i, i);
        }
    };
    /** Returns false if given 3 x 3 block contains num.  */
    /*
    private unUsedInBox(rowStart: number, colStart: number, num: number): boolean {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**  Fill a 3 x 3 matrix. */
    GameSchemaGeneratorSudoku.prototype.fillBox = function (row, col) {
        var num;
        for (var i = 0; i < this.SRN; i++) {
            for (var j = 0; j < this.SRN; j++) {
                num = this.randomGenerator(this.N);
                while (this.solver.findInSquare(this.mat, row, col, num)) { /*this.unUsedInBox(row, col, num)*/
                    num = this.randomGenerator(this.N);
                }
                this.mat[row + i][col + j] = num;
            }
        }
    };
    // Random generator
    GameSchemaGeneratorSudoku.prototype.randomGenerator = function (num) {
        var n = Math.floor((Math.random() * num + 1));
        if (n > num)
            n = num;
        return n;
    };
    /**
     * Check if safe to put in cell
     */
    GameSchemaGeneratorSudoku.prototype.checkIfSafe = function (i, j, num) {
        return (!this.solver.findInRow(this.mat, i, num)
            && !this.solver.findInCol(this.mat, j, num)
            && !this.solver.findInSquare(this.mat, i, j, num));
    };
    // check in the row for existence
    /*
    private unUsedInRow(i: number, num: number): boolean {
        for (let j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }
    */
    // check in the row for existence
    /*
    private unUsedInCol(j: number, num: number) : boolean {
        for (let i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }
    */
    // A recursive function to fill remaining
    // matrix
    GameSchemaGeneratorSudoku.prototype.fillRemaining = function (i, j) {
        if (j >= this.N && i < this.N - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.N && j >= this.N) {
            return true;
        }
        if (i < this.SRN) {
            if (j < this.SRN) {
                j = this.SRN;
            }
        }
        else if (i < this.N - this.SRN) {
            if (j === Math.floor(i / this.SRN) * this.SRN) {
                j = j + this.SRN;
            }
        }
        else {
            if (j === this.N - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.N) {
                    return true;
                }
            }
        }
        for (var num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                    return true;
                }
                this.mat[i][j] = 0;
            }
        }
        return false;
    };
    // Remove the K no. of digits to
    // complete game
    GameSchemaGeneratorSudoku.prototype.removeKDigits = function () {
        var count = this.K;
        while (count !== 0) {
            var cellId = this.randomGenerator(this.N * this.N);
            // System.out.println(cellId);
            // extract coordinates i and j
            var i = Math.floor(cellId / this.N);
            var j = cellId % 9;
            /*
            if (j !== 0) {
                j = j - 1;
            }*/
            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
    };
    return GameSchemaGeneratorSudoku;
}(game_schema_generator_1.GameSchemaGenerator));
exports.GameSchemaGeneratorSudoku = GameSchemaGeneratorSudoku;
//# sourceMappingURL=game-schema-generator.js.map