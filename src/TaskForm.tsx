interface Props {
  addTask: (e: React.FormEvent<HTMLFormElement>) => void;
  task: string;
  date: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const TaskForm = ({ addTask, task, date, setTask, setDate }: Props) => {
  return (
    <form className="task-form" onSubmit={(e) => addTask(e)}>
      <input
        className="task-input"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        className="task-term-input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="add-task-button">Add task</button>
    </form>
  );
};

export default TaskForm;
