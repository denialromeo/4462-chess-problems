// Module Imports
import * as ChessModule from "chess.js";
const Chess = ChessModule.Chess || ChessModule.default || ChessModule;
import URI from "urijs";
import {Chessboard, INPUT_EVENT_TYPE, COLOR} from "cm-chessboard";
import {Markers, MARKER_TYPE} from "cm-chessboard/src/extensions/markers/Markers.js";
import problemsData from "./problems.json";
const problems = problemsData.problems;

let url_parameters = getUrlParameters();

const TOTAL_PROBLEMS = 4462;
const STORAGE_KEY = "lastProblemId";

function getUrlParameters() {
  return new URI(window.location.href).search(true);
}

function parse_move(move) {
  let [source, target] = move.split("-");
  let promotion = target.length === 2 ? "q" : target[2];
  target = target.slice(0, 2);
  return { source, target, promotion };
}

var game;
var correct_moves;
var currentProblemId;
var board;

function make_move() {
  const { source, target, promotion } = parse_move(correct_moves[0]);
  game.move({ from: source, to: target, promotion });
  board.movePiece(source, target, true).then(() => {
    correct_moves.shift();
  });
}

function next_problem() {
  change_problem(1);
}

function previous_problem() {
  change_problem(-1);
}

function change_problem(direction) {
  const newId = currentProblemId + direction;
  if (newId >= 1 && newId <= TOTAL_PROBLEMS) {
    next(problems[newId - 1]);
    pushState(newId);
  }
}

function goToProblem(id) {
  if (id >= 1 && id <= TOTAL_PROBLEMS) {
    next(problems[id - 1]);
    pushState(id);
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

function showHint() {
  const { source, target } = parse_move(correct_moves[0]);
  board.removeMarkers(MARKER_TYPE.framePrimary);
  board.addMarker(MARKER_TYPE.framePrimary, source);
  board.addMarker(MARKER_TYPE.framePrimary, target);
}

function inputHandler(event) {
  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    // Remove any hint markers when starting a move
    board.removeMarkers(MARKER_TYPE.framePrimary);
    return true;
  } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
    const src = event.squareFrom;
    const tgt = event.squareTo;

    if (game.in_checkmate()) {
      return false;
    }

    const { source, target, promotion } = parse_move(correct_moves[0]);

    if (correct_moves.length === 1) {
      // Last move - check if it results in checkmate
      const sim_game = new Chess(game.fen());
      const moveResult = sim_game.move({ from: src, to: tgt, promotion });

      if (!moveResult || !sim_game.in_checkmate()) {
        return false;
      } else {
        game.move({ from: src, to: tgt, promotion });
        correct_moves.shift();
        onPuzzleSolved();
        return true;
      }
    } else {
      // Not last move - must match exactly
      if (src !== source || tgt !== target) {
        return false;
      }
      game.move({ from: source, to: target, promotion });
      correct_moves.shift();
      // Schedule opponent's response
      setTimeout(make_move, 500);
      return true;
    }
  } else if (event.type === INPUT_EVENT_TYPE.moveInputFinished) {
    // Update board position to match game state
    board.setPosition(game.fen(), false);
  }
}

function onPuzzleSolved() {
  document.getElementById("hint-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "";
  document.querySelector("#next-btn").onclick = next_problem;
  document.querySelector("#problem-title").innerHTML = document.querySelector("#problem-title").innerHTML.split("-")[0] + " - Solved!";
  board.disableMoveInput();
}

document.body.onkeydown = function(e) {
  // Don't intercept keys when typing in the input field
  if (e.target.id === "problem-input") {
    return;
  }

  e.preventDefault();

  // If the game is in checkmate and space is pressed, go to the next problem.
  if (game && game.in_checkmate() && (e.key === " " || e.code === "Space")) {
    next_problem();
    return;
  }

  if (e.key === " " || e.code === "Space") {
    showHint();
  }

  if (e.code === "ArrowRight") {
    next_problem();
  }

  if (e.code === "ArrowLeft") {
    previous_problem();
  }
};

function next(problem = problems[0], useAnimation = true) {
  board.removeMarkers(MARKER_TYPE.framePrimary);
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("hint-btn").style.display = "";
  currentProblemId = problem.problemid;
  localStorage.setItem(STORAGE_KEY, currentProblemId);
  const problem_type = `Checkm${problem.type.slice(1)} Move${problem.type.endsWith("One") ? "" : "s"}`;
  var problem_title = `#${problem.problemid} ${problem_type} - ${problem.first}`;
  document.title = `#${problem.problemid}`;
  document.querySelector("#problem-title").innerHTML = problem_title;
  document.querySelector("#problem-input").value = problem.problemid;
  game = new Chess(problem.fen);
  board.setPosition(problem.fen, useAnimation);
  correct_moves = problem.moves.split(";");

  // Determine which color moves first
  const turnColor = game.turn() === 'w' ? COLOR.white : COLOR.black;
  board.enableMoveInput(inputHandler, turnColor);

  document.querySelector("#hint-btn").onclick = showHint;
}

function getInitialProblem() {
  // First check URL parameter
  if ("id" in url_parameters && url_parameters["id"] <= TOTAL_PROBLEMS && url_parameters["id"] > 0) {
    return problems[url_parameters["id"] - 1];
  }
  // Then check localStorage for last visited problem
  const savedId = parseInt(localStorage.getItem(STORAGE_KEY));
  if (savedId && savedId >= 1 && savedId <= TOTAL_PROBLEMS) {
    return problems[savedId - 1];
  }
  // Default to problem 1
  return problems[0];
}

function init() {
  // Create the board
  board = new Chessboard(document.getElementById("board"), {
    assetsUrl: "node_modules/cm-chessboard/assets/",
    style: {
      cssClass: "default",
      showCoordinates: true,
      aspectRatio: 1
    },
    extensions: [
      {class: Markers, props: {autoMarkers: MARKER_TYPE.frame}}
    ]
  });

  const problem = getInitialProblem();
  next(problem, false);
  pushState(problem.problemid);

  document.querySelector("#go-btn").onclick = function() {
    const id = parseInt(document.querySelector("#problem-input").value);
    goToProblem(id);
  };

  document.querySelector("#problem-input").onkeydown = function(e) {
    if (e.key === "Enter") {
      const id = parseInt(document.querySelector("#problem-input").value);
      goToProblem(id);
    }
  };
}

window.onpopstate = function(event) {
  if (event.state && "id" in event.state) {
    const problemId = event.state["id"];
    next(problems[problemId - 1], false);
  }
};

// Exports
export { init };
