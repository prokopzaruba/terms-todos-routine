import { useState } from "react";
import useFetch from "./useFetch";
import usePost from "./usePost";
import Axios from "axios";
import { useMutation } from "@tanstack/react-query";
import TaskForm from "./TaskForm";
import Terms from "./Terms";
import Todos from "./Todos";

interface NewTask {
  task: string;
  date: string;
}

const Tasks = () => {
  const [isHovered, setIsHovered] = useState("none");

  const url = "http://localhost:8000/tasks";

  const { data: tasks, refetch } = useFetch(url, "tasks");

  const { mutate } = usePost(url);

  const deleteRequest = useMutation((id: number) => {
    return Axios.delete(`${url}/${id}`);
  });

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: NewTask = { task: task, date: date };
    mutate(newTask, {
      onSuccess: () => {
        refetch();
      },
    });
    setTask("");
    setDate("");
  };

  const deleteTask = (id: number) => {
    deleteRequest.mutate(id, {
      onSuccess: () => {
        setIsHovered("none");
        refetch();
      },
    });
  };

  const handleMouseEnter = (taskNumber: string) => {
    setIsHovered(taskNumber);
  };

  const handleMouseLeave = () => {
    setIsHovered("none");
  };

  return (
    <div>
      <TaskForm
        addTask={addTask}
        task={task}
        date={date}
        setTask={setTask}
        setDate={setDate}
      />
      <div className="tasks">
        <Terms
          tasks={tasks}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isHovered={isHovered}
          deleteTask={deleteTask}
        />
        <Todos
          tasks={tasks}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isHovered={isHovered}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Tasks;
