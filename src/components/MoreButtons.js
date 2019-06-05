import React from 'react';
import { Scaler } from "dapparatus";
import i18n from '../i18n';

export default ({ isVendor, buttonStyle, ERC20TOKEN, address, balance, changeAlert, changeView, dollarDisplay, subBalanceDisplay }) => {

  let exchangeButton

  // if (!isVendor) {
  //   exchangeButton = (
  //     <button className="btn btn-large w-100" style={buttonStyle.secondary} onClick={() => {
  //       changeView('exchange')
  //     }
  //     }>
  //       <Scaler config={{ startZoomAt: 400, origin: "50% 50%" }}>
  //         <i className="fa fa-random"></i> {i18n.t('more_buttons.exchange')}
  //       </Scaler>
  //     </button>
  //   )
  // } else {
  //   exchangeButton = (
  //     <button className="btn btn-large w-100" style={buttonStyle.secondary} onClick={() => {
  //       changeView('cash_out')
  //     }
  //     }>
  //       <Scaler config={{ startZoomAt: 400, origin: "50% 50%" }}>
  //         <i className="fa fa-credit-card"></i> {"Cash Out"}
  //       </Scaler>
  //     </button>
  //   )
  // }

  return (
    <button className="ft-BtnFooter" onClick={() => {
      changeView('request_funds')
    }
    }>
        <i className="fas fa-hand-holding-usd"></i> {i18n.t('more_buttons.request')}
    </button>
  )
}
