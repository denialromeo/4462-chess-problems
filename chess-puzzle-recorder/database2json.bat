@echo { "moves": > problems.json
@node -e "const{printAllData}=require('./database.js');printAllData();" >> problems.json
@echo } >> problems.json