const path = require('path')

export const datas = {
  about: {
    title: 'Travelers & Developers',
    image: {
      src: path.resolve(__dirname, '/img/aboutus.jpg'),
      alt: 'Gabe & Kelly during FootballWorld Cup 2018',
    },
    intro:
      'You love having a second home but the mortgage is putting a crater in your wallet. Many second home owners turn to renting their property as a vacation rental to help defray the costs of ownership. How do you price a vacation home rental without overcharging but making enough to cover your costs? Do your research.',
    baseline: 'Freelancers . Globe trotters . Frenchies',
    socials: [
      {
        alt: '@keellyp',
        src: 'https://twitter.com/keellyp',
      },
      {
        alt: '@gabrielstik',
        src: 'https://twitter.com/gabrielstik',
      },
    ],
    website: [
      {
        alt: 'kellyphan.fr',
        src: 'https://kellyphan.fr',
      },
      {
        alt: 'gabrielstik.fr',
        src: 'https://gabrielstik.fr',
      },
    ],
    contact: [
      {
        alt: 'tvk.phan [at] gmail.com',
        src: 'tvk.phan@gmail.com',
      },
      {
        alt: 'gabriel.stik [at] gmail.com',
        src: 'gabriel.stik@gmail.com',
      },
    ],
  },
}
