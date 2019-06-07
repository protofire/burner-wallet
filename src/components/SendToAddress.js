import ModalHeader from './ModalHeader'
import React from 'react'
import cookie from 'react-cookies'
import i18n from '../i18n'

const queryString = require('query-string')
const qrIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24.044" height="24" viewBox="0 0 24.044 24">
      <path d="M0 11.1h11.1V0H0zm1.728-9.375h7.644v7.644H1.728z" dataName="Path 4" />
      <path d="M3.56 3.56h3.982v3.983H3.56z" dataName="Path 5" />
      <path d="M24.041 0h-11.1v11.1h11.1zm-1.728 9.375h-7.647V1.728h7.644v7.647z" dataName="Path 6" />
      <path d="M16.501 3.56h3.983v3.983h-3.983z" dataName="Path 7" />
      <path d="M0 23.998h11.1v-11.1H0zm1.728-9.372h7.644v7.644H1.728z" dataName="Path 8" />
      <path d="M3.56 16.461h3.982v3.983H3.56z" dataName="Path 9" />
      <path d="M17.317 18.99v-1.93h1.93v-1.982h-1.93v-1.93h-1.982v1.93h-1.93v1.981h1.93v1.93z" dataName="Path 10" />
      <path d="M23.408 19.236h-1.93v-1.93h-1.981v1.93h-1.931v1.981h1.93v1.93h1.981v-1.93h1.93z" dataName="Path 11" />
      <path d="M23.902 17.773v-4.354h-.149v-.518h-4.358v1.981h2.525v2.894h1.981z" dataName="Path 12" />
      <path d="M15.064 19.037h-1.981v4.358h4.506v-1.981h-2.525z" dataName="Path 13" />
    </svg>
  )
}

export default class SendToAddress extends React.Component {
  constructor(props) {
    super(props)

    let startAmount = props.amount

    if (props.scannerState) startAmount = props.scannerState.amount
    if (!startAmount) {
      startAmount = cookie.load('sendToStartAmount')
    } else {
      cookie.save('sendToStartAmount', startAmount, { path: '/', maxAge: 60 })
    }
    let startMessage = props.message
    if (props.scannerState) startMessage = props.scannerState.message
    if (!startMessage) {
      startMessage = cookie.load('sendToStartMessage')
    } else {
      cookie.save('sendToStartMessage', startMessage, { path: '/', maxAge: 60 })
    }

    let extraMessage = props.extraMessage
    if (props.scannerState) extraMessage = props.scannerState.extraMessage

    let toAddress = ''
    if (props.scannerState) toAddress = props.scannerState.toAddress
    if (!toAddress) {
      toAddress = cookie.load('sendToAddress')
    } else {
      cookie.save('sendToAddress', toAddress, { path: '/', maxAge: 60 })
    }

    let initialState = {
      amount: startAmount,
      message: startMessage,
      toAddress: toAddress,
      extraMessage: extraMessage,
      fromEns: '',
      canSend: false
    }

    if (window.location.pathname) {
      if (window.location.pathname.length === 43) {
        initialState.toAddress = window.location.pathname.substring(1)
      } else if (window.location.pathname.length > 40) {
        initialState = Object.assign(initialState, this.props.parseAndCleanPath(window.location.pathname))
      }
    }

    const parsed = queryString.parse(window.location.search)
    if (parsed) {
      initialState.params = parsed
    }

    this.state = initialState
    window.history.pushState({}, '', '/')
  }

  updateState = async (key, value) => {
    if (key === 'amount') {
      cookie.save('sendToStartAmount', value, { path: '/', maxAge: 60 })
    } else if (key === 'message') {
      cookie.save('sendToStartMessage', value, { path: '/', maxAge: 60 })
    } else if (key === 'toAddress') {
      cookie.save('sendToAddress', value, { path: '/', maxAge: 60 })
    }
    this.setState({ [key]: value }, () => {
      this.setState({ canSend: this.canSend() }, () => {
        if (key !== 'message') {
          this.bounceToAmountIfReady()
        }
      })
    })
    if (key === 'toAddress') {
      this.setState({ fromEns: '' })
    }
    if (key === 'toAddress' && value.indexOf('.eth') >= 0) {
      let addr = await this.props.ensLookup(value)

      if (addr !== '0x0000000000000000000000000000000000000000') {
        this.setState({ toAddress: addr, fromEns: value }, () => {
          if (key !== 'message') {
            this.bounceToAmountIfReady()
          }
        })
      }
    }
  }

  bounceToAmountIfReady() {
    if (this.state.toAddress && this.state.toAddress.length === 42) {
      this.amountInput.focus()
    }
  }

  componentDidMount() {
    this.addressInput.blur()
    this.setState({ canSend: this.canSend() })
  }

