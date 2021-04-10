import { GameCell } from "./game-cell";
import { GameConfig } from "./game-config";
import { GameSchema } from "./game-schema";
import { GameSchemaGenerator } from "./game-schema-generator";
import { GameSchemaManager } from "./game-schema-manager";
import { GameSchemaSolver } from "./game-schema-solver";

export abstract class GameFactory {

    protected gameConfig: GameConfig;

    constructor(gameConfig: GameConfig) {
        this.gameConfig = gameConfig;
    }

    public abstract createSchema() : GameSchema<GameCell>;

    public abstract createSchemaManager() : GameSchemaManager<GameCell, GameSchema<GameCell>>;

    public abstract createSchemaSolver() :  GameSchemaSolver<GameCell, GameSchema<GameCell>> | null;

    public abstract createSchemaGenerator() : GameSchemaGenerator<GameCell, GameSchema<GameCell>> | null;

    public abstract createSolutionWorker(): any;

}