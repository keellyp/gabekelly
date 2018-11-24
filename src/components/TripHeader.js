import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import * as colors from '../utils/colors'

const TripHeader = ({ tag, title, date_month, data_year, cover }) => {
  return (
    <React.Fragment>
      <Header>
        <HeaderInfo isGrey={false}>{tag}</HeaderInfo>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderInfo isGrey={true}>
          {date_month} {data_year}
        </HeaderInfo>
      </Header>
      <HeaderCover src={cover.src} alt={cover.alt} />
    </React.Fragment>
  )
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

const Header = styled.div`
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
const HeaderCover = styled.img`
  width: 100vw;
  height: calc(100vw * 9 / 16);

  object-fit: cover;
  object-position: center;
`
