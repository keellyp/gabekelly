const size = {
  mobile: '375px',
  tablet: '560px',
  tabletLandscape: '768px',
  smallDesktop: '1024px',
  largeDesktop: '1980px',
}

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletLandscape: `(max-width: ${size.tabletLandscape})`,
  smallDesktop: `(max-width: ${size.smallDesktop})`,
  mediumDesktop: `(max-width: ${size.largeDesktop})`,
  largeDesktop: `(min-width: ${size.largeDesktop})`,
}
