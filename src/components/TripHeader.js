import React from 'react'
import styled from 'styled-components'

const TripHeader = ({ tag, title, date_month, data_year, cover }) => {
  return (
    <React.Fragment>
      <Header>
        <HeaderInfo>{tag}</HeaderInfo>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderInfo>
          {date_month} {data_year}
        </HeaderInfo>
      </Header>
      <HeaderCover src={cover.src} alt={cover.alt} />
    </React.Fragment>
  )
}

export default TripHeader

const Header = styled.div`
  display: flex;
`
const HeaderInfo = styled.span`
  flex: 1;
`
const HeaderTitle = styled.h1`
  flex: 2;
`
const HeaderCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`
