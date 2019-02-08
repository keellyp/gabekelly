import React, { Component } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TimelineLite, Power4 } from 'gsap'

import { Layout } from '../app'
import * as colors from '../utils/colors'
import { nodelistToArray } from '../utils/helpers'
import { device } from '../utils/breakpoints'

class index extends Component {
  constructor(props) {
    super(props)
    this.backgrounds = React.createRef()
    this.titles = React.createRef()
  }

  state = {
    hasBackground: false,
    current: null,
  }

  exitAnimation() {
    const height = (window.innerWidth * 9) / 16
    const top = window.innerHeight / 2 - (21.5 * window.innerHeight) / 100
    const backgrounds = nodelistToArray(this.backgrounds.current.childNodes)

    if (this.state.current !== null) {
      const bg = backgrounds[this.state.current]
      const timeline = new TimelineLite()
      return timeline
        .set(bg, { opacity: 1, zIndex: 1 })
        .set(this.titles.current, { opacity: 0 })
        .to(bg, 0.5, { y: top, ease: Power4.easeIn })
        .to(
          bg,
          0.8,
          {
            height: `${height}px`,
            ease: Power4.easeInOut,
          },
          0.3
        )
    }
  }

  _onMouseEnterHandler(i, e) {
    this.setState({ current: i, hasBackground: true })
  }

  _onMouseLeaveHandler() {
    this.setState({ current: null, hasBackground: false })
  }

  render() {
    const posts = this.props.data.allJson.edges
    return (
      <React.Fragment>
        <Layout>
          <Container>
            <div ref={this.backgrounds}>
              {posts.map((post, i) => (
                <Background
                  key={i}
                  index={i}
                  current={this.state.current}
                  style={{
                    backgroundImage: 'url(' + post.node.cover.src + ')',
                  }}
                />
              ))}
            </div>
            <Titles ref={this.titles}>
              {posts.map((post, i) => (
                <Title
                  key={i}
                  hasBackground={this.state.hasBackground}
                  onMouseEnter={this._onMouseEnterHandler.bind(this, i)}
                  onMouseLeave={this._onMouseLeaveHandler.bind(this)}
                >
                  <TransitionLink
                    to={post.node.fields.slug}
                    exit={{
                      length: 1,
                      trigger: ({ exit }) => this.exitAnimation(exit),
                    }}
                    entry={{
                      delay: 1,
                    }}
                  >
                    {post.node.title}
                    <span>{post.node.data_year}</span>
                  </TransitionLink>
                </Title>
              ))}
            </Titles>
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

  background-color: ${colors.greyLight};
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;

  opacity: ${props => (props.current === props.index ? 1 : 0)};
  will-change: opacity;
  transition: opacity 0.6s ease-in-out;
`

const Titles = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
  width: 90%;

  @media ${device.smallDesktop} {
    top: 20%;
    left: 2rem;
  }
`

const Title = styled.h1`
  position: relative;
  display: inline-block;

  padding: 0.39em 1.31em 0.39em 0;

  color: ${colors.white};
  mix-blend-mode: ${props => (props.hasBackground ? 'overlay' : 'difference')};

  font-size: 3.8em;
  font-weight: 400;
  line-height: 1em;

  user-select: none;
  transition: mix-blend-mode 0.3s ease-in-out;

  cursor: pointer;

  @media ${device.mobile} {
    font-size: 2.8em;
  }

  @media ${device.tablet} {
    font-size: 3.4em;
  }

  &:hover {
    mix-blend-mode: color-dodge;
  }

  span {
    position: absolute;
    bottom: calc(90% - 1.95em);
    left: calc(100% - 6.55em);

    font-size: 0.2em;
    line-height: 1em;
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
          data_year
        }
      }
    }
  }
`
