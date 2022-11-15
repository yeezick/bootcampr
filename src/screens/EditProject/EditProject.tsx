import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneProject } from '../../utilities/api/projects';
import { editProject } from '../../utilities/api/projects';
import { RiUploadCloudFill } from 'react-icons/ri';
import './EditProject.scss';

export interface EditProject {
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
  id?: EditProject;
  project?: EditProject;
}

export const EditProject: React.FC = () => {
  const [fileSelected, setFileSelected] = useState<File>();
  const [currentProject, setCurrentProject] = useState<any>([]);
  const [updatedProject, setupdatedProject] = useState<any[]>([]);
  const navigate = useNavigate();

  // Need project IDs to render current info and update the selected project
  const projectId = useParams();

  useEffect(() => {
    getOneProject(projectId)
      .then((res) => {
        setCurrentProject(res.data);
      })
      .catch((error) => {
        alert('Cannot find project');
        console.log(error.message);
      });
  }, [projectId]);

  const handleProjectInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setupdatedProject((updatedProject) => {
      return { ...updatedProject, [e.target.name]: e.target.value };
    });
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

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updated = await editProject(projectId, updatedProject);
    if (updated) navigate(`/projects/${projectId}`);
  };

  return (
    <div className="create-project">
      <p className="heading">Edit a Project</p>

      <form onSubmit={handleUpdateProject} className="project-form" noValidate>
        <div className="photo-container">
          <label htmlFor="photo" className="photo">
            <RiUploadCloudFill size={25} />
            Upload Image
            <input accept="image/*" id="photo" name="photo" type="file" multiple={false} onChange={handleImageChange} />
          </label>
        </div>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={currentProject.title} onChange={handleProjectInputChange} />

        {/* Will be able to remove this section once a user is able to be logged in and token or userID is stored in redux store or local storage. Must enter the id in this label until then or api call will fail. */}
        <label htmlFor="project-owner">Project Owner</label>
        <input type="text" name="project_owner" value={currentProject.owner} onChange={handleProjectInputChange} />

        <label htmlFor="technologies_used">Technologies Used (separate by commas)</label>
        <input
          list="technologies"
          type="email"
          name="technologies_used"
          autoComplete="off"
          multiple={true}
          value={currentProject.tools}
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
          value={currentProject.description}
          onChange={(e) => handleProjectInputChange(e)}
        ></textarea>

        <p>Save project as a draft or publish?</p>
        <div className="checkbox-container">
          <label htmlFor="status">
            Draft
            <input
              type="checkbox"
              className="checkbox"
              name="status"
              value="Draft"
              onChange={(e) => handleProjectInputChange(e)}
            />
          </label>
          <label htmlFor="status">
            Publish
            <input
              type="checkbox"
              className="checkbox"
              name="status"
              value="Published"
              onChange={(e) => handleProjectInputChange(e)}
            />
          </label>
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

export default EditProject;
