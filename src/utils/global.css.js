import { createGlobalStyle } from 'styled-components'
import { withPrefix } from 'gatsby'

import * as colors from './colors'
import { device } from './breakpoints'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Maison Neue;
    font-weight: 600;
    src: url(${withPrefix('fonts/MaisonNeue-Bold.otf')});
  }

  @font-face {
    font-family: Maison Neue;
    font-weight: 500;
    src: url(${withPrefix('fonts/MaisonNeue-Demi.otf')});
  }

  @font-face {
    font-family: Maison Neue;
    font-weight: 400;
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
    font-size: 1.25em;
    line-height: 1.4;
    background-color: ${props =>
    props.isDark ? colors.blackLight : colors.greyLight};
    color: ${props => (props.isDark ? colors.greyLight : colors.black)};

    @media ${device.tabletLandscape} {
      font-size: 1em;
    }
  }
`
