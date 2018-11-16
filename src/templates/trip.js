import React, { Component } from 'react'
import { graphql } from 'gatsby'

import { Metatags } from '../components/Head'
import Layout from '../components/Layout'
import * as Grids from '../components/Gallery'

export default class trip extends Component {
  constructor(props) {
    super(props)
    this._grids = []
    this._galleries = this.props.data.json.content.gallery
  }

  _loopIntoGalleries() {
    this._galleries.map(el => {
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
            title={`${datas.site.siteMetadata.siteTitle} - ${datas.json.title}`}
            description={datas.json.meta_description}
            thumbnail={url + datas.json.meta_thumbnail}
            url={url}
          />
          <span>{datas.json.tag}</span>
          <h2>{datas.json.title}</h2>
          <span>
            {datas.json.date_month} {datas.json.data_year}
          </span>
          {this._grids}
        </Layout>
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query TripQuery($id: String!) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    json(id: { eq: $id }) {
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
  }
`
