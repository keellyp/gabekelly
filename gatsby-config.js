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
        name: "pages",
      },
    },

    // Avoid the browser having to refresh the page.
    'gatsby-plugin-catch-links',

    // Page transition plugin
    'gatsby-plugin-page-transitions',

    // Transform markdown into code to query them
    'gatsby-transformer-remark',

    // Control document head using Helmet component
    'gatsby-plugin-react-helmet',

    // Implement Netlify CMS
    'gatsby-plugin-netlify-cms',

    // Configure HTTP headers and redirects for Netlify.
    'gatsby-plugin-netlify',
  ],
}