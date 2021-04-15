import { GameCell } from "../game-types/game-cell";
import { GameFactory } from "../game-types/game-factory";
import { GameSchema } from "../game-types/game-schema";
import { GameSchemaGenerator } from "../game-types/game-schema-generator";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameSchemaTicTacToe } from "./game-schema";
import { GameSchemaManagerTicTacToe } from "./game-schema-manager";

export class GameFactoryTicTacToe extends GameFactory {
    public createSchema(): GameSchema<GameCell> {
        return new GameSchemaTicTacToe(this.gameConfig);
    }
    public createSchemaManager(): GameSchemaManager<GameCell, GameSchema<GameCell>> {
        return new GameSchemaManagerTicTacToe();
    }
    public createSchemaSolver(): GameSchemaSolver<GameCell, GameSchema<GameCell>> | null {
        return null;
    }
    public createSchemaGenerator(): GameSchemaGenerator<GameCell, GameSchema<GameCell>> | null {
        return null;
    }
    public createSolutionWorker() {
        return null;
    }

}