import React from "react";
import ProjectList from "./projectList/ProjectList";
import TeamMemberList from "./teamMemberList/TeamMemberList";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <!-- Projects List --> */}
      <ProjectList />

      {/* <!-- Team Members --> */}
      <TeamMemberList />
    </div>
  );
};

export default Sidebar;
