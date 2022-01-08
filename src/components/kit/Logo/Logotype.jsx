import React from 'react'
import { logoUrl, logoBG } from '../../../constants.json'
const Logotype = ({ width, height, className }) => {
  return (
    <img
      src={logoUrl}
      alt="logotype"
      width={width}
      height={height}
      className={className}
      style={{
        background: logoBG ? logoBG : "transparent",
        borderRadius: "15px"
      }}
    />
  )
}

export default Logotype
