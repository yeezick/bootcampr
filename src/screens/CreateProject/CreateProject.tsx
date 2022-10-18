import React, { InputHTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../api/projects';
import { RiUploadCloudFill } from 'react-icons/ri';
import './CreateProject.scss';

export interface CreateProject {
  id: number;
  status: string;
  project_owner: { type: any };
  overview: string;
  meeting_cadence: string;
  technologies_used: [];
  roles: [
    interested_applicants: [],
    status: string,
    category: string,
    title: string,
    description: string,
    skills: [],
    desired_headcount: number,
  ];
  duration: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Props {
  project?: CreateProject;
}

const CreateProject: React.FC<Props> = ({ project }) => {
  const [fileSelected, setFileSelected] = useState<File>();
  const [createProjects, setCreateProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreateProjects((createProjects) => {
      return { ...createProjects, [e.target.name]: e.target.value };
    });
  };

  const handleNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = await createProject(createProjects);
    // if (newProject) navigate(`/projects/${newProject._id}`);
  };

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

      <form onSubmit={handleNewProject} className="project-form">
        <div className="photo-container">
          <label htmlFor="photo" className="photo">
            <RiUploadCloudFill size={25} />
            Upload Image
            <input accept="image/*" id="photo" name="photo" type="file" multiple={false} onChange={handleImageChange} />
          </label>
        </div>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" />

        <label htmlFor="project-owner">Project Owner</label>
        <input type="text" name="owner" onChange={handleProjectInputChange} />

        <label htmlFor="industry">Industry</label>
        <select name="industry" onChange={handleProjectInputChange}>
          <optgroup label="Industry">
            <option value="0"></option>
            <option value="1">Retail</option>
            <option value="2">Banking</option>
            <option value="3">Healthcare</option>
          </optgroup>
        </select>

        <label htmlFor="roles">Roles</label>
        <select name="roles" onChange={(e) => handleProjectInputChange}>
          <optgroup label="Roles">
            <option value="0"></option>
            <option value="1">Software Engineer</option>
            <option value="2">UX Designer</option>
            <option value="3">Scrum Master</option>
          </optgroup>
        </select>

        <label htmlFor="technologies-used">Technologies Used</label>
        <select name="technologies-used" onChange={(e) => handleProjectInputChange}>
          <optgroup label="Technologies">
            <option value="0"></option>
            <option value="1">React</option>
            <option value="2">Redux</option>
            <option value="3">Typescript</option>
          </optgroup>
        </select>

        <label htmlFor="meeting-cadence">Meeting Cadence</label>
        <select name="time_commitment" onChange={(e) => handleProjectInputChange}>
          <optgroup label="Meeting cadence">
            <option value="0"></option>
            <option value="1">Once per month</option>
            <option value="2">Once per week</option>
            <option value="3">Daily</option>
          </optgroup>
        </select>

        <label htmlFor="overview">Overview</label>
        <textarea
          name="description"
          className="overview"
          cols={30}
          rows={10}
          onChange={(e) => handleProjectInputChange}
        ></textarea>

        <div className="btn-container">
          <button>Save as Draft</button>
          <button onClick={uploadFile} type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
