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
              fluid(maxWidth: 476, quality: 90) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
            extension
            publicURL
          }
        }
      }
    }
  `);

  const {node} = useMemo(
    () => data.allFile.edges.find(({ node }) => src === node.relativePath),
    [data, src]
  );

  if (node.extension === 'svg') {
    // eslint-disable-next-line no-unused-vars
    const {imgStyle, ...safeForImgProps} = props;

    return <img src={node.publicURL} {...safeForImgProps} />;
  }
  if (node.extension === 'mp4') {
    return <video className="m-auto w-full h-full " controls>
      <source src={node.publicURL} type="video/mp4" />
    </video>
  }

  return <Img fluid={node.childImageSharp.fluid} {...props} />;

};

SharpImage.propTypes = {
  src: PropTypes.string.isRequired,
  imgStyle: PropTypes.any,
};

export default SharpImage;
