require("babel-polyfill")

require("!style-loader!css-loader!./chessboard/chessboard.css")

const { init } = require("./display.js")

init()