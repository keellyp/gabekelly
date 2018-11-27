import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import * as colors from '../utils/colors'
import { device } from '../utils/breakpoints'

export default class Header extends Component {
  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Menu>
            <MenuList>
              <li onClick={this.toggleMenu}>
                <MenuListItem>
                  <Link to="/">Travels</Link>
                </MenuListItem>
              </li>
              <li onClick={this.toggleMenu}>
                <MenuListItem>
                  <Link to="/about">About us</Link>
                </MenuListItem>
              </li>
            </MenuList>
          </Menu>
        ) : null}
        <BurgerMenu onClick={this.toggleMenu}>
          <Line
            isOpen={this.state.isOpen}
            isDark={this.props.isDark}
            className="line--left"
          />
          <Line
            isOpen={this.state.isOpen}
            isDark={this.props.isDark}
            className="line--right"
          />
        </BurgerMenu>
      </React.Fragment>
    )
  }
}

const BurgerMenu = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;

  z-index: 10;
  cursor: pointer;

  &:hover {
    .line--left {
      transform: translateY(7px);
    }
    .line--right {
      transform: translateY(-7px);
    }
  }
`
const Line = styled.span`
  width: 30px;
  height: 4px;
  display: block;

  margin-top: 10px;
  background-color: ${props =>
    props.isOpen || props.isDark ? colors.white : colors.black};

  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.line--left {
    transform: ${props =>
      props.isOpen ? 'translateY(7px) rotate(45deg)' : ''};
  }

  &.line--right {
    transform: ${props =>
      props.isOpen ? 'translateY(-7px) rotate(-45deg)' : ''};
  }
`
const Menu = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  background-color: ${colors.blackLight};
  color: ${colors.white};

  z-index: 9;
`

const MenuList = styled.ul`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 40px;
`

const MenuListItem = styled.span`
  position: relative;
  display: inline-block;

  text-transform: uppercase;
  font-size: 9.25em;

  &::before {
    content: '';

    width: 100%;
    height: 0.05em;

    position: absolute;
    top: 1.2em;
    left: 0;

    background-color: ${colors.white};

    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media ${device.tablet} {
    font-size: 6em;
  }
`
