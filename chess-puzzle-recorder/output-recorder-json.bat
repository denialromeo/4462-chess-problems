@echo { "unsolved": > unsolved.json
@node -e "const{printUnsolved}=require('./database.js');printUnsolved();" >> unsolved.json
@echo } >> unsolved.json
