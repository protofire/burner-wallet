import React from 'react';

export default ({ icon, text, selected, amount, dollarDisplay }) => {
  return (
    <div className={`sw-BalanceItem ${(text === selected) ? 'sw-BalanceItem-selected' : ''}`}>
      <div className="sw-BalanceItem-Image" style={{ backgroundImage: `url(${icon})`, }} />
      <div className="sw-BalanceItem-Amount">{(isNaN(amount) || typeof amount === "undefined") ? "0.00" : dollarDisplay(amount)}</div>
      <div className="sw-BalanceItem-Name">{text}</div>
    </div>
  )
};
