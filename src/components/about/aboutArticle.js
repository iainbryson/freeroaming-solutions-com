import React from "react";
import PropTypes from "prop-types";
import dogIllustration from "../../images/dog-illustration.svg";

function AboutArticle(props) {
  return <article>
  <h2 className="inline-block p-3 mb-4 text-4xl font-titles text-brand-dark">
    About
  </h2>
  <section id={props.anchorId} className="container mx-auto flex flex-wrap mb-4 p-3 w-full">
    <section className="w-full lg:w-1/3 xl:w-1/3 px-2 mx-auto">
      <img alt="A dog relaxing" src={dogIllustration} />
    </section>
    <section className="w-full lg:w-1/2 xl:w-1/3 px-2 mx-auto">
      <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
        The point is... to live one&apos;s life in the full complexity of
        what one is, which is something much darker, more contradictory,
        more of a maelstrom of impulses and passions, of cruelty, ecstacy,
        and madness, than is apparent to the civilized being who glides on
        the surface and fits smoothly into the world.
      </blockquote>

      <cite className="block mt-4 text-xs font-bold text-right uppercase">
        – Thomas Nagel
      </cite>
    </section>
    <section className="w-full lg:w-1/3 xl:w-1/3 px-2 mx-auto">
      <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
        The point is... to live one&apos;s life in the full complexity of
        what one is, which is something much darker, more contradictory,
        more of a maelstrom of impulses and passions, of cruelty, ecstacy,
        and madness, than is apparent to the civilized being who glides on
        the surface and fits smoothly into the world.
      </blockquote>

      <cite className="block mt-4 text-xs font-bold text-right uppercase">
        – Thomas Nagel
      </cite>
    </section>
  </section>
</article>
}

AboutArticle.propTypes = {
  anchorId: PropTypes.any.isRequired,
};

export default AboutArticle;
