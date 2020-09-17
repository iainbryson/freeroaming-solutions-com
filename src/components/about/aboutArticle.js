import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SharpImage from "../sharpImage";
import Tooltip from "../tooltip";
import style from "./aboutArticle.module.css";

import { queryAllProjects } from "../projectsQuery";

function prettyElapsedTime(deltaTime) {
  let experiencePretty;
  const expDays = Math.ceil(deltaTime / (1000 * 60 * 60 * 24));
  const expYears = Math.floor(expDays / 365);
  const expMonths = Math.ceil((expDays - 365 * expYears) / 30);
  if (expYears > 0) {
    if (expMonths === 0) {
      experiencePretty = `${expYears} Years`;
    } else {
      experiencePretty = `${expYears} Years,     ${expMonths} Months`;
    }
  } else {
    experiencePretty = `${expMonths} Months`;
  }
  return experiencePretty;
}

function AboutArticle(props) {
  const cardStyle = "w-full flex px-2 my-2 mx-auto lg:h-full";
  const cardHeaderStyle = "inline-block p-3 mb-4 mx-4 text-4xl font-titles text-brand-dark";

  const [topSkillIdx, setTopSkillIdx] = useState(0);
  const [topBackfaceSkillIdx, setBackfaceTopSkillIdx] = useState(0);
  const [skillCardFlipState, setSkillCardFlipState] = useState('unflipped');

  const skills = Object.values(queryAllProjects().flatMap((project) => {
    return project.technologies.map(technology => ({
      technology: technology.toLowerCase(),
      startDate: project.startDate,
      experience: new Date(project.endDate) - new Date(project.startDate),
      completedProjectCount: 1
    }))
  }).reduce((acc, t) => {
    if (!acc[t.technology]) {
      acc[t.technology] = t;
      return acc;
    }
    if (acc[t.technology].startDate > t.startDate) acc[t.technology].startDate = t.startDate;
    acc[t.technology].experience += t.experience;
    acc[t.technology].completedProjectCount += t.completedProjectCount;
    return acc;
  }, {})).sort((a,b) => {
    const d = b.completedProjectCount - a.completedProjectCount;
    if (d !== 0) {
      return d;
    }
    return b.experience - a.experience;
  }).map((skill) => {
    let experiencePretty = prettyElapsedTime(skill.experience);
    let longevityPretty = prettyElapsedTime(new Date - new Date(skill.startDate));
    return {...skill, experiencePretty, longevityPretty};
  }).slice(0,10);

  const flipCard = () => {
    if (skillCardFlipState === 'flipped') {
      setTopSkillIdx(( topBackfaceSkillIdx + 1) % 10);
    } else {
      setBackfaceTopSkillIdx((topSkillIdx + 1) % 10);
    }

    setSkillCardFlipState(skillCardFlipState === 'flipped' ? 'unflipped' : 'flipped');
  };

  useEffect(() => {
    const flipper = setInterval(flipCard, 3000);
    return () => clearInterval(flipper);
  }, [skillCardFlipState, topBackfaceSkillIdx, topSkillIdx])

  return (
    <article key={props.anchorId} id={props.anchorId} className="min-h-screen">
      <h2 className={cardHeaderStyle}>
        About
      </h2>
      <section className={`container mx-auto flex flex-wrap lg:p-3 mb-4 lg:mb-0 ${style.aboutContainer}`}>
        <section className={`${cardStyle} ${style.landscape}`}>
          <div className="rounded overflow-hidden shadow-lg mx-1 p-6 bg-gray-lightest w-full  h-full">
            <h3
              className="hidden absolute right-0 top-0 text-right text-brand-dark text-6xl mb-1 opacity-25"
              style={{ transform: "translateY(-100%)" }}
            >
              Who
            </h3>
            <h3 className="text-brand-dark text-2xl font-titles">Welcome!</h3>
            <br />
            <p>
              <span>Freeroaming Solutions</span> is a freelance and
              contract software development company owned, run and staffed
              entirely by me, <span>Iain Bryson</span>.
            </p>
            <br />
            <p>
              I&apos;m here to provide top-notch coding services across a broad
              spectrum of <Tooltip text={<b>languages</b>}>Ruby, Javascript</Tooltip>
              , <b>frameworks</b> and <b>APIs</b>. When you hire me,
              you&apos;re getting expertise at delivering solid products on time
              and within budget borne of extensive experience working for
              organizations of all sizes, from tiny startups to industry-leading
              corporations.
            </p>
          </div>
        </section>

        <section className={`${cardStyle} ${style.portrait} mt-6 lg:mt-auto`}>
          <div className="overflow-hidden h-full w-full flex justify-center lg:justify-start mx-1 align-center items-center ">
            <SharpImage
              className="w-full rounded shadow-lg "
              src="iain2.jpg">
              imgStyle={{objectFit: 'contain'}}
            </SharpImage>
          </div>
        </section>

        <section className={cardStyle}>
          <div className="rounded overflow-hidden shadow-lg bg-gray-lightest p-6 w-full h-full">
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
            <p>Take a look at the <a href="#portfolio" className="underline">portfolio</a> below to see some examples.</p>
            <section className={`${style.cards} mt-4`}>
              <div className={`${style.card} h-full`} onClick={flipCard}>
              <div className={`${style.cardBody} h-full ${style[skillCardFlipState]} transition duration-300 ease-in-out `}>
                <div className={`${style.cardFront} h-full flex justify-center align-center text-center  rounded bg-info-light rounded w-full px-3 py-1 text-sm font-semibold text-gray-darker`}>
                  <span className={`${style.cardContent}`}>{skills[topSkillIdx].technology}</span>
                </div>
                <div className={`${style.cardBack} h-full flex justify-center align-center text-center rounded bg-info-light rounded px-3 py-1 text-sm font-semibold text-gray-darker`}>
                  <span className={`${style.cardContent}`}>{skills[topBackfaceSkillIdx].technology}</span>
                </div>
              </div>
              </div>

              <div className={`${style.card} h-full`} onClick={flipCard}>
                <div className={`${style.cardBody} h-full ${style[skillCardFlipState]} transition duration-300 ease-in-out delay-75`}>
                  <div className={`${style.cardFront} h-full flex justify-center align-center text-center rounded bg-success-light rounded w-full px-3 py-1 text-sm font-semibold text-gray-darker`}>
                    <span className={`${style.cardContent}`}>{skills[topSkillIdx].completedProjectCount} Completed Projects</span>
                  </div>
                  <div className={`${style.cardBack} h-full flex justify-center align-center text-center rounded bg-success-light rounded px-3 py-1 text-sm font-semibold text-gray-darker`}>
                    <span className={`${style.cardContent}`}>{skills[topBackfaceSkillIdx].completedProjectCount} Completed Projects</span>
                  </div>
                </div>
              </div>

              <div className={`${style.card} h-full`} onClick={flipCard}>
                <div className={`${style.cardBody} f-full ${style[skillCardFlipState]} transition duration-300 ease-in-out delay-150`}>
                  <div className={`${style.cardFront} h-full flex justify-center align-center text-center rounded bg-warning-light rounded w-full px-3 py-1 text-sm font-semibold text-gray-darker`}>
                    <span className={`${style.cardContent}`}>{skills[topSkillIdx].longevityPretty}</span>
                  </div>
                  <div className={`${style.cardBack} h-full flex justify-center align-center text-center rounded bg-warning-light rounded px-3 py-1 text-sm font-semibold text-gray-darker`}>
                    <span className={`${style.cardContent}`}>{skills[topBackfaceSkillIdx].longevityPretty}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-4">
              <p>If you prefer a resume, you can download it <a className="underline text-blue hover:scale-105" href={'/resume-iain-bryson-07-09-20.doc'} download>here</a>.</p>
            </section>
          </div>
        </section>

        <section className={cardStyle}>
          <div className="rounded overflow-hidden shadow-lg bg-gray-lightest p-6 w-full h-full">
            <h3
              className="hidden absolute right-0 top-0 text-right text-brand-dark text-6xl mb-1 opacity-25"
              style={{ transform: "translateY(-100%)" }}
            >
              Who
            </h3>
            <h3 className="text-brand-dark text-2xl font-titles">
              Who am I?
            </h3>
            <br />
            <p>I am Iain Bryson.  I&apos;ve worked with software all my professional life, mostly for Microsoft.  In 2014
            I transitioned to the world of freelancing and became a <b>digital <i>semi-</i>nomad</b> &mdash; travelling then staying put for long periods.  So now I get to
            scratch the travel bug, live in exotic (and not-so-exotic) locations and continue to make great software.</p>
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
