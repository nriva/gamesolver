import { GameSchemaChecker } from "../game-types/game-schema-checker";
import { GameSchemaCheckerResult } from "../game-types/game-schema-checker-result";
import { GameCellTicTacToe } from "./game-cell";
import { GameSchemaTicTacToe } from "./game-schema";

export enum ChekResultTictacToe {
    RESULT_UNFINISHED,
    RESULT_WIN_PLAYER1,
    RESULT_WIN_PLAYER2,
    RESULT_DRAW,
    RESULT_ONE_TO_WIN_PLAYER1,
    RESULT_ONE_TO_WIN_PLAYER2
}


export class GameSchemaCheckerTicTacToe implements GameSchemaChecker<GameCellTicTacToe, GameSchemaTicTacToe> {


    private moveToWin: number[][] = [];

    public getMoveToWin(): number[][] {
        return this.moveToWin;
    }

    getRowPositions(currentrow: number): {row: number, col: number}[] {

        const postions = [];
        for (let c = 0; c < 3; c++) {
            postions.push({row: currentrow, col: c});
        }

        return postions;
    }

    getColPositions(currentcol: number): {row: number, col: number}[] {

        const postions = [];
        for (let r = 0; r < 3; r++) {
            postions.push({row: r, col: currentcol});
        }

        return postions;
    }

    getDiagonalPostions(direction:number): {row: number, col: number}[] {

        const postions = [];
        if(direction===0) {
            postions.push({row: 0, col: 0});
            postions.push({row: 1, col: 1});
            postions.push({row: 2, col: 2});
        } else {
            postions.push({row: 0, col: 2});
            postions.push({row: 1, col: 1});
            postions.push({row: 2, col: 0});
        }
        return postions;
    }

    checkPositions(cells: number[][], positions:{row: number, col: number}[], playerCell:number) {
        let check = 0;
        for(let p=0; p<positions.length; p++)
            if( cells[positions[p].row][positions[p].col] === playerCell )
                check++;
        if(check===3) {
            // win!
            return true;
        }
        return false;

    }

    checkPositionsOneToWin(cells: number[][], positions:{row: number, col: number}[], playerCell:number) {

        const cell0 = cells[positions[0].row][positions[0].col];
        const cell1 = cells[positions[1].row][positions[1].col];
        const cell2 = cells[positions[2].row][positions[2].col];
        let win = false;
        if(cell0 === playerCell && cell1 === playerCell && cell2 === GameCellTicTacToe.EMPTY_CELL) {
            this.moveToWin.push(new Array(positions[2].row, positions[2].col, playerCell));
            win = true;
        }
        if(!win && cell0 === GameCellTicTacToe.EMPTY_CELL && cell1 === playerCell && cell2 === playerCell) {
            this.moveToWin.push(new Array(positions[0].row, positions[0].col, playerCell));
            win = true;
        }

        if(!win && cell0 === playerCell  && cell1 === GameCellTicTacToe.EMPTY_CELL && cell2 === playerCell) {
            this.moveToWin.push(new Array(positions[1].row, positions[1].col, playerCell));
            win = true;
        }


        return win;
    }



    checkPlayerWin(cells: number[][], playerCell:number):boolean {
        let win: boolean = false;

        let positions:{row: number, col: number}[];

        for(let r=0;r<3 && !win;r++) {
            positions = this.getRowPositions(r);
            win = this.checkPositions(cells, positions, playerCell);
        }

        for(let c=0; c<3 && !win;c++) {
            positions = this.getColPositions(c);
            win = this.checkPositions(cells, positions, playerCell);
        }

        if(!win) {
            positions = this.getDiagonalPostions(0);
            win = this.checkPositions(cells, positions, playerCell);
        }
        if(!win) {
            positions = this.getDiagonalPostions(1);
            win = this.checkPositions(cells, positions, playerCell);
        }
        return win;
    }

    checkPlayerOneToWin(cells: number[][], playerCell:number):boolean {
        let win: boolean = false;

        let positions:{row: number, col: number}[];

        for(let r=0;r<3 && !win;r++) {
            positions = this.getRowPositions(r);
            win = this.checkPositionsOneToWin(cells, positions, playerCell);
        }

        for(let c=0; c<3 && !win;c++) {
            positions = this.getColPositions(c);
            win = this.checkPositionsOneToWin(cells, positions, playerCell);
        }

        if(!win) {
            positions = this.getDiagonalPostions(0);
            win = this.checkPositionsOneToWin(cells, positions, playerCell);
        }
        if(!win) {
            positions = this.getDiagonalPostions(1);
            win = this.checkPositionsOneToWin(cells, positions, playerCell);
        }
        return win;
    }


    check(schema: GameSchemaTicTacToe, parameters: any): GameSchemaCheckerResult {
        const cells = schema.getValues();
        const result = this.checkMatrix(cells, parameters);
        if(result.status === ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER1 || result.status === ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER2)
            result.status = ChekResultTictacToe.RESULT_UNFINISHED;
        return result;
    }

    checkMatrix(values:number[][], parameters: any): GameSchemaCheckerResult {

        const result: GameSchemaCheckerResult =  new GameSchemaCheckerResult();
        result.status = ChekResultTictacToe.RESULT_UNFINISHED;
        result.error = false;

        let emptyCells = 0;

        this.moveToWin = [];        

        if(this.checkPlayerWin(values, GameCellTicTacToe.PLAYER1_CELL)) {
            result.status = ChekResultTictacToe.RESULT_WIN_PLAYER1;
        } else if (this.checkPlayerWin(values, GameCellTicTacToe.PLAYER2_CELL)) {
            result.status = ChekResultTictacToe.RESULT_WIN_PLAYER2;
        } else if (this.checkPlayerOneToWin(values, GameCellTicTacToe.PLAYER1_CELL)) {
            result.status = ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER1;
        } else if (this.checkPlayerOneToWin(values, GameCellTicTacToe.PLAYER2_CELL)) {
            result.status = ChekResultTictacToe.RESULT_ONE_TO_WIN_PLAYER2;
        }

        

        
        if(result.status === ChekResultTictacToe.RESULT_UNFINISHED) {
            for(let r=0;r<values.length;r++)
                for(let c=0;c<values[r].length;c++)
                    if(values[r][c] === GameCellTicTacToe.EMPTY_CELL)
                        emptyCells++;

            if(emptyCells===0) {
                // it's finished
                result.status = ChekResultTictacToe.RESULT_DRAW;
            }
        }
        return result
    }

}