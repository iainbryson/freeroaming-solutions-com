
// Alternative to using GraphQL
// import projects from "../../content/projects.json";

import {graphql, useStaticQuery} from "gatsby";

export function queryAllProjects() {
  const projects = useStaticQuery(graphql`
    query ProjectsQuery{
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
    }
  `);

  return projects.allContentJson.edges
    .flatMap((edge) => edge.node.projects || [])
    .filter(Boolean);
}