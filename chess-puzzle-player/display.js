// TODO: Allow alternative final moves from user if they result in checkmate. Examples 1039, 1040, 4055, 4320
// 1676 is castling problem. 1616 is amusing double promotion.

const Chess = require("chess.js")
const URI = require("urijs")
const $   = require("jquery")
const { ChessBoard } = require("./chessboard/chessboard.js")
const { problems }   = require("./problems.json")
const random         = require("./random.js")
const url_parameters = new URI(window.location.href).search(true)

function unhighlight() {
  $("#board .square-55d63").css("background", "")
}

function highlight(square) {
  const squareEl = $("#board .square-" + square)
  const background = squareEl.hasClass("black-3c85d") ? "#696969" : "#a9a9a9"
  squareEl.css("background", background)
}

function parse_move(move) {
    let [source, target] = move.split("-")
    let promotion = target.length == 2 ? "q" : target[2]
    target = target.slice(0,2)
    return [source, target, promotion]
}

var game
var correct_moves
function make_move() {
    let [source, target, promotion] = parse_move(correct_moves[0])
    game.move({"from": source, "to": target, "promotion": promotion})
    board.move(source + "-" + target)
    correct_moves.shift()
}
const board = ChessBoard("board", {
    draggable: true,
    dropOffBoard: "snapback",
    onDrop: function(src, tgt) {
        if (game.in_checkmate()) {
            return "snapback"
        }
        let [source, target, promotion] = parse_move(correct_moves[0])
        if (src !== source || tgt !== target) {
            return "snapback"
        }
        game.move({"from": source, "to": target, "promotion": promotion})
        correct_moves.shift()
        if (correct_moves.length !== 0) {
            setTimeout(make_move, 500)
        }
        if (game.in_checkmate()) {
            $("#hint-btn").css("display", "none")
            $("#next-btn").css("display", "")
            document.querySelector("#next-btn").onclick = function() {
                const current_problem_id = document.querySelector("#problem-num").innerHTML;
                ("o" in url_parameters && current_problem_id != 4462) ? next(problems[current_problem_id]) : next()
            }
            document.querySelector("#problem-title").innerHTML = document.querySelector("#problem-title").innerHTML.split("-")[0] + " - Solved!"
        }
    },
    onMoveEnd: function() {
        board.position(game.fen())
    },
    onSnapEnd: function() { board.position(game.fen()); unhighlight() }
})

function next(problem=random.choice(problems)) {
    $("#next-btn").css("display", "none")
    $("#hint-btn").css("display", "")
    const problem_type = "Checkm" + problem.type.slice(1) + " Move" + (problem.type.endsWith("One") ? "" : "s")
    document.querySelector("#problem-title").innerHTML = `${problem_type} - ${problem.first}`
    document.querySelector("#problem-num").innerHTML = `${problem.problemid}`
    document.querySelector("#problem-link").href = "o" in url_parameters ? `?o&id=${problem.problemid}` : `?id=${problem.problemid}`
    game = new Chess(problem.fen)
    board.position(problem.fen)
    correct_moves = problem.moves.split(";")
    document.querySelector("#hint-btn").onclick = function() {
        let [source, target, promotion] = parse_move(correct_moves[0])
        highlight(source)
        highlight(target)
    }
}

function init() {
    const problem = ("id" in url_parameters && url_parameters["id"] <= 4462 && url_parameters["id"] > 0) ? problems[url_parameters["id"] - 1] : random.choice(problems)
    next(problem)
}

// Exports
Object.assign(exports, {
    init: init
})