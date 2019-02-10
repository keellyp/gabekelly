import React from 'react'
import styled from 'styled-components'
import { Power2, TimelineLite } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import TransitionLink from 'gatsby-plugin-transition-link'
import PropTypes from 'prop-types'

import * as colors from '../utils/colors'
import { textSplitter, nodelistToArray } from '../utils/helpers'

class TripFooter extends React.Component {
  constructor(props) {
    super(props)

    // Create refs
    this.$background = React.createRef()
    this.$title = React.createRef()
    this.$footer = React.createRef()

    // Create variables
    this._letters = null
    this._timelineVisible = new TimelineLite()
    this._timelineLeave = null
  }

  componentDidMount() {
    // First split the title text
    // Then create a new array with those letters inside
    textSplitter(this.$title.current)
    this._letters = nodelistToArray(this.$title.current.childNodes)

    // Set footer default style
    this._timelineVisible.set(this.$background.current, { scaleX: 1 })
    this._timelineVisible.set(this._letters, { y: '100%' })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this._isVisible()
    }
  }

  componentWillUnmount() {
    if (this._timelineLeave) {
      this._timelineLeave.kill()
    }
    if (this._timelineVisible) {
      this._timelineVisible.kill()
    }
  }

  // Launch when footer is visible
  // with intersection observer
  _isVisible() {
    this._timelineVisible.to(this.$background.current, 0.8, {
      scaleX: 0,
      ease: Power2.easeInOut,
    })
    this._timelineVisible.staggerTo(
      this._letters,
      0.4,
      { y: '0%', ease: Power2.easeIn },
      0.04,
      0.6
    )
  }

  // On click on footer section
  // Launch this function before route leave
  _onLeaveAnimation() {
    this._timelineLeave = new TimelineLite({
      onStart: () => this.props.beforeLeave(),
    })

    const top = (28.5 * window.innerHeight) / 100

    this._timelineLeave.to(
      this._letters,
      0.4,
      {
        paddingLeft: '2px',
        paddingRight: '2px',
        ease: Power2.easeOut,
      },
      0
    )
    this._timelineLeave.staggerTo(
      this._letters,
      0.2,
      {
        y: '-100%',
        ease: Power2.easeOut,
      },
      0.05,
      0.4
    )
    this._timelineLeave.set(document.body, { overflow: 'hidden' })
    this._timelineLeave.to(
      this.$footer.current,
      0.5,
      {
        height: '100vh',
        y: '-30vh',
        ease: Power2.easeIn,
      },
      0.5
    )
    this._timelineLeave.set(this.$footer.current, {
      position: 'fixed',
      bottom: 0,
      y: 0,
    })
    this._timelineLeave.set(window, { scrollTo: { y: 0, x: 0 } })
    this._timelineLeave.to(
      this.$footer.current,
      1,
      {
        height: `${(window.innerWidth * 9) / 16}px`,
        y: `${top - 139.5}px`,
        bottom: 'initial',
        top: 0,
        ease: Power2.easeInOut,
      },
      1.5
    )
  }

  render() {
    const { next } = this.props

    return (
      <Container ref={this.$footer}>
        <TransitionLink
          style={{ display: 'block', height: '100%', width: '100%' }}
          to={next.fields.slug}
          exit={{
            length: 2.5,
            trigger: () => this._onLeaveAnimation(),
          }}
          entry={{
            delay: 2.5,
            trigger: () => {
              document.body.style.overflow = 'initial'
            },
          }}
        >
          <FooterCover src={next.cover.src}>
            <Background ref={this.$background} />
            <Title ref={this.$title}>{next.title}</Title>
          </FooterCover>
        </TransitionLink>
      </Container>
    )
  }
}

export default TripFooter

TripFooter.propTypes = {
  next: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    cover: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

const Container = styled.div`
  width: 100vw;
  height: 70vh;

  display: block;
  overflow: hidden;

  margin-top: 140px;

  cursor: pointer;

  transform-origin: 100%;
  will-change: transform;
`

const FooterCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${colors.blackLight};

  transform-origin: right;
  will-change: transform;
`

const Title = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  color: ${colors.white};
  font-weight: 600;
  font-size: 2em;
  letter-spacing: 12px;
  text-transform: uppercase;
  text-align: center;

  z-index: 1;
  overflow: hidden;
  will-change: transform;

  div {
    display: inline-block;
    will-change: transform;
  }
`
