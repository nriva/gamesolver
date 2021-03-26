import $ from "jquery";
import "./style.css";

// import "./sudoku/style.css";
// import DeepSolveWorker from "worker-loader!./sudoku/deep-solver-worker";

import { GameSchema } from "./game-types/game-schema";
import { GameCell } from "./game-types/game-cell";
import { GameSchemaSolver } from "./game-types/game-schema-solver";
import { GameSchemaManager } from "./game-types/game-schema-manager";
import { GameFactory } from "./game-types/game-factory";
import { GameFactorySudoku } from "./sudoku/game-factory";
import { GameFactorySolitarie } from "./solitaire/game-factory";
import { GameSchemaManagerEditable } from "./game-types/game-schema-manager-editable";
import { GameSchemaGenerator } from "./game-types/game-schema-generator";


let schema: GameSchema<GameCell>;
let solver: GameSchemaSolver<GameCell, GameSchema<GameCell>> | null;
let schemaManager : GameSchemaManager<GameCell, GameSchema<GameCell>>;

let schemaGenerator: GameSchemaGenerator<GameCell, GameSchema<GameCell>>| null;

// const worker = new PrimeWorker();
let solutionWorker: any; // = new DeepSolveWorker();

let startGeneration: boolean | null = null;

function refreshBoard() {

    // <span id="statusInfo"></span>&nbsp;<span id="solutionResult"></span>&nbsp;<span id="checkResult"></span>
    const info = schemaManager.getStatusInfo(solver);
    $('#statusInfo').html(info.statusInfo);
    $('#solutionResult').html(info.solutionResult);
    $('#checkResult').html(info.checkResult);


    for(let row=0;row<schema.getRowNumber();row++)
        for(let col=0;col<schema.getColNumber();col++) {
            const value = schemaManager.getCellValueRep(row,col, null);
            if(value!=null) {
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
    refreshBoard();
    if(solver!=null) solver.reset();
    $('#solutionResult').text('');
    $('#checkResult').text('');
    $('#statusInfo').text('');
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

/*
function cellEditCheckBox(event: JQuery.TriggeredEvent) {

    if(!schemaManager.isEditing())
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
    for(let i=1;i<= schema.getRowNumber() ;i++) {
        if($('#' + subId + String(i)).prop('checked'))
            newValueSet.push(i);
    }
    schema.getCell(row-1, col-1).setNewValueSet(newValueSet);
    //refreshBoard();
}
*/

function editBtnClick() {
    schemaManagerEdt.onEdit(refreshBoard);
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

    if(schemaGenerator!=null) {
        schema = schemaGenerator.generate({missingDigits: val});
        schemaManager.setSchema(schema);
        refreshBoard();
    }
}



function solveGame(): void {
    /*
    if(solver==null)
        return;

    solver.startSolving();
    refreshBoard();
    stepGame();
    */
    const matrix = schema.getValues();
    $("#statusInfo").text("Searching the solution...");
    solutionWorker.postMessage({ 'matrix': matrix });

}

function stepGame(): void {
    if(solver==null)
        return;

    if(solver.isSolved()||solver.isStopped())
        return;

    solver.step(schema);
    refreshBoard();


    if(solver.isSolved()) {
        $('#solutionResult').text("- " + solver.getSolutionResult());
    } else if(solver.isStopped()) {
        let msg = "No more semplification is possibile";
        if(canSolve())
            msg += ". Try with the Solve button.";
        $("#statusInfo").text(msg);
        /*        
        const matrix = schema.getValues();
        solutionWorker.postMessage({ 'matrix': matrix });
        */
    }

    if (solver.isSolving()) {
        setTimeout(() => stepGame(), 100);
     }
}


function loadBtnClick() {

    const values = localStorage.getItem("gamesolver." + schemaManager.getAppName() + ".schema");

    if(typeof values === 'string')
        if( schema.fromJSON(values) )
            refreshBoard();

}

function saveBtnClick() {
    localStorage.setItem("gamesolver." + schemaManager.getAppName() + ".schema", schema.toJSON() );
}


function useFileContents(contents: string | ArrayBuffer) {

    if(typeof contents !== "string")
        return;


    const loaded: boolean = schema.fromJSON(contents)

    if(loaded)
        refreshBoard();

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
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
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
    download(schema.toJSON()
    , schemaManager.getAppName() + '.json'
    , 'text/json');
}

function undoBtnClick() {
    schema.undoLastMove();
    refreshBoard();
}


// const factory: GameFactory = new GameFactorySudoku();
const factory: GameFactory = new GameFactorySolitarie();

function animateMoves(moves:number[][][], index: number) {

    schema.executeMove(moves[index]);
    refreshBoard();
    if(index<moves.length)
        setTimeout(()=>animateMoves(moves,index+1),1000);

}

let schemaManagerEdt: GameSchemaManagerEditable<GameCell,GameSchema<GameCell>>;

function canEdit(schemaManager: any) : schemaManager is GameSchemaManagerEditable<GameCell,GameSchema<GameCell>> {

    if(schemaManagerEdt!=null)
        return true;

    const ok = typeof schemaManager.getGameTableRowEdt !=="undefined";
    if(ok)
        schemaManagerEdt = schemaManager as GameSchemaManagerEditable<GameCell,GameSchema<GameCell>>;
    return ok;
}

function canSimplify(): boolean {
    return solver!=null;
}

function canSolve(): boolean {
    return solutionWorker!=null;
}


function init() {
    //console.log(css.classNames);

    schema = factory.getSchema(true);
    solver = factory.getSchemaSolver();
    schemaManager = factory.getSchemaManager();
    schemaGenerator = factory.getSchemaGenerator();

    solutionWorker = factory.createSolutionWorker();
    if(solutionWorker!=null)
        solutionWorker.onmessage = (event: any) => {
        if(event.data.eventType === 'success') {

            if(typeof event.data.solvingMoves !== 'undefined') {
                animateMoves(event.data.solvingMoves,0);
            } else {
                schema.setValues(event.data.matrix);
            }

            refreshBoard();
            $('#solutionResult').text("- " + event.data.solutionResult);
        } else {
            const eventData = event.data.eventData;
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
    

    schemaManager.setSchema(schema);

    $('#appTitle').text(schemaManager.getAppTitle());


/*
    <button class="btn btn-primary" id="resetBtn">Reset</button>
    <button class="btn btn-primary" id="solveBtn">Solve</button>
    <button class="btn btn-primary" id="stopBtn" style="display: none;">Stop</button>
    <button class="btn btn-primary" id="pauseBtn" style="display: none;">Pause</button>
    <button class="btn btn-primary" id="stepBtn">Simplify</button>
    <button class="btn btn-primary" id="editBtn">Edit</button>
*/
    if(canEdit(schemaManager)) {
        let rows="";

        for(let r=0;r<schema.getRowNumber();r++) {
            rows += schemaManagerEdt.getGameTableRowEdt(r+1, schema.getColNumber());
        }
        $("#gameTableEditor").html(rows);
        $('#editBtn').css('display','inline');

    }
    if(canSolve()) {
        $('#solveBtn').css('display','inline');
    }
    if(canSimplify()) {
        $('#stepBtn').css('display','inline');
        // $('#solutionDisplay').css('display', 'none');
    }
    if(canGenerate()) {
        $('#generateBtn').css('display','inline');
    }
    if(schema.canUndoMove()) {
        $('#undoBtn').css('display','inline');
    }

    //$('.cellValue').text('0');

    let rows="";
    for(let r=0;r<schema.getRowNumber();r++) {
        rows += schemaManager.getGameTableRow(r+1, schema.getColNumber());
    }
    $("#gameTable").html(rows);

    $("#resetBtn").on("click", resetBtnClick );
    $("#solveBtn").on("click", solveBtnClick );
    $("#stopBtn").on("click", stopBtnClick );
    $("#pauseBtn").on("click", pauseBtnClick );
    $("#stepBtn").on("click", stepBtnClick );
    $("#undoBtn").on("click", undoBtnClick );
    $("#editBtn").on("click", editBtnClick );
    $("#generateBtn").on("click", generateBtnClick );
    $("#loadBtn").on("click", loadBtnClick );
    $("#saveBtn").on("click", saveBtnClick );

    $("#exportBtn").on("click", exportBtnClick );
    $("#importBtn").on("click", importBtnClick );

    $('#file-input').on("change", readSingleFile);



    //$("#confirmEditBtn").on("click", confirmEditBtnClick)

    $('.cellCkeck').on('change', function(e) { console.log('changed ' + e) } );

    $('.gametablecell').on('click', (e) => { 
        schemaManager.onCellClick(e, schema);
        refreshBoard();
    }
    );
    $('.gametablecell').on('dblclick', (e) => {
        schemaManager.onCellDblClick(e, schema)
        refreshBoard();
    });

    refreshBoard();
}

$(() => {
    init();
});

function canGenerate():boolean {
    return schemaGenerator!=null;
}
