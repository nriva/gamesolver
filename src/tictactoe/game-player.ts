import { GamePlayer, PlayerKind } from "../game-types/game-player-manager";
import { DeepSolverMatrixTicTacToe } from "./deep-solver";
import { GameCellTicTacToe } from "./game-cell";
import { GameMoveMakerTiocTacToe } from "./game-move-maker";
import { GameSchemaTicTacToe } from "./game-schema";
import { GameSchemaManagerTicTacToe } from "./game-schema-manager";


// tslint:disable-next-line: max-classes-per-file
export class GamePlayerHuman extends GamePlayer<GameCellTicTacToe, GameSchemaTicTacToe> {

    constructor(name:string, index:number) {
        super(name, index, PlayerKind.HUMAN);
    }



    public makeMove(schemaManager: GameSchemaManagerTicTacToe): void {
        return;
    }
}

function getRandomIntInclusive(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
  }

// tslint:disable-next-line: max-classes-per-file
export class GamePlayerCPURandom extends GamePlayer<GameCellTicTacToe, GameSchemaTicTacToe> {

    constructor(name:string, index:number) {
        super(name, index, PlayerKind.CPU);
    }


    private moveMaker = new GameMoveMakerTiocTacToe();

    public makeMove(schemaManager: GameSchemaManagerTicTacToe): void {
        console.log("Making move " + this.name);
        const schema = schemaManager.getSchema();
        const values = schema.getValues();

        const moves = this.moveMaker.findMoves(values, {player: this.index+1 });
        let i = 0;
        if(moves.length>1) {
            i = getRandomIntInclusive(0,moves.length-1);
        }

        this.moveMaker.executeMove(values, moves[i]);
        schema.setValues(values);
        this.makingMove = false;
    }
}

// tslint:disable-next-line: max-classes-per-file
export class GamePlayerCPUSmart extends GamePlayer<GameCellTicTacToe, GameSchemaTicTacToe> {

    constructor(name:string, index:number) {
        super(name, index, PlayerKind.CPU);
    }


    private moveMaker = new GameMoveMakerTiocTacToe();

    
    public makeMove(schemaManager: GameSchemaManagerTicTacToe): void {
        console.log("Making move " + this.name);
        const schema = schemaManager.getSchema();
    
        const values = schema.getValues();
        const workValues = schema.getValues();

        const solver = new DeepSolverMatrixTicTacToe(workValues);
        if(solver.deepSolve(0, 0, 0, this.index+1)) {
            const moves = solver.getSolvingMoves();
            this.moveMaker.executeMove(values, moves[0]);
            schema.setValues(values);
        }
        this.makingMove = false;
    }
}

