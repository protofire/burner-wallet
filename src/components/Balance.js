import React from 'react'

const valueFormat = (amount, decimalPlaces = 2) => {
  return parseFloat(amount).toFixed(decimalPlaces)
}

export default ({ icon, text, selected, amount, decimalPlaces = 2 }) => {
  return (
    <div className={`sw-BalanceItem ${text === selected ? 'sw-BalanceItem-selected' : ''}`}>
      <div className="sw-BalanceItem-Image" style={{ backgroundImage: `url(${icon})` }} />
      <div className="sw-BalanceItem-Amount">
        {isNaN(amount) || typeof amount === 'undefined' ? '0.00' : valueFormat(amount, decimalPlaces)}
      </div>
      <div className="sw-BalanceItem-Name">{text}</div>
    </div>
  )
}
