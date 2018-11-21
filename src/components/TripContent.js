import React from 'react'
import styled from 'styled-components'

import * as colors from '../utils/colors'

const TripContent = ({ content }) => {
  return (
    <ContentContainer>
      <Title>{content.title}</Title>
      <Content>{content.text}</Content>
    </ContentContainer>
  )
}

export default TripContent

const ContentContainer = styled.div`
  margin: 250px 18% 220px auto;
  width: 36%;
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
