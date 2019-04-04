## 3412 Chess Problems

In 1994, famed chess teacher [László Polgár](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Polg%C3%A1r) published [*Chess: 5,334 Problems, Combinations, and Games*](https://www.amazon.com/Chess-5334-Problems-Combinations-Games/dp/1579129501/ref=tmm_hrd_swatch_0). Of these, 3,412 are "checkmate in two" problems.

In a bid to improve my own game, I plan to work through these problems at a languid pace, updating a simple database file as I go along. This will also likely be of value to other chess enthusiasts.

I hope this project doesn't violate copyright. I consider it merely notes that I'm taking as I read. Please buy the book!

### Development Guide

This project has two parts - a chess puzzle recorder and a chess puzzle player.

The recorder allows you to record a problem and commit it to a database file, while the puzzle player uses the information in the database file to let the user play the puzzle.

To get going with the recorder, install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/), then open your command prompt and run -

```
git clone https://github.com/denialromeo/3412-chess-problems
cd 3412-chess-problems/chess-puzzle-recorder
npm install
npm start
```

Now you can record puzzles at [http://localhost:8000](http://localhost:8000)!

To get going with the puzzle player, run -

```
cd 3412-chess-problems/chess-puzzle-player
npm install
npm start
```

Everything here is still very much under construction. I don't recommend using it in the present state. Expect much to change.

### Possible Errors in Book

* Problem 1071 seems to be a mate-in-one problem (Nc7). I've tweaked the board here so it's mate-in-two.

### Acknowledgments

Special thanks to Chris Oakman for his sublime, exquisitely documented 2013 [chessboard.js](http://chessboardjs.com) and to Jeff Hlywa for [chess.js](https://github.com/jhlywa/chess.js).

Special thanks as well to [Christian Kuhn](http://www.qno.de/bio.html), from whose website I procured polgar.pgn, and to the elusive F.T. Horde, from whose [mateintwo](https://github.com/manyids2/mateintwo) I got 1,437 solutions and 1,975 questions. Without their work, this project would probably have been abandoned.