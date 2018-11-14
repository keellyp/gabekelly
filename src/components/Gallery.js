import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-gap: 40px;
`

const GridImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
`

const GridOneSquare = styled(GridContainer)`
  grid-auto-columns: 1fr;
  grid-template-rows: 100vw;
`

export const OneSquare = ({ src, alt, position }) => {
  return (
    <GridOneSquare>
      <GridImage src={src} alt={alt} position={position} />
    </GridOneSquare>
  )
}
// export const OneFull = () => {
//   return (

//   )
// }
// export const TwoSquarePortrait = () => {
//   return (

//   )
// }
// export const TwoLandscapePortrait = () => {
//   return (

//   )
// }
// export const ThreeSquares = () => {
//   return (

//   )
// }
// export const ThreeMosaic = () => {
//   return (

//   )
// }
// export const FourSquares = () => {
//   return (

//   )
// }
