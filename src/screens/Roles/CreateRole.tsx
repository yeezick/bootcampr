import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewRole } from '../../utilities/api/roles';
import { allSkills, emptyRole } from '../../utilities/data/projectConstants';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import './CreateRole.scss';

export const CreateRole = () => {
  const [newRole, setNewRole] = useState(emptyRole);
  const [roleType, setRoleType] = useState<string>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { description, maxHeadCount, status, title } = newRole;
  const { id: projectId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

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
    setNewRole(emptyRole);
  };

  const handleSkillSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!selectedSkills.includes(value)) {
      let updatedSelectedSkills = [...selectedSkills, value];
      setSelectedSkills(updatedSelectedSkills);
    }
  };

  const SkillSelection = () => {
    const capitalSelectedSkills: string[] = selectedSkills.map((skill) => skill.toUpperCase());

    return (
      <div className="skill-selection">
        {selectedSkills.length > 0 && (
          <div className="selected-skills--parent">
            <h4>Selected skills: </h4>
            <div className="selected-skills--container">
              {capitalSelectedSkills.map((skill, idx) => (
                <span className="selected-skills--single" key={`selected-skill-${idx}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <select required name="status" onChange={handleSkillSelection}>
          {allSkills.map((skill, idx) => {
            const upperCaseSkill = skill[0].toUpperCase() + skill.slice(1);
            return (
              <option value={skill} key={`option-skill-${idx}`}>
                {upperCaseSkill}
              </option>
            );
          })}
        </select>
      </div>
    );
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
            onChange={handleChange}
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
            onChange={handleChange}
            value={description}
            maxLength={300}
            required
          />
        </label>

        <label>
          Skills
          <SkillSelection />
        </label>

        <label>
          Max Headcount
          <input type="number" name="maxHeadCount" onChange={handleChange} value={maxHeadCount} required min={1} />
        </label>

        <label>
          Status
          <select value={status} onChange={handleStatusChange}>
            <option value="">Draft or Published?</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <button type="button" onClick={submitNewRole}>
          Create new role
        </button>
      </div>
    </div>
  );
};
