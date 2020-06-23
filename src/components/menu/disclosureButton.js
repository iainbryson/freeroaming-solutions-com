import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaArrowDown } from "react-icons/fa";
import style from "./disclosureButton.module.css";

const scrollTo = (top) => window?.scroll({ top, behavior: "smooth" });

// TODO: intersection observer would be better here
// TODO: handle resize
function determineRelation(location, rect, viewHeight) {
  if (!rect || !location) return "below";

  if (rect.bottom < viewHeight * 0.33) {
    return "above";
  } else if (rect.bottom > viewHeight * 0.33 && rect.top < viewHeight * 0.33) {
    return "within";
  } else {
    return "below";
  }
}

function DisclosureButton(props) {
  const { text, location, stowed, link } = props;

  const [viewHeight] = useState(
    Math.max(document.documentElement.clientHeight, window?.innerHeight ?? 0)
  );

  let element = null,
    rect = null;

  element ||= document.querySelector("#" + link);
  rect ||= element?.getBoundingClientRect();

  const relation = determineRelation(location, rect, viewHeight);
  if (rect) {
    // console.log(`${text}: ${location} [${viewHeight}] - ${JSON.stringify(rect)}`);
    // console.log(location, link, viewHeight, relation);
  }

  let classExtras = [style.disclosureButton];
  classExtras.push(stowed ? style.stowed : style.entrance);
  classExtras.push(style[relation]);

  const card = (
    <button
      className={`rounded-full overflow-hidden shadow-lg mx-1 lg:mx-4 inline-block p-3 ${classExtras.join(
        " "
      )}`}
      onClick={() => scrollTo(rect?.top + location)}
    >
      <FaArrowDown fill="purple"></FaArrowDown>
      <span className=" text-brand-dark">{text}</span>
    </button>
  );

  return card;
}

DisclosureButton.propTypes = {
  text: PropTypes.string.isRequired,
  location: PropTypes.number.isRequired,
  stowed: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
};

export default DisclosureButton;
