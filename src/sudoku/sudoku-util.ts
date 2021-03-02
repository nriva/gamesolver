    /**
     * Find value in a 3x3 square
     * @param cells array of game cells
     * @param r row
     * @param c col
     * @param value true if value exists in square rooted in (r,c) cell
     */
    export function findInSquare(cells: number[][], r: number, c: number, value: number): boolean {

        let found = false;
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);

        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3 && !found; i++) {
            for (let j = 0; j < 3 && !found; j++) {
                found = cells[sr * 3 + i][sc * 3 + j] === value;
            }
        }
        return found;

    }

    /**
     * Find value in a column
     * @param cells array of game cells
     * @param c col
     * @param value true if value exists in column c
     */
    export function findInCol(cells: number[][], c: number, value: number) {
        let found = false;
        for (let i = 0; i < 9 && !found; i++) {
            found =  cells[i][c] === value;
        }
        return found;
    }

    /**
     * Find value in a row
     * @param cells array of game cells
     * @param r row
     * @param value true if value exists in row r
     */
    export function findInRow(cells: number[][], r: number, value: number) {
        let found = false;
        for (let i = 0; i < 9 && !found; i++) {
            found = cells[r][i] === value;
        }
        return found;
    }

    export function getCellValueSet(matrix: number[][], r: number, c: number): number[] {
        const valueSet: number[] = [];
        for(let i=1;i<=9;i++) {
            if(checkIfSafe(matrix, r, c, i)) {
                valueSet.push(i);
            }
        }

        return valueSet;
    }

    /**
     * Check if safe to put v in cell matrix[r][c]
     */
    export function checkIfSafe(matrix:number[][], r: number, c: number, v: number): boolean {
        return (!findInRow(matrix, r, v)
                    && !findInCol(matrix, c, v)
                    && !findInSquare(matrix, r, c, v));
    }