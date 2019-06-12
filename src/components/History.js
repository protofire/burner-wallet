import Blockies from 'react-blockies'
import ModalHeader from './ModalHeader'
import React from 'react'
import ReceivedFrom from '../assets/img/received-from.png'
import SentTo from '../assets/img/sent-to.png'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { copyIcon } from './CopyIcon'

let interval

export default class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastHash: false,
      newChat: '',
      newChatAmount: '',
      privateKeyQr: false,
      sendingFunds: false
    }
  }

  componentDidMount() {
    interval = setInterval(() => {
      this.poll()
    }, 250)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  async poll() {
    let { transactionsByAddress, target } = this.props
    let theseTransactionsByAddress = []

    if (transactionsByAddress && transactionsByAddress[target]) {
      theseTransactionsByAddress = transactionsByAddress[target]
    }

    let lastElement = theseTransactionsByAddress[theseTransactionsByAddress.length - 1]

    if (lastElement && (!this.state.lastHash || this.state.lastHash !== lastElement.hash)) {
      this.setState({ lastHash: lastElement.hash })
    }
  }

  render() {
    const { transactionsByAddress, address, block, target, close } = this.props
    let theseTransactionsByAddress = []

    if (transactionsByAddress && transactionsByAddress[target]) {
      theseTransactionsByAddress = transactionsByAddress[target]
    }

    let txns = []
    txns = theseTransactionsByAddress.map((item, index) => {
      let messageValue = ''
      let value = parseFloat(item.value)
      const isReceivingFunds = item.to === address ? true : false

      if (value) {
        messageValue = this.props.dollarDisplay(item.value)
      }

      return (
        <div className="sw-TransactionsList-Item" key={index}>
          <div className="sw-TransactionsList-FlowDirection">
            <img src={isReceivingFunds ? ReceivedFrom : SentTo} alt="" />
          </div>
          <div className="sw-TransactionsList-ItemMainInfo">
            <div className="sw-TransactionsList-Text">
              {isReceivingFunds ? 'Received' : 'Sent'} funds:{' '}
              <span className="sw-TransactionsList-TextValue">{messageValue} • </span>
              <span className="sw-TransactionsList-TextDate">{cleanTime((block - item.blockNumber) * 5)} ago</span>
            </div>
            {item.data ? <div className="sw-TransactionsList-ItemMessage">{item.data}</div> : null}
          </div>
        </div>
      )
    })

    return (
      <div className="sw-ModalContainer">
        <ModalHeader closeClick={close} title="Transactions History" />
        <div className="sw-ModalScrollingWrapper">
          <div className="md-History-AvatarWrapper">
            <Blockies seed={target} scale={5} />
          </div>
          <CopyToClipboard text={target}>
            <div
              onClick={() => this.props.changeAlert({ type: 'success', message: target + ' copied to clipboard' })}
              className="md-History-Address"
            >
              <div className="md-History-AddressText">{target}</div>
              <span className="md-History-AddressCopy">{copyIcon()}</span>
            </div>
          </CopyToClipboard>
          <div className="sw-TransactionsList">{txns.reverse()}</div>
        </div>
      </div>
    )
  }
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
