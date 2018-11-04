import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

const Header = () => (
  <BurgerMenu>
    <BurgerLine />
    <BurgerLine />
  </BurgerMenu>
)

export default Header

const BurgerMenu = styled.header`
  position: absolute;
  top: 50px;
  left: 50px;
`
const BurgerLine = styled.span`
  display: block;
  width: 30px;
  height: 4px;
  margin: 10px 0;
  background-color: #000;
`
