import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";

export abstract class GameSchemaSolver<C extends GameCell, T extends GameSchema<C>> {


    protected solving = false;
    protected solved = false;
    protected stopped = false;

    public isSolving() { return  this.solving; }
    public isStopped() { return this.stopped; }
    public isSolved() { return this.solved; }


    protected readonly MAX_STEP_NUMBER = 99999;
    protected stepNumber = 0;
    public getStepNumber() { return this.stepNumber; }

    protected solutionResult:string="";
    public getSolutionResult() : string { return this.solutionResult; }

    protected lastSolvedCells: number=0;
    protected solvedCells: number=0;
    public getLastSolvedCells(): number { return this.lastSolvedCells; }


    reset() {
        this.solved = false;
        this.solving = false;
        this.stopped = false;
        this.stepNumber = 0;
        this.solutionResult="";

        this.lastSolvedCells =0;

        this.solvedCells =0;
    }

    

    public stop() {
        this.stopped = true;
    }

    public pause() {
    }

    public solve(schema: T) {
        this.solving = true;
        this.stopped = false;
        this.solved = false;
        this.stepNumber = 0;
        this.step(schema);
    }


    public startSolving(): void {
        this.solving = true;
    }


    public abstract step(schema: T): void;
}