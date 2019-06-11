import React from 'react'
import { Blockie } from 'dapparatus'
import burnerloader from '../assets/img/burnerloader.gif'

const QRIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26.563" height="26.514" viewBox="0 0 26.563 26.514">
      <path d="M0 12.266h12.265V0H0zM1.909 1.909h8.445v8.445H1.909z" dataName="Path 4" />
      <path d="M3.933 3.933h4.4v4.4h-4.4z" dataName="Path 5" />
      <path d="M26.562 0H14.297v12.266h12.265zm-1.909 10.357h-8.448V1.909h8.445v8.448z" dataName="Path 6" />
      <path d="M18.23 3.933h4.4v4.4h-4.4z" dataName="Path 7" />
      <path d="M0 26.514h12.265V14.249H0zm1.909-10.353h8.445v8.445H1.909z" dataName="Path 8" />
      <path d="M3.933 18.185h4.4v4.4h-4.4z" dataName="Path 9" />
      <path
        d="M19.13 20.979v-2.133h2.133v-2.189H19.13v-2.132h-2.189v2.133h-2.132v2.189h2.133v2.133z"
        dataName="Path 10"
      />
      <path
        d="M25.86 21.252h-2.133v-2.133h-2.189v2.133h-2.132v2.189h2.133v2.133h2.189v-2.133h2.133z"
        dataName="Path 11"
      />
      <path d="M26.406 19.634v-4.811h-.164v-.571h-4.815v2.189h2.79v3.2h2.189z" dataName="Path 12" />
      <path d="M16.643 21.031h-2.189v4.814h4.979v-2.189h-2.79z" dataName="Path 13" />
    </svg>
  )
}

export default ({ openScanner, total, ens, address, changeView }) => {
  let name = ens
  if (!name) {
    name = address.substring(2, 8)
  }

  let blockieDisplay
  let isLoading = typeof total === 'undefined' || Number.isNaN(total)
  if (isLoading) {
    blockieDisplay = <img src={burnerloader} alt="" />
  } else {
    blockieDisplay = <Blockie address={address} config={{ size: 4 }}></Blockie>
  }

  let topLeft = (
    <div className="hdr-UserInfoTop" onClick={() => changeView('receive')}>
      <div className="hdr-UserInfoTop-Avatar">{blockieDisplay}</div>
      <div className="hdr-UserInfoTop-Name">{isLoading ? 'Loading...' : name}</div>
    </div>
  )

  let bottomRight = (
    <div
      className="sw-ButtonScan"
      onClick={() => {
        openScanner({ view: 'send_to_address' })
      }}
    >
      {QRIcon()}
    </div>
  )

  return (
    <React.Fragment>
      {topLeft}
      {bottomRight}
    </React.Fragment>
  )
}
