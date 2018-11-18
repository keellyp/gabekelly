import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

export default class AppTrip extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { title, cover, slug } = this.props
    return (
      <TripContainer>
        <Link to={slug}>
          <h1>{title}</h1>
          <Cover>
            <img src={cover.src} alt={cover.alt} />
          </Cover>
        </Link>
      </TripContainer>
    )
  }
}

const TripContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const Cover = styled.div`
  height: 20vh;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
