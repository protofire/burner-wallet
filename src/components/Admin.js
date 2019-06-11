import Blockies from 'react-blockies'
import React from 'react'
import i18next from 'i18next'
import { Scaler } from 'dapparatus'

export default class Advanced extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changingAllowed: {}
    }
  }
  render() {
    let { contracts, tx, web3, vendors } = this.props

    let vendorBlockie = ''
    if (this.state.newVendor) {
      vendorBlockie = <Blockies seed={this.state.newVendor} scale={5} />
    }

    let vendorDisplay = []
    for (let v in vendors) {
      let vendorButton = (
        <button
          disabled={!vendors[v].isActive || !vendors[v].isAllowed}
          className="btn btn-large w-100"
          onClick={() => {
            window.location = '/vendors;' + vendors[v].vendor
          }}
          style={this.props.buttonStyle.secondary}
        >
          <Scaler config={{ startZoomAt: 600, origin: '10% 50%' }}>{vendors[v].name}</Scaler>
        </button>
      )

      let vendorAllowedDisplay = ''
      if (this.state.changingAllowed[v]) {
        vendorAllowedDisplay = <i className="fas fa-cog fa-spin"></i>
      } else if (vendors[v].isAllowed) {
        vendorAllowedDisplay = <i className="fas fa-lock-open"></i>
      } else {
        vendorAllowedDisplay = <i className="fas fa-lock"></i>
      }

      let vendorIsAllowed = (
        <button
          className="btn btn-large w-100"
          onClick={() => {
            let { changingAllowed } = this.state
            changingAllowed[v] = true
            this.setState({ changingAllowed })
            tx(
              contracts[this.props.ERC20VENDOR].updateVendor(
                vendors[v].vendor,
                web3.utils.utf8ToHex(vendors[v].name),
                vendors[v].isActive,
                !vendors[v].isAllowed
              ),
              120000,
              0,
              0,
              result => {
                console.log('ACTIVE:', result)
                setTimeout(() => {
                  let { changingAllowed } = this.state
                  changingAllowed[v] = false
                  this.setState({ changingAllowed })
                }, 1500)
              }
            )
          }}
          style={this.props.buttonStyle.secondary}
        >
          <Scaler config={{ startZoomAt: 500, origin: '50% 50%' }}>{vendorAllowedDisplay}</Scaler>
        </button>
      )

      let vendorActiveDisplay = ''
      if (this.state.changingAllowed[v]) {
        vendorActiveDisplay = <i className="fas fa-cog fa-spin"></i>
      } else if (vendors[v].isActive) {
        vendorActiveDisplay = <i className="fas fa-thumbs-up"></i>
      } else {
        vendorActiveDisplay = <i className="fas fa-thumbs-down"></i>
      }

      let vendorIsActive = (
        <button
          className="btn btn-large w-100"
          onClick={() => {
            let { changingAllowed } = this.state
            changingAllowed[v] = true
            this.setState({ changingAllowed })
            tx(
              contracts[this.props.ERC20VENDOR].updateVendor(
                vendors[v].vendor,
                web3.utils.utf8ToHex(vendors[v].name),
                !vendors[v].isActive,
                vendors[v].isAllowed
              ),
              120000,
              0,
              0,
              result => {
                console.log('ACTIVE:', result)
                setTimeout(() => {
                  let { changingAllowed } = this.state
                  changingAllowed[v] = false
                  this.setState({ changingAllowed })
                }, 1500)
              }
            )
          }}
          style={this.props.buttonStyle.secondary}
        >
          <Scaler config={{ startZoomAt: 500, origin: '50% 50%' }}>{vendorActiveDisplay}</Scaler>
        </button>
      )

      vendorDisplay.push(
        <div key={v} className="content bridge row">
          <div className="col-2 p-1" style={{ textAlign: 'center' }}>
            <Blockies seed={vendors[v].vendor.toLowerCase()} scale={5} />
          </div>
          <div className="col-6 p-1" style={{ textAlign: 'center' }}>
            {vendorButton}
          </div>
          <div className="col-2 p-1" style={{ textAlign: 'center' }}>
            {vendorIsActive}
          </div>
          <div className="col-2 p-1" style={{ textAlign: 'center' }}>
            {vendorIsAllowed}
          </div>
        </div>
      )
    }

    let addVendorText = (
      <span>
        <i className="fas fa-user"></i> {i18next.t('admin.add_vendor')}
      </span>
    )
    if (this.state.addingVendor) {
      addVendorText = (
        <span>
          <i className="fas fa-cog fa-spin"></i> {i18next.t('admin.adding')}
        </span>
      )
    }

    return (
      <div className="main-card card w-100">
        {vendorDisplay}

        <div className="content bridge row">
          <div className="col-1 p-1">{vendorBlockie}</div>
          <div className="col-3 p-1">
            <input
              type="text"
              className="form-control"
              placeholder="0x..."
              value={this.state.newVendor}
              onChange={event => this.setState({ newVendor: event.target.value })}
            />
          </div>
          <div className="col-4 p-1">
            <input
              type="text"
              className="form-control"
              placeholder="Joe's Pizza"
              value={this.state.newVendorName}
              onChange={event => this.setState({ newVendorName: event.target.value })}
            />
          </div>
          <div className="col-4 p-1">
            <button
              className="btn btn-large w-100"
              style={this.props.buttonStyle.secondary}
              onClick={() => {
                this.setState({ addingVendor: true })
                tx(
                  contracts[this.props.ERC20VENDOR].addVendor(
                    this.state.newVendor,
                    web3.utils.utf8ToHex(this.state.newVendorName)
                  ),
                  480000,
                  0,
                  0,
                  result => {
                    console.log('VENDOR ADDED', result)
                    this.setState({ newVendor: '', newVendorName: '' })
                    setTimeout(() => {
                      this.setState({ addingVendor: false })
                    }, 1500)
                  }
                )
              }}
            >
              <Scaler config={{ startZoomAt: 600, origin: '20% 50%' }}>{addVendorText}</Scaler>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
