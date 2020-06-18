import React, {useEffect, useState} from "react";
import ProjectDetails from "../projectDetails";
import {graphql, useStaticQuery} from "gatsby";
import Project from "../project";
import * as PropTypes from "prop-types";

// Alternative to using GraphQL
// import projects from "../../content/projects.json";

function ProjectArticle(props) {
  const [state, setState] = useState({
    focusProject: null,
  });

  const setFocusProject = (project) => {
    setState({
      ...state,
      focusProject: {...project},
    });
  };

  useEffect(() => {
  }, [state.focusProject]);

  const focusModal = (state.focusProject?.id) ?
    <ProjectDetails project={state.focusProject} onClose={() => setFocusProject(null)}></ProjectDetails>
    : <div></div>;

  const projects = useStaticQuery(graphql`
  {
  allContentJson {
    edges {
      node {
        projects {
          id
          description
          longDescription
          endDate
          name
          startDate
          technologies
          assets {
            title
            description
            asset
            hero
          }
        }
      }
    }
  }
}`);

  const allProjects = projects.allContentJson.edges.flatMap((edge) => edge.node.projects || []).filter(Boolean);
  const projectComponents = allProjects.map(project => Project({ key: project.id, project, onClick: setFocusProject }));

  return <article>
    {focusModal}
    <h2 className="inline-block p-3 mb-4 text-4xl font-titles text-brand-dark">
      Portfolio
    </h2>
    <ul id={props.anchorId} className="container mx-auto flex flex-wrap mb-4 p-3 w-full">
      {projectComponents}
    </ul>
  </article>;
}

ProjectArticle.propTypes = {anchorId: PropTypes.string.isRequired};

export default ProjectArticle;
