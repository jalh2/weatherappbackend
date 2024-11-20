import { ReviewContext } from "../context/ReviewContext"
import { useContext } from "react"

export const useReviewContext = () => {
  const context = useContext(ReviewContext)

  if(!context) {
    throw Error('useReviewContext must be used inside an ReviewContextProvider')
  }

  return context
}