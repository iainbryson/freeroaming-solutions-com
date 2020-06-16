import PropTypes from "prop-types";
import React from "react";

import Header from "./header";
import {graphql, useStaticQuery} from "gatsby";

import ContactButton from "./contactButton";
import MeshBackground from "./meshBackground";

function Layout({ children }) {

  const {site} = useStaticQuery(graphql`
    query ContactsQuery {
  site {
    siteMetadata {
      contacts {
        github
        email
        linkedin
        stackoverflow
      }
    }
  }
}

  `);

  const contacts = Object.entries(site.siteMetadata.contacts).map(([medium, address]) => (
    <ContactButton medium={medium} address={address} key={medium}></ContactButton>
  ));

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main className="flex-1 w-full max-w-6xl px-4 py-8 mx-auto md:px-8 md:py-16">
        <MeshBackground></MeshBackground>
        {children}
      </main>

      <footer className="bg-none">
        <nav className="flex justify-between max-w-6xl p-4 mx-auto text-sm md:p-8">
          <p className="text-white">
            Created by{` `}
            <a
              className="font-bold no-underline"
              href="https://freeroamingsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iain Bryson
            </a>
          </p>

          <p>
            {contacts}
          </p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
