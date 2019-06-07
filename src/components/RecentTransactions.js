import React from 'react'
import { Blockie } from 'dapparatus'
import SentTo from '../assets/img/sent-to.png'
import ReceivedFrom from '../assets/img/received-from.png'

const chevronIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10.261" height="18" viewBox="0 0 10.261 18">
      <g fill="#999" id="chevron" transform="translate(-97.139)">
        <path
          d="M107.03 9.891l-7.74 7.739a1.26 1.26 0 0 1-1.783-1.782L104.356 9l-6.848-6.848A1.261 1.261 0 0 1 99.29.369l7.74 7.74a1.26 1.26 0 0 1 0 1.782z"
          dataName="Path 15"
          id="Path_15"
        />
      </g>
    </svg>
  )
}

export default ({ dollarDisplay, address, recentTxs, block, changeView }) => {
  let txns = []

  if (recentTxs) {
    txns = recentTxs.map((item, index) => {
      const blockAge = block - item.blockNumber
      const isReceivingFunds = item.to === address ? true : false

      return (
        <div
          className="sw-TransactionsList-Item"
          key={item.hash}
          onClick={() => {
            if (isReceivingFunds) {
              changeView('account_' + item.to)
            } else {
              changeView('account_' + item.from)
            }
          }}
        >
          <div className="sw-TransactionsList-ItemAvatar">
            <Blockie address={isReceivingFunds ? item.from : item.to} config={{ size: 4 }} />
          </div>
          <div className="sw-TransactionsList-FlowDirection">
            <img src={isReceivingFunds ? ReceivedFrom : SentTo} alt="" />
          </div>
          <div className="sw-TransactionsList-Text">
            {isReceivingFunds ? 'Received' : 'Sent'} funds:{' '}
            <span className="sw-TransactionsList-TextValue">{dollarDisplay(item.value)} • </span>
            <span className="sw-TransactionsList-TextDate">{cleanTime(blockAge * 5)} ago</span>
          </div>
          <div className="sw-TransactionsList-ItemChevron">{chevronIcon()}</div>
        </div>
      )
    })
  }

  return txns.length > 0 ? (
    <div className="sw-TransactionsList">
      <h2 className="sw-TransactionsList-Title">Transactions</h2>
      {txns}
    </div>
  ) : null
}

let cleanTime = s => {
  if (s < 60) {
    return s + 's'
  } else if (s / 60 < 60) {
    return Math.round(s / 6) / 10 + 'm'
  } else {
    return Math.round(s / 60 / 6 / 24) / 10 + 'd'
  }
}
