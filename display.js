// Module Imports
import * as ChessModule from "chess.js";
const Chess = ChessModule.Chess || ChessModule.default || ChessModule;
import URI from "urijs";
import {Chessboard, INPUT_EVENT_TYPE, COLOR} from "cm-chessboard";
import {Markers, MARKER_TYPE} from "cm-chessboard/src/extensions/markers/Markers.js";
import problemsData from "./problems.json";
const problems = problemsData.problems;

// Dutch motivational quotes
const SUCCESS_QUOTES = [
  "🎉 Super gedaan!",
  "⭐ Wat een slimmerik!",
  "🏆 Geweldig! Je bent een kampioen!",
  "🚀 Wauw, dat was snel!",
  "👏 Fantastisch gespeeld!",
  "🌟 Je wordt steeds beter!",
  "💪 Knap hoor!",
  "🎯 Precies goed!",
  "✨ Briljant!",
  "🦁 Jij bent een echte schaakkoning!",
  "🎊 Hoera! Goed gedaan!",
  "🌈 Magnifiek!",
  "🏅 Je bent een ster!",
  "👑 Koninklijke zet!",
  "🎮 Level up!",
];

const MISTAKE_QUOTES = [
  "🤔 Bijna! Probeer het nog eens!",
  "💭 Denk nog even na...",
  "🔍 Kijk nog eens goed!",
  "🧩 Dat was niet helemaal goed, maar je kunt het!",
  "🌱 Van fouten leer je!",
  "💪 Niet opgeven! Je kunt het!",
  "🎯 Net niet, probeer opnieuw!",
  "🤓 Hmm, welke zet geeft schaakmat?",
  "🌟 Je bent er bijna!",
  "🔄 Nog een keer proberen!",
  "🧠 Gebruik je slimme hoofd!",
  "🎪 Oeps! Nog een poging!",
];

function showQuote(isSuccess) {
  const quotes = isSuccess ? SUCCESS_QUOTES : MISTAKE_QUOTES;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const toast = document.getElementById("quote-toast");
  const text = document.getElementById("quote-text");

  if (toast && text) {
    text.textContent = quote;
    toast.className = isSuccess
      ? "fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300 z-50 bg-fun-green text-white"
      : "fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300 z-50 bg-fun-yellow text-slate-800";
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-16px)";
    }, 2500);
  }
}

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

function inputHandler(event) {
  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    return true;
  } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
    const src = event.squareFrom;
    const tgt = event.squareTo;

    if (game.in_checkmate()) {
      return false;
    }

    // Show mistake quote for wrong moves (will be shown if we return false)

    const { source, target, promotion } = parse_move(correct_moves[0]);

    if (correct_moves.length === 1) {
      // Last move - check if it results in checkmate
      const sim_game = new Chess(game.fen());
      const moveResult = sim_game.move({ from: src, to: tgt, promotion });

      if (!moveResult || !sim_game.in_checkmate()) {
        showQuote(false);
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
        showQuote(false);
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
  document.getElementById("next-btn").style.display = "";
  document.querySelector("#next-btn").onclick = next_problem;

  // Update title with solved state (Dutch)
  const titleParts = document.querySelector("#problem-title").innerHTML.split(" · ");
  document.querySelector("#problem-title").innerHTML = titleParts[0] + ' · <span class="text-success-600 success-badge inline-block">✓ Opgelost!</span>';

  // Show success quote
  showQuote(true);

  // Add celebration effect to board
  const boardWrapper = document.getElementById("board-wrapper");
  if (boardWrapper) {
    boardWrapper.classList.add("solved-celebration");
    setTimeout(() => boardWrapper.classList.remove("solved-celebration"), 500);
  }

  board.disableMoveInput();
}

document.body.onkeydown = function(e) {
  // Don't intercept keys when typing in the input field
  if (e.target.id === "problem-input") {
    return;
  }

  // Only handle specific keys, let browser shortcuts through
  if (e.code === "Space" || e.code === "ArrowRight" || e.code === "ArrowLeft") {
    e.preventDefault();

    if (e.code === "Space" && game && game.in_checkmate()) {
      next_problem();
    } else if (e.code === "ArrowRight") {
      next_problem();
    } else if (e.code === "ArrowLeft") {
      previous_problem();
    }
  }
};

function next(problem = problems[0], useAnimation = true) {
  document.getElementById("next-btn").style.display = "none";
  currentProblemId = problem.problemid;
  localStorage.setItem(STORAGE_KEY, currentProblemId);
  const moveCount = problem.type.endsWith("One") ? "1" : problem.type.match(/\d+/)?.[0] || "";
  const moveIndicator = problem.first === "White to Move" ? "Wit" : "Zwart";
  var problem_title = `<span class="text-slate-400">#${problem.problemid}</span> Mat in ${moveCount} · <span class="text-accent-blue">${moveIndicator}</span>`;
  document.title = `#${problem.problemid}`;
  document.querySelector("#problem-title").innerHTML = problem_title;
  document.querySelector("#problem-input").value = problem.problemid;
  game = new Chess(problem.fen);
  board.setPosition(problem.fen, useAnimation);
  correct_moves = problem.moves.split(";");

  // Determine which color moves first
  const turnColor = game.turn() === 'w' ? COLOR.white : COLOR.black;
  board.enableMoveInput(inputHandler, turnColor);
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
