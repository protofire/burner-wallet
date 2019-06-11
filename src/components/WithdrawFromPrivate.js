import ModalHeader from './ModalHeader'
import React from 'react'
import Web3 from 'web3'
import axios from 'axios'
import i18n from '../i18n'
import { Blockie } from 'dapparatus'

let pollInterval
let metaReceiptTracker = {}

export default class SendToAddress extends React.Component {
  constructor(props) {
    super(props)
    let initialState = {
      amount: '',
      privateKey: props.privateKey,
      canWithdraw: false,
      fromBadges: []
    }

    let tempweb3 = new Web3()
    initialState.metaAccount = tempweb3.eth.accounts.privateKeyToAccount(props.privateKey)
    initialState.fromAddress = initialState.metaAccount.address.toLowerCase()

    this.state = initialState
    console.log('WithdrawFromPrivate constructor', this.state)
  }

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.setState({ canWithdraw: this.canWithdraw() })
    })
  }

  componentDidMount() {
    this.setState({ canWithdraw: this.canWithdraw() })
    pollInterval = setInterval(this.poll.bind(this), 1500)
    setTimeout(this.poll.bind(this), 250)
  }
  componentWillUnmount() {
    clearInterval(pollInterval)
  }

  async poll() {
    let fromBalance
    if (this.props.ERC20TOKEN) {
      fromBalance = await this.props.contracts[this.props.ERC20TOKEN].balanceOf('' + this.state.fromAddress).call()
    } else {
      fromBalance = await this.props.web3.eth.getBalance('' + this.state.fromAddress)
    }

    fromBalance = parseFloat(this.props.web3.utils.fromWei(fromBalance, 'ether'))
    fromBalance = fromBalance.toFixed(2)
    console.log('from balance:', fromBalance, 'of from address', this.state.fromAddress)

    if (typeof this.state.amount === 'undefined') {
      this.setState({ fromBalance, canWithdraw: this.canWithdraw(), amount: fromBalance })
    } else {
      this.setState({ fromBalance, canWithdraw: this.canWithdraw() })
    }
  }

  canWithdraw() {
    console.log('Checking can withdraw', this.state.badgeCount)
    console.log('is greater', parseFloat(this.state.badgeCount) > 0)
    return (
      (parseFloat(this.state.amount) > 0 && parseFloat(this.state.amount) <= parseFloat(this.state.fromBalance))
    )
  }

  withdraw = () => {
    let { fromAddress, amount, metaAccount } = this.state

    if (this.state.canWithdraw) {
      console.log('SWITCH TO LOADER VIEW...')
      this.props.changeView('loader')
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 60)

      let tx
      if (amount > 0) {
        if (this.props.ERC20TOKEN) {
          tx = {
            to: this.props.contracts[this.props.ERC20TOKEN]._address,
            data: this.props.contracts[this.props.ERC20TOKEN]
              .transfer(this.props.address, this.props.web3.utils.toWei('' + amount, 'ether'))
              .encodeABI(),
            gas: 60000,
            gasPrice: Math.round(1100000000) //1.1gwei
          }
        } else {
          tx = {
            to: this.props.address,
            value: this.props.web3.utils.toWei(amount, 'ether'),
            gas: 30000,
            gasPrice: Math.round(1100000000) //1.1gwei
          }
        }

        this.props.web3.eth.accounts.signTransaction(tx, metaAccount.privateKey).then(signed => {
          this.props.web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', receipt => {
            console.log('META RECEIPT', receipt)
            if (receipt && receipt.transactionHash && !metaReceiptTracker[receipt.transactionHash]) {
              metaReceiptTracker[receipt.transactionHash] = true
              this.props.goBack()
              window.history.pushState({}, '', '/')
              this.props.changeAlert({
                type: 'success',
                message: 'Withdrawn! ' + receipt.transactionHash
              })
            }
          })
        })
      }

      if (this.state.badgeCount) {
        for (let b in this.state.fromBadges) {
          console.log('WITHDRAW Badge ', b)

          tx = {
            to: this.props.contracts['Badges']._address,
            data: this.props.contracts['Badges']
              .transferFrom(fromAddress, this.props.address, this.state.fromBadges[b].id)
              .encodeABI(),
            gas: 240000,
            gasPrice: Math.round(1100000000) //1.1gwei
          }

          this.props.web3.eth.accounts.signTransaction(tx, metaAccount.privateKey).then(signed => {
            this.props.web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', receipt => {
              console.log('META RECEIPT', receipt)
              if (receipt && receipt.transactionHash && !metaReceiptTracker[receipt.transactionHash]) {
                metaReceiptTracker[receipt.transactionHash] = true
                this.props.goBack()
                window.history.pushState({}, '', '/')
                this.props.changeAlert({
                  type: 'success',
                  message: 'Withdrawn! ' + receipt.transactionHash
                })
              }
            })
          })
        }
      }
    } else {
      this.props.changeAlert({ type: 'warning', message: i18n.t('withdraw_from_private.error') })
    }
  }

  render() {
    const { canWithdraw, fromAddress } = this.state
    const { defaultBalanceDisplay, close } = this.props
    let products = []

    for (let p in this.props.products) {
      let prod = this.props.products[p]
      if (prod.exists) {
        if (prod.isAvailable) {
          let costInDollars = this.props.web3.utils.fromWei(prod.cost, 'ether')
          products.push(
            <div key={p} className="content bridge row">
              <div className="col-12 p-1">
                <button
                  className="btn btn-large w-100"
                  onClick={() => {
                    console.log(prod.id, prod.name, prod.cost, prod.isAvailable)
                    let currentAmount = this.state.amount
                    if (currentAmount) currentAmount += parseFloat(costInDollars)
                    else currentAmount = parseFloat(costInDollars)
                    if (currentAmount !== this.state.amount) {
                      this.setState({ amount: currentAmount })
                    }
                  }}
                  style={this.props.buttonStyle.secondary}
                >
                  {this.props.web3.utils.hexToUtf8(prod.name)} {this.props.dollarDisplay(costInDollars)}
                </button>
              </div>
            </div>
          )
        }
      }
    }

    if (products.length > 0) {
      products.push(
        <div key={'reset'} className="content bridge row">
          <div className="col-12 p-1">
            <button
              className="btn btn-large w-100"
              onClick={() => {
                this.setState({ amount: '' })
              }}
              style={this.props.buttonStyle.secondary}
            >
              Reset
            </button>
          </div>
        </div>
      )
    }

    let amountWithdrawDislay =
      this.state.fromBalance > 0 ? (
        <div className="sw-FormWrapper">
          <div className="wd-Withdraw-Amount">
            <strong>Current Balance:</strong> {this.props.dollarDisplay(this.state.fromBalance)}
          </div>
          <div className="sw-TextField">
            <input
              type="number"
              className="sw-TextField-Text"
              placeholder={i18n.t('withdraw_from_private.amount')}
              value={this.state.amount}
              onChange={event => this.updateState('amount', event.target.value)}
            />
          </div>
        </div>
      ) : null

    return (
      <div className="sw-ModalContainer">
        <ModalHeader
          actionClick={this.withdraw}
          actionEnabled={canWithdraw}
          actionText={i18n.t('withdraw_from_private.withdraw')}
          closeClick={close}
        />
        <div className="sw-ModalScrollingWrapper">
          {defaultBalanceDisplay}
          <div className="md-Receipt-AvatarWrapper">
            <Blockie address={fromAddress} config={{ size: 16 }} />
          </div>
          <div className="wd-Withdraw-Address">{fromAddress}</div>
          {amountWithdrawDislay}
        </div>
      </div>
    )
  }
}
