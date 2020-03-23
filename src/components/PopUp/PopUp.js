import React, {Component} from 'react'




class PopUp extends Component {


  state = { isOpen: false }


  render () {
    const url = new URL(this.props.href)
    if (url.hostname === WEBSITE_HOSTNAME) return (
      <a href={this.props.href}>{this.props.children}</a>
    )
    return (
      <>
        <button onClick={() => this.setState({ modalOpen: true })}>{this.props.children}</button>
        <Modal isOpen={this.state.isOpen}>
          <iframe src={this.props.href} />
        </Modal>
      </>
    )
  }
}


export default PopUp;