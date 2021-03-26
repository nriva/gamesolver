import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";
import { GameSchemaGenerator } from "./game-schema-generator";
import { GameSchemaManager } from "./game-schema-manager";
import { GameSchemaSolver } from "./game-schema-solver";

export abstract class GameFactory {

    public abstract getSchema(demo: boolean) : GameSchema<GameCell>;

    public abstract getSchemaManager() : GameSchemaManager<GameCell, GameSchema<GameCell>>;

    public abstract getSchemaSolver() :  GameSchemaSolver<GameCell, GameSchema<GameCell>> | null;

    public abstract getSchemaGenerator() : GameSchemaGenerator<GameCell, GameSchema<GameCell>> | null;

    public abstract createSolutionWorker(): any;

}