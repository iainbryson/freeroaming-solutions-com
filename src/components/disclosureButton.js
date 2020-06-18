import React, {useState} from "react";
import PropTypes from "prop-types";
import { FaArrowDown } from 'react-icons/fa';
import style from "./disclosureButton.module.css";

const scrolTo = (top) => window.scroll({top, behavior: 'smooth'});

function determineRelation(location, rect, viewHeight) {
  if (!rect || !location) return 'below';

  if (location > (rect.top + rect.height + viewHeight * 0.50)) {
    return 'above';
  } else if (location > (rect.top - viewHeight * 0.70)) {
    return 'within';
  } else {
    return 'below';
  }
}

function DisclosureButton(props) {
  const { text, location, stowed, link } = props;

  const [viewHeight] = useState(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));

  let element = null, rect = null;

  element ||= document.querySelector('#'+link);
  rect ||= element?.getBoundingClientRect();

  const relation = determineRelation(location, rect, viewHeight);
  // console.log(`${location} > ${rect.top} + ${rect.height}`);
  // console.log(location, link, viewHeight, relation);

  let classExtras = [style.disclosureButton] ;
  classExtras.push(stowed ? style.stowed : style.entrance);
  classExtras.push(style[relation]);

  const card =
    <button
      className={`rounded overflow-hidden shadow-lg mx-4 inline-block p-1 ${classExtras.join(' ')}`}
      onClick={() => scrolTo(rect?.top - 100)}
    >
      <FaArrowDown fill='purple'></FaArrowDown>
      <span className=" text-brand-dark">{text}</span>
    </button>;

  return card;
}

DisclosureButton.propTypes = {
  text: PropTypes.string.isRequired,
  location: PropTypes.number.isRequired,
  stowed: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired
};

export default DisclosureButton;
