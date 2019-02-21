var express = require('express');
var bodyparser = require('body-parser');
var app = express();

const { commitProblem, getMoves, deleteProblem } = require('./database.js');

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use("/img", express.static(__dirname + '/img'))
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.render('chess-puzzle-recorder')
})
app.post('/', function(req, res) {
    var { fens, problemid, firstmove, author, type } = req.body
    fens = fens.split(',')
    commitProblem(problemid, author, type, firstmove, fens)
    let moves = getMoves(problemid, () => console.log(moves))
    deleteProblem(problemid)
})

app.listen(8000)