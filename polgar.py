import chess
import chess.engine
from chess.pgn import read_game

engine = chess.engine.SimpleEngine.popen_uci("stockfish.exe")

def solve(fen):
    moves = []
    board = chess.Board(fen)
    while not board.is_game_over():
        result = engine.play(board, chess.engine.Limit(time=0.100))
        moves.append(str(result.move)[0:2] + "-" + str(result.move)[2:])
        board.push(result.move)
    return str.join(";", moves)

def d():
  f = open("polgar.pgn")
  g = read_game(f)
  for i in range(310):
    g = read_game(f)
    print(g.headers["Event"].split()[0][1:], g.headers["White"], g.headers["Black"], solve(g.headers["FEN"]))

d()
engine.quit()