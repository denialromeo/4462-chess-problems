const { Database } = require("sqlite3")
const path = require("path")

const db = new Database(path.resolve(__dirname, "./problems.db"))
db.exec("pragma foreign_keys=ON")

function commitProblem(problemid, author, type, firstmove, fens) {
    db.exec(`insert into problems values(${problemid}, "${author}", "${type}", "${firstmove}")`)
    fens.forEach((fen, idx) => db.exec(`insert into moves(problemid, move, fen) values(${problemid}, ${idx}, "${fen}")`))
}

function deleteProblem(problemid) {
    db.exec(`delete from problems where problemid=${problemid}`)
}

function getMoves(problemid, complete) {
    let moves = []
    db.each(`select fen from moves where problemid=${problemid} order by move`, (err,row) => moves.push(row.fen), complete)
    return moves
}

Object.assign(exports, {
    commitProblem: commitProblem,
    deleteProblem: deleteProblem,
    getMoves: getMoves
})