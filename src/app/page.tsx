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
                  <i className="fa fa-briefcase"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInRight">
                  <div className="date">2016+</div>
                  <h3>Front End Web Developer</h3>
                  <p>
                    As a Front End Developer at Barkly Pets I have worked with a lot of new things.
                    Gained an extensive knowledge in PHP. Working at a startup I have really helped
                    to be a part of a team to bring the business to better place. This included,
                    migrating the site to Wordpress, updating the pages for a better and more modern
                    appearance, adding UI elements, and incorporating SEO tactics in order to show
                    up at the top of search engines organically. Not only did I learn more about
                    Software Engineering, but I also learned a lot about design and even ceated
                    mockups on Adobe Illustrator.
                  </p>
                </div>
              </div>
              <div className="tutorial-item">
                <div className="icon-b wow bounceIn">
                  <i className="fa fa-briefcase"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInRight">
                  <div className="date">2015 - 2017</div>
                  <h3>Interactive Developer</h3>
                  <p>
                    At TrueChoice Solutions I worked with a lot of UI elements as well as building
                    applications through an in-house process. Several other duties included: Build
                    client applications within due dates. Update client applications based on
                    feedback. Create brand new dynamic templates within the platform for reuse in
                    client applications. Work with HTML5, CSS3, JavaScript, LESS, Gulp, and Angular
                    to create new functionality. Set standard organizations for client releases in
                    order to provide a more efficient release process. Set a standard HTML email
                    template for clients.
                  </p>
                </div>
              </div>
              <div className="tutorial-item">
                <div className="icon-b wow bounceIn">
                  <i className="fa fa-briefcase"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInRight">
                  <div className="date">2015+</div>
                  <h3>Interactive Developer</h3>
                  <p>
                    At TrueChoice Solutions I worked with a lot of UI elements as well as building
                    applications through an in-house process. Several other duties included: Build
                    client applications within due dates. Update client applications based on
                    feedback. Create brand new dynamic templates within the platform for reuse in
                    client applications. Work with HTML5, CSS3, JavaScript, LESS, Gulp, and Angular
                    to create new functionality. Set standard organizations for client releases in
                    order to provide a more efficient release process. Set a standard HTML email
                    template for clients.
                  </p>
                </div>
              </div>
              <div className="tutorial-item">
                <div className="icon-b wow bounceIn">
                  <i className="fa fa-briefcase"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInLeft">
                  <div className="date">March 2015 - June 2015</div>
                  <h3>Front-end developer Intern</h3>
                  <p>
                    Developing web apps and gaining knowledge of different languages. Worked with
                    the following languages: HTML, CSS, JavaScript, J Query, Angular.js
                  </p>
                </div>
              </div>
              <div className="tutorial-item">
                <div className="icon-b wow bounceIn">
                  <i className="fa fa-mortar-board"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInRight">
                  <div className="date">January 2015 - May 2015</div>
                  <h3>Frontend Development Course</h3>
                  <p>
                    In this course I really started to dive deep into web development instead of
                    teaching myself. I gained a lot of knowledge on HTML CSS and the basics of
                    JavaScript in order to build the foundations needed to create some great UI. I
                    built a portfolio and was at the top of my class.
                  </p>
                </div>
              </div>
              <div className="tutorial-item">
                <div className="icon-b wow bounceIn">
                  <i className="fa fa-mortar-board"></i>
                </div>
                <div className="tutorial-item-inner wow bounceInLeft">
                  <div className="date">2009 - 2014</div>
                  <h3>Daniel Webster College</h3>
                  <p>
                    Bachelor's Degree in Psychology, President of the Psychology Club, Captain of
                    the Women's Basketball Team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
