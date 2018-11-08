import React from 'react'

import { GlobalStyle } from '../utils/global.css'
import Header from './Header'

const Layout = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    <Header />
    {children}
  </React.Fragment>
)

export default Layout
