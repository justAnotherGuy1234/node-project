export type createSubmissionDto = {
    problemId : number,
    code : string,
    language : "CPP" | "PYTHON"
    status? : "PENDING" | "RUNNING" | "ACCEPTED" | "WRONG_ANSWER"
}

export type updateSubmissionDto = {
    submissionId : number,
    status : "PENDING" | "ACCEPTED" | "RUNNING" | "WRONG_ANSWER"
}