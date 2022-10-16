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
      <select name="industry">
        <optgroup label="Industry">
          <option value="0"></option>
          <option value="1">Retail</option>
          <option value="2">Banking</option>
          <option value="3">Healthcare</option>
        </optgroup>
      </select>

      <label htmlFor="roles">Roles</label>
      <select name="roles">
        <optgroup label="Roles">
          <option value="0"></option>
          <option value="1">Software Engineer</option>
          <option value="2">UX Designer</option>
          <option value="3">Scrum Master</option>
        </optgroup>
      </select>

      <label htmlFor="technologies-used">Technologies Used</label>
      <select name="technologies-used">
        <optgroup label="Technologies">
          <option value="0"></option>
          <option value="1">React</option>
          <option value="2">Redux</option>
          <option value="3">Typescript</option>
        </optgroup>
      </select>

      <label htmlFor="meeting-cadence">Meeting Cadence</label>
      <select name="meeting-cadence">
        <optgroup label="Meeting cadence">
          <option value="0"></option>
          <option value="1">Once per month</option>
          <option value="2">Once per week</option>
          <option value="3">Daily</option>
        </optgroup>
      </select>

      <label htmlFor="overview">Overview</label>
      <textarea name="overview" className="overview" cols={30} rows={10}></textarea>

      <button>Save as Draft</button>
      <button>Publish</button>
    </div>
  );
};

export default CreateProject;
