import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TimelineLite, Power4 } from 'gsap'

import * as colors from '../utils/colors'
import { textSplitter, nodelistToArray } from '../utils/helpers'

class TripHeader extends React.Component {
  constructor(props) {
    super(props)
    this._maxTabletSize = 600

    this._resizeHandler = this._resizeHandler.bind(this)
  }

  state = {
    isTablet: false,
  }

  componentDidMount() {
    this._resizeHandler()
    this._setupEventListener()
  }

  componentWillUnmount() {
    this._removeEventListener()
  }

  _setupEventListener() {
    window.addEventListener('resize', this._resizeHandler)
  }

  _removeEventListener() {
    window.removeEventListener('resize', this._resizeHandler)
  }

  _resizeHandler() {
    const isTablet = window.innerWidth > this._maxTabletSize ? false : true
    this.setState({ isTablet })
  }

  render() {
    const { cover } = this.props

    return (
      <React.Fragment>
        {this.state.isTablet ? (
          <Mobile {...this.props} />
        ) : (
          <Desktop {...this.props} />
        )}
        <HeaderCover src={cover.src} alt={cover.alt} />
      </React.Fragment>
    )
  }
}

export default TripHeader

class Desktop extends React.Component {
  constructor(props) {
    super(props)
    this.$title = React.createRef()
    this.$textContainer = React.createRef()
  }

  componentDidMount() {
    this._splitText()
    this._onEnterAnimation()
  }

  _splitText() {
    textSplitter(this.$title.current)
    this._letters = nodelistToArray(this.$title.current.childNodes)
  }

  _onEnterAnimation() {
    const nodes = nodelistToArray(this.$textContainer.current.childNodes)

    this._timelineEnter = new TimelineLite()
    this._timelineEnter.staggerFromTo(
      nodes,
      0.4,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, ease: Power4.easeIn },
      0.15,
      0
    )
    this._timelineEnter.staggerFromTo(
      this._letters,
      0.4,
      { y: '100%' },
      { y: '0%', ease: Power4.easeIn },
      0.04,
      0.3
    )
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

class Mobile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tag, title, date_month, data_year } = this.props
    return (
      <HeaderMobile>
        <HeaderTitle>{title}</HeaderTitle>
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
  flex: 1;

  font-size: 1em;
  color: ${props => (props.isGrey ? colors.grey : colors.black)};
`
const HeaderTitle = styled.h1`
  flex: 2;

  font-weight: 600;
  font-size: 4em;
  line-height: 1em;
  letter-spacing: 12px;
  text-transform: uppercase;

  div {
    display: inline-block;
  }
`
const HeaderMobile = styled(BaseHeader)`
  width: 85%;

  margin-left: auto;
  margin-right: auto;
`
const HeaderSubtitle = styled.p`
  color: ${colors.grey};

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
