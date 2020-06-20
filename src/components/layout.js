import PropTypes from "prop-types";
import React from "react";

import { graphql, useStaticQuery } from "gatsby";

// import ContactButton from "./contactButton";

import style from "./layout.module.css";

function Layout({ children }) {
  const { siteMetadata } = useStaticQuery(graphql`
    query ContactsQuery {
      site {
        siteMetadata {
          contacts {
            email
            linkedin
          }
        }
      }
      site {
        siteMetadata {
          author
          url
        }
      }
    }
  `).site;

  // const contacts = Object.entries(siteMetadata.contacts).map(([medium, address]) => (
  //   <ContactButton medium={medium} address={address} key={medium}></ContactButton>
  // ));
  //const contacts = "";

  return (
    <div
      className={`flex flex-col min-h-screen font-sans text-gray-darkest ${style.mainBackground}`}
    >
      <main className="flex-1 w-full max-w-6xl px-1 pb-8 mx-auto md:px-8 md:py-16">
        {children}
      </main>

      <footer className="bg-none">
        <nav className="flex justify-around items-center max-w-6xl p-1 md:px-2 lg:px-4 mx-auto text-sm md:p-8">
          <p className="text-white text-brand-dark">
            <span>Created by </span>
            <a
              className="font-bold no-underline"
              href={siteMetadata.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteMetadata.author}
            </a>
            &nbsp; &copy; {new Date().getYear() + 1900}
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
