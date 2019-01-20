export const size = {
  mobile: 375,
  tablet: 560,
  tabletLandscape: 768,
  smallDesktop: 1024,
  largeDesktop: 1980,
}

export const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  tabletLandscape: `(max-width: ${size.tabletLandscape}px)`,
  smallDesktop: `(max-width: ${size.smallDesktop}px)`,
  mediumDesktop: `(max-width: ${size.largeDesktop}px)`,
  largeDesktop: `(min-width: ${size.largeDesktop}px)`,
}
