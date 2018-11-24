import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

AppCover.propTypes = {
  cover: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  currentTrip: PropTypes.number.isRequired,
}

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: ${props => `translateX(-${props.current * 100}%)`};
`
