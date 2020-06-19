import PropTypes from "prop-types";
import React from "react";

export function TechnologyTag(props) {
  return (
    <span
      key={props.tech}
      className="inline-block bg-info-light rounded-full px-3 py-1 text-sm font-semibold text-brand m-1 mr-2"
    >
      {props.tech}
    </span>
  );
}

TechnologyTag.propTypes = { tech: PropTypes.string.isRequired };
