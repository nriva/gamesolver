import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";

export abstract class GameSchemaGenerator<C extends GameCell, T extends GameSchema<C>> {

    public abstract generate(properties:any): T;

}