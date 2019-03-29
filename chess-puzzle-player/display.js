const { ChessBoard } = require("./chessboard/chessboard.js")
const { problems } = require("./problems.json")
const random = require("./random.js")

function init() {
    const problem = random.choice(problems)
    const moves = problem.moves.split(";")
    const board = ChessBoard('board', {
        draggable: true,
        position: problem.fen,
        dropOffBoard: 'snapback',
    });

    document.querySelector("#startBtn").onclick = function() { board.move(moves[0]); moves.shift() }
}

// Exports
Object.assign(exports, {
    init: init
})