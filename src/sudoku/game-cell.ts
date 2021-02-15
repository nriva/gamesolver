import { GameCell } from "../game-types/game-cell";

export class GameCellSudoku extends GameCell {

    private value: number;
    private values: number[];

    private readonly ALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() {
        super();
        this.value = 0;
        this.values = this.ALL_VALUES;
    }

    public getValue(): number {
        return this.value;
    }

    public getValues(): number[] {
        return this.values;
    }

    public containsValue(value:number): boolean {
        return this.values.indexOf(value)>=0;
    }





    /**
     * Assign the solving valueto the cells
     * @param value the solving value
     */
    public assignValue(value: number): boolean {
        // Cannot reset to zero!
        if (this.value !== 0 || value === 0) {
            return false;
        }

        this.value = value;
        this.values = [];
        return true;
    }

    /**
     * Init the value of the cell.
     * The values array is set to the default value ALL_VALUES except the param value it self
     * @param value the value
     */
    public initValue(value: number) {
        this.value = value;
        if(value === 0)
            this.values = this.ALL_VALUES.filter( (elem, index, a) => elem !== value );
        else
            this.values = [];
    }

    /**
     * Copy value and set of possibile values from another cell
     * @param other the cell to copy from
     */
    public copyFrom(other: GameCell) {
        this.value = (other as GameCellSudoku).value;
        this.values = Object.assign([], (other as GameCellSudoku).values);
        this.highlit = other.isHighlight();
    }

    public removeFromValues(value: number):void {
        this.values = this.values.filter( (elem, index, a) => elem !== value );
    }

    public pickValue():void {
        this.assignValue(this.values[0]);
    }

    /*
    public chooseValue(): boolean {
        if (this.values.length > 0) {
            this.value = this.values.pop() || 0;
            return true;
        }

        return false;
    }
    */

}
