import React from 'react'
import { FidgetSpinner } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <FidgetSpinner
        visible={true}
        height="150"
        width="150"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  )
}

export default Loader