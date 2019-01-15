import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as colors from '../utils/colors'

class AppTitle extends React.Component {
  render() {
    const { title, index } = this.props
    return (
      <Title index={index} className="appTitles">
        {title}
      </Title>
    )
  }
}

export default AppTitle

AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

const Title = styled.h1`
  color: ${colors.black};

  opacity: 0.5;
  font-size: 1.8em;
  font-weight: 400;
  letter-spacing: 6px;

  /* opacity: ${props => (props.index === 2 ? '1' : '0.5')};
  font-weight: ${props => (props.index === 2 ? 600 : 400)};
  letter-spacing: ${props => (props.index === 2 ? '10px' : '6px')}; */

  line-height: 1em;
  text-transform: uppercase;
  padding: 0.8em 0;

  user-select: none;

  transform-origin: center;
`
