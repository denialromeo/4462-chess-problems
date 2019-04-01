@echo { "problems": > problems.json
@node -e "const{printSolved}=require('../chess-puzzle-recorder/database.js');printSolved();" >> problems.json
@echo } >> problems.json
