import $ from "jquery";
import { GameSchema } from "./game-types/game-schema";
import { GameSolutionHandler, GameSolutionResult } from "./game-types/game-solution-result";
import { GameSchemaSudoku } from "./sudoku/game-schema";
import { GameSchemaGeneratorSudoku } from "./sudoku/game-schema-generator";
import { GameSchemaSolverSudoku } from "./sudoku/game-schema-solver";
import css from "./style.css";
// import PrimeWorker from "worker-loader!./sudoku/worker";
import DeepSolveWorker from "worker-loader!./sudoku/deep-solver-worker";
import { GameSchemaManagerSodoku } from "./sudoku/game-schema-manager";


let schema: GameSchemaSudoku = new GameSchemaSudoku(true);
const solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();

let schemaManager : GameSchemaManagerSodoku = new GameSchemaManagerSodoku(schema);



// const worker = new PrimeWorker();
const worker = new DeepSolveWorker();

worker.onmessage = (event) => {
    if(event.data.eventType === 'success') {
        schema.setValues(event.data.matrix);
        loadAllValues();
        $('#solutionResult').text("- " + event.data.solutionResult);
    }
    else {
        const eventData = event.data.eventData;
        console.log(`${event.data.eventType} ${eventData.row} ${eventData.col}`);

        const rep: string|null = schemaManager.getCellValueRep(eventData.row, eventData.col, eventData.value);
        if(rep!=null)
            $(`#cell${eventData.row+1}${eventData.col+1}`).html(rep);


        $(`#cell${eventData.row+1}${eventData.col+1}`).parent().removeClass('highlight');
        $(`#cell${eventData.row+1}${eventData.col+1}`).parent().removeClass('tried');
        $(`#cell${eventData.row+1}${eventData.col+1}`).parent().removeClass('failed');

        if(event.data.eventType === 'tryValue') {

            if(!$(`#cell${eventData.row+1}${eventData.col+1}`).parent().hasClass('highlight'))
                $(`#cell${eventData.row+1}${eventData.col+1}`).parent().addClass('tried')
        } else if(event.data.eventType === 'setValue') {
            $(`#cell${eventData.row+1}${eventData.col+1}`).parent().addClass('highlight');
        } else if(event.data.eventType === 'undoValue') {
            if(!$(`#cell${eventData.row+1}${eventData.col+1}`).parent().hasClass('highlight'))
                $(`#cell${eventData.row+1}${eventData.col+1}`).parent().addClass('failed');
        }

    }
};


let editing = false;
let currentEditRow = 0;
let currentEditCol = 0;

let startGeneration : boolean | null = null;

function loadAllValues() {

    $('#roundNumber').text(solver.getStepNumber());

    const solvedCells = solver.getLastSolvedCells();
    if(solvedCells>0) {
        $('#solvedCells').css('display','inline');
        $('#solvedCellsNum').text(solvedCells);
    } else {
        $('#solvedCells').css('display','none');
    }

    for(let row=0;row<schema.getRowNumber();row++)
        for(let col=0;col<schema.getColNumber();col++)
        {
            const value : string | null = schemaManager.getCellValueRep(row,col);
            if(value!=null)
            {
                $(`#cell${row+1}${col+1}`).html(value);

                $(`#cell${row+1}${col+1}`).parent().removeClass('tried');
                $(`#cell${row+1}${col+1}`).parent().removeClass('failed');

                if(schema.getCellHighlight(row,col))
                    $(`#cell${row+1}${col+1}`).parent().addClass('highlight');
                else
                    $(`#cell${row+1}${col+1}`).parent().removeClass('highlight');
            }
        }

}

function resetBtnClick() {
    schema.resetCellsToOrig();
    loadAllValues();
    solver.reset();
    $('#solutionResult').text('');
    $('#solvedCells').css('display','none');
    $('#roundNumber').text('0');
}

function solveBtnClick() {
    solveGame();
}

function stopBtnClick() {

}

function pauseBtnClick() {
}

function stepBtnClick() {
    stepGame();
}

