import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../utilities/redux/hooks';
import { RiUploadCloudFill } from 'react-icons/ri';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { emptyProject } from '../../utilities/data/projectConstants';
import { getOneUser } from '../../utilities/api/users';
import { getOneProject, editProject, deleteProject } from '../../utilities/api/projects';
import './CreateProject.scss';

export const EditProject = () => {
  const authUser = useAppSelector(selectAuthUser);
  const [fileSelected, setFileSelected] = useState<File>();
  const [projectForm, updateProjectForm] = useState<ProjectInterface>(emptyProject);
  const { duration, meeting_cadence, overview, technologies_used, title, status } = projectForm;
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      updateProjectForm((currForm) => {
        return { ...currForm, ...authUser };
      });
    }
    const fetchProject = async () => {
      const singleProject = await getOneProject(params.id);
      let projectOwner = await getOneUser(singleProject.project_owner);
      projectOwner = {
        firstName: projectOwner.firstName,
        lastName: projectOwner.lastName,
        _id: projectOwner._id,
      };
      updateProjectForm(singleProject);
    };
    fetchProject();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProjectForm({ ...projectForm, [name]: value });
  };

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateProject = await editProject(params.id, projectForm);
    if (updateProject) navigate(`/users/projects`);
  };

  const handleDeleteProject = async (e: React.MouseEvent) => {
    e.preventDefault();
    const deleteOneProject = await deleteProject(params.id);
    if (deleteOneProject) navigate(`/users/projects`);
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
      <p className="heading">Edit Project</p>

      <form onSubmit={handleUpdateProject} className="project-form" noValidate>
        <div className="photo-container">
          <label htmlFor="photo" className="photo">
            Upload Image
            <RiUploadCloudFill size={25} />
          </label>

          <input accept="image/*" id="photo" name="photo" type="file" multiple={false} onChange={handleImageChange} />
          <p className="alert">* This feature is not built out yet.</p>
        </div>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleInputChange} />

        <label htmlFor="technologies_used">Technologies Used (separate by commas)</label>
        <input
          list="technologies"
          type="email"
          name="technologies_used"
          autoComplete="off"
          multiple={true}
          value={technologies_used}
          onChange={handleInputChange}
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
        <select name="meeting_cadence" onChange={handleInputChange} value={meeting_cadence}>
          <option value="0">{meeting_cadence}</option>
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
          value={overview}
          onChange={(e) => handleInputChange(e)}
        ></textarea>

        <label htmlFor="duration">Duration of the project</label>
        <input type="text" name="duration" value={duration} onChange={handleInputChange} />

        <p>Save project as a draft or publish?</p>
        <div className="radio-container">
          <label htmlFor="status">Draft</label>
          <input
            type="radio"
            className="radio"
            name="status"
            value="Draft"
            checked={status === 'Draft' ? true : false}
            onChange={(e) => handleInputChange(e)}
          />

          <label htmlFor="status">Publish</label>
          <input
            type="radio"
            className="radio"
            name="status"
            value="Published"
            checked={status === 'Published' ? true : false}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="btn-container">
          <button onClick={uploadFile} type="submit">
            Submit
          </button>
          <button onClick={handleDeleteProject} type="submit">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
