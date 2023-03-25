import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fillInitialTags } from "../../../features/filter/filterSlice";
import { useGetProjectsQuery } from "../../../features/projects/projectApi";
import Error from "../../ui/Error";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  const {
    data: projects,
    isSuccess,
    isLoading,
    isError,
  } = useGetProjectsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(fillInitialTags(projects.map((p) => p.projectName)));
    }
  }, [isSuccess, dispatch, projects]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message="an error occured" />;
  }
  if (!isLoading && !isError && projects?.length === 0) {
    content = <div>No projects to show</div>;
  }
  if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <ProjectItem key={project.id} project={project} />
    ));
  }
  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectList;
