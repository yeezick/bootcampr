import { useState } from 'react';
import { allSkills } from '../../utilities/data/projectConstants';

export const SkillSelection = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const capitalSelectedSkills: string[] = selectedSkills.map((skill) => skill.toUpperCase());

  const handleSkillSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!selectedSkills.includes(value)) {
      let updatedSelectedSkills = [...selectedSkills, value];
      setSelectedSkills(updatedSelectedSkills);
    }
  };

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

      <select required onChange={handleSkillSelection}>
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
