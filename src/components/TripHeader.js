import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as colors from '../utils/colors'

class TripHeader extends React.Component {
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
    window.addEventListener('resize', this._resizeHandler.bind(this))
  }

  _removeEventListener() {
    window.removeEventListener('resize', this._resizeHandler.bind(this))
  }

  _resizeHandler() {
    const isTablet = window.innerWidth > 600 ? false : true
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

const Desktop = ({ tag, title, date_month, data_year }) => (
  <HeaderDesktop>
    <HeaderInfo isGrey={false}>{tag}</HeaderInfo>
    <HeaderTitle>{title}</HeaderTitle>
    <HeaderInfo isGrey={true}>
      {date_month} {data_year}
    </HeaderInfo>
  </HeaderDesktop>
)

const Mobile = ({ tag, title, date_month, data_year }) => (
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

const HeaderDesktop = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  margin-top: calc(30vh - 50px - 1em);
  margin-bottom: 1em;

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
const HeaderMobile = styled.header`
  width: 95%;
  margin-top: calc(30vh - 50px - 1em);
  margin-left: auto;
  margin-bottom: 1em;
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
`
