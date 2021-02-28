export class GameCell {

    protected highlighted: boolean = false;

    public highlight(on: boolean):boolean {
        this.highlighted = on;

        return this.highlighted;
    }

    public isHighlighted():boolean {

        return this.highlighted;
    }


}
