import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import ProjectArticle from "../components/projects/projectActicle";

import AboutArticle from "../components/about/aboutArticle";

import ContactArticle from "../components/contact/contactArticle";

const MenuTrayLazy = React.lazy(() => import("../components/menuTray"));

function IndexPage() {
  const isSSR = typeof window === "undefined";

  const menuItems = {
    about: AboutArticle,
    portfolio: ProjectArticle,
    contact: ContactArticle,
  };

  const articles = Object.entries(menuItems).map(([id, component]) =>
    component({ anchorId: id })
  );

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <MenuTrayLazy menuItems={Object.keys(menuItems)} />
        </React.Suspense>
      )}

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

      {articles}
    </Layout>
  );
}

export default IndexPage;
