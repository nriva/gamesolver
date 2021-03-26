export abstract class GameCell {
    protected value: number;

    protected highlighted: boolean = false;

    protected dirty:boolean=true;

    protected ALL_VALUES: number[] = [];

    constructor() {
        this.value = 0;
    }

    public isDirty(): boolean {
        return this.dirty;
    }

    public setDirtyOff():void {
        this.dirty = false;
    }

    /**
     * Get the value of the cell.
     */
    public getValue(): number {
        return this.value;
    }

    public getValueAsString(): string {
        return String(this.value);
    }


    public setValue(value:number): number {
        if(this.value !== value)
            this.dirty = true;
        this.value = value;
        return this.value;
    }


    public initValue(value: number) {
        this.value = value;
        this.highlighted = false;
        this.dirty = true;
    }



    public highlight(on: boolean = true):boolean {

        if(this.highlighted!==on)
            this.dirty = true;

        this.highlighted = on;
        return this.highlighted;
    }

    public isHighlighted():boolean {
        return this.highlighted;
    }


    public abstract clone() : GameCell;

    public copyFrom(other: GameCell) {
        this.value = other.value;
        this.highlighted = other.isHighlighted();
    }

    public abstract solveWithValue(value: number): void;

    // public setNewValueSet(newValueSet: number[], onlySets: boolean = false) {}
}
