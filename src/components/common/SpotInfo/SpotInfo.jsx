import React from 'react'
import classNames from 'classnames'

if (process.browser) {
  require('./SpotInfo.scss')
}

const getIcons = (totalIcons, iconClass) => {
  const arrayOfIcons = Array(totalIcons).fill(1)
  return arrayOfIcons.map((_, index) =>
    <i key={index} className={classNames(iconClass)}></i>
  )
}

const SpotInfo = ({
  text,
  description,
  customClasses,
  totalIcons = 0,
  iconClass
}) => {
  const textToInsert = description ? `${description} ${text}` : text

  return (
    <div className={classNames('area', customClasses)}>
      {text && textToInsert}
      {!!totalIcons && getIcons(totalIcons, iconClass)}
    </div>
  )
}

export default SpotInfo
