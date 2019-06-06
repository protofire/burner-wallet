import React from 'react';

export default ({ icon, text, amount, dollarDisplay }) => {
  return (
    <div className="sw-MainToken">
      <div className="sw-MainToken-Content">
        <div className="sw-MainToken-Image" style={{ backgroundImage: `url(${icon})`, }} />
        <div className="sw-MainToken-Amount">{(isNaN(amount) || typeof amount === "undefined") ? "Loading..." : dollarDisplay(amount)}</div>
        <div className="sw-MainToken-Name">{text}</div>
      </div>
    </div>
  )
}