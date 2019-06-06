import React from 'react';
import i18next from 'i18next';

const receiveIcon = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="27.488" height="24" viewBox="0 0 27.488 24">
    <g id="give-money" fill="#666">
      <path id="Path_17" d="M252.343 73.626c-.821-.329-1.059-.528-1.059-.888 0-.288.218-.624.832-.624a2.311 2.311 0 0 1 .964.216.3.3 0 0 0 .142.036.286.286 0 0 0 .268-.183l.149-.382a.236.236 0 0 0-.127-.3 5.78 5.78 0 0 0-1-.26.052.052 0 0 1-.047-.053v-.554a.307.307 0 0 0-.31-.3h-.268a.307.307 0 0 0-.31.3v.582c0 .045-.048.064-.066.068a1.607 1.607 0 0 0-1.341 1.564c0 .951.786 1.381 1.635 1.7.678.266.955.536.955.933 0 .431-.392.732-.953.732a3.36 3.36 0 0 1-1.135-.307.3.3 0 0 0-.131-.03.29.29 0 0 0-.274.19l-.143.386a.251.251 0 0 0 .127.313 5.054 5.054 0 0 0 1.2.335c.009 0 .056.018.056.061v.58a.307.307 0 0 0 .31.3h.277a.307.307 0 0 0 .31-.3v-.61a.057.057 0 0 1 .051-.064 1.682 1.682 0 0 0 1.421-1.649c.007-.83-.454-1.366-1.533-1.792z" dataName="Path 17" transform="translate(-231.777 -66.918)" />
      <path id="Path_18" d="M183.948 23.791a7.269 7.269 0 1 0 7.268 7.269 7.269 7.269 0 0 0-7.268-7.269zm0 12.853a5.584 5.584 0 1 1 5.584-5.584 5.584 5.584 0 0 1-5.584 5.583z" dataName="Path 18" transform="translate(-163.729 -23.791)" />
      <path id="Path_19" d="M121.521 234.426a18.493 18.493 0 0 1-5.791 1.974c-1.886.3-5.435-.418-5.435-1.26 0-.319 3.112.787 4.995.284 1.444-.385 1.239-1.736.453-1.914s-5.354-1.853-7.308-1.91a33.788 33.788 0 0 0-4.292.5c-.377.061-.613.055-.636.415-.109 1.675-.325 5.1-.443 6.89 0 .038.05.546.47.188a2.178 2.178 0 0 1 1.7-.69c.935.212 9.02 1.693 10.135 1.434a28.148 28.148 0 0 0 6.978-3.879c1.341-1.291.298-2.652-.826-2.032z" dataName="Path 19" transform="translate(-95.51 -216.367)" />
      <path id="Path_20" d="M5.766 234.89l-4.236-.209a.762.762 0 0 0-.742.547l-.77 6.992a.462.462 0 0 0 .447.6h4.694a.625.625 0 0 0 .64-.571l.516-6.737a.578.578 0 0 0-.549-.622zm-2.494 7a1.171 1.171 0 1 1 1.171-1.171 1.171 1.171 0 0 1-1.171 1.175z" dataName="Path 20" transform="translate(0 -219.222)" />
    </g>
  </svg>
  )
}

const sendIcon = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="23.333" height="20" viewBox="0 0 23.333 20">
    <path fill="#666" id="send" d="M0 58.25l23.333-10L0 38.25v7.778l16.667 2.222L0 50.472z" transform="translate(0 -38.25)" />
  </svg>
  )
}

const sellIcon = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path fill="#666" id="add" d="M18.915 8.606H11.4v-7.52A1.349 1.349 0 0 0 10 0a1.349 1.349 0 0 0-1.4 1.086v7.52H1.085A1.349 1.349 0 0 0 0 10a1.349 1.349 0 0 0 1.085 1.4H8.6v7.519A1.349 1.349 0 0 0 10 20a1.349 1.349 0 0 0 1.4-1.085V11.4h7.519A1.349 1.349 0 0 0 20 10a1.349 1.349 0 0 0-1.085-1.394z" transform="translate(0 -.001)" />
  </svg>
  )
}

export default ({ ERC20TOKEN, changeView }) => {
  let sendButtons

  if (ERC20TOKEN) {
    sendButtons = (
      <div className="sw-Footer">
        <button className="ft-BtnFooter" onClick={() => changeView('receive')}>
          <span className="ft-BtnFooter-Icon">{receiveIcon()}</span>
          <span className="ft-BtnFooter-Text">{i18next.t('main_card.receive')}</span>
        </button>
        <button className="ft-BtnFooter" onClick={() => changeView('send_to_address')}>
          <span className="ft-BtnFooter-Icon">{sendIcon()}</span>
          <span className="ft-BtnFooter-Text">{i18next.t('main_card.send')}</span>
        </button>
        <button className="ft-BtnFooter" onClick={() => {
          changeView('request_funds')
        }
        }>
          <span className="ft-BtnFooter-Icon">{sellIcon()}</span>
          <span className="ft-BtnFooter-Text">{i18next.t('more_buttons.sell')}</span>
        </button>
      </div>
    )
  }

  return (sendButtons)
}
