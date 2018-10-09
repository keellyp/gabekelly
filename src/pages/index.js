import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

class index extends Component {
  render() {

    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location}>
        <h1>{siteTitle}</h1>
        {posts.map((post, index) => {
          const data = post.node.frontmatter
          return (
            <div key={index}>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <hr />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default index


export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            templateKey
            date
            description
          }
        }
      }
    }		
  }
`