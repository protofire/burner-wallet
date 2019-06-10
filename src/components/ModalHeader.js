import React from 'react'

const closeArrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25.604" height="18" viewBox="0 0 25.604 18">
      <path d="M8.353.271a.908.908 0 0 1 1.29 1.277L3.101 8.09h21.587a.909.909 0 0 1 .916.9.92.92 0 0 1-.916.916H3.101l6.542 6.53a.926.926 0 0 1 0 1.29.9.9 0 0 1-1.29 0L.262 9.639a.91.91 0 0 1 0-1.277z" />
    </svg>
  )
}

export default class ModalHeader extends React.Component {
  render() {
    let { closeClick, actionText = undefined, actionClick = undefined, actionEnabled, title } = this.props

    return (
      <div className="md-ModalHeader">
        <div
          className="md-ModalHeader-Close"
          onClick={() => {
            closeClick()
          }}
        >
          {closeArrow()}
        </div>
        {title ? <h2 className="md-ModalHeader-Title">{title}</h2> : null}
        {actionText ? (
          <button
            className="md-ModalHeader-Action"
            disabled={actionEnabled ? false : true}
            onClick={() => {
              actionClick()
            }}
          >
            {actionText}
          </button>
        ) : null}
      </div>
    )
  }
}
