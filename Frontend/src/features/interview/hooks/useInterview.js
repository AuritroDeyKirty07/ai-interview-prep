import {getAllInterviewReports, getInterviewReportById, generateInterviewReport} from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"


export const useInterview= ()=>{

    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context
}