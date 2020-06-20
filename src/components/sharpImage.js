import React, { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";

const SharpImage = ({ src, ...props }) => {
  // .*.(?!svg$)[^.]+
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { internal: { mediaType: { regex: "images/" } } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 424) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
        }
      }
    }
  `);

  const match = useMemo(
    () => data.allFile.edges.find(({ node }) => src === node.relativePath),
    [data, src]
  );

  return <Img fluid={match.node.childImageSharp.fluid} {...props} />;
};

SharpImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default SharpImage;
