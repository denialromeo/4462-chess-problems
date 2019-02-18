const { ChessBoard } = require("./chessboard.js")

function init() {
    const board = ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true,
        onChange: function(oldPos, newPos) { if (document.recording) { console.log(ChessBoard.objToFen(newPos)); } }
    });

    document.querySelector("#startBtn").onclick = board.start;
    document.querySelector("#clearBtn").onclick = board.clear;
    document.querySelector("#recordBtn").onclick = function() {
        if (!document.recording) {
            console.log(board.fen());
            this.value="Stop Recording";
            document.recording=true;
        }
        else {
            this.value="Start Recording";
            document.recording=false;
        }
    };
}

// Exports
Object.assign(exports, {
    init: init
})