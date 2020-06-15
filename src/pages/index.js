import React, { useState, useEffect } from 'react';

import Layout from "../components/layout";
import SEO from "../components/seo";
// import projects from "../../content/projects.json";
import Project from "../components/project";
import ProjectDetails from "../components/projectDetails";
import {graphql, useStaticQuery} from "gatsby";

function IndexPage() {
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

  console.dir (projects);
  const allProjects = projects.allContentJson.edges.flatMap((edge) => edge.node.projects || []).filter(Boolean);
  console.dir (allProjects);
  const projectComponents = allProjects.map(project => Project({ key: project.id, project, onClick: setFocusProject }));

  return (
    <Layout>
      { focusModal }
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section className="text-center">
        <h2 className="inline-block p-3 mb-4 text-2xl font-bold">
          Freeroaming Solutions
        </h2>
        <h3 className="block p-3 mb-4 text-xl font-bold">
          Contract & Freelance Software Development
        </h3>

        <ul className="container mx-auto flex flex-wrap mb-4 p-3 w-full">
          {projectComponents}
        </ul>
    </section>
    </Layout>
  );
}

export default IndexPage;
