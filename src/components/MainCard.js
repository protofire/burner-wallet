import React from 'react';
import { Scaler } from "dapparatus";
import { CopyToClipboard } from "react-copy-to-clipboard";
import i18next from 'i18next';
import MoreButtons from './MoreButtons';

export default ({ buttonStyle, ERC20TOKEN, address, balance, changeAlert, changeView, dollarDisplay, subBalanceDisplay }) => {


  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  let pushDownWithWhiteSpace = 0

  let sendButtons
  // let sendButtons = (
  //   <div>
  //     <div className="content ops row">
  //       <div className="col-6 p-1" onClick={() => changeView('receive')}>
  //         <button className="btn btn-large w-100" style={buttonStyle.primary}>
  //           <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
  //             <i className="fas fa-qrcode"  /> {i18next.t('main_card.receive')}
  //           </Scaler>
  //         </button>
  //       </div>
  //       <div className="col-6 p-1">
  //         <button className="btn btn-large w-100" onClick={() => changeView('send_to_address')} style={buttonStyle.primary}>
  //           <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
  //             {/* <i className="fas fa-paper-plane"/> Send */}
  //             <i className="fas fa-paper-plane"/> {i18next.t('main_card.send')}
  //           </Scaler>
  //         </button>
  //       </div>
  //     </div>
  //     <div className="content ops row">
  //       <div className="col-6 p-1" onClick={() => changeView('share')}>
  //         <button className="btn btn-large w-100" onClick={() => changeView('share')} style={buttonStyle.secondary}>
  //           <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
  //             <i className="fas fa-share"/> {i18next.t('main_card.share')}
  //           </Scaler>
  //         </button>
  //       </div>
  //       <div className="col-6 p-1" onClick={() => changeView('send_with_link')}>
  //         <button className="btn btn-large w-100" style={buttonStyle.secondary}>
  //           <Scaler config={{startZoomAt:400,origin:"50% 50%"}}>
  //             <i className="fas fa-money-bill-alt"  /> {i18next.t('main_card.link')}
  //           </Scaler>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // )

  if (ERC20TOKEN) {
    sendButtons = (
      <div className="sw-Footer">
        <button className="ft-BtnFooter" style={buttonStyle.primary} onClick={() => changeView('receive')}>
          <i className="fas fa-qrcode" /> {i18next.t('main_card.receive')}
        </button>
        <button className="ft-BtnFooter" onClick={() => changeView('send_to_address')} style={buttonStyle.primary}>
          <i className="fas fa-paper-plane" /> {i18next.t('main_card.send')}
        </button>
        <MoreButtons />
      </div>
    )
  }

  return (sendButtons)
}
