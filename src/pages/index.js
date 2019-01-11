import React, { Component } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TimelineLite, Power4 } from 'gsap'

import { Layout, AppTitle, AppCover } from '../app'

const Lethargy = require('exports-loader?this.Lethargy!lethargy/lethargy')

class index extends Component {
  constructor(props) {
    super(props)
    this._trips = this._getTrips()

    this._lethargy = new Lethargy()

    this._isScrolling = false

    this._titles = React.createRef()
    this.transitionCover = React.createRef()
  }

  state = {
    isScrolling: false,
    isCurrent: false,
    currentTrip: 2,
    totalTrip: this.props.data.allJson.edges.length,
  }

  componentDidMount() {
    this._allowScroll('hidden')
    this._setupEventListener()
  }

  componentWillUnmount() {
    this._allowScroll('auto')
    this._removeEventListener()
  }

  exitAnimation() {
    const height = (window.innerWidth * 9) / 16

    const timeline = new TimelineLite()
    return timeline
      .to(this.transitionCover, 0.8, {
        width: '100%',
        ease: Power4.easeIn,
      })
      .to(
        this.transitionCover,
        1.2,
        {
          height: `${height}px`,
          ease: Power4.easeInOut,
        },
        0.6
      )
  }

  _getTrips() {
    const array = []
    const trips = this.props.data.allJson.edges
    for (let i = 0; i < trips.length; i++) {
      array.push(trips[i].node)
    }
    return array
  }

  _allowScroll(value) {
    document.body.style.overflow = value
  }

  _setupEventListener() {
    document.body.addEventListener(
      'mousewheel',
      this._scrollEventListener.bind(this)
    )
    document.body.addEventListener(
      'DOMMouseScroll',
      this._scrollEventListener.bind(this)
    )
    document.body.addEventListener(
      'wheel',
      this._scrollEventListener.bind(this)
    )
  }

  _removeEventListener() {
    document.body.removeEventListener(
      'mousewheel',
      this._scrollEventListener.bind(this)
    )
    document.body.removeEventListener(
      'DOMMouseScroll',
      this._scrollEventListener.bind(this)
    )
    document.body.removeEventListener(
      'wheel',
      this._scrollEventListener.bind(this)
    )
  }

  _scrollEventListener(e) {
    e.stopPropagation()
    if (this._lethargy.check(e) !== false) {
      if (!this.state.isScrolling) {
        this.setState({ isScrolling: true })
        if (this._lethargy.check(e) === -1) {
          this._scrollToNext()
        } else if (this._lethargy.check(e) === 1) {
          this._scrollToPrev()
        }
      }
    }
  }

  _clear() {
    setTimeout(() => {
      this.setState({ isScrolling: false })
    }, 500)
  }

  _scrollToNext() {
    this._clear()
    this._updateOrder('next')
    if (this.state.currentTrip + 1 < this.state.totalTrip) {
      this.setState({ currentTrip: this.state.currentTrip + 1 })
    } else {
      this.setState({ currentTrip: 0 })
    }
  }

  _scrollToPrev() {
    this._clear()
    this._updateOrder('prev')
    if (this.state.currentTrip - 1 >= 0) {
      this.setState({ currentTrip: this.state.currentTrip - 1 })
    } else {
      this.setState({ currentTrip: this.state.totalTrip - 1 })
    }
  }

  _updateOrder(arg) {
    const newTrips = [...this._trips]
    switch (arg) {
      case 'next':
        const first = 0
        newTrips.splice(first, 1)
        this._trips = [...newTrips, this._trips[first]]
        break
      case 'prev':
        const last = this._trips.length - 1
        newTrips.splice(last, 1)
        this._trips = [this._trips[last], ...newTrips]
        break
      default:
        break
    }
  }

  render() {
    const posts = this.props.data.allJson.edges
    return (
      <React.Fragment>
        <Layout>
          <Container>
            <TitleContainer ref={this._titles}>
              {this._trips.map((post, index) => (
                <AppTitle
                  key={index}
                  index={index}
                  title={post.title}
                  currentTrip={this.state.currentTrip}
                />
              ))}
            </TitleContainer>
            <CoverContainer ref={node => (this.transitionCover = node)}>
              {posts.map((post, index) => (
                <TransitionLink
                  to={post.node.fields.slug}
                  key={index}
                  exit={{
                    length: 2,
                    trigger: ({ exit }) => this.exitAnimation(exit),
                  }}
                  entry={{
                    delay: 1.6,
                  }}
                >
                  <AppCover
                    cover={post.node.cover}
                    index={index}
                    currentTrip={this.state.currentTrip}
                  />
                </TransitionLink>
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
`

const TitleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;

  width: 35%;
  transform: translateY(-50%);

  text-align: center;
`

const CoverContainer = styled.div`
  position: absolute;
  top: calc(50vh - (43vh / 2));
  right: 0;

  width: 55%;
  height: 43vh;
  overflow: hidden;

  display: flex;
  flex-direction: row;

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
