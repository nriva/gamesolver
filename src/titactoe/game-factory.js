import { GameFactory } from "../game-types/game-factory";
import { GameSchemaTicTacToe } from "./game-schema";
import { GameSchemaManagerTicTacToe } from "./game-schema-manager";
export class GameFactoryTicTacToe extends GameFactory {
    createSchema() {
        return new GameSchemaTicTacToe(this.gameConfig);
    }
    createSchemaManager() {
        return new GameSchemaManagerTicTacToe();
    }
    createSchemaSolver() {
        return null;
    }
    createSchemaGenerator() {
        return null;
    }
    createSolutionWorker() {
        return null;
    }
}
//# sourceMappingURL=game-factory.js.map