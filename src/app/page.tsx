"use client";
import { useEffect } from "react";
import Image from "next/image";
const thumbnailUrl = "/images/accessibility-header.jpg";
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
                <a href="#contacts" className="btn btn-bordered btn-go">
                  Let's get to work
                </a>
              </div>
            </div>
          </div>
        </div>
        <canvas id="particles"></canvas>
      </section>

      <section id="about" className="section section-bg-light section-top-rise section-bottom-rise">
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
                  Accessible Ariel is a platform focused on building accessible UI components with
                  real-world examples, WCAG guidance, and developer-friendly tutorials. Each
                  component includes breakdowns of accessibility best practices, keyboard
                  interactions, screen reader behavior, and implementation details, along with
                  linked YouTube tutorials that walk through the process step-by-step. This project
                  is not just about teaching accessibility — it is also about continuing to learn,
                  experiment, and improve as I build alongside the developer community. My goal is
                  to help make accessibility more approachable and practical for everyday frontend
                  development.
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

      <section
        id="tutorials"
        className="section section-bg-dark section-top-rise section-bottom-rise"
      >
        <div className="section-inner">
          <div className="container">
            <header className="heading">
              <h2>Tutorials</h2>
              <div className="separator"></div>
            </header>

            <div className="tutorial">
              <div className="tutorial-item">
                <div className="icon-b wow bounceIn">
                  <i className="fa-brands fa-wpforms"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInRight">
                  <h3>Forms</h3>
                  <p>
                    Accessible Forms covers everything you need to build forms that work for
                    everyone — keyboard users and screen reader users included. Topics span labeling
                    inputs correctly, grouping related controls with fieldset and role="group",
                    wiring up hints and error messages with ARIA, and building custom controls that
                    behave like their native counterparts. Includes live interactive demos for each
                    concept.
                  </p>
                  <div className="tutorial-actions">
                    <a className="btn btn-s" aria-label="Go to form accessibility tutorial">
                      Read The Rules
                    </a>
                    <a className="btn btn-s" aria-label="Go to form accessibility YouTube tutorial">
                      Watch Tutorial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
