import { useState } from "react";
import usePost from "./usePost";

interface NewActivity {
  activity: string;
  description: string;
  start: string;
  end: string;
  order: number;
}

interface Props {
  openedForm: number;
  onOpen: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  order: number;
  refetch: () => void;
}

const RoutineForm = ({ openedForm, onOpen, id, order, refetch }: Props) => {
  const { mutate } = usePost("http://localhost:8000/routine");

  console.log(order);

  const isOpen = openedForm === id;

  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleToggle = () => {
    onOpen(isOpen ? -1 : id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActivity("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    onOpen(-1);
    const newActivity: NewActivity = {
      activity: activity,
      description: description,
      start: startTime,
      end: endTime,
      order: order,
    };
    mutate(newActivity, {
      onSuccess: () => {
        refetch();
      },
    });
    console.log(activity);
  };

  return (
    <div>
      <button className="add-routine-task-button" onClick={handleToggle}>
        {isOpen ? "−" : "+"}
      </button>
      {isOpen && (
        <form className="routine-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="routine-text-input "
              type="text"
              placeholder="Activity"
              required
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
            <textarea
              className="routine-text-area routine-description-input"
              required
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="routine-time-label">
              Start{" "}
              <input
                className="routine-time-input routine-time-input-start"
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label className="routine-time-label">
              End{" "}
              <input
                className="routine-time-input"
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </div>
          <button className="routine-add-activity-button">Add activity</button>
        </form>
      )}
    </div>
  );
};

export default RoutineForm;
