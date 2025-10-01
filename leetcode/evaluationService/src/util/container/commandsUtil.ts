export const commands = {
    PYTHON : function(code : string , input : string ){
        const runCmd = `echo '${code}' > code.py  && echo '${input}' > input.txt && python3 code.py < input.txt`; 
        return ['/bin/bash' , '-c' , runCmd]
    },
    CPP : function(code : string , input : string ){
        const runCmd = `mkdir app && cd app && echo '${code}' > code.cpp  && echo '${input}' > input.txt && g++ code.cpp -o run && ./run < input.txt`; 
        return ['/bin/bash' , '-c' , runCmd]
    }

}