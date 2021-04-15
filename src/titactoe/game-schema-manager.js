import { PlayerKind } from "../game-types/game-player-manager";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { getClickedRowCol } from "../game-types/game-utils";
import { GameCellTicTacToe } from "./game-cell";
import { GameSchemaCheckerTicTacToe } from "./game-schema-checker";
import "./style.css";
export class GameSchemaManagerTicTacToe extends GameSchemaManager {
    constructor() {
        super(...arguments);
        this.turn = 0;
        this.lastResult = null;
        this.checker = new GameSchemaCheckerTicTacToe();
        this.players = [];
        this.callNextPlayImmediatelly = false;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    callNextPlayTurn() {
        return this.callNextPlayImmediatelly;
    }
    playTurn() {
        var _a;
        this.callNextPlayImmediatelly = false;
        const player = this.players[this.turn];
        if (player.getKind() === PlayerKind.HUMAN) {
            player.beginMove();
        }
        else if (player.getKind() === PlayerKind.CPU) {
            player.makeMove(this);
            this.lastResult = this.checker.check(this.schema);
            if (((_a = this.lastResult) === null || _a === void 0 ? void 0 : _a.status) === GameSchemaCheckerTicTacToe.RESULT_UNFINISHED) {
                this.nextTurn();
                this.callNextPlayImmediatelly = true;
            }
        }
    }
    getCellAttributes(rowId, colId) {
        return { border: true };
    }
    onCellClick(e, schema) {
        const [r, c] = getClickedRowCol(e);
        if (!(this.players[this.turn].getKind() === PlayerKind.HUMAN && this.players[this.turn].isMakingMove()))
            return;
        if (this.lastResult != null)
            if (this.lastResult.status !== GameSchemaCheckerTicTacToe.RESULT_UNFINISHED)
                return;
        const cell = this.schema.getCell(r, c);
        if (cell.getValue() === 0) {
            if (this.turn === 0)
                cell.setValue(GameCellTicTacToe.PLAYER1_CELL);
            else
                cell.setValue(GameCellTicTacToe.PLAYER2_CELL);
            this.lastResult = this.checker.check(schema);
            if (this.lastResult.status === GameSchemaCheckerTicTacToe.RESULT_UNFINISHED)
                this.nextTurn();
        }
        this.callNextPlayImmediatelly = true;
    }
    nextTurn() {
        this.turn++;
        if (this.turn === this.players.length)
            this.turn = 0;
    }
    getCellValueRep(row, col, value) {
        const cell = this.schema.getCell(row, col);
        if (cell.getValue() === 0)
            return "";
        if (cell.getValue() === GameCellTicTacToe.PLAYER1_CELL)
            return GameCellTicTacToe.PLAYER1_CELL_STRING;
        if (cell.getValue() === GameCellTicTacToe.PLAYER2_CELL)
            return GameCellTicTacToe.PLAYER2_CELL_STRING;
        return null;
    }
    getAppTitle() {
        return "Tic-Tac-Toe";
    }
    getAppName() {
        return "tictactoe";
    }
    getStatusInfo(solver) {
        if (this.lastResult != null) {
            if (this.lastResult.status === GameSchemaCheckerTicTacToe.RESULT_DRAW)
                return { statusInfo: "Game Over.",
                    solutionResult: "",
                    checkResult: "Draw." };
            if (this.lastResult.status === GameSchemaCheckerTicTacToe.RESULT_WIN_PLAYER1)
                return { statusInfo: "Game Over.",
                    solutionResult: "",
                    checkResult: this.players[0].getName() + " wins." };
            if (this.lastResult.status === GameSchemaCheckerTicTacToe.RESULT_WIN_PLAYER2)
                return { statusInfo: "Game Over.",
                    solutionResult: "",
                    checkResult: this.players[1].getName() + " wins." };
        }
        return { statusInfo: this.turn === 0 ?
                this.players[0].getName() + " turn."
                : this.players[1].getName() + " turn.",
            solutionResult: "Keep Playing.",
            checkResult: "OK" };
    }
}
//# sourceMappingURL=game-schema-manager.js.map