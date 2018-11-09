import React, { Component } from 'react'
import { graphql } from 'gatsby'

import { Metatags } from '../components/Head'
import Layout from '../components/layout'

export default class trip extends Component {
  render() {
    const datas = this.props.data
    const url = ''
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
