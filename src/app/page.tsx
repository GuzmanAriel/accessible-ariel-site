import Image from "next/image";
const thumbnailUrl = "/images/header.jpg";

export default function Home() {
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
                    I am <span className="fn">Ariel Guzman</span>
                  </span>
                  <span className="animated-letters category">
                    <b className="is-visible">Developer</b>
                    <b>Creator</b>
                    <b></b>
                  </span>
                </h1>
                <div className="separator wow zoomIn"></div>
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
    </div>
  );
}
