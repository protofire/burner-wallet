import React, { Component } from 'react'
import Logo from '../assets/img/altoros-logo.png'

let interval

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: 5
    }
  }

  componentDidMount() {
    interval = setInterval(this.loadMore.bind(this), 250)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  loadMore() {
    let newPercent = this.state.percent + 3

    if (newPercent > 100) {
      newPercent = 100
    }

    this.setState({ percent: newPercent })
  }

  render() {
    return (
      <div className="sw-Loader">
        <img src={Logo} alt="" className="sw-Loader-Logo" />
        {this.props.text ? <div className="sw-Loader-Text">{this.props.text}</div> : null}
        <div
          className="sw-Loader-Progress"
          style={{
            width: this.state.percent + '%'
          }}
        ></div>
      </div>
    )
  }
}
export default App
