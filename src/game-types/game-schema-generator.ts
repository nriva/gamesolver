import { GameCell } from "./game-cell";
import { GameConfig } from "./game-config";
import { GameSchema } from "./game-schema";

export abstract class GameSchemaGenerator<C extends GameCell, T extends GameSchema<C>> {

    public abstract generate(gameConfig: GameConfig, properties:any): T;

}