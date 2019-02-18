const { Database } = require("sqlite3")

const db = new Database("./problems.db")
db.exec("pragma foreign_keys=ON;")

function commitProblem(problemid, author, type, firstmove, fens) {
    db.exec(`insert into problems values(${problemid}, "${author}", "${type}", "${firstmove}")`)
    fens.forEach((fen, idx) => db.exec(`insert into moves(problemid, move, fen) values(${problemid}, ${idx}, "${fen}")`))
}

function deleteProblem(problemid) {
    db.exec(`delete from problems where problemid=${problemid}`)
}

function getMoves(problemid, complete) {
    let moves = []
    db.each(`select fen from moves where problemid=${problemid}`, (err,row) => moves.push(row.fen), complete)
    return moves
}

commitProblem(1, "E", "Mate in One", "Black", ["a", "b", "c", "d", "e", "f"])
let moves = getMoves(1, () => console.log(moves))
deleteProblem(1)