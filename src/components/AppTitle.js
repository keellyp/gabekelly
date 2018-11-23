import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as colors from '../utils/colors'

const AppTitle = ({ title, index, currentTrip, click }) => {
  return (
    <Title index={index} current={currentTrip} onClick={click}>
      {title}
    </Title>
  )
}

export default AppTitle

AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentTrip: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
}

const Title = styled.h1`
  color: ${colors.black};
  opacity: ${props => (props.index === props.current ? '1' : '0.5')};

  font-size: ${props => (props.index === props.current ? '3.2em' : '1.8em')};
  font-weight: ${props => (props.index === props.current ? 600 : 400)};
  letter-spacing: ${props => (props.index === props.current ? '10px' : '6px')};
  line-height: 1em;
  text-transform: uppercase;

  user-select: none;
  cursor: pointer;
`
