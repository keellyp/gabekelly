const path = require('path')

module.exports = {
  siteLanguage: 'en',
  siteTitle: 'Gabe & Kelly',
  siteDescription: 'Gabe & Kelly is a way to keep our memories alive.',
  siteUrl: 'https://d-gabekelly.netlify.com/',
  siteLogo: path.resolve(__dirname, '/img/logo.jpg'),
  favicon: {
    ico: path.resolve(__dirname, '/favicon.ico'),
    small: path.resolve(__dirname, '/favicon-16x16.png'),
    large: path.resolve(__dirname, '/favicon-32x32.png'),
    apple: path.resolve(__dirname, '/apple-touch-icon.png'),
    androidSmall: path.resolve(__dirname, '/android-chrome-192x192.png'),
    androidLarge: path.resolve(__dirname, '/android-chrome-512x512.png'),
    ms: path.resolve(__dirname, '/mstile-150x150.png'),
    safari: path.resolve(__dirname, '/safari-pinned-tab.svg'),
  },
}
