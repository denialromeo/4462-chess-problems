const { ChessBoard } = require("./chessboard.js")

const fens = []

function commit() {
    const problemid = document.getElementById("problemid").value
    const author = document.getElementById("author").value
    const type = document.getElementById("type").value
    const firstmove = document.getElementById("firstmove").value

    if (isNaN(problemid) || Number(problemid) > 4462 || Number(problemid) < 1) {
        window.alert("Error: Invalid Problem #. Must be between 1-4462.")
    }
    else {
        console.log(fens)
        document.getElementById("recordBtn").value = "Start Recording"
        document.recording-false
    }
}

function init() {
    const board = ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true,
        onChange: function(oldPos, newPos) { if (document.recording) { fens.push(ChessBoard.objToFen(newPos)) } }
    });

    document.querySelector("#startBtn").onclick = board.start
    document.querySelector("#clearBtn").onclick = board.clear
    document.querySelector("#recordBtn").onclick = function() {
        if (!document.recording) {
            fens.push(board.fen())
            this.value="Commit Problem"
            document.recording=true
        }
        else {
            commit()
        }
    };
}

// Exports
Object.assign(exports, {
    init: init
})