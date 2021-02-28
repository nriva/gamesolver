
/**
 * C = Cell type
 */
export abstract class GameSchema<C> {

    protected rowNumber: number = 0;
    public getRowNumber() : number {
        return this.rowNumber;
    }
    protected colNumber: number = 0;
    public getColNumber() : number {
        return this.colNumber;
    }


    public abstract resetCells(): void;

    public abstract resetCellsToOrig(): void;

    public abstract setInputValue(row: number, col: number, value: number | string, confirm: boolean): void;

    public abstract confirmAllInputValue() : void;

    public abstract getCellHighlight(row: number, col: number):boolean;

    public abstract initialize(): void;

    public abstract clone(): GameSchema<C>;

    /*
    lastRound(solvedCells:boolean): void {
        if(this.solved)
            this.solutionResult = 'Solved';
        else {
            if(this.stopped || this.round === this.MAX_ROUNDS)
                this.solutionResult = `Stopped afer ${this.round} steps.`;
        }
    }
    */

    public abstract loadCellEditor(row: number, col: number): void;

    public abstract confirmCellEdit(currentEditRow: number, currentEditCol: number): boolean;

    public abstract createCells(): C[][];


}