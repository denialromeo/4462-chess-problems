var fens = []

function validateForm() {
    const problemid = document.getElementById("problemid").value
    if (isNaN(problemid) || Number(problemid) > 4462 || Number(problemid) < 1) {
        window.alert("Error: Invalid Problem #. Must be between 1-4462.")
        return false
    }
    return true
}

function submitForm() {
    if (validateForm()) {
        document.recording = false
        document.getElementById("fens").value = fens
        document.querySelector("#recordBtn").style=""
        document.querySelector("#commitBtn").style="display:none"
        fens = []
    }
    else {
        event.preventDefault()
    }
}

const board = ChessBoard('board', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    onChange: function(oldPos, newPos) { if(document.recording) { fens.push(ChessBoard.objToFen(newPos)) } }
})

document.querySelector("#startBtn").onclick = board.start
document.querySelector("#clearBtn").onclick = board.clear
document.querySelector("#recordBtn").onclick = function() {
    document.recording = true
    document.querySelector("#recordBtn").style="display:none"
    document.querySelector("#commitBtn").style=""
    fens.push(board.fen())
}