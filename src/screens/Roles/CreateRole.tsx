import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SkillSelection } from './SkillSelection';
import { CreateRoleProps } from './PropInterfaces';
import { createNewRole } from '../../utilities/api/roles';
import { emptyRole } from '../../utilities/data/projectConstants';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { handleInputChange } from '../../utilities/helpers/formHandlers';
import './CreateRole.scss';

export const CreateRole = ({ updateProjectForm }: CreateRoleProps) => {
  const [newRole, setNewRole] = useState(emptyRole);
  const [roleType, setRoleType] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { description, maxHeadCount, status, title } = newRole;
  const { id: projectId } = useParams();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setRoleType(value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewRole({ ...newRole, status: value });
  };

  const submitNewRole = async () => {
    const updatedProject: ProjectInterface = await createNewRole(projectId, newRole, roleType);
    updateProjectForm(updatedProject);
    setNewRole(emptyRole);
    setRoleType('');
    setSelectedSkills([]);
  };

  return (
    <div className="new-role--parent">
      <h1>CreateRole</h1>
      <div className="new-role--form">
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="My Very Cool Project"
            onChange={(e) => handleInputChange(e, setNewRole)}
            value={title}
            required
          />
        </label>

        <label>
          Type of Role:
          <select required value={roleType} onChange={handleRoleChange}>
            <option value="">Select a type of role</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="My Very Cool Project"
            onChange={(e) => handleInputChange(e, setNewRole)}
            value={description}
            maxLength={300}
            required
          />
        </label>

        <label>
          Skills
          <SkillSelection selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
        </label>

        <label>
          Max Headcount
          <input
            type="number"
            name="maxHeadCount"
            onChange={(e) => handleInputChange(e, setNewRole)}
            value={maxHeadCount}
            required
            min={1}
          />
        </label>

        <label>
          Status
          <select value={status} onChange={handleStatusChange}>
            <option value=""></option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </label>

        <button type="button" onClick={submitNewRole}>
          Create new role
        </button>
      </div>
    </div>
  );
};