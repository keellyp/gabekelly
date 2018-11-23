import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import * as colors from '../utils/colors'

class TripFooter extends React.Component {
  render() {
    const { next } = this.props
    return (
      <Link to={next.fields.slug}>
        <FooterCover src={next.cover.src}>
          <Background />
          <Title>{next.title}</Title>
        </FooterCover>
      </Link>
    )
  }
}

export default TripFooter

const FooterCover = styled.div`
  position: relative;

  width: 100vw;
  height: 70vh;

  margin-top: 140px;

  overflow: hidden;

  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${colors.blackLight};
`

const Title = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${colors.white};
  font-weight: 600;
  font-size: 4em;
  letter-spacing: 12px;
  text-transform: uppercase;
  text-align: center;

  z-index: 1;
`
