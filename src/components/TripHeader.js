import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TimelineLite, Power4 } from 'gsap'

import * as colors from '../utils/colors'

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
    this.transitionText = React.createRef()
  }

  componentDidMount() {
    this.onEnterAnimation()
  }

  onEnterAnimation() {
    const nodes = [].slice.call(this.transitionText.children)
    const timeline = new TimelineLite()
    timeline.staggerFromTo(
      nodes,
      0.4,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, ease: Power4.easeIn },
      0.15,
      0
    )
  }

  render() {
    const { tag, title, date_month, data_year } = this.props
    return (
      <HeaderDesktop ref={node => (this.transitionText = node)}>
        <HeaderInfo isGrey={false}>{tag}</HeaderInfo>
        <HeaderTitle>{title}</HeaderTitle>
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
    this.transitionText = React.createRef()
  }

  render() {
    const { tag, title, date_month, data_year } = this.props
    return (
      <HeaderMobile ref={node => (this.transitionText = node)}>
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
