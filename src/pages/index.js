import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import AppTitle from '../components/AppTitle'
import AppCover from '../components/AppCover'

const Lethargy = require('exports-loader?this.Lethargy!lethargy/lethargy')

class index extends Component {
  constructor(props) {
    super(props)
    this._trips = []
    this._body = document.body
    this._isScrolling = false
    this._lethargy = new Lethargy()
  }

  state = {
    currentTrip: 2,
    totalTrip: this.props.data.allJson.edges.length,
  }

  componentDidMount() {
    this._getTrips()
    this._allowScroll('hidden')
    this._setupEventListener()
  }

  componentWillUnmount() {
    this._allowScroll('auto')
    this._removeEventListener()
  }

  _getTrips() {
    const trips = this.props.data.allJson.edges
    for (let i = 0; i < trips.length; i++) {
      this._trips.push(trips[i].node.title)
    }
  }

  _allowScroll(value) {
    document.body.style.overflow = value
  }

  _removeEventListener() {
    this._body.removeEventListener(
      'mousewheel',
      this._scrollEventListener.bind(this)
    )
    this._body.removeEventListener(
      'DOMMouseScroll',
      this._scrollEventListener.bind(this)
    )
    this._body.removeEventListener(
      'wheel',
      this._scrollEventListener.bind(this)
    )
  }

  _setupEventListener() {
    this._body.addEventListener(
      'mousewheel',
      this._scrollEventListener.bind(this)
    )
    this._body.addEventListener(
      'DOMMouseScroll',
      this._scrollEventListener.bind(this)
    )
    this._body.addEventListener('wheel', this._scrollEventListener.bind(this))
  }

  _scrollEventListener(e) {
    e.stopPropagation()
    if (this._lethargy.check(e) !== false) {
      if (!this._isScrolling && this._lethargy.check(e) === -1) {
        this._isScrolling = true
        this._scrollToNext()
      } else if (!this._isScrolling && this._lethargy.check(e) === 1) {
        this._isScrolling = true
        this._scrollToPrev()
      }
    }
  }

  _clear() {
    setTimeout(() => {
      this._isScrolling = false
    }, 500)
  }

  _scrollToNext() {
    this._clear()
    if (this.state.currentTrip + 1 < this.state.totalTrip) {
      this.setState({ currentTrip: this.state.currentTrip + 1 })
    } else {
      this.setState({ currentTrip: 0 })
    }
  }

  _scrollToPrev() {
    this._clear()
    if (this.state.currentTrip - 1 >= 0) {
      this.setState({ currentTrip: this.state.currentTrip - 1 })
    } else {
      this.setState({ currentTrip: this.state.totalTrip - 1 })
    }
  }

  _handleClick = param => e => {
    this.setState({ currentTrip: param })
  }

  render() {
    const posts = this.props.data.allJson.edges
    return (
      <React.Fragment>
        <Layout>
          <Container>
            <TitleContainer>
              {posts.map((post, index) => (
                <AppTitle
                  key={index}
                  title={post.node.title}
                  index={index}
                  currentTrip={this.state.currentTrip}
                  click={this._handleClick(index)}
                />
              ))}
            </TitleContainer>
            <CoverContainer>
              {posts.map((post, index) => (
                <Link to={post.node.fields.slug} key={index}>
                  <AppCover
                    cover={post.node.cover}
                    index={index}
                    currentTrip={this.state.currentTrip}
                  />
                </Link>
              ))}
            </CoverContainer>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}
export default index

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 400px auto;
  grid-column-gap: 20px;
  align-items: center;
`

const TitleContainer = styled.div`
  height: 300px;

  display: grid;
  grid-auto-rows: 60px;
  align-items: center;
  justify-items: center;

  overflow: hidden;
`

const CoverContainer = styled.div`
  height: 40vh;

  display: flex;

  overflow: hidden;

  a {
    width: 100%;
    height: 100%;

    flex-shrink: 0;
  }
`

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
