import ModalHeader from './ModalHeader'
import React from 'react'
import i18n from '../i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { copyIcon } from './CopyIcon'

const QRCode = require('qrcode.react')

export default class Receive extends React.Component {
  render() {
    let { address, changeAlert, close } = this.props
    const qrSize = Math.min(document.documentElement.clientWidth, 512) - 90
    const qrValue = address

    return (
      <div className="sw-ModalContainer">
        <ModalHeader closeClick={close} title={i18n.t('receive_title')} />
        <div className="sw-ModalScrollingWrapper">
          <CopyToClipboard
            text={address}
            onCopy={() => {
              changeAlert({ type: 'success', message: i18n.t('receive.address_copied') })
            }}
          >
            <div>
              <div className="md-ReceiveModal-QR">
                <QRCode value={qrValue} size={qrSize} />
              </div>
              <div className="md-ReceiveModal-Address">
                <span className="md-ReceiveModal-AddressText">{address}</span>
                <span className="md-ReceiveModal-AddressCopy">{copyIcon()}</span>
              </div>
            </div>
          </CopyToClipboard>
          <div className="md-ReceiveModal-Link">
            <a
              href={'https://blockscout.com/poa/dai/address/' + address + '/transactions'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {i18n.t('blockscout_view')}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
