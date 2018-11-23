import React, { Component } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Metatags } from '../components/Head'
import Layout from '../components/Layout'

import TripHeader from '../components/TripHeader'
import TripContent from '../components/TripContent'
import * as Grids from '../components/TripGallery'
import TripFooter from '../components/TripFooter'

export default class trip extends Component {
  constructor(props) {
    super(props)
    this._grids = []
    this._galleries = this.props.data.currentItem.content.gallery
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
            title={`${datas.site.siteMetadata.siteTitle} - ${
              datas.currentItem.title
            }`}
            description={datas.currentItem.meta_description}
            thumbnail={url + datas.currentItem.meta_thumbnail}
            url={url}
          />

          <TripHeader
            tag={datas.currentItem.tag}
            title={datas.currentItem.title}
            date_month={datas.currentItem.date_month}
            data_year={datas.currentItem.data_year}
            cover={datas.currentItem.cover}
          />
          <TripContent content={datas.currentItem.content}>
            {this._grids}
          </TripContent>
          <TripFooter next={datas.nextItem} />
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
