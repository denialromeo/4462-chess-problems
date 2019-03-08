@echo { "moves": > problems.json
@node -e "const{printAllData}=require('./database.js');printAllData();" >> problems.json
@echo } >> problems.json
@node simplify-json > ..\chess-puzzle-player\problems.json
@del problems.json