import React, { useState } from 'react';

export interface CreateProjectProps {}

const CreateProject: React.FC<CreateProjectProps> = (props) => {
  const [fileSelected, setFileSelected] = useState<File>();

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
      const formData = new FormData();
      formData.append('image', fileSelected, fileSelected.name);
    }
  };

  return (
    <div className="create-project">
      <p className="heading">Create a Project</p>

      <form action="" className="project-form">
        <div className="photo-container">
          <label htmlFor="photo" className="photo">
            Upload Image
            <input accept="image/*" id="photo" name="photo" type="file" multiple={false} onChange={handleImageChange} />
          </label>
        </div>

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
        <button onClick={uploadFile}>Publish</button>
      </form>
    </div>
  );
};

export default CreateProject;
