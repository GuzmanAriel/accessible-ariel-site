type Project = {
  title: string;
  image: string;
  description: string;
  modalImage: string;
  link: string;
  linkAriaLabel: string;
  category: string;
};

export default function ModalList({ projects }: { projects: Project[] }) {
  return (
    <ul className="works">
      {projects.map((project, index) => {
        const modalId = `works-item-details-${index}`;
        return (
          <li key={modalId} className="works-item" data-groups={`["${project.category}"]`}>
            <a href={`#${modalId}`} className="works-item-link">
              <span className="works-item-thumb">
                <img src={project.image} width={250} height={250} alt="" />
              </span>
            </a>
            <div id={modalId} className="popup mfp-hide">
              <figure>
                <img src={project.modalImage} width={750} height={500} alt="" />
              </figure>
              <div className="popup-inner">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="center">
                  <a href={project.link} className="btn" aria-label={project.linkAriaLabel}>
                    View site
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
