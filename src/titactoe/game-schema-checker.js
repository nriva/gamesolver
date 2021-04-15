import { GameSchemaCheckerResult } from "../game-types/game-schema-checker-result";
import { GameCellTicTacToe } from "./game-cell";
export class GameSchemaCheckerTicTacToe {
    getRowPositions(currentrow) {
        const postions = [];
        for (let c = 0; c < 3; c++) {
            postions.push({ row: currentrow, col: c });
        }
        return postions;
    }
    getColPositions(currentcol) {
        const postions = [];
        for (let r = 0; r < 3; r++) {
            postions.push({ row: r, col: currentcol });
        }
        return postions;
    }
    getDiagonalPostions(direction) {
        const postions = [];
        if (direction === 0) {
            postions.push({ row: 0, col: 0 });
            postions.push({ row: 1, col: 1 });
            postions.push({ row: 2, col: 2 });
        }
        else {
            postions.push({ row: 0, col: 2 });
            postions.push({ row: 1, col: 1 });
            postions.push({ row: 2, col: 0 });
        }
        return postions;
    }
    checkPositions(cells, positions, playerCell) {
        let check = 0;
        for (let p = 0; p < positions.length; p++)
            if (cells[positions[p].row][positions[p].col] === playerCell)
                check++;
        if (check === 3) {
            // win!
            return true;
        }
        return false;
    }
    checkPlayerWin(cells, playerCell) {
        let win = false;
        let positions;
        for (let r = 0; r < 3 && !win; r++) {
            positions = this.getRowPositions(r);
            win = this.checkPositions(cells, positions, playerCell);
        }
        for (let c = 0; c < 3 && !win; c++) {
            positions = this.getColPositions(c);
            win = this.checkPositions(cells, positions, playerCell);
        }
        if (!win) {
            positions = this.getDiagonalPostions(0);
            win = this.checkPositions(cells, positions, playerCell);
        }
        if (!win) {
            positions = this.getDiagonalPostions(1);
            win = this.checkPositions(cells, positions, playerCell);
        }
        return win;
    }
    check(schema, parameters) {
        const result = new GameSchemaCheckerResult();
        result.status = GameSchemaCheckerTicTacToe.RESULT_UNFINISHED;
        result.error = false;
        let emptyCells = 0;
        const cells = schema.getValues();
        if (this.checkPlayerWin(cells, GameCellTicTacToe.PLAYER1_CELL)) {
            result.status = GameSchemaCheckerTicTacToe.RESULT_WIN_PLAYER1;
        }
        else if (this.checkPlayerWin(cells, GameCellTicTacToe.PLAYER2_CELL)) {
            result.status = GameSchemaCheckerTicTacToe.RESULT_WIN_PLAYER2;
        }
        if (result.status === GameSchemaCheckerTicTacToe.RESULT_UNFINISHED) {
            for (let r = 0; r < schema.getRowNumber(); r++)
                for (let c = 0; c < schema.getColNumber(); c++)
                    if (cells[r][c] === GameCellTicTacToe.EMPTY_CELL)
                        emptyCells++;
            if (emptyCells === 0) {
                // it's finished
                result.status = GameSchemaCheckerTicTacToe.RESULT_DRAW;
            }
        }
        return result;
    }
}
GameSchemaCheckerTicTacToe.RESULT_UNFINISHED = 0;
GameSchemaCheckerTicTacToe.RESULT_DRAW = 3;
GameSchemaCheckerTicTacToe.RESULT_WIN_PLAYER1 = 1;
GameSchemaCheckerTicTacToe.RESULT_WIN_PLAYER2 = 2;
//# sourceMappingURL=game-schema-checker.js.map