import React from "react";
import PropTypes from "prop-types";
import SharpImage from "../sharpImage";

function AboutArticle(props) {
  return (
    <article key={props.anchorId} id={props.anchorId}>
      <h2 className="inline-block p-3 mb-4 text-4xl font-titles text-brand-dark">
        About
      </h2>
      <section className="container mx-auto flex flex-wrap mb-4 p-3 w-full">
        <section className="w-full flex lg:w-1/3 xl:w-1/3 px-2 my-2 mx-auto">
          <div className="rounded overflow-hidden shadow-lg mx-1 lg:m-auto h-64 w-full justify-center align-center items-center">
            <SharpImage className="w-full" src="iain.jpeg"></SharpImage>
          </div>
        </section>
        <section className="w-full lg:w-1/3 xl:w-1/3 px-2 mx-auto">
          <div className="rounded overflow-hidden shadow-lg my-4 mx-1  bg-gray-lightest p-6 h-full">
            <h3
              className="hidden absolute right-0 top-0 text-right text-brand-dark text-6xl mb-1 opacity-25"
              style={{ transform: "translateY(-100%)" }}
            >
              Who
            </h3>
            <h3 className="text-brand-dark text-2xl font-titles">Welcome!</h3>
            <br />
            <p>
              This is <span>Freeroaming Solutions</span>, a freelance and
              contract software development company owned, run and staffed
              entirely by me: <span>Iain Bryson</span>.
            </p>
            <br />
            <p>
              I&apos;m here to provide top-notch coding services across a broad
              spectrum of languages, framworks and APIs. When you hire me,
              you&apos;re getting expertise at delivering solid products on time
              and within budget borne of extensive experience working for
              organizations of all sizes, from tiny startups to industry-leading
              corporations.
            </p>
          </div>
        </section>
        <section className="w-full lg:w-1/3 xl:w-1/3 px-2 my-2 mx-auto">
          <div className="rounded overflow-hidden shadow-lg my-4 mx-1 bg-gray-lightest p-6 h-full">
            <h3
              className="hidden absolute right-0 top-0 text-right text-brand-dark text-6xl mb-1 opacity-25"
              style={{ transform: "translateY(-100%)" }}
            >
              What
            </h3>
            <h3 className="text-brand-dark text-2xl font-titles">
              Here&apos;s What I Can do For You
            </h3>
            <br />
            <ul className="list-inside list-disc">
              <li>Full-stack web applications</li>
              <li>Data visualization</li>
              <li>System architecture design and consulting</li>
            </ul>
            <br />
            <p>Take a look at the portfolio below to see some examples.</p>
          </div>
        </section>
      </section>
    </article>
  );
}

AboutArticle.propTypes = {
  anchorId: PropTypes.string.isRequired,
};

export default AboutArticle;
