import React from 'react';
import { Blockie } from "dapparatus";

export default ({ dollarDisplay, view, max, buttonStyle, ERC20TOKEN, vendorName, address, recentTxs, block, changeView }) => {
  let txns = []
  let count = 0

  if (!max) {
    max = 9999
  }

  for (let r in recentTxs) {
    let thisValue = parseFloat(recentTxs[r].value)

    if (thisValue > 0.0) {
      let dollarView

      if (ERC20TOKEN) {
        if (recentTxs[r].token) {
          dollarView = (
            <span>
              <span>-</span>{dollarDisplay(recentTxs[r].value)}<span>-></span>
            </span>
          )
        } else {
          dollarView = dollarDisplay(recentTxs[r].value)
        }

      } else {
        dollarView = (
          <span>
            <span>-</span>{dollarDisplay(recentTxs[r].value)}<span>-></span>
          </span>
        )
      }

      let toBlockie = (
        <Blockie
          address={recentTxs[r].to}
          config={{ size: 4 }}
        />
      )

      if (recentTxs[r].to === address && recentTxs[r].data) {
        let message = recentTxs[r].data
        let limit = 18

        if (message.length > limit) {
          message = message.substring(0, limit - 3) + "..."
        }

        toBlockie = (
          <span style={{ fontSize: 14 }}>
            {message}
          </span>
        )
      }

      if (count++ < max) {
        let blockAge = block - recentTxs[r].blockNumber

        txns.push(
          <div className="sw-TransactionsList-Item" key={recentTxs[r].hash} onClick={() => {
            if (recentTxs[r].from === address) {
              changeView("account_" + recentTxs[r].to)
            } else {
              changeView("account_" + recentTxs[r].from)
            }
          }}>
            <div>
              <Blockie
                address={recentTxs[r].to === address ? recentTxs[r].from : recentTxs[r].to}
                config={{ size: 4 }}
              />
            </div>
            <div>{recentTxs[r].to === address ? 'He has sent money to me' : 'I have sent money to you'}</div>
            <div>{dollarView}</div>
            <div>{cleanTime((blockAge) * 5)} ago</div>
          </div>
        )
      }

    }
  }

  return (txns.length > 0) ? (
    <div className="sw-TransactionsList">
      <h2 className="sw-TransactionsList-Title">Transactions</h2>
      {txns}
    </div>
  ) : null

}

let cleanTime = (s) => {
  if (s < 60) {
    return s + "s"
  } else if (s / 60 < 60) {
    return Math.round(s / 6) / 10 + "m"
  } else {
    return Math.round((s / 60 / 6) / 24) / 10 + "d"
  }
}
