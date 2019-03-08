const movesJson = require("./problems.json").moves

var moves = []
var builder = {}
for (let i = 0; i < movesJson.length; i++) {
    let move = Object.assign({}, movesJson[i])
    if (move.problemid !== builder.problemid) {
        moves.push(builder)
        builder = Object.assign({}, move)
        delete builder.fen
        delete builder.move
        builder.fens = [move.fen]
    }
    else {
        builder.fens.push(move.fen)
    }
}
moves.push(builder)
console.log(JSON.stringify({"problems": moves.slice(1)}))