module.exports = {
  siteMetadata: {
    title: 'Le super blog',
  },
  plugins: [
    // Parse files within a folder for further plugin usages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },

    // Avoid the browser having to refresh the page.
    'gatsby-plugin-catch-links',

    // Page transition plugin
    'gatsby-plugin-page-transitions',

    // Styling with styled-component
    'gatsby-plugin-styled-components',

    // Transform markdown into code to query them
    'gatsby-transformer-remark',

    // Control document head using Helmet component
    'gatsby-plugin-react-helmet',

    // Implement Netlify CMS
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },

    // Configure HTTP headers and redirects for Netlify.
    'gatsby-plugin-netlify',
  ],
}
