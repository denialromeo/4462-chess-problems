## 4462 Chess Problems

In 1994, famed chess teacher [László Polgár](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Polg%C3%A1r) published [*Chess: 5,334 Problems, Combinations, and Games*](https://ausee.files.wordpress.com/2016/06/23.pdf).

Of these, 4,462 are checkmate problems. You can play through them [here](http://danielmoore.us/chess-puzzles).

If you'd like to use these problems for your own project, simply download [problems.json](https://raw.githubusercontent.com/denialromeo/4462-chess-problems/master/problems.json). Enjoy!

To run this locally, run the below and then open `index.html` in your browser.

```
npm install
npm start
```

### Possible Errors in Book

* Problem [1071](http://danielmoore.us/chess-puzzles?id=1071) seems to be mate-in-one (Nc7). I've re-labeled it from mate-in-two to mate-in-one.
* Problem [1325](http://danielmoore.us/chess-puzzles?id=1325) seems to have two light-square white bishops. This error isn't present in the 1994 edition.
* Problem [4362](http://danielmoore.us/chess-puzzles?id=4362) seems to be mate-in-two. I've re-labeled it from mate-in-three to mate-in-two.

### Acknowledgments

Special thanks to Chris Oakman for his exquisitely documented 2013 [chessboard.js](https://github.com/oakmac/chessboardjs/#readme) and to Jeff Hlywa for [chess.js](https://github.com/jhlywa/chess.js#readme).

Special thanks as well to Christian Kuhn, from whose website I procured polgar.pgn (http://www.qno.de/schach/polgar.zip).

And finally, much thanks to the authors of [Stockfish](https://github.com/official-stockfish/Stockfish#readme) and [python-chess](https://python-chess.readthedocs.io/en/latest/index.html).