  canSend() {
    return this.state.toAddress && this.state.toAddress.length === 42 && (this.state.amount > 0 || this.state.message)
  }

  send = async () => {
    let { toAddress, amount } = this.state
    let { ERC20TOKEN, dollarDisplay, convertToDollar } = this.props

    amount = convertToDollar(amount)

    if (this.state.canSend) {
      if (ERC20TOKEN) {
        console.log('this is a token')
      } else {
        console.log('this is not a token')
      }
      console.log(
        'ERC20TOKEN',
        ERC20TOKEN,
        'this.props.balance',
        parseFloat(this.props.balance),
        'amount',
        parseFloat(amount)
      )

      if (!ERC20TOKEN && parseFloat(this.props.balance) <= 0) {
        this.props.changeAlert({ type: 'warning', message: 'No Funds.' })
      } else if (!ERC20TOKEN && parseFloat(this.props.balance) - 0.0001 <= parseFloat(amount)) {
        let extraHint = ''
        if (!ERC20TOKEN && parseFloat(amount) - parseFloat(this.props.balance) <= 0.01) {
          extraHint = '(gas costs)'
        }
        this.props.changeAlert({
          type: 'warning',
          message:
            'Not enough funds: ' +
            dollarDisplay(Math.floor((parseFloat(this.props.balance) - 0.0001) * 100) / 100) +
            ' ' +
            extraHint
        })
      } else if (ERC20TOKEN && parseFloat(this.props.balance) < parseFloat(amount)) {
        this.props.changeAlert({ type: 'warning', message: 'Not enough tokens: $' + parseFloat(this.props.balance) })
      } else {
        this.props.changeView('loader')
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 60)

        let txData
        if (this.state.message) {
          txData = this.props.web3.utils.utf8ToHex(this.state.message)
        }

        let value = 0
        if (amount) {
          value = amount
        }

        cookie.remove('sendToStartAmount', { path: '/' })
        cookie.remove('sendToStartMessage', { path: '/' })
        cookie.remove('sendToAddress', { path: '/' })

        this.props.send(toAddress, value, 120000, txData, result => {
          if (result && result.transactionHash) {
            this.props.goBack()
            window.history.pushState({}, '', '/')

            let receiptObj = {
              to: toAddress,
              from: result.from,
              amount: parseFloat(amount),
              message: this.state.message,
              result: result
            }

            if (this.state.params) {
              receiptObj.params = this.state.params
            }

            if (this.props.scannerState && this.props.scannerState.daiposOrderId) {
              receiptObj.daiposOrderId = this.props.scannerState.daiposOrderId
            }

            this.props.setReceipt(receiptObj)
            this.props.changeView('receipt')
          }
        })
      }
    } else {
      this.props.changeAlert({ type: 'warning', message: i18n.t('send_to_address.error') })
    }
  }

  render() {
    let { canSend, toAddress, amount, message } = this.state
    let { close, defaultBalanceDisplay } = this.props

    let amountInputDisplay = (
      <input
        className="sw-TextField-Text"
        placeholder={i18n.t('send_to_address.send_amount')}
        type="number"
        value={amount}
        ref={input => {
          this.amountInput = input
        }}
        onChange={event => this.updateState('amount', event.target.value)}
      />
    )

    if (this.props.scannerState && this.props.scannerState.daiposOrderId) {
      amountInputDisplay = (
        <input
          className="sw-TextField-Text"
          placeholder={i18n.t('send_to_address.send_amount')}
          readOnly
          type="number"
          value={amount}
          ref={input => {
            this.amountInput = input
          }}
          onChange={event => this.updateState('amount', event.target.value)}
        />
      )
    }

    return (
      <div className="sw-ModalContainer">
        <ModalHeader closeClick={close} actionText="Send" actionClick={this.send} actionEnabled={canSend} />
        <div className="sw-ModalScrollingWrapper">
          <div className="md-Send-MainToken">{defaultBalanceDisplay}</div>
          <div className="sw-FormWrapper">
            <div className="sw-TextField">
              <input
                className="sw-TextField-Text"
                placeholder={i18n.t('send_to_address.to_address')}
                type="text"
                value={toAddress}
                ref={input => {
                  this.addressInput = input
                }}
                onChange={event => this.updateState('toAddress', event.target.value)}
              />
              <div
                className="sw-TextField-Icon"
                onClick={() => {
                  this.props.openScanner({ view: 'send_to_address' })
                }}
              >
                {qrIcon()}
              </div>
            </div>
            <div className="sw-TextField">{amountInputDisplay}</div>
            <div className="sw-TextField">
              <input
                className="sw-TextField-Text"
                placeholder="Message"
                type="text"
                value={message}
                ref={input => {
                  this.messageInput = input
                }}
                onChange={event => this.updateState('message', event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