function editTable(row: number,col: number, value: number, valueSet: number[]): string {

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

function cellEditCheckBox(event: JQuery.TriggeredEvent) {

    if(!editing)
        return;

    // 01234567890
    // cellEditrci
    const elementId: string = event.target.id;
    const subId: string = elementId.substring(0, elementId.length-1);

    const row = Number(elementId.substr(8,1));
    const col = Number(elementId.substr(9,1));
    const id = Number(elementId.substr(10,1));
    const newValueSet: number[] = [];
    for(let i=1;i<=9;i++) {
        if($('#' + subId + String(i)).prop('checked'))
            newValueSet.push(i);
    }
    schema.getCell(row-1, col-1).setNewValueSet(newValueSet);
    loadAllValues();
}

function editBtnClick() {
    //console.log('starting worker...')
    //worker.postMessage({ limit: 2000 });


    if(editing) {
        $('#gameTableEditor').css('display', 'none');
        editing = false;
        return;
    }

    

    let row = 1;
    let col = 1;

    while(row<=9) {
        col = 1;
        while(col<=9) {
            const id = `#cellEdt${row}${col}`;
            $(id).html(editTable(row, col, schema.getCellValue(row-1, col-1), schema.getCellValueSet(row-1, col-1)));
            for(var i=1;i<=9;i++) {
                $(`#cellEdit${row}${col}${i}`).on("change", (event: JQuery.TriggeredEvent) => { cellEditCheckBox(event) } );
            }
            col++;
        }
        row++;
    }
    $('#gameTableEditor').css('display', 'table');
    editing = true;
}

function generateBtnClick() {

    if(!startGeneration) {
        startGeneration = true;
        $('.inputGenerate').removeClass('hidden');
        return;
    }

    let val : number = 0;
    if(startGeneration) {
        val = Number($('#generateHolesTxt').val());
        if(isNaN(val))
            return;

        $('.inputGenerate').addClass('hidden');
        startGeneration = false;
    }


    const generator = new GameSchemaGeneratorSudoku(9, val);
    schema = generator.generate();
    schemaManager = new GameSchemaManagerSodoku(schema);
    loadAllValues();
}



function solveGame(): void {
    solver.startSolving();
    stepGame();
}

function stepGame(): void {

    if(solver.isSolved()||solver.isStopped())
        return;

    solver.step(schema);
    loadAllValues();


    if(solver.isSolved()) {
        $('#solutionResult').text("- " + solver.getSolutionResult());
    } else if(solver.isStopped()) {
        const matrix = schema.getValues();
        console.log('starting worker...')
        worker.postMessage({ 'matrix': matrix });
    }

    if (solver.isSolving()) {
        setTimeout(() => stepGame(), 100);
     }
}

class SolutionHandler implements GameSolutionHandler {
    handleResult(result: GameSolutionResult): void {
        throw new Error("Method not implemented.");
    }
}

//const solutionHandler: SolutionHandler = new SolutionHandler();

function loadBtnClick() {

    let loaded: boolean = false;
    let values = localStorage.getItem("gamesolver.schema");
    if(values!=null) {
        schema.initCellsValue( JSON.parse(values) );
        loaded = true;
    }

    let valueSets = localStorage.getItem("gamesolver.schema.values");
    if(valueSets!=null) {
        schema.initCellsValueSets( JSON.parse(valueSets) );
        loaded = true;
    }
    if(loaded)
        loadAllValues();

}

function saveBtnClick() {
    localStorage.setItem("gamesolver.schema", JSON.stringify(schema.getValues()));
    localStorage.setItem("gamesolver.schema.values", JSON.stringify(schema.getValueSets()));
}


function useFileContents(contents: string | ArrayBuffer) {
    let data: any = null;
    if(typeof contents === "string")
        data = JSON.parse(contents);

    if(data == null)
        return;

    let loaded: boolean = false;
    let values = data.values;
    if(values!=null) {
        schema.initCellsValue( values );
        loaded = true;
    }

    let valueSets = data.valueSets;
    if(valueSets!=null) {
        schema.initCellsValueSets( valueSets );
        loaded = true;
    }
    if(loaded)
        loadAllValues();

  }
  
  function readSingleFile(e: any) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        if(e!=null && e.target!=null) {
            var contents = e.target.result;
            if(contents!=null)
            useFileContents(contents);
        }
    };
    reader.readAsText(file);
    $('#file-input').css("display", "none");
  }
  
  

function importBtnClick() {

    $('#file-input').css("display", "block");


}

function download(data: BlobPart, filename: string, type: any) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }
  

function exportBtnClick() {
    const data = {values: schema.getValues(),
                    valueSets: schema.getValueSets() };


    download(JSON.stringify(data)
    , 'schema.json'
    , 'text/json');
  
}





function init() {
    console.log(css.classNames);

    //$('.cellValue').text('0');

    $("#resetBtn").on("click", resetBtnClick );
    $("#solveBtn").on("click", solveBtnClick );
    $("#stopBtn").on("click", stopBtnClick );
    $("#pauseBtn").on("click", pauseBtnClick );
    $("#stepBtn").on("click", stepBtnClick );
    $("#editBtn").on("click", editBtnClick );
    $("#generateBtn").on("click", generateBtnClick );
    $("#loadBtn").on("click", loadBtnClick );
    $("#saveBtn").on("click", saveBtnClick );

    $("#exportBtn").on("click", exportBtnClick );
    $("#importBtn").on("click", importBtnClick );

    $('#file-input').on("change", readSingleFile);



    //$("#confirmEditBtn").on("click", confirmEditBtnClick)

    $('.cellCkeck').on('change', function(e) { console.log('changed ' + e) } );

    $('.gametablecell').on('dblclick', function(e) {
        if(!editing) return;
        $('#cellEditor').css('display','inline');
        const cell =  e.currentTarget;
        const span = cell.children.item(0);
        const id = span!.id.substring(span!.id.length-2);
        currentEditRow = Number(id.substring(0,1))-1;
        currentEditCol = Number(id.substring(1))-1;
        schema.loadCellEditor( currentEditRow, currentEditCol  );
    });

    loadAllValues();
}

$(() => {
    init();
});