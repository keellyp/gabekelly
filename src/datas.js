const path = require('path')

export const datas = {
  about: {
    title: 'Developers & Travelers',
    video: {
      src: path.resolve(__dirname, '/videos/us.mp4'),
      alt: 'Gabe & Kelly during FootballWorld Cup 2018',
    },
    intro:
      'We are Kelly Phan and Gabriel Stik, two French frontend developers based in Paris. We like to travel the world to create our own memories and that\'s why we created this website. We wanted to archive our travels in a piece of our savoir-faire. Gabe&Kelly is our travel blog where we share our best pictures from countries we had the chance to explore.',
    baseline: 'Freelancers . Globe trotters . Frenchies',
    socials: [
      {
        alt: '@keellyp',
        src: 'https://twitter.com/keellyp',
      },
      {
        alt: '@gabriel_stik',
        src: 'https://twitter.com/gabriel_stik',
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
