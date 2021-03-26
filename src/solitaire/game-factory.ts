import { GameCell } from "../game-types/game-cell";
import { GameFactory } from "../game-types/game-factory";
import { GameSchema } from "../game-types/game-schema";
import { GameSchemaGenerator } from "../game-types/game-schema-generator";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameSchemaSolitaire } from "./game-schema";
import { GameSchemaManagerSolitaire } from "./game-schema-manager";
import DeepSolveWorker from "worker-loader!./deep-solver-worker";

export class GameFactorySolitarie extends GameFactory {
    public createSolutionWorker() {
        return new DeepSolveWorker();
    }
    public getSchema(demo: boolean): GameSchema<GameCell> {
        return new GameSchemaSolitaire(demo);
    }
    public getSchemaManager(): GameSchemaManager<GameCell, GameSchema<GameCell>> {
        return new GameSchemaManagerSolitaire();
    }

    public getSchemaSolver(): GameSchemaSolver<GameCell, GameSchema<GameCell>> | null {
        return null;
    }

    public getSchemaGenerator(): GameSchemaGenerator<GameCell, GameSchema<GameCell>> | null {
        return null;
    }
}