import { GameSchema } from "./game-schema";

export abstract class GameSchemaSolver<T> {


    protected solved = false;
    protected solving: boolean = false;
    protected stopped: boolean = false;

    protected readonly MAX_STEP_NUMBER = 99999;
    protected stepNumber = 0;
    public getStepNumber() { return this.stepNumber; }


    protected solutionResult:string="";

    public getSolutionResult() : string { return this.solutionResult; }


    public isSolving() { return this.solving; }
    public isStopped() { return this.stopped; }
    public isSolved() { return this.solved; }

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
        this.solving = false;
    }

    public pause() {
        this.solving = false;
    }

    public solve(schema: T) {
        this.stopped = false;
        this.solved = false;
        this.stepNumber = 0;
        this.solving = true;
        this.step(schema);
      }


    public abstract step(schema: T): void;


    protected lastSolvedCells: number=0;

    protected solvedCells: number=0;

    public getLastSolvedCells(): number { return this.lastSolvedCells; }




}