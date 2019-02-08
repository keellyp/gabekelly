import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import * as colors from '../utils/colors'
import { device } from '../utils/breakpoints'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.$list = React.createRef()

    this.posX = null
    this.posY = null
  }

  state = {
    isOpen: false,
  }

  _toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  _onMouseEnterHandler = e => {
    const video = e.currentTarget.nextSibling
    video.style.opacity = 1

    this._setVideoPosition(video)
  }

  _onMouseLeaveHandler = e => {
    const video = e.currentTarget.nextSibling
    video.style.opacity = 0

    this._setVideoPosition(video)
  }

  _onMouseMoveHandler = e => {
    this.posX = e.clientX
    this.posY = e.clientY
  }

  _onMouseHoverHandler = e => {
    this._setVideoPosition(e.currentTarget.nextSibling)
  }

  _setVideoPosition(video) {
    this.bindPosX = this.posX - video.offsetWidth / 2
    this.bindPosY = this.posY - video.offsetHeight / 2

    video.style.transform = `translate(${this.bindPosX}px, ${this.bindPosY}px)`
  }

  render() {
    const links = [
      { src: '/', alt: 'Travels', bg: 'travels.mp4' },
      { src: '/about', alt: 'About us', bg: 'aboutus.mp4' },
    ]

    return (
      <React.Fragment>
        {this.state.isOpen ? (
          <Menu onMouseMove={this._onMouseMoveHandler}>
            <MenuList ref={this.$list}>
              {links.map((el, i) => (
                <li key={i} onClick={this._toggleMenu}>
                  <MenuListItem
                    onMouseEnter={this._onMouseEnterHandler}
                    onMouseLeave={this._onMouseLeaveHandler}
                    onMouseMove={this._onMouseHoverHandler}
                  >
                    <Link to={el.src}>{el.alt}</Link>
                  </MenuListItem>
                  <video
                    ref={`${this.$video}-${i}`}
                    src={`/videos/${el.bg}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </li>
              ))}
            </MenuList>
          </Menu>
        ) : null}
        <BurgerMenu onClick={this._toggleMenu}>
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
  position: fixed;
  top: 40px;
  left: 5%;
  width: 40px;
  height: 40px;

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

  position: fixed;
  top: 0;
  left: 0;

  background-color: ${colors.black};
  color: ${colors.white};

  z-index: 9;
  overflow: hidden;
`

const MenuList = styled.ul`
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    margin: 3rem 0 3rem 5%;

    video {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 360px;
      height: 240px;

      opacity: 0;
      will-change: opacity, transform;
      transition: opacity 0.3s ease-in-out;
    }
  }
`

const MenuListItem = styled.span`
  position: relative;
  display: inline-block;

  font-size: 7.4em;

  z-index: 10;

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
  @media ${device.mobile} {
    font-size: 3em;
  }
`
