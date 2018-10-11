/** 
 * Implement the Gatsby API "createPages"
 * This is called once the data layer is bootstrapped to let plugins create pages from datas
*/
// const path = require('path')

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     const tripTemplate = path.resolve(`src/templates/trip.js`)

    // Query for markdown nodes to use in creating pages.
    // resolve(
    //   graphql(
    //     `
    //       {
    //         allMarkdownRemark(limit: 1000) {
    //           edges {
    //             node {
    //               frontmatter {
    //                 path
    //               }
    //             }
    //           }
    //         }
    //       }
    //     `
    //   )
    //   .then(result => {
    //     // Handling errors  
    //     if (result.errors) {
    //       reject(result.errors)
    //     }

    //     // Create pages for each markdown file.
    //     const nodes = result.data.allMarkdownRemark.edges
    //     nodes.forEach(({ node }) => {
    //       const path = node.frontmatter.path
    //       createPage({ path, component: tripTemplate, context: { path } })
    //     })
    //   })
    // )
  // })
// }