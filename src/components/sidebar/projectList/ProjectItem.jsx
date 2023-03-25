import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTagSelected } from "../../../features/filter/filterSlice";

const ProjectItem = ({ project }) => {
  const dispatch = useDispatch();
  const { tagSelected } = useSelector((state) => state.filter);

  const handleCheck = (e) => {
    dispatch(changeTagSelected(project.projectName));
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={project.colorClass}
        checked={tagSelected.includes(project.projectName)}
        onChange={handleCheck}
      />
      <p className="label">{project.projectName}</p>
    </div>
  );
};

export default ProjectItem;
