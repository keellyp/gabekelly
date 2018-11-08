import { createGlobalStyle } from 'styled-components'

import MaisonNeueBold from '../../static/fonts/MaisonNeue-Bold.otf'
import MaisonNeueBook from '../../static/fonts/MaisonNeue-Book.otf'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Maison Neue;
    font-weight: bold;
    src: url(${MaisonNeueBold});
  }

  @font-face {
    font-family: Maison Neue;
    font-weight: normal;
    src: url(${MaisonNeueBook});
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  a {
    color:inherit;
    outline:none;
    text-decoration: none;
  }
  
  ol, ul {
    list-style:none;
  }

  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
  }

  body {
    font-family: 'Maison Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    line-height: 1.4;
    color: #000; 
    background-color: #f2f2f2;
  }
`
