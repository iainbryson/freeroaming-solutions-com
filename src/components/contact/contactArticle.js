import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import ContactButton from "../contactButton";

function ContactArticle(props) {
  const { site } = useStaticQuery(graphql`
    query ContactsAndProfilesQuery {
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
          profiles {
            github
            stackoverflow
          }
        }
      }
    }
  `);

  const contacts = Object.entries(
    site.siteMetadata.contacts
  ).map(([medium, address]) => (
    <ContactButton
      medium={medium}
      address={address}
      key={medium}
    ></ContactButton>
  ));

  const profiles = Object.entries(
    site.siteMetadata.profiles
  ).map(([medium, address]) => (
    <ContactButton
      medium={medium}
      address={address}
      key={medium}
    ></ContactButton>
  ));

  return (
    <article key={props.anchorId} id={props.anchorId}>
      <h2 className="inline-block p-3 mb-4 text-4xl font-titles text-brand-dark">
        Contact
      </h2>
      <section className="container mx-auto flex flex-wrap mb-4 p-3 w-full">
        <section className="w-full lg:w-1/2 xl:w-1/2 px-2 mx-auto">
          <h3 className="text-brand-dark text-2xl font-titles">Social</h3>
          {contacts}
        </section>
        <section className="w-full lg:w-1/2 xl:w-1/2 px-2 mx-auto">
          <h3 className="text-brand-dark text-2xl font-titles">
            Profiles &amp; Code
          </h3>
          {profiles}
        </section>
      </section>
    </article>
  );
}

ContactArticle.propTypes = {
  anchorId: PropTypes.string.isRequired,
};

export default ContactArticle;
