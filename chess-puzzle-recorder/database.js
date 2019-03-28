const { Database } = require("sqlite3")
const path = require("path")

const db = new Database(path.resolve(__dirname, "./p.db"))
db.exec("pragma foreign_keys=ON")

function commitProblem(problemid, type, first, fen, moves) {
    db.exec(`insert into problems values(${problemid}, "${type}", "${first}", "${fen}", "${moves})`)
}

function printAllData() {
    db.all(`select problemid, type, first, fen, moves from problems order by problemid`, (err,rows) => console.log(JSON.stringify(rows)))
}

Object.assign(exports, {
    commitProblem: commitProblem,
    printAllData: printAllData
})