module.exports = {
  pathPrefix: '/website',
  siteMetadata: {
    title: `疏旺的简历`,
    description: `shuwan9's resume`,
    author: `@shuwan9`,
    myCssSrc: 'https://cdn.repository.webfont.com/webfonts/nomal/95877/46489/5e17f7f8f629d8048005cfd2.css',
    myFontFamily: 'jin_mei_mxplzx1e32c9eb3217685'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['cabin', 'Open Sans'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/static`,
      },
    },
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`, // these have broken mozjpeg dependency
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `good-data-movement`,
        short_name: `gdm`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/static/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
};
