import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import RecentTransactions from './RecentTransactions'
import i18n from '../i18n'
const QRCode = require('qrcode.react')

export default class Receive extends React.Component {
  render() {
    let {
      dollarDisplay,
      view,
      buttonStyle,
      ERC20TOKEN,
      address,
      balance,
      changeAlert,
      changeView,
      subBalanceDisplay,
      account
    } = this.props

    let qrSize = Math.min(document.documentElement.clientWidth, 512) - 90
    let qrValue = address

    return (
      <div>
        <div className="send-to-address w-100">
          <CopyToClipboard
            text={address}
            onCopy={() => {
              changeAlert({ type: 'success', message: i18n.t('receive.address_copied') })
            }}
          >
            <div className="content qr row" style={{ cursor: 'pointer' }}>
              <QRCode value={qrValue} size={qrSize} />
              <div className="input-group">
                <input type="text" className="form-control" style={{ color: '#999999' }} value={address} disabled />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i style={{ color: '#999999' }} className="fas fa-copy" />
                  </span>
                </div>
              </div>
            </div>
          </CopyToClipboard>
          <div style={{ width: '100%', textAlign: 'center', padding: 20 }}>
            <a href={'https://blockscout.com/poa/dai/address/' + address + '/transactions'} target="_blank">
              View on Blockscout
            </a>
          </div>

          <RecentTransactions
            dollarDisplay={dollarDisplay}
            view={view}
            max={5}
            buttonStyle={buttonStyle}
            ERC20TOKEN={ERC20TOKEN}
            transactionsByAddress={ERC20TOKEN ? this.props.fullTransactionsByAddress : this.props.transactionsByAddress}
            changeView={changeView}
            address={address}
            block={this.props.block}
            recentTxs={ERC20TOKEN ? this.props.fullRecentTxs : this.props.recentTxs}
          />
        </div>
        <div name="theVeryBottom" className="text-center bottom-text">
          <span>
            <span
              onClick={() => {
                this.props.goBack()
              }}
            >
              <i className="fas fa-times" /> {i18n.t('cancel')}
            </span>
          </span>
        </div>
      </div>
    )
  }
}
