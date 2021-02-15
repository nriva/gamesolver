export class GameCell {

    protected highlit: boolean = false;

    public highlight(on: boolean):boolean {
        this.highlit = on;

        return this.highlit;
    }

    public isHighlight():boolean {

        return this.highlit;
    }


}
