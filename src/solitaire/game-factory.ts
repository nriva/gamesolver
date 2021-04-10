import { GameCell } from "../game-types/game-cell";
import { GameFactory } from "../game-types/game-factory";
import { GameSchema } from "../game-types/game-schema";
import { GameSchemaGenerator } from "../game-types/game-schema-generator";
import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { Variant } from "./game-schema";
import { GameSchemaManagerSolitaire } from "./game-schema-manager";
import { GameSchemaSolitaireEnglish } from "./game-schema-english";
import { GameSchemaSolitaireEuropean } from "./game-schema-european";
import DeepSolveWorker from "worker-loader!./solitaire-deep-solver.worker";

export class GameFactorySolitarie extends GameFactory {
    public createSolutionWorker() {
        return new DeepSolveWorker();
    }
    public createSchema(): GameSchema<GameCell> {

        if(this.gameConfig.boardVariant === Variant.ENGLISH)
            return new GameSchemaSolitaireEnglish(this.gameConfig);
        return new GameSchemaSolitaireEuropean(this.gameConfig);
    }
    public createSchemaManager(): GameSchemaManager<GameCell, GameSchema<GameCell>> {
        return new GameSchemaManagerSolitaire();
    }

    public createSchemaSolver(): GameSchemaSolver<GameCell, GameSchema<GameCell>> | null {
        return null;
    }

    public createSchemaGenerator(): GameSchemaGenerator<GameCell, GameSchema<GameCell>> | null {
        return null;
    }
}