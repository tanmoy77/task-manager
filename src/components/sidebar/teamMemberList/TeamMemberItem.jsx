import React from "react";

const TeamMemberItem = ({ teamMember }) => {
  return (
    <div className="checkbox-container">
      <img src={teamMember.avatar} alt="avatar" className="team-avater" />
      <p className="label">{teamMember.name}</p>
    </div>
  );
};

export default TeamMemberItem;
