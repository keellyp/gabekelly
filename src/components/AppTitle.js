import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as colors from '../utils/colors'

class AppTitle extends React.Component {
  render() {
    const { title, index, currentTrip } = this.props
    return (
      <Title index={index} current={currentTrip} className="appTitles">
        {title}
      </Title>
    )
  }
}

export default AppTitle

AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentTrip: PropTypes.number.isRequired,
}

const Title = styled.h1`
  color: ${colors.black};
  opacity: ${props => (props.index === 2 ? '1' : '0.5')};

  font-size: ${props => (props.index === 2 ? '3.2em' : '1.8em')};
  font-weight: ${props => (props.index === 2 ? 600 : 400)};
  letter-spacing: ${props => (props.index === 2 ? '10px' : '6px')};
  line-height: 1em;
  text-transform: uppercase;

  user-select: none;
`
