import React from 'react'
import ReceivedFrom from '../assets/img/received-from.png'
import SentTo from '../assets/img/sent-to.png'
import i18n from '../i18n'
import { Blockie } from 'dapparatus'
import { chevronIcon } from './ChevronIcon'

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
            {isReceivingFunds ? i18n.t('received') : i18n.t('sent')} {i18n.t('funds')}:{' '}
            <span className="sw-TransactionsList-TextValue">{dollarDisplay(item.value)} • </span>
            <span className="sw-TransactionsList-TextDate">
              {i18n.t('hace')} {cleanTime(blockAge * 5)} {i18n.t('ago')}
            </span>
          </div>
          <div className="sw-TransactionsList-ItemChevron">{chevronIcon()}</div>
        </div>
      )
    })
  }

  return txns.length > 0 ? (
    <div className="sw-TransactionsList">
      <h2 className="sw-TransactionsList-Title">{i18n.t('transactions')}</h2>
      {txns}
    </div>
  ) : (
    <div className="sw-TransactionsList-Empty">
      <h2 className="sw-TransactionsList-Title">{i18n.t('transactions')}</h2>
      <div className="sw-TransactionsList-EmptyContent">
        <p>{i18n.t('transactions_empty')}.</p>
      </div>
    </div>
  )
}

const cleanTime = s => {
  if (s < 60) {
    return s + 's'
  } else if (s / 60 < 60) {
    return Math.round(s / 6) / 10 + 'm'
  } else {
    return Math.round(s / 60 / 6 / 24) / 10 + 'd'
  }
}
