import style from "./tooltip.module.css";
import React from "react";
import PropTypes from "prop-types";

function Tooltip(props) {
  return (
    <span className={style.tooltip}>
      {props.text}
      <span className={style.tooltipText}>
      {props.children}
      </span>
    </span>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
};

export default Tooltip;