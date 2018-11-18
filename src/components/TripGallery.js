import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
`

const GridImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
`

const GridOneSquare = styled(Grid)`
  grid-auto-columns: 1fr;
  grid-template-rows: 800px;
`

const GridOneFull = styled(Grid)`
  grid-auto-columns: 1fr;
  grid-template-rows: 500px;
`

const GridTwoSquarePortrait = styled(Grid)`
  grid-template-rows: 500px;
  grid-template-columns: ${props =>
    props.position === 'left'
      ? 'minmax(300px, 30%) auto'
      : 'auto minmax(300px, 30%)'};
`

const GridTwoLandscapePortrait = styled(Grid)`
  grid-template-rows: 350px;
  grid-template-columns: ${props =>
    props.position === 'left'
      ? 'minmax(300px, 30%) auto'
      : 'auto minmax(300px, 30%)'};
`

const GridThreeSquares = styled(Grid)`
  grid-template-rows: repeat(2, 450px);
  grid-template-columns: ${props =>
    props.position === 'left'
      ? 'minmax(300px, 30%) auto'
      : 'auto minmax(300px, 30%)'};
  grid-template-areas: ${props =>
    props.position === 'left'
      ? '"square1 side" "square2 side"'
      : '"side square1" "side square2"'};

  img:nth-child(1) {
    grid-area: square1;
  }
  img:nth-child(2) {
    grid-area: square2;
  }
  img:nth-child(3) {
    grid-area: side;
  }
`

const GridThreeMosaic = styled(Grid)`
  grid-template-rows: 450px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

const GridFourSquares = styled(Grid)`
  grid-template-rows: repeat(3, 450px);
  grid-template-columns: ${props =>
    props.position === 'left'
      ? 'minmax(300px, 30%) auto'
      : 'auto minmax(300px, 30%)'};
  grid-template-areas: ${props =>
    props.position === 'left'
      ? '"square1 side" "square2 side" "square3 side"'
      : '"side square1" "side square2" "side square3"'};

  img:nth-child(1) {
    grid-area: square1;
  }
  img:nth-child(2) {
    grid-area: square2;
  }
  img:nth-child(3) {
    grid-area: square3;
  }
  img:nth-child(4) {
    grid-area: side;
  }
`

export const OneSquare = ({ images, position }) => {
  return (
    <GridOneSquare position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridOneSquare>
  )
}

export const OneFull = ({ images, position }) => {
  return (
    <GridOneFull position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridOneFull>
  )
}

export const TwoSquarePortrait = ({ images, position }) => {
  return (
    <GridTwoSquarePortrait position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridTwoSquarePortrait>
  )
}
export const TwoLandscapePortrait = ({ images, position }) => {
  return (
    <GridTwoLandscapePortrait position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridTwoLandscapePortrait>
  )
}
export const ThreeSquares = ({ images, position }) => {
  return (
    <GridThreeSquares position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridThreeSquares>
  )
}
export const ThreeMosaic = ({ images, position }) => {
  return (
    <GridThreeMosaic position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridThreeMosaic>
  )
}
export const FourSquares = ({ images, position }) => {
  return (
    <GridFourSquares position={position}>
      {images.map((img, index) => (
        <GridImage key={index} src={img.src} alt={img.alt} />
      ))}
    </GridFourSquares>
  )
}
