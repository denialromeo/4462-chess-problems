## 4462 Chess Problems

In 1994, famed chess teacher [László Polgár](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Polg%C3%A1r) published [*Chess: 5,334 Problems, Combinations, and Games*](https://www.amazon.com/Chess-5334-Problems-Combinations-Games/dp/1579129501/ref=tmm_hrd_swatch_0). Of these, 4,462 are checkmate problems.

### Development Guide

If you'd like to use these problems for your own project, simply download [problems.db](/chess-puzzle-recorder/problems.db), an SQLite database file. Enjoy!

To get going, install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/), then open your command prompt and run -

```
git clone https://github.com/denialromeo/4462-chess-problems
cd 4462-chess-problems/chess-puzzle-player
npm install
npm start
```

Now open index.html in a browser to play through a problem!

### Possible Errors in Book

* Problem 1071 seems to be a mate-in-one problem (Nc7). I've tweaked the board here so it's mate-in-two.
* Problem 1827 seems to be a mate-in-three problem. I've added a pawn so it's mate-in-two.
* Problem 2300 seems to be a mate-in-three problem. I've moved a knight so it's mate-in-two.
* Problem 2600 seems to be a mate-in-three problem. I've added a white knight so it's mate-in-two.
* Problem 2616 seems to be a mate-in-three problem. I've moved a white rook so it's mate-in-two.
* Problem 2618 seems to be a mate-in-three problem. I've removed the black knight and shifted some pieces one square to the left so it's mate-in-two.
* Problem 2645 seems to be a mate-in-three problem. I've replaced the black queen with a pawn so it's mate-in-two.
* Problem 3578 seems to be a mate-in-three problem. I've removed the black queen so it's mate-in-two.
* Problem 3997 seems to be a mate-in-four problem if black plays intelligently. Let's assume black doesn't so it's mate-in-three.
* Problem 4423 seems to miss an escape route for the white king. I've added a black knight so it's mate in three.
* Problem 4362 seems to be a mate-in-two problem. I've moved a black knight so it's mate in three.

### Acknowledgments

Special thanks to Chris Oakman for his exquisitely documented 2013 [chessboard.js](https://github.com/oakmac/chessboardjs/#readme) and to Jeff Hlywa for [chess.js](https://github.com/jhlywa/chess.js#readme).

Special thanks as well to [Christian Kuhn](http://www.qno.de/bio.html), from whose website I procured polgar.pgn (http://www.qno.de/schach/polgar.zip).

And finally, special thanks to the maintainers of [Stockfish](https://github.com/official-stockfish/Stockfish#readme), without which this project would have taken years.