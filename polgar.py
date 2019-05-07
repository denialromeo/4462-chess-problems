import chess
import chess.engine
import sqlite3

from chess.pgn import read_game

engine = chess.engine.SimpleEngine.popen_uci("stockfish.exe")

def solve(fen):
    moves = []
    board = chess.Board(fen)
    while not board.is_game_over():
        result = engine.play(board, chess.engine.Limit(time=1.0))
        moves.append(str(result.move)[0:2] + "-" + str(result.move)[2:])
        board.push(result.move)
    return str.join(";", moves)

if __name__ == '__main__':
    conn = sqlite3.connect("problems.db")
    c = conn.cursor()
    f = open("polgar.pgn")
    g = read_game(f)
    todo = [2600]
    for i in range(4462):
        g = read_game(f)
        if (i + 1) in todo:
            info = (g.headers["Event"].split()[0][1:], g.headers["White"], g.headers["Black"], g.headers["FEN"], solve(g.headers["FEN"]))
            print(info)
            c.execute('INSERT INTO problems VALUES(?, ?, ?, ?, ?, 1)', info)
            conn.commit()
    engine.quit()