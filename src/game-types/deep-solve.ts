export abstract class DeepSolverMatrix {

    protected matrix: number[][] = [];

    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    public abstract deepSolve(level:number, row: number, col: number, ...params:any[]): boolean;

}