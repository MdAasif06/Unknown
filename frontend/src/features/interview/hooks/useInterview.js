import {generateInterviewReport,getInterviewReportById,getAllInterviewReports} from "../services/interview.api.js"
import { useContext } from "react"
import {InterviewContext} from "../context/interview.context.jsx"

export const useInterview=()=>{
   
    const context =useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an interviewProvider")
    }
    const { loading, setLoading, report, setReport,reports,setReports }= context

    const generateReport=async({selfDescription,jobDescription,resumeFile})=>{
        setLoading(true)
        try {
            const response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
        } catch (error) {
            console.error("generate report error",error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const getReportById=async(interviewId)=>{
        setLoading(true)
        try {
            const response=await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.error("while getting report by id".error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const getReports=async()=>{
        setLoading(true)
        try {
            const response=await getAllInterviewReports()
            setReports(response.interviewReport)
        } catch (error) {
            console.error("while error get all report",error)
            throw error
        }finally{
            setLoading(false)
        }
    }
     return {loading,report,reports,generateReport,getReportById,getReports}
}