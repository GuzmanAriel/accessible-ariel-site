"use client";
import { useEffect } from "react";
import Image from "next/image";
import experiencessData from "@/content/experience.json";
import projectsData from "@/content/projects.json";
import ModalList from "@/components/ModalList";
const thumbnailUrl = "/images/header.jpg";
const animatedPortrait = "/images/animated-portrait.png";

export default function Home() {
  useEffect(() => {
    // Example:
    // $(".some-slider").slick();
    // new WOW().init();

    return () => {
      // destroy/cleanup plugin if the library supports it
      // $(".some-slider").slick("unslick");
    };
  }, []);
  console.log("%csrc/app/page.tsx:4 thumbnailUrl", "color: #007acc;", thumbnailUrl);
  return (
    <div className="home-page">
      <section id="intro" className="section section-bg-img section-bg-overlay section-bottom-rise">
        <div
          className="bg"
          style={{
            background: `url(${thumbnailUrl})`,
          }}
        ></div>
        <div className="section-inner">
          <div className="container">
            <div className="intro">
              <header className="heading">
                <i data-wow-delay="0.1s" className="fa fa-4x fa-hand-peace-o wow fadeInDown"></i>
                <h1 className="wow zoomIn">
                  <span className="name">
                    Accessible <span className="fn">Ariel</span>
                  </span>
                  <span className="animated-letters category">
                    <b className="is-visible">Developer</b>
                    <b>Advocate</b>
                    <b>Creator</b>
                  </span>
                </h1>
                <div className="separator"></div>
              </header>

              <div data-wow-delay="0.1s" className="wow fadeInUp">
                <a href="mailto:guzmanariel525@gmail.com" className="btn btn-bordered btn-go">
                  Send Me An Email
                </a>
              </div>
            </div>
          </div>
        </div>
        <canvas id="particles"></canvas>
      </section>

      <section
        id="about"
        className="section section-bg-light section-top-rise section-bottom-rise portfolio-about"
      >
        <div className="section-inner">
          <div className="container">
            <header className="heading">
              <h2>About</h2>
              <div className="separator"></div>
            </header>

            <div className="row gap-20">
              <div className="wow bounceInLeft">
                <div className="site-photo">
                  <img
                    src={animatedPortrait}
                    width="250"
                    height="250"
                    alt="Photo"
                    className="photo"
                  />
                </div>
              </div>
              <div className="wow bounceInRight">
                <h3>Exploring accessible frontend development</h3>
                <p>
                  Hi, I’m Ariel — yes, like the little mermaid — and I’m a Front-End Engineer with
                  10+ years of experience building modern, user-focused web experiences. I’ve worked
                  across a variety of frameworks and technologies over the years, from early Angular
                  to Vue.js, and now primarily React and Next.js applications alongside Back-End
                  teams. I’m passionate about creating polished, accessible, and engaging interfaces
                  through thoughtful UX, subtle animations, and responsive design. That passion led
                  me to create Accessible Ariel, where I share accessible component tutorials, WCAG
                  guidance, and real-world front-end solutions while continuing to learn and grow as
                  a developer. Outside of coding, I enjoy working out, basketball, tacos, pizza, and
                  trying not to ruin my fantasy football season.
                </p>
                <ul className="social-nav">
                  <li>
                    <a href="https://github.com/GuzmanAriel">
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/ariel-guzman-6bbb9797/">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@AccessibleAriel">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="section section-top-rise section-bottom-fall">
        <div className="section-inner">
          <div className="container">
            <header className="heading">
              <h2>Projects</h2>
              <div className="separator"></div>
            </header>

            <ul className="filter">
              <li data-group="all" className="active">
                All
              </li>
              <li data-group="website">Websites</li>
              <li data-group="highlight">Highlight</li>
            </ul>

            <ModalList projects={projectsData.projects} />
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="section section-bg-dark section-top-fall section-bottom-fall skills-container"
      >
        <div className="section-inner">
          <div className="container">
            <div className="row">
              <div className="skills__desc">
                <h3>My skills</h3>
                <div className="separator l"></div>
                <p>
                  Over the past 10+ years as a front-end developer, I’ve worked across agency and
                  product-focused environments building accessible, responsive, and user-focused web
                  experiences. My primary focus today is React, Next.js, JavaScript, TypeScript, and
                  modern CSS workflows including Sass and Tailwind CSS.
                </p>
                <p>
                  Throughout my career I’ve worked with a variety of frameworks, CMS platforms, and
                  tooling including WordPress, Sitecore, Storybook, Node.js, and Gulp. I especially
                  enjoy building reusable components, improving accessibility, and creating polished
                  user experiences through thoughtful UI development and subtle interactions.
                </p>
                <p>
                  Most of my learning has come from building real-world projects, experimenting with
                  new technologies, and continuously refining how I approach front-end architecture,
                  accessibility, and performance.
                </p>
              </div>
              <div className="skills__individual">
                <div className="skills">
                  <div data-progress="100" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>CSS/SASS/LESS/Tailwind</h4>
                  </div>
                  <div data-progress="100" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>JavaScript (ES6+)</h4>
                  </div>
                  <div data-progress="95" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>React.js</h4>
                  </div>

                  <div data-progress="95" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>API</h4>
                  </div>
                  <div data-progress="95" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>Next.js</h4>
                  </div>

                  <div data-progress="90" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>W3C Standards/A11y</h4>
                  </div>
                  <div data-progress="90 " className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>TypeScript</h4>
                  </div>

                  <div data-progress="60" className="skills-item wow">
                    <div className="skills-item-progress"></div>
                    <h4>Vue.js</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="section section-bg-light section-top-fall section-bottom-rise"
      >
        <div className="section-inner">
          <div className="container">
            <header className="heading">
              <h2>Experience</h2>
              <div className="separator"></div>
            </header>

            <div className="tutorial">
              {experiencessData.experience.map((experience) => (
                <div className="tutorial-item" key={experience.title}>
                  <div className="icon-b wow bounceIn">
                    <i className={experience.icon}></i>
                  </div>
                  <div className="tutorial-item-inner wow bounceInRight">
                    <div className="date">{experience.date}</div>
                    <h3>{experience.title}</h3>
                    <ul className="tutorial-desc">
                      {experience.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
