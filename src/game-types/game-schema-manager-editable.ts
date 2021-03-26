import { GameCell } from "./game-cell";
import { GameSchema } from "./game-schema";
import { GameSchemaManager } from "./game-schema-manager";

export abstract class GameSchemaManagerEditable<C extends GameCell,T extends GameSchema<C>> extends GameSchemaManager<C,T> {

    /*
          <div class="gametablerowedt">
            <div class="gametablecelledt" id="cellEdt11"></div>
            <div class="gametablecelledt" id="cellEdt12"></div>
            <div class="gametablecelledt" id="cellEdt13"></div>
            <div class="gametablecelledt" id="cellEdt14"></div>
            <div class="gametablecelledt" id="cellEdt15"></div>
            <div class="gametablecelledt" id="cellEdt16"></div>
            <div class="gametablecelledt" id="cellEdt17"></div>
            <div class="gametablecelledt" id="cellEdt18"></div>
            <div class="gametablecelledt" id="cellEdt19"></div>
          </div>    
    */

    public abstract loadCellEditor(row: number, col: number): void;

    public abstract confirmCellEdit(currentEditRow: number, currentEditCol: number): boolean;

    public getGameTableRowEdt(rowId:number, colNumber: number): string {

        let cells='';
        for(let c=0;c<colNumber;c++)
            cells += this.getGameTableCellEdt(rowId,c+1);
        return `<div class="gametablerowedt">${cells}</div>`;


    }

    public getGameTableCellEdt(rowId:number, colId:number): string {

        return `<div class="gametablecelledt" id="cellEdt${rowId}${colId}"></div>`;

    }

    protected editing: boolean = false;
    public isEditing(): boolean {
        return this.editing;
    }

    public setEditing(editing:boolean): boolean {
        this.editing = editing;
        return this.editing;
    }


    public abstract onEdit(refreshBoard: any):void;
}