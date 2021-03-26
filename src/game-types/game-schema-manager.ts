import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";
import { GameSchemaSolver } from "./game-schema-solver";
import { getClickedRowCol } from "./game-utils";

export abstract class GameSchemaManager<C extends GameCell,T extends GameSchema<C>> {

    protected schema!: T;

    public setSchema(schema: T) {
        this.schema = schema;
    }

    public getGameTableRow(rowId:number, colNumber: number): string {

        let cells='';
        for(let c=0;c<colNumber;c++)
            cells += this.getGameTableCell(rowId,c+1);
        return `<div class="gametablerow">${cells}</div>`;


    }

    public getGameTableCell(rowId:number, colId:number): string {

        return `<div class="gametablecell"><span class="cellValue" id="cell${rowId}${colId}"></span></div>`;

    }

    public abstract getCellValueRep(row: number, col: number, value: number | null): string | null;


    public onCellClick(e:any, schema: T):void { }

    public onCellDblClick(e:any, schema: T):void { }

    public abstract getAppTitle(): string;

    public abstract getAppName(): string;

    public abstract getStatusInfo(solver: GameSchemaSolver<C,T> | null): { statusInfo:string, solutionResult:string, checkResult:string };




}