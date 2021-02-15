export class GameSolutionResult {

    private rounds:number = 0;

    constructor(rounds: number) {
        this.rounds = rounds;
    }
}

export interface GameSolutionHandler {
    handleResult(result: GameSolutionResult): void;
}