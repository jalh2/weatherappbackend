import { ReportedContext } from "../context/ReportedContext"
import { useContext } from "react"

export const useReportedContext = () => {
  const context = useContext(ReportedContext)

  if(!context) {
    throw Error('useReportedContext must be used inside an ReportedContextProvider')
  }

  return context
}