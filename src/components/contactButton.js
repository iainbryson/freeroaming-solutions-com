import React from "react";
import PropTypes from "prop-types";
import {
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaEnvelope,
} from "react-icons/fa";
import style from "./contactButton.module.css";

const MEDIUM_TO_ICON = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  stackoverflow: FaStackOverflow,
};

function ContactButton(props) {
  const { medium, address } = props;

  const icon = MEDIUM_TO_ICON[medium];

  const card = (
    <a
      className={`rounded overflow-hidden shadow-lg m-4 inline-block p-1 ${style.contactButton}`}
      href={address}
    >
      {icon({ color: "red", fill: "purple" })}
      <span className=" text-brand-dark">{medium}</span>
    </a>
  );

  return card;
}

ContactButton.propTypes = {
  medium: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default ContactButton;
