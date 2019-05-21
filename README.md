## 4462 Chess Problems

In 1994, famed chess teacher [László Polgár](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Polg%C3%A1r) published [*Chess: 5,334 Problems, Combinations, and Games*](https://ausee.files.wordpress.com/2016/06/23.pdf). Of these, 4,462 are checkmate problems.

If you'd like to use these problems for your own project, simply download [problems.json](https://raw.githubusercontent.com/denialromeo/4462-chess-problems/master/chess-puzzle-player/problems.json). Enjoy!

### Possible Errors in Book

* Problem 1071 seems to be a mate-in-one problem (Nc7). I've added a black knight so it's mate-in-two.
* Problem 1827 seems to be a mate-in-three problem. I've added a pawn so it's mate-in-two.
* Problem 2300 seems to be a mate-in-three problem. I've moved a knight so it's mate-in-two.
* Problem 2600 seems to be a mate-in-three problem. I've added a white knight so it's mate-in-two.
* Problem 2616 seems to be a mate-in-three problem. I've moved a white rook so it's mate-in-two.
* Problem 2618 seems to be a mate-in-three problem. I've removed the black knight and shifted some pieces one square to the left so it's mate-in-two.
* Problem 2645 seems to be a mate-in-three problem. I've replaced the black queen with a pawn so it's mate-in-two.
* Problem 3578 seems to be a mate-in-three problem. I've removed the black queen so it's mate-in-two.
* Problem 3997 seems to be a mate-in-one problem (b3). I've moved the white knight and a black knight, removed the black queen, and added a black pawn so it's mate-in-three.
* Problem 4423 seems to miss an escape route for the white king. I've added a black knight so it's mate in three.
* Problem 4362 seems to be a mate-in-two problem. I've moved a black knight so it's mate in three.

### Acknowledgments

Special thanks to Chris Oakman for his exquisitely documented 2013 [chessboard.js](https://github.com/oakmac/chessboardjs/#readme) and to Jeff Hlywa for [chess.js](https://github.com/jhlywa/chess.js#readme).

Special thanks as well to Christian Kuhn, from whose website I procured polgar.pgn (http://www.qno.de/schach/polgar.zip).

And finally, much thanks to the authors of [Stockfish](https://github.com/official-stockfish/Stockfish#readme) and [python-chess](https://python-chess.readthedocs.io/en/latest/index.html); without these, this project would have taken years.