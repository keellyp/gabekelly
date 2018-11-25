import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import * as colors from '../utils/colors'

import Layout from '../components/Layout'

class about extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout isDark={true}>
          <Container>
            <MainTitle>
              <span>TRAVELERS & DEVELOPERS</span>
            </MainTitle>
            <Content>
              <Image src="/img/aboutus.jpg" alt="about us" />
              <Intro>
                You love having a second home but the mortgage is putting a
                crater in your wallet. Many second home owners turn to renting
                their property as a vacation rental to help defray the costs of
                ownership. How do you price a vacation home rental without
                overcharging but making enough to cover your costs? Do your
                research.
              </Intro>
              <Baseline>Freelancers . Globe trotters . Frenchies</Baseline>
              <List>
                <ListItem>
                  <b>socials</b>
                  <span>@keellyp</span>
                  <span>@gabrielstik</span>
                </ListItem>
                <ListItem>
                  <b>site web</b>
                  <span>kellyphan.fr</span>
                  <span>gabrielstik.fr</span>
                </ListItem>
                <ListItem>
                  <b>contact</b>
                  <span>tvk.phan@gmail.com</span>
                  <span>gabriel.stik@gmail.com</span>
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
  width: 100%;
  height: auto;
  min-height: 100vh;

  color: ${colors.greyLight};
  background-color: ${colors.blackLight};
`

const MainTitle = styled.h1`
  width: 2000px;

  margin-left: 10%;

  overflow: hidden;

  span {
    display: block;

    font-weight: 400;
    font-size: 8.2em;
  }
`

const Content = styled.div`
  margin: 4em 30% 0 20%;
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
  color: ${colors.white};
`

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
`

const ListItem = styled.li`
  margin-bottom: 30vh;

  * {
    display: block;

    font-size: 1.2em;
    line-height: 1.2em;
  }

  b {
    padding-bottom: 0.5em;

    font-weight: 600;
  }

  span {
    padding-bottom: 0.2em;
  }
`
