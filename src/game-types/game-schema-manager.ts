import { GameSchema } from "./game-schema";

export class GameSchemaManager<C,T extends GameSchema<C>> {

    constructor(schema: T) { }

}