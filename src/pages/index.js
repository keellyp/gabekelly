import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import AppTrip from '../components/AppTrip'

const Lethargy = require('exports-loader?this.Lethargy!lethargy/lethargy')

class index extends Component {
  constructor(props) {
    super(props)
    this._trips = []
    this._body = document.body
    this._lethargy = new Lethargy()
  }

  state = {
    currentTrip: 0,
  }

  componentDidMount() {
    this._getTrips()
    this._setupEventListener()
  }

  _getTrips() {
    const trips = this.props.data.allJson.edges
    for (let i = 0; i < trips.length; i++) {
      this._trips.push(trips[i].node.title)
    }
  }

  _setupEventListener() {
    this._body.addEventListener('mousewheel', this.scrollEventListener, {
      passive: true,
    })
    this._body.addEventListener('DOMMouseScroll', this.scrollEventListener, {
      passive: true,
    })
    this._body.addEventListener('wheel', this.scrollEventListener, {
      passive: true,
    })
  }

  render() {
    const posts = this.props.data.allJson.edges
    return (
      <React.Fragment>
        <Layout ref={this._layout}>
          {posts.map((post, index) => (
            <AppTrip
              key={index}
              slug={post.node.fields.slug}
              title={post.node.title}
              cover={post.node.cover}
              index={index}
              currentTrip={this.state.currentTrip}
              totalTrip={posts.length}
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
