export default function Nav() {
  return (
    <header className="main-nav">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#tutorials">Tutorials</a>
          </li>
          <li>
            <a href="/portfolio">Ariel's Portfolio</a>
          </li>
          <li>
            <a href="/portfolio/#skills">Ariel's Skills</a>
          </li>
          <li>
            <a href="/portfolio/#projects">Ariel's Projects</a>
          </li>
        </ul>
      </nav>
      <div className="btn-icon btn-nav">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
}
