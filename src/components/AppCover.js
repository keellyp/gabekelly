import React from 'react'
import styled from 'styled-components'

const AppCover = ({ cover, index, currentTrip }) => {
  return (
    <Cover
      index={index}
      current={currentTrip}
      src={cover.src}
      alt={cover.alt}
    />
  )
}

export default AppCover

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: ${props => `translateX(-${props.current * 100}%)`};
`
