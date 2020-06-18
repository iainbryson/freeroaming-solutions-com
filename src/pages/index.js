import React from 'react';

import Layout from "../components/layout";
import SEO from "../components/seo";

import ProjectArticle from "../components/projects/projectActicle";

import AboutArticle from "../components/about/aboutArticle";

import MenuTray from "../components/menuTray";

function IndexPage() {

  const menuItems = ['about', 'portfolio'];


  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <MenuTray menuItems={menuItems}></MenuTray>

      <article className="text-center flex h-screen  content-center justify-center flex-col">
        <section className="mx-auto h-auto  text-brand-dark">
          <h1 className="inline-block p-3 mb-4 text-6xl  font-titles">
            Freeroaming Solutions
          </h1>
          <h3 className="block p-3 mb-4 text-2xl font-bold  font-titles">
            Contract & Freelance Software Development
          </h3>
        </section>
      </article>

      <ProjectArticle anchorId={`portfolio`}/>

      <AboutArticle anchorId={`about`}/>

    </Layout>
  );
}

export default IndexPage;
