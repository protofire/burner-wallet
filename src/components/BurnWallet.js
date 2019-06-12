import React from 'react'
import i18n from '../i18n'
import ModalHeader from './ModalHeader'

export default ({ burnWallet, close, defaultBalanceDisplay }) => {
  return (
    <div className="sw-ModalContainer">
      <ModalHeader closeClick={close} actionText={i18n.t('b_wallet')} actionClick={burnWallet} />
      <div className="sw-ModalScrollingWrapper">
        <div className="md-Burn-MainToken">{defaultBalanceDisplay}</div>
        <div className="md-Burn-Text">{i18n.t('burn_wallet.burn_private_key_question')}</div>
        <div className="md-Burn-Text md-Burn-Text-danger md-Burn-Text-bold">{i18n.t('burn_wallet.disclaimer')}</div>
      </div>
    </div>
  )
}
