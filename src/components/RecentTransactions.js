import React from 'react'
import { Blockie } from 'dapparatus'

export default ({ dollarDisplay, max, ERC20TOKEN, address, recentTxs, block, changeView }) => {
  let txns = []
  let count = 0

  max = !max ? 9999 : max

  if (recentTxs) {
    txns = recentTxs.map((item, index) => {
      let thisValue = parseFloat(item.value)

      if (thisValue > 0.0) {
        let dollarView

        if (ERC20TOKEN) {
          if (item.token) {
            dollarView = (
              <span>
                <span>-</span>
                {dollarDisplay(item.value)}
                <span>-></span>
              </span>
            )
          } else {
            dollarView = dollarDisplay(item.value)
          }
        } else {
          dollarView = (
            <span>
              <span>-</span>
              {dollarDisplay(item.value)}
              <span>-></span>
            </span>
          )
        }

        let toBlockie = <Blockie address={item.to} config={{ size: 4 }} />

        if (item.to === address && item.data) {
          let message = item.data
          let limit = 18

          if (message.length > limit) {
            message = message.substring(0, limit - 3) + '...'
          }

          toBlockie = <span style={{ fontSize: 14 }}>{message}</span>
        }

        if (count++ < max) {
          let blockAge = block - item.blockNumber

          return (
            <div
              className="sw-TransactionsList-Item"
              key={item.hash}
              onClick={() => {
                if (item.from === address) {
                  changeView('account_' + item.to)
                } else {
                  changeView('account_' + item.from)
                }
              }}
            >
              <div className="sw-TransactionsList-ItemAvatar">
                <Blockie address={item.to === address ? item.from : item.to} config={{ size: 4 }} />
              </div>
              <div>{item.to === address ? 'He has sent money to me' : 'I have sent money to you'}</div>
              <div>{dollarView}</div>
              <div>{cleanTime(blockAge * 5)} ago</div>
            </div>
          )
        }
      }
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
