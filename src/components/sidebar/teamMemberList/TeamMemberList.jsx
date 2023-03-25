import React from "react";
import { useGetTeamMembersQuery } from "../../../features/team/teamApi";
import Error from "../../ui/Error";
import TeamMemberItem from "./TeamMemberItem";

const TeamMemberList = () => {
  const { data: teamMembers, isLoading, isError } = useGetTeamMembersQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message="an error occured" />;
  }
  if (!isLoading && !isError && teamMembers?.length === 0) {
    content = <div>No team member to show.</div>;
  }
  if (!isLoading && !isError && teamMembers?.length > 0) {
    content = teamMembers.map((teamMember) => (
      <TeamMemberItem key={teamMember.id} teamMember={teamMember} />
    ));
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMemberList;
