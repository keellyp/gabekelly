import React, { Component } from 'react'
import styled from 'styled-components'

import { device } from '../utils/breakpoints'

import { Layout, AboutContent } from '../app'

import TweenLite from 'gsap'

import { datas } from '../datas'
import { Power0, Power1 } from 'gsap/TweenLite';

class about extends Component {
  constructor(props) {
    super(props)

    // Create variable
    this._bodyHeight = null

    // Create ref
    this.$title = React.createRef()

    // Bind function
    this._scrollEventListener = this._scrollEventListener.bind(this)
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    this.scroll = 0
    this._bodyHeight = document.body.offsetHeight
    this._setupEventListener()
  }

  componentWillUnmount() {
    this._removeEventListener()
  }

  _setupEventListener() {
    document.body.addEventListener('mousewheel', this._scrollEventListener)
    document.body.addEventListener('DOMMouseScroll', this._scrollEventListener)
    document.body.addEventListener('wheel', this._scrollEventListener)
    if (!window.navigator.userAgent.match(/iPad/i) && !window.navigator.userAgent.match(/iPhone/i)) {
      document.body.addEventListener('touchmove', this._scrollEventListener)
    }
    document.body.addEventListener('touchstart', this._touchStartEventListener)
  }

  _removeEventListener() {
    document.body.removeEventListener('mousewheel', this._scrollEventListener)
    document.body.removeEventListener(
      'DOMMouseScroll',
      this._scrollEventListener
    )
    document.body.removeEventListener('wheel', this._scrollEventListener)
    document.body.removeEventListener(
      'touchstart',
      this._touchStartEventListener
    )
    document.body.removeEventListener('touchmove', this._scrollEventListener)
  }

  _scrollEventListener(e) {
    if (!window.navigator.userAgent.match(/iPad/i) && !window.navigator.userAgent.match(/iPhone/i)) {
      this.scroll += e.deltaY
      this.$title.current.style.transform = `translateX(-${this.scroll}px)`
    }
    
    else {
      const windowScroll = window.scrollY

      const minValue = 0
      const maxValue = 6
      const multiplier = 70

      const value = Math.min(
        maxValue * multiplier,
        Math.max(minValue, windowScroll)
      )
      const bindValue = value / multiplier

      this.$title.current.style.transform = `translateX(-${bindValue}em)`
    }
  }

  _touchStartEventListener(e) {}

  render() {
    const { about } = datas
    return (
      <React.Fragment>
        <Layout isDark={true}>
          <Container>
            <MainTitle>
              <span ref={this.$title}>{about.title}</span>
            </MainTitle>
            <AboutContent about={about} />
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}
export default about

const Container = styled.section`
  overflow-x: hidden;

  padding-top: 60vh;
`

const MainTitle = styled.h1`
  width: 2800px;

  margin-left: 10%;

  overflow: hidden;

  span {
    display: block;

    font-weight: 400;
    font-size: 4em;

    will-change: transform;
    transition: transform 0.05s ease-in-out;

    @media ${device.tabletLandscape} {
      font-size: 6.2em;
    }

    @media ${device.tablet} {
      font-size: 3.2em;
    }
  }

  @media ${device.tablet} {
    margin-left: 5%;
  }
`
