import ModalHeader from './ModalHeader'
import React from 'react'
import i18n from '../i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { chevronIcon } from './ChevronIcon'
import { copyIcon } from './CopyIcon'

const QRCode = require('qrcode.react')
const addIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <path d="M18.915 8.605H11.4v-7.52A1.349 1.349 0 0 0 10-.001a1.349 1.349 0 0 0-1.4 1.086v7.52H1.085A1.349 1.349 0 0 0 0 9.999a1.349 1.349 0 0 0 1.085 1.4H8.6v7.519a1.349 1.349 0 0 0 1.4 1.081 1.349 1.349 0 0 0 1.4-1.085v-7.515h7.519A1.349 1.349 0 0 0 20 9.999a1.349 1.349 0 0 0-1.085-1.394z" />
    </svg>
  )
}

export default class Advanced extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      privateKeyQr: false,
      showImportAccount: false,
      showingQr: false
    }
  }
  render() {
    const { isVendor, privateKey, changeAlert, changeView, close, setPossibleNewPrivateKey } = this.props
    let url = window.location.protocol + '//' + window.location.hostname

    if (window.location.port && window.location.port !== 80 && window.location.port !== 443) {
      url = url + ':' + window.location.port
    }
    const qrSize = Math.min(document.documentElement.clientWidth, 512) - 90
    const qrValue = url + '/#' + privateKey
    let privateKeyQrDisplay = ''

    if (this.state.privateKeyQr) {
      privateKeyQrDisplay = <QRCode value={qrValue} size={qrSize} />
    }

    const toggleImportAccount = () => {
      this.setState({ showImportAccount: !this.state.showImportAccount })
    }

    const inputPrivateKeyRow = (
      <div className="sw-TextField">
        <input
          autoCapitalize="none"
          autoCorrect="off"
          className="sw-TextField-Text"
          onChange={event => this.setState({ newPrivateKey: event.target.value })}
          placeholder={i18n.t('pk')}
          type="text"
          value={this.state.newPrivateKey}
        />
        <div
          className="sw-TextField-Icon"
          onClick={() => {
            if (
              this.state &&
              this.state.newPrivateKey &&
              this.state.newPrivateKey.length >= 64 &&
              this.state.newPrivateKey.length <= 66
            ) {
              changeView('main')

              let possibleNewPrivateKey = this.state.newPrivateKey
              if (possibleNewPrivateKey.indexOf('0x') !== 0) {
                possibleNewPrivateKey = '0x' + possibleNewPrivateKey
              }
              setPossibleNewPrivateKey(possibleNewPrivateKey)
            } else {
              changeAlert({ type: 'warning', message: i18n.t('pk_invalid') })
            }
          }}
          disabled={
            !(
              this.state &&
              this.state.newPrivateKey &&
              this.state.newPrivateKey.length >= 64 &&
              this.state.newPrivateKey.length <= 66
            )
          }
        >
          {addIcon()}
        </div>
      </div>
    )

    const inputSeedRow = (
      <div className="sw-TextField">
        <input
          autoCapitalize="none"
          autoCorrect="off"
          className="sw-TextField-Text"
          onChange={event => this.setState({ newSeedPhrase: event.target.value })}
          placeholder={i18n.t('seed_phrase')}
          type="text"
          value={this.state.newSeedPhrase}
        />
        <div
          className="sw-TextField-Icon"
          onClick={() => {
            if (!this.state.newSeedPhrase) {
              changeAlert({ type: 'warning', message: i18n.t('seed_phrase_error') })
            } else {
              import('ethereum-mnemonic-privatekey-utils').then(pkutils => {
                const newPrivateKey = pkutils.getPrivateKeyFromMnemonic(this.state.newSeedPhrase)
                changeView('main')
                setPossibleNewPrivateKey('0x' + newPrivateKey)
              })
            }
          }}
          disabled={!this.state.newSeedPhrase}
        >
          {addIcon()}
        </div>
      </div>
    )

    return (
      <div className="sw-ModalContainer">
        <ModalHeader closeClick={close} title={i18n.t('advance')} />
        <div className="sw-ModalScrollingWrapper">
          <div className="sw-List">
            {privateKey && !isVendor && (
              <React.Fragment>
                <div
                  className="sw-List-Item"
                  onClick={() => {
                    this.setState({ privateKeyQr: !this.state.privateKeyQr })
                  }}
                >
                  <span className="sw-List-Text">{i18n.t('pk')}</span>
                  <span className="sw-List-ItemChevron">{chevronIcon()}</span>
                </div>
                {this.state.privateKeyQr ? (
                  <CopyToClipboard text={privateKey}>
                    <div onClick={() => changeAlert({ type: 'success', message: i18n.t('pk_copied') })}>
                      <div className="ad-Advanced-QR">{privateKeyQrDisplay}</div>
                      <div className="ad-Advanced-Address">
                        <span className="ad-Advanced-AddressText">{i18n.t('copy_pk')}</span>
                        <span className="ad-Advanced-AddressCopy">{copyIcon()}</span>
                      </div>
                    </div>
                  </CopyToClipboard>
                ) : null}
              </React.Fragment>
            )}
            {privateKey && (
              <div
                className="sw-List-Item"
                onClick={() => {
                  changeView('burn-wallet')
                }}
              >
                <span className="sw-List-Text sw-List-Text-danger">{i18n.t('b_wallet')}</span>
                <span className="sw-List-ItemChevron">{chevronIcon()}</span>
              </div>
            )}

            <div
              className="sw-List-Item"
              onClick={() => {
                toggleImportAccount()
              }}
            >
              <span className="sw-List-Text">{i18n.t('import_account')}</span>
              <span className="sw-List-ItemChevron">{chevronIcon()}</span>
            </div>
            {this.state.showImportAccount ? (
              <div className="sw-FormWrapper ad-FormImportAccount">
                {inputPrivateKeyRow}
                {inputSeedRow}
              </div>
            ) : null}
            <a
              className="sw-List-Item"
              href="https://github.com/protofire/burner-wallet/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sw-List-Text">{i18n.t('source_code')}</span>
              <span className="sw-List-ItemChevron">{chevronIcon()}</span>
            </a>
            <a className="sw-List-Item" href="http://protofire.io/" rel="noopener noreferrer" target="_blank">
              <span className="sw-List-Text">{i18n.t('about')}</span>
              <span className="sw-List-ItemChevron">{chevronIcon()}</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
