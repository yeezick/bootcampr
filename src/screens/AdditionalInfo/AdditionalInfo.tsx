import React from "react";
import { useAppSelector } from "../../utilities/redux/hooks";

const AdditionalInfo: React.FC = () => {

  const { firstName, lastName } = useAppSelector((state) => state.ui.auth.user)

  return (
    <div>
      <h2>Additional Info</h2>
      <h3>{firstName}</h3>
      <h3>{lastName}</h3>
    </div>
  )
}

export default AdditionalInfo