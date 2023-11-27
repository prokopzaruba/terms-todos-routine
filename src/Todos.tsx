interface Task {
  task: string;
  date: string;
  id: number;
}

interface Props {
  tasks: Task[];
  handleMouseEnter: (taskNumber: string) => void;
  handleMouseLeave: () => void;
  isHovered: string;
  deleteTask: (id: number) => void;
}

const Todos = ({
  tasks,
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
  deleteTask,
}: Props) => {
  return (
    <div className="todos">
      <h2 className="task-type-heading">To-Dos</h2>
      {tasks
        ?.filter((v: Task) => v.date === "")
        .map((v: Task, i: number) => (
          <div key={i} className="todo">
            <button
              onMouseLeave={() => handleMouseLeave()}
              onMouseEnter={() => handleMouseEnter(i + "todo")}
              className={
                isHovered === i + "todo"
                  ? "delete-task green-button"
                  : "delete-task"
              }
              onClick={() => deleteTask(v.id)}
            ></button>
            <p className="task">{v.task}</p>
          </div>
        ))}
    </div>
  );
};

export default Todos;
