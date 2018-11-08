const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

/**
 * Implement the Gatsby API "onCreateNode"
 * This is called when a new node is created/updated : use to add slug to node field
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Json') {
    const slug = createFilePath({ node, getNode, basePath: 'trips' })
    createNodeField({ node, name: 'slug', value: slug })
  }
}

/**
 * Implement the Gatsby API "createPages"
 * This is called once the data layer is bootstrapped to let plugins create pages from datas
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allJson {
          edges {
            node {
              fields {
                slug
              }
              id
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      const nodes = result.data.allJson.edges
      nodes.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/pages/trip.js'),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
            id: node.id,
          },
        })
      })

      resolve()
    })
  })
}
