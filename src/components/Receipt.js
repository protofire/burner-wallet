import ModalHeader from './ModalHeader'
import React from 'react'
import { Blockie } from 'dapparatus'
import axios from 'axios'

const BockieSize = 12

export default class Receive extends React.Component {
  componentDidMount() {
    if (this.props.receipt && this.props.receipt.daiposOrderId) {
      let url =
        'https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=' +
        this.props.receipt.daiposOrderId +
        '&txHash=' +
        this.props.receipt.result.transactionHash +
        '&networkId=100'
      console.log('url:', url)
      axios.get(url).then(response => {
        console.log('Finished hitting the Ching servers:', response)
      })
    }
    console.log('CHECKING PARAMS:', this.props.receipt.params)
    if (this.props.receipt && this.props.receipt.params && this.props.receipt.params.callback) {
      console.log('Redirecting to ', this.props.receipt.params.callback, 'with data:', this.props.receipt)
      let returnObject = {
        to: this.props.receipt.to,
        from: this.props.receipt.from,
        amount: this.props.receipt.amount,
        transactionHash: this.props.receipt.result.transactionHash,
        status: this.props.receipt.result.status,
        data: this.props.receipt.result.v
      }
      console.log('returnObject', returnObject)
      setTimeout(() => {
        window.location = this.props.receipt.params.callback + '?receipt=' + encodeURI(JSON.stringify(returnObject))
      }, 2500)
    }
  }
  render() {
    let { receipt, dollarDisplay, close } = this.props
    let message = receipt.message
    let sendAmount = dollarDisplay(receipt.amount)

    return (
      <div className="sw-ModalContainer">
        <ModalHeader closeClick={close} />
        <div className="sw-ModalScrollingWrapper">
          <div className="md-Receipt-AvatarWrapper">
            <Blockie address={receipt.to} config={{ size: BockieSize }} />
          </div>
          <div className="md-Receipt-Title">Transaction Succeeded</div>
          <div className="md-Receipt-SentTo">
            <strong>Sent To:</strong> <div className="md-Receipt-SentToAddress">{receipt.to}</div>
          </div>
          <div className="md-Receipt-Amount">
            <strong>Amount:</strong> {sendAmount}
          </div>
          {message ? (
            <div className="md-Receipt-Message">
              <strong>Message:</strong> {message}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
