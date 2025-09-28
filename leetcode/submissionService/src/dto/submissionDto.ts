export type createSubmissionDto = {
    problemId : number,
    code : string,
    language : "CPP" | "PYTHON"
    status? : "PENDING" | "RUNNING" | "ACCEPTED" | "WRONG_ANSWER"
}
