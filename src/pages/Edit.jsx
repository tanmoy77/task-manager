import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../features/tasks/tasksApi";
import { useGetTeamMembersQuery } from "../features/team/teamApi";

const Edit = () => {
  const [taskName, setTaskName] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { data: task, isSuccess: isGetTaskSuccess } = useGetTaskQuery(id);
  const { data: members } = useGetTeamMembersQuery();
  const { data: projects } = useGetProjectsQuery();

  const [editTask, { isSuccess: isEditSuccess }] = useEditTaskMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      alert("couldn't found the task");
    }
    if (!members || !projects) {
      alert("an error occured");
      return;
    }

    const updates = {
      taskName,
      teamMember: members?.find((m) => m.name === assignTo),
      project: projects?.find((p) => p.projectName === projectName),
      deadline,
    };
    editTask({
      id,
      data: updates,
    });
  };

  useEffect(() => {
    if (isGetTaskSuccess && task && task.teamMember && task.teamMember.name) {
      setTaskName(task.taskName);
      setAssignTo(task.teamMember.name);
      setProjectName(task.project.projectName);
      setDeadline(task.deadline);
    }
  }, [isGetTaskSuccess, task]);

  useEffect(() => {
    if (isEditSuccess) {
      navigate("/");
    }
  }, [isEditSuccess, navigate]);

  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Create Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label for="lws-taskName">Task Name</label>
            <input
              type="text"
              name="taskName"
              id="lws-taskName"
              required
              value={taskName}
              placeholder="Implement RTK Query"
            />
          </div>

          <div className="fieldContainer">
            <label>Assign To</label>
            <select
              name="teamMember"
              id="lws-teamMember"
              required
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
            >
              <option hidden>Select Job</option>
              {members?.map((m) => (
                <option value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="fieldContainer">
            <label for="lws-projectName">Project Name</label>
            <select
              id="lws-projectName"
              name="projectName"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            >
              <option hidden>Select Project</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.projectName}>
                  {p.projectName}
                </option>
              ))}
            </select>
          </div>

          <div className="fieldContainer">
            <label for="lws-deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="lws-deadline"
              value={deadline}
              required
            />
          </div>

          <div className="text-right">
            <button type="submit" className="lws-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit;
