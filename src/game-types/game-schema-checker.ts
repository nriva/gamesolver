import { GameCell } from './game-cell';
import { GameSchemaCheckerResult } from './game-schema-checker-result';

export interface GameSchemaChecker<T> {

    check(schema: T, parameters?: {} | null): GameSchemaCheckerResult;

}
