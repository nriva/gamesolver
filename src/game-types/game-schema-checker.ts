import { GameCell } from './game-cell';
import { GameSchema } from './game-schema';
import { GameSchemaCheckerResult } from './game-schema-checker-result';

export interface GameSchemaChecker<C extends GameCell, T extends GameSchema<C>> {

    check(schema: T, parameters: any): GameSchemaCheckerResult;

}
