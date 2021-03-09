import { GameCell } from "../game-types/game-cell";

export class GameCellSudoku extends GameCell {

    private value: number;
    private values: number[];

    private proposedValue: number=0;

    private savedValues: number[] = [];

    private readonly ALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() {
        super();
        this.value = 0;
        this.values = this.ALL_VALUES;
    }

    /**
     * Get the value of the cell.
     */
    public getValue(): number {
        return this.value;
    }

    /**
     * Get the set of possibile values for the cell.
     */
    public getValueSet(): number[] {
        return this.values;
    }

    /*
    public isValueInSet(value:number): boolean {
        return this.values.indexOf(value)>=0;
    }
    */

    /**
     * Assign the solving value to the cells
     * @param value the solving value
     */
    public solveWithValue(value: number): void {
        // Cannot reset to zero!
        if (this.value !== 0 && value === 0) {
            throw new Error('Cannot assign value 0 to cell!');
        }

        this.value = value;
        this.values = [];
        this.highlighted = true;
    }

    /**
     * Init the value and the valueSet of the cell.
     * @param value the value
     */
    public initValue(value: number) {
        this.value = value;
        if(value === 0)
            this.values = Object.assign([], this.ALL_VALUES);
        else
            this.values = [];
        this.highlighted = false;
    }

    /**
     * Copy value and set of possibile values from another cell
     * @param other the cell to copy from
     */
    public copyFrom(other: GameCell) {
        this.value = (other as GameCellSudoku).value;
        this.values = Object.assign([], (other as GameCellSudoku).values);
        this.highlighted = other.isHighlighted();
    }

    public clone() : GameCell {
        const other: GameCellSudoku = new GameCellSudoku();
        other.copyFrom(this);
        return other;
    }

    /**
     * Returns true if solved
     * @param value 
     */
    public removeFromValueSet(value: number): boolean {
        if(this.values.find( (elem)=> elem === value )) {
            this.values = this.values.filter( (elem, index, a) => elem !== value );
            if( this.values.length===1) {
                // this.solveWithValue(value);
                return true;
            }
        }

        return false;
    }

    public solve():void {
        if(this.values.length>1)
            throw new Error('Cell cannot be solved, too many possibilities');
        this.solveWithValue(this.values[0]);
    }

    public isSolved(): boolean {
        return this.value !== 0;
    }

    public proposeValue(value:number): void {
        this.proposedValue = value;
        this.value = value;
        this.savedValues = Object.assign([], this.values);
        this.values = [];
    }

    public undoProposeValue(): void {
        this.proposedValue = 0;
        this.value = 0;
        this.values = Object.assign([], this.savedValues);
        this.savedValues = [];

    }

    public confirmProposeValue(): void {
        this.values = Object.assign([], this.savedValues);
        this.value = 0;
        this.solveWithValue(this.proposedValue);
        this.proposedValue = 0;
        this.savedValues = [];
    }

    public setNewValueSet(newValueSet: number[], onlySets: boolean = false) {
        if(newValueSet.length===1) {
            if(!onlySets)
                this.value = newValueSet[0];
            this.values = [];
        } else {
            if(!onlySets)
                this.value = 0;
            this.values = Object.assign([], newValueSet);
        }

    }



}
