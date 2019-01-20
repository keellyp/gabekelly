import React, { Component } from 'react'
import { graphql } from 'gatsby'

import { Layout, TripHeader, TripContent, TripFooter } from '../app'
import { Metatags } from '../components/Head'
import * as Grids from '../components/TripGallery'

import withIntersectionObserver from '../utils/withIntersectionObserver'

const Footer = withIntersectionObserver(TripFooter)

export default class trip extends Component {
  constructor(props) {
    super(props)
    this._grids = []
    this._galleries = this.props.data.currentItem.content.gallery
  }

  componentDidMount() {}

  _loopIntoGalleries() {
    this._grids = []

    this._galleries.forEach(el => {
      switch (el.type) {
      case '1-full':
        return this._grids.push(
          <Grids.OneFull
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      case '1-square':
        return this._grids.push(
          <Grids.OneSquare
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      case '2-landscape-portrait':
        return this._grids.push(
          <Grids.TwoLandscapePortrait
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      case '2-square-portrait':
        return this._grids.push(
          <Grids.TwoSquarePortrait
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      case '3-mosaic':
        return this._grids.push(
          <Grids.ThreeMosaic
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      case '3-squares':
        return this._grids.push(
          <Grids.ThreeSquares
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      case '4-squares':
        return this._grids.push(
          <Grids.FourSquares
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
      default:
        break
      }
    })
  }

  render() {
    const datas = this.props.data
    const url = ''

    this._loopIntoGalleries()

    return (
      <React.Fragment>
        <Layout>
          <Metatags
            title={`${datas.site.siteMetadata.siteTitle} - ${
              datas.currentItem.title
            }`}
            description={datas.currentItem.meta_description}
            thumbnail={url + datas.currentItem.meta_thumbnail}
            url={url}
          />
          <div>
            <TripHeader
              tag={datas.currentItem.tag}
              title={datas.currentItem.title}
              date_month={datas.currentItem.date_month}
              data_year={datas.currentItem.data_year}
              cover={datas.currentItem.cover}
              ref={node => (this.tripHeader = node)}
            />
            <TripContent
              content={datas.currentItem.content}
              className="galleryContainer"
            >
              {this._grids}
            </TripContent>
            <Footer
              next={datas.nextItem}
              className="footer"
              config={{
                root: document.querySelector('.footer'),
                rootMargin: '0px 0px 200px 0px',
              }}
              beforeLeave={() => this.tripHeader.onLeaveAnimation()}
            />
          </div>
        </Layout>
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query TripQuery($id: String!, $next: String!) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    currentItem: json(id: { eq: $id }) {
      title
      tag
      data_year
      date_month
      cover {
        alt
        src
      }
      meta_description
      meta_thumbnail {
        alt
        src
      }
      content {
        title
        text
        gallery {
          type
          position
          images {
            alt
            src
            position
          }
        }
      }
    }
    nextItem: json(id: { eq: $next }) {
      title
      cover {
        alt
        src
      }
      fields {
        slug
      }
    }
  }
`
