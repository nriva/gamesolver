import { DeepSolverMatrix } from "../game-types/deep-solve";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameCellSolitaire } from "./game-cell";
import { GameSchemaSolitaire } from "./game-schema";

/*
export class GameSchemaSolverSolitaire extends GameSchemaSolver<GameCellSolitaire, GameSchemaSolitaire> {
    public step(schema: GameSchemaSolitaire): void {
        this.stopped = true;
        this.solving = false;
    }

    
    public findMoves(cellValues:number[][],r:number,c:number):number[][][] {
        const moves:number[][][] = [];
        let value;

        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4

        // 1:
        if(r>=1) {
            value = cellValues[r-1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r>=2) {
                    value = cellValues[r-2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r-1,c],[r-2,c]]);
                    }
                }
            }
        }

        // 2:
        if(c>=1) {
            value = cellValues[r][c-1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c>=2) {
                    value = cellValues[r][c-2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c-1],[r,c-2]]);
                    }
                }
            }
        }

        // 3:
        if(c<=5) {
            value = cellValues[r][c+1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c<=4) {
                    value = cellValues[r][c+2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c+1],[r,c+2]]);
                    }
                }
            }
        }

        // 4:
        if(r<=5) {
            value = cellValues[r+1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r<=4) {
                    value = cellValues[r+2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r+1,c],[r+2,c]]);
                    }
                }
            }
        }

        return moves;
    }

    public findAllMoves(cellValues:number[][]):{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<7;r++)
            for(let c=0;c<7;c++)
                if(cellValues[r][c] === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }

    public executeMove(cellValues:number[][], move: number[][]) {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.PEG_CELL;


    }

    public undoMove(cellValues:number[][], move: number[][]):void {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];

        cellValues[from[0]][from[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.EMPTY_CELL;
    }
    

} */

export class GameMoveMakerSolitaire {

