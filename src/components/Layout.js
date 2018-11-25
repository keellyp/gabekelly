import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { GlobalStyle } from '../utils/global.css'
import Header from './Header'
import Head from './Head'

const Layout = ({ data, children, isDark }) => {
  return (
    <React.Fragment>
      <Head data={data} />
      <GlobalStyle />
      <Header isDark={isDark} />
      {children}
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  isDark: PropTypes.bool,
}

const LayoutWithQuery = props => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutWithQuery {
          site {
            siteMetadata {
              siteTitle
              siteDescription
              siteUrl
              siteLogo
              favicon {
                ico
                small
                large
                apple
                androidSmall
                androidLarge
                ms
                safari
              }
            }
          }
        }
      `}
      render={data => <Layout data={data} {...props} />}
    />
  )
}

export default LayoutWithQuery

LayoutWithQuery.propTypes = {
  children: PropTypes.node.isRequired,
}
