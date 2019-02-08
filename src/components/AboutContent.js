import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { device } from '../utils/breakpoints'
import { greyLight, blackLight } from '../utils/colors'

const AboutContent = ({ about }) => {
  return (
    <Content>
      <Video
        src={about.video.src}
        alt={about.video.alt}
        autoPlay
        muted
        loop
        playsInline
      />
      <Intro>{about.intro}</Intro>
      <Baseline>{about.baseline}</Baseline>
      <List>
        <ListItem>
          <b>socials</b>
          {about.socials.map((el, i) => (
            <Link
              title={el.alt}
              href={el.src}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
            >
              <Text text={el.alt}>{el.alt}</Text>
            </Link>
          ))}
        </ListItem>
        <ListItem>
          <b>site web</b>
          {about.website.map((el, i) => (
            <Link
              title={el.alt}
              href={el.src}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
            >
              <Text text={el.alt}>{el.alt}</Text>
            </Link>
          ))}
        </ListItem>
        <ListItem>
          <b>contact</b>
          {about.contact.map((el, i) => (
            <div key={i}>
              <Text>{el.alt}</Text>
            </div>
          ))}
        </ListItem>
      </List>
    </Content>
  )
}

export default AboutContent

AboutContent.propTypes = {
  about: PropTypes.shape({
    video: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }).isRequired,
    intro: PropTypes.string.isRequired,
    baseline: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
      })
    ).isRequired,
    website: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
      })
    ).isRequired,
    contact: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
}

const Content = styled.div`
  margin: 4em 12% 0 33%;

  @media ${device.smallDesktop} {
    margin-left: 12%;
    margin-right: 20;
  }

  @media ${device.tablet} {
    margin-left: 5%;
    margin-right: 5%;
  }
`

const Video = styled.video`
  position: relative;
  width: 80%;
  height: auto;
`

const Intro = styled.p`
  margin-top: 3.5em;

  font-size: 1em;
  line-height: 2em;
`

const Baseline = styled.h2`
  margin: 2.6em 0;

  font-weight: 600;
  font-size: 1.4em;
`

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  margin-bottom: 30vh;

  @media ${device.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`

const ListItem = styled.li`
  b {
    display: block;
    margin-bottom: 1.2em;

    font-size: 1em;
    line-height: 1.2em;
    font-weight: 600;

    user-select: none;
  }
`

const Link = styled.a`
  position: relative;
  display: block;

  cursor: pointer;

  :hover {
    span {
      color: ${blackLight};

      ::before {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
`

const Text = styled.span`
  position: relative;

  display: inline-block;
  padding-bottom: 0.2em;

  font-size: 0.8em;
  line-height: 1em;

  transition: color 0.3s ease-in-out;

  ::before {
    content: '';
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background-color: ${greyLight};

    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    z-index: -1;
  }
`
