import React from 'react'
import i18n from '../i18n'

export default ({ changeView }) => {
  return (
    <button
      className="ft-BtnFooter"
      onClick={() => {
        changeView('request_funds')
      }}
    >
      <i className="fas fa-hand-holding-usd"></i> {i18n.t('more_buttons.request')}
    </button>
  )
}
