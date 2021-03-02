import { GameSchemaManager } from "../game-types/game-schema-manager";
import { GameSchemaSudoku } from "./game-schema";
import { GameCellSudoku } from "./game-cell";

export class GameSchemaManagerSodoku extends GameSchemaManager<GameCellSudoku, GameSchemaSudoku> {

    private schema: GameSchemaSudoku;

    constructor(schema: GameSchemaSudoku) {
        super(schema);
        this.schema = schema;
    }

    public getCellValueRep(row: number, col: number, value: number=0): string | null {
        if(value>0) {
            return String(value);
        }
        const values = this.getCellValuesRep(row, col);
        const _value = this.schema.getCellValue(row, col);
        return `${ _value === 0 ? '' : String(_value)}${values}`;
    }

    public getCellValuesRep(row: number, col: number): string | null {
        let html = '';
        const values = this.schema.getCellValueSet(row, col);
        if (values.length > 0) {

            let dim = 3;
            let fontSize="xx-small";
            if(values.length<=4) {
                dim = 2;
                fontSize="x-small";
            }
            fontSize = "medium";
            let r = 0;
            let c = 0;
            html = `<table style="font-size: ${fontSize}; margin-left: auto; margin-right: auto; width:100%">`;

            for(let index=0;index<dim*dim;index++)  {

                let value = '';

                if(index<values.length)
                    value = String(values[index]);

                c = index % dim;
                r = Math.floor( index / dim);
                if(c===0)
                    html += '<tr>';
                html += `<td style="text-align: center">${value}</td>`;
                if(c===dim-1)
                    html += '</tr>';
            }

            html += '</table>';
        }
        return html;
    }


}