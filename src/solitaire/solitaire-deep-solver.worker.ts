import { DeepSolverMatrixSolitaire } from "./game-schema-solver";

const ctx: Worker = self as any;

ctx.addEventListener("message", (event) => {
    const matrix = event.data.matrix;
    const solver = new DeepSolverMatrixSolitaire(matrix,ctx);
    let solutionResult = "Resolution failed."
    if(solver.deepSolve(1,3)) {
        solutionResult = "Recursive search succeeded.";
    }
    ctx.postMessage({'eventType': 'success'
        , 'matrix':matrix
        , 'solutionResult': solutionResult
        , 'solvingMoves': solver.getSolvingMoves()});
});