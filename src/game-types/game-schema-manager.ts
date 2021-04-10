import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";
import { GameSchemaSolver } from "./game-schema-solver";
import { getClickedRowCol } from "./game-utils";

export abstract class GameSchemaManager<C extends GameCell,T extends GameSchema<C>> {

    protected schema!: T;

    public setSchema(schema: T) {
        this.schema = schema;
    }

    protected getCellAttributes(rowId:number, colId: number): any { return null; }

    public getGameTableRow(rowId:number, colNumber: number): string {

        let cells='';
        for(let c=0;c<colNumber;c++)
            cells += this.getGameTableCell(rowId, c, this.getCellAttributes(rowId, c));
        return `<div class="gametablerow">${cells}</div>`;


    }

    public getGameTableCell(rowId:number, colId:number, attributes:any): string {

        let classes = "gametablecell";
        if(attributes?.border)
            classes += " gametablecellborder";
        return `<div class="${classes}"><span class="cellValue" id="cell${rowId+1}${colId+1}"></span></div>`;

    }

    public abstract getCellValueRep(row: number, col: number, value: number | null): string | null;


    public onCellClick(e:any, schema: T):void { }

    public onCellDblClick(e:any, schema: T):void { }

    public abstract getAppTitle(): string;

    public abstract getAppName(): string;

    public abstract getStatusInfo(solver: GameSchemaSolver<C,T> | null): { statusInfo:string, solutionResult:string, checkResult:string };




}