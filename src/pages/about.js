import React, { Component } from 'react'
import styled from 'styled-components'

import { device } from '../utils/breakpoints'

import { Layout } from '../app'

import { datas } from '../datas'

class about extends Component {
  render() {
    const { about } = datas
    return (
      <React.Fragment>
        <Layout isDark={true}>
          <Container>
            <MainTitle>
              <span>{about.title}</span>
            </MainTitle>
            <Content>
              <Image src={about.image.src} alt={about.image.alt} />
              <Intro>{about.intro}</Intro>
              <Baseline>{about.baseline}</Baseline>
              <List>
                <ListItem>
                  <b>socials</b>
                  {about.socials.map((el, i) => (
                    <a
                      title={el.alt}
                      href={el.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={i}
                    >
                      <span>{el.alt}</span>
                    </a>
                  ))}
                </ListItem>
                <ListItem>
                  <b>site web</b>
                  {about.website.map((el, i) => (
                    <a
                      title={el.alt}
                      href={el.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={i}
                    >
                      <span>{el.alt}</span>
                    </a>
                  ))}
                </ListItem>
                <ListItem>
                  <b>contact</b>
                  {about.contact.map((el, i) => (
                    <span key={i}>{el.alt}</span>
                  ))}
                </ListItem>
              </List>
            </Content>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}
export default about

const Container = styled.section`
  overflow-x: hidden;

  padding-top: 40vh;
`

const MainTitle = styled.h1`
  width: 2000px;

  margin-left: 10%;

  overflow: hidden;

  span {
    display: block;

    font-weight: 400;
    font-size: 8.2em;

    text-transform: uppercase;

    @media ${device.tabletLandscape} {
      font-size: 6.2em;
    }

    @media ${device.tablet} {
      font-size: 3.2em;
    }
  }

  @media ${device.tablet} {
    margin-left: 5%;
  }
`

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

const Image = styled.img`
  width: 80%;
  height: auto;
`

const Intro = styled.p`
  margin-top: 3.5em;

  font-size: 1.6em;
  line-height: 2em;
`

const Baseline = styled.h2`
  margin: 2.6em 0;

  font-weight: 600;
  font-size: 2.4em;
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
    padding-bottom: 0.5em;

    font-size: 1.2em;
    line-height: 1.2em;
    font-weight: 600;

    user-select: none;
  }

  span {
    display: block;
    padding-bottom: 0.2em;

    font-size: 1.2em;
    line-height: 1.2em;

    cursor: pointer;
  }
`
