import ModalHeader from './ModalHeader'
import React from 'react'
import i18n from '../i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { copyIcon } from './CopyIcon'

const QRCode = require('qrcode.react')

export default class RequestFunds extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      amount: '',
      canRequest: false,
      requested: false
    }
  }

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.setState({ canRequest: this.state.amount > 0 })
    })
  }

  request = () => {
    if (this.state.canRequest) {
      this.setState({ requested: true })
    } else {
      this.props.changeAlert({ type: 'warning', message: 'Please enter a valid amount' })
    }
  }

  render() {
    let { canRequest, message, amount, requested } = this.state
    const { dollarDisplay, close } = this.props

    let content

    if (requested) {
      let url = window.location.protocol + '//' + window.location.hostname

      if (window.location.port && window.location.port !== 80 && window.location.port !== 443) {
        url = url + ':' + window.location.port
      }

      let qrSize = Math.min(document.documentElement.clientWidth, 512) - 90
      let qrValue =
        url +
        '/' +
        this.props.address +
        ';' +
        amount +
        ';' +
        encodeURI(message)
          .replaceAll('#', '%23')
          .replaceAll(';', '%3B')
          .replaceAll(':', '%3A')
          .replaceAll('/', '%2F')

      content = (
        <CopyToClipboard
          text={qrValue}
          onCopy={() => {
            this.props.changeAlert({ type: 'success', message: 'Request link copied to clipboard' })
          }}
        >
          <div>
            <div className="md-Request-Amount">{dollarDisplay(amount)}</div>
            <div className="md-Request-Message">{message}</div>
            <div className="md-Request-QR">
              <QRCode value={qrValue} size={qrSize} />
            </div>
            <div className="md-Request-Address">
              <span className="md-Request-AddressText">{qrValue}</span>
              <span className="md-Request-AddressCopy">{copyIcon()}</span>
            </div>
          </div>
        </CopyToClipboard>
      )
    } else {
      content = (
        <div className="sw-FormWrapper md-Request-Form">
          <div className="sw-TextField">
            <input
              className="sw-TextField-Text"
              onChange={event => this.updateState('message', event.target.value)}
              placeholder={i18n.t('request_funds.item_message')}
              type="text"
              value={message}
            />
          </div>
          <div className="sw-TextField">
            <input
              className="sw-TextField-Text"
              onChange={event => this.updateState('amount', event.target.value)}
              placeholder={i18n.t('request_funds.amount')}
              type="number"
              value={amount}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="sw-ModalContainer">
        <ModalHeader
          actionClick={this.request}
          actionEnabled={canRequest}
          actionText={requested ? undefined : i18n.t('request_funds.button')}
          closeClick={close}
        />
        <div className="sw-ModalScrollingWrapper">{content}</div>
      </div>
    )
  }
}
