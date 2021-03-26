import { GameCell } from "../game-types/game-cell";
import { GameSchema } from "../game-types/game-schema";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { getClickedRowCol } from "../game-types/game-utils";
import { GameCellSolitaire } from "./game-cell";
import { GameSchemaSolitaire } from "./game-schema";
import { GameMoveMakerSolitaire } from "./game-schema-solver";

export class GameSchemaManagerSolitaire extends GameSchemaManager<GameCellSolitaire, GameSchemaSolitaire> {
    public getAppName(): string {
        return "solitaire";
    }
    public getAppTitle(): string {
        return "Solitaire Solver";
    }

    public getCellValueRep(row: number, col: number, value: number | null): string | null {
        const cell = this.schema.getCell(row, col);
        if(value!=null)
            cell.setValue(value);
        if(!cell.isDirty())
            return null;
        const _value = cell.getValue();

        let content = "";
        if(_value===GameCellSolitaire.INVALID_CELL)
            content = `<img src="invalid.jpg">`;
        else if(_value===GameCellSolitaire.PEG_CELL)
            content = `<img src="peg.gif">`
        else
            content = "<p></p>";
        cell.setDirtyOff();
        return content;
    }


    public onCellClick(e:any, schema: GameSchemaSolitaire):void {
        const [r,c]= getClickedRowCol(e);


        if(schema.getCell(r,c).isHighlighted()) {
            schema.executeMoveByTarget(r,c);
            return;
        }

        const value = schema.getCell(r,c).getValue();
        if(value !== GameCellSolitaire.PEG_CELL)
            return;

        const moves = GameMoveMakerSolitaire.findMoves( this.schema.getValues(), r,c);

        if(moves.length===1)
            schema.executeMoves(moves);
        else {
            schema.highlightTargets(moves);
        }

        // console.log(schema.dump());

    }

    public getStatusInfo(solver: GameSchemaSolver<GameCellSolitaire, GameSchemaSolitaire> | null): { statusInfo:string, solutionResult:string, checkResult:string } {

        const returnInfo = { statusInfo:'', solutionResult: '', checkResult: ''};

        if(solver!=null) {
            if(solver.isSolving())
                returnInfo.statusInfo="Computing solution...";
        }

        if(returnInfo.statusInfo.length===0) {
            const moves = GameMoveMakerSolitaire.findAllMoves( this.schema.getValues());
            if(moves.moves.length===0) {
                returnInfo.statusInfo= `No more possible moves, ${moves.pegs} remaining pegs.`;
                if(moves.pegs===1) returnInfo.solutionResult = 'Solved!';
            }
            else
                returnInfo.statusInfo = `${moves.moves.length} possibile moves, ${moves.pegs} remaining pegs.`;
        }

        return returnInfo;
    }


}