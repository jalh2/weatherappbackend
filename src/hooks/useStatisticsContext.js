import { StatisticsContext } from "../context/StatisticsContext"
import { useContext } from "react"

export const useStatisticsContext = () => {
  const context = useContext(StatisticsContext)

  if(!context) {
    throw Error('useStatisticsContext must be used inside an StatisticsContextProvider')
  }

  return context
}