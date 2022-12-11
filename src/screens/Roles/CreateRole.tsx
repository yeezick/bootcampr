import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewRole } from '../../utilities/api/roles';
import { allSkills, emptyRole } from '../../utilities/data/projectConstants';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import './CreateRole.scss';

type Props = {};

export const CreateRole = (props: Props) => {
  const [newRole, setNewRole] = useState(emptyRole);
  const [selectedSkills, setSelectedSkills] = useState<String[]>([]);
  const navigate = useNavigate();
  const { description, maxHeadCount, skills, status, title } = newRole;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handleNewRoleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProject: ProjectInterface = await createNewRole(newRole);
    console.log(updatedProject);
    if (updatedProject) navigate(`/projects`);
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

        <select required value={skills} onChange={handleSkillSelection}>
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
    <div className="create-new-role">
      <h1>CreateRole</h1>
      <form onSubmit={handleNewRoleCreation}>
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
          Status
          <select value={status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
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

        <button>Create new role</button>
      </form>
    </div>
  );
};
