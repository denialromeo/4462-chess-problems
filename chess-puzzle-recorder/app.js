const express = require('express')
const bodyparser = require('body-parser')

const { commitProblem, nextUnsolved } = require('./database.js')

const app = express();
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use("/static", express.static(__dirname + '/static'))
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    nextUnsolved((err, row) => res.render("chess-puzzle-recorder", row))
})

app.post('/', function(req, res) {
    const { problemid, first, type, fen, moves } = req.body
    console.log(problemid, type, first, fen, moves)
    commitProblem(problemid, type, first, fen, moves, 1)
    res.redirect('back')
})

app.listen(8000)