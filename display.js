// Module Imports
const Chess = require("chess.js");
const URI = require("urijs");
const $ = require("jquery");
const { ChessBoard } = require("./chessboard/chessboard.js");
const { problems } = require("./problems.json");
const random = require("./random.js");
const { enableScroll, disableScroll } = require("./toggle-scrollbar.js");
let url_parameters = getUrlParameters();

const TOTAL_PROBLEMS = 4462;
const HIGHLIGHT_COLORS = {
  black: "#696969",
  white: "#a9a9a9"
};

function getUrlParameters() {
  return new URI(window.location.href).search(true);
}

function unhighlight() {
  $("#board .square-55d63").css("background", "");
}

function highlight(square) {
  const squareEl = $("#board .square-" + square);
  const color = squareEl.hasClass("black-3c85d") ? HIGHLIGHT_COLORS.black : HIGHLIGHT_COLORS.white;
  squareEl.css("background", color);
}

function parse_move(move) {
  let [source, target] = move.split("-");
  let promotion = target.length === 2 ? "q" : target[2];
  target = target.slice(0, 2);
  return { source, target, promotion };
}

var game;
var correct_moves;

function make_move() {
  const { source, target, promotion } = parse_move(correct_moves[0]);
  game.move({ from: source, to: target, promotion });
  board.move(`${source}-${target}`);
  correct_moves.shift();
}

function next_problem() {
  change_problem(1);
}

function previous_problem() {
  change_problem(-1);
}

function change_problem(direction) {
  const current_problem_id = parseInt(document.querySelector("#problem-num").innerHTML);
  if ("o" in url_parameters && current_problem_id !== (direction === 1 ? TOTAL_PROBLEMS : 1)) {
    const nextProblem = problems[current_problem_id - 1 + direction];
    next(nextProblem);
    pushState(nextProblem.problemid);
  } else if (direction === 1) {
    next();
    if (window.history && window.history.replaceState && "id" in url_parameters) {
      delete url_parameters["id"];
      window.history.replaceState(url_parameters, "", new URI(window.location.href).search(url_parameters).toString());
    }
  }
}

function pushState(problemId) {
  if (window.history && window.history.pushState && "o" in url_parameters) {
    url_parameters["id"] = problemId;
    if (window.history.state && window.history.state["id"] === problemId) {
      return;
    }
    window.history.pushState(url_parameters, "", new URI(window.location.href).search(url_parameters).toString());
  }
}

document.body.onkeydown = function(e) {
  e.preventDefault();

  // If the game is in checkmate and space is pressed, go to the next problem.
  if (game.in_checkmate() && (e.key === " " || e.code === "Space")) {
    next_problem();
    return;
  }

  if (e.key === " " || e.code === "Space") {
    const { source, target } = parse_move(correct_moves[0]);
    highlight(source);
    highlight(target);
  } else {
    unhighlight();
  }

  if (e.code === "ArrowRight") {
    next_problem();
  }

  if (e.code === "ArrowLeft") {
    previous_problem();
  }
};

function onDropHandler(src, tgt) {
  enableScroll();

  if (game.in_checkmate()) {
    return "snapback";
  }

  const { source, target, promotion } = parse_move(correct_moves[0]);

  if (correct_moves.length === 1) {
    const sim_game = new Chess(game.fen());
    sim_game.move({ from: src, to: tgt, promotion });

    if (!sim_game.in_checkmate()) {
      return "snapback";
    } else {
      game.move({ from: src, to: tgt, promotion });
      correct_moves.shift();
    }
  } else {
    if (src !== source || tgt !== target) {
      return "snapback";
    }
    game.move({ from: source, to: target, promotion });
    correct_moves.shift();
    setTimeout(make_move, 500);
  }

  if (game.in_checkmate()) {
    $("#hint-btn").css("display", "none");
    $("#next-btn").css("display", "");
    document.querySelector("#next-btn").onclick = next_problem;
    document.querySelector("#problem-title").innerHTML = document.querySelector("#problem-title").innerHTML.split("-")[0] + " - Solved!";
  }
}

const board = ChessBoard("board", {
  draggable: true,
  dropOffBoard: "snapback",
  onDragStart: () => disableScroll(),
  onDrop: onDropHandler,
  onMoveEnd: () => board.position(game.fen()),
  onSnapEnd: () => { board.position(game.fen()); unhighlight(); }
});

function next(problem = random.choice(problems), useAnimation = true) {
  $("#next-btn").css("display", "none");
  $("#hint-btn").css("display", "");
  const problem_type = `Checkm${problem.type.slice(1)} Move${problem.type.endsWith("One") ? "" : "s"}`;
  var problem_title = `${problem_type} - ${problem.first}`;
  document.title = `#${problem.problemid}`;
  if ("o" in url_parameters) { problem_title = `#${problem.problemid} ${problem_title}`;}
  document.querySelector("#problem-title").innerHTML = problem_title;
  document.querySelector("#problem-num").innerHTML = `${problem.problemid}`;
  document.querySelector("#problem-link").href = "o" in url_parameters ? `?o&id=${problem.problemid}` : `?id=${problem.problemid}`;
  game = new Chess(problem.fen);
  board.position(problem.fen, useAnimation);
  correct_moves = problem.moves.split(";");
  document.querySelector("#hint-btn").onclick = function() {
    const { source, target } = parse_move(correct_moves[0]);
    highlight(source);
    highlight(target);
  };
}

function init() {
  const problem = ("id" in url_parameters && url_parameters["id"] <= TOTAL_PROBLEMS && url_parameters["id"] > 0) ? problems[url_parameters["id"] - 1] : random.choice(problems);
  next(problem);
  pushState(problem.problemid);
}

window.onpopstate = function(event) {
  if (event.state && "id" in event.state) {
    const problemId = event.state["id"];
    next(problems[problemId - 1], false);
  }
};

// Exports
module.exports = {
  init
};