## 4462 Chess Problems

In 1994, famed chess teacher [László Polgár](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Polg%C3%A1r) published [*Chess*](https://www.amazon.com/Chess-5334-Problems-Combinations-Games/dp/1579129501/ref=tmm_hrd_swatch_0), a compilation of 4,462 checkmate problems.

In a bid to improve my own game, I plan to work through these problems at a languid pace, updating a simple database file as I go along. This will also likely be of value to other chess enthusiasts.

I hope this project doesn't violate copyright. I consider it merely notes that I'm taking as I read. Please buy the book!

### Development Guide

This project has two apps -- a chess puzzle recorder and a chess puzzle player.

The recorder allows you to record a problem and commit it to a database file, while the player uses the information in the database to let the user play the puzzle.

To get going with the recorder, install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/), then open your command prompt and run -

```
git clone https://github.com/denialromeo/4462-chess-problems
cd 4462-chess-problems\chess-puzzle-recorder
npm install
npm start
```

Now you can record puzzles at [http://localhost:8000](http://localhost:8000)!

Run `database2json` to transfer the database to a JSON file the player can use.

The player is still under construction.

**Acknowledgements**

Special thanks to Chris Oakman for his wonderful 2013 [chessboard.js](http://chessboardjs.com).