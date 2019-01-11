const siteConfig = require('./site-config')

module.exports = {
  pathPrefix: '/',
  siteMetadata: { ...siteConfig },
  plugins: [
    // Parse files within a folder for further plugin usages
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/datas`,
        name: 'datas',
      },
    },

    // Page transition
    'gatsby-plugin-transition-link',

    // Avoid the browser having to refresh the page.
    'gatsby-plugin-catch-links',

    // Styling with styled-component
    'gatsby-plugin-styled-components',

    // Transform json into code to query them via graphql
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: 'Json', // a fixed string
      },
    },

    // Control document head using Helmet component
    'gatsby-plugin-react-helmet',
  ],
}
