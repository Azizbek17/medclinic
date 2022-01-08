import React from 'react'
import './GeneralButton.scss'

const GeneralButton = ({
  title,
  bgColor,
  disabled,
  className,
  textColor,
  onClick,
  ...props
}) => {
  let classNames = ['general-btn']
  disabled && classNames.push('general-btn__disabled')
  className && classNames.push(className)
  return (
    <button
      style={{ backgroundColor: bgColor }}
      className={classNames.join(' ')}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      <span style={{ color: textColor }} className="general-btn__text">
        {title}
      </span>
    </button>
  )
}

export default GeneralButton
