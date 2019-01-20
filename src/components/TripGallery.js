import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TweenLite, Power4 } from 'gsap'

import * as colors from '../utils/colors'
import withIntersectionObserver from '../utils/withIntersectionObserver'

// Image lazy loading and reveal
class Image extends React.Component {
  componentDidMount() {
    TweenLite.set(this.element, { opacity: 0, y: '5%' })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this._isVisible()
    }
  }

  _isVisible() {
    this.element.src = this.props.src
    TweenLite.to(this.element, 0.6, {
      opacity: 1,
      y: '0%',
      ease: Power4.easeIn,
    })
  }

  render() {
    return <GridImage ref={el => (this.element = el)} />
  }
}

// Image component with intersection observer
const ImageWrapper = withIntersectionObserver(Image)

// Config for intersection observer
const config = {
  root: document.querySelector('.galleryContainer'),
  rootMargin: '0px 0px 300px 0px',
}

// Different style of component for the gallery
// One square
export const OneSquare = ({ images, position }) => {
  return (
    <GridOneSquare position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridOneSquare>
  )
}

// One full
export const OneFull = ({ images, position }) => {
  return (
    <GridOneFull position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridOneFull>
  )
}

// Two squares one portrait
export const TwoSquarePortrait = ({ images, position }) => {
  return (
    <GridTwoSquarePortrait position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridTwoSquarePortrait>
  )
}

// Two landscapes one portrait
export const TwoLandscapePortrait = ({ images, position }) => {
  return (
    <GridTwoLandscapePortrait position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridTwoLandscapePortrait>
  )
}

// Three squares
export const ThreeSquares = ({ images, position }) => {
  return (
    <GridThreeSquares position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridThreeSquares>
  )
}

// Mosaic of three
export const ThreeMosaic = ({ images, position }) => {
  return (
    <GridThreeMosaic position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridThreeMosaic>
  )
}

// Four squares
export const FourSquares = ({ images, position }) => {
  return (
    <GridFourSquares position={position}>
      {images.map((img, index) => (
        <GridContainer key={index}>
          <ImageWrapper config={config} src={img.src} alt={img.alt} />
          <Caption>{img.alt}</Caption>
        </GridContainer>
      ))}
    </GridFourSquares>
  )
}

// Proptypes
OneSquare.propTypes = OneFull.propTypes = TwoSquarePortrait.propTypes = TwoLandscapePortrait.propTypes = ThreeSquares.propTypes = ThreeMosaic.propTypes = FourSquares.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  position: PropTypes.string,
}

// Style
const Grid = styled.div`
  display: grid;
  grid-gap: 2vw;
  margin-bottom: 1em;
`

const GridContainer = styled.div`
  height: 100%;

  display: grid;
  grid-row-gap: 10px;
  grid-template-rows: auto 1em;
`

const Caption = styled.p`
  font-size: 0.9em;
  line-height: 1em;
  color: ${colors.grey};
`

const GridImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  cursor: none;
`

const GridOneSquare = styled(Grid)`
  grid-auto-columns: 1fr;
  grid-template-rows: 100vw;
`

const GridOneFull = styled(Grid)`
  grid-auto-columns: 1fr;
  grid-template-rows: 50vw;
`

const GridTwoSquarePortrait = styled(Grid)`
  grid-template-rows: 68vw;
  grid-template-columns: ${props =>
    props.position === 'left' ? '30.4vw auto' : 'auto 30.4vw'};
`

const GridTwoLandscapePortrait = styled(Grid)`
  grid-template-rows: 34vw;
  grid-template-columns: ${props =>
    props.position === 'left' ? '30.4vw auto' : 'auto 30.4vw'};
`

const GridThreeSquares = styled(Grid)`
  grid-template-rows: repeat(2, 30.4vw);
  grid-template-columns: ${props =>
    props.position === 'left' ? '30.4vw auto' : 'auto 30.4vw'};
  grid-template-areas: ${props =>
    props.position === 'left'
      ? '"square1 side" "square2 side"'
      : '"side square1" "side square2"'};

  ${GridContainer}:nth-child(1) {
    grid-area: square1;
  }
  ${GridContainer}:nth-child(2) {
    grid-area: square2;
  }
  ${GridContainer}:nth-child(3) {
    grid-area: side;
  }
`

const GridThreeMosaic = styled(Grid)`
  grid-template-rows: 30vw;
  grid-template-columns: repeat(3, 1fr);
`

const GridFourSquares = styled(Grid)`
  grid-template-rows: repeat(3, 31vw);
  grid-template-columns: ${props =>
    props.position === 'left' ? '31vw auto' : 'auto 31vw'};
  grid-template-areas: ${props =>
    props.position === 'left'
      ? '"square1 side" "square2 side" "square3 side"'
      : '"side square1" "side square2" "side square3"'};

  ${GridContainer}:nth-child(1) {
    grid-area: square1;
  }
  ${GridContainer}:nth-child(2) {
    grid-area: square2;
  }
  ${GridContainer}:nth-child(3) {
    grid-area: square3;
  }
  ${GridContainer}:nth-child(4) {
    grid-area: side;
  }
`
