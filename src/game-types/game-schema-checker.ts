import { GameCell } from './game-cell';
import { GameSchemaCheckerResult } from './game-schema-checker-result';

export interface GameSchemaChecker {


    check(cells: number[][], parameters?:{}): GameSchemaCheckerResult;

}
