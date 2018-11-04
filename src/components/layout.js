import React from 'react'
import { styled, createGlobalStyle } from 'styled-components'

import Header from './header'

// import Montserrat from ‘./fonts/Montserrat-Regular.ttf’

const GlobalStyle = createGlobalStyle`
  @font-face {
    /* font-family: Montserrat; */
    /* src: url(${Montserrat}); */
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit; }

  html {
    font-size: 62.5%; }

  body {
    box-sizing: border-box; }

  body {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    line-height: 1.7;
    color: #000; 
    background-color: #f2f2f2;
  }
`

export default ({ children }) => (
  <GlobalStyle>
    <Header />
    {children}
  </GlobalStyle>
)
