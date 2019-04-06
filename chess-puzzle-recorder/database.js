const { Database } = require("sqlite3")
const path = require("path")

const db = new Database(path.resolve(__dirname, "./problems.db"))
db.exec("pragma foreign_keys=ON")

function commitProblem(problemid, type, first, fen, moves, solved) {
    db.exec(`insert into problems values(${problemid}, "${type}", "${first}", "${fen}", "${moves}", ${solved})`)
}

function nextUnsolved(complete) {
    db.get(`select problemid, type, first, fen, moves from problems where solved=0 order by problemid`, complete)
}

function getProblem(id, complete) {
    db.get(`select problemid, type, first, fen, moves from problems where problemid=${id}`, complete)
}

function printSolved() {
    db.all(`select problemid, first, type, fen, moves from problems where solved=1`, (err,rows) => console.log(JSON.stringify(rows)))
}

Object.assign(exports, {
    commitProblem: commitProblem,
    getProblem: getProblem,
    nextUnsolved: nextUnsolved,
    printSolved: printSolved,
})