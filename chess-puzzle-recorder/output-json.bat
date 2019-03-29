@echo { "problems": > problems.json
@node -e "const{printAllData}=require('./database.js');printAllData();" >> problems.json
@echo } >> problems.json
@move /y problems.json ..\chess-puzzle-player\problems.json
