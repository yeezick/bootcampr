import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiUploadCloudFill } from 'react-icons/ri';
import { ProjectInterface } from '@utilities/types';
import { selectAuthUser } from '@utilities/redux/slices/users/userSlice';
import { emptyProject } from '@utilities/data/projectConstants';
import { createProject } from '@utilities/api';
import './CreateProject.scss';

export const CreateProject: React.FC = () => {
  const authUser = useSelector(selectAuthUser);
  const [fileSelected, setFileSelected] = useState<File>();
  const [projectForm, setProjectForm] = useState<ProjectInterface>(emptyProject);
  const navigate = useNavigate();

  const handleProjectInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectForm({ ...projectForm, [name]: value });
  };

  useEffect(() => {
    if (authUser) {
      setProjectForm({ ...emptyProject, project_owner: authUser._id });
    } else {
      navigate('/sign-in');
    }
  }, []);

  const handleNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = await createProject(projectForm);
    if (newProject) navigate(`/projects`);
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

      <form onSubmit={handleNewProject} className="project-form" noValidate>
        <div className="photo-container">
          <label htmlFor="photo" className="photo">
            Upload Image
            <RiUploadCloudFill size={25} />
          </label>

          <input accept="image/*" id="photo" name="photo" type="file" multiple={false} onChange={handleImageChange} />
          <p className="alert">* This feature is not built out yet.</p>
        </div>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handleProjectInputChange} />

        <label htmlFor="technologies_used">Technologies Used (separate by commas)</label>
        <input
          list="technologies"
          type="email"
          name="technologies_used"
          autoComplete="off"
          multiple={true}
          onChange={handleProjectInputChange}
        />
        <datalist id="technologies">
          <option value="React"></option>
          <option value="Redux"></option>
          <option value="Typescript"></option>
          <option value="HTML"></option>
          <option value="CSS"></option>
          <option value="SCSS"></option>
          <option value="Bootstrap"></option>
          <option value="C#"></option>
          <option value="Java"></option>
          <option value="AWS"></option>
          <option value="Jira"></option>
          <option value="MUI"></option>
        </datalist>

        <label htmlFor="meeting_cadence">Meeting Cadence</label>
        <select name="meeting_cadence" onChange={handleProjectInputChange}>
          <option value="0"></option>
          <option value="Monthly">Monthly</option>
          <option value="Biweekly">Biweekly</option>
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
        </select>

        <label htmlFor="overview">Overview</label>
        <textarea
          name="overview"
          className="overview"
          cols={30}
          rows={10}
          onChange={(e) => handleProjectInputChange(e)}
        ></textarea>

        <label htmlFor="duration">Duration of the project</label>
        <input type="text" name="duration" onChange={handleProjectInputChange} />

        <p>Save project as a draft or publish?</p>
        <div className="radio-container">
          <label htmlFor="status">Draft</label>
          <input
            type="radio"
            className="radio"
            name="status"
            value="Draft"
            onChange={(e) => handleProjectInputChange(e)}
          />

          <label htmlFor="status">Publish</label>
          <input
            type="radio"
            className="radio"
            name="status"
            value="Published"
            onChange={(e) => handleProjectInputChange(e)}
          />
        </div>

        <div className="btn-container">
          <button onClick={uploadFile} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
