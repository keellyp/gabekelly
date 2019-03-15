import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { device } from '../utils/breakpoints'

class TripContent extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  setStyle() {
    this.container.current.style.marginBottom = 'calc(70vh + 140px)'
  }

  render() {
    const { content, children } = this.props
    return (
      <React.Fragment>
        <ContentContainer>
          <Title>{content.title}</Title>
          <Content>{content.text}</Content>
        </ContentContainer>
        <GalleriesContainer ref={this.container}>{children}</GalleriesContainer>
      </React.Fragment>
    )
  }
}

export default TripContent

TripContent.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
}

const ContentContainer = styled.div`
  margin: 12.5em 18% 11em auto;
  width: 45%;

  @media ${device.tablet} {
    margin: 4em auto 6em auto;
    width: 95%;
  }
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 1.6em;
  line-height: 1.625em;
  padding-bottom: 1.5em;
`

const Content = styled.p`
  font-size: 1em;
  line-height: 1.9em;
`

const GalleriesContainer = styled.div`
  width: 95%;
  margin: auto;
`
