// TODO: Allow alternative final moves from user if they result in checkmate. Examples 1039, 1040
// 1676 is castling problem.

const Chess = require("chess.js")
const URI = require("urijs")
const $   = require("jquery")
const { ChessBoard } = require("./chessboard/chessboard.js")
const { problems }   = require("./problems.json")
const random         = require("./random.js")

function unhighlight() {
  $('#board .square-55d63').css('background', '');
}

function highlight(square) {
  var squareEl = $('#board .square-' + square);
  
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
}


function parse_move(move) {
    let [source, target] = move.split("-")
    let promotion = target.length == 2 ? "q" : target[2]
    target = target.slice(0,2)
    return [source, target, promotion]
}

function init() {
    const url_parameters = new URI(window.location.href).search(true)
    const problem = ("id" in url_parameters && url_parameters["id"] <= 4462) ? problems[url_parameters["id"] - 1] : random.choice(problems)
    const problem_type = "Checkm" + problem.type.slice(1) + " Move" + (problem.type.endsWith("One") ? "" : "s")
    document.querySelector("#problem-title").innerHTML = `${problem_type} - ${problem.first}`
    document.querySelector("#problem-num").innerHTML = `${problem.problemid}`
    document.querySelector("#problem-link").href = `?id=${problem.problemid}`
    const game = new Chess(problem.fen)
    const correct_moves = problem.moves.split(";")
    function make_move() {
        let [source, target, promotion] = parse_move(correct_moves[0])
        console.log(source,target,promotion)
        game.move({"from": source, "to": target, "promotion": promotion})
        board.move(source + "-" + target)
        correct_moves.shift()
    }
    const board = ChessBoard('board', {
        draggable: true,
        position: problem.fen,
        dropOffBoard: 'snapback',
        onDrop: function(src, tgt) {
            if (game.in_checkmate()) { return "snapback" }
            let [source, target, promotion] = parse_move(correct_moves[0])
            console.log(source, src, target, tgt)
            if (src !== source || tgt !== target) {
                return "snapback"
            }
            game.move({"from": source, "to": target, "promotion": promotion})
            correct_moves.shift()
            if (correct_moves.length % 2 == 0) {
                setTimeout(make_move, 500)
            }
        },
        onMoveEnd: function() { board.position(game.fen()) },
        onSnapEnd: function() { board.position(game.fen()); unhighlight() }
    });
    document.querySelector("#hint-btn").onclick = function() {
        let [source, target, promotion] = parse_move(correct_moves[0])
        highlight(source)
        highlight(target)
    }
}

// Exports
Object.assign(exports, {
    init: init
})