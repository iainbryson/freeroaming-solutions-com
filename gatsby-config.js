const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Freeroaming Solutions`,
    description: `Contract and Freelance Software Development`,
    author: `Iain Bryson`,
    url: `https://freeroamingsolutions.com`,
    contacts: {
      email: "iain@iain-bryson.ca",
      linkedin: "https://www.linkedin.com/in/iainbryson",
    },
    profiles: {
      github: "http://github.com/iainbryson",
      stackoverflow: "https://stackoverflow.com/users/5673187/iain-bryson",
    },
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal["400"],
        display: `minimal-ui`,
        icon: `src/images/iconmonstr-globe-4-icon.svg`,
      },
    },

    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: "data",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-import")(), // Add support for sass-like '@import'
          require("postcss-extend")(), // Add support for sass-like '@extend'
          require("postcss-nesting")(), // Add support for sass-like nesting of rules
          require(`postcss-preset-env`)({
            stage: 3, // More info about stages: https://cssdb.org/#staging-process
          }),
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          //          families: ['Palatino Sans Arabic']
          families: ["Cormorant Infant"],
        },
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-nullish-coalescing-operator`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "freeroamingsolutions.com",
      },
    },
  ],
};
