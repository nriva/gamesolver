import { GameSchema } from "../game-types/game-schema";
import { GameCellSolitaire } from "./game-cell";


export enum Variant {
    ENGLISH,
    EUROPEAN
}


export abstract class GameSchemaSolitaire extends GameSchema<GameCellSolitaire> {
    lastMove: number[][] = [];


    public fromJSON(contents: string | ArrayBuffer): boolean {
        let data:any = null;
        if(typeof contents==="string")
            data = JSON.parse(contents);
        if(data==null)
            return false;

        this.setValues(data.values);
        return true;

    }
    public toJSON(): string {
        const data = {values: this.getValues() };
        return JSON.stringify(data);
    }




    



    /*
    public clone(): GameSchema<GameCellSolitaire> {
        throw new Error("Method not implemented.");
    }
    */



    // private solver: GameSchemaSolverSolitaire = new GameSchemaSolverSolitaire();

    protected middleRow = 0;
    protected middleCol = 0;


    private moveByTarget: Map<string,number[][]> = new Map();

    public executeMove(move: number[][]|undefined) {

        if(typeof move==="undefined")
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        this.cells[from[0]][from[1]].setValue(GameCellSolitaire.EMPTY_CELL);
        this.cells[middle[0]][middle[1]].setValue(GameCellSolitaire.EMPTY_CELL);
        this.cells[to[0]][to[1]].setValue(GameCellSolitaire.PEG_CELL);

        this.lastMove = move;
    }

    public undoLastMove(): void {
        this.undoMove(this.lastMove);
        this.lastMove = [];
    }

    private undoMove(move: number[][]|undefined) {

        if(typeof move==="undefined")
            return;

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        this.cells[from[0]][from[1]].setValue(GameCellSolitaire.PEG_CELL);
        this.cells[middle[0]][middle[1]].setValue(GameCellSolitaire.PEG_CELL);
        this.cells[to[0]][to[1]].setValue(GameCellSolitaire.EMPTY_CELL);
    }


    highlightTargets(moves: number[][][]) {
        for(let i=0;i<moves.length;i++) {
            const move = moves[i];
            const to = move[2];
            const target = `${to[0]}-${to[1]}`;
            this.moveByTarget.set(target, move);

            this.cells[to[0]][to[1]].highlight(true);
        }

    }

    public executeMoveByTarget(targetRow: number,targetCol: number) {
        const target = `${targetRow}-${targetCol}`
        if(this.moveByTarget.has(target)) {

            this.executeMove(this.moveByTarget.get(target));
            this.moveByTarget.clear();
            this.setCellsHiglight(false);
        }
    }
    /*
    public findAllMoves():{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<this.rowNumber;r++)
            for(let c=0;c<this.rowNumber;c++)
                if(this.cells[r][c].getValue() === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }
    */
    /*
    public findMoves( r:number,c:number):number[][][] {
        return this.solver.findMoves(this.getValues(),r,c);
    }
    */


    public canUndoMove(): boolean { return true; }

}



