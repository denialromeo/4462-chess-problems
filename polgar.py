from chess.pgn import read_game

def d():
  f = open("polgar.pgn")
  g = read_game(f)
  for i in range(2000):
    g = read_game(f)
    print(g.headers["Event"].split()[0][1:], g.mainline_moves())

d()
