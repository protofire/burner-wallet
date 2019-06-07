import React from 'react'

export default ({ alert, changeAlert }) => {
  return (
    <div className="sw-Alert" onClick={() => changeAlert(null)}>
      <div className={`sw-Alert-Text sw-Alert-Text-${alert.type}`}>{alert.message}</div>
    </div>
  )
}
