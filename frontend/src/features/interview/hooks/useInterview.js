import {generateInterviewReport,getInterviewReportById,getAllInterviewReports} from "../services/interview.api.js"
import { useContext,useEffect } from "react"
import {InterviewContext} from "../context/interview.context.jsx"
import {  useParams } from "react-router-dom";
export const useInterview=()=>{
   
    const context =useContext(InterviewContext)
    const { interviewId } = useParams();
    useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }else{
        getReports()
    }
  }, [interviewId]);

    if(!context){
        throw new Error("useInterview must be used within an interviewProvider")
    }
    const { loading, setLoading, report, setReport,reports,setReports }= context

    const generateReport=async({selfDescription,jobDescription,resumeFile})=>{
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
            
        } catch (error) {
            console.error("generate report error",error)
            throw error
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReportById=async(interviewId)=>{
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.error("while getting report by id",error)
            throw error
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports=async()=>{
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.error("while error get all report",error)
            throw error
        }finally{
            setLoading(false)
        }
        return response?.interviewReports
    }
     return {loading,report,reports,generateReport,getReportById,getReports}
}