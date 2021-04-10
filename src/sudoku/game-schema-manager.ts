import $ from 'jquery';
import { GameSchemaSudoku } from "./game-schema";
import { GameCellSudoku } from "./game-cell";
import { getClickedRowCol } from "../game-types/game-utils";
import { GameSchemaSolver } from "../game-types/game-schema-solver";
import { GameSchemaManagerEditable } from "../game-types/game-schema-manager-editable";

export class GameSchemaManagerSodoku extends GameSchemaManagerEditable<GameCellSudoku, GameSchemaSudoku> {

    public getStatusInfo(solver: GameSchemaSolver<GameCellSudoku, GameSchemaSudoku> | null): { statusInfo:string, solutionResult:string, checkResult:string } {

        const r = { statusInfo:'', solutionResult: '', checkResult: ''};

        if(solver!=null) {
            const roundNumber = solver.getStepNumber();
            let solvedCellsDisplay = 'none';
            let solvedCellsNum = 0;

            const solvedCells = solver.getLastSolvedCells();
            if(solvedCells>0) {
                solvedCellsDisplay = 'inline';
                solvedCellsNum = solvedCells;
            }

            r.statusInfo = `<span>Round:</span><span id="roundNumber">${roundNumber}</span>
            <span id="solvedCells" style="display: ${solvedCellsDisplay};"> - Solved <span id="solvedCellsNum">${solvedCellsNum}</span>&nbsp;cells</span>`;

        }

        return r;
    
    }
    public getAppTitle(): string {
        return  "Sudoku Generator & Solver";
    }

    public getAppName(): string {
        return "sudoku";
    }

    protected getCellAttributes(rowId:number, colId: number): any {
        return {border:true};
    }


    public onCellClick(e: any): void {

        let currentEditRow = 0;
        let currentEditCol = 0;

        if(!this.editing) return;
        $('#cellEditor').css('display','inline');
        [ currentEditRow, currentEditCol ] = getClickedRowCol(e);
        this.loadCellEditor( currentEditRow, currentEditCol  );
    }


    constructor() {
        super();
    }

    public loadCellEditor(row: number, col: number): void {
        for(let i=1;i<=9;i++)
            $('#cellCheck'+i).prop('checked', false);

        const cell = this.schema.getCell(row,col);
        if(cell.getValue()!==0) {
            $('#cellCheck'+cell.getValue()).prop('checked', true);

        } else {
            cell.getValueSet().forEach(
                (elem,i) => {
                    $('#cellCheck'+elem).prop('checked', true);
                }
            );
        }
    }

    public confirmCellEdit(currentEditRow: number, currentEditCol: number): boolean {

        for(let i=1;i<=9;i++) {
            let checked = $('#cellCheck'+i).prop('checked');
        }
        return true;
    }

    private editTable(row: number,col: number, value: number, valueSet: number[]): string {

        const indicators: boolean[] = Array(false,false,false,false,false,false,false,false,false) ;
        if(value===0) {
            valueSet.forEach((v)=> indicators[v-1] = true);
        } else {
            indicators[value-1] = true;
        }
    
        const table = `<table id="cellEditorTable${row}${col}" style="width: 100%; height: 100%">
        <tr>
          <td><div class="cellEditorValues">1</div></td><td><input id="cellEdit${row}${col}1" type="checkbox" ${indicators[0]?"checked":""}></td>
          <td><div class="cellEditorValues">2</div></td><td><input id="cellEdit${row}${col}2" type="checkbox" ${indicators[1]?"checked":""}></td>
          <td><div class="cellEditorValues">3</div></td><td><input id="cellEdit${row}${col}3" type="checkbox" ${indicators[2]?"checked":""}></td>
        </tr>
        <tr>
          <td><div class="cellEditorValues">4</div></td><td><input id="cellEdit${row}${col}4" type="checkbox" ${indicators[3]?"checked":""}></td>
          <td><div class="cellEditorValues">5</div></td><td><input id="cellEdit${row}${col}5" type="checkbox" ${indicators[4]?"checked":""}></td>
          <td><div class="cellEditorValues">6</div></td><td><input id="cellEdit${row}${col}6" type="checkbox" ${indicators[5]?"checked":""}></td>
        </tr>
        <tr>
          <td><div class="cellEditorValues">7</div></td><td><input id="cellEdit${row}${col}7" type="checkbox" ${indicators[6]?"checked":""}></td>
          <td><div class="cellEditorValues">8</div></td><td><input id="cellEdit${row}${col}8" type="checkbox" ${indicators[7]?"checked":""}></td>
          <td><div class="cellEditorValues">9</div></td><td><input id="cellEdit${row}${col}9" type="checkbox" ${indicators[8]?"checked":""}></td>
        </tr>
      </table>`;
    
      return table;
    }


    private cellEditCheckBox(event: JQuery.TriggeredEvent) {

        if(!this.isEditing())
            return;
    
        // TODO:
        // Move this sudoku-specific code elsewhere
    
        // 01234567890
        // cellEditrci
        const elementId: string = event.target.id;
        const subId: string = elementId.substring(0, elementId.length-1);
    
        const row = Number(elementId.substr(8,1));
        const col = Number(elementId.substr(9,1));
        const id = Number(elementId.substr(10,1));
        const newValueSet: number[] = [];
        for(let i=1;i<= this.schema.getRowNumber() ;i++) {
            if($('#' + subId + String(i)).prop('checked'))
                newValueSet.push(i);
        }
        this.schema.getCell(row-1, col-1).setNewValueSet(newValueSet);
        //refreshBoard();
    }

    public onEdit( refreshBoard: any ):void {
        if(this.isEditing()) {
            $('#gameTableEditor').css('display', 'none');
            this.setEditing(false);
            return;
        }
        let row = 1;
        let col = 1;
        while(row<=this.schema.getRowNumber()) {
            col = 1;
            while(col<= this.schema.getColNumber()) {
                const id = `#cellEdt${row}${col}`;
                $(id).html(this.editTable(row, col, this.schema.getCell(row-1, col-1).getValue(), this.schema.getCellValueSet(row-1, col-1)));
                // TODO: 9 values!
                for(let i=1;i<=9;i++) {
                    $(`#cellEdit${row}${col}${i}`).on("change", (event: JQuery.TriggeredEvent) => {
                        this.cellEditCheckBox(event);
                        refreshBoard();
                    } );
                }
                col++;
            }
            row++;
        }
        $('#gameTableEditor').css('display', 'table');
        this.setEditing(true);
    }
    


    public getCellValueRep(row: number, col: number, value: number | null): string | null {
        if(value!=null && value>0) {
            return String(value);
        }
        const values = this.getCellValuesRep(row, col);
        const _value = this.schema.getCellValue(row, col);
        return `${ _value === 0 ? '' : String(_value)}${values}`;
    }

    private getCellValuesRep(row: number, col: number): string | null {
        let html = '';
        const values = this.schema.getCellValueSet(row, col);
        if(values.length===9)
            return '';
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