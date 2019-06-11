import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import i18n from '../i18n'

const QRCode = require('qrcode.react')

export default class Receive extends React.Component {
  render() {
    let { changeAlert, url } = this.props
    let qrSize = Math.min(document.documentElement.clientWidth, 512) - 90
    let qrValue = url

    return (
      <div>
        <CopyToClipboard
          text={qrValue}
          onCopy={() => {
            changeAlert({ type: 'success', message: i18n.t('share.copied') })
          }}
        >
          <div className="content qr row" style={{ cursor: 'pointer' }}>
            <QRCode value={qrValue} size={qrSize} />
            <div className="input-group">
              <input type="text" className="form-control" style={{ color: '#999999' }} value={qrValue} disabled />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i style={{ color: '#999999' }} className="fas fa-copy" />
                </span>
              </div>
            </div>
          </div>
        </CopyToClipboard>
      </div>
    )
  }
}
