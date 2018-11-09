import { createGlobalStyle } from 'styled-components'
import { withPrefix } from 'gatsby'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Maison Neue;
    font-weight: bold;
    src: url(${withPrefix('fonts/MaisonNeue-Bold.otf')});
  }

  @font-face {
    font-family: Maison Neue;
    font-weight: normal;
    src: url(${withPrefix('fonts/MaisonNeue-Book.otf')});
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