    public static findMoves(cellValues:number[][],r:number,c:number):number[][][] {
        const moves:number[][][] = [];
        let value;

        //                                  1
        // find all the moves from x=r,c: 2 x 3
        //                                  4

        // 1:
        if(r>=1) {
            value = cellValues[r-1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r>=2) {
                    value = cellValues[r-2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r-1,c],[r-2,c]]);
                    }
                }
            }
        }

        // 2:
        if(c>=1) {
            value = cellValues[r][c-1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c>=2) {
                    value = cellValues[r][c-2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c-1],[r,c-2]]);
                    }
                }
            }
        }

        // 3:
        if(c<=5) {
            value = cellValues[r][c+1];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(c<=4) {
                    value = cellValues[r][c+2];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r,c+1],[r,c+2]]);
                    }
                }
            }
        }

        // 4:
        if(r<=5) {
            value = cellValues[r+1][c];
            if(value === GameCellSolitaire.PEG_CELL) {
                if(r<=4) {
                    value = cellValues[r+2][c];
                    if(value === GameCellSolitaire.EMPTY_CELL) {
                        moves.push([[r,c],[r+1,c],[r+2,c]]);
                    }
                }
            }
        }

        return moves;
    }

    public static findAllMoves(cellValues:number[][]):{pegs:number,moves:number[][][]} {
        let allMoves: number[][][] = [];
        let pegNum = 0;
        for(let r=0;r<7;r++)
            for(let c=0;c<7;c++)
                if(cellValues[r][c] === GameCellSolitaire.PEG_CELL) {
                    pegNum++;
                    const moves = this.findMoves(cellValues, r,c);
                    if(moves.length>0)
                        allMoves = allMoves.concat(moves);

                }
        return {'pegs': pegNum, 'moves':allMoves};
    }

    public static executeMove(cellValues:number[][], move: number[][]): boolean {

        if(move.length===0)
            return false;

        const from = move[0];
        const middle = move[1];
        const to = move[2];


        if(cellValues[from[0]][from[1]]!== GameCellSolitaire.PEG_CELL)
            return false;
        if(cellValues[middle[0]][middle[1]]!== GameCellSolitaire.PEG_CELL)
            return false;
        if(cellValues[to[0]][to[1]]!== GameCellSolitaire.EMPTY_CELL)
            return false;


        cellValues[from[0]][from[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.EMPTY_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.PEG_CELL;
        return true;


    }

    public static undoMove(cellValues:number[][], move: number[][]):void {

        if(move.length===0)
            return;

        const from = move[0];
        const middle = move[1];
        const to = move[2];
        
        if(cellValues[from[0]][from[1]]!== GameCellSolitaire.EMPTY_CELL)
            return;
        if(cellValues[middle[0]][middle[1]]!== GameCellSolitaire.EMPTY_CELL)
            return;
        if(cellValues[to[0]][to[1]]!== GameCellSolitaire.PEG_CELL)
            return;        
        
        cellValues[from[0]][from[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[middle[0]][middle[1]]=GameCellSolitaire.PEG_CELL;
        cellValues[to[0]][to[1]]=GameCellSolitaire.EMPTY_CELL;
    }     


}

// tslint:disable-next-line: max-classes-per-file
export class DeepSolverMatrixSolitaire extends DeepSolverMatrix {

    // private solver: GameSchemaSolverSolitaire = new GameSchemaSolverSolitaire();

    private solvingMoves:number[][][] = [];

    private ctx:any;

    private step = 0;

    constructor(matrix: number[][], ctx:any) {
        super(matrix);
        this.ctx = ctx;
    }

    public getSolvingMoves(): number[][][] {
        return this.solvingMoves;
    }

    
    public hasIsolatedPegsB(cellValues:number[][]): boolean {
        let found = false;
        for(let r=0;r< cellValues.length  && !found;r++)
            for(let c=0;c< cellValues[r].length && !found;c++)
                if(cellValues[r][c]===GameCellSolitaire.PEG_CELL) {
                    let pegs = 0;
                    if(r>0)
                        if(cellValues[r-1][c]===GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if(c>0)
                        if(cellValues[r][c-1]===GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if(r<cellValues.length-1)
                        if(cellValues[r+1][c]===GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if(c<cellValues[r].length-1)
                        if(cellValues[r][c+1]===GameCellSolitaire.PEG_CELL)
                            pegs++;
                    if(pegs===0)
                        found=true;

                }
        return found;
    }
    

    public hasIsolatedPegs(cellValues:number[][]): boolean {
        let ok = true;
        for(let r=0;r<7 && ok;r++)
            for(let c=0;c<7 && ok;c++)
                if(cellValues[r][c]===GameCellSolitaire.PEG_CELL) {
                    if(r>0)
                        ok = ok && cellValues[r-1][c]!==GameCellSolitaire.EMPTY_CELL;
                    if(c>0)
                        ok = ok && cellValues[r][c-1]!==GameCellSolitaire.EMPTY_CELL;
                    if(r<6)
                        ok = ok && cellValues[r+1][c]!==GameCellSolitaire.EMPTY_CELL;
                    if(c<6)
                        ok = ok && cellValues[r][c+1]!==GameCellSolitaire.EMPTY_CELL;
                }
        return ok;
    }    


    public deepSolve(row: number, col: number): boolean {

        // pruning
        const isolated = this.hasIsolatedPegs(this.matrix);
        const isolatedB = this.hasIsolatedPegsB(this.matrix);

        /*if(isolatedB!==isolated)
            console.log('Bingo!');
        */
        if(isolated)
            return false;



        const allMoves = GameMoveMakerSolitaire.findAllMoves(this.matrix);
        if(allMoves.pegs===1)
            return true;
        const moves = allMoves.moves;


        for(let m=0; m<moves.length; m++) {
            if(GameMoveMakerSolitaire.executeMove(this.matrix, moves[m])) {
                const from = moves[m][0];
                const middle = moves[m][1];
                const to = moves[m][2];
                /*
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                this.ctx?.postMessage({ 'eventType': 'tryValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                */
                if(this.deepSolve(row+1, col)) {
                    /*
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'setValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.PEG_CELL }});
                    */
                    this.solvingMoves.push(moves[m]);
                    return true;
                } else {
                    GameMoveMakerSolitaire.undoMove(this.matrix, moves[m]);
                    /*
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': from[0], 'col': from[1], 'value': GameCellSolitaire.PEG_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': middle[0], 'col': middle[1], 'value': GameCellSolitaire.PEG_CELL }});
                    this.ctx?.postMessage({ 'eventType': 'undoValue', eventData:{'row': to[0], 'col': to[1], 'value': GameCellSolitaire.EMPTY_CELL }});
                    */

                }
            } else {
                console.log("'Twas a wrong move!!!");
            }
        }

        return false;

    }
}