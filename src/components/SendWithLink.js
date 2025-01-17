import React from 'react'
import i18n from '../i18n'

export default class SendWithLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: props.amount,
      canSend: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.amountInput.focus()
    }, 250)
  }

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.setState({ canSend: this.state.amount > 0 })
    })
  }

  send = () => {
    let { amount } = this.state
    let { convertToDollar } = this.props

    if (this.state.canSend) {
      amount = convertToDollar(amount)
      console.log('CONVERTED TO DOLLAR AMOUNT', amount)
      this.props.changeView('loader')
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 60)
      this.props.sendWithLink(amount, result => {
        if (result && result.transactionHash) {
          this.props.changeView('share-link')
          this.props.changeAlert({
            type: 'success',
            message: 'Sent! ' + result.transactionHash
          })
        }
      })
    } else {
      this.props.changeAlert({ type: 'warning', message: i18n.t('send_with_link.error') })
    }
  }

  render() {
    let { canSend } = this.state
    let { dollarSymbol } = this.props
    return (
      <div>
        <div className="content row">
          <div className="form-group w-100">
            <label htmlFor="amount_input">Amount</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">{dollarSymbol}</div>
              </div>
              <input
                type="number"
                step="0.1"
                className="form-control"
                placeholder="0.00"
                ref={input => {
                  this.amountInput = input
                }}
                onChange={event => this.updateState('amount', event.target.value)}
              />
            </div>
          </div>
          <button
            style={this.props.buttonStyle.primary}
            className={`btn btn-success btn-lg w-100 ${canSend ? '' : 'disabled'}`}
            onClick={this.send}
          >
            Send
          </button>
        </div>
      </div>
    )
  }
}
