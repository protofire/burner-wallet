import React from 'react'
import { Blockie } from 'dapparatus'
import { chevronIcon } from './ChevronIcon'
import SentTo from '../assets/img/sent-to.png'
import ReceivedFrom from '../assets/img/received-from.png'

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
              changeView('account_' + item.from)
            } else {
              changeView('account_' + item.to)
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
  ) : (
    <div className="sw-TransactionsList-Empty">
      <h2 className="sw-TransactionsList-Title">Transactions</h2>
      <div className="sw-TransactionsList-EmptyContent">
        <p>No transactions.</p>
      </div>
    </div>
  )
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
