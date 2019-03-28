import csv
import sqlite3

INFILE = "solved"

if __name__ == '__main__':
    conn = sqlite3.connect("p.db")
    c = conn.cursor()
    with open(INFILE) as csvfile:
        for row in csv.reader(csvfile, delimiter="|"):
            row[0] = int(row[0])
            c.execute('INSERT INTO problems VALUES(?, ?, ?, ?, ?)', row)
    conn.commit()