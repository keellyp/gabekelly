import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TimelineLite, Power4 } from 'gsap'

import * as colors from '../utils/colors'
import { size } from '../utils/breakpoints'
import { textSplitter, nodelistToArray } from '../utils/helpers'

class TripHeader extends React.Component {
  constructor(props) {
    super(props)

    // Binding
    this._resizeHandler = this._resizeHandler.bind(this)

    // Create variables
    this._tabletLandscape = size.tabletLandscape
    this._letters = null
    this._words = null
    this._timelineEnter = null
    this.timelineLeave = null
  }

  state = {
    isTablet: false,
  }

  componentDidMount() {
    this._resizeHandler()
    this._setupEventListener()

    this._splitText()
    this._onEnterAnimation()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isTablet !== prevState.isTablet) {
      this._splitText()
      this._onEnterAnimation()
    }
  }

  componentWillUnmount() {
    this._removeEventListener()

    if (this._timelineEnter) {
      this._timelineEnter.kill()
    }
    if (this.timelineLeave) {
      this.timelineLeave.kill()
    }
  }

  // Will be pass by props to footer component
  // Will be launch before route leave
  onLeaveAnimation() {
    this.timelineLeave = new TimelineLite()
    this.timelineLeave.staggerTo(
      this.header.$textContainer.current.childNodes,
      0.3,
      {
        y: '100%',
        opacity: 0,
      }
    )
  }

  _setupEventListener() {
    window.addEventListener('resize', this._resizeHandler)
  }

  _removeEventListener() {
    window.removeEventListener('resize', this._resizeHandler)
  }

  _resizeHandler() {
    const isTablet = window.innerWidth > this._tabletLandscape ? false : true
    this.setState({ isTablet })
  }

  _splitText() {
    // First split header text
    // Then push it in this._letters variable
    textSplitter(this.header.$title.current)
    this._letters = nodelistToArray(this.header.$title.current.childNodes)
  }

  _onEnterAnimation() {
    this._words = nodelistToArray(this.header.$textContainer.current.childNodes)

    this._timelineEnter = new TimelineLite()

    this._timelineEnter.set(this._words, { y: '110%', opacity: 0 })
    this._timelineEnter.set(this._letters, { y: '110%' })

    this._timelineEnter.staggerTo(
      this._words,
      .5,
      { y: '0%', opacity: 1, ease: Power4.easeOut },
      0.1,
      .5
    )
    this._timelineEnter.staggerTo(
      this._letters,
      1.2,
      { y: '0%', ease: Power4.easeOut },
      0.04,
      0.75
    )
  }

  render() {
    const { cover } = this.props

    return (
      <React.Fragment>
        {this.state.isTablet ? (
          <Mobile {...this.props} ref={node => (this.header = node)} />
        ) : (
          <Desktop {...this.props} ref={node => (this.header = node)} />
        )}
        <HeaderCover src={cover.src} alt={cover.alt} />
      </React.Fragment>
    )
  }
}

export default TripHeader

TripHeader.propTypes = {
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date_month: PropTypes.string.isRequired,
  data_year: PropTypes.number.isRequired,
  cover: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
}

class Mobile extends React.Component {
  constructor(props) {
    super(props)

    this.$title = React.createRef()
    this.$textContainer = React.createRef()
  }

  render() {
    const { tag, title, date_month, data_year } = this.props
    return (
      <HeaderMobile ref={this.$textContainer}>
        <HeaderTitle ref={this.$title}>{title}</HeaderTitle>
        <HeaderSubtitle>
          {tag},{' '}
          <span>
            {date_month} {data_year}
          </span>
        </HeaderSubtitle>
      </HeaderMobile>
    )
  }
}

class Desktop extends React.Component {
  constructor(props) {
    super(props)

    this.$title = React.createRef()
    this.$textContainer = React.createRef()
  }

  render() {
    const { tag, title, date_month, data_year } = this.props

    return (
      <HeaderDesktop ref={this.$textContainer}>
        <HeaderInfo isGrey={false}>{tag}</HeaderInfo>
        <HeaderTitle ref={this.$title}>{title}</HeaderTitle>
        <HeaderInfo isGrey={true}>
          {date_month} {data_year}
        </HeaderInfo>
      </HeaderDesktop>
    )
  }
}

// (100vh - AppCoverHeight) / 2 - HeaderInfoHeight - BaseHeaderMarginBottom)
const BaseHeader = styled.header`
  margin-top: calc(28.5vh - 54px - 1em);
  margin-bottom: 1em;

  overflow: hidden;
`

const HeaderDesktop = styled(BaseHeader)`
  height: 54px;

  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  user-select: none;
`
const HeaderInfo = styled.span`
  height: 100%;
  flex: 1;

  font-size: 1em;
  color: ${props => (props.isGrey ? colors.grey : colors.black)};

  line-height: 54px;
  will-change: transform;
`
const HeaderTitle = styled.h1`
  flex: 2;

  font-weight: 600;
  font-size: 2em;
  line-height: 1em;
  letter-spacing: 12px;
  text-transform: uppercase;
  overflow: hidden;

  div {
    display: inline-block;
    will-change: transform;
  }
`
const HeaderMobile = styled(BaseHeader)`
  width: 85%;

  margin-left: auto;
  margin-right: auto;
`
const HeaderSubtitle = styled.p`
  color: ${colors.grey};
  will-change: transform;

  span {
    font-style: italic;
  }
`
const HeaderCover = styled.img`
  width: 100vw;
  height: calc(100vw * 9 / 16);

  object-fit: cover;
  object-position: center;

  transform: translate(0);
`
