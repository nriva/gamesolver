import { GameCell } from "../game-types/game-cell";
import { GameFactory } from "../game-types/game-factory";
import { GameSchema } from "../game-types/game-schema";
import { GameSchemaGenerator } from "../game-types/game-schema-generator";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameSchemaSudoku } from "./game-schema";
import { GameSchemaGeneratorSudoku } from "./game-schema-generator";
import { GameSchemaManagerSodoku } from "./game-schema-manager";
import { GameSchemaSolverSudoku } from "./game-schema-solver";
import DeepSolveWorkerSudoku from "worker-loader!./sudoku-deep-solver.worker";


export class GameFactorySudoku extends GameFactory {

    public createSchemaGenerator(): GameSchemaGenerator<GameCell, GameSchema<GameCell>> {
        return new GameSchemaGeneratorSudoku(9);
    }
    public createSchema(): GameSchema<GameCell> {
        return new GameSchemaSudoku(this.gameConfig);
    }
    public createSchemaSolver(): GameSchemaSolver<GameCell, GameSchema<GameCell>> {

        return new GameSchemaSolverSudoku();

    }
    public createSchemaManager(): GameSchemaManager<GameCell, GameSchema<GameCell>> {

        return new GameSchemaManagerSodoku();
    }

    public createSolutionWorker() {
        return new DeepSolveWorkerSudoku();




        
    }

}