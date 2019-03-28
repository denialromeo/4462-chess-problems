const { ChessBoard } = require("./chessboard/chessboard.js")
const { problems } = require("./problems.json")

function init() {
    const board = ChessBoard('board', {
        draggable: true,
        position: problems[0].fen,
        dropOffBoard: 'snapback',
    });

    document.querySelector("#startBtn").onclick = board.start
    document.querySelector("#clearBtn").onclick = board.clear
}

// Exports
Object.assign(exports, {
    init: init
})