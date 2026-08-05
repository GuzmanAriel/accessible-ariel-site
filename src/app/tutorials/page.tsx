"use client";
import { useEffect } from "react";
import tutorialsData from "@/content/tutorials.json";
const thumbnailUrl = "/images/accessibility-header.jpg";

export default function Tutorials() {
  useEffect(() => {
    return () => {};
  }, []);

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
                <h1 className="wow zoomIn">
                  <span className="name">Tutorials</span>
                </h1>
                <div className="separator"></div>
              </header>
            </div>
          </div>
        </div>
        <canvas id="particles"></canvas>
      </section>

      <section
        id="tutorials"
        className="section section-bg-dark section-top-rise section-bottom-rise"
      >
        <div className="section-inner">
          <div className="container">
            <header className="heading">
              <h2>All Tutorials</h2>
              <div className="separator"></div>
            </header>

            <div className="tutorial">
              {tutorialsData.tutorials.map((tutorial) => (
                <div className="tutorial-item" key={tutorial.title}>
                  <div className="icon-b wow bounceIn">
                    <i className={tutorial.icon}></i>
                  </div>
                  <div className="tutorial-item-inner wow bounceInRight">
                    <h3>{tutorial.title}</h3>
                    <p>{tutorial.description}</p>
                    <div className="tutorial-actions">
                      <a
                        className="btn btn-s"
                        href={tutorial.rulesLink.href}
                        aria-label={tutorial.rulesLink.ariaLabel}
                      >
                        Read The Rules
                      </a>
                      {tutorial.youTubeLink && (
                        <a
                          className="btn btn-s"
                          href={tutorial.youTubeLink.href}
                          aria-label={tutorial.youTubeLink.ariaLabel}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch Tutorial
                        </a>
                      )}
                    </div>
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
