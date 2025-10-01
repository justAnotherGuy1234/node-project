
export interface ITestCase  {
    input : string ,
    output : string
}

interface IProblem {
    problemId : number,
    title : string,
    description : string ,
    difficulty : string ,
    testCase : ITestCase[]
}


export interface IEvaluationJob {
    submissionId : number,
    problem : IProblem ,
    code : string,
    language : "PYTHON" | "CPP"
}

export interface IEvaluationResult {
    status : string
    output : string | undefined 
}