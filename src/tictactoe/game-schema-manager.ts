import { GamePlayer, GamePlayerManager, PlayerKind } from "../game-types/game-player-manager";
import { GameSchemaCheckerResult } from "../game-types/game-schema-checker-result";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { getClickedRowCol } from "../game-types/game-utils";
import { GameCellTicTacToe } from "./game-cell";
import { GameSchemaTicTacToe } from "./game-schema";
import { ChekResultTictacToe, GameSchemaCheckerTicTacToe } from "./game-schema-checker";

export class GameSchemaManagerTicTacToe
    extends GameSchemaManager<GameCellTicTacToe, GameSchemaTicTacToe> 
    implements GamePlayerManager<GameCellTicTacToe, GameSchemaTicTacToe> {


    private turn = 0;
    private lastResult: GameSchemaCheckerResult | null = null;

    private checker: GameSchemaCheckerTicTacToe = new GameSchemaCheckerTicTacToe();

    private players: GamePlayer<GameCellTicTacToe, GameSchemaTicTacToe>[] = [];

    public addPlayer(player:GamePlayer<GameCellTicTacToe, GameSchemaTicTacToe>): void {
        this.players.push(player);
    }

    private callNextPlayImmediatelly = false;

    callNextPlayTurn(): boolean {
        return this.callNextPlayImmediatelly;
    }

    public playTurn() {

        this.callNextPlayImmediatelly = false;

        const player = this.players[this.turn];
        if(player.getKind()=== PlayerKind.HUMAN) {

            player.beginMove();
        } else if(player.getKind()=== PlayerKind.CPU) {
            player.makeMove(this);
            this.lastResult = this.checker.check(this.schema, null);
            if(this.lastResult?.status===ChekResultTictacToe.RESULT_UNFINISHED) {
                this.nextTurn();
                this.callNextPlayImmediatelly = true;
            }
        }
    }



    protected getCellAttributes(rowId:number, colId: number): any {
        return {border: true};
    }

    public onCellClick(e:any, schema: GameSchemaTicTacToe):void {
        const [r,c]= getClickedRowCol(e);

        if(!(this.players[this.turn].getKind()===PlayerKind.HUMAN && this.players[this.turn].isMakingMove()))
            return;

        if(this.lastResult!=null)
            if(this.lastResult.status!== ChekResultTictacToe.RESULT_UNFINISHED)
                return;


        const cell = this.schema.getCell(r, c);
        if(cell.getValue()===0) {
            if(this.turn===0)
                cell.setValue(GameCellTicTacToe.PLAYER1_CELL);
            else
                cell.setValue(GameCellTicTacToe.PLAYER2_CELL);
            this.lastResult = this.checker.check(schema, null);
            if(this.lastResult.status === ChekResultTictacToe.RESULT_UNFINISHED)
                this.nextTurn();
        }

        this.callNextPlayImmediatelly = true;

    }
    nextTurn() {
        this.turn++;
        if(this.turn===this.players.length)
            this.turn = 0;
    }

    public getTableCellClasses(rowId:number, colId:number, attributes:any): string[] {
        const classes = super.getTableCellClasses(rowId, colId, attributes);
        classes.push("gametablecelltictactoe");
        return classes;
    }


    public getCellValueRep(row: number, col: number, value: number | null): string | null {
        const cell = this.schema.getCell(row, col);
        if(cell.getValue()===0)
            return "";
        if(cell.getValue()===GameCellTicTacToe.PLAYER1_CELL)
            return GameCellTicTacToe.PLAYER1_CELL_STRING;
        if(cell.getValue()===GameCellTicTacToe.PLAYER2_CELL)
            return GameCellTicTacToe.PLAYER2_CELL_STRING;
        return null;
    }
    public getAppTitle(): string {
        return "Tic-Tac-Toe";
    }
    public getAppName(): string {
        return "tictactoe";
    }
    public getStatusInfo(solver: GameSchemaSolver<GameCellTicTacToe, GameSchemaTicTacToe> | null): { statusInfo: string; solutionResult: string; checkResult: string; } {

        if(this.lastResult!=null) {
            if(this.lastResult.status===ChekResultTictacToe.RESULT_DRAW)
                return { statusInfo: "Game Over."
                    , solutionResult: ""
                    , checkResult: "Draw." };
            if(this.lastResult.status===ChekResultTictacToe.RESULT_WIN_PLAYER1)
                    return { statusInfo: "Game Over."
                        , solutionResult: ""
                        , checkResult: this.players[0].getName() +  " wins." };
            if(this.lastResult.status===ChekResultTictacToe.RESULT_WIN_PLAYER2)
                return { statusInfo: "Game Over."
                    , solutionResult: ""
                    , checkResult: this.players[1].getName() + " wins." };
    
    

        }
        return { statusInfo: this.turn===0?
                    this.players[0].getName() + " turn."
                    : this.players[1].getName() + " turn."
            , solutionResult: "Keep Playing."
            , checkResult: "OK" };
    }
}
