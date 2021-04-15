import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";
import { GameSchemaManager } from "./game-schema-manager";

export enum PlayerKind {
    HUMAN,
    CPU
}

export abstract class GamePlayer<C extends GameCell,T extends GameSchema<C>> {

    protected index = 0;

    protected name:string="";

    protected kind: PlayerKind;

    protected makingMove = false;

    constructor(name:string, index:number, kind: PlayerKind) {
        this.name=name;
        this.index = index;
        this.kind = kind;
    }

    public getKind(): PlayerKind { return this.kind }

    public getName(): string { return this.name }

    public abstract makeMove(schemaManager: GameSchemaManager<C, T>): void;

    public beginMove(): void {
        this.makingMove = true;
    }

    public endMove(): void {
        this.makingMove = false;
    }

    public isMakingMove(): boolean {
        return this.makingMove;
    }

}



export interface GamePlayerManager<C extends GameCell,T extends GameSchema<C>> {

    addPlayer(player:GamePlayer<C,T>): void;
    
    playTurn():void;

    callNextPlayTurn():boolean;

}