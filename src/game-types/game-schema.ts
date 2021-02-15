export abstract class GameSchema {
    public abstract confirmCellEdit(currentEditRow: number, currentEditCol: number): boolean;


    protected solved = false;
    protected solving: boolean = false;
    protected stopped: boolean = false;

    protected round = 0;

    protected readonly MAX_ROUNDS = 99999;

    protected rowNumber: number = 0;
    public solutionResult:string="";

    public getRowNumber() : number {
        return this.rowNumber;
    }

    protected colNumber: number = 0;

    public getColNumber() : number {
        return this.colNumber;
    }

    


    public isSolving() { return this.solving; }
    public isStopped() { return this.stopped; }
    public isSolved() { return this.solved; }

    public getRoundNumber() { return this.round; }

    public stop() {
        this.stopped = true;
        this.solving = false;
    }

    public pause() {
        this.solving = false;
    }

    public solve() {
        this.stopped = false;
        this.solved = false;
        this.round = 0;
        this.solving = true;
        this.step();
      }


    public abstract step(): void;


    public abstract resetCells(): void;

    public abstract resetCellsToOrig(): void;

    public abstract setInputValue(row: number, col: number, value: number | string, confirm: boolean): void;

    public abstract confirmAllInputValue() : void;

    public abstract getCellValueRep(row: number, col: number): string | null;

    public abstract getCellHighlight(row: number, col: number):boolean;

    public abstract initialize(): void;

    public abstract solvedCells(): number;



    lastRound(solvedCells:boolean): void {
        if(this.solved)
            this.solutionResult = 'Solved';
        else {
            if(this.stopped || this.round === this.MAX_ROUNDS)
                this.solutionResult = `Stopped afer ${this.round} steps.`;
        }
    }

    public abstract loadCellEditor(row: number, col: number): void;


}