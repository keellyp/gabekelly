import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import AppTrip from '../components/AppTrip'

class index extends Component {
  constructor(props) {
    super(props)
    this._trips = []
  }

  componentDidMount() {
    this._getTrips()
    console.log(this._trips)
  }

  _getTrips() {
    const trips = this.props.data.allJson.edges
    for (let i = 0; i < trips.length; i++) {
      this._trips.push(trips[i].node.title)
    }
  }

  render() {
    const posts = this.props.data.allJson.edges
    return (
      <React.Fragment>
        <Layout>
          {posts.map((post, index) => (
            <AppTrip
              slug={post.node.fields.slug}
              title={post.node.title}
              cover={post.node.cover}
              key={index}
            />
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
