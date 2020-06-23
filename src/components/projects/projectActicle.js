import React, { useEffect, useState } from "react";
import ProjectDetails from "./projectDetails";
import ProjectCard from "./projectCard";
import * as PropTypes from "prop-types";
import { queryAllProjects } from "../projectsQuery";

function ProjectArticle(props) {
  const cardHeaderStyle = "inline-block p-3 mb-4 mx-4 text-4xl font-titles text-brand-dark";

  const [state, setState] = useState({
    focusProject: null,
  });

  const setFocusProject = (project) => {
    setState({
      ...state,
      focusProject: { ...project },
    });
  };

  useEffect(() => {}, [state.focusProject]);

  const focusModal = state.focusProject?.id ? (
    <ProjectDetails
      project={state.focusProject}
      onClose={() => setFocusProject(null)}
    ></ProjectDetails>
  ) : (
    <div></div>
  );
  const allProjects = queryAllProjects();
  const projectComponents = allProjects.map((project) =>
    ProjectCard({ key: project.id, project, onClick: setFocusProject })
  );

  return (
    <article key={props.anchorId} id={props.anchorId}>
      {focusModal}
      <h2 className={cardHeaderStyle}>
        Portfolio
      </h2>
      <ul className="container mx-auto flex flex-wrap mb-4 lg:p-3 w-full">
        {projectComponents}
      </ul>
    </article>
  );
}

ProjectArticle.propTypes = {
  anchorId: PropTypes.string.isRequired,
};

export default ProjectArticle;
