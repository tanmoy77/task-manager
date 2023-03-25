import React from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Error from "../ui/Error";
import Task from "./Task";

const TaskList = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { search, tagSelected } = useSelector((state) => state.filter);

  const searchFilter = (task) => {
    return task.taskName.toLowerCase().includes(search);
  };

  const tagFilter = (task) => {
    return tagSelected.includes(task.project.projectName);
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message={error} />;
  }
  if (!isLoading && !isError && tasks?.length === 0) {
    content = <div>No tasks to show</div>;
  }
  if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks
      ?.filter(searchFilter)
      ?.filter(tagFilter)
      ?.map((task) => <Task key={task.id} task={task} />);
  }
  return <div className="lws-task-list">{content}</div>;
};

export default TaskList;
