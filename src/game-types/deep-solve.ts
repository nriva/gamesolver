export abstract class DeepSolverMatrix {

    protected matrix: number[][] = [];

    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    public abstract deepSolve(row: number, col: number): boolean;

}