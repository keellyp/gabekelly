import React from 'react'
import ReactDOM from 'react-dom'

export default WrappedComponent => {
  class Wrapper extends React.Component {
    state = {
      visible: false,
    }

    componentDidMount() {
      this.observer = new IntersectionObserver(
        entries => this._onObserve(entries),
        this.element.config
      )

      const elementToObserve = ReactDOM.findDOMNode(this.element)
      this.observer.observe(elementToObserve)
    }

    _onObserve(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry
        if (isIntersecting) {
          this.setState({ visible: true })
          this.observer.disconnect()
        }
      })
    }

    render() {
      return (
        <WrappedComponent
          ref={node => (this.element = node)}
          {...this.props}
          visible={this.state.visible}
        />
      )
    }
  }

  return Wrapper
}
