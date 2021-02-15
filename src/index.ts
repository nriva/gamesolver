import $ from "jquery";
import { GameSchema } from "./game-types/game-schema";
import { GameSolutionHandler, GameSolutionResult } from "./game-types/game-solution-result";
import { GameSchemaSudoku } from "./sudoku/game-schema";
import { GameSchemaGeneratorSudoku } from "./sudoku/game-schema-generator";
import { GameSchemaSolverSudoku } from "./sudoku/game-schema-solver";
import css from "./style.css";
import PrimeWorker from "worker-loader!./sudoku/worker";


let schema: GameSchema = new GameSchemaSudoku();
let solver: GameSchemaSolverSudoku = new GameSchemaSolverSudoku();



const worker = new PrimeWorker();

worker.onmessage = (event) => {
    $('#messages').text(event.data.primes);
    console.log(event.data.primes);
};


let solving: boolean = false;
let solvingPaused: boolean = false;
let solvingStopped: boolean = false;

let editing = false;
let currentEditRow = 0;
let currentEditCol = 0;

let startGeneration : boolean | null = null;

function loadAllValues() {

    $('#roundNumber').text(schema.getRoundNumber());

    const solvedCells = schema.solvedCells();
    if(solvedCells>0) {
        $('#solvedCells').css('display','inline');
        $('#solvedCellsNum').text(solvedCells);
    } else {
        $('#solvedCells').css('display','none');
    }

    for(let row=0;row<schema.getRowNumber();row++)
        for(let col=0;col<schema.getColNumber();col++)
        {
            const value : string | null = schema.getCellValueRep(row,col);
            if(value!=null)
            {
                $(`#cell${row+1}${col+1}`).html(value);

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
}

function solveBtnClick() {
    solveGame();
}

function stopBtnClick() {
    solvingStopped = true;
    solving = false;
}

function pauseBtnClick() {
    solvingPaused = true;
    solving = false;
}

function stepBtnClick() {
    stepGame();
}

function editBtnClick() {
    //console.log('starting worker...')
    //worker.postMessage({ limit: 2000 });

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
    loadAllValues();
}

function confirmEditBtnClick() {
    if(!editing) return;
    schema.confirmCellEdit(currentEditRow, currentEditCol);
    $('#cellEditor').css('display','none');
}


function solveGame(): void {
    solving = true;
    solvingStopped = false;
    solvingPaused = false;
    stepGame();
}

function stepGame(): void {
    schema.step();
    loadAllValues();

    if(schema.isSolved() || schema.isStopped()) {
        solving = false;
        $('#solutionResult').text(" - " + schema.solutionResult);
    }
    if (solving) {
        setTimeout(() => stepGame(), 1000);
     }
}
class SolutionHandler implements GameSolutionHandler {
    handleResult(result: GameSolutionResult): void {
        throw new Error("Method not implemented.");
    }
    
}

const colutionHandler: SolutionHandler = new SolutionHandler();



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

    $("#confirmEditBtn").on("click", confirmEditBtnClick)

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