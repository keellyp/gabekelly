import React, { Component } from 'react'
import { graphql } from 'gatsby'

export default class trip extends Component {
  render() {
    const datas = this.props.data.json
    return (
      <div>
        <span>{datas.tag}</span>
        <h2>{datas.title}</h2>
        <span>
          {datas.date_month} {datas.data_year}
        </span>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query TripQuery($id: String!) {
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
