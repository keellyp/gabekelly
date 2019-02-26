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

  componentDidMount() {
    if (typeof document !== 'undefined') {
      this.footer.props.config.root = document.body.querySelector('.footer')
    }
  }

  _loopIntoGalleries() {
    this._grids = []
    this._images = []

    const pictures = this.props.data.gallery.edges
    for (let i = 0; i < pictures.length; i++) {
      const el = pictures[i].node.childImageSharp.fluid
      this._images.push({
        srcSet: el.srcSet,
        name: el.originalName,
        src: el.src,
      })
    }

    for (let i = 0; i < this._galleries.length; i++) {
      const el = this._galleries[i]
      const images = el.images

      for (let j = 0; j < images.length; j++) {
        this._images.filter(image => {
          if (image.name === images[j].name) {
            images[j].srcSet = image.srcSet
            images[j].src = image.src
          }
        })
      }
      switch (el.type) {
      case '1-full':
        this._grids.push(
          <Grids.OneFull
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      case '1-square':
        this._grids.push(
          <Grids.OneSquare
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      case '2-landscape-portrait':
        this._grids.push(
          <Grids.TwoLandscapePortrait
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      case '2-square-portrait':
        this._grids.push(
          <Grids.TwoSquarePortrait
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      case '3-mosaic':
        this._grids.push(
          <Grids.ThreeMosaic
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      case '3-squares':
        this._grids.push(
          <Grids.ThreeSquares
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      case '4-squares':
        this._grids.push(
          <Grids.FourSquares
            key={this._grids.length}
            images={el.images}
            position={el.position}
          />
        )
        break
      default:
        break
      }
    }
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
              ref={n => (this.footer = n)}
              next={datas.nextItem}
              className="footer"
              config={{
                root: '',
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
  query TripQuery($id: String!, $next: String!, $slug: String!) {
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
            name
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
    gallery: allFile(filter: { relativeDirectory: { regex: $slug } }) {
      edges {
        node {
          childImageSharp {
            fluid(srcSetBreakpoints: [375, 560, 768, 1024, 1980]) {
              src
              srcSet
              originalName
            }
          }
        }
      }
    }
  }
`
