import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

class index extends Component {
  render() {
    const posts = this.props.data.allJson.edges
    return (
      <React.Fragment>
        <Layout>
          {posts.map((post, index) => (
            <Link key={index} to={post.node.fields.slug}>
              <h1>{post.node.title}</h1>
              <img src={post.node.cover.src} alt={post.node.cover.alt} />
            </Link>
          ))}
        </Layout>
      </React.Fragment>
    )
  }
}
export default index

export const pageQuery = graphql`
  query IndexQuery {
    allJson {
      edges {
        node {
          fields {
            slug
          }
          title
          cover {
            alt
            src
          }
        }
      }
    }
  }
`
