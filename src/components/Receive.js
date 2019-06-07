import ModalHeader from './ModalHeader'
import React from 'react'
import i18n from '../i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const QRCode = require('qrcode.react')
const copyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14.413" height="18" viewBox="0 0 14.413 18">
      <g dataName="Group 6">
        <path
          d="M9.791 3.148H1.423A1.424 1.424 0 0 0 0 4.571v12.006A1.424 1.424 0 0 0 1.423 18h8.368a1.424 1.424 0 0 0 1.423-1.423V4.571a1.428 1.428 0 0 0-1.423-1.423zm.424 13.425a.428.428 0 0 1-.428.428H1.419a.428.428 0 0 1-.428-.428v-12a.428.428 0 0 1 .428-.428h8.368a.428.428 0 0 1 .428.428z"
          dataName="Path 25"
        />
        <path
          d="M12.991 0H4.623A1.424 1.424 0 0 0 3.2 1.423a.5.5 0 0 0 1 0A.428.428 0 0 1 4.623 1h8.368a.428.428 0 0 1 .428.428v12.001a.428.428 0 0 1-.428.428.5.5 0 1 0 0 1 1.424 1.424 0 0 0 1.423-1.423V1.423A1.424 1.424 0 0 0 12.991 0z"
          dataName="Path 26"
        />
      </g>
    </svg>
  )
}

export default class Receive extends React.Component {
  render() {
    let { address, changeAlert, close } = this.props
    const qrSize = Math.min(document.documentElement.clientWidth, 512) - 90
    const qrValue = address

    return (
      <div className="sw-ModalContainer">
        <ModalHeader closeClick={close} />
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
              View on Blockscout
            </a>
          </div>
        </div>
      </div>
    )
  }
}
