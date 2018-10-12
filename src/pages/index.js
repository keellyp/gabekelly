import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
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
          const {slug} = post.node.fields
          return (
            <Link key={index} to={slug} >
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <hr />
            </Link>
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
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`