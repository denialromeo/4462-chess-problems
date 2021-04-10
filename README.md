## 4462 Chess Problems

In 1994, famed chess teacher [László Polgár](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Polg%C3%A1r) published [*Chess: 5,334 Problems, Combinations, and Games*](https://ausee.files.wordpress.com/2016/06/23.pdf). Of these, 4,462 are checkmate problems.

If you'd like to use these problems for your own project, simply download [problems.json](https://raw.githubusercontent.com/denialromeo/4462-chess-problems/master/chess-puzzle-player/problems.json). Enjoy!

### Possible Errors in Book

* Problem 1071 seems to be a mate-in-one problem (Nc7). I've removed a black knight so it's mate-in-two.
* Problem 4423 seems to miss an escape route for the white king. I've added a black knight so it's mate in three.
* Problem 4362 seems to be a mate-in-two problem. I've moved a black knight so it's mate in three.

### Acknowledgments

Special thanks to Chris Oakman for his exquisitely documented 2013 [chessboard.js](https://github.com/oakmac/chessboardjs/#readme) and to Jeff Hlywa for [chess.js](https://github.com/jhlywa/chess.js#readme).

Special thanks as well to Christian Kuhn, from whose website I procured polgar.pgn (http://www.qno.de/schach/polgar.zip).

And finally, much thanks to the authors of [Stockfish](https://github.com/official-stockfish/Stockfish#readme) and [python-chess](https://python-chess.readthedocs.io/en/latest/index.html).
