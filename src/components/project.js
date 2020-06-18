import React from "react";
import PropTypes from "prop-types";
import SharpImage from "./sharpImage";

function Project(props) {
  const { project, key } = props;

  const technologyTags = project.technologies.map(tech => (<span key={tech}
      className="inline-block bg-info-light rounded-full px-3 py-1 text-sm font-semibold text-brand m-1 mr-2">{tech}
  </span>));

  const heros = project.assets.filter(a => a.hero);

  let heroSrc = 'defaultProjectHero.png';
  if (heros.length > 0) {
    heroSrc = `projects/${project.id.toLowerCase()}/${heros[0].asset}`
  }

  console.dir(project);

  const card = <li key={key} className="w-full lg:w-1/2 xl:w-1/2 px-2 mx-auto">
    <section className="rounded overflow-hidden shadow-lg m-4 bg-gray-lightest transform transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => props.onClick(project)}>
      <SharpImage className="w-full" src={heroSrc}></SharpImage>
      <div className="px-6 py-4">
        <div className="font-brand text-black text-xl mb-2">{ project.name }</div>
        <p className="text-gray-darker text-base text-left">
          { project.description.join('\n') }
        </p>
      </div>
      <div className="px-6 py-4">
        {technologyTags}
      </div>
    </section>
  </li>;
  return card;
}

Project.propTypes = {
  project: PropTypes.any.isRequired,
  onClick: PropTypes.func
};

export default Project;
