import React from 'react';

export interface CreateProjectProps {}

const CreateProject: React.FC<CreateProjectProps> = (props) => {
  return (
    <div className="create-project">
      <p className="heading">Create a Project</p>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" />

      <label htmlFor="project-owner">Project Owner</label>
      <input type="text" name="project-owner" />

      <label htmlFor="industry">Industry</label>
      <select name="industry"></select>

      <label htmlFor="roles">Roles</label>
      <select name="roles"></select>

      <label htmlFor="technologies-used">Technologies Used</label>
      <select name="technologies-used"></select>

      <label htmlFor="meeting-cadence">Meeting Cadence</label>
      <select name="meeting-cadence"></select>

      <label htmlFor="overview">Overview</label>
      <textarea name="overview" className="overview" cols={30} rows={10}></textarea>

      <button>Save as Draft</button>
      <button>Publish</button>
    </div>
  );
};

export default CreateProject;
