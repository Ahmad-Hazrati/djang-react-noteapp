import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple",
  };

const Loader = ({isLoading}) => {
  return (
    <ClipLoader
        loading={isLoading}
        cssOverride={override}
        size={350}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loader