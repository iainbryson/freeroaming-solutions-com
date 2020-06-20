import React, { useState } from "react";
import PropTypes from "prop-types";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import remarkHtml from "remark-html";
import style from "./projectDetails.module.css";
import { TechnologyTag } from "../helpers";
import SharpImage from "../sharpImage";

import { FaArrowLeft } from "react-icons/fa";

const StepButton = (props) => {
  return (
    <button
      className={`transform bg-info-light rounded-full p-4 opacity-75 absolute z-10 ${
        props.left ? "left-0" : "right-0 rotate-180"
      }`}
      style={{
        top: "50%",
        "--transform-translate-y": "-50%",
        "--transform-translate-x": `${props.left ? "-10" : "10"}%`,
      }}
      onClick={props.onClick}
    >
      <FaArrowLeft fill="purple"></FaArrowLeft>
    </button>
  );
};

StepButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  left: PropTypes.bool.isRequired,
};

function ProjectDetails(props) {
  const { project, onClose } = props;

  const [focusAsset, setFocusAsset] = useState(0);

  const technologyTags = project.technologies.map((tech) => (
    <TechnologyTag key={tech} tech={tech} />
  ));

  const close = () => {
    onClose();
  };

  const { assets } = project;
  console.dir(assets);

  const assetComponents = assets.map((a) => {
    const assetRef = `projects/${project.id.toLowerCase()}/${a.asset}`;
    let inner;
    if (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i.test(a.asset)) {
      inner = (
        <SharpImage
          className="m-auto w-full h-full"
          src={assetRef}
        ></SharpImage>
      );
    } else if (/\.(mp4)$/i.test(a.asset)) {
      inner = (
        <video className="m-auto w-full h-full " controls>
          <source src={assetRef} type="video/mp4" />
        </video>
      );
    } else {
      inner = <div>{a.asset}</div>;
    }
    return (
      <div
        key={a.asset}
        className="absolute top-0 bottom-0 flex justify-center items-center w-full h-full "
      >
        {inner}
      </div>
    );
  });
  //  if (assets.length > 0) {
  //    heroSrc = `projects/${project.id.toLowerCase()}/${assets[0].asset}`
  //  }

  const openedClass = "modal-active";
  // const closedClass = "opacity-0 pointer-events-none";

  // https://github.com/gatsbyjs/gatsby/issues/5021
  const longDescriptionText = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(project.longDescription.join("\n") || ""); //.toString();

  const longDescription = (
    <p
      className={`${style.longDescription} `}
      dangerouslySetInnerHTML={{ __html: longDescriptionText }}
    ></p>
  );

  const prevAsset = () => {
    setFocusAsset(
      (focusAsset + assetComponents.length - 1) % assetComponents.length
    );
  };
  const nextAsset = () => {
    setFocusAsset((focusAsset + 1) % assetComponents.length);
  };

  const modal = (
    <div
      className={`z-10 modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${openedClass}`}
    >
      <div className="modal-overlay absolute w-full h-full bg-black opacity-50"></div>

      <div
        className="modal-container bg-transparent w-full lg:max-w-4xl mx-auto my-4 rounded shadow-lg z-50 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <div
          className="modal-close hidden absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
          onClick={close}
        >
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>

        <div className="modal-content text-left bg-white mx-2">
          <div className="flex justify-between items-center pb-3 py-4 px-4 lg:px-6">
            <p className="text-2xl font-titles text-brand-dark text-center">
              {project.name}
            </p>
            <div className="modal-close cursor-pointer z-50" onClick={close}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <section className="flex flex-wrap flex-row w-full py-4 px-4">
            <div className="w-full lg:w-1/2 my-auto p-4 lg:p-6">
              {longDescription}
            </div>
            <div
              className="w-full lg:w-1/2 h-40 my-auto relative"
              style={{ minHeight: "20em" }}
            >
              {assetComponents.length > 1 && (
                <StepButton onClick={prevAsset} left={true}></StepButton>
              )}
              {assetComponents[focusAsset]}
              {assetComponents.length > 1 && (
                <StepButton onClick={nextAsset} left={false}></StepButton>
              )}
            </div>
          </section>

          <div className="px-6 py-4">{technologyTags}</div>

          <div className="flex justify-end p-6">
            <button className="hidden px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
              Action
            </button>
            <button
              className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return modal;
}

ProjectDetails.propTypes = {
  project: PropTypes.any.isRequired,
  onClose: PropTypes.func,
};

export default ProjectDetails;
