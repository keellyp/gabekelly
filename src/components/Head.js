import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const Head = ({ data }) => {
  const {
    siteLanguage,
    siteTitle,
    siteDescription,
    favicon,
  } = data.site.siteMetadata
  return (
    <Helmet>
      <html lang={siteLanguage} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="apple-touch-icon" sizes="180x180" href={favicon.apple} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon.large} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon.small} />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href={favicon.safari} color="#000000" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

const HeadWithQuery = props => {
  console.log(props)
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              siteLanguage
              siteTitle
              siteDescription
              siteLogo
              favicon {
                ico
                small
                large
                apple
                androidSmall
                androidLarge
                ms
                safari
              }
            }
          }
        }
      `}
      render={data => <Head data={data} {...props} />}
    />
  )
}

export default HeadWithQuery

export const Metatags = props => {
  return (
    <Helmet
      title={props.title}
      meta={[
        { name: 'title', content: props.title },
        { name: 'description', content: props.description },
        {
          property: 'og:title',
          content: props.title,
        },
        {
          property: 'og:url',
          content: props.pathname ? props.url + props.pathname : props.url,
        },
        {
          property: 'og:image',
          content: props.thumbnail && props.thumbnail,
        },
        {
          property: 'og:image:secure_url',
          content: props.thumbnail && props.thumbnail,
        },
        {
          property: 'og:description',
          content: props.description,
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:locale',
          content: 'en',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: props.title },
        {
          name: 'twitter:description',
          content: props.description,
        },
        {
          name: 'twitter:image',
          content: props.thumbnail && props.thumbnail,
        },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },
        { name: 'twitter:creator', content: '@keellyp' },
        { property: 'og:site_name', content: 'yoursitename' },
      ]}
    >
      <html lang="en" />
    </Helmet>
  )
}
