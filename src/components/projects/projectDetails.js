import React from "react";
import PropTypes from "prop-types";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import remarkHtml from "remark-html";
import style from "./projectDetails.module.css";
import { TechnologyTag } from "../helpers";

// import { useStaticQuery, graphql } from "gatsby";
// import SharpImage from "./sharpImage";

function ProjectDetails(props) {
  const { project, onClose } = props;

  const technologyTags = project.technologies.map((tech) => (
    <TechnologyTag key={tech} tech={tech} />
  ));

  const close = () => {
    console.log("CLOSED");
    onClose();
  };
  /*
    const heros = project.assets.filter(a => a.hero);
    let heroSrc = 'defaultProjectHero.png';
    if (heros.length > 0) {
      heroSrc = `projects/${project.id.toLowerCase()}/${heros[0].asset}`
    }
  */
  const openedClass = "modal-active";
  // const closedClass = "opacity-0 pointer-events-none";

  // https://github.com/gatsbyjs/gatsby/issues/5021
  const longDescriptionText = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(project.longDescription.join("\n") || ""); //.toString();

  const longDescription = (
    <p
      className={style.longDescription}
      dangerouslySetInnerHTML={{ __html: longDescriptionText }}
    ></p>
  );

  const modal = (
    <div
      className={`z-10 modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${openedClass}`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 xl:max-w-full mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div
          className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
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

        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
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

          <p className="text-l font-brand-dark">{project.description}</p>

          {longDescription}

          <div className="px-6 py-4">{technologyTags}</div>

          <div className="flex justify-end pt-2">
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
