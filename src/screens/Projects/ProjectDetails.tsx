// import React, { useState, useEffect } from 'react';
// import { getOneProject } from '../../utilities/api/projects';
// import { ProjectInterface } from '../../utilities/Interface/ProjectInterface';
// import { useParams, Link } from 'react-router-dom';

// const ProjectDetails: React.FC = (): JSX.Element => {
//   const [project, setProject] = useState<ProjectInterface>({
//     id: '',
//     title: '',
//     duration: '',
//     meeting_cadence: '',
//     overview: '',
//     technologies_used: [],
//     createdAt: '',
//     updatedAt: '',
//     project_owner: {
//       first_name: '',
//       last_name: '',
//       portfolio_link: '',
//     },
//   });
//   const params = useParams();

//   useEffect(() => {
//     const fetchProject = async () => {
//       const displayOneProject = await getOneProject(params.id);
//       setProject(displayOneProject);
//     };
//     fetchProject();
//   }, [setProject]);

//   return (
//     <div className="project-container">
//       <Link to="/projects">Back to All Projects</Link>
//       <h1>Title: {project.title}</h1>
//       <p>Project Overview: {project.overview} </p>
//       <p>Project Duration: {project.duration}</p>
//       <p> Meeting Cadence: {project.meeting_cadence}</p>
//       <p>Project Technologies: {project.technologies_used}</p>
//       <p>
//         Project Owner:
//         {project.project_owner ? project.project_owner.first_name : null}
//         {project.project_owner ? project.project_owner.last_name : null}
//       </p>
//       <p>Project Owner Portfolio: {project.project_owner ? project.project_owner.portfolio_link : null}</p>
//     </div>
//   );
// };

// export default ProjectDetails;

import React from 'react';

const ProjectDetails = () => {
  return <div>ProjectDetails</div>;
};

export default ProjectDetails;
