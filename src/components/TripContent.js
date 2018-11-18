import React from 'react'
import styled from 'styled-components'

const TripContent = ({ content }) => {
  return (
    <Container>
      <h2>{content.title}</h2>
      <p>{content.text}</p>
    </Container>
  )
}

export default TripContent

const Container = styled.div`
  margin-left: 100px;
`
