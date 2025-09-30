export const commands = {
    python : function(code : string){
        const runCmd = `echo '${code}' > code.py && python3 code.py`; 
        return ['/bin/bash' , '-c' , runCmd]
    },
    cpp : function(code : string){
        const runCmd = `mkdir app && cd app && echo '${code}' > code.cpp && g++ code.cpp -o run && ./run`; 
        return ['/bin/bash' , '-c' , runCmd]
    }

}