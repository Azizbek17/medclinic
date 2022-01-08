import React from 'react'
import SimpleAlert from '../Alert/SimpleAlert'

const LoadingComponent = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <SimpleAlert severity="error" errorMessage={errorMessage} />
      )}
      <div id="preloader">
        <div className="blobs-wrapper">
          <div className="blobs left-top">
            <div className="blob secondary"></div>
            <div className="blob secondary"></div>
            <div className="blob secondary"></div>
          </div>

          <div className="blobs right-bottom">
            <div className="blob main"></div>
            <div className="blob main"></div>
            <div className="blob main"></div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default LoadingComponent
