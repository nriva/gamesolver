export interface GameMoveMaker {

    findMoves(cellValues:number[][], conditions:any):number[][][];

    findAllMoves(cellValues:number[][]):number[][][];

    executeMove(cellValues:number[][], move: number[][]): boolean;

    undoMove(cellValues:number[][], move: number[][]):void;


}
