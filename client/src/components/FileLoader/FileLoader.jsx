import React from 'react'
import { ProgressBar } from "react-loader-spinner"
const FileLoader = () => {
  return (
    <div className="flex  items-center justify-center">
   <ProgressBar
  height="40"
  width="40"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#2d3748'
  barColor = '#38a169'
/>
  </div>
  )
}

export default FileLoader