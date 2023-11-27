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

const Terms = ({
  tasks,
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
  deleteTask,
}: Props) => {
  const stringDateToNumber = (stringDate: string) => {
    const date = new Date(stringDate);
    const dateInMilliseconds = date.getTime();
    return dateInMilliseconds;
  };

  return (
    <div className="terms">
      <h2 className="task-type-heading">Terms</h2>
      {tasks
        ?.filter((v: Task) => v.date !== "")
        .sort(
          (a: Task, b: Task) =>
            stringDateToNumber(a.date) - stringDateToNumber(b.date)
        )
        .map((v: Task, i: number) => (
          <div key={i} className="term">
            <button
              className={
                isHovered === i + "term"
                  ? "delete-task green-button"
                  : "delete-task"
              }
              onMouseLeave={() => handleMouseLeave()}
              onMouseEnter={() => handleMouseEnter(i + "term")}
              onClick={() => deleteTask(v.id)}
            ></button>
            <p className="task">{v.task}</p>
            <p className="task-date">{v.date}</p>
          </div>
        ))}
    </div>
  );
};

export default Terms;
