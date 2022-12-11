import { generateTitle } from '../../utilities/helpers/stringUtils';
import { InterestedApplicantsProps, MapRolesProps, ViewRolesProps } from './PropInterfaces';
import './CreateRole.scss';

const MapInterestedApplicants = ({ applicants }: InterestedApplicantsProps) => {
  return (
    <div>
      {applicants.map(({ firstName, lastName }) => (
        <p>{firstName + ' ' + lastName}</p>
      ))}
    </div>
  );
};

// If you see `roles[type as keyof typeof roles]` => https://stackoverflow.com/questions/73714390/ts7053-element-implicitly-has-an-any-type-because-expression-of-type-string
const MapRoles = ({ role }: MapRolesProps) => {
  return (
    <div className="view-roles--map">
      {role.map(({ description, interestedApplicants, maxHeadCount, skills, status, title }) => (
        <div className="view-roles--single">
          <p>{title}</p>
          <p>{status}</p>
          <p>{description}</p>
          <p>{maxHeadCount}</p>
          {skills.map((skill) => (
            <p>{skill}</p>
          ))}
          {interestedApplicants.length > 0 && <MapInterestedApplicants applicants={interestedApplicants} />}
        </div>
      ))}
    </div>
  );
};

export const ViewRoles = ({ roles }: ViewRolesProps) => {
  const roleTypes = Object.keys(roles);

  return (
    <div className="view-roles">
      {roleTypes.map((type) => (
        <div className="view-roles--section">
          <h3>{generateTitle(type)}</h3>
          <MapRoles role={roles[type as keyof typeof roles]} />
        </div>
      ))}
    </div>
  );
};
