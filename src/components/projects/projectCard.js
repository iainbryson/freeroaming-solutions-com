import React from "react";
import PropTypes from "prop-types";
import SharpImage from "../sharpImage";
import { TechnologyTag } from "../helpers";

function ProjectCard(props) {
  const { project, key } = props;

  const technologyTags = project.technologies.map((tech) => (
    <TechnologyTag key={tech} tech={tech} />
  ));

  const heros = project.assets.filter((a) => a.hero);

  let heroSrc = "defaultProjectHero.png";
  if (heros.length > 0) {
    heroSrc = `projects/${project.id.toLowerCase()}/${heros[0].asset}`;
  }

  const card = (
    <li key={key} className="w-full lg:w-1/2 xl:w-1/2 lg:px-2 mx-auto">
      <section
        className="rounded overflow-hidden shadow-lg m-4 bg-gray-lightest transform transition-transform duration-300 ease-in-out hover:scale-105"
        onClick={() => props.onClick(project)}
      >
        <SharpImage
          className="w-full h-64 mx-auto"
          src={heroSrc}
          imgStyle={{ objectPosition: "center 0" }}
        ></SharpImage>
        <div className="px-6 py-4">
          <div className="font-brand text-black text-xl mb-2">
            {project.name}
          </div>
          <p className="text-gray-darker text-base text-left">
            {project.description.join("\n")}
          </p>
        </div>
        <div className="px-6 py-4">{technologyTags}</div>
      </section>
    </li>
  );
  return card;
}

ProjectCard.propTypes = {
  project: PropTypes.any.isRequired,
  onClick: PropTypes.func,
};

export default ProjectCard;
