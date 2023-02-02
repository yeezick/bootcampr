import { useEffect, useState } from 'react';
import { generateTitle } from '../../utilities/helpers/stringUtils';
import { getOneUser } from '../../utilities/api/users';
import { InterestedApplicantsProps, MapRolesProps, ViewRolesProps } from './PropInterfaces';
import './CreateRole.scss';
import { UserInterface } from '../../utilities/types/UserInterface';

const MapInterestedApplicants = ({ applicants }: InterestedApplicantsProps) => {
  const [completeApplicants, updateCompleteApplicants] = useState(applicants);

  useEffect(() => {
    const fetchApplicants = async () => {
      let updatedApplicants: UserInterface[] = [];
      if (applicants.length > 0) {
        for (let i = 0; i < applicants.length; i++) {
          const fullUser = await getOneUser(applicants[i]);
          if ('firstName' in fullUser) updatedApplicants.push(fullUser);
          else continue;
        }
        updateCompleteApplicants(updatedApplicants);
      }
    };
    fetchApplicants();
  }, [applicants]);

  return (
    <div>
      <h3>Interested Applicants</h3>
      {completeApplicants.map((applicant) => {
        if (typeof applicant === 'string') {
          return null;
        } else {
          const { firstName, lastName } = applicant;
          return <p key={`view-roles-${firstName}${lastName}`}>{firstName + ' ' + lastName}</p>;
        }
      })}
    </div>
  );
};

// If you see `roles[type as keyof typeof roles]` => https://stackoverflow.com/questions/73714390/ts7053-element-implicitly-has-an-any-type-because-expression-of-type-string
const MapRoles = ({ role }: MapRolesProps) => {
  return (
    <div className="view-roles--map">
      {role.map(({ description, interestedApplicants, maxHeadCount, skills, status, title }, key) => (
        <div className="view-roles--single" key={`view-roles-${title}`}>
          <p>{title}</p>
          <p>{status}</p>
          <p>{description}</p>
          <p>{maxHeadCount}</p>
          {skills.map((skill) => (
            <p key={skill}>{skill}</p>
          ))}
          {interestedApplicants.length > 0 && <MapInterestedApplicants applicants={interestedApplicants} />}
        </div>
      ))}
    </div>
  );
};

export const ViewRoles = ({ roles }: ViewRolesProps) => {
  if (!roles || typeof roles !== 'object') return null;
  const roleTypes = Object.keys(roles);

  return (
    <div className="view-roles">
      {roleTypes.map((type) => (
        <div className="view-roles--section" key={type}>
          <h3>{generateTitle(type)}</h3>
          <MapRoles role={roles[type as keyof typeof roles]} />
        </div>
      ))}
    </div>
  );
};
